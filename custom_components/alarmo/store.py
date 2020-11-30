import logging
import time
import attr
from collections import OrderedDict
from typing import MutableMapping, cast
from homeassistant.loader import bind_hass
from homeassistant.core import callback
from homeassistant.helpers.typing import HomeAssistantType


from homeassistant.const import (
    STATE_ALARM_ARMED_AWAY,
    STATE_ALARM_ARMED_HOME,
    STATE_ALARM_ARMED_NIGHT,
    STATE_ALARM_ARMED_CUSTOM_BYPASS,
)


from homeassistant.components.alarm_control_panel import (
    FORMAT_NUMBER as CODE_FORMAT_NUMBER,
)

from .const import (
    DOMAIN,
)

_LOGGER = logging.getLogger(__name__)

DATA_REGISTRY = f"{DOMAIN}_storage"
STORAGE_KEY = f"{DOMAIN}.storage"
STORAGE_VERSION = 1
SAVE_DELAY = 10


@attr.s(slots=True, frozen=True)
class ModeEntry:
    """Mode storage Entry."""

    enabled = attr.ib(type=bool, default=False)
    leave_time = attr.ib(type=int, default=0)
    entry_time = attr.ib(type=int, default=0)


@attr.s(slots=True, frozen=True)
class MqttConfig:
    """Mode storage Entry."""

    enabled = attr.ib(type=bool, default=False)
    state_topic = attr.ib(type=str, default="alarmo/state")
    state_payload = attr.ib(type=dict, default={})
    command_topic = attr.ib(type=str, default="alarmo/command")
    command_payload = attr.ib(type=dict, default={})
    require_code = attr.ib(type=bool, default=False)


@attr.s(slots=True, frozen=True)
class Config:
    """(General) Config storage Entry."""

    code_arm_required = attr.ib(type=bool, default=False)
    code_disarm_required = attr.ib(type=bool, default=False)
    code_format = attr.ib(type=str, default=CODE_FORMAT_NUMBER)
    trigger_time = attr.ib(type=int, default=1800)
    disarm_after_trigger = attr.ib(type=bool, default=False)

    modes = attr.ib(
        type=[str, ModeEntry],
        default={
            STATE_ALARM_ARMED_AWAY: ModeEntry(enabled=True),
            STATE_ALARM_ARMED_HOME: ModeEntry(enabled=True),
            STATE_ALARM_ARMED_NIGHT: ModeEntry(enabled=False),
            STATE_ALARM_ARMED_CUSTOM_BYPASS: ModeEntry(enabled=False),
        },
    )
    mqtt = attr.ib(type=MqttConfig, default=MqttConfig())


@attr.s(slots=True, frozen=True)
class SensorEntry:
    """Sensor storage Entry."""

    entity_id = attr.ib(type=str, default=None)
    name = attr.ib(type=str, default="")
    modes = attr.ib(type=list, default=[])
    immediate = attr.ib(type=bool, default=False)
    always_on = attr.ib(type=bool, default=False)
    arm_on_close = attr.ib(type=bool, default=False)
    allow_open = attr.ib(type=bool, default=False)
    trigger_unavailable = attr.ib(type=bool, default=False)


@attr.s(slots=True, frozen=True)
class UserEntry:
    """User storage Entry."""

    user_id = attr.ib(type=str, default=None)
    name = attr.ib(type=str, default="")
    code = attr.ib(type=str, default="")
    is_admin = attr.ib(type=bool, default=False)
    can_arm = attr.ib(type=bool, default=False)
    can_disarm = attr.ib(type=bool, default=False)
    is_override_code = attr.ib(type=bool, default=False)


@attr.s(slots=True, frozen=True)
class TriggerEntry:
    """Trigger storage Entry."""

    event = attr.ib(type=str, default="")
    state = attr.ib(type=str, default="")


