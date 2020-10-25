# Alarmo
Easy to use alarm system integration for Home Assistant

## Introduction
This is an integration for the `alarm_control_panel` domain in HA.
It allows to combine sensors and create a security system for your house. The system is completely managed from your browser. 

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

### Planned improvements
* Add support for skipping the arming delay.
* Add support for bypassing failed sensors.
* MQTT support for control + status reporting of the system from 3rd party applications.
* Implement lock-out time when too many incorrect pincodes are entered.
* Extend support for action configuration.
* Adding translations to push notifications.

## Installation

1. Download the [latest release](https://github.com/nielsfaber/alarmo/releases) as a zip file and extract it into the `custom_components` folder in your HA installation.
2. Restart HA to load the integration.
3. Go to Configuration -> Integrations and click the big orange '+' button. Look for Alarmo and click to add it.
4. The Alarmo integration is ready for use. You can find the configuration panel in the menu on the left.

## Updating

1. Download the [latest release](https://github.com/nielsfaber/alarmo/releases) as a zip file and extract it into the `custom_components` folder in your HA installation, overwriting the previous installation.
2. Restart HA to load the changes.
  
## Usage

TBD
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