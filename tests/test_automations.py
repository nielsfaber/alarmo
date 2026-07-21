"""Tests for Alarmo automations."""

from __future__ import annotations

from types import SimpleNamespace
from typing import Any

import pytest
from homeassistant.const import ATTR_SERVICE, CONF_SERVICE_DATA
from homeassistant.helpers.dispatcher import async_dispatcher_send
from pytest_homeassistant_custom_component.common import async_mock_service

from custom_components.alarmo import const
from custom_components.alarmo.sensors import STATE_OPEN
from custom_components.alarmo.automations import (
    AutomationHandler,
    validate_area,
    validate_modes,
    validate_trigger,
)


class _DummyCoordinator:
    def __init__(self, store: Any) -> None:
        self.store = store


class _DummyStore:
    def __init__(self, automations: dict[str, Any]) -> None:
        self._automations = automations

    def async_get_automations(self) -> dict[str, Any]:
        return self._automations


def _make_handler_with_config(
    hass: Any, automations: dict[str, Any]
) -> AutomationHandler:
    store = _DummyStore(automations=automations)
    hass.data[const.DOMAIN] = {
        "coordinator": _DummyCoordinator(store),
        "areas": {},
        "master": None,
    }
    return AutomationHandler(hass)


def test_validate_area() -> None:
    """Validate area matching behavior."""
    hass = SimpleNamespace(data={const.DOMAIN: {"areas": {"area_1": object()}}})

    assert not validate_area({}, "area_1", hass)
    assert validate_area({const.ATTR_AREA: "area_1"}, "area_1", hass)
    assert not validate_area({const.ATTR_AREA: "area_1"}, "area_2", hass)

    # Empty trigger area matches when only one area exists
    assert validate_area({const.ATTR_AREA: None}, "area_1", hass)

    # When multiple areas exist, empty area only matches master (None)
    hass.data[const.DOMAIN]["areas"]["area_2"] = object()
    assert not validate_area({const.ATTR_AREA: None}, "area_1", hass)
    assert validate_area({const.ATTR_AREA: None}, None, hass)


def test_validate_modes() -> None:
    """Validate mode matching behavior."""
    assert not validate_modes({}, "armed_away")
    assert validate_modes({const.ATTR_MODES: []}, "armed_away")
    assert validate_modes({const.ATTR_MODES: ["armed_away"]}, "armed_away")
    assert not validate_modes({const.ATTR_MODES: ["armed_home"]}, "armed_away")


def test_validate_trigger() -> None:
    """Validate trigger matching behavior."""
    assert not validate_trigger({}, "armed")
    assert validate_trigger({const.ATTR_EVENT: "armed"}, "armed")
    assert not validate_trigger({const.ATTR_EVENT: "armed"}, "disarmed")
    assert validate_trigger(
        {const.ATTR_EVENT: "untriggered"}, "disarmed", from_state="triggered"
    )
    assert not validate_trigger(
        {const.ATTR_EVENT: "untriggered"}, "disarmed", from_state="arming"
    )


@pytest.mark.asyncio
async def test_replace_wildcards_in_string_replaces_values(
    hass: Any, monkeypatch: pytest.MonkeyPatch
) -> None:
    """Ensure wildcard replacements and templates are processed."""
    store = _DummyStore(automations={})
    hass.data[const.DOMAIN] = {
        "coordinator": _DummyCoordinator(store),
        "areas": {"area_1": object()},
        "master": None,
    }

    handler = AutomationHandler(hass)

    hass.states.async_set(
        "binary_sensor.front_door", "on", {"friendly_name": "Front Door"}
    )
    hass.states.async_set(
        "binary_sensor.kitchen_window", "on", {"friendly_name": "Kitchen Window"}
    )
    hass.states.async_set(
        "binary_sensor.hall_motion", "off", {"friendly_name": "Hall Motion"}
    )
    await hass.async_block_till_done()

    alarm_entity = SimpleNamespace(
        open_sensors={
            "binary_sensor.front_door": STATE_OPEN,
            "binary_sensor.kitchen_window": STATE_OPEN,
        },
        bypassed_sensors=["binary_sensor.hall_motion"],
        arm_mode="armed_away",
        changed_by="Alice",
        delay=15,
    )

    async def _fake_arm_mode_string(_: str, __: str) -> str:
        return "Armed Away"

    monkeypatch.setattr(handler, "async_get_arm_mode_string", _fake_arm_mode_string)

    template = (
        "Open: {{open_sensors|format=short}}; "
        "Bypassed: {{bypassed_sensors}}; "
        "Mode: {{arm_mode|lang=en}}; "
        "By: {{changed_by}}; "
        "Delay: {{delay}}; "
        "Math: {{ 1 + 1 }}"
    )

    result = await handler.replace_wildcards_in_string(template, alarm_entity)

    assert "Front Door" in result
    assert "Kitchen Window" in result
    assert "Hall Motion" in result
    assert "Armed Away" in result
    assert "By: Alice" in result
    assert "Delay: 15" in result
    assert "Math: 2" in result


