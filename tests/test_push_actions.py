"""Tests for actionable push notification handling (mobile_app actions)."""

from __future__ import annotations

import time
from types import SimpleNamespace
from typing import Any

import pytest
from homeassistant.core import HomeAssistant
from homeassistant.helpers import issue_registry as ir
from homeassistant.exceptions import ServiceValidationError
from homeassistant.data_entry_flow import InvalidData, FlowResultType
from homeassistant.helpers.dispatcher import async_dispatcher_send
from pytest_homeassistant_custom_component.common import (
    async_mock_service,
    async_capture_events,
)

from tests.helpers import (
    advance_time,
    cleanup_timers,
    make_alarmo_entry,
    assert_alarm_state,
    patch_alarmo_integration_dependencies,
)
from tests.factories import AreaFactory, SensorFactory, StorageFactory
from custom_components.alarmo import const, push_actions
from custom_components.alarmo.push_actions import (
    MAX_PENDING_TOKENS,
    PushActionRegistry,
    parse_push_action,
    get_push_action_options,
)

AREA_1 = "alarm_control_panel.test_area_1"
AREA_2 = "alarm_control_panel.test_area_2"
MASTER = "alarm_control_panel.master"
SENSOR = "binary_sensor.generic_area_1_door_sensor"
PUSH_EVENT = "mobile_app_notification_action"
REJECTED = const.EVENT_PUSH_ACTION_REJECTED
NOTIFY_ARMED = "notify_armed"
NOTIFY_FAILED = "notify_failed"


@pytest.fixture(autouse=True)
def expected_lingering_timers():
    """Fix expected lingering timers for tests."""
    return True


@pytest.fixture(autouse=True)
def no_rejection_rate_limit(monkeypatch: pytest.MonkeyPatch):
    """Report every rejection; rate limiting has its own test."""
    monkeypatch.setattr(push_actions, "REJECTION_WINDOW", 0)


def _notification(automation_id: str, area: str | None, event: str, actions: list):
    return {
        "automation_id": automation_id,
        "type": const.ATTR_NOTIFICATION,
        "name": automation_id,
        "enabled": True,
        "triggers": [{"area": area, "event": event, "modes": []}],
        "actions": [
            {
                "service": "notify.mobile_app_phone",
                "data": {
                    "message": "Alarm event",
                    "data": {
                        "actions": [{"action": a, "title": a} for a in actions]
                        + [{"action": "URI", "title": "Open", "uri": "/alarmo"}]
                    },
                },
            }
        ],
    }


async def _setup(
    hass: HomeAssistant,
    options: dict[str, Any] | None = None,
    areas: list[dict[str, Any]] | None = None,
    master_enabled: bool = False,
    automations: dict[str, Any] | None = None,
):
    """Set up Alarmo with one door sensor and return the config entry."""
    if areas is None:
        areas = [
            AreaFactory.create_area(
                area_id="area_1", modes=["armed_away"], armed_away_exit_time=0
            )
        ]
    sensor = SensorFactory.create_door_sensor(
        entity_id=SENSOR, use_exit_delay=False, use_entry_delay=False
    )
    storage = StorageFactory.create_storage(areas=areas, sensors=[sensor])
    storage.config["master"]["enabled"] = master_enabled
    if automations is not None:
        storage.async_get_automations = lambda: automations
    entry = make_alarmo_entry(entry_id="push_actions", options=options)
    entry.add_to_hass(hass)
    return storage, entry


async def _start(hass: HomeAssistant, storage, entry) -> None:
    await hass.config_entries.async_setup(entry.entry_id)
    await hass.async_block_till_done()
    hass.states.async_set(SENSOR, "off")
    await hass.async_block_till_done()


async def _arm(hass: HomeAssistant, entity_id: str = AREA_1) -> None:
    await hass.services.async_call(
        "alarmo", "arm", {"entity_id": entity_id, "code": "1234"}, blocking=True
    )
    await hass.async_block_till_done()
    await advance_time(hass, 1)


async def _press(hass: HomeAssistant, action: str, **extra: Any) -> None:
    hass.bus.async_fire(PUSH_EVENT, {"action": action, **extra})
    await hass.async_block_till_done()
    await advance_time(hass, 1)


def _sent_action(calls: list, base: str, index: int = -1) -> str:
    """Return the action id Alarmo sent for the given base action."""
    buttons = calls[index].data["data"]["actions"]
    return next(b["action"] for b in buttons if b["action"].startswith(base + "__"))


def _coordinator(hass: HomeAssistant):
    return hass.data[const.DOMAIN]["coordinator"]


# --- unit tests -------------------------------------------------------------


def test_parse_push_action() -> None:
    """Only Alarmo actions are recognised; the token is split off."""
    assert parse_push_action("ALARMO_DISARM") == ("ALARMO_DISARM", None)
    assert parse_push_action("ALARMO_ARM_CUSTOM_BYPASS__" + "a" * 32) == (
        "ALARMO_ARM_CUSTOM_BYPASS",
        "a" * 32,
    )
    assert parse_push_action("ALARMO_DISARM_NOW") is None
    assert parse_push_action("OTHER__" + "a" * 32) is None
    assert parse_push_action(None) is None
    assert parse_push_action(42) is None


