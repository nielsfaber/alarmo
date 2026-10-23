"""The user list must not expose stored access-code hashes."""

from types import SimpleNamespace
from unittest.mock import MagicMock

from custom_components.alarmo import const
from custom_components.alarmo.websockets import websocket_get_users


class Connection:
    """Capture the websocket reply."""

    def __init__(self):
        """Create an empty reply buffer."""
        self.results = []

    def send_result(self, msg_id, result):
        """Capture a successful result."""
        self.results.append((msg_id, result))


def test_users_response_replaces_hash_with_flag(hass):
    """A hash is a credential equivalent and must not leave the server."""
    users = {
        "u1": {
            "user_id": "u1",
            "name": "User",
            "code": "JDJiJDEyJCRoYXNo",
            "enabled": True,
        },
        "u2": {"user_id": "u2", "name": "No code", "code": "", "enabled": True},
    }
    store = MagicMock()
    store.async_get_users.return_value = users
    hass.data[const.DOMAIN] = {"coordinator": SimpleNamespace(store=store)}
    connection = Connection()

    websocket_get_users(hass, connection, {"id": 7})

    result = connection.results[0][1]
    assert "code" not in result["u1"]
    assert result["u1"]["has_code"] is True
    assert result["u2"]["has_code"] is False
    assert "JDJi" not in str(result)
    # The store must not be mutated for other callers.
    assert users["u1"]["code"] == "JDJiJDEyJCRoYXNo"
