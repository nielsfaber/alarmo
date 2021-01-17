# Alarmo
[![hacs_badge](https://img.shields.io/badge/HACS-Default-orange.svg)](https://github.com/custom-components/hacs)

This is an alarm system integration for Home Assistant. It provides a user interface for setting your own alarm system completely from the browser.

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
      - [Areas](#areas)
      - [Alarm Master](#alarm-master)
    - [Sensor configuration](#sensor-configuration)
      - [Sensor types](#sensor-types)
      - [Immediate](#immediate)
      - [Always-on](#always-on)
      - [Allow-open](#allow-open)
      - [Arm on close](#arm-on-close)
      - [Trigger when unavailable](#trigger-when-unavailable)
    - [Codes and users](#codes-and-users)
      - [Codes](#codes)
      - [Administrator](#administrator)
    - [MQTT](#mqtt)
      - [State topic](#state-topic)
      - [Command topic](#command-topic)
    - [Actions](#actions)
      - [Push notifications](#push-notifications)
        - [Actionable notifications](#actionable-notifications)
      - [Device actions](#device-actions)
    - [Lovelace alarm panel card](#lovelace-alarm-panel-card)

## Introduction
This is an integration for the `alarm_control_panel` domain in HA.
It allows to combine existing sensors for creating a security system for your house. 
The integration is comparable with the [Manual Alarm](https://www.home-assistant.io/integrations/manual/) in HA, but also has some additional features that makes it easier to use. 

### Features
* Fully compatible with Home Assistant and the [Alarm Panel Card](https://www.home-assistant.io/lovelace/alarm-panel/).
* Has an integrated panel for complete management via UI (no YAML required).
* No restarts required when making changes.
* Can set up to 4 arm modes (*armed_away*, *armed_home*, *armed_night*, *armed_custom_bypass*), each with configurable delays and security perimeter.
* Supports configuring your existing HA entities as security sensors. These sensors will be watched automatically. 
* Allows setting up multiple users with individual pincode and permission levels.
* Will restore its previous state after restart of HA.
* Receive push notifications when anything changes in the alarm.
* Activate a siren when the alarm is triggered.

### Preview

![](https://raw.githubusercontent.com/nielsfaber/alarmo/main/screenshots/Preview.png)


## Installation
<details>
<summary>Click to show installation instructions</summary>
<ol>
<li>Install files:</li>
<ul>
<li><u>Using HACS:</u><br>
In the HACS panel, go to integrations and click the big orange '+' button. 
Search for 'Alarmo' and click \'Install this repository in HACS'.</li>
<li><u>Manually:</u><br>
Download the [latest release](https://github.com/nielsfaber/alarmo/releases) as a zip file and extract it into the `custom_components` folder in your HA installation.</li>
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
| `armed_custom_bypass`      | The alarm is armed in custom mode.                                                       |
| `pending`                  | The alarm is pending.<br>After the entry delay has expired, the alarm will be triggered. |
| `triggered`                | The alarm is triggered.                                                                  |
| `unavailable`<br>`unknown` | Something is wrong.<br>Check the logs for more information.                              |

#### Attributes

The Alarmo entity defines the following attributes:

| Attribute          | Default value | Example value when set         | Description                                                                                                                                                                                                                                         |
| ------------------ | ------------- | ------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `arm_mode`         | `null`        | `armed_away`                   | The current active arm mode.<br> Defined in all states except `disarmed`.                                                                                                                                                                           |
| `changed_by`       | `null`        | `Niels`                        | User who last armed or disarmed the alarm.<br> Detected from the entered code.<br> Cleared when alarm is armed or disarmed without a code.                                                                                                          |
| `open_sensors`     | `null`        | `{binary_sensor.backdoor: on}` | Dictionary of sensors with their entity-ID + state, that caused the alarm to change state.<br>Set when arming attempt failed (due to one or more sensors).<br>Set when alarm is triggered (only first sensor that caused the triggering is stored). |
| `bypassed_sensors` | `null`        | `[binary_sensor.backdoor]`     | List of sensors that are temporarily excluded from the alarm, due to arming in force.                                                                                                                                                               |

#### Areas
An area is a physical compartment of your house, such as a garage, 1st floor of the house, garden, etc.
Alarmo will create an `alarm_control_panel` entity for each area which can be armed and disarmed independently. An area has its own set of sensors and can have dedicated configuration for arm modes, exit/entry times and automations.

In the *general* tab of the Alarmo configuration UI, there is a card showing the areas in your setup. 
You can add additional areas, as well as rename or remove existing areas.
Alarmo requires at least 1 area to be set up to be functional. 

The name of an area defines the entity ID as well. 
The entity will be instantly renamed after saving.
After renaming an area, the old entity ID may appear again in your entities list after a restart of HA. This entity shows up as `unavailable` and has to be deleted manually. 

**Warning**: renaming an area changes the entity ID, which might break your Lovelace cards and automations outside of Alarmo, so treat it with care.


#### Alarm Master
Alarmo has the option for enabling an alarm master.
The option appears in the *general* tab in *general settings* if you have multiple areas defined.

The alarm master is meant for operating your areas synchronously. 
An extra `alarm_control_panel` entity is created for the master, which watches the state of the areas for and mirrors its own state with that.

Arming / disarming the master will cause the action to be propagated to all areas.
If the arming of one area fails, the arming is aborted and all areas are disarmed.

The triggering of one area causes the triggering of the alarm master.

**Warning**: the state of the master can only be determined if the areas are in sync. If one area is being armed while another is disarmed, the master will not change the state (i.e. it stays in `disarmed`). The only allowed exceptions are the `pending` and `arming` states.

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
| Type          | Device classes                      | Arm modes                           | Always on | Immediate | Arm on close | Allow open |
| ------------- | ----------------------------------- | ----------------------------------- | --------- | --------- | ------------ | ---------- |
| Door          | door, garage_door, lock. opening    | Armed Away, Armed Home, Armed Night | No        | No        | Yes          | No         |
| Window        | window                              | Armed Away, Armed Home, Armed Night | No        | Yes       | No           | No         |
| Motion        | motion, moving, occupancy, presence | Armed Away                          | No        | No        | No           | Yes        |
| Tamper        | sound, opening, vibration           | Armed Away, Armed Home, Armed Night | No        | Yes       | No           | No         |
| Environmental | gas, heat, moisture, smoke, safety  | N/A                                 | Yes       | Yes       | No           | No         |

#### Immediate
When the alarm is armed with an immediate sensor, this sensor will trigger the alarm directly instead of waiting for the (optional) entry delay.

An immediate sensor must be closed before you can enable the alarm. It is not allowed to be open while you are leaving the house. In other words, the exit delay is not applicable to immediate sensors.

Example of use cases: in mode *armed away* you would normally leave and enter the house via a door. 
If a window is opened when the alarm is armed, this means bad news. The siren should be enabled ASAP.

#### Always-on
When marking a sensor as always-on, it will **always** be able to trigger the alarm, even when the alarm is disarmed. The triggering occurs as soon as the sensor is activated and entry delays will be ignored.

This functionality is intended for safety sensors, such as fire detectors. 

#### Allow-open 
The allow-open property allows a sensor to be in the active state, while (and after) the alarm is armed. Setting this property is not the same as bypassing a sensor, since as soon as the sensor returns to the inactive state, it is capable of triggering the alarm. The property only ignores the initial state of the sensor.

This property is intended for motion sensors, which have a relatively long period before they return to inactive state, after the zone is clear.
By setting this property, it is possible to set a leave delay that is lower than the reset period of this sensor.

#### Arm on close
The alarm on close feature is intended for entrances only. 
When setting this property to a door/contact sensor, Alarmo will watch this sensor while the alarm is in state *arming*, and determine if the user left the house.

Once the sensor state changes from open to closed, this is interpreted as the user closing the (front) door. 
Alarmo will skip the remaining of the exit delay, and proceed directly to the *armed* state.
If any sensor (without the *allow-open* setting) is still open, the alarm will return to *disarmed* state.

Note: Alarmo uses a built-in 5 seconds delay to allow for contact bounce (the chattering of a door when pulling it shut).

#### Trigger when unavailable

HA defines the *unavailable* state for sensors for which the state is undeterminate (can be either open or closed). The *unavailable* state usually occurs when a battery-powered sensor loses connection to the gateway. This might be a harmless scenario (such as an empty battery) but it could also be the result of tampering of the sensor.

Since Alarmo cannot guarantee the security of your house when this occurs, it might be desirable to have the alarm trigger if this occurs. 
Setting the *trigger when unavailable* setting has the effect that the *unavailable* state is treated the same as the sensor being *open*.


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

#### Administrator
The administrator setting grants access to the Alarmo configuration panel.

For using this feature, the user names in Alarmo should be matched to the account names in HA.

When a user is trying to access the Alarmo configuration panel, access is only allowed if any of the following requirements are met:
1. The user is administrator in HA (i.e. this user can access the HA configuration)
2. The user is not a HA administrator, but a matching user exists in Alarmo, which has the *administator* setting activated.


### MQTT
Alarmo supports MQTT for external control of the alarm. This function is intended for third-party alarm panels (such as a touch screen in the hallway).

The MQTT support needs to be enabled before it can be used.

#### State topic

The state topic shall be used to publish state changes.

Alarmo will send the current state of the Alarmo entity as payload (string).
See [here](#states) for the complete list of payloads.

#### Command topic

The command topic can be used to control Alarmo through MQTT.

The following commands/payloads are supported:
* DISARM
* ARM_AWAY
* ARM_HOME
* ARM_NIGHT
* ARM_CUSTOM_BYPASS

If Alarmo is configured to require a pincode or password for the command, the payload must be formatted as JSON with the following format:
```
{command: "<my command>", code: "<my pin or password>"}
```

If the provided payload does not have the correct format, lacks a code when it is required or contains a wrong code, the command is ignored. 
In other cases, you should see a change in the state topic.

### Actions

#### Push notifications
Alarmo features a built-in panel for managing push notifications.
It can be found in the *actions* tab.

This feature has the same effect as defining an automation in HA that is triggered by a state change of the `alarm_control_panel.alarmo` entity.
It is only intended to provide a more integrated means of setting up your alarm.

##### Actionable notifications
This function adds buttons to a push message, that can be clicked to interact with Alarmo.

Alarmo has built-in support for actionable push notification with the 'failed to arm' condition. 

Example:

<img src="https://raw.githubusercontent.com/nielsfaber/alarmo/main/screenshots/actionable_push_message.png" width="400">

The 'Retry Arm' option will repeat the command that failed before. You could use it if you solved the issue in the mean time.

The 'Force Arm' option will repeat the command that failed before. The sensor/sensors that failed, shall be ignored while the alarm is armed.

**For iOS devices**

Step 1: Add this to `the configuration.yaml` file:
```yaml
ios:
  push:
    categories:
      - name: Alarm Arm Failure
        identifier: alarmo_arm_failure
        actions:
          - identifier: ALARMO_RETRY_ARM
            title: Retry Arm # feel free to change this text
            destructive: true
          - identifier: ALARMO_FORCE_ARM
            title: Force Arm # feel free to change this text
            destructive: true
```
Step 2: Restart HA to make the configuration effective.

Step 3: In the Alarmo notifications editor, create a notification for the 'Failed to arm' event. Choose your iOS device as target.

Step 4: Go to YAML mode. Look for the part that has `service_data`, and extend it as follows:
```yaml
    service_data:
      ... # your message and title should be here already
      data:
        push:
          category: ALARMO_ARM_FAILURE
```
**For Android devices**
Step 1: In the Alarmo notifications editor, create a notification for the 'Failed to arm' event. Choose your Android device as target.

Step 2: Go to YAML mode. Look for the part that has `service_data`, and extend it as follows:
```yaml
    service_data:
      ... # your message and title should be here already
      data:
        actions:
          - action: ALARMO_RETRY_ARM
            title: Retry Arm # feel free to change this text
          - action: ALARMO_FORCE_ARM
            title: Force Arm # feel free to change this text
        ttl: 0
        priority: high
```

#### Device actions
Alarmo features a built-in panel for managing device actions.
It can be found in the *actions* tab.


This feature has the same effect as defining an automation in HA that is triggered by a state change of the `alarm_control_panel.alarmo` entity.
It is only intended to provide a more integrated means of setting up your alarm.

The actions are currently limited to *turning on* or *turning off* a HA entity. 
For more advanced actions, you can use the built-in YAML editor to define your own HA service call.


### Lovelace alarm panel card
The [Lovelace alarm panel card](https://www.home-assistant.io/lovelace/alarm-panel/) is an excellent companion for Alarmo.
It is highly recommended to use it for controlling the alarm.

This card will show you the current state of the alarm, and will allow you to enter a pin (the format is automatically detected).

Make sure that the card is configured with the same modes (they are referred to as `states` in the card), as you have set up in Alarmo.
There is currently no functionality in place to detect this setting automatically.


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