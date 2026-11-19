"""Handlers must stop their listeners and timers on unload."""

from unittest.mock import MagicMock

import pytest

from tests.helpers import (
    setup_alarmo_entry,
    patch_alarmo_integration_dependencies,
)
from tests.factories import AreaFactory
from custom_components.alarmo import const


@pytest.mark.asyncio
async def test_unload_stops_every_handler(hass, enable_custom_integrations):
    """A reload must not leave subscriptions or sensor timers behind."""
    area = AreaFactory.create_area(area_id="area_1", name="Area")
    storage, entry = setup_alarmo_entry(
        hass, areas=[area], sensors=[], entry_id="handler_unload"
    )

    with patch_alarmo_integration_dependencies(storage):
        await hass.config_entries.async_setup(entry.entry_id)
        await hass.async_block_till_done()

        sensor_handler = hass.data[const.DOMAIN]["sensor_handler"]
        mqtt_handler = hass.data[const.DOMAIN]["mqtt_handler"]
        event_handler = hass.data[const.DOMAIN]["event_handler"]
        automation_handler = hass.data[const.DOMAIN]["automation_handler"]

        cancel = MagicMock()
        sensor_handler._arm_timers["binary_sensor.door"] = cancel
        sensor_handler._delay_on_timers["binary_sensor.door"] = MagicMock()

        await hass.config_entries.async_unload(entry.entry_id)
        await hass.async_block_till_done()

        assert sensor_handler._state_listener is None
        assert sensor_handler._arm_timers == {}
        assert sensor_handler._delay_on_timers == {}
        cancel.assert_called_once()

        assert mqtt_handler._subscribed_topics == []
        assert mqtt_handler._subscriptions == []
        assert event_handler._subscription is None
        assert automation_handler._subscriptions == []


@pytest.mark.asyncio
async def test_handler_unload_is_idempotent(hass, enable_custom_integrations):
    """Calling unload twice must not raise or cancel anything twice."""
    area = AreaFactory.create_area(area_id="area_1", name="Area")
    storage, entry = setup_alarmo_entry(
        hass, areas=[area], sensors=[], entry_id="handler_unload_twice"
    )

    with patch_alarmo_integration_dependencies(storage):
        await hass.config_entries.async_setup(entry.entry_id)
        await hass.async_block_till_done()

        sensor_handler = hass.data[const.DOMAIN]["sensor_handler"]
        await sensor_handler.async_unload()
        await sensor_handler.async_unload()

        assert sensor_handler._state_listener is None
        assert sensor_handler._arm_timers == {}
        assert sensor_handler._delay_on_timers == {}
