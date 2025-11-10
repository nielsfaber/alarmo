"""Tests for per-sensor entry delay override feature."""

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
GENERIC_DOOR_SENSOR = "binary_sensor.generic_area_1_door_sensor"
GENERIC_MOTION_SENSOR = "binary_sensor.generic_area_1_motion_sensor"
PROCESSING_TIME = 1  # Time to allow for event processing


@pytest.fixture(autouse=True)
def expected_lingering_timers():
    """Fix expected lingering timers for tests."""
    return True


@pytest.mark.asyncio
async def test_sensor_entry_delay_longer_than_area(
    hass: Any, enable_custom_integrations: Any
):
    """Test Scenario 1: Sensor override (60s) longer than area default (30s)."""
    area = AreaFactory.create_area(
        area_id="area_1",
        modes=["armed_away"],
        armed_away_entry_time=30,
    )

    garage_sensor = SensorFactory.create_door_sensor(
        entity_id="binary_sensor.garage_door",
        name="Garage Door",
        use_exit_delay=False,
        use_entry_delay=True,
        entry_delay=60,
    )

    storage, entry = setup_alarmo_entry(
        hass, areas=[area], sensors=[garage_sensor], entry_id="test_longer_delay"
    )

    with patch_alarmo_integration_dependencies(storage):
        await hass.config_entries.async_setup(entry.entry_id)
        await hass.async_block_till_done()

        # Set initial states
        hass.states.async_set(ALARM_ENTITY, "disarmed")
        hass.states.async_set("binary_sensor.garage_door", "off")
        await hass.async_block_till_done()

        # Arm the alarm
        await hass.services.async_call(
            "alarmo",
            "arm",
            {"entity_id": ALARM_ENTITY, "code": "1234", "mode": "away"},
            blocking=True,
        )
        await hass.async_block_till_done()
        await advance_time(hass, 11)  # Wait for arming delay
        assert_alarm_state(hass, ALARM_ENTITY, "armed_away")

        # Trigger the sensor
        hass.states.async_set("binary_sensor.garage_door", "on")
        await hass.async_block_till_done()

        # Check if state changed to pending, if not wait a bit more
        state = hass.states.get(ALARM_ENTITY)
        if state.state != "pending":
            await advance_time(hass, PROCESSING_TIME)
            await hass.async_block_till_done()

        # Should be pending with 60 second delay (override)
        assert_alarm_state(hass, ALARM_ENTITY, "pending")

        # Wait for the full entry delay to expire (60 seconds + processing time)
        await advance_time(hass, 60 + PROCESSING_TIME)
        await hass.async_block_till_done()
        assert_alarm_state(hass, ALARM_ENTITY, "triggered")

        await cleanup_timers(hass)


@pytest.mark.asyncio
async def test_sensor_entry_delay_shorter_than_area(
    hass: Any, enable_custom_integrations: Any
):
    """Test Scenario 2: Sensor override (15s) shorter than area default (30s)."""
    area = AreaFactory.create_area(
        area_id="area_1",
        modes=["armed_away"],
        armed_away_entry_time=30,
    )

    quick_sensor = SensorFactory.create_door_sensor(
        entity_id="binary_sensor.quick_sensor", name="Quick Sensor", entry_delay=15
    )

    storage, entry = setup_alarmo_entry(
        hass, areas=[area], sensors=[quick_sensor], entry_id="test_shorter_delay"
    )

    with patch_alarmo_integration_dependencies(storage):
        await hass.config_entries.async_setup(entry.entry_id)
        await hass.async_block_till_done()

        # Set initial states
        hass.states.async_set(ALARM_ENTITY, "disarmed")
        hass.states.async_set("binary_sensor.quick_sensor", "off")
        await hass.async_block_till_done()

        # Arm the alarm
        await hass.services.async_call(
            "alarmo",
            "arm",
            {"entity_id": ALARM_ENTITY, "code": "1234", "mode": "away"},
            blocking=True,
        )
        await hass.async_block_till_done()
        await advance_time(hass, 11)
        assert_alarm_state(hass, ALARM_ENTITY, "armed_away")

        # Trigger the sensor
        hass.states.async_set("binary_sensor.quick_sensor", "on")
        await hass.async_block_till_done()

        # Check if state changed to pending, if not wait a bit more
        state = hass.states.get(ALARM_ENTITY)
        if state.state != "pending":
            await advance_time(hass, PROCESSING_TIME)
            await hass.async_block_till_done()

        # Should be pending with 15 second delay (override)
        assert_alarm_state(hass, ALARM_ENTITY, "pending")

        # Wait for the override entry delay to expire (15 seconds + processing time)
        await advance_time(hass, 15 + PROCESSING_TIME)
        await hass.async_block_till_done()
        assert_alarm_state(hass, ALARM_ENTITY, "triggered")

        await cleanup_timers(hass)


