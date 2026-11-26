"""Test alarm master functionality with multiple areas."""

from typing import Any
from unittest.mock import AsyncMock

import pytest
from homeassistant.helpers.dispatcher import async_dispatcher_connect

from tests.helpers import (
    advance_time,
    cleanup_timers,
    assert_alarm_state,
    setup_alarmo_entry,
    patch_alarmo_integration_dependencies,
)
from tests.factories import AreaFactory, UserFactory, SensorFactory
from custom_components.alarmo import const


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

        backend_events: list[tuple[str, str | None]] = []

        def capture_backend_event(
            event_type: str, area_id: str | None, args: dict
        ) -> None:
            """Capture backend dispatcher events."""
            backend_events.append((event_type, area_id))

        async_dispatcher_connect(hass, "alarmo_event", capture_backend_event)

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
        backend_events.clear()
        await hass.services.async_call(
            "alarm_control_panel",
            "alarm_disarm",
            {"entity_id": "alarm_control_panel.master", "code": "1234"},
            blocking=True,
        )
        await hass.async_block_till_done()
        assert_alarm_state(hass, "alarm_control_panel.master", "disarmed")
        assert [
            event for event in backend_events if event == (const.EVENT_DISARM, None)
        ] == [(const.EVENT_DISARM, None)]


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


@pytest.mark.asyncio
async def test_alarm_master_disarm_denied_for_area_limited_user(
    hass: Any, enable_custom_integrations: Any
) -> None:
    """Master disarm should fail if user lacks permission for all areas."""
    area1 = AreaFactory.create_area(
        area_id="area_1",
        name="Test Area 1 Limited",
        modes=["armed_away"],
        armed_away_enabled=True,
        armed_away_exit_time=0,
    )
    area2 = AreaFactory.create_area(
        area_id="area_2",
        name="Test Area 2 Limited",
        modes=["armed_away"],
        armed_away_enabled=True,
        armed_away_exit_time=0,
    )

    sensor1 = SensorFactory.create_door_sensor(
        entity_id="binary_sensor.area_1_door", area="area_1"
    )
    sensor2 = SensorFactory.create_door_sensor(
        entity_id="binary_sensor.area_2_door", area="area_2"
    )

    users = {
        "admin_user": UserFactory.create_user(
            user_id="admin_user",
            name="Admin User",
            code="1234",
            can_arm=True,
            can_disarm=True,
        ),
        "limited_user": UserFactory.create_user(
            user_id="limited_user",
            name="Limited User",
            code="3456",
            can_arm=True,
            can_disarm=True,
            area_limit="area_1",
        ),
    }

    storage, entry = setup_alarmo_entry(
        hass,
        areas=[area1, area2],
        sensors=[sensor1, sensor2],
        entry_id="test_master_disarm_limited",
        users=users,
        master_enabled=True,
    )

    with patch_alarmo_integration_dependencies(storage):
        await hass.config_entries.async_setup(entry.entry_id)
        await hass.async_block_till_done()

        hass.states.async_set("binary_sensor.area_1_door", "off")
        hass.states.async_set("binary_sensor.area_2_door", "off")
        await hass.async_block_till_done()

        # Arm via master with admin user
        await hass.services.async_call(
            "alarm_control_panel",
            "alarm_arm_away",
            {"entity_id": "alarm_control_panel.master", "code": "1234"},
            blocking=True,
        )
        await advance_time(hass, 1)

        assert_alarm_state(
            hass, "alarm_control_panel.test_area_1_limited", "armed_away"
        )
        assert_alarm_state(
            hass, "alarm_control_panel.test_area_2_limited", "armed_away"
        )
        assert_alarm_state(hass, "alarm_control_panel.master", "armed_away")

        # Attempt to disarm master with area-limited user
        await hass.services.async_call(
            "alarm_control_panel",
            "alarm_disarm",
            {"entity_id": "alarm_control_panel.master", "code": "3456"},
            blocking=True,
        )
        await hass.async_block_till_done()

        # Should remain armed since user cannot operate all areas
        assert_alarm_state(
            hass, "alarm_control_panel.test_area_1_limited", "armed_away"
        )
        assert_alarm_state(
            hass, "alarm_control_panel.test_area_2_limited", "armed_away"
        )
        assert_alarm_state(hass, "alarm_control_panel.master", "armed_away")