def test_bind_service_data_shares_one_token_and_keeps_other_buttons() -> None:
    """All Alarmo buttons of a notification share one token; input is untouched."""
    registry = PushActionRegistry()
    service_data = {
        "message": "x",
        "data": {
            "tag": "alarm",
            "actions": [
                {"action": "ALARMO_RETRY_ARM", "title": "Retry"},
                {"action": "ALARMO_FORCE_ARM", "title": "Force"},
                {"action": "URI", "uri": "/lovelace"},
            ],
        },
    }
    result = registry.bind_service_data(service_data, "area_1", 300)
    buttons = result["data"]["actions"]
    retry_token = buttons[0]["action"].split("__")[1]
    assert buttons[0]["action"] == f"ALARMO_RETRY_ARM__{retry_token}"
    assert buttons[1]["action"] == f"ALARMO_FORCE_ARM__{retry_token}"
    assert buttons[2] == {"action": "URI", "uri": "/lovelace"}
    assert result["data"]["tag"] == "alarm"
    assert service_data["data"]["actions"][0]["action"] == "ALARMO_RETRY_ARM"

    unchanged = {"message": "x", "data": {"actions": [{"action": "URI"}]}}
    assert registry.bind_service_data(unchanged, None, 300) is unchanged


def test_registry_is_bounded() -> None:
    """The oldest outstanding token is dropped when the registry is full."""
    registry = PushActionRegistry()
    validity = 300
    first = registry.issue(None, {"ALARMO_DISARM"}, validity)
    for _ in range(MAX_PENDING_TOKENS):
        registry.issue(None, {"ALARMO_DISARM"}, validity)
    assert registry.consume(first, "ALARMO_DISARM") == (None, "invalid_token")


# --- forged and unverified actions -----------------------------------------


@pytest.mark.parametrize(
    "options",
    [
        {},
        {const.CONF_PUSH_ACTIONS_SKIP_CODE: True},
    ],
)
async def test_forged_disarm_is_rejected(
    hass: HomeAssistant, enable_custom_integrations: Any, options: dict
) -> None:
    """A bare ALARMO_DISARM no longer disarms a code-protected alarm."""
    storage, entry = await _setup(hass, options=options)
    rejected = async_capture_events(hass, REJECTED)
    with patch_alarmo_integration_dependencies(storage):
        await _start(hass, storage, entry)
        await _arm(hass)
        assert_alarm_state(hass, AREA_1, "armed_away")

        await _press(hass, "ALARMO_DISARM")
        assert_alarm_state(hass, AREA_1, "armed_away")
        # iOS legacy categories report actionName
        hass.bus.async_fire(PUSH_EVENT, {"actionName": "ALARMO_DISARM"})
        await hass.async_block_till_done()
        assert_alarm_state(hass, AREA_1, "armed_away")

        await _press(hass, "ALARMO_DISARM__" + "0" * 32)
        assert_alarm_state(hass, AREA_1, "armed_away")

        assert [e.data["reason"] for e in rejected] == [
            "unverified",
            "unverified",
            "invalid_token",
        ]
        assert rejected[0].data["action"] == "ALARMO_DISARM"
        await cleanup_timers(hass)


async def test_forged_arm_and_force_arm_are_rejected(
    hass: HomeAssistant, enable_custom_integrations: Any
) -> None:
    """Bare arm and force-arm actions are ignored."""
    storage, entry = await _setup(hass)
    rejected = async_capture_events(hass, REJECTED)
    with patch_alarmo_integration_dependencies(storage):
        await _start(hass, storage, entry)
        await _press(hass, "ALARMO_ARM_AWAY")
        await _press(hass, "ALARMO_FORCE_ARM")
        assert_alarm_state(hass, AREA_1, "disarmed")
        assert len(rejected) == 2
        await cleanup_timers(hass)


async def test_unrelated_actions_are_ignored_silently(
    hass: HomeAssistant, enable_custom_integrations: Any
) -> None:
    """Actions that are not Alarmo actions do not produce rejection events."""
    storage, entry = await _setup(hass)
    rejected = async_capture_events(hass, REJECTED)
    with patch_alarmo_integration_dependencies(storage):
        await _start(hass, storage, entry)
        await _press(hass, "OPEN_GARAGE")
        hass.bus.async_fire(PUSH_EVENT, {})
        await hass.async_block_till_done()
        assert rejected == []
        await cleanup_timers(hass)


# --- actions of notifications sent by Alarmo -------------------------------


async def test_alarmo_notification_actions_carry_a_token(
    hass: HomeAssistant, enable_custom_integrations: Any
) -> None:
    """Alarmo replaces its button ids with single-use tokens."""
    automations = {
        NOTIFY_ARMED: _notification(NOTIFY_ARMED, "area_1", "armed", ["ALARMO_DISARM"])
    }
    storage, entry = await _setup(hass, automations=automations)
    calls = async_mock_service(hass, "notify", "mobile_app_phone")
    with patch_alarmo_integration_dependencies(storage):
        await _start(hass, storage, entry)
        await _arm(hass)
        assert len(calls) == 1
        buttons = calls[0].data["data"]["actions"]
        assert buttons[0]["action"].startswith("ALARMO_DISARM__")
        assert len(buttons[0]["action"]) == len("ALARMO_DISARM__") + 32
        assert buttons[1]["action"] == "URI"
        await cleanup_timers(hass)


async def test_verified_disarm_still_requires_the_code(
    hass: HomeAssistant, enable_custom_integrations: Any
) -> None:
    """A valid token does not bypass a required disarm code by default."""
    automations = {
        NOTIFY_ARMED: _notification(NOTIFY_ARMED, "area_1", "armed", ["ALARMO_DISARM"])
    }
    storage, entry = await _setup(hass, automations=automations)
    calls = async_mock_service(hass, "notify", "mobile_app_phone")
    failed = async_capture_events(hass, "alarmo_failed_to_arm")
    with patch_alarmo_integration_dependencies(storage):
        await _start(hass, storage, entry)
        await _arm(hass)
        await _press(hass, _sent_action(calls, "ALARMO_DISARM"))
        assert_alarm_state(hass, AREA_1, "armed_away")
        assert failed[-1].data["reason"] == "invalid_code"
        await cleanup_timers(hass)


