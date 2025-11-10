"""Test last_triggered attribute feature (#1103)."""

from typing import Any

import pytest

from tests.helpers import (
    advance_time,
    cleanup_timers,
    assert_alarm_state,
    setup_alarmo_entry,
    patch_alarmo_integration_dependencies,
)
from tests.factories import AreaFactory, SensorFactory


@pytest.mark.asyncio
async def test_last_triggered_attribute_set_on_alarm_trigger(
    hass: Any, enable_custom_integrations: Any
) -> None:
    """Test that last_triggered attribute is set when alarm is triggered."""
    alarm_entity = "alarm_control_panel.test_area_1"
    trigger_sensor = "binary_sensor.test_door"

    area = AreaFactory.create_area(
        area_id="area_1",
        modes=["armed_away"],
        armed_away_exit_time=5,
        armed_away_trigger_time=30,
        armed_away_enabled=True,
    )

    door_sensor = SensorFactory.create_door_sensor(
        entity_id=trigger_sensor,
        name="Test Door",
        area="area_1",
        modes=["armed_away"],
        allow_open=False,
        use_exit_delay=False,
        use_entry_delay=False,
    )

    storage, entry = setup_alarmo_entry(
        hass,
        areas=[area],
        sensors=[door_sensor],
        entry_id="test_last_triggered_attribute",
    )

    with patch_alarmo_integration_dependencies(storage):
        await hass.config_entries.async_setup(entry.entry_id)
        await hass.async_block_till_done()

        # Initialize states
        hass.states.async_set(alarm_entity, "disarmed")
        hass.states.async_set(trigger_sensor, "off")
        await hass.async_block_till_done()

        # Verify last_triggered is initially None
        state = hass.states.get(alarm_entity)
        assert state.attributes.get("last_triggered") is None

        # Arm the alarm
        await hass.services.async_call(
            "alarmo",
            "arm",
            {"entity_id": alarm_entity, "mode": "away", "code": "1234"},
            blocking=True,
        )
        await hass.async_block_till_done()

        # Wait for exit time to complete
        await advance_time(hass, 6)
        assert_alarm_state(hass, alarm_entity, "armed_away")

        # Verify last_triggered is still None before trigger
        state = hass.states.get(alarm_entity)
        assert state.attributes.get("last_triggered") is None

        # Trigger the alarm
        hass.states.async_set(trigger_sensor, "on")
        await hass.async_block_till_done()
        await advance_time(hass, 1)

        # Verify alarm is triggered
        assert_alarm_state(hass, alarm_entity, "triggered")

        # Verify last_triggered attribute is now set
        state = hass.states.get(alarm_entity)
        last_triggered = state.attributes.get("last_triggered")
        assert last_triggered is not None, (
            "last_triggered attribute should be set when alarm triggers"
        )

        await hass.services.async_call(
            "alarmo",
            "disarm",
            {"entity_id": alarm_entity, "code": "1234"},
            blocking=True,
        )
        await hass.async_block_till_done()
        await cleanup_timers(hass)


@pytest.mark.asyncio
async def test_last_triggered_attribute_persists_across_states(
    hass: Any, enable_custom_integrations: Any
) -> None:
    """Test that last_triggered attribute persists when alarm state changes."""
    alarm_entity = "alarm_control_panel.test_area_1"
    trigger_sensor = "binary_sensor.test_door"

    area = AreaFactory.create_area(
        area_id="area_1",
        modes=["armed_away"],
        armed_away_exit_time=5,
        armed_away_trigger_time=30,
        armed_away_enabled=True,
    )

    door_sensor = SensorFactory.create_door_sensor(
        entity_id=trigger_sensor,
        name="Test Door",
        area="area_1",
        modes=["armed_away"],
        allow_open=False,
        use_exit_delay=False,
        use_entry_delay=False,
    )

    storage, entry = setup_alarmo_entry(
        hass,
        areas=[area],
        sensors=[door_sensor],
        entry_id="test_last_triggered_persists",
    )

    with patch_alarmo_integration_dependencies(storage):
        await hass.config_entries.async_setup(entry.entry_id)
        await hass.async_block_till_done()

        hass.states.async_set(alarm_entity, "disarmed")
        hass.states.async_set(trigger_sensor, "off")
        await hass.async_block_till_done()

        # Arm and trigger the alarm
        await hass.services.async_call(
            "alarmo",
            "arm",
            {"entity_id": alarm_entity, "mode": "away", "code": "1234"},
            blocking=True,
        )
        await hass.async_block_till_done()
        await advance_time(hass, 6)  # Complete exit time

        hass.states.async_set(trigger_sensor, "on")
        await hass.async_block_till_done()
        await advance_time(hass, 1)

        # Get the last_triggered value while triggered
        state = hass.states.get(alarm_entity)
        last_triggered_value = state.attributes.get("last_triggered")
        assert last_triggered_value is not None

        # Disarm the alarm
        await hass.services.async_call(
            "alarmo",
            "disarm",
            {"entity_id": alarm_entity, "code": "1234"},
            blocking=True,
        )
        await hass.async_block_till_done()
        assert_alarm_state(hass, alarm_entity, "disarmed")

        # Verify last_triggered value persists after disarming
        state = hass.states.get(alarm_entity)
        assert state.attributes.get("last_triggered") == last_triggered_value, (
            "last_triggered should persist after disarming"
        )

        # Arm again without triggering
        hass.states.async_set(trigger_sensor, "off")
        await hass.async_block_till_done()

        await hass.services.async_call(
            "alarmo",
            "arm",
            {"entity_id": alarm_entity, "mode": "away", "code": "1234"},
            blocking=True,
        )
        await hass.async_block_till_done()
        await advance_time(hass, 6)

        # Verify last_triggered value still persists
        state = hass.states.get(alarm_entity)
        assert state.attributes.get("last_triggered") == last_triggered_value, (
            "last_triggered should persist when arming again"
        )

        await hass.services.async_call(
            "alarmo",
            "disarm",
            {"entity_id": alarm_entity, "code": "1234"},
            blocking=True,
        )
        await hass.async_block_till_done()
        await cleanup_timers(hass)


