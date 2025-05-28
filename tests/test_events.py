"""Test Alarmo Events."""

from typing import Any
import pytest

from homeassistant.core import Event
from homeassistant.helpers.dispatcher import async_dispatcher_connect

from tests.factories import AreaFactory, SensorFactory
from tests.helpers import (
    advance_time,
    assert_alarm_state,
    cleanup_timers,
    patch_alarmo_integration_dependencies,
    setup_alarmo_entry,
)

from custom_components.alarmo import const

# Test constants
ALARM_ENTITY = "alarm_control_panel.test_area_1"
BLOCKING_SENSOR = "binary_sensor.blocking_door"
AREA_ID = "area_1"
ALARM_CODE = "1234"
LONG_EXIT_DELAY = 30
SHORT_EXIT_DELAY = 5
IMMEDIATE_ARMING = 0
PROCESSING_TIME = 1  # Time to allow for event processing
EXPECTED_SINGLE_EVENT = 1
EXPECTED_DUAL_EVENTS = 2
EXPECTED_NO_EVENTS = 0


@pytest.mark.asyncio
async def test_failed_to_arm_event_fired_when_sensor_blocks_arming(
    hass: Any, enable_custom_integrations: Any
) -> None:
    """Test that alarmo_failed_to_arm event is fired when a sensor blocks arming."""

    # Set up event capture
    events: list[Event] = []
    exit_delay = LONG_EXIT_DELAY

    def capture_event(event: Event) -> None:
        """Capture the alarmo_failed_to_arm event."""
        events.append(event)

    # Listen for the alarmo_failed_to_arm event
    hass.bus.async_listen("alarmo_failed_to_arm", capture_event)

    # Create area with exit delay
    area = AreaFactory.create_area(
        area_id=AREA_ID,
        modes=["armed_away"],
        armed_away_exit_time=exit_delay,
        armed_away_enabled=True,
    )

    # Create sensor that blocks arming (allow_open=False, use_exit_delay=True)
    blocking_sensor = SensorFactory.create_door_sensor(
        entity_id=BLOCKING_SENSOR,
        name="Blocking Door Sensor",
        area=AREA_ID,
        modes=["armed_away"],
        allow_open=False,  # This will block arming if sensor is open
        use_exit_delay=True,
        use_entry_delay=True,
        auto_bypass=False,  # Don't auto-bypass
    )

    # Set up the Alarmo entry
    storage, entry = setup_alarmo_entry(
        hass,
        areas=[area],
        sensors=[blocking_sensor],
        entry_id="test_failed_to_arm_event",
    )

    with patch_alarmo_integration_dependencies(storage):
        await hass.config_entries.async_setup(entry.entry_id)
        await hass.async_block_till_done()

        # Initialize alarm state
        hass.states.async_set(ALARM_ENTITY, "disarmed")
        hass.states.async_set(BLOCKING_SENSOR, "off")
        await hass.async_block_till_done()

        # Set sensor to "on" (open) to block arming
        hass.states.async_set(BLOCKING_SENSOR, "on")
        await hass.async_block_till_done()

        # Clear any events from setup
        events.clear()

        # Try to arm the alarm - this should fail due to the open sensor
        await hass.services.async_call(
            "alarmo",
            "arm",
            {"entity_id": ALARM_ENTITY, "code": ALARM_CODE},
            blocking=True,
        )
        await hass.async_block_till_done()

        assert_alarm_state(hass, ALARM_ENTITY, "arming")
        await advance_time(hass, exit_delay + PROCESSING_TIME)

        assert_alarm_state(hass, ALARM_ENTITY, "disarmed")

        # Verify that the alarmo_failed_to_arm event was fired
        assert len(events) == EXPECTED_SINGLE_EVENT, f"Expected {EXPECTED_SINGLE_EVENT} event, got {len(events)}"

        event_data = events[0].data

        # Verify event data contains the expected information
        assert event_data["reason"] == "open_sensors", f"Expected reason 'open_sensors', got {event_data.get('reason')}"
        assert event_data["area_id"] == AREA_ID, f"Expected area_id '{AREA_ID}', got {event_data.get('area_id')}"
        assert BLOCKING_SENSOR in event_data["sensors"], f"Expected {BLOCKING_SENSOR} in sensors list, got {event_data.get('sensors')}"

        # Additional verification that the sensor is in the event
        assert len(event_data["sensors"]) == EXPECTED_SINGLE_EVENT, f"Expected {EXPECTED_SINGLE_EVENT} sensor in event, got {len(event_data['sensors'])}"

        await cleanup_timers(hass)


