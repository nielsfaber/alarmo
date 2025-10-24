"""Test ready-to-arm event functionality.

READY-TO-ARM EVENTS:

The `alarmo_ready_to_arm_modes_updated` event provides a prediction of whether all conditions
are satisfied for arming into each arm mode BEFORE attempting to arm.

BEHAVIORS:
1. Motion sensors are NOT watched while disarmed to prevent
   excessive recalculation while people are inside the house. This is explicitly documented
   in the README.

2. Always-on sensors (like smoke detectors) immediately trigger the alarm
   when active, even when disarmed. This puts the alarm in "triggered" state, which then makes
   no modes ready-to-arm. This behavior makes sense for environmental sensors.

3. Sensors with `allow_open=True` do not block arming when open. They are
   excluded from the blocking sensors calculation.

4. Sensors with auto-bypass enabled for specific modes are considered
   "ready" for those modes, but still block modes where auto-bypass is not enabled.

5. **Multi-Area Independence**: Each area calculates its ready-to-arm status independently.

EVENT DATA STRUCTURE (per README):
- entity_id: alarm_control_panel entity ID
- area_id: Internal area ID
- armed_away: boolean indicating readiness for away mode
- armed_home: boolean indicating readiness for home mode
- armed_night: boolean indicating readiness for night mode
- armed_vacation: boolean indicating readiness for vacation mode
- armed_custom_bypass: boolean indicating readiness for custom bypass mode

"""  # noqa E501

from typing import Any

import pytest
from homeassistant.helpers.dispatcher import async_dispatcher_connect

from tests.helpers import (
    advance_time,
    cleanup_timers,
    assert_alarm_state,
    setup_alarmo_entry,
    patch_alarmo_integration_dependencies,
)
from tests.factories import AreaFactory, SensorFactory
from custom_components.alarmo import const

AREA_ID = "area_1"
ALARM_ENTITY = "alarm_control_panel.test_area_1"
ALARM_CODE = "1234"
PROCESSING_TIME = 1
EXPECTED_SINGLE_EVENT = 1
EXPECTED_NO_EVENTS = 0
IMMEDIATE_ARMING = 0


@pytest.mark.asyncio
async def test_ready_to_arm_modes_changed_event_on_sensor_state_change(
    hass: Any, enable_custom_integrations: Any
) -> None:
    """Test that ready_to_arm_modes_changed events are fired when sensor states affect available arm modes."""  # noqa E501
    backend_events: list[dict[str, Any]] = []

    def capture_backend_event(
        event_type: str, area_id: str, args: dict[str, Any]
    ) -> None:
        """Capture backend dispatcher events."""
        backend_events.append(
            {"event_type": event_type, "area_id": area_id, "args": args}
        )

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
        ready_events = [
            e
            for e in backend_events
            if e["event_type"] == const.EVENT_READY_TO_ARM_MODES_CHANGED
        ]
        assert len(ready_events) >= EXPECTED_SINGLE_EVENT, (
            f"Expected at least {EXPECTED_SINGLE_EVENT} ready_to_arm_modes_changed event"  # noqa E501
        )

        # Verify the event details
        latest_ready_event = ready_events[-1]
        assert latest_ready_event["area_id"] == AREA_ID
        assert const.ATTR_MODES in latest_ready_event["args"]

        # Since door sensor is open and active in armed_away mode,
        # armed_away should not be available but armed_home should still be available
        available_modes = latest_ready_event["args"][const.ATTR_MODES]
        assert "armed_away" not in available_modes, (
            "armed_away should not be available when door is open"
        )
        assert "armed_home" in available_modes, (
            "armed_home should still be available when door is open"
        )

        # Clear events and close the door
        backend_events.clear()
        hass.states.async_set("binary_sensor.front_door", "off")
        await hass.async_block_till_done()

        # Give time for event processing
        await advance_time(hass, PROCESSING_TIME)

        # Check for ready_to_arm_modes_changed events after closing
        ready_events = [
            e
            for e in backend_events
            if e["event_type"] == const.EVENT_READY_TO_ARM_MODES_CHANGED
        ]
        assert len(ready_events) >= EXPECTED_SINGLE_EVENT, (
            "Expected ready_to_arm_modes_changed event after door closes"
        )

        # Both modes should now be available
        latest_ready_event = ready_events[-1]
        available_modes = latest_ready_event["args"][const.ATTR_MODES]
        assert "armed_away" in available_modes, (
            "armed_away should be available when door is closed"
        )
        assert "armed_home" in available_modes, (
            "armed_home should be available when door is closed"
        )

        await cleanup_timers(hass)