@pytest.mark.asyncio
async def test_last_triggered_attribute_updated_on_multiple_triggers(
    hass: Any, enable_custom_integrations: Any
) -> None:
    """Test that last_triggered attribute is properly managed across multiple triggers."""  # noqa E501
    alarm_entity = "alarm_control_panel.test_area_1"
    trigger_sensor = "binary_sensor.test_door"

    area = AreaFactory.create_area(
        area_id="area_1",
        modes=["armed_away"],
        armed_away_exit_time=5,
        armed_away_trigger_time=30,
        armed_away_enabled=True,
    )

    door_sensor = SensorFactory.create_door_sensor(
        entity_id=trigger_sensor,
        name="Test Door",
        area="area_1",
        modes=["armed_away"],
        allow_open=False,
        use_exit_delay=False,
        use_entry_delay=False,
    )

    storage, entry = setup_alarmo_entry(
        hass,
        areas=[area],
        sensors=[door_sensor],
        entry_id="test_last_triggered_multiple",
    )

    with patch_alarmo_integration_dependencies(storage):
        await hass.config_entries.async_setup(entry.entry_id)
        await hass.async_block_till_done()

        hass.states.async_set(alarm_entity, "disarmed")
        hass.states.async_set(trigger_sensor, "off")
        await hass.async_block_till_done()

        # First trigger
        await hass.services.async_call(
            "alarmo",
            "arm",
            {"entity_id": alarm_entity, "mode": "away", "code": "1234"},
            blocking=True,
        )
        await hass.async_block_till_done()
        await advance_time(hass, 6)

        hass.states.async_set(trigger_sensor, "on")
        await hass.async_block_till_done()
        await advance_time(hass, 1)

        state = hass.states.get(alarm_entity)
        first_trigger_time = state.attributes.get("last_triggered")
        assert first_trigger_time is not None

        # Disarm and reset for second trigger
        await hass.services.async_call(
            "alarmo",
            "disarm",
            {"entity_id": alarm_entity, "code": "1234"},
            blocking=True,
        )
        await hass.async_block_till_done()
        hass.states.async_set(trigger_sensor, "off")
        await hass.async_block_till_done()

        # Verify last_triggered persists after disarm
        state = hass.states.get(alarm_entity)
        assert state.attributes.get("last_triggered") == first_trigger_time, (
            "last_triggered should persist after disarm"
        )

        # Advance time to clear any lingering timers and create time gap
        await cleanup_timers(hass)

        await hass.services.async_call(
            "alarmo",
            "arm",
            {"entity_id": alarm_entity, "mode": "away", "code": "1234"},
            blocking=True,
        )
        await hass.async_block_till_done()
        await advance_time(hass, 6)

        hass.states.async_set(trigger_sensor, "on")
        await hass.async_block_till_done()
        await advance_time(hass, 1)

        state = hass.states.get(alarm_entity)
        second_trigger_time = state.attributes.get("last_triggered")
        assert second_trigger_time is not None

        await hass.services.async_call(
            "alarmo",
            "disarm",
            {"entity_id": alarm_entity, "code": "1234"},
            blocking=True,
        )
        await hass.async_block_till_done()
        await cleanup_timers(hass)
