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

from . import const

from homeassistant.components.mqtt import (
    DOMAIN as ATTR_MQTT,
    CONF_STATE_TOPIC,
    CONF_COMMAND_TOPIC,
)

from .mqtt import (
    CONF_EVENT_TOPIC,
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
                vol.Optional(const.ATTR_CODE_DISARM_REQUIRED): cv.boolean,
                vol.Optional(ATTR_CODE_FORMAT): vol.In(
                    [CODE_FORMAT_NUMBER, CODE_FORMAT_TEXT]
                ),
                vol.Optional(const.ATTR_TRIGGER_TIME): cv.positive_int,
                vol.Optional(const.ATTR_DISARM_AFTER_TRIGGER): cv.boolean,
                vol.Optional(ATTR_MQTT): vol.Schema({
                    vol.Required(const.ATTR_ENABLED): cv.boolean,
                    vol.Required(CONF_STATE_TOPIC): cv.string,
                    vol.Optional(const.ATTR_STATE_PAYLOAD): vol.Schema({
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
                    vol.Optional(const.ATTR_COMMAND_PAYLOAD): vol.Schema({
                        vol.Optional(const.COMMAND_ARM_AWAY): cv.string,
                        vol.Optional(const.COMMAND_ARM_HOME): cv.string,
                        vol.Optional(const.COMMAND_ARM_NIGHT): cv.string,
                        vol.Optional(const.COMMAND_ARM_CUSTOM_BYPASS): cv.string,
                        vol.Optional(const.COMMAND_DISARM): cv.string,
                    }),
                    vol.Required(const.ATTR_REQUIRE_CODE): cv.boolean,
                    vol.Required(CONF_EVENT_TOPIC): cv.string,
                }),
                vol.Optional(const.ATTR_MASTER): vol.Schema({
                    vol.Required(const.ATTR_ENABLED): cv.boolean,
                    vol.Optional(ATTR_NAME): cv.string,
                })
            }
        )
    )
    async def post(self, request, data):
        """Handle config update request."""
        hass = request.app["hass"]
        coordinator = hass.data[const.DOMAIN]["coordinator"]
        await coordinator.async_update_config(data)
        request.app["hass"].bus.async_fire(EVENT)
        return self.json({"success": True})


