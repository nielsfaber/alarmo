"""Factories for creating test objects with defaults."""

import copy
import base64
from typing import Any, ClassVar

import bcrypt


class AreaFactory:
    """Factory for creating area test objects."""

    _mode_defaults: ClassVar[dict[str, dict[str, Any]]] = {
        "armed_away": {
            "enabled": True,
            "exit_time": 10,
            "entry_time": 30,
            "trigger_time": 120,
        },
        "armed_home": {
            "enabled": True,
            "exit_time": 0,
            "entry_time": 0,
            "trigger_time": 110,
        },
        "armed_night": {
            "enabled": False,
            "exit_time": 0,
            "entry_time": 0,
            "trigger_time": 110,
        },
    }
    _area_defaults: ClassVar[dict[str, Any]] = {
        "area_id": "area_1",
        "name": "Test Area 1",
        "code_format": "number",
        "code_arm_required": True,
        "code_disarm_required": True,
        "code_mode_change_required": True,
        "disarm_after_trigger": False,
        "ignore_blocking_sensors_after_trigger": False,
    }

    @staticmethod
    def create_area(
        area_id: str = "area_1",
        name: str = "Test Area 1",
        modes: list[str] | None = None,
        **kwargs: Any,
    ) -> dict[str, Any]:
        """Create an area with optional defaults.

        Args:
            area_id: The ID of the area.
            name: The name of the area.
            modes: The alarm modes of the area.
            kwargs: Additional area or mode-level overrides.
        """
        area = copy.deepcopy(AreaFactory._area_defaults)
        area: dict[str, Any]
        area["area_id"] = area_id
        area["name"] = name
        if modes is None:
            modes = ["armed_away", "armed_home"]
        # Build modes dict
        modes_dict = {}
        for mode in modes:
            mode_defaults = copy.deepcopy(AreaFactory._mode_defaults.get(mode, {}))
            # Look for overrides in kwargs, e.g., armed_away_exit_time
            for key in mode_defaults:
                override_key = f"{mode}_{key}"
                if override_key in kwargs:
                    mode_defaults[key] = kwargs[override_key]
            modes_dict[mode] = mode_defaults
        area["modes"] = modes_dict
        # Add any other area-level overrides
        for k in [
            "code_format",
            "code_arm_required",
            "code_disarm_required",
            "code_mode_change_required",
            "disarm_after_trigger",
            "ignore_blocking_sensors_after_trigger",
        ]:
            if k in kwargs:
                area[k] = kwargs[k]
        print(f"[DEBUG] AreaFactory.create_area: {area}")
        return area

    @staticmethod
    def create_area_2() -> dict[str, Any]:
        """Create a second area with defaults."""
        return AreaFactory.create_area(area_id="area_2", name="Test Area 2")


class ConfigFactory:
    """Factory for creating config test objects."""

    @staticmethod
    def create_master_config(
        enabled: bool = True,
        name: str = "Master",
        code_format: str = "number",
        code_arm_required: bool = True,
        code_disarm_required: bool = True,
        code_mode_change_required: bool = True,
    ) -> dict[str, Any]:
        """Create a master config with optional defaults."""
        return {
            "enabled": enabled,
            "name": name,
            "code_format": code_format,
            "code_arm_required": code_arm_required,
            "code_disarm_required": code_disarm_required,
            "code_mode_change_required": code_mode_change_required,
        }

    @staticmethod
    def create_mqtt_config(enabled: bool = False) -> dict[str, bool]:
        """Create a mqtt config with optional defaults."""
        return {"enabled": enabled}

    @staticmethod
    def create_config() -> dict[str, dict[str, Any]]:
        """Create a config with optional defaults."""
        return {
            "master": ConfigFactory.create_master_config(),
            "mqtt": ConfigFactory.create_mqtt_config(),
        }


