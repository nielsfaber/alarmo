import { HassEntity, HassEntityAttributeBase } from 'home-assistant-js-websocket';

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

export enum EAlarmModes {
  ArmedAway = 'away',
  ArmedHome = 'home',
  ArmedNight = 'night',
  ArmedCustom = 'custom',
}

export interface SensorConfig {
  modes: EAlarmModes[];
  immediate: boolean;
  arm_on_close: boolean;
  allow_open: boolean;
}

export interface DelayConfig {
  entry: number;
  leave: number;
  trigger: number;
}

export interface UserConfig {
  name: string;
  is_admin: boolean;
  can_arm: boolean;
  can_disarm: boolean;
}

export interface GeneralConfig {
  code_arm_required: boolean;
  code_disarm_required: boolean;
  code_format: 'number' | 'text';
  disarm_after_trigger: boolean;
}

export interface ActionConfig {
  pushEnabled: boolean,
  pushTarget: string,
  sirenEnabled: boolean,
  sirenEntity: string,
}

export type editSensorSchema = {
  entity_id: string;
  edit_sensor: {
    entity_id: string;
    modes: EAlarmModes[];
    immediate?: boolean;
    arm_on_close?: boolean;
    allow_open?: boolean;
  };
};

export type removeSensorSchema = {
  entity_id: string;
  remove_sensor: {
    entity_id: string;
  };
};

export type editModeSchema = {
  entity_id: string;
  edit_mode: {
    mode: EAlarmModes;
    enabled?: boolean;
    delays?: {
      leave?: { minutes?: number; seconds?: number };
      entry?: { minutes?: number; seconds?: number };
    };
  };
};

export type editGeneralSchema = {
  entity_id: string;
  edit_general: {
    trigger_time?: { minutes?: number; seconds?: number };
    disarm_after_trigger?: boolean;
  };
};

export type addUserSchema = {
  entity_id: string;
  add_user: {
    name: string;
    code: string;
    is_admin: boolean;
    can_arm: boolean;
    can_disarm: boolean;
  };
};

export type editUserSchema = {
  entity_id: string;
  edit_user: {
    name: string;
    code: string;
    code_new: string;
    is_admin: boolean;
    can_arm: boolean;
    can_disarm: boolean;
  };
};

export type removeUserSchema = {
  entity_id: string;
  edit_user: {
    name: string;
    remove: boolean;
  };
};

export type configCodeSchema = {
  entity_id: string;
  config_code: {
    code_arm_required: boolean;
    code_disarm_required: boolean;
    code_format: 'number' | 'text';
  };
};


export type editActionsSchema = {
  entity_id: string;
  edit_actions: {
    push_target?: string;
    siren_entity?: string;
  };
};
