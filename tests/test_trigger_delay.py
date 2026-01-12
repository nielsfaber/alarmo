"""Tests for sensor trigger delay feature."""

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
PROCESSING_TIME = 1


@pytest.fixture(autouse=True)
def expected_lingering_timers():
    """Fix expected lingering timers for tests."""
    return True


@pytest.mark.asyncio
async def test_trigger_delay_brief_activation_no_trigger(
    hass: Any, enable_custom_integrations: Any
):
    """Test that brief sensor activation shorter than trigger_delay does not trigger."""
    area = AreaFactory.create_area(
        area_id="area_1",
        modes=["armed_away"],
        armed_away_entry_time=30,
    )

    sensor = SensorFactory.create_door_sensor(
        entity_id="binary_sensor.front_door",
        name="Front Door",
        use_exit_delay=False,
        use_entry_delay=True,
        trigger_delay=5,
    )

    storage, entry = setup_alarmo_entry(
        hass, areas=[area], sensors=[sensor], entry_id="test_trigger_delay_brief"
    )

    with patch_alarmo_integration_dependencies(storage):
        await hass.config_entries.async_setup(entry.entry_id)
        await hass.async_block_till_done()

        hass.states.async_set(ALARM_ENTITY, "disarmed")
        hass.states.async_set("binary_sensor.front_door", "off")
        await hass.async_block_till_done()

        await hass.services.async_call(
            "alarmo",
            "arm",
            {"entity_id": ALARM_ENTITY, "code": "1234", "mode": "away"},
            blocking=True,
        )
        await hass.async_block_till_done()
        await advance_time(hass, 11)
        assert_alarm_state(hass, ALARM_ENTITY, "armed_away")

        # Activate sensor briefly (less than trigger_delay)
        hass.states.async_set("binary_sensor.front_door", "on")
        await hass.async_block_till_done()
        await advance_time(hass, 2)  # Only 2 seconds, trigger_delay is 5

        # Deactivate sensor before trigger_delay expires
        hass.states.async_set("binary_sensor.front_door", "off")
        await hass.async_block_till_done()
        await advance_time(hass, 5)  # Wait past original trigger_delay time

        # Should still be armed_away, no trigger occurred
        assert_alarm_state(hass, ALARM_ENTITY, "armed_away")

        await cleanup_timers(hass)


@pytest.mark.asyncio
async def test_trigger_delay_sustained_activation_triggers(
    hass: Any, enable_custom_integrations: Any
):
    """Test that sustained sensor activation longer than trigger_delay triggers alarm."""
    area = AreaFactory.create_area(
        area_id="area_1",
        modes=["armed_away"],
        armed_away_entry_time=30,
    )

    sensor = SensorFactory.create_door_sensor(
        entity_id="binary_sensor.front_door",
        name="Front Door",
        use_exit_delay=False,
        use_entry_delay=True,
        trigger_delay=5,
    )

    storage, entry = setup_alarmo_entry(
        hass, areas=[area], sensors=[sensor], entry_id="test_trigger_delay_sustained"
    )

    with patch_alarmo_integration_dependencies(storage):
        await hass.config_entries.async_setup(entry.entry_id)
        await hass.async_block_till_done()

        hass.states.async_set(ALARM_ENTITY, "disarmed")
        hass.states.async_set("binary_sensor.front_door", "off")
        await hass.async_block_till_done()

        await hass.services.async_call(
            "alarmo",
            "arm",
            {"entity_id": ALARM_ENTITY, "code": "1234", "mode": "away"},
            blocking=True,
        )
        await hass.async_block_till_done()
        await advance_time(hass, 11)
        assert_alarm_state(hass, ALARM_ENTITY, "armed_away")

        # Activate sensor and keep it on
        hass.states.async_set("binary_sensor.front_door", "on")
        await hass.async_block_till_done()

        # Wait for trigger_delay to expire
        await advance_time(hass, 6)  # trigger_delay is 5 seconds
        await hass.async_block_till_done()

        # Should now be pending (entry delay started)
        assert_alarm_state(hass, ALARM_ENTITY, "pending")

        await cleanup_timers(hass)