async def test_verified_disarm_with_code_is_accepted_once(
    hass: HomeAssistant, enable_custom_integrations: Any
) -> None:
    """A code typed in a text input action is validated; replay is rejected."""
    automations = {
        NOTIFY_ARMED: _notification(NOTIFY_ARMED, "area_1", "armed", ["ALARMO_DISARM"])
    }
    storage, entry = await _setup(hass, automations=automations)
    calls = async_mock_service(hass, "notify", "mobile_app_phone")
    rejected = async_capture_events(hass, REJECTED)
    with patch_alarmo_integration_dependencies(storage):
        await _start(hass, storage, entry)
        await _arm(hass)
        action = _sent_action(calls, "ALARMO_DISARM")

        await _press(hass, action, reply_text="0000")
        assert_alarm_state(hass, AREA_1, "armed_away")
        # the token was used by the wrong code attempt
        await _press(hass, action, reply_text="1234")
        assert_alarm_state(hass, AREA_1, "armed_away")
        assert rejected[-1].data["reason"] == "invalid_token"

        await advance_time(hass, 1)
        # the second arming sent a fresh notification
        await _arm_again(hass)
        action = _sent_action(calls, "ALARMO_DISARM")
        await _press(hass, action, reply_text="1234")
        assert_alarm_state(hass, AREA_1, "disarmed")
        assert hass.states.get(AREA_1).attributes["changed_by"] == "Test User"

        await _arm_again(hass)
        await _press(hass, action, reply_text="1234")
        assert_alarm_state(hass, AREA_1, "armed_away")
        assert rejected[-1].data["reason"] == "invalid_token"
        await cleanup_timers(hass)


async def _arm_again(hass: HomeAssistant) -> None:
    state = hass.states.get(AREA_1).state
    if state != "disarmed":
        await hass.services.async_call(
            "alarmo", "disarm", {"entity_id": AREA_1, "code": "1234"}, blocking=True
        )
        await hass.async_block_till_done()
    await _arm(hass)


async def test_verified_disarm_with_skip_code_option(
    hass: HomeAssistant, enable_custom_integrations: Any
) -> None:
    """With the explicit opt-in, a verified action may skip the code."""
    automations = {
        NOTIFY_ARMED: _notification(NOTIFY_ARMED, "area_1", "armed", ["ALARMO_DISARM"])
    }
    storage, entry = await _setup(
        hass,
        options={const.CONF_PUSH_ACTIONS_SKIP_CODE: True},
        automations=automations,
    )
    calls = async_mock_service(hass, "notify", "mobile_app_phone")
    with patch_alarmo_integration_dependencies(storage):
        await _start(hass, storage, entry)
        await _arm(hass)
        await _press(hass, _sent_action(calls, "ALARMO_DISARM"))
        assert_alarm_state(hass, AREA_1, "disarmed")
        await cleanup_timers(hass)


async def test_expired_token_is_rejected(
    hass: HomeAssistant, enable_custom_integrations: Any
) -> None:
    """Buttons stop working after the configured validity."""
    automations = {
        NOTIFY_ARMED: _notification(NOTIFY_ARMED, "area_1", "armed", ["ALARMO_DISARM"])
    }
    storage, entry = await _setup(
        hass,
        options={
            const.CONF_PUSH_ACTIONS_SKIP_CODE: True,
            const.CONF_PUSH_ACTIONS_VALIDITY: 1,
        },
        automations=automations,
    )
    calls = async_mock_service(hass, "notify", "mobile_app_phone")
    rejected = async_capture_events(hass, REJECTED)
    with patch_alarmo_integration_dependencies(storage):
        await _start(hass, storage, entry)
        await _arm(hass)
        registry = _coordinator(hass).push_actions
        registry._clock = lambda: time.monotonic() + 61
        await _press(hass, _sent_action(calls, "ALARMO_DISARM"))
        assert_alarm_state(hass, AREA_1, "armed_away")
        assert rejected[-1].data["reason"] == "expired"
        await cleanup_timers(hass)


async def test_token_cannot_be_used_for_another_action(
    hass: HomeAssistant, enable_custom_integrations: Any
) -> None:
    """A token only authorises the actions of its own notification."""
    automations = {
        NOTIFY_ARMED: _notification(
            NOTIFY_ARMED, "area_1", "armed", ["ALARMO_ARM_AWAY"]
        )
    }
    storage, entry = await _setup(
        hass,
        options={const.CONF_PUSH_ACTIONS_SKIP_CODE: True},
        automations=automations,
    )
    calls = async_mock_service(hass, "notify", "mobile_app_phone")
    rejected = async_capture_events(hass, REJECTED)
    with patch_alarmo_integration_dependencies(storage):
        await _start(hass, storage, entry)
        await _arm(hass)
        token = _sent_action(calls, "ALARMO_ARM_AWAY").split("__")[1]
        await _press(hass, f"ALARMO_DISARM__{token}")
        assert_alarm_state(hass, AREA_1, "armed_away")
        assert rejected[-1].data["reason"] == "action_mismatch"
        await cleanup_timers(hass)


