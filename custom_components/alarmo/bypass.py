"""Temporary permissions to open a protected zone during an armed session."""

from homeassistant.core import callback
from homeassistant.exceptions import HomeAssistantError
from homeassistant.helpers.event import (
    async_call_later,
    async_track_state_change_event,
)
from homeassistant.helpers.dispatcher import dispatcher_send

from . import const
from .sensors import STATE_OPEN, STATE_CLOSED, parse_sensor_state


class ZoneBypassMixin:
    """Use the existing bypass perimeter with cancellable expiry metadata."""

    async def async_bypass(self, sensors, mode="enable", timeout=30, until_closed=True):
        """Temporarily bypass configured contact zones without changing arm mode."""
        if self.area_id is None:
            raise HomeAssistantError(
                "Select the Alarmo area containing the door, not the master alarm"
            )
        config = self.hass.data[const.DOMAIN]["coordinator"].store.async_get_sensors()
        sensors = list(dict.fromkeys(sensors))
        # Validate the whole request before changing any perimeter.
        for sensor in sensors:
            zone = config.get(sensor)
            if not zone or zone.get("area") != self.area_id:
                raise HomeAssistantError(
                    f"{sensor} is not an Alarmo sensor in this area"
                )
            if mode == "enable" and (
                not zone.get("enabled")
                or zone.get("always_on")
                or zone.get("type") != "door"
                or self.state not in const.ARM_MODES
                or self.state not in zone.get("modes", [])
            ):
                raise HomeAssistantError(
                    "Bypass requires an armed area and an enabled door zone "
                    "active in this mode"
                )
        for sensor in sensors:
            if mode == "disable":
                self._end_zone_bypass(sensor, "disabled")
                continue
            # Force-arm bypass belongs to the armed session; do not take ownership.
            if sensor in (self._bypassed_sensors or []):
                continue
            self._cancel_zone_bypass(sensor)
            record = {
                "opened": parse_sensor_state(self.hass.states.get(sensor)) == STATE_OPEN
            }
            self._zone_bypasses[sensor] = record

            @callback
            def changed(event, sensor=sensor, record=record):
                if self._zone_bypasses.get(sensor) is not record:
                    return
                state = parse_sensor_state(event.data["new_state"])
                if state == STATE_OPEN:
                    record["opened"] = True
                elif state == STATE_CLOSED and record["opened"]:
                    self._end_zone_bypass(sensor, "closed")

            @callback
            def expired(_now, sensor=sensor, record=record):
                if self._zone_bypasses.get(sensor) is record:
                    self._end_zone_bypass(sensor, "timeout")

            record["timer"] = async_call_later(self.hass, timeout, expired)
            if until_closed:
                record["listener"] = async_track_state_change_event(
                    self.hass, sensor, changed
                )
            # Cancel an already scheduled sensor trigger as well.
            handler = self.hass.data[const.DOMAIN]["sensor_handler"]
            handler._stop_entity_timer(handler._delay_on_timers, sensor)
            self._emit_bypass_event(const.EVENT_BYPASS_ENABLED, sensor, "enabled")
        self._refresh_bypass_perimeter()

    @callback
    def _cancel_zone_bypass(self, sensor):
        record = self._zone_bypasses.pop(sensor, None)
        if record:
            record["timer"]()
            if "listener" in record:
                record["listener"]()

    @callback
    def _clear_zone_bypasses(self):
        for sensor in list(self._zone_bypasses):
            self._cancel_zone_bypass(sensor)

    @callback
    def _refresh_bypass_perimeter(self):
        self.async_write_ha_state()
        dispatcher_send(
            self.hass, "alarmo_bypass_updated", self.area_id, self.state, self.state
        )

    @callback
    def _end_zone_bypass(self, sensor, reason="disabled"):
        if sensor not in self._zone_bypasses:
            return
        self._cancel_zone_bypass(sensor)
        self._refresh_bypass_perimeter()
        self._emit_bypass_event(const.EVENT_BYPASS_DISABLED, sensor, reason)
        # Expiring while open must evaluate the zone immediately: waiting for
        # another state change would leave a held-open door unprotected.
        handler = self.hass.data[const.DOMAIN]["sensor_handler"]
        violations, _ = handler.validate_arming_event(self.area_id, self.state)
        if sensor in violations:
            handler._execute_sensor_trigger(sensor, violations[sensor])

    @callback
    def _emit_bypass_event(self, event, sensor, reason):
        dispatcher_send(
            self.hass,
            "alarmo_event",
            event,
            self.area_id,
            {"sensors": [sensor], "reason": reason, "arm_mode": self.arm_mode},
        )
