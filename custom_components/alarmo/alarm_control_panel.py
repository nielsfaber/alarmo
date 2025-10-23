"""Initialization of Alarmo alarm_control_panel platform."""

import logging
import datetime
import operator
import functools
from abc import abstractmethod

import homeassistant.util.dt as dt_util
from homeassistant.core import (
    HomeAssistant,
    callback,
)
from homeassistant.util import slugify
from homeassistant.const import (
    ATTR_NAME,
    ATTR_CODE_FORMAT,
)
from homeassistant.helpers import entity_platform
from homeassistant.exceptions import HomeAssistantError
from homeassistant.helpers.event import (
    async_call_later,
    async_track_point_in_time,
)
from homeassistant.helpers.dispatcher import (
    dispatcher_send,
    async_dispatcher_send,
    async_dispatcher_connect,
)
from homeassistant.helpers.restore_state import RestoreEntity
from homeassistant.components.alarm_control_panel import (
    DOMAIN as PLATFORM,
)
from homeassistant.components.alarm_control_panel import (
    ATTR_CODE_ARM_REQUIRED,
    AlarmControlPanelState,
    AlarmControlPanelEntity,
    AlarmControlPanelEntityFeature,
)

from . import const

_LOGGER = logging.getLogger(__name__)


async def async_setup(hass, config):
    """Track states and offer events for alarm_control_panel."""
    return True


async def async_setup_platform(hass, config, async_add_entities, discovery_info=None):
    """Set up the platform from config."""
    return True


async def async_setup_entry(hass, config_entry, async_add_devices):
    """Set up the Alarmo entities."""

    @callback
    def async_add_alarm_entity(config: dict):
        """Add each entity as Alarm Control Panel."""
        entity_id = f"{PLATFORM}.{slugify(config['name'])}"

        alarm_entity = AlarmoAreaEntity(
            hass=hass,
            entity_id=entity_id,
            name=config["name"],
            area_id=config["area_id"],
        )
        hass.data[const.DOMAIN]["areas"][config["area_id"]] = alarm_entity
        async_add_devices([alarm_entity])

    async_dispatcher_connect(hass, "alarmo_register_entity", async_add_alarm_entity)

    @callback
    def async_add_alarm_master(config: dict):
        """Add each entity as Alarm Control Panel."""
        entity_id = f"{PLATFORM}.{slugify(config['name'])}"
        alarm_entity = AlarmoMasterEntity(
            hass=hass,
            entity_id=entity_id,
            name=config["name"],
        )
        hass.data[const.DOMAIN]["master"] = alarm_entity
        async_add_devices([alarm_entity])

    async_dispatcher_connect(hass, "alarmo_register_master", async_add_alarm_master)
    async_dispatcher_send(hass, "alarmo_platform_loaded")

    # Register services
    platform = entity_platform.current_platform.get()
    platform.async_register_entity_service(
        const.SERVICE_ARM,
        const.SERVICE_ARM_SCHEMA,
        "async_service_arm_handler",
    )
    platform.async_register_entity_service(
        const.SERVICE_DISARM,
        const.SERVICE_DISARM_SCHEMA,
        "async_service_disarm_handler",
    )
    platform.async_register_entity_service(
        const.SERVICE_SKIP_DELAY,
        const.SERVICE_SKIP_DELAY_SCHEMA,
        "async_service_skip_delay_handler",
    )


