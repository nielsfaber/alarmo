import os
import logging

DATA_EXTRA_MODULE_URL = 'frontend_extra_module_url'

from homeassistant.components.http import HomeAssistantView
from homeassistant.components import frontend
from homeassistant.components import panel_custom

from .const import (
    CUSTOM_COMPONENTS,
    INTEGRATION_FOLDER,
    CARD_FOLDER,
    CARD_URL,
    CARD_FILENAME,
    DOMAIN,
)

_LOGGER = logging.getLogger(__name__)


async def async_register_card(hass):
    """add alarmo card to frontend"""
    root_dir = os.path.join(hass.config.path(CUSTOM_COMPONENTS), INTEGRATION_FOLDER)
    card_dir = os.path.join(root_dir, CARD_FOLDER)
    card_real_path = os.path.join(card_dir, CARD_FILENAME)
    card_path = os.path.join(CARD_URL, CARD_FILENAME)

    hass.http.register_static_path(card_path, card_real_path)

    if DATA_EXTRA_MODULE_URL not in hass.data:
        hass.data[DATA_EXTRA_MODULE_URL] = set()

    url_set = set()
    url_set.add(card_path)

    hass.data[DATA_EXTRA_MODULE_URL].update(url_set)

def async_unregister_card(hass):
    """remove alarmo card from frontend"""

