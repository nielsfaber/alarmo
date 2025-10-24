"""Test alarm master functionality with multiple areas."""

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


@pytest.mark.asyncio
async def test_alarm_master_state_mirroring(
    hass: Any, enable_custom_integrations: Any
) -> None:
    """Test that alarm master mirrors area states according to priority rules."""
    area1 = AreaFactory.create_area(
        area_id="area_1",
        name="Test Area 1",
        modes=["armed_away", "armed_home"],
        armed_away_enabled=True,
        armed_home_enabled=True,
    )
    area2 = AreaFactory.create_area(
        area_id="area_2",
        name="Test Area 2",
        modes=["armed_away", "armed_home"],
        armed_away_enabled=True,
        armed_home_enabled=True,
    )

    sensor1 = SensorFactory.create_door_sensor(
        entity_id="binary_sensor.area_1_door",
        area="area_1",
        modes=["armed_away", "armed_home"],
    )
    sensor2 = SensorFactory.create_door_sensor(
        entity_id="binary_sensor.area_2_door",
        area="area_2",
        modes=["armed_away", "armed_home"],
    )

    storage, entry = setup_alarmo_entry(
        hass,
        areas=[area1, area2],
        sensors=[sensor1, sensor2],
        entry_id="test_alarm_master",
        master_enabled=True,
    )

    with patch_alarmo_integration_dependencies(storage):
        await hass.config_entries.async_setup(entry.entry_id)
        await hass.async_block_till_done()

        hass.states.async_set("binary_sensor.area_1_door", "off")
        hass.states.async_set("binary_sensor.area_2_door", "off")
        hass.states.async_set("alarm_control_panel.test_area_1", "disarmed")
        hass.states.async_set("alarm_control_panel.test_area_2", "disarmed")
        await hass.async_block_till_done()

        # Master should be disarmed when all areas are disarmed
        assert_alarm_state(hass, "alarm_control_panel.master", "disarmed")

        # Arm area1 only
        await hass.services.async_call(
            "alarm_control_panel",
            "alarm_arm_away",
            {"entity_id": "alarm_control_panel.test_area_1", "code": "1234"},
            blocking=True,
        )

        # Wait for exit delay
        exit_delay = area1["modes"]["armed_away"]["exit_time"]
        await advance_time(hass, exit_delay + 1)

        assert_alarm_state(hass, "alarm_control_panel.test_area_1", "armed_away")
        # Master should maintain previous state when areas are mixed
        assert_alarm_state(hass, "alarm_control_panel.master", "disarmed")

        # Arm area2 as well
        await hass.services.async_call(
            "alarm_control_panel",
            "alarm_arm_away",
            {"entity_id": "alarm_control_panel.test_area_2", "code": "1234"},
            blocking=True,
        )

        # Wait for exit delay
        exit_delay = area2["modes"]["armed_away"]["exit_time"]
        await advance_time(hass, exit_delay + 1)

        assert_alarm_state(hass, "alarm_control_panel.test_area_2", "armed_away")
        # Master should be armed_away since all areas are armed_away
        assert_alarm_state(hass, "alarm_control_panel.master", "armed_away")


@pytest.mark.asyncio
async def test_alarm_master_propagates_commands(
    hass: Any, enable_custom_integrations: Any
) -> None:
    """Test that arming/disarming master propagates to all areas."""
    # Create two areas
    area1 = AreaFactory.create_area(
        area_id="area_1",
        name="Test Area 1 Propagation",
        modes=["armed_away"],
        armed_away_enabled=True,
    )
    area2 = AreaFactory.create_area(
        area_id="area_2",
        name="Test Area 2 Propagation",
        modes=["armed_away"],
        armed_away_enabled=True,
    )

    sensor1 = SensorFactory.create_door_sensor(
        entity_id="binary_sensor.area_1_door", area="area_1"
    )
    sensor2 = SensorFactory.create_door_sensor(
        entity_id="binary_sensor.area_2_door", area="area_2"
    )

    storage, entry = setup_alarmo_entry(
        hass,
        areas=[area1, area2],
        sensors=[sensor1, sensor2],
        entry_id="test_master_propagation",
        master_enabled=True,
    )

    with patch_alarmo_integration_dependencies(storage):
        await hass.config_entries.async_setup(entry.entry_id)
        await hass.async_block_till_done()

        hass.states.async_set("binary_sensor.area_1_door", "off")
        hass.states.async_set("binary_sensor.area_2_door", "off")
        await hass.async_block_till_done()

        # Arm the master
        await hass.services.async_call(
            "alarm_control_panel",
            "alarm_arm_away",
            {"entity_id": "alarm_control_panel.master", "code": "1234"},
            blocking=True,
        )
        await hass.async_block_till_done()
        await hass.async_block_till_done()

        # Check that areas are arming
        assert_alarm_state(
            hass, "alarm_control_panel.test_area_1_propagation", "arming"
        )
        assert_alarm_state(
            hass, "alarm_control_panel.test_area_2_propagation", "arming"
        )
        assert_alarm_state(hass, "alarm_control_panel.master", "arming")

        # Wait for exit delays
        max_exit_delay = max(
            area1["modes"]["armed_away"]["exit_time"],
            area2["modes"]["armed_away"]["exit_time"],
        )
        await advance_time(hass, max_exit_delay + 1)

        # All should be armed
        assert_alarm_state(
            hass, "alarm_control_panel.test_area_1_propagation", "armed_away"
        )
        assert_alarm_state(
            hass, "alarm_control_panel.test_area_2_propagation", "armed_away"
        )
        assert_alarm_state(hass, "alarm_control_panel.master", "armed_away")

        # Disarm the master to clean up timers
        await hass.services.async_call(
            "alarm_control_panel",
            "alarm_disarm",
            {"entity_id": "alarm_control_panel.master", "code": "1234"},
            blocking=True,
        )
        await hass.async_block_till_done()
        assert_alarm_state(hass, "alarm_control_panel.master", "disarmed")