async def test_token_only_affects_the_area_that_sent_it(
    hass: HomeAssistant, enable_custom_integrations: Any
) -> None:
    """Without a master, a verified action is routed to the notifying area."""
    areas = [
        AreaFactory.create_area(
            area_id="area_1", modes=["armed_away"], armed_away_exit_time=0
        ),
        AreaFactory.create_area(
            area_id="area_2",
            name="Test Area 2",
            modes=["armed_away"],
            armed_away_exit_time=0,
        ),
    ]
    automations = {
        NOTIFY_ARMED: _notification(NOTIFY_ARMED, "area_2", "armed", ["ALARMO_DISARM"])
    }
    storage, entry = await _setup(
        hass,
        options={
            const.CONF_PUSH_ACTIONS_SKIP_CODE: True,
            const.CONF_PUSH_ACTIONS_ALLOW_UNVERIFIED: True,
        },
        areas=areas,
        automations=automations,
    )
    calls = async_mock_service(hass, "notify", "mobile_app_phone")
    rejected = async_capture_events(hass, REJECTED)
    with patch_alarmo_integration_dependencies(storage):
        await _start(hass, storage, entry)
        assert hass.states.get(MASTER) is None
        await _arm(hass, AREA_1)
        await _arm(hass, AREA_2)
        assert len(calls) == 1

        # an unverified action cannot pick an area
        await _press(hass, "ALARMO_DISARM")
        assert rejected[-1].data["reason"] == "ambiguous_area"

        await _press(hass, _sent_action(calls, "ALARMO_DISARM"))
        assert_alarm_state(hass, AREA_1, "armed_away")
        assert_alarm_state(hass, AREA_2, "disarmed")
        await cleanup_timers(hass)


async def test_token_for_removed_area_is_rejected(
    hass: HomeAssistant, enable_custom_integrations: Any
) -> None:
    """A token whose area no longer exists is rejected."""
    storage, entry = await _setup(
        hass, options={const.CONF_PUSH_ACTIONS_SKIP_CODE: True}
    )
    rejected = async_capture_events(hass, REJECTED)
    with patch_alarmo_integration_dependencies(storage):
        await _start(hass, storage, entry)
        await _arm(hass)
        token = _coordinator(hass).push_actions.issue("gone", {"ALARMO_DISARM"}, 300)
        await _press(hass, f"ALARMO_DISARM__{token}")
        assert_alarm_state(hass, AREA_1, "armed_away")
        assert rejected[-1].data == {
            "action": "ALARMO_DISARM",
            "reason": "area_unavailable",
            "area_id": "gone",
            "suppressed": 0,
        }
        await cleanup_timers(hass)


async def test_master_notification_routes_to_master(
    hass: HomeAssistant, enable_custom_integrations: Any
) -> None:
    """A notification of the master entity acts on the master."""
    areas = [
        AreaFactory.create_area(
            area_id="area_1", modes=["armed_away"], armed_away_exit_time=0
        ),
        AreaFactory.create_area(
            area_id="area_2",
            name="Test Area 2",
            modes=["armed_away"],
            armed_away_exit_time=0,
        ),
    ]
    automations = {
        NOTIFY_ARMED: _notification(NOTIFY_ARMED, None, "armed", ["ALARMO_DISARM"])
    }
    storage, entry = await _setup(
        hass,
        options={const.CONF_PUSH_ACTIONS_SKIP_CODE: True},
        areas=areas,
        master_enabled=True,
        automations=automations,
    )
    calls = async_mock_service(hass, "notify", "mobile_app_phone")
    with patch_alarmo_integration_dependencies(storage):
        await _start(hass, storage, entry)
        await _arm(hass, MASTER)
        assert_alarm_state(hass, MASTER, "armed_away")
        await _press(hass, _sent_action(calls, "ALARMO_DISARM"))
        assert_alarm_state(hass, MASTER, "disarmed")
        assert_alarm_state(hass, AREA_1, "disarmed")
        assert_alarm_state(hass, AREA_2, "disarmed")
        await cleanup_timers(hass)


# --- failed to arm: retry / force ------------------------------------------


async def _failed_arm_setup(hass: HomeAssistant, options: dict):
    automations = {
        NOTIFY_FAILED: _notification(
            NOTIFY_FAILED,
            "area_1",
            "arm_failure",
            ["ALARMO_RETRY_ARM", "ALARMO_FORCE_ARM"],
        )
    }
    storage, entry = await _setup(hass, options=options, automations=automations)
    calls = async_mock_service(hass, "notify", "mobile_app_phone")
    return storage, entry, calls


async def _fail_to_arm(hass: HomeAssistant) -> None:
    hass.states.async_set(SENSOR, "on")
    await hass.async_block_till_done()
    await _arm(hass)
    assert_alarm_state(hass, AREA_1, "disarmed")


async def test_force_arm_requires_code_by_default(
    hass: HomeAssistant, enable_custom_integrations: Any
) -> None:
    """Force arm respects code_arm_required unless a code is supplied."""
    storage, entry, calls = await _failed_arm_setup(hass, {})
    with patch_alarmo_integration_dependencies(storage):
        await _start(hass, storage, entry)
        await _fail_to_arm(hass)
        assert len(calls) == 1
        await _press(hass, _sent_action(calls, "ALARMO_FORCE_ARM"))
        assert_alarm_state(hass, AREA_1, "disarmed")

        await _fail_to_arm(hass)
        assert len(calls) == 2
        await _press(hass, _sent_action(calls, "ALARMO_FORCE_ARM"), reply_text="1234")
        assert_alarm_state(hass, AREA_1, "armed_away")
        assert SENSOR in hass.states.get(AREA_1).attributes["bypassed_sensors"]
        await cleanup_timers(hass)


async def test_force_arm_with_skip_code_option(
    hass: HomeAssistant, enable_custom_integrations: Any
) -> None:
    """With the opt-in, force arm bypasses the open sensor without a code."""
    storage, entry, calls = await _failed_arm_setup(
        hass, {const.CONF_PUSH_ACTIONS_SKIP_CODE: True}
    )
    rejected = async_capture_events(hass, REJECTED)
    with patch_alarmo_integration_dependencies(storage):
        await _start(hass, storage, entry)
        await _fail_to_arm(hass)
        force = _sent_action(calls, "ALARMO_FORCE_ARM")
        retry = _sent_action(calls, "ALARMO_RETRY_ARM")
        await _press(hass, force)
        assert_alarm_state(hass, AREA_1, "armed_away")
        # pressing a second button of the same notification does nothing
        await _press(hass, retry)
        assert rejected[-1].data["reason"] == "invalid_token"
        await cleanup_timers(hass)


