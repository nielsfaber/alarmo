"""Automations."""

import re
import copy
import logging

from homeassistant.core import (
    HomeAssistant,
    callback,
)
from homeassistant.const import (
    CONF_TYPE,
    ATTR_SERVICE,
    ATTR_ENTITY_ID,
    CONF_SERVICE_DATA,
)
from homeassistant.exceptions import HomeAssistantError
from homeassistant.helpers.template import Template, is_template_string
from homeassistant.helpers.dispatcher import async_dispatcher_connect
from homeassistant.helpers.translation import async_get_translations
from homeassistant.components.binary_sensor.device_condition import (
    ENTITY_CONDITIONS,
)

from . import const
from .helpers import (
    friendly_name_for_entity_id,
)
from .sensors import (
    STATE_OPEN,
    STATE_CLOSED,
    STATE_UNAVAILABLE,
)
from .alarm_control_panel import AlarmoBaseEntity

_LOGGER = logging.getLogger(__name__)

EVENT_ARM_FAILURE = "arm_failure"


def validate_area(trigger, area_id, hass):
    """Validate area for trigger."""
    if const.ATTR_AREA not in trigger:
        return False
    elif trigger[const.ATTR_AREA]:
        return trigger[const.ATTR_AREA] == area_id
    elif len(hass.data[const.DOMAIN]["areas"]) == 1:
        return True
    else:
        return area_id is None


def validate_modes(trigger, mode):
    """Validate modes for trigger."""
    if const.ATTR_MODES not in trigger:
        return False
    elif not trigger[const.ATTR_MODES]:
        return True
    else:
        return mode in trigger[const.ATTR_MODES]


def validate_trigger(trigger, to_state, from_state=None):
    """Validate trigger condition."""
    if const.ATTR_EVENT not in trigger:
        return False
    elif trigger[const.ATTR_EVENT] == "untriggered" and from_state == "triggered":
        return True
    elif trigger[const.ATTR_EVENT] == to_state:
        return True
    else:
        return False


