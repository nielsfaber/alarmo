"""Sensor service logic for Alarmo (service handlers for setting/getting sensor configuration."""

import logging
from typing import TYPE_CHECKING, Any, cast

import voluptuous as vol

from homeassistant.core import HomeAssistant, ServiceCall
from homeassistant.helpers import config_validation as cv
from homeassistant.helpers.dispatcher import async_dispatcher_send

from . import const
from .const import FRIENDLY_TO_INTERNAL_MODE
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
            # Empty modes lists are allowed - we'll validate elsewhere if auto_bypass requires them
            if not modes:
                return modes
            # When modes are provided, they must all be valid
            invalid_modes = set(modes) - all_active_area_modes
            if invalid_modes:
                raise vol.Invalid(f"Invalid modes: {list(invalid_modes)}. Valid: {sorted(all_active_area_modes)}")
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
    }, extra=vol.PREVENT_EXTRA)

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

    # Only check for modes and validate auto_bypass_modes against modes if auto_bypass is True
    if prospective_auto_bypass is True:
        if not prospective_ab_modes:
            raise vol.Invalid(
                f"When '{ATTR_AUTO_BYPASS}' is True, "
                f"'{ATTR_AUTO_BYPASS_MODES}' must be a non-empty list."
            )

        # If auto_bypass is true, we need to have modes
        if not prospective_main_modes:
            raise vol.Invalid(
                f"When '{ATTR_AUTO_BYPASS}' is True, the sensor must have at least one mode configured"
            )

        # Only check that auto_bypass_modes is a subset of main modes if auto_bypass is true and we have modes
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

def normalize_modes(modes: Any) -> list[str]:
    """Normalize mode names from user-friendly to internal representation.

    Handles None, str, and list inputs
    """
    if modes is None:
        return []
    # Handle single string case
    if isinstance(modes, str):
        return [FRIENDLY_TO_INTERNAL_MODE.get(modes, modes)]
    # Handle list case
    if isinstance(modes, list):
        return [
            FRIENDLY_TO_INTERNAL_MODE.get(item, item) 
            for item in modes   # type: ignore[var-annotated]
            if isinstance(item, str)
        ]

    # Handle unexpected types
    _LOGGER.warning("Normalize_modes received unexpected type: %s", modes.__class__.__name__)
    return []

