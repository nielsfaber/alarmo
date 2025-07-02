"""Test environmental sensors that should always trigger the alarm regardless of arm state."""

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

ALARM_ENTITY = "alarm_control_panel.test_area_1"
SMOKE_SENSOR = "binary_sensor.smoke_detector"
CO_SENSOR = "binary_sensor.co_detector"
WATER_SENSOR = "binary_sensor.water_leak_detector"
HEAT_SENSOR = "binary_sensor.heat_detector"


def get_all_sensors() -> list[str]:
    """Get all sensors that should trigger the alarm."""
    return [SMOKE_SENSOR, CO_SENSOR, WATER_SENSOR, HEAT_SENSOR]


def get_environmental_sensors() -> list[dict[str, Any]]:
    """Get all environmental sensors that should trigger the alarm."""
    return [
        SensorFactory.create_sensor(
            entity_id=SMOKE_SENSOR,
            name="Smoke Detector",
            area="area_1",
            modes=["armed_away", "armed_home", "armed_night"],
            always_on=True,
            use_exit_delay=False,
            use_entry_delay=False,
            trigger_unavailable=True,
        ),
        SensorFactory.create_sensor(
            entity_id=CO_SENSOR,
            name="Carbon Monoxide Detector",
            area="area_1",
            modes=["armed_away", "armed_home", "armed_night"],
            always_on=True,
            use_exit_delay=False,
            use_entry_delay=False,
            trigger_unavailable=True,
        ),
        SensorFactory.create_sensor(
            entity_id=WATER_SENSOR,
            name="Water Leak Detector",
            area="area_1",
            modes=["armed_away", "armed_home", "armed_night"],
            always_on=True,
            use_exit_delay=False,
            use_entry_delay=False,
            trigger_unavailable=True,
        ),
        SensorFactory.create_sensor(
            entity_id=HEAT_SENSOR,
            name="Heat Detector",
            area="area_1",
            modes=["armed_away", "armed_home", "armed_night"],
            always_on=True,
            use_exit_delay=False,
            use_entry_delay=False,
            trigger_unavailable=True,
        ),
    ]


@pytest.mark.asyncio
async def test_environmental_sensor_disarmed_state(
    hass: Any, enable_custom_integrations: Any
) -> None:
    """Test that environmental sensors trigger alarm when system is disarmed."""
    area = AreaFactory.create_area(area_id="area_1", name="Test Area 1")
    sensors = get_environmental_sensors()
    storage, entry = setup_alarmo_entry(
        hass, areas=[area], sensors=sensors, entry_id="test_environmental_sensors"
    )
    with patch_alarmo_integration_dependencies(storage):
        await hass.config_entries.async_setup(entry.entry_id)
        await hass.async_block_till_done()
        for sensor_id in get_all_sensors():
            hass.states.async_set(sensor_id, "off")
            await hass.async_block_till_done()
        assert_alarm_state(hass, ALARM_ENTITY, "disarmed")
        hass.states.async_set(SMOKE_SENSOR, "on")
        await hass.async_block_till_done()
        await advance_time(hass, 1)
        state = hass.states.get(ALARM_ENTITY)
        assert state.state == "triggered"
        assert state.attributes.get("open_sensors") is not None
        assert SMOKE_SENSOR in str(state.attributes.get("open_sensors"))
        await cleanup_timers(hass)
        await hass.services.async_call(
            "alarmo",
            "disarm",
            {"entity_id": ALARM_ENTITY, "code": "1234"},
            blocking=True,
        )
        await hass.async_block_till_done()
        hass.states.async_set(SMOKE_SENSOR, "off")
        await hass.async_block_till_done()
        assert_alarm_state(hass, ALARM_ENTITY, "disarmed")
        hass.states.async_set(CO_SENSOR, "on")
        await hass.async_block_till_done()
        await advance_time(hass, 1)
        state = hass.states.get(ALARM_ENTITY)
        assert state.state == "triggered"
        assert CO_SENSOR in str(state.attributes.get("open_sensors"))
        await cleanup_timers(hass)
        await hass.services.async_call(
            "alarmo",
            "disarm",
            {"entity_id": ALARM_ENTITY, "code": "1234"},
            blocking=True,
        )
        await hass.async_block_till_done()


