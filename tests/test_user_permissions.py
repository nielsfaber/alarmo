"""Test user permissions and access code functionality."""

from typing import Any

import pytest

from tests.helpers import (
    advance_time,
    setup_alarmo_entry,
    patch_alarmo_integration_dependencies,
)
from tests.factories import AreaFactory, UserFactory, SensorFactory

ALARM_ENTITY = "alarm_control_panel.test_area_1"
DOOR_SENSOR = "binary_sensor.door_sensor"
MOTION_SENSOR = "binary_sensor.motion_sensor"


@pytest.mark.asyncio
async def test_arm_with_authorized_user(
    hass: Any, enable_custom_integrations: Any
) -> None:
    """Test arm with authorized user"""
    users = {
        "admin_user": UserFactory.create_user(
            user_id="admin_user",
            name="Admin User",
            code="1234",
            can_arm=True,
            can_disarm=True,
        ),
        "arm_only_user": UserFactory.create_user(
            user_id="arm_only_user",
            name="Arm Only User",
            code="5678",
            can_arm=True,
            can_disarm=False,
        ),
    }
    areas = [
        AreaFactory.create_area(area_id="area_1", name="Test Area 1"),
        AreaFactory.create_area(area_id="area_2", name="Test Area 2"),
    ]
    sensors = [
        SensorFactory.create_door_sensor(
            entity_id=DOOR_SENSOR,
            name="Door Sensor",
            area="area_1",
            modes=["armed_away", "armed_home"],
            auto_bypass=False,
            allow_open=False,
            arm_on_close=False,
            always_on=False,
            trigger_unavailable=False,
            use_exit_delay=True,
            use_entry_delay=True,
        ),
        SensorFactory.create_motion_sensor(
            entity_id=MOTION_SENSOR,
            name="Motion Sensor",
            area="area_1",
            modes=["armed_away"],
            auto_bypass=False,
            allow_open=False,
            arm_on_close=False,
            always_on=False,
            trigger_unavailable=False,
            use_exit_delay=True,
            use_entry_delay=False,
        ),
    ]
    storage, entry = setup_alarmo_entry(
        hass,
        areas=areas,
        sensors=sensors,
        entry_id="test_user_permissions",
        users=users,
    )
    with patch_alarmo_integration_dependencies(storage):
        await hass.config_entries.async_setup(entry.entry_id)
        await hass.async_block_till_done()
        hass.states.async_set(DOOR_SENSOR, "off")
        hass.states.async_set(MOTION_SENSOR, "off")
        await hass.async_block_till_done()
        await hass.services.async_call(
            "alarmo",
            "arm",
            {"entity_id": ALARM_ENTITY, "code": "5678", "mode": "away"},
            blocking=True,
        )
        await hass.async_block_till_done()
        area = AreaFactory.create_area(area_id="area_1")
        exit_time = area["modes"]["armed_away"]["exit_time"]
        await advance_time(hass, exit_time + 1)
        state = hass.states.get(ALARM_ENTITY)
        assert state.state == "armed_away"
        assert state.attributes.get("changed_by") == "Arm Only User"


@pytest.mark.asyncio
async def test_disarm_with_unauthorized_user(
    hass: Any, enable_custom_integrations: Any
) -> None:
    """Test disarm with unauthorized user"""
    users = {
        "admin_user": UserFactory.create_user(
            user_id="admin_user",
            name="Admin User",
            code="1234",
            can_arm=True,
            can_disarm=True,
        ),
        "arm_only_user": UserFactory.create_user(
            user_id="arm_only_user",
            name="Arm Only User",
            code="5678",
            can_arm=True,
            can_disarm=False,
        ),
    }
    areas = [
        AreaFactory.create_area(area_id="area_1", name="Test Area 1"),
        AreaFactory.create_area(area_id="area_2", name="Test Area 2"),
    ]
    sensors = [
        SensorFactory.create_door_sensor(
            entity_id=DOOR_SENSOR,
            name="Door Sensor",
            area="area_1",
            modes=["armed_away", "armed_home"],
            auto_bypass=False,
            allow_open=False,
            arm_on_close=False,
            always_on=False,
            trigger_unavailable=False,
            use_exit_delay=True,
            use_entry_delay=True,
        ),
        SensorFactory.create_motion_sensor(
            entity_id=MOTION_SENSOR,
            name="Motion Sensor",
            area="area_1",
            modes=["armed_away"],
            auto_bypass=False,
            allow_open=False,
            arm_on_close=False,
            always_on=False,
            trigger_unavailable=False,
            use_exit_delay=True,
            use_entry_delay=False,
        ),
    ]
    storage, entry = setup_alarmo_entry(
        hass,
        areas=areas,
        sensors=sensors,
        entry_id="test_user_permissions",
        users=users,
    )
    with patch_alarmo_integration_dependencies(storage):
        await hass.config_entries.async_setup(entry.entry_id)
        await hass.async_block_till_done()
        hass.states.async_set(DOOR_SENSOR, "off")
        hass.states.async_set(MOTION_SENSOR, "off")
        await hass.async_block_till_done()
        await hass.services.async_call(
            "alarmo",
            "arm",
            {"entity_id": ALARM_ENTITY, "code": "1234", "mode": "away"},
            blocking=True,
        )
        await hass.async_block_till_done()
        area = AreaFactory.create_area(area_id="area_1")
        exit_time = area["modes"]["armed_away"]["exit_time"]
        await advance_time(hass, exit_time + 1)
        state = hass.states.get(ALARM_ENTITY)
        assert state.state == "armed_away"
        await hass.services.async_call(
            "alarmo",
            "disarm",
            {"entity_id": ALARM_ENTITY, "code": "5678"},
            blocking=True,
        )
        await hass.async_block_till_done()
        state = hass.states.get(ALARM_ENTITY)
        assert state.state == "armed_away"


