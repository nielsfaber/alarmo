# Alarmo
[![hacs_badge](https://img.shields.io/badge/HACS-Default-orange.svg)](https://github.com/hacs/integration)

This is an alarm system integration for Home Assistant. It provides a user interface for setting up your own alarm system completely from the browser.

- [Alarmo](#alarmo)
  - [Introduction](#introduction)
    - [Features](#features)
    - [Preview](#preview)
  - [Installation](#installation)
  - [Updating](#updating)
  - [Uninstalling](#uninstalling)
  - [Usage](#usage)
    - [Alarm functionality](#alarm-functionality)
    - [Arm modes](#arm-modes)
    - [Alarmo entity](#alarmo-entity)
      - [States](#states)
      - [Attributes](#attributes)
      - [Commands](#commands)
    - [Areas](#areas)
    - [Alarm Master](#alarm-master)
        - [States](#states-1)
        - [Commands](#commands-1)
    - [Sensor configuration](#sensor-configuration)
      - [Sensor types](#sensor-types)
      - [Configuration options](#configuration-options)
      - [Sensor groups](#sensor-groups)
    - [Codes and users](#codes-and-users)
      - [Codes](#codes)
    - [MQTT](#mqtt)
      - [State topic](#state-topic)
      - [Event topic](#event-topic)
      - [Command topic](#command-topic)
      - [Multiple area usage](#multiple-area-usage)
    - [Automations](#automations)
      - [Push notifications](#push-notifications)
        - [Wildcards](#wildcards)
        - [Actionable notifications](#actionable-notifications)
      - [Actions](#actions)
        - [Switching a device](#switching-a-device)
        - [Advanced actions](#advanced-actions)
      - [Automatic arming](#automatic-arming)
    - [Alarmo-card](#alarmo-card)
  - [Third party platforms](#third-party-platforms)
    - [Android MQTT Alarm Panel](#android-mqtt-alarm-panel)
    - [Apple Homekit](#apple-homekit)
    - [Google Home](#google-home)
  - [Say thank you](#say-thank-you)


## Introduction
This is an integration for the `alarm_control_panel` domain in HA.
It allows to combine existing sensors for creating a security system for your house. 
The integration is comparable with the [Manual Alarm](https://www.home-assistant.io/integrations/manual/) in HA, but also has some additional features that makes it easier to use. 

Alarmo consists of 3 parts:
* Alarmo component: a custom component for HA that controls the states of the alarm panel entities in HA.
* Alarmo panel: a GUI for configuring the settings of your alarm (sensors, delays, actions etc.)
* Alarmo card: a custom card for arming / disarming the alarm.

### Features
* Fully compatible with Home Assistant and the [Alarm Panel Card](https://www.home-assistant.io/lovelace/alarm-panel/).
* Has an integrated panel for complete management via UI (no YAML required).
* No restarts required when making changes.
* Can set up to 4 arm modes (*armed_away*, *armed_home*, *armed_night*, *armed_custom_bypass*), each with configurable delays and security perimeter.
* Supports configuring your existing HA entities as security sensors. These sensors will be watched automatically. 
* Allows setting up multiple users with individual pincode and permission levels.
* Will restore its previous state after restart of HA.
* Built-in actions: receive push notifications when anything changes in the alarm, activate a siren when the alarm is triggered, etc.
* Supports splitting up your house security system into multiple areas which can be armed independently.

### Preview

![](https://raw.githubusercontent.com/nielsfaber/alarmo/main/screenshots/Preview.png)


## Installation

[![Open your Home Assistant instance and open a repository inside the Home Assistant Community Store.](https://my.home-assistant.io/badges/hacs_repository.svg)](https://my.home-assistant.io/redirect/hacs_repository/?owner=nielsfaber&repository=alarmo&category=integration)

<details>
<summary>Click to show installation instructions</summary>
<ol>
<li>Install files:</li>
<ul>
<li><u>Using HACS:</u><br>
In the HACS panel, go to integrations and click the big orange '+' button. 
Search for 'Alarmo' and click 'Install this repository in HACS'.</li>
<li><u>Manually:</u><br>
Download the <a href="https://github.com/nielsfaber/alarmo/releases">latest release</a> as a zip file and extract it into the `custom_components` folder in your HA installation.</li>
</ul>
<li>Restart HA to load the integration into HA.</li>
<li>Go to Configuration -> Integrations and click the big orange '+' button. Look for Alarmo and click to add it.</li>
<li>The Alarmo integration is ready for use. You can find the configuration panel in the menu on the left.</li>
</ol>
</details>

## Updating

<details>
<summary>Click to show updating instructions</summary>
<ol>
<li>Update the files:
<ul>
<li><u>Using HACS:</u><br>
In the HACS panel, there should be an notification when a new version is available. Follow the instructions within HACS to update the installation files.
</li>
<li><u>Manually:</u><br>
Download the <a href="https://github.com/nielsfaber/alarmo/releases">latest release</a> as a zip file and extract it into the <code>custom_components</code> folder in your HA installation, overwriting the previous installation.
</li>
</ul>
<li>Restart HA to load the changes.</li>
<li>(Optional) Verify the version number.
<ul>
<li><u>Verify version of the backend</u>:<br>
In HA, go to Configuration -> Integrations. In the Alarmo card, you should see a link with '1 device', click it. In the table click the 'Alarmo' device, and you should see the Device info. The 'firmware version' represents the installed version number.
</li>
<li><u>Verify version of the frontend</u>:<br>
In the Alarmo configuration panel, the version number is displayed in the top right. If the version does not match with the backend version, your browser has an outdated version stored in the cache. <br>
To clear the cache, you should do a <a href="https://refreshyourcache.com/en/cache/">force refresh</a> of your browser.

</li>
</ul>
</li>
</ol>

</details>

## Uninstalling

<details>
<summary>Click to show uninstall instructions</summary>
<ol>
<li><u>Remove Alarmo from HA:</u><br>
In HA go to Configuration -> Integrations. In the Alarmo card, click the button with the 3 dots, and click 'Delete'.
</li>
<li>Remove the files:
<ul>
<li>
<u>When installed with HACS:</u><br>
In the HACS panel go to integrations and look for Alarmo.
Click the button with the 3 dots and click 'Uninstall'.
</li>
<li>
<u>When installed manually:</u><br>
In the <code>custom_components</code> directory, remove the 'alarmo' folder.
</li>
</ul>
</li>
<li>Restart HA to make all traces of the component dissapear.
</li>
</ol>
</details>
  
## Usage

### Alarm functionality
The following diagram describes the operational states of the alarm and provides a simplified overview of the functionality.

![](https://raw.githubusercontent.com/nielsfaber/alarmo/main/screenshots/states.png)


### Arm modes
The alarm can be activated (armed) in a certain *mode*. This mode defines a certain set of sensors and represents the security zone (or perimeter).

The following modes are supported:
* Armed away
* Armed night
* Armed home
* Armed vacation
* Armed custom bypass (let's just call it *armed custom* from now on)

In the tab *general* you can find the settings for each mode.
There are flip switches to enable/disable modes.

### Alarmo entity

After installing Alarmo the entity `alarm_control_panel.alarmo` shall be added to HA.
You can use this entity together with the [Alarm panel card](#lovelace-alarm-panel-card), or in conjuction with automations to automatically arm/disarm the alarm.

#### States
The Alarmo entity follows the state definitions as defined by HA:


| State                      | Description                                                                              |
| -------------------------- | ---------------------------------------------------------------------------------------- |
| `disarmed`                 | The alarm is disabled/off.                                                               |
| `arming`                   | The alarm is arming.<br>After the leave delay has expired, the alarm will be armed.      |
| `armed_away`               | The alarm is armed in away mode.                                                         |
| `armed_home`               | The alarm is armed in home mode.                                                         |
| `armed_night`              | The alarm is armed in night mode.                                                        |
| `armed_vacation`           | The alarm is armed in vacation mode.                                                     |
| `armed_custom_bypass`      | The alarm is armed in custom mode.                                                       |
| `pending`                  | The alarm is pending.<br>After the entry delay has expired, the alarm will be triggered. |
| `triggered`                | The alarm is triggered.                                                                  |
| `unavailable`<br>`unknown` | Something is wrong.<br>Check the logs for more information.                              |

#### Attributes

The Alarmo entity defines the following attributes:

| Attribute          | Default value           | Example value when set         | Description                                                                                                                                                                                                                                                                                                                                                                                                                      |
| ------------------ | ----------------------- | ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `arm_mode`         | `null`                  | `armed_away`                   | The current active arm mode.<br> Defined in all states except `disarmed`.                                                                                                                                                                                                                                                                                                                                                        |
| `next_state`       | (same as current state) | `armed_away`                   | When alarm is in state `arming`: `next_state` is equal to the `arm_mode`.<br>When alarm is in state `pending`: `next_state` is `triggered`. <br>When alarm is in state `triggered`: `next_state` is `triggered` (if no trigger time is configured), `disarmed` (if 'disarm after triggering' setting is enabled) or equal to the `arm_mode` (otherwise).<br>In other cases, the `next_state` will be equal to the current state. |
| `changed_by`       | `null`                  | `Niels`                        | User who last armed or disarmed the alarm.<br> Detected from the entered code.<br> Cleared when alarm is armed or disarmed without a code.                                                                                                                                                                                                                                                                                       |
| `open_sensors`     | `null`                  | `{binary_sensor.backdoor: on}` | Dictionary of sensors with their entity-ID + state, that caused the alarm to change state.<br>Set when arming attempt failed (due to one or more sensors).<br>Set when alarm is triggered (only first sensor that caused the triggering is stored).                                                                                                                                                                              |
| `bypassed_sensors` | `null`                  | `[binary_sensor.backdoor]`     | List of sensors that are temporarily excluded from the alarm, due to arming in force.                                                                                                                                                                                                                                                                                                                                            |
| `delay`            | `null`                  | 30                             | Duration of the exit or entry delay. Only set in the `arming` and `pending` states, `null` otherwise.                                                                                                                                                                                                                                                                                                                            |

#### Commands
The Alarmo entities support the following commands:

| Command             | Description                                  | Conditions                                                                                                                                                     |
| ------------------- | -------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ARM_AWAY`          | Arm the alarm in mode `armed_away`.          | - The entity has the mode `away` enabled.<br>- The current alarm state is `disarmed`, `armed_home`, `armed_night`, `armed_vacation`  or `armed_custom_bypass`. |
| `ARM_HOME`          | Arm the alarm in mode `armed_home`.          | - The entity has the mode `home` enabled.<br>- The current alarm state is `disarmed`, `armed_away`, `armed_night`, `armed_vacation` or `armed_custom_bypass`.  |
| `ARM_NIGHT`         | Arm the alarm in mode `armed_night`.         | - The entity has the mode `night` enabled.<br>- The current alarm state is `disarmed`, `armed_away`, `armed_home`, `armed_vacation` or `armed_custom_bypass`.  |
| `ARM_VACATION`      | Arm the alarm in mode `armed_vacation`.      | - The entity has the mode `vacation` enabled.<br>- The current alarm state is `disarmed`, `armed_away`, `armed_home`, `armed_night` or `armed_custom_bypass`.  |
| `ARM_CUSTOM_BYPASS` | Arm the alarm in mode `armed_custom_bypass`. | - The entity has the mode `custom` enabled.<br>- The current alarm state is `disarmed`, `armed_away`, `armed_home`, `armed_vacation` or `armed_night`.         |
| `DISARM`            | Disarm the alarm.                            | - The current alarm state is not `disarmed`                                                                                                                    |

### Areas
An area is a physical compartment of your house, such as a garage, 1st floor of the house, garden, etc.
Alarmo will create an `alarm_control_panel` entity for each area which can be armed and disarmed independently. An area has its own set of sensors and can have dedicated configuration for arm modes, exit/entry times and automations.

In the *general* tab of the Alarmo configuration UI, there is a card showing the areas in your setup. 
You can add additional areas, as well as rename or remove existing areas.
Alarmo requires at least 1 area to be set up to be functional. 

The name of an area defines the entity ID as well. 
The entity will be instantly renamed after saving.

**Warning**: renaming an area changes the entity ID, which might break your Lovelace cards and automations outside of Alarmo, so treat it with care.


### Alarm Master
Alarmo has the option for enabling an alarm master.
The option appears in the *general* tab in *general settings* if you have multiple areas defined.

The alarm master is meant for operating your areas synchronously. 
An extra `alarm_control_panel` entity is created for the master, which watches the state of the areas for and mirrors its own state with that.

 ##### States
 The Alarm Master will watch the states of the area entities and updates its own state accordingly.
 
 The following table shows the rules which are implemented to determine the the master alarm state (in order of priority):

| Condition                                                                                                                                     | Master Alarm state       |
| --------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------ |
| One or more areas have state `triggered`                                                                                                      | `triggered`              |
| One or more areas have state `pending`                                                                                                        | `pending`                |
| One or more areas have state `arming`, others have state `armed_away`, `armed_home`, `armed_night`, `armed_vacation` or `armed_custom_bypass` | `arming`                 |
| All areas have state `armed_away`                                                                                                             | `armed_away`             |
| All areas have state `armed_home`                                                                                                             | `armed_home`             |
| All areas have state `armed_night`                                                                                                            | `armed_night`            |
| All areas have state `armed_vacation`                                                                                                         | `armed_vacation`         |
| All areas have state `armed_custom_bypass`                                                                                                    | `armed_custom_bypass`    |
| All areas have state `disarmed`                                                                                                               | `disarmed`               |
| Otherwise                                                                                                                                     | (previous state is kept) |

**Notes**:
* The Alarm Master cannot determine its state if some are disarmed while others are armed. If the Alarm Master is used for arming/disarming the alarm, this condition should not occur.
* If the areas are independently operated, the user is reponsible to maintain synchronism between the areas. If independent operation is desired, usage of the Master Alarm is not recommended.

##### Commands
Arming / disarming the master will cause the action to be propagated to all areas.

If the arming of an area fails (due to blocking sensors), the arming procedure will be aborted and all areas are disarmed.

The available [arm modes](#arm-modes) for the Master Alarm are determined from the areas. 
Only arm modes which are in common for all areas are available for the Master Alarm.

### Sensor configuration

Currently Alarmo supports sensors of type `binary_sensor`. Alarmo will check the [device class](https://www.home-assistant.io/integrations/binary_sensor/#device-class) of each sensor, and only supports sensors that are related to security.

Available sensors should show up automatically in the *sensors* tab in the *Add sensors* card. 
Simply check the sensors that you wish to include in the alarm, and click 'add to alarm'. 
Review the configuration for each sensor in the *sensors* card.

#### Sensor types

The sensor configuration in the Alarmo panel allows defining a type for each sensor entity.

Setting a type for a sensor has the benefit that the appropriate configuration is automatically set.
HA defines [device classes](https://www.home-assistant.io/integrations/binary_sensor/#device-class) for binary sensors.
When assigning sensors to Alarmo, the type of the sensor is automatically determined based on this property (if it is defined).

Note that assigning a sensor type is not mandatory, and all configuration settings can also be set manually. It is also possible to deviate from the predefined configuration after setting a type.

The following table defines the sensor types and the predefined configuration:
| Type          | Device classes                                                             | Arm modes                                                          | Enabled configuration options             |
| ------------- | -------------------------------------------------------------------------- | ------------------------------------------------------------------ | ----------------------------------------- |
| Door          | `door`<br> `garage_door`<br>`lock`<br> `opening `                          | `Armed Away`<br> `Armed Home`<br>`Armed Night`<br>`Armed Vacation` | `Arm after closing`<br> `Use entry delay` |
| Window        | `window`                                                                   | `Armed Away`<br>`Armed Home`<br>`Armed Night`<br>`Armed Vacation`  | -                                         |
| Motion        | `motion`<br>`moving`<br>`occupancy`<br>`presence`                          | `Armed Away`<br>`Armed Vacation`                                   | `Use exit delay`<br>`Use entry delay`     |
| Tamper        | `tamper`<br>`sound`<br>`vibration`                                         | `Armed Away`<br>`Armed Home`<br>`Armed Night`<br>`Armed Vacation`  | -                                         |
| Environmental | `carbon_monoxide`<br>`gas`<br> `heat`<br>`moisture`<br>`smoke`<br>`safety` | N/A                                                                | `Always on`                               |


#### Configuration options
The following table summarizes the configuration options available per sensor.

Note that depending on the sensor type, some options may be hidden.
This is done for your convenience, if this is undesired you can clear the sensor type to have all options selectable.


| Option                     | Description                                                                                                                                                                                                                                                                                                                                                             | Recommended usage                                                                                        |
| -------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| `Use exit delay`           | Allow the sensor to be active when arming starts.<br>If disabled, the sensor must be inactive prior to arming the alarm, otherwise the arming will fail.<br>Only applies to [arm modes](#arm-modes) having an exit delay.<br>Only applies to the moment of arming: after the exit delay has started, the sensor may become active (allows you to leave the house).      | Motion sensors (and optionally doors) in the path between your alarm panel and the exit.                 |
| `Use entry delay`          | Use entry delay (as set for the [arm modes](#arm-modes)) for the sensor.<br>If enabled, the sensor triggers the alarm after the entry delay, otherwise this happens immediately.br>Only applies to [arm modes](#arm-modes) having an entry delay.                                                                                                                       | Motion + door sensors in the path between entering the house and reaching the alarm panel.               |
| `Always on`                | Activation of the sensor **always** triggers the alarm, even when the alarm is disarmed.<br>The triggering is immediate (entry delay is not used).                                                                                                                                                                                                                      | Safety sensors, such as fire detectors.                                                                  |
| `Allow open after arming`  | Sensor is allowed to remain active until after the alarm is set to armed.<br>The initial activation is ignored, a second activation (after becoming inactive) triggers the alarm.                                                                                                                                                                                       | Motion sensors which have a long delay until being reset (longer than the exit delay).                   |
| `Arm after closing`        | Deactivation of the sensor during the exit delay causes the alarm to proceed to *armed* state.<br>If other sensors are still active at this moment, the arming fails.<br>Alarmo uses a built-in 5 seconds delay to allow for contact bounce (the chattering of a door when pulling it shut).                                                                            | Front door sensor (combined with `Allow open after arming` on motion sensors which may be still active). |
| `Bypass automatically`     | If the sensor is still active when the alarm is armed, the sensor will be excluded from the alarm (instead of causing the arming to fail) until the alarm is disarmed again.<br>This setting can be defined per arm mode.                                                                                                                                               | Windows that may be left open (e.g. when going to sleep).                                                |
| `Trigger when unavailable` | If the sensor state becomes *unavailable* this is treated the same as the sensor being activated.<br>HA defines the *unavailable* state for sensors for which the state is undeterminate (can be either open or closed). This usually occurs when a battery-powered sensor loses connection to the gateway, but it could also be the result of tampering of the sensor. | Sensors for which reliability is important.                                                              |

#### Sensor groups
This functionality is aimed to reduce the risk of false triggers in your house, which are (unfortunately) a reality - especially with PIR motion sensors.

In a group, the triggering of a single sensor is ignored, but consecutive events (of 2 different sensors) will trigger the alarm. 

Any sensor can be added to a group, but a sensor can only be member of 1 group. The amount of groups is unlimited, though it is recommended to minimize this (e.g. one group per room or floor).

A sensor group needs to have at least 2 sensors to function correctly (else it would never be triggered), and needs to be configured with a time-out time, after which consecutive sensor events are not longer considered related.

Clicking the 'setup groups' button while editing a sensor brings you to an overview of existing groups and allows you to create new ones and edit existing ones.

### Codes and users

By default, the alarm has no code and can be locked and unlocked by anyone who has access to HA.
It is recommended to set a code for *disarming* the alarm as minumum security level.

To do so, go to the *codes* tab, and enable the setting 'use disarm code'.

Next, set up a user and give it a name and code.
It is recommended to use the same name as your HA account, but this is not required.

#### Codes
A code can be a sequence of digits (4 or more) or contain a mix of letters, characters etc.
Make sure to use a code that matches with the code format setting in the *codes* tab.
This setting is detected by the alarm panel card, and will automatically show either a number pad or a text field.

Your code is stored completely secure. It is encrypted in the same way as your login credentials, and stored in the HA storage registry. When you enter a code, this will be encrypted too, and the encrypted values will be compared for a match.
So it is impossible to recover your pin code.
This also means that if you lose your pincode, you cannot unlock the alarm (there is no backup code!)

### MQTT
Alarmo supports MQTT for external control of the alarm. This function is intended for third-party alarm panels (such as a touch screen in the hallway).

The MQTT support needs to be enabled before it can be used. This setting is available in tab "*General*".

#### State topic
The state topic is used to publish state changes of the `alarm_control_panel` entities.

The state topic is an output topic, i.e. the data is sent by Alarmo and should be received by another application (such as a wall panel display).

Default state topic (can be configured):
```
alarmo/state
```

Alarmo will send the current state of the Alarmo entity as payload (string).
See [here](#states) for the complete list of payloads.
 The payload which is sent per state can be configured if desired.

The data published on the state topic shall be sent with a *retain* flag. This means that the last sent payload shall be stored in the broker, and as soon as an application subscribed to the topic, the most recent data shall be available for it.

#### Event topic
The event topic is used for publishing additional status updates of the `alarm_control_panel` entities.

The event topic is an output topic, i.e. the data is sent by Alarmo and should be received by another application (such as a wall panel display).

Default event topic (can be configured):
```
alarmo/event
```

The published payloads on this topic are formatted as JSON struct, which contains the  event name, and optionally some extra parameters.

The following table shows the events which are published on the event topic, together with the parameters which are sent for a certain event):


| Event                   | Description                                                                                                        | Parameters                                                                                                                                                                                                                                                                                                                |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ARM_AWAY`              | The alarm has been armed in mode `armed_away`                                                                      | - `delay`: exit delay (in seconds) configured for the operation (i.e. time during which the alarm is in state `arming`).                                                                                                                                                                                                  |
| `ARM_HOME`              | The alarm has been armed in mode `armed_home`                                                                      | - `delay`: exit delay (in seconds) configured for the operation (i.e. time during which the alarm is in state `arming`).                                                                                                                                                                                                  |
| `ARM_NIGHT`             | The alarm has been armed in mode `armed_night`                                                                     | - `delay`: exit delay (in seconds) configured for the operation (i.e. time during which the alarm is in state `arming`).                                                                                                                                                                                                  |
| `ARM_VACATION`          | The alarm has been armed in mode `armed_vacation`                                                                  | - `delay`: exit delay (in seconds) configured for the operation (i.e. time during which the alarm is in state `arming`).                                                                                                                                                                                                  |
| `ARM_CUSTOM_BYPASS`     | The alarm has been armed in mode `armed_custom_bypass`                                                             | - `delay`: exit delay (in seconds) configured for the operation (i.e. time during which the alarm is in state `arming`).                                                                                                                                                                                                  |
| `TRIGGER`               | The alarm has been triggered                                                                                       | - `sensors`: list of sensors (usually a single sensor) which caused the triggering of the alarm. Each list item is a struct with the `entity_id` and `name` of the sensor entity).<br>- `delay`: entry delay (in seconds) configured to postpone the triggering (i.e. time during which the alarm is in state `pending`). |
| `FAILED_TO_ARM`         | The arming was prevented or cancelled due to one or more blocking sensors.                                         | - `sensors`: list of sensors which prevented the arming operation. Each list item is a struct with the `entity_id` and `name` of the sensor entity).                                                                                                                                                                      |
| `COMMAND_NOT_ALLOWED`   | The conditions for which the command is allowed are not met (see [commands](#commands)).                           | - `state`: current [state](#states) of the alarm entity.<br>- `command`: the command that was provided by the user.                                                                                                                                                                                                       |
| `NO_CODE_PROVIDED`      | The command was rejected because no code was provided, while the operation requires a code.                        |                                                                                                                                                                                                                                                                                                                           |
| `INVALID_CODE_PROVIDED` | The command was rejected because a wrong code was provided, or the provided code is not allowed for the operation. |                                                                                                                                                                                                                                                                                                                           |

Example payload on the event topic (*Consider the scenario where the alarm is armed in state `armed_away` and the front door is opened):*
```yaml
{
  "event": "TRIGGER",
  "sensors": [ # list of sensor(s) that causes the triggering
    {
      "entity_id": "binary_sensor.frontdoor",
      "name": "Front Door"
    }
  ],
  "delay": 60 # entry delay
}
```
#### Command topic

The command topic can be used for external control of Alarmo through MQTT.

The command topic is an input topic, i.e. the topic is watched by Alarmo and data should be sent by another application (such as a wall panel). The data should never be sent with *retain* flag, as this might give undesired behaviour when HA is restarted.

Default command topic (can be configured):
```
alarmo/command
```

If Alarmo is configured to require a pincode or password for the (arm/disarm) command, the payload must be formatted as JSON according to the following format:
```json
{
  "command": "<my command>",
  "code": "<my pin or password>"
}
```
If Alarmo does not require any code for the command, the command can be sent directly as text/string value.

The supported commands can be found in [commands](#commands).

If the provided payload does not have the correct format, lacks a code when it is required or contains a wrong code, the command shall be ignored. 
In other cases, you should see a change in the state topic.

**Notes**:
* The pin or password value should always be sent as a text/string value. A numeric value is not supported. This is due to the fact that a pincode could contain leading zeros (e.g. 0012), which would be lost if sent as a number.
* Alarmo provides the option to accept MQTT commands without requiring a code. By disabling the "*Require code*" setting in the MQTT configuration, the internal code check is skipped. This setting should be used with care as it may compromise the security of the alarm.
* The command is treated as case-insensitive.

#### Multiple area usage
The MQTT functionality can be used in combination with a multiple area configuration.

Alarmo shall publish the state updates for the Master Alarm and the areas in dedicated state topics:
* Master Alarm: `alarmo/state`
* Area: `alarmo/<area_name>/state`

For targeting an arm/disarm command to a specific area, the JSON payload can be extended with the *area* property:
```json
{
  "command": "<my command>",
  "code": "<my pin or password>",
  "area": "<area_name>"
}
```

**Notes**: 
* The MQTT configuration allows defining the topics for the Master Alarm only. The input topics (state/event topics) for the areas are automatically derived by inserting the area name. Example: setting state topic to `my/custom/topic` gives `my/custom/<area_name>/topic` as state topic for an area. 
* `<area_name>` is a *slug* of the name that is given to an area. This means that the name shall be in lowercase and all non-alphanumerical characters are replaced by underscores (similar to the entity_IDs in HA).
* If no area is provided, the command is addressed to the Master Alarm. If the Master Alarm is disabled, the command is ignored.

### Automations

#### Push notifications
Alarmo can send a push message to your phone when the alarm is armed, disarmed, triggered, something went wrong, etc.
For using this, you first need to install the HA app on your iOS or Android device.

**Procedure for setting up a notification**
1. In the Alarmo configuration panel, click "Actions" in the top menu.
2. In the panel labeled "Notifications", click on "New Notification".
3. Choose an event for which you would like to receive a push message, and choose the message content + title. Pick your device as target, and save the automation.
4. Now Alarmo should start sending you messages :tada:

Example of the notification editor:

<img src="https://raw.githubusercontent.com/nielsfaber/alarmo/main/screenshots/notification_gui.png">

##### Wildcards
The alarmo notifications editor contains some wildcards which can be used to provide adaptive info to your push message.
By adding the wildcard in a message (including the brackets) it will be automatically be replaced by the applicable text.

| Wildcard               | Description                                                    | Example Text       | Suitable events                       |
| ---------------------- | -------------------------------------------------------------- | ------------------ | ------------------------------------- |
| `{{open_sensors}}`     | List of sensors (with their states) which are currently active | *Backdoor is open* | Failed to arm<br> Triggered<br> Entry |
| `{{bypassed_sensors}}` | List of sensors which are bypassed                             | *Bedroom window*   | Armed                                 |
| `{{arm_mode}}`         | Current arming mode.                                           | *Armed Away*       | Leave<br> Armed                       |
| `{{changed_by}}`       | User who's code has been entered.                              | *Niels*            | Armed<br> Disarmed                    |
| `{{delay}}`            | Delay in seconds until armed or the alarm is triggered         | *30*               | Arming<br> Pending                    |

##### Actionable notifications
This function adds buttons to a push message, that can be clicked to interact with Alarmo.

Alarmo has built-in support for actionable push notification with the 'failed to arm' condition. 

Example:

<img src="https://raw.githubusercontent.com/nielsfaber/alarmo/main/screenshots/actionable_push_message.png" width="400">

**Available actions**

The following actions are defined in Alarmo and can be used in actionable notifications:

| action                                                                                                                  | Description                                                                                                                      | Suitable events                                    |
| ----------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------- |
| `ALARMO_RETRY_ARM`                                                                                                      | Repeats the command that failed before.<br>Will only succeed in case the issue blocking the arming before has been restored.     | Failed to arm                                      |
| `ALARMO_FORCE_ARM`                                                                                                      | Repeats the command that failed before.<br>The sensor/sensors that failed, shall be ignored (bypassed) while the alarm is armed. | Failed to arm                                      |
| `ALARMO_DISARM`                                                                                                         | Disarm the alarm.                                                                                                                | Armed, Leave, Entry, Triggered                     |
| `ALARMO_ARM_AWAY`<br> `ALARMO_ARM_HOME`<br> `ALARMO_ARM_NIGHT`<br> `ALARMO_ARM_VACATION`<br> `ALARMO_ARM_CUSTOM_BYPASS` | Arm the alarm in the corresponding mode.                                                                                         | None (intended for automations outside of alarmo). |
**Set up notification with actions**

In the Alarmo notifications editor, create a notification and select an event.
Choose your iOS/Android device as target, set a message and title as you want.

Switch to YAML mode. Look for the part that has `data`, and extend it as follows:
```yaml
data:
  ... # your message and title should be here already
  data:
    actions:
      - action: ALARMO_RETRY_ARM
        title: Retry Arm # feel free to change this text
      - action: ALARMO_FORCE_ARM
        title: Force Arm # feel free to change this text
```

For more info about actionable notifications in HA, see [here](https://companion.home-assistant.io/docs/notifications/actionable-notifications/).

**Note**: In case you have multiple areas set up, the actionable notifications only work for the [alarm master](#alarm-master) (since no area info can be sent along with the action data).

#### Actions

##### Switching a device

An important feature of a security system are the actuators (such as siren, lights, ...), which will hopefully cause a burglar threspassing your property to flee.

Alarmo features a built-in panel which can be used for switching devices on/off, depending on the state of the alarm.

**Procedure for setting up an action**
1. In the Alarmo configuration panel, click "Actions" in the top menu.
2. In the panel labeled "Actions", click on "New Action".
3. Choose an event for which you would like to trigger a device, pick the HA entity from the list, choose whether it should be switched on, and save the automation.
4. Now the device should automatically be triggered together with the alarm :tada:

Currently the following HA entity types are supported: `switch`, `input_boolean`, `light`, `script`.

The actions are currently limited to *turning on* or *turning off* a HA entity. 


##### Advanced actions
In case the built-in Actions panel does not offer the flexibility you are looking for, you can set up more flexible automations in HA.

It is recommended to trigger on a state change of the `alarm_control_panel` entity.

Example:
```yaml
trigger:
  - platform: state
    entity_id: alarm_control_panel.alarmo
    to: 'triggered'
action:
  - service: switch.turn_on
    target:
      entity_id: swich.my_siren
```

For the "failed to arm" condition, you can trigger on event instead:
```yaml
trigger:
  - platform: event
    event_type: alarmo_failed_to_arm
condition:
  - condition: template
    value_template: '{{ trigger.event.data.reason == ''open_sensors'' }}'
action:
  - service: notify.mobile_app_my_phone
    data:
      message: >
        Could not arm because of the following problems:
        {% for entity_id in trigger.event.data.sensors %}
          - {{ state_attr(entity_id, 'friendly_name') }} is {{ states(entity_id) }}
        {% endfor %}
      title: test
```

Structure of the event data:
```javascript
{
  "reason": "open_sensors", //other options: not_allowed, invalid_code
  "sensors": [ //only applicable if reason = open_sensors
    "binary_sensor.balcony_door"
  ],
}
```

#### Automatic arming
If you want to control the state of Alarmo through an external device (e.g. a keyfob, button panel, or phone with geofencing), you can do so by means of a HA automation.

This kind of automation cannot be made from the Alarmo "Actions" panel, you should use a HA automation instead (Configuration -> Automations).

Example of HA automation for arming with a remote button:
```yaml
trigger:
  - platform: state
    entity_id: switch.my_remote
    to: 'on'
action:
  - service: alarmo.arm
    data:
      entity_id: alarm_control_panel.alarmo
      code: '1234'
      mode: away 
      skip_delay: true
```
---
### Alarmo-card

After setting up Alarmo, it can be used for securing your house.

For controlling the alarm through the HA frontend, you can set up a Lovelace card.
There are two cards available:
* [Lovelace Alarm Panel card](https://www.home-assistant.io/lovelace/alarm-panel/) which comes with HA. This offers basic arm/disarm functionality and displays the current state.
* [Alarmo-card](https://github.com/nielsfaber/alarmo-card) which is intended as a companion for Alarmo. It offers some extra functionality on top of the standard alarm panel card, such as countdown timer for exit / entry delay and feedback messages with sensor(s) causing the alarm to be triggered or unable to arm.


---

## Third party platforms
This section is intended to give a starting point for users who want to operate Alarmo outside of HA.

### Android MQTT Alarm Panel
Alarmo is designed to be fully compatible with the [Android MQTT Alarm Panel](https://github.com/thanksmister/android-mqtt-alarm-panel) project.

This project provides a GUI for you to operate your alarm via a tablet which you could (for example) mount on the wall at your main entrance.

For using Alarmo with the Android MQTT Alarm Panel, make sure to enable the MQTT interface. For additional instructions on how to set up MQTT to be compatible with The MQTT Alarm Panel, see [here](https://github.com/thanksmister/android-mqtt-alarm-panel#home-assistant-alarmo-integration).


### Apple Homekit
Alarmo can be operated via Homekit.
Follow the instructions on the [Home Assistant page](https://www.home-assistant.io/integrations/homekit/) to establish a gateway between HA and Homekit.

Alarmo entities are of type `alarm_control_panel`, so make sure to configure the homekit gateway in HA have these included. 
The alarm should now automatically become visible in Homekit, with the current state visible together with the possibility to arm and disarm.

In case you have Alarmo configured to require a code for arming/disarming, you need to setup homekit in yaml mode (instead of via the integrations page).
If you want to configure the rest of homekit using the Home Assistant UI, but configure the pin in configuration.yaml, you will have to configure two 
Homekit bridges. In this case, do not select 'alarm_control_panel' when configuring via the UI, as this instance will not have the pin. Then add the 
following lines minimally to the 'configuration.yaml`:

```yaml
homekit:
  - filter:
      include_domains:
        - alarm_control_panel
    entity_config:
      alarm_control_panel.alarmo:
        code: 1234 # should be identical to a user in Alarmo as well
```

Then you will need to scan the QR codes for both the UI based configuration and the 'configuration.yaml' based configuration to have access to Alarmo
and your other UI based devices in Apple Home.

The Homekit gateway has the following limitations:
* The [arm modes](#arm-modes) `custom` and `vacation` are not visible in Homekit.
* Alarmo allows enabling/disabling arm modes 'on the fly', however it is needed to restart HA (or reconfigure Homekit via HA) before this becomes effective in Homekit.
* In case arming fails, the alarm tile in Homekit will stay in 'arming...' state indefinitely.
* Homekit will not show the `pending` [state](#states), so it is not possible to identify when the entry delay is effective.

### Google Home
Alarmo can work together with Google Home.
The first step is to set up the [Google Assistant](https://www.home-assistant.io/integrations/google_assistant/) integration in HA.
For Nabu Casa subscribers, this requires just a few clicks, other users need to register a project in Google cloud first (see instructions in HA docs).

Example of minimal setup in `configuration.yaml`:
```yaml
google_assistant:
  project_id: <your project ID>
  service_account: !include <path to account json file>
  secure_devices_pin: 1234 # should be identical to a user in Alarmo as well
  report_state: true
  expose_by_default: false
  entity_config:
    alarm_control_panel.alarmo:
      expose: true
      room: Home
```

For arming and disarming the alarm, you can use voice commands like:
* *Arm the security system to armed away*
* *Disarm the security system*

Obviously the exact commands are depending on your local language setting.

It is also possible to arm/disarm the alarm as a step in a routine (e.g. the *'Good Morning'* routine):
* For arming in a routine: select *'adjust home devices'* followed by  action *'arm security system'*
* For disarming in a routine select *'try adding your own'* and enter *'disarm the security system'*.

**Remarks**
* Since anyone can wake up your device and speak to Google Assistant, it's highly recommended to set up a pincode for disarming.
* In case you have a pin set up, the Google Assistant will ask you to speak the pin. In some devices, like the Nest Hub, it is also possible to enter the pin via the keypad on the screen.
* The Google Translate [text-to-speech service](https://www.home-assistant.io/integrations/google_translate/) can be very useful to provide additional feedback (e.g. when arming fails) for the members of your home. You can set up a notification action via Alarmo.

## Say thank you
If you want to make donation as appreciation of my work, you can do so via PayPal or buy me a coffee. Thank you!

<a href="https://www.paypal.com/donate/?business=CLL4T6Y8ACXNN&no_recurring=0&item_name=Thank+you+for+supporting+my+work+on+the+Alarmo+project%2E+Your+donation+is+much+appreciated%21&currency_code=EUR" target="_blank"><img src="https://pics.paypal.com/00/s/YzlhMzI2ZjYtZDQxMi00NzNiLThmZTktOTk3MmEyYTA2Zjc0/file.PNG" width="150" /></a>
<a href="https://www.buymeacoffee.com/vrdx7mi" target="_blank"><img src="https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png"></a>

<!-- ### Alarm modes
 -->

<!---
disarmed: wait for arm command,
arming: set timer for leave delay,
armed: wait for sensors to change;

initial => disarmed;
disarmed => disarmed: wait for command;
arming => arming: timer not expired;
disarmed => "evaluate leave delay configuration": received command;

"evaluate leave delay configuration" => "^leave delay?";
"^leave delay?" => "evaluate immediate sensors" : delay;
"^leave delay?" => "evaluate all sensors" : no delay;

"evaluate immediate sensors" => "^immediate sensors?";
"^immediate sensors?" => disarmed: sensors NOK;
"^immediate sensors?" => "arming": sensors OK;

"arming" => "evaluate all sensors" : timer expired;
"evaluate all sensors" => "^sensors?";
"^sensors?" => armed: sensors OK;
"^sensors?" => disarmed: sensors NOK;
-->


