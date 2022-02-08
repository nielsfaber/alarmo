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
    ATTR_STATE,
    ATTR_LAST_TRIP_TIME,
    ATTR_NAME,
)

from . import const

ATTR_USE_EXIT_DELAY = "use_exit_delay"
ATTR_USE_ENTRY_DELAY = "use_entry_delay"
ATTR_ALWAYS_ON = "always_on"
ATTR_ARM_ON_CLOSE = "arm_on_close"
ATTR_ALLOW_OPEN = "allow_open"
ATTR_TRIGGER_UNAVAILABLE = "trigger_unavailable"
ATTR_AUTO_BYPASS = "auto_bypass"
ATTR_AUTO_BYPASS_MODES = "auto_bypass_modes"
ATTR_GROUP = "group"
ATTR_GROUP_ID = "group_id"
ATTR_TIMEOUT = "timeout"
ATTR_EVENT_COUNT = "event_count"
ATTR_ENTITIES = "entities"

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
        self._state_listener = None
        self._subscriptions = []
        self._arm_timers = {}
        self._groups = {}
        self._group_events = {}

        def async_update_sensor_config():
            """sensor config updated, reload the configuration."""
            self._config = self.hass.data[const.DOMAIN]["coordinator"].store.async_get_sensors()
            self._groups = self.hass.data[const.DOMAIN]["coordinator"].store.async_get_sensor_groups()
            self._group_events = {}
            self.async_watch_sensor_states()

        self._subscriptions.append(
            async_dispatcher_connect(hass, "alarmo_state_updated", self.async_watch_sensor_states)
        )
        self._subscriptions.append(
            async_dispatcher_connect(hass, "alarmo_sensors_updated", async_update_sensor_config)
        )
        async_update_sensor_config()

    def __del__(self):
        """prepare for removal"""
        if self._state_listener:
            self._state_listener()
            self._state_listener = None
        while len(self._subscriptions):
            self._subscriptions.pop()()

    def async_watch_sensor_states(self, area_id: str = None, old_state: str = None, state: str = None):
        """watch sensors based on the state of the alarm entities."""
        sensors_list = []
        for area in self.hass.data[const.DOMAIN]["areas"].keys():
            sensors_list.extend(self.active_sensors_for_alarm_state(area))

        if self._state_listener:
            self._state_listener()

        if len(sensors_list):
            self._state_listener = async_track_state_change(
                self.hass, sensors_list, self.async_sensor_state_changed
            )
        else:
            self._state_listener = None

        # clear previous sensor group events which are not active for current alarm state
        for group_id in self._group_events.keys():
            self._group_events[group_id] = dict(filter(
                lambda el: el[0] in sensors_list,
                self._group_events[group_id].items()
            ))

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

    def validate_event(
        self,
        area_id: str = None,
        event: str = None,
        bypass_open_sensors: bool = False,
        arm_mode: str = None
    ) -> bool:
        """"check if sensors have correct state"""
        open_sensors = {}
        bypassed_sensors = []

        sensors_list = self.active_sensors_for_alarm_state(area_id)

        for entity in sensors_list:
            sensor_config = self._config[entity]
            if event == const.EVENT_LEAVE and sensor_config[ATTR_USE_EXIT_DELAY]:
                continue
            elif event in [const.EVENT_LEAVE, const.EVENT_ARM] and (
                sensor_config[ATTR_ALLOW_OPEN]
            ):
                continue

            state = parse_sensor_state(self.hass.states.get(entity))

            if state in [STATE_UNAVAILABLE, STATE_UNKNOWN] and not sensor_config[ATTR_TRIGGER_UNAVAILABLE]:
                continue
            elif state in [STATE_OPEN, STATE_UNAVAILABLE, STATE_UNKNOWN]:
                if bypass_open_sensors or (
                    sensor_config[ATTR_AUTO_BYPASS] and
                    arm_mode in sensor_config[ATTR_AUTO_BYPASS_MODES]
                ):
                    bypassed_sensors.append(entity)
                else:
                    open_sensors[entity] = state

        return (open_sensors, bypassed_sensors)

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

        open_sensors = {
            entity: new_state
        }

        # immediate trigger due to always on sensor
        if sensor_config[ATTR_ALWAYS_ON] and new_state in [STATE_OPEN, STATE_UNKNOWN, STATE_UNAVAILABLE]:
            open_sensors = self.process_group_event(entity, new_state, open_sensors)
            if not open_sensors:
                return
            _LOGGER.info("Alarm is triggered due to an always-on sensor: {}".format(entity))
            await alarm_entity.async_trigger(
                skip_delay=True,
                open_sensors=open_sensors
            )

        # initializing -> check if all sensors have a known state
        elif not alarm_entity.state and self.all_sensors_available_for_alarm(sensor_config["area"]):
            _LOGGER.debug("All sensors are initialized, restoring state")
            if alarm_entity.arm_mode:
                await alarm_entity.async_arm(alarm_entity.arm_mode, skip_delay=True)
            else:
                await alarm_entity.async_update_state(STATE_ALARM_DISARMED)

        # arming while immediate sensor is triggered -> cancel arm
        elif alarm_entity.state == STATE_ALARM_ARMING:
            if (
                new_state in [STATE_OPEN, STATE_UNKNOWN, STATE_UNAVAILABLE]
                and not sensor_config[ATTR_USE_ENTRY_DELAY]
                and not sensor_config[ATTR_ALLOW_OPEN]
            ):
                open_sensors = self.process_group_event(entity, new_state, open_sensors)
                if not open_sensors:
                    return
                await alarm_entity.async_arm_failure(open_sensors)
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
                open_sensors = self.process_group_event(entity, new_state, open_sensors)
                if not open_sensors:
                    return
                _LOGGER.info("Alarm is triggered due to sensor: {}".format(entity))
                await alarm_entity.async_trigger(
                    skip_delay=(not sensor_config[ATTR_USE_ENTRY_DELAY]),
                    open_sensors=open_sensors
                )

        # alarm is in pending -> check if pending time needs to be aborted
        elif (
            alarm_entity.state == STATE_ALARM_PENDING and
            not(sensor_config[ATTR_USE_ENTRY_DELAY])
        ):
            open_sensors = self.process_group_event(entity, new_state, open_sensors)
            if not open_sensors:
                return
            await alarm_entity.async_trigger(
                skip_delay=True,
                open_sensors=open_sensors
            )

    def all_sensors_available_for_alarm(self, area_id: str, init_state: str = None):
        """check whether all sensors are available such that the prior state can be restored"""
        sensors_list = self.active_sensors_for_alarm_state(area_id, init_state)
        passed = True

        for entity in sensors_list:
            state = self.hass.states.get(entity)
            if parse_sensor_state(state) not in [STATE_OPEN, STATE_CLOSED]:
                passed = False

        if not passed and init_state:
            # watch for sensors to become available
            self.async_watch_sensor_states(area_id)

        return passed

    def start_arm_timer(self, entity):
        """start timer for automatical arming"""

        @callback
        async def timer_finished(now):
            _LOGGER.debug("timer finished")
            sensor_config = self._config[entity]
            alarm_entity = self.hass.data[const.DOMAIN]["areas"][sensor_config["area"]]
            await alarm_entity.async_arm(alarm_entity.arm_mode, skip_delay=True)
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

    def process_group_event(self, entity: str, state: str, open_sensors: dict) -> dict:
        """check if sensor entity is member of a group and compare with previous events to evaluate trigger"""
        group_id = None
        for group in self._groups.values():
            if entity in group[ATTR_ENTITIES]:
                group_id = group[ATTR_GROUP_ID]
                break
        if group_id is None:
            return open_sensors

        group = self._groups[group_id]
        group_events = self._group_events[group_id] if group_id in self._group_events.keys() else {}
        now = dt_util.now()
        group_events[entity] = {
            ATTR_STATE: state,
            ATTR_LAST_TRIP_TIME: now
        }
        self._group_events[group_id] = group_events
        recent_events = {
            entity: (now - event[ATTR_LAST_TRIP_TIME]).total_seconds()
            for (entity, event) in group_events.items()
        }
        recent_events = dict(filter(lambda el: el[1] <= group[ATTR_TIMEOUT], recent_events.items()))
        if len(recent_events.keys()) < group[ATTR_EVENT_COUNT]:
            _LOGGER.debug("tripped sensor {} was ignored since it belongs to group {}".format(entity, group[ATTR_NAME]))
            return {}
        else:
            for entity in recent_events.keys():
                open_sensors[entity] = group_events[entity][ATTR_STATE]
            _LOGGER.debug("tripped sensor {} caused the triggering of group {}".format(entity, group[ATTR_NAME]))
            return open_sensors
