import logging

import homeassistant.util.dt as dt_util

from homeassistant.core import (
    HomeAssistant,
    callback,
)

from homeassistant.helpers.event import (
    async_track_state_change,
    async_track_point_in_time,
)


from homeassistant.helpers.dispatcher import (
    async_dispatcher_connect,
)

from homeassistant.const import (
    STATE_UNKNOWN,
    STATE_UNAVAILABLE,
    STATE_OPEN,
    STATE_CLOSED,
    STATE_ON,
    STATE_OFF,
    STATE_LOCKED,
    STATE_UNLOCKED,
    STATE_ALARM_DISARMED,
    STATE_ALARM_PENDING,
    STATE_ALARM_ARMING,
)

from . import const

ATTR_IMMEDIATE = "immediate"
ATTR_ALWAYS_ON = "always_on"
ATTR_ARM_ON_CLOSE = "arm_on_close"
ATTR_ALLOW_OPEN = "allow_open"
ATTR_TRIGGER_UNAVAILABLE = "trigger_unavailable"

SENSOR_STATES_OPEN = [STATE_ON, STATE_OPEN, STATE_UNLOCKED]
SENSOR_STATES_CLOSED = [STATE_OFF, STATE_CLOSED, STATE_LOCKED]


SENSOR_TYPE_DOOR = "door"
SENSOR_TYPE_WINDOW = "window"
SENSOR_TYPE_MOTION = "motion"
SENSOR_TYPE_TAMPER = "tamper"
SENSOR_TYPE_ENVIRONMENTAL = "environmental"
SENSOR_TYPE_OTHER = "other"
SENSOR_TYPES = [
    SENSOR_TYPE_DOOR,
    SENSOR_TYPE_WINDOW,
    SENSOR_TYPE_MOTION,
    SENSOR_TYPE_TAMPER,
    SENSOR_TYPE_ENVIRONMENTAL,
    SENSOR_TYPE_OTHER,
]

_LOGGER = logging.getLogger(__name__)


def parse_sensor_state(state):
    if not state or not state.state:
        return STATE_UNKNOWN
    elif state.state == STATE_UNAVAILABLE:
        return STATE_UNAVAILABLE
    elif state.state in SENSOR_STATES_OPEN:
        return STATE_OPEN
    elif state.state in SENSOR_STATES_CLOSED:
        return STATE_CLOSED
    else:
        return STATE_UNKNOWN


