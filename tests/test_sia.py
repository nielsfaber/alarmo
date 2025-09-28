"""Test SIA integration functionality."""

from typing import Any
import pytest
from unittest.mock import patch, AsyncMock, MagicMock

from tests.factories import AreaFactory, SensorFactory
from tests.helpers import (
    advance_time,
    assert_alarm_state,
    cleanup_timers,
    patch_alarmo_integration_dependencies,
    setup_alarmo_entry,
)

from custom_components.alarmo.const import (
    DOMAIN,
    EVENT_ARM,
    EVENT_DISARM,
    EVENT_TRIGGER,
    ATTR_SIA,
)
from custom_components.alarmo.sia import SIAHandler

ALARM_ENTITY = "alarm_control_panel.test_area_1"
DOOR_SENSOR = "binary_sensor.front_door"


def get_sia_config() -> dict:
    """Get SIA configuration for testing."""
    return {
        "enabled": True,
        "host": "192.168.1.100",
        "port": 50001,
        "protocol": "TCP",
        "account": "1234",
        "receiver_id": "R000A",
        "line_id": "L001",
        "encryption_key": "",
        "secondary_host": "",
        "secondary_port": 50001,
        "connection_mode": "on_demand",
        "heartbeat_interval": 300,
        "retry_count": 3,
        "retry_delay": 5,
        "timeout": 30,
        "event_filter": [],
        "area_filter": [],
    }


@pytest.mark.asyncio
async def test_sia_handler_initialization(hass: Any, enable_custom_integrations: Any) -> None:
    """Test SIA handler initialization."""
    area = AreaFactory.create_area(area_id="area_1", name="Test Area 1")
    sensors = [
        SensorFactory.create_sensor(
            entity_id=DOOR_SENSOR,
            name="Front Door",
            area="area_1",
            modes=["armed_away", "armed_home"],
        )
    ]

    storage, entry = setup_alarmo_entry(
        hass, areas=[area], sensors=sensors, entry_id="test_sia_init"
    )

    with patch_alarmo_integration_dependencies(storage):
        await hass.config_entries.async_setup(entry.entry_id)
        await hass.async_block_till_done()

        # Check that SIA handler was created
        assert "sia_handler" in hass.data[DOMAIN]
        sia_handler = hass.data[DOMAIN]["sia_handler"]
        assert isinstance(sia_handler, SIAHandler)

        await cleanup_timers(hass)


@pytest.mark.asyncio
async def test_sia_message_construction(hass: Any, enable_custom_integrations: Any) -> None:
    """Test SIA message construction."""
    area = AreaFactory.create_area(area_id="area_1", name="Test Area 1")
    sensors = [
        SensorFactory.create_sensor(
            entity_id=DOOR_SENSOR,
            name="Front Door",
            area="area_1",
            modes=["armed_away", "armed_home"],
        )
    ]

    storage, entry = setup_alarmo_entry(
        hass, areas=[area], sensors=sensors, entry_id="test_sia_message"
    )

    with patch_alarmo_integration_dependencies(storage):
        # Add SIA configuration to storage
        storage["config"][ATTR_SIA] = get_sia_config()

        await hass.config_entries.async_setup(entry.entry_id)
        await hass.async_block_till_done()

        sia_handler = hass.data[DOMAIN]["sia_handler"]

        # Test event to SIA code mapping
        code, description = sia_handler._event_to_sia_code(EVENT_ARM, "area_1", {"arm_mode": "armed_away"})
        assert code == "CL"
        assert "Armed Away" in description

        code, description = sia_handler._event_to_sia_code(EVENT_DISARM, "area_1", {})
        assert code == "OP"
        assert "Disarmed" in description

        code, description = sia_handler._event_to_sia_code(
            EVENT_TRIGGER, "area_1", {"sensor_entity_id": DOOR_SENSOR}
        )
        assert code == "BA"  # Burglary Alarm
        assert "Front Door" in description

        # Test SIA message construction
        message = sia_handler._build_sia_message("CL", "Armed Away - Test Area 1", "area_1")
        assert '"SIA-DCS"' in message
        assert "#1234|" in message  # Account number
        assert "ri001CL" in message  # Area 1 and Close code
        assert "R000A" in message  # Receiver ID
        assert "L001" in message  # Line ID

        await cleanup_timers(hass)


@pytest.mark.asyncio
async def test_sia_event_transmission(hass: Any, enable_custom_integrations: Any) -> None:
    """Test SIA event transmission."""
    area = AreaFactory.create_area(area_id="area_1", name="Test Area 1")
    sensors = [
        SensorFactory.create_sensor(
            entity_id=DOOR_SENSOR,
            name="Front Door",
            area="area_1",
            modes=["armed_away", "armed_home"],
        )
    ]

    storage, entry = setup_alarmo_entry(
        hass, areas=[area], sensors=sensors, entry_id="test_sia_transmission"
    )

    with patch_alarmo_integration_dependencies(storage):
        # Add SIA configuration to storage
        storage["config"][ATTR_SIA] = get_sia_config()

        await hass.config_entries.async_setup(entry.entry_id)
        await hass.async_block_till_done()

        sia_handler = hass.data[DOMAIN]["sia_handler"]

        # Mock the network transmission
        with patch.object(sia_handler, '_async_send_tcp', new_callable=AsyncMock) as mock_send:
            # Force config update to load SIA settings
            sia_handler._config = {ATTR_SIA: get_sia_config()}

            # Trigger alarm arm event
            await hass.services.async_call(
                "alarmo", "arm", {"entity_id": ALARM_ENTITY, "mode": "away"}, blocking=True
            )
            await hass.async_block_till_done()

            # Allow some time for async SIA transmission
            await advance_time(hass, 2)

            # Check that SIA message was sent
            assert mock_send.called
            args = mock_send.call_args[0]
            host, port, message, timeout = args
            assert host == "192.168.1.100"
            assert port == 50001
            assert '"SIA-DCS"' in message
            assert "CL" in message  # Close/Arm code

        await cleanup_timers(hass)