class UserFactory:
    """Factory for creating user test objects."""

    @staticmethod
    def _hash_code(code: str) -> str:
        hashed = bcrypt.hashpw(code.encode("utf-8"), bcrypt.gensalt())
        return base64.b64encode(hashed).decode("utf-8")

    @staticmethod
    def create_user(
        user_id: str = "user_1",
        name: str = "Test User",
        enabled: bool = True,
        code: str = "1234",
        area_limit: str | None = None,
        can_arm: bool = True,
        can_disarm: bool = True,
        is_override_code: bool = False,
    ) -> dict[str, Any]:
        """Create a user with optional defaults."""
        return {
            "user_id": user_id,
            "name": name,
            "enabled": enabled,
            "code": UserFactory._hash_code(code),
            "area_limit": area_limit,
            "can_arm": can_arm,
            "can_disarm": can_disarm,
            "is_override_code": is_override_code,
        }

    @staticmethod
    def create_arm_only_user(user_id: str = "arm_only_user") -> dict[str, Any]:
        """Create a user that can arm but not disarm."""
        return UserFactory.create_user(
            user_id=user_id, name="Arm Only User", can_arm=True, can_disarm=False
        )

    @staticmethod
    def create_disarm_only_user(user_id: str = "disarm_only_user") -> dict[str, Any]:
        """Create a user that can disarm only."""
        return UserFactory.create_user(
            user_id=user_id, name="Disarm Only User", can_arm=False, can_disarm=True
        )


