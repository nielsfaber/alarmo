"""Test bypass mode."""

from typing import Any

import pytest

from tests.factories import AreaFactory, SensorFactory
from tests.helpers import (
    advance_time,
    assert_alarm_state,
    patch_alarmo_integration_dependencies,
    setup_alarmo_entry,
)


@pytest.mark.asyncio
async def test_auto_bypass_true_integration(
    hass: Any, enable_custom_integrations: Any
) -> None:
    """Test that a sensor with auto_bypass true and correct mode is bypassed and alarm arms."""
    alarm_entity = "alarm_control_panel.test_area_1"
    bypass_sensor = "binary_sensor.generic_area_1_door_sensor"
    block_sensor = "binary_sensor.generic_area_1_motion_sensor"
    block_sensor2 = "binary_sensor.generic_area_2_motion_sensor"
    block_sensor3 = "binary_sensor.generic_area_2_window_sensor"
    area_1 = AreaFactory.create_area(area_id="area_1", name="Test Area 1")
    area_2 = AreaFactory.create_area(area_id="area_2", name="Test Area 2")
    sensors = [
        SensorFactory.create_door_sensor(
            entity_id=bypass_sensor,
            name="Generic Area 1 Door",
            area="area_1",
            modes=["armed_away"],
            auto_bypass=True,
            auto_bypass_modes=["armed_away"],
        ),
        SensorFactory.create_motion_sensor(
            entity_id=block_sensor,
            name="Generic Area 1 Motion",
            area="area_1",
            modes=["armed_away"],
            auto_bypass=False,
            auto_bypass_modes=[],
            use_exit_delay=False,
            use_entry_delay=True,
        ),
        SensorFactory.create_motion_sensor(
            entity_id=block_sensor2,
            name="Generic Area 2 Motion",
            area="area_2",
            modes=["armed_away"],
            auto_bypass=False,
            auto_bypass_modes=[],
            use_exit_delay=True,
            use_entry_delay=True,
        ),
        SensorFactory.create_window_sensor(
            entity_id=block_sensor3,
            name="Generic Area 2 Window",
            area="area_2",
            modes=["armed_away"],
            auto_bypass=False,
            auto_bypass_modes=[],
            use_exit_delay=True,
            use_entry_delay=True,
        ),
    ]
    storage, entry = setup_alarmo_entry(
        hass,
        areas=[area_1, area_2],
        sensors=sensors,
        entry_id="test_bypass_mode_true_integration",
    )
    with patch_alarmo_integration_dependencies(storage):
        await hass.config_entries.async_setup(entry.entry_id)
        await hass.async_block_till_done()
        for eid in [bypass_sensor, block_sensor, block_sensor2, block_sensor3]:
            hass.states.async_set(eid, "off")
            await hass.async_block_till_done()
        hass.states.async_set(bypass_sensor, "on")
        await hass.async_block_till_done()
        await hass.services.async_call(
            "alarmo",
            "arm",
            {"entity_id": alarm_entity, "code": "1234"},
            blocking=True,
        )
        await hass.async_block_till_done()
        area = AreaFactory.create_area(area_id="area_1")
        exit_time = area["modes"]["armed_away"]["exit_time"]
        await advance_time(hass, exit_time + 1)
        state = hass.states.get(alarm_entity)
        assert state.state == "armed_away"
        assert "bypassed_sensors" in state.attributes
        assert bypass_sensor in (state.attributes["bypassed_sensors"] or [])


@pytest.mark.asyncio
async def test_auto_bypass_false_single_sensor(
    hass: Any, enable_custom_integrations: Any
) -> None:
    """Test that a single sensor with auto_bypass false blocks arming if open (area_1 only)."""
    alarm_entity = "alarm_control_panel.test_area_1"
    bypass_sensor = "binary_sensor.generic_area_1_door_sensor"
    block_sensor = "binary_sensor.generic_area_1_motion_sensor"
    area_1 = AreaFactory.create_area(area_id="area_1")
    sensors = [
        SensorFactory.create_door_sensor(
            entity_id=bypass_sensor,
            name="Generic Area 1 Door",
            area="area_1",
            modes=["armed_away"],
            auto_bypass=True,
            auto_bypass_modes=["armed_away"],
        ),
        SensorFactory.create_motion_sensor(
            entity_id=block_sensor,
            name="Generic Area 1 Motion",
            area="area_1",
            modes=["armed_away"],
            auto_bypass=False,
            auto_bypass_modes=[],
            use_exit_delay=False,
            use_entry_delay=True,
        ),
    ]
    storage, entry = setup_alarmo_entry(
        hass,
        areas=[area_1],
        sensors=sensors,
        entry_id="test_bypass_mode_false_single_sensor",
    )
    with patch_alarmo_integration_dependencies(storage):
        await hass.config_entries.async_setup(entry.entry_id)
        await hass.async_block_till_done()
        hass.states.async_set(block_sensor, "on")
        await hass.async_block_till_done()
        await hass.services.async_call(
            "alarmo",
            "arm",
            {"entity_id": alarm_entity, "code": "1234"},
            blocking=True,
        )
        await hass.async_block_till_done()
        assert_alarm_state(hass, alarm_entity, "disarmed")
        state = hass.states.get(alarm_entity)
        assert not state.attributes.get("bypassed_sensors")
        hass.states.async_set(block_sensor, "off")
        await hass.async_block_till_done()


