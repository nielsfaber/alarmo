import { mdiAirplane, mdiAlertCircle, mdiCheckCircle, mdiCropPortrait, mdiDoorClosed, mdiDoorOpen, mdiFire, mdiFireAlert, mdiHome, mdiLock, mdiMoonWaningCrescent, mdiMotionSensor, mdiMotionSensorOff, mdiShield, mdiVibrate, mdiWindowClosed, mdiWindowOpen } from "@mdi/js";

export const VERSION = '1.10.16';

export const platform = 'alarmo';
export const editConfigService = 'edit_config';

export const EArmModeIcons = {
  ArmedAway: mdiLock,
  ArmedHome: mdiHome,
  ArmedNight: mdiMoonWaningCrescent,
  ArmedCustom: mdiShield,
  ArmedVacation: mdiAirplane
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

export const ESensorIcons = {
  Door: mdiDoorClosed,
  Window: mdiWindowClosed,
  Motion: mdiMotionSensorOff,
  Tamper: mdiCropPortrait,
  Environmental: mdiFire,
  Other: mdiCheckCircle
}

export const ESensorIconsActive = {
  Door: mdiDoorOpen,
  Window: mdiWindowOpen,
  Motion: mdiMotionSensor,
  Tamper: mdiVibrate,
  Environmental: mdiFireAlert,
  Other: mdiAlertCircle
}

export enum EAutomationTypes {
  Notification = 'notification',
  Action = 'action',
}
