"""Store constants."""
import datetime

import voluptuous as vol
from homeassistant.const import ATTR_ENTITY_ID, ATTR_CODE, ATTR_CODE_FORMAT
from homeassistant.components.alarm_control_panel import (
    FORMAT_NUMBER as CODE_FORMAT_NUMBER,
    FORMAT_TEXT as CODE_FORMAT_TEXT,
    ATTR_CODE_ARM_REQUIRED,
)

from homeassistant.helpers import config_validation as cv
from homeassistant.components.alarm_control_panel import DOMAIN as PLATFORM

VERSION = "1.0.1"
NAME = "Alarmo"
MANUFACTURER = "@nielsfaber"

DOMAIN = "alarmo"
ALARM_ENTITY = "{}.{}".format(PLATFORM, DOMAIN)


CUSTOM_COMPONENTS = "custom_components"
INTEGRATION_FOLDER = DOMAIN
PANEL_FOLDER = "frontend"
PANEL_FILENAME = "dist/alarm-panel.js"

PANEL_URL = "/api/panel_custom/alarmo"
PANEL_TITLE = NAME
PANEL_ICON = "mdi:shield-home"
PANEL_NAME = "alarm-panel"

SERVICE_EDIT_CONFIG = "edit_config"

INITIALIZATION_TIME = datetime.timedelta(seconds=10)

ARM_MODE_AWAY = "away"
ARM_MODE_HOME = "home"
ARM_MODE_NIGHT = "night"
ARM_MODE_CUSTOM = "custom"
ARM_MODES = [ARM_MODE_AWAY, ARM_MODE_HOME, ARM_MODE_NIGHT, ARM_MODE_CUSTOM]

CONF_SENSOR_USE_MODE_AWAY = 1
CONF_SENSOR_USE_MODE_HOME = 2
CONF_SENSOR_USE_MODE_NIGHT = 4
CONF_SENSOR_USE_MODE_CUSTOM = 8
CONF_SENSOR_IMMEDIATE_MODE_AWAY = 16
CONF_SENSOR_IMMEDIATE_MODE_HOME = 32
CONF_SENSOR_IMMEDIATE_MODE_NIGHT = 64
CONF_SENSOR_IMMEDIATE_MODE_CUSTOM = 128
CONF_SENSOR_AUTO_ARM_ON_CLOSE = 256
CONF_SENSOR_ALLOW_OPEN_AT_ARM = 512

CONF_USER_IS_ADMIN = 1
CONF_USER_CAN_ARM = 2
CONF_USER_CAN_DISARM = 4

CONF_GENERAL_CODE_DISARM_REQUIRED = 1
CONF_GENERAL_DISARM_AFTER_TRIGGER = 2

SENSOR_STATES_OPEN = ["on"]
SENSOR_STATES_CLOSED = ["off"]

SENSOR_STATE_OPEN = "open"
SENSOR_STATE_CLOSED = "closed"
SENSOR_STATE_INDETERMINATE = "indeterminate"

EVENT_LEAVE = "leave"
EVENT_ARM = "arm"
EVENT_ENTRY = "entry"
EVENT_TRIGGER = "trigger"

ATTR_SENSORS = "sensors"
ATTR_MODE = "mode"
ATTR_MODES = "modes"
ATTR_SUPPORTED_FEATURES = "supported_features"
ATTR_DELAYS = "delays"
ATTR_ENABLED = "enabled"
ATTR_IMMEDIATE = "immediate"
ATTR_ARM_ON_CLOSE = "arm_on_close"
ATTR_ALLOW_OPEN = "allow_open"
ATTR_USERS = "users"
ATTR_NAME = "name"
ATTR_CODE_NEW = "code_new"
ATTR_IS_ADMIN = "is_admin"
ATTR_CAN_ARM = "can_arm"
ATTR_CAN_DISARM = "can_disarm"
ATTR_REMOVE = "remove"
ATTR_CONFIG = "config"
ATTR_CODE_DISARM_REQUIRED = "code_disarm_required"
ATTR_TRIGGER_TIME = "trigger_time"
ATTR_DISARM_AFTER_TRIGGER = "disarm_after_trigger"
ATTR_LAST_STATE = "last_state"
ATTR_EVENT = "event"
ATTR_OPEN_SENSORS = "open_sensors"
ATTR_PUSH_TARGET = "push_target"
ATTR_SIREN_ENTITY = "siren_entity"
# ------------------------------default config-------------------------

DEFAULT_CONFIG_MODES = [ARM_MODE_AWAY, ARM_MODE_NIGHT]

DEFAULT_CONFIG_DELAYS = {
    EVENT_LEAVE: {
        ARM_MODE_AWAY: datetime.timedelta(seconds=60),
        ARM_MODE_NIGHT: None,
    },
    EVENT_ENTRY: {
        ARM_MODE_AWAY: datetime.timedelta(seconds=60),
        ARM_MODE_NIGHT: datetime.timedelta(seconds=60),
    },
    EVENT_TRIGGER: {
        ARM_MODE_AWAY: datetime.timedelta(minutes=30),
        ARM_MODE_NIGHT: datetime.timedelta(minutes=30),
    },
}