class SensorFactory:
    """Factory for creating sensor test objects."""

    @staticmethod
    def create_sensor(  # noqa: PLR0913
        entity_id: str,
        name: str,
        enabled: bool = True,
        area: str = "area_1",
        modes: list[str] | None = None,
        use_exit_delay: bool = True,
        use_entry_delay: bool = True,
        arm_on_close: bool = False,
        allow_open: bool = False,
        auto_bypass: bool = False,
        auto_bypass_modes: list[str] | None = None,
        trigger_unavailable: bool = False,
        always_on: bool = False,
        entry_delay: int | None = None,
        trigger_delay: int | None = None,
    ) -> dict[str, Any]:
        """Create a sensor with optional defaults."""
        if modes is None:
            modes = ["armed_away", "armed_home", "armed_night"]
        if auto_bypass_modes is None:
            auto_bypass_modes = []
        return {
            "entity_id": entity_id,
            "name": name,
            "enabled": enabled,
            "area": area,
            "modes": modes,
            "use_exit_delay": use_exit_delay,
            "use_entry_delay": use_entry_delay,
            "arm_on_close": arm_on_close,
            "allow_open": allow_open,
            "auto_bypass": auto_bypass,
            "auto_bypass_modes": auto_bypass_modes,
            "trigger_unavailable": trigger_unavailable,
            "always_on": always_on,
            "type": "door",
            "entry_delay": entry_delay,
            "trigger_delay": trigger_delay,
        }

    @staticmethod
    def create_door_sensor(  # noqa: PLR0913
        entity_id: str = "binary_sensor.generic_area_1_door_sensor",
        name: str = "Generic Area 1 Door",
        enabled: bool = True,
        area: str = "area_1",
        modes: list[str] | None = None,
        use_exit_delay: bool = True,
        use_entry_delay: bool = True,
        arm_on_close: bool = False,
        allow_open: bool = False,
        auto_bypass: bool = False,
        auto_bypass_modes: list[str] | None = None,
        trigger_unavailable: bool = False,
        always_on: bool = False,
        entry_delay: int | None = None,
        trigger_delay: int | None = None,
    ) -> dict[str, Any]:
        """Create a door sensor with optional defaults."""
        if modes is None:
            modes = ["armed_away", "armed_home", "armed_night"]
        if auto_bypass_modes is None:
            auto_bypass_modes = []
        return {
            "entity_id": entity_id,
            "name": name,
            "enabled": enabled,
            "area": area,
            "type": "door",
            "modes": modes,
            "use_exit_delay": use_exit_delay,
            "use_entry_delay": use_entry_delay,
            "arm_on_close": arm_on_close,
            "allow_open": allow_open,
            "auto_bypass": auto_bypass,
            "auto_bypass_modes": auto_bypass_modes,
            "trigger_unavailable": trigger_unavailable,
            "always_on": always_on,
            "entry_delay": entry_delay,
            "trigger_delay": trigger_delay,
        }

    @staticmethod
    def create_window_sensor(  # noqa: PLR0913
        entity_id: str = "binary_sensor.generic_area_1_window_sensor",
        name: str = "Generic Area 1 Window",
        area: str = "area_1",
        modes: list[str] | None = None,
        use_exit_delay: bool = True,
        use_entry_delay: bool = True,
        arm_on_close: bool = False,
        allow_open: bool = False,
        auto_bypass: bool = False,
        auto_bypass_modes: list[str] | None = None,
        trigger_unavailable: bool = False,
        always_on: bool = False,
    ) -> dict[str, Any]:
        """Create a window sensor with optional defaults."""
        if modes is None:
            modes = ["armed_away", "armed_home", "armed_night"]
        if auto_bypass_modes is None:
            auto_bypass_modes = []
        return {
            "entity_id": entity_id,
            "name": name,
            "enabled": True,
            "area": area,
            "type": "window",
            "modes": modes,
            "use_exit_delay": use_exit_delay,
            "use_entry_delay": use_entry_delay,
            "arm_on_close": arm_on_close,
            "allow_open": allow_open,
            "auto_bypass": auto_bypass,
            "auto_bypass_modes": auto_bypass_modes,
            "trigger_unavailable": trigger_unavailable,
            "always_on": always_on,
        }

    @staticmethod
    def create_motion_sensor(  # noqa: PLR0913
        entity_id: str = "binary_sensor.generic_area_1_motion_sensor",
        name: str = "Generic Area 1 Motion",
        area: str = "area_1",
        modes: list[str] | None = None,
        use_exit_delay: bool = True,
        use_entry_delay: bool = True,
        arm_on_close: bool = False,
        allow_open: bool = False,
        auto_bypass: bool = False,
        auto_bypass_modes: list[str] | None = None,
        trigger_unavailable: bool = False,
        always_on: bool = False,
    ) -> dict[str, Any]:
        """Create a motion sensor with optional defaults."""
        if modes is None:
            modes = ["armed_away", "armed_night"]
        if auto_bypass_modes is None:
            auto_bypass_modes = []
        return {
            "entity_id": entity_id,
            "name": name,
            "enabled": True,
            "area": area,
            "type": "motion",
            "modes": modes,
            "use_exit_delay": use_exit_delay,
            "use_entry_delay": use_entry_delay,
            "arm_on_close": arm_on_close,
            "allow_open": allow_open,
            "auto_bypass": auto_bypass,
            "auto_bypass_modes": auto_bypass_modes,
            "trigger_unavailable": trigger_unavailable,
            "always_on": always_on,
        }

    @staticmethod
    def create_bypass_sensor(
        entity_id: str = "binary_sensor.generic_area_1_door_sensor",
        name: str = "Door with Auto-Bypass",
        area: str = "area_1",
        auto_bypass_modes: list[str] | None = None,
    ) -> dict[str, Any]:
        """Create a bypass sensor with optional defaults."""
        if auto_bypass_modes is None:
            auto_bypass_modes = ["armed_away"]
        sensor = SensorFactory.create_door_sensor(
            entity_id=entity_id, name=name, area=area
        )
        sensor.update({"auto_bypass": True, "auto_bypass_modes": auto_bypass_modes})
        return sensor

    @staticmethod
    def create_all_sensors() -> dict[str, dict[str, Any]]:
        """Create all sensors with optional defaults."""
        return {
            "binary_sensor.generic_area_1_door_sensor": SensorFactory.create_door_sensor(),  # noqa: E501
            "binary_sensor.generic_area_1_window_sensor": SensorFactory.create_window_sensor(),  # noqa: E501
            "binary_sensor.generic_area_1_motion_sensor": SensorFactory.create_motion_sensor(),  # noqa: E501
            "binary_sensor.generic_area_2_door_sensor": SensorFactory.create_door_sensor(  # noqa: E501
                entity_id="binary_sensor.generic_area_2_door_sensor",
                name="Generic Area 2 Door",
                area="area_2",
            ),
            "binary_sensor.generic_area_2_window_sensor": SensorFactory.create_window_sensor(  # noqa: E501
                entity_id="binary_sensor.generic_area_2_window_sensor",
                name="Generic Area 2 Window",
                area="area_2",
            ),
            "binary_sensor.generic_area_2_motion_sensor": SensorFactory.create_motion_sensor(  # noqa: E501
                entity_id="binary_sensor.generic_area_2_motion_sensor",
                name="Generic Area 2 Motion",
                area="area_2",
            ),
        }


class SensorGroupFactory:
    """Factory for creating sensor group test objects."""

    @staticmethod
    def create_sensor_group(
        group_id: str = "group_1",
        name: str = "Test Group",
        entities: list[str] | None = None,
        timeout: int = 300,
        event_count: int = 2,
    ) -> dict[str, Any]:
        """Create a sensor group with optional defaults."""
        if entities is None:
            entities = []
        return {
            "group_id": group_id,
            "name": name,
            "entities": entities,
            "timeout": timeout,
            "event_count": event_count,
        }