class AlarmoAreaView(HomeAssistantView):
    """Login to Home Assistant cloud."""

    url = "/api/alarmo/area"
    name = "api:alarmo:area"

    @RequestDataValidator(
        vol.Schema(
            {
                vol.Optional("area_id"): cv.string,
                vol.Optional(ATTR_NAME): cv.string,
                vol.Optional(const.ATTR_REMOVE): cv.boolean,
                vol.Optional(const.ATTR_MODES): vol.Schema({
                    vol.Required(STATE_ALARM_ARMED_AWAY): vol.Schema({
                        vol.Required(const.ATTR_ENABLED): cv.boolean,
                        vol.Required(const.ATTR_EXIT_TIME): cv.positive_int,
                        vol.Required(const.ATTR_ENTRY_TIME): cv.positive_int,
                        vol.Optional(const.ATTR_TRIGGER_TIME): cv.positive_int,
                    }),
                    vol.Required(STATE_ALARM_ARMED_HOME): vol.Schema({
                        vol.Required(const.ATTR_ENABLED): cv.boolean,
                        vol.Required(const.ATTR_EXIT_TIME): cv.positive_int,
                        vol.Required(const.ATTR_ENTRY_TIME): cv.positive_int,
                        vol.Optional(const.ATTR_TRIGGER_TIME): cv.positive_int,
                    }),
                    vol.Required(STATE_ALARM_ARMED_NIGHT): vol.Schema({
                        vol.Required(const.ATTR_ENABLED): cv.boolean,
                        vol.Required(const.ATTR_EXIT_TIME): cv.positive_int,
                        vol.Required(const.ATTR_ENTRY_TIME): cv.positive_int,
                        vol.Optional(const.ATTR_TRIGGER_TIME): cv.positive_int,
                    }),
                    vol.Required(STATE_ALARM_ARMED_CUSTOM_BYPASS): vol.Schema({
                        vol.Required(const.ATTR_ENABLED): cv.boolean,
                        vol.Required(const.ATTR_EXIT_TIME): cv.positive_int,
                        vol.Required(const.ATTR_ENTRY_TIME): cv.positive_int,
                        vol.Optional(const.ATTR_TRIGGER_TIME): cv.positive_int,
                    })
                })
            }
        )
    )
    async def post(self, request, data):
        """Handle config update request."""
        hass = request.app["hass"]
        coordinator = hass.data[const.DOMAIN]["coordinator"]
        if "area_id" in data:
            area = data["area_id"]
            del data["area_id"]
        else:
            area = None
        await coordinator.async_update_area_config(area, data)
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
                vol.Optional(const.ATTR_REMOVE): cv.boolean,
                vol.Optional(const.ATTR_TYPE): vol.In(SENSOR_TYPES),
                vol.Optional(const.ATTR_MODES): vol.All(
                    cv.ensure_list,
                    [vol.In(const.ARM_MODES)]
                ),
                vol.Optional(ATTR_IMMEDIATE): cv.boolean,
                vol.Optional(ATTR_ARM_ON_CLOSE): cv.boolean,
                vol.Optional(ATTR_ALLOW_OPEN): cv.boolean,
                vol.Optional(ATTR_ALWAYS_ON): cv.boolean,
                vol.Optional(ATTR_TRIGGER_UNAVAILABLE): cv.boolean,
                vol.Optional(const.ATTR_AREA): cv.string,
                vol.Optional(const.ATTR_ENABLED): cv.boolean
            }
        )
    )
    async def post(self, request, data):
        """Handle config update request."""
        hass = request.app["hass"]
        coordinator = hass.data[const.DOMAIN]["coordinator"]
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
                vol.Optional(const.ATTR_USER_ID): cv.string,
                vol.Optional(const.ATTR_REMOVE): cv.boolean,
                vol.Optional(ATTR_NAME): cv.string,
                vol.Optional(ATTR_CODE): cv.string,
                vol.Optional(const.ATTR_OLD_CODE): cv.string,
                vol.Optional(const.ATTR_IS_ADMIN): cv.boolean,
                vol.Optional(const.ATTR_CAN_ARM): cv.boolean,
                vol.Optional(const.ATTR_CAN_DISARM): cv.boolean,
                vol.Optional(const.ATTR_IS_OVERRIDE_CODE): cv.boolean,
            }
        )
    )
    async def post(self, request, data):
        """Handle config update request."""
        hass = request.app["hass"]
        coordinator = hass.data[const.DOMAIN]["coordinator"]
        user_id = None
        if const.ATTR_USER_ID in data:
            user_id = data[const.ATTR_USER_ID]
            del data[const.ATTR_USER_ID]
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
                vol.Optional(const.ATTR_AUTOMATION_ID): cv.string,
                vol.Optional(ATTR_NAME): cv.string,
                vol.Optional(const.ATTR_TRIGGERS): vol.All(
                    cv.ensure_list,
                    [vol.Any(
                        vol.Schema(
                            {
                                vol.Required(const.ATTR_EVENT): cv.string,
                            }
                        ),
                        vol.Schema(
                            {
                                vol.Required(ATTR_STATE): cv.string,
                            }
                        )
                    )]
                ),
                vol.Optional(const.ATTR_ACTIONS): vol.All(
                    cv.ensure_list,
                    [vol.Schema(
                        {
                            vol.Optional(ATTR_ENTITY_ID): cv.string,
                            vol.Required(ATTR_SERVICE): cv.string,
                            vol.Optional(ATTR_SERVICE_DATA): dict,
                        }
                    )]
                ),
                vol.Optional(const.ATTR_MODES): vol.All(
                    cv.ensure_list,
                    [vol.In(const.ARM_MODES)]
                ),
                vol.Optional(const.ATTR_ENABLED): cv.boolean,
                vol.Optional(const.ATTR_REMOVE): cv.boolean,
                vol.Optional(const.ATTR_IS_NOTIFICATION): cv.boolean,
                vol.Optional(const.ATTR_AREA): cv.string,
            }
        )
    )
    async def post(self, request, data):
        """Handle config update request."""
        hass = request.app["hass"]
        coordinator = hass.data[const.DOMAIN]["coordinator"]
        automation_id = None
        if const.ATTR_AUTOMATION_ID in data:
            automation_id = data[const.ATTR_AUTOMATION_ID]
            del data[const.ATTR_AUTOMATION_ID]
        coordinator.async_update_automation_config(automation_id, data)
        request.app["hass"].bus.async_fire(EVENT)
        return self.json({"success": True})


@callback
def websocket_get_config(hass, connection, msg):
    """Publish config data."""
    coordinator = hass.data[const.DOMAIN]["coordinator"]
    config = coordinator.store.async_get_config()
    connection.send_result(msg["id"], config)


@callback
def websocket_get_areas(hass, connection, msg):
    """Publish area data."""
    coordinator = hass.data[const.DOMAIN]["coordinator"]
    areas = coordinator.store.async_get_areas()
    connection.send_result(msg["id"], areas)


@callback
def websocket_get_sensors(hass, connection, msg):
    """Publish sensor data."""
    coordinator = hass.data[const.DOMAIN]["coordinator"]
    sensors = coordinator.store.async_get_sensors()
    connection.send_result(msg["id"], sensors)


@callback
def websocket_get_users(hass, connection, msg):
    """Publish user data."""
    coordinator = hass.data[const.DOMAIN]["coordinator"]
    users = coordinator.store.async_get_users()
    connection.send_result(msg["id"], users)


@callback
def websocket_get_automations(hass, connection, msg):
    """Publish automations data."""
    coordinator = hass.data[const.DOMAIN]["coordinator"]
    automations = coordinator.store.async_get_automations()
    connection.send_result(msg["id"], automations)


async def async_register_websockets(hass):

    hass.http.register_view(AlarmoConfigView)
    hass.http.register_view(AlarmoSensorView)
    hass.http.register_view(AlarmoUserView)
    hass.http.register_view(AlarmoAutomationView)
    hass.http.register_view(AlarmoAreaView)

    hass.components.websocket_api.async_register_command(
        "alarmo/config",
        websocket_get_config,
        websocket_api.BASE_COMMAND_MESSAGE_SCHEMA.extend(
            {vol.Required("type"): "alarmo/config"}
        ),
    )
    hass.components.websocket_api.async_register_command(
        "alarmo/areas",
        websocket_get_areas,
        websocket_api.BASE_COMMAND_MESSAGE_SCHEMA.extend(
            {vol.Required("type"): "alarmo/areas"}
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
