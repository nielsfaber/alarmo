"""Class to handle MQTT integration."""

import json
import logging

from homeassistant.core import (
    HomeAssistant,
    callback,
)
from homeassistant.util import slugify
from homeassistant.components import mqtt
from homeassistant.helpers.json import JSONEncoder
from homeassistant.helpers.event import async_track_state_change_event
from homeassistant.components.mqtt import (
    DOMAIN as ATTR_MQTT,
)
from homeassistant.components.mqtt import (
    CONF_STATE_TOPIC,
    CONF_COMMAND_TOPIC,
)
from homeassistant.helpers.dispatcher import async_dispatcher_connect

from . import const
from .helpers import (
    friendly_name_for_entity_id,
)
from .sensors import parse_sensor_state

_LOGGER = logging.getLogger(__name__)
CONF_EVENT_TOPIC = "event_topic"
COMMAND_GET_SENSOR_STATES = "get_sensor_states"
EVENT_SENSOR_STATE_CHANGED = "SENSOR_STATE_CHANGED"
EVENT_SENSOR_STATES = "SENSOR_STATES"


class MqttHandler:
    """Class to handle MQTT integration."""

    def __init__(self, hass: HomeAssistant):  # noqa: PLR0915
        """Class constructor."""
        self.hass = hass
        self._config = None
        self._subscribed_topics = []
        self._subscriptions = []
        self._sensor_state_subscription = None

        @callback
        def async_update_config(_args=None):
            """Mqtt config updated, reload the configuration."""
            old_config = self._config
            new_config = self.hass.data[const.DOMAIN][
                "coordinator"
            ].store.async_get_config()

            if old_config and old_config[ATTR_MQTT] == new_config[ATTR_MQTT]:
                # only update MQTT config if some parameters are changed
                return

            self._config = new_config
            self._async_watch_sensor_states()

            if (
                not old_config
                or old_config[ATTR_MQTT][CONF_COMMAND_TOPIC]
                != new_config[ATTR_MQTT][CONF_COMMAND_TOPIC]
            ):
                # re-subscribing is only needed if the command topic has changed
                self.hass.add_job(self._async_subscribe_topics())

            _LOGGER.debug("MQTT config was (re)loaded")

        self._subscriptions.append(
            async_dispatcher_connect(hass, "alarmo_config_updated", async_update_config)
        )
        async_update_config()

        self._subscriptions.append(
            async_dispatcher_connect(
                hass, "alarmo_sensors_updated", self._async_watch_sensor_states
            )
        )

        @callback
        def async_alarm_state_changed(area_id: str, old_state: str, new_state: str):
            if not self._config[ATTR_MQTT][const.ATTR_ENABLED]:
                return

            topic = self._config[ATTR_MQTT][CONF_STATE_TOPIC]

            if not topic:  # do not publish if no topic is provided
                return

            if area_id and len(self.hass.data[const.DOMAIN]["areas"]) > 1:
                # handle the sending of a state update for a specific area
                area = self.hass.data[const.DOMAIN]["areas"][area_id]
                topic = topic.rsplit("/", 1)
                topic.insert(1, slugify(area.name))
                topic = "/".join(topic)

            payload_config = self._config[ATTR_MQTT][const.ATTR_STATE_PAYLOAD]
            if payload_config.get(new_state):
                message = payload_config[new_state]
            else:
                message = new_state

            hass.async_create_task(
                mqtt.async_publish(self.hass, topic, message, retain=True)
            )
            _LOGGER.debug(
                "Published state '%s' on topic '%s'",
                message,
                topic,
            )

        self._subscriptions.append(
            async_dispatcher_connect(
                self.hass, "alarmo_state_updated", async_alarm_state_changed
            )
        )

        @callback
        def async_handle_event(event: str, area_id: str, args: dict = {}):
            if not self._config[ATTR_MQTT][const.ATTR_ENABLED]:
                return

            topic = self._event_topic(area_id)
            if not topic:
                return

            if event == const.EVENT_ARM:
                payload = {
                    "event": f"{event.upper()}_{args['arm_mode'].split('_', 1).pop(1).upper()}",  # noqa: E501
                    "delay": args["delay"],
                }
            elif event == const.EVENT_TRIGGER:
                payload = {
                    "event": event.upper(),
                    "delay": args["delay"],
                    "sensors": [
                        {
                            "entity_id": entity,
                            "name": friendly_name_for_entity_id(entity, self.hass),
                        }
                        for (entity, state) in args["open_sensors"].items()
                    ],
                }
            elif event == const.EVENT_FAILED_TO_ARM:
                payload = {
                    "event": event.upper(),
                    "sensors": [
                        {
                            "entity_id": entity,
                            "name": friendly_name_for_entity_id(entity, self.hass),
                        }
                        for (entity, state) in args["open_sensors"].items()
                    ],
                }
            elif event == const.EVENT_COMMAND_NOT_ALLOWED:
                payload = {
                    "event": event.upper(),
                    "state": args["state"],
                    "command": args["command"].upper(),
                }
            elif event in [
                const.EVENT_INVALID_CODE_PROVIDED,
                const.EVENT_NO_CODE_PROVIDED,
            ]:
                payload = {"event": event.upper()}
            else:
                return

            payload = json.dumps(payload, cls=JSONEncoder)
            hass.async_create_task(mqtt.async_publish(self.hass, topic, payload))

        self._subscriptions.append(
            async_dispatcher_connect(self.hass, "alarmo_event", async_handle_event)
        )

    def __del__(self):
        """Prepare for removal."""
        if self._sensor_state_subscription:
            self._sensor_state_subscription()
            self._sensor_state_subscription = None
        while len(self._subscribed_topics):
            self._subscribed_topics.pop()()
        while len(self._subscriptions):
            self._subscriptions.pop()()

    def _event_topic(self, area_id: str | None = None) -> str | None:
        """Return the event topic for the master or an area."""
        topic = self._config[ATTR_MQTT][CONF_EVENT_TOPIC]
        if not topic:
            return None

        areas = self.hass.data[const.DOMAIN]["areas"]
        if area_id and len(areas) > 1:
            area = areas.get(area_id)
            if not area:
                return None
            topic_parts = topic.rsplit("/", 1)
            topic_parts.insert(1, slugify(area.name))
            topic = "/".join(topic_parts)
        return topic

    def _configured_sensors(self, area_id: str | None = None) -> dict:
        """Return enabled configured sensors, optionally limited to an area."""
        sensors = self.hass.data[const.DOMAIN]["coordinator"].store.async_get_sensors()
        return {
            entity_id: config
            for entity_id, config in sensors.items()
            if config[const.ATTR_ENABLED]
            and (area_id is None or config[const.ATTR_AREA] == area_id)
        }

    @callback
    def _async_watch_sensor_states(self):
        """Watch all enabled sensors configured in Alarmo."""
        if self._sensor_state_subscription:
            self._sensor_state_subscription()
            self._sensor_state_subscription = None

        if not self._config[ATTR_MQTT][const.ATTR_ENABLED]:
            return

        sensors = self._configured_sensors()
        if sensors:
            self._sensor_state_subscription = async_track_state_change_event(
                self.hass, list(sensors), self._async_sensor_state_changed
            )

    @callback
    def _async_sensor_state_changed(self, event):
        """Publish a normalized state change for a configured sensor."""
        if not self._config[ATTR_MQTT][const.ATTR_ENABLED]:
            return

        entity_id = event.data["entity_id"]
        sensors = self._configured_sensors()
        if entity_id not in sensors:
            return

        previous_state = parse_sensor_state(event.data["old_state"])
        state = parse_sensor_state(event.data["new_state"])
        if previous_state == state:
            return

        topic = self._event_topic(sensors[entity_id][const.ATTR_AREA])
        if not topic:
            return

        payload = {
            "event": EVENT_SENSOR_STATE_CHANGED,
            "sensor": {
                "entity_id": entity_id,
                "name": friendly_name_for_entity_id(entity_id, self.hass),
                "previous_state": previous_state,
                "state": state,
            },
        }
        self.hass.async_create_task(
            mqtt.async_publish(self.hass, topic, json.dumps(payload, cls=JSONEncoder))
        )

    def _area_id_from_slug(self, area: str) -> str | None:
        """Resolve an MQTT area slug to its Alarmo area ID."""
        for area_id, entity in self.hass.data[const.DOMAIN]["areas"].items():
            if slugify(entity.name) == area:
                return area_id
        return None

    async def _async_publish_sensor_states(
        self, area: str | None, request_id=None
    ) -> None:
        """Publish a snapshot of configured sensor states."""
        areas = self.hass.data[const.DOMAIN]["areas"]
        area_id = None
        if area:
            area_id = self._area_id_from_slug(area)
            if area_id is None:
                _LOGGER.warning("Area %s does not exist", area)
                return
        elif len(areas) == 1:
            area_id = next(iter(areas))
        elif not self._config[const.ATTR_MASTER][const.ATTR_ENABLED]:
            _LOGGER.warning("No area specified")
            return

        topic = self._event_topic(area_id)
        if not topic:
            return

        sensors = self._configured_sensors(area_id)
        payload = {
            "event": EVENT_SENSOR_STATES,
            "sensors": [
                {
                    "entity_id": entity_id,
                    "name": friendly_name_for_entity_id(entity_id, self.hass),
                    "state": parse_sensor_state(self.hass.states.get(entity_id)),
                }
                for entity_id in sorted(sensors)
            ],
        }
        if request_id is not None:
            payload["request_id"] = request_id

        await mqtt.async_publish(self.hass, topic, json.dumps(payload, cls=JSONEncoder))

    async def _async_subscribe_topics(self):
        """Install a listener for the command topic."""
        if len(self._subscribed_topics):
            while len(self._subscribed_topics):
                self._subscribed_topics.pop()()
            _LOGGER.debug("Removed subscribed topics")

        if not self._config[ATTR_MQTT][const.ATTR_ENABLED]:
            return

        self._subscribed_topics.append(
            await mqtt.async_subscribe(
                self.hass,
                self._config[ATTR_MQTT][CONF_COMMAND_TOPIC],
                self.async_message_received,
            )
        )
        _LOGGER.debug(
            "Subscribed to topic %s",
            self._config[ATTR_MQTT][CONF_COMMAND_TOPIC],
        )

    @callback
    async def async_message_received(self, msg):  # noqa: PLR0915, PLR0912
        """Handle new MQTT messages."""
        payload = {}
        command = None
        code = None
        area = None
        bypass_open_sensors = False
        skip_delay = False

        try:
            payload = json.loads(msg.payload)
            payload = {k.lower(): v for k, v in payload.items()}

            if "command" in payload:
                command = payload["command"]
            elif "cmd" in payload:
                command = payload["cmd"]
            elif "action" in payload:
                command = payload["action"]
            elif "state" in payload:
                command = payload["state"]

            if "code" in payload:
                code = payload["code"]
            elif "pin" in payload:
                code = payload["pin"]
            elif "password" in payload:
                code = payload["password"]
            elif "pincode" in payload:
                code = payload["pincode"]

            if payload.get("area"):
                area = payload["area"]

            if (payload.get("bypass_open_sensors")) or (payload.get("force")):
                bypass_open_sensors = payload["bypass_open_sensors"]

            if payload.get(const.ATTR_SKIP_DELAY):
                skip_delay = payload[const.ATTR_SKIP_DELAY]

        except ValueError:
            # no JSON structure found
            command = msg.payload
            code = None

        if type(command) is str:
            command = command.lower()
        else:
            _LOGGER.warning("Received unexpected command")
            return

        if command == COMMAND_GET_SENSOR_STATES:
            await self._async_publish_sensor_states(area, payload.get("request_id"))
            return

        payload_config = self._config[ATTR_MQTT][const.ATTR_COMMAND_PAYLOAD]
        skip_code = not self._config[ATTR_MQTT][const.ATTR_REQUIRE_CODE]

        command_payloads = {}
        for item in const.COMMANDS:
            if payload_config.get(item):
                command_payloads[item] = payload_config[item].lower()
            else:
                command_payloads[item] = item.lower()

        if command not in list(command_payloads.values()):
            _LOGGER.warning("Received unexpected command: %s", command)
            return

        if area:
            res = list(
                filter(
                    lambda el: slugify(el.name) == area,
                    self.hass.data[const.DOMAIN]["areas"].values(),
                )
            )
            if not res:
                _LOGGER.warning(
                    "Area %s does not exist",
                    area,
                )
                return
            entity = res[0]
        elif (
            self._config[const.ATTR_MASTER][const.ATTR_ENABLED]
            and len(self.hass.data[const.DOMAIN]["areas"]) > 1
        ):
            entity = self.hass.data[const.DOMAIN]["master"]
        elif len(self.hass.data[const.DOMAIN]["areas"]) == 1:
            entity = next(iter(self.hass.data[const.DOMAIN]["areas"].values()))
        else:
            _LOGGER.warning("No area specified")
            return

        _LOGGER.debug(
            "Received command %s",
            command,
        )

        if command == command_payloads[const.COMMAND_DISARM]:
            entity.alarm_disarm(code, skip_code=skip_code)
        elif command == command_payloads[const.COMMAND_ARM_AWAY]:
            await entity.async_alarm_arm_away(
                code, skip_code, bypass_open_sensors, skip_delay
            )
        elif command == command_payloads[const.COMMAND_ARM_NIGHT]:
            await entity.async_alarm_arm_night(
                code, skip_code, bypass_open_sensors, skip_delay
            )
        elif command == command_payloads[const.COMMAND_ARM_HOME]:
            await entity.async_alarm_arm_home(
                code, skip_code, bypass_open_sensors, skip_delay
            )
        elif command == command_payloads[const.COMMAND_ARM_CUSTOM_BYPASS]:
            await entity.async_alarm_arm_custom_bypass(
                code, skip_code, bypass_open_sensors, skip_delay
            )
        elif command == command_payloads[const.COMMAND_ARM_VACATION]:
            await entity.async_alarm_arm_vacation(
                code, skip_code, bypass_open_sensors, skip_delay
            )
