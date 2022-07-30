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
    CONF_SERVICE_DATA,
    ATTR_STATE,
    STATE_ALARM_ARMED_AWAY,
    STATE_ALARM_ARMED_HOME,
    STATE_ALARM_ARMED_NIGHT,
    STATE_ALARM_ARMED_CUSTOM_BYPASS,
    STATE_ALARM_ARMED_VACATION,
    STATE_ALARM_DISARMED,
    STATE_ALARM_TRIGGERED,
    STATE_ALARM_PENDING,
    STATE_ALARM_DISARMING,
    STATE_ALARM_ARMING,
)

from homeassistant.components.alarm_control_panel import (
    CodeFormat,
    ATTR_CODE_ARM_REQUIRED,
)
from homeassistant.components.websocket_api import (decorators, async_register_command)

from homeassistant.helpers.dispatcher import (
    async_dispatcher_connect,
    async_dispatcher_send,
)

from . import const

from homeassistant.components.mqtt import (
    DOMAIN as ATTR_MQTT,
    CONF_STATE_TOPIC,
    CONF_COMMAND_TOPIC,
)

import homeassistant.util.dt as dt_util

from .mqtt import (
    CONF_EVENT_TOPIC,
)

from .sensors import (
    ATTR_USE_EXIT_DELAY,
    ATTR_USE_ENTRY_DELAY,
    ATTR_ALWAYS_ON,
    ATTR_ARM_ON_CLOSE,
    ATTR_ALLOW_OPEN,
    ATTR_TRIGGER_UNAVAILABLE,
    ATTR_AUTO_BYPASS,
    ATTR_AUTO_BYPASS_MODES,
    ATTR_GROUP,
    ATTR_GROUP_ID,
    ATTR_TIMEOUT,
    ATTR_EVENT_COUNT,
    ATTR_ENTITIES,
    SENSOR_TYPES,
)

_LOGGER = logging.getLogger(__name__)


@callback
@decorators.websocket_command({
    vol.Required("type"): "alarmo_config_updated",
})
@decorators.async_response
async def handle_subscribe_updates(hass, connection, msg):
    """Handle subscribe updates."""

    @callback
    def async_handle_event():
        """Forward events to websocket."""
        connection.send_message({
            "id": msg["id"],
            "type": "event",
        })
    connection.subscriptions[msg["id"]] = async_dispatcher_connect(
        hass,
        "alarmo_update_frontend",
        async_handle_event
    )
    connection.send_result(msg["id"])


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
                    [CodeFormat.NUMBER, CodeFormat.TEXT]
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
                        vol.Optional(STATE_ALARM_ARMED_VACATION): cv.string,
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
                        vol.Optional(const.COMMAND_ARM_VACATION): cv.string,
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
        async_dispatcher_send(hass, "alarmo_update_frontend")
        return self.json({"success": True})