@pytest.mark.asyncio
async def test_failed_to_arm_event_with_multiple_blocking_sensors(
    hass: Any, enable_custom_integrations: Any
) -> None:
    """Test that alarmo_failed_to_arm event includes all blocking sensors."""

    events: list[Event] = []

    def capture_event(event: Event) -> None:
        """Capture the alarmo_failed_to_arm event."""
        events.append(event)

    # Listen for the alarmo_failed_to_arm event
    hass.bus.async_listen("alarmo_failed_to_arm", capture_event)

    sensor1 = "binary_sensor.door_1"
    sensor2 = "binary_sensor.window_1"

    area = AreaFactory.create_area(
        area_id=AREA_ID,
        modes=["armed_away"],
        armed_away_exit_time=IMMEDIATE_ARMING,  # Immediate arming
        armed_away_enabled=True,
    )

    # Create multiple sensors that will block arming
    sensors = [
        SensorFactory.create_door_sensor(
            entity_id=sensor1,
            name="Door 1",
            area=AREA_ID,
            modes=["armed_away"],
            allow_open=False,
            use_exit_delay=False,
            auto_bypass=False,
        ),
        SensorFactory.create_window_sensor(
            entity_id=sensor2,
            name="Window 1",
            area=AREA_ID,
            modes=["armed_away"],
            allow_open=False,
            use_exit_delay=False,
            auto_bypass=False,
        ),
    ]

    storage, entry = setup_alarmo_entry(
        hass,
        areas=[area],
        sensors=sensors,
        entry_id="test_multiple_blocking_sensors",
    )

    with patch_alarmo_integration_dependencies(storage):
        await hass.config_entries.async_setup(entry.entry_id)
        await hass.async_block_till_done()

        hass.states.async_set(ALARM_ENTITY, "disarmed")
        hass.states.async_set(sensor1, "on")  # Door open
        hass.states.async_set(sensor2, "on")  # Window open
        await hass.async_block_till_done()

        events.clear()

        # Try to arm - should fail immediately since both sensors are open
        await hass.services.async_call(
            "alarmo",
            "arm",
            {"entity_id": ALARM_ENTITY, "code": ALARM_CODE},
            blocking=True,
        )
        await hass.async_block_till_done()

        # Since there's no exit delay and sensors are blocking, should remain disarmed
        assert_alarm_state(hass, ALARM_ENTITY, "disarmed")

        # Verify that the alarmo_failed_to_arm event was fired
        assert len(events) == EXPECTED_SINGLE_EVENT, f"Expected {EXPECTED_SINGLE_EVENT} event, got {len(events)}"

        event_data = events[0].data

        # Verify event data
        assert event_data["reason"] == "open_sensors"
        assert event_data["area_id"] == AREA_ID
        assert len(event_data["sensors"]) == EXPECTED_DUAL_EVENTS, f"Expected {EXPECTED_DUAL_EVENTS} sensors in event, got {len(event_data['sensors'])}"
        assert sensor1 in event_data["sensors"], f"Expected {sensor1} in sensors list"
        assert sensor2 in event_data["sensors"], f"Expected {sensor2} in sensors list"

        await cleanup_timers(hass)


