import { HassEntity, HassEntityAttributeBase } from 'home-assistant-js-websocket';
import { ESensorTypes } from './const';

export interface Dictionary<TValue> {
  [id: string]: TValue;
}

export interface AlarmEntity extends HassEntity {
  attributes: HassEntityAttributeBase & {
    code_format: 'number' | 'text';
    code_arm_required: boolean;
    code_disarm_required: boolean;
    disarm_after_trigger: boolean;
    supported_features: number;
    sensors: Dictionary<number>;
    delays: Dictionary<number>;
    users: Dictionary<number>;
    config: number;
    push_target?: string;
    siren_entity?: string;
  };
}

export enum EArmModes {
  ArmedAway = 'armed_away',
  ArmedHome = 'armed_home',
  ArmedNight = 'armed_night',
  ArmedCustom = 'armed_custom_bypass',
}

export type AlarmoModeConfig = {
  enabled: boolean,
  exit_time: number,
  entry_time: number,
  trigger_time: number,
}


export type AlarmoConfig = {
  code_arm_required: boolean,
  code_disarm_required: boolean,
  code_format: 'number' | 'text',
  disarm_after_trigger: boolean,
  mqtt: MqttConfig,
  master: MasterConfig,
}

export type AlarmoSensor = {
  entity_id: string,
  name?: string,
  type: ESensorTypes,
  modes: EArmModes[]
  immediate: boolean,
  arm_on_close: boolean,
  allow_open: boolean,
  always_on: boolean,
  trigger_unavailable: boolean,
  area?: string,
  enabled: boolean,
}

export type AlarmoUser = {
  user_id?: string,
  name: string,
  code: string,
  old_code?: string,
  is_admin: boolean,
  can_arm: boolean,
  can_disarm: boolean,
  is_override_code: boolean
}

export type Trigger = {
  state?: string,
  event?: string;
}

export type Action = {
  service: string,
  service_data?: Dictionary<any> & { entity_id?: string }
}

export type NotificationAction = {
  service: string,
  service_data: Dictionary<any> & {
    title?: string,
    message: string
  }
}

export enum EAlarmStates {
  Disarmed = "disarmed",
  Armed = "armed",
  Triggered = "triggered",
  Pending = "pending",
  Arming = "arming"
}

export enum EAlarmEvents {
  ArmFailure = "arm_failure",
}

export interface AlarmoAutomation {
  automation_id?: string,
  name?: string,
  triggers: Trigger[],
  actions: Action[],
  enabled?: boolean,
  modes?: EArmModes[],
  is_notification?: boolean,
  area?: string,
}


export interface AlarmoNotification extends AlarmoAutomation {
  automation_id?: string,
  name?: string,
  triggers: Trigger[],
  actions: NotificationAction[],
  enabled?: boolean,
  modes?: EArmModes[],
  area?: string,
}

export type MqttConfig = {
  enabled: boolean,
  state_topic: string,
  state_payload: Dictionary<string>,
  command_topic: string,
  command_payload: Dictionary<string>,
  require_code: boolean,
  event_topic: string,
}

export type MasterConfig = {
  enabled: boolean,
  name: string,
}

export type AlarmoArea = {
  area_id: string,
  name: string,
  enabled: boolean,
  modes: Record<EArmModes, AlarmoModeConfig>,
}
