import { HassEntity } from "home-assistant-js-websocket";
import { AlarmoConfig, AlarmoSensor, EArmModes, ESensorType, Dictionary } from "../types";
import { getDomain } from "../helpers";
import { computeDomain } from "custom-card-helpers";




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
}

export const binarySensorConfig = (stateObj: HassEntity): Partial<AlarmoSensor> => {

  switch (stateObj.attributes.device_class) {
    case 'door':
    case 'garage_door':
    case 'lock':
    case 'opening':
      return {
        modes: [
          EArmModes.ArmedAway,
          EArmModes.ArmedHome,
          EArmModes.ArmedNight,
        ]
      }
    case 'window':
      return {
        modes: [
          EArmModes.ArmedAway,
          EArmModes.ArmedHome,
          EArmModes.ArmedNight,
        ],
        immediate: true
      }
    case 'gas':
    case 'heat':
    case 'moisture':
    case 'smoke':
      return {
        always_on: true,
      }
    case 'motion':
    case 'moving':
    case 'occupancy':
    case 'presence':
    case 'sound':
      return {
        modes: [
          EArmModes.ArmedAway,
        ]
      }
    default:
      return {
      }
  }
}

export const sensorClassToType = (stateObj: HassEntity): ESensorType | undefined => {

  switch (stateObj.attributes.device_class) {
    case 'door':
    case 'garage_door':
    case 'lock':
    case 'opening':
      return ESensorType.Door;
    case 'window':
      return ESensorType.Window;
    case 'gas':
    case 'heat':
    case 'moisture':
    case 'smoke':
    case 'safety':
      return ESensorType.Environmental
    case 'motion':
    case 'moving':
    case 'occupancy':
    case 'presence':
      return ESensorType.Motion
    case 'sound':
    case 'opening':
    case 'vibration':
      return ESensorType.Tamper
    default:
      return;
  }
}

export function defaultSensorConfig(stateObj: HassEntity | undefined, alarmoConfig: AlarmoConfig) {
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
    trigger_unavailable: false,
    type: ESensorType.Other,
  };

  if (domain == 'binary_sensor') {
    const type = sensorClassToType(stateObj);
    if (type) {
      config = {
        ...config,
        type: type,
        ...sensorConfigByType(alarmoConfig)[type]
      };
    }
  }

  config = {
    ...config,
    modes: config.modes.filter(e =>
      alarmoConfig.modes[e].enabled
    )
  };

  return config;
}

export const sensorConfigByType = (alarmoConfig: AlarmoConfig): Dictionary<Partial<AlarmoSensor>> => {

  const filterModes = (modes: EArmModes[]) => modes.filter(e =>
    alarmoConfig.modes[e].enabled
  )

  return {
    [ESensorType.Door]: {
      modes: filterModes([EArmModes.ArmedAway, EArmModes.ArmedHome, EArmModes.ArmedNight]),
      always_on: false,
      allow_open: false,
      arm_on_close: true,
      immediate: false,
    },
    [ESensorType.Window]: {
      modes: filterModes([EArmModes.ArmedAway, EArmModes.ArmedHome, EArmModes.ArmedNight]),
      always_on: false,
      allow_open: false,
      arm_on_close: false,
      immediate: true,
    },
    [ESensorType.Motion]: {
      modes: filterModes([EArmModes.ArmedAway]),
      always_on: false,
      allow_open: true,
      arm_on_close: false,
      immediate: false,
    },
    [ESensorType.Tamper]: {
      modes: filterModes([EArmModes.ArmedAway, EArmModes.ArmedHome, EArmModes.ArmedNight, EArmModes.ArmedCustom]),
      always_on: false,
      allow_open: false,
      arm_on_close: false,
      immediate: true,
    },
    [ESensorType.Environmental]: {
      modes: filterModes([EArmModes.ArmedAway, EArmModes.ArmedHome, EArmModes.ArmedNight, EArmModes.ArmedCustom]),
      always_on: true,
      allow_open: false,
      arm_on_close: false,
      immediate: false,
    }
  };
}