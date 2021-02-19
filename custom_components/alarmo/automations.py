import logging
import copy

from homeassistant.core import (
    HomeAssistant,
    callback,
)

from homeassistant.const import (
    ATTR_STATE,
    ATTR_SERVICE,
    ATTR_SERVICE_DATA,
    ATTR_ENTITY_ID,
    # STATE_UNKNOWN,
    # STATE_OPEN,
    # STATE_CLOSED,
)

from homeassistant.components.notify import ATTR_MESSAGE
from homeassistant.helpers.service import async_call_from_config
from homeassistant.helpers.dispatcher import async_dispatcher_connect

from . import const
from .alarm_control_panel import AlarmoBaseEntity
from .helpers import (
    friendly_name_for_entity_id,
)

_LOGGER = logging.getLogger(__name__)

EVENT_ARM_FAILURE = "arm_failure"


class AutomationHandler:
    def __init__(self, hass: HomeAssistant):
        self.hass = hass
        self._config = None
        self._listener = None

        def async_update_config():
            """automation config updated, reload the configuration."""
            self._config = self.hass.data[const.DOMAIN]["coordinator"].store.async_get_automations()

        async_dispatcher_connect(hass, "alarmo_automations_updated", async_update_config)
        async_update_config()

        @callback
        async def async_alarm_state_changed(area_id: str, old_state: str, new_state: str):
            if not old_state:
                # ignore automations at startup/restoring
                return

            if area_id:
                alarm_entity = self.hass.data[const.DOMAIN]["areas"][area_id]
            else:
                alarm_entity = self.hass.data[const.DOMAIN]["master"]

            if not alarm_entity:
                return

            _LOGGER.debug("state of {} is updated from {} to {}".format(alarm_entity.entity_id, old_state, new_state))

            if new_state in const.ARM_MODES:
                # we don't distinguish between armed modes for automations, they are handled separately
                new_state = "armed"

            for automation_id, config in self._config.items():
                if (
                    not config[const.ATTR_ENABLED]
                    or (config[const.ATTR_AREA] != area_id and len(self.hass.data[const.DOMAIN]["areas"]) > 1)
                ):
                    continue
                elif (
                    len(config[const.ATTR_MODES]) and alarm_entity.arm_mode
                    and alarm_entity.arm_mode not in config[const.ATTR_MODES]
                ):
                    continue
                else:
                    for trigger in config[const.ATTR_TRIGGERS]:
                        if ATTR_STATE in trigger and trigger[ATTR_STATE] == new_state:
                            await self.async_execute_automation(automation_id, alarm_entity)

        async_dispatcher_connect(self.hass, "alarmo_state_updated", async_alarm_state_changed)

        @callback
        async def async_handle_event(event: str, area_id: str, args: dict = {}):
            if event != const.EVENT_FAILED_TO_ARM:
                return
            if area_id:
                alarm_entity = self.hass.data[const.DOMAIN]["areas"][area_id]
            else:
                alarm_entity = self.hass.data[const.DOMAIN]["master"]

            _LOGGER.debug("{} has failed to arm".format(alarm_entity.entity_id))

            for automation_id, config in self._config.items():
                if (
                    not config[const.ATTR_ENABLED]
                    or (config[const.ATTR_AREA] != area_id and len(self.hass.data[const.DOMAIN]["areas"]) > 1)
                ):
                    continue
                elif (
                    len(config[const.ATTR_MODES]) and alarm_entity.arm_mode
                    and alarm_entity.arm_mode not in config[const.ATTR_MODES]
                ):
                    continue
                else:
                    for trigger in config[const.ATTR_TRIGGERS]:
                        if const.ATTR_EVENT in trigger and trigger[const.ATTR_EVENT] == EVENT_ARM_FAILURE:
                            await self.async_execute_automation(automation_id, alarm_entity)

        async_dispatcher_connect(self.hass, "alarmo_event", async_handle_event)

    async def async_execute_automation(self, automation_id: str, alarm_entity: AlarmoBaseEntity):
        # automation is a dict of AutomationEntry
        _LOGGER.debug("executing automation {}".format(automation_id))

        actions = self._config[automation_id][const.ATTR_ACTIONS]
        for action in actions:

            service_call = {
                "service": action[ATTR_SERVICE]
            }
            if ATTR_ENTITY_ID in action:
                service_call["entity_id"] = action[ATTR_ENTITY_ID]

            if (
                const.ATTR_IS_NOTIFICATION in self._config[automation_id]
                and self._config[automation_id][const.ATTR_IS_NOTIFICATION]
                and ATTR_MESSAGE in action[ATTR_SERVICE_DATA]
            ):
                data = copy.copy(action[ATTR_SERVICE_DATA])
                if "{{open_sensors}}" in data[ATTR_MESSAGE]:
                    open_sensors = ""
                    if alarm_entity.open_sensors:
                        parts = []
                        for (entity_id, status) in alarm_entity.open_sensors.items():
                            name = friendly_name_for_entity_id(entity_id, self.hass)
                            parts.append("{} is {}".format(name, status))
                        open_sensors = ", ".join(parts)

                    data[ATTR_MESSAGE] = data[ATTR_MESSAGE].replace("{{open_sensors}}", open_sensors)

                if "{{bypassed_sensors}}" in data[ATTR_MESSAGE]:
                    bypassed_sensors = ""
                    if alarm_entity.bypassed_sensors and len(alarm_entity.bypassed_sensors):
                        parts = []
                        for entity_id in alarm_entity.sensors.bypassed_sensors:
                            name = friendly_name_for_entity_id(entity_id, self.hass)
                            parts.append(name)
                        bypassed_sensors = ", ".join(parts)

                    data[ATTR_MESSAGE] = data[ATTR_MESSAGE].replace("{{bypassed_sensors}}", bypassed_sensors)

                if "{{arm_mode}}" in data[ATTR_MESSAGE]:
                    _LOGGER.debug(alarm_entity.arm_mode)
                    arm_mode = alarm_entity.arm_mode if alarm_entity.arm_mode else ""
                    arm_mode = " ".join(w.capitalize() for w in arm_mode.split("_"))
                    data[ATTR_MESSAGE] = data[ATTR_MESSAGE].replace("{{arm_mode}}", arm_mode)

                if "{{changed_by}}" in data[ATTR_MESSAGE]:
                    changed_by = alarm_entity.changed_by if alarm_entity.changed_by else ""
                    data[ATTR_MESSAGE] = data[ATTR_MESSAGE].replace("{{changed_by}}", changed_by)

                service_call["data"] = data

            elif ATTR_SERVICE_DATA in action:
                service_call["data"] = action[ATTR_SERVICE_DATA]

            await async_call_from_config(
                self.hass,
                service_call
            )
