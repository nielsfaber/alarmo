import { HomeAssistant } from 'custom-card-helpers';
import {
  AlarmoConfig,
  AlarmoModeConfig,
  AlarmoSensor,
  Dictionary,
  AlarmoUser,
  EArmModes,
  AlarmoAutomation,
  AlarmoArea,
  SensorGroup,
} from '../types';

export const fetchConfig = (hass: HomeAssistant): Promise<AlarmoConfig> =>
  hass.callWS({
    type: 'alarmo/config',
  });

export const fetchSensors = (hass: HomeAssistant): Promise<Dictionary<AlarmoSensor>> =>
  hass.callWS({
    type: 'alarmo/sensors',
  });

export const fetchUsers = (hass: HomeAssistant): Promise<Dictionary<AlarmoUser>> =>
  hass.callWS({
    type: 'alarmo/users',
  });

export const fetchAutomations = (hass: HomeAssistant): Promise<Dictionary<AlarmoAutomation>> =>
  hass.callWS({
    type: 'alarmo/automations',
  });

export const fetchSensorGroups = (hass: HomeAssistant): Promise<Dictionary<SensorGroup>> =>
  hass.callWS({
    type: 'alarmo/sensor_groups',
  });

export const saveConfig = (hass: HomeAssistant, config: Partial<AlarmoConfig>): Promise<boolean> => {
  return hass.callApi('POST', 'alarmo/config', config);
};

export const saveModeConfig = (
  hass: HomeAssistant,
  config: Partial<AlarmoModeConfig> & { mode: EArmModes }
): Promise<boolean> => {
  return hass.callApi('POST', 'alarmo/mode', config);
};

export const saveSensor = (
  hass: HomeAssistant,
  config: Partial<AlarmoSensor> & { entity_id: string }
): Promise<boolean> => {
  return hass.callApi('POST', 'alarmo/sensors', config);
};

export const deleteSensor = (hass: HomeAssistant, entity_id: string): Promise<boolean> => {
  return hass.callApi('POST', 'alarmo/sensors', {
    entity_id: entity_id,
    remove: true,
  });
};

export const saveUser = (hass: HomeAssistant, config: Partial<AlarmoUser>): Promise<boolean> => {
  return hass.callApi('POST', 'alarmo/users', config);
};

export const deleteUser = (hass: HomeAssistant, user_id: string): Promise<boolean> => {
  return hass.callApi('POST', 'alarmo/users', {
    user_id: user_id,
    remove: true,
  });
};

export const saveAutomation = (hass: HomeAssistant, config: Partial<AlarmoAutomation>): Promise<boolean> => {
  return hass.callApi('POST', 'alarmo/automations', config);
};

export const deleteAutomation = (hass: HomeAssistant, automation_id: string): Promise<boolean> => {
  return hass.callApi('POST', 'alarmo/automations', {
    automation_id: automation_id,
    remove: true,
  });
};

export const fetchAreas = (hass: HomeAssistant): Promise<Dictionary<AlarmoArea>> =>
  hass.callWS({
    type: 'alarmo/areas',
  });

export const saveArea = (hass: HomeAssistant, config: Partial<AlarmoArea>): Promise<boolean> => {
  return hass.callApi('POST', 'alarmo/area', config);
};

export const deleteArea = (hass: HomeAssistant, area_id: string): Promise<boolean> => {
  return hass.callApi('POST', 'alarmo/area', {
    area_id: area_id,
    remove: true,
  });
};

export const saveSensorGroup = (hass: HomeAssistant, config: Partial<SensorGroup>): Promise<boolean> => {
  return hass.callApi('POST', 'alarmo/sensor_groups', config);
};

export const deleteSensorGroup = (hass: HomeAssistant, group_id: string): Promise<boolean> => {
  return hass.callApi('POST', 'alarmo/sensor_groups', {
    group_id: group_id,
    remove: true,
  });
};