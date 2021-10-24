export const VERSION = '1.7.5';

export const platform = 'alarmo';
export const editConfigService = 'edit_config';

export enum EArmModeIcons {
  ArmedAway = 'hass:car-traction-control',
  ArmedHome = 'hass:home-outline',
  ArmedNight = 'hass:weather-night',
  ArmedCustom = 'hass:star-outline',
}

export enum AlarmStates {
  STATE_ALARM_DISARMED = 'disarmed',
  STATE_ALARM_ARMED_HOME = 'armed_home',
  STATE_ALARM_ARMED_AWAY = 'armed_away',
  STATE_ALARM_ARMED_NIGHT = 'armed_night',
  STATE_ALARM_ARMED_CUSTOM_BYPASS = 'armed_custom_bypass',
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
  Door = 'hass:door-closed',
  Window = 'hass:window-closed',
  Motion = 'hass:motion-sensor',
  Tamper = 'hass:vibrate',
  Environmental = 'hass:fire',
  Other = 'hass:contactless-payment-circle-outline',
}

export enum EAutomationTypes {
  Notification = "notification",
  Action = "action",
}