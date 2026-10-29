"""IDs created in the same second must not overwrite each other."""

import pytest

from custom_components.alarmo import store as store_module
from custom_components.alarmo.store import AlarmoStorage


@pytest.mark.asyncio
async def test_same_second_ids_are_unique(hass, monkeypatch):
    """Two records created within one wall-clock second stay distinct."""
    monkeypatch.setattr(store_module.time, "time", lambda: 1_700_000_000)

    storage = AlarmoStorage(hass)
    from unittest.mock import AsyncMock, patch

    with patch.object(storage._store, "async_load", AsyncMock(return_value=None)):
        await storage.async_load()

    storage.areas.clear()

    first_area = storage.async_create_area({"name": "One", "modes": {}})
    second_area = storage.async_create_area({"name": "Two", "modes": {}})
    assert first_area["area_id"] != second_area["area_id"]
    assert len(storage.async_get_areas()) == 2

    first_user = storage.async_create_user({"name": "One"})
    second_user = storage.async_create_user({"name": "Two"})
    assert first_user.user_id != second_user.user_id

    first_automation = storage.async_create_automation({"name": "One"})
    second_automation = storage.async_create_automation({"name": "Two"})
    assert first_automation.automation_id != second_automation.automation_id

    first_group = storage.async_create_sensor_group({"name": "One", "entities": []})
    second_group = storage.async_create_sensor_group({"name": "Two", "entities": []})
    assert first_group != second_group