@pytest.mark.asyncio
async def test_alarm_master_disarm_auth_resolved_once(
    hass: Any, enable_custom_integrations: Any
) -> None:
    """Master disarm resolves the user only once and reuses it for all areas."""
    area1 = AreaFactory.create_area(
        area_id="area_1",
        name="Test Area 1 Auth",
        modes=["armed_away"],
        armed_away_enabled=True,
        armed_away_exit_time=0,
    )
    area2 = AreaFactory.create_area(
        area_id="area_2",
        name="Test Area 2 Auth",
        modes=["armed_away"],
        armed_away_enabled=True,
        armed_away_exit_time=0,
    )

    sensor1 = SensorFactory.create_door_sensor(
        entity_id="binary_sensor.area_1_door", area="area_1"
    )
    sensor2 = SensorFactory.create_door_sensor(
        entity_id="binary_sensor.area_2_door", area="area_2"
    )

    users = {
        "admin_user": UserFactory.create_user(
            user_id="admin_user",
            name="Admin User",
            code="1234",
            can_arm=True,
            can_disarm=True,
        )
    }

    storage, entry = setup_alarmo_entry(
        hass,
        areas=[area1, area2],
        sensors=[sensor1, sensor2],
        entry_id="test_master_disarm_auth_once",
        users=users,
        master_enabled=True,
    )

    with patch_alarmo_integration_dependencies(storage):
        await hass.config_entries.async_setup(entry.entry_id)
        await hass.async_block_till_done()

        hass.states.async_set("binary_sensor.area_1_door", "off")
        hass.states.async_set("binary_sensor.area_2_door", "off")
        await hass.async_block_till_done()

        # Arm via master
        await hass.services.async_call(
            "alarm_control_panel",
            "alarm_arm_away",
            {"entity_id": "alarm_control_panel.master", "code": "1234"},
            blocking=True,
        )
        await advance_time(hass, 1)

        coordinator = hass.data[const.DOMAIN]["coordinator"]
        original_auth = coordinator.async_authenticate_user
        coordinator.async_authenticate_user = AsyncMock(wraps=original_auth)

        # Disarm via master
        await hass.services.async_call(
            "alarm_control_panel",
            "alarm_disarm",
            {"entity_id": "alarm_control_panel.master", "code": "1234"},
            blocking=True,
        )
        await hass.async_block_till_done()

        assert coordinator.async_authenticate_user.call_count == 1
        assert_alarm_state(hass, "alarm_control_panel.test_area_1_auth", "disarmed")
        assert_alarm_state(hass, "alarm_control_panel.test_area_2_auth", "disarmed")
        assert_alarm_state(hass, "alarm_control_panel.master", "disarmed")


def _setup_master_areas(
    hass: Any,
    entry_id: str,
    *,
    count: int = 2,
    modes: tuple[str, ...] = ("armed_away",),
    exit_times: int | tuple[int, ...] = 0,
    use_exit_delay: bool = True,
) -> tuple[Any, Any]:
    """Create N areas with matching door sensors and master enabled."""
    delays = (exit_times,) * count if isinstance(exit_times, int) else exit_times
    areas = [
        AreaFactory.create_area(
            area_id=f"area_{i}",
            name=f"Area {i}",
            modes=list(modes),
            armed_away_enabled=True,
            armed_home_enabled="armed_home" in modes,
            armed_away_exit_time=delays[i - 1],
            armed_home_exit_time=0,
        )
        for i in range(1, count + 1)
    ]
    sensors = [
        SensorFactory.create_door_sensor(
            entity_id=f"binary_sensor.area_{i}_door",
            area=f"area_{i}",
            modes=list(modes),
            use_exit_delay=use_exit_delay,
        )
        for i in range(1, count + 1)
    ]
    return setup_alarmo_entry(
        hass,
        areas=areas,
        sensors=sensors,
        entry_id=entry_id,
        master_enabled=True,
    )


