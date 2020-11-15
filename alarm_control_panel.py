"""Initialization of Alarmo alarm_control_panel platform."""
import datetime
import logging
import json

# from homeassistant.components.alarm_control_panel import DOMAIN as PLATFORM
from homeassistant.core import (
    HomeAssistant,
    callback,
)
from homeassistant.helpers.event import (
    async_track_point_in_time,
)
from homeassistant.helpers.restore_state import RestoreEntity
import homeassistant.util.dt as dt_util
from homeassistant.components.alarm_control_panel import (
    AlarmControlPanelEntity,
    ATTR_CODE_ARM_REQUIRED,
)

from .helpers import (
    calculate_supported_features,
    supported_modes,
)

from homeassistant.const import (
    ATTR_CODE_FORMAT,
    STATE_ALARM_ARMED_AWAY,
    STATE_ALARM_ARMED_HOME,
    STATE_ALARM_ARMED_NIGHT,
    STATE_ALARM_ARMED_CUSTOM_BYPASS,
    STATE_ALARM_DISARMED,
    STATE_ALARM_TRIGGERED,
    STATE_ALARM_PENDING,
    STATE_ALARM_ARMING,
    ATTR_MODE,
    ATTR_NAME,
)
from .const import (
    DOMAIN,
    VERSION,
    NAME,
    MANUFACTURER,
    ALARM_ENTITY,
    EVENT_LEAVE,
    EVENT_ARM,
    EVENT_ENTRY,
    EVENT_TRIGGER,
    INITIALIZATION_TIME,
    ARM_MODES,
    ATTR_MODES,
    ATTR_CODE_DISARM_REQUIRED,
    ATTR_ENABLED,
    ATTR_REQUIRE_CODE,
)
from homeassistant.components.mqtt import (
    DOMAIN as ATTR_MQTT,
    CONF_STATE_TOPIC,
    CONF_COMMAND_TOPIC,
)
from homeassistant.components.mqtt.alarm_control_panel import (
    DEFAULT_ARM_NIGHT as COMMAND_ARM_NIGHT,
    DEFAULT_ARM_AWAY as COMMAND_ARM_AWAY,
    DEFAULT_ARM_HOME as COMMAND_ARM_HOME,
    DEFAULT_ARM_CUSTOM_BYPASS as COMMAND_ARM_CUSTOM_BYPASS,
    DEFAULT_DISARM as COMMAND_DISARM,
)

import homeassistant.components.mqtt as mqtt

from .sensors import SensorHandler
from .automations import AutomationHandler

_LOGGER = logging.getLogger(__name__)


async def async_setup(hass, config):
    """Track states and offer events for alarm_control_panel."""
    return True


async def async_setup_platform(hass, config, async_add_entities, discovery_info=None):
    """Set up the platform from config."""
    return True


async def async_setup_entry(hass, config_entry, async_add_devices):
    """Set up the Alarmo entities. """
    _LOGGER.debug("async_setup_entry")
    coordinator = hass.data[DOMAIN]

    # Create alarm entity

    entity = AlarmoEntity(
        hass=hass,
        coordinator=coordinator,
        entity_id=ALARM_ENTITY,
    )

    async_add_devices([entity])

    # # register services
    # platform = entity_platform.current_platform.get()

    # platform.async_register_entity_service(
    #     SERVICE_EDIT_CONFIG, SCHEMA_EDIT_CONFIG, "async_edit_config"
    # )


