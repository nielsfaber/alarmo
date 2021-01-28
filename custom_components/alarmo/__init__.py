"""The Alarmo Integration."""
import logging
import bcrypt
import base64

from homeassistant.core import (
    callback,
)
from homeassistant.components.alarm_control_panel import DOMAIN as PLATFORM
from homeassistant.config_entries import ConfigEntry
from homeassistant.const import (
    ATTR_CODE,
)
from homeassistant.core import HomeAssistant, asyncio
from homeassistant.helpers import device_registry as dr
from homeassistant.helpers.aiohttp_client import async_get_clientsession
from homeassistant.helpers.update_coordinator import DataUpdateCoordinator
from homeassistant.helpers.dispatcher import (
    async_dispatcher_connect,
    async_dispatcher_send,
)

from . import const
from .store import async_get_registry
from .panel import (
    async_register_panel,
    async_unregister_panel,
)
from .websockets import async_register_websockets
from .sensors import SensorHandler
from .automations import AutomationHandler
from .mqtt import MqttHandler

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
        identifiers={(const.DOMAIN, coordinator.id)},
        name=const.NAME,
        model=const.NAME,
        sw_version=const.VERSION,
        manufacturer=const.MANUFACTURER,
    )

    hass.data.setdefault(const.DOMAIN, {})
    hass.data[const.DOMAIN] = {
        "coordinator": coordinator,
        "areas": {},
        "master": None
    }

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
        coordinator = hass.data[const.DOMAIN]["coordinator"]
        await coordinator.async_delete()
        del hass.data[const.DOMAIN]
    return unload_ok