async def _arm_or_disarm(
    hass: Any, service: str, entity_id: str, code: str = "1234"
) -> None:
    """Call an alarm_control_panel service and wait for processing."""
    await hass.services.async_call(
        "alarm_control_panel",
        service,
        {"entity_id": entity_id, "code": code},
        blocking=True,
    )
    await hass.async_block_till_done()


def _assert_states(
    hass: Any, expected: dict[str, str], open_sensors: dict[str, str] | None = None
) -> None:
    """Assert entity states and optionally master open_sensors."""
    for entity_id, state in expected.items():
        assert_alarm_state(hass, entity_id, state)
    if open_sensors is not None:
        master_state = hass.states.get("alarm_control_panel.master")
        assert master_state is not None
        assert master_state.attributes["open_sensors"] == open_sensors


@pytest.mark.asyncio
async def test_alarm_master_rearms_disarmed_sub_area(
    hass: Any, enable_custom_integrations: Any
) -> None:
    """Arming master in same mode should arm any disarmed sub-areas."""
    storage, entry = _setup_master_areas(
        hass, "test_master_rearm_sub_area", modes=("armed_away", "armed_home")
    )

    with patch_alarmo_integration_dependencies(storage):
        await hass.config_entries.async_setup(entry.entry_id)
        await hass.async_block_till_done()

        backend_events: list[tuple[str, str | None]] = []
        ready_events: list[dict[str, Any]] = []
        async_dispatcher_connect(
            hass,
            "alarmo_event",
            lambda event_type, area_id, _args: backend_events.append(
                (event_type, area_id)
            ),
        )
        hass.bus.async_listen(
            "alarmo_ready_to_arm_modes_updated",
            lambda ev: ready_events.append(ev.data),
        )

        hass.states.async_set("binary_sensor.area_1_door", "off")
        hass.states.async_set("binary_sensor.area_2_door", "off")
        await hass.async_block_till_done()

        await _arm_or_disarm(hass, "alarm_arm_away", "alarm_control_panel.master")
        assert_alarm_state(hass, "alarm_control_panel.area_1", "armed_away")
        assert_alarm_state(hass, "alarm_control_panel.area_2", "armed_away")
        assert_alarm_state(hass, "alarm_control_panel.master", "armed_away")
        master_ready = [e for e in ready_events if e["area_id"] is None]
        assert master_ready[-1]["armed_away"] is False

        # Arming again when all areas are already armed_away is a no-op
        backend_events.clear()
        await _arm_or_disarm(hass, "alarm_arm_away", "alarm_control_panel.master")
        assert (const.EVENT_ARM, None) not in backend_events

        # Disarm area 1 only; master maintains armed_away and becomes ready for away
        ready_events.clear()
        await _arm_or_disarm(hass, "alarm_disarm", "alarm_control_panel.area_1")
        assert_alarm_state(hass, "alarm_control_panel.area_1", "disarmed")
        assert_alarm_state(hass, "alarm_control_panel.area_2", "armed_away")
        assert_alarm_state(hass, "alarm_control_panel.master", "armed_away")
        master_ready = [e for e in ready_events if e["area_id"] is None]
        assert master_ready[-1]["armed_away"] is True

        # Re-arming master arms only disarmed area 1 without re-arming area 2
        backend_events.clear()
        ready_events.clear()
        await _arm_or_disarm(hass, "alarm_arm_away", "alarm_control_panel.master")
        assert_alarm_state(hass, "alarm_control_panel.area_1", "armed_away")
        assert_alarm_state(hass, "alarm_control_panel.area_2", "armed_away")
        assert_alarm_state(hass, "alarm_control_panel.master", "armed_away")
        assert (const.EVENT_ARM, "area_1") in backend_events
        assert (const.EVENT_ARM, "area_2") not in backend_events
        assert (const.EVENT_ARM, None) in backend_events
        master_ready = [e for e in ready_events if e["area_id"] is None]
        assert master_ready[-1]["armed_away"] is False