async def test_retry_arm_with_skip_code_option(
    hass: HomeAssistant, enable_custom_integrations: Any
) -> None:
    """Retry arm repeats the failed arm mode once the sensor is closed."""
    storage, entry, calls = await _failed_arm_setup(
        hass, {const.CONF_PUSH_ACTIONS_SKIP_CODE: True}
    )
    with patch_alarmo_integration_dependencies(storage):
        await _start(hass, storage, entry)
        await _fail_to_arm(hass)
        hass.states.async_set(SENSOR, "off")
        await hass.async_block_till_done()
        await _press(hass, _sent_action(calls, "ALARMO_RETRY_ARM"))
        assert_alarm_state(hass, AREA_1, "armed_away")
        await cleanup_timers(hass)


# --- options ----------------------------------------------------------------


async def test_disabled_listener_ignores_all_actions(
    hass: HomeAssistant, enable_custom_integrations: Any
) -> None:
    """With push actions disabled Alarmo does not even listen to them."""
    automations = {
        NOTIFY_ARMED: _notification(NOTIFY_ARMED, "area_1", "armed", ["ALARMO_DISARM"])
    }
    storage, entry = await _setup(
        hass,
        options={
            const.CONF_PUSH_ACTIONS_ENABLED: False,
            const.CONF_PUSH_ACTIONS_SKIP_CODE: True,
            const.CONF_PUSH_ACTIONS_ALLOW_UNVERIFIED: True,
        },
        automations=automations,
    )
    calls = async_mock_service(hass, "notify", "mobile_app_phone")
    rejected = async_capture_events(hass, REJECTED)
    with patch_alarmo_integration_dependencies(storage):
        await _start(hass, storage, entry)
        await _arm(hass)
        await _press(hass, _sent_action(calls, "ALARMO_DISARM"))
        await _press(hass, "ALARMO_DISARM")
        assert_alarm_state(hass, AREA_1, "armed_away")
        assert rejected == []
        assert hass.bus.async_listeners().get(PUSH_EVENT, 0) == 0
        await cleanup_timers(hass)


async def test_legacy_opt_in_restores_previous_behaviour(
    hass: HomeAssistant, enable_custom_integrations: Any
) -> None:
    """Unverified actions work again only with both explicit opt-ins."""
    storage, entry = await _setup(
        hass,
        options={
            const.CONF_PUSH_ACTIONS_ALLOW_UNVERIFIED: True,
            const.CONF_PUSH_ACTIONS_SKIP_CODE: True,
        },
    )
    with patch_alarmo_integration_dependencies(storage):
        await _start(hass, storage, entry)
        await _press(hass, "ALARMO_ARM_AWAY")
        assert_alarm_state(hass, AREA_1, "armed_away")
        hass.bus.async_fire(PUSH_EVENT, {"actionName": "ALARMO_DISARM"})
        await hass.async_block_till_done()
        assert_alarm_state(hass, AREA_1, "disarmed")
        await cleanup_timers(hass)


async def test_legacy_opt_in_without_skip_code_needs_the_code(
    hass: HomeAssistant, enable_custom_integrations: Any
) -> None:
    """Accepting unverified actions alone does not bypass the code."""
    storage, entry = await _setup(
        hass, options={const.CONF_PUSH_ACTIONS_ALLOW_UNVERIFIED: True}
    )
    with patch_alarmo_integration_dependencies(storage):
        await _start(hass, storage, entry)
        await _arm(hass)
        await _press(hass, "ALARMO_DISARM")
        assert_alarm_state(hass, AREA_1, "armed_away")
        await _press(hass, "ALARMO_DISARM", reply_text="1234")
        assert_alarm_state(hass, AREA_1, "disarmed")
        await cleanup_timers(hass)


async def test_options_flow(
    hass: HomeAssistant, enable_custom_integrations: Any
) -> None:
    """The push action options can be changed from the integration options."""
    storage, entry = await _setup(hass)
    with patch_alarmo_integration_dependencies(storage):
        await _start(hass, storage, entry)
        result = await hass.config_entries.options.async_init(entry.entry_id)
        assert result["type"] is FlowResultType.FORM
        assert result["step_id"] == "init"
        result = await hass.config_entries.options.async_configure(
            result["flow_id"],
            user_input={
                const.CONF_PUSH_ACTIONS_ENABLED: False,
                const.CONF_PUSH_ACTIONS_SKIP_CODE: False,
                const.CONF_PUSH_ACTIONS_ALLOW_UNVERIFIED: False,
                const.CONF_PUSH_ACTIONS_VALIDITY: 10,
            },
        )
        assert result["type"] is FlowResultType.CREATE_ENTRY
        assert entry.options[const.CONF_PUSH_ACTIONS_ENABLED] is False
        assert entry.options[const.CONF_PUSH_ACTIONS_VALIDITY] == 10
        await cleanup_timers(hass)


# --- token lifetime ----------------------------------------------------------


