import logging


from homeassistant.core import (
    HomeAssistant,
    callback,
)

from homeassistant.helpers.event import (
    async_track_state_change,
)

from homeassistant.const import (
    STATE_UNKNOWN,
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

from .const import (
    EVENT_ENTRY,
    EVENT_LEAVE,
    EVENT_ARM,
    ARM_MODES,
    ATTR_MODES,
)

from .automations import (
    EVENT_ARM_FAILURE
)

ATTR_IMMEDIATE = "immediate"
ATTR_ALWAYS_ON = "always_on"
ATTR_ARM_ON_CLOSE = "arm_on_close"
ATTR_ALLOW_OPEN = "allow_open"

SENSOR_STATES_OPEN = [STATE_ON, STATE_OPEN, STATE_UNLOCKED]
SENSOR_STATES_CLOSED = [STATE_OFF, STATE_CLOSED, STATE_LOCKED]

_LOGGER = logging.getLogger(__name__)


class SensorHandler:
    def __init__(self, hass: HomeAssistant, coordinator, alarmEntity):
        self._config = None
        self.hass = hass
        self.coordinator = coordinator
        self.alarm_entity = alarmEntity
        self._listener = None
        self._config = self.coordinator.store.async_get_sensors()
        self.coordinator.register_sensor_callback(self.async_load_config)
        self._bypass_mode = False
        self._open_sensors = None
        self._bypassed_sensors = None

    @property
    def open_sensors(self):
        """Get open sensors."""
        return self._open_sensors

    @open_sensors.setter
    def open_sensors(self, value):
        """Set open sensors."""
        if not self._open_sensors and type(value) is dict:
            self._open_sensors = value
        elif not value:
            self._open_sensors = None

    @property
    def bypassed_sensors(self):
        """Get bypassed sensors."""
        return self._bypassed_sensors

    @bypassed_sensors.setter
    def bypassed_sensors(self, value):
        """Set bypassed sensors."""
        if not self._bypassed_sensors and type(value) is list:
            self._bypassed_sensors = value
        elif not value:
            self._bypassed_sensors = None

    @callback
    def async_load_config(self):
        self._config = self.coordinator.store.async_get_sensors()

    def validate_event(self, event=None, state_filter=None, bypass_open_sensors=False) -> bool:
        """"check if sensors have correct state"""
        open_sensors = {}

        # store internally so we can take into account during leave time
        self._bypass_mode = bypass_open_sensors

        for entity, config in self._config.items():
            if not config[ATTR_ALWAYS_ON]:
                if self.alarm_entity.arm_mode not in config[ATTR_MODES]:
                    continue
                elif event == EVENT_LEAVE and not config[ATTR_IMMEDIATE]:
                    continue
                elif event == EVENT_ARM and config[ATTR_ALLOW_OPEN]:
                    continue

            if self.bypassed_sensors and entity in self.bypassed_sensors:
                continue

            state = self.hass.states.get(entity)

            if not state or not state.state:
                if not state_filter or state_filter == STATE_UNKNOWN:
                    open_sensors[entity] = state.state
            elif state.state in SENSOR_STATES_OPEN:
                if not state_filter or state_filter == STATE_OPEN:
                    open_sensors[entity] = state.state
            elif state.state not in SENSOR_STATES_CLOSED:
                if not state_filter or state_filter == STATE_UNKNOWN:
                    open_sensors[entity] = state.state

        if self._bypass_mode and event in [EVENT_LEAVE, EVENT_ARM]:
            if event == EVENT_ARM:
                # store failed sensors
                self.bypassed_sensors = list(open_sensors.keys())
            return True
        elif open_sensors:
            self.open_sensors = open_sensors
            return False
        else:
            return True

    @callback
    async def async_sensor_state_changed(self, entity, old_state, new_state):

        _LOGGER.debug("entity {} changed: old_state={}, new_state={}".format(entity, old_state, new_state))
        sensor_config = self._config[entity]

        # immediate trigger due to always on sensor
        if sensor_config[ATTR_ALWAYS_ON] and not self.validate_event(event=None, state_filter=STATE_OPEN):
            await self.alarm_entity.async_trigger(skip_delay=True)

        # initializing -> check if all sensors have a known state
        elif not self.alarm_entity.state and self.validate_event(event=EVENT_ARM, state_filter=STATE_UNKNOWN):
            await self.alarm_entity.async_arm(self.alarm_entity.arm_mode)

        # arming while immediate sensor is triggered -> cancel arm
        elif self.alarm_entity.state == STATE_ALARM_ARMING and not self.validate_event(event=EVENT_LEAVE):
            await self.alarm_entity.automations.async_handle_event(event=EVENT_ARM_FAILURE)
            await self.alarm_entity.async_update_state(STATE_ALARM_DISARMED)

        # alarm is armed -> check if need to be triggered
        elif self.alarm_entity.state in ARM_MODES:
            res = self.validate_event(event=EVENT_ENTRY)

            if not res and sensor_config[ATTR_IMMEDIATE]:
                await self.alarm_entity.async_trigger(skip_delay=True)
            elif not res:
                await self.alarm_entity.async_trigger()

        # alarm is in pending -> check if pending time needs to be aborted
        elif self.alarm_entity.state == STATE_ALARM_PENDING:
            if not res and sensor_config[ATTR_IMMEDIATE]:
                await self.alarm_entity.async_trigger(skip_delay=True)

    async def async_update_listener(self, state):

        entities = []
        for entity, config in self._config.items():
            if config[ATTR_ALWAYS_ON]:
                entities.append(entity)
            elif state != STATE_ALARM_DISARMED and self.alarm_entity.arm_mode in config[ATTR_MODES]:
                entities.append(entity)

        if self._listener:
            self._listener()
            self._listener = None

        if len(entities):
            self._listener = async_track_state_change(
                self.hass, entities, self.async_sensor_state_changed
            )
