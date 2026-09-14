"""Tests for the Alarmo MQTT interface."""

import json
from types import SimpleNamespace
from unittest.mock import AsyncMock, MagicMock, patch

import pytest
from homeassistant.core import State

from custom_components.alarmo import const
from custom_components.alarmo.mqtt import MqttHandler

AREA_1 = "area_1"
AREA_2 = "area_2"
DOOR_SENSOR = "binary_sensor.front_door"
WINDOW_SENSOR = "binary_sensor.kitchen_window"
DISABLED_SENSOR = "binary_sensor.disabled"


def create_handler(hass, *, multiple_areas=False):
    """Create an MQTT handler with a minimal Alarmo configuration."""
    window_area = AREA_2 if multiple_areas else AREA_1
    sensors = {
        DOOR_SENSOR: {const.ATTR_ENABLED: True, const.ATTR_AREA: AREA_1},
        WINDOW_SENSOR: {const.ATTR_ENABLED: True, const.ATTR_AREA: window_area},
        DISABLED_SENSOR: {const.ATTR_ENABLED: False, const.ATTR_AREA: AREA_1},
    }
    areas = {AREA_1: SimpleNamespace(name="Downstairs")}
    if multiple_areas:
        areas[AREA_2] = SimpleNamespace(name="Upstairs")

    store = MagicMock()
    store.async_get_sensors.return_value = sensors
    hass.data[const.DOMAIN] = {
        "areas": areas,
        "coordinator": SimpleNamespace(store=store),
    }

    handler = MqttHandler.__new__(MqttHandler)
    handler.hass = hass
    handler._sensor_state_subscription = None
    handler._subscribed_topics = []
    handler._subscriptions = []
    handler._config = {
        "mqtt": {
            "enabled": True,
            "event_topic": "alarmo/event",
        },
        "master": {"enabled": True},
    }
    return handler


@pytest.mark.asyncio
async def test_sensor_state_snapshot(hass):
    """A snapshot returns normalized states for enabled configured sensors."""
    handler = create_handler(hass)
    hass.states.async_set(DOOR_SENSOR, "on", {"friendly_name": "Front Door"})
    hass.states.async_set(WINDOW_SENSOR, "off", {"friendly_name": "Kitchen Window"})
    hass.states.async_set(DISABLED_SENSOR, "on")

    message = SimpleNamespace(
        payload=json.dumps(
            {"command": "GET_SENSOR_STATES", "request_id": "front-keypad"}
        )
    )
    with patch(
        "custom_components.alarmo.mqtt.mqtt.async_publish", new_callable=AsyncMock
    ) as publish:
        await handler.async_message_received(message)

    publish.assert_awaited_once()
    assert publish.await_args.args[1] == "alarmo/event"
    payload = json.loads(publish.await_args.args[2])
    assert payload == {
        "event": "SENSOR_STATES",
        "request_id": "front-keypad",
        "sensors": [
            {
                "entity_id": DOOR_SENSOR,
                "name": "Front Door",
                "state": "open",
            },
            {
                "entity_id": WINDOW_SENSOR,
                "name": "Kitchen Window",
                "state": "closed",
            },
        ],
    }


@pytest.mark.asyncio
async def test_area_sensor_state_snapshot(hass):
    """An area snapshot uses its derived event topic and sensor set."""
    handler = create_handler(hass, multiple_areas=True)
    hass.states.async_set(DOOR_SENSOR, "off", {"friendly_name": "Front Door"})
    hass.states.async_set(WINDOW_SENSOR, "on", {"friendly_name": "Kitchen Window"})

    message = SimpleNamespace(
        payload=json.dumps({"command": "GET_SENSOR_STATES", "area": "upstairs"})
    )
    with patch(
        "custom_components.alarmo.mqtt.mqtt.async_publish", new_callable=AsyncMock
    ) as publish:
        await handler.async_message_received(message)

    assert publish.await_args.args[1] == "alarmo/upstairs/event"
    payload = json.loads(publish.await_args.args[2])
    assert payload["sensors"] == [
        {
            "entity_id": WINDOW_SENSOR,
            "name": "Kitchen Window",
            "state": "open",
        }
    ]


@pytest.mark.asyncio
async def test_sensor_state_changed(hass):
    """A configured sensor change is published with normalized states."""
    handler = create_handler(hass, multiple_areas=True)
    hass.states.async_set(DOOR_SENSOR, "on", {"friendly_name": "Front Door"})
    event = SimpleNamespace(
        data={
            "entity_id": DOOR_SENSOR,
            "old_state": State(DOOR_SENSOR, "off"),
            "new_state": State(DOOR_SENSOR, "on"),
        }
    )

    with patch(
        "custom_components.alarmo.mqtt.mqtt.async_publish", new_callable=AsyncMock
    ) as publish:
        handler._async_sensor_state_changed(event)
        await hass.async_block_till_done()

    publish.assert_awaited_once()
    assert publish.await_args.args[1] == "alarmo/downstairs/event"
    assert json.loads(publish.await_args.args[2]) == {
        "event": "SENSOR_STATE_CHANGED",
        "sensor": {
            "entity_id": DOOR_SENSOR,
            "name": "Front Door",
            "previous_state": "closed",
            "state": "open",
        },
    }
