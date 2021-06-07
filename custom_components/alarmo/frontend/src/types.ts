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
  enabled: boolean;
  exit_time: number;
  entry_time: number;
  trigger_time: number;
};

export type AlarmoConfig = {
  code_arm_required: boolean;
  code_disarm_required: boolean;
  code_format: 'number' | 'text';
  disarm_after_trigger: boolean;
  mqtt: MqttConfig;
  master: MasterConfig;
};

export type AlarmoSensor = {
  entity_id: string;
  name?: string;
  type: ESensorTypes;
  modes: EArmModes[];
  immediate: boolean;
  arm_on_close: boolean;
  allow_open: boolean;
  always_on: boolean;
  trigger_unavailable: boolean;
  auto_bypass: boolean;
  area?: string;
  enabled: boolean;
};

export type AlarmoUser = {
  user_id?: string;
  name: string;
  code: string;
  old_code?: string;
  is_admin: boolean;
  can_arm: boolean;
  can_disarm: boolean;
  is_override_code: boolean;
};

export type AutomationTrigger = {
  event?: EAlarmEvent,
  area?: string | number,
  modes?: EArmModes[]
}

export type AutomationAction = {
  service?: string;
  service_data?: Dictionary<any> & { entity_id?: any, message?: any, title?: any };
}

export interface AlarmoAutomation {
  automation_id?: string;
  name?: string;
  triggers: [AutomationTrigger, ...AutomationTrigger[]];
  actions: [AutomationAction, ...AutomationAction[]];
  enabled?: boolean;
  type: string;
}

export enum EAlarmEvent {
  Armed = 'armed',
  Disarmed = 'disarmed',
  Triggered = 'triggered',
  ArmFailure = 'arm_failure',
  Arming = 'arming',
  Pending = 'pending',
};

export type MqttConfig = {
  enabled: boolean;
  state_topic: string;
  state_payload: Dictionary<string>;
  command_topic: string;
  command_payload: Dictionary<string>;
  require_code: boolean;
  event_topic: string;
};

export type MasterConfig = {
  enabled: boolean;
  name: string;
};

export type AlarmoArea = {
  area_id: string;
  name: string;
  enabled: boolean;
  modes: Record<EArmModes, AlarmoModeConfig>;
};
