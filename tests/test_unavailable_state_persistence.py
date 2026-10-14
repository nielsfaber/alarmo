"""Test that the prior state of unavailable sensors survives a restart."""

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
WINDOW_SENSOR = "binary_sensor.generic_area_1_window_sensor"
STORAGE_KEY = "alarmo.unavailable_state_mem"


def _setup(hass: Any, entry_id: str):
    area = AreaFactory.create_area(area_id="area_1", name="Test Area 1")
    sensor_config = SensorFactory.create_door_sensor(
        entity_id=WINDOW_SENSOR,
        name="Generic Area 1 Window",
        area="area_1",
        modes=["armed_away", "armed_home"],
        trigger_unavailable=False,
        use_exit_delay=False,
        use_entry_delay=False,
    )
    return setup_alarmo_entry(
        hass, areas=[area], sensors=[sensor_config], entry_id=entry_id
    )


async def _start_armed_with_unavailable_sensor(hass: Any, storage: Any, entry: Any):
    """Start Alarmo after a restart: armed, with the sensor still unavailable."""
    mock_restore_cache(
        hass, [State(ALARM_ENTITY, "armed_home", {"arm_mode": "armed_home"})]
    )
    hass.states.async_set(WINDOW_SENSOR, "unavailable")
    await hass.async_block_till_done()
    await hass.config_entries.async_setup(entry.entry_id)
    await hass.async_block_till_done()
    await advance_time(hass, 1)
    assert_alarm_state(hass, ALARM_ENTITY, "armed_home")


@pytest.mark.asyncio
async def test_sensor_returning_in_prior_state_after_restart_is_ignored(
    hass: Any, hass_storage: dict[str, Any], enable_custom_integrations: Any
) -> None:
    """A sensor that went unavailable while open and returns open after a restart.

    Scenario: a window is left open, its sensor drops off the network, HA restarts,
    and days later the sensor reconnects reporting the (unchanged) open state.
    Expected: no trigger, the same as without the restart in between.
    """
    hass_storage[STORAGE_KEY] = {
        "version": 1,
        "minor_version": 1,
        "key": STORAGE_KEY,
        "data": {WINDOW_SENSOR: "open"},
    }
    storage, entry = _setup(hass, "test_unavailable_mem_restored")
    with patch_alarmo_integration_dependencies(storage):
        await _start_armed_with_unavailable_sensor(hass, storage, entry)

        hass.states.async_set(WINDOW_SENSOR, "on")
        await hass.async_block_till_done()
        await advance_time(hass, 1)
        assert_alarm_state(hass, ALARM_ENTITY, "armed_home")
        await cleanup_timers(hass)


@pytest.mark.asyncio
async def test_sensor_returning_in_other_state_after_restart_triggers(
    hass: Any, hass_storage: dict[str, Any], enable_custom_integrations: Any
) -> None:
    """A sensor that went unavailable while closed and returns open still triggers."""
    hass_storage[STORAGE_KEY] = {
        "version": 1,
        "minor_version": 1,
        "key": STORAGE_KEY,
        "data": {WINDOW_SENSOR: "closed"},
    }
    storage, entry = _setup(hass, "test_unavailable_mem_restored_closed")
    with patch_alarmo_integration_dependencies(storage):
        await _start_armed_with_unavailable_sensor(hass, storage, entry)

        hass.states.async_set(WINDOW_SENSOR, "on")
        await hass.async_block_till_done()
        await advance_time(hass, 1)
        assert_alarm_state(hass, ALARM_ENTITY, "triggered")
        await cleanup_timers(hass)


@pytest.mark.asyncio
async def test_unavailable_state_mem_is_persisted(
    hass: Any, hass_storage: dict[str, Any], enable_custom_integrations: Any
) -> None:
    """The prior state is written to storage and removed again on recovery."""
    storage, entry = _setup(hass, "test_unavailable_mem_persisted")
    with patch_alarmo_integration_dependencies(storage):
        hass.states.async_set(WINDOW_SENSOR, "on")
        await hass.config_entries.async_setup(entry.entry_id)
        await hass.async_block_till_done()

        hass.states.async_set(WINDOW_SENSOR, "unavailable")
        await hass.async_block_till_done()
        await advance_time(hass, 2)
        assert hass_storage[STORAGE_KEY]["data"] == {WINDOW_SENSOR: "open"}

        hass.states.async_set(WINDOW_SENSOR, "on")
        await hass.async_block_till_done()
        await advance_time(hass, 2)
        assert hass_storage[STORAGE_KEY]["data"] == {}
        await cleanup_timers(hass)
