"""Test that group corroboration is independent of a member's own modes.

A group member's `modes` list only gates whether it may originate a
trigger; it should still count as corroborating evidence for a fellow
group member's trip even in a mode it wouldn't be watched in on its own -
and even if it has since reverted back to closed, as long as it opened at
some point within the group's timeout window.
"""

from typing import Any

import pytest

from tests.helpers import (
    advance_time,
    cleanup_timers,
    assert_alarm_state,
    setup_alarmo_entry,
    patch_alarmo_integration_dependencies,
)
from tests.factories import AreaFactory, SensorFactory

ALARM_ENTITY = "alarm_control_panel.test_area_1"
SENSOR_DOOR = "binary_sensor.generic_area_1_door_sensor"
SENSOR_MOTION = "binary_sensor.generic_area_1_motion_sensor"


def get_sensors() -> list[dict[str, Any]]:
    """SENSOR_MOTION is only ever watched on its own in armed_away.

    SENSOR_DOOR is watched in both armed_away and armed_home.
    """
    return [
        SensorFactory.create_door_sensor(
            entity_id=SENSOR_DOOR,
            name="Generic Area 1 Door",
            area="area_1",
            modes=["armed_away", "armed_home"],
            always_on=False,
            auto_bypass=False,
            auto_bypass_modes=[],
            allow_open=False,
            trigger_unavailable=False,
            arm_on_close=False,
            use_exit_delay=False,
            use_entry_delay=False,
        ),
        SensorFactory.create_motion_sensor(
            entity_id=SENSOR_MOTION,
            name="Generic Area 1 Motion",
            area="area_1",
            modes=["armed_away"],
            always_on=False,
            auto_bypass=False,
            auto_bypass_modes=[],
            allow_open=False,
            trigger_unavailable=False,
            arm_on_close=False,
            use_exit_delay=False,
            use_entry_delay=False,
        ),
    ]


def get_sensor_group() -> list[dict[str, Any]]:
    """Group the door and motion sensor together."""
    return [
        {
            "group_id": "group_1",
            "name": "Test Group",
            "entities": [SENSOR_DOOR, SENSOR_MOTION],
            "timeout": 10,
            "event_count": 2,
        }
    ]


@pytest.mark.asyncio
async def test_corroboration_ignores_member_excluded_from_current_mode(
    hass: Any, enable_custom_integrations: Any
) -> None:
    """Door trips while armed_home.

    Motion is not watched in armed_home, but its recent trip still counts
    as corroborating evidence for the door.
    """
    area = AreaFactory.create_area(area_id="area_1", name="Test Area 1")
    storage, entry = setup_alarmo_entry(
        hass,
        areas=[area],
        sensors=get_sensors(),
        entry_id="test_mode_independent_corroboration",
        sensor_groups=get_sensor_group(),
    )

    with patch_alarmo_integration_dependencies(storage):
        await hass.config_entries.async_setup(entry.entry_id)
        await hass.async_block_till_done()
        for eid in [SENSOR_DOOR, SENSOR_MOTION]:
            hass.states.async_set(eid, "off")
            await hass.async_block_till_done()

        hass.states.async_set(ALARM_ENTITY, "disarmed")
        await hass.async_block_till_done()
        await hass.services.async_call(
            "alarmo",
            "arm",
            {"entity_id": ALARM_ENTITY, "code": "1234", "mode": "home"},
            blocking=True,
        )
        await hass.async_block_till_done()
        await advance_time(hass, area["modes"]["armed_home"]["exit_time"] + 1)
        assert_alarm_state(hass, ALARM_ENTITY, "armed_home")

        # motion sensor fires first - not watched by Alarmo in armed_home,
        # so on its own this must not trigger anything
        hass.states.async_set(SENSOR_MOTION, "on")
        await hass.async_block_till_done()
        await advance_time(hass, 1)
        assert_alarm_state(hass, ALARM_ENTITY, "armed_home")

        # door opens shortly after - its own modes include armed_home, so it
        # originates a trip; the motion sensor's live "on" state (still
        # within the group timeout) should corroborate it despite motion
        # itself not being watched in this mode
        hass.states.async_set(SENSOR_DOOR, "on")
        await hass.async_block_till_done()
        await advance_time(hass, 1)
        assert_alarm_state(hass, ALARM_ENTITY, "triggered")

        await hass.services.async_call(
            "alarmo",
            "disarm",
            {"entity_id": ALARM_ENTITY, "code": "1234"},
            blocking=True,
        )
        await hass.async_block_till_done()
        assert_alarm_state(hass, ALARM_ENTITY, "disarmed")
        await cleanup_timers(hass)