@pytest.mark.asyncio
async def test_ready_to_arm_modes_changed_event_with_door_sensor_multiple_modes(
    hass: Any, enable_custom_integrations: Any
) -> None:
    """Test ready_to_arm_modes_changed event with door sensor affecting multiple modes."""  # noqa E501
    backend_events: list[dict[str, Any]] = []

    def capture_backend_event(
        event_type: str, area_id: str, args: dict[str, Any]
    ) -> None:
        """Capture backend dispatcher events."""
        backend_events.append(
            {"event_type": event_type, "area_id": area_id, "args": args}
        )

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
        sensor_handler = hass.data[const.DOMAIN]["sensor_handler"]
        sensor_handler.update_ready_to_arm_status(AREA_ID)
        await hass.async_block_till_done()

        # Clear any events from setup
        backend_events.clear()

        # Debug: Print current alarm state and sensor registrations
        alarm_entity = hass.data[const.DOMAIN]["areas"][AREA_ID]
        print(f"DEBUG: Alarm entity: {alarm_entity}")
        print(f"DEBUG: Ready to arm modes before: {alarm_entity._ready_to_arm_modes}")
        print(
            f"DEBUG: Sensor manager config: {hass.data[const.DOMAIN]['sensor_handler']._config}"  # noqa E501
        )

        # Trigger door sensor - this should affect both arm modes
        hass.states.async_set("binary_sensor.living_room_door", "on")
        await hass.async_block_till_done()

        # Give time for event processing
        await advance_time(hass, PROCESSING_TIME)

        # Debug: Print state after sensor change
        print(
            f"DEBUG: Ready to arm modes after sensor trigger: {alarm_entity._ready_to_arm_modes}"  # noqa E501
        )
        print(
            f"DEBUG: All captured events: {[e['event_type'] for e in backend_events]}"
        )

        # Check for ready_to_arm_modes_changed events
        ready_events = [
            e
            for e in backend_events
            if e["event_type"] == const.EVENT_READY_TO_ARM_MODES_CHANGED
        ]
        assert len(ready_events) >= EXPECTED_SINGLE_EVENT, (
            f"Expected at least {EXPECTED_SINGLE_EVENT} "
            f"ready_to_arm_modes_changed event, got {len(ready_events)}. "
            f"All events: {[e['event_type'] for e in backend_events]}"
        )

        # Get the latest event
        latest_ready_event = ready_events[-1]
        assert latest_ready_event["area_id"] == AREA_ID
        assert const.ATTR_MODES in latest_ready_event["args"]

        # Since door sensor is active in both modes and doesn't allow_open,
        # neither mode should be available for arming
        available_modes = latest_ready_event["args"][const.ATTR_MODES]
        assert "armed_away" not in available_modes, (
            "armed_away should not be available when door sensor is active"
        )
        assert "armed_home" not in available_modes, (
            "armed_home should not be available when door sensor is active"
        )

        # Clear door and verify modes become available again
        backend_events.clear()
        hass.states.async_set("binary_sensor.living_room_door", "off")
        await hass.async_block_till_done()

        await advance_time(hass, PROCESSING_TIME)

        ready_events = [
            e
            for e in backend_events
            if e["event_type"] == const.EVENT_READY_TO_ARM_MODES_CHANGED
        ]
        assert len(ready_events) >= EXPECTED_SINGLE_EVENT, (
            "Expected ready_to_arm_modes_changed event after door closes"
        )

        latest_ready_event = ready_events[-1]
        available_modes = latest_ready_event["args"][const.ATTR_MODES]
        assert "armed_away" in available_modes, (
            "armed_away should be available when door sensor is clear"
        )
        assert "armed_home" in available_modes, (
            "armed_home should be available when door sensor is clear"
        )

        await cleanup_timers(hass)


