import voluptuous as vol
import logging

from homeassistant.components import websocket_api
from homeassistant.core import callback
from homeassistant.components.http.data_validator import RequestDataValidator
from homeassistant.helpers import config_validation as cv
from homeassistant.components.http import HomeAssistantView
from homeassistant.const import (
    ATTR_ENTITY_ID,
    ATTR_CODE_FORMAT,
    ATTR_MODE,
    ATTR_NAME,
    ATTR_CODE,
    ATTR_SERVICE,
    ATTR_SERVICE_DATA,
    ATTR_STATE,
    STATE_ALARM_ARMED_AWAY,
    STATE_ALARM_ARMED_HOME,
    STATE_ALARM_ARMED_NIGHT,
    STATE_ALARM_ARMED_CUSTOM_BYPASS,
    STATE_ALARM_DISARMED,
    STATE_ALARM_TRIGGERED,
    STATE_ALARM_PENDING,
    STATE_ALARM_DISARMING,
    STATE_ALARM_ARMING,
)

from homeassistant.components.alarm_control_panel import (
    FORMAT_NUMBER as CODE_FORMAT_NUMBER,
    FORMAT_TEXT as CODE_FORMAT_TEXT,
    ATTR_CODE_ARM_REQUIRED,
)

from .const import (
    DOMAIN,
    VERSION,
    ATTR_MODES,
    ARM_MODES,
    ATTR_CODE_DISARM_REQUIRED,
    ATTR_DISARM_AFTER_TRIGGER,
    ATTR_ENABLED,
    ATTR_LEAVE_TIME,
    ATTR_ENTRY_TIME,
    ATTR_TRIGGER_TIME,
    ATTR_REMOVE,
    ATTR_USER_ID,
    ATTR_AUTOMATION_ID,
    ATTR_IS_ADMIN,
    ATTR_CAN_ARM,
    ATTR_CAN_DISARM,
    ATTR_OLD_CODE,
    ATTR_IS_OVERRIDE_CODE,
    ATTR_TRIGGERS,
    ATTR_ACTIONS,
    ATTR_EVENT,
    ATTR_REQUIRE_CODE,
    ATTR_IS_NOTIFICATION,
    ATTR_VERSION,
    ATTR_STATE_PAYLOAD,
    ATTR_COMMAND_PAYLOAD,
    ATTR_TYPE,
    COMMAND_ARM_NIGHT,
    COMMAND_ARM_AWAY,
    COMMAND_ARM_HOME,
    COMMAND_ARM_CUSTOM_BYPASS,
    COMMAND_DISARM,
)

from homeassistant.components.mqtt import (
    DOMAIN as ATTR_MQTT,
    CONF_STATE_TOPIC,
    CONF_COMMAND_TOPIC,
)

from .sensors import (
    ATTR_IMMEDIATE,
    ATTR_ALWAYS_ON,
    ATTR_ARM_ON_CLOSE,
    ATTR_ALLOW_OPEN,
    ATTR_TRIGGER_UNAVAILABLE,
    SENSOR_TYPES,
)

_LOGGER = logging.getLogger(__name__)
EVENT = "alarmo_updated"


class AlarmoConfigView(HomeAssistantView):
    """Login to Home Assistant cloud."""

    url = "/api/alarmo/config"
    name = "api:alarmo:config"

    @RequestDataValidator(
        vol.Schema(
            {
                vol.Optional(ATTR_CODE_ARM_REQUIRED): cv.boolean,
                vol.Optional(ATTR_CODE_DISARM_REQUIRED): cv.boolean,
                vol.Optional(ATTR_CODE_FORMAT): vol.In(
                    [CODE_FORMAT_NUMBER, CODE_FORMAT_TEXT]
                ),
                vol.Optional(ATTR_TRIGGER_TIME): cv.positive_int,
                vol.Optional(ATTR_DISARM_AFTER_TRIGGER): cv.boolean,
                vol.Optional(ATTR_MQTT): vol.Schema({
                    vol.Required(ATTR_ENABLED): cv.boolean,
                    vol.Required(CONF_STATE_TOPIC): cv.string,
                    vol.Optional(ATTR_STATE_PAYLOAD): vol.Schema({
                        vol.Optional(STATE_ALARM_DISARMED): cv.string,
                        vol.Optional(STATE_ALARM_ARMED_HOME): cv.string,
                        vol.Optional(STATE_ALARM_ARMED_AWAY): cv.string,
                        vol.Optional(STATE_ALARM_ARMED_NIGHT): cv.string,
                        vol.Optional(STATE_ALARM_ARMED_CUSTOM_BYPASS): cv.string,
                        vol.Optional(STATE_ALARM_PENDING): cv.string,
                        vol.Optional(STATE_ALARM_ARMING): cv.string,
                        vol.Optional(STATE_ALARM_DISARMING): cv.string,
                        vol.Optional(STATE_ALARM_TRIGGERED): cv.string
                    }),
                    vol.Required(CONF_COMMAND_TOPIC): cv.string,
                    vol.Optional(ATTR_COMMAND_PAYLOAD): vol.Schema({
                        vol.Optional(COMMAND_ARM_AWAY): cv.string,
                        vol.Optional(COMMAND_ARM_HOME): cv.string,
                        vol.Optional(COMMAND_ARM_NIGHT): cv.string,
                        vol.Optional(COMMAND_ARM_CUSTOM_BYPASS): cv.string,
                        vol.Optional(COMMAND_DISARM): cv.string,
                    }),
                    vol.Required(ATTR_REQUIRE_CODE): cv.boolean,
                })
            }
        )
    )
    async def post(self, request, data):
        """Handle config update request."""
        hass = request.app["hass"]
        coordinator = hass.data[DOMAIN]
        await coordinator.async_update_config(data)
        request.app["hass"].bus.async_fire(EVENT)
        return self.json({"success": True})