# ------------------------------service config-------------------------

COMMAND_EDIT_SENSOR = "edit_sensor"
COMMAND_REMOVE_SENSOR = "remove_sensor"
COMMAND_EDIT_GENERAL = "edit_general"
COMMAND_EDIT_MODE = "edit_mode"
COMMAND_ADD_USER = "add_user"
COMMAND_EDIT_USER = "edit_user"
COMMAND_CONFIG_CODE = "config_code"
COMMAND_EDIT_ACTIONS = "edit_actions"

SCHEMA_EDIT_SENSOR = vol.Schema(
    {
        vol.Required(ATTR_ENTITY_ID): cv.entity_id,
        vol.Required(ATTR_MODES): vol.All(
            cv.ensure_list,
            [vol.In(ARM_MODES)],
        ),
        vol.Optional(ATTR_IMMEDIATE): cv.boolean,
        vol.Optional(ATTR_ARM_ON_CLOSE): cv.boolean,
        vol.Optional(ATTR_ALLOW_OPEN): cv.boolean,
    }
)

SCHEMA_REMOVE_SENSOR = vol.Schema({vol.Required(ATTR_ENTITY_ID): cv.entity_id})

SCHEMA_EDIT_MODE = vol.Schema(
    {
        vol.Required(ATTR_MODE): vol.In(ARM_MODES),
        vol.Optional(ATTR_ENABLED): cv.boolean,
        vol.Optional(ATTR_DELAYS): vol.Schema(
            {
                vol.Required(EVENT_LEAVE): cv.time_period_dict,
                vol.Required(EVENT_ENTRY): cv.time_period_dict,
            }
        ),
    }
)

SCHEMA_EDIT_GENERAL = vol.Schema(
    {
        vol.Optional(ATTR_TRIGGER_TIME): cv.time_period_dict,
        vol.Optional(ATTR_DISARM_AFTER_TRIGGER): cv.boolean,
    }
)

SCHEMA_ADD_USER = vol.Schema(
    {
        vol.Required(ATTR_NAME): cv.string,
        vol.Required(ATTR_CODE): cv.string,
        vol.Optional(ATTR_IS_ADMIN, default=False): cv.boolean,
        vol.Optional(ATTR_CAN_ARM, default=False): cv.boolean,
        vol.Optional(ATTR_CAN_DISARM, default=False): cv.boolean,
    }
)

SCHEMA_EDIT_USER = vol.Schema(
    {
        vol.Required(ATTR_NAME): cv.string,
        vol.Optional(ATTR_IS_ADMIN): cv.boolean,
        vol.Optional(ATTR_CAN_ARM): cv.boolean,
        vol.Optional(ATTR_CAN_DISARM): cv.boolean,
        vol.Optional(ATTR_CODE): cv.string,
        vol.Optional(ATTR_CODE_NEW): cv.string,
        vol.Optional(ATTR_REMOVE, default=False): cv.boolean,
    }
)

SCHEMA_CONFIG_CODE = vol.Schema(
    {
        vol.Required(ATTR_CODE_ARM_REQUIRED): cv.boolean,
        vol.Required(ATTR_CODE_DISARM_REQUIRED): cv.boolean,
        vol.Required(ATTR_CODE_FORMAT): vol.In([CODE_FORMAT_NUMBER, CODE_FORMAT_TEXT]),
    }
)

SCHEMA_EDIT_ACTIONS = vol.Schema(
    {
        vol.Optional(ATTR_PUSH_TARGET): cv.string,
        vol.Optional(ATTR_SIREN_ENTITY): cv.string,
    }
)

SCHEMA_EDIT_CONFIG = vol.Schema(
    {
        vol.Required(ATTR_ENTITY_ID): cv.entity_id,
        vol.Optional(COMMAND_EDIT_SENSOR): SCHEMA_EDIT_SENSOR,
        vol.Optional(COMMAND_REMOVE_SENSOR): SCHEMA_REMOVE_SENSOR,
        vol.Optional(COMMAND_EDIT_MODE): SCHEMA_EDIT_MODE,
        vol.Optional(COMMAND_EDIT_GENERAL): SCHEMA_EDIT_GENERAL,
        vol.Optional(COMMAND_ADD_USER): SCHEMA_ADD_USER,
        vol.Optional(COMMAND_EDIT_USER): SCHEMA_EDIT_USER,
        vol.Optional(COMMAND_CONFIG_CODE): SCHEMA_CONFIG_CODE,
        vol.Optional(COMMAND_EDIT_ACTIONS): SCHEMA_EDIT_ACTIONS,
    },
    extra=vol.ALLOW_EXTRA,
)
