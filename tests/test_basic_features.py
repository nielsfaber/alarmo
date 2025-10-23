"""test_basic_features.py

General feature tests for Alarmo (arming, disarming, state transitions, event firing).
"""

from typing import Any, cast

import pytest

from tests.helpers import (
    advance_time,
    cleanup_timers,
    assert_alarm_state,
    setup_alarmo_entry,
    patch_alarmo_integration_dependencies,
)
from tests.factories import AreaFactory, SensorFactory

ALARM_ENTITY = "alarm_control_panel.test_area_1"
MASTER_ENTITY = "alarm_control_panel.master"


@pytest.fixture(autouse=True)
def expected_lingering_timers():
    """Fix expected lingering timers for tests."""
    return True


def get_generic_sensor():
    """Get the generic sensor entity ID."""
    return "binary_sensor.generic_area_1_door_sensor"


@pytest.mark.asyncio
async def test_arm_immediate_arms_right_away_with_allow_open(
    hass: Any, enable_custom_integrations: Any
):
    """Test that alarm arms immediately if area exit_time=0"""
    sensor = "binary_sensor.generic_area_1_door_sensor"
    alarm_entity = "alarm_control_panel.test_area_1"
    armed_away_exit_time = 0

    area = AreaFactory.create_area(
        area_id="area_1",
        modes=["armed_away"],
        armed_away_exit_time=armed_away_exit_time,
        armed_away_enabled=True,
    )
    sensor_config = SensorFactory.create_door_sensor(entity_id=sensor, allow_open=True)
    storage, entry = setup_alarmo_entry(
        hass, areas=[area], sensors=[sensor_config], entry_id="test_immediate_arm"
    )
    with patch_alarmo_integration_dependencies(storage):
        await hass.config_entries.async_setup(entry.entry_id)
        await hass.async_block_till_done()
        hass.states.async_set(alarm_entity, "disarmed")
        hass.states.async_set(sensor, "on")
        await hass.async_block_till_done()
        await hass.services.async_call(
            "alarmo",
            "arm",
            {"entity_id": alarm_entity, "code": "1234"},
            blocking=True,
        )
        await hass.async_block_till_done()
        await advance_time(
            hass, armed_away_exit_time + 1
        )  # Use variable, +1 for clarity even if 0
        state = hass.states.get(alarm_entity)
        assert state.state == "armed_away"
        await cleanup_timers(hass)


@pytest.mark.asyncio
async def test_arm_away_from_disarmed(hass: Any, enable_custom_integrations: Any):
    """Test arm away from disarmed"""
    sensor = get_generic_sensor()
    # Using default AreaFactory armed_away_exit_time = 10
    default_armed_away_exit_time = 10
    area = AreaFactory.create_area(area_id="area_1")
    sensor_config = SensorFactory.create_door_sensor(entity_id=sensor)
    storage, entry = setup_alarmo_entry(
        hass,
        areas=[area],
        sensors=[sensor_config],
        entry_id="test_arm_away_from_disarmed",
    )
    with patch_alarmo_integration_dependencies(storage):
        await hass.config_entries.async_setup(entry.entry_id)
        await hass.async_block_till_done()
        hass.states.async_set("alarm_control_panel.test_area_1", "disarmed")
        hass.states.async_set(sensor, "off")
        await hass.async_block_till_done()
        await hass.services.async_call(
            "alarmo",
            "arm",
            {"entity_id": "alarm_control_panel.test_area_1", "code": "1234"},
            blocking=True,
        )
        await advance_time(hass, default_armed_away_exit_time + 1)
        assert_alarm_state(hass, "alarm_control_panel.test_area_1", "armed_away")


def get_area_mode_time(area_id: str, mode: str, key: str) -> int:
    """Get the time value for a given area, mode, and key (exit_time, entry_time, trigger_time)."""
    if area_id == "area_1":
        area_config = AreaFactory.create_area()
    elif area_id == "area_2":
        area_config = AreaFactory.create_area_2()
    else:
        raise ValueError(f"Unknown area_id: {area_id}")

    modes = cast(dict[str, dict[str, Any]], area_config["modes"])
    if mode not in modes:
        # Fallback to default mode if specific mode config not found (e.g. always_on uses armed_away trigger)
        if key == "trigger_time" and "armed_away" in modes:
            time_value = modes["armed_away"].get(key)
        else:
            raise ValueError(f"Unknown mode: {mode} for area {area_id}")
    else:
        time_value = modes[mode].get(key)

    if time_value is None:
        raise ValueError(f"No {key} defined for {area_id}.{mode}")

    return time_value


