import { EAlarmStates, EAlarmEvents, AlarmoNotification, Dictionary, Trigger, NotificationAction } from "../types";
import { HomeAssistant } from "custom-card-helpers";
import { omit } from "../helpers";


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