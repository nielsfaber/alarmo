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
    ATTR_IS_OVERRIDE_CODE,
    ATTR_DISARM_AFTER_TRIGGER,
    PUSH_EVENTS,
    EVENT_CATEGORIES,
    EVENT_ACTION_FORCE_ARM,
    EVENT_ACTION_RETRY_ARM,
    COMMAND_ARM_NIGHT,
    COMMAND_ARM_AWAY,
    COMMAND_ARM_HOME,
    COMMAND_ARM_CUSTOM_BYPASS,
    COMMAND_DISARM,
    COMMANDS,
    ATTR_STATE_PAYLOAD,
    ATTR_COMMAND_PAYLOAD,
)
from homeassistant.components.mqtt import (
    DOMAIN as ATTR_MQTT,
    CONF_STATE_TOPIC,
    CONF_COMMAND_TOPIC,
)

import homeassistant.components.mqtt as mqtt

from .sensors import SensorHandler
from .automations import (
    AutomationHandler,
    EVENT_ARM_FAILURE,
)

_LOGGER = logging.getLogger(__name__)


async def async_setup(hass, config):
    """Track states and offer events for alarm_control_panel."""
    return True


async def async_setup_platform(hass, config, async_add_entities, discovery_info=None):
    """Set up the platform from config."""
    return True


