import { EAlarmModes, SensorConfig } from './types';

export const platform = 'alarmo';
export const editConfigService = 'edit_config';

export const defaultSensorConfig: SensorConfig = {
  modes: [EAlarmModes.ArmedAway, EAlarmModes.ArmedHome, EAlarmModes.ArmedNight, EAlarmModes.ArmedCustom],
  immediate: false,
  arm_on_close: false,
  allow_open: false,
};

export const IconArmedAway = 'car-traction-control';
export const IconArmedHome = 'home';
export const IconArmedNight = 'weather-night';
export const IconArmedCustom = 'palette-outline';
