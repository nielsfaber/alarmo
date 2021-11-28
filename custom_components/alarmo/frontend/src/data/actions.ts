import { localize } from '../../localize/localize';
import { EArmModes, AlarmoArea, EAlarmEvent, Dictionary, AlarmoConfig } from '../types';
import { EArmModeIcons } from '../const';

import { computeDomain, computeEntity, HomeAssistant, domainIcon } from 'custom-card-helpers';
import { Unique, isDefined, sortAlphabetically } from '../helpers';

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
        icon: EArmModeIcons.ArmedHome,
      };
    case EArmModes.ArmedNight:
      return {
        value: EArmModes.ArmedNight,
        name: localize('common.modes_long.armed_night', hass.language),
        icon: EArmModeIcons.ArmedNight,
      };
    case EArmModes.ArmedCustom:
      return {
        value: EArmModes.ArmedCustom,
        name: localize('common.modes_long.armed_custom_bypass', hass.language),
        icon: EArmModeIcons.ArmedCustom,
      };
  }
};

export const computeEventDisplay = (event: EAlarmEvent, hass: HomeAssistant) => {
  switch (event) {
    case EAlarmEvent.Armed:
      return {
        value: EAlarmEvent.Armed,
        name: localize('panels.actions.cards.new_notification.fields.event.choose.armed.name', hass.language),
        description: localize(
          'panels.actions.cards.new_notification.fields.event.choose.armed.description',
          hass.language
        ),
        icon: 'hass:shield-check-outline',
      };
    case EAlarmEvent.Disarmed:
      return {
        value: EAlarmEvent.Disarmed,
        name: localize('panels.actions.cards.new_notification.fields.event.choose.disarmed.name', hass.language),
        description: localize(
          'panels.actions.cards.new_notification.fields.event.choose.disarmed.description',
          hass.language
        ),
        icon: 'hass:shield-off-outline',
      };
    case EAlarmEvent.Triggered:
      return {
        value: EAlarmEvent.Triggered,
        name: localize('panels.actions.cards.new_notification.fields.event.choose.triggered.name', hass.language),
        description: localize(
          'panels.actions.cards.new_notification.fields.event.choose.triggered.description',
          hass.language
        ),
        icon: 'hass:bell-alert-outline',
      };
    case EAlarmEvent.ArmFailure:
      return {
        value: EAlarmEvent.ArmFailure,
        name: localize('panels.actions.cards.new_notification.fields.event.choose.arm_failure.name', hass.language),
        description: localize(
          'panels.actions.cards.new_notification.fields.event.choose.arm_failure.description',
          hass.language
        ),
        icon: 'hass:alert-outline',
      };
    case EAlarmEvent.Arming:
      return {
        value: EAlarmEvent.Arming,
        name: localize('panels.actions.cards.new_notification.fields.event.choose.arming.name', hass.language),
        description: localize(
          'panels.actions.cards.new_notification.fields.event.choose.arming.description',
          hass.language
        ),
        icon: 'hass:home-export-outline',
      };
    case EAlarmEvent.Pending:
      return {
        value: EAlarmEvent.Pending,
        name: localize('panels.actions.cards.new_notification.fields.event.choose.pending.name', hass.language),
        description: localize(
          'panels.actions.cards.new_notification.fields.event.choose.pending.description',
          hass.language
        ),
        icon: 'hass:home-import-outline',
      };
  }
};

export const computeAreaDisplay = (
  area: string | number,
  areaConfig: Dictionary<AlarmoArea>,
  alarmoConfig: AlarmoConfig
) => {
  if (area == 0) {
    return {
      name: alarmoConfig.master.name,
      value: 0,
    };
  } else if (Object.keys(areaConfig).includes(String(area))) {
    return {
      name: areaConfig[area].name,
      value: area,
    };
  } else {
    return {
      name: String(area),
      value: area,
    };
  }
};

