"""Storage protocol for Alarmo"""

from typing import Any, Dict


class StorageProtocol:
    """Storage protocol for Alarmo"""

    async def async_load(self) -> Dict[str, Any]:
        """Load data from storage"""
        raise NotImplementedError

    async def async_save(self, data: Dict[str, Any]) -> None:
        """Save data to storage"""
        raise NotImplementedError

    def async_get_areas(self) -> Dict[str, Any]:
        """Get areas from storage"""
        raise NotImplementedError

    def async_get_area(self, area_id: str) -> Dict[str, Any]:
        """Get area from storage"""
        raise NotImplementedError

    def async_get_sensors(self) -> Dict[str, Any]:
        """Get sensors from storage"""
        raise NotImplementedError

    def async_get_users(self) -> Dict[str, Any]:
        """Get users from storage"""
        raise NotImplementedError

    def async_get_config(self) -> Dict[str, Any]:
        """Get config from storage"""
        raise NotImplementedError

    def async_get_sensor_groups(self) -> Dict[str, Any]:
        """Get sensor groups from storage"""
        raise NotImplementedError

    def async_get_automations(self) -> Dict[str, Any]:
        """Get automations from storage"""
        raise NotImplementedError
