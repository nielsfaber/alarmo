"""Test that a sensor can belong to more than one sensor group at once."""

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
SENSOR_SHARED = "binary_sensor.generic_area_1_shared_sensor"
SENSOR_A = "binary_sensor.generic_area_1_sensor_a"
SENSOR_B = "binary_sensor.generic_area_1_sensor_b"


def get_sensors() -> list[dict[str, Any]]:
    """Create three motion sensors: SHARED, A and B."""
    common = {
        "area": "area_1",
        "modes": ["armed_away"],
        "always_on": False,
        "auto_bypass": False,
        "auto_bypass_modes": [],
        "allow_open": False,
        "trigger_unavailable": False,
        "arm_on_close": False,
        "use_exit_delay": False,
        "use_entry_delay": False,
    }
    return [
        SensorFactory.create_motion_sensor(
            entity_id=SENSOR_SHARED, name="Shared Sensor", **common
        ),
        SensorFactory.create_motion_sensor(
            entity_id=SENSOR_A, name="Sensor A", **common
        ),
        SensorFactory.create_motion_sensor(
            entity_id=SENSOR_B, name="Sensor B", **common
        ),
    ]


def get_sensor_groups() -> list[dict[str, Any]]:
    """SHARED is a member of two independent groups, one with A and one with B."""
    return [
        SensorGroupFactory.create_sensor_group(
            group_id="group_shared_a",
            name="Shared+A",
            entities=[SENSOR_SHARED, SENSOR_A],
            timeout=10,
            event_count=2,
        ),
        SensorGroupFactory.create_sensor_group(
            group_id="group_shared_b",
            name="Shared+B",
            entities=[SENSOR_SHARED, SENSOR_B],
            timeout=10,
            event_count=2,
        ),
    ]


async def _arm_away(hass: Any, area: dict[str, Any]) -> None:
    hass.states.async_set(ALARM_ENTITY, "disarmed")
    await hass.async_block_till_done()
    await hass.services.async_call(
        "alarmo",
        "arm",
        {"entity_id": ALARM_ENTITY, "code": "1234", "mode": "away"},
        blocking=True,
    )
    await hass.async_block_till_done()
    await advance_time(hass, area["modes"]["armed_away"]["exit_time"] + 1)
    assert_alarm_state(hass, ALARM_ENTITY, "armed_away")


async def _disarm(hass: Any) -> None:
    await hass.services.async_call(
        "alarmo",
        "disarm",
        {"entity_id": ALARM_ENTITY, "code": "1234"},
        blocking=True,
    )
    await hass.async_block_till_done()
    assert_alarm_state(hass, ALARM_ENTITY, "disarmed")


@pytest.mark.asyncio
async def test_shared_sensor_triggers_with_either_group_partner(
    hass: Any, enable_custom_integrations: Any
) -> None:
    """SENSOR_SHARED must corroborate independently with A and with B."""
    area = AreaFactory.create_area(area_id="area_1", name="Test Area 1")
    storage, entry = setup_alarmo_entry(
        hass,
        areas=[area],
        sensors=get_sensors(),
        entry_id="test_sensor_multi_group",
        sensor_groups=get_sensor_groups(),
    )

    with patch_alarmo_integration_dependencies(storage):
        await hass.config_entries.async_setup(entry.entry_id)
        await hass.async_block_till_done()
        for eid in [SENSOR_SHARED, SENSOR_A, SENSOR_B]:
            hass.states.async_set(eid, "off")
            await hass.async_block_till_done()

        # --- SHARED + A corroborate -> triggers ---
        await _arm_away(hass, area)
        hass.states.async_set(SENSOR_SHARED, "on")
        await hass.async_block_till_done()
        hass.states.async_set(SENSOR_A, "on")
        await hass.async_block_till_done()
        await advance_time(hass, 1)
        assert_alarm_state(hass, ALARM_ENTITY, "triggered")
        await _disarm(hass)

        hass.states.async_set(SENSOR_SHARED, "off")
        await hass.async_block_till_done()
        hass.states.async_set(SENSOR_A, "off")
        await hass.async_block_till_done()

        # --- SHARED + B corroborate -> triggers ---
        await _arm_away(hass, area)
        hass.states.async_set(SENSOR_SHARED, "on")
        await hass.async_block_till_done()
        hass.states.async_set(SENSOR_B, "on")
        await hass.async_block_till_done()
        await advance_time(hass, 1)
        assert_alarm_state(hass, ALARM_ENTITY, "triggered")
        await _disarm(hass)
        await cleanup_timers(hass)


@pytest.mark.asyncio
async def test_unrelated_group_partners_do_not_cross_corroborate(
    hass: Any, enable_custom_integrations: Any
) -> None:
    """A and B are not in a shared group, so tripping both must not trigger."""
    area = AreaFactory.create_area(area_id="area_1", name="Test Area 1")
    storage, entry = setup_alarmo_entry(
        hass,
        areas=[area],
        sensors=get_sensors(),
        entry_id="test_sensor_multi_group",
        sensor_groups=get_sensor_groups(),
    )

    with patch_alarmo_integration_dependencies(storage):
        await hass.config_entries.async_setup(entry.entry_id)
        await hass.async_block_till_done()
        for eid in [SENSOR_SHARED, SENSOR_A, SENSOR_B]:
            hass.states.async_set(eid, "off")
            await hass.async_block_till_done()

        await _arm_away(hass, area)

        hass.states.async_set(SENSOR_A, "on")
        await hass.async_block_till_done()
        hass.states.async_set(SENSOR_B, "on")
        await hass.async_block_till_done()
        # A and B share no group, and SENSOR_SHARED never tripped,
        # so neither group's event_count of 2 is met.
        assert_alarm_state(hass, ALARM_ENTITY, "armed_away")

        await _disarm(hass)
        await cleanup_timers(hass)