class AlarmoModeView(HomeAssistantView):
    """Login to Home Assistant cloud."""

    url = "/api/alarmo/mode"
    name = "api:alarmo:mode"

    @RequestDataValidator(
        vol.Schema(
            {
                vol.Required(ATTR_MODE): vol.In(ARM_MODES),
                vol.Optional(ATTR_ENABLED): cv.boolean,
                vol.Optional(ATTR_LEAVE_TIME): cv.positive_int,
                vol.Optional(ATTR_ENTRY_TIME): cv.positive_int,
            }
        )
    )
    async def post(self, request, data):
        """Handle config update request."""
        hass = request.app["hass"]
        coordinator = hass.data[DOMAIN]
        mode = data[ATTR_MODE]
        del data[ATTR_MODE]
        await coordinator.async_update_mode_config(mode, data)
        request.app["hass"].bus.async_fire(EVENT)
        return self.json({"success": True})


class AlarmoSensorView(HomeAssistantView):
    """Login to Home Assistant cloud."""

    url = "/api/alarmo/sensors"
    name = "api:alarmo:sensors"

    @RequestDataValidator(
        vol.Schema(
            {
                vol.Required(ATTR_ENTITY_ID): cv.entity_id,
                vol.Optional(ATTR_NAME): cv.string,
                vol.Optional(ATTR_REMOVE): cv.boolean,
                vol.Optional(ATTR_TYPE): vol.In(SENSOR_TYPES),
                vol.Optional(ATTR_MODES): vol.All(
                    cv.ensure_list,
                    [vol.In(ARM_MODES)]
                ),
                vol.Optional(ATTR_IMMEDIATE): cv.boolean,
                vol.Optional(ATTR_ARM_ON_CLOSE): cv.boolean,
                vol.Optional(ATTR_ALLOW_OPEN): cv.boolean,
                vol.Optional(ATTR_ALWAYS_ON): cv.boolean,
                vol.Optional(ATTR_TRIGGER_UNAVAILABLE): cv.boolean,
            }
        )
    )
    async def post(self, request, data):
        """Handle config update request."""
        hass = request.app["hass"]
        coordinator = hass.data[DOMAIN]
        entity = data[ATTR_ENTITY_ID]
        del data[ATTR_ENTITY_ID]
        coordinator.async_update_sensor_config(entity, data)
        request.app["hass"].bus.async_fire(EVENT)
        return self.json({"success": True})


class AlarmoUserView(HomeAssistantView):
    """Login to Home Assistant cloud."""

    url = "/api/alarmo/users"
    name = "api:alarmo:users"

    @RequestDataValidator(
        vol.Schema(
            {
                vol.Optional(ATTR_USER_ID): cv.string,
                vol.Optional(ATTR_REMOVE): cv.boolean,
                vol.Optional(ATTR_NAME): cv.string,
                vol.Optional(ATTR_CODE): cv.string,
                vol.Optional(ATTR_OLD_CODE): cv.string,
                vol.Optional(ATTR_IS_ADMIN): cv.boolean,
                vol.Optional(ATTR_CAN_ARM): cv.boolean,
                vol.Optional(ATTR_CAN_DISARM): cv.boolean,
                vol.Optional(ATTR_IS_OVERRIDE_CODE): cv.boolean,
            }
        )
    )
    async def post(self, request, data):
        """Handle config update request."""
        hass = request.app["hass"]
        coordinator = hass.data[DOMAIN]
        user_id = None
        if ATTR_USER_ID in data:
            user_id = data[ATTR_USER_ID]
            del data[ATTR_USER_ID]
        coordinator.async_update_user_config(user_id, data)
        request.app["hass"].bus.async_fire(EVENT)
        return self.json({"success": True})