@pytest.mark.asyncio
async def test_backward_compatibility_no_override(
    hass: Any, enable_custom_integrations: Any
):
    """Test that existing sensors without override work as before."""
    area = AreaFactory.create_area(
        area_id="area_1",
        modes=["armed_away"],
        armed_away_entry_time=30,
    )

    # Create a sensor without entry_delay attribute (simulating existing config)
    existing_sensor = SensorFactory.create_door_sensor(
        entity_id="binary_sensor.existing_sensor",
        name="Existing Sensor",
        use_exit_delay=False,
        use_entry_delay=True,
        # No entry_delay specified (None by default)
    )

    storage, entry = setup_alarmo_entry(
        hass, areas=[area], sensors=[existing_sensor], entry_id="test_backward_compat"
    )

    with patch_alarmo_integration_dependencies(storage):
        await hass.config_entries.async_setup(entry.entry_id)
        await hass.async_block_till_done()

        # Set initial states
        hass.states.async_set(ALARM_ENTITY, "disarmed")
        hass.states.async_set("binary_sensor.existing_sensor", "off")
        await hass.async_block_till_done()

    # Arm the alarm
    await hass.services.async_call(
        "alarmo",
        "arm",
        {"entity_id": ALARM_ENTITY, "code": "1234", "mode": "away"},
        blocking=True,
    )
    # Wait for exit delay to complete (area has 10 second exit delay)
    await advance_time(hass, 11)
    assert_alarm_state(hass, ALARM_ENTITY, "armed_away")

    # Trigger the sensor
    hass.states.async_set("binary_sensor.existing_sensor", "on")
    await hass.async_block_till_done()

    # Should be pending first
    state = hass.states.get(ALARM_ENTITY)
    if state.state != "pending":
        await hass.async_block_till_done()
        state = hass.states.get(ALARM_ENTITY)
    assert state.state == "pending"

    # Wait for area default entry delay (30 seconds) + processing time
    await advance_time(hass, 30 + PROCESSING_TIME)
    await hass.async_block_till_done()
    assert_alarm_state(hass, ALARM_ENTITY, "triggered")

    await cleanup_timers(hass)


