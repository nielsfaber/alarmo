"""Initialization of Alarmo alarm_control_panel platform."""
import datetime
import copy
import logging
import datetime

# from homeassistant.components.alarm_control_panel import DOMAIN as PLATFORM
from homeassistant.core import (
    HomeAssistant,
    callback,
)
from homeassistant.helpers import entity_platform
from homeassistant.helpers.event import (
    async_track_point_in_time,
    async_track_state_change,
)
from homeassistant.helpers.service import async_call_from_config
from homeassistant.helpers.restore_state import RestoreEntity
import homeassistant.util.dt as dt_util
from homeassistant.components.alarm_control_panel import (
    AlarmControlPanelEntity,
    FORMAT_NUMBER as CODE_FORMAT_NUMBER,
    FORMAT_TEXT as CODE_FORMAT_TEXT,
    ATTR_CODE_ARM_REQUIRED,
)

from .helpers import (
    modes_to_supported_features,
    supported_features_to_modes,
    import_sensor_config,
    export_sensor_config,
    state_to_arm_mode,
    arm_mode_to_state,
    export_delay_config,
    import_delay_config,
    import_user_config,
    export_generic_config,
    import_generic_config,
)

from homeassistant.const import (
    ATTR_CODE,
    ATTR_ENTITY_ID,
    ATTR_CODE_FORMAT,
    STATE_ALARM_ARMED_AWAY,
    STATE_ALARM_ARMED_HOME,
    STATE_ALARM_ARMED_NIGHT,
    STATE_ALARM_ARMED_CUSTOM_BYPASS,
    STATE_ALARM_DISARMED,
    STATE_ALARM_TRIGGERED,
    STATE_ALARM_PENDING,
    STATE_ALARM_ARMING,
    STATE_UNKNOWN,
    ATTR_STATE,
)
from .const import (
    DOMAIN,
    VERSION,
    NAME,
    MANUFACTURER,
    ALARM_ENTITY,
    SERVICE_EDIT_CONFIG,
    SCHEMA_EDIT_CONFIG,
    COMMAND_REMOVE_SENSOR,
    COMMAND_EDIT_SENSOR,
    COMMAND_EDIT_MODE,
    ATTR_MODE,
    ATTR_MODES,
    ATTR_IMMEDIATE,
    ATTR_DELAYS,
    ATTR_SENSORS,
    ATTR_USERS,
    ATTR_SUPPORTED_FEATURES,
    ATTR_ENABLED,
    DEFAULT_CONFIG_MODES,
    DEFAULT_CONFIG_DELAYS,
    EVENT_LEAVE,
    EVENT_ARM,
    EVENT_ENTRY,
    EVENT_TRIGGER,
    SENSOR_STATES_OPEN,
    SENSOR_STATES_CLOSED,
    SENSOR_STATE_OPEN,
    SENSOR_STATE_CLOSED,
    SENSOR_STATE_INDETERMINATE,
    ATTR_NAME,
    ATTR_REMOVE,
    ATTR_CODE_DISARM_REQUIRED,
    ATTR_CONFIG,
    ATTR_CAN_ARM,
    ATTR_CAN_DISARM,
    ATTR_TRIGGER_TIME,
    ATTR_DISARM_AFTER_TRIGGER,
    ATTR_LAST_STATE,
    ATTR_EVENT,
    ATTR_OPEN_SENSORS,
    ATTR_PUSH_TARGET,
    ATTR_SIREN_ENTITY,
    INITIALIZATION_TIME,
)
from .panel import async_register_panel

_LOGGER = logging.getLogger(__name__)

ARMED_STATES = [
    STATE_ALARM_ARMED_AWAY,
    STATE_ALARM_ARMED_HOME,
    STATE_ALARM_ARMED_NIGHT,
    STATE_ALARM_ARMED_CUSTOM_BYPASS,
]


def entity_exists_in_hass(hass, entity_id):
    """Check that an entity exists."""
    return hass.states.get(entity_id) is not None


async def async_setup(hass, config):
    """Track states and offer events for binary sensors."""
    return True


async def async_setup_platform(hass, config, async_add_entities, discovery_info=None):
    """Set up the platform from config."""
    return True