@pytest.mark.asyncio
async def test_auto_bypass_false_multiple_areas_exit_delay(
    hass: Any, enable_custom_integrations: Any
) -> None:
    """
    Test that arming both areas with open, non-bypassable sensors, results
    in both areas being disarmed after exit delay.
    """
    alarm_entity_1 = "alarm_control_panel.test_area_1"
    alarm_entity_2 = "alarm_control_panel.test_area_2"
    bypass_sensor = "binary_sensor.generic_area_1_door_sensor"
    block_sensor = "binary_sensor.generic_area_1_motion_sensor"
    block_sensor2 = "binary_sensor.generic_area_2_motion_sensor"
    block_sensor3 = "binary_sensor.generic_area_2_window_sensor"
    area_1 = AreaFactory.create_area(area_id="area_1", name="Test Area 1")
    area_2 = AreaFactory.create_area(area_id="area_2", name="Test Area 2")
    sensors = [
        SensorFactory.create_door_sensor(
            entity_id=bypass_sensor,
            name="Generic Area 1 Door",
            area="area_1",
            modes=["armed_away"],
            auto_bypass=True,
            auto_bypass_modes=["armed_away"],
        ),
        SensorFactory.create_motion_sensor(
            entity_id=block_sensor,
            name="Generic Area 1 Motion",
            area="area_1",
            modes=["armed_away"],
            auto_bypass=False,
            auto_bypass_modes=[],
            use_exit_delay=False,
            use_entry_delay=True,
        ),
        SensorFactory.create_motion_sensor(
            entity_id=block_sensor2,
            name="Generic Area 2 Motion",
            area="area_2",
            modes=["armed_away"],
            auto_bypass=False,
            auto_bypass_modes=[],
            use_exit_delay=True,
            use_entry_delay=True,
        ),
        SensorFactory.create_window_sensor(
            entity_id=block_sensor3,
            name="Generic Area 2 Window",
            area="area_2",
            modes=["armed_away"],
            auto_bypass=False,
            auto_bypass_modes=[],
            use_exit_delay=True,
            use_entry_delay=True,
        ),
    ]
    storage, entry = setup_alarmo_entry(
        hass,
        areas=[area_1, area_2],
        sensors=sensors,
        entry_id="test_bypass_mode_false_multiple_areas",
    )
    with patch_alarmo_integration_dependencies(storage):
        await hass.config_entries.async_setup(entry.entry_id)
        await hass.async_block_till_done()
        hass.states.async_set(block_sensor, "on")  # area_1
        hass.states.async_set(block_sensor2, "on")  # area_2
        await hass.async_block_till_done()
        for area_entity in [alarm_entity_1, alarm_entity_2]:
            await hass.services.async_call(
                "alarmo",
                "arm",
                {"entity_id": area_entity, "code": "1234"},
                blocking=True,
            )
            await hass.async_block_till_done()
        area = AreaFactory.create_area(area_id="area_1")
        exit_time = area["modes"]["armed_away"]["exit_time"]
        await advance_time(hass, exit_time + 1)
        for area_entity in [alarm_entity_1, alarm_entity_2]:
            assert_alarm_state(hass, area_entity, "disarmed")
        hass.states.async_set(block_sensor, "off")
        hass.states.async_set(block_sensor2, "off")
        await hass.async_block_till_done()


@pytest.mark.asyncio
async def test_auto_bypass_modes_not_matched(
    hass: Any, enable_custom_integrations: Any
) -> None:
    """
    Test that a sensor with auto_bypass=True but arming in a mode NOT in auto_bypass_modes
    doesn't get bypassed.
    """
    alarm_entity = "alarm_control_panel.test_area_1"
    bypass_sensor = "binary_sensor.generic_area_1_door_sensor"
    area_1 = AreaFactory.create_area(
        area_id="area_1", modes=["armed_away", "armed_home"]
    )
    sensors = [
        SensorFactory.create_door_sensor(
            entity_id=bypass_sensor,
            name="Generic Area 1 Door",
            area="area_1",
            auto_bypass=True,
            auto_bypass_modes=["armed_away"],  # Only bypass in away mode
            modes=["armed_away", "armed_home"],
        )
    ]
    storage, entry = setup_alarmo_entry(
        hass,
        areas=[area_1],
        sensors=sensors,
        entry_id="test_auto_bypass_modes_not_matched",
    )
    with patch_alarmo_integration_dependencies(storage):
        await hass.config_entries.async_setup(entry.entry_id)
        await hass.async_block_till_done()
        hass.states.async_set(bypass_sensor, "off")
        await hass.async_block_till_done()
        hass.states.async_set(bypass_sensor, "on")
        await hass.async_block_till_done()
        await hass.services.async_call(
            "alarmo",
            "arm",
            {"entity_id": alarm_entity, "code": "1234", "mode": "home"},
            blocking=True,
        )
        await hass.async_block_till_done()
        area = AreaFactory.create_area(area_id="area_1")
        exit_time = area["modes"]["armed_away"]["exit_time"]
        await advance_time(hass, exit_time + 1)
        state = hass.states.get(alarm_entity)
        assert state.state == "disarmed"
        bypassed = state.attributes.get("bypassed_sensors")
        assert not bypassed or bypass_sensor not in bypassed


