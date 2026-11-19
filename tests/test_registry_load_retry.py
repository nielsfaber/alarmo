"""A failed store load must be retried on the next setup."""

from unittest.mock import AsyncMock, patch

import pytest

from custom_components.alarmo.store import DATA_REGISTRY, async_get_registry


@pytest.mark.asyncio
async def test_failed_load_is_not_cached(hass):
    """The second setup gets a fresh load instead of the failed task."""
    with patch(
        "custom_components.alarmo.store.AlarmoStorage.async_load",
        AsyncMock(side_effect=[RuntimeError("broken store"), None]),
    ):
        with pytest.raises(RuntimeError, match="broken store"):
            await async_get_registry(hass)

        assert DATA_REGISTRY not in hass.data

        storage = await async_get_registry(hass)
        assert storage is not None