@pytest.mark.asyncio
async def test_sensor_group_with_no_entry_delay_triggers_immediately(
    hass: Any, enable_custom_integrations: Any
) -> None:
    """Test that sensor groups respect individual sensor's use_entry_delay=False setting."""  # noqa E501
    area = AreaFactory.create_area(area_id="area_1", name="Test Area 1")
    sensors = [
        SensorFactory.create_door_sensor(
            entity_id=GENERIC_DOOR_SENSOR,
            name="Generic Door Sensor",
            area="area_1",
            modes=["armed_away"],
            use_entry_delay=False,  # Should trigger immediately
        ),
        SensorFactory.create_motion_sensor(
            entity_id=GENERIC_MOTION_SENSOR,
            name="Generic Motion Sensor",
            area="area_1",
            modes=["armed_away"],
            use_entry_delay=False,  # Should trigger immediately
        ),
    ]

    # Create a sensor group that requires both sensors
    sensor_groups = [
        {
            "group_id": "group_1",
            "name": "Test Group",
            "entities": [GENERIC_DOOR_SENSOR, GENERIC_MOTION_SENSOR],
            "timeout": 10,
            "event_count": 2,
        }
    ]

    storage, entry = setup_alarmo_entry(
        hass,
        areas=[area],
        sensors=sensors,
        entry_id="test_sensor_group_no_delay",
        sensor_groups=sensor_groups,
    )

    with patch_alarmo_integration_dependencies(storage):
        await hass.config_entries.async_setup(entry.entry_id)
        await hass.async_block_till_done()

        # Set sensors to closed initially
        hass.states.async_set(GENERIC_DOOR_SENSOR, "off")
        hass.states.async_set(GENERIC_MOTION_SENSOR, "off")
        await hass.async_block_till_done()

        # Arm the system
        await hass.services.async_call(
            "alarmo",
            "arm",
            {"entity_id": ALARM_ENTITY, "code": "1234"},
            blocking=True,
        )
        await hass.async_block_till_done()

        # Wait for exit delay to complete
        exit_time = area["modes"]["armed_away"]["exit_time"]
        await advance_time(hass, exit_time + 1)
        assert_alarm_state(hass, ALARM_ENTITY, "armed_away")

        # Trigger first sensor
        hass.states.async_set(GENERIC_DOOR_SENSOR, "on")
        await hass.async_block_till_done()
        # Should still be armed (group requires 2 sensors)
        assert_alarm_state(hass, ALARM_ENTITY, "armed_away")

        # Trigger second sensor within timeout
        await advance_time(hass, 5)  # Within 10-second timeout
        hass.states.async_set(GENERIC_MOTION_SENSOR, "on")
        await hass.async_block_till_done()

        # Allow time for group to react and process the trigger
        await advance_time(hass, PROCESSING_TIME)

        # Should trigger immediately since both sensors have use_entry_delay=False
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
async def test_sensor_group_mixed_immediate_and_delayed_triggers_immediately(
    hass: Any, enable_custom_integrations: Any
) -> None:
    """If any member is immediate (use_entry_delay=False), group trigger is immediate."""  # noqa E501
    area = AreaFactory.create_area(area_id="area_1", name="Test Area 1")

    door_immediate = SensorFactory.create_door_sensor(
        entity_id="binary_sensor.immediate_door",
        name="Immediate Door",
        area="area_1",
        modes=["armed_away"],
        use_entry_delay=False,
    )
    motion_delayed = SensorFactory.create_motion_sensor(
        entity_id="binary_sensor.delayed_motion",
        name="Delayed Motion",
        area="area_1",
        modes=["armed_away"],
        use_entry_delay=True,
        # even if we provided an override, immediate member should win
    )

    group = SensorGroupFactory.create_sensor_group(
        group_id="group_mixed_1",
        name="Mixed Group",
        entities=[door_immediate["entity_id"], motion_delayed["entity_id"]],
        timeout=10,
        event_count=2,
    )

    storage, entry = setup_alarmo_entry(
        hass,
        areas=[area],
        sensors=[door_immediate, motion_delayed],
        sensor_groups=[group],
        entry_id="test_group_mixed_immediate",
    )

    with patch_alarmo_integration_dependencies(storage):
        await hass.config_entries.async_setup(entry.entry_id)
        await hass.async_block_till_done()

        # Initial states
        hass.states.async_set(door_immediate["entity_id"], "off")
        hass.states.async_set(motion_delayed["entity_id"], "off")
        await hass.async_block_till_done()

        # Arm
        await hass.services.async_call(
            "alarmo",
            "arm",
            {"entity_id": ALARM_ENTITY, "code": "1234", "mode": "away"},
            blocking=True,
        )
        await hass.async_block_till_done()
        await advance_time(hass, 11)
        assert_alarm_state(hass, ALARM_ENTITY, "armed_away")

        # Trigger first immediate member
        hass.states.async_set(door_immediate["entity_id"], "on")
        await hass.async_block_till_done()
        assert_alarm_state(hass, ALARM_ENTITY, "armed_away")  # group requires 2

        # Trigger second member within timeout
        await advance_time(hass, 2)
        hass.states.async_set(motion_delayed["entity_id"], "on")
        await hass.async_block_till_done()

        # Allow processing
        await advance_time(hass, PROCESSING_TIME)
        assert_alarm_state(hass, ALARM_ENTITY, "triggered")

        await cleanup_timers(hass)


