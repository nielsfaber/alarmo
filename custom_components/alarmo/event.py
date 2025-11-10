"""fire events in HA for use with automations."""

from homeassistant.core import callback
from homeassistant.helpers.dispatcher import async_dispatcher_connect

from . import const


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

    @callback
    def async_handle_event(self, event: str, area_id: str, args: dict = {}):
        """Handle event."""
        if area_id:
            alarm_entity = self.hass.data[const.DOMAIN]["areas"][area_id]
        else:
            alarm_entity = self.hass.data[const.DOMAIN]["master"]

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