class AlarmoAreaView(HomeAssistantView):
    """Login to Home Assistant cloud."""

    url = "/api/alarmo/area"
    name = "api:alarmo:area"

    mode_schema = vol.Schema({
        vol.Required(const.ATTR_ENABLED): cv.boolean,
        vol.Required(const.ATTR_EXIT_TIME): cv.positive_int,
        vol.Required(const.ATTR_ENTRY_TIME): cv.positive_int,
        vol.Optional(const.ATTR_TRIGGER_TIME): cv.positive_int,
    })

    @RequestDataValidator(
        vol.Schema(
            {
                vol.Optional("area_id"): cv.string,
                vol.Optional(ATTR_NAME): cv.string,
                vol.Optional(const.ATTR_REMOVE): cv.boolean,
                vol.Optional(const.ATTR_MODES): vol.Schema({
                    vol.Optional(STATE_ALARM_ARMED_AWAY): mode_schema,
                    vol.Optional(STATE_ALARM_ARMED_HOME): mode_schema,
                    vol.Optional(STATE_ALARM_ARMED_NIGHT): mode_schema,
                    vol.Optional(STATE_ALARM_ARMED_CUSTOM_BYPASS): mode_schema,
                    vol.Optional(STATE_ALARM_ARMED_VACATION): mode_schema
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
        async_dispatcher_send(hass, "alarmo_update_frontend")
        return self.json({"success": True})


class AlarmoSensorView(HomeAssistantView):
    """Login to Home Assistant cloud."""

    url = "/api/alarmo/sensors"
    name = "api:alarmo:sensors"

    @RequestDataValidator(
        vol.Schema(
            {
                vol.Required(ATTR_ENTITY_ID): cv.entity_id,
                vol.Optional(const.ATTR_REMOVE): cv.boolean,
                vol.Optional(const.ATTR_TYPE): vol.In(SENSOR_TYPES),
                vol.Optional(const.ATTR_MODES): vol.All(
                    cv.ensure_list,
                    [vol.In(const.ARM_MODES)]
                ),
                vol.Optional(ATTR_USE_EXIT_DELAY): cv.boolean,
                vol.Optional(ATTR_USE_ENTRY_DELAY): cv.boolean,
                vol.Optional(ATTR_ARM_ON_CLOSE): cv.boolean,
                vol.Optional(ATTR_ALLOW_OPEN): cv.boolean,
                vol.Optional(ATTR_ALWAYS_ON): cv.boolean,
                vol.Optional(ATTR_TRIGGER_UNAVAILABLE): cv.boolean,
                vol.Optional(ATTR_AUTO_BYPASS): cv.boolean,
                vol.Optional(ATTR_AUTO_BYPASS_MODES): vol.All(
                    cv.ensure_list,
                    [vol.In(const.ARM_MODES)]
                ),
                vol.Optional(const.ATTR_AREA): cv.string,
                vol.Optional(const.ATTR_ENABLED): cv.boolean,
                vol.Optional(ATTR_GROUP): vol.Any(
                    cv.string,
                    None
                )
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
        async_dispatcher_send(hass, "alarmo_update_frontend")
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
                vol.Optional(const.ATTR_ENABLED): cv.boolean,
                vol.Optional(ATTR_CODE): cv.string,
                vol.Optional(const.ATTR_OLD_CODE): cv.string,
                vol.Optional(const.ATTR_CAN_ARM): cv.boolean,
                vol.Optional(const.ATTR_CAN_DISARM): cv.boolean,
                vol.Optional(const.ATTR_IS_OVERRIDE_CODE): cv.boolean,
                vol.Optional(const.ATTR_AREA_LIMIT): vol.All(
                    cv.ensure_list,
                    [cv.string]
                )
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
        async_dispatcher_send(hass, "alarmo_update_frontend")
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
                vol.Optional(const.ATTR_TYPE): cv.string,
                vol.Optional(const.ATTR_TRIGGERS): vol.All(
                    cv.ensure_list,
                    [vol.Any(
                        vol.Schema(
                            {
                                vol.Required(const.ATTR_EVENT): cv.string,
                                vol.Optional(const.ATTR_AREA): vol.Any(
                                    int,
                                    cv.string,
                                ),
                                vol.Optional(const.ATTR_MODES): vol.All(
                                    cv.ensure_list,
                                    [vol.In(const.ARM_MODES)]
                                ),
                            }
                        ),
                        vol.Schema(
                            {
                                vol.Required(ATTR_ENTITY_ID): cv.string,
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
                            vol.Optional(CONF_SERVICE_DATA): dict,
                        }
                    )]
                ),
                vol.Optional(const.ATTR_ENABLED): cv.boolean,
                vol.Optional(const.ATTR_REMOVE): cv.boolean,
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
        async_dispatcher_send(hass, "alarmo_update_frontend")
        return self.json({"success": True})


class AlarmoSensorGroupView(HomeAssistantView):
    """Login to Home Assistant cloud."""

    url = "/api/alarmo/sensor_groups"
    name = "api:alarmo:sensor_groups"

    @RequestDataValidator(
        vol.Schema(
            {
                vol.Optional(ATTR_GROUP_ID): cv.string,
                vol.Optional(ATTR_NAME): cv.string,
                vol.Optional(ATTR_ENTITIES): vol.All(
                    cv.ensure_list,
                    vol.Unique(),
                    [cv.string]
                ),
                vol.Optional(ATTR_TIMEOUT): cv.positive_int,
                vol.Optional(ATTR_EVENT_COUNT): cv.positive_int,
                vol.Optional(const.ATTR_REMOVE): cv.boolean,
            }
        )
    )
    async def post(self, request, data):
        """Handle config update request."""
        hass = request.app["hass"]
        coordinator = hass.data[const.DOMAIN]["coordinator"]
        group_id = None
        if ATTR_GROUP_ID in data:
            group_id = data[ATTR_GROUP_ID]
            del data[ATTR_GROUP_ID]
        coordinator.async_update_sensor_group_config(group_id, data)
        async_dispatcher_send(hass, "alarmo_update_frontend")
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
    for entity_id in sensors.keys():
        group = coordinator.async_get_group_for_sensor(entity_id)
        sensors[entity_id]["group"] = group
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


@callback
def websocket_get_alarm_entities(hass, connection, msg):
    """Publish alarm entity data."""
    result = [
        {
            "entity_id": entity.entity_id,
            "area_id": area_id
        }
        for (area_id, entity) in hass.data[const.DOMAIN]["areas"].items()
    ]
    if hass.data[const.DOMAIN]["master"]:
        result.append({
            "entity_id": hass.data[const.DOMAIN]["master"].entity_id,
            "area_id": 0
        })
    connection.send_result(msg["id"], result)


@callback
def websocket_get_sensor_groups(hass, connection, msg):
    """Publish sensor_group data."""
    coordinator = hass.data[const.DOMAIN]["coordinator"]
    groups = coordinator.store.async_get_sensor_groups()
    connection.send_result(msg["id"], groups)


@callback
def websocket_get_countdown(hass, connection, msg):
    """Publish countdown time for alarm entity."""
    entity_id = msg["entity_id"]
    item = next((entity for entity in hass.data[const.DOMAIN]["areas"].values() if entity.entity_id == entity_id), None)
    if hass.data[const.DOMAIN]["master"] and not item and hass.data[const.DOMAIN]["master"].entity_id == entity_id:
        item = hass.data[const.DOMAIN]["master"]

    data = {
        "delay": item.delay if item else 0,
        "remaining": round((item.expiration - dt_util.utcnow()).total_seconds(),2) if item and item.expiration else 0
    }
    connection.send_result(msg["id"], data)


async def async_register_websockets(hass):

    hass.http.register_view(AlarmoConfigView)
    hass.http.register_view(AlarmoSensorView)
    hass.http.register_view(AlarmoUserView)
    hass.http.register_view(AlarmoAutomationView)
    hass.http.register_view(AlarmoAreaView)
    hass.http.register_view(AlarmoSensorGroupView)

    async_register_command(
        hass,
        handle_subscribe_updates
    )

    async_register_command(
        hass,
        "alarmo/config",
        websocket_get_config,
        websocket_api.BASE_COMMAND_MESSAGE_SCHEMA.extend(
            {vol.Required("type"): "alarmo/config"}
        ),
    )
    async_register_command(
        hass,
        "alarmo/areas",
        websocket_get_areas,
        websocket_api.BASE_COMMAND_MESSAGE_SCHEMA.extend(
            {vol.Required("type"): "alarmo/areas"}
        ),
    )
    async_register_command(
        hass,
        "alarmo/sensors",
        websocket_get_sensors,
        websocket_api.BASE_COMMAND_MESSAGE_SCHEMA.extend(
            {vol.Required("type"): "alarmo/sensors"}
        ),
    )
    async_register_command(
        hass,
        "alarmo/users",
        websocket_get_users,
        websocket_api.BASE_COMMAND_MESSAGE_SCHEMA.extend(
            {vol.Required("type"): "alarmo/users"}
        ),
    )
    async_register_command(
        hass,
        "alarmo/automations",
        websocket_get_automations,
        websocket_api.BASE_COMMAND_MESSAGE_SCHEMA.extend(
            {vol.Required("type"): "alarmo/automations"}
        ),
    )
    async_register_command(
        hass,
        "alarmo/entities",
        websocket_get_alarm_entities,
        websocket_api.BASE_COMMAND_MESSAGE_SCHEMA.extend(
            {vol.Required("type"): "alarmo/entities"}
        ),
    )
    async_register_command(
        hass,
        "alarmo/sensor_groups",
        websocket_get_sensor_groups,
        websocket_api.BASE_COMMAND_MESSAGE_SCHEMA.extend(
            {vol.Required("type"): "alarmo/sensor_groups"}
        ),
    )
    async_register_command(
        hass,
        "alarmo/countdown",
        websocket_get_countdown,
        websocket_api.BASE_COMMAND_MESSAGE_SCHEMA.extend(
            {
                vol.Required("type"): "alarmo/countdown",
                vol.Required("entity_id"): cv.entity_id
            }
        ),
    )