@pytest.mark.asyncio
async def test_no_failed_to_arm_event_when_arming_succeeds(
    hass: Any, enable_custom_integrations: Any
) -> None:
    """Test that no alarmo_failed_to_arm event is fired when arming succeeds."""

    events: list[Event] = []
    exit_delay = SHORT_EXIT_DELAY

    def capture_event(event: Event) -> None:
        """Capture the alarmo_failed_to_arm event."""
        events.append(event)

    # Listen for the alarmo_failed_to_arm event
    hass.bus.async_listen("alarmo_failed_to_arm", capture_event)

    area = AreaFactory.create_area(
        area_id=AREA_ID,
        modes=["armed_away"],
        armed_away_exit_time=exit_delay,
        armed_away_enabled=True,
    )

    # Create sensor that allows arming
    sensor = SensorFactory.create_door_sensor(
        entity_id=BLOCKING_SENSOR,
        name="Door Sensor",
        area=AREA_ID,
        modes=["armed_away"],
        allow_open=True,  # Allow sensor to be open during arming
        use_exit_delay=True,
        use_entry_delay=True,
    )

    # Set up the Alarmo entry
    storage, entry = setup_alarmo_entry(
        hass,
        areas=[area],
        sensors=[sensor],
        entry_id="test_no_failed_event",
    )

    with patch_alarmo_integration_dependencies(storage):
        await hass.config_entries.async_setup(entry.entry_id)
        await hass.async_block_till_done()

        hass.states.async_set(ALARM_ENTITY, "disarmed")
        hass.states.async_set(BLOCKING_SENSOR, "off")  # Sensor closed
        await hass.async_block_till_done()

        events.clear()

        # Arm the alarm - should succeed
        await hass.services.async_call(
            "alarmo",
            "arm",
            {"entity_id": ALARM_ENTITY, "code": ALARM_CODE},
            blocking=True,
        )
        await hass.async_block_till_done()

        # Should be arming
        assert_alarm_state(hass, ALARM_ENTITY, "arming")

        await advance_time(hass, exit_delay + PROCESSING_TIME)

        # Should be armed
        assert_alarm_state(hass, ALARM_ENTITY, "armed_away")

        # No failed to arm event should have been fired
        assert len(events) == EXPECTED_NO_EVENTS, f"Expected no events, got {len(events)}"

        await cleanup_timers(hass)


@pytest.mark.asyncio
async def test_backend_arm_event_dispatched_on_arming(
    hass: Any, enable_custom_integrations: Any
) -> None:
    """Test that backend ARM event is dispatched during arming process."""

    backend_events: list[dict[str, Any]] = []
    exit_delay = SHORT_EXIT_DELAY

    def capture_backend_event(event_type: str, area_id: str, args: dict[str, Any]) -> None:
        """Capture backend dispatcher events."""
        backend_events.append({
            "event_type": event_type,
            "area_id": area_id,
            "args": args
        })

    # Create area with exit delay
    area = AreaFactory.create_area(
        area_id=AREA_ID,
        modes=["armed_away"],
        armed_away_exit_time=exit_delay,
        armed_away_enabled=True,
    )

    door_sensor = SensorFactory.create_door_sensor(
        entity_id="binary_sensor.front_door",
        name="Front Door",
        area=AREA_ID,
        modes=["armed_away"],
        allow_open=False,
        use_exit_delay=True,
        use_entry_delay=True,
    )

    storage, entry = setup_alarmo_entry(
        hass,
        areas=[area],
        sensors=[door_sensor],
        entry_id="test_backend_arm_event",
    )

    with patch_alarmo_integration_dependencies(storage):
        await hass.config_entries.async_setup(entry.entry_id)
        await hass.async_block_till_done()

        # Connect to backend dispatcher events
        async_dispatcher_connect(hass, "alarmo_event", capture_backend_event)

        hass.states.async_set(ALARM_ENTITY, "disarmed")
        hass.states.async_set("binary_sensor.front_door", "off")
        await hass.async_block_till_done()

        backend_events.clear()

        # Arm the alarm
        await hass.services.async_call(
            "alarmo",
            "arm",
            {"entity_id": ALARM_ENTITY, "code": ALARM_CODE, "mode": "away"},
            blocking=True,
        )
        await hass.async_block_till_done()

        await advance_time(hass, exit_delay + PROCESSING_TIME)

        # Filter for ARM events
        arm_events = [e for e in backend_events if e["event_type"] == const.EVENT_ARM]
        assert len(arm_events) >= EXPECTED_SINGLE_EVENT, f"Expected at least {EXPECTED_SINGLE_EVENT} ARM event, got {len(arm_events)}"

        # Verify the ARM event details
        arm_event = arm_events[0]
        assert arm_event["area_id"] == AREA_ID
        assert "arm_mode" in arm_event["args"]
        assert arm_event["args"]["arm_mode"] == "armed_away"
        assert "delay" in arm_event["args"]
        assert const.ATTR_CONTEXT_ID in arm_event["args"]

        # Verify final state
        assert_alarm_state(hass, ALARM_ENTITY, "armed_away")

        await cleanup_timers(hass)


