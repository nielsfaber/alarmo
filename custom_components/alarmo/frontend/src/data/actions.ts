import { localize } from "../../localize/localize";
import { EArmModes, AlarmoArea, EAlarmEvent, Dictionary, AlarmoConfig } from "../types";
import { EArmModeIcons } from "../const";

import { computeDomain, computeEntity, HomeAssistant, computeStateDisplay, stateIcon, domainIcon } from "custom-card-helpers";
import { Unique, flatten, isDefined } from "../helpers";

export const computeArmModeDisplay = (val: EArmModes, hass: HomeAssistant) => {
  switch (val) {
    case EArmModes.ArmedAway:
      return {
        value: EArmModes.ArmedAway,
        name: localize('common.modes_long.armed_away', hass.language),
        icon: EArmModeIcons.ArmedAway,
      };
    case EArmModes.ArmedHome:
      return {
        value: EArmModes.ArmedHome,
        name: localize('common.modes_long.armed_home', hass.language),
        icon: EArmModeIcons.ArmedHome
      };
    case EArmModes.ArmedNight:
      return {
        value: EArmModes.ArmedNight,
        name: localize('common.modes_long.armed_night', hass.language),
        icon: EArmModeIcons.ArmedNight
      };
    case EArmModes.ArmedCustom:
      return {
        value: EArmModes.ArmedCustom,
        name: localize('common.modes_long.armed_custom_bypass', hass.language),
        icon: EArmModeIcons.ArmedCustom
      };
  }
}

export const computeEventDisplay = (event: EAlarmEvent, hass: HomeAssistant) => {
  switch (event) {
    case EAlarmEvent.Armed:
      return {
        value: EAlarmEvent.Armed,
        name: localize('panels.actions.cards.new_notification.fields.event.choose.armed.name', hass.language),
        description: localize('panels.actions.cards.new_notification.fields.event.choose.armed.description', hass.language),
        icon: 'hass:shield-check-outline'
      };
    case EAlarmEvent.Disarmed:
      return {
        value: EAlarmEvent.Disarmed,
        name: localize('panels.actions.cards.new_notification.fields.event.choose.disarmed.name', hass.language),
        description: localize('panels.actions.cards.new_notification.fields.event.choose.disarmed.description', hass.language),
        icon: 'hass:shield-off-outline',
      };
    case EAlarmEvent.Triggered:
      return {
        value: EAlarmEvent.Triggered,
        name: localize('panels.actions.cards.new_notification.fields.event.choose.triggered.name', hass.language),
        description: localize('panels.actions.cards.new_notification.fields.event.choose.triggered.description', hass.language),
        icon: 'hass:bell-alert-outline',
      };
    case EAlarmEvent.ArmFailure:
      return {
        value: EAlarmEvent.ArmFailure,
        name: localize('panels.actions.cards.new_notification.fields.event.choose.arm_failure.name', hass.language),
        description: localize('panels.actions.cards.new_notification.fields.event.choose.arm_failure.description', hass.language),
        icon: 'hass:alert-outline'
      };
    case EAlarmEvent.Arming:
      return {
        value: EAlarmEvent.Arming,
        name: localize('panels.actions.cards.new_notification.fields.event.choose.arming.name', hass.language),
        description: localize('panels.actions.cards.new_notification.fields.event.choose.arming.description', hass.language),
        icon: 'hass:home-export-outline'
      };
    case EAlarmEvent.Pending:
      return {
        value: EAlarmEvent.Pending,
        name: localize('panels.actions.cards.new_notification.fields.event.choose.pending.name', hass.language),
        description: localize('panels.actions.cards.new_notification.fields.event.choose.pending.description', hass.language),
        icon: 'hass:home-import-outline'
      }
  }
}

export const computeAreaDisplay = (area: string | number, areaConfig: Dictionary<AlarmoArea>, alarmoConfig: AlarmoConfig) => {
  if (area == 0) {
    return {
      name: alarmoConfig.master.name,
      value: 0
    }
  }
  else if (Object.keys(areaConfig).includes(String(area))) {
    return {
      name: areaConfig[area].name,
      value: area
    }
  }
  else {
    return {
      name: String(area),
      value: area
    }
  }
}


