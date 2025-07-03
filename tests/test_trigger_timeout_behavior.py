"""test_trigger_timeout_behavior.py

Tests for alarm behavior after trigger timeout expires.

This covers both the ignore_blocking_sensors_after_trigger feature and default behavior:
- When ignore_blocking_sensors_after_trigger=True: Re-arms to the previous mode regardless of open sensors
- When ignore_blocking_sensors_after_trigger=False (default): Goes to disarmed state if 
  sensors are still open, or re-arms if all sensors are closed
"""

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


@pytest.fixture(autouse=True)
def expected_lingering_timers():
    """Fix expected lingering timers for tests."""
    return True


@pytest.mark.asyncio
async def test_ignore_blocking_sensors_after_trigger_enabled_re_arms_with_open_sensors(
    hass: Any, enable_custom_integrations: Any
):
    """Test that when ignore_blocking_sensors_after_trigger is enabled, the alarm re-arms after trigger timeout even with open sensors."""
    sensor = "binary_sensor.door_sensor"
    alarm_entity = "alarm_control_panel.test_area_1"
    
    # Configure area with feature enabled and short trigger time for faster test
    trigger_time = 5
    area = AreaFactory.create_area(
        area_id="area_1",
        modes=["armed_away"],
        armed_away_trigger_time=trigger_time,
        ignore_blocking_sensors_after_trigger=True,  # Feature enabled
    )
    
    # Create a door sensor that will be open during re-arm
    sensor_config = SensorFactory.create_door_sensor(
        entity_id=sensor,
        use_entry_delay=False,  # Immediate trigger
        allow_open=False,  # Not allowed to be open during normal arming
    )
    
    storage, entry = setup_alarmo_entry(
        hass,
        areas=[area],
        sensors=[sensor_config],
        entry_id="test_ignore_blocking_enabled",
    )
    
    with patch_alarmo_integration_dependencies(storage):
        await hass.config_entries.async_setup(entry.entry_id)
        await hass.async_block_till_done()
        
        # Start with alarm disarmed and sensor closed
        hass.states.async_set(alarm_entity, "disarmed")
        hass.states.async_set(sensor, "off")
        await hass.async_block_till_done()
        
        # Arm the alarm
        await hass.services.async_call(
            "alarmo",
            "arm",
            {"entity_id": alarm_entity, "code": "1234"},
            blocking=True,
        )
        await hass.async_block_till_done()
        
    # Skip exit delay by advancing time
    await advance_time(hass, 15)  # More than default exit_time (10)
    assert_alarm_state(hass, alarm_entity, "armed_away")

    # Trigger the alarm by opening the sensor
    hass.states.async_set(sensor, "on")
    await hass.async_block_till_done()
    await advance_time(hass, 1)  # Allow state to propagate
    assert_alarm_state(hass, alarm_entity, "triggered")
    
    # Verify sensor remains open during trigger timeout
    # (This simulates a scenario where the intruder leaves the door open)
    # The sensor stays "on" (open) throughout the trigger period
    
    # Wait for trigger timeout to expire
    await advance_time(hass, trigger_time + 1)
    
    # With ignore_blocking_sensors_after_trigger=True, 
    # the alarm should re-arm to armed_away despite the open sensor
    assert_alarm_state(hass, alarm_entity, "armed_away")
    
    await cleanup_timers(hass)

@pytest.mark.asyncio
async def test_ignore_blocking_sensors_after_trigger_multiple_sensors(
    hass: Any, enable_custom_integrations: Any
):
    """Test the feature behavior with multiple sensors where some remain open."""
    door_sensor = "binary_sensor.door_sensor"
    window_sensor = "binary_sensor.window_sensor"
    alarm_entity = "alarm_control_panel.test_area_1"
    
    # Configure area with feature enabled
    trigger_time = 5
    area = AreaFactory.create_area(
        area_id="area_1",
        modes=["armed_away"],
        armed_away_trigger_time=trigger_time,
        ignore_blocking_sensors_after_trigger=True,  # Feature enabled
    )
    
    # Create multiple sensors
    door_config = SensorFactory.create_door_sensor(
        entity_id=door_sensor,
        use_entry_delay=False,
        allow_open=False,
    )
    window_config = SensorFactory.create_window_sensor(
        entity_id=window_sensor,
        use_entry_delay=False,
        allow_open=False,
    )
    
    storage, entry = setup_alarmo_entry(
        hass,
        areas=[area],
        sensors=[door_config, window_config],
        entry_id="test_ignore_blocking_multiple_sensors",
    )
    
    with patch_alarmo_integration_dependencies(storage):
        await hass.config_entries.async_setup(entry.entry_id)
        await hass.async_block_till_done()
        
        # Start with alarm disarmed and all sensors closed
        hass.states.async_set(alarm_entity, "disarmed")
        hass.states.async_set(door_sensor, "off")
        hass.states.async_set(window_sensor, "off")
        await hass.async_block_till_done()
        
        # Arm the alarm
        await hass.services.async_call(
            "alarmo",
            "arm",
            {"entity_id": alarm_entity, "code": "1234"},
            blocking=True,
        )
        await hass.async_block_till_done()
        
        # Skip exit delay
        await advance_time(hass, 15)
        assert_alarm_state(hass, alarm_entity, "armed_away")
        
        # Trigger the alarm by opening the door
        hass.states.async_set(door_sensor, "on")
        await hass.async_block_till_done()
        await advance_time(hass, 1)  # Allow state to propagate
        assert_alarm_state(hass, alarm_entity, "triggered")
        
        # Open the window sensor too during trigger period
        hass.states.async_set(window_sensor, "on")
        await hass.async_block_till_done()
        
        # Close the door but leave window open
        hass.states.async_set(door_sensor, "off")
        await hass.async_block_till_done()
        
        # Wait for trigger timeout to expire
        await advance_time(hass, trigger_time + 1)
        
        # With ignore_blocking_sensors_after_trigger=True,
        # the alarm should re-arm despite the window still being open
        assert_alarm_state(hass, alarm_entity, "armed_away")
        
        await cleanup_timers(hass)


