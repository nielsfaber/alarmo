"""Describe Alarmo events for the Home Assistant Logbook."""

from homeassistant.core import HomeAssistant, callback
from homeassistant.components.logbook import (
    LOGBOOK_ENTRY_NAME,
    LOGBOOK_ENTRY_MESSAGE,
    LOGBOOK_ENTRY_ENTITY_ID,
    LOGBOOK_ENTRY_CONTEXT_ID,
    LazyEventPartialState,
)

from . import const


@callback
def async_describe_events(hass: HomeAssistant, async_describe_event):
    """Describe Alarmo activity events."""

    def describe_sensors(data: dict) -> str:
        names = []
        for sensor in data.get("sensors") or []:
            state = hass.states.get(sensor) if hass else None
            friendly_name = state.name if state is not None else sensor
            names.append(f"{friendly_name} ({sensor})")
        return ", ".join(names)

    def describe_message(data: dict) -> str:
        action = data.get("action")
        sensors = describe_sensors(data)
        by = f" by {data['changed_by']}" if data.get("changed_by") else ""
        mode = data.get("mode", "").replace("_", " ")
        command = data.get("command")

        messages = {
            "arm": f"{'arming' if data.get('delay') else 'armed'} {mode}{by}",
            "disarm": f"disarmed{by}",
            "trigger": (
                ("entry delay started" if data.get("delay") else "triggered")
                + (f" by {sensors}" if sensors else "")
            ),
            "failed_to_arm": "failed to arm"
            + (f", open sensors: {sensors}" if sensors else ""),
            "command_not_allowed": (
                f"command {command} not allowed in state {data.get('state')}"
            ),
            "invalid_code": f"invalid code provided for command {command}",
            "no_code": f"no code provided for command {command}",
        }
        return messages.get(action, str(action))

    @callback
    def async_describe_logbook_event(event: LazyEventPartialState):
        """Describe an Alarmo activity event."""
        data = event.data
        return {
            LOGBOOK_ENTRY_NAME: f"Alarmo -> {data.get('name')}",
            LOGBOOK_ENTRY_MESSAGE: describe_message(data),
            LOGBOOK_ENTRY_ENTITY_ID: data.get("entity_id"),
            LOGBOOK_ENTRY_CONTEXT_ID: event.context_id,
        }

    async_describe_event(
        const.DOMAIN,
        const.EVENT_ACTIVITY,
        async_describe_logbook_event,
    )
