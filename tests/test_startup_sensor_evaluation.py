"""Test sensor evaluation on Home Assistant startup/restart."""

from typing import Any

import pytest
from homeassistant.core import State
from pytest_homeassistant_custom_component.common import mock_restore_cache

from tests.helpers import (
    advance_time,
    cleanup_timers,
    assert_alarm_state,
    setup_alarmo_entry,
    patch_alarmo_integration_dependencies,
)
from tests.factories import AreaFactory, SensorFactory

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
async def test_sensor_open_on_startup_triggers_alarm(
    hass: Any, enable_custom_integrations: Any
) -> None:
    """Test that an open sensor on startup triggers the alarm when HA restarts.

    Scenario: Sensor is open when integration starts with alarm in armed state.
    Expected: Alarm should go to pending (with entry delay) or triggered state.
    """
    area = AreaFactory.create_area(
        area_id="area_1",
        name="Test Area 1",
        armed_away_entry_time=10,  # 10 second entry delay
    )
    sensor_config = SensorFactory.create_door_sensor(
        entity_id=GENERIC_DOOR_SENSOR,
        name="Generic Area 1 Door",
        area="area_1",
        modes=["armed_away", "armed_home"],
        always_on=False,
        auto_bypass=False,
        auto_bypass_modes=[],
        allow_open=False,
        trigger_unavailable=False,
        arm_on_close=False,
        use_exit_delay=True,
        use_entry_delay=True,
    )
    storage, entry = setup_alarmo_entry(
        hass,
        areas=[area],
        sensors=[sensor_config],
        entry_id="test_startup_open_sensor",
    )

    # Mock the alarm entity's last state (simulates it was armed before HA went down)
    mock_restore_cache(
        hass,
        [
            State(ALARM_ENTITY, "armed_away", {"arm_mode": "armed_away"}),
        ],
    )

    with patch_alarmo_integration_dependencies(storage):
        # Set sensor to open BEFORE integration starts
        #   (simulates sensor opened while HA was down)
        hass.states.async_set(GENERIC_DOOR_SENSOR, "on")
        await hass.async_block_till_done()

        # Now setup the integration
        #   it should restore armed state and detect the open sensor
        await hass.config_entries.async_setup(entry.entry_id)
        await hass.async_block_till_done()

        # Give the startup evaluation a moment to process
        await advance_time(hass, 1)

        # The alarm should now be in pending state due to the open sensor
        # with entry delay from the sensor configuration
        assert_alarm_state(hass, ALARM_ENTITY, "pending")

        # Verify it progresses to triggered after entry delay
        await advance_time(hass, area["modes"]["armed_away"]["entry_time"] + 1)
        assert_alarm_state(hass, ALARM_ENTITY, "triggered")

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
async def test_sensor_open_on_startup_immediate_trigger(
    hass: Any, enable_custom_integrations: Any
) -> None:
    """Test that an open sensor without entry delay triggers immediately on startup.

    Scenario: Sensor (no entry delay) is open when integration starts with alarm armed.
    Expected: Alarm should go directly to triggered (no pending state).
    """
    area = AreaFactory.create_area(area_id="area_1", name="Test Area 1")
    sensor_config = SensorFactory.create_door_sensor(
        entity_id=GENERIC_DOOR_SENSOR,
        name="Generic Area 1 Door",
        area="area_1",
        modes=["armed_away", "armed_home"],
        always_on=False,
        auto_bypass=False,
        auto_bypass_modes=[],
        allow_open=False,
        trigger_unavailable=False,
        arm_on_close=False,
        use_exit_delay=True,
        use_entry_delay=False,  # No entry delay - immediate trigger
    )
    storage, entry = setup_alarmo_entry(
        hass,
        areas=[area],
        sensors=[sensor_config],
        entry_id="test_startup_immediate",
    )

    # Mock the alarm entity's last state
    mock_restore_cache(
        hass,
        [
            State(ALARM_ENTITY, "armed_away", {"arm_mode": "armed_away"}),
        ],
    )

    with patch_alarmo_integration_dependencies(storage):
        # Set sensor to open BEFORE integration starts
        hass.states.async_set(GENERIC_DOOR_SENSOR, "on")
        await hass.async_block_till_done()

        # Setup the integration
        await hass.config_entries.async_setup(entry.entry_id)
        await hass.async_block_till_done()

        # Give the startup evaluation a moment to process
        await advance_time(hass, 1)

        # Should go directly to triggered (no entry delay)
        assert_alarm_state(hass, ALARM_ENTITY, "triggered")

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
async def test_sensor_group_threshold_not_met_on_startup(
    hass: Any, enable_custom_integrations: Any
) -> None:
    """Test that group sensors below threshold don't trigger on startup.

    Scenario: Only 1 sensor in 2-sensor group is open when integration starts.
    Expected: Alarm stays armed (threshold not met).
    """
    area = AreaFactory.create_area(area_id="area_1", name="Test Area 1")
    sensors = [
        SensorFactory.create_door_sensor(
            entity_id=SENSOR_1,
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
        entry_id="test_startup_group_threshold_not_met",
        sensor_groups=sensor_groups,
    )

    # Mock the alarm entity's last state
    mock_restore_cache(
        hass,
        [
            State(ALARM_ENTITY, "armed_away", {"arm_mode": "armed_away"}),
        ],
    )

    with patch_alarmo_integration_dependencies(storage):
        # Set only one sensor open BEFORE integration starts (threshold not met)
        hass.states.async_set(SENSOR_1, "on")  # Only 1 of 2 required sensors open
        hass.states.async_set(SENSOR_2, "off")
        await hass.async_block_till_done()

        # Setup the integration
        await hass.config_entries.async_setup(entry.entry_id)
        await hass.async_block_till_done()

        # Give the startup evaluation time to process
        await advance_time(hass, 2)

        # Alarm should still be armed (group threshold not met)
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
async def test_sensor_group_threshold_met_on_startup_triggers_alarm(
    hass: Any, enable_custom_integrations: Any
) -> None:
    """Test that group sensors meeting threshold trigger alarm on startup.

    Scenario: 2 sensors in 2-sensor group are open when integration starts.
    Expected: Alarm triggers (threshold met).
    """
    area = AreaFactory.create_area(area_id="area_1", name="Test Area 1")
    sensors = [
        SensorFactory.create_door_sensor(
            entity_id=SENSOR_1,
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
            use_entry_delay=False,  # Immediate trigger for simplicity
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
            use_entry_delay=False,  # Immediate trigger for simplicity
        ),
    ]
    sensor_groups = get_sensor_group()
    storage, entry = setup_alarmo_entry(
        hass,
        areas=[area],
        sensors=sensors,
        entry_id="test_startup_group_threshold_met",
        sensor_groups=sensor_groups,
    )

    # Mock the alarm entity's last state
    mock_restore_cache(
        hass,
        [
            State(ALARM_ENTITY, "armed_away", {"arm_mode": "armed_away"}),
        ],
    )

    with patch_alarmo_integration_dependencies(storage):
        # Set both sensors open BEFORE integration starts (threshold met)
        hass.states.async_set(SENSOR_1, "on")  # Both sensors open
        hass.states.async_set(SENSOR_2, "on")
        await hass.async_block_till_done()

        # Setup the integration
        await hass.config_entries.async_setup(entry.entry_id)
        await hass.async_block_till_done()

        # Give the startup evaluation time to process
        await advance_time(hass, 1)

        # Alarm should be triggered (group threshold met, immediate trigger)
        assert_alarm_state(hass, ALARM_ENTITY, "triggered")

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
async def test_sensor_closed_on_startup_no_trigger(
    hass: Any, enable_custom_integrations: Any
) -> None:
    """Test that closed sensors on startup don't trigger the alarm.

    Scenario: Sensors are closed when integration starts with alarm armed.
    Expected: Alarm stays armed.
    """
    area = AreaFactory.create_area(area_id="area_1", name="Test Area 1")
    sensor_config = SensorFactory.create_door_sensor(
        entity_id=GENERIC_DOOR_SENSOR,
        name="Generic Area 1 Door",
        area="area_1",
        modes=["armed_away", "armed_home"],
        always_on=False,
        auto_bypass=False,
        auto_bypass_modes=[],
        allow_open=False,
        trigger_unavailable=False,
        arm_on_close=False,
        use_exit_delay=True,
        use_entry_delay=True,
    )
    storage, entry = setup_alarmo_entry(
        hass,
        areas=[area],
        sensors=[sensor_config],
        entry_id="test_startup_closed_sensor",
    )

    # Mock the alarm entity's last state
    mock_restore_cache(
        hass,
        [
            State(ALARM_ENTITY, "armed_away", {"arm_mode": "armed_away"}),
        ],
    )

    with patch_alarmo_integration_dependencies(storage):
        # Set sensor closed BEFORE integration starts
        hass.states.async_set(GENERIC_DOOR_SENSOR, "off")
        await hass.async_block_till_done()

        # Setup the integration
        await hass.config_entries.async_setup(entry.entry_id)
        await hass.async_block_till_done()

        # Give the startup evaluation time to process
        await advance_time(hass, 2)

        # Alarm should still be armed (no violations)
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
async def test_sensor_transition_from_unknown_to_open_triggers_alarm(
    hass: Any, enable_custom_integrations: Any
) -> None:
    """Test that transitioning from unknown to open triggers the alarm.

    Scenario: Sensor recovers from unknown state to open while alarm is armed.
    Expected: Alarm should trigger (entry delay then triggered).
    """
    area = AreaFactory.create_area(
        area_id="area_1",
        name="Test Area 1",
        armed_away_entry_time=10,
    )
    sensor_config = SensorFactory.create_door_sensor(
        entity_id=GENERIC_DOOR_SENSOR,
        name="Generic Area 1 Door",
        area="area_1",
        modes=["armed_away", "armed_home"],
        always_on=False,
        auto_bypass=False,
        auto_bypass_modes=[],
        allow_open=False,
        trigger_unavailable=False,
        arm_on_close=False,
        use_exit_delay=True,
        use_entry_delay=True,
    )
    storage, entry = setup_alarmo_entry(
        hass,
        areas=[area],
        sensors=[sensor_config],
        entry_id="test_unknown_to_open",
    )

    # Mock the alarm entity's last state (simulates it was armed before)
    mock_restore_cache(
        hass,
        [
            State(ALARM_ENTITY, "armed_away", {"arm_mode": "armed_away"}),
        ],
    )

    with patch_alarmo_integration_dependencies(storage):
        # Set sensor to unknown BEFORE integration starts
        hass.states.async_set(GENERIC_DOOR_SENSOR, "unknown")
        await hass.async_block_till_done()

        # Setup the integration
        await hass.config_entries.async_setup(entry.entry_id)
        await hass.async_block_till_done()

        # Give the startup evaluation a moment to process
        await advance_time(hass, 1)

        # Alarm should be armed (sensor was unknown, skipped on startup)
        assert_alarm_state(hass, ALARM_ENTITY, "armed_away")

        # Now change sensor from unknown to open (simulates recovery)
        hass.states.async_set(GENERIC_DOOR_SENSOR, "on")
        await hass.async_block_till_done()
        await advance_time(hass, 1)

        # Alarm should now be in pending (entry delay)
        assert_alarm_state(hass, ALARM_ENTITY, "pending")

        # Advance past entry delay to trigger
        await advance_time(hass, area["modes"]["armed_away"]["entry_time"] + 1)
        assert_alarm_state(hass, ALARM_ENTITY, "triggered")

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
async def test_sensor_transition_from_unknown_to_closed_does_not_trigger(
    hass: Any, enable_custom_integrations: Any
) -> None:
    """Test that transitioning from unknown to closed does not trigger alarm.

    Scenario: Sensor recovers from unknown state to closed (safe state) while
    alarm is armed.
    Expected: Alarm stays armed (initial state behavior preserved for safe states).
    """
    area = AreaFactory.create_area(area_id="area_1", name="Test Area 1")
    sensor_config = SensorFactory.create_door_sensor(
        entity_id=GENERIC_DOOR_SENSOR,
        name="Generic Area 1 Door",
        area="area_1",
        modes=["armed_away", "armed_home"],
        always_on=False,
        auto_bypass=False,
        auto_bypass_modes=[],
        allow_open=False,
        trigger_unavailable=False,
        arm_on_close=False,
        use_exit_delay=True,
        use_entry_delay=True,
    )
    storage, entry = setup_alarmo_entry(
        hass,
        areas=[area],
        sensors=[sensor_config],
        entry_id="test_unknown_to_closed",
    )

    # Mock the alarm entity's last state
    mock_restore_cache(
        hass,
        [
            State(ALARM_ENTITY, "armed_away", {"arm_mode": "armed_away"}),
        ],
    )

    with patch_alarmo_integration_dependencies(storage):
        # Set sensor to unknown BEFORE integration starts
        hass.states.async_set(GENERIC_DOOR_SENSOR, "unknown")
        await hass.async_block_till_done()

        # Setup the integration
        await hass.config_entries.async_setup(entry.entry_id)
        await hass.async_block_till_done()
        await advance_time(hass, 1)

        # Alarm should be armed (sensor was unknown)
        assert_alarm_state(hass, ALARM_ENTITY, "armed_away")

        # Change sensor from unknown to closed (safe state)
        hass.states.async_set(GENERIC_DOOR_SENSOR, "off")
        await hass.async_block_till_done()
        await advance_time(hass, 1)

        # Alarm should still be armed (unknown -> closed treated as initial state)
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
async def test_sensor_unknown_to_open_with_allow_open_does_not_trigger(
    hass: Any, enable_custom_integrations: Any
) -> None:
    """Test that unknown to open does not trigger when allow_open is set.

    Scenario: User arms with a window open (allow_open=True), restarts HA.
    Sensor was unknown on restart, then recovers to open.
    Expected: Alarm stays armed (allow_open is respected for unknown->open).
    """
    area = AreaFactory.create_area(
        area_id="area_1",
        name="Test Area 1",
        armed_away_entry_time=10,
    )
    sensor_config = SensorFactory.create_door_sensor(
        entity_id=GENERIC_DOOR_SENSOR,
        name="Generic Area 1 Door",
        area="area_1",
        modes=["armed_away", "armed_home"],
        always_on=False,
        auto_bypass=False,
        auto_bypass_modes=[],
        allow_open=True,
        trigger_unavailable=False,
        arm_on_close=False,
        use_exit_delay=True,
        use_entry_delay=True,
    )
    storage, entry = setup_alarmo_entry(
        hass,
        areas=[area],
        sensors=[sensor_config],
        entry_id="test_unknown_to_open_allow_open",
    )

    # Mock the alarm entity's last state
    mock_restore_cache(
        hass,
        [
            State(ALARM_ENTITY, "armed_away", {"arm_mode": "armed_away"}),
        ],
    )

    with patch_alarmo_integration_dependencies(storage):
        # Set sensor to unknown BEFORE integration starts
        hass.states.async_set(GENERIC_DOOR_SENSOR, "unknown")
        await hass.async_block_till_done()

        # Setup the integration
        await hass.config_entries.async_setup(entry.entry_id)
        await hass.async_block_till_done()
        await advance_time(hass, 1)

        # Alarm should be armed (sensor was unknown)
        assert_alarm_state(hass, ALARM_ENTITY, "armed_away")

        # Change sensor from unknown to open
        #   allow_open=True means this should be treated as initial state
        hass.states.async_set(GENERIC_DOOR_SENSOR, "on")
        await hass.async_block_till_done()
        await advance_time(hass, 1)

        # Alarm should still be armed (allow_open respected)
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
async def test_sensor_normal_open_after_unknown_still_triggers(
    hass: Any, enable_custom_integrations: Any
) -> None:
    """Test that a normal open after unknown->closed still triggers alarm.

    Scenario: Sensor recovers from unknown to closed (ignored), then opens.
    Expected: Alarm should trigger on the second transition (regression check).
    """
    area = AreaFactory.create_area(
        area_id="area_1",
        name="Test Area 1",
        armed_away_entry_time=10,
    )
    sensor_config = SensorFactory.create_door_sensor(
        entity_id=GENERIC_DOOR_SENSOR,
        name="Generic Area 1 Door",
        area="area_1",
        modes=["armed_away", "armed_home"],
        always_on=False,
        auto_bypass=False,
        auto_bypass_modes=[],
        allow_open=False,
        trigger_unavailable=False,
        arm_on_close=False,
        use_exit_delay=True,
        use_entry_delay=True,
    )
    storage, entry = setup_alarmo_entry(
        hass,
        areas=[area],
        sensors=[sensor_config],
        entry_id="test_unknown_then_normal_open",
    )

    # Mock the alarm entity's last state
    mock_restore_cache(
        hass,
        [
            State(ALARM_ENTITY, "armed_away", {"arm_mode": "armed_away"}),
        ],
    )

    with patch_alarmo_integration_dependencies(storage):
        # Set sensor to unknown BEFORE integration starts
        hass.states.async_set(GENERIC_DOOR_SENSOR, "unknown")
        await hass.async_block_till_done()

        # Setup the integration
        await hass.config_entries.async_setup(entry.entry_id)
        await hass.async_block_till_done()
        await advance_time(hass, 1)

        # Alarm should be armed (sensor was unknown)
        assert_alarm_state(hass, ALARM_ENTITY, "armed_away")

        # Step 1: Unknown -> closed (treated as initial state, no trigger)
        hass.states.async_set(GENERIC_DOOR_SENSOR, "off")
        await hass.async_block_till_done()
        await advance_time(hass, 1)

        assert_alarm_state(hass, ALARM_ENTITY, "armed_away")

        # Step 2: Closed -> open (normal trigger)
        hass.states.async_set(GENERIC_DOOR_SENSOR, "on")
        await hass.async_block_till_done()
        await advance_time(hass, 1)

        # Alarm should be in pending (entry delay)
        assert_alarm_state(hass, ALARM_ENTITY, "pending")

        # Advance past entry delay to trigger
        await advance_time(hass, area["modes"]["armed_away"]["entry_time"] + 1)
        assert_alarm_state(hass, ALARM_ENTITY, "triggered")

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
