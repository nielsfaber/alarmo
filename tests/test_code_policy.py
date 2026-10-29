"""The server must enforce the same code policy as the panel."""

from types import SimpleNamespace
from unittest.mock import MagicMock

import pytest

from tests.helpers import (
    assert_alarm_state,
    setup_alarmo_entry,
    patch_alarmo_integration_dependencies,
)
from tests.factories import AreaFactory, UserFactory
from custom_components.alarmo import AlarmoCoordinator, const
from custom_components.alarmo.helpers import is_valid_access_code


@pytest.mark.parametrize(
    ("code", "code_format", "expected"),
    [
        ("1234", "number", True),
        ("123", "number", False),
        ("12", None, False),
        ("abcd", "number", False),
        ("abcd", "text", True),
        (1234, "number", False),
        (None, "number", False),
        ("", "number", False),
    ],
)
def test_helper_policy(code, code_format, expected):
    """Short, numeric and non-string values are rejected."""
    assert is_valid_access_code(code, code_format) is expected


@pytest.mark.asyncio
async def test_update_user_rejects_short_code():
    """A direct API call must not be able to store a one-character PIN."""
    coordinator = AlarmoCoordinator.__new__(AlarmoCoordinator)
    coordinator.hass = SimpleNamespace(async_add_executor_job=None)
    coordinator.store = MagicMock()
    coordinator.store.async_get_config.return_value = {const.ATTR_CODE_FORMAT: "number"}

    result = await coordinator.async_update_user_config(None, {"code": "1"})

    assert result == "Code must be at least 4 characters"
    coordinator.store.async_create_user.assert_not_called()


@pytest.mark.asyncio
async def test_short_code_cannot_disarm(hass, enable_custom_integrations):
    """A legacy two-character code is rejected at the server boundary."""
    area = AreaFactory.create_area(
        area_id="area_1",
        name="Test Area 1",
        modes=["armed_away"],
        armed_away_exit_time=0,
    )
    storage, entry = setup_alarmo_entry(
        hass,
        areas=[area],
        sensors=[],
        users={"u1": UserFactory.create_user(user_id="u1", code="12")},
        entry_id="short_code",
    )

    with patch_alarmo_integration_dependencies(storage):
        await hass.config_entries.async_setup(entry.entry_id)
        await hass.async_block_till_done()

        entity = hass.data[const.DOMAIN]["areas"]["area_1"]
        await entity.async_handle_arm_request("armed_away", skip_code=True)
        await hass.async_block_till_done()
        assert_alarm_state(hass, "alarm_control_panel.test_area_1", "armed_away")

        await entity.async_alarm_disarm("12")
        await hass.async_block_till_done()

        assert_alarm_state(hass, "alarm_control_panel.test_area_1", "armed_away")
