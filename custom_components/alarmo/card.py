import os
import logging
import voluptuous as vol

from homeassistant.core import callback

from .const import (
    CUSTOM_COMPONENTS,
    INTEGRATION_FOLDER,
    CARD_FOLDER,
    CARD_URL,
    CARD_FILENAME,
)
from homeassistant.helpers.dispatcher import (
    async_dispatcher_connect,
)

from homeassistant.components.websocket_api import (decorators, async_register_command)

DATA_EXTRA_MODULE_URL = 'frontend_extra_module_url'
_LOGGER = logging.getLogger(__name__)


@callback
@decorators.websocket_command({
    vol.Required("type"): "alarmo_updated",
})
@decorators.async_response
async def handle_subscribe_updates(hass, connection, msg):
    """Handle subscribe updates."""

    @callback
    def async_handle_event(event: str, area_id: str, args: dict = {}):
        """Forward events to websocket."""
        data = dict(**args, **{
            "event": event,
            "area_id": area_id
        })
        connection.send_message({
            "id": msg["id"],
            "type": "event",
            "event": {
                "data": data
            }
        })

    connection.subscriptions[msg["id"]] = async_dispatcher_connect(
        hass,
        "alarmo_event",
        async_handle_event
    )
    connection.send_result(msg["id"])


async def async_register_card(hass):
    """add alarmo card to frontend"""
    _LOGGER.debug("registering card")
    root_dir = os.path.join(hass.config.path(CUSTOM_COMPONENTS), INTEGRATION_FOLDER)
    card_dir = os.path.join(root_dir, CARD_FOLDER)
    card_real_path = os.path.join(card_dir, CARD_FILENAME)
    card_path = os.path.join(CARD_URL, CARD_FILENAME)

    hass.http.register_static_path(card_path, card_real_path)

    hass.data[DATA_EXTRA_MODULE_URL].add(card_path)

    async_register_command(hass, handle_subscribe_updates)


def async_unregister_card(hass):
    """remove alarmo card from frontend"""