class AlarmoCoordinator(DataUpdateCoordinator):
    """Define an object to hold Alarmo device."""

    def __init__(self, hass, session, entry, store):
        """Initialize."""
        self.id = entry.unique_id
        self.hass = hass
        self.entry = entry
        self.store = store
        self._push_listeners = []

        async_dispatcher_connect(
            hass, "alarmo_platform_loaded", self.setup_alarm_entities
        )
        self.listen_push_events()

        super().__init__(hass, _LOGGER, name=const.DOMAIN)

    @callback
    def setup_alarm_entities(self):
        self.hass.data[const.DOMAIN]["sensor_handler"] = SensorHandler(self.hass)
        self.hass.data[const.DOMAIN]["automation_handler"] = AutomationHandler(self.hass)
        self.hass.data[const.DOMAIN]["mqtt_handler"] = MqttHandler(self.hass)

        areas = self.store.async_get_areas()
        config = self.store.async_get_config()

        for item in areas.values():
            async_dispatcher_send(self.hass, "alarmo_register_entity", item)

        if len(areas) > 1 and config["master"]["enabled"]:
            async_dispatcher_send(self.hass, "alarmo_register_master", config["master"])

    async def async_update_config(self, data):
        if "master" in data:
            old_config = self.store.async_get_config()
            if old_config[const.ATTR_MASTER] != data["master"]:
                if self.hass.data[const.DOMAIN]["master"]:
                    await self.async_remove_entity("master")
                if data["master"]["enabled"]:
                    async_dispatcher_send(self.hass, "alarmo_register_master", data["master"])
                else:
                    automations = self.store.async_get_automations()
                    automations = dict(filter(lambda el: el[1]["area"] is None, automations.items()))
                    if automations:
                        for el in automations.keys():
                            self.store.async_delete_automation(el)
                        async_dispatcher_send(self.hass, "alarmo_automations_updated")

        self.store.async_update_config(data)
        async_dispatcher_send(self.hass, "alarmo_config_updated")

    async def async_update_area_config(self, area_id: str = None, data: dict = {}):
        if const.ATTR_REMOVE in data:
            # delete an area
            res = self.store.async_get_area(area_id)
            if not res:
                return
            sensors = self.store.async_get_sensors()
            sensors = dict(filter(lambda el: el[1]["area"] == area_id, sensors.items()))
            if sensors:
                for el in sensors.keys():
                    self.store.async_delete_sensor(el)
                async_dispatcher_send(self.hass, "alarmo_sensors_updated")

            automations = self.store.async_get_automations()
            automations = dict(filter(lambda el: el[1]["area"] == area_id, automations.items()))
            if automations:
                for el in automations.keys():
                    self.store.async_delete_automation(el)
                async_dispatcher_send(self.hass, "alarmo_automations_updated")

            self.store.async_delete_area(area_id)
            await self.async_remove_entity(area_id)

            if len(self.store.async_get_areas()) == 1 and self.hass.data[const.DOMAIN]["master"]:
                await self.async_remove_entity("master")

        elif self.store.async_get_area(area_id):
            # modify an area
            entry = self.store.async_update_area(area_id, data)
            if "name" not in data:
                async_dispatcher_send(self.hass, "alarmo_config_updated", area_id)
            else:
                await self.async_remove_entity(area_id)
                async_dispatcher_send(self.hass, "alarmo_register_entity", entry)
        else:
            # create an area
            entry = self.store.async_create_area(data)
            async_dispatcher_send(self.hass, "alarmo_register_entity", entry)

            config = self.store.async_get_config()

            if len(self.store.async_get_areas()) == 2 and config["master"]["enabled"]:
                async_dispatcher_send(self.hass, "alarmo_register_master", config["master"])

    def async_update_sensor_config(self, entity_id: str, data: dict):
        if const.ATTR_REMOVE in data:
            self.store.async_delete_sensor(entity_id)
        elif self.store.async_get_sensor(entity_id):
            self.store.async_update_sensor(entity_id, data)
        else:
            self.store.async_create_sensor(entity_id, data)

        async_dispatcher_send(self.hass, "alarmo_sensors_updated")

    def async_update_user_config(self, user_id: str = None, data: dict = {}):

        if const.ATTR_REMOVE in data:
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
                if const.ATTR_OLD_CODE not in data:
                    return False
                elif not self.async_authenticate_user(data[const.ATTR_OLD_CODE], user_id):
                    return False
                else:
                    del data[const.ATTR_OLD_CODE]
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

    def async_update_automation_config(self, automation_id: str = None, data: dict = {}):
        if const.ATTR_REMOVE in data:
            self.store.async_delete_automation(automation_id)
        elif not automation_id:
            self.store.async_create_automation(data)
        else:
            self.store.async_update_automation(automation_id, data)

        async_dispatcher_send(self.hass, "alarmo_automations_updated")

    async def async_delete(self):
        await self.store.async_delete()

    def listen_push_events(self):
        @callback
        async def async_handle_event(event):
            action = None
            if (
                event.data and "categoryName" in event.data
                and "actionName" in event.data
                and event.data["categoryName"] in const.EVENT_CATEGORIES
            ):
                # IOS push notification format
                action = event.data["actionName"]
            elif event.data["action"]:
                # Android push notification format
                action = event.data["action"]

            if not action:
                return

            if self.hass.data[const.DOMAIN]["master"]:
                alarm_entity = self.hass.data[const.DOMAIN]["master"]
            elif len(self.hass.data[const.DOMAIN]["areas"]) == 1:
                alarm_entity = list(self.hass.data[const.DOMAIN]["areas"].values())[0]
            else:
                _LOGGER.info("Cannot process the push action, since there are multiple areas.")
                return

            arm_mode = alarm_entity.arm_mode
            if not arm_mode:
                _LOGGER.info("Cannot process the push action, since the arm mode is not known.")
                return

            if action == const.EVENT_ACTION_FORCE_ARM:
                _LOGGER.info("Received request for force arming")
                await alarm_entity.async_arm(arm_mode, bypass_open_sensors=True)
            elif action == const.EVENT_ACTION_RETRY_ARM:
                _LOGGER.info("Received request for retry arming")
                await alarm_entity.async_arm(arm_mode)

        for event in const.PUSH_EVENTS:
            handle = self.hass.bus.async_listen(event, async_handle_event)
            self._push_listeners.append(handle)

    async def async_remove_entity(self, area_id: str):
        entity_registry = await self.hass.helpers.entity_registry.async_get_registry()
        if area_id == "master":
            entity = self.hass.data[const.DOMAIN]["master"]
            entity_registry.async_remove(entity.entity_id)
            self.hass.data[const.DOMAIN]["master"] = None
        else:
            entity = self.hass.data[const.DOMAIN]["areas"][area_id]
            entity_registry.async_remove(entity.entity_id)
            self.hass.data[const.DOMAIN]["areas"].pop(area_id, None)