@pytest.mark.asyncio
async def test_area_limited_user(hass: Any, enable_custom_integrations: Any) -> None:
    """Test area limited user"""
    users = {
        "admin_user": UserFactory.create_user(
            user_id="admin_user",
            name="Admin User",
            code="1234",
            can_arm=True,
            can_disarm=True,
        ),
        "area_limited_user": UserFactory.create_user(
            user_id="area_limited_user",
            name="Area Limited User",
            code="3456",
            can_arm=True,
            can_disarm=True,
            area_limit="area_1",
        ),
    }
    areas = [
        AreaFactory.create_area(area_id="area_1", name="Test Area 1"),
        AreaFactory.create_area(area_id="area_2", name="Test Area 2"),
    ]
    sensors = [
        SensorFactory.create_door_sensor(
            entity_id=DOOR_SENSOR,
            name="Door Sensor",
            area="area_1",
            modes=["armed_away", "armed_home"],
            auto_bypass=False,
            allow_open=False,
            arm_on_close=False,
            always_on=False,
            trigger_unavailable=False,
            use_exit_delay=True,
            use_entry_delay=True,
        ),
        SensorFactory.create_motion_sensor(
            entity_id=MOTION_SENSOR,
            name="Motion Sensor",
            area="area_1",
            modes=["armed_away"],
            auto_bypass=False,
            allow_open=False,
            arm_on_close=False,
            always_on=False,
            trigger_unavailable=False,
            use_exit_delay=True,
            use_entry_delay=False,
        ),
    ]
    storage, entry = setup_alarmo_entry(
        hass,
        areas=areas,
        sensors=sensors,
        entry_id="test_user_permissions",
        users=users,
    )
    with patch_alarmo_integration_dependencies(storage):
        await hass.config_entries.async_setup(entry.entry_id)
        await hass.async_block_till_done()
        hass.states.async_set(DOOR_SENSOR, "off")
        hass.states.async_set(MOTION_SENSOR, "off")
        await hass.async_block_till_done()
        await hass.services.async_call(
            "alarmo",
            "arm",
            {
                "entity_id": "alarm_control_panel.test_area_1",
                "code": "3456",
                "mode": "away",
            },
            blocking=True,
        )
        await hass.async_block_till_done()
        area = AreaFactory.create_area(area_id="area_1")
        exit_time = area["modes"]["armed_away"]["exit_time"]
        await advance_time(hass, exit_time + 1)
        state = hass.states.get("alarm_control_panel.test_area_1")
        assert state.state == "armed_away"
        await hass.services.async_call(
            "alarmo",
            "arm",
            {
                "entity_id": "alarm_control_panel.test_area_2",
                "code": "3456",
                "mode": "away",
            },
            blocking=True,
        )
        await hass.async_block_till_done()
        state = hass.states.get("alarm_control_panel.test_area_2")
        assert state.state == "disarmed"