@pytest.mark.asyncio
async def test_backend_disarm_event_dispatched_on_disarming(
    hass: Any, enable_custom_integrations: Any
) -> None:
    """Test that backend DISARM event is dispatched during disarming process."""

    backend_events: list[dict[str, Any]] = []

    def capture_backend_event(event_type: str, area_id: str, args: dict[str, Any]) -> None:
        """Capture backend dispatcher events."""
        backend_events.append({
            "event_type": event_type,
            "area_id": area_id,
            "args": args
        })

    # Create area with no exit delay for quick arming
    area = AreaFactory.create_area(
        area_id=AREA_ID,
        modes=["armed_away"],
        armed_away_exit_time=IMMEDIATE_ARMING,
        armed_away_enabled=True,
    )

    door_sensor = SensorFactory.create_door_sensor(
        entity_id="binary_sensor.front_door",
        name="Front Door",
        area=AREA_ID,
        modes=["armed_away"],
        allow_open=False,
        use_exit_delay=True,
        use_entry_delay=True,
    )

    storage, entry = setup_alarmo_entry(
        hass,
        areas=[area],
        sensors=[door_sensor],
        entry_id="test_backend_disarm_event",
    )

    with patch_alarmo_integration_dependencies(storage):
        await hass.config_entries.async_setup(entry.entry_id)
        await hass.async_block_till_done()

        async_dispatcher_connect(hass, "alarmo_event", capture_backend_event)

        hass.states.async_set(ALARM_ENTITY, "disarmed")
        hass.states.async_set("binary_sensor.front_door", "off")
        await hass.async_block_till_done()

        await hass.services.async_call(
            "alarmo",
            "arm",
            {"entity_id": ALARM_ENTITY, "code": ALARM_CODE, "mode": "away"},
            blocking=True,
        )
        await hass.async_block_till_done()
        await advance_time(hass, PROCESSING_TIME)
        assert_alarm_state(hass, ALARM_ENTITY, "armed_away")

        # Clear events from arming
        backend_events.clear()

        # Now disarm the alarm
        await hass.services.async_call(
            "alarmo",
            "disarm",
            {"entity_id": ALARM_ENTITY, "code": ALARM_CODE},
            blocking=True,
        )
        await hass.async_block_till_done()

        # Filter for DISARM events
        disarm_events = [e for e in backend_events if e["event_type"] == const.EVENT_DISARM]
        assert len(disarm_events) >= EXPECTED_SINGLE_EVENT, f"Expected at least {EXPECTED_SINGLE_EVENT} DISARM event, got {len(disarm_events)}"

        # Verify the DISARM event details
        disarm_event = disarm_events[0]
        assert disarm_event["area_id"] == AREA_ID
        assert const.ATTR_CONTEXT_ID in disarm_event["args"]

        # Verify final state
        assert_alarm_state(hass, ALARM_ENTITY, "disarmed")

        await cleanup_timers(hass)


