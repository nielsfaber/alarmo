"""Concurrent arm/disarm commands must be serialised per entity."""

import asyncio

import pytest
from homeassistant.helpers.dispatcher import async_dispatcher_connect

from tests.helpers import (
    assert_alarm_state,
    setup_alarmo_entry,
    patch_alarmo_integration_dependencies,
)
from tests.factories import AreaFactory, UserFactory
from custom_components.alarmo import const


@pytest.mark.asyncio
async def test_concurrent_disarm_emits_one_event(hass, enable_custom_integrations):
    """Two overlapping disarms must not both transition and emit."""
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
        users={"u1": UserFactory.create_user(user_id="u1", code="1234")},
        entry_id="arm_disarm_lock",
    )

    events: list[str] = []

    def capture(event_type, area_id, args=None):
        events.append(event_type)

    async_dispatcher_connect(hass, "alarmo_event", capture)

    with patch_alarmo_integration_dependencies(storage):
        await hass.config_entries.async_setup(entry.entry_id)
        await hass.async_block_till_done()

        entity = hass.data[const.DOMAIN]["areas"]["area_1"]
        await entity.async_handle_arm_request("armed_away", code="1234")
        await hass.async_block_till_done()
        assert_alarm_state(hass, "alarm_control_panel.test_area_1", "armed_away")

        await asyncio.gather(
            entity.async_alarm_disarm("1234"),
            entity.async_alarm_disarm("1234"),
        )
        await hass.async_block_till_done()

        assert events.count(const.EVENT_DISARM) == 1
        assert_alarm_state(hass, "alarm_control_panel.test_area_1", "disarmed")