export const computeServiceDisplay = (hass: HomeAssistant, ...services: (string | undefined)[]) => {

  let output = services.map(service => {
    if (!service) return null;
    const domain = computeDomain(service);
    const domainService = computeEntity(service);

    let data = {
      value: service,
      name: domainService.replace(/_/g, ' ').split(' ').map(e => e.substring(0, 1).toUpperCase() + e.substring(1)).join(' '),
      icon: 'hass:home',
      description: service
    }

    switch (domain) {
      case 'notify':
        const stateObj = hass.states[`device_tracker.${domainService.replace('mobile_app_', '')}`];
        data = stateObj
          ? {
            ...data,
            name: stateObj.attributes.friendly_name || computeEntity(stateObj.entity_id),
            icon: stateObj.attributes.icon || 'hass:cellphone-text',
          }
          : { ...data, icon: 'hass:comment-alert' };
        break;
      case 'tts':
        data = { ...data, icon: 'hass:microphone' };
        break;
    }

    return data;
  })
    .filter(isDefined);
  output.sort((a, b) => (a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1));

  return output;
}

export const getAreaOptions = (areaConfig: Dictionary<AlarmoArea>, alarmoConfig: AlarmoConfig) => {

  let areas: (string | number)[] = [];

  const area_ids = Object.keys(areaConfig)
    .filter(e => Object.values(areaConfig[e].modes).some(v => v.enabled));

  if (alarmoConfig.master.enabled && area_ids.length > 1)
    areas = [...areas, 0];

  areas = [...areas, ...area_ids];
  return areas;
}

export const getArmModeOptions = (area: string | number | undefined, areaConfig: Dictionary<AlarmoArea>) => {
  const areaList = (areaCfg: AlarmoArea) => (Object.keys(areaCfg.modes) as EArmModes[]).filter(mode => areaCfg.modes[mode].enabled);

  if (!isDefined(area) || !Object.keys(areaConfig).includes(String(area))) {
    const modeLists = Object.keys(areaConfig).map(e => areaList(areaConfig[e]));
    return modeLists[0].filter(e => modeLists.every(m => m.includes(e)));
  }
  else {
    return areaList(areaConfig[area]);
  }
};

export const computeEntityDisplay = (entity_id: string[], hass: HomeAssistant) => {


  let data = entity_id.map(e => {
    let output = {
      value: e,
      name: hass.states[e].attributes.friendly_name || computeEntity(e),
      icon: hass.states[e].attributes.icon || domainIcon(computeDomain(e)),
      description: e
    };
    return output;
  });
  data.sort((a, b) => (a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1));

  return data;
}

export const getNotifyServices = (hass: HomeAssistant) => [
  ...Object.keys(hass.services.notify).map(service => `notify.${service}`)
];

export const getAutomationEntities = (hass: HomeAssistant) => [
  ...Object.keys(hass.states)
    .filter(e => ['light', 'switch', 'input_boolean', 'script'].includes(computeDomain(e)))
];

export const getWildcardOptions = (event?: EAlarmEvent) => {
  let options: { name: string, value: string }[] = [];

  options = [];

  if (!event || [EAlarmEvent.Pending, EAlarmEvent.Triggered, EAlarmEvent.ArmFailure].includes(event))
    options = [...options, {
      name: "Open Sensors",
      value: "{{open_sensors}}",
    }];

  if (!event || [EAlarmEvent.Armed].includes(event))
    options = [...options, {
      name: "Bypassed Sensors",
      value: "{{bypassed_sensors}}",
    }];

  if (!event || [EAlarmEvent.Armed, EAlarmEvent.Arming, EAlarmEvent.Disarmed].includes(event))
    options = [...options, {
      name: "Changed By",
      value: "{{changed_by}}",
    }];

  if (!event || [EAlarmEvent.Armed, EAlarmEvent.Arming, EAlarmEvent.Pending, EAlarmEvent.Triggered, EAlarmEvent.ArmFailure].includes(event))
    options = [...options, {
      name: "Arm Mode",
      value: "{{arm_mode}}",
    }];

  return options;
}

export const isValidString = (input: any) => {
  return typeof input == 'string' && input.trim().length
};

export const isValidService = (input: any, hass: HomeAssistant) => {
  return (
    isValidString(input) &&
    hass.services[computeDomain(input)] &&
    hass.services[computeDomain(input)][computeEntity(input)]
  );
};

export const isValidEntity = (input: any, hass: HomeAssistant) => {
  return (
    isValidString(input) &&
    hass.states[input]
  );
};

export const isObject = (input: any) => (
  typeof input === "object" &&
  input !== null &&
  !Array.isArray(input)
);

export const isArray = (input: any) => (
  typeof input === "object" &&
  input !== null &&
  Array.isArray(input)
);

export const isString = (input: any) => (
  typeof input === "string"
);