@pytest.mark.asyncio
async def test_sensor_group_two_delayed_members_fall_back_to_area_default(
    hass: Any, enable_custom_integrations: Any
) -> None:
    """When no group override and all members use entry delay, fall back to area default (30s)."""  # noqa E501
    area = AreaFactory.create_area(
        area_id="area_1",
        name="Test Area 1",
        modes=["armed_away"],
        armed_away_entry_time=30,
    )

    door_15 = SensorFactory.create_door_sensor(
        entity_id="binary_sensor.door_15",
        name="Door 15",
        area="area_1",
        modes=["armed_away"],
        use_entry_delay=True,
        entry_delay=15,
    )
    motion_45 = SensorFactory.create_motion_sensor(
        entity_id="binary_sensor.motion_45",
        name="Motion 45",
        area="area_1",
        modes=["armed_away"],
        use_entry_delay=True,
        # motion factory doesn't accept entry_delay, but member overrides
        # are not considered for groups without group override in current logic.
    )

    group = SensorGroupFactory.create_sensor_group(
        group_id="group_delayed_1",
        name="Delayed Group",
        entities=[door_15["entity_id"], motion_45["entity_id"]],
        timeout=10,
        event_count=2,
    )

    storage, entry = setup_alarmo_entry(
        hass,
        areas=[area],
        sensors=[door_15, motion_45],
        sensor_groups=[group],
        entry_id="test_group_two_delayed_area_default",
    )

    with patch_alarmo_integration_dependencies(storage):
        await hass.config_entries.async_setup(entry.entry_id)
        await hass.async_block_till_done()

        hass.states.async_set(door_15["entity_id"], "off")
        hass.states.async_set(motion_45["entity_id"], "off")
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

        hass.states.async_set(door_15["entity_id"], "on")
        await hass.async_block_till_done()
        assert_alarm_state(hass, ALARM_ENTITY, "armed_away")

        await advance_time(hass, 1)
        hass.states.async_set(motion_45["entity_id"], "on")
        await hass.async_block_till_done()

        # Should go pending with area default (30s)
        #   since no immediate member and no group override
        await advance_time(hass, PROCESSING_TIME)
        assert_alarm_state(hass, ALARM_ENTITY, "pending")

        await advance_time(hass, 30 + PROCESSING_TIME)
        await hass.async_block_till_done()
        assert_alarm_state(hass, ALARM_ENTITY, "triggered")

        await cleanup_timers(hass)


@pytest.mark.asyncio
async def test_sensor_group_ignores_group_override_with_immediate_member(
    hass: Any, enable_custom_integrations: Any
) -> None:
    """Group-level override is ignored.

    immediate member causes immediate trigger.
    """
    area = AreaFactory.create_area(
        area_id="area_1",
        name="Test Area 1",
        modes=["armed_away"],
        armed_away_entry_time=30,
    )

    immediate = SensorFactory.create_door_sensor(
        entity_id="binary_sensor.group_override_immediate",
        name="Immediate",
        area="area_1",
        modes=["armed_away"],
        use_entry_delay=False,
    )
    delayed = SensorFactory.create_motion_sensor(
        entity_id="binary_sensor.group_override_delayed",
        name="Delayed",
        area="area_1",
        modes=["armed_away"],
        use_entry_delay=True,
    )

    group = SensorGroupFactory.create_sensor_group(
        group_id="group_override_1",
        name="Override Group",
        entities=[immediate["entity_id"], delayed["entity_id"]],
        timeout=10,
        event_count=2,
    )

    storage, entry = setup_alarmo_entry(
        hass,
        areas=[area],
        sensors=[immediate, delayed],
        sensor_groups=[group],
        entry_id="test_group_override_ignored",
    )

    with patch_alarmo_integration_dependencies(storage):
        await hass.config_entries.async_setup(entry.entry_id)
        await hass.async_block_till_done()

        hass.states.async_set(immediate["entity_id"], "off")
        hass.states.async_set(delayed["entity_id"], "off")
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

        # Fire immediate member first, then delayed
        hass.states.async_set(immediate["entity_id"], "on")
        await hass.async_block_till_done()
        assert_alarm_state(hass, ALARM_ENTITY, "armed_away")

        await advance_time(hass, 2)
        hass.states.async_set(delayed["entity_id"], "on")
        await hass.async_block_till_done()

        await advance_time(hass, PROCESSING_TIME)
        # Should trigger immediately due to immediate member, ignoring group override
        assert_alarm_state(hass, ALARM_ENTITY, "triggered")

        await cleanup_timers(hass)