@pytest.mark.asyncio
async def test_async_execute_automation_processes_service_data(hass: Any) -> None:
    """Ensure notification automations process service_data deeply."""
    automations = {
        "auto_1": {
            "automation_id": "auto_1",
            "type": const.ATTR_NOTIFICATION,
            "name": "Test Automation",
            "triggers": [],
            "actions": [
                {
                    ATTR_SERVICE: "test.do_thing",
                    CONF_SERVICE_DATA: {
                        "message": "Hello {{changed_by}}",
                        "details": {
                            "delay": "{{delay}}",
                            "depth2": {
                                "depth3": {
                                    "depth4": "{{ 3 + 2 }}",
                                }
                            },
                        },
                    },
                }
            ],
            "enabled": True,
        }
    }

    store = _DummyStore(automations=automations)
    hass.data[const.DOMAIN] = {
        "coordinator": _DummyCoordinator(store),
        "areas": {},
        "master": None,
    }

    handler = AutomationHandler(hass)

    calls = async_mock_service(hass, "test", "do_thing")

    alarm_entity = SimpleNamespace(
        open_sensors={},
        bypassed_sensors=[],
        arm_mode="armed_away",
        changed_by="Alice",
        delay=15,
    )

    await handler.async_execute_automation("auto_1", alarm_entity)
    await hass.async_block_till_done()

    assert len(calls) == 1
    data = calls[0].data
    assert data["message"] == "Hello Alice"
    assert data["details"]["delay"] == "15"
    assert data["details"]["depth2"]["depth3"]["depth4"] == 5


@pytest.mark.asyncio
async def test_process_service_data_handles_lists_and_depth(
    hass: Any, monkeypatch: pytest.MonkeyPatch
) -> None:
    """Ensure recursive processing works for lists/dicts and respects max_depth."""
    handler = _make_handler_with_config(hass, automations={})

    async def _replace(value: str, _: Any) -> str:
        return f"processed:{value}"

    monkeypatch.setattr(handler, "replace_wildcards_in_string", _replace)

    alarm_entity = SimpleNamespace()
    payload = {
        "message": "hello",
        "nested": {"inner": "world"},
        "items": ["one", {"two": "three"}],
        "number": 7,
    }

    processed = await handler._process_service_data(payload, alarm_entity)
    assert processed["message"] == "processed:hello"
    assert processed["nested"]["inner"] == "processed:world"
    assert processed["items"][0] == "processed:one"
    assert processed["items"][1]["two"] == "processed:three"
    assert processed["number"] == 7

    # With max_depth=0, nested values should not be processed
    shallow = await handler._process_service_data(payload, alarm_entity, max_depth=0)
    assert shallow["message"] == "hello"
    assert shallow["nested"]["inner"] == "world"
    assert shallow["items"][0] == "one"


