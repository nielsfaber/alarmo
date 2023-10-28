import { HassEntity, HassEntityAttributeBase, MessageBase, Connection, HassEntities, HassServices } from 'home-assistant-js-websocket';
import { ESensorTypes } from './const';

export interface Dictionary<TValue> {
  [id: string]: TValue;
}

export interface ServiceCallRequest {
  domain: string;
  service: string;
  serviceData?: Record<string, any>;
  target?: {
    entity_id?: string | string[];
    device_id?: string | string[];
    area_id?: string | string[];
  };
}

export interface HomeAssistant {
  connection: Connection;
  language: string;
    panels: {
    [name: string]: {
      component_name: string;
      config: { [key: string]: any } | null;
      icon: string | null;
      title: string | null;
      url_path: string;
    };
  };
  states: HassEntities;
  services: HassServices;
  localize: (key: string, ...args: any[]) => string;
  translationMetadata: {
    fragments: string[];
    translations: {
      [lang: string]: {
        nativeName: string;
        isRTL: boolean;
        fingerprints: { [fragment: string]: string };
      };
    };
  };
  callApi: <T>(
    method: "GET" | "POST" | "PUT" | "DELETE",
    path: string,
    parameters?: { [key: string]: any }
  ) => Promise<T>;
  callService: (
    domain: ServiceCallRequest["domain"],
    service: ServiceCallRequest["service"],
    serviceData?: ServiceCallRequest["serviceData"],
    target?: ServiceCallRequest["target"]
  ) => Promise<void>;
  callWS: <T>(msg: MessageBase) => Promise<T>;
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
  ArmedVacation = 'armed_vacation',
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
  code_mode_change_required: boolean;
  code_format: 'number' | 'text';
  disarm_after_trigger: boolean;
  mqtt: MqttConfig;
  master: MasterConfig;
};

export type AlarmoSensor = {
  entity_id: string;
  type: ESensorTypes;
  modes: EArmModes[];
  use_exit_delay: boolean;
  use_entry_delay: boolean;
  arm_on_close: boolean;
  allow_open: boolean;
  always_on: boolean;
  trigger_unavailable: boolean;
  auto_bypass: boolean;
  auto_bypass_modes: EArmModes[];
  area?: string;
  enabled: boolean;
  group?: string | null;
};

export type AlarmoUser = {
  user_id?: string;
  name: string;
  enabled: boolean;
  code: string;
  old_code?: string;
  can_arm: boolean;
  can_disarm: boolean;
  is_override_code: boolean;
  area_limit: string[];
  code_format?: string;
  code_length?: number;
};

export type AutomationTrigger = {
  event?: EAlarmEvent;
  area?: string | number;
  modes?: EArmModes[];
};

export type AutomationAction = {
  service?: string;
  entity_id?: string;
  data?: Dictionary<any> & { message?: any; title?: any };
};

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
  Untriggered = 'untriggered',
  ArmFailure = 'arm_failure',
  Arming = 'arming',
  Pending = 'pending',
}

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

export type SensorGroup = {
  group_id?: string;
  name: string;
  entities: string[];
  timeout: number;
};