class AlarmoAutomationView(HomeAssistantView):
    """Login to Home Assistant cloud."""

    url = "/api/alarmo/automations"
    name = "api:alarmo:automations"

    @RequestDataValidator(
        vol.Schema(
            {
                vol.Optional(ATTR_AUTOMATION_ID): cv.string,
                vol.Optional(ATTR_NAME): cv.string,
                vol.Optional(ATTR_TRIGGERS): vol.All(
                    cv.ensure_list,
                    [vol.Any(
                        vol.Schema(
                            {
                                vol.Required(ATTR_EVENT): cv.string,
                            }
                        ),
                        vol.Schema(
                            {
                                vol.Required(ATTR_STATE): cv.string,
                            }
                        )
                    )]
                ),
                vol.Optional(ATTR_ACTIONS): vol.All(
                    cv.ensure_list,
                    [vol.Schema(
                        {
                            vol.Optional(ATTR_ENTITY_ID): cv.string,
                            vol.Required(ATTR_SERVICE): cv.string,
                            vol.Optional(ATTR_SERVICE_DATA): dict,
                        }
                    )]
                ),
                vol.Optional(ATTR_MODES): vol.All(
                    cv.ensure_list,
                    [vol.In(ARM_MODES)]
                ),
                vol.Optional(ATTR_ENABLED): cv.boolean,
                vol.Optional(ATTR_REMOVE): cv.boolean,
                vol.Optional(ATTR_IS_NOTIFICATION): cv.boolean,
            }
        )
    )
    async def post(self, request, data):
        """Handle config update request."""
        hass = request.app["hass"]
        coordinator = hass.data[DOMAIN]
        automation_id = None
        if ATTR_AUTOMATION_ID in data:
            automation_id = data[ATTR_AUTOMATION_ID]
            del data[ATTR_AUTOMATION_ID]
        coordinator.async_update_automation_config(automation_id, data)
        request.app["hass"].bus.async_fire(EVENT)
        return self.json({"success": True})


@callback
def websocket_get_config(hass, connection, msg):
    """Publish config data."""
    coordinator = hass.data[DOMAIN]
    config = coordinator.store.async_get_config()
    config[ATTR_VERSION] = VERSION
    connection.send_result(msg["id"], config)


@callback
def websocket_get_sensors(hass, connection, msg):
    """Publish sensor data."""
    coordinator = hass.data[DOMAIN]
    sensors = coordinator.store.async_get_sensors()
    connection.send_result(msg["id"], sensors)


@callback
def websocket_get_users(hass, connection, msg):
    """Publish user data."""
    coordinator = hass.data[DOMAIN]
    users = coordinator.store.async_get_users()
    connection.send_result(msg["id"], users)


@callback
def websocket_get_automations(hass, connection, msg):
    """Publish automations data."""
    coordinator = hass.data[DOMAIN]
    automations = coordinator.store.async_get_automations()
    connection.send_result(msg["id"], automations)


async def async_register_websockets(hass):

    hass.http.register_view(AlarmoConfigView)
    hass.http.register_view(AlarmoModeView)
    hass.http.register_view(AlarmoSensorView)
    hass.http.register_view(AlarmoUserView)
    hass.http.register_view(AlarmoAutomationView)

    hass.components.websocket_api.async_register_command(
        "alarmo/config",
        websocket_get_config,
        websocket_api.BASE_COMMAND_MESSAGE_SCHEMA.extend(
            {vol.Required("type"): "alarmo/config"}
        ),
    )
    hass.components.websocket_api.async_register_command(
        "alarmo/sensors",
        websocket_get_sensors,
        websocket_api.BASE_COMMAND_MESSAGE_SCHEMA.extend(
            {vol.Required("type"): "alarmo/sensors"}
        ),
    )
    hass.components.websocket_api.async_register_command(
        "alarmo/users",
        websocket_get_users,
        websocket_api.BASE_COMMAND_MESSAGE_SCHEMA.extend(
            {vol.Required("type"): "alarmo/users"}
        ),
    )
    hass.components.websocket_api.async_register_command(
        "alarmo/automations",
        websocket_get_automations,
        websocket_api.BASE_COMMAND_MESSAGE_SCHEMA.extend(
            {vol.Required("type"): "alarmo/automations"}
        ),
    )
