"""Storage protocol for Alarmo."""

from typing import Any


class StorageProtocol:
    """Storage protocol for Alarmo."""

    async def async_load(self) -> dict[str, Any]:
        """Load data from storage."""
        raise NotImplementedError

    async def async_save(self, data: dict[str, Any]) -> None:
        """Save data to storage."""
        raise NotImplementedError

    def async_get_areas(self) -> dict[str, Any]:
        """Get areas from storage."""
        raise NotImplementedError

    def async_get_area(self, area_id: str) -> dict[str, Any]:
        """Get area from storage."""
        raise NotImplementedError

    def async_get_sensors(self) -> dict[str, Any]:
        """Get sensors from storage."""
        raise NotImplementedError

    def async_get_users(self) -> dict[str, Any]:
        """Get users from storage."""
        raise NotImplementedError

    def async_get_config(self) -> dict[str, Any]:
        """Get config from storage."""
        raise NotImplementedError

    def async_get_sensor_groups(self) -> dict[str, Any]:
        """Get sensor groups from storage."""
        raise NotImplementedError

    def async_get_automations(self) -> dict[str, Any]:
        """Get automations from storage."""
        raise NotImplementedError
