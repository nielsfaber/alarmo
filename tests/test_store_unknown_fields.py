"""Stored entries with unknown keys must not break the integration."""

from unittest.mock import AsyncMock, patch

import pytest

from custom_components.alarmo.store import AlarmoStorage


@pytest.mark.asyncio
async def test_load_tolerates_unknown_fields(hass):
    """A downgrade or manual restore can leave keys the model does not know."""
    stored_data = {
        "config": {
            "code_arm_required": False,
            "code_mode_change_required": False,
            "code_disarm_required": False,
            "code_format": "number",
            "disarm_after_trigger": False,
            "future_setting": True,
        },
        "areas": [
            {
                "area_id": "area_1",
                "name": "Area",
                "future_area": "ignored",
                "modes": {
                    "armed_away": {
                        "enabled": True,
                        "exit_time": 10,
                        "entry_time": 20,
                        "trigger_time": 30,
                    }
                },
            }
        ],
        "sensors": [
            {
                "entity_id": "binary_sensor.door",
                "area": "area_1",
                "modes": ["armed_away"],
                "future_sensor": 1,
            }
        ],
        "users": [
            {
                "user_id": "user_1",
                "name": "User",
                "code": "",
                "is_admin": True,
                "future_user": "ignored",
            }
        ],
        "automations": [
            {
                "automation_id": "automation_1",
                "name": "Automation",
                "triggers": [
                    {
                        "event": "trigger",
                        "area": "area_1",
                        "modes": ["armed_away"],
                        "future_trigger": True,
                    }
                ],
                "actions": [
                    {
                        "service": "notify.test",
                        "entity_id": "",
                        "data": {},
                        "future_action": True,
                    }
                ],
                "future_automation": True,
            }
        ],
        "sensor_groups": [
            {
                "group_id": "group_1",
                "name": "Group",
                "entities": ["binary_sensor.door"],
                "timeout": 10,
                "event_count": 2,
                "future_group": True,
            }
        ],
    }

    storage = AlarmoStorage(hass)
    with patch.object(
        storage._store, "async_load", AsyncMock(return_value=stored_data)
    ):
        await storage.async_load()

    assert storage.async_get_area("area_1")["name"] == "Area"
    assert "binary_sensor.door" in storage.async_get_sensors()
    assert "user_1" in storage.async_get_users()
    assert "automation_1" in storage.async_get_automations()
    assert "group_1" in storage.async_get_sensor_groups()


@pytest.mark.asyncio
async def test_create_and_update_ignore_unknown_fields(hass):
    """Write paths use the same filter as the load path."""
    storage = AlarmoStorage(hass)
    with patch.object(storage._store, "async_load", AsyncMock(return_value=None)):
        await storage.async_load()

    area = storage.async_create_area({"name": "Area", "modes": {}, "unknown": True})
    storage.async_update_area(area["area_id"], {"name": "Renamed", "unknown": True})
    assert storage.async_get_area(area["area_id"])["name"] == "Renamed"

    sensor = storage.async_create_sensor(
        "binary_sensor.door", {"area": area["area_id"], "unknown": True}
    )
    assert sensor.entity_id == "binary_sensor.door"
    storage.async_update_sensor("binary_sensor.door", {"enabled": False, "x": 1})
    assert storage.async_get_sensor("binary_sensor.door")["enabled"] is False

    user = storage.async_create_user({"name": "User", "unknown": True})
    assert user.name == "User"
    storage.async_update_user(user.user_id, {"enabled": False, "x": 1})
    assert storage.async_get_user(user.user_id)["enabled"] is False

    group_id = storage.async_create_sensor_group(
        {"name": "Group", "entities": [], "unknown": True}
    )
    storage.async_update_sensor_group(group_id, {"timeout": 5, "x": 1})
    assert storage.async_get_sensor_group(group_id)["timeout"] == 5

    automation = storage.async_create_automation({"name": "A", "unknown": True})
    assert automation.name == "A"
    storage.async_update_automation(
        automation.automation_id, {"enabled": False, "x": 1}
    )
    assert storage.async_get_automations()[automation.automation_id]["enabled"] is False