@pytest.mark.asyncio
async def test_motion_sensor_not_monitored_when_disarmed(  # noqa PLR0915
    hass: Any, enable_custom_integrations: Any
) -> None:
    """Test that motion sensors are NOT monitored when alarm is disarmed (by design)."""
    backend_events: list[dict[str, Any]] = []

    def capture_backend_event(
        event_type: str, area_id: str, args: dict[str, Any]
    ) -> None:
        """Capture backend dispatcher events."""
        backend_events.append(
            {"event_type": event_type, "area_id": area_id, "args": args}
        )

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
        sensor_handler = hass.data[const.DOMAIN]["sensor_handler"]
        sensor_handler.update_ready_to_arm_status(AREA_ID)
        await hass.async_block_till_done()

        # Verify initial state
        #   both modes should be available since motion sensor is off
        alarm_entity = hass.data[const.DOMAIN]["areas"][AREA_ID]
        assert "armed_away" in alarm_entity._ready_to_arm_modes
        assert "armed_home" in alarm_entity._ready_to_arm_modes

        backend_events.clear()

        # Trigger motion sensor while disarmed
        #   this should NOT affect ready_to_arm_modes
        hass.states.async_set("binary_sensor.living_room_motion", "on")
        await hass.async_block_till_done()

        await advance_time(hass, PROCESSING_TIME)

        # Verify that NO ready_to_arm_modes_changed events were fired
        ready_events = [
            e
            for e in backend_events
            if e["event_type"] == const.EVENT_READY_TO_ARM_MODES_CHANGED
        ]
        assert len(ready_events) == EXPECTED_NO_EVENTS, (
            f"Expected no ready_to_arm_modes_changed events when "
            f"motion sensor triggers while disarmed, got {len(ready_events)}"
        )

        # Verify that ready_to_arm_modes remain unchanged (both modes still available)
        # This is because motion sensors are not monitored when disarmed
        assert "armed_away" in alarm_entity._ready_to_arm_modes, (
            "armed_away should still be available - "
            "motion sensors not monitored when disarmed"
        )
        assert "armed_home" in alarm_entity._ready_to_arm_modes, (
            "armed_home should still be available - "
            "motion sensors not monitored when disarmed"
        )

        # Clear motion sensor and verify still no events
        backend_events.clear()
        hass.states.async_set("binary_sensor.living_room_motion", "off")
        await hass.async_block_till_done()
        await advance_time(hass, PROCESSING_TIME)

        ready_events = [
            e
            for e in backend_events
            if e["event_type"] == const.EVENT_READY_TO_ARM_MODES_CHANGED
        ]
        assert len(ready_events) == EXPECTED_NO_EVENTS, (
            "Expected no ready_to_arm_modes_changed events "
            "when motion sensor clears while disarmed"
        )

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
        assert current_state in [
            "pending",
            "triggered",
        ], (
            "Expected alarm to be triggered by motion sensor when armed, "
            f"got {current_state}"
        )

        # Verify that trigger events were fired when armed
        trigger_events = [
            e for e in backend_events if e["event_type"] == const.EVENT_TRIGGER
        ]
        assert len(trigger_events) >= EXPECTED_SINGLE_EVENT, (
            "Expected trigger event when motion sensor activates while armed"
        )

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


