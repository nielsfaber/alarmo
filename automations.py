import logging


from homeassistant.core import (
    HomeAssistant,
    callback,
)

from homeassistant.const import (
    ATTR_STATE,
    ATTR_SERVICE,
    ATTR_SERVICE_DATA,
    ATTR_ENTITY_ID,
)

from homeassistant.helpers.service import async_call_from_config

from .const import (
    ATTR_ENABLED,
    ATTR_TRIGGERS,
    ATTR_ACTIONS,
    ARM_MODES,
    ATTR_MODES,
)

_LOGGER = logging.getLogger(__name__)
# @RequestDataValidator(
#     vol.Schema(
#         {
#             vol.Optional(ATTR_AUTOMATION_ID): cv.string,
#             vol.Optional(ATTR_NAME): cv.string,
#             vol.Optional(ATTR_TRIGGERS): vol.All(
#                 cv.ensure_list,
#                 [vol.Any(
#                     vol.Schema(
#                         {
#                             vol.Required(ATTR_EVENT): cv.string,
#                         }
#                     ),
#                     vol.Schema(
#                         {
#                             vol.Required(ATTR_STATE): cv.string,
#                         }
#                     )
#                 )]
#             ),
#             vol.Optional(ATTR_ACTIONS): vol.All(
#                 cv.ensure_list,
#                 [vol.Schema(
#                     {
#                         vol.Optional(ATTR_ENTITY_ID): cv.string,
#                         vol.Required(ATTR_SERVICE): cv.string,
#                         vol.Optional(ATTR_SERVICE_DATA): dict,
#                     }
#                 )]
#             ),
#             vol.Optional(ATTR_MODES): vol.All(
#                 cv.ensure_list,
#                 [vol.In(ARM_MODES)]
#             ),
#             vol.Optional(ATTR_ENABLED): cv.boolean,
#             vol.Optional(ATTR_REMOVE): cv.boolean,
#         }
#     )
# )


class AutomationHandler:
    def __init__(self, hass: HomeAssistant, coordinator, alarmEntity):
        self._config = None
        self.hass = hass
        self.coordinator = coordinator
        self.alarm_entity = alarmEntity
        self._listener = None
        self._config = self.coordinator.store.async_get_automations()
        self.coordinator.register_automation_callback(self.async_load_config)

    @callback
    def async_load_config(self):
        self._config = self.coordinator.store.async_get_automations()

    @callback
    async def async_handle_state_update(self, state=None, last_state=None):
        _LOGGER.debug("state is updated from {} to {}".format(last_state, state))

        if state in ARM_MODES:
            state = "armed"

        for automation_id, config in self._config.items():
            if not config[ATTR_ENABLED]:
                continue
            if (
                len(config[ATTR_MODES]) and self.alarm_entity._arm_mode
                and self.alarm_entity._arm_mode not in config[ATTR_MODES]
            ):
                continue

            for trigger in config[ATTR_TRIGGERS]:
                if ATTR_STATE in trigger and trigger[ATTR_STATE] == state:
                    await self.async_execute_automation(automation_id)

    async def async_execute_automation(self, automation_id):
        _LOGGER.debug("executing automation {}".format(automation_id))

        actions = self._config[automation_id][ATTR_ACTIONS]
        for action in actions:

            service_call = {
                "service": action[ATTR_SERVICE]
            }
            if ATTR_ENTITY_ID in action:
                service_call["entity_id"] = action[ATTR_ENTITY_ID]

            if ATTR_SERVICE_DATA in action:
                service_call["data"] = action[ATTR_SERVICE_DATA]

            _LOGGER.debug(service_call)

            await async_call_from_config(
                self.hass,
                service_call
            )
