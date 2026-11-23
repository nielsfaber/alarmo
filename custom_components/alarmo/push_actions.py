"""Verification of actionable push notification responses.

Alarmo reacts to `mobile_app_notification_action` events whose action is one
of `const.EVENT_ACTIONS`. Any registered mobile device (or anyone holding a
mobile_app webhook id) can fire such an event, so a bare action name does not
prove that the user pressed a button on a notification sent by Alarmo.

When Alarmo sends a notification containing Alarmo action buttons, every
button id is extended with a random single-use token (for example
`ALARMO_DISARM__<token>`). The listener only accepts a response that carries a
token Alarmo issued, that has not expired or been used before, for an action
that was part of that notification. The response is applied to the area (or
master) that sent the notification. Tokens are kept in memory only: they are
lost when Home Assistant restarts or Alarmo is reloaded, and the tokens of an
area are dropped whenever that area is armed from disarmed or disarmed.

Bare action names are only accepted when the user explicitly enables the
`push_actions_allow_unverified` option. The alarm code is required whenever
the area configuration requires it, unless `push_actions_skip_code` is
enabled. A code can be supplied with a text input action (`reply_text`).
"""

from __future__ import annotations

import re
import time
import logging
import secrets
from typing import Any
from dataclasses import dataclass
from collections.abc import Callable

import voluptuous as vol
from homeassistant.core import (
    Event,
    ServiceCall,
    HomeAssistant,
    ServiceResponse,
    SupportsResponse,
    callback,
)
from homeassistant.const import ATTR_ENTITY_ID
from homeassistant.helpers import issue_registry as ir
from homeassistant.helpers import config_validation as cv
from homeassistant.exceptions import HomeAssistantError, ServiceValidationError
from homeassistant.config_entries import ConfigEntry
from homeassistant.helpers.service import async_register_admin_service
from homeassistant.components.alarm_control_panel import AlarmControlPanelState

from . import const

_LOGGER = logging.getLogger(__name__)

# Upper bound for outstanding tokens, protects against unbounded growth.
MAX_PENDING_TOKENS = 100
# bcrypt only uses the first 72 bytes of a code: longer replies are rejected.
MAX_REPLY_BYTES = 72
# At most one warning and one rejection event per reason in this window.
REJECTION_WINDOW = 60.0

_TOKEN_PATTERN = re.compile(r"[0-9a-f]{32}")

REASON_DISABLED = "disabled"
REASON_UNVERIFIED = "unverified"
REASON_INVALID_TOKEN = "invalid_token"  # nosec B105 - reason code, not a secret
REASON_EXPIRED = "expired"
REASON_ACTION_MISMATCH = "action_mismatch"
REASON_AREA_UNAVAILABLE = "area_unavailable"
REASON_AMBIGUOUS_AREA = "ambiguous_area"
REASON_INVALID_REPLY = "invalid_reply"
REASON_UNKNOWN_ARM_MODE = "unknown_arm_mode"


@dataclass(slots=True, frozen=True)
class PendingPushAction:
    """Actions offered by one notification sent by Alarmo."""

    area_id: str | None
    actions: frozenset[str]
    expires: float
    # arm mode of the failed arm request, used by RETRY/FORCE
    arm_mode: str | None = None
    # False for tokens handed out by the issue_push_actions service
    allow_skip_code: bool = True


def get_push_action_options(entry: ConfigEntry) -> dict[str, Any]:
    """Return the push action options, strictly validated.

    Flags must be real booleans: any other value falls back to the safe
    reading (only `True` enables a flag), an invalid validity to the default.
    """
    raw = entry.options or {}
    defaults = const.DEFAULT_PUSH_ACTION_OPTIONS
    options = {
        key: raw.get(key, defaults[key]) is True
        for key in (
            const.CONF_PUSH_ACTIONS_ENABLED,
            const.CONF_PUSH_ACTIONS_SKIP_CODE,
            const.CONF_PUSH_ACTIONS_ALLOW_UNVERIFIED,
        )
    }
    validity = raw.get(const.CONF_PUSH_ACTIONS_VALIDITY)
    if (
        isinstance(validity, bool)
        or not isinstance(validity, int)
        or not 1 <= validity <= const.MAX_PUSH_ACTIONS_VALIDITY
    ):
        validity = defaults[const.CONF_PUSH_ACTIONS_VALIDITY]
    options[const.CONF_PUSH_ACTIONS_VALIDITY] = validity
    return options


