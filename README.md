# Alarmo
[![hacs_badge](https://img.shields.io/badge/HACS-Custom-orange.svg)](https://github.com/custom-components/hacs)

This is an alarm system integration for Home Assistant. It provides a user interface for setting your own alarm system completely from the browser.

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

1. Download the [latest release](https://github.com/nielsfaber/alarmo/releases) as a zip file and extract it into the `custom_components` folder in your HA installation.
2. Restart HA to load the integration.
3. Go to Configuration -> Integrations and click the big orange '+' button. Look for Alarmo and click to add it.
4. The Alarmo integration is ready for use. You can find the configuration panel in the menu on the left.

## Updating

1. Download the [latest release](https://github.com/nielsfaber/alarmo/releases) as a zip file and extract it into the `custom_components` folder in your HA installation, overwriting the previous installation.
2. Restart HA to load the changes.
  
## Planned improvements
* Add the project to HACS.
* Add support for skipping the arming delay.
* Add support for bypassing failed sensors.
* MQTT support for control + status reporting of the system from 3rd party applications.
* Implement lock-out time when too many incorrect pincodes are entered.
* Extend support for action configuration.
* Adding translations for push notifications and the frontend.

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

### Sensors

Currently Alarmo supports sensors of type `binary_sensor`.
They should show up automatically in the *sensors* tab. 
You card will show a 'add to alarm' button for each sensor. After clicking, you will see a dialog where you can set the modes in which the sensor should work.

#### Immediate sensors
When the alarm is armed with an immediate sensor, this sensor will trigger the alarm directly instead of waiting for the entry delay.

It is recommended to set this for safety devices (smoke detectors, gas sensors, etc.).

Example of other use cases: in mode *armed away* you would normally leave and enter the house via a door. 
If a window is opened when the alarm is armed, this means bad news. The siren should be enabled ASAP.

Note: an immediate sensor must be *off* before you can enable the alarm. It is not allowed to be *on* while you are leaving the house.

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

#### Admin permissions
The Alarmo panel is restricted to admin (administrator) users only.

There are two ways for reaching the Alarmo panel:
* Being logged in in HA with an account that has administrator permissions
* Being logged in in HA with a normal user account, but having a user set up in Alarmo with matching username, and marking it as admin.

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