"""test_sensor_service.py"""

# To run the tests:
# pip install -r requirements_test.txt
# pytest -v tests/test_sensor_service.py
# pytest tests/    # to run all tests

from typing import Any
from unittest.mock import MagicMock, patch, ANY  # type: ignore
import pytest
from custom_components.alarmo import const
from custom_components.alarmo.sensor_service import async_service_set_sensor_configuration

@pytest.fixture
def base_sensor_config() -> dict[str, Any]:
    """Base sensor configuration"""
    return {
        "entity_id": "binary_sensor.virtual_window_sensor_window",
        "enabled": True,
        const.ATTR_MODES: ["armed_home"],
    }

@pytest.fixture
def mock_coordinator(hass: Any, base_sensor_config: dict[str, Any]) -> Any:
    """Mock coordinator"""
    mock_store = MagicMock()
    # Simulate two sensors in the store
    mock_store.async_get_sensor.side_effect = lambda eid: dict(base_sensor_config, entity_id=eid)  # type: ignore
    mock_store.async_update_sensor = MagicMock()
    mock_store.async_get_areas.return_value = {
        "area_1": {"modes": {"armed_home": {"enabled": True}, "armed_away": {"enabled": True}}}
    }
    coordinator = MagicMock()
    coordinator.store = mock_store
    return coordinator

@pytest.mark.asyncio
async def test_set_sensor_type_only(hass: Any, mock_coordinator: Any):
    """Test set sensor type only"""
    with patch("custom_components.alarmo.sensor_service.async_dispatcher_send"):
        call = MagicMock()
        call.data = {
            const.ATTR_ENTITY_ID: "binary_sensor.virtual_window_sensor_window",
            "type": "window"
        }
        await async_service_set_sensor_configuration(hass, call, mock_coordinator)
        mock_coordinator.store.async_update_sensor.assert_called_once()
        args, _ = mock_coordinator.store.async_update_sensor.call_args
        assert args[1]["type"] == "window"

@pytest.mark.asyncio
async def test_set_multiple_sensors_modes_and_flags(hass: Any, mock_coordinator: Any):
    """Test set multiple sensors modes and flags"""
    with patch("custom_components.alarmo.sensor_service.async_dispatcher_send"):
        call = MagicMock()
        call.data = {
            const.ATTR_ENTITY_ID: [
                "binary_sensor.virtual_motion_sensor_motion",
                "binary_sensor.virtual_window_sensor_window"
            ],
            "type": "door",
            const.ATTR_MODES: ["armed_away", "armed_home"],
            "use_exit_delay": False,
            "always_on": False,
            "auto_bypass": True,
            "auto_bypass_modes": ["armed_away"]
        }
        await async_service_set_sensor_configuration(hass, call, mock_coordinator)
        # Should be called for both sensors
        assert mock_coordinator.store.async_update_sensor.call_count == 2

@pytest.mark.asyncio
async def test_fail_auto_bypass_true_no_modes(hass: Any, mock_coordinator: Any):
    """Test fail auto bypass true no modes"""
    with patch("custom_components.alarmo.sensor_service.async_dispatcher_send"):
        call = MagicMock()
        call.data = {
            const.ATTR_ENTITY_ID: "binary_sensor.virtual_window_sensor_window",
            const.ATTR_MODES: ["armed_home"],
            "auto_bypass": True,
            # auto_bypass_modes omitted
        }
        await async_service_set_sensor_configuration(hass, call, mock_coordinator)
        # Should not update sensor due to validation error
        mock_coordinator.store.async_update_sensor.assert_not_called()

@pytest.mark.asyncio
async def test_fail_auto_bypass_modes_not_in_modes(hass: Any, mock_coordinator: Any):
    """Test fail auto bypass modes not in modes"""
    with patch("custom_components.alarmo.sensor_service.async_dispatcher_send"):
        call = MagicMock()
        call.data = {
            const.ATTR_ENTITY_ID: "binary_sensor.virtual_motion_sensor_motion",
            const.ATTR_MODES: ["armed_home"],
            "auto_bypass": True,
            "auto_bypass_modes": ["armed_away"],  # not in main modes
        }
        await async_service_set_sensor_configuration(hass, call, mock_coordinator)
        mock_coordinator.store.async_update_sensor.assert_not_called()