async def async_setup_entry(hass, config_entry, async_add_devices):
    """Set up the Alarmo entities. """
    _LOGGER.debug("async_setup_entry")
    coordinator = hass.data[DOMAIN][config_entry.entry_id]

    # Create alarm entity
    entity = AlarmoEntity(hass=hass, coordinator=coordinator, entity_id=ALARM_ENTITY)

    async_add_devices([entity])

    # register services
    platform = entity_platform.current_platform.get()

    platform.async_register_entity_service(
        SERVICE_EDIT_CONFIG, SCHEMA_EDIT_CONFIG, "async_edit_config"
    )

    # Register the panel
    await async_register_panel(hass)


class AlarmoEntity(AlarmControlPanelEntity, RestoreEntity):
    """Defines a base alarm_control_panel entity."""

    def __init__(self, hass, coordinator, entity_id: str) -> None:
        """Initialize the alarm_control_panel entity."""
        self.coordinator = coordinator
        self.entity_id = entity_id
        self._name = NAME
        self._state = None
        self._hass = hass
        self._code_format = CODE_FORMAT_NUMBER
        self._code_arm_required = False
        self._code_disarm_required = False
        self._disarm_after_trigger = False
        self._code = None
        self._config = {
            ATTR_MODES: DEFAULT_CONFIG_MODES,
            ATTR_DELAYS: DEFAULT_CONFIG_DELAYS,
            ATTR_SENSORS: {},
            ATTR_USERS: self.coordinator.get_users(),
            ATTR_CONFIG: import_generic_config(0),
        }
        self._timer = None
        self._sensor_listener = None
        self._arm_mode = None
        self._push_target = None
        self._siren_entity = None

    @property
    def device_info(self) -> dict:
        """Return info for device registry."""
        _LOGGER.debug("device info")
        device = self.coordinator.id
        return {
            "identifiers": {(DOMAIN, device)},
            "name": NAME,
            "model": NAME,
            "sw_version": VERSION,
            "manufacturer": MANUFACTURER,
        }

    @property
    def unique_id(self):
        """Return a unique ID to use for this entity."""
        return f"{self.entity_id}"

    @property
    def name(self) -> str:
        """Return the name of the device."""
        return self._name

    @property
    def icon(self):
        """Return icon."""
        return "mdi:shield-home"

    @property
    def should_poll(self) -> bool:
        """Return the polling state."""
        return False

    @property
    def code_format(self):
        """Return one or more digits/characters."""
        return self._code_format

    @property
    def state(self):
        """Return the state of the device."""
        return self._state

    @property
    def supported_features(self) -> int:
        """Return the list of supported features."""
        return modes_to_supported_features(self._config[ATTR_MODES])

    @property
    def code_arm_required(self):
        """Whether the code is required for arm actions."""
        return self._code_arm_required

    @property
    def device_state_attributes(self):
        """Return the data of the entity."""

        output = {
            ATTR_CONFIG: export_generic_config(self._config[ATTR_CONFIG]),
            ATTR_SENSORS: {
                entity: export_sensor_config(val)
                for entity, val in self._config[ATTR_SENSORS].items()
            },
            ATTR_DELAYS: export_delay_config(self._config[ATTR_DELAYS]),
            ATTR_USERS: self._config[ATTR_USERS],
        }
        if self._arm_mode:
            output[ATTR_MODE] = self._arm_mode
        if self._push_target:
            output[ATTR_PUSH_TARGET] = self._push_target
        if self._siren_entity:
            output[ATTR_SIREN_ENTITY] = self._siren_entity

        return output

    def _validate_code(self, code, state):
        """Validate given code."""
        if (
            not self._config[ATTR_CONFIG][ATTR_CODE_DISARM_REQUIRED]
            and state == STATE_ALARM_DISARMED
        ):
            return True
        elif not self._code_arm_required and state in ARMED_STATES:
            return True
        elif not len(self._config[ATTR_USERS]):
            return True
        elif not code or not len(code):
            return False

        res = self.coordinator.authenticate_user(code)
        if not res:
            _LOGGER.debug("authenticated failed")
            return False

        user_config = import_user_config(res[ATTR_CONFIG])
        if not user_config[ATTR_CAN_ARM] and state in ARMED_STATES:
            return False
        elif not user_config[ATTR_CAN_DISARM] and state == STATE_ALARM_DISARMED:
            return False
        _LOGGER.debug("authenticated by user {}".format(res[ATTR_NAME]))
        return True

    async def async_alarm_disarm(self, code=None):
        """Send disarm command."""
        _LOGGER.debug("alarm_disarm")
        if not self._validate_code(code, STATE_ALARM_DISARMED):
            return

        await self._async_process_command(STATE_ALARM_DISARMED)

    async def async_alarm_arm_away(self, code=None):
        """Send arm away command."""
        _LOGGER.debug("alarm_arm_away")
        if self._state != STATE_ALARM_DISARMED or not self._validate_code(
            code, STATE_ALARM_ARMED_AWAY
        ):
            return

        await self._async_process_command(STATE_ALARM_ARMED_AWAY)

    async def async_alarm_arm_home(self, code=None):
        """Send arm home command."""
        _LOGGER.debug("alarm_arm_home")
        if self._state != STATE_ALARM_DISARMED or not self._validate_code(
            code, STATE_ALARM_ARMED_HOME
        ):
            return

        await self._async_process_command(STATE_ALARM_ARMED_HOME)

    async def async_alarm_arm_night(self, code=None):
        """Send arm night command."""
        _LOGGER.debug("alarm_arm_night")
        if self._state != STATE_ALARM_DISARMED or not self._validate_code(
            code, STATE_ALARM_ARMED_NIGHT
        ):
            return

        await self._async_process_command(STATE_ALARM_ARMED_NIGHT)

    async def async_alarm_arm_custom_bypass(self, code=None):
        """Send arm night command."""
        _LOGGER.debug("alarm_arm_night")
        if self._state != STATE_ALARM_DISARMED or not self._validate_code(
            code, STATE_ALARM_ARMED_CUSTOM_BYPASS
        ):
            return

        await self._async_process_command(STATE_ALARM_ARMED_CUSTOM_BYPASS)

    async def async_added_to_hass(self):
        """Connect to dispatcher listening for entity data notifications."""
        await super().async_added_to_hass()
        _LOGGER.debug("async_added_to_hass")
        state = await self.async_get_last_state()

        # restore previous configuration
        if state:
            if ATTR_SUPPORTED_FEATURES in state.attributes:
                self._config[ATTR_MODES] = supported_features_to_modes(
                    state.attributes[ATTR_SUPPORTED_FEATURES]
                )

            if ATTR_SENSORS in state.attributes:
                config = {
                    entity: import_sensor_config(val)
                    for entity, val in state.attributes[ATTR_SENSORS].items()
                }
                self._config[ATTR_SENSORS] = config

            if ATTR_DELAYS in state.attributes:
                self._config[ATTR_DELAYS] = import_delay_config(
                    state.attributes[ATTR_DELAYS], self._config[ATTR_MODES]
                )

            if ATTR_CONFIG in state.attributes:
                self._config[ATTR_CONFIG] = import_generic_config(
                    state.attributes[ATTR_CONFIG]
                )

            if "code_arm_required" in state.attributes:
                self._code_arm_required = state.attributes["code_arm_required"]

            if "code_format" in state.attributes:
                self._code_format = state.attributes["code_format"]

            if ATTR_MODE in state.attributes:
                self._arm_mode = state.attributes[ATTR_MODE]

            if ATTR_PUSH_TARGET in state.attributes:
                self._push_target = state.attributes[ATTR_PUSH_TARGET]

            if ATTR_SIREN_ENTITY in state.attributes:
                self._siren_entity = state.attributes[ATTR_SIREN_ENTITY]

            # restore previous state
            if state.state in ARMED_STATES:

                @callback
                async def async_initialization_timer_finished(now):
                    """Update state at a scheduled point in time."""
                    target_state = arm_mode_to_state(self._arm_mode)
                    await self._async_process_command(target_state)

                now = dt_util.utcnow()
                self._timer = async_track_point_in_time(
                    self._hass,
                    async_initialization_timer_finished,
                    now + INITIALIZATION_TIME,
                )
                await self._async_register_sensor_listeners()

            elif state.state == STATE_ALARM_ARMING:
                target_state = arm_mode_to_state(self._arm_mode)
                await self._async_process_command(target_state)
            elif state.state == STATE_ALARM_PENDING:
                await self._async_process_command(
                    STATE_ALARM_TRIGGERED, skip_delay=True
                )
            elif state.state == STATE_ALARM_TRIGGERED:
                await self._async_process_command(STATE_ALARM_TRIGGERED)
            else:
                self._state = STATE_ALARM_DISARMED

            # # fallback in case restore was unsuccessful
            # if not self._state:
            #     _LOGGER.error("failed to initialize state! falling back to disarmed")
            #     self._state = STATE_ALARM_DISARMED

        else:
            self._state = STATE_ALARM_DISARMED

        self.async_write_ha_state()

    @callback
    async def async_edit_config(
        self,
        edit_sensor=None,
        remove_sensor=None,
        edit_mode=None,
        edit_general=None,
        add_user=None,
        edit_user=None,
        config_code=None,
        edit_actions=None,
    ):

        if (
            self._state != STATE_ALARM_DISARMED
        ):  # only allow configuration changes when disarmed!
            return

        if edit_sensor:  # add or update a sensor
            entity = edit_sensor[ATTR_ENTITY_ID]
            config = self._config[ATTR_SENSORS]
            config[entity] = edit_sensor
            self._config[ATTR_SENSORS] = copy.deepcopy(config)

        elif remove_sensor:
            entity = remove_sensor[ATTR_ENTITY_ID]
            config = self._config[ATTR_SENSORS]
            if entity in config:
                del config[entity]
            self._config[ATTR_SENSORS] = copy.deepcopy(config)

        elif edit_mode:
            mode = edit_mode[ATTR_MODE]
            if (
                ATTR_ENABLED in edit_mode and not edit_mode[ATTR_ENABLED]
            ):  # remove a mode
                if mode in self._config[ATTR_MODES]:  # remove it from the list
                    self._config[ATTR_MODES].remove(mode)
                for (event, cfg) in self._config[ATTR_DELAYS].items():
                    if mode in cfg:  # remove delay properties
                        del self._config[ATTR_DELAYS][event][mode]
            else:
                if not mode in self._config[ATTR_MODES]:  # add a new mode
                    self._config[ATTR_MODES].append(mode)
                    for event in [EVENT_LEAVE, EVENT_ENTRY, EVENT_TRIGGER]:
                        if not event in self._config[ATTR_DELAYS]:
                            self._config[ATTR_DELAYS][event] = {}
                        if (
                            not mode in self._config[ATTR_DELAYS][event]
                        ):  # add delay properties
                            self._config[ATTR_DELAYS][event][mode] = None

                if ATTR_DELAYS in edit_mode:
                    for (event, val) in edit_mode[ATTR_DELAYS].items():
                        self._config[ATTR_DELAYS][event][mode] = val

        elif edit_general:
            if ATTR_TRIGGER_TIME in edit_general:
                if not EVENT_TRIGGER in self._config[ATTR_DELAYS]:
                    self._config[ATTR_DELAYS][EVENT_TRIGGER] = {}
                for mode in self._config[ATTR_MODES]:
                    self._config[ATTR_DELAYS][EVENT_TRIGGER][mode] = edit_general[
                        ATTR_TRIGGER_TIME
                    ]

            if ATTR_DISARM_AFTER_TRIGGER in edit_general:
                self._config[ATTR_CONFIG][ATTR_DISARM_AFTER_TRIGGER] = edit_general[
                    ATTR_DISARM_AFTER_TRIGGER
                ]

        elif add_user:
            self.coordinator.create_user(add_user)
            self._config[ATTR_USERS] = self.coordinator.get_users()

        elif edit_user:
            name = edit_user[ATTR_NAME]

            if ATTR_REMOVE in edit_user and edit_user[ATTR_REMOVE]:
                self.coordinator.remove_user(name)
            else:
                self.coordinator.edit_user(edit_user)

            self._config[ATTR_USERS] = self.coordinator.get_users()

        elif config_code:
            self._code_arm_required = config_code[ATTR_CODE_ARM_REQUIRED]
            self._config[ATTR_CONFIG][ATTR_CODE_DISARM_REQUIRED] = config_code[
                ATTR_CODE_DISARM_REQUIRED
            ]
            self._code_format = config_code[ATTR_CODE_FORMAT]

        elif edit_actions:
            if ATTR_PUSH_TARGET in edit_actions:
                self._push_target = edit_actions[ATTR_PUSH_TARGET]
            else:
                self._push_target = None

            if ATTR_SIREN_ENTITY in edit_actions:
                self._siren_entity = edit_actions[ATTR_SIREN_ENTITY]
            else:
                self._siren_entity = None

        self._state = STATE_ALARM_DISARMED  # make sure there is something to update
        self.async_write_ha_state()

    def _validate_sensors(self, event=None, state_filter=None):
        open_sensors = {}  # empty dict = falsy

        for entity, config in self._config[ATTR_SENSORS].items():
            if not self._arm_mode in config[ATTR_MODES]:
                continue
            elif not config[ATTR_IMMEDIATE] and event == EVENT_LEAVE:
                continue

            state = self.hass.states.get(entity)

            if not state or not state.state:
                open_sensors[entity] = SENSOR_STATE_INDETERMINATE
            elif state.state in SENSOR_STATES_OPEN:
                open_sensors[entity] = SENSOR_STATE_OPEN
            elif state.state not in SENSOR_STATES_CLOSED:
                open_sensors[entity] = SENSOR_STATE_INDETERMINATE

        if state_filter:
            open_sensors = {k: v for k, v in open_sensors.items() if v == state_filter}

        return open_sensors

    def get_delay_config(self, event):
        if not event in self._config[ATTR_DELAYS]:
            return None
        cfg = self._config[ATTR_DELAYS][event]

        if type(cfg) == type({}):
            if self._arm_mode in cfg:
                return cfg[self._arm_mode]
            else:
                return None
        else:
            return cfg

    async def _async_process_command(self, state, skip_delay=False):
        """Update the state."""
        _LOGGER.debug("request to update state to {}".format(state))
        if self._state == state:
            return

        previous_state = self._state
        now = dt_util.utcnow()

        # ARM request
        if state in ARMED_STATES:
            self._arm_mode = state_to_arm_mode(state)

            if (
                previous_state != STATE_ALARM_DISARMED or skip_delay
            ):  # immediate arm event
                open_sensors = self._validate_sensors(event=EVENT_ARM)

                if open_sensors:  # abort the arm
                    self._unregister_sensor_listeners()
                    self._state = STATE_ALARM_DISARMED
                else:
                    await self._async_register_sensor_listeners()
                    self._state = state
                await self._async_handle_actions(
                    last_state=previous_state, open_sensors=open_sensors
                )

            else:  # normal arm event (from disarmed)
                delay = self.get_delay_config(EVENT_LEAVE)
                if not delay:  # immediate arming
                    await self._async_process_command(state, skip_delay=True)
                    return

                open_sensors = self._validate_sensors(event=EVENT_LEAVE)
                if not open_sensors:
                    await self._async_register_sensor_listeners()

                    @callback
                    async def async_leave_timer_finished(now):
                        """Update state at a scheduled point in time."""
                        _LOGGER.debug("async_leave_timer_finished")
                        await self._async_process_command(state)

                    self._timer = async_track_point_in_time(
                        self._hass, async_leave_timer_finished, now + delay
                    )
                    self._state = STATE_ALARM_ARMING

                await self._async_handle_actions(
                    last_state=previous_state, open_sensors=open_sensors
                )

        # DISARM request
        elif state == STATE_ALARM_DISARMED:
            self._unregister_sensor_listeners()
            self._cancel_timer()
            self._state = STATE_ALARM_DISARMED
            await self._async_handle_actions(last_state=previous_state)

        # TRIGGER request
        elif state == STATE_ALARM_TRIGGERED:
            if previous_state == STATE_ALARM_PENDING or skip_delay:

                self._cancel_timer()
                self._unregister_sensor_listeners()
                delay = self.get_delay_config(EVENT_TRIGGER)

                if delay:  # max trigger time configured

                    @callback
                    async def async_trigger_timer_finished(now):
                        """Update state at a scheduled point in time."""

                        _LOGGER.debug("async_trigger_timer_finished")
                        target_state = (
                            STATE_ALARM_DISARMED
                            if self._disarm_after_trigger
                            else arm_mode_to_state(self._arm_mode)
                        )
                        await self._async_process_command(target_state)

                    self._timer = async_track_point_in_time(
                        self._hass, async_trigger_timer_finished, now + delay
                    )

                self._state = STATE_ALARM_TRIGGERED
                await self._async_handle_actions(last_state=previous_state)

            else:
                delay = self.get_delay_config(EVENT_ENTRY)
                if not delay:  # immediate triggering
                    await self._async_process_command(state, skip_delay=True)
                    return

                @callback
                async def async_entry_timer_finished(now):
                    """Update state at a scheduled point in time."""

                    _LOGGER.debug("async_entry_timer_finished")
                    await self._async_process_command(STATE_ALARM_TRIGGERED)

                self._timer = async_track_point_in_time(
                    self._hass, async_entry_timer_finished, now + delay
                )
                self._state = STATE_ALARM_PENDING
                await self._async_handle_actions(last_state=previous_state)

        self.async_write_ha_state()

    async def _async_register_sensor_listeners(self):
        @callback
        async def async_sensor_state_changed(entity, old_state, new_state):
            _LOGGER.debug(
                "entity {} changed: old_state={}, new_state={}".format(
                    entity, old_state, new_state
                )
            )
            sensor_config = self._config[ATTR_SENSORS][entity]

            if not self._state and not self._validate_sensors(
                event=EVENT_ARM, state_filter=SENSOR_STATE_INDETERMINATE
            ):
                self._cancel_timer()
                target_state = arm_mode_to_state(self._arm_mode)
                await self._async_process_command(target_state, skip_delay=True)

            elif self._state == STATE_ALARM_ARMING:
                open_sensors = self._validate_sensors(event=EVENT_LEAVE)
                if open_sensors:  # abort arming
                    await self._async_process_command(
                        STATE_ALARM_TRIGGERED, skip_delay=True
                    )
                    self._unregister_sensor_listeners()
                    self._state = STATE_ALARM_DISARMED
                    await self._async_handle_actions(
                        last_state=STATE_ALARM_ARMING, open_sensors=open_sensors
                    )

            elif self._state in ARMED_STATES or self._state == STATE_ALARM_PENDING:
                open_sensors = self._validate_sensors(event=EVENT_ENTRY)
                if open_sensors:
                    if (
                        sensor_config[ATTR_IMMEDIATE]
                        and self._state != STATE_ALARM_TRIGGERED
                    ):
                        await self._async_process_command(
                            STATE_ALARM_TRIGGERED, skip_delay=True
                        )
                    elif self._state in ARMED_STATES:
                        await self._async_process_command(STATE_ALARM_TRIGGERED)

        self._unregister_sensor_listeners()

        entities = []
        for entity, config in self._config[ATTR_SENSORS].items():
            if self._arm_mode in config[ATTR_MODES]:
                entities.append(entity)

        self._sensor_listener = async_track_state_change(
            self.coordinator.hass, entities, async_sensor_state_changed
        )

    def _unregister_sensor_listeners(self):
        if self._sensor_listener:
            self._sensor_listener()

        self._sensor_listener = None

    def _cancel_timer(self):
        if self._timer:
            self._timer()

        self._timer = None

    async def _async_handle_actions(self, last_state=None, open_sensors=None):
        message = ""
        state = self._state

        def format_open_sensors():
            items = []
            for (entity, status) in open_sensors.items():
                state = self.hass.states.get(entity)
                if state and "friendly_name" in state.attributes:
                    name = state.attributes["friendly_name"]
                else:
                    name = entity.split(".")[1]

                items.append("{} is {}".format(name, status))
            return ", ".join(items)

        if state and self._siren_entity:
            siren_state = self.hass.states.get(self._siren_entity)
            if not siren_state:
                _LOGGER.warning("Siren entity is not found")
            elif state == STATE_ALARM_TRIGGERED and siren_state.state != "on":
                _LOGGER.info("Activating siren")
                await async_call_from_config(
                    self.hass,
                    {
                        "service": "switch.turn_on",
                        "entity_id": self._siren_entity,
                    },
                )
            elif state != STATE_ALARM_TRIGGERED and siren_state.state == "on":
                _LOGGER.info("Deactivating siren")
                await async_call_from_config(
                    self.hass,
                    {
                        "service": "switch.turn_off",
                        "entity_id": self._siren_entity,
                    },
                )

        if state == STATE_ALARM_ARMING:
            message = "Time to leave the house. The alarm will be set to mode {} soon.".format(
                self._arm_mode
            )
        elif state in ARMED_STATES:
            message = "The alarm is now ON (in {} mode).".format(self._arm_mode)
        elif state == STATE_ALARM_TRIGGERED:
            message = "The alarm is triggered!!"
        elif state == STATE_ALARM_DISARMED and last_state:
            if open_sensors:
                message = "Failed to turn on the alarm, because: {}.".format(
                    format_open_sensors()
                )
            else:
                message = "The alarm is now OFF."
        elif state == STATE_ALARM_DISARMED and not last_state:
            if open_sensors:
                message = "Failed to restore the alarm state, because: {}.".format(
                    format_open_sensors()
                )

        if not message:
            return

        _LOGGER.info(message)

        if self._push_target:
            service_call = {
                "service": "notify.{}".format(self._push_target),
                "data": {"title": "Message from Alarmo", "message": message},
            }
            await async_call_from_config(
                self.hass,
                service_call,
            )