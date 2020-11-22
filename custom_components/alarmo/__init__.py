"""The Alarmo Integration."""
import logging
import bcrypt
import base64

from homeassistant.components.alarm_control_panel import DOMAIN as PLATFORM
from homeassistant.config_entries import ConfigEntry
from homeassistant.const import (
    ATTR_CODE,
)
from homeassistant.core import HomeAssistant, asyncio
from homeassistant.helpers import device_registry as dr
from homeassistant.helpers.aiohttp_client import async_get_clientsession
from homeassistant.helpers.update_coordinator import DataUpdateCoordinator

from .const import (
    DOMAIN,
    NAME,
    VERSION,
    MANUFACTURER,
    ATTR_REMOVE,
    ATTR_OLD_CODE,
)
from .store import async_get_registry
from .panel import (
    async_register_panel,
    async_unregister_panel,
)
from .websockets import async_register_websockets

_LOGGER = logging.getLogger(__name__)


async def async_setup(hass, config):
    """Track states and offer events for sensors."""
    return True


async def async_setup_entry(hass: HomeAssistant, entry: ConfigEntry):
    """Set up Alarmo integration from a config entry."""
    session = async_get_clientsession(hass)

    store = await async_get_registry(hass)
    coordinator = AlarmoCoordinator(hass, session, entry, store)

    device_registry = await dr.async_get_registry(hass)
    device_registry.async_get_or_create(
        config_entry_id=entry.entry_id,
        identifiers={(DOMAIN, coordinator.id)},
        name=NAME,
        model=NAME,
        sw_version=VERSION,
        manufacturer=MANUFACTURER,
    )

    hass.data.setdefault(DOMAIN, {})
    hass.data[DOMAIN] = coordinator

    if entry.unique_id is None:
        hass.config_entries.async_update_entry(entry, unique_id=coordinator.id, data={})

    hass.async_create_task(
        hass.config_entries.async_forward_entry_setup(entry, PLATFORM)
    )

    # Register the panel (frontend)
    await async_register_panel(hass)

    # Websocket support
    await async_register_websockets(hass)

    return True


async def async_unload_entry(hass, entry):
    """Unload Alarmo config entry."""
    unload_ok = all(
        await asyncio.gather(
            *[hass.config_entries.async_forward_entry_unload(entry, PLATFORM)]
        )
    )
    if unload_ok:
        async_unregister_panel(hass)
        coordinator = hass.data[DOMAIN]
        await coordinator.async_delete()
        del hass.data[DOMAIN]
    return unload_ok


class AlarmoCoordinator(DataUpdateCoordinator):
    """Define an object to hold Alarmo device."""

    def __init__(self, hass, session, entry, store):
        """Initialize."""
        self.id = entry.unique_id
        self.hass = hass
        self.entry = entry
        self.store = store
        self.config_callback = None
        self.sensor_callback = None
        self.automation_callback = None

        super().__init__(hass, _LOGGER, name=DOMAIN)

    async def async_update_config(self, data):
        self.store.async_update_config(data)
        await self.config_callback()

    async def async_update_mode_config(self, mode: str, data: dict):
        self.store.async_update_mode_config(mode, data)
        await self.config_callback()

    def async_update_sensor_config(self, entity_id: str, data: dict):
        if ATTR_REMOVE in data:
            self.store.async_delete_sensor(entity_id)
        elif self.store.async_get_sensor(entity_id):
            self.store.async_update_sensor(entity_id, data)
        else:
            self.store.async_create_sensor(entity_id, data)

        self.sensor_callback()

    def async_update_user_config(self, user_id: str = None, data: dict = {}):

        if ATTR_REMOVE in data:
            self.store.async_delete_user(user_id)
            return

        if ATTR_CODE in data and data[ATTR_CODE]:
            hashed = bcrypt.hashpw(
                data[ATTR_CODE].encode("utf-8"), bcrypt.gensalt(rounds=12)
            )
            hashed = base64.b64encode(hashed)
            data[ATTR_CODE] = hashed.decode()

        if not user_id:
            self.store.async_create_user(data)
        else:
            if ATTR_CODE in data:
                if ATTR_OLD_CODE not in data:
                    return False
                elif not self.async_authenticate_user(data[ATTR_OLD_CODE], user_id):
                    return False
                else:
                    del data[ATTR_OLD_CODE]
                    self.store.async_update_user(user_id, data)
            else:
                self.store.async_update_user(user_id, data)

    def async_authenticate_user(self, code: str, user_id: str = None):
        if not user_id:
            users = self.store.async_get_users()
        else:
            users = {
                user_id: self.store.async_get_user(user_id)
            }

        for (user_id, user) in users.items():
            if not user[ATTR_CODE] and not code:
                return user
            elif user[ATTR_CODE]:
                hash = base64.b64decode(user[ATTR_CODE])
                if bcrypt.checkpw(code.encode("utf-8"), hash):
                    return user

        return

    def register_config_callback(self, callback_func):
        self.config_callback = callback_func

    def register_sensor_callback(self, callback_func):
        self.sensor_callback = callback_func

    def register_automation_callback(self, callback_func):
        self.automation_callback = callback_func

    def async_update_automation_config(self, automation_id: str = None, data: dict = {}):

        if ATTR_REMOVE in data:
            self.store.async_delete_automation(automation_id)
        elif not automation_id:
            self.store.async_create_automation(data)
        else:
            self.store.async_update_automation(automation_id, data)

        self.automation_callback()

    async def async_delete(self):
        await self.store.async_delete()
