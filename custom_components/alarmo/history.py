# subscribe to Alarmo events in HA and stores them in a dedicated DB
# to allow fast retrieval/search later on

import logging
import sqlite3
import datetime

from homeassistant.core import callback
from homeassistant.helpers.dispatcher import async_dispatcher_connect

from . import const

_LOGGER = logging.getLogger(__name__)

def write_dict_to_sqlite(dictionary, db_name='fmon_history_data.db', table_name='data'):
    try:
        # Connect to SQLite database
        conn = sqlite3.connect(db_name)
        cursor = conn.cursor()
        
        # Create table if not exists
        cursor.execute(f"CREATE TABLE IF NOT EXISTS {table_name} (key TEXT PRIMARY KEY, value TEXT)")
        
        # Insert or replace data from the dictionary into the table
        for key, value in dictionary.items():
            cursor.execute(f"INSERT OR REPLACE INTO {table_name} (key, value) VALUES (?, ?)", (key, value))
        
        # Commit changes and close connection
        conn.commit()
        conn.close()
    except Exception as e:
        print(f"Alarmo History: got exception {e}")

def write_dict_to_file(dictionary, file_name='fmon_history_data.txt'):
    try:
        with open(file_name, "w+") as f:
            f.write(f"event timestamp = {datetime.datetime.now()}\n")
            for key, value in dictionary.items():
                f.write(f"{key}={value},")
            f.write("\n")
    except Exception as e:
        print(f"Alarmo History: got exception {e}")

class HistoryHandler:
    def __init__(self, hass):
        """Class constructor."""
        self.hass = hass
        self._subscription = async_dispatcher_connect(
            self.hass, "alarmo_state_updated", self.async_handle_event
        )

    def __del__(self):
        """Class destructor."""
        self._subscription()

    @callback
    def async_handle_event(self, event: str, area_id: str, args: dict = {}):
        """handle event"""

        # if event in [
        #     const.EVENT_FAILED_TO_ARM,
        #     const.EVENT_COMMAND_NOT_ALLOWED,
        #     const.EVENT_INVALID_CODE_PROVIDED,
        #     const.EVENT_NO_CODE_PROVIDED,
        # ]:
        # elif event in [const.EVENT_ARM, const.EVENT_DISARM]:

        write_dict_to_sqlite(args)
        write_dict_to_file(args)
