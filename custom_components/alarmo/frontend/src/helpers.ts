import { TemplateResult, html } from 'lit';
import { HassEntity } from 'home-assistant-js-websocket';
import { platform, AlarmStates, AlarmCommands } from './const';
import { Dictionary, EArmModes, AlarmoModeConfig, HomeAssistant } from './types';
import { fireEvent } from './fire_event';

export function getDomain(entity: string | HassEntity) {
  const entity_id: string = typeof entity == 'string' ? entity : entity.entity_id;

  return String(entity_id.split('.').shift());
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

export function isEqual(...arr: any[]) {
  return arr.every(e => JSON.stringify(e) === JSON.stringify(arr[0]));
}

export function Unique<TValue>(arr: TValue[]) {
  let res: TValue[] = [];
  arr.forEach(item => {
    if (!res.find(e => (typeof item === 'object' ? isEqual(e, item) : e === item))) res.push(item);
  });
  return res;
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

export function flatten<U>(arr: U[][]): U[] {
  if (((arr as unknown) as U[]).every(val => !Array.isArray(val))) {
    return ((arr as unknown) as U[]).slice();
  }
  return arr.reduce((acc, val) => acc.concat(Array.isArray(val) ? flatten((val as unknown) as U[][]) : val), []);
}

interface Omit {
  <T extends object, K extends [...(keyof T)[]]>(obj: T, ...keys: K): {
    [K2 in Exclude<keyof T, K[number]>]: T[K2];
  };
}

export const omit: Omit = (obj, ...keys) => {
  const ret = {} as {
    [K in keyof typeof obj]: typeof obj[K];
  };
  let key: keyof typeof obj;
  for (key in obj) {
    if (!keys.includes(key)) {
      ret[key] = obj[key];
    }
  }
  return ret;
};

export function isDefined<TValue>(value: TValue | null | undefined): value is TValue {
  return value !== null && value !== undefined;
}

export function IsEqual(obj1: Record<string, any> | any[], obj2: Record<string, any> | any[]) {
  if (obj1 === null || obj2 === null) return obj1 === obj2;
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) return false;
  for (const key of keys1) {
    if (typeof obj1[key] === 'object' && typeof obj2[key] === 'object') {
      if (!IsEqual(obj1[key], obj2[key])) return false;
    } else if (obj1[key] !== obj2[key]) return false;
  }
  return true;
}

export function showErrorDialog(ev: Event | HTMLElement, error: string | TemplateResult) {
  const elem = ev instanceof HTMLElement ? (ev as HTMLElement) : ((ev as Event).target as HTMLElement);
  fireEvent(elem, 'show-dialog', {
    dialogTag: 'error-dialog',
    dialogImport: () => import('./dialogs/error-dialog'),
    dialogParams: { error: error },
  });
}

export function handleError(err: any, ev: Event | HTMLElement) {
  const errorMessage = html`
    <b>Something went wrong!</b>
    <br />
    ${err.body.message
      ? html`
          ${err.body.message}
          <br />
          <br />
        `
      : ''}
    ${err.error}
    <br />
    <br />
    Please
    <a href="https://github.com/nielsfaber/alarmo/issues">report</a>
    the bug.
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
    case AlarmCommands.COMMAND_ALARM_ARM_VACATION:
      return AlarmStates.STATE_ALARM_ARMED_VACATION;
    default:
      return undefined;
  }
};

export const filterState = (state: string, config: Record<EArmModes, AlarmoModeConfig>) => {
  if (!state) return false;
  switch (state) {
    case AlarmStates.STATE_ALARM_ARMED_AWAY:
      return config[EArmModes.ArmedAway]?.enabled;
    case AlarmStates.STATE_ALARM_ARMED_HOME:
      return config[EArmModes.ArmedHome]?.enabled;
    case AlarmStates.STATE_ALARM_ARMED_NIGHT:
      return config[EArmModes.ArmedNight]?.enabled;
    case AlarmStates.STATE_ALARM_ARMED_CUSTOM_BYPASS:
      return config[EArmModes.ArmedCustom]?.enabled;
    case AlarmStates.STATE_ALARM_ARMED_VACATION:
      return config[EArmModes.ArmedVacation]?.enabled;
    default:
      return true;
  }
};

export function Assign<TValue extends Object>(obj: TValue, changes: Partial<TValue>): TValue {
  Object.entries(changes).forEach(([key, val]) => {
    if (key in obj && typeof obj[key] == 'object' && obj[key] !== null) obj = { ...obj, [key]: Assign(obj[key], val) };
    else obj = { ...obj, [key]: val };
  });
  return obj;
}

export function sortAlphabetically(a: string | { name: string }, b: string | { name: string }) {
  const stringVal = (s: string | { name: string }) =>
    typeof s === 'object' ? stringVal(s.name) : s.trim().toLowerCase();
  return stringVal(a) < stringVal(b) ? -1 : 1;
}

export const navigate = (
  _node: any,
  path: string,
  replace: boolean = false
) => {
  if (replace) {
    history.replaceState(null, "", path);
  } else {
    history.pushState(null, "", path);
  }
  fireEvent(window, "location-changed", {
    replace
  });
};

export function computeDomain(entityId: string): string {
  return entityId.substr(0, entityId.indexOf("."));
}

export function computeEntity(entityId: string): string {
  return entityId.substr(entityId.indexOf(".") + 1);
}

export function domainIcon(domain: string, state?: string): string {
  const fixedIcons = {
    alert: "mdi:alert",
    automation: "mdi:playlist-play",
    calendar: "mdi:calendar",
    camera: "mdi:video",
    climate: "mdi:thermostat",
    configurator: "mdi:settings",
    conversation: "mdi:text-to-speech",
    device_tracker: "mdi:account",
    fan: "mdi:fan",
    group: "mdi:google-circles-communities",
    history_graph: "mdi:chart-line",
    homeassistant: "mdi:home-assistant",
    homekit: "mdi:home-automation",
    image_processing: "mdi:image-filter-frames",
    input_boolean: "mdi:drawing",
    input_datetime: "mdi:calendar-clock",
    input_number: "mdi:ray-vertex",
    input_select: "mdi:format-list-bulleted",
    input_text: "mdi:textbox",
    light: "mdi:lightbulb",
    mailbox: "mdi:mailbox",
    notify: "mdi:comment-alert",
    person: "mdi:account",
    plant: "mdi:flower",
    proximity: "mdi:apple-safari",
    remote: "mdi:remote",
    scene: "mdi:google-pages",
    script: "mdi:file-document",
    sensor: "mdi:eye",
    simple_alarm: "mdi:bell",
    sun: "mdi:white-balance-sunny",
    switch: "mdi:flash",
    timer: "mdi:timer",
    updater: "mdi:cloud-upload",
    vacuum: "mdi:robot-vacuum",
    water_heater: "mdi:thermometer",
    weblink: "mdi:open-in-new"
  };

  if (domain in fixedIcons) {
    return fixedIcons[domain];
  }

  switch (domain) {
    case "alarm_control_panel":
      switch (state) {
        case "armed_home":
          return "mdi:bell-plus";
        case "armed_night":
          return "mdi:bell-sleep";
        case "disarmed":
          return "mdi:bell-outline";
        case "triggered":
          return "mdi:bell-ring";
        default:
          return "mdi:bell";
      }

    case "binary_sensor":
      return state && state === "off"
        ? "mdi:radiobox-blank"
        : "mdi:checkbox-marked-circle";

    case "cover":
      return state === "closed" ? "mdi:window-closed" : "mdi:window-open";

    case "lock":
      return state && state === "unlocked" ? "mdi:lock-open" : "mdi:lock";

    case "media_player":
      return state && state !== "off" && state !== "idle"
        ? "mdi:cast-connected"
        : "mdi:cast";

    case "zwave":
      switch (state) {
        case "dead":
          return "mdi:emoticon-dead";
        case "sleeping":
          return "mdi:sleep";
        case "initializing":
          return "mdi:timer-sand";
        default:
          return "mdi:z-wave";
      }

    default:
      return "mdi:bookmark";
  }
}