import time
import logging
import sqlite3
from datetime import datetime
import json
import aiosqlite

from homeassistant.core import callback
from homeassistant.helpers.dispatcher import async_dispatcher_connect

from . import const

_LOGGER = logging.getLogger(__name__)


class AlarmoHistoricalEvent:
    """An event produced by Alarmo at some point in time."""

    def __init__(
        self, event_name: str, area_id: int, open_sensors: list, timestamp=None
    ):
        """Class constructor."""

        # timestamps are stored as Unix epoch times in the database (thus in UTC)
        self.timestamp = timestamp
        if timestamp is None:
            self.timestamp = time.time()
        self.event_name = event_name
        self.area_id = area_id
        self.open_sensors = open_sensors
        # TODO: self.user : it would be good to store the name of the user that triggered the event...

    async def insert_alarm_event(self):
        """Insert this event into the Alarmo event database."""
        async with aiosqlite.connect(const.DATABASE_NAME) as db:
            open_sensors_json = json.dumps(self.open_sensors)
            await db.execute(
                "INSERT INTO AlarmoHistoricalEvents (timestamp, event_name, area_id, open_sensors) VALUES (?, ?, ?, ?)",
                (self.timestamp, self.event_name, self.area_id, open_sensors_json),
            )
            await db.commit()


class HistoryHandler:
    """Subscribe to Alarmo events and store them in a dedicated DB
    to allow fast retrieval/search later on."""

    def __init__(self, hass):
        """Class constructor."""
        self.hass = hass

        # start a subscription to the alarmo_event bus
        self._subscription = async_dispatcher_connect(
            self.hass, "alarmo_event", self.async_handle_event
        )

        self.num_events_since_last_purge = 0
        self.setup_database()

    def __del__(self):
        """Class destructor."""
        self._subscription()

    def setup_database(self):
        """Check Alarmo database, creating it if missing, migrating it if using an old schema."""
        _LOGGER.info(f"Alarmo HistoryHandler: opening database {const.DATABASE_NAME}")
        connection = sqlite3.connect(const.DATABASE_NAME)
        cursor = connection.cursor()

        try:
            cursor.execute("SELECT version FROM SchemaVersion")
            row = cursor.fetchone()
            current_version = row[0]
            if current_version == const.DATABASE_CURR_SCHEMA_VER:
                _LOGGER.info(
                    f"Alarmo HistoryHandler: the database schema version is the current one; no migration required"
                )
            elif current_version < const.DATABASE_CURR_SCHEMA_VER:
                self.migrate_database(current_version, connection)

        except sqlite3.OperationalError as ex:
            _LOGGER.info(
                f"Alarmo HistoryHandler: no schema version detected... setting schema to version {const.DATABASE_CURR_SCHEMA_VER}"
            )

            # ensure the SchemaVersion table exists
            cursor.execute("""
            CREATE TABLE IF NOT EXISTS SchemaVersion (
                version INTEGER
            )
            """)

            # if there is no schema version set, set the current one
            cursor.execute(
                f"INSERT OR IGNORE INTO SchemaVersion (version) VALUES ({const.DATABASE_CURR_SCHEMA_VER})"
            )

        # NOTE: for the 'event_name' it would be possible to use also an INTEGER type; this might result in
        # faster search times when querying for type of event (arm,disarm,trigger,etc) but is a bit less future
        # proof: the mapping between the integer value and its meaning might change in future Alarmo versions
        cursor.execute("""
        CREATE TABLE IF NOT EXISTS AlarmoHistoricalEvents (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            timestamp INTEGER,
            event_name TEXT,
            area_id INTEGER,
            open_sensors JSON
        )
        """)

        connection.commit()
        connection.close()
        _LOGGER.info(
            f"Alarmo HistoryHandler: database {const.DATABASE_NAME} setup complete"
        )

    def migrate_database(self, version_on_disk: int, connection):
        """Perform an Alarmo database migration."""
        _LOGGER.info(
            f"Alarmo HistoryHandler: migrating database schema from  {version_on_disk} to {const.DATABASE_CURR_SCHEMA_VER}"
        )
        # if version_on_disk < fist_version_adding_column_xyz:
        #     cursor = connection.cursor()
        #     cursor.execute("""
        #     ALTER TABLE AlarmoHistoricalEvents ADD COLUMN xyz TEXT DEFAULT 'default_value'
        #     """)
        #     cursor.execute("""
        #     UPDATE SchemaVersion SET version = 2
        #     """)
        #     connection.commit()

        # no migration defined as this is the first version... but it's future-proof :)
        pass

    async def purge_old_events(self, ):
        """Remove the eldest events stored in the database if the retention period has been exceeded."""
        async with aiosqlite.connect(const.DATABASE_NAME) as db:
            # Count the total number of rows in the table
            async with db.execute('SELECT COUNT(*) FROM AlarmoHistoricalEvents') as cursor:
                row = await cursor.fetchone()
                total_rows = row[0]

            # Calculate the number of rows to delete
            rows_to_delete = total_rows - const.DATABASE_MAX_EVENTS

            if rows_to_delete > 0:
                _LOGGER.info(f"Alarmo HistoryHandler: cleaning {rows_to_delete} old events from the database to honor the max_events setting")
                # Delete the oldest rows
                async with db.execute('''
                    DELETE FROM AlarmoHistoricalEvents 
                    WHERE id IN (
                        SELECT id FROM AlarmoHistoricalEvents
                        ORDER BY timestamp ASC
                        LIMIT ?
                    )
                ''', (rows_to_delete,)):
                    await db.commit()

    @callback
    def async_handle_event(self, event: str, area_id: str, args: dict = {}):
        """Handle an Alarmo event by storing it into the database."""

        # note that EVENT_READY_TO_ARM_MODES_CHANGED are probably not interesting for the user
        # and they are generated after each arm/disarm/trigger event...
        if event not in [const.EVENT_READY_TO_ARM_MODES_CHANGED]:
            # create the event
            ev = AlarmoHistoricalEvent(event, area_id, args.get("open_sensors", []))

            # write into database
            self.hass.async_create_task(AlarmoHistoricalEvent.insert_alarm_event(ev))

        self.num_events_since_last_purge += 1
        if self.num_events_since_last_purge > const.DATABASE_CHECK_PURGE_EVERY_N_EVENTS:
            # every once in a while, check if the number of events stored in the database is too large:
            self.hass.async_create_task(self.purge_old_events())
            self.num_events_since_last_purge = 0

    def query_events(self, timestamp_start: datetime, timestamp_end: datetime):
        """Query events based on time criteria."""

        with sqlite3.connect(const.DATABASE_NAME) as conn:
            cursor = conn.cursor()

            cursor.execute(
                """
            SELECT timestamp, event_name, area_id, open_sensors, additional_data
            FROM AlarmoHistoricalEvents
            WHERE timestamp BETWEEN ? AND ?
            ORDER BY timestamp
            """,
                (timestamp_start.timestamp(), timestamp_end.timestamp()),
            )

            events = cursor.fetchall()

            # Create list of AlarmoHistoricalEvent instances
            result = []
            for event in events:
                (
                    timestamp,
                    event_name,
                    area_id,
                    open_sensors_json,
                ) = event
                open_sensors = json.loads(open_sensors_json)

                event_instance = AlarmoHistoricalEvent(
                    event_name, area_id, open_sensors, timestamp
                )
                result.append(event_instance)

            return result