@pytest.mark.asyncio
async def test_backend_trigger_event_dispatched_on_triggering(
    hass: Any, enable_custom_integrations: Any
) -> None:
    """Test that backend TRIGGER event is dispatched when alarm is triggered."""

    backend_events: list[dict[str, Any]] = []
    default_entry_delay = 30  # Default entry delay in seconds

    def capture_backend_event(event_type: str, area_id: str, args: dict[str, Any]) -> None:
        """Capture backend dispatcher events."""
        backend_events.append({
            "event_type": event_type,
            "area_id": area_id,
            "args": args
        })

    area = AreaFactory.create_area(
        area_id=AREA_ID,
        modes=["armed_away"],
        armed_away_exit_time=IMMEDIATE_ARMING,
        armed_away_enabled=True,
    )

    # Create door sensor with entry delay
    door_sensor = SensorFactory.create_door_sensor(
        entity_id="binary_sensor.front_door",
        name="Front Door",
        area=AREA_ID,
        modes=["armed_away"],
        allow_open=False,
        use_exit_delay=True,
        use_entry_delay=True,
    )

    storage, entry = setup_alarmo_entry(
        hass,
        areas=[area],
        sensors=[door_sensor],
        entry_id="test_backend_trigger_event",
    )

    with patch_alarmo_integration_dependencies(storage):
        await hass.config_entries.async_setup(entry.entry_id)
        await hass.async_block_till_done()

        async_dispatcher_connect(hass, "alarmo_event", capture_backend_event)

        hass.states.async_set(ALARM_ENTITY, "disarmed")
        hass.states.async_set("binary_sensor.front_door", "off")
        await hass.async_block_till_done()

        await hass.services.async_call(
            "alarmo",
            "arm",
            {"entity_id": ALARM_ENTITY, "code": ALARM_CODE, "mode": "away"},
            blocking=True,
        )
        await hass.async_block_till_done()
        await advance_time(hass, PROCESSING_TIME)
        assert_alarm_state(hass, ALARM_ENTITY, "armed_away")

        backend_events.clear()

        # Trigger the alarm by opening the door
        hass.states.async_set("binary_sensor.front_door", "on")
        await hass.async_block_till_done()

        await advance_time(hass, PROCESSING_TIME)

        # Should be in pending state due to entry delay
        assert_alarm_state(hass, ALARM_ENTITY, "pending")

        # Filter for TRIGGER events
        trigger_events = [e for e in backend_events if e["event_type"] == const.EVENT_TRIGGER]
        assert len(trigger_events) >= EXPECTED_SINGLE_EVENT, f"Expected at least {EXPECTED_SINGLE_EVENT} TRIGGER event, got {len(trigger_events)}"

        # Verify the TRIGGER event details
        trigger_event = trigger_events[0]
        assert trigger_event["area_id"] == AREA_ID
        assert "open_sensors" in trigger_event["args"]
        assert "delay" in trigger_event["args"]

        # Check that the triggering sensor is included
        open_sensors = trigger_event["args"]["open_sensors"]
        assert "binary_sensor.front_door" in open_sensors, \
            f"Expected front_door sensor in trigger event, got {open_sensors}"

        # Let the entry delay complete naturally to reach triggered state
        # Get the entry delay from the trigger event or use default
        entry_delay = trigger_event["args"].get("delay", default_entry_delay)
        await advance_time(hass, entry_delay + PROCESSING_TIME)

        # Should now be triggered
        assert_alarm_state(hass, ALARM_ENTITY, "triggered")

        # Disarm the alarm to clear any remaining timers before cleanup
        await hass.services.async_call(
            "alarmo",
            "disarm",
            {"entity_id": ALARM_ENTITY, "code": ALARM_CODE},
            blocking=True,
        )
        await hass.async_block_till_done()
        assert_alarm_state(hass, ALARM_ENTITY, "disarmed")

        await cleanup_timers(hass)