class AlarmoEntity(AlarmControlPanelEntity, RestoreEntity):
    """Defines a base alarm_control_panel entity."""

    def __init__(self, hass: HomeAssistant, coordinator, entity_id: str) -> None:
        """Initialize the alarm_control_panel entity."""
        self.coordinator = coordinator
        self.entity_id = entity_id
        self._name = NAME
        self._state = None
        self._hass = hass
        self._config = None
        self.sensors = SensorHandler(hass, coordinator, self)
        self.automations = AutomationHandler(hass, coordinator, self)
        self._timer = None
        self._arm_mode = None
        self._push_target = None
        self._siren_entity = None
        self._changed_by = None
        self._mqtt_enabled = False

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
        if (
            not self._config[ATTR_CODE_ARM_REQUIRED]
            and not self._config[ATTR_CODE_DISARM_REQUIRED]
        ):
            return None
        else:
            return self._config[ATTR_CODE_FORMAT]

    @property
    def changed_by(self):
        _LOGGER.debug("changed_by")
        """Last change triggered by."""
        _LOGGER.debug(self._changed_by)
        return self._changed_by

    @property
    def state(self):
        """Return the state of the device."""
        return self._state

    @property
    def supported_features(self) -> int:
        """Return the list of supported features."""
        if not self._config:
            return None

        return calculate_supported_features(self._config)

    @property
    def code_arm_required(self):
        """Whether the code is required for arm actions."""
        if not self._config:
            return None
        return self._config[ATTR_CODE_ARM_REQUIRED]

    @property
    def arm_mode(self):
        """Return the arm mode."""
        return self._arm_mode

    @property
    def device_state_attributes(self):
        """Return the data of the entity."""

        return {
            "changed_by": self._changed_by,
            "arm_mode": self._arm_mode,
        }

    @callback
    def async_reload_config(self):
        """triggered when config changes."""
        self._config = self.coordinator.store.async_get_config()
        self.async_write_ha_state()

    def _validate_code(self, code, state):
        """Validate given code."""

        if state == STATE_ALARM_DISARMED and not self._config[ATTR_CODE_ARM_REQUIRED]:
            return True
        elif state != STATE_ALARM_DISARMED and not self._config[ATTR_CODE_DISARM_REQUIRED]:
            return True
        elif not code or not len(code):
            return False

        res = self.coordinator.async_authenticate_user(code)
        if not res:
            _LOGGER.debug("authentication failed")
            return False

        _LOGGER.debug("authenticated by user {}".format(res[ATTR_NAME]))
        return True

    async def async_alarm_disarm(self, code=None, skip_code=False):
        """Send disarm command."""
        _LOGGER.debug("alarm_disarm")

        if self._state == STATE_ALARM_DISARMED:
            _LOGGER.warning("Cannot go to state {} from state {}.".format(STATE_ALARM_DISARMED, self._state))
            return
        elif not self._validate_code(code, STATE_ALARM_DISARMED) and not skip_code:
            _LOGGER.warning("Wrong code provided.")
            return
        else:
            self._changed_by = None
            await self.async_update_state(STATE_ALARM_DISARMED)

    async def async_alarm_arm_away(self, code=None, skip_code=False):
        """Send arm away command."""
        _LOGGER.debug("alarm_arm_away")

        if STATE_ALARM_ARMED_AWAY not in supported_modes(self._config):
            _LOGGER.warning("Mode ARMED_AWAY is not enabled, ignoring.")
            return
        elif self._state != STATE_ALARM_DISARMED:
            _LOGGER.warning("Cannot go to state {} from state {}.".format(STATE_ALARM_ARMED_AWAY, self._state))
            return
        elif not self._validate_code(code, STATE_ALARM_ARMED_AWAY) and not skip_code:
            _LOGGER.warning("Wrong code provided.")
            return
        else:
            self._changed_by = None
            await self.async_arm(STATE_ALARM_ARMED_AWAY)

    async def async_alarm_arm_home(self, code=None, skip_code=False):
        """Send arm home command."""
        _LOGGER.debug("alarm_arm_home")

        if STATE_ALARM_ARMED_HOME not in supported_modes(self._config):
            _LOGGER.warning("Mode ARMED_HOME is not enabled, ignoring.")
            return
        elif self._state != STATE_ALARM_DISARMED:
            _LOGGER.warning("Cannot go to state {} from state {}.".format(STATE_ALARM_ARMED_HOME, self._state))
            return
        elif not self._validate_code(code, STATE_ALARM_ARMED_HOME) and not skip_code:
            _LOGGER.warning("Wrong code provided.")
            return
        else:
            self._changed_by = None
            await self.async_arm(STATE_ALARM_ARMED_HOME)

    async def async_alarm_arm_night(self, code=None, skip_code=False):
        """Send arm night command."""
        _LOGGER.debug("alarm_arm_night")

        if STATE_ALARM_ARMED_NIGHT not in supported_modes(self._config):
            _LOGGER.warning("Mode ARMED_NIGHT is not enabled, ignoring.")
            return
        elif self._state != STATE_ALARM_DISARMED:
            _LOGGER.warning("Cannot go to state {} from state {}.".format(STATE_ALARM_ARMED_NIGHT, self._state))
            return
        elif not self._validate_code(code, STATE_ALARM_ARMED_NIGHT) and not skip_code:
            _LOGGER.warning("Wrong code provided.")
            return
        else:
            self._changed_by = None
            await self.async_arm(STATE_ALARM_ARMED_NIGHT)

    async def async_alarm_arm_custom_bypass(self, code=None, skip_code=False):
        """Send arm custom bypass command."""
        _LOGGER.debug("alarm_arm_custom_bypass")

        if STATE_ALARM_ARMED_CUSTOM_BYPASS not in supported_modes(self._config):
            _LOGGER.warning("Mode ARMED_CUSTOM_BYPASS is not enabled, ignoring.")
            return
        elif self._state != STATE_ALARM_DISARMED:
            _LOGGER.warning("Cannot go to state {} from state {}.".format(STATE_ALARM_ARMED_CUSTOM_BYPASS, self._state))
            return
        elif not self._validate_code(code, STATE_ALARM_ARMED_CUSTOM_BYPASS) and not skip_code:
            _LOGGER.warning("Wrong code provided.")
            return
        else:
            self._changed_by = None
            await self.async_arm(STATE_ALARM_ARMED_CUSTOM_BYPASS)

    async def async_added_to_hass(self):
        """Connect to dispatcher listening for entity data notifications."""
        await super().async_added_to_hass()
        _LOGGER.debug("async_added_to_hass")

        # load the configuration and make sure that it is reloaded on changes
        self._config = self.coordinator.store.async_get_config()
        self.coordinator.register_config_callback(self.async_reload_config)

        if self._config[ATTR_MQTT] and self._config[ATTR_MQTT][ATTR_ENABLED]:
            self._mqtt_enabled = True
            await self._subscribe_topics()

        state = await self.async_get_last_state()

        # restore previous state
        if state:

            # get arm mode
            if ATTR_MODE in state.attributes:
                self._arm_mode = state.attributes[ATTR_MODE]

            if "changed_by" in state.attributes:
                self._changed_by = state.attributes["changed_by"]

            # restore previous state
            if state.state in ARM_MODES:

                self.async_set_timer(INITIALIZATION_TIME, self.async_initialization_timer_finished)

            elif state.state == STATE_ALARM_ARMING:
                await self.async_arm(self.arm_mode)
            elif state.state == STATE_ALARM_PENDING:
                await self.async_trigger(skip_delay=True)
            elif state.state == STATE_ALARM_TRIGGERED:
                await self.async_trigger()
            else:
                await self.async_update_state(STATE_ALARM_DISARMED)

        else:
            await self.async_update_state(STATE_ALARM_DISARMED)

        self.async_write_ha_state()

    async def async_will_remove_from_hass(self):
        _LOGGER.debug("async_will_remove_from_hass")

    def get_delay_config(self, event):
        """Get datetime object for delay time."""
        if not self.arm_mode and event in [EVENT_LEAVE, EVENT_ENTRY]:
            return None

        if event == EVENT_LEAVE and self._config[ATTR_MODES][self.arm_mode]["leave_time"]:
            return datetime.timedelta(seconds=self._config[ATTR_MODES][self.arm_mode]["leave_time"])

        elif event == EVENT_ENTRY and self._config[ATTR_MODES][self.arm_mode]["entry_time"]:
            return datetime.timedelta(seconds=self._config[ATTR_MODES][self.arm_mode]["entry_time"])

        elif event == EVENT_TRIGGER and self._config["trigger_time"]:
            return datetime.timedelta(seconds=self._config["trigger_time"])

        return None

    async def async_update_state(self, state):
        _LOGGER.debug("async_update_state")
        _LOGGER.debug(state)
        if state == self._state:
            return

        await self.sensors.async_update_listener(state)

        last_state = self._state
        self._state = state

        if self._mqtt_enabled:
            mqtt.async_publish(self._hass, self._config[ATTR_MQTT][CONF_STATE_TOPIC], state)

        await self.automations.async_handle_state_update(state=state, last_state=last_state)

        self.async_cancel_timer()

        self.async_write_ha_state()
        _LOGGER.debug("write state")

    async def async_arm(self, arm_mode, skip_delay=False):
        """Update the state."""
        _LOGGER.debug("request to update state to {}".format(arm_mode))

        self._arm_mode = arm_mode
        leave_delay = self.get_delay_config(EVENT_LEAVE)

        # ARM request

        if self._state != STATE_ALARM_DISARMED or skip_delay:  # immediate arm event
            res = self.sensors.validate_event(event=EVENT_ARM)
            _LOGGER.debug(res)

            if not res:
                # there where errors -> abort the arm
                await self.async_update_state(STATE_ALARM_DISARMED)
            else:
                # proceed the arm
                await self.async_update_state(arm_mode)

        else:  # normal arm event (from disarmed)

            if not leave_delay:
                # no delay configured -> run function again but skip the delay
                self.async_arm(arm_mode, skip_delay=True)

            else:
                # proceed to arming
                res = self.sensors.validate_event(event=EVENT_LEAVE)
                _LOGGER.debug(res)
                if res:
                    await self.async_update_state(STATE_ALARM_ARMING)
                    self.async_set_timer(leave_delay, self.async_leave_timer_finished)
                else:
                    await self.async_update_state(STATE_ALARM_DISARMED)

    async def async_trigger(self, skip_delay=False):
        """Trigger request. Will only be called the first time a sensor trips."""

        trigger_time = self.get_delay_config(EVENT_TRIGGER)
        entry_delay = self.get_delay_config(EVENT_ENTRY)

        if self._state == STATE_ALARM_PENDING or skip_delay or not entry_delay:
            # countdown finished or immediate trigger event
            await self.async_update_state(STATE_ALARM_TRIGGERED)

            if trigger_time:
                # there is a max. trigger time configured
                self.async_set_timer(trigger_time, self.async_trigger_timer_finished)

        else:  # to pending state
            await self.async_update_state(STATE_ALARM_PENDING)
            self.async_set_timer(entry_delay, self.async_entry_timer_finished)

    @callback
    async def async_initialization_timer_finished(self, now):
        """Update state at a scheduled point in time."""
        await self.async_arm(self.arm_mode)

    @callback
    async def async_leave_timer_finished(self, now):
        """Update state at a scheduled point in time."""
        _LOGGER.debug("async_leave_timer_finished")
        await self.async_arm(self.arm_mode)

    @callback
    async def async_trigger_timer_finished(self, now):
        """Update state at a scheduled point in time."""

        _LOGGER.debug("async_trigger_timer_finished")
        if self._disarm_after_trigger:
            await self.async_update_state(STATE_ALARM_DISARMED)
        else:
            await self.async_arm(self.arm_mode)

    @callback
    async def async_entry_timer_finished(self, now):
        """Update state at a scheduled point in time."""

        _LOGGER.debug("async_entry_timer_finished")
        await self.async_trigger()

    def async_cancel_timer(self):
        if self._timer:
            self._timer()

        self._timer = None

    def async_set_timer(self, delay: datetime.timedelta, cb_func):
        self.async_cancel_timer()
        now = dt_util.utcnow()

        self._timer = async_track_point_in_time(
            self._hass, cb_func, now + delay
        )

    async def _subscribe_topics(self):

        @callback
        async def async_message_received(msg):

            try:
                payload = json.loads(msg.payload)
                command = payload["command"] if "command" in payload else None
                code = payload["code"] if "code" in payload else None
            except ValueError:
                command = msg.payload
                code = None

            if command not in (
                COMMAND_DISARM,
                COMMAND_ARM_AWAY,
                COMMAND_ARM_NIGHT,
                COMMAND_ARM_HOME,
                COMMAND_ARM_CUSTOM_BYPASS,
            ):
                _LOGGER.warning("Received unexpected payload: %s", payload)
                return

            skip_code = not self._config[ATTR_MQTT][ATTR_REQUIRE_CODE]

            if command == COMMAND_DISARM:
                await self.async_alarm_disarm(code, skip_code)
            elif command == COMMAND_ARM_AWAY:
                await self.async_alarm_arm_away(code, skip_code)
            elif command == COMMAND_ARM_NIGHT:
                await self.async_alarm_arm_night(code, skip_code)
            elif command == COMMAND_ARM_HOME:
                await self.async_alarm_arm_home(code, skip_code)
            elif command == COMMAND_ARM_CUSTOM_BYPASS:
                await self.async_alarm_arm_custom_bypass(code, skip_code)

        await mqtt.async_subscribe(self._hass, self._config[ATTR_MQTT][CONF_COMMAND_TOPIC], async_message_received)