@pytest.mark.asyncio
async def test_sia_trigger_event_with_sensor_types(hass: Any, enable_custom_integrations: Any) -> None:
    """Test SIA transmission for different sensor types."""
    area = AreaFactory.create_area(area_id="area_1", name="Test Area 1")
    sensors = [
        SensorFactory.create_sensor(
            entity_id="binary_sensor.smoke_detector",
            name="Smoke Detector",
            area="area_1",
            modes=["armed_away", "armed_home"],
            always_on=True,
        )
    ]

    storage, entry = setup_alarmo_entry(
        hass, areas=[area], sensors=sensors, entry_id="test_sia_sensor_types"
    )

    with patch_alarmo_integration_dependencies(storage):
        # Add SIA configuration to storage
        storage["config"][ATTR_SIA] = get_sia_config()

        await hass.config_entries.async_setup(entry.entry_id)
        await hass.async_block_till_done()

        # Set initial states
        hass.states.async_set(ALARM_ENTITY, "disarmed")
        hass.states.async_set("binary_sensor.smoke_detector", "off")
        await hass.async_block_till_done()

        sia_handler = hass.data[DOMAIN]["sia_handler"]

        # Mock the entity state to include device_class
        mock_state = MagicMock()
        mock_state.attributes = {"device_class": "smoke", "friendly_name": "Smoke Detector"}

        with patch.object(hass.states, 'get', return_value=mock_state):
            with patch.object(sia_handler, '_async_send_tcp', new_callable=AsyncMock) as mock_send:
                # Force config update to load SIA settings
                sia_handler._config = {ATTR_SIA: get_sia_config()}

                # Trigger smoke detector
                hass.states.async_set("binary_sensor.smoke_detector", "on")
                await hass.async_block_till_done()
                await advance_time(hass, 2)

                # Check that fire alarm (FA) code was sent
                assert mock_send.called
                args = mock_send.call_args[0]
                message = args[2]  # message is the third argument
                assert "FA" in message  # Fire Alarm code

        await cleanup_timers(hass)


@pytest.mark.asyncio
async def test_sia_encryption(hass: Any, enable_custom_integrations: Any) -> None:
    """Test SIA message encryption."""
    area = AreaFactory.create_area(area_id="area_1", name="Test Area 1")
    sensors = []

    storage, entry = setup_alarmo_entry(
        hass, areas=[area], sensors=sensors, entry_id="test_sia_encryption"
    )

    with patch_alarmo_integration_dependencies(storage):
        # Set SIA configuration with encryption key
        sia_config = get_sia_config()
        sia_config["encryption_key"] = "testkey1234567890"

        # Add SIA configuration to storage
        storage["config"][ATTR_SIA] = sia_config

        await hass.config_entries.async_setup(entry.entry_id)
        await hass.async_block_till_done()

        sia_handler = hass.data[DOMAIN]["sia_handler"]

        # Test encryption
        original_message = "#1234|Nri001CL[Armed Away]_14:25:36,10-28-2025"
        encrypted_message = sia_handler._encrypt_message(original_message, "testkey1234567890")

        # Encrypted message should be different and in hex format
        assert encrypted_message != original_message
        assert len(encrypted_message) > 0
        # Should be hex encoded (uppercase)
        assert all(c in "0123456789ABCDEF" for c in encrypted_message)

        # Test SIA message with encryption flag
        message = sia_handler._build_sia_message("CL", "Armed Away - Test Area 1", "area_1")
        # Should contain encryption flag
        assert '"*SIA-DCS"' in message

        await cleanup_timers(hass)


@pytest.mark.asyncio
async def test_sia_sequence_number_management(hass: Any, enable_custom_integrations: Any) -> None:
    """Test SIA sequence number management and persistence."""
    area = AreaFactory.create_area(area_id="area_1", name="Test Area 1")
    sensors = []

    storage, entry = setup_alarmo_entry(
        hass, areas=[area], sensors=sensors, entry_id="test_sia_sequence"
    )

    with patch_alarmo_integration_dependencies(storage):
        await hass.config_entries.async_setup(entry.entry_id)
        await hass.async_block_till_done()

        sia_handler = hass.data[DOMAIN]["sia_handler"]

        # Test sequence number generation
        seq1 = sia_handler._get_next_sequence()
        seq2 = sia_handler._get_next_sequence()
        seq3 = sia_handler._get_next_sequence()

        assert seq1 == "0001"
        assert seq2 == "0002"
        assert seq3 == "0003"

        # Test sequence number wraparound
        sia_handler._sequence_number = 9999
        seq_wrap = sia_handler._get_next_sequence()
        seq_after_wrap = sia_handler._get_next_sequence()

        assert seq_wrap == "9999"
        assert seq_after_wrap == "0001"

        await cleanup_timers(hass)