@pytest.mark.asyncio
async def test_environmental_sensor_armed_state(
    hass: Any, enable_custom_integrations: Any
) -> None:
    """Test that environmental sensors trigger alarm when system is armed."""
    area = AreaFactory.create_area(area_id="area_1", name="Test Area 1")
    sensors = get_environmental_sensors()
    storage, entry = setup_alarmo_entry(
        hass, areas=[area], sensors=sensors, entry_id="test_environmental_sensors"
    )
    with patch_alarmo_integration_dependencies(storage):
        await hass.config_entries.async_setup(entry.entry_id)
        await hass.async_block_till_done()
        for sensor_id in get_all_sensors():
            hass.states.async_set(sensor_id, "off")
            await hass.async_block_till_done()
        await hass.services.async_call(
            "alarmo",
            "arm",
            {"entity_id": ALARM_ENTITY, "code": "1234", "mode": "away"},
            blocking=True,
        )
        await hass.async_block_till_done()
        area = AreaFactory.create_area(area_id="area_1")
        exit_time = area["modes"]["armed_away"]["exit_time"]
        await advance_time(hass, exit_time + 1)
        assert_alarm_state(hass, ALARM_ENTITY, "armed_away")
        hass.states.async_set(WATER_SENSOR, "on")
        await hass.async_block_till_done()
        await advance_time(hass, 1)
        state = hass.states.get(ALARM_ENTITY)
        assert state.state == "triggered"
        assert WATER_SENSOR in str(state.attributes.get("open_sensors"))
        await cleanup_timers(hass)
        await hass.services.async_call(
            "alarmo",
            "disarm",
            {"entity_id": ALARM_ENTITY, "code": "1234"},
            blocking=True,
        )
        await hass.async_block_till_done()


@pytest.mark.asyncio
async def test_all_environmental_sensors(
    hass: Any, enable_custom_integrations: Any
) -> None:
    """Test all types of environmental sensors to verify they all trigger the alarm."""
    area = AreaFactory.create_area(area_id="area_1", name="Test Area 1")
    sensors = get_environmental_sensors()
    storage, entry = setup_alarmo_entry(
        hass, areas=[area], sensors=sensors, entry_id="test_environmental_sensors"
    )
    with patch_alarmo_integration_dependencies(storage):
        await hass.config_entries.async_setup(entry.entry_id)
        await hass.async_block_till_done()
        for sensor_id in get_all_sensors():
            await hass.services.async_call(
                "alarmo",
                "disarm",
                {"entity_id": ALARM_ENTITY, "code": "1234"},
                blocking=True,
            )
            await hass.async_block_till_done()
            for reset_id in get_all_sensors():
                hass.states.async_set(reset_id, "off")
                await hass.async_block_till_done()
            assert_alarm_state(hass, ALARM_ENTITY, "disarmed")
            hass.states.async_set(sensor_id, "on")
            await hass.async_block_till_done()
            await advance_time(hass, 1)
            state = hass.states.get(ALARM_ENTITY)
            assert (
                state.state == "triggered"
            ), f"Sensor {sensor_id} failed to trigger alarm"
            assert sensor_id in str(
                state.attributes.get("open_sensors")
            ), f"Sensor {sensor_id} not found in open_sensors"
            await cleanup_timers(hass)
            await hass.services.async_call(
                "alarmo",
                "disarm",
                {"entity_id": ALARM_ENTITY, "code": "1234"},
                blocking=True,
            )
            await hass.async_block_till_done()


@pytest.mark.asyncio
async def test_environmental_sensor_multiple_arm_modes(
    hass: Any, enable_custom_integrations: Any
) -> None:
    """Test environmental sensors trigger in all arm modes."""
    area = AreaFactory.create_area(area_id="area_1", name="Test Area 1")
    sensors = get_environmental_sensors()
    storage, entry = setup_alarmo_entry(
        hass, areas=[area], sensors=sensors, entry_id="test_environmental_sensors"
    )
    with patch_alarmo_integration_dependencies(storage):
        await hass.config_entries.async_setup(entry.entry_id)
        await hass.async_block_till_done()
        arm_modes = ["away", "home"]
        for mode in arm_modes:
            for sensor_id in get_all_sensors():
                hass.states.async_set(sensor_id, "off")
                await hass.async_block_till_done()
            await hass.services.async_call(
                "alarmo",
                "disarm",
                {"entity_id": ALARM_ENTITY, "code": "1234"},
                blocking=True,
            )
            await hass.async_block_till_done()
            await hass.services.async_call(
                "alarmo",
                "arm",
                {"entity_id": ALARM_ENTITY, "code": "1234", "mode": mode},
                blocking=True,
            )
            await hass.async_block_till_done()
            area = AreaFactory.create_area(area_id="area_1")
            exit_time = area["modes"][f"armed_{mode}"]["exit_time"]
            await advance_time(hass, exit_time + 1)
            assert_alarm_state(hass, ALARM_ENTITY, f"armed_{mode}")
            hass.states.async_set(HEAT_SENSOR, "on")
            await hass.async_block_till_done()
            await advance_time(hass, 1)
            state = hass.states.get(ALARM_ENTITY)
            assert (
                state.state == "triggered"
            ), f"Heat sensor did not trigger alarm in {mode} mode"
            await cleanup_timers(hass)
            await hass.services.async_call(
                "alarmo",
                "disarm",
                {"entity_id": ALARM_ENTITY, "code": "1234"},
                blocking=True,
            )
            await hass.async_block_till_done()
            assert_alarm_state(hass, ALARM_ENTITY, "disarmed")
            hass.states.async_set(HEAT_SENSOR, "off")
            await hass.async_block_till_done()
