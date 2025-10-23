"""Test for group entry delay derivation from triggering sensor."""

from typing import Any

import pytest

from tests.helpers import (
    advance_time,
    cleanup_timers,
    assert_alarm_state,
    setup_alarmo_entry,
    patch_alarmo_integration_dependencies,
)
from tests.factories import AreaFactory, SensorFactory, SensorGroupFactory

ALARM_ENTITY = "alarm_control_panel.test_area_1"
PROCESSING_TIME = 1  # Time to allow for event processing


@pytest.mark.asyncio
async def test_sensor_group_uses_triggering_sensor_entry_delay(
    hass: Any, enable_custom_integrations: Any
) -> None:
    """Test that sensor groups derive entry delay from the final triggering sensor (per maintainer feedback)."""
    area = AreaFactory.create_area(
        area_id="area_1",
        name="Test Area 1",
        modes=["armed_away"],
        armed_away_entry_time=30,  # Area default
    )

    # Create sensors with different entry delays
    sensor_15s = SensorFactory.create_door_sensor(
        entity_id="binary_sensor.sensor_15s",
        name="Sensor 15s",
        area="area_1",
        modes=["armed_away"],
        use_entry_delay=True,
        entry_delay=15,
    )

    sensor_45s = SensorFactory.create_motion_sensor(
        entity_id="binary_sensor.sensor_45s",
        name="Sensor 45s",
        area="area_1",
        modes=["armed_away"],
        use_entry_delay=True,
        # Note: motion sensor factory doesn't accept entry_delay,
        # but we'll manually add it to storage
    )

    # Create a group requiring both sensors
    group = SensorGroupFactory.create_sensor_group(
        group_id="group_triggering_delay",
        name="Triggering Delay Group",
        entities=[sensor_15s["entity_id"], sensor_45s["entity_id"]],
        timeout=10,
        event_count=2,
    )

    storage, entry = setup_alarmo_entry(
        hass,
        areas=[area],
        sensors=[sensor_15s, sensor_45s],
        sensor_groups=[group],
        entry_id="test_group_triggering_sensor_delay",
    )

    # Manually add entry_delay to the motion sensor in storage
    storage.sensors[sensor_45s["entity_id"]] = storage.sensors[
        sensor_45s["entity_id"]
    ]._replace(entry_delay=45)

    with patch_alarmo_integration_dependencies(storage):
        await hass.config_entries.async_setup(entry.entry_id)
        await hass.async_block_till_done()

        # Set initial states
        hass.states.async_set(sensor_15s["entity_id"], "off")
        hass.states.async_set(sensor_45s["entity_id"], "off")
        await hass.async_block_till_done()

        # Arm the system
        await hass.services.async_call(
            "alarmo",
            "arm",
            {"entity_id": ALARM_ENTITY, "code": "1234", "mode": "away"},
            blocking=True,
        )
        await hass.async_block_till_done()
        await advance_time(hass, 11)
        assert_alarm_state(hass, ALARM_ENTITY, "armed_away")

        # Test 1: Trigger sensor_15s first, then sensor_45s (45s should be triggering sensor)
        hass.states.async_set(sensor_15s["entity_id"], "on")
        await hass.async_block_till_done()
        assert_alarm_state(hass, ALARM_ENTITY, "armed_away")  # Group requires 2 sensors

        await advance_time(hass, 2)
        hass.states.async_set(
            sensor_45s["entity_id"], "on"
        )  # This is the triggering sensor
        await hass.async_block_till_done()
        await advance_time(hass, PROCESSING_TIME)

        # Should go pending with 45s delay (from triggering sensor_45s)
        assert_alarm_state(hass, ALARM_ENTITY, "pending")

        # Verify it uses 45s delay, not area default (30s) or sensor_15s delay (15s)
        await advance_time(hass, 30 + PROCESSING_TIME)
        assert_alarm_state(hass, ALARM_ENTITY, "pending")  # Should still be pending

        await advance_time(hass, 15)  # Total 45s + processing time
        await hass.async_block_till_done()
        assert_alarm_state(hass, ALARM_ENTITY, "triggered")

        # Reset for test 2
        await hass.services.async_call(
            "alarmo",
            "disarm",
            {"entity_id": ALARM_ENTITY, "code": "1234"},
            blocking=True,
        )
        await hass.async_block_till_done()
        await advance_time(hass, 11)  # Let group events expire

        # Reset sensors
        hass.states.async_set(sensor_15s["entity_id"], "off")
        hass.states.async_set(sensor_45s["entity_id"], "off")
        await hass.async_block_till_done()

        # Re-arm
        await hass.services.async_call(
            "alarmo",
            "arm",
            {"entity_id": ALARM_ENTITY, "code": "1234", "mode": "away"},
            blocking=True,
        )
        await hass.async_block_till_done()
        await advance_time(hass, 11)
        assert_alarm_state(hass, ALARM_ENTITY, "armed_away")

        # Test 2: Trigger sensor_45s first, then sensor_15s (15s should be triggering sensor)
        hass.states.async_set(sensor_45s["entity_id"], "on")
        await hass.async_block_till_done()
        assert_alarm_state(hass, ALARM_ENTITY, "armed_away")

        await advance_time(hass, 2)
        hass.states.async_set(
            sensor_15s["entity_id"], "on"
        )  # This is the triggering sensor
        await hass.async_block_till_done()
        await advance_time(hass, PROCESSING_TIME)

        # Should go pending with 15s delay (from triggering sensor_15s)
        assert_alarm_state(hass, ALARM_ENTITY, "pending")

        # Should trigger after 15s, not 30s (area default) or 45s (other sensor)
        await advance_time(hass, 15 + PROCESSING_TIME)
        await hass.async_block_till_done()
        assert_alarm_state(hass, ALARM_ENTITY, "triggered")

        await cleanup_timers(hass)
