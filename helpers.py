import logging
import datetime

from homeassistant.components.alarm_control_panel.const import (
    SUPPORT_ALARM_ARM_AWAY,
    SUPPORT_ALARM_ARM_HOME,
    SUPPORT_ALARM_ARM_NIGHT,
    SUPPORT_ALARM_ARM_CUSTOM_BYPASS,
)
from homeassistant.const import (
    STATE_ALARM_ARMED_AWAY,
    STATE_ALARM_ARMED_HOME,
    STATE_ALARM_ARMED_NIGHT,
    STATE_ALARM_ARMED_CUSTOM_BYPASS,
)

from .const import (
    ARM_MODES,
    ARM_MODE_AWAY,
    ARM_MODE_HOME,
    ARM_MODE_NIGHT,
    ARM_MODE_CUSTOM,
    ATTR_MODES,
    ATTR_IMMEDIATE,
    ATTR_ARM_ON_CLOSE,
    ATTR_ALLOW_OPEN,
    CONF_SENSOR_USE_MODE_AWAY,
    CONF_SENSOR_USE_MODE_HOME,
    CONF_SENSOR_USE_MODE_NIGHT,
    CONF_SENSOR_USE_MODE_CUSTOM,
    CONF_SENSOR_IMMEDIATE_MODE_AWAY,
    CONF_SENSOR_IMMEDIATE_MODE_HOME,
    CONF_SENSOR_IMMEDIATE_MODE_NIGHT,
    CONF_SENSOR_IMMEDIATE_MODE_CUSTOM,
    CONF_SENSOR_AUTO_ARM_ON_CLOSE,
    CONF_SENSOR_ALLOW_OPEN_AT_ARM,
    EVENT_LEAVE,
    EVENT_ENTRY,
    EVENT_TRIGGER,
    EVENT_ARM,
    CONF_USER_IS_ADMIN,
    CONF_USER_CAN_ARM,
    CONF_USER_CAN_DISARM,
    ATTR_IS_ADMIN,
    ATTR_CAN_ARM,
    ATTR_CAN_DISARM,
    ATTR_CODE_DISARM_REQUIRED,
    ATTR_DISARM_AFTER_TRIGGER,
    CONF_GENERAL_CODE_DISARM_REQUIRED,
    CONF_GENERAL_DISARM_AFTER_TRIGGER,
)

_LOGGER = logging.getLogger(__name__)


def modes_to_supported_features(modes):
    output = 0

    if ARM_MODE_AWAY in modes:
        output = output | SUPPORT_ALARM_ARM_AWAY
    if ARM_MODE_HOME in modes:
        output = output | SUPPORT_ALARM_ARM_HOME
    if ARM_MODE_NIGHT in modes:
        output = output | SUPPORT_ALARM_ARM_NIGHT
    if ARM_MODE_CUSTOM in modes:
        output = output | SUPPORT_ALARM_ARM_CUSTOM_BYPASS

    return output


def supported_features_to_modes(supported_features):
    modes = []

    if supported_features & SUPPORT_ALARM_ARM_AWAY:
        modes.append(ARM_MODE_AWAY)
    if supported_features & SUPPORT_ALARM_ARM_HOME:
        modes.append(ARM_MODE_HOME)
    if supported_features & SUPPORT_ALARM_ARM_NIGHT:
        modes.append(ARM_MODE_NIGHT)
    if supported_features & SUPPORT_ALARM_ARM_CUSTOM_BYPASS:
        modes.append(ARM_MODE_CUSTOM)

    return modes


def export_sensor_config(kwargs):
    modes = kwargs[ATTR_MODES]
    config = 0

    if ARM_MODE_AWAY in modes:
        config = config | CONF_SENSOR_USE_MODE_AWAY
    if ARM_MODE_HOME in modes:
        config = config | CONF_SENSOR_USE_MODE_HOME
    if ARM_MODE_NIGHT in modes:
        config = config | CONF_SENSOR_USE_MODE_NIGHT
    if ARM_MODE_CUSTOM in modes:
        config = config | CONF_SENSOR_USE_MODE_CUSTOM
    if ATTR_IMMEDIATE in kwargs and kwargs[ATTR_IMMEDIATE]:
        config = config | (
            CONF_SENSOR_IMMEDIATE_MODE_AWAY
            | CONF_SENSOR_IMMEDIATE_MODE_HOME
            | CONF_SENSOR_IMMEDIATE_MODE_NIGHT
            | CONF_SENSOR_IMMEDIATE_MODE_CUSTOM
        )
    if ATTR_ARM_ON_CLOSE in kwargs and kwargs[ATTR_ARM_ON_CLOSE]:
        config = config | CONF_SENSOR_AUTO_ARM_ON_CLOSE
    if ATTR_ALLOW_OPEN in kwargs and kwargs[ATTR_ALLOW_OPEN]:
        config = config | CONF_SENSOR_ALLOW_OPEN_AT_ARM

    return config


