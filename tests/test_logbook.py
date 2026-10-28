"""Test the alarmo_activity event and its logbook description."""

from typing import Any

import pytest
from homeassistant.core import Event, callback

from tests.helpers import (
    advance_time,
    cleanup_timers,
    setup_alarmo_entry,
    patch_alarmo_integration_dependencies,
)
from tests.factories import AreaFactory, SensorFactory
from custom_components.alarmo import const
from custom_components.alarmo.logbook import async_describe_events

ALARM_ENTITY = "alarm_control_panel.test_area_1"
SENSOR = "binary_sensor.front_door"
AREA_ID = "area_1"


async def _setup(hass: Any, events: list[Event], entry_id: str, **area_overrides: Any):
    """Set up a disarmed area with one door sensor and capture activity events."""

    @callback
    def capture_event(event: Event) -> None:
        events.append(event)

    hass.bus.async_listen(const.EVENT_ACTIVITY, capture_event)

    area = AreaFactory.create_area(
        area_id=AREA_ID,
        modes=["armed_away"],
        armed_away_enabled=True,
        **area_overrides,
    )
    sensor = SensorFactory.create_door_sensor(
        entity_id=SENSOR,
        name="Front Door",
        area=AREA_ID,
        use_exit_delay=False,
        use_entry_delay=False,
    )
    storage, entry = setup_alarmo_entry(
        hass, areas=[area], sensors=[sensor], entry_id=entry_id
    )
    return storage, entry


async def _arm(hass: Any) -> None:
    await hass.services.async_call(
        "alarmo",
        "arm",
        {"entity_id": ALARM_ENTITY, "code": "1234", "mode": "away"},
        blocking=True,
    )
    await hass.async_block_till_done()
    await advance_time(hass, 11)


@pytest.mark.asyncio
async def test_trigger_activity_names_sensor_and_links_context(
    hass: Any, enable_custom_integrations: Any
) -> None:
    """A tripped sensor fires a trigger activity linked to the sensor change."""
    events: list[Event] = []
    storage, entry = await _setup(hass, events, "test_logbook_trigger")

    with patch_alarmo_integration_dependencies(storage):
        await hass.config_entries.async_setup(entry.entry_id)
        await hass.async_block_till_done()

        hass.states.async_set(ALARM_ENTITY, "disarmed")
        hass.states.async_set(SENSOR, "off")
        await hass.async_block_till_done()
        await _arm(hass)
        events.clear()

        hass.states.async_set(SENSOR, "on")
        await hass.async_block_till_done()
        await advance_time(hass, 1)

        assert len(events) == 1
        data = events[0].data
        assert data["action"] == "trigger"
        assert data["area_id"] == AREA_ID
        assert data["entity_id"] == ALARM_ENTITY
        assert data["sensors"] == [SENSOR]
        assert events[0].context.parent_id == hass.states.get(SENSOR).context.id

        await cleanup_timers(hass)


@pytest.mark.asyncio
async def test_arm_and_disarm_activity_link_to_service_call(
    hass: Any, enable_custom_integrations: Any
) -> None:
    """Arm and disarm fire activities that are children of the service call."""
    events: list[Event] = []
    storage, entry = await _setup(hass, events, "test_logbook_arm_disarm")

    with patch_alarmo_integration_dependencies(storage):
        await hass.config_entries.async_setup(entry.entry_id)
        await hass.async_block_till_done()

        hass.states.async_set(ALARM_ENTITY, "disarmed")
        hass.states.async_set(SENSOR, "off")
        await hass.async_block_till_done()
        events.clear()

        await _arm(hass)
        arm_events = [e for e in events if e.data["action"] == "arm"]
        assert len(arm_events) == 1
        assert arm_events[0].data["mode"] == "away"
        assert arm_events[0].data["changed_by"] == "Test User"
        assert arm_events[0].context.parent_id is not None
        events.clear()

        await hass.services.async_call(
            "alarmo",
            "disarm",
            {"entity_id": ALARM_ENTITY, "code": "1234"},
            blocking=True,
        )
        await hass.async_block_till_done()

        disarm_events = [e for e in events if e.data["action"] == "disarm"]
        assert len(disarm_events) == 1
        assert disarm_events[0].data["changed_by"] == "Test User"
        assert disarm_events[0].context.parent_id is not None

        await cleanup_timers(hass)


