import { HomeAssistant, stateIcon, fireEvent } from 'custom-card-helpers';
import { HassEntity } from 'home-assistant-js-websocket';
import { platform, AlarmStates, AlarmCommands } from './const';
import { Dictionary, EArmModes, AlarmoModeConfig } from './types';
import { html, TemplateResult } from 'lit-element';

export function getDomain(entity: string | HassEntity) {
  const entity_id: string = typeof entity == 'string' ? entity : entity.entity_id;

  return String(entity_id.split('.').shift());
}

export function computeIcon(entity: HassEntity) {
  return stateIcon(entity);
}

export function prettyPrint(input: string) {
  input = input.replace('_', ' ');
  return input.charAt(0).toUpperCase() + input.slice(1);
}

export function computeName(entity: HassEntity) {
  if (!entity) return '(unrecognized entity)';
  if (entity.attributes && entity.attributes.friendly_name) return entity.attributes.friendly_name;
  else return String(entity.entity_id.split('.').pop());
}

export function getAlarmEntity(hass: HomeAssistant) {
  return String(hass.panels[platform].config!.entity_id);
}

export function Unique(array: any[]) {
  return array.filter((v, i, a) => a.indexOf(v) === i);
}

export function Without(array: any[], item: any) {
  return array.filter(e => e !== item);
}

export function pick(obj: Dictionary<any> | null | undefined, keys: string[]): Dictionary<any> {
  if (!obj) return {};
  return Object.entries(obj)
    .filter(([key]) => keys.includes(key))
    .reduce((obj, [key, val]) => Object.assign(obj, { [key]: val }), {});
}

export function omit(obj: Dictionary<any> | null | undefined, keys: string[]): Dictionary<any> {
  if (!obj) return {};
  return Object.entries(obj)
    .filter(([key]) => !keys.includes(key))
    .reduce((obj, [key, val]) => Object.assign(obj, { [key]: val }), {});
}

export function IsEqual(obj1: Record<string, any> | any[], obj2: Record<string, any> | any[]) {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) return false;
  for (const key of keys1) {
    if (typeof obj1[key] === 'object' && typeof obj2[key] === 'object') {
      if (IsEqual(obj1[key], obj2[key])) return false;
    } else if (obj1[key] !== obj2[key]) return false;
  }
  return true;
}

export function showErrorDialog(ev: Event, error: string | TemplateResult) {
  const elem = ev.target as HTMLElement;
  fireEvent(elem, 'show-dialog', {
    dialogTag: 'error-dialog',
    dialogImport: () => import('./dialogs/error-dialog'),
    dialogParams: { error: error },
  });
}

export function handleError(err: any, ev: Event) {
  const errorMessage = html`
    <b>Something went wrong!</b><br />
    ${err.body.message
      ? html`
          ${err.body.message}<br /><br />
        `
      : ''}
    ${err.error}<br /><br />
    Please <a href="https://github.com/nielsfaber/alarmo/issues">report</a> the bug.
  `;
  showErrorDialog(ev, errorMessage);
}

export const commandToState = (command: string) => {
  switch (command) {
    case AlarmCommands.COMMAND_ALARM_DISARM:
      return AlarmStates.STATE_ALARM_DISARMED;
    case AlarmCommands.COMMAND_ALARM_ARM_HOME:
      return AlarmStates.STATE_ALARM_ARMED_HOME;
    case AlarmCommands.COMMAND_ALARM_ARM_AWAY:
      return AlarmStates.STATE_ALARM_ARMED_AWAY;
    case AlarmCommands.COMMAND_ALARM_ARM_NIGHT:
      return AlarmStates.STATE_ALARM_ARMED_NIGHT;
    case AlarmCommands.COMMAND_ALARM_ARM_CUSTOM_BYPASS:
      return AlarmStates.STATE_ALARM_ARMED_CUSTOM_BYPASS;
    default:
      return undefined;
  }
};

export const filterState = (state: string, config: Record<EArmModes, AlarmoModeConfig>) => {
  if (!state) return false;
  switch (state) {
    case AlarmStates.STATE_ALARM_ARMED_AWAY:
      return config[EArmModes.ArmedAway].enabled;
    case AlarmStates.STATE_ALARM_ARMED_HOME:
      return config[EArmModes.ArmedHome].enabled;
    case AlarmStates.STATE_ALARM_ARMED_NIGHT:
      return config[EArmModes.ArmedNight].enabled;
    case AlarmStates.STATE_ALARM_ARMED_CUSTOM_BYPASS:
      return config[EArmModes.ArmedCustom].enabled;
    default:
      return true;
  }
};

export function Assign<Type>(obj: Type, changes: Partial<Type>): Type {
  Object.entries(changes).forEach(([key, val]) => {
    if (key in obj && typeof obj[key] == 'object' && obj[key] !== null) obj = { ...obj, [key]: Assign(obj[key], val) };
    else obj = { ...obj, [key]: val };
  });
  return obj;
}
