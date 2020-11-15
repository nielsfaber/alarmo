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
    value: EAlarmEvents.Failure,
    trigger: {
      event: EAlarmEvents.Failure
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
  name: "My notification",
  triggers: [],
  actions: [
    {
      service: "",
      service_data: {
        title: "Message from Alarmo",
        message: "My message",
      }
    }
  ]
}

// export function exportData(oldData: AlarmoNotification, data: notificationFormData, hass: HomeAssistant) {
//   let output = { ...oldData };



//   // const service_data = { ...data.args, title: data.title, message: data.message };

//   // let output: AlarmoNotification = {
//   //   name: data.name,
//   //   triggers: data.triggers.length
//   //     ? data.triggers.map(val => triggerOptions(hass).find(e => e.value == val)!.trigger)
//   //     : [
//   //       { state: "" }
//   //     ],
//   //   actions: data.targets.length
//   //     ? data.targets.map(target => Object({
//   //       service: target,
//   //       service_data: service_data
//   //     }))
//   //     :
//   //     [
//   //       {
//   //         service: "",
//   //         service_data: service_data
//   //       }
//   //     ],
//   // };

//   return output;
// }

// export function importFormdata(data: AlarmoNotification, hass: HomeAssistant) {
//   let output: notificationFormData = {
//     name: data.name || "",
//     triggers: data.triggers.filter(trigger =>
//       triggerOptions(hass)
//         .find(e => JSON.stringify(e.trigger) == JSON.stringify(trigger))
//     ).map(trigger =>
//       triggerOptions(hass)
//         .find(e => JSON.stringify(e.trigger) == JSON.stringify(trigger))!.value
//     ),
//     title: data.actions[0].service_data.title || "",
//     message: data.actions[0].service_data.message,
//     targets: data.actions.map(action => {
//       const res = targetOptions(hass)
//         .find(e => JSON.stringify(e.value) == JSON.stringify(action.service));
//       return res ? res : action.service
//     }),
//     args: 
//   };
// }

// export function importYaml(data: any, hass: HomeAssistant) {
//   let output: AlarmoNotification = {
//     name: defaultNotificationData.name,
//     triggers: [],
//     actions: []
//   };

//   function has(obj: any, prop: string) {
//     return typeof obj == "object" && obj.hasOwnProperty(prop);
//   }

//   function is(obj: any, type: string) {
//     if (type == "array") return Array.isArray(obj);
//     else if (type == "object") return typeof obj == "object";
//     return false;
//   }

//   if (has(data, "name")) output = { ...output, name: String(data.name) };
//   if (has(data, "triggers") && is(data.triggers, "array")) {
//     let triggers: Trigger[] = [];
//     data.triggers.forEach(trigger => {
//       if (has(trigger, "state")) triggers.push({ state: String(trigger.state) });
//       else if (has(trigger, "event")) triggers.push({ event: String(trigger.event) });
//     });
//     output = { ...output, triggers: triggers };
//   }
//   if (has(data, "actions") && is(data.actions, "array")) {
//     let actions: NotificationAction[] = [];
//     data.actions.forEach((action: any) => {
//       let my_action: NotificationAction = {
//         service: "",
//         service_data: {
//           message: "",
//         }
//       };
//       if (has(action, "service")) my_action = { ...my_action, service: String(action.service) };
//       if (has(action, "service_data") && is(action.service_data, "object")) {
//         my_action = {
//           ...my_action,
//           service_data: {
//             ...my_action.service_data,
//             ...omit(action.service_data, ['message']),

//             message: has(action.service_data, "message")
//               ? action.service_data.message
//               : my_action.service_data.message
//           }
//         };
//       };
//       actions.push(action);
//     });
//     output = { ...output, actions: actions };
//   };

//   return importFormdata(output, hass);