class AutomationHandler:
    """Handle automations."""

    def __init__(self, hass: HomeAssistant):
        """Initialize automation handler."""
        self.hass = hass
        self._config = None
        self._subscriptions = []
        self._sensorTranslationCache = {}
        self._alarmTranslationCache = {}
        self._sensorTranslationLang = None
        self._alarmTranslationLang = None

        def async_update_config():
            """Automation config updated, reload the configuration."""
            self._config = self.hass.data[const.DOMAIN][
                "coordinator"
            ].store.async_get_automations()

        self._subscriptions.append(
            async_dispatcher_connect(
                hass, "alarmo_automations_updated", async_update_config
            )
        )
        async_update_config()

        @callback
        async def async_alarm_state_changed(
            area_id: str, old_state: str, new_state: str
        ):
            if not old_state:
                # ignore automations at startup/restoring
                return

            if area_id:
                alarm_entity = self.hass.data[const.DOMAIN]["areas"][area_id]
            else:
                alarm_entity = self.hass.data[const.DOMAIN]["master"]

            if not alarm_entity:
                return

            _LOGGER.debug(
                "state of %s is updated from %s to %s",
                alarm_entity.entity_id,
                old_state,
                new_state,
            )

            if new_state in const.ARM_MODES:
                # we don't distinguish between armed modes for automations
                #   they are handled separately
                new_state = "armed"

            for automation_id, config in self._config.items():
                if not config[const.ATTR_ENABLED]:
                    continue
                for trigger in config[const.ATTR_TRIGGERS]:
                    if (
                        validate_area(trigger, area_id, self.hass)
                        and validate_modes(trigger, alarm_entity._arm_mode)
                        and validate_trigger(trigger, new_state, old_state)
                    ):
                        await self.async_execute_automation(automation_id, alarm_entity)

        self._subscriptions.append(
            async_dispatcher_connect(
                self.hass, "alarmo_state_updated", async_alarm_state_changed
            )
        )

        @callback
        async def async_handle_event(event: str, area_id: str, args: dict = {}):
            if event != const.EVENT_FAILED_TO_ARM:
                return
            if area_id:
                alarm_entity = self.hass.data[const.DOMAIN]["areas"][area_id]
            else:
                alarm_entity = self.hass.data[const.DOMAIN]["master"]

            _LOGGER.debug(
                "%s has failed to arm",
                alarm_entity.entity_id,
            )

            for automation_id, config in self._config.items():
                if not config[const.ATTR_ENABLED]:
                    continue
                for trigger in config[const.ATTR_TRIGGERS]:
                    if (
                        validate_area(trigger, area_id, self.hass)
                        and validate_modes(trigger, alarm_entity._arm_mode)
                        and validate_trigger(trigger, EVENT_ARM_FAILURE)
                    ):
                        await self.async_execute_automation(automation_id, alarm_entity)

        self._subscriptions.append(
            async_dispatcher_connect(self.hass, "alarmo_event", async_handle_event)
        )

    def __del__(self):
        """Prepare for removal."""
        while len(self._subscriptions):
            self._subscriptions.pop()()

    async def async_execute_automation(
        self, automation_id: str, alarm_entity: AlarmoBaseEntity
    ):
        """Execute the specified automation."""
        # automation is a dict of AutomationEntry
        _LOGGER.debug(
            "Executing automation %s",
            automation_id,
        )

        actions = self._config[automation_id][const.ATTR_ACTIONS]
        for action in actions:
            try:
                service_data = copy.copy(action[CONF_SERVICE_DATA])

                if action.get(ATTR_ENTITY_ID):
                    service_data[ATTR_ENTITY_ID] = action[ATTR_ENTITY_ID]

                if self._config[automation_id][CONF_TYPE] == const.ATTR_NOTIFICATION:
                    # replace wildcards within service_data struct
                    for key, val in service_data.items():
                        if type(val) is str:
                            service_data[key] = await self.replace_wildcards_in_string(
                                val, alarm_entity
                            )
                        elif type(val) is dict:
                            for subkey, subval in service_data[key].items():
                                if type(subval) is str:
                                    service_data[key][
                                        subkey
                                    ] = await self.replace_wildcards_in_string(
                                        subval, alarm_entity
                                    )

                domain, service = action[ATTR_SERVICE].split(".")

                await self.hass.async_create_task(
                    self.hass.services.async_call(
                        domain,
                        service,
                        service_data,
                        blocking=False,
                        context={},
                    )
                )
            except HomeAssistantError as e:
                _LOGGER.error(
                    "Execution of action %s failed, reason: %s",
                    automation_id,
                    e,
                )

    def get_automations_by_area(self, area_id: str):
        """Get automations for specified area."""
        result = []
        for automation_id, config in self._config.items():
            if any(
                el[const.ATTR_AREA] == area_id for el in config[const.ATTR_TRIGGERS]
            ):
                result.append(automation_id)

        return result

    async def replace_wildcards_in_string(
        self, input: str, alarm_entity: AlarmoBaseEntity
    ):
        """Look for wildcards in string and replace them with content."""
        # process wildcard '{{open_sensors}}'
        res = re.search(r"{{open_sensors(\|lang=([^}]+))?(\|format=short)?}}", input)
        if res:
            lang = res.group(2) if res.group(2) else "en"
            names_only = True if res.group(3) else False

            open_sensors = ""
            if alarm_entity.open_sensors:
                parts = []
                for entity_id, status in alarm_entity.open_sensors.items():
                    if names_only:
                        parts.append(friendly_name_for_entity_id(entity_id, self.hass))
                    else:
                        parts.append(
                            await self.async_get_open_sensor_string(
                                entity_id, status, lang
                            )
                        )
                open_sensors = ", ".join(parts)
            input = input.replace(res.group(0), open_sensors)

        # process wildcard '{{bypassed_sensors}}'
        if "{{bypassed_sensors}}" in input:
            bypassed_sensors = ""
            if alarm_entity.bypassed_sensors and len(alarm_entity.bypassed_sensors):
                parts = []
                for entity_id in alarm_entity.bypassed_sensors:
                    name = friendly_name_for_entity_id(entity_id, self.hass)
                    parts.append(name)
                bypassed_sensors = ", ".join(parts)
            input = input.replace("{{bypassed_sensors}}", bypassed_sensors)

        # process wildcard '{{arm_mode}}'
        res = re.search(r"{{arm_mode(\|lang=([^}]+))?}}", input)
        if res:
            lang = res.group(2) if res.group(2) else "en"
            arm_mode = await self.async_get_arm_mode_string(alarm_entity.arm_mode, lang)

            input = input.replace(res.group(0), arm_mode)

        # process wildcard '{{changed_by}}'
        if "{{changed_by}}" in input:
            changed_by = alarm_entity.changed_by if alarm_entity.changed_by else ""
            input = input.replace("{{changed_by}}", changed_by)

        # process wildcard '{{delay}}'
        if "{{delay}}" in input:
            delay = str(alarm_entity.delay) if alarm_entity.delay else ""
            input = input.replace("{{delay}}", delay)

        # process HA templates
        if is_template_string(input):
            input = Template(input, self.hass).async_render()

        return input

    async def async_get_open_sensor_string(
        self, entity_id: str, state: str, language: str
    ):
        """Get translation for sensor states."""
        if self._sensorTranslationCache and self._sensorTranslationLang == language:
            translations = self._sensorTranslationCache
        else:
            translations = await async_get_translations(
                self.hass, language, "device_automation", ["binary_sensor"]
            )

            self._sensorTranslationCache = translations
            self._sensorTranslationLang = language

        entity = self.hass.states.get(entity_id)

        device_type = (
            entity.attributes["device_class"]
            if entity and "device_class" in entity.attributes
            else None
        )

        if state == STATE_OPEN:
            translation_key = (
                f"component.binary_sensor.device_automation.condition_type.{ENTITY_CONDITIONS[device_type][0]['type']}"
                if device_type in ENTITY_CONDITIONS
                else None
            )
            if translation_key and translation_key in translations:
                string = translations[translation_key]
            else:
                string = "{entity_name} is open"
        elif state == STATE_CLOSED:
            translation_key = (
                f"component.binary_sensor.device_automation.condition_type.{ENTITY_CONDITIONS[device_type][1]['type']}"
                if device_type in ENTITY_CONDITIONS
                else None
            )
            if translation_key and translation_key in translations:
                string = translations[translation_key]
            else:
                string = "{entity_name} is closed"

        elif state == STATE_UNAVAILABLE:
            string = "{entity_name} is unavailable"

        else:
            string = "{entity_name} is unknown"

        name = friendly_name_for_entity_id(entity_id, self.hass)
        string = string.replace("{entity_name}", name)

        return string

    async def async_get_arm_mode_string(self, arm_mode: str, language: str):
        """Get translation for alarm arm mode."""
        if self._alarmTranslationCache and self._alarmTranslationLang == language:
            translations = self._alarmTranslationCache
        else:
            translations = await async_get_translations(
                self.hass, language, "entity_component", ["alarm_control_panel"]
            )

            self._alarmTranslationCache = translations
            self._alarmTranslationLang = language

        translation_key = (
            f"component.alarm_control_panel.entity_component._.state.{arm_mode}"
            if arm_mode
            else None
        )

        if translation_key and translation_key in translations:
            return translations[translation_key]
        elif arm_mode:
            return " ".join(w.capitalize() for w in arm_mode.split("_"))
        else:
            return ""