@pytest.mark.asyncio
async def test_alarm_master_rearm_failure_preserves_mixed_area_states(
    hass: Any, enable_custom_integrations: Any
) -> None:
    """Failed master re-arm from mixed state reverts only areas changed by it."""
    storage, entry = _setup_master_areas(hass, "test_master_rearm_rollback", count=3)

    with patch_alarmo_integration_dependencies(storage):
        await hass.config_entries.async_setup(entry.entry_id)
        await hass.async_block_till_done()

        failed_events: list[tuple[str | None, dict[str, Any]]] = []
        async_dispatcher_connect(
            hass,
            "alarmo_event",
            lambda event_type, area_id, args: (
                failed_events.append((area_id, args))
                if event_type == const.EVENT_FAILED_TO_ARM
                else None
            ),
        )

        for i in range(1, 4):
            hass.states.async_set(f"binary_sensor.area_{i}_door", "off")
        await hass.async_block_till_done()

        await _arm_or_disarm(hass, "alarm_arm_away", "alarm_control_panel.master")
        await _arm_or_disarm(hass, "alarm_disarm", "alarm_control_panel.area_1")
        await _arm_or_disarm(hass, "alarm_disarm", "alarm_control_panel.area_2")

        hass.states.async_set("binary_sensor.area_2_door", "on")
        await hass.async_block_till_done()

        failed_events.clear()
        await _arm_or_disarm(hass, "alarm_arm_away", "alarm_control_panel.master")

        assert_alarm_state(hass, "alarm_control_panel.area_1", "disarmed")
        assert_alarm_state(hass, "alarm_control_panel.area_2", "disarmed")
        assert_alarm_state(hass, "alarm_control_panel.area_3", "armed_away")
        assert_alarm_state(hass, "alarm_control_panel.master", "armed_away")
        master_state = hass.states.get("alarm_control_panel.master")
        assert master_state is not None
        assert master_state.attributes["open_sensors"] == {
            "binary_sensor.area_2_door": "open"
        }
        master_failures = [args for area_id, args in failed_events if area_id is None]
        assert len(master_failures) == 1
        assert "binary_sensor.area_2_door" in master_failures[0]["open_sensors"]


