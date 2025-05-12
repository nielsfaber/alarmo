"""Sensor service logic for Alarmo (service handlers for setting/getting sensor configuration."""

import logging
from typing import TYPE_CHECKING, Any, cast

import voluptuous as vol

from homeassistant.core import HomeAssistant, ServiceCall
from homeassistant.helpers import config_validation as cv
from homeassistant.helpers.dispatcher import async_dispatcher_send

from . import const
from .sensors import (
    ATTR_ALLOW_OPEN,
    ATTR_ALWAYS_ON,
    ATTR_ARM_ON_CLOSE,
    ATTR_AUTO_BYPASS,
    ATTR_AUTO_BYPASS_MODES,
    ATTR_TRIGGER_UNAVAILABLE,
    ATTR_USE_ENTRY_DELAY,
    ATTR_USE_EXIT_DELAY,
    SENSOR_TYPES,
)

if TYPE_CHECKING:
    from .__init__ import AlarmoCoordinator

_LOGGER = logging.getLogger(__name__)

def build_sensor_config_schema(all_active_area_modes: set[str]) -> vol.Schema:
    """Build a validation schema for sensor configuration based on active area modes."""

    def _build_modes_validator(all_active_area_modes: set[str]):
        def validate_modes(modes: list[str]) -> list[str]:
            if not modes:
                return modes
            invalid_modes = set(modes) - all_active_area_modes
            if invalid_modes:
                raise vol.Invalid(f"Invalid/disabled modes: {list(invalid_modes)}. Must be in {sorted(all_active_area_modes)}")
            return modes
        return validate_modes
    return vol.Schema({
        vol.Optional(const.ATTR_TYPE): vol.In(SENSOR_TYPES),
        vol.Optional(const.ATTR_MODES): vol.All(
            vol.Any([str], list),
            _build_modes_validator(all_active_area_modes)
        ),
        vol.Optional(const.ATTR_ENABLED): cv.boolean,
        vol.Optional(ATTR_USE_EXIT_DELAY): cv.boolean,
        vol.Optional(ATTR_USE_ENTRY_DELAY): cv.boolean,
        vol.Optional(ATTR_ALWAYS_ON): cv.boolean,
        vol.Optional(ATTR_ARM_ON_CLOSE): cv.boolean,
        vol.Optional(ATTR_ALLOW_OPEN): cv.boolean,
        vol.Optional(ATTR_TRIGGER_UNAVAILABLE): cv.boolean,
        vol.Optional(ATTR_AUTO_BYPASS): cv.boolean,
        vol.Optional(ATTR_AUTO_BYPASS_MODES): vol.Any([str], list),
    }, extra=vol.ALLOW_EXTRA)

def auto_bypass_validator(
    config_dict: dict[str, Any],
    service_call_keys: set[str]
) -> dict[str, Any]:
    """Validate auto_bypass/auto_bypass_modes consistency with the alarm modes."""

    validated_config = config_dict.copy()
    ab_in_call = ATTR_AUTO_BYPASS in service_call_keys
    abm_in_call = ATTR_AUTO_BYPASS_MODES in service_call_keys

    prospective_auto_bypass = validated_config.get(ATTR_AUTO_BYPASS, False)
    prospective_ab_modes = validated_config.get(ATTR_AUTO_BYPASS_MODES, [])
    prospective_main_modes = validated_config.get(const.ATTR_MODES, [])

    # If enabling auto_bypass, require auto_bypass_modes to be present
    if ab_in_call and prospective_auto_bypass is True and not abm_in_call:
        raise vol.Invalid(
            f"If '{ATTR_AUTO_BYPASS}' is True, '{ATTR_AUTO_BYPASS_MODES}' must also be provided."
        )
    # If auto_bypass_modes is provided and non-empty, require auto_bypass to be True
    if (
        abm_in_call
        and prospective_ab_modes
        and not (ab_in_call and prospective_auto_bypass is True)
    ):
        raise vol.Invalid(
            f"If '{ATTR_AUTO_BYPASS_MODES}' is provided and non-empty, "
            f"'{ATTR_AUTO_BYPASS}' must also be set to True."
        )

    if ab_in_call and prospective_auto_bypass is True:
        if not prospective_ab_modes:
            raise vol.Invalid(
                f"If '{ATTR_AUTO_BYPASS}' is True, "
                f"'{ATTR_AUTO_BYPASS_MODES}' must be a non-empty list."
            )
    if prospective_auto_bypass is True:
        if not prospective_ab_modes:
            raise vol.Invalid(
                f"When '{ATTR_AUTO_BYPASS}' is True, "
                f"'{ATTR_AUTO_BYPASS_MODES}' must be a non-empty list."
            )
        invalid_subset = set(prospective_ab_modes) - set(prospective_main_modes)
        if invalid_subset:
            raise vol.Invalid(
                f"'{ATTR_AUTO_BYPASS_MODES}' ({prospective_ab_modes}) contains modes not present "
                f"in the sensor's operational '{const.ATTR_MODES}' ({prospective_main_modes}): "
                f"{list(invalid_subset)}."
            )
    if prospective_auto_bypass is False:
        if prospective_ab_modes:
            if ab_in_call and abm_in_call and prospective_ab_modes:
                raise vol.Invalid(
                    f"If '{ATTR_AUTO_BYPASS}' is explicitly set to False, "
                    f"'{ATTR_AUTO_BYPASS_MODES}' must be an empty list if provided. "
                    f"Got: {prospective_ab_modes}."
                )
            validated_config[ATTR_AUTO_BYPASS_MODES] = []
            _LOGGER.debug(
                "Auto-bypass is False, clearing auto_bypass_modes from %s to []",
                prospective_ab_modes
            )
    return validated_config

