export const VERSION = '1.9.10';

export const platform = 'alarmo';
export const editConfigService = 'edit_config';

export enum EArmModeIcons {
  ArmedAway = 'mdi:lock',
  ArmedHome = 'mdi:home',
  ArmedNight = 'mdi:moon-waning-crescent',
  ArmedCustom = 'mdi:shield',
  ArmedVacation = 'mdi:airplane',
}

export enum AlarmStates {
  STATE_ALARM_DISARMED = 'disarmed',
  STATE_ALARM_ARMED_HOME = 'armed_home',
  STATE_ALARM_ARMED_AWAY = 'armed_away',
  STATE_ALARM_ARMED_NIGHT = 'armed_night',
  STATE_ALARM_ARMED_CUSTOM_BYPASS = 'armed_custom_bypass',
  STATE_ALARM_ARMED_VACATION = 'armed_vacation',
  STATE_ALARM_PENDING = 'pending',
  STATE_ALARM_ARMING = 'arming',
  STATE_ALARM_DISARMING = 'disarming',
  STATE_ALARM_TRIGGERED = 'triggered',
}

export enum AlarmCommands {
  COMMAND_ALARM_DISARM = 'disarm',
  COMMAND_ALARM_ARM_HOME = 'arm_home',
  COMMAND_ALARM_ARM_AWAY = 'arm_away',
  COMMAND_ALARM_ARM_NIGHT = 'arm_night',
  COMMAND_ALARM_ARM_CUSTOM_BYPASS = 'arm_custom_bypass',
  COMMAND_ALARM_ARM_VACATION = 'arm_vacation',
}

export enum ESensorTypes {
  Door = 'door',
  Window = 'window',
  Motion = 'motion',
  Tamper = 'tamper',
  Environmental = 'environmental',
  Other = 'other',
}

export enum ESensorIcons {
  Door = 'mdi:door-closed',
  Window = 'mdi:window-closed',
  Motion = 'mdi:motion-sensor-off',
  Tamper = 'mdi:crop-portrait',
  Environmental = 'mdi:fire',
  Other = 'mdi:check-circle',
}

export enum ESensorIconsActive {
  Door = 'mdi:door-open',
  Window = 'mdi:window-open',
  Motion = 'mdi:motion-sensor',
  Tamper = 'mdi:vibrate',
  Environmental = 'mdi:fire-alert',
  Other = 'mdi:alert-circle',
}

export enum EAutomationTypes {
  Notification = 'notification',
  Action = 'action',
}
