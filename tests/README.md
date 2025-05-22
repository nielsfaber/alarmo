To Run the Tests:

From the project root...

```python -m venv venv```
```source venv/bin/activate```
```pip install -r requirements_test.txt```
To run all the tests:
```pytest tests```
OR to run a battery of tests in a file:
```pytest tests/test_user_permissions.py```
OR to run a single test in a file:
```pytest tests/test_user_permissions.py -k test_arm_with_authorized_user```

---

## **Test Coverage Checklist**

### **Covered in Backend Tests:**
- [x] Use exit delay (`use_exit_delay`)
- [x] Use entry delay (`use_entry_delay`)
- [x] Bypass automatically (`auto_bypass`)
- [x] Arm after closing (`arm_on_close`)
- [x] Allow open after arming (`allow_open`)
- [x] Multiple areas and master entity
- [x] Sensor groups (in group test)
- [x] Arm/disarm with code, invalid code
- [x] All arm modes (away, home, etc.)
- [x] Delays (exit, entry, trigger)
- [x] Force arm (bypass)
- [x] Sensor types: door, motion, window
- [x] Sensor blocking arming
- [x] Sensor triggers alarm
- [x] Sensor attributes on state change
- [x] Always on (Sensor triggers alarm even when disarmed - in `test_basic_features.py`)
- [x] Tamper/environmental sensor behavior
- [x] Trigger when unavailable (Sensor state `unavailable` triggers alarm - in `test_basic_features.py`)
- [x] Bypass per mode (Tests for `auto_bypass_modes` - in `test_bypass_mode.py`)
- [x] Code format (number vs text) (Tests in `test_user_permissions.py`)
- [x] User permissions (Tests for various permission levels in `test_user_permissions.py`)

### **Not Covered or Missing:**
- [ ] **MQTT**: No test for MQTT state/event/command topic integration.
- [ ] **Sensor group with more than two sensors**: Only two-sensor group tested.
- [ ] **Environmental sensor (always on, e.g., smoke detector)**: No specific test for this use case.

---

## **Test Implementation Notes**

Factory classes for setting up default entities or adjusting with overrides:
   - `AreaFactory`: Creates area configurations
   - `ConfigFactory`: Creates configuration objects
   - `UserFactory`: Creates user objects with bcrypt-hashed codes
   - `SensorFactory`: Creates various sensor configurations (door, window, motion)
   - `UserMockFactory`: Creates user configurations with different permission levels