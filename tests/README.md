# Alarmo Testing Guide

## To Run the Tests

> Ensure you've set up the development environment: See [Development](../DEVELOPMENT.md) documentation

### From the project root

Ensure your UV environment exists

```uv venv```

> **Note:** These commands will

> - update the uv.lock file with the corrrect verions of available dependancies from the toml
> - install all updated packages into the .venv

```uv sync```

To run all the tests:

```uv run pytest tests```

OR to run a battery of tests in a file:

```uv run pytest tests/test_user_permissions.py```

OR to run a single test in a file:

```uv run pytest tests/test_user_permissions.py -k test_arm_with_authorized_user```

### **Note:** ensure you commit any changes to the uv.lock file to ensure the main branch is updated to use the newest version of all packages

---

## **Test Coverage:**

| Feature/Test | Test File(s) |
|--------------|-------------|
| Use exit delay (`use_exit_delay`) | `test_basic_features.py` |
| Use entry delay (`use_entry_delay`) | `test_basic_features.py` |
| Bypass automatically (`auto_bypass`) | `test_bypass_mode.py` |
| Arm after closing (`arm_on_close`) | `test_arm_on_close.py` |
| Allow open after arming (`allow_open`) | `test_basic_features.py` |
| Multiple areas and master entity | `test_alarm_master.py` |
| Sensor groups | `test_sensor_groups.py` |
| Arm/disarm with code, invalid code | `test_basic_features.py`, `test_user_permissions.py` |
| All arm modes (away, home, etc.) | `test_basic_features.py` |
| Delays (exit, entry, trigger) | `test_basic_features.py` |
| Force arm (bypass) | `test_bypass_mode.py` |
| Sensor types: door, motion, window | `test_basic_features.py` |
| Sensor blocking arming | `test_basic_features.py` |
| Sensor triggers alarm | `test_basic_features.py` |
| Sensor attributes on state change | `test_basic_features.py` |
| Always on behavior (triggers alarm when disarmed) | `test_environmental_sensors.py` |
| Environmental sensor type | `test_environmental_sensors.py` |
| Tamper sensor type | `test_environmental_sensors.py` |
| Trigger when unavailable | `test_basic_features.py` |
| Bypass per mode (`auto_bypass_modes`) | `test_bypass_mode.py` |
| Code format (number vs text) | `test_user_permissions.py` |
| User permissions (arm/disarm authorization, area limits) | `test_user_permissions.py` |
| General events (arm, disarm, trigger, failed_to_arm) | `test_events.py` |
| Ready-to-arm events (backend dispatcher and HA event bus) | `test_ready_to_arm_events.py` |
| Motion sensors not monitored while disarmed | `test_ready_to_arm_events.py` |
| Cross-area independence for ready-to-arm status | `test_ready_to_arm_events.py` |
| last_triggered attribute (set, persist, update) | `test_last_triggered_attribute.py` |
| Trigger timeout behavior (re-arm/disarm after trigger timeout, with and without ignore_blocking_sensors_after_trigger) | `test_trigger_timeout_behavior.py` |

### **Not Covered:**

| Feature/Test                            | Notes                                                  |
| --------------------------------------- | ------------------------------------------------------ |
| MQTT integration                        | No test for MQTT state/event/command topic integration |
| Sensor group with more than two sensors | Only two-sensor group tested                           |

---

## **Test Implementation Notes**

Factory classes for setting up default entities or adjusting with overrides:
   - `AreaFactory`: Creates area configurations
   - `ConfigFactory`: Creates configuration objects
   - `UserFactory`: Creates user objects with bcrypt-hashed codes
   - `SensorFactory`: Creates various sensor configurations (door, window, motion)
   - `UserMockFactory`: Creates user configurations with different permission levels
