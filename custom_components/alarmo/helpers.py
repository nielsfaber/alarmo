"""Helper functions for Alarmo integration."""

from homeassistant.core import (
    HomeAssistant,
)


def friendly_name_for_entity_id(entity_id: str, hass: HomeAssistant):
    """Helper to get friendly name for entity."""
    state = hass.states.get(entity_id)
    if state and state.attributes.get("friendly_name"):
        return state.attributes["friendly_name"]

    return entity_id


def omit(obj: dict, blacklisted_keys: list):
    """Helper to omit blacklisted keys from a dict."""
    return {key: val for key, val in obj.items() if key not in blacklisted_keys}
