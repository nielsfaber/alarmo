import { LitElement, html, customElement, property, PropertyValues } from 'lit-element';
import { HomeAssistant, fireEvent, navigate } from 'custom-card-helpers';
import { loadHaForm } from '../load-ha-form';

import { computeIcon, prettyPrint, computeName, handleError } from '../helpers';
import { Dictionary, AlarmoConfig, AlarmoSensor } from '../types';

import '../cards/sensor-editor-card.ts';
import '../components/alarmo-table.ts';

import { commonStyle } from '../styles';
import { UnsubscribeFunc } from 'home-assistant-js-websocket';
import { fetchConfig, fetchSensors, saveSensor } from '../data/websockets';
import { SubscribeMixin } from '../subscribe-mixin';
import { localize } from '../../localize/localize';
import { TableColumn, TableData } from '../components/alarmo-table';
import { defaultSensorConfig, isValidSensor } from '../data/sensors';
import { IconArmedAway, IconArmedHome } from '../const';

@customElement('alarm-view-sensors')
export class AlarmViewSensors extends SubscribeMixin(LitElement) {
  hass?: HomeAssistant;
  @property() narrow!: boolean;
  @property() path!: string[] | null;

  @property() config?: AlarmoConfig;
  @property() sensors: Dictionary<AlarmoSensor> = {};

  @property() addSelection: string[] = [];

  public hassSubscribe(): Promise<UnsubscribeFunc>[] {
    this._fetchData();
    return [
      this.hass!.connection.subscribeEvents(
        () => this._fetchData(),
        "alarmo_updated"
      ),
    ];
  }

  private async _fetchData(): Promise<void> {
    if (!this.hass) {
      return;
    }
    const config = await fetchConfig(this.hass);
    this.config = config;
    const sensors = await fetchSensors(this.hass);
    this.sensors = sensors;
  }

  firstUpdated() {
    (async () => await loadHaForm())();
  }

  render() {
    if (!this.hass || !this.config || !this.sensors) return html``;
    if (this.path && this.path.length == 2 && this.path[0] == "edit") {
      return html`
      <sensor-editor-card
        .hass=${this.hass}
        .narrow=${this.narrow}
        .item=${this.path[1]}
      >

      </sensor-editor-card>
    `
    }
    else {
      return html`
      ${this.sensorsPanel()}
      ${this.addSensorsPanel()}

    `;
    }
  }

  sensorsPanel() {
    if (!this.hass) return html``;

    let sensorsList = Object.keys(this.sensors)
      .map(e => {
        const stateObj = this.hass!.states[e];
        return {
          id: e,
          name: computeName(stateObj),
          icon: computeIcon(stateObj),
        }
      });

    sensorsList.sort((a, b) => (a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1));

    const columns: Dictionary<TableColumn> = {
      icon: {
        width: "40px",
      },
      name: {
        title: this.hass.localize("ui.components.area-picker.add_dialog.name"),
        width: "50%",
        grow: true,
        text: true
      },
      id: {
        title: this.hass.localize("ui.components.entity.entity-picker.entity"),
        width: "40%",
        hide: this.narrow,
        text: true,
      },
      modes: {
        title: localize("panels.sensors.cards.sensors.table.arm_modes", this.hass.language),
        width: "25%",
        text: true
      }

    };
    const data = sensorsList.map(item => {
      let output: TableData = {
        icon: html`<state-badge .hass=${this.hass} .stateObj=${this.hass!.states[item.id]}></state-badge>`,
        name: this.sensors[item.id].name || prettyPrint(item.name),
        id: item.id,
        modes: this.sensors[item.id].always_on
          ? localize("panels.sensors.cards.sensors.table.always_on", this.hass!.language)
          : this.sensors[item.id].modes.filter(e => this.config?.modes[e].enabled).map(e => localize(`common.modes_short.${e}`, this.hass!.language)).join(", ")
      };
      return output;
    });

    return html`
      <ha-card header="${localize("panels.sensors.cards.sensors.title", this.hass.language)}">
        <div class="card-content">
          ${localize("panels.sensors.cards.sensors.description", this.hass.language)}
        </div>

      <alarmo-table
        ?selectable=${true}
        .columns=${columns}
        .data=${data}
        @row-click=${(ev: CustomEvent) => {
        const id = String(ev.detail.id);
        navigate(this, `/alarmo/sensors/edit/${id}`, true);
      }}
      >
        ${localize("panels.sensors.cards.sensors.no_items", this.hass.language)}
      </alarmo-table>
    </ha-card>
    `;
  }

  addSensorsPanel() {
    if (!this.hass) return html``;

    let addSensorsList = Object.values(this.hass.states)
      .filter(e => isValidSensor(e))
      .filter(e => !Object.keys(this.sensors).includes(e.entity_id))
      .map(e => Object({
        id: e.entity_id,
        name: computeName(e),
        icon: computeIcon(e),
      }));

    addSensorsList.sort((a, b) => (a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1));


    const columns: Dictionary<TableColumn> = {
      checkbox: {
        width: "48px",
      },
      icon: {
        width: "40px",
      },
      name: {
        title: this.hass.localize("ui.components.area-picker.add_dialog.name"),
        width: "40%",
        grow: true,
        text: true
      },
      id: {
        title: this.hass.localize("ui.components.entity.entity-picker.entity"),
        width: "40%",
        hide: this.narrow,
        text: true
      }

    };

    const data = addSensorsList.map(item => {
      let output: TableData = {
        checkbox: html`
        <ha-checkbox
          @change=${(e: Event) => this.toggleSelect(e, item.id)}
          ?checked=${this.addSelection.includes(item.id)}
        >
        </ha-checkbox>`,
        icon: html`<state-badge .hass=${this.hass} .stateObj=${this.hass!.states[item.id]}></state-badge>`,
        name: prettyPrint(item.name),
        id: item.id
      };
      return output;
    });

    return html`
    <ha-card header="${localize("panels.sensors.cards.add_sensors.title", this.hass.language)}">
      <div class="card-content">
        ${localize("panels.sensors.cards.add_sensors.description", this.hass.language)}
      </div>

      <alarmo-table
        .columns=${columns}
        .data=${data}
      >
        ${localize("panels.sensors.cards.add_sensors.no_items", this.hass.language)}
      </alarmo-table>
        
      <div class="card-actions">
        <mwc-button
          @click=${this.addSelected}
          ?disabled=${this.addSelection.length == 0}
        >
          ${localize("panels.sensors.cards.add_sensors.actions.add_to_alarm", this.hass!.language)}
        </mwc-button>
      </div>
    </ha-card>
    `;
  }

  toggleSelect(ev: Event, id: string) {
    const checked = (ev.target as HTMLInputElement).checked;
    this.addSelection = checked && !this.addSelection.includes(id)
      ? [...this.addSelection, id]
      : !checked ? this.addSelection.filter(e => e != id) : this.addSelection;
  }

  addSelected(ev: Event) {
    if (!this.hass || !this.config) return;
    const data = this.addSelection.map(e => defaultSensorConfig(this.hass!.states[e], this.config!)).filter(e => e) as AlarmoSensor[];

    data.forEach(el => {
      saveSensor(this.hass!, el)
        .catch(e => handleError(e, ev))
        .then(() => {

        });
    });

    this.addSelection = [];
  }

  static styles = commonStyle;
}
