"""Helper functions for testing the Alarmo integration."""

import datetime
from typing import Any
from contextlib import contextmanager
from unittest.mock import MagicMock, patch

from homeassistant.util.dt import utcnow
from homeassistant.config_entries import ConfigEntry
from pytest_homeassistant_custom_component.common import MockConfigEntry

from tests.factories import StorageFactory

from .common import async_fire_time_changed


def update_sensor_config_in_entry(
    config_entry: ConfigEntry, sensor_entity_id: str, updates: dict[str, Any]
):
    """Update a sensor's configuration in config_entry.data.

    Assumes config_entry.data is a mutable dictionary.
    """
    if not isinstance(config_entry.data, dict):
        # This check is more for runtime safety during tests if setup is wrong.
        # The linter might still complain based on ConfigEntry's base definition.
        raise TypeError(
            "config_entry.data must be a mutable dictionary for this helper. "
            "Ensure MockConfigEntry is initialized with data={...}."
        )

    # Ensure 'sensors' key exists and is a dictionary within config_entry.data
    if "sensors" not in config_entry.data or not isinstance(
        config_entry.data.get("sensors"), dict
    ):
        config_entry.data["sensors"] = {}  # type: ignore[index]

    sensors_data = config_entry.data["sensors"]  # type: ignore[index]

    if sensor_entity_id not in sensors_data:
        sensors_data[sensor_entity_id] = {"entity_id": sensor_entity_id}  # type: ignore[misc]

    sensors_data[sensor_entity_id].update(updates)  # type: ignore[misc]


def create_default_sensor_config(
    entity_id: str, area: str | None = None, sensor_type: str = "other"
) -> dict[str, Any]:
    """Create a default dictionary for a sensor entry."""
    config = {
        "entity_id": entity_id,
        "enabled": True,
        "name": entity_id.rsplit(".", maxsplit=1)[-1].replace("_", " ").title(),
        "type": sensor_type,
        "modes": ["armed_away", "armed_home", "armed_night"],
        "use_exit_delay": True,
        "use_entry_delay": True,
        "arm_on_close": False,
        "allow_open": False,
        "auto_bypass": False,
        "auto_bypass_modes": [],
        "trigger_unavailable": False,
        "always_on": False,
    }
    if area:
        config["area"] = area  # type: ignore[misc]
    return config


@contextmanager
def patch_alarmo_integration_dependencies(mock_storage_instance: Any):
    """Patches common dependencies for setting up the Alarmo integration in tests."""

    async def mock_async_get_registry_for_patch(_: Any):
        return mock_storage_instance

    patches = [
        patch(
            "custom_components.alarmo.async_get_registry",
            new=mock_async_get_registry_for_patch,
        ),
        patch("custom_components.alarmo.panel.async_register_panel", return_value=None),
        patch("custom_components.alarmo.card.async_register_card", return_value=None),
        patch(
            "custom_components.alarmo.websockets.async_register_websockets",
            return_value=None,
        ),
        patch(
            "homeassistant.components.http.start_http_server_and_save_config",
            return_value=None,
        ),
        patch("homeassistant.components.http", MagicMock()),
        patch("homeassistant.components.frontend", MagicMock()),
        patch("homeassistant.components.panel_custom", MagicMock()),
    ]

    try:
        for p in patches:
            p.start()
        yield
    finally:
        for p in patches:
            p.stop()


def make_alarmo_entry(
    entry_id: str = "test_entry",
    version: int = 1,
    options: dict[str, Any] | None = None,
) -> MockConfigEntry:
    """Create a MockConfigEntry for Alarmo with common defaults."""
    return MockConfigEntry(
        domain="alarmo",
        data={"title": "Alarmo"},
        options=options or {},
        entry_id=entry_id,
        version=version,
    )


def assert_alarm_state(hass: Any, entity_id: str, expected_state: str) -> None:
    """Assert the state of an alarm entity."""
    state = hass.states.get(entity_id)
    assert state is not None, f"Entity {entity_id} not found in hass.states"
    assert state.state == expected_state, (
        f"Expected {entity_id} to be '{expected_state}', got '{state.state}'"
    )


async def advance_time(hass: Any, seconds: int) -> None:
    """Advance Home Assistant time by a given number of seconds and block till done."""
    now = utcnow()
    future = now + datetime.timedelta(seconds=seconds)

    async_fire_time_changed(hass, future)
    await hass.async_block_till_done()


async def cleanup_timers(hass: Any) -> None:
    """Advance time by a long duration to ensure all timers are cleared."""
    await advance_time(hass, 300)  # 5 minutes


def setup_alarmo_entry(
    hass: Any,
    areas: list[dict[str, Any]],
    sensors: list[dict[str, Any]],
    entry_id: str,
    sensor_groups: list[dict[str, Any]] | None = None,
    users: dict[str, dict[str, Any]] | None = None,
    master_enabled: bool = False,
):
    """Create storage and entry, add entry to hass, and return (storage, entry)."""
    storage = StorageFactory.create_storage(
        areas=areas,
        sensors=sensors,
        sensor_groups=sensor_groups or [],
        master_enabled=master_enabled,
    )
    if users is not None:
        storage.users = users
    entry = make_alarmo_entry(entry_id=entry_id)
    entry.add_to_hass(hass)
    return storage, entry