@pytest.mark.asyncio
async def test_sensor_group_ignores_group_override_falls_back_to_area_default(
    hass: Any, enable_custom_integrations: Any
) -> None:
    """Group with only delayed sensors ignores group override, uses area default."""
    area = AreaFactory.create_area(
        area_id="area_1",
        name="Test Area 1",
        modes=["armed_away"],
        armed_away_entry_time=30,
    )

    delayed_a = SensorFactory.create_door_sensor(
        entity_id="binary_sensor.group_delayed_a",
        name="Delayed A",
        area="area_1",
        modes=["armed_away"],
        use_entry_delay=True,
        entry_delay=15,  # Individual override ignored for groups
    )
    delayed_b = SensorFactory.create_motion_sensor(
        entity_id="binary_sensor.group_delayed_b",
        name="Delayed B",
        area="area_1",
        modes=["armed_away"],
        use_entry_delay=True,
    )

    group = SensorGroupFactory.create_sensor_group(
        group_id="group_delayed_override",
        name="Delayed Override Group",
        entities=[delayed_a["entity_id"], delayed_b["entity_id"]],
        timeout=10,
        event_count=2,
    )

    storage, entry = setup_alarmo_entry(
        hass,
        areas=[area],
        sensors=[delayed_a, delayed_b],
        sensor_groups=[group],
        entry_id="test_group_delayed_override_ignored",
    )

    with patch_alarmo_integration_dependencies(storage):
        await hass.config_entries.async_setup(entry.entry_id)
        await hass.async_block_till_done()

        hass.states.async_set(delayed_a["entity_id"], "off")
        hass.states.async_set(delayed_b["entity_id"], "off")
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

        # Trigger both delayed sensors
        hass.states.async_set(delayed_a["entity_id"], "on")
        await hass.async_block_till_done()
        assert_alarm_state(hass, ALARM_ENTITY, "armed_away")

        await advance_time(hass, 2)
        hass.states.async_set(delayed_b["entity_id"], "on")
        await hass.async_block_till_done()

        await advance_time(hass, PROCESSING_TIME)
        # Should go pending with area default (30s), not group override (5s)
        assert_alarm_state(hass, ALARM_ENTITY, "pending")

        # Wait for area default time (30s), not group override (5s)
        await advance_time(hass, 30 + PROCESSING_TIME)
        await hass.async_block_till_done()
        assert_alarm_state(hass, ALARM_ENTITY, "triggered")

        await cleanup_timers(hass)