class AlarmoBaseEntity(AlarmControlPanelEntity, RestoreEntity):
    def __init__(self, hass: HomeAssistant, name: str, entity_id: str) -> None:
        """Initialize the alarm_control_panel entity."""
        self.entity_id = entity_id
        self._name = name
        self._state = None
        self.hass = hass
        self._config = {}
        self._arm_mode = None
        self._changed_by = None
        self._open_sensors = {}
        self._bypass_open_sensors = False
        self._bypassed_sensors = []
        self._delay = None
        self.expiration = None
        self.area_id = None
        self._revert_state = None
        self._ready_to_arm_modes = []
        self._last_triggered = None

    @property
    def device_info(self) -> dict:
        """Return info for device registry."""
        return {
            "identifiers": {
                (const.DOMAIN, self.hass.data[const.DOMAIN]["coordinator"].id)
            },
            "name": const.NAME,
            "model": const.NAME,
            "sw_version": const.VERSION,
            "manufacturer": const.MANUFACTURER,
        }

    @property
    def unique_id(self):
        """Return a unique ID to use for this entity."""
        return f"{self.entity_id}"

    @property
    def name(self):
        """Return the friendly name to use for this entity."""
        return self._name

    @property
    def should_poll(self) -> bool:
        """Return the polling state."""
        return False

    @property
    def code_format(self):
        """Return whether code consists of digits or characters."""
        if self._state == AlarmControlPanelState.DISARMED and self.code_arm_required:
            return self._config[ATTR_CODE_FORMAT]

        elif (
            self._state != AlarmControlPanelState.DISARMED
            and self._config
            and const.ATTR_CODE_DISARM_REQUIRED in self._config
            and self._config[const.ATTR_CODE_DISARM_REQUIRED]
        ):
            return self._config[ATTR_CODE_FORMAT]

        else:
            return None

    @property
    def changed_by(self):
        """Last change triggered by."""
        return self._changed_by

    @property
    def alarm_state(self) -> AlarmControlPanelState | None:
        """Return the state of the device."""
        return self._state

    @property
    def supported_features(self) -> int:
        """Return the list of supported features."""
        return 0

    @property
    def code_arm_required(self):
        """Whether the code is required for arm actions."""
        if not self._config or ATTR_CODE_ARM_REQUIRED not in self._config:
            return True  # assume code is needed (conservative approach)
        elif self._state != AlarmControlPanelState.DISARMED:
            return self._config[const.ATTR_CODE_MODE_CHANGE_REQUIRED]
        else:
            return self._config[ATTR_CODE_ARM_REQUIRED]

    @property
    def arm_mode(self):
        """Return the arm mode."""
        return (
            self._arm_mode if self._state != AlarmControlPanelState.DISARMED else None
        )

    @property
    def open_sensors(self):
        """Get open sensors."""
        if not self._open_sensors:
            return None
        else:
            return self._open_sensors

    @open_sensors.setter
    def open_sensors(self, value):
        """Set open_sensors sensors."""
        if type(value) is dict:
            self._open_sensors = value
        else:
            self._open_sensors = {}

    @property
    def bypassed_sensors(self):
        """Get bypassed sensors."""
        if not self._bypassed_sensors:
            return None
        else:
            return self._bypassed_sensors

    @bypassed_sensors.setter
    def bypassed_sensors(self, value):
        """Set bypassed sensors."""
        if type(value) is list:
            self._bypassed_sensors = value
        elif not value:
            self._bypassed_sensors = None

    @property
    def delay(self):
        """Get delay."""
        return self._delay

    @delay.setter
    def delay(self, value):
        """Set delay."""
        if type(value) is int:
            self._delay = value
            self.expiration = (
                dt_util.utcnow() + datetime.timedelta(seconds=value)
            ).replace(microsecond=0)
        else:
            self._delay = None
            self.expiration = None

    @property
    def last_triggered(self):
        """Get last time occurrence of alarm trigger."""
        return self._last_triggered

    @property
    def extra_state_attributes(self):
        """Return the data of the entity."""
        return {
            "arm_mode": self.arm_mode,
            "next_state": self.next_state,
            "open_sensors": self.open_sensors,
            "bypassed_sensors": self.bypassed_sensors,
            "delay": self.delay,
            "last_triggered": self.last_triggered,
        }

    def _validate_code(self, code, to_state):
        """Validate given code."""
        if (
            to_state == AlarmControlPanelState.DISARMED
            and not self._config[const.ATTR_CODE_DISARM_REQUIRED]
        ):
            self._changed_by = None
            return (True, None)
        elif (
            to_state != AlarmControlPanelState.DISARMED
            and self._state == AlarmControlPanelState.DISARMED
            and not self._config[ATTR_CODE_ARM_REQUIRED]
        ):
            self._changed_by = None
            return (True, None)
        elif (
            to_state != AlarmControlPanelState.DISARMED
            and self._state != AlarmControlPanelState.DISARMED
            and not self._config[const.ATTR_CODE_MODE_CHANGE_REQUIRED]
        ):
            self._changed_by = None
            return (True, None)
        elif not code or len(code) < 1:
            return (False, const.EVENT_NO_CODE_PROVIDED)

        res = self.hass.data[const.DOMAIN]["coordinator"].async_authenticate_user(code)
        if not res:
            # wrong code was entered
            return (False, const.EVENT_INVALID_CODE_PROVIDED)
        elif res[const.ATTR_AREA_LIMIT] and not all(
            area in res[const.ATTR_AREA_LIMIT]
            for area in (
                [self.area_id]
                if self.area_id
                else list(self.hass.data[const.DOMAIN]["areas"].keys())
            )
        ):
            # user is not allowed to operate this area
            _LOGGER.debug(
                "User %s has no permission to arm/disarm this area.",
                res[ATTR_NAME],
            )
            return (False, const.EVENT_INVALID_CODE_PROVIDED)
        elif to_state == AlarmControlPanelState.DISARMED and not res["can_disarm"]:
            # user is not allowed to disarm the alarm
            _LOGGER.debug(
                "User %s has no permission to disarm the alarm.",
                res[ATTR_NAME],
            )
            return (False, const.EVENT_INVALID_CODE_PROVIDED)
        elif to_state in const.ARM_MODES and not res["can_arm"]:
            # user is not allowed to arm the alarm
            _LOGGER.debug(
                "User %s has no permission to arm the alarm.",
                res[ATTR_NAME],
            )
            return (False, const.EVENT_INVALID_CODE_PROVIDED)
        else:
            self._changed_by = res[ATTR_NAME]
            return (True, res)

    @callback
    def async_service_disarm_handler(self, code, context_id=None):
        """Handle external disarm request from alarmo.disarm service"""
        _LOGGER.debug("Service alarmo.disarm was called")

        self.alarm_disarm(code=code, context_id=context_id)

    @callback
    def alarm_disarm(self, code, **kwargs):
        """Send disarm command."""
        _LOGGER.debug("alarm_disarm")
        skip_code = kwargs.get("skip_code", False)
        context_id = kwargs.get("context_id", None)

        if self._state == AlarmControlPanelState.DISARMED or not self._config:
            if not self._config:
                _LOGGER.warning(
                    "Cannot process disarm command, alarm is not initialized yet."
                )
            else:
                _LOGGER.warning(
                    "Cannot go to state %s from state %s.",
                    AlarmControlPanelState.DISARMED,
                    self._state,
                )
            dispatcher_send(
                self.hass,
                "alarmo_event",
                const.EVENT_COMMAND_NOT_ALLOWED,
                self.area_id,
                {
                    "state": self._state,
                    "command": const.COMMAND_DISARM,
                    const.ATTR_CONTEXT_ID: context_id,
                },
            )
            return
        (res, info) = self._validate_code(code, AlarmControlPanelState.DISARMED)
        if not res and not skip_code:
            dispatcher_send(
                self.hass,
                "alarmo_event",
                info,
                self.area_id,
                {
                    const.ATTR_CONTEXT_ID: context_id,
                    "command": const.COMMAND_DISARM,
                },
            )
            _LOGGER.warning("Wrong code provided.")
            return
        else:
            self.open_sensors = None
            self.bypassed_sensors = None
            self.async_update_state(AlarmControlPanelState.DISARMED)
            if self.changed_by:
                _LOGGER.info(
                    "Alarm '%s' is disarmed by %s.",
                    self.name,
                    self.changed_by,
                )
            else:
                _LOGGER.info(
                    "Alarm '%s' is disarmed.",
                    self.name,
                )

            dispatcher_send(
                self.hass,
                "alarmo_event",
                const.EVENT_DISARM,
                self.area_id,
                {const.ATTR_CONTEXT_ID: context_id},
            )
            return True

    @callback
    def async_service_arm_handler(self, code, mode, skip_delay, force, context_id=None):
        """Handle external arm request from alarmo.arm service"""
        _LOGGER.debug("Service alarmo.arm was called")

        if mode in const.ARM_MODE_TO_STATE:
            mode = const.ARM_MODE_TO_STATE[mode]

        self.async_handle_arm_request(
            mode,
            code=code,
            skip_delay=skip_delay,
            bypass_open_sensors=force,
            context_id=context_id,
        )

    @callback
    def async_handle_arm_request(self, arm_mode, **kwargs):
        """Check if conditions are met for starting arm procedure"""
        code = kwargs.get(const.CONF_CODE, "")
        skip_code = kwargs.get("skip_code", False)
        skip_delay = kwargs.get(const.ATTR_SKIP_DELAY, False)
        bypass_open_sensors = kwargs.get("bypass_open_sensors", False)
        context_id = kwargs.get("context_id", None)

        if (
            not (const.MODES_TO_SUPPORTED_FEATURES[arm_mode] & self.supported_features)
            or (
                self._state != AlarmControlPanelState.DISARMED
                and self._state not in const.ARM_MODES
            )
            or not self._config
        ):
            if not self._config or not self._state:
                _LOGGER.warning(
                    "Cannot process arm command, alarm is not initialized yet."
                )
            elif not (
                const.MODES_TO_SUPPORTED_FEATURES[arm_mode] & self.supported_features
            ):
                _LOGGER.warning(
                    "Mode %s is not supported, ignoring.",
                    arm_mode,
                )
            else:
                _LOGGER.warning(
                    "Cannot go to state %s from state %s.",
                    arm_mode,
                    self._state,
                )
            dispatcher_send(
                self.hass,
                "alarmo_event",
                const.EVENT_COMMAND_NOT_ALLOWED,
                self.area_id,
                {
                    "state": self._state,
                    "command": arm_mode.replace("armed", "arm"),
                    const.ATTR_CONTEXT_ID: context_id,
                },
            )
            return False
        elif self._state in const.ARM_MODES and self._arm_mode == arm_mode:
            _LOGGER.debug(
                "Alarm is already set to %s, ignoring command.",
                arm_mode,
            )
            return False

        if not skip_code:
            (res, info) = self._validate_code(code, arm_mode)
            if not res:
                dispatcher_send(
                    self.hass,
                    "alarmo_event",
                    info,
                    self.area_id,
                    {
                        "command": arm_mode.replace("armed", "arm"),
                        const.ATTR_CONTEXT_ID: context_id,
                    },
                )
                _LOGGER.warning("Wrong code provided.")
                if self.open_sensors:
                    self.open_sensors = None
                    self.schedule_update_ha_state()
                return False
            elif info and info[const.ATTR_IS_OVERRIDE_CODE]:
                bypass_open_sensors = True
        else:
            self._changed_by = None

        if self._state in const.ARM_MODES:
            # we are switching between arm modes
            self._revert_state = self._state
        else:
            self._revert_state = AlarmControlPanelState.DISARMED
            self.open_sensors = None
            self.bypassed_sensors = None

        self.async_arm(
            arm_mode,
            skip_delay=skip_delay,
            bypass_open_sensors=bypass_open_sensors,
            context_id=context_id,
        )

    @callback
    def async_service_skip_delay_handler(self):
        """Service handler for alarmo.skip_delay."""
        _LOGGER.debug("Service alarmo.skip_delay was called")

        if self._state not in [
            AlarmControlPanelState.ARMING,
            AlarmControlPanelState.PENDING,
        ]:
            raise HomeAssistantError(
                f"Entity has state '{self._state}', but must be in state '{AlarmControlPanelState.ARMING}' or '{AlarmControlPanelState.PENDING}'."
            )

        elif self._state == AlarmControlPanelState.ARMING:
            self.async_arm(self.arm_mode, skip_delay=True)
        elif self._state == AlarmControlPanelState.PENDING:
            self.async_trigger(entry_delay=0)

    @abstractmethod
    @callback
    def async_update_state(self, state: str = None) -> None:
        """Update the state or refresh state attributes"""

    @abstractmethod
    @callback
    def async_trigger(
        self, entry_delay: int | None = None, open_sensors: dict[str, str] | None = None
    ):
        """Trigger the alarm."""

    async def async_alarm_arm_away(
        self, code=None, skip_code=False, bypass_open_sensors=False, skip_delay=False
    ):
        """Send arm away command."""
        _LOGGER.debug("alarm_arm_away")
        self.async_handle_arm_request(
            AlarmControlPanelState.ARMED_AWAY,
            code=code,
            skip_code=skip_code,
            bypass_open_sensors=bypass_open_sensors,
            skip_delay=skip_delay,
        )

    async def async_alarm_arm_home(
        self, code=None, skip_code=False, bypass_open_sensors=False, skip_delay=False
    ):
        """Send arm home command."""
        _LOGGER.debug("alarm_arm_home")
        self.async_handle_arm_request(
            AlarmControlPanelState.ARMED_HOME,
            code=code,
            skip_code=skip_code,
            bypass_open_sensors=bypass_open_sensors,
            skip_delay=skip_delay,
        )

    async def async_alarm_arm_night(
        self, code=None, skip_code=False, bypass_open_sensors=False, skip_delay=False
    ):
        """Send arm night command."""
        _LOGGER.debug("alarm_arm_night")
        self.async_handle_arm_request(
            AlarmControlPanelState.ARMED_NIGHT,
            code=code,
            skip_code=skip_code,
            bypass_open_sensors=bypass_open_sensors,
            skip_delay=skip_delay,
        )

    async def async_alarm_arm_custom_bypass(
        self, code=None, skip_code=False, bypass_open_sensors=False, skip_delay=False
    ):
        """Send arm custom_bypass command."""
        _LOGGER.debug("alarm_arm_custom_bypass")
        self.async_handle_arm_request(
            AlarmControlPanelState.ARMED_CUSTOM_BYPASS,
            code=code,
            skip_code=skip_code,
            bypass_open_sensors=bypass_open_sensors,
            skip_delay=skip_delay,
        )

    async def async_alarm_arm_vacation(
        self, code=None, skip_code=False, bypass_open_sensors=False, skip_delay=False
    ):
        """Send arm vacation command."""
        _LOGGER.debug("alarm_arm_vacation")
        self.async_handle_arm_request(
            AlarmControlPanelState.ARMED_VACATION,
            code=code,
            skip_code=skip_code,
            bypass_open_sensors=bypass_open_sensors,
            skip_delay=skip_delay,
        )

    async def async_alarm_trigger(self, code=None) -> None:
        """Send alarm trigger command."""
        _LOGGER.debug("async_alarm_trigger")
        self.async_trigger(entry_delay=0)

    async def async_added_to_hass(self):
        """Connect to dispatcher listening for entity data notifications."""
        _LOGGER.debug(
            "%s is added to hass",
            self.entity_id,
        )
        await super().async_added_to_hass()

        state = await self.async_get_last_state()

        # restore previous state
        if state:
            # restore attributes
            if "arm_mode" in state.attributes:
                self._arm_mode = state.attributes["arm_mode"]
            if "changed_by" in state.attributes:
                self._changed_by = state.attributes["changed_by"]
            if "open_sensors" in state.attributes:
                self.open_sensors = state.attributes["open_sensors"]
            if "bypassed_sensors" in state.attributes:
                self._bypassed_sensors = state.attributes["bypassed_sensors"]
            if "last_triggered" in state.attributes:
                self._last_triggered = state.attributes["last_triggered"]

    async def async_will_remove_from_hass(self):
        await super().async_will_remove_from_hass()
        _LOGGER.debug(
            "%s is removed from hass",
            self.entity_id,
        )


