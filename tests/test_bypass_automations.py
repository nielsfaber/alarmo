"""Test routing of bypass events independently from state transitions."""

from types import SimpleNamespace
from unittest.mock import AsyncMock

import pytest
from homeassistant.helpers.dispatcher import async_dispatcher_send

from tests.test_automations import _make_handler_with_config
from custom_components.alarmo import const


@pytest.mark.asyncio
@pytest.mark.parametrize(
    ("signal", "payload", "expected"),
    [
        ("alarmo_state_updated", ("area_1", "armed_home", "armed_home"), None),
        ("alarmo_state_updated", ("area_1", "arming", "armed_home"), "armed"),
        ("alarmo_event", (const.EVENT_BYPASS_ENABLED, "area_1", {}), "bypass_enabled"),
        (
            "alarmo_event",
            (const.EVENT_BYPASS_DISABLED, "area_1", {}),
            "bypass_disabled",
        ),
        ("alarmo_event", (const.EVENT_FAILED_TO_ARM, "area_1", {}), "arm_failure"),
    ],
)
async def test_bypass_action_routing(hass, signal, payload, expected):
    """Attribute refreshes stay silent, and real events select their own action."""
    events = ["armed", "bypass_enabled", "bypass_disabled", "arm_failure"]
    config = {
        event: {
            "enabled": True,
            "triggers": [{"event": event, "area": "area_1", "modes": []}],
        }
        for event in events
    }
    handler = _make_handler_with_config(hass, config)
    area = SimpleNamespace(entity_id="alarm_control_panel.area", _arm_mode="armed_home")
    hass.data[const.DOMAIN]["areas"]["area_1"] = area
    handler.async_execute_automation = AsyncMock()
    async_dispatcher_send(hass, signal, *payload)
    await hass.async_block_till_done()
    if expected:
        handler.async_execute_automation.assert_awaited_once_with(expected, area)
    else:
        handler.async_execute_automation.assert_not_awaited()


@pytest.mark.asyncio
@pytest.mark.parametrize("selection", [None, 0, "0", "area_1"])
async def test_bypass_area_and_mode_filters(hass, selection):
    """Master selection matches each child event once, respecting mode and enable."""

    def config(area, modes, enabled=True):
        return {
            "enabled": enabled,
            "triggers": [{"event": "bypass_enabled", "area": area, "modes": modes}],
        }

    handler = _make_handler_with_config(
        hass,
        {
            "match": config(selection, ["armed_home"]),
            "wrong_area": config("other", []),
            "wrong_mode": config(selection, ["armed_away"]),
            "disabled": config(selection, [], False),
        },
    )
    area = SimpleNamespace(entity_id="alarm_control_panel.area", _arm_mode="armed_home")
    hass.data[const.DOMAIN]["areas"]["area_1"] = area
    hass.data[const.DOMAIN]["master"] = SimpleNamespace()
    handler.async_execute_automation = AsyncMock()
    async_dispatcher_send(
        hass, "alarmo_event", const.EVENT_BYPASS_ENABLED, "area_1", {}
    )
    await hass.async_block_till_done()
    handler.async_execute_automation.assert_awaited_once_with("match", area)
