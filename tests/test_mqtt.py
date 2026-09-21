"""Test MQTT command handling."""

import json
from types import SimpleNamespace
from unittest.mock import AsyncMock, MagicMock

import pytest

from custom_components.alarmo import const
from custom_components.alarmo.mqtt import ATTR_MQTT, MqttHandler


@pytest.mark.asyncio
async def test_force_only_payload_bypasses_open_sensors():
    """A force-only MQTT payload should reach the arm command."""
    entity = MagicMock()
    entity.async_alarm_arm_away = AsyncMock()
    handler = object.__new__(MqttHandler)
    handler._subscribed_topics = []
    handler._subscriptions = []
    handler.hass = SimpleNamespace(data={const.DOMAIN: {"areas": {"area_1": entity}}})
    handler._config = {
        ATTR_MQTT: {
            const.ATTR_COMMAND_PAYLOAD: {},
            const.ATTR_REQUIRE_CODE: False,
        },
        const.ATTR_MASTER: {const.ATTR_ENABLED: False},
    }

    await handler.async_message_received(
        SimpleNamespace(
            payload=json.dumps({"command": const.COMMAND_ARM_AWAY, "force": True})
        )
    )

    entity.async_alarm_arm_away.assert_awaited_once_with(None, True, True, False)