@pytest.mark.asyncio
async def test_ready_to_arm_with_multiple_sensors_same_mode(
    hass: Any, enable_custom_integrations: Any
) -> None:
    """Test ready-to-arm events with multiple sensors affecting the same mode."""
    backend_events: list[dict[str, Any]] = []

    def capture_backend_event(
        event_type: str, area_id: str, args: dict[str, Any]
    ) -> None:
        backend_events.append(
            {"event_type": event_type, "area_id": area_id, "args": args}
        )

    # Create area with armed_away mode enabled
    area = AreaFactory.create_area(
        area_id=AREA_ID,
        modes=["armed_away"],
        armed_away_exit_time=0,
        armed_away_enabled=True,
    )

    # Create two door sensors both affecting armed_away mode
    sensors = [
        SensorFactory.create_door_sensor(
            entity_id="binary_sensor.door1",
            name="Door 1",
            area=AREA_ID,
            modes=["armed_away"],
            allow_open=False,
        ),
        SensorFactory.create_door_sensor(
            entity_id="binary_sensor.door2",
            name="Door 2",
            area=AREA_ID,
            modes=["armed_away"],
            allow_open=False,
        ),
    ]

    storage, entry = setup_alarmo_entry(
        hass,
        areas=[area],
        sensors=sensors,
        entry_id="test_multiple_sensors_same_mode",
    )

    with patch_alarmo_integration_dependencies(storage):
        async_dispatcher_connect(hass, "alarmo_event", capture_backend_event)

        await hass.config_entries.async_setup(entry.entry_id)
        await hass.async_block_till_done()

        # Initialize both doors closed
        hass.states.async_set("binary_sensor.door1", "off")
        hass.states.async_set("binary_sensor.door2", "off")
        await hass.async_block_till_done()

        alarm_entity = hass.data[const.DOMAIN]["areas"][AREA_ID]
        assert "armed_away" in alarm_entity._ready_to_arm_modes

        backend_events.clear()

        # Open first door - should block armed_away
        hass.states.async_set("binary_sensor.door1", "on")
        await advance_time(hass, PROCESSING_TIME)

        ready_events = [
            e
            for e in backend_events
            if e["event_type"] == const.EVENT_READY_TO_ARM_MODES_CHANGED
        ]
        assert len(ready_events) >= EXPECTED_SINGLE_EVENT, (
            "Expected ready-to-arm event when door opens"
        )
        assert "armed_away" not in alarm_entity._ready_to_arm_modes

        # Open second door too - should still be blocked
        hass.states.async_set("binary_sensor.door2", "on")
        await advance_time(hass, PROCESSING_TIME)
        assert "armed_away" not in alarm_entity._ready_to_arm_modes

        # Close first door, second still open - should still be blocked
        hass.states.async_set("binary_sensor.door1", "off")
        await advance_time(hass, PROCESSING_TIME)
        assert "armed_away" not in alarm_entity._ready_to_arm_modes

        # Close second door - should be ready to arm again
        hass.states.async_set("binary_sensor.door2", "off")
        await advance_time(hass, PROCESSING_TIME)
        assert "armed_away" in alarm_entity._ready_to_arm_modes

        await cleanup_timers(hass)