@pytest.mark.asyncio
async def test_trigger_delay_multiple_concurrent_sensors(
    hass: Any, enable_custom_integrations: Any
):
    """Test multiple sensors with different trigger_delays activating concurrently."""
    area = AreaFactory.create_area(
        area_id="area_1",
        modes=["armed_away"],
        armed_away_entry_time=30,
    )

    sensor1 = SensorFactory.create_door_sensor(
        entity_id="binary_sensor.front_door",
        name="Front Door",
        use_exit_delay=False,
        use_entry_delay=True,
        trigger_delay=10,  # 10 second delay
    )

    sensor2 = SensorFactory.create_door_sensor(
        entity_id="binary_sensor.back_door",
        name="Back Door",
        use_exit_delay=False,
        use_entry_delay=True,
        trigger_delay=3,  # 3 second delay
    )

    storage, entry = setup_alarmo_entry(
        hass,
        areas=[area],
        sensors=[sensor1, sensor2],
        entry_id="test_trigger_delay_concurrent",
    )

    with patch_alarmo_integration_dependencies(storage):
        await hass.config_entries.async_setup(entry.entry_id)
        await hass.async_block_till_done()

        hass.states.async_set(ALARM_ENTITY, "disarmed")
        hass.states.async_set("binary_sensor.front_door", "off")
        hass.states.async_set("binary_sensor.back_door", "off")
        await hass.async_block_till_done()

        await hass.services.async_call(
            "alarmo",
            "arm",
            {"entity_id": ALARM_ENTITY, "code": "1234", "mode": "away"},
            blocking=True,
        )
        await hass.async_block_till_done()
        await advance_time(hass, 11)
        assert_alarm_state(hass, ALARM_ENTITY, "armed_away")

        # Activate both sensors at the same time
        hass.states.async_set("binary_sensor.front_door", "on")
        hass.states.async_set("binary_sensor.back_door", "on")
        await hass.async_block_till_done()

        # After 2 seconds, neither should have triggered yet
        await advance_time(hass, 2)
        assert_alarm_state(hass, ALARM_ENTITY, "armed_away")

        # After 5 seconds total, back_door (3s delay) should have triggered
        await advance_time(hass, 3)
        await hass.async_block_till_done()
        assert_alarm_state(hass, ALARM_ENTITY, "pending")

        await cleanup_timers(hass)


@pytest.mark.asyncio
async def test_trigger_delay_cancellation_on_sensor_off(
    hass: Any, enable_custom_integrations: Any
):
    """Test that trigger delay timer is cancelled when sensor turns off."""
    area = AreaFactory.create_area(
        area_id="area_1",
        modes=["armed_away"],
        armed_away_entry_time=30,
    )

    sensor = SensorFactory.create_door_sensor(
        entity_id="binary_sensor.front_door",
        name="Front Door",
        use_exit_delay=False,
        use_entry_delay=True,
        trigger_delay=10,
    )

    storage, entry = setup_alarmo_entry(
        hass, areas=[area], sensors=[sensor], entry_id="test_trigger_delay_cancel"
    )

    with patch_alarmo_integration_dependencies(storage):
        await hass.config_entries.async_setup(entry.entry_id)
        await hass.async_block_till_done()

        hass.states.async_set(ALARM_ENTITY, "disarmed")
        hass.states.async_set("binary_sensor.front_door", "off")
        await hass.async_block_till_done()

        await hass.services.async_call(
            "alarmo",
            "arm",
            {"entity_id": ALARM_ENTITY, "code": "1234", "mode": "away"},
            blocking=True,
        )
        await hass.async_block_till_done()
        await advance_time(hass, 11)
        assert_alarm_state(hass, ALARM_ENTITY, "armed_away")

        # Activate sensor
        hass.states.async_set("binary_sensor.front_door", "on")
        await hass.async_block_till_done()
        await advance_time(hass, 5)  # Wait 5 seconds (delay is 10)

        # Deactivate sensor - should cancel pending trigger
        hass.states.async_set("binary_sensor.front_door", "off")
        await hass.async_block_till_done()

        # Wait past the original trigger time
        await advance_time(hass, 10)
        await hass.async_block_till_done()

        # Should still be armed_away
        assert_alarm_state(hass, ALARM_ENTITY, "armed_away")

        await cleanup_timers(hass)


@pytest.mark.asyncio
async def test_trigger_delay_with_always_on_sensor(
    hass: Any, enable_custom_integrations: Any
):
    """Test that always_on sensor respects trigger_delay."""
    area = AreaFactory.create_area(
        area_id="area_1",
        modes=["armed_away"],
        armed_away_entry_time=30,
    )

    sensor = SensorFactory.create_door_sensor(
        entity_id="binary_sensor.smoke_detector",
        name="Smoke Detector",
        use_exit_delay=False,
        use_entry_delay=False,
        always_on=True,
        trigger_delay=5,
    )

    storage, entry = setup_alarmo_entry(
        hass, areas=[area], sensors=[sensor], entry_id="test_trigger_delay_always_on"
    )

    with patch_alarmo_integration_dependencies(storage):
        await hass.config_entries.async_setup(entry.entry_id)
        await hass.async_block_till_done()

        hass.states.async_set(ALARM_ENTITY, "disarmed")
        hass.states.async_set("binary_sensor.smoke_detector", "off")
        await hass.async_block_till_done()

        await hass.services.async_call(
            "alarmo",
            "arm",
            {"entity_id": ALARM_ENTITY, "code": "1234", "mode": "away"},
            blocking=True,
        )
        await hass.async_block_till_done()
        await advance_time(hass, 11)
        assert_alarm_state(hass, ALARM_ENTITY, "armed_away")

        # Activate always_on sensor
        hass.states.async_set("binary_sensor.smoke_detector", "on")
        await hass.async_block_till_done()

        # After 2 seconds, should still be armed (trigger_delay not expired)
        await advance_time(hass, 2)
        assert_alarm_state(hass, ALARM_ENTITY, "armed_away")

        # After trigger_delay expires, should trigger immediately (no entry delay)
        await advance_time(hass, 5)
        await hass.async_block_till_done()
        assert_alarm_state(hass, ALARM_ENTITY, "triggered")

        await cleanup_timers(hass)