class SensorHandler:
    def __init__(self, hass: HomeAssistant):
        self._config = None
        self.hass = hass
        self._listener = None
        self._arm_timers = {}

        def async_reload_sensor_listener(area_id: str = None, old_state: str = None, state: str = None):
            """watch sensors based on the state of the alarm entities."""
            sensors_list = []
            for area in self.hass.data[const.DOMAIN]["areas"].keys():
                sensors_list.extend(self.active_sensors_for_alarm_state(area))

            if self._listener:
                self._listener()

            if len(sensors_list):
                self._listener = async_track_state_change(
                    self.hass, sensors_list, self.async_sensor_state_changed
                )
            else:
                self._listener = None

        def async_update_sensor_config():
            """sensor config updated, reload the configuration."""
            self._config = self.hass.data[const.DOMAIN]["coordinator"].store.async_get_sensors()
            async_reload_sensor_listener()

        async_dispatcher_connect(hass, "alarmo_state_updated", async_reload_sensor_listener)
        async_dispatcher_connect(hass, "alarmo_sensors_updated", async_update_sensor_config)
        async_update_sensor_config()

    def active_sensors_for_alarm_state(self, area_id: str, state: str = None):
        """Compose a list of sensors that are active for the state"""
        alarm_entity = self.hass.data[const.DOMAIN]["areas"][area_id]

        if not state:
            state = alarm_entity.arm_mode if alarm_entity.arm_mode else alarm_entity.state

        entities = []
        for entity, config in self._config.items():
            if config["area"] != area_id or not config["enabled"]:
                continue
            elif alarm_entity.bypassed_sensors and entity in alarm_entity.bypassed_sensors:
                continue
            elif (
                alarm_entity.arm_mode in config[const.ATTR_MODES]
                or config[ATTR_ALWAYS_ON]
            ):
                entities.append(entity)
        return entities

    def validate_event(self, area_id: str = None, event: str = None) -> bool:
        """"check if sensors have correct state"""
        open_sensors = {}

        sensors_list = self.active_sensors_for_alarm_state(area_id)

        for entity in sensors_list:
            sensor_config = self._config[entity]
            if event == const.EVENT_LEAVE and not sensor_config[ATTR_IMMEDIATE]:
                continue
            if event in [const.EVENT_LEAVE, const.EVENT_ARM] and sensor_config[ATTR_ALLOW_OPEN]:
                continue

            state = parse_sensor_state(self.hass.states.get(entity))

            if state in [STATE_UNAVAILABLE, STATE_UNKNOWN] and not sensor_config[ATTR_TRIGGER_UNAVAILABLE]:
                continue
            elif state in [STATE_OPEN, STATE_UNAVAILABLE, STATE_UNKNOWN]:
                open_sensors[entity] = state

        return open_sensors

    @callback
    async def async_sensor_state_changed(self, entity, old_state, new_state):

        old_state = parse_sensor_state(old_state)
        new_state = parse_sensor_state(new_state)
        if old_state == new_state:
            return
        _LOGGER.debug("entity {} changed: old_state={}, new_state={}".format(entity, old_state, new_state))

        sensor_config = self._config[entity]
        if new_state in [STATE_UNAVAILABLE, STATE_UNKNOWN] and not sensor_config[ATTR_TRIGGER_UNAVAILABLE]:
            _LOGGER.debug("Entity {} should not trigger on unavailable state, ignoring".format(entity))
            return

        alarm_entity = self.hass.data[const.DOMAIN]["areas"][sensor_config["area"]]

        # immediate trigger due to always on sensor
        if sensor_config[ATTR_ALWAYS_ON] and new_state in [STATE_OPEN, STATE_UNKNOWN, STATE_UNAVAILABLE]:
            _LOGGER.debug("Alarm is triggered due to an always-on sensor: {}".format(entity))
            await alarm_entity.async_trigger(
                skip_delay=True,
                open_sensors={entity: new_state}
            )

        # initializing -> check if all sensors have a known state
        elif not alarm_entity.state and self.all_sensors_available_for_alarm(sensor_config["area"]):
            _LOGGER.debug("All sensors are initialized, restoring state")
            if alarm_entity.arm_mode:
                await alarm_entity.async_arm(alarm_entity.arm_mode)
            else:
                await alarm_entity.async_update_state(STATE_ALARM_DISARMED)

        # arming while immediate sensor is triggered -> cancel arm
        elif alarm_entity.state == STATE_ALARM_ARMING:
            if (
                new_state in [STATE_OPEN, STATE_UNKNOWN, STATE_UNAVAILABLE]
                and sensor_config[ATTR_IMMEDIATE]
                and not sensor_config[ATTR_ALLOW_OPEN]
                and not self._bypass_mode
            ):
                await alarm_entity.async_arm_failure({entity: new_state})
            elif sensor_config[ATTR_ARM_ON_CLOSE]:
                if new_state == STATE_CLOSED:
                    self.start_arm_timer(entity)
                else:
                    self.stop_arm_timer(entity)
            else:
                self.stop_arm_timer()

        # alarm is armed -> check if need to be triggered
        elif alarm_entity.state in const.ARM_MODES:
            if new_state in [STATE_OPEN, STATE_UNKNOWN, STATE_UNAVAILABLE]:
                _LOGGER.debug("Alarm is triggered due to sensor: {}".format(entity))
                await alarm_entity.async_trigger(
                    skip_delay=sensor_config[ATTR_IMMEDIATE],
                    open_sensors={entity: new_state}
                )

        # alarm is in pending -> check if pending time needs to be aborted
        elif alarm_entity.state == STATE_ALARM_PENDING:
            if new_state in [STATE_OPEN, STATE_UNKNOWN, STATE_UNAVAILABLE] and sensor_config[ATTR_IMMEDIATE]:
                await alarm_entity.async_trigger(
                    skip_delay=True,
                    open_sensors={entity: new_state}
                )

    def all_sensors_available_for_alarm(self, area_id: str, state: str = None):
        sensors_list = self.active_sensors_for_alarm_state(area_id, state)
        passed = True

        for entity in sensors_list:
            state = self.hass.states.get(entity)
            if (
                not state
                or not state.state
                or (state.state not in SENSOR_STATES_CLOSED and state.state not in SENSOR_STATES_OPEN)
            ):
                passed = False

        return passed

    def start_arm_timer(self, entity):
        """start timer for automatical arming"""

        @callback
        async def timer_finished(now):
            _LOGGER.debug("timer finished")
            sensor_config = self._config[entity]
            alarm_entity = self.hass.data[const.DOMAIN]["areas"][sensor_config["area"]]
            await alarm_entity.async_arm(alarm_entity.arm_mode)
        now = dt_util.utcnow()

        if entity in self._arm_timers:
            self.stop_arm_timer(entity)

        self._arm_timers[entity] = async_track_point_in_time(
            self.hass, timer_finished, now + const.SENSOR_ARM_TIME
        )

    def stop_arm_timer(self, entity=None):
        """cancel timer(s) for automatical arming"""

        if entity and entity in self._arm_timers:
            self._arm_timers[entity]()
        elif not entity:
            for entity in self._arm_timers.keys():
                self._arm_timers[entity]()
