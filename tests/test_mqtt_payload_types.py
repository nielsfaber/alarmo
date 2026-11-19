"""MQTT payload values must be validated before they reach the alarm."""

import pytest

from custom_components.alarmo.mqtt import _parse_bool, _parse_code


@pytest.mark.parametrize(
    ("value", "expected"),
    [
        (True, True),
        (False, False),
        ("true", True),
        ("TRUE", True),
        ("1", True),
        ("on", True),
        (1, True),
        (0, False),
        ("false", False),
        ("0", False),
        ("off", False),
        ("", False),
        (None, False),
        ("maybe", False),
    ],
)
def test_parse_bool_accepts_common_representations(value, expected):
    """A string "false" must not be treated as a true value."""
    assert _parse_bool(value, "skip_delay") is expected


@pytest.mark.parametrize(
    ("value", "expected"),
    [
        ("1234", "1234"),
        (1234, "1234"),
        (None, None),
        ({"nested": 1}, None),
        ([1, 2], None),
    ],
)
def test_parse_code_normalizes_only_safe_types(value, expected):
    """Numeric JSON codes are usable; containers are rejected."""
    assert _parse_code(value) == expected