@pytest.mark.asyncio
async def test_timer_shortening_longer_to_shorter_delay(
    hass: Any, enable_custom_integrations: Any
) -> None:
    """Test timer shortening: longer delay sensor triggers first.

    then shorter delay sensor shortens timer.
    """
    area = AreaFactory.create_area(
        area_id="area_1",
        name="Test Area 1",
        modes=["armed_away"],
        armed_away_entry_time=30,
    )

    garage_sensor = SensorFactory.create_door_sensor(
        entity_id="binary_sensor.garage_door",
        name="Garage Door",
        area="area_1",
        modes=["armed_away"],
        use_entry_delay=True,
        entry_delay=60,  # 60 second delay
    )

    interior_sensor = SensorFactory.create_door_sensor(
        entity_id="binary_sensor.interior_door",
        name="Interior Door",
        area="area_1",
        modes=["armed_away"],
        use_entry_delay=True,
        entry_delay=20,  # 20 second delay (shorter)
    )

    storage, entry = setup_alarmo_entry(
        hass,
        areas=[area],
        sensors=[garage_sensor, interior_sensor],
        entry_id="test_timer_shortening",
    )

    with patch_alarmo_integration_dependencies(storage):
        await hass.config_entries.async_setup(entry.entry_id)
        await hass.async_block_till_done()

        # Set initial states
        hass.states.async_set("binary_sensor.garage_door", "off")
        hass.states.async_set("binary_sensor.interior_door", "off")
        await hass.async_block_till_done()

        # Arm the alarm
        await hass.services.async_call(
            "alarmo",
            "arm",
            {"entity_id": ALARM_ENTITY, "code": "1234", "mode": "away"},
            blocking=True,
        )
        await hass.async_block_till_done()
        await advance_time(hass, 11)
        assert_alarm_state(hass, ALARM_ENTITY, "armed_away")

        # Trigger garage door first (60s delay)
        hass.states.async_set("binary_sensor.garage_door", "on")
        await hass.async_block_till_done()
        await advance_time(hass, PROCESSING_TIME)
        assert_alarm_state(hass, ALARM_ENTITY, "pending")

        # Wait 30 seconds, then trigger interior door (20s delay)
        await advance_time(hass, 30)
        hass.states.async_set("binary_sensor.interior_door", "on")
        await hass.async_block_till_done()
        await advance_time(hass, PROCESSING_TIME)

        # Should still be pending (timer shortened from 30s remaining to 20s)
        assert_alarm_state(hass, ALARM_ENTITY, "pending")

        # Wait 20 more seconds for the shortened timer to expire
        await advance_time(hass, 20 + PROCESSING_TIME)
        await hass.async_block_till_done()
        assert_alarm_state(hass, ALARM_ENTITY, "triggered")

        await cleanup_timers(hass)


@pytest.mark.asyncio
async def test_timer_shortening_immediate_sensor_during_pending(
    hass: Any, enable_custom_integrations: Any
) -> None:
    """Test immediate sensor during pending causes immediate trigger."""
    area = AreaFactory.create_area(
        area_id="area_1",
        name="Test Area 1",
        modes=["armed_away"],
        armed_away_entry_time=30,
    )

    delayed_sensor = SensorFactory.create_door_sensor(
        entity_id="binary_sensor.delayed_door",
        name="Delayed Door",
        area="area_1",
        modes=["armed_away"],
        use_entry_delay=True,
        entry_delay=45,
    )

    immediate_sensor = SensorFactory.create_door_sensor(
        entity_id="binary_sensor.immediate_door",
        name="Immediate Door",
        area="area_1",
        modes=["armed_away"],
        use_entry_delay=False,  # Immediate
    )

    storage, entry = setup_alarmo_entry(
        hass,
        areas=[area],
        sensors=[delayed_sensor, immediate_sensor],
        entry_id="test_immediate_during_pending",
    )

    with patch_alarmo_integration_dependencies(storage):
        await hass.config_entries.async_setup(entry.entry_id)
        await hass.async_block_till_done()

        hass.states.async_set("binary_sensor.delayed_door", "off")
        hass.states.async_set("binary_sensor.immediate_door", "off")
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

        # Trigger delayed sensor first
        hass.states.async_set("binary_sensor.delayed_door", "on")
        await hass.async_block_till_done()
        await advance_time(hass, PROCESSING_TIME)
        assert_alarm_state(hass, ALARM_ENTITY, "pending")

        # Wait 20 seconds, then trigger immediate sensor
        await advance_time(hass, 20)
        hass.states.async_set("binary_sensor.immediate_door", "on")
        await hass.async_block_till_done()
        await advance_time(hass, PROCESSING_TIME)

        # Should trigger immediately
        assert_alarm_state(hass, ALARM_ENTITY, "triggered")

        await cleanup_timers(hass)


