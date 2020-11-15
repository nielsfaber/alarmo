import { HomeAssistant, stateIcon, fireEvent } from 'custom-card-helpers';
import { HassEntity } from 'home-assistant-js-websocket';
import { platform } from './const';
import { Dictionary } from './types';
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


export function showErrorDialog(ev: Event, error: string | TemplateResult) {
  const elem = ev.target as HTMLElement;
  fireEvent(elem, 'show-dialog', {
    dialogTag: 'error-dialog',
    dialogImport: () => import('./dialogs/error-dialog'),
    dialogParams: { error: error }
  });
}

export function handleError(err: any, ev: Event) {
  let errorMessage = html`
    <b>Something went wrong!</b><br>
    ${err.body.message}<br><br>
    ${err.error}<br><br>
    Please <a href="https://github.com/nielsfaber/alarmo/issues">report</a> the bug.
  `;
  showErrorDialog(ev, errorMessage);
}