def parse_push_action(value: Any) -> tuple[str, str | None] | None:
    """Split an action id into (alarmo action, token).

    Returns None when the value is not an Alarmo action.
    """
    if not isinstance(value, str):
        return None
    action, separator, token = value.partition(const.PUSH_ACTION_TOKEN_SEPARATOR)
    if action not in const.EVENT_ACTIONS:
        return None
    if not separator:
        return action, None
    return action, token


def find_push_actions(service_data: Any) -> set[str]:
    """Return the Alarmo actions used as buttons in notification service data."""
    if not isinstance(service_data, dict):
        return set()
    data = service_data.get("data")
    if not isinstance(data, dict) or not isinstance(data.get("actions"), list):
        return set()
    return {
        button["action"]
        for button in data["actions"]
        if isinstance(button, dict) and button.get("action") in const.EVENT_ACTIONS
    }


def pending_arm_mode(alarm_entity) -> str | None:
    """Arm mode that RETRY/FORCE repeat (the last requested arm mode)."""
    if alarm_entity._revert_state in const.ARM_MODES:
        return alarm_entity._revert_state
    return alarm_entity._arm_mode


class PushActionRegistry:
    """Issue and verify single-use tokens for notification actions."""

    def __init__(self, clock: Callable[[], float] = time.monotonic) -> None:
        """Initialize an empty registry."""
        self._pending: dict[str, PendingPushAction] = {}
        self._clock = clock

    def _purge_expired(self, now: float) -> None:
        for token in [k for k, v in self._pending.items() if v.expires <= now]:
            del self._pending[token]

    def issue(
        self,
        area_id: str | None,
        actions: set[str],
        validity: float,
        arm_mode: str | None = None,
        allow_skip_code: bool = True,
    ) -> str:
        """Register a new token valid for `validity` seconds."""
        now = self._clock()
        self._purge_expired(now)
        while len(self._pending) >= MAX_PENDING_TOKENS:
            # dicts keep insertion order: drop the oldest token
            del self._pending[next(iter(self._pending))]
        token = secrets.token_hex(16)
        self._pending[token] = PendingPushAction(
            area_id=area_id,
            actions=frozenset(actions),
            expires=now + validity,
            arm_mode=arm_mode,
            allow_skip_code=allow_skip_code,
        )
        return token

    def consume(
        self, token: str, action: str
    ) -> tuple[PendingPushAction | None, str | None]:
        """Verify and invalidate a token.

        Returns (pending action, None) on success or (None, reason) on failure.
        A token is invalidated on its first use, so the other buttons of the
        same notification stop working as well.
        """
        if not _TOKEN_PATTERN.fullmatch(token):
            return None, REASON_INVALID_TOKEN
        pending = self._pending.pop(token, None)
        if pending is None:
            return None, REASON_INVALID_TOKEN
        if pending.expires <= self._clock():
            return None, REASON_EXPIRED
        if action not in pending.actions:
            return None, REASON_ACTION_MISMATCH
        return pending, None

    def invalidate_area(self, area_id: str | None) -> None:
        """Drop every token of an area (None: master)."""
        for token in [k for k, v in self._pending.items() if v.area_id == area_id]:
            del self._pending[token]

    @callback
    def async_state_changed(
        self, area_id: str | None, old_state: str | None, new_state: str | None
    ) -> None:
        """Drop the tokens of an area when it is armed from disarmed or disarmed.

        Buttons stay valid within one arm cycle (arming, armed, pending,
        triggered) and within one disarmed period (failed to arm).
        """
        if old_state is None:
            return
        disarmed = AlarmControlPanelState.DISARMED
        if (old_state == disarmed) != (new_state == disarmed):
            self.invalidate_area(area_id)

    def bind_service_data(
        self,
        service_data: dict[str, Any],
        area_id: str | None,
        validity: float,
        arm_mode: str | None = None,
    ) -> dict[str, Any]:
        """Add a token to the Alarmo action buttons of a notification.

        Only `data.actions[].action` entries that are exactly an Alarmo action
        are rewritten. All buttons of one notification share one token.
        """
        actions = find_push_actions(service_data)
        if not actions:
            return service_data
        data = service_data["data"]
        token = self.issue(area_id, actions, validity, arm_mode=arm_mode)
        buttons = [
            {**button, "action": tokenized_action(button["action"], token)}
            if isinstance(button, dict) and button.get("action") in actions
            else button
            for button in data["actions"]
        ]
        return {**service_data, "data": {**data, "actions": buttons}}