@pytest.mark.asyncio
async def test_ready_to_arm_with_bypass_sensors(
    hass: Any, enable_custom_integrations: Any
) -> None:
    """Test ready-to-arm with auto-bypass sensors."""
    backend_events: list[dict[str, Any]] = []

    def capture_backend_event(
        event_type: str, area_id: str, args: dict[str, Any]
    ) -> None:
        backend_events.append(
            {"event_type": event_type, "area_id": area_id, "args": args}
        )

    area = AreaFactory.create_area(
        area_id=AREA_ID,
        modes=["armed_away", "armed_home"],
        armed_away_exit_time=0,
        armed_away_enabled=True,
        armed_home_exit_time=0,
        armed_home_enabled=True,
    )

    # Sensor with auto-bypass in armed_away mode only
    sensors = [
        SensorFactory.create_door_sensor(
            entity_id="binary_sensor.door",
            name="Bypass Door",
            area=AREA_ID,
            modes=["armed_away", "armed_home"],
            auto_bypass=True,
            auto_bypass_modes=["armed_away"],  # Only bypass in away mode
        ),
    ]

    storage, entry = setup_alarmo_entry(
        hass,
        areas=[area],
        sensors=sensors,
        entry_id="test_bypass_sensors",
    )

    with patch_alarmo_integration_dependencies(storage):
        async_dispatcher_connect(hass, "alarmo_event", capture_backend_event)

        await hass.config_entries.async_setup(entry.entry_id)
        await hass.async_block_till_done()

        hass.states.async_set("binary_sensor.door", "off")
        await hass.async_block_till_done()

        alarm_entity = hass.data[const.DOMAIN]["areas"][AREA_ID]
        assert "armed_away" in alarm_entity._ready_to_arm_modes
        assert "armed_home" in alarm_entity._ready_to_arm_modes

        backend_events.clear()

        # Open bypass sensor
        #   should only block armed_home (not armed_away due to bypass)
        hass.states.async_set("binary_sensor.door", "on")
        await advance_time(hass, PROCESSING_TIME)

        ready_events = [
            e
            for e in backend_events
            if e["event_type"] == const.EVENT_READY_TO_ARM_MODES_CHANGED
        ]
        assert len(ready_events) >= EXPECTED_SINGLE_EVENT

        # With auto-bypass
        #   armed_away should still be available
        #   armed_home should be blocked
        assert "armed_away" in alarm_entity._ready_to_arm_modes, (
            "armed_away should be available due to auto-bypass"
        )
        assert "armed_home" not in alarm_entity._ready_to_arm_modes, (
            "armed_home should be blocked (no bypass for home mode)"
        )

        await cleanup_timers(hass)


@pytest.mark.asyncio
async def test_ready_to_arm_with_allow_open_sensors(
    hass: Any, enable_custom_integrations: Any
) -> None:
    """Test ready-to-arm with allow_open sensors."""
    backend_events: list[dict[str, Any]] = []

    def capture_backend_event(
        event_type: str, area_id: str, args: dict[str, Any]
    ) -> None:
        backend_events.append(
            {"event_type": event_type, "area_id": area_id, "args": args}
        )

    area = AreaFactory.create_area(
        area_id=AREA_ID,
        modes=["armed_away"],
        armed_away_exit_time=0,
        armed_away_enabled=True,
    )

    # Sensor that allows being open during arming
    sensors = [
        SensorFactory.create_door_sensor(
            entity_id="binary_sensor.door",
            name="Allow Open Door",
            area=AREA_ID,
            modes=["armed_away"],
            allow_open=True,  # This sensor can be open when arming
        ),
    ]

    storage, entry = setup_alarmo_entry(
        hass,
        areas=[area],
        sensors=sensors,
        entry_id="test_allow_open_sensors",
    )

    with patch_alarmo_integration_dependencies(storage):
        async_dispatcher_connect(hass, "alarmo_event", capture_backend_event)

        await hass.config_entries.async_setup(entry.entry_id)
        await hass.async_block_till_done()

        hass.states.async_set("binary_sensor.door", "off")
        await hass.async_block_till_done()

        alarm_entity = hass.data[const.DOMAIN]["areas"][AREA_ID]
        assert "armed_away" in alarm_entity._ready_to_arm_modes

        backend_events.clear()

        # Open allow_open sensor - should NOT affect ready-to-arm modes
        hass.states.async_set("binary_sensor.door", "on")
        await advance_time(hass, PROCESSING_TIME)

        # With allow_open=True, open sensors don't block arming
        assert "armed_away" in alarm_entity._ready_to_arm_modes

        await cleanup_timers(hass)