async def async_setup_entry(hass, config_entry, async_add_devices):
    """Set up the Alarmo entities. """
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
        self._subscribed_topics = []
        self._event_listeners = []

    @property
    def device_info(self) -> dict:
        """Return info for device registry."""
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
        """Last change triggered by."""
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
            "open_sensors": self.sensors.open_sensors,
            "bypassed_sensors": self.sensors.bypassed_sensors,
        }

    @callback
    async def async_reload_config(self):
        """triggered when config changes."""
        old_config = self._config
        self._config = self.coordinator.store.async_get_config()

        if old_config[ATTR_MQTT][CONF_COMMAND_TOPIC] != self._config[ATTR_MQTT][CONF_COMMAND_TOPIC]:
            self._unsubscribe_topics()
            if self._config[ATTR_MQTT][ATTR_ENABLED]:
                await self._subscribe_topics()
        elif old_config[ATTR_MQTT][ATTR_ENABLED] != self._config[ATTR_MQTT][ATTR_ENABLED]:
            self._unsubscribe_topics()

        self.async_write_ha_state()

    def _validate_code(self, code, state):
        """Validate given code."""

        if state == STATE_ALARM_DISARMED and not self._config[ATTR_CODE_DISARM_REQUIRED]:
            self._changed_by = None
            return True
        elif state != STATE_ALARM_DISARMED and not self._config[ATTR_CODE_ARM_REQUIRED]:
            self._changed_by = None
            return True
        elif not code or not len(code):
            return False

        res = self.coordinator.async_authenticate_user(code)
        if not res:
            return False
        else:
            self._changed_by = res[ATTR_NAME]

        return res

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
            self._arm_mode = None
            self.sensors.open_sensors = None
            self.sensors.bypassed_sensors = None
            await self.async_update_state(STATE_ALARM_DISARMED)

    async def _async_handle_arm_request(self, arm_mode, code, skip_code):
        """check if conditions are met for starting arm procedure"""
        if arm_mode not in supported_modes(self._config):
            _LOGGER.warning("Mode {} is not enabled, ignoring.".format(arm_mode))
            return
        elif self._state != STATE_ALARM_DISARMED:
            if self._state not in ARM_MODES:
                _LOGGER.warning("Cannot go to state {} from state {}.".format(arm_mode, self._state))
                return
            await self.async_arm(arm_mode, skip_delay=True, bypass_open_sensors=False)
        else:
            bypass_open_sensors = False
            if not skip_code:
                res = self._validate_code(code, arm_mode)
                if not res:
                    _LOGGER.warning("Wrong code provided.")
                    return
                elif type(res) is dict and res[ATTR_IS_OVERRIDE_CODE]:
                    bypass_open_sensors = True
            else:
                self._changed_by = None
            self.sensors.open_sensors = None
            self.sensors.bypassed_sensors = None
            await self.async_arm(arm_mode, bypass_open_sensors=bypass_open_sensors)

    async def async_alarm_arm_away(self, code=None, skip_code=False):
        """Send arm away command."""
        _LOGGER.debug("alarm_arm_away")
        await self._async_handle_arm_request(STATE_ALARM_ARMED_AWAY, code, skip_code)

    async def async_alarm_arm_home(self, code=None, skip_code=False):
        """Send arm home command."""
        _LOGGER.debug("alarm_arm_home")
        await self._async_handle_arm_request(STATE_ALARM_ARMED_HOME, code, skip_code)

    async def async_alarm_arm_night(self, code=None, skip_code=False):
        """Send arm night command."""
        _LOGGER.debug("alarm_arm_night")
        await self._async_handle_arm_request(STATE_ALARM_ARMED_NIGHT, code, skip_code)

    async def async_alarm_arm_custom_bypass(self, code=None, skip_code=False):
        """Send arm custom_bypass command."""
        _LOGGER.debug("alarm_arm_custom_bypass")
        await self._async_handle_arm_request(STATE_ALARM_ARMED_CUSTOM_BYPASS, code, skip_code)

    async def async_added_to_hass(self):
        """Connect to dispatcher listening for entity data notifications."""
        await super().async_added_to_hass()
        _LOGGER.debug("async_added_to_hass")

        # load the configuration and make sure that it is reloaded on changes
        self._config = self.coordinator.store.async_get_config()
        self.coordinator.register_config_callback(self.async_reload_config)

        if self._config[ATTR_MQTT][ATTR_ENABLED]:
            await self._subscribe_topics()

        self._subscribe_events()

        state = await self.async_get_last_state()
        initial_state = STATE_ALARM_DISARMED

        # restore previous state
        if state:
            # restore attributes
            if "arm_mode" in state.attributes:
                self._arm_mode = state.attributes["arm_mode"]
            if "changed_by" in state.attributes:
                self._changed_by = state.attributes["changed_by"]
            if "open_sensors" in state.attributes:
                self.sensors.open_sensors = state.attributes["open_sensors"]
            if "bypassed_sensors" in state.attributes:
                self.sensors.bypassed_sensors = state.attributes["bypassed_sensors"]

            # determine the state to start in
            if (state.state in ARM_MODES or state.state == STATE_ALARM_ARMING) and self._arm_mode:
                _LOGGER.debug(self._arm_mode)
                initial_state = self._arm_mode
            elif state.state in [STATE_ALARM_PENDING, STATE_ALARM_TRIGGERED]:
                initial_state = STATE_ALARM_TRIGGERED
            else:
                initial_state = STATE_ALARM_DISARMED

        _LOGGER.debug("Initial state is {}".format(initial_state))
        if initial_state == STATE_ALARM_TRIGGERED:
            await self.async_trigger(skip_delay=True)
        elif not self.sensors.all_sensors_available_for_state(initial_state):
            # some sensors need to start up still, so lets wait for them before restoring state
            await self.sensors.async_update_listener(initial_state)
            self.async_set_timer(INITIALIZATION_TIME, self.async_initialization_timer_finished)
        elif initial_state in ARM_MODES:
            await self.async_arm(self._arm_mode)
        else:
            await self.async_update_state(STATE_ALARM_DISARMED)

        self.async_write_ha_state()

    async def async_will_remove_from_hass(self):
        _LOGGER.debug("async_will_remove_from_hass")
        self._unsubscribe_topics()
        self._unsubscribe_events()

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
        if state == self._state:
            return

        await self.sensors.async_update_listener(state)

        last_state = self._state
        self._state = state

        if self._config[ATTR_MQTT][ATTR_ENABLED]:
            payload_config = self._config[ATTR_MQTT][ATTR_STATE_PAYLOAD]
            if state in payload_config and payload_config[state]:
                mqtt.async_publish(self._hass, self._config[ATTR_MQTT][CONF_STATE_TOPIC], payload_config[state], retain=True)
            elif state not in payload_config:
                mqtt.async_publish(self._hass, self._config[ATTR_MQTT][CONF_STATE_TOPIC], state, retain=True)

        await self.automations.async_handle_state_update(state=state, last_state=last_state)
        if last_state == STATE_ALARM_ARMING:
            self.sensors.stop_arm_timer()

        self.async_cancel_timer()

        self.async_write_ha_state()

    async def async_arm(self, arm_mode, skip_delay=False, bypass_open_sensors=False):
        """Update the state."""
        self._arm_mode = arm_mode
        leave_delay = self.get_delay_config(EVENT_LEAVE)

        # ARM request
        if self._state != STATE_ALARM_DISARMED or skip_delay:  # immediate arm event

            res = self.sensors.validate_event(event=EVENT_ARM, bypass_open_sensors=bypass_open_sensors)

            if not res:
                # there where errors -> abort the arm
                _LOGGER.info("Cannot transition from state {} to state {}, there are open sensors".format(self._state, arm_mode))
                await self.automations.async_handle_event(event=EVENT_ARM_FAILURE)

                # Go to Disarmed state in an Unknown state or Arming state
                if not self._state or self._state == STATE_ALARM_ARMING:
                    await self.async_update_state(STATE_ALARM_DISARMED)
            else:
                # proceed the arm
                await self.async_update_state(arm_mode)

        else:  # normal arm event (from disarmed)

            if not leave_delay:
                # no delay configured -> run function again but skip the delay
                await self.async_arm(arm_mode, skip_delay=True, bypass_open_sensors=bypass_open_sensors)

            else:
                # proceed to arming
                res = self.sensors.validate_event(event=EVENT_LEAVE, bypass_open_sensors=bypass_open_sensors)
                if res:
                    await self.async_update_state(STATE_ALARM_ARMING)
                    self.async_set_timer(leave_delay, self.async_leave_timer_finished)
                else:
                    _LOGGER.info("Cannot arm right now, there are open sensors")
                    await self.automations.async_handle_event(event=EVENT_ARM_FAILURE)
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
        _LOGGER.debug("async_initialization_timer_finished")
        if self.arm_mode:
            await self.async_arm(self.arm_mode)
        else:
            await self.async_update_state(STATE_ALARM_DISARMED)

    @callback
    async def async_leave_timer_finished(self, now):
        """Update state at a scheduled point in time."""
        _LOGGER.debug("async_leave_timer_finished")
        await self.async_arm(self.arm_mode)

    @callback
    async def async_trigger_timer_finished(self, now):
        """Update state at a scheduled point in time."""

        _LOGGER.debug("async_trigger_timer_finished")
        self._changed_by = None
        if self._config[ATTR_DISARM_AFTER_TRIGGER]:
            await self.async_update_state(STATE_ALARM_DISARMED)
            self.sensors.bypassed_sensors = None
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
            command = None
            code = None
            try:
                payload = json.loads(msg.payload)
                payload = {k.lower(): v for k, v in payload.items()}

                if "command" in payload:
                    command = payload["command"]
                elif "cmd" in payload:
                    command = payload["cmd"]
                elif "action" in payload:
                    command = payload["action"]
                elif "state" in payload:
                    command = payload["state"]

                if "code" in payload:
                    code = payload["code"]
                elif "pin" in payload:
                    code = payload["pin"]
                elif "password" in payload:
                    code = payload["password"]
                elif "pincode" in payload:
                    code = payload["pincode"]

            except ValueError:
                # no JSON structure found
                command = msg.payload
                code = None

            if type(command) is str:
                command = command.lower()
            else:
                _LOGGER.warning("Received unexpected command")
                return

            payload_config = self._config[ATTR_MQTT][ATTR_COMMAND_PAYLOAD]
            skip_code = not self._config[ATTR_MQTT][ATTR_REQUIRE_CODE]

            command_payloads = {}
            for item in COMMANDS:
                if item in payload_config and payload_config[item]:
                    command_payloads[item] = payload_config[item]
                elif item not in payload_config:
                    command_payloads[item] = item

            if command == command_payloads[COMMAND_DISARM]:
                await self.async_alarm_disarm(code, skip_code)
            elif command == command_payloads[COMMAND_ARM_AWAY]:
                await self.async_alarm_arm_away(code, skip_code)
            elif command == command_payloads[COMMAND_ARM_NIGHT]:
                await self.async_alarm_arm_night(code, skip_code)
            elif command == command_payloads[COMMAND_ARM_HOME]:
                await self.async_alarm_arm_home(code, skip_code)
            elif command == command_payloads[COMMAND_ARM_CUSTOM_BYPASS]:
                await self.async_alarm_arm_custom_bypass(code, skip_code)
            else:
                _LOGGER.warning("Received unexpected command: %s", command)

        subscription = await mqtt.async_subscribe(
            self._hass,
            self._config[ATTR_MQTT][CONF_COMMAND_TOPIC],
            async_message_received,
        )
        self._subscribed_topics.append(subscription)

    def _unsubscribe_topics(self):
        while self._subscribed_topics:
            self._subscribed_topics.pop()()

    def _subscribe_events(self):
        @callback
        async def async_handle_event(event):
            action = None
            if (
                event.data and "categoryName" in event.data
                and "actionName" in event.data
                and event.data["categoryName"] in EVENT_CATEGORIES
            ):
                # IOS push notification format
                action = event.data["actionName"]
            elif event.data["action"]:
                # Android push notification format
                action = event.data["action"]

            if action == EVENT_ACTION_FORCE_ARM and self._arm_mode and self._state == STATE_ALARM_DISARMED:
                _LOGGER.info("Received request for force arming")
                await self.async_arm(self._arm_mode, bypass_open_sensors=True)
            elif action == EVENT_ACTION_RETRY_ARM and self._arm_mode and self._state == STATE_ALARM_DISARMED:
                _LOGGER.info("Received request for retry arming")
                await self.async_arm(self._arm_mode)

        for event in PUSH_EVENTS:
            handle = self._hass.bus.async_listen(event, async_handle_event)
            self._event_listeners.append(handle)

    def _unsubscribe_events(self):
        while self._event_listeners:
            self._event_listeners.pop()()