@pytest.mark.asyncio
async def test_alarm_master_exit_delay_mixed_failures_and_push_force_arm(
    hass: Any, enable_custom_integrations: Any
) -> None:
    """Exit-delay/skip-delay failures aggregate sensors and support push retry."""
    storage, entry = _setup_master_areas(
        hass, "test_master_exit_delay_failures", count=3, exit_times=10
    )

    with patch_alarmo_integration_dependencies(storage):
        await hass.config_entries.async_setup(entry.entry_id)
        await hass.async_block_till_done()

        failed_events: list[tuple[str | None, dict[str, Any]]] = []
        async_dispatcher_connect(
            hass,
            "alarmo_event",
            lambda event_type, area_id, args: (
                failed_events.append((area_id, args))
                if event_type == const.EVENT_FAILED_TO_ARM
                else None
            ),
        )

        for i in range(1, 4):
            hass.states.async_set(f"binary_sensor.area_{i}_door", "off")
        await hass.async_block_till_done()

        await _arm_or_disarm(hass, "alarm_arm_away", "alarm_control_panel.master")
        await advance_time(hass, 11)
        assert_alarm_state(hass, "alarm_control_panel.master", "armed_away")

        # Disarm areas 1 & 2 and open both doors -> simultaneous exit-delay failure
        await _arm_or_disarm(hass, "alarm_disarm", "alarm_control_panel.area_1")
        await _arm_or_disarm(hass, "alarm_disarm", "alarm_control_panel.area_2")
        hass.states.async_set("binary_sensor.area_1_door", "on")
        hass.states.async_set("binary_sensor.area_2_door", "on")
        await hass.async_block_till_done()

        expected_mixed = {
            "alarm_control_panel.area_1": "disarmed",
            "alarm_control_panel.area_2": "disarmed",
            "alarm_control_panel.area_3": "armed_away",
            "alarm_control_panel.master": "armed_away",
        }
        expected_open = {
            "binary_sensor.area_1_door": "open",
            "binary_sensor.area_2_door": "open",
        }

        await _arm_or_disarm(hass, "alarm_arm_away", "alarm_control_panel.master")
        assert_alarm_state(hass, "alarm_control_panel.master", "arming")
        await advance_time(hass, 11)
        _assert_states(hass, expected_mixed, expected_open)

        # Re-arm and skip delay -> reverts areas 1 & 2, preserves master armed_away
        await _arm_or_disarm(hass, "alarm_arm_away", "alarm_control_panel.master")
        assert_alarm_state(hass, "alarm_control_panel.master", "arming")
        await hass.services.async_call(
            const.DOMAIN,
            const.SERVICE_SKIP_DELAY,
            {"entity_id": "alarm_control_panel.master"},
            blocking=True,
        )
        await hass.async_block_till_done()
        _assert_states(hass, expected_mixed, expected_open)

        # Full failure from disarmed emits one master event and enables push force-arm
        await _arm_or_disarm(hass, "alarm_disarm", "alarm_control_panel.area_3")
        failed_events.clear()
        await _arm_or_disarm(hass, "alarm_arm_away", "alarm_control_panel.master")
        await advance_time(hass, 11)
        assert_alarm_state(hass, "alarm_control_panel.master", "disarmed")
        master_failures = [args for area_id, args in failed_events if area_id is None]
        assert len(master_failures) == 1
        assert master_failures[0]["command"] == "arm_away"

        hass.bus.async_fire(const.PUSH_EVENT, {"action": const.EVENT_ACTION_FORCE_ARM})
        await hass.async_block_till_done()
        assert_alarm_state(hass, "alarm_control_panel.master", "arming")
        await advance_time(hass, 11)
        _assert_states(
            hass,
            {
                "alarm_control_panel.area_1": "armed_away",
                "alarm_control_panel.area_2": "armed_away",
                "alarm_control_panel.area_3": "armed_away",
                "alarm_control_panel.master": "armed_away",
            },
        )

        await cleanup_timers(hass)


@pytest.mark.asyncio
async def test_alarm_master_partial_disarm_during_arming_clears_tracking(
    hass: Any, enable_custom_integrations: Any
) -> None:
    """Partial disarm during arming clears master state after remaining finish."""
    storage, entry = _setup_master_areas(
        hass,
        "test_master_partial_disarm_tracking",
        exit_times=(10, 20),
        use_exit_delay=False,
    )

    with patch_alarmo_integration_dependencies(storage):
        await hass.config_entries.async_setup(entry.entry_id)
        await hass.async_block_till_done()

        failed_events: list[tuple[str | None, dict[str, Any]]] = []
        async_dispatcher_connect(
            hass,
            "alarmo_event",
            lambda event_type, area_id, args: (
                failed_events.append((area_id, args))
                if event_type == const.EVENT_FAILED_TO_ARM
                else None
            ),
        )

        hass.states.async_set("binary_sensor.area_1_door", "off")
        hass.states.async_set("binary_sensor.area_2_door", "off")
        await hass.async_block_till_done()

        await _arm_or_disarm(hass, "alarm_arm_away", "alarm_control_panel.master")
        await advance_time(hass, 5)
        await _arm_or_disarm(hass, "alarm_disarm", "alarm_control_panel.area_1")
        await advance_time(hass, 25)

        assert_alarm_state(hass, "alarm_control_panel.area_1", "disarmed")
        assert_alarm_state(hass, "alarm_control_panel.area_2", "armed_away")
        assert_alarm_state(hass, "alarm_control_panel.master", "disarmed")

        # Subsequent single-area failure on area 1 must not disarm armed area 2
        hass.states.async_set("binary_sensor.area_1_door", "on")
        await hass.async_block_till_done()
        failed_events.clear()
        await _arm_or_disarm(hass, "alarm_arm_away", "alarm_control_panel.area_1")

        assert_alarm_state(hass, "alarm_control_panel.area_1", "disarmed")
        assert_alarm_state(hass, "alarm_control_panel.area_2", "armed_away")
        assert [e for e in failed_events if e[0] is None] == []

        await cleanup_timers(hass)


