"""Runtime bypass integration tests; require the upstream HA test dependencies."""

import pytest
from homeassistant.exceptions import HomeAssistantError

from tests.helpers import (
    advance_time,
    setup_alarmo_entry,
    patch_alarmo_integration_dependencies,
)
from tests.factories import AreaFactory, SensorFactory

ALARM = "alarm_control_panel.test_area_1"
DOOR = "binary_sensor.door"


@pytest.mark.asyncio
@pytest.mark.parametrize(
    "scenario", ["close", "unused", "timeout_open", "disarm", "disable", "repeat"]
)
async def test_runtime_bypass(hass, enable_custom_integrations, scenario):
    """Exercise the real service, perimeter, event listeners and timers together."""
    area = AreaFactory.create_area(
        area_id="area_1", modes=["armed_away"], armed_away_enabled=True
    )
    door = SensorFactory.create_door_sensor(
        entity_id=DOOR, area="area_1", modes=["armed_away"], use_entry_delay=False
    )
    storage, entry = setup_alarmo_entry(
        hass, areas=[area], sensors=[door], entry_id="runtime_bypass"
    )
    with patch_alarmo_integration_dependencies(storage):
        hass.states.async_set(DOOR, "off")
        await hass.config_entries.async_setup(entry.entry_id)
        await hass.async_block_till_done()
        await hass.services.async_call(
            "alarmo",
            "arm",
            {"entity_id": ALARM, "code": "1234", "mode": "away", "skip_delay": True},
            blocking=True,
        )
        await hass.async_block_till_done()
        assert hass.states.get(ALARM).state == "armed_away"

        async def bypass(**extra):
            await hass.services.async_call(
                "alarmo",
                "bypass",
                {"entity_id": ALARM, "sensors": [DOOR], "timeout": 30, **extra},
                blocking=True,
            )
            await hass.async_block_till_done()

        await bypass()
        assert DOOR in hass.states.get(ALARM).attributes["bypassed_sensors"]
        if scenario in ["close", "timeout_open"]:
            hass.states.async_set(DOOR, "on")
            await hass.async_block_till_done()
            assert hass.states.get(ALARM).state == "armed_away"
        if scenario == "close":
            hass.states.async_set(DOOR, "off")
            await hass.async_block_till_done()
        elif scenario == "disarm":
            await hass.services.async_call(
                "alarmo", "disarm", {"entity_id": ALARM, "code": "1234"}, blocking=True
            )
            await hass.async_block_till_done()
        elif scenario == "disable":
            await bypass(mode="disable")
        elif scenario == "repeat":
            await advance_time(hass, 20)
            await bypass()
            await advance_time(hass, 15)
            assert DOOR in hass.states.get(ALARM).attributes["bypassed_sensors"]
            await advance_time(hass, 16)
        else:
            await advance_time(hass, 31)
        assert DOOR not in (hass.states.get(ALARM).attributes["bypassed_sensors"] or [])
        if scenario == "timeout_open":
            assert hass.states.get(ALARM).state == "triggered"
        elif scenario == "disarm":
            assert hass.states.get(ALARM).state == "disarmed"
            await advance_time(hass, 31)
            await bypass(mode="disable")
            with pytest.raises(HomeAssistantError):
                await bypass()
        else:
            assert hass.states.get(ALARM).state == "armed_away"
            hass.states.async_set(DOOR, "on")
            await hass.async_block_till_done()
            assert hass.states.get(ALARM).state == "triggered"
