import { HassEntity } from "home-assistant-js-websocket";
import { AlarmoConfig, AlarmoSensor, EArmModes } from "../types";
import { getDomain } from "../helpers";




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


export function defaultSensorConfig(stateObj: HassEntity | undefined, alarmoConfig: AlarmoConfig) {
  if (!stateObj) return null;

  let config: AlarmoSensor = {
    entity_id: stateObj.entity_id,
    name: stateObj.attributes.friendly_name || stateObj.entity_id,
    modes: [],
    immediate: false,
    arm_on_close: false,
    allow_open: false,
    always_on: false
  };

  config = {
    ...config,
    ...binarySensorConfig(stateObj)
  };

  config = {
    ...config,
    modes: config.modes.filter(e =>
      alarmoConfig.modes[e].enabled
    )
  };

  return config;
}