"""Sensor handling for Alarmo integration."""

import logging
from types import SimpleNamespace

import homeassistant.util.dt as dt_util
from homeassistant.core import (
    CoreState,
    HomeAssistant,
    callback,
)
from homeassistant.const import (
    STATE_ON,
    ATTR_NAME,
    STATE_OFF,
    ATTR_STATE,
    STATE_OPEN,
    STATE_CLOSED,
    STATE_UNKNOWN,
    STATE_UNAVAILABLE,
    ATTR_LAST_TRIP_TIME,
    EVENT_HOMEASSISTANT_STARTED,
)
from homeassistant.helpers.event import (
    async_track_point_in_time,
    async_track_state_change_event,
)
from homeassistant.components.lock import LockState
from homeassistant.helpers.dispatcher import (
    async_dispatcher_connect,
)
from homeassistant.components.alarm_control_panel import AlarmControlPanelState

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
ATTR_NEW_ENTITY_ID = "new_entity_id"
ATTR_ENTRY_DELAY = "entry_delay"

SENSOR_STATES_OPEN = [STATE_ON, STATE_OPEN, LockState.UNLOCKED]
SENSOR_STATES_CLOSED = [STATE_OFF, STATE_CLOSED, LockState.LOCKED]


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
    """Parse the state of a sensor into open/closed/unavailable/unknown."""
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


def sensor_state_allowed(state, sensor_config, alarm_state):  # noqa: PLR0911
    """Return whether the sensor state is permitted or a state change should occur."""
    if state != STATE_OPEN and (
        state != STATE_UNAVAILABLE or not sensor_config[ATTR_TRIGGER_UNAVAILABLE]
    ):
        # sensor has the safe state
        return True

    elif alarm_state == AlarmControlPanelState.TRIGGERED:
        # alarm is already triggered
        return True

    elif sensor_config[ATTR_ALWAYS_ON]:
        # alarm should always be triggered by always-on sensor
        return False

    elif (
        alarm_state == AlarmControlPanelState.ARMING
        and not sensor_config[ATTR_USE_EXIT_DELAY]
    ):
        # arming should be aborted if sensor without exit delay is active
        return False

    elif alarm_state in const.ARM_MODES:
        # normal triggering case
        return False

    elif alarm_state == AlarmControlPanelState.PENDING:
        # Allow both immediate and delayed sensors
        #   during pending for timer shortening/immediate trigger
        # This enables per-sensor entry delay logic
        #   to process subsequent triggers during countdown
        return False

    else:
        return True


