"""Tests for Alarmo storage loading."""

from typing import Any
from unittest.mock import AsyncMock, patch

import pytest

from custom_components.alarmo.store import AlarmoStorage


@pytest.mark.asyncio
async def test_async_load_area_modes_with_missing_keys(hass: Any) -> None:
    """Area modes stored with missing keys must load instead of raising.

    Regression for a ``KeyError`` in ``AlarmoStorage.async_load``: area modes
    were rebuilt with unconditional ``config["trigger_time"]`` (and enabled/
    exit_time/entry_time). ``trigger_time`` is ``vol.Optional`` in the area
    schema, and a disabled mode is persisted without it, so on the next load
    ``async_load`` raised ``KeyError`` and the config entry failed setup. This
    runs on every load, not just a version migration. The all-keys-missing case
    below is extra defensive coverage.
    """
    stored_data = {
        "config": {
            "code_arm_required": False,
            "code_mode_change_required": False,
            "code_disarm_required": False,
            "code_format": "number",
            "disarm_after_trigger": False,
        },
        "areas": [
            {
                "area_id": "area_1",
                "name": "Test Area",
                "modes": {
                    # missing trigger_time (the real incident: a disabled mode)
                    "armed_home": {
                        "enabled": False,
                        "exit_time": None,
                        "entry_time": None,
                    },
                    # missing every key
                    "armed_night": {},
                    # fully specified with falsy values that must be preserved
                    "armed_away": {
                        "enabled": False,
                        "exit_time": 0,
                        "entry_time": 0,
                        "trigger_time": 0,
                    },
                },
            }
        ],
    }

    storage = AlarmoStorage(hass)

    with patch.object(
        storage._store, "async_load", AsyncMock(return_value=stored_data)
    ):
        await storage.async_load()

    modes = storage.async_get_area("area_1")["modes"]

    # Missing keys fall back to the ModeEntry defaults (enabled=False, others None).
    assert modes["armed_home"] == {
        "enabled": False,
        "exit_time": None,
        "entry_time": None,
        "trigger_time": None,
    }
    assert modes["armed_night"] == {
        "enabled": False,
        "exit_time": None,
        "entry_time": None,
        "trigger_time": None,
    }
    # Present falsy values (0) are preserved, not clobbered.
    assert modes["armed_away"] == {
        "enabled": False,
        "exit_time": 0,
        "entry_time": 0,
        "trigger_time": 0,
    }
