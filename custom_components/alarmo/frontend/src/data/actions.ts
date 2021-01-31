import { EAlarmStates, EAlarmEvents, AlarmoNotification, Dictionary, AlarmoAutomation, EArmModes } from '../types';
import { HomeAssistant, computeDomain, computeEntity } from 'custom-card-helpers';
import { localize } from '../../localize/localize';

export const triggerOptions = (hass: HomeAssistant) => [
  {
    value: EAlarmStates.Armed,
    name: localize('panels.actions.cards.new_notification.fields.event.choose.armed.name', hass.language),
    description: localize('panels.actions.cards.new_notification.fields.event.choose.armed.description', hass.language),
    icon: 'hass:shield-check-outline',
    trigger: {
      state: EAlarmStates.Armed,
    },
  },
  {
    value: EAlarmStates.Disarmed,
    name: localize('panels.actions.cards.new_notification.fields.event.choose.disarmed.name', hass.language),
    description: localize(
      'panels.actions.cards.new_notification.fields.event.choose.disarmed.description',
      hass.language
    ),
    icon: 'hass:shield-off-outline',
    trigger: {
      state: EAlarmStates.Disarmed,
    },
  },
  {
    value: EAlarmStates.Triggered,
    name: localize('panels.actions.cards.new_notification.fields.event.choose.triggered.name', hass.language),
    description: localize(
      'panels.actions.cards.new_notification.fields.event.choose.triggered.description',
      hass.language
    ),
    icon: 'hass:bell-alert-outline',
    trigger: {
      state: EAlarmStates.Triggered,
    },
  },
  {
    value: EAlarmEvents.ArmFailure,
    name: localize('panels.actions.cards.new_notification.fields.event.choose.arm_failure.name', hass.language),
    description: localize(
      'panels.actions.cards.new_notification.fields.event.choose.arm_failure.description',
      hass.language
    ),
    icon: 'hass:alert-outline',
    trigger: {
      event: EAlarmEvents.ArmFailure,
    },
  },
  {
    value: EAlarmStates.Arming,
    name: localize('panels.actions.cards.new_notification.fields.event.choose.arming.name', hass.language),
    description: localize(
      'panels.actions.cards.new_notification.fields.event.choose.arming.description',
      hass.language
    ),
    icon: 'hass:home-export-outline',
    trigger: {
      state: EAlarmStates.Arming,
    },
  },
  {
    value: EAlarmStates.Pending,
    name: localize('panels.actions.cards.new_notification.fields.event.choose.pending.name', hass.language),
    description: localize(
      'panels.actions.cards.new_notification.fields.event.choose.pending.description',
      hass.language
    ),
    icon: 'hass:home-import-outline',
    trigger: {
      state: EAlarmStates.Pending,
    },
  },
];

export function targetOptions(hass: HomeAssistant) {
  const list = Object.keys(hass.services.notify).map(e => {
    let data = {
      value: `notify.${e}`,
      name: e,
    };
    const stateObj = hass.states[`device_tracker.${e.replace('mobile_app_', '')}`];
    if (stateObj) data = { ...data, name: stateObj.attributes.friendly_name || computeEntity(stateObj.entity_id) };
    return data;
  });

  list.sort((a, b) => (a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1));
  return list;
}

export type notificationFormData = {
  name: string;
  triggers: string[];
  title: string;
  message: string;
  targets: string[];
  args: Dictionary<any>;
};

export const defaultNotificationData: AlarmoNotification = {
  name: '',
  triggers: [],
  actions: [
    {
      service: '',
      service_data: {
        message: '',
      },
    },
  ],
};

export const defaultAutomationData: AlarmoAutomation = {
  name: '',
  triggers: [],
  actions: [
    {
      service: '',
      service_data: {},
    },
  ],
};

export function messagePlaceHolder(data: AlarmoNotification) {
  if (data.triggers.length != 1) return '';

  if (data.triggers[0].state) {
    switch (data.triggers[0].state) {
      case EAlarmStates.Armed:
        return 'The alarm is now ON.';
      case EAlarmStates.Disarmed:
        return 'The alarm is now OFF.';
      case EAlarmStates.Arming:
        return 'The alarm will be armed soon, please leave the house.';
      case EAlarmStates.Pending:
        return 'The alarm is about to trigger, disarm it quickly!';
      case EAlarmStates.Triggered:
        return 'The alarm is triggered! Cause: {{open_sensors}}.';
      default:
        return '';
    }
  } else if (data.triggers[0].event) {
    switch (data.triggers[0].event) {
      case EAlarmEvents.ArmFailure:
        return 'The alarm could not be armed right now, due to: {{open_sensors}}.';
      default:
        return '';
    }
  }

  return '';
}

export const ActionDomains = ['switch', 'input_boolean', 'light', 'script'];

export function validateData(data: AlarmoAutomation | AlarmoNotification, hass: HomeAssistant) {
  if (!data.triggers.length) return localize('panels.actions.validation_errors.no_triggers', hass.language);

  for (let i = 0; i < data.triggers.length; i++) {
    const trigger = data.triggers[i];
    if (!trigger.event && !trigger.state)
      return localize('panels.actions.validation_errors.empty_trigger', hass.language);
    if (!triggerOptions(hass).find(e => JSON.stringify(e.trigger) === JSON.stringify(trigger)))
      return localize(
        'panels.actions.validation_errors.invalid_trigger',
        hass.language,
        '{trigger}',
        JSON.stringify(trigger)
      );
  }

  if (data.modes !== undefined && data.modes.length) {
    for (let i = 0; i < data.modes.length; i++) {
      const mode = data.modes[i];
      if (!Object.values(EArmModes).includes(mode))
        return localize('panels.actions.validation_errors.empty_trigger', hass.language, '{mode}', mode);
    }
  }
  if (!data.actions.length) return localize('panels.actions.validation_errors.no_actions', hass.language);
  for (let i = 0; i < data.actions.length; i++) {
    const action = data.actions[i];
    if (!action.service) return localize('panels.actions.validation_errors.no_service', hass.language);
    if (!Object.keys(hass.services).includes(computeDomain(action.service)))
      return localize('panels.actions.validation_errors.invalid_service', hass.language, '{service}', action.service);
    if (!Object.keys(hass.services[computeDomain(action.service)]).includes(computeEntity(action.service)))
      return localize('panels.actions.validation_errors.invalid_service', hass.language, '{service}', action.service);
    if (!action.service_data || !Object.keys(action.service_data).length)
      return localize('panels.actions.validation_errors.no_service_data', hass.language);
    if (data.is_notification) {
      if (!Object.keys(action.service_data).includes('message') || !action.service_data.message.length)
        return localize('panels.actions.validation_errors.no_message_in_service_data', hass.language);
    } else {
      if (!Object.keys(action.service_data).includes('entity_id'))
        return localize('panels.actions.validation_errors.no_entity_in_service_data', hass.language);
    }
  }

  return;
}