@pytest.mark.asyncio
async def test_fail_auto_bypass_modes_but_flag_false(hass: Any, mock_coordinator: Any):
    """Test fail auto bypass modes but flag false"""
    with patch("custom_components.alarmo.sensor_service.async_dispatcher_send"):
        call = MagicMock()
        call.data = {
            const.ATTR_ENTITY_ID: "binary_sensor.virtual_motion_sensor_motion",
            const.ATTR_MODES: ["armed_home"],
            "auto_bypass": False,
            "auto_bypass_modes": ["armed_home"],
        }
        await async_service_set_sensor_configuration(hass, call, mock_coordinator)
        mock_coordinator.store.async_update_sensor.assert_not_called()

@pytest.mark.asyncio
async def test_fail_auto_bypass_true_modes_missing(hass: Any, mock_coordinator: Any):
    """Test fail auto bypass true modes missing"""
    with patch("custom_components.alarmo.sensor_service.async_dispatcher_send"):
        call = MagicMock()
        call.data = {
            const.ATTR_ENTITY_ID: "binary_sensor.virtual_motion_sensor_motion",
            const.ATTR_MODES: ["armed_home"],
            "auto_bypass": True,
            # auto_bypass_modes is deliberately omitted
        }
        await async_service_set_sensor_configuration(hass, call, mock_coordinator)
        mock_coordinator.store.async_update_sensor.assert_not_called()

@pytest.mark.asyncio
async def test_fail_auto_bypass_modes_but_flag_missing(hass: Any, mock_coordinator: Any):
    """Test fail auto bypass modes but flag missing"""
    with patch("custom_components.alarmo.sensor_service.async_dispatcher_send"):
        call = MagicMock()
        call.data = {
            const.ATTR_ENTITY_ID: [
                "binary_sensor.virtual_window_sensor_window",
                "binary_sensor.virtual_motion_sensor_motion"
            ],
            "type": "door",
            const.ATTR_MODES: ["armed_away", "armed_home"],
            "is_alarmo_sensor_enabled": True,
            "auto_bypass_modes": ["armed_away", "armed_home"]
            # auto_bypass flag missing
        }
        await async_service_set_sensor_configuration(hass, call, mock_coordinator)
        mock_coordinator.store.async_update_sensor.assert_not_called()

@pytest.mark.asyncio
async def test_valid_auto_bypass_modes_friendly_name(hass: Any, mock_coordinator: Any):
    """Test valid auto bypass modes friendly name"""
    with patch("custom_components.alarmo.sensor_service.async_dispatcher_send"):
        call = MagicMock()
        call.data = {
            const.ATTR_ENTITY_ID: [
                "binary_sensor.virtual_window_sensor_window",
                "binary_sensor.virtual_motion_sensor_motion"
            ],
            "type": "door",
            const.ATTR_MODES: ["armed_away", "armed_home"],
            "auto_bypass": True,
            "auto_bypass_modes": ["away"],  # friendly name
        }
        await async_service_set_sensor_configuration(hass, call, mock_coordinator)
        assert mock_coordinator.store.async_update_sensor.call_count == 2

@pytest.mark.asyncio
async def test_valid_disable_auto_bypass_clears_modes(hass: Any, mock_coordinator: Any):
    """Test valid disable auto bypass clears modes"""
    with patch("custom_components.alarmo.sensor_service.async_dispatcher_send"):
        call = MagicMock()
        call.data = {
            const.ATTR_ENTITY_ID: [
                "binary_sensor.virtual_window_sensor_window",
                "binary_sensor.virtual_motion_sensor_motion"
            ],
            "type": "door",
            const.ATTR_MODES: ["armed_away", "armed_home"],
            "auto_bypass": False,
        }
        await async_service_set_sensor_configuration(hass, call, mock_coordinator)
        # Should clear auto_bypass_modes
        for call_args in mock_coordinator.store.async_update_sensor.call_args_list:
            updated_config = call_args[0][1]
            assert updated_config.get("auto_bypass_modes", []) == []

@pytest.mark.asyncio
async def test_set_sensor_config_only_required(hass: Any, mock_coordinator: Any):
    """Test: only required parameters (entity_id)"""
    with patch("custom_components.alarmo.sensor_service.async_dispatcher_send"):
        call = MagicMock()
        call.data = {
            const.ATTR_ENTITY_ID: "binary_sensor.virtual_window_sensor_window"
        }
        await async_service_set_sensor_configuration(hass, call, mock_coordinator)
        mock_coordinator.store.async_update_sensor.assert_called_once()

