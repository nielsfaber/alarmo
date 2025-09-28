"""SIA (Security Industry Association) DC-09 protocol implementation for Alarmo."""

import asyncio
import json
import logging
import socket
import time
from datetime import datetime
from typing import Optional, Dict, Any, Tuple

import crcmod
from cryptography.hazmat.primitives.ciphers import Cipher, algorithms, modes
from cryptography.hazmat.primitives import padding
from cryptography.hazmat.backends import default_backend

from homeassistant.core import (
    HomeAssistant,
    callback,
)
from homeassistant.helpers.dispatcher import async_dispatcher_connect
from homeassistant.helpers.storage import Store
from homeassistant.util import slugify

from . import const
from .helpers import friendly_name_for_entity_id

_LOGGER = logging.getLogger(__name__)

# SIA Protocol Constants
SIA_MESSAGE_TYPE = "SIA-DCS"
SIA_SEQUENCE_MIN = 1
SIA_SEQUENCE_MAX = 9999
SIA_STORAGE_VERSION = 1
SIA_STORAGE_KEY = "alarmo_sia_state"

# Default ports
SIA_DEFAULT_TCP_PORT = 50001
SIA_DEFAULT_UDP_PORT = 10200

# Connection timeouts
SIA_DEFAULT_TIMEOUT = 30
SIA_DEFAULT_RETRY_COUNT = 3
SIA_DEFAULT_RETRY_DELAY = 5