@pytest.mark.asyncio
async def test_ready_to_arm_with_always_on_sensors(
    hass: Any, enable_custom_integrations: Any
) -> None:
    """Test ready-to-arm with always_on sensors."""
    backend_events: list[dict[str, Any]] = []

    def capture_backend_event(
        event_type: str, area_id: str, args: dict[str, Any]
    ) -> None:
        backend_events.append(
            {"event_type": event_type, "area_id": area_id, "args": args}
        )

    area = AreaFactory.create_area(
        area_id=AREA_ID,
        modes=["armed_away"],
        armed_away_exit_time=0,
        armed_away_enabled=True,
    )

    # Always-on environmental sensor (like smoke detector)
    sensors = [
        SensorFactory.create_sensor(
            entity_id="binary_sensor.smoke",
            name="Smoke Detector",
            area=AREA_ID,
            modes=["armed_away"],
            always_on=True,
        ),
    ]

    storage, entry = setup_alarmo_entry(
        hass,
        areas=[area],
        sensors=sensors,
        entry_id="test_always_on_sensors",
    )

    with patch_alarmo_integration_dependencies(storage):
        async_dispatcher_connect(hass, "alarmo_event", capture_backend_event)

        await hass.config_entries.async_setup(entry.entry_id)
        await hass.async_block_till_done()

        alarm_entity = hass.data[const.DOMAIN]["areas"][AREA_ID]

        # Smoke detector inactive - ready to arm
        hass.states.async_set("binary_sensor.smoke", "off")
        await advance_time(hass, PROCESSING_TIME)
        assert "armed_away" in alarm_entity._ready_to_arm_modes

        backend_events.clear()

        # Smoke detector active - always_on sensors immediately trigger the alarm
        # This puts the alarm in "triggered" state with open sensors
        #   making it not ready to arm
        hass.states.async_set("binary_sensor.smoke", "on")
        await advance_time(hass, PROCESSING_TIME)

        # Always-on sensors trigger the alarm immediately when active
        #   even when disarmed
        # This is the correct behavior: the alarm goes to "triggered" state
        assert alarm_entity.state == "triggered"
        assert "armed_away" not in alarm_entity._ready_to_arm_modes, (
            "Cannot arm when alarm is triggered"
        )

        # Verify that a ready-to-arm event was fired showing no modes available
        ready_events = [
            e
            for e in backend_events
            if e["event_type"] == const.EVENT_READY_TO_ARM_MODES_CHANGED
        ]
        assert len(ready_events) >= EXPECTED_SINGLE_EVENT, (
            "Expected ready-to-arm event when alarm triggers"
        )

        await cleanup_timers(hass)


@pytest.mark.asyncio
async def test_ready_to_arm_cross_area_independence(
    hass: Any, enable_custom_integrations: Any
) -> None:
    """Test that ready-to-arm events are independent between areas."""
    backend_events: list[dict[str, Any]] = []

    def capture_backend_event(
        event_type: str, area_id: str, args: dict[str, Any]
    ) -> None:
        backend_events.append(
            {"event_type": event_type, "area_id": area_id, "args": args}
        )

    # Create two areas
    area1 = AreaFactory.create_area(
        area_id="area_1",
        modes=["armed_away"],
        armed_away_exit_time=0,
        armed_away_enabled=True,
    )
    area2 = AreaFactory.create_area(
        area_id="area_2",
        modes=["armed_away"],
        armed_away_exit_time=0,
        armed_away_enabled=True,
    )

    # Add door sensors to each area
    sensors = [
        SensorFactory.create_door_sensor(
            entity_id="binary_sensor.door1",
            name="Door 1",
            area="area_1",
            modes=["armed_away"],
        ),
        SensorFactory.create_door_sensor(
            entity_id="binary_sensor.door2",
            name="Door 2",
            area="area_2",
            modes=["armed_away"],
        ),
    ]

    storage, entry = setup_alarmo_entry(
        hass,
        areas=[area1, area2],
        sensors=sensors,
        entry_id="test_cross_area_independence",
    )

    with patch_alarmo_integration_dependencies(storage):
        async_dispatcher_connect(hass, "alarmo_event", capture_backend_event)

        await hass.config_entries.async_setup(entry.entry_id)
        await hass.async_block_till_done()

        area1_entity = hass.data[const.DOMAIN]["areas"]["area_1"]
        area2_entity = hass.data[const.DOMAIN]["areas"]["area_2"]

        # Both doors closed - both areas ready to arm
        hass.states.async_set("binary_sensor.door1", "off")
        hass.states.async_set("binary_sensor.door2", "off")
        await advance_time(hass, PROCESSING_TIME)

        assert "armed_away" in area1_entity._ready_to_arm_modes
        assert "armed_away" in area2_entity._ready_to_arm_modes

        backend_events.clear()

        # Open door in area 1 - should only affect area 1
        hass.states.async_set("binary_sensor.door1", "on")
        await advance_time(hass, PROCESSING_TIME)

        ready_events = [
            e
            for e in backend_events
            if e["event_type"] == const.EVENT_READY_TO_ARM_MODES_CHANGED
        ]
        assert len(ready_events) >= EXPECTED_SINGLE_EVENT

        # Area 1 should not be ready, area 2 should still be ready
        assert "armed_away" not in area1_entity._ready_to_arm_modes
        assert "armed_away" in area2_entity._ready_to_arm_modes

        await cleanup_timers(hass)


