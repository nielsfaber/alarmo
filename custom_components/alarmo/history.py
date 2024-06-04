# subscribe to Alarmo events in HA and stores them in a dedicated DB
# to allow fast retrieval/search later on

import time
import logging
import sqlite3
import datetime
import aiofiles as aiof
import attr
import json
import aiosqlite

from homeassistant.core import callback
from homeassistant.helpers.dispatcher import async_dispatcher_connect

from . import const

_LOGGER = logging.getLogger(__name__)


# @attr.s(slots=True, frozen=True)
class AlarmoHistoricalEvent:
    def __init__(self, event_name, area_id, open_sensors):
        """Class constructor."""
        self.timestamp = time.time()
        self.event_name = event_name
        self.area_id = area_id
        self.open_sensors = open_sensors
        # TODO: self.user : it would be good to store the name of the user that triggered the event...


async def insert_alarm_event(event: AlarmoHistoricalEvent):
    async with aiosqlite.connect("alarmo_events.db") as db:
        open_sensors_json = json.dumps(event.open_sensors)
        await db.execute(
            """
        INSERT INTO AlarmoHistoricalEvents (timestamp, event_name, area_id, open_sensors)
        VALUES (?, ?, ?, ?)
        """,
            (event.timestamp, event.event_name, event.area_id, open_sensors_json),
        )
        await db.commit()


def write_dict_to_sqlite(dictionary, db_name="fmon_history_data.db", table_name="data"):
    try:
        # Connect to SQLite database
        conn = sqlite3.connect(db_name)
        cursor = conn.cursor()

        # Create table if not exists
        cursor.execute(
            f"CREATE TABLE IF NOT EXISTS {table_name} (key TEXT PRIMARY KEY, value TEXT)"
        )

        # Insert or replace data from the dictionary into the table
        for key, value in dictionary.items():
            cursor.execute(
                f"INSERT OR REPLACE INTO {table_name} (key, value) VALUES (?, ?)",
                (key, value),
            )

        # Commit changes and close connection
        conn.commit()
        conn.close()
    except Exception as e:
        print(f"Alarmo History: got exception {e}")


async def write_dict_to_file(dictionary, file_name="fmon_history_data.txt"):
    try:
        async with aiof.open(file_name, "w+") as f:
            await f.write(f"event timestamp = {datetime.datetime.now()}\n")
            for key, value in dictionary.items():
                await f.write(f"{key}={value},")
            await f.write("\n")
        print("FMON wrote stuff to disk")
    except Exception as e:
        print(f"Alarmo History: got exception {e}")


class HistoryHandler:
    def __init__(self, hass):
        """Class constructor."""
        self.hass = hass
        self._subscription = async_dispatcher_connect(
            self.hass, "alarmo_event", self.async_handle_event
        )

        self.setup_database()

    def __del__(self):
        """Class destructor."""
        self._subscription()

    def setup_database(self):
        connection = sqlite3.connect("alarmo_events.db")
        cursor = connection.cursor()

        # Create table
        cursor.execute("""
        CREATE TABLE IF NOT EXISTS AlarmoHistoricalEvents (
            timestamp INTEGER,
            event_name TEXT,
            area_id INTEGER,
            open_sensors TEXT
        )
        """)

        connection.commit()
        connection.close()

    @callback
    def async_handle_event(self, event: str, area_id: str, args: dict = {}):
        """handle event"""

        if event not in [const.EVENT_READY_TO_ARM_MODES_CHANGED]:
            # write_dict_to_sqlite(args)

            ev = AlarmoHistoricalEvent(event, area_id, args.get("open_sensors", []))

            # self.hass.async_create_task(write_dict_to_file(args))
            self.hass.async_create_task(insert_alarm_event(ev))
            print(f"FMON: event={event} area_id={area_id} args={args}")
        else:
            # filter out : EVENT_READY_TO_ARM_MODES_CHANGED
            print(f"FMON: filtered out event={event} area_id={area_id} args={args}")