@pytest.mark.asyncio
async def test_disarm_activity_has_no_user_when_code_not_required(
    hass: Any, enable_custom_integrations: Any
) -> None:
    """Disarming without a code leaves changed_by out of the activity."""
    events: list[Event] = []
    storage, entry = await _setup(
        hass, events, "test_logbook_no_code", code_disarm_required=False
    )

    with patch_alarmo_integration_dependencies(storage):
        await hass.config_entries.async_setup(entry.entry_id)
        await hass.async_block_till_done()

        hass.states.async_set(ALARM_ENTITY, "disarmed")
        hass.states.async_set(SENSOR, "off")
        await hass.async_block_till_done()

        await _arm(hass)
        events.clear()

        await hass.services.async_call(
            "alarmo", "disarm", {"entity_id": ALARM_ENTITY}, blocking=True
        )
        await hass.async_block_till_done()

        disarm_events = [e for e in events if e.data["action"] == "disarm"]
        assert len(disarm_events) == 1
        assert "changed_by" not in disarm_events[0].data

        await cleanup_timers(hass)


@pytest.mark.asyncio
async def test_failed_arm_activity_names_blocking_sensor(
    hass: Any, enable_custom_integrations: Any
) -> None:
    """A sensor that blocks arming is named in the failed_to_arm activity."""
    events: list[Event] = []
    storage, entry = await _setup(hass, events, "test_logbook_failed")

    with patch_alarmo_integration_dependencies(storage):
        await hass.config_entries.async_setup(entry.entry_id)
        await hass.async_block_till_done()

        hass.states.async_set(ALARM_ENTITY, "disarmed")
        hass.states.async_set(SENSOR, "on")
        await hass.async_block_till_done()
        events.clear()

        await _arm(hass)

        failed = [e for e in events if e.data["action"] == "failed_to_arm"]
        assert len(failed) == 1
        assert failed[0].data["sensors"] == [SENSOR]

        await cleanup_timers(hass)


@pytest.mark.asyncio
async def test_logbook_descriptor_messages(hass: Any) -> None:
    """The descriptor words each action and names the sensors involved."""
    described = {}

    def register(domain, event_type, describe):
        described[(domain, event_type)] = describe

    hass.states.async_set(SENSOR, "on", {"friendly_name": "Front Door"})
    async_describe_events(hass, register)
    describe = described[(const.DOMAIN, const.EVENT_ACTIVITY)]

    def run(**data):
        base = {"name": "Home", "entity_id": ALARM_ENTITY}
        return describe(
            type("Event", (), {"data": {**base, **data}, "context_id": "ctx"})()
        )

    result = run(action="trigger", sensors=[SENSOR])
    assert result["name"] == "Alarmo -> Home"
    assert result["message"] == f"triggered by Front Door ({SENSOR})"
    assert result["entity_id"] == ALARM_ENTITY
    assert result["context_id"] == "ctx"

    assert (
        run(action="trigger", sensors=[SENSOR], delay=30)["message"]
        == f"entry delay started by Front Door ({SENSOR})"
    )
    assert run(action="arm", mode="away", delay=10, changed_by="Sam")["message"] == (
        "arming away by Sam"
    )
    assert run(action="arm", mode="away", delay=0)["message"] == "armed away"
    assert run(action="disarm", changed_by="Sam")["message"] == "disarmed by Sam"
    assert run(action="failed_to_arm", sensors=[SENSOR])["message"] == (
        f"failed to arm, open sensors: Front Door ({SENSOR})"
    )
    assert (
        run(action="command_not_allowed", command="arm_away", state="armed_home")[
            "message"
        ]
        == "command arm_away not allowed in state armed_home"
    )
    assert run(action="invalid_code", command="disarm")["message"] == (
        "invalid code provided for command disarm"
    )