class SensorHandler:
    """Class to handle sensors for Alarmo."""

    def __init__(self, hass: HomeAssistant):
        """Initialize the sensor handler."""
        self._config = None
        self.hass = hass
        self._state_listener = None
        self._subscriptions = []
        self._arm_timers = {}
        self._groups = {}
        self._group_events = {}
        self._startup_complete = False
        self._unavailable_state_mem = {}

        @callback
        def async_update_sensor_config():
            """Sensor config updated, reload the configuration."""
            self._config = self.hass.data[const.DOMAIN][
                "coordinator"
            ].store.async_get_sensors()
            self._groups = self.hass.data[const.DOMAIN][
                "coordinator"
            ].store.async_get_sensor_groups()
            self._group_events = {}
            self.async_watch_sensor_states()

        # Store the callback for later registration
        self._async_update_sensor_config = async_update_sensor_config

        @callback
        def _setup_sensor_listeners():
            """Register sensor listeners and perform initial setup."""
            self._subscriptions.append(
                async_dispatcher_connect(
                    hass, "alarmo_state_updated", self.async_watch_sensor_states
                )
            )
            self._subscriptions.append(
                async_dispatcher_connect(
                    hass, "alarmo_sensors_updated", self._async_update_sensor_config
                )
            )
            # Do the initial sensor setup now that HA is running
            self._async_update_sensor_config()

            # Evaluate initial sensor states for all areas on startup
            for area_id in self.hass.data[const.DOMAIN]["areas"].keys():
                self.update_ready_to_arm_status(area_id)
                # If area is armed, validate sensors and trigger if needed
                # Schedule this to run in the event loop since it may call async methods
                hass.async_create_task(
                    self._async_evaluate_armed_state_on_startup(area_id)
                )

        def handle_startup(_event):
            self._startup_complete = True
            # Schedule the setup to run in the event loop (from thread pool executor)
            hass.loop.call_soon_threadsafe(_setup_sensor_listeners)

        if hass.state == CoreState.running:
            self._startup_complete = True
            # Schedule in event loop since we're in __init__ (sync context)
            hass.loop.call_soon_threadsafe(_setup_sensor_listeners)
        else:
            hass.bus.async_listen_once(EVENT_HOMEASSISTANT_STARTED, handle_startup)

    def __del__(self):
        """Prepare for removal."""
        if self._state_listener:
            self._state_listener()
            self._state_listener = None
        while len(self._subscriptions):
            self._subscriptions.pop()()

    def async_watch_sensor_states(
        self,
        area_id: str | None = None,
        old_state: str | None = None,
        state: str | None = None,
    ):
        """Watch sensors based on the state of the alarm entities."""
        watched_sensors_list = []
        for area in self.hass.data[const.DOMAIN]["areas"].keys():
            watched_sensors_list.extend(
                self.active_sensors_for_alarm_state(area, None, True)
            )

        if self._state_listener:
            self._state_listener()

        if watched_sensors_list:
            self._state_listener = async_track_state_change_event(
                self.hass, watched_sensors_list, self.async_sensor_state_changed
            )
        else:
            self._state_listener = None

        # clear previous sensor group events that are not active for current alarm state
        if self._group_events:
            active_sensors_list = []
            for area in self.hass.data[const.DOMAIN]["areas"].keys():
                active_sensors_list.extend(
                    self.active_sensors_for_alarm_state(area, None, False)
                )
            for group_id in self._group_events.keys():
                self._group_events[group_id] = dict(
                    filter(
                        lambda el: el[0] in active_sensors_list,
                        self._group_events[group_id].items(),
                    )
                )

        # handle initial sensor states
        if area_id and old_state is None:
            sensors_list = self.active_sensors_for_alarm_state(area_id)
            for entity in sensors_list:
                state = self.hass.states.get(entity)
                sensor_state = parse_sensor_state(state)
                if state and state.state and sensor_state != STATE_UNKNOWN:
                    _LOGGER.debug(
                        "Initial state for %s is %s",
                        entity,
                        parse_sensor_state(state),
                    )

        if area_id:
            self.update_ready_to_arm_status(area_id)

    def active_sensors_for_alarm_state(
        self,
        area_id: str,
        to_state: str | None = None,
        watch_ready_to_arm: bool = False,
    ):
        """Compose a list of sensors that are active for the state."""
        alarm_entity = self.hass.data[const.DOMAIN]["areas"][area_id]

        if to_state:
            state = to_state
        else:
            state = (
                alarm_entity.arm_mode if alarm_entity.arm_mode else alarm_entity.state
            )

        entities = []
        for entity, config in self._config.items():
            if config["area"] != area_id or not config["enabled"]:
                continue
            elif (
                alarm_entity.bypassed_sensors
                and entity in alarm_entity.bypassed_sensors
            ):
                continue
            elif state in config[const.ATTR_MODES] or config[ATTR_ALWAYS_ON]:
                entities.append(entity)
            elif (
                not to_state
                and config["type"] != SENSOR_TYPE_MOTION
                and watch_ready_to_arm
            ):
                # always watch all sensors other than motion sensors,
                #   to indicate readiness for arming
                entities.append(entity)

        return entities

    def validate_arming_event(
        self, area_id: str, target_state: str | None = None, **kwargs
    ):
        """Check whether all sensors have the correct state prior to arming."""
        use_delay = kwargs.get("use_delay", False)
        bypass_open_sensors = kwargs.get("bypass_open_sensors", False)

        sensors_list = self.active_sensors_for_alarm_state(area_id, target_state)
        open_sensors = {}
        bypassed_sensors = []

        alarm_state = target_state
        if use_delay and alarm_state in const.ARM_MODES:
            alarm_state = AlarmControlPanelState.ARMING
        elif use_delay and alarm_state == AlarmControlPanelState.TRIGGERED:
            alarm_state = AlarmControlPanelState.PENDING

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
                if bypass_open_sensors or (
                    sensor_config[ATTR_AUTO_BYPASS]
                    and target_state in sensor_config[ATTR_AUTO_BYPASS_MODES]
                ):
                    # sensor may be bypassed
                    bypassed_sensors.append(entity)
                elif sensor_config[ATTR_ALLOW_OPEN] and sensor_state == STATE_OPEN:
                    # sensor is permitted to be open during/after arming
                    continue
                else:
                    open_sensors[entity] = sensor_state

        return (open_sensors, bypassed_sensors)

    def get_entry_delay_for_trigger(
        self, open_sensors: dict[str, str], area_id: str, arm_mode: str
    ) -> int | None:
        """Calculate entry delay based on type of sensor trigger."""
        # Check if this is a group trigger
        if ATTR_GROUP_ID in open_sensors:
            # For groups: only check for immediate triggers, otherwise use area default
            for entity_id in open_sensors:
                if entity_id != ATTR_GROUP_ID and entity_id in self._config:
                    sensor_config = self._config[entity_id]
                    if not sensor_config[ATTR_USE_ENTRY_DELAY]:
                        return 0

            # Groups always use area default (maintainer's preference)
            return None
        else:
            # Individual sensor trigger
            entity_id = next(iter(open_sensors.keys()))
            sensor_config = self._config[entity_id]

            if not sensor_config[ATTR_USE_ENTRY_DELAY]:
                return 0

            # Use sensor's entry delay if set
            if (
                ATTR_ENTRY_DELAY in sensor_config
                and sensor_config[ATTR_ENTRY_DELAY] is not None
            ):
                return sensor_config[ATTR_ENTRY_DELAY]

        # Fall back to area default (None means use area default)
        return None

    @callback
    def async_sensor_state_changed(self, event):  # noqa: PLR0915, PLR0912
        """Callback fired when a sensor state has changed."""
        entity = event.data["entity_id"]
        old_state = parse_sensor_state(event.data["old_state"])
        new_state = parse_sensor_state(event.data["new_state"])
        sensor_config = self._config[entity]
        if old_state == STATE_UNKNOWN:
            # sensor is unknown at startup,
            #   state which comes after is considered as initial state
            _LOGGER.debug(
                "Initial state for %s is %s",
                entity,
                new_state,
            )
            self.update_ready_to_arm_status(sensor_config["area"])
            return
        if old_state == new_state:
            # not a state change - ignore
            return

        _LOGGER.debug(
            "entity %s changed: old_state=%s, new_state=%s",
            entity,
            old_state,
            new_state,
        )

        if (
            new_state == STATE_UNAVAILABLE
            and not sensor_config[ATTR_TRIGGER_UNAVAILABLE]
        ):
            # temporarily store the prior state until the sensor becomes available again
            self._unavailable_state_mem[entity] = old_state
        elif entity in self._unavailable_state_mem:
            # if sensor was unavailable, check the state before that,
            #   do not act if the sensor reverted to its prior state.
            prior_state = self._unavailable_state_mem.pop(entity)
            if old_state == STATE_UNAVAILABLE and prior_state == new_state:
                _LOGGER.debug(
                    "state transition from %s to %s to %s detected, ignoring.",
                    prior_state,
                    old_state,
                    new_state,
                )
                return

        alarm_entity = self.hass.data[const.DOMAIN]["areas"][sensor_config["area"]]
        alarm_state = alarm_entity.state

        if (
            alarm_entity.arm_mode
            and alarm_entity.arm_mode not in sensor_config[const.ATTR_MODES]
            and not sensor_config[ATTR_ALWAYS_ON]
        ):
            # sensor is not active in this arm mode, ignore
            self.update_ready_to_arm_status(sensor_config["area"])
            return

        res = sensor_state_allowed(new_state, sensor_config, alarm_state)

        if (
            sensor_config[ATTR_ARM_ON_CLOSE]
            and alarm_state == AlarmControlPanelState.ARMING
        ):
            # we are arming and sensor is configured to arm on closing
            if new_state == STATE_CLOSED:
                self.start_arm_timer(entity)
            else:
                self.stop_arm_timer(entity)

        if res:
            # nothing to do here, sensor state is OK
            self.update_ready_to_arm_status(sensor_config["area"])
            return

        open_sensors = self.process_group_event(entity, new_state)
        if not open_sensors:
            # triggered sensor is part of a group and should be ignored
            self.update_ready_to_arm_status(sensor_config["area"])
            return

        if sensor_config[ATTR_ALWAYS_ON]:
            # immediate trigger due to always on sensor
            _LOGGER.info(
                "Alarm is triggered due to an always-on sensor: %s",
                entity,
            )
            alarm_entity.async_trigger(entry_delay=0, open_sensors=open_sensors)

        elif alarm_state == AlarmControlPanelState.ARMING:
            # sensor triggered while arming, abort arming
            _LOGGER.debug(
                "Arming was aborted due to a sensor being active: %s",
                entity,
            )
            alarm_entity.async_arm_failure(open_sensors)

        elif alarm_state in const.ARM_MODES:
            # standard alarm trigger - calculate entry delay override
            _LOGGER.info(
                "Alarm is triggered due to sensor: %s",
                entity,
            )
            entry_delay = self.get_entry_delay_for_trigger(
                open_sensors, sensor_config["area"], alarm_entity.arm_mode
            )
            # remove group_id from open_sensors (only used for entry delay calculation)
            open_sensors.pop(ATTR_GROUP_ID, None)
            if entry_delay == 0:
                # immediate trigger (no entry delay)
                alarm_entity.async_trigger(entry_delay=0, open_sensors=open_sensors)
            else:
                # use calculated delay (could be None for area default)
                alarm_entity.async_trigger(
                    entry_delay=entry_delay, open_sensors=open_sensors
                )

        elif alarm_state == AlarmControlPanelState.PENDING:
            # trigger while in pending state
            #   calculate entry delay for possible timer shortening
            _LOGGER.info(
                "Alarm is triggered due to sensor: %s",
                entity,
            )
            entry_delay = self.get_entry_delay_for_trigger(
                open_sensors, sensor_config["area"], alarm_entity.arm_mode
            )
            # remove group_id from open_sensors (only used for entry delay calculation)
            open_sensors.pop(ATTR_GROUP_ID, None)

            if entry_delay == 0:
                # immediate trigger
                alarm_entity.async_trigger(entry_delay=0, open_sensors=open_sensors)
            else:
                # use calculated delay for possible timer shortening
                alarm_entity.async_trigger(
                    entry_delay=entry_delay, open_sensors=open_sensors
                )

        self.update_ready_to_arm_status(sensor_config["area"])

    def start_arm_timer(self, entity):
        """Start timer for automatical arming."""

        @callback
        def timer_finished(now):
            _LOGGER.debug("timer finished")
            sensor_config = self._config[entity]
            alarm_entity = self.hass.data[const.DOMAIN]["areas"][sensor_config["area"]]
            if alarm_entity.state == AlarmControlPanelState.ARMING:
                alarm_entity.async_arm(alarm_entity.arm_mode, skip_delay=True)

        now = dt_util.utcnow()

        if entity in self._arm_timers:
            self.stop_arm_timer(entity)

        self._arm_timers[entity] = async_track_point_in_time(
            self.hass, timer_finished, now + const.SENSOR_ARM_TIME
        )

    def stop_arm_timer(self, entity=None):
        """Cancel timer(s) for automatical arming."""
        if entity and entity in self._arm_timers:
            self._arm_timers[entity]()
        elif not entity:
            for key in self._arm_timers.keys():
                self._arm_timers[key]()

    def process_group_event(self, entity: str, state: str) -> dict:
        """Check if sensor entity is member of a group to evaluate trigger."""
        group_id = None
        for group in self._groups.values():
            if entity in group[ATTR_ENTITIES]:
                group_id = group[ATTR_GROUP_ID]
                break

        open_sensors = {entity: state}
        if group_id is None:
            return open_sensors

        group = self._groups[group_id]
        group_events = (
            self._group_events[group_id]
            if group_id in self._group_events.keys()
            else {}
        )
        now = dt_util.now()
        group_events[entity] = {ATTR_STATE: state, ATTR_LAST_TRIP_TIME: now}
        self._group_events[group_id] = group_events
        recent_events = {
            entity: (now - event[ATTR_LAST_TRIP_TIME]).total_seconds()
            for (entity, event) in group_events.items()
        }
        recent_events = dict(
            filter(lambda el: el[1] <= group[ATTR_TIMEOUT], recent_events.items())
        )
        if len(recent_events.keys()) < group[ATTR_EVENT_COUNT]:
            _LOGGER.debug(
                "tripped sensor %s was ignored since it belongs to group %s",
                entity,
                group[ATTR_NAME],
            )
            return {}
        else:
            # add all (recently) triggered sensors to open_sensors
            for entity_id in recent_events.keys():
                open_sensors[entity_id] = group_events[entity_id][ATTR_STATE]

            # Add group info for override delay calculation
            open_sensors[ATTR_GROUP_ID] = group_id
            _LOGGER.debug(
                "tripped sensor %s caused the triggering of group %s",
                entity,
                group[ATTR_NAME],
            )
            return open_sensors

    def update_ready_to_arm_status(self, area_id):
        """Calculate whether the system is ready for arming."""
        alarm_entity = self.hass.data[const.DOMAIN]["areas"][area_id]

        arm_modes = [
            mode
            for (mode, config) in alarm_entity._config[const.ATTR_MODES].items()
            if config[const.ATTR_ENABLED]
        ]

        if alarm_entity.state in const.ARM_MODES or (
            alarm_entity.state == AlarmControlPanelState.ARMING
            and alarm_entity.arm_mode
        ):
            arm_modes.remove(alarm_entity.arm_mode)

        def arm_mode_is_ready(mode):
            (blocking_sensors, _bypassed_sensors) = self.validate_arming_event(
                area_id, mode
            )
            if alarm_entity.state == AlarmControlPanelState.DISARMED:
                # exclude motion sensors when determining readiness
                blocking_sensors = dict(
                    filter(
                        lambda el: self._config[el[0]]["type"] != SENSOR_TYPE_MOTION,
                        blocking_sensors.items(),
                    )
                )
            result = not (blocking_sensors)
            return result

        arm_modes = list(filter(arm_mode_is_ready, arm_modes))
        prev_arm_modes = alarm_entity._ready_to_arm_modes

        if arm_modes != prev_arm_modes:
            alarm_entity.update_ready_to_arm_modes(arm_modes)

    async def _async_evaluate_armed_state_on_startup(self, area_id):
        """Evaluate sensors when alarm is armed on startup and trigger if necessary.

        On startup, we don't know the actual previous state of sensors
        (they might have changed while HA was down).
        This method simulates state changes for all sensors currently in violation,
        allowing the standard async_sensor_state_changed logic to re-evaluate them
        with full group logic, entry delays, etc.
        """
        alarm_entity = self.hass.data[const.DOMAIN]["areas"][area_id]

        # Only evaluate if the alarm is in an armed state
        if alarm_entity.state not in const.ARM_MODES:
            return

        _LOGGER.debug(
            "Evaluating sensors on startup for area %s (state: %s)",
            area_id,
            alarm_entity.state,
        )

        # Get all active sensors for the current armed mode
        sensors_list = self.active_sensors_for_alarm_state(area_id)

        for entity_id in sensors_list:
            sensor_config = self._config[entity_id]
            state = self.hass.states.get(entity_id)
            sensor_state = parse_sensor_state(state)

            if sensor_state == STATE_UNKNOWN:
                # Skip unknown sensors - they'll be handled when they become known
                continue

            # Check if sensor state is allowed in current alarm state
            res = sensor_state_allowed(sensor_state, sensor_config, alarm_entity.state)

            if not res:
                # Sensor is in a violation state
                #   (open or unavailable when it shouldn't be)
                # Simulate a state change to trigger standard processing
                _LOGGER.info(
                    "Sensor %s is %s on startup while alarm is %s - simulating state change for evaluation",  # noqa: E501
                    entity_id,
                    sensor_state,
                    alarm_entity.state,
                )

                # Create a synthetic event that mimics
                #   a state change from closed to current state
                # We use STATE_CLOSED as old state
                #   (not STATE_UNKNOWN which would trigger early return)
                old_state = SimpleNamespace(state=STATE_CLOSED)

                # Create event with the structure expected by async_sensor_state_changed
                event = SimpleNamespace(
                    data={
                        "entity_id": entity_id,
                        "old_state": old_state,
                        "new_state": state,
                    }
                )

                # Process through the standard sensor state change handler
                # This will handle groups, entry delays, always-on sensors, etc.
                self.async_sensor_state_changed(event)