@pytest.mark.asyncio
async def test_ready_to_arm_modes_changed_event_on_sensor_state_change(
    hass: Any, enable_custom_integrations: Any
) -> None:
    """Test that ready_to_arm_modes_changed events are fired when sensor states affect available arm modes."""

    backend_events: list[dict[str, Any]] = []

    def capture_backend_event(event_type: str, area_id: str, args: dict[str, Any]) -> None:
        """Capture backend dispatcher events."""
        backend_events.append({
            "event_type": event_type,
            "area_id": area_id,
            "args": args
        })

    # Create area with multiple modes
    area = AreaFactory.create_area(
        area_id=AREA_ID,
        modes=["armed_away", "armed_home"],
        armed_away_exit_time=IMMEDIATE_ARMING,
        armed_away_enabled=True,
        armed_home_exit_time=IMMEDIATE_ARMING,
        armed_home_enabled=True,
    )

    # Create a door sensor that's only active in armed_away mode
    door_sensor = SensorFactory.create_door_sensor(
        entity_id="binary_sensor.front_door",
        name="Front Door",
        area=AREA_ID,
        modes=["armed_away"],
        allow_open=False,
        use_exit_delay=True,
        use_entry_delay=True,
    )

    storage, entry = setup_alarmo_entry(
        hass,
        areas=[area],
        sensors=[door_sensor],
        entry_id="test_ready_to_arm_modes_changed",
    )

    with patch_alarmo_integration_dependencies(storage):
        # Connect to backend dispatcher events BEFORE setup
        async_dispatcher_connect(hass, "alarmo_event", capture_backend_event)

        await hass.config_entries.async_setup(entry.entry_id)
        await hass.async_block_till_done()

        hass.states.async_set(ALARM_ENTITY, "disarmed")
        hass.states.async_set("binary_sensor.front_door", "off")
        await hass.async_block_till_done()

        backend_events.clear()

        # Open the door - this should affect only armed_away availability
        hass.states.async_set("binary_sensor.front_door", "on")
        await hass.async_block_till_done()

        await advance_time(hass, PROCESSING_TIME)

        # Check for ready_to_arm_modes_changed events
        ready_events = [e for e in backend_events if e["event_type"] == const.EVENT_READY_TO_ARM_MODES_CHANGED]
        assert len(ready_events) >= EXPECTED_SINGLE_EVENT, f"Expected at least {EXPECTED_SINGLE_EVENT} ready_to_arm_modes_changed event"

        # Verify the event details
        latest_ready_event = ready_events[-1]
        assert latest_ready_event["area_id"] == AREA_ID
        assert const.ATTR_MODES in latest_ready_event["args"]

        # Since door sensor is open and active in armed_away mode,
        # armed_away should not be available but armed_home should still be available
        available_modes = latest_ready_event["args"][const.ATTR_MODES]
        assert "armed_away" not in available_modes, "armed_away should not be available when door is open"
        assert "armed_home" in available_modes, "armed_home should still be available when door is open"

        # Clear events and close the door
        backend_events.clear()
        hass.states.async_set("binary_sensor.front_door", "off")
        await hass.async_block_till_done()

        # Give time for event processing
        await advance_time(hass, PROCESSING_TIME)

        # Check for ready_to_arm_modes_changed events after closing
        ready_events = [e for e in backend_events if e["event_type"] == const.EVENT_READY_TO_ARM_MODES_CHANGED]
        assert len(ready_events) >= EXPECTED_SINGLE_EVENT, "Expected ready_to_arm_modes_changed event after door closes"

        # Both modes should now be available
        latest_ready_event = ready_events[-1]
        available_modes = latest_ready_event["args"][const.ATTR_MODES]
        assert "armed_away" in available_modes, "armed_away should be available when door is closed"
        assert "armed_home" in available_modes, "armed_home should be available when door is closed"

        await cleanup_timers(hass)