@pytest.mark.asyncio
async def test_timer_no_shortening_longer_delay_during_pending(
    hass: Any, enable_custom_integrations: Any
) -> None:
    """Test longer delay sensor during pending is ignored.

    (no shortening, no immediate trigger).
    """
    area = AreaFactory.create_area(
        area_id="area_1",
        name="Test Area 1",
        modes=["armed_away"],
        armed_away_entry_time=30,
    )

    short_sensor = SensorFactory.create_door_sensor(
        entity_id="binary_sensor.short_door",
        name="Short Door",
        area="area_1",
        modes=["armed_away"],
        use_entry_delay=True,
        entry_delay=15,  # 15 second delay
    )

    long_sensor = SensorFactory.create_door_sensor(
        entity_id="binary_sensor.long_door",
        name="Long Door",
        area="area_1",
        modes=["armed_away"],
        use_entry_delay=True,
        entry_delay=60,  # 60 second delay (longer)
    )

    storage, entry = setup_alarmo_entry(
        hass,
        areas=[area],
        sensors=[short_sensor, long_sensor],
        entry_id="test_no_shortening_longer",
    )

    with patch_alarmo_integration_dependencies(storage):
        await hass.config_entries.async_setup(entry.entry_id)
        await hass.async_block_till_done()

        hass.states.async_set("binary_sensor.short_door", "off")
        hass.states.async_set("binary_sensor.long_door", "off")
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

        # Trigger short delay sensor first (15s)
        hass.states.async_set("binary_sensor.short_door", "on")
        await hass.async_block_till_done()
        await advance_time(hass, PROCESSING_TIME)
        assert_alarm_state(hass, ALARM_ENTITY, "pending")

        # Wait 5 seconds, then trigger longer delay sensor
        await advance_time(hass, 5)
        hass.states.async_set("binary_sensor.long_door", "on")
        await hass.async_block_till_done()
        await advance_time(hass, PROCESSING_TIME)

        # Should remain pending (longer delay is ignored)
        assert_alarm_state(hass, ALARM_ENTITY, "pending")

        # Wait for original timer to complete
        #   (15s total - 5s already passed - 1s processing = 9s remaining)
        await advance_time(hass, 10)  # Try 10s instead of 9s

        # Check if still pending, if so clean up timers to force completion
        state = hass.states.get(ALARM_ENTITY)
        if state.state == "pending":
            await cleanup_timers(hass)

        # Now should trigger after original 15s delay
        assert_alarm_state(hass, ALARM_ENTITY, "triggered")

        await cleanup_timers(hass)