class AlarmoAreaEntity(AlarmoBaseEntity):
    """Defines a base alarm_control_panel entity."""

    def __init__(
        self, hass: HomeAssistant, name: str, entity_id: str, area_id: str
    ) -> None:
        """Initialize the alarm_control_panel entity."""
        super().__init__(hass, name, entity_id)

        self.area_id = area_id
        self._timer = None
        coordinator = self.hass.data[const.DOMAIN]["coordinator"]
        self._config = coordinator.store.async_get_config()
        self._config.update(coordinator.store.async_get_area(self.area_id))

    @property
    def supported_features(self) -> int:
        """Return the list of supported features."""
        if not self._config or const.ATTR_MODES not in self._config:
            return 0
        else:
            supported_features = AlarmControlPanelEntityFeature.TRIGGER
            for mode, mode_config in self._config[const.ATTR_MODES].items():
                if mode_config[const.ATTR_ENABLED]:
                    supported_features = (
                        supported_features | const.MODES_TO_SUPPORTED_FEATURES[mode]
                    )

            return supported_features

    @property
    def next_state(self):
        """Return the state after transition (countdown) state."""
        next_state = self.state
        if self._state == AlarmControlPanelState.ARMING:
            next_state = self.arm_mode
        elif self._state == AlarmControlPanelState.PENDING:
            next_state = AlarmControlPanelState.TRIGGERED
        elif self._state == AlarmControlPanelState.TRIGGERED:
            if (
                not self._config
                or not self._arm_mode
                or not self._config[const.ATTR_MODES][self._arm_mode]["trigger_time"]
            ):
                next_state = AlarmControlPanelState.TRIGGERED
            elif self._config[const.ATTR_DISARM_AFTER_TRIGGER] or not self.arm_mode:
                next_state = AlarmControlPanelState.DISARMED
            else:
                next_state = self.arm_mode
        return next_state

    async def async_added_to_hass(self):
        """Connect to dispatcher listening for entity data notifications."""
        await super().async_added_to_hass()

        # make sure that the config is reloaded on changes
        @callback
        def async_update_config(area_id: str = None):
            _LOGGER.debug("async_update_config")
            coordinator = self.hass.data[const.DOMAIN]["coordinator"]
            self._config = coordinator.store.async_get_config()
            self._config.update(coordinator.store.async_get_area(self.area_id))
            self.schedule_update_ha_state()

        self.async_on_remove(
            async_dispatcher_connect(
                self.hass, "alarmo_config_updated", async_update_config
            )
        )

        # restore previous state
        state = await self.async_get_last_state()
        if state:
            initial_state = state.state
            _LOGGER.debug(
                "Initial state for %s is %s",
                self.entity_id,
                initial_state,
            )
            if initial_state == AlarmControlPanelState.ARMING:
                self.async_arm(self.arm_mode)
            elif initial_state == AlarmControlPanelState.PENDING:
                self.async_trigger()
            elif initial_state == AlarmControlPanelState.TRIGGERED:
                self.async_trigger(entry_delay=0)
            else:
                self.async_update_state(initial_state)
        else:
            self.async_update_state(AlarmControlPanelState.DISARMED)

        self.async_write_ha_state()

    @callback
    def async_update_state(self, state: str = None):
        """Update the state or refresh state attributes"""
        if state == self._state:
            return

        old_state = self._state
        self._state = state

        _LOGGER.debug(
            "entity %s was updated from %s to %s",
            self.entity_id,
            old_state,
            state,
        )

        if state in const.ARM_MODES + [AlarmControlPanelState.DISARMED]:
            # cancel a running timer that possibly running when transitioning from states arming, pending, triggered
            self.async_clear_timer()

        if self.state not in [
            AlarmControlPanelState.ARMING,
            AlarmControlPanelState.PENDING,
        ]:
            self.delay = None

        if state in const.ARM_MODES:
            self._arm_mode = state
            self._revert_state = None
        elif (
            old_state == AlarmControlPanelState.DISARMED
            and state == AlarmControlPanelState.TRIGGERED
        ):
            self._arm_mode = None

        # perform state update of entity prior to executing dispatcher callbacks, such that automations can use the updated state
        self.schedule_update_ha_state()

        dispatcher_send(
            self.hass, "alarmo_state_updated", self.area_id, old_state, state
        )

    def async_arm_failure(self, open_sensors: dict, context_id=None):
        """Handle arm failure."""
        self._open_sensors = open_sensors
        command = self._arm_mode.replace("armed", "arm")

        if self._state != self._revert_state and self._revert_state:
            self.async_update_state(self._revert_state)
        else:
            # when disarmed, only update the attributes
            if self._revert_state in const.ARM_MODES:
                prev_arm_mode = self._arm_mode
                self._arm_mode = self._revert_state
                self._revert_state = prev_arm_mode

            self.schedule_update_ha_state()

        dispatcher_send(
            self.hass,
            "alarmo_event",
            const.EVENT_FAILED_TO_ARM,
            self.area_id,
            {
                "open_sensors": open_sensors,
                "command": command,
                const.ATTR_CONTEXT_ID: context_id,
            },
        )

    @callback
    def async_arm(self, arm_mode, **kwargs):
        """Arm the alarm or switch between arm modes."""
        skip_delay = kwargs.get("skip_delay", False)
        skip_validation = kwargs.get("skip_validation", False)
        self._bypass_open_sensors = kwargs.get(
            "bypass_open_sensors", self._bypass_open_sensors
        )
        context_id = kwargs.get("context_id", None)

        self._arm_mode = arm_mode
        exit_delay = int(self._config[const.ATTR_MODES][arm_mode]["exit_time"] or 0)

        if skip_delay or not exit_delay:
            # immediate arm event

            (open_sensors, bypassed_sensors) = self.hass.data[const.DOMAIN][
                "sensor_handler"
            ].validate_arming_event(
                area_id=self.area_id,
                target_state=arm_mode,
                bypass_open_sensors=self._bypass_open_sensors,
            )

            if open_sensors and not skip_validation:
                # there where errors -> abort the arm
                _LOGGER.warning(
                    "Cannot transition from state %s to state %s, there are open sensors",
                    self._state,
                    arm_mode,
                )
                self.async_arm_failure(open_sensors, context_id=context_id)
                return False
            else:
                # proceed the arm
                if bypassed_sensors:
                    self.bypassed_sensors = bypassed_sensors
                self.open_sensors = open_sensors if open_sensors else None
                if self.changed_by:
                    _LOGGER.info(
                        "Alarm '%s' is armed (%s) by %s.",
                        self.name,
                        arm_mode,
                        self.changed_by,
                    )
                else:
                    _LOGGER.info(
                        "Alarm '%s' is armed (%s).",
                        self.name,
                        arm_mode,
                    )
                if self._state and self._state != AlarmControlPanelState.ARMING:
                    dispatcher_send(
                        self.hass,
                        "alarmo_event",
                        const.EVENT_ARM,
                        self.area_id,
                        {
                            "arm_mode": arm_mode,
                            "delay": 0,
                            const.ATTR_CONTEXT_ID: context_id,
                        },
                    )
                self.async_update_state(arm_mode)
                return True

        else:  # normal arm event (from disarmed via arming)
            (open_sensors, _bypassed_sensors) = self.hass.data[const.DOMAIN][
                "sensor_handler"
            ].validate_arming_event(
                area_id=self.area_id,
                target_state=arm_mode,
                use_delay=True,
                bypass_open_sensors=self._bypass_open_sensors,
            )

            if open_sensors and not skip_validation:
                # there where errors -> abort the arm
                _LOGGER.warning("Cannot arm right now, there are open sensors")
                self.async_arm_failure(open_sensors, context_id=context_id)
                return False
            else:
                # proceed the arm
                _LOGGER.info(
                    "Alarm is now arming. Waiting for %s seconds.",
                    exit_delay,
                )

                @callback
                def async_leave_timer_finished(now):
                    """Update state at a scheduled point in time."""
                    _LOGGER.debug("async_leave_timer_finished")
                    self.async_clear_timer()
                    self.async_arm(self.arm_mode, skip_delay=True)

                self.async_set_timer(exit_delay, async_leave_timer_finished)
                self.delay = exit_delay
                self.open_sensors = open_sensors if open_sensors else None

                dispatcher_send(
                    self.hass,
                    "alarmo_event",
                    const.EVENT_ARM,
                    self.area_id,
                    {
                        "arm_mode": arm_mode,
                        "delay": exit_delay,
                        const.ATTR_CONTEXT_ID: context_id,
                    },
                )
                self.async_update_state(AlarmControlPanelState.ARMING)

                return True

    @callback
    def async_trigger(
        self, entry_delay: int | None = None, open_sensors: dict[str, str] | None = None
    ):
        """Trigger request. Can be called multiple times for timer shortening or immediate triggers."""
        if not self.arm_mode:
            effective_entry_delay = 0
        elif entry_delay is not None:
            if entry_delay == 0:
                # Immediate trigger (was skip_delay=True)
                effective_entry_delay = 0
            elif self._state == AlarmControlPanelState.PENDING:
                # Already pending - check for timer shortening
                current_remaining = (
                    (self.expiration - dt_util.utcnow()).total_seconds()
                    if self.expiration
                    else 0
                )
                if entry_delay < current_remaining:
                    # TIMER SHORTENING: Clear current timer and restart with shorter delay
                    _LOGGER.debug(
                        f"Timer shortened from {current_remaining:.0f}s to {entry_delay}s"
                    )
                    self.async_clear_timer()

                    @callback
                    def async_entry_timer_shortened(_now: datetime.datetime) -> None:
                        """Update state at a scheduled point in time."""
                        self.async_clear_timer()
                        _LOGGER.debug("async_entry_timer_shortened")
                        self.async_trigger(entry_delay=0)

                    self.async_set_timer(entry_delay, async_entry_timer_shortened)
                    self.delay = entry_delay
                    # Stay in PENDING state with new shorter timer
                    return
                else:
                    # Ignore longer delay while pending - don't interfere with existing timer
                    _LOGGER.debug(
                        f"Ignoring longer delay {entry_delay}s while pending (current: {current_remaining:.0f}s remaining)"
                    )
                    return
            else:
                # First trigger: use provided delay
                effective_entry_delay = entry_delay
        else:
            # Fall back to area default (entry_delay is not provided)
            effective_entry_delay = int(
                self._config[const.ATTR_MODES][self.arm_mode]["entry_time"] or 0
            )

        if self.arm_mode:
            trigger_time = int(
                self._config[const.ATTR_MODES][self.arm_mode]["trigger_time"] or 0
            )
        else:
            # if the alarm is not armed, take the maximum trigger_time of all modes
            trigger_times = []
            for mode_config in self._config[const.ATTR_MODES].values():
                if mode_config[const.ATTR_ENABLED]:
                    trigger_times.append(int(mode_config["trigger_time"] or 0))
            trigger_time = 0 if 0 in trigger_times else max(trigger_times)

        if self._state and (
            self._state != AlarmControlPanelState.PENDING
            or (
                self._state == AlarmControlPanelState.PENDING
                and entry_delay == 0
                and open_sensors != self.open_sensors
            )
        ):
            # send event on trigger (includes timer shortening scenarios)
            dispatcher_send(
                self.hass,
                "alarmo_event",
                const.EVENT_TRIGGER,
                self.area_id,
                {
                    "open_sensors": open_sensors
                    if open_sensors
                    else self._open_sensors,
                    "delay": effective_entry_delay,
                },
            )

        if open_sensors:
            self.open_sensors = open_sensors

        if not effective_entry_delay:
            # countdown finished or immediate trigger event

            if trigger_time:
                # there is a max. trigger time configured

                @callback
                def async_trigger_timer_finished(now):
                    """Update state at a scheduled point in time."""
                    _LOGGER.debug("async_trigger_timer_finished")
                    self._changed_by = None
                    self.async_clear_timer()
                    if (
                        self._config[const.ATTR_DISARM_AFTER_TRIGGER]
                        or not self.arm_mode
                    ):
                        self.bypassed_sensors = None
                        self.async_update_state(AlarmControlPanelState.DISARMED)
                    elif self._config[const.ATTR_IGNORE_BLOCKING_SENSORS_AFTER_TRIGGER]:
                        self.open_sensors = None
                        self.async_arm(
                            self.arm_mode, skip_validation=True, skip_delay=True
                        )
                    else:
                        self.open_sensors = None
                        self._revert_state = AlarmControlPanelState.DISARMED
                        self.async_arm(
                            self.arm_mode, bypass_open_sensors=False, skip_delay=True
                        )

                    dispatcher_send(
                        self.hass,
                        "alarmo_event",
                        const.EVENT_TRIGGER_TIME_EXPIRED,
                        self.area_id,
                        {},
                    )

                self.async_set_timer(trigger_time, async_trigger_timer_finished)
            else:
                # clear previous timer when transitioning from pending state
                self.async_clear_timer()

            _LOGGER.warning("Alarm is triggered!")
            self.async_update_state(AlarmControlPanelState.TRIGGERED)
            self._last_triggered = dt_util.now().strftime("%Y-%m-%d %H:%M:%S")

        else:  # to pending state

            @callback
            def async_entry_timer_finished(now):
                """Update state at a scheduled point in time."""
                self.async_clear_timer()

                _LOGGER.debug("async_entry_timer_finished")
                self.async_trigger(entry_delay=0)

            self.async_set_timer(effective_entry_delay, async_entry_timer_finished)
            entry_delay_changed = self.delay and self.delay != effective_entry_delay
            self.delay = effective_entry_delay
            _LOGGER.info(
                "Alarm will be triggered after %s seconds.",
                effective_entry_delay,
            )

            if self._state == AlarmControlPanelState.PENDING and entry_delay_changed:
                # trigger HA entity state+attributes refresh (as async_update_state will not have any effect)
                self.schedule_update_ha_state()
            else:
                self.async_update_state(AlarmControlPanelState.PENDING)

    def async_clear_timer(self):
        """Clear a running timer."""
        if self._timer:
            self._timer()
            self._timer = None

    def async_set_timer(self, delay: int | datetime.timedelta, cb_func: callable):
        self.async_clear_timer()
        now = dt_util.utcnow()

        if not isinstance(delay, datetime.timedelta):
            delay = datetime.timedelta(seconds=delay)

        self._timer = async_track_point_in_time(self.hass, cb_func, now + delay)

    def update_ready_to_arm_modes(self, value):
        """Set arm modes which are ready for arming (no blocking sensors)."""
        if value == self._ready_to_arm_modes:
            return
        _LOGGER.debug(
            "ready_to_arm_modes for %s updated to %s",
            self.name,
            ", ".join(value).replace("armed_", ""),
        )
        self._ready_to_arm_modes = value
        dispatcher_send(
            self.hass,
            "alarmo_event",
            const.EVENT_READY_TO_ARM_MODES_CHANGED,
            self.area_id,
            {const.ATTR_MODES: value},
        )