def deep_merge_dicts(base: dict[str, Any], overrides: dict[str, Any]) -> dict[str, Any]:
    """Deep merge two dictionaries."""
    result = base.copy()
    for k, v in overrides.items():
        if k in result and isinstance(result[k], dict) and isinstance(v, dict):
            result[k] = deep_merge_dicts(result[k], v)
        else:
            result[k] = v
    return result


class MockStorage:
    """Mock storage for testing."""

    def __init__(self):
        """Initialize the mock storage with default data."""
        self.areas = [AreaFactory.create_area(), AreaFactory.create_area_2()]
        self.config = ConfigFactory.create_config()
        self.users = {"user_1": UserFactory.create_user()}
        self.sensors: dict[str, dict[str, Any]] = {}
        self._ensure_area_defaults()

    async def async_load(self) -> dict[str, Any]:
        """Load the mock storage."""
        return {
            "version": 1,
            "migrated": True,
            "areas": self.areas,
            "config": self.config,
            "users": self.users,
            "sensors": self.sensors,
        }

    async def async_save(self, data: dict[str, Any]) -> None:
        """Save the mock storage."""
        pass

    def async_get_areas(self) -> dict[str, Any]:
        """Get all areas."""
        result = {area["area_id"]: area for area in self.areas}
        return result

    def async_get_area(self, area_id: str) -> dict[str, Any]:
        """Get an area by ID."""
        area: dict[str, Any] = next(
            (a for a in self.areas if a["area_id"] == area_id), {}
        )  # type: ignore[arg-type]
        return area

    def async_get_sensors(self) -> dict[str, dict[str, Any]]:
        """Get all sensors."""
        return self.sensors

    def async_get_users(self) -> dict[str, Any]:
        """Get all users."""
        return self.users

    def async_get_config(self) -> dict[str, Any]:
        """Get the config."""
        return self.config

    def async_get_sensor_groups(self) -> dict[str, Any]:
        """Get all sensor groups."""
        return {}

    def async_get_automations(self) -> dict[str, Any]:
        """Get all automations."""
        return {}

    def _ensure_area_defaults(self):
        """Ensure all areas have the required keys."""
        required_keys = {
            "code_format": "number",
            "code_arm_required": True,
            "code_disarm_required": True,
            "code_mode_change_required": True,
        }
        for area in self.areas:
            for k, v in required_keys.items():
                if k not in area:
                    area[k] = v

    def async_update_area(
        self, area_id: str, changes: dict[str, Any]
    ) -> dict[str, Any]:
        """Update an area with optional changes."""
        for area in self.areas:
            if area["area_id"] == area_id:
                if "modes" in changes:
                    for mode, mode_changes in changes["modes"].items():
                        if "modes" not in area:
                            area["modes"] = {}
                        if mode in area["modes"]:
                            area["modes"][mode].update(mode_changes)  # type: ignore
                        else:
                            area["modes"][mode] = mode_changes
                    changes = {k: v for k, v in changes.items() if k != "modes"}
                area.update(changes)  # type: ignore
                return area
        raise KeyError(f"Area {area_id} not found in mock storage")


class StorageFactory:
    """Factory for creating storage test objects."""

    @staticmethod
    def create_storage(
        areas: list[dict[str, Any]] | None = None,
        sensors: list[dict[str, Any]] | None = None,
        sensor_groups: list[dict[str, Any]] | None = None,
        master_enabled: bool = False,
    ) -> MockStorage:
        """Create a mock storage with optional defaults."""
        if areas is None:
            areas = []
        if sensors is None:
            sensors = []
        if sensor_groups is None:
            sensor_groups = []

        class CustomMockStorage(MockStorage):
            """Custom mock storage for testing."""

            def __init__(self):
                super().__init__()
                self.areas = areas
                self.sensors = {sensor["entity_id"]: sensor for sensor in sensors}
                self.sensor_groups = {
                    group["group_id"]: group for group in sensor_groups
                }
                self._ensure_area_defaults()
                if master_enabled:
                    self.master = {"enabled": True}

            def async_get_sensor_groups(self) -> dict[str, Any]:
                return self.sensor_groups

        return CustomMockStorage()
