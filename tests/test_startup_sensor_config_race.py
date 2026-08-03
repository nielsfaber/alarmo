"""Test that Alarmo sets up before the sensor config has been loaded.

SensorHandler defers loading its sensor config until EVENT_HOMEASSISTANT_STARTED,
but the alarm entities restore their persisted state during platform setup, which
happens earlier in the startup sequence. Restoring the 'arming' state calls
async_arm(), which reaches into SensorHandler before its config is available.

Regression test for https://github.com/nielsfaber/alarmo/issues/1429
"""

from typing import Any

import pytest
from homeassistant.core import State, CoreState
from pytest_homeassistant_custom_component.common import mock_restore_cache

from tests.helpers import (
    cleanup_timers,
    setup_alarmo_entry,
    patch_alarmo_integration_dependencies,
)
from tests.factories import AreaFactory, SensorFactory

ALARM_ENTITY = "alarm_control_panel.test_area_1"
GENERIC_DOOR_SENSOR = "binary_sensor.generic_area_1_door_sensor"


@pytest.mark.asyncio
async def test_setup_restoring_arming_state_before_ha_started(
    hass: Any, enable_custom_integrations: Any
) -> None:
    """Test setup succeeds when restoring 'arming' before HA has finished starting.

    Scenario: HA is restarted during the exit delay, so the entity restores the
    'arming' state during platform setup, while HA is still starting and the sensor
    config has therefore not been loaded yet.
    Expected: the entity is added successfully instead of raising during setup.

    Note: only 'arming' reproduces this. Restoring 'pending'/'triggered' calls
    async_trigger(), which reads the area config rather than the sensor config.
    """
    area = AreaFactory.create_area(area_id="area_1", name="Test Area 1")
    sensor_config = SensorFactory.create_door_sensor(
        entity_id=GENERIC_DOOR_SENSOR,
        name="Generic Area 1 Door",
        area="area_1",
        modes=["armed_away", "armed_home"],
        always_on=False,
        auto_bypass=False,
        auto_bypass_modes=[],
        allow_open=False,
        trigger_unavailable=False,
        arm_on_close=False,
        use_exit_delay=True,
        use_entry_delay=True,
    )
    storage, entry = setup_alarmo_entry(
        hass,
        areas=[area],
        sensors=[sensor_config],
        entry_id="test_startup_sensor_config_race",
    )

    mock_restore_cache(
        hass,
        [State(ALARM_ENTITY, "arming", {"arm_mode": "armed_away"})],
    )

    # HA has not finished starting, so SensorHandler has not loaded its config yet.
    hass.set_state(CoreState.not_running)

    with patch_alarmo_integration_dependencies(storage):
        hass.states.async_set(GENERIC_DOOR_SENSOR, "off")
        await hass.async_block_till_done()

        await hass.config_entries.async_setup(entry.entry_id)
        await hass.async_block_till_done()

        # Previously the entity raised AttributeError while being added, so it never
        # made it into the state machine and the integration provided no entity.
        state = hass.states.get(ALARM_ENTITY)
        assert state is not None, (
            f"{ALARM_ENTITY} was not added when restoring 'arming' before "
            "Home Assistant finished starting"
        )
        assert state.state != "unavailable"

        # Completing startup loads the sensor config and evaluates the restored state.
        await hass.async_start()
        await hass.async_block_till_done()

        assert hass.states.get(ALARM_ENTITY) is not None
        await cleanup_timers(hass)