def tokenized_action(action: str, token: str) -> str:
    """Return the action id carrying a token."""
    return f"{action}{const.PUSH_ACTION_TOKEN_SEPARATOR}{token}"


class RejectionLimiter:
    """Allow one warning/event per reason per window; count the rest."""

    def __init__(self, clock: Callable[[], float] = time.monotonic) -> None:
        """Initialize the limiter."""
        self._clock = clock
        self._windows: dict[str, tuple[float, int]] = {}

    def allow(self, reason: str) -> tuple[bool, int]:
        """Return (emit, number of rejections suppressed since the last one)."""
        now = self._clock()
        start, suppressed = self._windows.get(reason, (None, 0))
        if start is not None and now - start < REJECTION_WINDOW:
            self._windows[reason] = (start, suppressed + 1)
            return False, 0
        self._windows[reason] = (now, 0)
        return True, suppressed


def _reject(
    hass: HomeAssistant,
    limiter: RejectionLimiter,
    event: Event,
    action: str,
    reason: str,
    area_id: str | None = None,
) -> None:
    """Log and announce a push action that was not executed (rate limited)."""
    emit, suppressed = limiter.allow(reason)
    if not emit:
        return
    _LOGGER.warning(
        "Ignoring push action %s (reason: %s, %s similar suppressed)",
        action,
        reason,
        suppressed,
    )
    hass.bus.async_fire(
        const.EVENT_PUSH_ACTION_REJECTED,
        {
            "action": action,
            "reason": reason,
            "area_id": area_id,
            "suppressed": suppressed,
        },
        context=event.context,
    )


def _resolve_legacy_entity(hass: HomeAssistant):
    """Return the entity that handles an unverified push action, if any."""
    if hass.data[const.DOMAIN]["master"]:
        return hass.data[const.DOMAIN]["master"]
    if len(hass.data[const.DOMAIN]["areas"]) == 1:
        return next(iter(hass.data[const.DOMAIN]["areas"].values()))
    return None


def _reply_code(event: Event) -> tuple[str | None, bool]:
    """Return (code, valid) for the text typed in a text input action."""
    if "reply_text" not in event.data:
        return None, True
    reply = event.data["reply_text"]
    if not isinstance(reply, str) or len(reply.encode()) > MAX_REPLY_BYTES:
        return None, False
    return reply or None, True