class SIAHandler:
    """Handle SIA DC-09 protocol communication."""

    def __init__(self, hass: HomeAssistant):
        """Initialize SIA handler."""
        self.hass = hass
        self._config = None
        self._subscriptions = []
        self._sequence_number = 1
        self._storage = Store(hass, SIA_STORAGE_VERSION, SIA_STORAGE_KEY)

        # Initialize CRC function (CRC-16 CCITT)
        self._crc_func = crcmod.predefined.mkCrcFun('crc-ccitt-false')

        @callback
        def async_update_config(_args=None):
            """SIA config updated, reload the configuration."""
            old_config = self._config

            # Get SIA config from Alarmo store
            coordinator = self.hass.data[const.DOMAIN]["coordinator"]
            store_config = coordinator.store.async_get_config()
            new_config = {const.ATTR_SIA: store_config.get(const.ATTR_SIA, {})}

            if old_config and old_config.get(const.ATTR_SIA, {}) == new_config.get(const.ATTR_SIA, {}):
                # only update SIA config if some parameters are changed
                return

            self._config = new_config
            _LOGGER.debug("SIA config was (re)loaded")

        self._subscriptions.append(
            async_dispatcher_connect(hass, "alarmo_config_updated", async_update_config)
        )

        # Also listen for config entry updates
        @callback
        def async_entry_updated():
            """Handle config entry updates."""
            async_update_config()

        self._subscriptions.append(
            async_dispatcher_connect(hass, f"alarmo_entry_updated", async_entry_updated)
        )

        async_update_config()

        @callback
        def async_handle_event(event: str, area_id: str, args: dict = {}):
            """Handle Alarmo events and send SIA messages."""
            if not self._config or not self._config.get(const.ATTR_SIA, {}).get("enabled", False):
                return

            # Schedule async SIA message transmission
            hass.async_create_task(self._async_send_sia_event(event, area_id, args))

        self._subscriptions.append(
            async_dispatcher_connect(self.hass, "alarmo_event", async_handle_event)
        )

    def __del__(self):
        """Class destructor."""
        for subscription in self._subscriptions:
            subscription()

    async def async_initialize(self):
        """Initialize SIA handler with stored state."""
        try:
            stored_data = await self._storage.async_load()
            if stored_data:
                self._sequence_number = stored_data.get("sequence_number", 1)
        except Exception as err:
            _LOGGER.warning("Failed to load SIA storage: %s", err)
            self._sequence_number = 1

    async def _async_save_state(self):
        """Save SIA state to storage."""
        try:
            await self._storage.async_save({
                "sequence_number": self._sequence_number
            })
        except Exception as err:
            _LOGGER.warning("Failed to save SIA storage: %s", err)

    def _get_next_sequence(self) -> str:
        """Get next sequence number and increment."""
        sequence = self._sequence_number
        self._sequence_number += 1
        if self._sequence_number > SIA_SEQUENCE_MAX:
            self._sequence_number = SIA_SEQUENCE_MIN

        # Schedule save of new sequence number
        self.hass.async_create_task(self._async_save_state())

        return f"{sequence:04d}"

    def _event_to_sia_code(self, event: str, area_id: str, args: dict) -> Tuple[str, str]:
        """Convert Alarmo event to SIA event code and description."""
        # Get sensor information from args if available
        sensor_entity_id = args.get("sensor_entity_id")
        sensor_name = ""

        if sensor_entity_id:
            sensor_name = friendly_name_for_entity_id(self.hass, sensor_entity_id)
            entity = self.hass.states.get(sensor_entity_id)
            device_class = entity.attributes.get("device_class") if entity else None
        else:
            device_class = None

        # Map Alarmo events to SIA codes
        if event == const.EVENT_ARM:
            arm_mode = args.get("arm_mode", "")
            if "away" in arm_mode:
                return "CL", f"Armed Away - {self._get_area_name(area_id)}"
            elif "home" in arm_mode:
                return "CL", f"Armed Home - {self._get_area_name(area_id)}"
            elif "night" in arm_mode:
                return "CL", f"Armed Night - {self._get_area_name(area_id)}"
            else:
                return "CL", f"Armed - {self._get_area_name(area_id)}"

        elif event == const.EVENT_DISARM:
            return "OP", f"Disarmed - {self._get_area_name(area_id)}"

        elif event == const.EVENT_TRIGGER:
            # Determine SIA code based on sensor type/device class
            if device_class == "smoke" or "smoke" in (sensor_name or "").lower():
                return "FA", f"Fire Alarm - {sensor_name}"
            elif device_class == "gas" or device_class == "carbon_monoxide":
                return "GA", f"Gas Alarm - {sensor_name}"
            elif device_class == "moisture" or "water" in (sensor_name or "").lower():
                return "WA", f"Water Alarm - {sensor_name}"
            elif device_class == "heat":
                return "KA", f"Heat Alarm - {sensor_name}"
            elif device_class == "door" or device_class == "window" or device_class == "opening":
                return "BA", f"Burglary Alarm - {sensor_name}"
            elif device_class == "motion" or device_class == "occupancy":
                return "BA", f"Motion Alarm - {sensor_name}"
            elif device_class == "vibration" or "tamper" in (sensor_name or "").lower():
                return "TA", f"Tamper Alarm - {sensor_name}"
            else:
                return "BA", f"Burglary Alarm - {sensor_name or 'Unknown Sensor'}"

        elif event == const.EVENT_FAILED_TO_ARM:
            return "CF", f"Failed to Arm - {self._get_area_name(area_id)}"

        elif event == const.EVENT_ENTRY:
            return "BD", f"Entry Delay - {sensor_name}"

        elif event == const.EVENT_LEAVE:
            return "CL", f"Exit Delay - {self._get_area_name(area_id)}"

        elif event == const.EVENT_TRIGGER_TIME_EXPIRED:
            return "BC", f"Alarm Cancelled - {self._get_area_name(area_id)}"

        else:
            return "YS", f"System Event - {event}"

    def _get_area_name(self, area_id: str) -> str:
        """Get area name from area_id."""
        if not area_id:
            return "Master"

        try:
            if area_id in self.hass.data[const.DOMAIN]["areas"]:
                area_entity = self.hass.data[const.DOMAIN]["areas"][area_id]
                return area_entity.name
            else:
                return f"Area {area_id}"
        except Exception:
            return f"Area {area_id}"

    def _get_area_ri_value(self, area_id: str) -> str:
        """Get ri value for area (zone number)."""
        if not area_id:
            return "000"  # Master area

        # Extract number from area_id (e.g., "area_1" -> "001")
        try:
            area_num = int(area_id.split("_")[-1])
            return f"{area_num:03d}"
        except (ValueError, IndexError):
            return "001"

    def _calculate_crc(self, message: str) -> str:
        """Calculate CRC checksum for SIA message."""
        crc = self._crc_func(message.encode('ascii'))
        return f"{crc:04X}"

    def _encrypt_message(self, message: str, key: str) -> str:
        """Encrypt SIA message content using AES."""
        if not key:
            return message

        try:
            # Pad key to required length (16, 24, or 32 bytes)
            key_bytes = key.encode('ascii')
            if len(key_bytes) <= 16:
                key_bytes = key_bytes.ljust(16, b'\0')
            elif len(key_bytes) <= 24:
                key_bytes = key_bytes.ljust(24, b'\0')
            else:
                key_bytes = key_bytes[:32].ljust(32, b'\0')

            # Generate IV (initialization vector)
            iv = b'\0' * 16  # Simple IV for now, should be random in production

            # Pad message to AES block size
            padder = padding.PKCS7(128).padder()
            padded_data = padder.update(message.encode('ascii'))
            padded_data += padder.finalize()

            # Encrypt
            cipher = Cipher(algorithms.AES(key_bytes), modes.CBC(iv), backend=default_backend())
            encryptor = cipher.encryptor()
            encrypted = encryptor.update(padded_data) + encryptor.finalize()

            # Return hex-encoded encrypted data
            return encrypted.hex().upper()

        except Exception as err:
            _LOGGER.error("Failed to encrypt SIA message: %s", err)
            return message

    def _build_sia_message(self, event_code: str, description: str, area_id: str) -> str:
        """Build complete SIA DC-09 message."""
        sia_config = self._config.get(const.ATTR_SIA, {})

        # Message components
        sequence = self._get_next_sequence()
        timestamp = datetime.now().strftime("%H:%M:%S,%m-%d-%Y")
        ri_value = self._get_area_ri_value(area_id)
        account = sia_config.get("account", "FFFF")
        receiver_id = sia_config.get("receiver_id", "R000A")
        line_id = sia_config.get("line_id", "L001")
        encryption_key = sia_config.get("encryption_key", "")

        # Build content
        content = f"#{account}|Nri{ri_value}{event_code}[{description}]_{timestamp}"

        # Encrypt if key provided
        encrypted = False
        if encryption_key:
            content = self._encrypt_message(content, encryption_key)
            encrypted = True

        # Build message without CRC and length
        message_body = f'"{SIA_MESSAGE_TYPE}"{sequence}{receiver_id}{line_id}{content}'
        if encrypted:
            message_body = f'"*{SIA_MESSAGE_TYPE}"{sequence}{receiver_id}{line_id}{content}'

        # Calculate length
        length = len(message_body) + 8  # +8 for CRC and length fields
        length_hex = f"{length:04X}"

        # Calculate CRC over entire message including length
        crc_input = length_hex + message_body
        crc = self._calculate_crc(crc_input)

        # Final message
        final_message = crc + length_hex + message_body

        _LOGGER.debug("Built SIA message: %s", final_message)
        return final_message

    async def _async_send_sia_event(self, event: str, area_id: str, args: dict):
        """Send SIA message for Alarmo event."""
        try:
            sia_config = self._config.get(const.ATTR_SIA, {})

            # Check if event should be filtered
            event_filter = sia_config.get("event_filter", [])
            if event_filter and event not in event_filter:
                return

            # Check if area should be filtered
            area_filter = sia_config.get("area_filter", [])
            if area_filter and area_id not in area_filter:
                return

            # Convert event to SIA code
            sia_code, description = self._event_to_sia_code(event, area_id, args)

            # Build SIA message
            message = self._build_sia_message(sia_code, description, area_id)

            # Send message
            await self._async_transmit_message(message)

        except Exception as err:
            _LOGGER.error("Failed to send SIA event: %s", err)

    async def _async_transmit_message(self, message: str):
        """Transmit SIA message to monitoring station."""
        sia_config = self._config.get(const.ATTR_SIA, {})

        host = sia_config.get("host")
        port = sia_config.get("port", SIA_DEFAULT_TCP_PORT)
        protocol = sia_config.get("protocol", "TCP").upper()
        timeout = sia_config.get("timeout", SIA_DEFAULT_TIMEOUT)
        retry_count = sia_config.get("retry_count", SIA_DEFAULT_RETRY_COUNT)
        retry_delay = sia_config.get("retry_delay", SIA_DEFAULT_RETRY_DELAY)

        if not host:
            _LOGGER.warning("SIA host not configured, cannot send message")
            return

        for attempt in range(retry_count + 1):
            try:
                if protocol == "TCP":
                    await self._async_send_tcp(host, port, message, timeout)
                else:
                    await self._async_send_udp(host, port, message, timeout)

                _LOGGER.info("SIA message sent successfully to %s:%s", host, port)
                return

            except Exception as err:
                _LOGGER.warning("SIA transmission attempt %d failed: %s", attempt + 1, err)
                if attempt < retry_count:
                    await asyncio.sleep(retry_delay)
                else:
                    _LOGGER.error("SIA transmission failed after %d attempts", retry_count + 1)

    async def _async_send_tcp(self, host: str, port: int, message: str, timeout: int):
        """Send SIA message via TCP."""
        reader, writer = await asyncio.wait_for(
            asyncio.open_connection(host, port),
            timeout=timeout
        )

        try:
            # Send message
            writer.write(message.encode('ascii'))
            await writer.drain()

            # Wait for response
            response = await asyncio.wait_for(reader.read(1024), timeout=5)
            response_str = response.decode('ascii').strip()

            _LOGGER.debug("SIA TCP response: %s", response_str)

            if "ACK" not in response_str:
                _LOGGER.warning("SIA message not acknowledged: %s", response_str)

        finally:
            writer.close()
            await writer.wait_closed()

    async def _async_send_udp(self, host: str, port: int, message: str, timeout: int):
        """Send SIA message via UDP."""
        loop = asyncio.get_event_loop()

        # Create UDP socket
        sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        sock.settimeout(timeout)

        try:
            # Send message
            await loop.run_in_executor(
                None, sock.sendto, message.encode('ascii'), (host, port)
            )

            # Wait for response (optional for UDP)
            try:
                response, addr = await asyncio.wait_for(
                    loop.run_in_executor(None, sock.recvfrom, 1024),
                    timeout=5
                )
                response_str = response.decode('ascii').strip()
                _LOGGER.debug("SIA UDP response: %s", response_str)

                if "ACK" not in response_str:
                    _LOGGER.warning("SIA message not acknowledged: %s", response_str)

            except asyncio.TimeoutError:
                # UDP response is optional
                _LOGGER.debug("No UDP response received (this is normal for UDP)")

        finally:
            sock.close()