@pytest.mark.asyncio
async def test_ready_to_arm_modes_changed_event_with_door_sensor_multiple_modes(
    hass: Any, enable_custom_integrations: Any
) -> None:
    """Test ready_to_arm_modes_changed event with door sensor affecting multiple modes."""

    backend_events: list[dict[str, Any]] = []

    def capture_backend_event(event_type: str, area_id: str, args: dict[str, Any]) -> None:
        """Capture backend dispatcher events."""
        backend_events.append({
            "event_type": event_type,
            "area_id": area_id,
            "args": args
        })

    # Create area with home and away modes
    area = AreaFactory.create_area(
        area_id=AREA_ID,
        modes=["armed_away", "armed_home"],
        armed_away_exit_time=IMMEDIATE_ARMING,
        armed_away_enabled=True,
        armed_home_exit_time=IMMEDIATE_ARMING,
        armed_home_enabled=True,
    )

    # Create door sensor that's active in both away and home modes
    door_sensor = SensorFactory.create_door_sensor(
        entity_id="binary_sensor.living_room_door",
        name="Living Room Door",
        area=AREA_ID,
        modes=["armed_away", "armed_home"],
        allow_open=False,
        use_exit_delay=False,
        use_entry_delay=True,
    )

    storage, entry = setup_alarmo_entry(
        hass,
        areas=[area],
        sensors=[door_sensor],
        entry_id="test_ready_to_arm_door",
    )

    with patch_alarmo_integration_dependencies(storage):
        # Connect to backend dispatcher events BEFORE setup
        async_dispatcher_connect(hass, "alarmo_event", capture_backend_event)

        await hass.config_entries.async_setup(entry.entry_id)
        await hass.async_block_till_done()

        hass.states.async_set(ALARM_ENTITY, "disarmed")
        hass.states.async_set("binary_sensor.living_room_door", "off")
        await hass.async_block_till_done()

        # Force initial ready-to-arm status calculation
        sensor_handler = hass.data[const.DOMAIN]['sensor_handler']
        sensor_handler.update_ready_to_arm_status(AREA_ID)
        await hass.async_block_till_done()

        # Clear any events from setup
        backend_events.clear()

        # Debug: Print current alarm state and sensor registrations
        alarm_entity = hass.data[const.DOMAIN]["areas"][AREA_ID]
        print(f"DEBUG: Alarm entity: {alarm_entity}")
        print(f"DEBUG: Ready to arm modes before: {alarm_entity._ready_to_arm_modes}")
        print(f"DEBUG: Sensor manager config: {hass.data[const.DOMAIN]['sensor_handler']._config}")

        # Trigger door sensor - this should affect both arm modes
        hass.states.async_set("binary_sensor.living_room_door", "on")
        await hass.async_block_till_done()

        # Give time for event processing
        await advance_time(hass, PROCESSING_TIME)

        # Debug: Print state after sensor change
        print(f"DEBUG: Ready to arm modes after sensor trigger: {alarm_entity._ready_to_arm_modes}")
        print(f"DEBUG: All captured events: {[e['event_type'] for e in backend_events]}")

        # Check for ready_to_arm_modes_changed events
        ready_events = [e for e in backend_events if e["event_type"] == const.EVENT_READY_TO_ARM_MODES_CHANGED]
        assert len(ready_events) >= EXPECTED_SINGLE_EVENT, f"Expected at least {EXPECTED_SINGLE_EVENT} ready_to_arm_modes_changed event, got {len(ready_events)}. All events: {[e['event_type'] for e in backend_events]}"

        # Get the latest event
        latest_ready_event = ready_events[-1]
        assert latest_ready_event["area_id"] == AREA_ID
        assert const.ATTR_MODES in latest_ready_event["args"]

        # Since door sensor is active in both modes and doesn't allow_open,
        # neither mode should be available for arming
        available_modes = latest_ready_event["args"][const.ATTR_MODES]
        assert "armed_away" not in available_modes, "armed_away should not be available when door sensor is active"
        assert "armed_home" not in available_modes, "armed_home should not be available when door sensor is active"

        # Clear door and verify modes become available again
        backend_events.clear()
        hass.states.async_set("binary_sensor.living_room_door", "off")
        await hass.async_block_till_done()

        await advance_time(hass, PROCESSING_TIME)

        ready_events = [e for e in backend_events if e["event_type"] == const.EVENT_READY_TO_ARM_MODES_CHANGED]
        assert len(ready_events) >= EXPECTED_SINGLE_EVENT, "Expected ready_to_arm_modes_changed event after door closes"

        latest_ready_event = ready_events[-1]
        available_modes = latest_ready_event["args"][const.ATTR_MODES]
        assert "armed_away" in available_modes, "armed_away should be available when door sensor is clear"
        assert "armed_home" in available_modes, "armed_home should be available when door sensor is clear"

        await cleanup_timers(hass)