async def async_handle_push_action(  # noqa: PLR0911, PLR0912
    hass: HomeAssistant,
    entry: ConfigEntry,
    registry: PushActionRegistry,
    limiter: RejectionLimiter,
    event: Event,
) -> None:
    """Handle a mobile_app_notification_action event."""
    if not event.data:
        return
    raw_action = (
        event.data.get("actionName")
        if "actionName" in event.data
        else event.data.get("action")
    )
    parsed = parse_push_action(raw_action)
    if parsed is None:
        return
    action, token = parsed
    options = get_push_action_options(entry)

    if not options[const.CONF_PUSH_ACTIONS_ENABLED]:
        _reject(hass, limiter, event, action, REASON_DISABLED)
        return

    code, reply_valid = _reply_code(event)
    if not reply_valid:
        _reject(hass, limiter, event, action, REASON_INVALID_REPLY)
        return

    allow_skip_code = True
    if token is not None:
        pending, reason = registry.consume(token, action)
        if pending is None:
            _reject(hass, limiter, event, action, reason)
            return
        if pending.area_id is None:
            alarm_entity = hass.data[const.DOMAIN]["master"]
        else:
            alarm_entity = hass.data[const.DOMAIN]["areas"].get(pending.area_id)
        if not alarm_entity:
            _reject(
                hass, limiter, event, action, REASON_AREA_UNAVAILABLE, pending.area_id
            )
            return
        arm_mode = pending.arm_mode
        allow_skip_code = pending.allow_skip_code
    else:
        if not options[const.CONF_PUSH_ACTIONS_ALLOW_UNVERIFIED]:
            _reject(hass, limiter, event, action, REASON_UNVERIFIED)
            return
        alarm_entity = _resolve_legacy_entity(hass)
        if not alarm_entity:
            _reject(hass, limiter, event, action, REASON_AMBIGUOUS_AREA)
            return
        arm_mode = pending_arm_mode(alarm_entity)
        _LOGGER.warning(
            "Executing unverified push action %s, because unverified push "
            "actions are allowed in the Alarmo options.",
            action,
        )

    # A supplied code is always validated; otherwise the code is only skipped
    # when the user explicitly allowed it.
    skip_code = (
        options[const.CONF_PUSH_ACTIONS_SKIP_CODE] and allow_skip_code and code is None
    )

    if action == const.EVENT_ACTION_DISARM:
        _LOGGER.info("Received request for disarming")
        await alarm_entity.async_alarm_disarm(code, skip_code=skip_code)
        return

    if action.startswith("ALARMO_ARM_"):
        arm_mode = action.replace("ALARMO_", "").lower().replace("arm", "armed")
    if arm_mode not in const.ARM_MODES:
        _reject(hass, limiter, event, action, REASON_UNKNOWN_ARM_MODE)
        return

    _LOGGER.info("Received request for %s with mode %s", action, arm_mode)
    await alarm_entity.async_handle_arm_request(
        arm_mode,
        code=code or "",
        skip_code=skip_code,
        bypass_open_sensors=action == const.EVENT_ACTION_FORCE_ARM,
    )


ISSUE_CODE_INPUT = "push_action_code_input"
ARM_CODE_ACTIONS = {
    const.EVENT_ACTION_RETRY_ARM,
    const.EVENT_ACTION_FORCE_ARM,
    const.EVENT_ACTION_ARM_AWAY,
    const.EVENT_ACTION_ARM_HOME,
    const.EVENT_ACTION_ARM_NIGHT,
    const.EVENT_ACTION_ARM_VACATION,
    const.EVENT_ACTION_ARM_CUSTOM_BYPASS,
}
SERVICE_ISSUE_PUSH_ACTIONS_SCHEMA = vol.Schema(
    {
        vol.Required(ATTR_ENTITY_ID): cv.entity_id,
        vol.Required("actions"): vol.All(
            cv.ensure_list, vol.Length(min=1), [vol.In(const.EVENT_ACTIONS)]
        ),
    }
)