@pytest.mark.asyncio
async def test_disabled_user(hass: Any, enable_custom_integrations: Any) -> None:
    """Test disabled user"""
    users = {
        "admin_user": UserFactory.create_user(
            user_id="admin_user",
            name="Admin User",
            code="1234",
            can_arm=True,
            can_disarm=True,
        ),
        "disabled_user": UserFactory.create_user(
            user_id="disabled_user",
            name="Disabled User",
            code="7890",
            enabled=False,
            can_arm=True,
            can_disarm=True,
        ),
    }
    areas = [
        AreaFactory.create_area(area_id="area_1", name="Test Area 1"),
        AreaFactory.create_area(area_id="area_2", name="Test Area 2"),
    ]
    sensors = [
        SensorFactory.create_door_sensor(
            entity_id=DOOR_SENSOR,
            name="Door Sensor",
            area="area_1",
            modes=["armed_away", "armed_home"],
            auto_bypass=False,
            allow_open=False,
            arm_on_close=False,
            always_on=False,
            trigger_unavailable=False,
            use_exit_delay=True,
            use_entry_delay=True,
        ),
        SensorFactory.create_motion_sensor(
            entity_id=MOTION_SENSOR,
            name="Motion Sensor",
            area="area_1",
            modes=["armed_away"],
            auto_bypass=False,
            allow_open=False,
            arm_on_close=False,
            always_on=False,
            trigger_unavailable=False,
            use_exit_delay=True,
            use_entry_delay=False,
        ),
    ]
    storage, entry = setup_alarmo_entry(
        hass,
        areas=areas,
        sensors=sensors,
        entry_id="test_user_permissions",
        users=users,
    )
    with patch_alarmo_integration_dependencies(storage):
        await hass.config_entries.async_setup(entry.entry_id)
        await hass.async_block_till_done()
        hass.states.async_set(DOOR_SENSOR, "off")
        hass.states.async_set(MOTION_SENSOR, "off")
        await hass.async_block_till_done()
        await hass.services.async_call(
            "alarmo",
            "arm",
            {"entity_id": ALARM_ENTITY, "code": "7890", "mode": "away"},
            blocking=True,
        )
        await hass.async_block_till_done()
        state = hass.states.get(ALARM_ENTITY)
        assert state.state == "disarmed"


@pytest.mark.asyncio
async def test_text_code_format(hass: Any, enable_custom_integrations: Any) -> None:
    """Test text code format"""
    users = {
        "admin_user": UserFactory.create_user(
            user_id="admin_user",
            name="Admin User",
            code="1234",
            can_arm=True,
            can_disarm=True,
        ),
        "text_code_user": UserFactory.create_user(
            user_id="text_code_user",
            name="Text Code User",
            code="ABCD",
            can_arm=True,
            can_disarm=True,
        ),
    }
    areas = [
        AreaFactory.create_area(area_id="area_1", name="Test Area 1"),
        AreaFactory.create_area(area_id="area_2", name="Test Area 2"),
    ]
    sensors = [
        SensorFactory.create_door_sensor(
            entity_id=DOOR_SENSOR,
            name="Door Sensor",
            area="area_1",
            modes=["armed_away", "armed_home"],
            auto_bypass=False,
            allow_open=False,
            arm_on_close=False,
            always_on=False,
            trigger_unavailable=False,
            use_exit_delay=True,
            use_entry_delay=True,
        ),
        SensorFactory.create_motion_sensor(
            entity_id=MOTION_SENSOR,
            name="Motion Sensor",
            area="area_1",
            modes=["armed_away"],
            auto_bypass=False,
            allow_open=False,
            arm_on_close=False,
            always_on=False,
            trigger_unavailable=False,
            use_exit_delay=True,
            use_entry_delay=False,
        ),
    ]
    storage, entry = setup_alarmo_entry(
        hass,
        areas=areas,
        sensors=sensors,
        entry_id="test_user_permissions",
        users=users,
    )
    with patch_alarmo_integration_dependencies(storage):
        await hass.config_entries.async_setup(entry.entry_id)
        await hass.async_block_till_done()
        hass.states.async_set(DOOR_SENSOR, "off")
        hass.states.async_set(MOTION_SENSOR, "off")
        await hass.async_block_till_done()
        await hass.services.async_call(
            "alarmo",
            "arm",
            {"entity_id": ALARM_ENTITY, "code": "ABCD", "mode": "away"},
            blocking=True,
        )
        await hass.async_block_till_done()
        area = AreaFactory.create_area(area_id="area_1")
        exit_time = area["modes"]["armed_away"]["exit_time"]
        await advance_time(hass, exit_time + 1)
        state = hass.states.get(ALARM_ENTITY)
        assert state.state == "armed_away"
        assert state.attributes.get("changed_by") == "Text Code User"