def import_sensor_config(config):
    modes = []
    if config & CONF_SENSOR_USE_MODE_AWAY:
        modes.append(ARM_MODE_AWAY)
    if config & CONF_SENSOR_USE_MODE_HOME:
        modes.append(ARM_MODE_HOME)
    if config & CONF_SENSOR_USE_MODE_NIGHT:
        modes.append(ARM_MODE_NIGHT)
    if config & CONF_SENSOR_USE_MODE_CUSTOM:
        modes.append(ARM_MODE_CUSTOM)

    output = {
        ATTR_MODES: modes,
        ATTR_IMMEDIATE: bool(
            config & CONF_SENSOR_IMMEDIATE_MODE_AWAY
        ),  # tbd - mode dependent setting
        ATTR_ARM_ON_CLOSE: bool(config & CONF_SENSOR_AUTO_ARM_ON_CLOSE),
        ATTR_ALLOW_OPEN: bool(config & CONF_SENSOR_ALLOW_OPEN_AT_ARM),
    }
    return output


def state_to_arm_mode(state):
    if state == STATE_ALARM_ARMED_AWAY:
        return ARM_MODE_AWAY
    elif state == STATE_ALARM_ARMED_HOME:
        return ARM_MODE_HOME
    elif state == STATE_ALARM_ARMED_NIGHT:
        return ARM_MODE_NIGHT
    elif state == STATE_ALARM_ARMED_CUSTOM_BYPASS:
        return ARM_MODE_CUSTOM
    else:
        return None


def arm_mode_to_state(mode):
    if mode == ARM_MODE_AWAY:
        return STATE_ALARM_ARMED_AWAY
    if mode == ARM_MODE_HOME:
        return STATE_ALARM_ARMED_HOME
    if mode == ARM_MODE_NIGHT:
        return STATE_ALARM_ARMED_NIGHT
    if mode == ARM_MODE_CUSTOM:
        return STATE_ALARM_ARMED_CUSTOM_BYPASS


def export_delay_config(delayConfig):
    output = {}

    for (key, config) in delayConfig.items():

        values = list(config.values())
        if all(x == values[0] for x in values):
            if len(values) and values[0] and round(values[0].total_seconds()):
                output[key] = round(values[0].total_seconds())
        else:
            for (k, v) in config.items():
                if v and round(v.total_seconds()):
                    output["{}_{}".format(key, k)] = round(v.total_seconds())

    return output


def import_delay_config(delayConfig, modeList):
    output = {}

    for (key, val) in delayConfig.items():
        if "_" in key:  # mode specific delay config
            (tree, item) = key.split("_")
            if not tree in output:
                output[tree] = {}
                for mode in modeList:
                    output[tree][mode] = None
            output[tree][item] = datetime.timedelta(seconds=val)
        else:  # common delay config
            output[key] = {}
            for mode in modeList:
                output[key][mode] = datetime.timedelta(seconds=val)

    return output


def export_user_config(kwargs):
    is_admin = kwargs[ATTR_IS_ADMIN]
    can_arm = kwargs[ATTR_CAN_ARM]
    can_disarm = kwargs[ATTR_CAN_DISARM]
    config = 0

    if is_admin:
        config = config | CONF_USER_IS_ADMIN
    if can_arm:
        config = config | CONF_USER_CAN_ARM
    if can_disarm:
        config = config | CONF_USER_CAN_DISARM

    return config


def import_user_config(config):
    output = {
        ATTR_IS_ADMIN: bool(config & CONF_USER_IS_ADMIN),
        ATTR_CAN_ARM: bool(config & CONF_USER_CAN_ARM),
        ATTR_CAN_DISARM: bool(config & CONF_USER_CAN_DISARM),
    }
    return output


def export_generic_config(kwargs):
    config = 0

    if kwargs[ATTR_CODE_DISARM_REQUIRED]:
        config = config | CONF_GENERAL_CODE_DISARM_REQUIRED
    if kwargs[ATTR_DISARM_AFTER_TRIGGER]:
        config = config | CONF_GENERAL_DISARM_AFTER_TRIGGER

    return config


def import_generic_config(config):
    output = {
        ATTR_CODE_DISARM_REQUIRED: bool(config & CONF_GENERAL_CODE_DISARM_REQUIRED),
        ATTR_DISARM_AFTER_TRIGGER: bool(config & CONF_GENERAL_DISARM_AFTER_TRIGGER),
    }
    return output