@pytest.mark.asyncio
async def test_motion_sensor_not_monitored_when_disarmed(
    hass: Any, enable_custom_integrations: Any
) -> None:
    """Test that motion sensors are NOT monitored when alarm is disarmed (by design)."""

    backend_events: list[dict[str, Any]] = []

    def capture_backend_event(event_type: str, area_id: str, args: dict[str, Any]) -> None:
        """Capture backend dispatcher events."""
        backend_events.append({
            "event_type": event_type,
            "area_id": area_id,
            "args": args
        })

    # Create area with multiple modes
    area = AreaFactory.create_area(
        area_id=AREA_ID,
        modes=["armed_away", "armed_home"],
        armed_away_exit_time=IMMEDIATE_ARMING,
        armed_away_enabled=True,
        armed_home_exit_time=IMMEDIATE_ARMING,
        armed_home_enabled=True,
    )

    # Create motion sensor that's active in both modes
    motion_sensor = SensorFactory.create_motion_sensor(
        entity_id="binary_sensor.living_room_motion",
        name="Living Room Motion",
        area=AREA_ID,
        modes=["armed_away", "armed_home"],
        allow_open=False,
        use_exit_delay=False,
        use_entry_delay=True,
    )

    storage, entry = setup_alarmo_entry(
        hass,
        areas=[area],
        sensors=[motion_sensor],
        entry_id="test_motion_not_monitored_disarmed",
    )

    with patch_alarmo_integration_dependencies(storage):
        # Connect to backend dispatcher events BEFORE setup
        async_dispatcher_connect(hass, "alarmo_event", capture_backend_event)

        await hass.config_entries.async_setup(entry.entry_id)
        await hass.async_block_till_done()

        hass.states.async_set(ALARM_ENTITY, "disarmed")
        hass.states.async_set("binary_sensor.living_room_motion", "off")
        await hass.async_block_till_done()

        # Force initial ready-to-arm status calculation
        sensor_handler = hass.data[const.DOMAIN]['sensor_handler']
        sensor_handler.update_ready_to_arm_status(AREA_ID)
        await hass.async_block_till_done()

        # Verify initial state - both modes should be available since motion sensor is off
        alarm_entity = hass.data[const.DOMAIN]["areas"][AREA_ID]
        assert "armed_away" in alarm_entity._ready_to_arm_modes
        assert "armed_home" in alarm_entity._ready_to_arm_modes

        backend_events.clear()

        # Trigger motion sensor while disarmed - this should NOT affect ready_to_arm_modes
        hass.states.async_set("binary_sensor.living_room_motion", "on")
        await hass.async_block_till_done()

        await advance_time(hass, PROCESSING_TIME)

        # Verify that NO ready_to_arm_modes_changed events were fired
        ready_events = [e for e in backend_events if e["event_type"] == const.EVENT_READY_TO_ARM_MODES_CHANGED]
        assert len(ready_events) == EXPECTED_NO_EVENTS, f"Expected no ready_to_arm_modes_changed events when motion sensor triggers while disarmed, got {len(ready_events)}"

        # Verify that ready_to_arm_modes remain unchanged (both modes still available)
        # This is because motion sensors are not monitored when disarmed
        assert "armed_away" in alarm_entity._ready_to_arm_modes, "armed_away should still be available - motion sensors not monitored when disarmed"
        assert "armed_home" in alarm_entity._ready_to_arm_modes, "armed_home should still be available - motion sensors not monitored when disarmed"

        # Clear motion sensor and verify still no events
        backend_events.clear()
        hass.states.async_set("binary_sensor.living_room_motion", "off")
        await hass.async_block_till_done()
        await advance_time(hass, PROCESSING_TIME)

        ready_events = [e for e in backend_events if e["event_type"] == const.EVENT_READY_TO_ARM_MODES_CHANGED]
        assert len(ready_events) == EXPECTED_NO_EVENTS, "Expected no ready_to_arm_modes_changed events when motion sensor clears while disarmed"

        # Now test that motion sensor IS monitored when armed
        # First arm the system
        await hass.services.async_call(
            "alarmo",
            "arm",
            {"entity_id": ALARM_ENTITY, "code": ALARM_CODE, "mode": "away"},
            blocking=True,
        )
        await hass.async_block_till_done()
        await advance_time(hass, PROCESSING_TIME)
        assert_alarm_state(hass, ALARM_ENTITY, "armed_away")

        backend_events.clear()

        # Now trigger motion sensor while armed - this SHOULD trigger the alarm
        hass.states.async_set("binary_sensor.living_room_motion", "on")
        await hass.async_block_till_done()
        await advance_time(hass, PROCESSING_TIME)

        # Should transition to pending (due to entry delay) or triggered
        current_state = hass.states.get(ALARM_ENTITY).state
        assert current_state in ["pending", "triggered"], f"Expected alarm to be triggered by motion sensor when armed, got {current_state}"

        # Verify that trigger events were fired when armed
        trigger_events = [e for e in backend_events if e["event_type"] == const.EVENT_TRIGGER]
        assert len(trigger_events) >= EXPECTED_SINGLE_EVENT, "Expected trigger event when motion sensor activates while armed"

        # Disarm the alarm to clean up any timers
        await hass.services.async_call(
            "alarmo",
            "disarm",
            {"entity_id": ALARM_ENTITY, "code": ALARM_CODE},
            blocking=True,
        )
        await hass.async_block_till_done()
        assert_alarm_state(hass, ALARM_ENTITY, "disarmed")

        await cleanup_timers(hass)
