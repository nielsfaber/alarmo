import { HassEntity } from 'home-assistant-js-websocket';
import { AlarmoSensor, EArmModes, Dictionary, HomeAssistant } from '../types';
import { computeDomain, computeName, getDomain, sortAlphabetically } from '../helpers';
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
    case 'opening':
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
      use_exit_delay: true,
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
    entry_delay: null,
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
        icon: binarySensorIcon(e),
      })
    ) as { id: string; name: string; icon: string }[];

  list.sort(sortAlphabetically);
  return list;
};

export const binarySensorIcon = (stateObj: HassEntity, state?: string) => {
  const is_off = state === 'off';
  switch (stateObj?.attributes.device_class) {
    case 'battery':
      return is_off ? 'mdi:battery' : 'mdi:battery-outline';
    case 'battery_charging':
      return is_off ? 'mdi:battery' : 'mdi:battery-charging';
    case 'cold':
      return is_off ? 'mdi:thermometer' : 'mdi:snowflake';
    case 'connectivity':
      return is_off ? 'mdi:server-network-off' : 'mdi:server-network';
    case 'door':
      return is_off ? 'mdi:door-closed' : 'mdi:door-open';
    case 'garage_door':
      return is_off ? 'mdi:garage' : 'mdi:garage-open';
    case 'power':
      return is_off ? 'mdi:power-plug-off' : 'mdi:power-plug';
    case 'gas':
    case 'problem':
    case 'safety':
    case 'tamper':
      return is_off ? 'mdi:check-circle' : 'mdi:alert-circle';
    case 'smoke':
      return is_off ? 'mdi:check-circle' : 'mdi:smoke';
    case 'heat':
      return is_off ? 'mdi:thermometer' : 'mdi:fire';
    case 'light':
      return is_off ? 'mdi:brightness-5' : 'mdi:brightness-7';
    case 'lock':
      return is_off ? 'mdi:lock' : 'mdi:lock-open';
    case 'moisture':
      return is_off ? 'mdi:water-off' : 'mdi:water';
    case 'motion':
      return is_off ? 'mdi:walk' : 'mdi:run';
    case 'occupancy':
      return is_off ? 'mdi:home-outline' : 'mdi:home';
    case 'opening':
      return is_off ? 'mdi:square' : 'mdi:square-outline';
    case 'plug':
      return is_off ? 'mdi:power-plug-off' : 'mdi:power-plug';
    case 'presence':
      return is_off ? 'mdi:home-outline' : 'mdi:home';
    case 'running':
      return is_off ? 'mdi:stop' : 'mdi:play';
    case 'sound':
      return is_off ? 'mdi:music-note-off' : 'mdi:music-note';
    case 'update':
      return is_off ? 'mdi:package' : 'mdi:package-up';
    case 'vibration':
      return is_off ? 'mdi:crop-portrait' : 'mdi:vibrate';
    case 'window':
      return is_off ? 'mdi:window-closed' : 'mdi:window-open';
    default:
      return is_off ? 'mdi:radiobox-blank' : 'mdi:checkbox-marked-circle';
  }
};