@pytest.mark.asyncio
async def test_disarm_from_armed_away(hass: Any, enable_custom_integrations: Any):
    """Test disarm from armed away"""
    sensor = get_generic_sensor()
    # Using default AreaFactory armed_away_exit_time = 10
    default_armed_away_exit_time = 10
    area = AreaFactory.create_area(area_id="area_1")
    sensor_config = SensorFactory.create_door_sensor(entity_id=sensor)
    storage, entry = setup_alarmo_entry(
        hass,
        areas=[area],
        sensors=[sensor_config],
        entry_id="test_disarm_from_armed_away",
    )
    with patch_alarmo_integration_dependencies(storage):
        await hass.config_entries.async_setup(entry.entry_id)
        await hass.async_block_till_done()
    hass.states.async_set("alarm_control_panel.test_area_1", "disarmed")
    hass.states.async_set(sensor, "off")
    await hass.async_block_till_done()
    await hass.services.async_call(
        "alarmo",
        "arm",
        {"entity_id": "alarm_control_panel.test_area_1", "code": "1234"},
        blocking=True,
    )
    await advance_time(hass, default_armed_away_exit_time + 1)
    state = hass.states.get("alarm_control_panel.test_area_1")
    assert state.state in ["arming", "armed_away"]
    await hass.services.async_call(
        "alarmo",
        "disarm",
        {"entity_id": "alarm_control_panel.test_area_1", "code": "1234"},
        blocking=True,
    )
    await advance_time(
        hass, default_armed_away_exit_time + 1
    )  # Allow time for disarm to propagate if needed
    assert_alarm_state(hass, "alarm_control_panel.test_area_1", "disarmed")


@pytest.mark.asyncio
async def test_arm_home_from_disarmed(hass: Any, enable_custom_integrations: Any):
    """Test arm home from disarmed with immediate arming (no exit delay)"""
    sensor = get_generic_sensor()
    armed_home_exit_time = 0
    area = AreaFactory.create_area(
        area_id="area_1",
        modes=["armed_home"],
        armed_home_exit_time=armed_home_exit_time,
        armed_home_enabled=True,
    )
    sensor_config = SensorFactory.create_door_sensor(
        entity_id=sensor, modes=["armed_home"], use_exit_delay=False
    )
    storage, entry = setup_alarmo_entry(
        hass,
        areas=[area],
        sensors=[sensor_config],
        entry_id="test_arm_home_from_disarmed",
    )
    with patch_alarmo_integration_dependencies(storage):
        await hass.config_entries.async_setup(entry.entry_id)
        await hass.async_block_till_done()
        hass.states.async_set("alarm_control_panel.test_area_1", "disarmed")
        hass.states.async_set(sensor, "off")
        await hass.async_block_till_done()
        await hass.services.async_call(
            "alarmo",
            "arm",
            {
                "entity_id": "alarm_control_panel.test_area_1",
                "code": "1234",
                "mode": "home",
            },
            blocking=True,
        )
        await advance_time(hass, armed_home_exit_time + 1)
        assert_alarm_state(hass, "alarm_control_panel.test_area_1", "armed_home")


@pytest.mark.asyncio
async def test_arm_with_invalid_code(hass: Any, enable_custom_integrations: Any):
    """Test arm with invalid code"""
    sensor = get_generic_sensor()
    # Using default AreaFactory, no specific times needed for this test logic
    area = AreaFactory.create_area(area_id="area_1")
    sensor_config = SensorFactory.create_door_sensor(entity_id=sensor)
    storage, entry = setup_alarmo_entry(
        hass,
        areas=[area],
        sensors=[sensor_config],
        entry_id="test_arm_with_invalid_code",
    )
    with patch_alarmo_integration_dependencies(storage):
        await hass.config_entries.async_setup(entry.entry_id)
        await hass.async_block_till_done()
        hass.states.async_set("alarm_control_panel.test_area_1", "disarmed")
        hass.states.async_set(sensor, "off")
        await hass.async_block_till_done()
        await hass.services.async_call(
            "alarmo",
            "arm",
            {"entity_id": "alarm_control_panel.test_area_1", "code": "wrongcode"},
            blocking=True,
        )
        assert_alarm_state(hass, "alarm_control_panel.test_area_1", "disarmed")


