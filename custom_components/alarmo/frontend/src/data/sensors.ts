import { HassEntity } from 'home-assistant-js-websocket';
import { AlarmoSensor, EArmModes, Dictionary } from '../types';
import { getDomain } from '../helpers';
import { computeDomain, HomeAssistant } from 'custom-card-helpers';
import { ESensorTypes, ESensorIcons } from '../const';
import { localize } from '../../localize/localize';

export const isValidSensor = (entity: HassEntity, showAllDeviceClasses: boolean) => {
  const domain = getDomain(entity.entity_id);
  if (domain == 'binary_sensor') {
    if (showAllDeviceClasses) return true;
    const type = entity.attributes.device_class;
    if (!type) return false;
    if (
      [
        'door',
        'garage_door',
        'gas',
        'heat',
        'lock',
        'moisture',
        'motion',
        'moving',
        'occupancy',
        'opening',
        'presence',
        'safety',
        'smoke',
        'sound',
        'vibration',
        'window',
      ].includes(type)
    )
      return true;
    return false;
  }
  return false;
};

export const binarySensorConfig = (stateObj: HassEntity): Partial<AlarmoSensor> => {
  switch (stateObj.attributes.device_class) {
    case 'door':
    case 'garage_door':
    case 'lock':
    case 'opening':
      return {
        modes: [EArmModes.ArmedAway, EArmModes.ArmedHome, EArmModes.ArmedNight],
      };
    case 'window':
      return {
        modes: [EArmModes.ArmedAway, EArmModes.ArmedHome, EArmModes.ArmedNight],
        immediate: true,
      };
    case 'gas':
    case 'heat':
    case 'moisture':
    case 'smoke':
      return {
        always_on: true,
      };
    case 'motion':
    case 'moving':
    case 'occupancy':
    case 'presence':
    case 'sound':
      return {
        modes: [EArmModes.ArmedAway],
      };
    default:
      return {};
  }
};

export const sensorClassToType = (stateObj: HassEntity): ESensorTypes | undefined => {
  switch (stateObj.attributes.device_class) {
    case 'door':
    case 'garage_door':
    case 'lock':
    case 'opening':
      return ESensorTypes.Door;
    case 'window':
      return ESensorTypes.Window;
    case 'gas':
    case 'heat':
    case 'moisture':
    case 'smoke':
    case 'safety':
      return ESensorTypes.Environmental;
    case 'motion':
    case 'moving':
    case 'occupancy':
    case 'presence':
      return ESensorTypes.Motion;
    case 'sound':
    case 'opening':
    case 'vibration':
      return ESensorTypes.Tamper;
    default:
      return;
  }
};

export const sensorConfigByType = (modeList: EArmModes[]): Dictionary<Partial<AlarmoSensor>> => {
  const filterModes = (modes: EArmModes[]) => modes.filter(e => modeList.includes(e));

  return {
    [ESensorTypes.Door]: {
      modes: filterModes([EArmModes.ArmedAway, EArmModes.ArmedHome, EArmModes.ArmedNight]),
      always_on: false,
      allow_open: false,
      arm_on_close: true,
      immediate: false,
    },
    [ESensorTypes.Window]: {
      modes: filterModes([EArmModes.ArmedAway, EArmModes.ArmedHome, EArmModes.ArmedNight]),
      always_on: false,
      allow_open: false,
      arm_on_close: false,
      immediate: true,
    },
    [ESensorTypes.Motion]: {
      modes: filterModes([EArmModes.ArmedAway]),
      always_on: false,
      allow_open: true,
      arm_on_close: false,
      immediate: false,
    },
    [ESensorTypes.Tamper]: {
      modes: filterModes([EArmModes.ArmedAway, EArmModes.ArmedHome, EArmModes.ArmedNight, EArmModes.ArmedCustom]),
      always_on: false,
      allow_open: false,
      arm_on_close: false,
      immediate: true,
    },
    [ESensorTypes.Environmental]: {
      modes: filterModes([EArmModes.ArmedAway, EArmModes.ArmedHome, EArmModes.ArmedNight, EArmModes.ArmedCustom]),
      always_on: true,
      allow_open: false,
      arm_on_close: false,
      immediate: false,
    },
  };
};

export function defaultSensorConfig(stateObj: HassEntity | undefined, modeList: EArmModes[]) {
  if (!stateObj) return null;
  const domain = computeDomain(stateObj.entity_id);

  let config: AlarmoSensor = {
    entity_id: stateObj.entity_id,
    name: stateObj.attributes.friendly_name || stateObj.entity_id,
    modes: [],
    immediate: false,
    arm_on_close: false,
    allow_open: false,
    always_on: false,
    auto_bypass: false,
    auto_bypass_modes: [],
    trigger_unavailable: false,
    type: ESensorTypes.Other,
    enabled: true,
  };

  if (domain == 'binary_sensor') {
    const type = sensorClassToType(stateObj);
    if (type) {
      config = {
        ...config,
        type: type,
        ...sensorConfigByType(modeList)[type],
      };
    }
  }
  return config;
}

export const getSensorTypeOptions = (hass: HomeAssistant) =>
  Object.entries(ESensorTypes)
    .filter(([, e]) => e != ESensorTypes.Other)
    .map(([k, v]) =>
      Object({
        value: v,
        name: localize(`panels.sensors.cards.editor.fields.device_type.choose.${v}.name`, hass.language),
        description: localize(`panels.sensors.cards.editor.fields.device_type.choose.${v}.description`, hass.language),
        icon: ESensorIcons[k],
      })
    );
