"""The Alarmo Integration."""
import logging
import bcrypt
import base64
import copy
from datetime import timedelta

from homeassistant.components.alarm_control_panel import DOMAIN as PLATFORM
from homeassistant.config_entries import ConfigEntry
from homeassistant.const import (
    EVENT_HOMEASSISTANT_STARTED,
    ATTR_CODE,
)
from homeassistant.core import HomeAssistant, asyncio
from homeassistant.helpers import device_registry as dr
from homeassistant.helpers import service
from homeassistant.helpers.aiohttp_client import async_get_clientsession
from homeassistant.helpers.event import async_call_later, async_track_state_change
from homeassistant.helpers.update_coordinator import DataUpdateCoordinator

from .const import (
    DOMAIN,
    NAME,
    VERSION,
    MANUFACTURER,
    ATTR_USERS,
    ATTR_NAME,
    ATTR_CONFIG,
    ATTR_CODE_NEW,
)

from .helpers import (
    export_user_config,
)

_LOGGER = logging.getLogger(__name__)
SCAN_INTERVAL = timedelta(seconds=30)


async def async_setup(hass, config):
    """Track states and offer events for sensors."""
    return True


async def async_setup_entry(hass: HomeAssistant, entry: ConfigEntry):
    """Set up Alarmo integration from a config entry."""
    session = async_get_clientsession(hass)

    coordinator = AlarmoCoordinator(hass, session, entry)

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
    hass.data[DOMAIN][entry.entry_id] = coordinator

    if entry.unique_id is None:
        hass.config_entries.async_update_entry(
            entry, unique_id=coordinator.id, data={ATTR_USERS: []}
        )

    hass.async_create_task(
        hass.config_entries.async_forward_entry_setup(entry, PLATFORM)
    )

    return True


async def async_unload_entry(hass, entry):
    """Unload Alarmo config entry."""
    unload_ok = all(
        await asyncio.gather(
            *[hass.config_entries.async_forward_entry_unload(entry, PLATFORM)]
        )
    )
    if unload_ok:
        hass.data[DOMAIN].pop(entry.entry_id)
    return unload_ok


class AlarmoCoordinator(DataUpdateCoordinator):
    """Define an object to hold Alarmom device."""

    def __init__(self, hass, session, entry):
        """Initialize."""
        self.id = entry.unique_id
        self.hass = hass
        self.entry = entry

        super().__init__(hass, _LOGGER, name=DOMAIN)

        self.stored_data = dict(entry.data)

    async def _async_update_data(self):
        """Update data via library."""
        return True

    def async_update_storage(self, data):
        self.hass.config_entries.async_update_entry(self.entry, data=data)
        self.stored_data = data

    def create_user(self, kwargs):
        name = kwargs[ATTR_NAME]
        code = kwargs[ATTR_CODE]
        config = export_user_config(kwargs)

        # check if user name exists
        if ATTR_USERS in self.stored_data:
            for user in self.stored_data[ATTR_USERS]:
                if user[ATTR_NAME] == name:
                    return False

        hashed = bcrypt.hashpw(code.encode("utf-8"), bcrypt.gensalt(rounds=12))
        hashed = base64.b64encode(hashed)

        entry = {ATTR_NAME: name, ATTR_CONFIG: config, ATTR_CODE: hashed.decode()}
        users = copy.deepcopy(self.stored_data[ATTR_USERS])
        users.append(entry)
        self.async_update_storage({ATTR_USERS: copy.deepcopy(users)})
        return True

    def remove_user(self, name):
        if not name or not ATTR_USERS in self.stored_data:
            return False

        res = False
        users = copy.deepcopy(self.stored_data[ATTR_USERS])
        for i in range(len(users)):
            user = users[i]
            if user[ATTR_NAME] == name:
                users.pop(i)
                res = True
                break

        if res:
            self.async_update_storage({ATTR_USERS: copy.deepcopy(users)})

        return res

    def edit_user(self, kwargs):
        name = kwargs[ATTR_NAME]
        code = kwargs[ATTR_CODE]
        code_new = kwargs[ATTR_CODE_NEW]
        config = export_user_config(kwargs)

        res = False
        users = copy.deepcopy(self.stored_data[ATTR_USERS])
        for i in range(len(users)):
            if users[i][ATTR_NAME] == name:
                user = users[i]

                if code and code_new:
                    res = self.coordinator.authenticate_user(code)
                    if res and res[ATTR_NAME] == name:
                        hashed = bcrypt.hashpw(
                            code_new.encode("utf-8"), bcrypt.gensalt(rounds=12)
                        )
                        hashed = base64.b64encode(hashed)
                        user[ATTR_CODE] = hashed

                user[ATTR_CONFIG] = config
                users[i] = user
                res = True

        if res:
            self.async_update_storage({ATTR_USERS: copy.deepcopy(users)})

        return res

    def authenticate_user(self, code):
        if not self.stored_data[ATTR_USERS]:
            return

        for user in self.stored_data[ATTR_USERS]:
            hash = base64.b64decode(user[ATTR_CODE])
            if bcrypt.checkpw(code.encode("utf-8"), hash):
                return user
        return

    def get_users(self):
        users = self.stored_data[ATTR_USERS] if ATTR_USERS in self.stored_data else []

        output = {}

        for user in users:
            output[user[ATTR_NAME]] = user[ATTR_CONFIG]

        return output
