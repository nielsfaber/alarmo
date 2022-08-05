import logging

import homeassistant.util.dt as dt_util

from homeassistant.core import (
    HomeAssistant,
    callback,
    CoreState,
)

from homeassistant.helpers.event import (
    async_track_state_change,
    async_track_point_in_time,
)

from homeassistant.helpers.dispatcher import (
    async_dispatcher_connect,
)

from homeassistant.const import (
    EVENT_HOMEASSISTANT_STARTED,
    STATE_UNKNOWN,
    STATE_UNAVAILABLE,
    STATE_OPEN,
    STATE_CLOSED,
    STATE_ON,
    STATE_OFF,
    STATE_LOCKED,
    STATE_UNLOCKED,
    STATE_ALARM_PENDING,
    STATE_ALARM_ARMING,
    STATE_ALARM_TRIGGERED,
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
        return STATE_UNAVAILABLE
    elif state.state == STATE_UNAVAILABLE:
        return STATE_UNAVAILABLE
    elif state.state in SENSOR_STATES_OPEN:
        return STATE_OPEN
    elif state.state in SENSOR_STATES_CLOSED:
        return STATE_CLOSED
    else:
        return STATE_UNKNOWN


def sensor_state_allowed(state, sensor_config, alarm_state):
    """return whether the sensor state is permitted or a state change should occur"""

    if state != STATE_OPEN and (state != STATE_UNAVAILABLE or not sensor_config[ATTR_TRIGGER_UNAVAILABLE]):
        # sensor has the safe state
        return True

    elif alarm_state == STATE_ALARM_TRIGGERED:
        # alarm is already triggered
        return True

    elif sensor_config[ATTR_ALWAYS_ON]:
        # alarm should always be triggered by always-on sensor
        return False

    elif alarm_state == STATE_ALARM_ARMING and not sensor_config[ATTR_USE_EXIT_DELAY]:
        # arming should be aborted if sensor without exit delay is active
        return False

    elif alarm_state in const.ARM_MODES:
        # normal triggering case
        return False

    elif alarm_state == STATE_ALARM_PENDING and not sensor_config[ATTR_USE_ENTRY_DELAY]:
        # triggering of immediate sensor while alarm is pending
        return False

    else:
        return True


class SensorHandler:
    def __init__(self, hass: HomeAssistant):
        self._config = None
        self.hass = hass
        self._state_listener = None
        self._subscriptions = []
        self._arm_timers = {}
        self._groups = {}
        self._group_events = {}
        self._startup_complete = False

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

        def handle_startup(_event):
            self._startup_complete = True

        if hass.state == CoreState.running:
            self._startup_complete = True
        else:
            hass.bus.async_listen_once(EVENT_HOMEASSISTANT_STARTED, handle_startup)

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

        # handle initial sensor states
        if area_id and old_state is None:
            sensors_list = self.active_sensors_for_alarm_state(area_id)
            for entity in sensors_list:
                state = self.hass.states.get(entity)
                sensor_state = parse_sensor_state(state)
                if state and state.state and sensor_state != STATE_UNKNOWN:
                    _LOGGER.debug("Initial state for {} is {}".format(entity, parse_sensor_state(state)))

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
                state in config[const.ATTR_MODES]
                or config[ATTR_ALWAYS_ON]
            ):
                entities.append(entity)
        return entities

    def validate_arming_event(self, area_id: str, target_state: str = None, **kwargs):
        """check whether all sensors have the correct state prior to arming."""

        use_delay = kwargs.get("use_delay", False)
        bypass_open_sensors = kwargs.get("bypass_open_sensors", False)

        sensors_list = self.active_sensors_for_alarm_state(area_id, target_state)
        open_sensors = {}
        bypassed_sensors = []

        alarm_state = target_state
        if use_delay and alarm_state in const.ARM_MODES:
            alarm_state = STATE_ALARM_ARMING
        elif use_delay and alarm_state == STATE_ALARM_TRIGGERED:
            alarm_state = STATE_ALARM_PENDING

        for entity in sensors_list:
            sensor_config = self._config[entity]
            state = self.hass.states.get(entity)
            sensor_state = parse_sensor_state(state)
            if not state or not state.state:
                # entity does not exist in HA
                res = False
            else:
                res = sensor_state_allowed(sensor_state, sensor_config, alarm_state)

            if not res and target_state in const.ARM_MODES:
                # sensor is active while arming
                if sensor_config[ATTR_ALLOW_OPEN] and sensor_state == STATE_OPEN:
                    # sensor is permitted to be open during/after arming
                    continue
                elif bypass_open_sensors or (
                    sensor_config[ATTR_AUTO_BYPASS] and
                    target_state in sensor_config[ATTR_AUTO_BYPASS_MODES]
                ):
                    # sensor may be bypassed
                    bypassed_sensors.append(entity)
                else:
                    open_sensors[entity] = sensor_state

        return (open_sensors, bypassed_sensors)

    @callback
    async def async_sensor_state_changed(self, entity, old_state, new_state):
        """Callback fired when a sensor state has changed."""

        old_state = parse_sensor_state(old_state)
        new_state = parse_sensor_state(new_state)
        if old_state == STATE_UNKNOWN:
            # sensor is unknown at startup, state which comes after is considered as initial state
            _LOGGER.debug("Initial state for {} is {}".format(entity, new_state))
            return
        if old_state == new_state:
            # not a state change - ignore
            return

        _LOGGER.debug("entity {} changed: old_state={}, new_state={}".format(entity, old_state, new_state))

        sensor_config = self._config[entity]
        alarm_entity = self.hass.data[const.DOMAIN]["areas"][sensor_config["area"]]
        alarm_state = alarm_entity.state

        res = sensor_state_allowed(new_state, sensor_config, alarm_state)

        if sensor_config[ATTR_ARM_ON_CLOSE] and alarm_state == STATE_ALARM_ARMING:
            # we are arming and sensor is configured to arm on closing
            if new_state == STATE_CLOSED:
                self.start_arm_timer(entity)
            else:
                self.stop_arm_timer(entity)

        if res:
            # nothing to do here, sensor state is OK
            return

        open_sensors = self.process_group_event(entity, new_state)
        if not open_sensors:
            # triggered sensor is part of a group and should be ignored
            return

        if sensor_config[ATTR_ALWAYS_ON]:
            # immediate trigger due to always on sensor
            _LOGGER.info("Alarm is triggered due to an always-on sensor: {}".format(entity))
            await alarm_entity.async_trigger(
                skip_delay=True,
                open_sensors=open_sensors
            )

        elif alarm_state == STATE_ALARM_ARMING:
            # sensor triggered while arming, abort arming
            _LOGGER.debug("Arming was aborted due to a sensor being active: {}".format(entity))
            await alarm_entity.async_arm_failure(open_sensors)

        elif alarm_state in const.ARM_MODES:
            # standard alarm trigger
            _LOGGER.info("Alarm is triggered due to sensor: {}".format(entity))
            await alarm_entity.async_trigger(
                skip_delay=(not sensor_config[ATTR_USE_ENTRY_DELAY]),
                open_sensors=open_sensors
            )

        elif alarm_state == STATE_ALARM_PENDING:
            # immediate trigger while in pending state
            _LOGGER.info("Alarm is triggered due to sensor: {}".format(entity))
            await alarm_entity.async_trigger(
                skip_delay=True,
                open_sensors=open_sensors
            )

    def start_arm_timer(self, entity):
        """start timer for automatical arming"""

        @callback
        async def timer_finished(now):
            _LOGGER.debug("timer finished")
            sensor_config = self._config[entity]
            alarm_entity = self.hass.data[const.DOMAIN]["areas"][sensor_config["area"]]
            if alarm_entity.state == STATE_ALARM_ARMING:
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

    def process_group_event(self, entity: str, state: str) -> dict:
        """check if sensor entity is member of a group and compare with previous events to evaluate trigger"""
        group_id = None
        for group in self._groups.values():
            if entity in group[ATTR_ENTITIES]:
                group_id = group[ATTR_GROUP_ID]
                break

        open_sensors = {
            entity: state
        }
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
