import { LitElement, html, customElement, property } from 'lit-element';
import { HomeAssistant, navigate } from 'custom-card-helpers';
import { loadHaForm } from '../../load-ha-form';

import { computeIcon, prettyPrint, computeName, handleError, sortAlphabetically } from '../../helpers';
import { Dictionary, AlarmoSensor, EArmModes, AlarmoArea } from '../../types';

import './sensor-editor-card.ts';
import '../../components/alarmo-table.ts';
import '../../components/alarmo-chips.ts';

import { commonStyle } from '../../styles';
import { UnsubscribeFunc } from 'home-assistant-js-websocket';
import { fetchSensors, saveSensor, fetchAreas } from '../../data/websockets';
import { SubscribeMixin } from '../../subscribe-mixin';
import { localize } from '../../../localize/localize';
import { TableColumn, TableData } from '../../components/alarmo-table';
import { defaultSensorConfig, isValidSensor } from '../../data/sensors';
import { ESensorIcons, ESensorTypes } from '../../const';
import { AlarmoChip } from '../../components/alarmo-chips';

@customElement('alarm-view-sensors')
export class AlarmViewSensors extends SubscribeMixin(LitElement) {
  hass?: HomeAssistant;
  @property() narrow!: boolean;
  @property() path!: string[] | null;

  @property() areas: Dictionary<AlarmoArea> = {};
  @property() sensors: Dictionary<AlarmoSensor> = {};

  @property() addSelection: string[] = [];

  @property() showAllSensorEntities = false;
  @property() selectedArea?: string;

  @property() areaFilterOptions: AlarmoChip[] = [];

  public hassSubscribe(): Promise<UnsubscribeFunc>[] {
    this._fetchData();
    return [this.hass!.connection.subscribeMessage(() => this._fetchData(), { type: 'alarmo_config_updated' })];
  }

  private async _fetchData(): Promise<void> {
    if (!this.hass) {
      return;
    }
    this.areas = await fetchAreas(this.hass);
    this.sensors = await fetchSensors(this.hass);

    this.areaFilterOptions = Object.values(this.areas)
      .map(e =>
        Object({
          value: e.area_id,
          name: e.name,
          count: Object.values(this.sensors).filter(el => el.area == e.area_id).length
        })
      )
      .sort(sortAlphabetically)

    if (Object.values(this.sensors).filter(e => !e.area).length)
      this.areaFilterOptions = [{
        value: 'no_area',
        name: localize('panels.sensors.cards.sensors.filter.no_area', this.hass.language),
        count: Object.values(this.sensors).filter(e => !e.area).length
      }, ...this.areaFilterOptions];
  }

  firstUpdated() {
    (async () => await loadHaForm())();

    if (this.path && this.path.length == 2 && this.path[0] == 'filter') this.selectedArea = this.path[1];
  }

  render() {
    if (!this.hass) return html``;
    if (this.path && this.path.length == 2 && this.path[0] == 'edit') {
      return html`
        <sensor-editor-card .hass=${this.hass} .narrow=${this.narrow} .item=${this.path[1]}> </sensor-editor-card>
      `;
    } else {
      return html`
        ${this.sensorsPanel()} ${this.addSensorsPanel()}
      `;
    }
  }

