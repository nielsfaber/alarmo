"""Configure test framework."""

import sys
import types
from pathlib import Path
from unittest.mock import MagicMock, patch

import pytest

sys.path.insert(0, str(Path(__file__).parent.parent))

# This import is required for patching even though it's not directly referenced
import custom_components.alarmo  # noqa: F401 # pylint: disable=unused-import # type: ignore[unused-import


@pytest.fixture(autouse=True)
def patch_dispatcher_send_for_teardown():
    """Patch dispatcher_send to prevent side effects during teardown."""
    yield
    patch(
        "homeassistant.helpers.dispatcher.dispatcher_send", lambda *a, **kw: None
    ).start()  # type: ignore


@pytest.fixture(autouse=True, scope="session")
def patch_frontend_and_panel_custom():
    """Patch frontend and panel_custom."""
    hass_frontend = types.ModuleType("hass_frontend")
    setattr(hass_frontend, "where", lambda: Path("/tmp"))  # type: ignore[attr-defined]
    sys.modules["hass_frontend"] = hass_frontend
    with (
        patch("homeassistant.components.frontend", MagicMock()),
        patch("homeassistant.components.panel_custom", MagicMock(), create=True),
    ):
        yield
