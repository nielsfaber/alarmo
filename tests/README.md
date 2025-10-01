# Alarmo Testing Guide

## To Run the Tests

> Ensure you've set up the development environment: See [Development](../DEVELOPMENT.md) documentation

### From the project root

Create and Update your Python environment
`uv sync` will do the following:

- Create the `.venv` virtual environment directory if it doesn't already exist
- Install all dependencies from uv.lock into the `.venv`
this is always smart to run when developing a new feature branch in case you have an out-of-date .venv.

To run all the tests:
`uv run pytest tests`

OR to run a battery of tests in a file:
`uv run pytest tests/test_user_permissions.py`

OR to run a single test in a file:
`uv run pytest tests/test_user_permissions.py -k test_arm_with_authorized_user`

---

## **Test Coverage:**

### **Basic Features** (`test_basic_features.py`)

| Test Function | Feature Tested |
|---------------|----------------|
| `test_arm_immediate_arms_right_away_with_allow_open` | Immediate arming with exit_time=0 and allow_open sensors |
| `test_arm_away_from_disarmed` | Basic arm away functionality |
| `test_disarm_from_armed_away` | Basic disarm functionality |
| `test_arm_home_from_disarmed` | Basic arm home functionality |
| `test_arm_with_invalid_code` | Invalid code handling |
| `test_armed_away_entry_delay_and_trigger` | Entry delay and trigger behavior |
| `test_arm_with_exit_delay_and_allow_open` | Exit delay with allow_open sensors |
| `test_sensor_always_on_triggers_when_disarmed` | Always-on sensors trigger when disarmed |
| `test_arm_away_with_exit_delay` | Exit delay functionality |
| `test_arm_blocked_with_triggered_sensor_and_no_allow_open` | Sensor blocking arming behavior |
| `test_sensor_trigger_unavailable` | Trigger when sensor unavailable |

### **Bypass Mode** (`test_bypass_mode.py`)

| Test Function | Feature Tested |
|---------------|----------------|
| `test_auto_bypass_true_integration` | Auto bypass enabled functionality |
| `test_auto_bypass_false_single_sensor` | Auto bypass disabled behavior |
| `test_auto_bypass_false_multiple_areas_exit_delay` | Auto bypass with multiple areas and exit delay |
| `test_auto_bypass_modes_not_matched` | Auto bypass modes not matching current mode |
| `test_auto_bypass_multiple_modes` | Auto bypass with multiple modes |
| `test_auto_bypass_empty_modes` | Auto bypass with empty modes list |

### **Environmental Sensors** (`test_environmental_sensors.py`)

| Test Function | Feature Tested |
|---------------|----------------|
| `test_environmental_sensor_disarmed_state` | Environmental sensors triggering when disarmed |
| `test_environmental_sensor_armed_state` | Environmental sensors triggering when armed |
| `test_all_environmental_sensors` | All environmental sensor types (smoke, CO, water, heat) |
| `test_environmental_sensor_multiple_arm_modes` | Environmental sensors across multiple arm modes |

### **Events** (`test_events.py`)

| Test Function | Feature Tested |
|---------------|----------------|
| `test_failed_to_arm_event_fired_when_sensor_blocks_arming` | Failed to arm event with blocking sensor |
| `test_failed_to_arm_event_with_multiple_blocking_sensors` | Failed to arm event with multiple blocking sensors |
| `test_no_failed_to_arm_event_when_arming_succeeds` | No failed to arm event when arming succeeds |
| `test_backend_arm_event_dispatched_on_arming` | Backend arm event dispatching |
| `test_backend_disarm_event_dispatched_on_disarming` | Backend disarm event dispatching |
| `test_backend_trigger_event_dispatched_on_triggering` | Backend trigger event dispatching |

### **Alarm Master** (`test_alarm_master.py`)

| Test Function | Feature Tested |
|---------------|----------------|
| `test_alarm_master_state_mirroring` | Master entity state mirroring multiple areas |
| `test_alarm_master_propagates_commands` | Master entity command propagation |
| `test_alarm_master_priority_states` | Master entity priority state handling |

### **Ready-to-Arm Events** (`test_ready_to_arm_events.py`)

| Test Function | Feature Tested |
|---------------|----------------|
| `test_ready_to_arm_modes_changed_event_on_sensor_state_change` | Ready-to-arm event on sensor state change |
| `test_ready_to_arm_modes_changed_event_with_door_sensor_multiple_modes` | Ready-to-arm with door sensor and multiple modes |
| `test_motion_sensor_not_monitored_when_disarmed` | Motion sensors not monitored while disarmed |
| `test_ready_to_arm_with_multiple_sensors_same_mode` | Ready-to-arm with multiple sensors in same mode |
| `test_ready_to_arm_with_bypass_sensors` | Ready-to-arm with bypass sensors |
| `test_ready_to_arm_with_allow_open_sensors` | Ready-to-arm with allow_open sensors |
| `test_ready_to_arm_with_always_on_sensors` | Ready-to-arm with always-on sensors |
| `test_ready_to_arm_cross_area_independence` | Cross-area independence for ready-to-arm status |
| `test_ready_to_arm_multiple_modes_different_sensors` | Ready-to-arm with multiple modes and different sensors |
| `test_home_assistant_event_bus_ready_to_arm_event` | Home Assistant event bus ready-to-arm event |


### **Sensor Groups** (`test_sensor_groups.py`)

