import os
import logging
from aiohttp import web

from homeassistant.components.http import HomeAssistantView

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
    ALARM_ENTITY,
)

_LOGGER = logging.getLogger(__name__)


async def async_register_panel(hass):
    root_dir = os.path.join(hass.config.path(CUSTOM_COMPONENTS), INTEGRATION_FOLDER)
    panel_dir = os.path.join(root_dir, PANEL_FOLDER)
    view_url = os.path.join(panel_dir, PANEL_FILENAME)

    hass.http.register_view(AlarmView(str(panel_dir)))
    hass.http.register_static_path(PANEL_URL, view_url)

    await hass.components.panel_custom.async_register_panel(
        webcomponent_name=PANEL_NAME,
        frontend_url_path=DOMAIN,
        module_url=PANEL_URL,
        sidebar_title=PANEL_TITLE,
        sidebar_icon=PANEL_ICON,
        config={"entity_id": ALARM_ENTITY},
    )


class AlarmView(HomeAssistantView):
    """Serve up resources."""

    requires_auth = False
    url = "/" + DOMAIN + r"/{path:.+}"
    name = "{}:path".format(DOMAIN)

    def __init__(self, root_dir):
        """Initialize."""
        self.root_dir = root_dir

    async def head(self, request, path):
        """Check if file exists."""
        default_path = "{}/{}".format(self.root_dir, path)

        response = web.HTTPOk if os.path.exists(default_path) else web.HTTPNotFound
        return web.Response(status=response.status_code)

    async def get(self, request, path):
        """Retrieve file."""
        default_path = "{}/{}".format(self.root_dir, path)

        if os.path.exists(default_path):
            return web.FileResponse(default_path)