def validate_sensor_config(
    config: dict[str, Any],
    all_active_area_modes: set[str],
    service_call_keys: set[str]
) -> dict[str, Any]:
    """Validate a sensor config dict using the schema and custom cross-field logic."""

    schema = build_sensor_config_schema(all_active_area_modes)
    validated = schema(config)
    validated_dict = cast(dict[str, Any], validated)  # type: ignore
    return auto_bypass_validator(validated_dict, service_call_keys)  # type: ignore

def normalize_modes(modes: list[str]) -> list[str]:
    from .const import FRIENDLY_TO_INTERNAL_MODE
    return [FRIENDLY_TO_INTERNAL_MODE.get(mode, mode) for mode in modes]

def internal_to_friendly_modes(modes: list[str]) -> list[str]:
    from .const import FRIENDLY_TO_INTERNAL_MODE
    # Invert the mapping for reverse lookup
    internal_to_friendly = {
        v: k
        for k, v in FRIENDLY_TO_INTERNAL_MODE.items()
        if not v.startswith('armed_') or k == v
    }
    # Prefer the friendly name if available, otherwise keep the internal
    return [internal_to_friendly.get(mode, mode) for mode in modes]

async def async_service_set_sensor_configuration(hass: HomeAssistant,
                                                 call: ServiceCall,
                                                 coordinator: "AlarmoCoordinator"
) -> None:
    """Update the Alarmo-specific configuration for one or more sensor entities."""

    _LOGGER.debug("Service call.data received: %s", call.data)

    # Retrieve and validate entity_ids from the service call.
    entity_ids: list[str] = []
    entity_ids_raw = call.data.get(const.ATTR_ENTITY_ID)
    if isinstance(entity_ids_raw, list):
        for eid in entity_ids_raw:
            if isinstance(eid, str) and eid:
                eid_str: str = eid
                entity_ids.append(eid_str)
    elif isinstance(entity_ids_raw, str) and entity_ids_raw:
        entity_ids = [entity_ids_raw]
    else:
        entity_ids = []

    if not entity_ids:
        _LOGGER.error("Service set_sensor_configuration called without valid entity_id")
        return

    # Gather all active arm modes from all areas for validation context.
    all_active_area_modes: set[str] = set()
    areas = cast(
        dict[str, dict[str, Any]],
        coordinator.store.async_get_areas(),  # type: ignore[no-untyped-call]
    )
    for area_data in areas.values():
        for mode_name, mode_config in area_data.get("modes", {}).items():
            mode_config_dict: dict[str, Any] = mode_config
            if mode_config_dict.get("enabled"):
                all_active_area_modes.add(mode_name)

    if not all_active_area_modes:
        _LOGGER.warning(
            "No arm modes are enabled in any area. Mode validation for sensors might be restrictive"
        )

    # Prepare service parameters for validation and processing.
    raw_service_params = {k: v for k, v in call.data.items() if k != const.ATTR_ENTITY_ID}
    service_call_param_keys = set(raw_service_params.keys())

    # Normalize modes and auto_bypass_modes to internal names
    if const.ATTR_MODES in raw_service_params:
        raw_service_params[const.ATTR_MODES] = normalize_modes(
            raw_service_params[const.ATTR_MODES]
        )
    if ATTR_AUTO_BYPASS_MODES in raw_service_params:
        raw_service_params[ATTR_AUTO_BYPASS_MODES] = normalize_modes(
            raw_service_params[ATTR_AUTO_BYPASS_MODES]
        )

    for entity_id in entity_ids:
        # Reject empty modes list if provided
        if const.ATTR_MODES in raw_service_params and not raw_service_params[const.ATTR_MODES]:
            _LOGGER.error(
                "Sensor %s: Update failed: 'modes' list cannot be empty. Service params: %s",
                entity_id,
                raw_service_params,
            )
            continue
        sensor_config = cast(
            dict[str, Any],
            coordinator.store.async_get_sensor(entity_id),  # type: ignore[no-untyped-call]
        )
        if not sensor_config:
            _LOGGER.error(
                "Sensor %s not found in Alarmo configuration. Cannot update properties",
                entity_id,
            )
            continue
        merged_config_for_base_schema = dict(sensor_config)
        merged_config_for_base_schema.update(raw_service_params)
        try:
            final_validated_config = validate_sensor_config(
                merged_config_for_base_schema,
                all_active_area_modes,
                service_call_param_keys
            )  # type: ignore[no-untyped-call]
            schema = build_sensor_config_schema(all_active_area_modes)
            config_to_commit = {
                k: v
                for k, v in final_validated_config.items()
                if k in schema.schema or k == const.ATTR_ENABLED
            }
            coordinator.store.async_update_sensor(    # type: ignore[attr-defined]
                entity_id,
                config_to_commit
            )
            _LOGGER.info(
                "Sensor %s configuration updated. Service params: %s",
                entity_id,
                raw_service_params,
            )
            async_dispatcher_send(hass, "alarmo_sensors_updated")
        except vol.Invalid as err:
            _LOGGER.error(
                "Sensor %s: Configuration update failed: %s. Service params: %s",
                entity_id, err, raw_service_params
            )
            continue

