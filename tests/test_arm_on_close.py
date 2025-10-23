"""Test that arming proceeds if a sensor with arm_on_close is opened and closed during exit delay."""

from typing import Any

import pytest

from tests.helpers import (
    advance_time,
    assert_alarm_state,
    setup_alarmo_entry,
    patch_alarmo_integration_dependencies,
)
from tests.factories import AreaFactory, SensorFactory


@pytest.mark.asyncio
async def test_arm_on_close_behavior(
    hass: Any, enable_custom_integrations: Any
) -> None:
    """Test that arming proceeds if a door is opened and closed during exit delay."""
    alarm_entity = "alarm_control_panel.test_area_1"
    sensor = "binary_sensor.generic_area_1_door_sensor"
    area = AreaFactory.create_area(
        area_id="area_1", modes=["armed_away"], armed_away_enabled=True
    )
    door_sensor = SensorFactory.create_door_sensor(
        entity_id=sensor,
        name="Generic Area 1 Door",
        area="area_1",
        modes=["armed_away", "armed_home", "armed_night", "armed_vacation"],
        arm_on_close=True,
        allow_open=False,
        use_exit_delay=True,
        use_entry_delay=True,
        auto_bypass=False,
        auto_bypass_modes=[],
    )
    storage, entry = setup_alarmo_entry(
        hass, areas=[area], sensors=[door_sensor], entry_id="test_arm_on_close_behavior"
    )
    with patch_alarmo_integration_dependencies(storage):
        await hass.config_entries.async_setup(entry.entry_id)
        await hass.async_block_till_done()
        hass.states.async_set(sensor, "off")  # Door closed
        hass.states.async_set(alarm_entity, "disarmed")
        await hass.async_block_till_done()
        await hass.services.async_call(
            "alarm_control_panel",
            "alarm_arm_away",
            {"entity_id": alarm_entity, "code": "1234"},
            blocking=True,
        )
        await hass.async_block_till_done()
        assert_alarm_state(hass, alarm_entity, "arming")
        # During exit delay, open and then close the sensor
        hass.states.async_set(sensor, "on")  # Door opened
        await hass.async_block_till_done()
        hass.states.async_set(sensor, "off")  # Door closed again
        await hass.async_block_till_done()
        # Fast-forward time to after exit delay
        exit_delay = area["modes"]["armed_away"]["exit_time"]
        await advance_time(hass, exit_delay + 1)
        assert_alarm_state(hass, alarm_entity, "armed_away")


@pytest.mark.asyncio
async def test_arm_on_close_timeout(hass: Any, enable_custom_integrations: Any) -> None:
    """Test that arming fails if a door with arm_on_close=True remains open after the exit delay expires."""
    alarm_entity = "alarm_control_panel.test_area_1"
    sensor = "binary_sensor.generic_area_1_door_sensor"
    area = AreaFactory.create_area(
        area_id="area_1", modes=["armed_away"], armed_away_enabled=True
    )
    door_sensor = SensorFactory.create_door_sensor(
        entity_id=sensor,
        name="Generic Area 1 Door",
        area="area_1",
        modes=["armed_away", "armed_home", "armed_night", "armed_vacation"],
        arm_on_close=True,
        allow_open=False,
        use_exit_delay=True,
        use_entry_delay=True,
        auto_bypass=False,
        auto_bypass_modes=[],
    )
    storage, entry = setup_alarmo_entry(
        hass, areas=[area], sensors=[door_sensor], entry_id="test_arm_on_close_timeout"
    )
    with patch_alarmo_integration_dependencies(storage):
        await hass.config_entries.async_setup(entry.entry_id)
        await hass.async_block_till_done()
        hass.states.async_set(sensor, "on")  # Door open
        hass.states.async_set(alarm_entity, "disarmed")
        await hass.async_block_till_done()
        await hass.services.async_call(
            "alarm_control_panel",
            "alarm_arm_away",
            {"entity_id": alarm_entity, "code": "1234"},
            blocking=True,
        )
        await hass.async_block_till_done()
        assert_alarm_state(hass, alarm_entity, "arming")
        # Do not close the door during exit delay to cause failure
        exit_delay = area["modes"]["armed_away"]["exit_time"]
        await advance_time(hass, exit_delay + 1)
        assert_alarm_state(hass, alarm_entity, "disarmed")