@pytest.mark.asyncio
async def test_trigger_delay_no_delay_configured(
    hass: Any, enable_custom_integrations: Any
):
    """Test sensor without trigger_delay triggers immediately."""
    area = AreaFactory.create_area(
        area_id="area_1",
        modes=["armed_away"],
        armed_away_entry_time=30,
    )

    sensor = SensorFactory.create_door_sensor(
        entity_id="binary_sensor.front_door",
        name="Front Door",
        use_exit_delay=False,
        use_entry_delay=True,
        trigger_delay=None,  # No trigger delay
    )

    storage, entry = setup_alarmo_entry(
        hass, areas=[area], sensors=[sensor], entry_id="test_no_trigger_delay"
    )

    with patch_alarmo_integration_dependencies(storage):
        await hass.config_entries.async_setup(entry.entry_id)
        await hass.async_block_till_done()

        hass.states.async_set(ALARM_ENTITY, "disarmed")
        hass.states.async_set("binary_sensor.front_door", "off")
        await hass.async_block_till_done()

        await hass.services.async_call(
            "alarmo",
            "arm",
            {"entity_id": ALARM_ENTITY, "code": "1234", "mode": "away"},
            blocking=True,
        )
        await hass.async_block_till_done()
        await advance_time(hass, 11)
        assert_alarm_state(hass, ALARM_ENTITY, "armed_away")

        # Activate sensor - should trigger immediately
        hass.states.async_set("binary_sensor.front_door", "on")
        await hass.async_block_till_done()
        await advance_time(hass, PROCESSING_TIME)

        # Should be pending immediately
        assert_alarm_state(hass, ALARM_ENTITY, "pending")

        await cleanup_timers(hass)


@pytest.mark.asyncio
async def test_trigger_delay_with_sensor_group(
    hass: Any, enable_custom_integrations: Any
):
    """Test trigger_delay with sensor groups - each sensor delay applies individually."""
    area = AreaFactory.create_area(
        area_id="area_1",
        modes=["armed_away"],
        armed_away_entry_time=30,
    )

    sensor1 = SensorFactory.create_door_sensor(
        entity_id="binary_sensor.motion_1",
        name="Motion 1",
        use_exit_delay=False,
        use_entry_delay=True,
        trigger_delay=3,
    )

    sensor2 = SensorFactory.create_door_sensor(
        entity_id="binary_sensor.motion_2",
        name="Motion 2",
        use_exit_delay=False,
        use_entry_delay=True,
        trigger_delay=3,
    )

    group = SensorGroupFactory.create_sensor_group(
        group_id="motion_group",
        name="Motion Group",
        entities=["binary_sensor.motion_1", "binary_sensor.motion_2"],
        timeout=60,
        event_count=2,
    )

    storage, entry = setup_alarmo_entry(
        hass,
        areas=[area],
        sensors=[sensor1, sensor2],
        sensor_groups=[group],
        entry_id="test_trigger_delay_group",
    )

    with patch_alarmo_integration_dependencies(storage):
        await hass.config_entries.async_setup(entry.entry_id)
        await hass.async_block_till_done()

        hass.states.async_set(ALARM_ENTITY, "disarmed")
        hass.states.async_set("binary_sensor.motion_1", "off")
        hass.states.async_set("binary_sensor.motion_2", "off")
        await hass.async_block_till_done()

        await hass.services.async_call(
            "alarmo",
            "arm",
            {"entity_id": ALARM_ENTITY, "code": "1234", "mode": "away"},
            blocking=True,
        )
        await hass.async_block_till_done()
        await advance_time(hass, 11)
        assert_alarm_state(hass, ALARM_ENTITY, "armed_away")

        # Activate first sensor
        hass.states.async_set("binary_sensor.motion_1", "on")
        await hass.async_block_till_done()

        # Wait for first sensor's trigger_delay
        await advance_time(hass, 4)
        # Single sensor in group doesn't trigger
        assert_alarm_state(hass, ALARM_ENTITY, "armed_away")

        # Activate second sensor
        hass.states.async_set("binary_sensor.motion_2", "on")
        await hass.async_block_till_done()

        # Wait for second sensor's trigger_delay
        await advance_time(hass, 4)
        await hass.async_block_till_done()

        # Now both sensors have passed their trigger_delay, group should trigger
        assert_alarm_state(hass, ALARM_ENTITY, "pending")

        await cleanup_timers(hass)


