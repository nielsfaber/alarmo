import { HomeAssistant, navigate } from "custom-card-helpers";
import { UnsubscribeFunc } from "home-assistant-js-websocket";
import { css, CSSResultGroup, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators";
import { localize } from "../../../localize/localize";
import { AlarmoChip } from "../../components/alarmo-chips";
import { TableColumn, TableData } from "../../components/alarmo-table";
import { ESensorIcons, ESensorTypes } from "../../const";
import { fetchAreas, fetchSensors, saveSensor } from "../../data/websockets";
import { computeIcon, computeName, handleError, isDefined, prettyPrint, sortAlphabetically } from "../../helpers";
import { commonStyle } from "../../styles";
import { SubscribeMixin } from "../../subscribe-mixin";
import { AlarmoArea, AlarmoSensor, Dictionary, EArmModes } from "../../types";

import '../../components/alarmo-table.ts';
import '../../components/alarmo-chips.ts';

@customElement('sensors-overview-card')
export class SensorsOverviewCard extends SubscribeMixin(LitElement) {

  @property()
  hass!: HomeAssistant;

  @property()
  narrow!: boolean;

  @property()
  areas: Dictionary<AlarmoArea> = {};

  @property()
  sensors: Dictionary<AlarmoSensor> = {};

  @property()
  selectedArea?: string;

  @property()
  areaFilterOptions: AlarmoChip[] = [];

  @property()
  path!: string[] | null;

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

  async firstUpdated() {
    if (this.path && this.path.length == 2 && this.path[0] == 'filter') this.selectedArea = this.path[1];
  }

  render() {
    if (!this.hass) return html``;

    const namedSensors = Object.keys(this.sensors).filter(e => {
      const stateObj = this.hass.states[e];
      return stateObj && this.sensors[e].name?.length
        ? prettyPrint(computeName(stateObj)) != this.sensors[e].name
        : false;
    });

    return html`
      <ha-card header="${localize('panels.sensors.title', this.hass.language)}">
        <div class="card-content">
          ${localize('panels.sensors.cards.sensors.description', this.hass.language)}
        </div>

        ${namedSensors.length
        ? html`
        <ha-alert
          .alertType=${"warning"}
        >
          You have sensors assigned with a custom name, a feature which will be removed in an upcoming update. The following sensors are affected:
          <ul>
            ${namedSensors.map(e => html`
                <li>
                  '${this.sensors[e].name}' will be renamed to '${prettyPrint(computeName(this.hass.states[e]))}'
                  (<a href="#" @click=${() => { this.removeCustomName(e) }}>approve change</a>)
                </li>`
        )}
          </ul>
          If you want to maintain the current sensor names, please assign appropriate names in HA instead (see <a href="${String(window.location).replace("alarmo/sensors", "config/entities")}">here</a>).
        </ha-alert>
        `: ''}

        ${this.areaFilterOptions.length > 1
        ? html`
            <div class="table-filter" ?narrow=${this.narrow}>
            <span class="header">${localize('panels.sensors.cards.sensors.filter.label', this.hass.language)}:</span>
            <alarmo-chips
              .items=${this.areaFilterOptions}
              value=${this.selectedArea}
              selectable
              @value-changed=${(ev: Event) => (this.selectedArea = (ev.target as HTMLInputElement).value)}
            >
            </alarmo-chips>
            </div>
        ` : ''}

        <alarmo-table
          ?selectable=${true}
          .columns=${this.tableColumns()}
          .data=${this.renderTableData()}
          @row-click=${(ev: CustomEvent) => { navigate(this, `/alarmo/sensors/edit/${String(ev.detail.id)}`, true) }}
        >
          ${localize('panels.sensors.cards.sensors.no_items', this.hass.language)}
        </alarmo-table>
      </ha-card>
    `;
  }

  private tableColumns(): Dictionary<TableColumn> {
    return {
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
        title: localize('panels.actions.cards.notifications.table.enabled', this.hass.language),
        width: '68px',
        align: 'center',
      },
    };
  }

  private renderTableData(): TableData[] {

    let sensorsList = Object.keys(this.sensors).map(e => {
      const stateObj = this.hass!.states[e];
      return {
        id: e,
        name: computeName(stateObj),
        icon: computeIcon(stateObj),
      };
    });
    sensorsList.sort(sortAlphabetically);

    sensorsList = sensorsList
      .filter(
        e =>
          !this.selectedArea ||
          !this.areaFilterOptions.find(e => e.value == this.selectedArea) ||
          this.sensors[e.id].area == this.selectedArea ||
          (this.selectedArea === 'no_area' && !this.sensors[e.id].area)
      );

    return sensorsList.map(e => this.renderTableDataRow(e));
  }

  private renderTableDataRow(item: { id: string, name: string, icon: string }): TableData {
    const type = Object.entries(ESensorTypes).find(([, v]) => v == this.sensors[item.id].type)![0];
    const stateObj = this.hass.states[item.id];
    const output: TableData = {
      icon: html`
        <paper-tooltip animation-delay="0">
          ${stateObj
          ? localize(`panels.sensors.cards.editor.fields.device_type.choose.${ESensorTypes[type]}.name`, this.hass!.language)
          : this.hass.localize("state_badge.default.entity_not_found")
        }
        </paper-tooltip>
        <ha-icon icon="${stateObj ? ESensorIcons[type] : "hass:help-circle-outline"}"> </ha-icon>
      `,
      name: html`
        ${stateObj
          ? this.sensors[item.id].name || prettyPrint(item.name)
          : prettyPrint(item.name)
        }
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
          @click=${(ev: Event) => { ev.stopPropagation() }}
          ?checked=${this.sensors[item.id].enabled}
          @change=${(ev: Event) => this.toggleEnabled(ev, item.id)}
        >
        </ha-switch>
      `,
    };
    return output;
  }

  toggleEnabled(ev: Event, id: string) {
    const enabled = (ev.target as HTMLInputElement).checked;
    saveSensor(this.hass!, { entity_id: id, enabled: enabled })
      .catch(e => handleError(e, ev))
      .then();
  }

  removeCustomName(id: string) {
    let data = {
      entity_id: id,
      name: ''
    };
    saveSensor(this.hass, data);
  }

  static styles = commonStyle;
}