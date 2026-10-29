"""Removing an area entity must cancel its running timer."""

from unittest.mock import MagicMock

import pytest

from tests.helpers import (
    setup_alarmo_entry,
    patch_alarmo_integration_dependencies,
)
from tests.factories import AreaFactory
from custom_components.alarmo import const


@pytest.mark.asyncio
async def test_entity_timer_is_cancelled_on_removal(hass, enable_custom_integrations):
    """The timer callback must not survive an unload."""
    area = AreaFactory.create_area(area_id="area_1", name="Area")
    storage, entry = setup_alarmo_entry(
        hass, areas=[area], sensors=[], entry_id="timer_cleanup"
    )

    with patch_alarmo_integration_dependencies(storage):
        await hass.config_entries.async_setup(entry.entry_id)
        await hass.async_block_till_done()

        entity = hass.data[const.DOMAIN]["areas"]["area_1"]
        callback = MagicMock()
        entity.async_set_timer(60, callback)
        assert entity._timer is not None

        await hass.config_entries.async_unload(entry.entry_id)
        await hass.async_block_till_done()

        assert entity._timer is None
        callback.assert_not_called()