async def test_tokens_end_when_the_area_is_disarmed(
    hass: HomeAssistant, enable_custom_integrations: Any
) -> None:
    """A button of an earlier arm cycle cannot be used in a later one."""
    automations = {
        NOTIFY_ARMED: _notification(NOTIFY_ARMED, "area_1", "armed", ["ALARMO_DISARM"])
    }
    storage, entry = await _setup(
        hass, options={const.CONF_PUSH_ACTIONS_SKIP_CODE: True}, automations=automations
    )
    calls = async_mock_service(hass, "notify", "mobile_app_phone")
    rejected = async_capture_events(hass, REJECTED)
    with patch_alarmo_integration_dependencies(storage):
        await _start(hass, storage, entry)
        await _arm(hass)
        stale = _sent_action(calls, "ALARMO_DISARM")
        await _arm_again(hass)
        assert len(calls) == 2
        await _press(hass, stale)
        assert_alarm_state(hass, AREA_1, "armed_away")
        assert rejected[-1].data["reason"] == "invalid_token"
        await _press(hass, _sent_action(calls, "ALARMO_DISARM"))
        assert_alarm_state(hass, AREA_1, "disarmed")
        await cleanup_timers(hass)


async def test_arming_notification_button_works_once_armed(
    hass: HomeAssistant, enable_custom_integrations: Any
) -> None:
    """Arming -> armed stays one arm cycle: the arming button keeps working."""
    areas = [
        AreaFactory.create_area(
            area_id="area_1", modes=["armed_away"], armed_away_exit_time=10
        )
    ]
    automations = {
        NOTIFY_ARMED: _notification(NOTIFY_ARMED, "area_1", "arming", ["ALARMO_DISARM"])
    }
    storage, entry = await _setup(hass, areas=areas, automations=automations)
    calls = async_mock_service(hass, "notify", "mobile_app_phone")
    with patch_alarmo_integration_dependencies(storage):
        await _start(hass, storage, entry)
        await _arm(hass)
        assert_alarm_state(hass, AREA_1, "arming")
        await advance_time(hass, 11)
        assert_alarm_state(hass, AREA_1, "armed_away")
        await _press(hass, _sent_action(calls, "ALARMO_DISARM"), reply_text="1234")
        assert_alarm_state(hass, AREA_1, "disarmed")
        await cleanup_timers(hass)


async def test_retry_and_force_use_the_arm_mode_of_their_notification(
    hass: HomeAssistant, enable_custom_integrations: Any
) -> None:
    """FORCE repeats the request that failed, not the latest arm mode."""
    areas = [
        AreaFactory.create_area(
            area_id="area_1",
            modes=["armed_away", "armed_home"],
            armed_away_exit_time=0,
            armed_home_exit_time=0,
            code_arm_required=False,
        )
    ]
    automations = {
        NOTIFY_FAILED: _notification(
            NOTIFY_FAILED,
            "area_1",
            "arm_failure",
            ["ALARMO_RETRY_ARM", "ALARMO_FORCE_ARM"],
        )
    }
    storage, entry = await _setup(hass, areas=areas, automations=automations)
    calls = async_mock_service(hass, "notify", "mobile_app_phone")
    with patch_alarmo_integration_dependencies(storage):
        await _start(hass, storage, entry)
        hass.states.async_set(SENSOR, "on")
        await hass.async_block_till_done()
        await _arm(hass)  # away, fails
        away_force = _sent_action(calls, "ALARMO_FORCE_ARM")
        await hass.services.async_call(
            "alarmo", "arm", {"entity_id": AREA_1, "mode": "home"}, blocking=True
        )
        await hass.async_block_till_done()
        assert len(calls) == 2
        assert_alarm_state(hass, AREA_1, "disarmed")
        # the default arm code setting (not required) applies to force arm
        await _press(hass, away_force)
        assert_alarm_state(hass, AREA_1, "armed_away")
        await cleanup_timers(hass)


async def test_master_token_is_not_routed_to_an_area(
    hass: HomeAssistant, enable_custom_integrations: Any
) -> None:
    """A token issued for the master never falls back to the only area."""
    storage, entry = await _setup(
        hass, options={const.CONF_PUSH_ACTIONS_SKIP_CODE: True}
    )
    rejected = async_capture_events(hass, REJECTED)
    with patch_alarmo_integration_dependencies(storage):
        await _start(hass, storage, entry)
        await _arm(hass)
        token = _coordinator(hass).push_actions.issue(None, {"ALARMO_DISARM"}, 300)
        await _press(hass, f"ALARMO_DISARM__{token}")
        assert_alarm_state(hass, AREA_1, "armed_away")
        assert rejected[-1].data["reason"] == "area_unavailable"
        await cleanup_timers(hass)


# --- input validation ----------------------------------------------------------


async def test_ios_action_name_with_token_is_accepted(
    hass: HomeAssistant, enable_custom_integrations: Any
) -> None:
    """IOS reports actionName; a token works there as well."""
    storage, entry = await _setup(hass)
    with patch_alarmo_integration_dependencies(storage):
        await _start(hass, storage, entry)
        await _arm(hass)
        token = _coordinator(hass).push_actions.issue("area_1", {"ALARMO_DISARM"}, 300)
        hass.bus.async_fire(
            PUSH_EVENT,
            {"actionName": f"ALARMO_DISARM__{token}", "reply_text": "1234"},
        )
        await hass.async_block_till_done()
        assert_alarm_state(hass, AREA_1, "disarmed")
        await cleanup_timers(hass)


@pytest.mark.parametrize("reply", [1234, ["1234"], "1" * 73, "é" * 37])
async def test_invalid_reply_text_is_rejected_before_the_code_check(
    hass: HomeAssistant, enable_custom_integrations: Any, reply: Any
) -> None:
    """Non-string or over-long (bcrypt limit) replies are refused early."""
    storage, entry = await _setup(hass)
    rejected = async_capture_events(hass, REJECTED)
    with patch_alarmo_integration_dependencies(storage):
        await _start(hass, storage, entry)
        await _arm(hass)
        token = _coordinator(hass).push_actions.issue("area_1", {"ALARMO_DISARM"}, 300)
        await _press(hass, f"ALARMO_DISARM__{token}", reply_text=reply)
        assert_alarm_state(hass, AREA_1, "armed_away")
        assert rejected[-1].data["reason"] == "invalid_reply"
        # the token was not used up by the malformed reply
        await _press(hass, f"ALARMO_DISARM__{token}", reply_text="1234")
        assert_alarm_state(hass, AREA_1, "disarmed")
        await cleanup_timers(hass)