# async def _async_handle_actions(self, last_state=None, open_sensors=None):
#     message = ""
#     state = self._state

#     def format_open_sensors():
#         items = []
#         for (entity, status) in open_sensors.items():
#             state = self.hass.states.get(entity)
#             if state and "friendly_name" in state.attributes:
#                 name = state.attributes["friendly_name"]
#             else:
#                 name = entity.split(".")[1]

#             items.append("{} is {}".format(name, status))
#         return ", ".join(items)

#     if state and self._siren_entity:
#         siren_state = self.hass.states.get(self._siren_entity)
#         if not siren_state:
#             _LOGGER.warning("Siren entity is not found")
#         elif state == STATE_ALARM_TRIGGERED and siren_state.state != "on":
#             _LOGGER.info("Activating siren")
#             await async_call_from_config(
#                 self.hass,
#                 {
#                     "service": "switch.turn_on",
#                     "entity_id": self._siren_entity,
#                 },
#             )
#         elif state != STATE_ALARM_TRIGGERED and siren_state.state == "on":
#             _LOGGER.info("Deactivating siren")
#             await async_call_from_config(
#                 self.hass,
#                 {
#                     "service": "switch.turn_off",
#                     "entity_id": self._siren_entity,
#                 },
#             )

#     if state == STATE_ALARM_ARMING:
#         message = "Time to leave the house. The alarm will be set to mode {} soon.".format(
#             self._arm_state
#         )
#     elif state in ARM_MODES:
#         message = "The alarm is now ON (in {} mode).".format(self._arm_state)
#     elif state == STATE_ALARM_TRIGGERED:
#         message = "The alarm is triggered!!"
#     elif state == STATE_ALARM_DISARMED and last_state:
#         if open_sensors:
#             message = "Failed to turn on the alarm, because: {}.".format(
#                 format_open_sensors()
#             )
#         else:
#             message = "The alarm is now OFF."
#     elif state == STATE_ALARM_DISARMED and not last_state:
#         if open_sensors:
#             message = "Failed to restore the alarm state, because: {}.".format(
#                 format_open_sensors()
#             )

#     if not message:
#         return

#     _LOGGER.info(message)

#     if self._push_target:
#         service_call = {
#             "service": "notify.{}".format(self._push_target),
#             "data": {"title": "Message from Alarmo", "message": message},
#         }
#         await async_call_from_config(
#             self.hass,
#             service_call,
#         )
