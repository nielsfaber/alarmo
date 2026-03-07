import { HassEntity } from 'home-assistant-js-websocket';
import { AlarmoSensor, EArmModes, Dictionary, HomeAssistant } from '../types';
import { computeDomain, computeName, getDomain, sortAlphabetically } from '../helpers';
import { ESensorTypes, ESensorIcons } from '../const';
import { localize } from '../../localize/localize';
import { mdiAlertCircle, mdiBattery, mdiBatteryCharging, mdiBatteryOutline, mdiBrightness5, mdiBrightness7, mdiCheck, mdiCheckboxMarkedCircle, mdiCheckCircle, mdiCrop, mdiCropPortrait, mdiDoorClosed, mdiDoorOpen, mdiFire, mdiGarage, mdiGarageOpen, mdiHome, mdiHomeOutline, mdiLock, mdiLockOpen, mdiMusic, mdiMusicNote, mdiMusicNoteOff, mdiPackage, mdiPackageUp, mdiPlay, mdiPower, mdiPowerPlug, mdiPowerPlugOff, mdiRadioboxBlank, mdiRun, mdiServer, mdiServerNetwork, mdiServerNetworkOff, mdiSmoke, mdiSnowflake, mdiSquare, mdiSquareOutline, mdiStop, mdiThermometer, mdiVibrate, mdiWalk, mdiWater, mdiWaterOff, mdiWindowClosed, mdiWindowOpen } from '@mdi/js';

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
    delay_on: null,
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
      return is_off ? mdiBattery : mdiBatteryOutline;
    case 'battery_charging':
      return is_off ? mdiBattery : mdiBatteryCharging;
    case 'cold':
      return is_off ? mdiThermometer : mdiSnowflake;
    case 'connectivity':
      return is_off ? mdiServerNetworkOff : mdiServerNetwork;
    case 'door':
      return is_off ? mdiDoorClosed : mdiDoorOpen;
    case 'garage_door':
      return is_off ? mdiGarage : mdiGarageOpen;
    case 'power':
      return is_off ? mdiPowerPlugOff : mdiPowerPlug;
    case 'gas':
    case 'problem':
    case 'safety':
    case 'tamper':
      return is_off ? mdiCheckCircle : mdiAlertCircle;
    case 'smoke':
      return is_off ? mdiCheckCircle : mdiSmoke;
    case 'heat':
      return is_off ? mdiThermometer : mdiFire;
    case 'light':
      return is_off ? mdiBrightness5 : mdiBrightness7;
    case 'lock':
      return is_off ? mdiLock : mdiLockOpen;
    case 'moisture':
      return is_off ? mdiWaterOff : mdiWater;
    case 'motion':
      return is_off ? mdiWalk : mdiRun;
    case 'occupancy':
      return is_off ? mdiHomeOutline : mdiHome;
    case 'opening':
      return is_off ? mdiSquare : mdiSquareOutline;
    case 'plug':
      return is_off ? mdiPowerPlugOff : mdiPowerPlug;
    case 'presence':
      return is_off ? mdiHomeOutline : mdiHome;
    case 'running':
      return is_off ? mdiStop : mdiPlay;
    case 'sound':
      return is_off ? mdiMusicNoteOff : mdiMusicNote;
    case 'update':
      return is_off ? mdiPackage : mdiPackageUp;
    case 'vibration':
      return is_off ? mdiCropPortrait : mdiVibrate;
    case 'window':
      return is_off ? mdiWindowClosed : mdiWindowOpen;
    default:
      return is_off ? mdiRadioboxBlank : mdiCheckboxMarkedCircle;
  }
};