def test_options_are_coerced_strictly() -> None:
    """Only real booleans enable a flag; invalid validity falls back."""
    entry = SimpleNamespace(
        options={
            const.CONF_PUSH_ACTIONS_ENABLED: "true",
            const.CONF_PUSH_ACTIONS_SKIP_CODE: "false",
            const.CONF_PUSH_ACTIONS_ALLOW_UNVERIFIED: 1,
            const.CONF_PUSH_ACTIONS_VALIDITY: True,
        }
    )
    assert get_push_action_options(entry) == {
        const.CONF_PUSH_ACTIONS_ENABLED: False,
        const.CONF_PUSH_ACTIONS_SKIP_CODE: False,
        const.CONF_PUSH_ACTIONS_ALLOW_UNVERIFIED: False,
        const.CONF_PUSH_ACTIONS_VALIDITY: 30,
    }
    defaults = get_push_action_options(SimpleNamespace(options={}))
    assert defaults[const.CONF_PUSH_ACTIONS_ENABLED] is True
    assert (
        get_push_action_options(
            SimpleNamespace(options={const.CONF_PUSH_ACTIONS_VALIDITY: 5000})
        )[const.CONF_PUSH_ACTIONS_VALIDITY]
        == 30
    )


async def test_options_flow_rejects_out_of_range_validity(
    hass: HomeAssistant, enable_custom_integrations: Any
) -> None:
    """The validity must be between 1 and 1440 minutes."""
    storage, entry = await _setup(hass)
    with patch_alarmo_integration_dependencies(storage):
        await _start(hass, storage, entry)
        for value in (0, 1441):
            result = await hass.config_entries.options.async_init(entry.entry_id)
            with pytest.raises(InvalidData):
                await hass.config_entries.options.async_configure(
                    result["flow_id"],
                    user_input={
                        const.CONF_PUSH_ACTIONS_ENABLED: True,
                        const.CONF_PUSH_ACTIONS_SKIP_CODE: False,
                        const.CONF_PUSH_ACTIONS_ALLOW_UNVERIFIED: False,
                        const.CONF_PUSH_ACTIONS_VALIDITY: value,
                    },
                )
            hass.config_entries.options.async_abort(result["flow_id"])
        await cleanup_timers(hass)


# --- listener and rejection reporting -------------------------------------------


async def test_listener_follows_the_enabled_option(
    hass: HomeAssistant, enable_custom_integrations: Any
) -> None:
    """Disabling unsubscribes; enabling again subscribes without a reload."""
    storage, entry = await _setup(
        hass, options={const.CONF_PUSH_ACTIONS_ENABLED: False}
    )
    rejected = async_capture_events(hass, REJECTED)
    with patch_alarmo_integration_dependencies(storage):
        await _start(hass, storage, entry)
        await _press(hass, "ALARMO_DISARM")
        assert rejected == []
        hass.config_entries.async_update_entry(
            entry, options={const.CONF_PUSH_ACTIONS_ENABLED: True}
        )
        await hass.async_block_till_done()
        await _press(hass, "ALARMO_DISARM")
        assert [e.data["reason"] for e in rejected] == ["unverified"]
        hass.config_entries.async_update_entry(
            entry, options={const.CONF_PUSH_ACTIONS_ENABLED: False}
        )
        await hass.async_block_till_done()
        await _press(hass, "ALARMO_DISARM")
        assert len(rejected) == 1
        await cleanup_timers(hass)


async def test_rejections_are_rate_limited_per_reason(
    hass: HomeAssistant,
    enable_custom_integrations: Any,
    monkeypatch: pytest.MonkeyPatch,
) -> None:
    """One warning/event per reason per minute; the rest is counted."""
    monkeypatch.setattr(push_actions, "REJECTION_WINDOW", 60)
    storage, entry = await _setup(hass)
    rejected = async_capture_events(hass, REJECTED)
    with patch_alarmo_integration_dependencies(storage):
        await _start(hass, storage, entry)
        limiter = _coordinator(hass).push_rejections
        now = [1000.0]
        limiter._clock = lambda: now[0]
        for _ in range(3):
            await _press(hass, "ALARMO_DISARM")
        await _press(hass, "ALARMO_DISARM__" + "0" * 32)
        assert [e.data["reason"] for e in rejected] == ["unverified", "invalid_token"]
        now[0] += 61
        await _press(hass, "ALARMO_DISARM")
        assert rejected[-1].data == {
            "action": "ALARMO_DISARM",
            "reason": "unverified",
            "area_id": None,
            "suppressed": 2,
        }
        await cleanup_timers(hass)


# --- service for user-built notifications ---------------------------------------


