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
    ATTR_NAME,
    # STATE_UNKNOWN,
    # STATE_OPEN,
    # STATE_CLOSED,
)

from homeassistant.components.notify import ATTR_MESSAGE

from homeassistant.helpers.service import async_call_from_config

from .const import (
    ATTR_ENABLED,
    ATTR_TRIGGERS,
    ATTR_ACTIONS,
    ATTR_EVENT,
    ARM_MODES,
    ATTR_MODES,
    ATTR_IS_NOTIFICATION,
)

_LOGGER = logging.getLogger(__name__)

EVENT_ARM_FAILURE = "arm_failure"


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

        if not last_state:
            # prevent execution of automations when HA is restarted
            return

        if state in ARM_MODES:
            state = "armed"

        for automation_id, config in self._config.items():
            if not config[ATTR_ENABLED]:
                continue
            elif (
                len(config[ATTR_MODES]) and self.alarm_entity._arm_mode
                and self.alarm_entity._arm_mode not in config[ATTR_MODES]
            ):
                continue
            else:
                for trigger in config[ATTR_TRIGGERS]:
                    if ATTR_STATE in trigger and trigger[ATTR_STATE] == state:
                        await self.async_execute_automation(automation_id)

    @callback
    async def async_handle_event(self, event=None):
        _LOGGER.debug("event {} has occured".format(event))

        for automation_id, config in self._config.items():
            if not config[ATTR_ENABLED]:
                continue
            elif (
                len(config[ATTR_MODES]) and self.alarm_entity._arm_mode
                and self.alarm_entity._arm_mode not in config[ATTR_MODES]
            ):
                continue
            else:
                for trigger in config[ATTR_TRIGGERS]:
                    if ATTR_EVENT in trigger and trigger[ATTR_EVENT] == event:
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

            if (
                ATTR_IS_NOTIFICATION in self._config[automation_id]
                and self._config[automation_id][ATTR_IS_NOTIFICATION]
                and ATTR_MESSAGE in action[ATTR_SERVICE_DATA]
            ):
                data = copy.copy(action[ATTR_SERVICE_DATA])
                if "{{open_sensors}}" in data[ATTR_MESSAGE]:
                    open_sensors = ""
                    if self.alarm_entity.sensors.open_sensors:
                        parts = []
                        for (entity_id, status) in self.alarm_entity.sensors.open_sensors.items():
                            name = self.get_friendly_name_for_sensor(entity_id)
                            parts.append("{} is {}".format(name, status))
                        open_sensors = ", ".join(parts)

                    data[ATTR_MESSAGE] = data[ATTR_MESSAGE].replace("{{open_sensors}}", open_sensors)

                if "{{bypassed_sensors}}" in data[ATTR_MESSAGE]:
                    bypassed_sensors = ""
                    if self.alarm_entity.sensors.bypassed_sensors and len(self.alarm_entity.sensors.bypassed_sensors):
                        parts = []
                        for entity_id in self.alarm_entity.sensors.bypassed_sensors:
                            name = self.get_friendly_name_for_sensor(entity_id)
                            parts.append(name)
                        bypassed_sensors = ", ".join(parts)

                    data[ATTR_MESSAGE] = data[ATTR_MESSAGE].replace("{{bypassed_sensors}}", bypassed_sensors)

                if "{{arm_mode}}" in data[ATTR_MESSAGE]:
                    arm_mode = self.alarm_entity.arm_mode if self.alarm_entity.arm_mode else ""
                    data[ATTR_MESSAGE] = data[ATTR_MESSAGE].replace("{{arm_mode}}", arm_mode)

                if "{{changed_by}}" in data[ATTR_MESSAGE]:
                    changed_by = self.alarm_entity.changed_by if self.alarm_entity.changed_by else ""
                    data[ATTR_MESSAGE] = data[ATTR_MESSAGE].replace("{{changed_by}}", changed_by)

                service_call["data"] = data

            elif ATTR_SERVICE_DATA in action:
                service_call["data"] = action[ATTR_SERVICE_DATA]

            await async_call_from_config(
                self.hass,
                service_call
            )

    def get_friendly_name_for_sensor(self, entity_id):
        state = self.hass.states.get(entity_id)
        sensor_config = self.coordinator.store.async_get_sensors()

        if entity_id in sensor_config and sensor_config[entity_id][ATTR_NAME]:
            name = sensor_config[entity_id][ATTR_NAME]
        elif state and state.attributes["friendly_name"]:
            name = state.attributes["friendly_name"]
        else:
            name = entity_id
        return name