@pytest.mark.asyncio
async def test_corroboration_survives_member_reverting_to_closed(
    hass: Any, enable_custom_integrations: Any
) -> None:
    """Corroboration is based on history, not the member's live state.

    Motion trips and then debounces back to closed (as PIR sensors
    typically do) before the door opens. As long as the motion event
    happened within the group's timeout window, it must still count as
    corroboration - even though by the time the door trips, motion is no
    longer physically open.
    """
    area = AreaFactory.create_area(area_id="area_1", name="Test Area 1")
    storage, entry = setup_alarmo_entry(
        hass,
        areas=[area],
        sensors=get_sensors(),
        entry_id="test_mode_independent_corroboration",
        sensor_groups=get_sensor_group(),
    )

    with patch_alarmo_integration_dependencies(storage):
        await hass.config_entries.async_setup(entry.entry_id)
        await hass.async_block_till_done()
        for eid in [SENSOR_DOOR, SENSOR_MOTION]:
            hass.states.async_set(eid, "off")
            await hass.async_block_till_done()

        hass.states.async_set(ALARM_ENTITY, "disarmed")
        await hass.async_block_till_done()
        await hass.services.async_call(
            "alarmo",
            "arm",
            {"entity_id": ALARM_ENTITY, "code": "1234", "mode": "home"},
            blocking=True,
        )
        await hass.async_block_till_done()
        await advance_time(hass, area["modes"]["armed_home"]["exit_time"] + 1)
        assert_alarm_state(hass, ALARM_ENTITY, "armed_home")

        # motion sensor fires and then debounces back to closed, well
        # within the group's timeout window
        hass.states.async_set(SENSOR_MOTION, "on")
        await hass.async_block_till_done()
        hass.states.async_set(SENSOR_MOTION, "off")
        await hass.async_block_till_done()
        assert_alarm_state(hass, ALARM_ENTITY, "armed_home")

        # door opens shortly after - motion is no longer physically open,
        # but its earlier trip must still count as corroboration
        hass.states.async_set(SENSOR_DOOR, "on")
        await hass.async_block_till_done()
        await advance_time(hass, 1)
        assert_alarm_state(hass, ALARM_ENTITY, "triggered")

        await hass.services.async_call(
            "alarmo",
            "disarm",
            {"entity_id": ALARM_ENTITY, "code": "1234"},
            blocking=True,
        )
        await hass.async_block_till_done()
        assert_alarm_state(hass, ALARM_ENTITY, "disarmed")
        await cleanup_timers(hass)


@pytest.mark.asyncio
async def test_door_alone_does_not_trigger_without_corroboration(
    hass: Any, enable_custom_integrations: Any
) -> None:
    """Sanity check for corroboration still being required.

    Without the motion sensor's corroboration, the door alone still must
    not trigger (event_count of 2 still enforced).
    """
    area = AreaFactory.create_area(area_id="area_1", name="Test Area 1")
    storage, entry = setup_alarmo_entry(
        hass,
        areas=[area],
        sensors=get_sensors(),
        entry_id="test_mode_independent_corroboration",
        sensor_groups=get_sensor_group(),
    )

    with patch_alarmo_integration_dependencies(storage):
        await hass.config_entries.async_setup(entry.entry_id)
        await hass.async_block_till_done()
        for eid in [SENSOR_DOOR, SENSOR_MOTION]:
            hass.states.async_set(eid, "off")
            await hass.async_block_till_done()

        hass.states.async_set(ALARM_ENTITY, "disarmed")
        await hass.async_block_till_done()
        await hass.services.async_call(
            "alarmo",
            "arm",
            {"entity_id": ALARM_ENTITY, "code": "1234", "mode": "home"},
            blocking=True,
        )
        await hass.async_block_till_done()
        await advance_time(hass, area["modes"]["armed_home"]["exit_time"] + 1)
        assert_alarm_state(hass, ALARM_ENTITY, "armed_home")

        hass.states.async_set(SENSOR_DOOR, "on")
        await hass.async_block_till_done()
        await advance_time(hass, 1)
        assert_alarm_state(hass, ALARM_ENTITY, "armed_home")

        await hass.services.async_call(
            "alarmo",
            "disarm",
            {"entity_id": ALARM_ENTITY, "code": "1234"},
            blocking=True,
        )
        await hass.async_block_till_done()
        assert_alarm_state(hass, ALARM_ENTITY, "disarmed")
        await cleanup_timers(hass)