@pytest.mark.asyncio
async def test_ready_to_arm_multiple_modes_different_sensors(
    hass: Any, enable_custom_integrations: Any
) -> None:
    """Test ready-to-arm with different sensors affecting different modes."""
    backend_events: list[dict[str, Any]] = []

    def capture_backend_event(
        event_type: str, area_id: str, args: dict[str, Any]
    ) -> None:
        backend_events.append(
            {"event_type": event_type, "area_id": area_id, "args": args}
        )

    area = AreaFactory.create_area(
        area_id=AREA_ID,
        modes=["armed_away", "armed_home"],
        armed_away_exit_time=0,
        armed_away_enabled=True,
        armed_home_exit_time=0,
        armed_home_enabled=True,
    )

    # Create sensors for different modes
    sensors = [
        SensorFactory.create_door_sensor(
            entity_id="binary_sensor.door",
            name="Main Door",
            area=AREA_ID,
            modes=["armed_away", "armed_home"],  # affects both modes
        ),
        SensorFactory.create_window_sensor(
            entity_id="binary_sensor.window",
            name="Window",
            area=AREA_ID,
            modes=["armed_away"],  # only affects away mode
        ),
    ]

    storage, entry = setup_alarmo_entry(
        hass,
        areas=[area],
        sensors=sensors,
        entry_id="test_multiple_modes_different_sensors",
    )

    with patch_alarmo_integration_dependencies(storage):
        async_dispatcher_connect(hass, "alarmo_event", capture_backend_event)

        await hass.config_entries.async_setup(entry.entry_id)
        await hass.async_block_till_done()

        alarm_entity = hass.data[const.DOMAIN]["areas"][AREA_ID]

        # All sensors closed - both modes ready
        hass.states.async_set("binary_sensor.door", "off")
        hass.states.async_set("binary_sensor.window", "off")
        await advance_time(hass, PROCESSING_TIME)

        assert "armed_away" in alarm_entity._ready_to_arm_modes
        assert "armed_home" in alarm_entity._ready_to_arm_modes

        backend_events.clear()

        # Open window - should only affect armed_away mode
        hass.states.async_set("binary_sensor.window", "on")
        await advance_time(hass, PROCESSING_TIME)

        assert "armed_away" not in alarm_entity._ready_to_arm_modes
        assert (
            "armed_home" in alarm_entity._ready_to_arm_modes
        )  # home mode should still be ready

        # Open door too - should affect both modes
        hass.states.async_set("binary_sensor.door", "on")
        await advance_time(hass, PROCESSING_TIME)

        assert "armed_away" not in alarm_entity._ready_to_arm_modes
        assert "armed_home" not in alarm_entity._ready_to_arm_modes

        # Close door, window still open - home mode should be ready again
        hass.states.async_set("binary_sensor.door", "off")
        await advance_time(hass, PROCESSING_TIME)

        assert "armed_away" not in alarm_entity._ready_to_arm_modes  # window still open
        assert (
            "armed_home" in alarm_entity._ready_to_arm_modes
        )  # door closed, window doesn't affect home mode

        await cleanup_timers(hass)