  sensorsPanel() {
    if (!this.hass) return html``;

    const sensorsList = Object.keys(this.sensors).map(e => {
      const stateObj = this.hass!.states[e];
      return {
        id: e,
        name: computeName(stateObj),
        icon: computeIcon(stateObj),
      };
    });

    sensorsList.sort(sortAlphabetically);

    const columns: Dictionary<TableColumn> = {
      icon: {
        width: '40px',
      },
      name: {
        title: this.hass.localize('ui.components.entity.entity-picker.entity'),
        width: '60%',
        grow: true,
        text: true,
      },
      modes: {
        title: localize('panels.sensors.cards.sensors.table.arm_modes', this.hass.language),
        width: '25%',
        hide: this.narrow,
        text: true,
      },
      enabled: {
        title: 'Enabled',
        width: '68px',
        align: 'center',
      },
    };
    const data = sensorsList
      .filter(
        e =>
          !this.selectedArea ||
          !this.areaFilterOptions.find(e => e.value == this.selectedArea) ||
          this.sensors[e.id].area == this.selectedArea ||
          (this.selectedArea === 'no_area' && !this.sensors[e.id].area)
      )
      .map(item => {
        const type = Object.entries(ESensorTypes).find(([, v]) => v == this.sensors[item.id].type)![0];
        const output: TableData = {
          icon: html`
            <paper-tooltip animation-delay="0">
              ${localize(
            `panels.sensors.cards.editor.fields.device_type.choose.${ESensorTypes[type]}.name`,
            this.hass!.language
          )}
            </paper-tooltip>
            <ha-icon icon="${ESensorIcons[type]}"> </ha-icon>
          `,
          name: html`
            ${this.sensors[item.id].name || prettyPrint(item.name)}
            <span class="secondary">${item.id}</span>
          `,
          id: item.id,
          modes: html`
            ${this.sensors[item.id].always_on
              ? localize('panels.sensors.cards.sensors.table.always_on', this.hass!.language)
              : Object.values(EArmModes)
                .filter(e => this.sensors[item.id].modes.includes(e))
                .map(e => localize(`common.modes_short.${e}`, this.hass!.language))
                .join(', ')}
          `,
          enabled: html`
            <ha-switch
              @click=${(ev: Event) => {
              ev.stopPropagation();
            }}
              ?checked=${this.sensors[item.id].enabled}
              @change=${(ev: Event) => this.toggleEnabled(ev, item.id)}
            >
            </ha-switch>
          `,
        };
        return output;
      });

    return html`
      <ha-card header="${localize('panels.sensors.title', this.hass.language)}">
        <div class="card-content">
          ${localize('panels.sensors.cards.sensors.description', this.hass.language)}
        </div>

        ${this.areaFilterOptions.length > 1
        ? html`
              <div class="table-filter" ?narrow=${this.narrow}>
                <span class="header"
                  >${localize('panels.sensors.cards.sensors.filter.label', this.hass.language)}:</span
                >
                <alarmo-chips
                  .items=${this.areaFilterOptions}
                  value=${this.selectedArea}
                  selectable
                  @value-changed=${(ev: Event) => (this.selectedArea = (ev.target as HTMLInputElement).value)}
                >
                </alarmo-chips>
              </div>
            `
        : ''}
        <alarmo-table
          ?selectable=${true}
          .columns=${columns}
          .data=${data}
          @row-click=${(ev: CustomEvent) => {
        const id = String(ev.detail.id);
        navigate(this, `/alarmo/sensors/edit/${id}`, true);
      }}
        >
          ${localize('panels.sensors.cards.sensors.no_items', this.hass.language)}
        </alarmo-table>
      </ha-card>
    `;
  }

  addSensorsPanel() {
    if (!this.hass) return html``;

    const addSensorsList = Object.values(this.hass.states)
      .filter(e => isValidSensor(e, this.showAllSensorEntities))
      .filter(e => !Object.keys(this.sensors).includes(e.entity_id))
      .map(e =>
        Object({
          id: e.entity_id,
          name: computeName(e),
          icon: computeIcon(e),
        })
      ) as { id: string, name: string, icon: string }[];

    addSensorsList.sort(sortAlphabetically);

    const columns: Dictionary<TableColumn> = {
      checkbox: {
        width: '48px',
      },
      icon: {
        width: '40px',
      },
      name: {
        title: this.hass.localize('ui.components.area-picker.add_dialog.name'),
        width: '40%',
        grow: true,
        text: true,
      },
      id: {
        title: this.hass.localize('ui.components.entity.entity-picker.entity'),
        width: '40%',
        hide: this.narrow,
        text: true,
      },
    };

    const data = addSensorsList.map(item => {
      const output: TableData = {
        checkbox: html`
          <ha-checkbox
            @change=${(e: Event) => this.toggleSelect(e, item.id)}
            ?checked=${this.addSelection.includes(item.id)}
          >
          </ha-checkbox>
        `,
        icon: html`
          <state-badge .hass=${this.hass} .stateObj=${this.hass!.states[item.id]}></state-badge>
        `,
        name: prettyPrint(item.name),
        id: item.id,
      };
      return output;
    });

    return html`
      <ha-card header="${localize('panels.sensors.cards.add_sensors.title', this.hass.language)}">
        <div class="card-content">
          ${localize('panels.sensors.cards.add_sensors.description', this.hass.language)}
        </div>

        <div style="display: flex; justify-content: flex-end; padding: 8px 16px">
          <ha-switch
            @change=${(ev: Event) => {
        this.showAllSensorEntities = (ev.target as HTMLInputElement).checked;
      }}
            style="padding: 0px 8px"
          >
          </ha-switch>
          ${localize('panels.sensors.cards.add_sensors.actions.show_all', this.hass!.language)}
        </div>

        <alarmo-table .columns=${columns} .data=${data}>
          ${localize('panels.sensors.cards.add_sensors.no_items', this.hass.language)}
        </alarmo-table>

        <div class="card-actions">
          <mwc-button @click=${this.addSelected} ?disabled=${this.addSelection.length == 0}>
            ${localize('panels.sensors.cards.add_sensors.actions.add_to_alarm', this.hass!.language)}
          </mwc-button>
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

  toggleEnabled(ev: Event, id: string) {
    const enabled = (ev.target as HTMLInputElement).checked;
    saveSensor(this.hass!, { entity_id: id, enabled: enabled })
      .catch(e => handleError(e, ev))
      .then();
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
          ? Object.assign(e, {
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

  static styles = commonStyle;
}