@pytest.mark.asyncio
async def test_alarm_master_sub_area_arm_abort_restores_prior_master_state(
    hass: Any, enable_custom_integrations: Any
) -> None:
    """Aborting sub-area arming restores master to its exact pre-arming state."""
    storage, entry = _setup_master_areas(
        hass,
        "test_master_sub_area_abort_state",
        modes=("armed_away", "armed_home"),
        exit_times=10,
        use_exit_delay=False,
    )

    with patch_alarmo_integration_dependencies(storage):
        await hass.config_entries.async_setup(entry.entry_id)
        await hass.async_block_till_done()

        hass.states.async_set("binary_sensor.area_1_door", "off")
        hass.states.async_set("binary_sensor.area_2_door", "off")
        await hass.async_block_till_done()

        # Case 2B: Areas armed individually (master never armed directly)
        await _arm_or_disarm(hass, "alarm_arm_away", "alarm_control_panel.area_1")
        await _arm_or_disarm(hass, "alarm_arm_away", "alarm_control_panel.area_2")
        await advance_time(hass, 11)
        assert_alarm_state(hass, "alarm_control_panel.master", "armed_away")

        await _arm_or_disarm(hass, "alarm_disarm", "alarm_control_panel.area_1")
        await _arm_or_disarm(hass, "alarm_arm_away", "alarm_control_panel.area_1")
        assert_alarm_state(hass, "alarm_control_panel.master", "arming")
        await _arm_or_disarm(hass, "alarm_disarm", "alarm_control_panel.area_1")
        assert_alarm_state(hass, "alarm_control_panel.master", "armed_away")

        # Case 2C: Failed master arm_away + mixed armed_home + aborted armed_away
        await _arm_or_disarm(hass, "alarm_disarm", "alarm_control_panel.area_2")
        assert_alarm_state(hass, "alarm_control_panel.master", "disarmed")

        hass.states.async_set("binary_sensor.area_1_door", "on")
        await hass.async_block_till_done()
        await _arm_or_disarm(hass, "alarm_arm_away", "alarm_control_panel.master")
        assert_alarm_state(hass, "alarm_control_panel.master", "disarmed")

        hass.states.async_set("binary_sensor.area_1_door", "off")
        await hass.async_block_till_done()
        await _arm_or_disarm(hass, "alarm_arm_home", "alarm_control_panel.area_2")
        assert_alarm_state(hass, "alarm_control_panel.master", "disarmed")

        await _arm_or_disarm(hass, "alarm_arm_away", "alarm_control_panel.area_1")
        assert_alarm_state(hass, "alarm_control_panel.master", "arming")
        await _arm_or_disarm(hass, "alarm_disarm", "alarm_control_panel.area_1")
        assert_alarm_state(hass, "alarm_control_panel.master", "disarmed")

        # Case 2A: Master armed from disarmed, sub-area disarmed, sub-area arm aborted
        await _arm_or_disarm(hass, "alarm_disarm", "alarm_control_panel.area_2")
        await _arm_or_disarm(hass, "alarm_arm_away", "alarm_control_panel.master")
        await advance_time(hass, 11)
        assert_alarm_state(hass, "alarm_control_panel.master", "armed_away")

        await _arm_or_disarm(hass, "alarm_disarm", "alarm_control_panel.area_1")
        await _arm_or_disarm(hass, "alarm_arm_away", "alarm_control_panel.area_1")
        assert_alarm_state(hass, "alarm_control_panel.master", "arming")
        await _arm_or_disarm(hass, "alarm_disarm", "alarm_control_panel.area_1")
        assert_alarm_state(hass, "alarm_control_panel.master", "armed_away")
        assert_alarm_state(hass, "alarm_control_panel.area_2", "armed_away")

        await cleanup_timers(hass)
