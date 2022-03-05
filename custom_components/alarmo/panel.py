import os
import logging

from homeassistant.components import frontend
from homeassistant.components import panel_custom

from .const import (
    CUSTOM_COMPONENTS,
    INTEGRATION_FOLDER,
    PANEL_FOLDER,
    PANEL_URL,
    PANEL_TITLE,
    PANEL_ICON,
    PANEL_NAME,
    PANEL_FILENAME,
    DOMAIN,
)

_LOGGER = logging.getLogger(__name__)


async def async_register_panel(hass):
    root_dir = os.path.join(hass.config.path(CUSTOM_COMPONENTS), INTEGRATION_FOLDER)
    panel_dir = os.path.join(root_dir, PANEL_FOLDER)
    view_url = os.path.join(panel_dir, PANEL_FILENAME)

    hass.http.register_static_path(
        PANEL_URL,
        view_url,
        cache_headers=False
    )

    await panel_custom.async_register_panel(
        hass,
        webcomponent_name=PANEL_NAME,
        frontend_url_path=DOMAIN,
        module_url=PANEL_URL,
        sidebar_title=PANEL_TITLE,
        sidebar_icon=PANEL_ICON,
        require_admin=True,
        config={},
    )


def async_unregister_panel(hass):
    frontend.async_remove_panel(hass, DOMAIN)
    _LOGGER.debug("Removing panel")
