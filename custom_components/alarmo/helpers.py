"""Helper functions for Alarmo integration."""

from homeassistant.core import (
    HomeAssistant,
)

MIN_CODE_LENGTH = 4


def is_valid_access_code(code: object, code_format: str | None = None) -> bool:
    """Return whether a code is acceptable at the server boundary.

    The frontend already enforces this, but services, MQTT and the websocket
    API can reach the same code path directly.
    """
    if not isinstance(code, str):
        return False
    if len(code) < MIN_CODE_LENGTH:
        return False
    if code_format == "number" and not code.isdecimal():
        return False
    return True


def friendly_name_for_entity_id(entity_id: str, hass: HomeAssistant):
    """Helper to get friendly name for entity."""
    state = hass.states.get(entity_id)
    if state and state.attributes.get("friendly_name"):
        return state.attributes["friendly_name"]

    return entity_id


def omit(obj: dict, blacklisted_keys: list):
    """Helper to omit blacklisted keys from a dict."""
    return {key: val for key, val in obj.items() if key not in blacklisted_keys}