@pytest.mark.asyncio
async def test_default_behavior_disabled_goes_to_disarmed_with_open_sensors(
    hass: Any, enable_custom_integrations: Any
):
    """Test that when ignore_blocking_sensors_after_trigger is disabled (default), the alarm goes to disarmed if sensors are still open after trigger timeout."""
    sensor = "binary_sensor.door_sensor"
    alarm_entity = "alarm_control_panel.test_area_1"
    
    # Configure area with feature disabled (default behavior) and short trigger time
    trigger_time = 5
    area = AreaFactory.create_area(
        area_id="area_1",
        modes=["armed_away"],
        armed_away_trigger_time=trigger_time,
        ignore_blocking_sensors_after_trigger=False,  # Feature disabled (default)
    )
    
    # Create a door sensor that will be open during re-arm attempt
    sensor_config = SensorFactory.create_door_sensor(
        entity_id=sensor,
        use_entry_delay=False,  # Immediate trigger
        allow_open=False,  # Not allowed to be open during normal arming
    )
    
    storage, entry = setup_alarmo_entry(
        hass,
        areas=[area],
        sensors=[sensor_config],
        entry_id="test_default_behavior_disabled",
    )
    
    with patch_alarmo_integration_dependencies(storage):
        await hass.config_entries.async_setup(entry.entry_id)
        await hass.async_block_till_done()
        
        # Start with alarm disarmed and sensor closed
        hass.states.async_set(alarm_entity, "disarmed")
        hass.states.async_set(sensor, "off")
        await hass.async_block_till_done()
        
        # Arm the alarm
        await hass.services.async_call(
            "alarmo",
            "arm",
            {"entity_id": alarm_entity, "code": "1234"},
            blocking=True,
        )
        await hass.async_block_till_done()
        
        # Skip exit delay
        await advance_time(hass, 15)  # More than default exit_time (10)
        assert_alarm_state(hass, alarm_entity, "armed_away")
        
        # Trigger the alarm by opening the sensor
        hass.states.async_set(sensor, "on")
        await hass.async_block_till_done()
        await advance_time(hass, 1)  # Allow state to propagate
        assert_alarm_state(hass, alarm_entity, "triggered")
        
        # Sensor remains open during trigger timeout
        
        # Wait for trigger timeout to expire
        await advance_time(hass, trigger_time + 1)
        
        # With ignore_blocking_sensors_after_trigger=False (default) and sensor still open,
        # the alarm should go to disarmed state (because re-arming is blocked by open sensor)
        assert_alarm_state(hass, alarm_entity, "disarmed")
        
        await cleanup_timers(hass)


@pytest.mark.asyncio
async def test_default_behavior_disabled_re_arms_with_closed_sensors(
    hass: Any, enable_custom_integrations: Any
):
    """Test that when ignore_blocking_sensors_after_trigger is disabled (default), the alarm can still re-arm if all sensors are closed after trigger timeout."""
    sensor = "binary_sensor.door_sensor"
    alarm_entity = "alarm_control_panel.test_area_1"
    
    # Configure area with feature disabled (default behavior) and short trigger time
    trigger_time = 5
    area = AreaFactory.create_area(
        area_id="area_1",
        modes=["armed_away"],
        armed_away_trigger_time=trigger_time,
        ignore_blocking_sensors_after_trigger=False,  # Feature disabled (default)
    )
    
    # Create a door sensor
    sensor_config = SensorFactory.create_door_sensor(
        entity_id=sensor,
        use_entry_delay=False,  # Immediate trigger
        allow_open=False,  # Not allowed to be open during normal arming
    )
    
    storage, entry = setup_alarmo_entry(
        hass,
        areas=[area],
        sensors=[sensor_config],
        entry_id="test_default_behavior_closed_sensors",
    )
    
    with patch_alarmo_integration_dependencies(storage):
        await hass.config_entries.async_setup(entry.entry_id)
        await hass.async_block_till_done()
        
        # Start with alarm disarmed and sensor closed
        hass.states.async_set(alarm_entity, "disarmed")
        hass.states.async_set(sensor, "off")
        await hass.async_block_till_done()
        
        # Arm the alarm
        await hass.services.async_call(
            "alarmo",
            "arm",
            {"entity_id": alarm_entity, "code": "1234"},
            blocking=True,
        )
        await hass.async_block_till_done()
        
        # Skip exit delay
        await advance_time(hass, 15)  # More than default exit_time (10)
        assert_alarm_state(hass, alarm_entity, "armed_away")
        
        # Trigger the alarm by opening the sensor
        hass.states.async_set(sensor, "on")
        await hass.async_block_till_done()
        await advance_time(hass, 1)  # Allow state to propagate
        assert_alarm_state(hass, alarm_entity, "triggered")
        
        # Close the sensor before trigger timeout expires
        # (This simulates the intruder closing the door behind them)
        hass.states.async_set(sensor, "off")
        await hass.async_block_till_done()
        
        # Wait for trigger timeout to expire
        await advance_time(hass, trigger_time + 1)
        
        # With ignore_blocking_sensors_after_trigger=False (default) but sensors now closed,
        # the alarm should be able to re-arm successfully
        assert_alarm_state(hass, alarm_entity, "armed_away")
        
        await cleanup_timers(hass)
