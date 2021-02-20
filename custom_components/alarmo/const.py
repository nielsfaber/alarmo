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

from homeassistant.components.alarm_control_panel import (
    DOMAIN as PLATFORM,
    SUPPORT_ALARM_ARM_AWAY,
    SUPPORT_ALARM_ARM_HOME,
    SUPPORT_ALARM_ARM_NIGHT,
    SUPPORT_ALARM_ARM_CUSTOM_BYPASS,
)

VERSION = "1.5.3"
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


INITIALIZATION_TIME = datetime.timedelta(seconds=30)
SENSOR_ARM_TIME = datetime.timedelta(seconds=5)

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

COMMAND_ARM_NIGHT = "arm_night"
COMMAND_ARM_AWAY = "arm_away"
COMMAND_ARM_HOME = "arm_home"
COMMAND_ARM_CUSTOM_BYPASS = "arm_custom_bypass"
COMMAND_DISARM = "disarm"

COMMANDS = [
    COMMAND_DISARM,
    COMMAND_ARM_AWAY,
    COMMAND_ARM_NIGHT,
    COMMAND_ARM_HOME,
    COMMAND_ARM_CUSTOM_BYPASS,
]

EVENT_LEAVE = "leave"
EVENT_ARM = "arm"
EVENT_ENTRY = "entry"
EVENT_TRIGGER = "trigger"
EVENT_FAILED_TO_ARM = "failed_to_arm"
EVENT_COMMAND_NOT_ALLOWED = "command_not_allowed"
EVENT_INVALID_CODE_PROVIDED = "invalid_code_provided"
EVENT_NO_CODE_PROVIDED = "no_code_provided"

ATTR_MODES = "modes"
ATTR_CODE_DISARM_REQUIRED = "code_disarm_required"
ATTR_REMOVE = "remove"
ATTR_OLD_CODE = "old_code"

ATTR_TRIGGER_TIME = "trigger_time"
ATTR_EXIT_TIME = "exit_time"
ATTR_ENTRY_TIME = "entry_time"

ATTR_ENABLED = "enabled"
ATTR_USER_ID = "user_id"

ATTR_CAN_ARM = "can_arm"
ATTR_CAN_DISARM = "can_disarm"
ATTR_DISARM_AFTER_TRIGGER = "disarm_after_trigger"

ATTR_REMOVE = "remove"
ATTR_IS_ADMIN = "is_admin"
ATTR_IS_OVERRIDE_CODE = "is_override_code"

ATTR_AUTOMATION_ID = "automation_id"

ATTR_TYPE = "type"
ATTR_AREA = "area"
ATTR_MASTER = "master"

ATTR_TRIGGERS = "triggers"
ATTR_ACTIONS = "actions"
ATTR_EVENT = "event"
ATTR_REQUIRE_CODE = "require_code"

ATTR_IS_NOTIFICATION = "is_notification"
ATTR_VERSION = "version"
ATTR_STATE_PAYLOAD = "state_payload"
ATTR_COMMAND_PAYLOAD = "command_payload"

PUSH_EVENTS = [
    "ios.notification_action_fired",
    "mobile_app_notification_action",
]
EVENT_CATEGORIES = [
    "ALARMO_ARM_FAILURE",
]
EVENT_ACTION_FORCE_ARM = "ALARMO_FORCE_ARM"
EVENT_ACTION_RETRY_ARM = "ALARMO_RETRY_ARM"

MODES_TO_SUPPORTED_FEATURES = {
    STATE_ALARM_ARMED_AWAY: SUPPORT_ALARM_ARM_AWAY,
    STATE_ALARM_ARMED_HOME: SUPPORT_ALARM_ARM_HOME,
    STATE_ALARM_ARMED_NIGHT: SUPPORT_ALARM_ARM_NIGHT,
    STATE_ALARM_ARMED_CUSTOM_BYPASS: SUPPORT_ALARM_ARM_CUSTOM_BYPASS,
}