async def async_service_get_sensor_configuration(hass: HomeAssistant,
                                                 call: ServiceCall,
                                                 coordinator: "AlarmoCoordinator"
) -> None:
    """Handle the get_sensor_configuration service call."""
    _LOGGER.debug("async_service_get_sensor_configuration called with data: %s", call.data)
    entity_id = call.data.get(const.ATTR_ENTITY_ID)
    if not entity_id:
        _LOGGER.error("Service get_sensor_configuration called without entity_id")
        hass.bus.async_fire(
            const.EVENT_ALARMO_SENSOR_GET_CONFIG_EVENT,
            cast(
                dict[str, Any],
                {
                    "entity_id": None,
                    "configuration": None,
                    "error": "entity_id_not_provided",
                },
            ),
        )
        return

    sensor_config = cast(
        dict[str, Any],
        coordinator.store.async_get_sensor(entity_id),  # type: ignore[no-untyped-call]
    )

    if sensor_config:
        # Convert internal mode names to friendly names for output
        if const.ATTR_MODES in sensor_config:
            sensor_config[const.ATTR_MODES] = internal_to_friendly_modes(
                sensor_config[const.ATTR_MODES]
            )
        if ATTR_AUTO_BYPASS_MODES in sensor_config:
            sensor_config[ATTR_AUTO_BYPASS_MODES] = internal_to_friendly_modes(
                sensor_config[ATTR_AUTO_BYPASS_MODES]
            )
        _LOGGER.debug(
            "Service get_sensor_configuration: Found config for %s: %s",
            entity_id, sensor_config
        )
        hass.bus.async_fire(
            const.EVENT_ALARMO_SENSOR_GET_CONFIG_EVENT,
            cast(
                dict[str, Any],
                {
                    "entity_id": entity_id,
                    "configuration": dict(sensor_config),
                    "error": None,
                },
            ),
        )
    else:
        _LOGGER.warning(
            "Service get_sensor_configuration: No Alarmo configuration found for sensor %s",
            entity_id,
        )
        hass.bus.async_fire(
            const.EVENT_ALARMO_SENSOR_GET_CONFIG_EVENT,
            cast(
                dict[str, Any],
                {
                    "entity_id": entity_id,
                    "configuration": None,
                    "error": "not_configured_in_alarmo",
                },
            ),
        )

SERVICE_SET_SENSOR_CONFIGURATION_SCHEMA: vol.Schema = vol.Schema({
    vol.Required(const.ATTR_ENTITY_ID): cv.entity_ids,
}, extra=vol.ALLOW_EXTRA)