class AlarmoMasterEntity(AlarmoBaseEntity):
    """Defines a base alarm_control_panel entity."""

    def __init__(self, hass: HomeAssistant, name: str, entity_id: str) -> None:
        """Initialize the alarm_control_panel entity."""
        super().__init__(hass, name, entity_id)
        self.area_id = None
        self._target_state = None

    @property
    def supported_features(self) -> int:
        """Return the list of supported features."""
        supported_features = [
            item.supported_features or 0
            for item in self.hass.data[const.DOMAIN]["areas"].values()
        ]
        return functools.reduce(operator.and_, supported_features)

    @property
    def next_state(self):
        """Return the state after transition (countdown) state."""
        next_states = list(
            set(
                [
                    item.next_state
                    for item in self.hass.data[const.DOMAIN]["areas"].values()
                ]
            )
        )

        next_state = self.state
        if len(next_states) == 1:
            next_state = next_states[0]
        elif AlarmControlPanelState.TRIGGERED in next_states:
            next_state = AlarmControlPanelState.TRIGGERED

        return next_state

    async def async_added_to_hass(self):
        """Connect to dispatcher listening for entity data notifications."""
        await super().async_added_to_hass()

        # load the configuration and make sure that it is reloaded on changes
        @callback
        def async_update_config(area_id=None):
            if area_id and area_id in self.hass.data[const.DOMAIN]["areas"]:
                # wait for update of the area entity, to refresh the supported_features
                async_call_later(self.hass, 1, async_update_config)
                return

            coordinator = self.hass.data[const.DOMAIN]["coordinator"]
            self._config = coordinator.store.async_get_config()

            self.async_update_state()
            self.schedule_update_ha_state()

        self.async_on_remove(
            async_dispatcher_connect(
                self.hass, "alarmo_config_updated", async_update_config
            )
        )
        async_update_config()

        @callback
        def async_alarm_state_changed(area_id: str, old_state: str, new_state: str):
            if not area_id:
                return
            self.async_update_state()

        async_dispatcher_connect(
            self.hass, "alarmo_state_updated", async_alarm_state_changed
        )

        @callback
        def async_handle_event(event: str, area_id: str, args: dict = {}):
            if not area_id or event not in [
                const.EVENT_FAILED_TO_ARM,
                const.EVENT_TRIGGER,
                const.EVENT_TRIGGER_TIME_EXPIRED,
                const.EVENT_READY_TO_ARM_MODES_CHANGED,
            ]:
                return
            if event == const.EVENT_FAILED_TO_ARM and self._target_state is not None:
                open_sensors = args["open_sensors"]
                self.async_arm_failure(open_sensors)
            if event == const.EVENT_TRIGGER and (
                self._state
                not in [
                    AlarmControlPanelState.TRIGGERED,
                    AlarmControlPanelState.PENDING,
                ]
                or (
                    self._state == AlarmControlPanelState.PENDING
                    and self.delay
                    and self.delay > args.get("delay", 0)
                )
            ):
                # only pass initial trigger event or while trigger with shorter entry delay occurs during entry time
                dispatcher_send(
                    self.hass, "alarmo_event", const.EVENT_TRIGGER, self.area_id, args
                )
            if event == const.EVENT_TRIGGER_TIME_EXPIRED:
                if (
                    self.hass.data[const.DOMAIN]["areas"][area_id].state
                    == AlarmControlPanelState.DISARMED
                ):
                    self.alarm_disarm(skip_code=True)
            if event == const.EVENT_READY_TO_ARM_MODES_CHANGED:
                self.update_ready_to_arm_modes()

        async_dispatcher_connect(self.hass, "alarmo_event", async_handle_event)

        state = await self.async_get_last_state()
        if state and state.state:
            self._state = state.state
        else:
            self._state = AlarmControlPanelState.DISARMED
        self.async_write_ha_state()

    @callback
    def async_update_state(self, state: str = None):
        """Update the state or refresh state attributes"""
        if state:
            # do not allow updating the state directly
            return

        states = [item.state for item in self.hass.data[const.DOMAIN]["areas"].values()]
        state = None
        if AlarmControlPanelState.TRIGGERED in states:
            state = AlarmControlPanelState.TRIGGERED
        elif AlarmControlPanelState.PENDING in states:
            state = AlarmControlPanelState.PENDING
        elif AlarmControlPanelState.ARMING in states and all(
            el in const.ARM_MODES or el == AlarmControlPanelState.ARMING
            for el in states
        ):
            state = AlarmControlPanelState.ARMING
        elif all(el == AlarmControlPanelState.ARMED_AWAY for el in states):
            state = AlarmControlPanelState.ARMED_AWAY
        elif all(el == AlarmControlPanelState.ARMED_HOME for el in states):
            state = AlarmControlPanelState.ARMED_HOME
        elif all(el == AlarmControlPanelState.ARMED_NIGHT for el in states):
            state = AlarmControlPanelState.ARMED_NIGHT
        elif all(el == AlarmControlPanelState.ARMED_CUSTOM_BYPASS for el in states):
            state = AlarmControlPanelState.ARMED_CUSTOM_BYPASS
        elif all(el == AlarmControlPanelState.ARMED_VACATION for el in states):
            state = AlarmControlPanelState.ARMED_VACATION
        elif all(el == AlarmControlPanelState.DISARMED for el in states):
            state = AlarmControlPanelState.DISARMED

        arm_modes = [
            item._arm_mode for item in self.hass.data[const.DOMAIN]["areas"].values()
        ]
        arm_mode = arm_modes[0] if len(set(arm_modes)) == 1 else None

        if state == self._target_state:
            # we are transitioning to an armed state and target state is reached
            self._target_state = None

        if state in [AlarmControlPanelState.ARMING, AlarmControlPanelState.PENDING]:
            # one or more areas went to arming/pending state, recalculate the delay time

            area_filter = dict(
                filter(
                    lambda el: el[1].state == state,
                    self.hass.data[const.DOMAIN]["areas"].items(),
                )
            )
            delays = [el.delay for el in area_filter.values()]

            # use maximum of all areas when arming, minimum of all areas when pending
            delay = (
                max(delays)
                if state == AlarmControlPanelState.ARMING
                else min(delays)
                if delays
                else None
            )
        else:
            delay = None

        # take open sensors by combining areas having same state
        open_sensors = {}
        area_filter = dict(
            filter(
                lambda el: el[1].state == state,
                self.hass.data[const.DOMAIN]["areas"].items(),
            )
        )
        for item in area_filter.values():
            if item.open_sensors:
                open_sensors.update(item.open_sensors)

        if (
            arm_mode == self._arm_mode
            and (state == self._state or not state)
            and delay == self.delay
            and open_sensors == self.open_sensors
        ):
            # do not update if state and properties remain unchanged
            return

        self._arm_mode = arm_mode
        self.delay = delay
        self.open_sensors = open_sensors

        old_state = self._state
        new_state = state if state != self._state else None

        if new_state:
            self._state = new_state
            _LOGGER.debug(
                "entity %s was updated from %s to %s",
                self.entity_id,
                old_state,
                new_state,
            )

            if new_state == AlarmControlPanelState.TRIGGERED:
                self._last_triggered = dt_util.now().strftime("%Y-%m-%d %H:%M:%S")

        # take bypassed sensors by combining all areas
        bypassed_sensors = []
        for item in self.hass.data[const.DOMAIN]["areas"].values():
            if item.bypassed_sensors:
                bypassed_sensors.extend(item.bypassed_sensors)
        self.bypassed_sensors = bypassed_sensors

        self.update_ready_to_arm_modes()

        self.schedule_update_ha_state()

        # perform state update of entity prior to executing dispatcher callbacks, such that automations can use the updated state
        if new_state:
            dispatcher_send(
                self.hass, "alarmo_state_updated", None, old_state, new_state
            )

    @callback
    def alarm_disarm(self, code=None, **kwargs):
        """Send disarm command."""
        skip_code = kwargs.get("skip_code", False)
        context_id = kwargs.get("context_id", None)

        """Send disarm command."""
        res = super().alarm_disarm(code=code, skip_code=skip_code)
        if res:
            for item in self.hass.data[const.DOMAIN]["areas"].values():
                if item.state != AlarmControlPanelState.DISARMED:
                    item.alarm_disarm(code=code, skip_code=skip_code)

            dispatcher_send(
                self.hass,
                "alarmo_event",
                const.EVENT_DISARM,
                self.area_id,
                {const.ATTR_CONTEXT_ID: context_id},
            )

    def async_arm(self, arm_mode, **kwargs):
        """Arm the alarm or switch between arm modes."""
        skip_delay = kwargs.get("skip_delay", False)
        bypass_open_sensors = kwargs.get("bypass_open_sensors", False)
        context_id = kwargs.get("context_id", None)
        self._target_state = arm_mode

        open_sensors = {}
        for item in self.hass.data[const.DOMAIN]["areas"].values():
            if (
                (item.state in const.ARM_MODES and item.arm_mode != arm_mode)
                or item.state == AlarmControlPanelState.DISARMED
                or (item.state == AlarmControlPanelState.ARMING and skip_delay)
            ):
                item._revert_state = (
                    item._state
                    if item._state in const.ARM_MODES
                    else AlarmControlPanelState.DISARMED
                )
                res = item.async_arm(
                    arm_mode,
                    skip_delay=skip_delay,
                    bypass_open_sensors=bypass_open_sensors,
                )
                if not res:
                    open_sensors.update(item.open_sensors)

        if open_sensors:
            self.async_arm_failure(open_sensors, context_id=context_id)
        else:
            delay = 0
            area_config = self.hass.data[const.DOMAIN][
                "coordinator"
            ].store.async_get_areas()
            for area_id, entity in self.hass.data[const.DOMAIN]["areas"].items():
                if entity.state == AlarmControlPanelState.ARMING:
                    t = area_config[area_id][const.ATTR_MODES][arm_mode]["exit_time"]
                    delay = t if int(t or 0) > delay else delay

            dispatcher_send(
                self.hass,
                "alarmo_event",
                const.EVENT_ARM,
                self.area_id,
                {
                    "arm_mode": arm_mode,
                    "delay": delay,
                    const.ATTR_CONTEXT_ID: context_id,
                },
            )

    def async_arm_failure(self, open_sensors: dict, context_id=None):
        """Handle arm failure."""
        self.open_sensors = open_sensors
        command = self._target_state.replace("armed", "arm")

        for item in self.hass.data[const.DOMAIN]["areas"].values():
            if item.state != self._revert_state and self._revert_state:
                item.async_update_state(self._revert_state)

        self._revert_state = self._target_state
        self._target_state = None
        dispatcher_send(
            self.hass,
            "alarmo_event",
            const.EVENT_FAILED_TO_ARM,
            None,
            {
                "open_sensors": open_sensors,
                "command": command,
                const.ATTR_CONTEXT_ID: context_id,
            },
        )
        self.schedule_update_ha_state()

    @callback
    def async_trigger(
        self, entry_delay: int | None = None, open_sensors: dict[str, str] | None = None
    ):
        """Handle triggering via service call"""
        for item in self.hass.data[const.DOMAIN]["areas"].values():
            if item.state != self._revert_state:
                item.async_trigger(entry_delay=entry_delay, open_sensors=open_sensors)

    def update_ready_to_arm_modes(self):
        """Set arm modes which are ready for arming (no blocking sensors)."""
        modes_list = const.ARM_MODES
        for item in self.hass.data[const.DOMAIN]["areas"].values():
            modes_list = list(
                filter(lambda x: x in item._ready_to_arm_modes, modes_list)
            )
        if modes_list == self._ready_to_arm_modes:
            return
        self._ready_to_arm_modes = modes_list
        _LOGGER.debug(
            "ready_to_arm_modes for master updated to %s",
            ", ".join(modes_list).replace("armed_", ""),
        )
        dispatcher_send(
            self.hass,
            "alarmo_event",
            const.EVENT_READY_TO_ARM_MODES_CHANGED,
            self.area_id,
            {const.ATTR_MODES: modes_list},
        )