def internal_to_friendly_modes(modes: Any) -> list[str]:
    """Convert internal mode names to user-friendly names.

    Handles None, str, and list inputs
    """

    # Handle None case
    if modes is None:
        return []

    # Invert the mapping for reverse lookup
    internal_to_friendly = {
        v: k
        for k, v in FRIENDLY_TO_INTERNAL_MODE.items()
        if not v.startswith('armed_') or k == v
    }

    # Handle single string case
    if isinstance(modes, str):
        return [internal_to_friendly.get(modes, modes)]

    # Handle list case
    if isinstance(modes, list):
        return [internal_to_friendly.get(item, item) for item in modes if isinstance(item, str)]  # type: ignore[var-annotated]

    # Handle unexpected types
    _LOGGER.warning("Internal_to_friendly_modes received unexpected type: %s", modes.__class__.__name__)
    return []

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
        # After schema validation by HA core with cv.entity_ids, this list should contain strings.
        for eid in cast(list[str], entity_ids_raw):
            if eid: # Ensure non-empty string, though cv.entity_ids should also handle this
                entity_ids.append(eid)
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

    # Prepare service parameters (excluding entity_id).
    raw_service_params_from_call = {k: v for k, v in call.data.items() if k != const.ATTR_ENTITY_ID}
    service_had_modes_key = const.ATTR_MODES in call.data # Check if user explicitly sent ATTR_MODES

    # Normalize modes in raw_service_params_from_call if present.
    if const.ATTR_MODES in raw_service_params_from_call:
        raw_service_params_from_call[const.ATTR_MODES] = normalize_modes(raw_service_params_from_call[const.ATTR_MODES])

    # Normalize auto_bypass_modes in raw_service_params_from_call if present.
    if ATTR_AUTO_BYPASS_MODES in raw_service_params_from_call:
        bypass_modes_value = raw_service_params_from_call[ATTR_AUTO_BYPASS_MODES]
        if bypass_modes_value is not None: # Explicitly null is treated as empty list
            raw_service_params_from_call[ATTR_AUTO_BYPASS_MODES] = normalize_modes(bypass_modes_value)
        else:
            raw_service_params_from_call[ATTR_AUTO_BYPASS_MODES] = []

    # Process each entity
    for entity_id in entity_ids:
        try:
            # If the user explicitly tried to set modes to None or an empty list,
            # which results in raw_service_params_from_call[const.ATTR_MODES] being [],
            # this is an invalid operation as sensors must have modes.
            if service_had_modes_key and not raw_service_params_from_call.get(const.ATTR_MODES):
                params = {k:v for k,v in call.data.items() if k != const.ATTR_ENTITY_ID}
                _LOGGER.error(
                    "Sensor %s: Invalid %s: must have modes. Params: %s",
                    entity_id, const.ATTR_MODES, params
                )
                continue # Skip to the next entity_id

            # At this point, raw_service_params_from_call contains only what the user provided (normalized).
            # Validate these user-provided parameters first. This will catch unknown keys.
            settable_fields_schema = build_sensor_config_schema(all_active_area_modes)
            validated_service_params: dict[str, Any] = settable_fields_schema(raw_service_params_from_call)

            existing_sensor_config = cast(
                dict[str, Any],
                coordinator.store.async_get_sensor(entity_id),  # type: ignore[no-untyped-call]
            )
            if not existing_sensor_config:
                _LOGGER.error(
                    "Sensor %s not found in Alarmo configuration. Cannot update properties",
                    entity_id,
                )
                continue

            # Start with a copy of the existing config, then update with validated service params.
            # Ensures non-settable fields like 'area' are preserved from existing_sensor_config.
            prospective_full_config = existing_sensor_config.copy()
            prospective_full_config.update(validated_service_params)

            # Keys that were actually in the service call (used by auto_bypass_validator)
            service_call_param_keys = set(raw_service_params_from_call.keys())

            # Perform cross-field validation (e.g., for auto_bypass) if relevant keys 
            # were in the service call.
            final_config_to_commit = prospective_full_config
            if (ATTR_AUTO_BYPASS in service_call_param_keys or 
                    ATTR_AUTO_BYPASS_MODES in service_call_param_keys):
                final_config_to_commit = auto_bypass_validator(
                    prospective_full_config, service_call_param_keys
                )

            # Filter to only include keys defined in the schema OR 'enabled', before saving.
            # This ensures we don't accidentally try to save 'area' or other internal fields
            # that might have been part of existing_sensor_config.
            config_to_save_to_store = {
                k: v
                for k, v in final_config_to_commit.items()
                if k in settable_fields_schema.schema or k == const.ATTR_ENABLED 
            }

            coordinator.store.async_update_sensor(entity_id,  # type: ignore[no-untyped-call]
                                                  config_to_save_to_store)

            _LOGGER.info(
                "Sensor %s configuration updated. Service params: %s, Applied config: %s",
                entity_id,
                {k:v for k,v in call.data.items() if k != const.ATTR_ENTITY_ID},
                config_to_save_to_store # Log what was actually saved
            )
            async_dispatcher_send(hass, "alarmo_sensors_updated")

        except vol.Invalid as err:
            _LOGGER.error(
                "Sensor %s: Configuration update failed: %s. Service params: %s",
                entity_id, err, {k:v for k,v in call.data.items() if k != const.ATTR_ENTITY_ID}
            )
            continue # to the next entity_id

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
}, extra=vol.PREVENT_EXTRA)
