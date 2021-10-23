import { LitElement, html, css, CSSResultGroup } from 'lit';
import { property, customElement, state } from 'lit/decorators.js';
import { HomeAssistant } from 'custom-card-helpers';
import { fetchSensors, fetchSensorGroups, saveSensorGroup, deleteSensorGroup } from '../data/websockets';
import { Dictionary, AlarmoSensor, SensorGroup } from '../types';
import { dialogStyle } from '../styles';
import { localize } from '../../localize/localize';
import { UnsubscribeFunc } from 'home-assistant-js-websocket';
import { SubscribeMixin } from '../subscribe-mixin';
import { computeName, handleError, isDefined, prettyPrint, showErrorDialog, sortAlphabetically } from '../helpers';
import { ESensorIcons, ESensorTypes } from '../const';

import '../components/alarmo-chips.ts';

@customElement('create-sensor-group-dialog')
export class CreateSensorGroupDialog extends SubscribeMixin(LitElement) {

  @property({ attribute: false })
  public hass!: HomeAssistant;

  @state()
  private _params?: any;

  @property()
  sensorGroups: Dictionary<SensorGroup> = {};

  @property()
  sensors: Dictionary<AlarmoSensor> = {};

  @property()
  data!: SensorGroup;

  public hassSubscribe(): Promise<UnsubscribeFunc>[] {
    this._fetchData();
    return [this.hass!.connection.subscribeMessage(() => this._fetchData(), { type: 'alarmo_config_updated' })];
  }

  private async _fetchData(): Promise<void> {
    if (!this.hass) return;
    this.sensorGroups = await fetchSensorGroups(this.hass);
    this.sensors = await fetchSensors(this.hass);
  }

  public async showDialog(params: any): Promise<void> {
    await this._fetchData();
    this._params = params;
    if (params.group_id && Object.keys(this.sensorGroups).includes(params.group_id)) {
      this.data = { ...this.sensorGroups[params.group_id] };
    }
    else {
      this.data = {
        name: '',
        entities: [],
        timeout: 600
      };
    }
    await this.updateComplete;
  }

  public async closeDialog() {
    this._params = undefined;
  }

  render() {
    if (!this._params) return html``;
    return html`
      <ha-dialog
        open
        @closed=${this.closeDialog}
        @close-dialog=${this.closeDialog}
        .heading=${this.renderHeader()}
      >

        <div class="wrapper">

          <settings-row dialog>
            <span slot="heading">${localize('panels.sensors.dialogs.create_group.fields.name.heading', this.hass.language)}</span>
            <span slot="description">${localize('panels.sensors.dialogs.create_group.fields.name.description', this.hass.language)}</span>
            <paper-input
              label=${this.hass.localize('ui.components.area-picker.add_dialog.name')}
              @value-changed=${(ev: Event) => this.data = { ...this.data, name: String((ev.target as HTMLInputElement).value).trim() }}
              value="${this.data.name}"
            >
            </paper-input>
          </settings-row>

          <settings-row large dialog>
            <span slot="heading">${localize('panels.sensors.dialogs.create_group.fields.sensors.heading', this.hass.language)}</span>
            <span slot="description">${localize('panels.sensors.dialogs.create_group.fields.sensors.description', this.hass.language)}</span>

            <div>
              ${this.renderSensorOptions()}
            </div>
          </settings-row>

          <settings-row dialog>
            <span slot="heading">${localize('panels.sensors.dialogs.create_group.fields.timeout.heading', this.hass.language)}</span>
            <span slot="description">${localize('panels.sensors.dialogs.create_group.fields.timeout.description', this.hass.language)}</span>
            
            <time-slider
              .hass=${this.hass}
              unit="min"
              max="1200"
              .value=${this.data.timeout}
              @change=${(ev: Event) => this.data = { ...this.data, timeout: Number((ev.target as HTMLInputElement).value) }}
            >
            </time-slider>
          </settings-row>

        </div>
        <mwc-button slot="secondaryAction" @click=${this.saveClick}>
          ${this.hass.localize('ui.common.save')}
        </mwc-button>
        ${this.data.group_id
        ? html`
          <mwc-button slot="secondaryAction" @click=${this.deleteClick} class="warning">
            ${this.hass.localize('ui.common.delete')}
          </mwc-button>
          ` : ''
      }
      </ha-dialog>
    `;
  }

  renderHeader() {
    return html`
    <span class="header_title">
      ${this.data.group_id
        ? localize('panels.sensors.dialogs.edit_group.title', this.hass.language, '{name}', this.sensorGroups[this.data.group_id!].name)
        : localize('panels.sensors.dialogs.create_group.title', this.hass.language)
      }
    </span>
    <ha-icon-button
      .label=${this.hass.localize("ui.dialogs.generic.close")}
      icon="mdi:close"
      dialogAction="close"
      class="header_button"
    ></ha-icon-button>`;
  }

  renderSensorOptions() {
    let sensors = Object.keys(this.sensors)
      .filter(e => !isDefined(this.sensors[e].group) || this.sensors[e].group === this.data.group_id)
      .map(e => {
        const stateObj = this.hass!.states[e];
        const type = Object.entries(ESensorTypes).find(([, v]) => v == this.sensors[e].type)![0];
        return {
          value: e,
          name: this.sensors[e].name || prettyPrint(computeName(stateObj)),
          icon: ESensorIcons[type],
        };
      });
    sensors.sort(sortAlphabetically);

    if (!sensors.length) return localize('panels.sensors.cards.sensors.no_items', this.hass.language);

    return html`
      <alarmo-chips
        .items=${sensors}
        .value=${this.data.entities}
        ?selectable=${true}
        ?multiple=${true}
        @value-changed=${(ev: CustomEvent) => this.data = { ...this.data, entities: ev.detail.value }}
      >
      </alarmo-chips>
    `;
  }

  private saveClick(ev: Event) {

    if (!this.data.name.length)
      showErrorDialog(ev, localize('panels.sensors.dialogs.create_group.errors.invalid_name', this.hass.language));
    else if (
      (!this.data.group_id || this.data.name != this.sensorGroups[this.data.group_id].name) &&
      Object.values(this.sensorGroups).find(e => e.name.toLowerCase() == this.data.name.toLowerCase())
    )
      showErrorDialog(ev, localize('panels.sensors.dialogs.create_group.errors.invalid_name', this.hass.language));
    else if (this.data.entities.length < 2)
      showErrorDialog(ev, localize('panels.sensors.dialogs.create_group.errors.insufficient_sensors', this.hass.language));
    else {
      saveSensorGroup(this.hass, this.data)
        .catch(e => handleError(e, ev))
        .then(() => {
          this.closeDialog();
        });
    }
  }

  private deleteClick(ev: Event) {
    if (!this.data.group_id) return;
    deleteSensorGroup(this.hass, this.data.group_id!)
      .catch(e => handleError(e, ev))
      .then(() => {
        this.closeDialog();
      });
  }

  static get styles(): CSSResultGroup {
    return css`
    ${dialogStyle}
      div.wrapper {
        color: var(--primary-text-color);
      }
      mwc-button.warning {
        --mdc-theme-primary: var(--error-color);
      }
    `;
  }
}