export const computeServiceDisplay = (hass: HomeAssistant, ...services: (string | undefined)[]) => {
  const output = services
    .map(service => {
      if (!service) return null;
      const domain = computeDomain(service);
      const domainService = computeEntity(service);

      let data = {
        value: service,
        name: domainService
          .replace(/_/g, ' ')
          .split(' ')
          .map(e => e.substring(0, 1).toUpperCase() + e.substring(1))
          .join(' '),
        icon: 'hass:home',
        description: service,
      };

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
  output.sort(sortAlphabetically);

  return output;
};

export const getAreaOptions = (areaConfig: Dictionary<AlarmoArea>, alarmoConfig: AlarmoConfig) => {
  let areas: (string | number)[] = [];

  const area_ids = Object.keys(areaConfig).filter(e => Object.values(areaConfig[e].modes).some(v => v.enabled));

  if (alarmoConfig.master.enabled && area_ids.length > 1) areas = [...areas, 0];

  areas = [...areas, ...area_ids];
  return areas;
};

export const getArmModeOptions = (area: string | number | undefined, areaConfig: Dictionary<AlarmoArea>) => {
  const areaList = (areaCfg: AlarmoArea) =>
    (Object.keys(areaCfg.modes) as EArmModes[]).filter(mode => areaCfg.modes[mode].enabled);

  if (!isDefined(area) || !Object.keys(areaConfig).includes(String(area))) {
    const modeLists = Object.keys(areaConfig).map(e => areaList(areaConfig[e]));
    return modeLists[0].filter(e => modeLists.every(m => m.includes(e)));
  } else {
    return areaList(areaConfig[area]);
  }
};

export const computeEntityDisplay = (entity_id: string[], hass: HomeAssistant) => {
  const data = entity_id.map(e => {
    const output = {
      value: e,
      name: e in hass.states ? hass.states[e].attributes.friendly_name || computeEntity(e) : e,
      icon: e in hass.states ? hass.states[e].attributes.icon || domainIcon(computeDomain(e)) : undefined,
      description: e,
    };
    return output;
  });

  return data;
};

export const getNotifyServices = (hass: HomeAssistant) => [
  ...Object.keys(hass.services.notify).map(service => `notify.${service}`),
];

export const computeMergedActions = (...actionLists: string[][]) => {
  if (!actionLists.length || !actionLists.every(e => e.length)) return [];
  if (actionLists.length == 1 && actionLists[0].length > 1 && Unique(actionLists[0].map(computeDomain)).length > 1)
    return computeMergedActions(...actionLists[0].map(e => Array(e)));
  let intersection = [...actionLists[0]];
  actionLists.forEach(list => {
    intersection = intersection
      .map(e => {
        if (list.includes(e)) return e;
        else if (computeDomain(e) == 'script' && list.map(computeDomain).includes('script')) return `script.script`;
        else if (list.map(computeEntity).includes(computeEntity(e))) return `homeassistant.${computeEntity(e)}`;
        else return null;
      })
      .filter(isDefined);
  });
  return intersection;
};

export const computeActions = (
  entity_id: string | undefined | (string | undefined)[],
  hass: HomeAssistant
): string[] => {
  if (Array.isArray(entity_id)) {
    const actionLists = entity_id.map(e => computeActions(e, hass));
    return computeMergedActions(...actionLists);
  } else if (!isDefined(entity_id)) return [];

  const domain = computeDomain(entity_id);
  switch (domain) {
    case 'light':
    case 'switch':
    case 'input_boolean':
    case 'siren':
      return [`${domain}.turn_on`, `${domain}.turn_off`];
    case 'script':
      return [entity_id];
    case 'lock':
      return ['lock.lock', 'lock.unlock'];
    case 'group':
      const groupObj = entity_id in hass.states ? hass.states[entity_id] : undefined;
      const entities: string[] = groupObj?.attributes.entity_id || [];
      return computeActions(entities, hass);
    default:
      return [];
  }
};

export const getAutomationEntities = (hass: HomeAssistant, additionalEntities?: string[]) => {
  let entities = [...Object.keys(hass.states).filter(e => computeActions(e, hass).length)];

  if (additionalEntities && additionalEntities.length) {
    entities = [...entities, ...additionalEntities.filter(e => !entities.includes(e))];
  }

  entities.sort(sortAlphabetically);
  return entities;
};

export const getWildcardOptions = (event?: EAlarmEvent, alarmoConfig?: AlarmoConfig) => {
  let options: { name: string; value: string }[] = [];

  options = [];

  if (!event || [EAlarmEvent.Pending, EAlarmEvent.Triggered, EAlarmEvent.ArmFailure].includes(event))
    options = [
      ...options,
      {
        name: 'Open Sensors',
        value: '{{open_sensors}}',
      },
    ];

  if (!event || [EAlarmEvent.Armed].includes(event))
    options = [
      ...options,
      {
        name: 'Bypassed Sensors',
        value: '{{bypassed_sensors}}',
      },
    ];

  if (!event ||
    (alarmoConfig?.code_arm_required && [EAlarmEvent.Armed, EAlarmEvent.Arming, EAlarmEvent.ArmFailure].includes(event)) ||
    (alarmoConfig?.code_disarm_required && [EAlarmEvent.Disarmed].includes(event))
  )
    options = [
      ...options,
      {
        name: 'Changed By',
        value: '{{changed_by}}',
      },
    ];

  if (
    !event ||
    [
      EAlarmEvent.Armed,
      EAlarmEvent.Arming,
      EAlarmEvent.Pending,
      EAlarmEvent.Triggered,
      EAlarmEvent.ArmFailure,
    ].includes(event)
  )
    options = [
      ...options,
      {
        name: 'Arm Mode',
        value: '{{arm_mode}}',
      },
    ];

  return options;
};

export const getOpenSensorsWildCardOptions = (hass: HomeAssistant) => {
  let options: { value: string, name: string }[] = [];

  if (hass.language != 'en')
    options = [
      ...options,
      {
        value: '{{open_sensors}}',
        name: `${localize('panels.actions.cards.new_notification.fields.open_sensors_format.options.default', hass.language)} (${hass.translationMetadata.translations['en'].nativeName})`
      },
      {
        value: `{{open_sensors|lang=${hass.language}}}`,
        name: `${localize('panels.actions.cards.new_notification.fields.open_sensors_format.options.default', hass.language)} (${hass.translationMetadata.translations[hass.language].nativeName})`
      }
    ];
  else
    options = [
      ...options,
      {
        value: '{{open_sensors}}',
        name: localize('panels.actions.cards.new_notification.fields.open_sensors_format.options.default', hass.language)
      }
    ];

  options = [
    ...options,
    {
      value: '{{open_sensors|format=short}}',
      name: localize('panels.actions.cards.new_notification.fields.open_sensors_format.options.short', hass.language)
    }
  ];

  return options;
}

export const getArmModeWildCardOptions = (hass: HomeAssistant) => {
  let options: { value: string, name: string }[] = [
    {
      value: '{{arm_mode}}',
      name: hass.translationMetadata.translations['en'].nativeName
    }
  ];

  if (hass.language != 'en')
    options = [
      ...options,
      {
        value: `{{arm_mode|lang=${hass.language}}}`,
        name: hass.translationMetadata.translations[hass.language].nativeName
      }
    ];
  return options;
}

export const isValidString = (input: any) => {
  return typeof input == 'string' && input.trim().length;
};

export const isValidService = (input: any, hass: HomeAssistant) => {
  return (
    isValidString(input) &&
    hass.services[computeDomain(input)] &&
    hass.services[computeDomain(input)][computeEntity(input)]
  );
};

export const isValidEntity = (input: any, hass: HomeAssistant) => {
  return isValidString(input) && hass.states[input];
};

export const isObject = (input: any) => typeof input === 'object' && input !== null && !Array.isArray(input);

export const isArray = (input: any) => typeof input === 'object' && input !== null && Array.isArray(input);

export const isString = (input: any) => typeof input === 'string';

export const computeActionDisplay = (action: string, hass: HomeAssistant) => {
  let service = computeEntity(action);
  if (computeDomain(action) == 'script') service = 'run';

  switch (service) {
    case 'turn_on':
      return hass.localize('ui.card.media_player.turn_on');
    case 'turn_off':
      return hass.localize('ui.card.media_player.turn_off');
    case 'lock':
      return hass.localize('ui.card.lock.lock');
    case 'unlock':
      return hass.localize('ui.card.lock.unlock');
    case 'run':
      return hass.localize('ui.card.script.run');
    default:
      return service;
  }
};

export const findMatchingAction = (actionList: string[], matchedAction: string) => {
  return actionList.find(action => {
    return (
      action == matchedAction ||
      (computeEntity(matchedAction) == 'turn_on' && computeEntity(action) == 'turn_on') ||
      (computeEntity(matchedAction) == 'turn_off' && computeEntity(action) == 'turn_off') ||
      (computeDomain(matchedAction) == 'script' && computeDomain(action) == 'script')
    );
  });
};