async def test_issue_push_actions_service_never_skips_the_code(
    hass: HomeAssistant, enable_custom_integrations: Any
) -> None:
    """Tokens for own notifications work, but always need the code."""
    storage, entry = await _setup(
        hass, options={const.CONF_PUSH_ACTIONS_SKIP_CODE: True}
    )
    with patch_alarmo_integration_dependencies(storage):
        await _start(hass, storage, entry)
        await _arm(hass)
        response = await hass.services.async_call(
            "alarmo",
            "issue_push_actions",
            {"entity_id": AREA_1, "actions": ["ALARMO_DISARM"]},
            blocking=True,
            return_response=True,
        )
        action = response["actions"]["ALARMO_DISARM"]
        assert action.startswith("ALARMO_DISARM__")
        assert response["expires_in"] == 1800
        await _press(hass, action)
        assert_alarm_state(hass, AREA_1, "armed_away")

        response = await hass.services.async_call(
            "alarmo",
            "issue_push_actions",
            {"entity_id": AREA_1, "actions": ["ALARMO_DISARM"]},
            blocking=True,
            return_response=True,
        )
        await _press(hass, response["actions"]["ALARMO_DISARM"], reply_text="1234")
        assert_alarm_state(hass, AREA_1, "disarmed")

        with pytest.raises(ServiceValidationError):
            await hass.services.async_call(
                "alarmo",
                "issue_push_actions",
                {
                    "entity_id": "alarm_control_panel.other",
                    "actions": ["ALARMO_DISARM"],
                },
                blocking=True,
                return_response=True,
            )
        await cleanup_timers(hass)


async def test_repair_issue_for_buttons_that_cannot_enter_the_code(
    hass: HomeAssistant, enable_custom_integrations: Any
) -> None:
    """A disarm button without text input is reported while a code is required."""
    automations = {
        NOTIFY_ARMED: _notification(NOTIFY_ARMED, "area_1", "armed", ["ALARMO_DISARM"])
    }
    storage, entry = await _setup(hass, automations=automations)
    storage.config["code_disarm_required"] = True
    with patch_alarmo_integration_dependencies(storage):
        await _start(hass, storage, entry)
        issues = ir.async_get(hass)
        issue = issues.async_get_issue(const.DOMAIN, "push_action_code_input")
        assert issue is not None
        assert issue.translation_placeholders == {"automations": NOTIFY_ARMED}

        buttons = automations[NOTIFY_ARMED]["actions"][0]["data"]["data"]["actions"]
        buttons[0]["behavior"] = "textInput"
        async_dispatcher_send(hass, "alarmo_automations_updated")
        await hass.async_block_till_done()
        assert issues.async_get_issue(const.DOMAIN, "push_action_code_input") is None
        await cleanup_timers(hass)


def test_token_must_match_exactly() -> None:
    """A trailing newline or other suffix is not accepted (fullmatch)."""
    registry = PushActionRegistry()
    token = registry.issue("area_1", {"ALARMO_DISARM"}, 300)
    assert registry.consume(token + "\n", "ALARMO_DISARM") == (None, "invalid_token")
    pending, reason = registry.consume(token, "ALARMO_DISARM")
    assert reason is None and pending.area_id == "area_1"


def test_expiry_uses_the_monotonic_clock() -> None:
    """Wall-clock jumps do not matter; the injected monotonic clock does."""
    now = [100.0]
    registry = PushActionRegistry(clock=lambda: now[0])
    token = registry.issue(None, {"ALARMO_DISARM"}, 60)
    now[0] += 60
    assert registry.consume(token, "ALARMO_DISARM") == (None, "expired")


async def test_repair_issue_for_arm_buttons_when_mode_change_needs_a_code(
    hass: HomeAssistant, enable_custom_integrations: Any
) -> None:
    """An arm button may be pressed while armed: mode-change code counts."""
    automations = {
        NOTIFY_ARMED: _notification(
            NOTIFY_ARMED, "area_1", "armed", ["ALARMO_ARM_HOME"]
        )
    }
    storage, entry = await _setup(hass, automations=automations)
    storage.config["code_mode_change_required"] = True
    with patch_alarmo_integration_dependencies(storage):
        await _start(hass, storage, entry)
        issue = ir.async_get(hass).async_get_issue(
            const.DOMAIN, "push_action_code_input"
        )
        assert issue is not None
        await cleanup_timers(hass)


async def test_disabling_the_listener_drops_issued_tokens(
    hass: HomeAssistant, enable_custom_integrations: Any
) -> None:
    """Buttons sent before the listener was disabled stay dead afterwards."""
    storage, entry = await _setup(hass)
    rejected = async_capture_events(hass, REJECTED)
    with patch_alarmo_integration_dependencies(storage):
        await _start(hass, storage, entry)
        await _arm(hass)
        token = _coordinator(hass).push_actions.issue("area_1", {"ALARMO_DISARM"}, 300)
        for enabled in (False, True):
            hass.config_entries.async_update_entry(
                entry, options={const.CONF_PUSH_ACTIONS_ENABLED: enabled}
            )
            await hass.async_block_till_done()
        await _press(hass, f"ALARMO_DISARM__{token}", reply_text="1234")
        assert_alarm_state(hass, AREA_1, "armed_away")
        assert rejected[-1].data["reason"] == "invalid_token"
        await cleanup_timers(hass)


async def test_unload_removes_the_service_and_the_repair_issue(
    hass: HomeAssistant, enable_custom_integrations: Any
) -> None:
    """Nothing of the push action support survives an unload."""
    automations = {
        NOTIFY_ARMED: _notification(NOTIFY_ARMED, "area_1", "armed", ["ALARMO_DISARM"])
    }
    storage, entry = await _setup(hass, automations=automations)
    storage.config["code_disarm_required"] = True
    with patch_alarmo_integration_dependencies(storage):
        await _start(hass, storage, entry)
        issues = ir.async_get(hass)
        assert hass.services.has_service("alarmo", "issue_push_actions")
        assert issues.async_get_issue(const.DOMAIN, "push_action_code_input")
        assert await hass.config_entries.async_unload(entry.entry_id)
        await hass.async_block_till_done()
        assert not hass.services.has_service("alarmo", "issue_push_actions")
        assert issues.async_get_issue(const.DOMAIN, "push_action_code_input") is None
        assert hass.bus.async_listeners().get(PUSH_EVENT, 0) == 0
        await cleanup_timers(hass)