@callback
def async_register_push_action_service(hass: HomeAssistant) -> None:
    """Register alarmo.issue_push_actions (admin only, returns action ids).

    Lets users who build their own notifications use verified actions. The
    returned tokens never skip the code, whatever the options say, so they
    grant nothing that the alarmo.arm/alarmo.disarm actions do not.
    """

    async def async_issue_push_actions(call: ServiceCall) -> ServiceResponse:
        coordinator = hass.data[const.DOMAIN]["coordinator"]
        options = get_push_action_options(coordinator.entry)
        if not options[const.CONF_PUSH_ACTIONS_ENABLED]:
            raise HomeAssistantError(
                "Push notification actions are disabled in the Alarmo options"
            )
        entity_id = call.data[ATTR_ENTITY_ID]
        entities = [
            hass.data[const.DOMAIN]["master"],
            *hass.data[const.DOMAIN]["areas"].values(),
        ]
        alarm_entity = next(
            (item for item in entities if item and item.entity_id == entity_id), None
        )
        if alarm_entity is None:
            raise ServiceValidationError(f"{entity_id} is not an Alarmo entity")
        actions = set(call.data["actions"])
        validity = options[const.CONF_PUSH_ACTIONS_VALIDITY] * 60
        token = coordinator.push_actions.issue(
            alarm_entity.area_id,
            actions,
            validity,
            arm_mode=pending_arm_mode(alarm_entity),
            allow_skip_code=False,
        )
        return {
            "actions": {
                item: tokenized_action(item, token) for item in sorted(actions)
            },
            "expires_in": validity,
        }

    async_register_admin_service(
        hass,
        const.DOMAIN,
        const.SERVICE_ISSUE_PUSH_ACTIONS,
        async_issue_push_actions,
        schema=SERVICE_ISSUE_PUSH_ACTIONS_SCHEMA,
        supports_response=SupportsResponse.ONLY,
    )


def _buttons_needing_code(automation: dict, config: dict) -> bool:
    """Whether a notification has buttons that need a code but cannot ask it."""
    for action in automation.get(const.ATTR_ACTIONS) or []:
        service_data = action.get("data") if isinstance(action, dict) else None
        data = service_data.get("data") if isinstance(service_data, dict) else None
        buttons = data.get("actions") if isinstance(data, dict) else None
        for button in buttons if isinstance(buttons, list) else []:
            if not isinstance(button, dict) or button.get("behavior") == "textInput":
                continue
            name = button.get("action")
            if name == const.EVENT_ACTION_DISARM and config.get(
                const.ATTR_CODE_DISARM_REQUIRED
            ):
                return True
            if name in ARM_CODE_ACTIONS and config.get("code_arm_required"):
                return True
    return False


@callback
def async_check_notification_setup(hass: HomeAssistant) -> None:
    """Raise a repair issue for notification buttons that cannot work.

    A button that needs the alarm code (for example ALARMO_DISARM while a
    disarm code is required) only works with `behavior: textInput`.
    """
    coordinator = hass.data[const.DOMAIN]["coordinator"]
    options = get_push_action_options(coordinator.entry)
    names = []
    if (
        options[const.CONF_PUSH_ACTIONS_ENABLED]
        and not options[const.CONF_PUSH_ACTIONS_SKIP_CODE]
    ):
        config = coordinator.store.async_get_config()
        automations = coordinator.store.async_get_automations()
        names = sorted(
            automation.get("name") or automation_id
            for automation_id, automation in automations.items()
            if automation.get(const.ATTR_TYPE) == const.ATTR_NOTIFICATION
            and automation.get(const.ATTR_ENABLED)
            and _buttons_needing_code(automation, config)
        )
    if not names:
        ir.async_delete_issue(hass, const.DOMAIN, ISSUE_CODE_INPUT)
        return
    placeholders = {"automations": ", ".join(names)}
    existing = ir.async_get(hass).async_get_issue(const.DOMAIN, ISSUE_CODE_INPUT)
    if existing is None or existing.translation_placeholders != placeholders:
        _LOGGER.warning(
            "Alarmo notifications %s have action buttons that need the alarm "
            "code; add behavior: textInput to them",
            placeholders["automations"],
        )
    ir.async_create_issue(
        hass,
        const.DOMAIN,
        ISSUE_CODE_INPUT,
        is_fixable=False,
        severity=ir.IssueSeverity.WARNING,
        translation_key=ISSUE_CODE_INPUT,
        translation_placeholders=placeholders,
    )