@pytest.mark.asyncio
async def test_home_assistant_event_bus_ready_to_arm_event(
    hass: Any, enable_custom_integrations: Any
) -> None:
    """Test that alarmo_ready_to_arm_modes_updated events are fired on the Home Assistant event bus.

    This tests the case described in the documentation where users create template entities
    that listen to the HA event bus for 'alarmo_ready_to_arm_modes_updated' events.
    """  # noqa E501
    ha_events: list[dict[str, Any]] = []

    def capture_ha_event(event) -> None:
        """Capture Home Assistant event bus events."""
        ha_events.append(
            {
                "event_type": event.event_type,
                "data": event.data,
                "origin": event.origin,
                "time_fired": event.time_fired,
            }
        )

    area = AreaFactory.create_area(
        area_id=AREA_ID,
        modes=["armed_away"],
        armed_away_exit_time=IMMEDIATE_ARMING,
        armed_away_enabled=True,
    )

    door_sensor = SensorFactory.create_door_sensor(
        entity_id="binary_sensor.test_door",
        name="Test Door",
        area=AREA_ID,
        modes=["armed_away"],
        allow_open=False,
    )

    storage, entry = setup_alarmo_entry(
        hass,
        areas=[area],
        sensors=[door_sensor],
        entry_id="test_ha_event_bus",
    )

    with patch_alarmo_integration_dependencies(storage):
        # Listen to HA event bus events BEFORE setup
        hass.bus.async_listen("alarmo_ready_to_arm_modes_updated", capture_ha_event)

        await hass.config_entries.async_setup(entry.entry_id)
        await hass.async_block_till_done()

        hass.states.async_set(ALARM_ENTITY, "disarmed")
        hass.states.async_set("binary_sensor.test_door", "off")
        await hass.async_block_till_done()

        ha_events.clear()

        # Trigger state change that should fire ready-to-arm event
        hass.states.async_set("binary_sensor.test_door", "on")
        await hass.async_block_till_done()
        await advance_time(hass, PROCESSING_TIME)

        # Verify HA event bus events were fired
        ready_events = [
            e
            for e in ha_events
            if e["event_type"] == "alarmo_ready_to_arm_modes_updated"
        ]

        assert len(ready_events) >= EXPECTED_SINGLE_EVENT, (
            f"Expected at least {EXPECTED_SINGLE_EVENT} HA event bus "
            f"'alarmo_ready_to_arm_modes_updated' event, got {len(ready_events)}. "
            "This is required for the template entity example in the docs to work."
        )

        # Verify the HA event contains the expected data structure
        latest_event = ready_events[-1]
        event_data = latest_event["data"]

        # Check required fields that the template entity example expects
        assert "entity_id" in event_data, (
            "HA event must contain entity_id for template entity"
        )
        assert "area_id" in event_data, "HA event must contain area_id"
        assert "armed_away" in event_data, "HA event must contain armed_away boolean"

        # The door is open so armed_away should be false
        assert event_data["armed_away"] is False, (
            "armed_away should be False when door sensor is open"
        )
        assert event_data["entity_id"] == ALARM_ENTITY, (
            f"entity_id should match alarm entity: {ALARM_ENTITY}"
        )
        assert event_data["area_id"] == AREA_ID, f"area_id should match: {AREA_ID}"

        # Test closing door to verify positive case
        ha_events.clear()
        hass.states.async_set("binary_sensor.test_door", "off")
        await hass.async_block_till_done()
        await advance_time(hass, PROCESSING_TIME)

        ready_events = [
            e
            for e in ha_events
            if e["event_type"] == "alarmo_ready_to_arm_modes_updated"
        ]

        assert len(ready_events) >= EXPECTED_SINGLE_EVENT, (
            "Expected HA event when door closes"
        )

        latest_event = ready_events[-1]
        event_data = latest_event["data"]
        assert event_data["armed_away"] is True, (
            "armed_away should be True when door sensor is closed"
        )

        await cleanup_timers(hass)