@pytest.mark.asyncio
async def test_alarm_master_priority_states(
    hass: Any, enable_custom_integrations: Any
) -> None:
    """Test master alarm state priority.

    triggered > pending > arming > armed > disarmed.
    """
    # Create areas with immediate arming
    area1 = AreaFactory.create_area(
        area_id="area_1",
        name="Test Area 1 Priority",
        modes=["armed_away"],
        armed_away_enabled=True,
        armed_away_exit_time=0,
    )
    area2 = AreaFactory.create_area(
        area_id="area_2",
        name="Test Area 2 Priority",
        modes=["armed_away"],
        armed_away_enabled=True,
        armed_away_exit_time=0,
    )

    sensor1 = SensorFactory.create_door_sensor(
        entity_id="binary_sensor.area_1_door",
        area="area_1",
        use_exit_delay=False,
        use_entry_delay=True,
    )
    sensor2 = SensorFactory.create_door_sensor(
        entity_id="binary_sensor.area_2_door",
        area="area_2",
        use_exit_delay=False,
        use_entry_delay=False,
    )

    storage, entry = setup_alarmo_entry(
        hass,
        areas=[area1, area2],
        sensors=[sensor1, sensor2],
        entry_id="test_master_priority",
        master_enabled=True,
    )

    with patch_alarmo_integration_dependencies(storage):
        await hass.config_entries.async_setup(entry.entry_id)
        await hass.async_block_till_done()

        # Set initial states
        hass.states.async_set("binary_sensor.area_1_door", "off")
        hass.states.async_set("binary_sensor.area_2_door", "off")
        await hass.async_block_till_done()

        # Arm both areas via master
        await hass.services.async_call(
            "alarm_control_panel",
            "alarm_arm_away",
            {"entity_id": "alarm_control_panel.master", "code": "1234"},
            blocking=True,
        )
        await advance_time(hass, 1)

        # Both areas and master should be armed
        assert_alarm_state(
            hass, "alarm_control_panel.test_area_1_priority", "armed_away"
        )
        assert_alarm_state(
            hass, "alarm_control_panel.test_area_2_priority", "armed_away"
        )
        assert_alarm_state(hass, "alarm_control_panel.master", "armed_away")

        # Trigger sensor1 (has entry delay) - should put area1 in pending
        hass.states.async_set("binary_sensor.area_1_door", "on")
        await hass.async_block_till_done()
        await advance_time(hass, 1)

        assert_alarm_state(hass, "alarm_control_panel.test_area_1_priority", "pending")
        assert_alarm_state(
            hass, "alarm_control_panel.test_area_2_priority", "armed_away"
        )
        # Master should be pending (pending > armed priority)
        assert_alarm_state(hass, "alarm_control_panel.master", "pending")

        # Trigger sensor2 (no entry delay) - should immediately trigger area2
        hass.states.async_set("binary_sensor.area_2_door", "on")
        await hass.async_block_till_done()
        await advance_time(hass, 1)

        assert_alarm_state(hass, "alarm_control_panel.test_area_1_priority", "pending")
        assert_alarm_state(
            hass, "alarm_control_panel.test_area_2_priority", "triggered"
        )
        # Master should be triggered (triggered > pending priority)
        assert_alarm_state(hass, "alarm_control_panel.master", "triggered")

        # Advance time to allow pending timers to complete
        await cleanup_timers(hass)
        await hass.async_block_till_done()

        # Ensure area1 also triggered (if not already disarmed by cleanup)
        state_area1_after_cleanup = hass.states.get(
            "alarm_control_panel.test_area_1_priority"
        )
        if state_area1_after_cleanup and state_area1_after_cleanup.state != "disarmed":
            assert_alarm_state(
                hass, "alarm_control_panel.test_area_1_priority", "triggered"
            )

        # Disarm the master to clean up
        await hass.services.async_call(
            "alarm_control_panel",
            "alarm_disarm",
            {"entity_id": "alarm_control_panel.master", "code": "1234"},
            blocking=True,
        )
        await hass.async_block_till_done()
        assert_alarm_state(hass, "alarm_control_panel.master", "disarmed")