@attr.s(slots=True, frozen=True)
class ActionEntry:
    """Action storage Entry."""

    service = attr.ib(type=str, default="")
    entity_id = attr.ib(type=str, default="")
    service_data = attr.ib(type=dict, default={})


@attr.s(slots=True, frozen=True)
class AutomationEntry:
    """Automation storage Entry."""

    automation_id = attr.ib(type=str, default=None)
    name = attr.ib(type=str, default="")
    modes = attr.ib(type=list, default=[])
    triggers = attr.ib(type=[TriggerEntry], default=[])
    actions = attr.ib(type=[ActionEntry], default=[])
    enabled = attr.ib(type=bool, default=True)
    is_notification = attr.ib(type=bool, default=False)


class AlarmoStorage:
    """Class to hold alarmo configuration data."""

    def __init__(self, hass: HomeAssistantType) -> None:
        """Initialize the storage."""
        self.hass = hass
        self.config: Config = Config()
        self.sensors: MutableMapping[str, SensorEntry] = {}
        self.users: MutableMapping[str, UserEntry] = {}
        self.automations: MutableMapping[str, AutomationEntry] = {}
        self._store = hass.helpers.storage.Store(STORAGE_VERSION, STORAGE_KEY)

    async def async_load(self) -> None:
        """Load the registry of schedule entries."""
        data = await self._store.async_load()
        config: Config = Config()
        sensors: "OrderedDict[str, SensorEntry]" = OrderedDict()
        users: "OrderedDict[str, UserEntry]" = OrderedDict()
        automations: "OrderedDict[str, AutomationEntry]" = OrderedDict()

        if data is not None:
            config = Config(**data["config"])
            config = attr.evolve(config, **{"mqtt": MqttConfig(**data["config"]["mqtt"])})

            if "sensors" in data:
                for sensor in data["sensors"]:
                    sensors[sensor["entity_id"]] = SensorEntry(**sensor)

            if "users" in data:
                for user in data["users"]:
                    users[user["user_id"]] = UserEntry(**user)

            if "automations" in data:
                for automation in data["automations"]:
                    automations[automation["automation_id"]] = AutomationEntry(**automation)

        self.config = config
        self.sensors = sensors
        self.automations = automations
        self.users = users

    @callback
    def async_schedule_save(self) -> None:
        """Schedule saving the registry of alarmo."""
        self._store.async_delay_save(self._data_to_save, SAVE_DELAY)

    async def async_save(self) -> None:
        """Save the registry of alarmo."""
        await self._store.async_save(self._data_to_save())

    @callback
    def _data_to_save(self) -> dict:
        """Return data for the registry for alarmo to store in a file."""
        store_data = {
            "config": attr.asdict(self.config),
        }

        store_data["sensors"] = [attr.asdict(entry) for entry in self.sensors.values()]

        store_data["users"] = [attr.asdict(entry) for entry in self.users.values()]

        store_data["automations"] = [attr.asdict(entry) for entry in self.automations.values()]

        return store_data

    async def async_delete(self):
        """Delete config."""
        _LOGGER.warning("Removing alarmo configuration data!")
        await self._store.async_remove()

    @callback
    def async_get_config(self):
        return attr.asdict(self.config)

    @callback
    def async_update_config(self, changes: dict):
        """Update existing config."""

        old = self.config
        new = self.config = attr.evolve(old, **changes)
        self.async_schedule_save()
        return new

    @callback
    def async_update_mode_config(self, mode: str, changes: dict):
        """Update existing config."""

        modes = self.config.modes
        old = (
            ModeEntry(self.config.modes[mode])
            if mode in self.config.modes
            else ModeEntry()
        )
        new = attr.evolve(old, **changes)
        modes[mode] = new
        self.config = attr.evolve(self.config, **{"modes": modes})
        self.async_schedule_save()
        return new

    @callback
    def async_get_sensor(self, entity_id) -> SensorEntry:
        """Get an existing SensorEntry by id."""
        res = self.sensors.get(entity_id)
        return attr.asdict(res) if res else None

    @callback
    def async_get_sensors(self):
        """Get an existing SensorEntry by id."""
        res = {}
        for (key, val) in self.sensors.items():
            res[key] = attr.asdict(val)
        return res

    @callback
    def async_create_sensor(self, entity_id: str, data: dict) -> SensorEntry:
        """Create a new SensorEntry."""
        if entity_id in self.sensors:
            return False
        new_sensor = SensorEntry(**data, entity_id=entity_id)
        self.sensors[entity_id] = new_sensor
        self.async_schedule_save()
        return new_sensor

    @callback
    def async_delete_sensor(self, entity_id: str) -> None:
        """Delete SensorEntry."""
        if entity_id in self.sensors:
            del self.sensors[entity_id]
            self.async_schedule_save()
            return True
        return False

    @callback
    def async_update_sensor(self, entity_id: str, changes: dict) -> SensorEntry:
        """Update existing SensorEntry."""
        old = self.sensors[entity_id]
        new = self.sensors[entity_id] = attr.evolve(old, **changes)
        self.async_schedule_save()
        return new

    @callback
    def async_get_user(self, user_id) -> UserEntry:
        """Get an existing UserEntry by id."""
        res = self.users.get(user_id)
        return attr.asdict(res) if res else None

    @callback
    def async_get_users(self):
        """Get an existing UserEntry by id."""
        res = {}
        for (key, val) in self.users.items():
            res[key] = attr.asdict(val)
        return res

    @callback
    def async_create_user(self, data: dict) -> UserEntry:
        """Create a new UserEntry."""
        user_id = str(int(time.time()))
        new_user = UserEntry(**data, user_id=user_id)
        self.users[user_id] = new_user
        self.async_schedule_save()
        return new_user

    @callback
    def async_delete_user(self, user_id: str) -> None:
        """Delete UserEntry."""
        if user_id in self.users:
            del self.users[user_id]
            self.async_schedule_save()
            return True
        return False

    @callback
    def async_update_user(self, user_id: str, changes: dict) -> UserEntry:
        """Update existing UserEntry."""
        old = self.users[user_id]
        new = self.users[user_id] = attr.evolve(old, **changes)
        self.async_schedule_save()
        return new

    @callback
    def async_get_automations(self):
        """Get an existing AutomationEntry by id."""
        res = {}
        for (key, val) in self.automations.items():
            res[key] = attr.asdict(val)
        return res

    @callback
    def async_create_automation(self, data: dict) -> AutomationEntry:
        """Create a new AutomationEntry."""
        automation_id = str(int(time.time()))
        new_automation = AutomationEntry(
            **data,
            automation_id=automation_id
        )
        _LOGGER.debug(new_automation)
        self.automations[automation_id] = new_automation
        self.async_schedule_save()
        return new_automation

    @callback
    def async_delete_automation(self, automation_id: str) -> None:
        """Delete AutomationEntry."""
        if automation_id in self.automations:
            del self.automations[automation_id]
            self.async_schedule_save()
            return True
        return False

    @callback
    def async_update_automation(self, automation_id: str, changes: dict) -> AutomationEntry:
        """Update existing AutomationEntry."""
        old = self.automations[automation_id]
        new = self.automations[automation_id] = attr.evolve(old, **changes)
        self.async_schedule_save()
        return new


@bind_hass
async def async_get_registry(hass: HomeAssistantType) -> AlarmoStorage:
    """Return alarmo storage instance."""
    task = hass.data.get(DATA_REGISTRY)

    if task is None:

        async def _load_reg() -> AlarmoStorage:
            registry = AlarmoStorage(hass)
            await registry.async_load()
            return registry

        task = hass.data[DATA_REGISTRY] = hass.async_create_task(_load_reg())

    return cast(AlarmoStorage, await task)