@pytest.mark.asyncio
@pytest.mark.usefixtures("expected_lingering_timers")
async def test_armed_away_entry_delay_and_trigger(
    hass: Any, enable_custom_integrations: Any
):
    """Test entry delay and triggering in armed_away mode (no exit delay)."""
    sensor = get_generic_sensor()
    armed_away_exit_time = 0
    armed_away_entry_time = get_area_mode_time("area_1", "armed_away", "entry_time")

    area = AreaFactory.create_area(
        area_id="area_1",
        modes=["armed_away"],
        armed_away_exit_time=armed_away_exit_time,
        armed_away_enabled=True,
    )
    sensor_config = SensorFactory.create_door_sensor(
        entity_id=sensor, use_exit_delay=False, use_entry_delay=True
    )
    storage, entry = setup_alarmo_entry(
        hass,
        areas=[area],
        sensors=[sensor_config],
        entry_id="test_armed_away_entry_delay_and_trigger",
    )
    with patch_alarmo_integration_dependencies(storage):
        await hass.config_entries.async_setup(entry.entry_id)
        await hass.async_block_till_done()
        hass.states.async_set(ALARM_ENTITY, "disarmed")
        hass.states.async_set(sensor, "off")
        await hass.services.async_call(
            "alarmo",
            "arm",
            {"entity_id": ALARM_ENTITY, "code": "1234"},
            blocking=True,
        )
        await hass.async_block_till_done()
        assert_alarm_state(hass, ALARM_ENTITY, "armed_away")

        hass.states.async_set(sensor, "on")
        await hass.async_block_till_done()
        state = hass.states.get(ALARM_ENTITY)
        if state.state != "pending":
            await hass.async_block_till_done()
            state = hass.states.get(ALARM_ENTITY)
        assert state.state == "pending"

        await advance_time(hass, armed_away_entry_time + 1)
        assert_alarm_state(hass, ALARM_ENTITY, "triggered")

        await cleanup_timers(hass)


@pytest.mark.asyncio
async def test_arm_with_exit_delay_and_allow_open(
    hass: Any, enable_custom_integrations: Any
):
    """Test arming with a sensor that has use_exit_delay=True and allow_open=True"""
    sensor = get_generic_sensor()
    armed_away_exit_time = 20

    area = AreaFactory.create_area(
        area_id="area_1",
        modes=["armed_away"],
        armed_away_exit_time=armed_away_exit_time,
        armed_away_enabled=True,
    )
    sensor_config = SensorFactory.create_door_sensor(
        entity_id=sensor, allow_open=True, use_exit_delay=True, use_entry_delay=True
    )
    storage, entry = setup_alarmo_entry(
        hass,
        areas=[area],
        sensors=[sensor_config],
        entry_id="test_arm_with_exit_delay_and_allow_open",
    )
    with patch_alarmo_integration_dependencies(storage):
        await hass.config_entries.async_setup(entry.entry_id)
        await hass.async_block_till_done()
        hass.states.async_set(ALARM_ENTITY, "disarmed")
        hass.states.async_set(sensor, "on")
        await hass.services.async_call(
            "alarmo",
            "arm",
            {"entity_id": ALARM_ENTITY, "code": "1234"},
            blocking=True,
        )
        await hass.async_block_till_done()
        assert_alarm_state(hass, ALARM_ENTITY, "arming")
        await advance_time(hass, armed_away_exit_time + 1)
        assert_alarm_state(hass, ALARM_ENTITY, "armed_away")
        await cleanup_timers(hass)


@pytest.mark.asyncio
async def test_sensor_always_on_triggers_when_disarmed(
    hass: Any, enable_custom_integrations: Any
):
    """Test that a sensor with always_on: True triggers the alarm even when disarmed."""
    sensor = get_generic_sensor()
    # For always_on, specific mode times (like armed_away_trigger_time) are used.
    # AreaFactory default for armed_away.trigger_time is 120

    area = AreaFactory.create_area(
        area_id="area_1", modes=["armed_away"], armed_away_enabled=True
    )
    sensor_config = SensorFactory.create_door_sensor(
        entity_id=sensor, always_on=True, use_exit_delay=False, use_entry_delay=False
    )
    storage, entry = setup_alarmo_entry(
        hass, areas=[area], sensors=[sensor_config], entry_id="test_always_on_sensor"
    )
    with patch_alarmo_integration_dependencies(storage):
        await hass.config_entries.async_setup(entry.entry_id)
        await hass.async_block_till_done()
        hass.states.async_set(ALARM_ENTITY, "disarmed")
        hass.states.async_set(sensor, "off")
        await hass.async_block_till_done()

        hass.states.async_set(sensor, "on")
        await hass.async_block_till_done()
        await advance_time(hass, 1)  # Time for state to propagate
        assert_alarm_state(hass, ALARM_ENTITY, "triggered")
        await cleanup_timers(hass)


