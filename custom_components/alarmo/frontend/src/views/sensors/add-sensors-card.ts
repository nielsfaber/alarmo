import { UnsubscribeFunc } from 'home-assistant-js-websocket';
import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators';
import { localize } from '../../../localize/localize';
import { TableColumn, TableData, TableFilterConfig } from '../../components/alarmo-table';
import { defaultSensorConfig, getConfigurableSensors, sensorClassToType } from '../../data/sensors';
import { fetchAreas, fetchSensors, saveSensor } from '../../data/websockets';
import { handleError, prettyPrint } from '../../helpers';
import { commonStyle } from '../../styles';
import { SubscribeMixin } from '../../subscribe-mixin';
import { AlarmoArea, AlarmoSensor, Dictionary, EArmModes, HomeAssistant } from '../../types';

import '../../components/alarmo-table.ts';
import { ESensorTypes } from '../../const';

type SensorItem = {
  id: string;
  name: string;
  icon: string;
  type?: ESensorTypes;
};

@customElement('add-sensors-card')
export class AddSensorsCard extends SubscribeMixin(LitElement) {
  @property()
  hass!: HomeAssistant;

  @property()
  narrow!: boolean;

  @property()
  addSelection: string[] = [];

  @property()
  areas: Dictionary<AlarmoArea> = {};

  @property()
  sensors: Dictionary<AlarmoSensor> = {};

  public hassSubscribe(): Promise<UnsubscribeFunc>[] {
    this._fetchData();
    return [this.hass!.connection.subscribeMessage(() => this._fetchData(), { type: 'alarmo_config_updated' })];
  }

  private async _fetchData(): Promise<void> {
    if (!this.hass) {
      return;
    }
    this.areas = await fetchAreas(this.hass);
  }

  async firstUpdated() {
    this.areas = await fetchAreas(this.hass);
    this.sensors = await fetchSensors(this.hass);
  }

  render() {
    const columns: Dictionary<TableColumn> = {
      checkbox: {
        width: '48px',
        renderer: (item: SensorItem) => html`
          <ha-checkbox
            @change=${(e: Event) => this.toggleSelect(e, item.id)}
            ?checked=${this.addSelection.includes(item.id)}
          ></ha-checkbox>
        `,
      },
      icon: {
        width: '40px',
        renderer: (item: SensorItem) => html`
          <state-badge .hass=${this.hass} .stateObj=${this.hass!.states[item.id]}></state-badge>
        `,
      },
      name: {
        title: this.hass.localize('ui.components.entity.entity-picker.entity'),
        width: '40%',
        grow: true,
        text: true,
        renderer: (item: SensorItem) => html`
          ${prettyPrint(item.name)}
          <span class="secondary">${item.id}</span>
        `,
      },
      type: {
        title: localize('panels.sensors.cards.add_sensors.table.type', this.hass.language),
        width: '40%',
        hide: this.narrow,
        text: true,
        renderer: (item: SensorItem) =>
          item.type
            ? localize(`panels.sensors.cards.editor.fields.device_type.choose.${item.type}.name`, this.hass.language)
            : this.hass.localize('state.default.unknown'),
      },
    };

    const sensorList = getConfigurableSensors(this.hass, Object.keys(this.sensors), true);

    const tableData = sensorList.map(item => {
      const output = {
        ...item,
        type: sensorClassToType(this.hass.states[item.id]),
        isSupportedType: sensorClassToType(this.hass.states[item.id]) !== undefined ? 'true' : 'false',
      };
      return output;
    });

    return html`
      <ha-card header="${localize('panels.sensors.cards.add_sensors.title', this.hass.language)}">
        <div class="card-content">
          ${localize('panels.sensors.cards.add_sensors.description', this.hass.language)}
        </div>

        <alarmo-table
          .hass=${this.hass}
          .columns=${columns}
          .data=${tableData}
          .filters=${this.getTableFilterOptions()}
        >
          ${localize('panels.sensors.cards.add_sensors.no_items', this.hass.language)}
        </alarmo-table>

        <div class="card-actions">
          <ha-button appearance="plain" @click=${this.addSelected} ?disabled=${this.addSelection.length == 0}>
            ${localize('panels.sensors.cards.add_sensors.actions.add_to_alarm', this.hass!.language)}
          </ha-button>
        </div>
      </ha-card>
    `;
  }

  toggleSelect(ev: Event, id: string) {
    const checked = (ev.target as HTMLInputElement).checked;
    this.addSelection =
      checked && !this.addSelection.includes(id)
        ? [...this.addSelection, id]
        : !checked
          ? this.addSelection.filter(e => e != id)
          : this.addSelection;
  }

  addSelected(ev: Event) {
    if (!this.hass) return;

    const modeList: EArmModes[] = Object.values(this.areas)
      .map(e =>
        Object.entries(e.modes)
          .filter(([, v]) => v.enabled)
          .map(([k]) => k as EArmModes)
      )
      .reduce((a, b) => a.filter(i => b.includes(i)));

    const data = this.addSelection
      .map(e => defaultSensorConfig(this.hass!.states[e], modeList))
      .map(e =>
        Object.keys(this.areas).length == 1
          ? Object.assign(e as any, {
            area: Object.keys(this.areas)[0],
          })
          : e
      )
      .filter(e => e) as AlarmoSensor[];

    data.forEach(el => {
      saveSensor(this.hass!, el)
        .catch(e => handleError(e, ev))
        .then();
    });

    this.addSelection = [];
  }

  private getTableFilterOptions() {
    const filterConfig: TableFilterConfig = {
      isSupportedType: {
        name: localize('panels.sensors.cards.add_sensors.actions.filter_supported', this.hass!.language),
        items: [{
          value: 'true',
          name: 'true'
        }],
        value: ['true'],
        binary: true
      },
    };
    return filterConfig;
  }

  static styles = commonStyle;
}
