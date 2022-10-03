import { HassEntity } from 'home-assistant-js-websocket';
import { AlarmoSensor, EArmModes, Dictionary } from '../types';
import { computeIcon, computeName, getDomain, sortAlphabetically } from '../helpers';
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
        'carbon_monoxide',
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
        'tamper',
        'vibration',
        'window',
      ].includes(type)
    )
      return true;
    return false;
  }
  return false;
};

export const sensorClassToType = (stateObj: HassEntity): ESensorTypes | undefined => {
  switch (stateObj.attributes.device_class) {
    case 'door':
    case 'garage_door':
    case 'lock':
      return ESensorTypes.Door;
    case 'window':
      return ESensorTypes.Window;
    case 'carbon_monoxide':
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
    case 'tamper':
      return ESensorTypes.Tamper;
    default:
      return;
  }
};

export const sensorConfigByType = (modeList: EArmModes[]): Dictionary<Partial<AlarmoSensor>> => {
  const filterModes = (modes: EArmModes[]) => modes.filter(e => modeList.includes(e));

  return {
    [ESensorTypes.Door]: {
      modes: filterModes([EArmModes.ArmedAway, EArmModes.ArmedHome, EArmModes.ArmedNight, EArmModes.ArmedVacation]),
      always_on: false,
      allow_open: false,
      arm_on_close: false,
      use_entry_delay: true,
      use_exit_delay: false,
    },
    [ESensorTypes.Window]: {
      modes: filterModes([EArmModes.ArmedAway, EArmModes.ArmedHome, EArmModes.ArmedNight, EArmModes.ArmedVacation]),
      always_on: false,
      allow_open: false,
      arm_on_close: false,
      use_entry_delay: false,
      use_exit_delay: false,
    },
    [ESensorTypes.Motion]: {
      modes: filterModes([EArmModes.ArmedAway, EArmModes.ArmedVacation]),
      always_on: false,
      allow_open: true,
      arm_on_close: false,
      use_entry_delay: true,
      use_exit_delay: true,
    },
    [ESensorTypes.Tamper]: {
      modes: filterModes([
        EArmModes.ArmedAway,
        EArmModes.ArmedHome,
        EArmModes.ArmedNight,
        EArmModes.ArmedVacation,
        EArmModes.ArmedCustom,
      ]),
      always_on: false,
      allow_open: false,
      arm_on_close: false,
      use_entry_delay: false,
      use_exit_delay: false,
    },
    [ESensorTypes.Environmental]: {
      modes: filterModes([
        EArmModes.ArmedAway,
        EArmModes.ArmedHome,
        EArmModes.ArmedNight,
        EArmModes.ArmedVacation,
        EArmModes.ArmedCustom,
      ]),
      always_on: true,
      allow_open: false,
      arm_on_close: false,
      use_entry_delay: false,
      use_exit_delay: false,
    },
  };
};

export function defaultSensorConfig(stateObj: HassEntity | undefined, modeList: EArmModes[]) {
  if (!stateObj) return null;
  const domain = computeDomain(stateObj.entity_id);

  let config: AlarmoSensor = {
    entity_id: stateObj.entity_id,
    modes: [],
    use_entry_delay: true,
    use_exit_delay: true,
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

export const getConfigurableSensors = (
  hass: HomeAssistant,
  includedSensors: string[],
  showAllBinarySensors = false
) => {
  const list = Object.values(hass.states)
    .filter(e => isValidSensor(e, showAllBinarySensors))
    .filter(e => !includedSensors.includes(e.entity_id))
    .map(e =>
      Object({
        id: e.entity_id,
        name: computeName(e),
        icon: computeIcon(e),
      })
    ) as { id: string; name: string; icon: string }[];

  list.sort(sortAlphabetically);
  return list;
};