@pytest.mark.asyncio
async def test_auto_bypass_multiple_modes(
    hass: Any, enable_custom_integrations: Any
) -> None:
    """
    Test that a sensor with multiple modes in auto_bypass_modes
     gets bypassed in each specified mode.
    """
    alarm_entity = "alarm_control_panel.test_area_1"
    bypass_sensor = "binary_sensor.generic_area_1_door_sensor"
    area_1 = AreaFactory.create_area(
        area_id="area_1", modes=["armed_away", "armed_home"]
    )
    sensors = [
        SensorFactory.create_door_sensor(
            entity_id=bypass_sensor,
            name="Generic Area 1 Door",
            area="area_1",
            auto_bypass=True,
            auto_bypass_modes=["armed_away", "armed_home"],
            modes=["armed_away", "armed_home"],
        )
    ]
    storage, entry = setup_alarmo_entry(
        hass,
        areas=[area_1],
        sensors=sensors,
        entry_id="test_auto_bypass_multiple_modes",
    )
    with patch_alarmo_integration_dependencies(storage):
        await hass.config_entries.async_setup(entry.entry_id)
        await hass.async_block_till_done()
        hass.states.async_set(bypass_sensor, "off")
        await hass.async_block_till_done()
        hass.states.async_set(bypass_sensor, "on")
        await hass.async_block_till_done()
        for mode in ["away", "home"]:
            await hass.services.async_call(
                "alarmo",
                "arm",
                {"entity_id": alarm_entity, "code": "1234", "mode": mode},
                blocking=True,
            )
            await hass.async_block_till_done()
            area = AreaFactory.create_area(area_id="area_1")
            exit_time = area["modes"][f"armed_{mode}"]["exit_time"]
            await advance_time(hass, exit_time + 1)
            state = hass.states.get(alarm_entity)
            assert state.state == f"armed_{mode}"
            assert "bypassed_sensors" in state.attributes
            assert bypass_sensor in state.attributes["bypassed_sensors"]
            await hass.services.async_call(
                "alarmo",
                "disarm",
                {"entity_id": alarm_entity, "code": "1234"},
                blocking=True,
            )
            await hass.async_block_till_done()


@pytest.mark.asyncio
async def test_auto_bypass_empty_modes(
    hass: Any, enable_custom_integrations: Any
) -> None:
    """
    Test for a sensor with auto_bypass=True but empty auto_bypass_modes.
    This scenario is restricted in the UI and the sensor config service but
    it should not fail in unexpected ways
    Verify the sensor is not bypassed
    """
    alarm_entity = "alarm_control_panel.test_area_1"
    bypass_sensor = "binary_sensor.generic_area_1_door_sensor"
    area_1 = AreaFactory.create_area(
        area_id="area_1", modes=["armed_away", "armed_home"]
    )
    sensors = [
        SensorFactory.create_door_sensor(
            entity_id=bypass_sensor,
            name="Generic Area 1 Door",
            area="area_1",
            auto_bypass=True,
            auto_bypass_modes=[],  # Empty auto_bypass_modes array
            modes=["armed_away", "armed_home"],
        )
    ]
    storage, entry = setup_alarmo_entry(
        hass, areas=[area_1], sensors=sensors, entry_id="test_auto_bypass_empty_modes"
    )
    with patch_alarmo_integration_dependencies(storage):
        await hass.config_entries.async_setup(entry.entry_id)
        await hass.async_block_till_done()
        hass.states.async_set(bypass_sensor, "off")
        await hass.async_block_till_done()
        hass.states.async_set(bypass_sensor, "on")
        await hass.async_block_till_done()
        await hass.services.async_call(
            "alarmo",
            "arm",
            {"entity_id": alarm_entity, "code": "1234", "mode": "away"},
            blocking=True,
        )
        await hass.async_block_till_done()
        area = AreaFactory.create_area(area_id="area_1")
        exit_time = area["modes"]["armed_away"]["exit_time"]
        await advance_time(hass, exit_time + 1)
        state = hass.states.get(alarm_entity)
        assert (
            state.state == "disarmed"
        ), "System should not arm with an open, non-bypassed sensor"
        bypassed = state.attributes.get("bypassed_sensors", [])
        msg = "Sensor should not be bypassed with empty auto_bypass_modes"
        assert not bypassed or bypass_sensor not in bypassed, msg