@pytest.mark.asyncio
async def test_arm_away_with_exit_delay(hass: Any, enable_custom_integrations: Any):
    """Test arm away with exit delay"""
    sensor = get_generic_sensor()
    armed_away_exit_time = 30

    area = AreaFactory.create_area(
        area_id="area_1",
        modes=["armed_away"],
        armed_away_exit_time=armed_away_exit_time,
        armed_away_enabled=True,
    )
    sensor_config = SensorFactory.create_door_sensor(
        entity_id=sensor, use_exit_delay=True, use_entry_delay=True
    )
    storage, entry = setup_alarmo_entry(
        hass,
        areas=[area],
        sensors=[sensor_config],
        entry_id="test_arm_away_with_exit_delay",
    )
    with patch_alarmo_integration_dependencies(storage):
        await hass.config_entries.async_setup(entry.entry_id)
        await hass.async_block_till_done()
        hass.states.async_set(ALARM_ENTITY, "disarmed")
        hass.states.async_set(sensor, "off")
        await hass.services.async_call(
            "alarmo",
            "arm",
            {"entity_id": ALARM_ENTITY, "code": "1234"},
            blocking=True,
        )
        await hass.async_block_till_done()
        assert_alarm_state(hass, ALARM_ENTITY, "arming")
        await advance_time(hass, armed_away_exit_time + 1)
        assert_alarm_state(hass, ALARM_ENTITY, "armed_away")
        await cleanup_timers(hass)


@pytest.mark.asyncio
async def test_arm_blocked_with_triggered_sensor_and_no_allow_open(
    hass: Any, enable_custom_integrations: Any
):
    """Test arm blocked with triggered sensor and no allow open"""
    sensor = get_generic_sensor()
    armed_away_exit_time = 30

    area = AreaFactory.create_area(
        area_id="area_1",
        modes=["armed_away"],
        armed_away_exit_time=armed_away_exit_time,
        armed_away_enabled=True,
    )
    sensor_config = SensorFactory.create_door_sensor(
        entity_id=sensor, allow_open=False, use_exit_delay=True, use_entry_delay=True
    )
    storage, entry = setup_alarmo_entry(
        hass,
        areas=[area],
        sensors=[sensor_config],
        entry_id="test_arm_blocked_with_triggered_sensor_and_no_allow_open",
    )
    with patch_alarmo_integration_dependencies(storage):
        await hass.config_entries.async_setup(entry.entry_id)
        await hass.async_block_till_done()
        hass.states.async_set(ALARM_ENTITY, "disarmed")
        hass.states.async_set(sensor, "on")
        await hass.services.async_call(
            "alarmo",
            "arm",
            {"entity_id": ALARM_ENTITY, "code": "1234"},
            blocking=True,
        )
        await hass.async_block_till_done()
        assert_alarm_state(hass, ALARM_ENTITY, "arming")
        await advance_time(hass, armed_away_exit_time + 1)
        assert_alarm_state(hass, ALARM_ENTITY, "disarmed")


@pytest.mark.asyncio
@pytest.mark.usefixtures("expected_lingering_timers")
async def test_sensor_trigger_unavailable(hass: Any, enable_custom_integrations: Any):
    """Test that a sensor with trigger_unavailable, True triggers the alarm when unavailable."""
    sensor = get_generic_sensor()
    armed_away_exit_time = 0

    area = AreaFactory.create_area(
        area_id="area_1",
        modes=["armed_away"],
        armed_away_exit_time=armed_away_exit_time,
        armed_away_enabled=True,
    )
    sensor_config = SensorFactory.create_door_sensor(
        entity_id=sensor,
        trigger_unavailable=True,
        use_exit_delay=False,
        use_entry_delay=False,
    )
    storage, entry = setup_alarmo_entry(
        hass,
        areas=[area],
        sensors=[sensor_config],
        entry_id="test_sensor_trigger_unavailable",
    )
    with patch_alarmo_integration_dependencies(storage):
        await hass.config_entries.async_setup(entry.entry_id)
        await hass.async_block_till_done()
        hass.states.async_set(ALARM_ENTITY, "disarmed")
        hass.states.async_set(sensor, "off")
        await hass.async_block_till_done()
        await hass.services.async_call(
            "alarmo",
            "arm",
            {"entity_id": ALARM_ENTITY, "code": "1234"},
            blocking=True,
        )
        await hass.async_block_till_done()
        await advance_time(hass, armed_away_exit_time + 1)
        assert_alarm_state(hass, ALARM_ENTITY, "armed_away")

        hass.states.async_set(sensor, "unavailable")
        await hass.async_block_till_done()
        await advance_time(hass, 1)  # Time for state to propagate
        assert_alarm_state(hass, ALARM_ENTITY, "triggered")
        await cleanup_timers(hass)
