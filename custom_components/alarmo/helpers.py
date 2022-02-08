import logging

from homeassistant.core import (
    HomeAssistant,
)

from . import const

_LOGGER = logging.getLogger(__name__)


def friendly_name_for_entity_id(entity_id: str, hass: HomeAssistant):
    """helper to get friendly name for entity"""
    state = hass.states.get(entity_id)
    if state and state.attributes["friendly_name"]:
        return state.attributes["friendly_name"]

    return entity_id


def omit(obj: dict, blacklisted_keys: list):
    return {
        key: val
        for key, val in obj.items()
        if key not in blacklisted_keys
    }