| Test Function | Feature Tested |
|---------------|----------------|
| `test_single_sensor_in_group_does_not_trigger` | Single sensor in group doesn't trigger alarm |
| `test_two_sensors_in_group_trigger_within_timeout_triggers_alarm` | Two sensors in group trigger within timeout |
| `test_two_sensors_in_group_trigger_outside_timeout_does_not_trigger` | Two sensors in group trigger outside timeout |

### **Per-Sensor Entry Delay** (`test_per_sensor_entry_delay.py`)

| Test Function | Feature Tested |
|-----------------------------------------------|-----------------------------------------------|
| `test_sensor_entry_delay_longer_than_area` | Per-sensor entry delay override (longer than area default) |
| `test_sensor_entry_delay_shorter_than_area` | Per-sensor entry delay override (shorter than area default) |
| `test_backward_compatibility_no_override` | No override: falls back to area default |
| `test_sensor_group_with_no_entry_delay_triggers_immediately` | Sensor group triggers immediately if all sensors have `use_entry_delay=False` |
| `test_sensor_group_mixed_immediate_and_delayed_triggers_immediately` | Mixed group: immediate member causes immediate trigger |
| `test_sensor_group_two_delayed_members_fall_back_to_area_default` | Group with only delayed sensors uses area default |
| `test_sensor_group_ignores_group_override_with_immediate_member` | Group-level override ignored when immediate member present |
| `test_sensor_group_ignores_group_override_falls_back_to_area_default` | Group-level override ignored, uses area default |
| `test_timer_shortening_longer_to_shorter_delay` | Timer shortening: longer delay sensor triggers first, then shorter delay shortens timer |
| `test_timer_shortening_immediate_sensor_during_pending` | Immediate sensor during pending causes immediate trigger |
| `test_timer_no_shortening_longer_delay_during_pending` | Longer delay sensor during pending causes immediate trigger |
| `test_three_member_group_event_count_2_paths` | 3-member group: immediate+delayed → immediate; delayed+delayed → area default |

### **Arm on Close** (`test_arm_on_close.py`)

| Test Function | Feature Tested |
|---------------|----------------|
| `test_arm_on_close_behavior` | Arm on close functionality |
| `test_arm_on_close_timeout` | Arm on close timeout behavior |

### **Last Triggered Attribute** (`test_last_triggered_attribute.py`)

| Test Function | Feature Tested |
|---------------|----------------|
| `test_last_triggered_attribute_set_on_alarm_trigger` | Last triggered attribute set on alarm trigger |
| `test_last_triggered_attribute_persists_across_states` | Last triggered attribute persists across states |
| `test_last_triggered_attribute_updated_on_multiple_triggers` | Last triggered attribute updated on multiple triggers |

### **User Permissions** (`test_user_permissions.py`)

| Test Function | Feature Tested |
|---------------|----------------|
| `test_arm_with_authorized_user` | Arm with authorized user |
| `test_disarm_with_unauthorized_user` | Disarm with unauthorized user |
| `test_area_limited_user` | Area-limited user permissions |
| `test_disabled_user` | Disabled user handling |
| `test_text_code_format` | Text code format support |

### **Trigger Timeout Behavior** (`test_trigger_timeout_behavior.py`)

| Test Function | Feature Tested |
|---------------|----------------|
| `test_ignore_blocking_sensors_after_trigger_enabled_re_arms_with_open_sensors` | Re-arm with open sensors when ignore_blocking_sensors_after_trigger enabled |
| `test_ignore_blocking_sensors_after_trigger_multiple_sensors` | Ignore blocking sensors after trigger with multiple sensors |
| `test_default_behavior_disabled_goes_to_disarmed_with_open_sensors` | Default behavior goes to disarmed with open sensors |
| `test_default_behavior_disabled_re_arms_with_closed_sensors` | Default behavior re-arms with closed sensors |

### **Startup Sensor Evaluation** (`test_startup_sensor_evaluation.py`)

| Test Function | Feature Tested |
|---------------|----------------|
| `test_sensor_open_on_startup_triggers_alarm` | Open sensor on startup triggers alarm with entry delay |
| `test_sensor_open_on_startup_immediate_trigger` | Open sensor on startup triggers alarm immediately (no entry delay) |
| `test_sensor_group_on_startup_meets_threshold` | Sensor group on startup meets threshold and triggers alarm |
| `test_sensor_group_on_startup_below_threshold` | Sensor group on startup below threshold does not trigger alarm |
| `test_sensor_closed_on_startup_no_trigger` | Closed sensor on startup does not trigger alarm |

### **Not Covered:**

| Feature/Test | Notes |
|--------------|-------|
| MQTT integration | No tests for MQTT state/event/command topic integration |
| Sensor groups with more than two sensors | Only two-sensor groups tested |
| Tamper sensor type | Referenced in original list but no specific tamper tests found |
| Multiple alarm panel instances | Tests focus on single alarm panel scenarios |
| Complex automation scenarios | Tests focus on individual features rather than complex workflows |
| Performance testing | No load/stress testing of the alarm system |
| Configuration migration | No tests for config format changes/upgrades |

---

## **Test Implementation Notes**

Factory classes for setting up default entities or adjusting with overrides:

- `AreaFactory`: Creates area configurations
- `ConfigFactory`: Creates configuration objects
- `UserFactory`: Creates user objects with bcrypt-hashed codes
- `SensorFactory`: Creates various sensor configurations (door, window, motion)
- `UserMockFactory`: Creates user configurations with different permission levels
