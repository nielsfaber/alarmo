import logging

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
    ATTR_MODES,
    ATTR_ENABLED,
    ARM_MODES,
)

_LOGGER = logging.getLogger(__name__)


def supported_modes(config):
    modes = []

    if ATTR_MODES in config:
        for (mode, config) in config[ATTR_MODES].items():
            if ATTR_ENABLED in config and config[ATTR_ENABLED] and mode in ARM_MODES:
                modes.append(mode)

    return modes


def calculate_supported_features(config):
    modes = supported_modes(config)

    output = 0

    if STATE_ALARM_ARMED_AWAY in modes:
        output = output | SUPPORT_ALARM_ARM_AWAY
    if STATE_ALARM_ARMED_HOME in modes:
        output = output | SUPPORT_ALARM_ARM_HOME
    if STATE_ALARM_ARMED_NIGHT in modes:
        output = output | SUPPORT_ALARM_ARM_NIGHT
    if STATE_ALARM_ARMED_CUSTOM_BYPASS in modes:
        output = output | SUPPORT_ALARM_ARM_CUSTOM_BYPASS

    return output
