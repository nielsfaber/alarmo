import { SensorConfig, EAlarmModes, DelayConfig, UserConfig, AlarmEntity, GeneralConfig, ActionConfig } from './types';

export function importSensorConfig(config: number) {
  let output: SensorConfig = {
    modes: [],
    immediate: false,
    arm_on_close: false,
    allow_open: false,
  };
  const modes: EAlarmModes[] = [];

  if (config & 1) modes.push(EAlarmModes.ArmedAway);
  if (config & 2) modes.push(EAlarmModes.ArmedHome);
  if (config & 4) modes.push(EAlarmModes.ArmedNight);
  if (config & 8) modes.push(EAlarmModes.ArmedCustom);
  if (config & 16) output = { ...output, immediate: true }; // TBD: add support for individual mode setting
  if (config & 256) output = { ...output, arm_on_close: true };
  if (config & 512) output = { ...output, allow_open: true };
  output = { ...output, modes: modes };
  return output;
}

export function importDelayConfig(entity: AlarmEntity, mode: EAlarmModes) {
  const output: DelayConfig = {
    entry: 0,
    leave: 0,
    trigger: 0,
  };
  const delayConfig = entity.attributes.delays;

  Object.entries(delayConfig).forEach(([event, val]) => {
    if (event.includes('_')) {
      let _mode;
      [event, _mode] = event.split('_');
      if (_mode == mode && output.hasOwnProperty(event)) Object.assign(output, { [event]: val });
    } else if (output.hasOwnProperty(event)) Object.assign(output, { [event]: val });
  });
  return output;
}

export function importModes(entity: AlarmEntity) {
  const modes: EAlarmModes[] = [];
  const config = entity.attributes.supported_features;

  if (config & 1) modes.push(EAlarmModes.ArmedHome);
  if (config & 2) modes.push(EAlarmModes.ArmedAway);
  if (config & 4) modes.push(EAlarmModes.ArmedNight);
  if (config & 16) modes.push(EAlarmModes.ArmedCustom);
  return modes;
}

export function importUserConfig(name: string, config: number) {
  let output: UserConfig = {
    name: name,
    is_admin: false,
    can_arm: false,
    can_disarm: false,
  };

  if (config & 1) output = { ...output, is_admin: true };
  if (config & 2) output = { ...output, can_arm: true };
  if (config & 4) output = { ...output, can_disarm: true };
  return output;
}

export function importGeneralConfig(entity: AlarmEntity) {
  const output: GeneralConfig = {
    code_arm_required: entity.attributes.code_arm_required,
    code_disarm_required: Boolean(entity.attributes.config & 1),
    code_format: entity.attributes.code_format,
    disarm_after_trigger: Boolean(entity.attributes.config & 2),
  };
  return output;
}

export function importActionConfig(entity: AlarmEntity) {
  const output: ActionConfig = {
    pushEnabled: entity.attributes.push_target !== undefined,
    pushTarget: entity.attributes.push_target || "",
    sirenEnabled: entity.attributes.siren_entity !== undefined,
    sirenEntity: entity.attributes.siren_entity || "",
  };
  return output;
}