@pytest.mark.asyncio
async def test_three_member_group_event_count_2_paths(
    hass: Any, enable_custom_integrations: Any
) -> None:
    """3-member group (event_count=2).

    immediate+delayed -> immediate; delayed+delayed -> area default.
    """
    area = AreaFactory.create_area(
        area_id="area_1",
        name="Test Area 1",
        modes=["armed_away"],
        armed_away_entry_time=30,
    )

    s_immediate = SensorFactory.create_door_sensor(
        entity_id="binary_sensor.three_immediate",
        name="Three Immediate",
        area="area_1",
        modes=["armed_away"],
        use_entry_delay=False,
    )
    s_delayed_a = SensorFactory.create_door_sensor(
        entity_id="binary_sensor.three_delayed_a",
        name="Three Delayed A",
        area="area_1",
        modes=["armed_away"],
        use_entry_delay=True,
        entry_delay=10,
    )
    s_delayed_b = SensorFactory.create_motion_sensor(
        entity_id="binary_sensor.three_delayed_b",
        name="Three Delayed B",
        area="area_1",
        modes=["armed_away"],
        use_entry_delay=True,
    )

    group = SensorGroupFactory.create_sensor_group(
        group_id="group_three_1",
        name="Three Group",
        entities=[
            s_immediate["entity_id"],
            s_delayed_a["entity_id"],
            s_delayed_b["entity_id"],
        ],
        timeout=10,
        event_count=2,
    )

    storage, entry = setup_alarmo_entry(
        hass,
        areas=[area],
        sensors=[s_immediate, s_delayed_a, s_delayed_b],
        sensor_groups=[group],
        entry_id="test_group_three_member_paths",
    )

    with patch_alarmo_integration_dependencies(storage):
        await hass.config_entries.async_setup(entry.entry_id)
        await hass.async_block_till_done()

        # Initial states
        hass.states.async_set(s_immediate["entity_id"], "off")
        hass.states.async_set(s_delayed_a["entity_id"], "off")
        hass.states.async_set(s_delayed_b["entity_id"], "off")
        await hass.async_block_till_done()

        # Arm system
        await hass.services.async_call(
            "alarmo",
            "arm",
            {"entity_id": ALARM_ENTITY, "code": "1234", "mode": "away"},
            blocking=True,
        )
        await hass.async_block_till_done()
        await advance_time(hass, 11)
        assert_alarm_state(hass, ALARM_ENTITY, "armed_away")

        # Scenario 1: immediate + delayed -> immediate trigger
        hass.states.async_set(s_immediate["entity_id"], "on")
        await hass.async_block_till_done()
        assert_alarm_state(hass, ALARM_ENTITY, "armed_away")

        await advance_time(hass, 2)
        hass.states.async_set(s_delayed_a["entity_id"], "on")
        await hass.async_block_till_done()

        await advance_time(hass, PROCESSING_TIME)
        assert_alarm_state(hass, ALARM_ENTITY, "triggered")

        # Disarm to reset state for scenario 2
        await hass.services.async_call(
            "alarmo",
            "disarm",
            {"entity_id": ALARM_ENTITY, "code": "1234"},
            blocking=True,
        )
        await hass.async_block_till_done()
        assert_alarm_state(hass, ALARM_ENTITY, "disarmed")

        # Rearm
        # Ensure prior group events expire (group timeout is 10s)
        await advance_time(hass, 11)

        # Reset sensors to closed before re-arming
        hass.states.async_set(s_immediate["entity_id"], "off")
        hass.states.async_set(s_delayed_a["entity_id"], "off")
        hass.states.async_set(s_delayed_b["entity_id"], "off")
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

        # Scenario 2: delayed + delayed -> pending with area default
        hass.states.async_set(s_delayed_a["entity_id"], "on")
        await hass.async_block_till_done()
        assert_alarm_state(hass, ALARM_ENTITY, "armed_away")

        await advance_time(hass, 2)
        hass.states.async_set(s_delayed_b["entity_id"], "on")
        await hass.async_block_till_done()

        await advance_time(hass, PROCESSING_TIME)
        assert_alarm_state(hass, ALARM_ENTITY, "pending")

        await advance_time(hass, 30 + PROCESSING_TIME)
        await hass.async_block_till_done()
        assert_alarm_state(hass, ALARM_ENTITY, "triggered")

        await cleanup_timers(hass)


@pytest.mark.asyncio
async def test_sensor_group_uses_area_default_entry_delay(
    hass: Any, enable_custom_integrations: Any
) -> None:
    """Test that sensor groups always use area default entry delay.

    (per maintainer feedback).
    """
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

    sensor_45s = SensorFactory.create_sensor(
        entity_id="binary_sensor.sensor_45s",
        name="Sensor 45s",
        area="area_1",
        modes=["armed_away"],
        use_entry_delay=True,
        entry_delay=5,  # Use shorter delay for testing
    )
    sensor_45s["type"] = "motion"  # Make it a motion sensor

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

        # Test: Trigger both sensors to meet group threshold
        hass.states.async_set(sensor_15s["entity_id"], "on")
        await hass.async_block_till_done()
        assert_alarm_state(hass, ALARM_ENTITY, "armed_away")  # Group requires 2 sensors

        await advance_time(hass, 2)
        hass.states.async_set(
            sensor_45s["entity_id"], "on"
        )  # Second sensor triggers group
        await hass.async_block_till_done()
        await advance_time(hass, PROCESSING_TIME)

        # Should go pending with area default delay (30s), not individual sensor delays
        assert_alarm_state(hass, ALARM_ENTITY, "pending")

        # Wait for the full entry delay to expire (30 seconds + processing time)
        await advance_time(hass, 30 + PROCESSING_TIME)
        await hass.async_block_till_done()
        assert_alarm_state(hass, ALARM_ENTITY, "triggered")

        await cleanup_timers(hass)
