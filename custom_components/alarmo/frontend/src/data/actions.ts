import { EAlarmStates, EAlarmEvents, AlarmoNotification, Dictionary, Trigger, NotificationAction, AlarmoAutomation, EArmModes } from "../types";
import { HomeAssistant, computeDomain, computeEntity } from "custom-card-helpers";
import { omit } from "../helpers";
import { localize } from "../../localize/localize";


export const triggerOptions = (_hass: HomeAssistant) => [
  {
    value: EAlarmStates.Armed,
    trigger: {
      state: EAlarmStates.Armed
    },
    name: "Alarm is armed",
  },
  {
    value: EAlarmStates.Disarmed,
    trigger: {
      state: EAlarmStates.Disarmed
    },
    name: "Alarm is disarmed",
  },
  {
    value: EAlarmStates.Triggered,
    trigger: {
      state: EAlarmStates.Triggered
    },
    name: "Alarm is triggered",
  },
  {
    value: EAlarmEvents.ArmFailure,
    trigger: {
      event: EAlarmEvents.ArmFailure
    },
    name: "Failed to arm",
  },
  {
    value: EAlarmStates.Arming,
    trigger: {
      state: EAlarmStates.Arming
    },
    name: "Leave delay started",
  },
  {
    value: EAlarmStates.Pending,
    trigger: {
      state: EAlarmStates.Pending
    },
    name: "Entry delay started",
  }
];

export const targetOptions = (hass: HomeAssistant) => Object.keys(hass.services.notify)
  .map(e => Object({
    value: `notify.${e}`,
    name: e
  }));


export type notificationFormData = {
  name: string
  triggers: string[],
  title: string,
  message: string,
  targets: string[],
  args: Dictionary<any>,
}

export const defaultNotificationData: AlarmoNotification = {
  name: "",
  triggers: [],
  actions: [
    {
      service: "",
      service_data: {
        title: "",
        message: "",
      }
    }
  ]
}

export const defaultAutomationData: AlarmoAutomation = {
  name: "",
  triggers: [],
  actions: [
    {
      service: "",
      service_data: {
      }
    }
  ]
}

export function messagePlaceHolder(data: AlarmoNotification) {
  if (data.triggers.length != 1) return "";

  if (data.triggers[0].state) {
    switch (data.triggers[0].state) {
      case EAlarmStates.Armed:
        return "The alarm is now ON."
      case EAlarmStates.Disarmed:
        return "The alarm is now OFF."
      case EAlarmStates.Arming:
        return "The alarm will be armed soon, please leave the house."
      case EAlarmStates.Pending:
        return "The alarm is about to trigger, disarm it quickly!"
      case EAlarmStates.Triggered:
        return "The alarm is triggered! Cause: {{open_sensors}}."
      default:
        return "";
    }
  }
  else if (data.triggers[0].event) {
    switch (data.triggers[0].event) {
      case EAlarmEvents.ArmFailure:
        return "The alarm could not be armed right now, due to: {{open_sensors}}."
      default:
        return "";
    }
  }

  return "";
}

export const ActionDomains = [
  "switch",
  "input_boolean",
  "light",
  "script",
];

export function validateData(data: AlarmoAutomation, hass: HomeAssistant) {
  if (!data.triggers.length) return localize("panels.actions.validation_errors.no_triggers", hass.language);

  for (let i = 0; i < data.triggers.length; i++) {
    const trigger = data.triggers[i];
    if (!trigger.event && !trigger.state) return localize("panels.actions.validation_errors.empty_trigger", hass.language);
    if (!triggerOptions(hass).find(e => JSON.stringify(e.trigger) === JSON.stringify(trigger))) return localize("panels.actions.validation_errors.invalid_trigger", hass.language, "{trigger}", JSON.stringify(trigger));
  };

  if (data.modes !== undefined && data.modes.length) {
    for (let i = 0; i < data.modes.length; i++) {
      const mode = data.modes[i];
      if (!Object.values(EArmModes).includes(mode)) return localize("panels.actions.validation_errors.empty_trigger", hass.language, "{mode}", mode);
    }
  }
  if (!data.actions.length) return localize("panels.actions.validation_errors.no_actions", hass.language);
  for (let i = 0; i < data.actions.length; i++) {
    const action = data.actions[i];
    if (!action.service) return localize("panels.actions.validation_errors.no_service", hass.language);
    if (!Object.keys(hass.services).includes(computeDomain(action.service))) return localize("panels.actions.validation_errors.invalid_service", hass.language, "{service}", action.service);
    if (!Object.keys(hass.services[computeDomain(action.service)]).includes(computeEntity(action.service))) return localize("panels.actions.validation_errors.invalid_service", hass.language, "{service}", action.service);
    if (!action.service_data || !Object.keys(action.service_data).length) return localize("panels.actions.validation_errors.no_service_data", hass.language);
    if (!Object.keys(action.service_data).includes('entity_id')) return localize("panels.actions.validation_errors.no_entity_in_service_data", hass.language);
  };

  return;
}