@pytest.mark.asyncio
async def test_set_sensor_config_no_entity_id(hass: Any, mock_coordinator: Any):
    """Test: service call with no entity_id (should fail)"""
    with patch("custom_components.alarmo.sensor_service.async_dispatcher_send"):
        call = MagicMock()
        call.data = {
            "enabled": True
        }
        await async_service_set_sensor_configuration(hass, call, mock_coordinator)
        mock_coordinator.store.async_update_sensor.assert_not_called()

@pytest.mark.asyncio
async def test_set_sensor_config_invalid_entity(hass: Any, mock_coordinator: Any):
    """Test: invalid sensor entity (not in store)"""
    with patch("custom_components.alarmo.sensor_service.async_dispatcher_send"):
        mock_coordinator.store.async_get_sensor.side_effect = lambda eid: None  # type: ignore
        call = MagicMock()
        call.data = {
            const.ATTR_ENTITY_ID: "binary_sensor.nonexistent"
        }
        await async_service_set_sensor_configuration(hass, call, mock_coordinator)
        mock_coordinator.store.async_update_sensor.assert_not_called()

@pytest.mark.asyncio
async def test_set_sensor_config_multiple_one_invalid(hass: Any, mock_coordinator: Any):
    """Test: multiple sensors, one invalid"""
    with patch("custom_components.alarmo.sensor_service.async_dispatcher_send"):
        def get_sensor(eid: str) -> dict[str, Any] | None:  # type: ignore
            if eid == "binary_sensor.virtual_window_sensor_window":
                return {"entity_id": eid, "enabled": True, const.ATTR_MODES: ["armed_home"]}
            return None
        mock_coordinator.store.async_get_sensor.side_effect = get_sensor
        call = MagicMock()
        call.data = {
            const.ATTR_ENTITY_ID: [
                "binary_sensor.virtual_window_sensor_window",
                "binary_sensor.nonexistent"
            ]
        }
        await async_service_set_sensor_configuration(hass, call, mock_coordinator)
        mock_coordinator.store.async_update_sensor.assert_called_once_with("binary_sensor.virtual_window_sensor_window", ANY)

@pytest.mark.asyncio
async def test_set_sensor_config_boolean_flags_only(hass: Any, mock_coordinator: Any):
    """Test: only boolean flags"""
    with patch("custom_components.alarmo.sensor_service.async_dispatcher_send"):
        call = MagicMock()
        call.data = {
            const.ATTR_ENTITY_ID: "binary_sensor.virtual_window_sensor_window",
            "enabled": True,
            "always_on": True
        }
        await async_service_set_sensor_configuration(hass, call, mock_coordinator)
        mock_coordinator.store.async_update_sensor.assert_called_once()
        args, _ = mock_coordinator.store.async_update_sensor.call_args
        assert args[1]["enabled"] is True
        assert args[1]["always_on"] is True

@pytest.mark.asyncio
async def test_set_sensor_config_modes_friendly_names(hass: Any, mock_coordinator: Any):
    """Test: modes as friendly names"""
    with patch("custom_components.alarmo.sensor_service.async_dispatcher_send"):
        call = MagicMock()
        call.data = {
            const.ATTR_ENTITY_ID: "binary_sensor.virtual_window_sensor_window",
            const.ATTR_MODES: ["away", "home"]
        }
        await async_service_set_sensor_configuration(hass, call, mock_coordinator)
        mock_coordinator.store.async_update_sensor.assert_called_once()
        args, _ = mock_coordinator.store.async_update_sensor.call_args
        assert set(args[1][const.ATTR_MODES]) == {"armed_away", "armed_home"}

@pytest.mark.asyncio
async def test_set_sensor_config_modes_internal_names(hass: Any, mock_coordinator: Any):
    """Test: modes as internal names"""
    with patch("custom_components.alarmo.sensor_service.async_dispatcher_send"):
        call = MagicMock()
        call.data = {
            const.ATTR_ENTITY_ID: "binary_sensor.virtual_window_sensor_window",
            const.ATTR_MODES: ["armed_away", "armed_home"]
        }
        await async_service_set_sensor_configuration(hass, call, mock_coordinator)
        mock_coordinator.store.async_update_sensor.assert_called_once()
        args, _ = mock_coordinator.store.async_update_sensor.call_args
        assert set(args[1][const.ATTR_MODES]) == {"armed_away", "armed_home"}

