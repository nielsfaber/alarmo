"""fire events in HA for use with automations."""

import time
import logging

from homeassistant.core import Context, callback
from homeassistant.helpers.dispatcher import async_dispatcher_connect

from . import const

_LOGGER = logging.getLogger(__name__)

CONTEXT_RECENT_TIME_SECONDS = 5


# events that are written to the logbook, with the activity action they map to
ACTIVITY_ACTIONS = {
    const.EVENT_ARM: "arm",
    const.EVENT_DISARM: "disarm",
    const.EVENT_TRIGGER: "trigger",
    const.EVENT_FAILED_TO_ARM: "failed_to_arm",
    const.EVENT_COMMAND_NOT_ALLOWED: "command_not_allowed",
    const.EVENT_INVALID_CODE_PROVIDED: "invalid_code",
    const.EVENT_NO_CODE_PROVIDED: "no_code",
}


class EventHandler:
    """Class to handle events from Alarmo and fire HA events."""

    def __init__(self, hass):
        """Class constructor."""
        self.hass = hass
        self._subscription = async_dispatcher_connect(
            self.hass, "alarmo_event", self.async_handle_event
        )

    def __del__(self):
        """Class destructor."""
        self._subscription()

    def _fire_activity(self, event: str, area_id: str, alarm_entity, args: dict):
        """Fire a logbook event that is linked to the cause of the action."""
        sensors = list((args.get("open_sensors") or {}).keys())

        # the cause is the sensor that changed, or else the context of the
        # service call that is currently handled by the alarm entity
        parent_id = None
        for sensor in sensors:
            sensor_state = self.hass.states.get(sensor)
            if sensor_state is not None:
                parent_id = sensor_state.context.id
                break
        if parent_id is None:
            # only use the entity context while it is recent, like HA does
            #   when writing the entity state
            context_set = getattr(alarm_entity, "_context_set", None)
            if (
                context_set is not None
                and time.time() - context_set < CONTEXT_RECENT_TIME_SECONDS
                and alarm_entity._context is not None
            ):
                parent_id = alarm_entity._context.id

        context = Context(parent_id=parent_id)
        alarm_entity.async_set_context(context)

        data = {
            "action": ACTIVITY_ACTIONS[event],
            "area_id": area_id,
            "entity_id": alarm_entity.entity_id,
            "name": alarm_entity.name,
        }
        if sensors:
            data["sensors"] = sensors
        if args.get("arm_mode"):
            data["mode"] = const.STATE_TO_ARM_MODE[args["arm_mode"]]
        for key in ("delay", "command", "state"):
            if args.get(key) is not None:
                data[key] = args[key]
        if event in (const.EVENT_ARM, const.EVENT_DISARM) and alarm_entity.changed_by:
            data["changed_by"] = alarm_entity.changed_by

        self.hass.bus.async_fire(const.EVENT_ACTIVITY, data, context=context)

    @callback
    def async_handle_event(self, event: str, area_id: str, args: dict = {}):
        """Handle event."""
        if area_id:
            alarm_entity = self.hass.data[const.DOMAIN]["areas"][area_id]
        else:
            alarm_entity = self.hass.data[const.DOMAIN]["master"]

        if alarm_entity is None:
            _LOGGER.warning(
                "Cannot resolve alarm_entity for area_id: %s (event: %s)",
                area_id,
                event,
            )
            return

        if event in ACTIVITY_ACTIONS and (area_id or event != const.EVENT_TRIGGER):
            self._fire_activity(event, area_id, alarm_entity, args)

        if event in [
            const.EVENT_FAILED_TO_ARM,
            const.EVENT_COMMAND_NOT_ALLOWED,
            const.EVENT_INVALID_CODE_PROVIDED,
            const.EVENT_NO_CODE_PROVIDED,
        ]:
            reasons = {
                const.EVENT_FAILED_TO_ARM: "open_sensors",
                const.EVENT_COMMAND_NOT_ALLOWED: "not_allowed",
                const.EVENT_INVALID_CODE_PROVIDED: "invalid_code",
                const.EVENT_NO_CODE_PROVIDED: "invalid_code",
            }

            data = dict(
                **args,
                **{
                    "area_id": area_id,
                    "entity_id": alarm_entity.entity_id,
                    "reason": reasons[event],
                },
            )
            if "open_sensors" in data:
                data["sensors"] = list(data["open_sensors"].keys())
                del data["open_sensors"]

            self.hass.bus.async_fire("alarmo_failed_to_arm", data)

        elif event in [const.EVENT_ARM, const.EVENT_DISARM]:
            data = dict(
                **args,
                **{
                    "area_id": area_id,
                    "entity_id": alarm_entity.entity_id,
                    "action": event,
                },
            )
            if "arm_mode" in data:
                data["mode"] = const.STATE_TO_ARM_MODE[data["arm_mode"]]
                del data["arm_mode"]

            self.hass.bus.async_fire("alarmo_command_success", data)

        elif event == const.EVENT_READY_TO_ARM_MODES_CHANGED:
            supported_modes = dict(
                filter(
                    lambda el: el[1] & alarm_entity.supported_features,
                    const.MODES_TO_SUPPORTED_FEATURES.items(),
                )
            )
            modes = {
                k.value: (k.value in args["modes"]) for k in supported_modes.keys()
            }
            data = {
                "area_id": area_id,
                "entity_id": alarm_entity.entity_id,
                **modes,
            }

            self.hass.bus.async_fire("alarmo_ready_to_arm_modes_updated", data)