@pytest.mark.asyncio
async def test_trigger_delay_with_entry_delay_interaction(
    hass: Any, enable_custom_integrations: Any
):
    """Test trigger_delay followed by entry_delay - delays are sequential."""
    area = AreaFactory.create_area(
        area_id="area_1",
        modes=["armed_away"],
        armed_away_entry_time=10,  # 10 second entry delay
    )

    sensor = SensorFactory.create_door_sensor(
        entity_id="binary_sensor.front_door",
        name="Front Door",
        use_exit_delay=False,
        use_entry_delay=True,
        trigger_delay=5,  # 5 second trigger delay
    )

    storage, entry = setup_alarmo_entry(
        hass, areas=[area], sensors=[sensor], entry_id="test_trigger_entry_delay"
    )

    with patch_alarmo_integration_dependencies(storage):
        await hass.config_entries.async_setup(entry.entry_id)
        await hass.async_block_till_done()

        hass.states.async_set(ALARM_ENTITY, "disarmed")
        hass.states.async_set("binary_sensor.front_door", "off")
        await hass.async_block_till_done()

        await hass.services.async_call(
            "alarmo",
            "arm",
            {"entity_id": ALARM_ENTITY, "code": "1234", "mode": "away"},
            blocking=True,
        )
        await hass.async_block_till_done()
        await advance_time(hass, 11)
        assert_alarm_state(hass, ALARM_ENTITY, "armed_away")

        # Activate sensor
        hass.states.async_set("binary_sensor.front_door", "on")
        await hass.async_block_till_done()

        # Wait for trigger_delay to expire (5s) plus buffer
        await advance_time(hass, 6)
        await hass.async_block_till_done()

        # Should now be pending (trigger_delay expired, entry_delay started)
        assert_alarm_state(hass, ALARM_ENTITY, "pending")

        # After entry_delay expires (10s) - triggered
        await advance_time(hass, 11)
        await hass.async_block_till_done()
        assert_alarm_state(hass, ALARM_ENTITY, "triggered")

        await cleanup_timers(hass)


@pytest.mark.asyncio
async def test_trigger_delay_rapid_on_off_cycles(
    hass: Any, enable_custom_integrations: Any
):
    """Test rapid on/off cycles don't accumulate or cause false triggers."""
    area = AreaFactory.create_area(
        area_id="area_1",
        modes=["armed_away"],
        armed_away_entry_time=30,
    )

    sensor = SensorFactory.create_door_sensor(
        entity_id="binary_sensor.front_door",
        name="Front Door",
        use_exit_delay=False,
        use_entry_delay=True,
        trigger_delay=5,
    )

    storage, entry = setup_alarmo_entry(
        hass, areas=[area], sensors=[sensor], entry_id="test_rapid_cycles"
    )

    with patch_alarmo_integration_dependencies(storage):
        await hass.config_entries.async_setup(entry.entry_id)
        await hass.async_block_till_done()

        hass.states.async_set(ALARM_ENTITY, "disarmed")
        hass.states.async_set("binary_sensor.front_door", "off")
        await hass.async_block_till_done()

        await hass.services.async_call(
            "alarmo",
            "arm",
            {"entity_id": ALARM_ENTITY, "code": "1234", "mode": "away"},
            blocking=True,
        )
        await hass.async_block_till_done()
        await advance_time(hass, 11)
        assert_alarm_state(hass, ALARM_ENTITY, "armed_away")

        # Rapid on/off cycles (simulating glitchy sensor)
        for _ in range(5):
            hass.states.async_set("binary_sensor.front_door", "on")
            await hass.async_block_till_done()
            await advance_time(hass, 1)  # 1 second on
            hass.states.async_set("binary_sensor.front_door", "off")
            await hass.async_block_till_done()
            await advance_time(hass, 1)  # 1 second off

        # Wait to ensure no delayed triggers
        await advance_time(hass, 10)
        await hass.async_block_till_done()

        # Should still be armed - no trigger from rapid cycles
        assert_alarm_state(hass, ALARM_ENTITY, "armed_away")

        await cleanup_timers(hass)