@pytest.mark.asyncio
async def test_set_sensor_config_empty_modes(hass: Any, mock_coordinator: Any):
    """Test: empty modes list (should fail as a sensor must have modes)"""
    with patch("custom_components.alarmo.sensor_service.async_dispatcher_send"):
        call = MagicMock()
        call.data = {
            const.ATTR_ENTITY_ID: "binary_sensor.virtual_window_sensor_window",
            const.ATTR_MODES: []
        }
        await async_service_set_sensor_configuration(hass, call, mock_coordinator)
        mock_coordinator.store.async_update_sensor.assert_not_called()

@pytest.mark.asyncio
async def test_set_sensor_config_all_parameters(hass: Any, mock_coordinator: Any):
    """Test: all parameters set"""
    with patch("custom_components.alarmo.sensor_service.async_dispatcher_send"):
        call = MagicMock()
        call.data = {
            const.ATTR_ENTITY_ID: "binary_sensor.virtual_window_sensor_window",
            "type": "door",
            const.ATTR_MODES: ["armed_away", "armed_home"],
            "enabled": True,
            "always_on": True,
            "use_exit_delay": True,
            "use_entry_delay": True,
            "auto_bypass": True,
            "auto_bypass_modes": ["armed_away"],
        }
        await async_service_set_sensor_configuration(hass, call, mock_coordinator)
        mock_coordinator.store.async_update_sensor.assert_called_once()
        args, _ = mock_coordinator.store.async_update_sensor.call_args
        assert args[1]["type"] == "door"
        assert set(args[1][const.ATTR_MODES]) == {"armed_away", "armed_home"}
        assert args[1]["enabled"] is True
        assert args[1]["always_on"] is True
        assert args[1]["use_exit_delay"] is True
        assert args[1]["use_entry_delay"] is True
        assert args[1]["auto_bypass"] is True
        assert args[1]["auto_bypass_modes"] == ["armed_away"]

@pytest.mark.asyncio
async def test_set_sensor_config_extra_unknown_param(hass: Any, mock_coordinator: Any):
    """Test: extra/unknown parameter (should be rejected)"""
    with patch("custom_components.alarmo.sensor_service.async_dispatcher_send"):
        call = MagicMock()
        call.data = {
            const.ATTR_ENTITY_ID: "binary_sensor.virtual_window_sensor_window",
            "enabled": True,
            "unknown_param": 123
        }
        await async_service_set_sensor_configuration(hass, call, mock_coordinator)
        mock_coordinator.store.async_update_sensor.assert_not_called()

@pytest.mark.asyncio
async def test_set_sensor_config_none_modes(hass: Any, mock_coordinator: Any):
    """Test: modes provided as None (should fail as a sensor must have modes)"""
    with patch("custom_components.alarmo.sensor_service.async_dispatcher_send"):
        call = MagicMock()
        call.data = {
            const.ATTR_ENTITY_ID: "binary_sensor.virtual_window_sensor_window",
            const.ATTR_MODES: None
        }
        await async_service_set_sensor_configuration(hass, call, mock_coordinator)
        mock_coordinator.store.async_update_sensor.assert_not_called()

@pytest.mark.asyncio
async def test_set_sensor_config_unknown_param_rejected(hass: Any, mock_coordinator: Any):
    """Test: unknown parameter is rejected with vol.PREVENT_EXTRA"""
    with patch("custom_components.alarmo.sensor_service.async_dispatcher_send"):
        call = MagicMock()
        call.data = {
            const.ATTR_ENTITY_ID: "binary_sensor.virtual_window_sensor_window",
            "enabled": True,
            "is_alarmo_sensor_enabled": True  # This is not a valid parameter
        }
        
        await async_service_set_sensor_configuration(hass, call, mock_coordinator)
        
        # Verify the sensor was not updated because the unknown param should cause validation to fail
        # and the error to be handled internally by async_service_set_sensor_configuration.
        mock_coordinator.store.async_update_sensor.assert_not_called()
