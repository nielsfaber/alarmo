"""Store constants."""
import datetime


from homeassistant.const import (
    STATE_ALARM_ARMED_AWAY,
    STATE_ALARM_ARMED_HOME,
    STATE_ALARM_ARMED_NIGHT,
    STATE_ALARM_ARMED_CUSTOM_BYPASS,
    STATE_ALARM_DISARMED,
    STATE_ALARM_TRIGGERED,
    STATE_ALARM_PENDING,
    STATE_ALARM_ARMING,
)

from homeassistant.components.alarm_control_panel import DOMAIN as PLATFORM

VERSION = "1.1.2"
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


INITIALIZATION_TIME = datetime.timedelta(seconds=10)

STATES = [
    STATE_ALARM_ARMED_AWAY,
    STATE_ALARM_ARMED_HOME,
    STATE_ALARM_ARMED_NIGHT,
    STATE_ALARM_ARMED_CUSTOM_BYPASS,
    STATE_ALARM_DISARMED,
    STATE_ALARM_TRIGGERED,
    STATE_ALARM_PENDING,
    STATE_ALARM_ARMING,
]

ARM_MODES = [
    STATE_ALARM_ARMED_AWAY,
    STATE_ALARM_ARMED_HOME,
    STATE_ALARM_ARMED_NIGHT,
    STATE_ALARM_ARMED_CUSTOM_BYPASS,
]

EVENT_LEAVE = "leave"
EVENT_ARM = "arm"
EVENT_ENTRY = "entry"
EVENT_TRIGGER = "trigger"

ATTR_MODES = "modes"
ATTR_CODE_DISARM_REQUIRED = "code_disarm_required"
ATTR_REMOVE = "remove"
ATTR_OLD_CODE = "old_code"

ATTR_TRIGGER_TIME = "trigger_time"
ATTR_LEAVE_TIME = "leave_time"
ATTR_ENTRY_TIME = "entry_time"

ATTR_ENABLED = "enabled"
ATTR_USER_ID = "user_id"

ATTR_CAN_ARM = "can_arm"
ATTR_CAN_DISARM = "can_disarm"
ATTR_DISARM_AFTER_TRIGGER = "disarm_after_trigger"

ATTR_REMOVE = "remove"
ATTR_IS_ADMIN = "is_admin"

ATTR_AUTOMATION_ID = "automation_id"

ATTR_TYPE = "type"

ATTR_TRIGGERS = "triggers"
ATTR_ACTIONS = "actions"
ATTR_EVENT = "event"
ATTR_REQUIRE_CODE = "require_code"

ATTR_IS_NOTIFICATION = "is_notification"
ATTR_VERSION = "version"

PUSH_EVENTS = [
    "ios.notification_action_fired",
    "mobile_app_notification_action",
]
EVENT_CATEGORIES = [
    "ALARMO_ARM_FAILURE",
]
EVENT_ACTION_FORCE_ARM = "ALARMO_FORCE_ARM"
EVENT_ACTION_RETRY_ARM = "ALARMO_RETRY_ARM"
