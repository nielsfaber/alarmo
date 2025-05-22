"""Test sensor groups functionality."""

from typing import Any

import pytest

from tests.factories import AreaFactory, SensorFactory
from tests.helpers import (
    advance_time,
    assert_alarm_state,
    cleanup_timers,
    patch_alarmo_integration_dependencies,
    setup_alarmo_entry,
)

ALARM_ENTITY = "alarm_control_panel.test_area_1"
GENERIC_DOOR_SENSOR = "binary_sensor.generic_area_1_door_sensor"
GENERIC_MOTION_SENSOR = "binary_sensor.generic_area_1_motion_sensor"
SENSOR_1 = GENERIC_DOOR_SENSOR
SENSOR_2 = GENERIC_MOTION_SENSOR


def get_sensor_group() -> list[dict[str, Any]]:
    """Get the sensor group configuration."""
    return [
        {
            "group_id": "group_1",
            "name": "Test Group",
            "entities": [SENSOR_1, SENSOR_2],
            "timeout": 10,
            "event_count": 2,
        }
    ]


@pytest.mark.asyncio
async def test_single_sensor_in_group_does_not_trigger(
    hass: Any, enable_custom_integrations: Any
) -> None:
    """Test that a single sensor in a group doesn't trigger the alarm."""
    area = AreaFactory.create_area(area_id="area_1", name="Test Area 1")
    sensors = [
        SensorFactory.create_door_sensor(
            entity_id=SENSOR_1,
            name="Generic Area 1 Door",
            area="area_1",
            modes=["armed_away", "armed_home"],
            always_on=False,
            auto_bypass=True,
            auto_bypass_modes=["armed_away"],
            allow_open=False,
            trigger_unavailable=False,
            arm_on_close=False,
            use_exit_delay=False,
            use_entry_delay=False,
        ),
        SensorFactory.create_motion_sensor(
            entity_id=SENSOR_2,
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
    sensor_groups = get_sensor_group()
    storage, entry = setup_alarmo_entry(
        hass,
        areas=[area],
        sensors=sensors,
        entry_id="test_sensor_groups",
        sensor_groups=sensor_groups,
    )
    with patch_alarmo_integration_dependencies(storage):
        await hass.config_entries.async_setup(entry.entry_id)
        await hass.async_block_till_done()

        hass.states.async_set(SENSOR_1, "off")
        await hass.async_block_till_done()
        hass.states.async_set(SENSOR_2, "off")
        await hass.async_block_till_done()

        # Properly arm the alarm
        hass.states.async_set(
            ALARM_ENTITY, "disarmed"
        )  # Ensure it starts from disarmed
        await hass.async_block_till_done()
        await hass.services.async_call(
            "alarmo",
            "arm",
            {
                "entity_id": ALARM_ENTITY,
                "code": "1234",
                "mode": "away",
            },
            blocking=True,
        )
        await hass.async_block_till_done()

        await advance_time(hass, area["modes"]["armed_away"]["exit_time"] + 1)
        assert_alarm_state(hass, ALARM_ENTITY, "armed_away")

        # Now test the sensor group logic: only activate SENSOR_1
        hass.states.async_set(SENSOR_1, "on")
        await hass.async_block_till_done()
        # SENSOR_2 remains "off"

        # After a short delay (less than group timeout), the alarm should still be armed_away
        sensor_group_timeout = sensor_groups[0]["timeout"]
        await advance_time(hass, sensor_group_timeout -1) # less than timeout
        assert_alarm_state(hass, ALARM_ENTITY, "armed_away")

        # Cleanup
        await hass.services.async_call(
            "alarmo",
            "disarm",
            {
                "entity_id": ALARM_ENTITY,
                "code": "1234",
            },
            blocking=True,
        )
        await hass.async_block_till_done()
        assert_alarm_state(hass, ALARM_ENTITY, "disarmed")
        await cleanup_timers(hass)


@pytest.mark.asyncio
async def test_two_sensors_in_group_trigger_within_timeout_triggers_alarm(
    hass: Any, enable_custom_integrations: Any
) -> None:
    """Test that two sensors in a group triggering within timeout trigger the alarm."""
    area = AreaFactory.create_area(area_id="area_1", name="Test Area 1")
    sensors = [
        SensorFactory.create_door_sensor(
            entity_id=SENSOR_1,
            name="Generic Area 1 Door",
            area="area_1",
            modes=["armed_away", "armed_home"],
            always_on=False,
            auto_bypass=True,
            auto_bypass_modes=["armed_away"],
            allow_open=False,
            trigger_unavailable=False,
            arm_on_close=False,
            use_exit_delay=False,
            use_entry_delay=False,
        ),
        SensorFactory.create_motion_sensor(
            entity_id=SENSOR_2,
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
    sensor_groups = get_sensor_group()
    storage, entry = setup_alarmo_entry(
        hass,
        areas=[area],
        sensors=sensors,
        entry_id="test_sensor_groups",
        sensor_groups=sensor_groups,
    )

    sensor_group_timeout = sensor_groups[0]["timeout"]
    # Ensure S2 triggers within the timeout of S1
    delay_before_s2_trigger = sensor_group_timeout // 2
    propagation_time = 1 # Time for S2 state to set and group to react

    with patch_alarmo_integration_dependencies(storage):
        await hass.config_entries.async_setup(entry.entry_id)
        await hass.async_block_till_done()
        for eid in [SENSOR_1, SENSOR_2]:
            hass.states.async_set(eid, "off")
            await hass.async_block_till_done()
        for eid in [SENSOR_1, SENSOR_2]:
            print(f"[DEBUG] {eid} state before arming:", hass.states.get(eid))
        hass.states.async_set(SENSOR_1, "off")
        await hass.async_block_till_done()
        hass.states.async_set(SENSOR_2, "off")
        await hass.async_block_till_done()
        hass.states.async_set(ALARM_ENTITY, "disarmed")
        await hass.async_block_till_done()
        await hass.services.async_call(
            "alarmo",
            "arm",
            {"entity_id": ALARM_ENTITY, "code": "1234"},
            blocking=True,
        )
        await hass.async_block_till_done()
        area = AreaFactory.create_area(area_id="area_1")
        exit_time = area["modes"]["armed_away"]["exit_time"]
        await advance_time(hass, exit_time + 1)
        assert_alarm_state(hass, ALARM_ENTITY, "armed_away")

        hass.states.async_set(SENSOR_1, "on")
        await hass.async_block_till_done()
        await advance_time(hass, delay_before_s2_trigger)

        hass.states.async_set(SENSOR_2, "on")
        await hass.async_block_till_done()
        await advance_time(hass, propagation_time) # Allow group to react
        # The alarm should now be triggered as both sensors in the group fired within timeout
        assert_alarm_state(hass, ALARM_ENTITY, "triggered")

        # Cleanup
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
async def test_two_sensors_in_group_trigger_outside_timeout_does_not_trigger(
    hass: Any, enable_custom_integrations: Any
) -> None:
    """Test that two sensors in a group triggering outside timeout don't trigger the alarm."""
    area = AreaFactory.create_area(area_id="area_1", name="Test Area 1")
    sensors = [
        SensorFactory.create_door_sensor(
            entity_id=SENSOR_1,
            name="Generic Area 1 Door",
            area="area_1",
            modes=["armed_away", "armed_home"],
            always_on=False,
            auto_bypass=True,
            auto_bypass_modes=["armed_away"],
            allow_open=False,
            trigger_unavailable=False,
            arm_on_close=False,
            use_exit_delay=False,
            use_entry_delay=False,
        ),
        SensorFactory.create_motion_sensor(
            entity_id=SENSOR_2,
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
    sensor_groups = get_sensor_group()
    storage, entry = setup_alarmo_entry(
        hass,
        areas=[area],
        sensors=sensors,
        entry_id="test_sensor_groups",
        sensor_groups=sensor_groups,
    )
    with patch_alarmo_integration_dependencies(storage):
        await hass.config_entries.async_setup(entry.entry_id)
        await hass.async_block_till_done()

        # Ensure sensors are initially off
        hass.states.async_set(SENSOR_1, "off")
        await hass.async_block_till_done()
        hass.states.async_set(SENSOR_2, "off")
        await hass.async_block_till_done()

        # Properly arm the alarm
        hass.states.async_set(
            ALARM_ENTITY, "disarmed"
        )  # Ensure it starts from disarmed
        await hass.async_block_till_done()
        await hass.services.async_call(
            "alarmo",
            "arm",
            # Use the default code from UserFactory and arm 'away'
            {"entity_id": ALARM_ENTITY, "code": "1234", "mode": "away"},
            blocking=True,
        )
        await hass.async_block_till_done()
        # Advance time past any exit delay from area factory default (10s for armed_away)
        # The area variable here will be the one created in the test setup
        await advance_time(hass, area["modes"]["armed_away"]["exit_time"] + 1)
        assert_alarm_state(hass, ALARM_ENTITY, "armed_away")

        # Original test logic for triggering sensors outside timeout
        hass.states.async_set(SENSOR_1, "on")
        await hass.async_block_till_done()
        # Advance time PAST the sensor group timeout (default 10s)
        sensor_group_timeout = sensor_groups[0]["timeout"]
        buffer_time_after_timeout = 1 # Define a small buffer to ensure we are past the timeout
        await advance_time(hass, sensor_group_timeout + buffer_time_after_timeout)

        hass.states.async_set(SENSOR_2, "on")
        await hass.async_block_till_done()
        # Alarm should still be armed_away because SENSOR_2 triggered after timeout
        assert_alarm_state(hass, ALARM_ENTITY, "armed_away")

        # Cleanup
        await hass.services.async_call(
            "alarmo",
            "disarm",
            {"entity_id": ALARM_ENTITY, "code": "1234"},
            blocking=True,
        )
        await hass.async_block_till_done()
        assert_alarm_state(hass, ALARM_ENTITY, "disarmed")
        await cleanup_timers(hass)
