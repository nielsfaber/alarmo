"""same as home assistant tests/common.py, a util for testing"""

import json
import time
from datetime import datetime, timedelta, timezone
from pathlib import Path
from typing import Any
from unittest.mock import patch

from homeassistant.core import HomeAssistant, callback
from homeassistant.util import dt as dt_util


def load_json_object_fixture(filename: str) -> dict[str, object]:
    """Load a JSON object from a fixture in the local test/fixtures directory."""
    fixture_path = Path(__file__).parent / "fixtures" / filename
    with open(fixture_path, encoding="utf-8") as f:
        return json.load(f)


@callback
def async_fire_time_changed(
    hass: HomeAssistant, datetime_: datetime | None = None, fire_all: bool = False
) -> None:
    """Fire a time changed event.

    If called within the first 500  ms of a second, time will be bumped to exactly
    500 ms to match the async_track_utc_time_change event listeners and
    DataUpdateCoordinator which spreads all updates between 0.05..0.50.
    Background in PR https://github.com/home-assistant/core/pull/82233

    As asyncio is cooperative, we can't guarantee that the event loop will
    run an event at the exact time we want. If you need to fire time changed
    for an exact microsecond, use async_fire_time_changed_exact.
    """
    if datetime_ is None:
        utc_datetime = datetime.now(timezone.utc)
    else:
        utc_datetime = dt_util.as_utc(datetime_)

    # Increase the mocked time by 0.5 s to account for up to 0.5 s delay
    # added to events scheduled by update_coordinator and async_track_time_interval
    utc_datetime += timedelta(microseconds=500000)  # event.RANDOM_MICROSECOND_MAX

    _async_fire_time_changed(hass, utc_datetime, fire_all)


@callback
def _async_fire_time_changed(
    hass: HomeAssistant, utc_datetime: datetime | None, fire_all: bool
) -> None:
    timestamp = utc_datetime.timestamp() if utc_datetime else 0.0
    from homeassistant.util.async_ import get_scheduled_timer_handles

    for task in list(get_scheduled_timer_handles(hass.loop)):
        if task.cancelled():
            continue
        mock_seconds_into_future = timestamp - time.time()
        future_seconds = task.when() - (
            hass.loop.time() + time.get_clock_info("monotonic").resolution
        )
        if fire_all or mock_seconds_into_future >= future_seconds:
            with (
                patch(
                    "homeassistant.helpers.event.time_tracker_utcnow",
                    return_value=utc_datetime,
                ),
                patch(
                    "homeassistant.helpers.event.time_tracker_timestamp",
                    return_value=timestamp,
                ),
            ):
                task._run()
                task.cancel()


async def async_fire_state_changed(
    hass: HomeAssistant, entity_id: str, new_state: Any, old_state: Any = None
) -> None:
    """Fire a state_changed event for a given entity."""
    hass.bus.async_fire(
        "state_changed",
        {
            "entity_id": entity_id,
            "old_state": old_state,
            "new_state": new_state,
        },
    )
    await hass.async_block_till_done()
