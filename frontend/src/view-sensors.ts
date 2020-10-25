import { LitElement, html, customElement, property, CSSResult, css, PropertyValues } from 'lit-element';
import { HomeAssistant, fireEvent } from 'custom-card-helpers';
import { loadHaForm } from './load-ha-form';

import { computeIcon, prettyPrint, getDomain, computeName, getAlarmEntity } from './helpers';
import { AlarmEntity, Dictionary } from './types';

import './dialog-sensor-edit.ts';
import { defaultSensorConfig } from './const';
import { importSensorConfig, importModes } from './interface';
import { commonStyle } from './styles';
import { HassEntity } from 'home-assistant-js-websocket';

@customElement('alarm-view-sensors')
export class AlarmViewSensors extends LitElement {
  @property()
  hass?: HomeAssistant;

  @property()
  _sensors: Dictionary<number> = {};
  entity_id = '';
  alarmEntity?: AlarmEntity;

  protected shouldUpdate(changedProps: PropertyValues): boolean {
    if (!this.hass) return true;
    const oldHass = changedProps.get('hass') as HomeAssistant | undefined;
    if (oldHass && changedProps.size == 1) {
      if (oldHass.states[getAlarmEntity(oldHass)] !== this.hass.states[getAlarmEntity(this.hass)]) {
        this.updateForm();
        return true;
      }
      return false;
    }
    return true;
  }

  updateForm() {
    if (!this.hass) return;
    this.entity_id = getAlarmEntity(this.hass);
    this.alarmEntity = this.hass!.states[this.entity_id] as AlarmEntity;
    this._sensors = this.alarmEntity.attributes.sensors;
  }

  firstUpdated() {
    (async () => await loadHaForm())();
    this.updateForm();
  }

  render() {
    return html`
      <ha-card header="Sensors">
        <div class="card-content">
          Currently configured sensors. Make sure to refresh the page after changes. For some reason it doesn't always
          update.
        </div>

        ${this.sensorsList()}
      </ha-card>

      <ha-card header="Add sensors">
        <div class="card-content">
          Add more sensors. Make sure that your sensors have a friendly_name, so you can identify them.s
        </div>

        ${this.addSensorsList()}
      </ha-card>
    `;
  }

  sensorsList() {
    if (!this.hass || !this.alarmEntity) return;
    const sensorCfg = Object.entries(this._sensors).map(([el, val]) => {
      const entity = this.hass!.states[el];
      return {
        id: el,
        name: computeName(entity),
        config: importSensorConfig(Number(val)),
      };
    });
    sensorCfg.sort((a, b) => (a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1));

    if (!sensorCfg.length) {
      return html`
        <settings-row>
          <span slot="description">
            There are no sensors added to the alarm yet. Make sure to add them first.
          </span>
        </settings-row>
      `;
    }
    const configuredModes = importModes(this.alarmEntity);
    return sensorCfg.map(entity => {
      const stateObj = this.hass!.states[entity.id];
      let modes = entity.config.modes.filter(e => configuredModes.includes(e)).join(', ');
      if (!modes) modes = 'Not assigned to any alarm mode yet';
      else modes = 'Active in modes ' + modes;

      return html`
        <div class="entity-row">
          <state-badge .hass=${this.hass} .stateObj=${stateObj}> </state-badge>
          <div class="info">
            ${prettyPrint(entity.name)}
            <div class="secondary">
              ${modes}
            </div>
          </div>
          <mwc-button @click=${() => this.showEntityDialog(this, entity.id)}>
            configure
          </mwc-button>
        </div>
      `;
    });
  }

  showEntityDialog(element: HTMLElement, entity_id: string) {
    const config = this._sensors[entity_id] ? importSensorConfig(this._sensors[entity_id]) : defaultSensorConfig;
    fireEvent(element, 'show-dialog', {
      dialogTag: 'dialog-sensor-edit',
      dialogImport: () => import('./dialog-sensor-edit'),
      dialogParams: { entity_id: entity_id, config: config },
    });
  }

  allowedSensor(entity: HassEntity) {
    const domain = getDomain(entity.entity_id);
    if (domain == 'binary_sensor') {
      const type = entity.attributes.device_class;
      if (!type) return true;
      if (
        [
          'door',
          'garage_door',
          'gas',
          'heat',
          'lock',
          'moisture',
          'motion',
          'moving',
          'occupancy',
          'opening',
          'presence',
          'problem',
          'safety',
          'smoke',
          'sound',
          'vibration',
          'window',
        ].includes(type)
      )
        return true;
      return false;
    }
    if (domain == 'input_boolean') return false;
    return false;
  }

  addSensorsList() {
    if (!this.hass) return;
    const sensors = Object.keys(this.hass!.states).filter(e => this.allowedSensor(this.hass!.states[e]));
    const sensorCfg = sensors
      .map(el => {
        const entity = this.hass!.states[el];
        return {
          id: el,
          name: computeName(entity),
          icon: computeIcon(entity),
        };
      })
      .filter(e => !Object.keys(this._sensors).includes(e.id));
    sensorCfg.sort((a, b) => (a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1));

    if (!sensorCfg.length) {
      return html`
        <settings-row>
          <span slot="description">
            There are no available HA entities that can be configured for the alarm. Make sure to include entities of
            the type binary_sensor.
          </span>
        </settings-row>
      `;
    }
    return sensorCfg.map(entity => {
      const stateObj = this.hass!.states[entity.id];
      return html`
        <div class="entity-row">
          <state-badge .hass=${this.hass} .stateObj=${stateObj}> </state-badge>
          <div class="info">
            ${prettyPrint(entity.name)}
            <div class="secondary">
              ${entity.id}
            </div>
          </div>
          <mwc-button @click=${() => this.showEntityDialog(this, entity.id)}>
            Add to alarm
          </mwc-button>
        </div>
      `;
    });
  }

  static get styles(): CSSResult {
    return css`
      ${commonStyle}
    `;
  }
}