@pytest.mark.asyncio
async def test_notification_fires_once_per_event_with_master(
    hass: Any, monkeypatch: pytest.MonkeyPatch
) -> None:
    """Area dispatches skipped when master + global trigger exists."""
    master_entity = SimpleNamespace(
        entity_id="alarm_control_panel.master", _arm_mode="armed_away"
    )
    area_1_entity = SimpleNamespace(
        entity_id="alarm_control_panel.area_1", _arm_mode="armed_away"
    )

    automations = {
        "notify_1": {
            "automation_id": "notify_1",
            const.ATTR_TYPE: const.ATTR_NOTIFICATION,
            "name": "Global Notification",
            const.ATTR_TRIGGERS: [
                {
                    const.ATTR_AREA: None,
                    const.ATTR_EVENT: "armed",
                    const.ATTR_MODES: ["armed_away"],
                }
            ],
            const.ATTR_ACTIONS: [],
            const.ATTR_ENABLED: True,
        }
    }

    store = _DummyStore(automations=automations)
    hass.data[const.DOMAIN] = {
        "coordinator": _DummyCoordinator(store),
        "areas": {"area_1": area_1_entity},
        "master": master_entity,
    }

    handler = AutomationHandler(hass)

    calls: list[tuple[str, Any]] = []

    async def _mock_execute(auto_id: str, entity: Any) -> None:
        calls.append((auto_id, entity))

    monkeypatch.setattr(handler, "async_execute_automation", _mock_execute)

    async_dispatcher_send(
        hass, "alarmo_state_updated", "area_1", "disarmed", "armed_away"
    )
    await hass.async_block_till_done()
    assert len(calls) == 0, f"Expected 0 for area dispatch, got {len(calls)}"

    async_dispatcher_send(
        hass, "alarmo_state_updated", None, "disarmed", "armed_away"
    )
    await hass.async_block_till_done()
    assert len(calls) == 1, f"Expected 1 for master dispatch, got {len(calls)}"
    assert calls[0][0] == "notify_1"
    assert calls[0][1] is master_entity


@pytest.mark.asyncio
async def test_notification_fires_per_area_without_master(
    hass: Any, monkeypatch: pytest.MonkeyPatch
) -> None:
    """Without a master entity, area-level dispatches execute normally per area."""
    area_1_entity = SimpleNamespace(
        entity_id="alarm_control_panel.area_1", _arm_mode="armed_away"
    )
    area_2_entity = SimpleNamespace(
        entity_id="alarm_control_panel.area_2", _arm_mode="armed_away"
    )

    automations = {
        "notify_1": {
            "automation_id": "notify_1",
            const.ATTR_TYPE: const.ATTR_NOTIFICATION,
            "name": "Area 1 Notification",
            const.ATTR_TRIGGERS: [
                {
                    const.ATTR_AREA: "area_1",
                    const.ATTR_EVENT: "armed",
                    const.ATTR_MODES: ["armed_away"],
                }
            ],
            const.ATTR_ACTIONS: [],
            const.ATTR_ENABLED: True,
        },
        "notify_2": {
            "automation_id": "notify_2",
            const.ATTR_TYPE: const.ATTR_NOTIFICATION,
            "name": "Area 2 Notification",
            const.ATTR_TRIGGERS: [
                {
                    const.ATTR_AREA: "area_2",
                    const.ATTR_EVENT: "armed",
                    const.ATTR_MODES: ["armed_away"],
                }
            ],
            const.ATTR_ACTIONS: [],
            const.ATTR_ENABLED: True,
        },
    }

    store = _DummyStore(automations=automations)
    hass.data[const.DOMAIN] = {
        "coordinator": _DummyCoordinator(store),
        "areas": {"area_1": area_1_entity, "area_2": area_2_entity},
        "master": None,
    }

    handler = AutomationHandler(hass)

    calls: list[str] = []

    async def _mock_execute(auto_id: str, entity: Any) -> None:
        calls.append(auto_id)

    monkeypatch.setattr(handler, "async_execute_automation", _mock_execute)

    async_dispatcher_send(
        hass, "alarmo_state_updated", "area_1", "disarmed", "armed_away"
    )
    await hass.async_block_till_done()
    assert "notify_1" in calls
    assert "notify_2" not in calls

    calls.clear()

    async_dispatcher_send(
        hass, "alarmo_state_updated", "area_2", "disarmed", "armed_away"
    )
    await hass.async_block_till_done()
    assert "notify_2" in calls
