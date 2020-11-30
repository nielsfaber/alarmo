import { LitElement, html, customElement, property } from 'lit-element';
import { HomeAssistant, navigate } from 'custom-card-helpers';
import { commonStyle } from '../styles';
import { AlarmoSensor, AlarmoConfig, EArmModes } from '../types';
import { fetchConfig, fetchSensors, saveSensor, deleteSensor } from '../data/websockets';
import { localize } from '../../localize/localize';
import { Unique, Without, handleError } from '../helpers';

import '../dialogs/error-dialog';
import { HassEntity } from 'home-assistant-js-websocket';

@customElement('sensor-editor-card')
export class sensorEditorCard extends LitElement {
  @property() hass!: HomeAssistant;
  @property() narrow!: boolean;

  @property() item!: string;
  @property() data!: AlarmoSensor;

  config?: AlarmoConfig;

  async firstUpdated() {

    const config = await fetchConfig(this.hass);
    this.config = config;
    const sensors = await fetchSensors(this.hass);
    this.data = sensors[this.item];
  }

  render() {
    if (!this.data) return html``;
    const stateObj = this.hass.states[this.data.entity_id] as HassEntity | undefined;
    return html`
        <ha-card
        >
          <div class="card-header">
            <div class="name">
              ${localize("panels.sensors.cards.editor.title", this.hass.language)}
            </div>
            <ha-icon-button
              icon="hass:close"
              @click=${this.cancelClick}
            >
            </ha-icon-button>
          </div>
          <div class="card-content">
              ${localize("panels.sensors.cards.editor.description", this.hass.language, "{entity}", this.item)}
          </div>

        <settings-row .narrow=${this.narrow}>
          <span slot="heading">${localize("panels.sensors.cards.editor.fields.name.heading", this.hass.language)}</span>
          <span slot="description">${localize("panels.sensors.cards.editor.fields.name.description", this.hass.language)}</span>

          <paper-input
            label="${localize("panels.sensors.cards.editor.fields.name.heading", this.hass.language)}"
            placeholder=${stateObj?.attributes.friendly_name || ""}
            value=${this.data.name}
            @change=${(ev: Event) => this.data = { ...this.data, name: (ev.target as HTMLInputElement).value }}
          >
          </paper-input>

        </settings-row>
        
        <settings-row .narrow=${this.narrow}>
          <span slot="heading">${localize("panels.sensors.cards.editor.fields.always_on.heading", this.hass.language)}</span>
          <span slot="description">${localize("panels.sensors.cards.editor.fields.always_on.description", this.hass.language)}</span>

          <ha-switch
            ?checked=${this.data.always_on}
            @change=${(ev: Event) => this.data = { ...this.data, always_on: (ev.target as HTMLInputElement).checked }}
          >
          </ha-switch>

        </settings-row>

        ${
      this.data.always_on
        ? ''
        : html`
        <settings-row .narrow=${this.narrow}>
          <span slot="heading">${localize("panels.sensors.cards.editor.fields.modes.heading", this.hass.language)}</span>
          <span slot="description">${localize("panels.sensors.cards.editor.fields.modes.description", this.hass.language)}</span>

          <div style="display: flex; flex-direction: column">
          ${Object.values(EArmModes).filter(e => Object.keys(this.config!.modes).includes(e) && this.config!.modes[e].enabled).map(e =>
          html`
            <div
              style="display: flex; align-items: center; cursor: pointer"
              @click=${(ev: Event) => { try { ((ev.target as HTMLElement).querySelector("ha-checkbox")! as HTMLElement).click(); } catch (e) { } }}
            >
              <ha-checkbox
                ?checked=${this.data.modes.includes(e)}
                @change=${
            (ev: Event) => {
              this.data = {
                ...this.data,
                modes: (ev.target as HTMLInputElement).checked
                  ? Unique(this.data.modes.concat([e]))
                  : Without(this.data.modes, e)
              };
            }}
            >
            </ha-checkbox>
            ${localize(`common.modes_long.${e}`, this.hass.language)}
            </div>
              `)}
          </div>

        </settings-row>
      `}

        ${
      this.data.always_on
        ? ''
        : html`
        <settings-row .narrow=${this.narrow}>
          <span slot="heading">${localize("panels.sensors.cards.editor.fields.immediate.heading", this.hass.language)}</span>
          <span slot="description">${localize("panels.sensors.cards.editor.fields.immediate.description", this.hass.language)}</span>

          <ha-switch
            ?checked=${this.data.immediate}
            @change=${(ev: Event) => this.data = { ...this.data, immediate: (ev.target as HTMLInputElement).checked }}
          >
          </ha-switch>

        </settings-row>
        `}

        
        ${
      this.data.always_on
        ? ''
        : html`
        <settings-row .narrow=${this.narrow}>
          <span slot="heading">${localize("panels.sensors.cards.editor.fields.allow_open.heading", this.hass.language)}</span>
          <span slot="description">${localize("panels.sensors.cards.editor.fields.allow_open.description", this.hass.language)}</span>

          <ha-switch
            ?checked=${this.data.allow_open}
            @change=${(ev: Event) => this.data = { ...this.data, allow_open: (ev.target as HTMLInputElement).checked }}
          >
          </ha-switch>

        </settings-row>
        `}

          <settings-row .narrow=${this.narrow}>
            <span slot="heading">${localize("panels.sensors.cards.editor.fields.trigger_unavailable.heading", this.hass.language)}</span>
            <span slot="description">${localize("panels.sensors.cards.editor.fields.trigger_unavailable.description", this.hass.language)}</span>

            <ha-switch
              ?checked=${this.data.trigger_unavailable}
              @change=${(ev: Event) => this.data = { ...this.data, trigger_unavailable: (ev.target as HTMLInputElement).checked }}
            >
            </ha-switch>

          </settings-row>
  
          <div class="card-actions">
            <mwc-button
              @click=${this.saveClick}
            >
              ${this.hass.localize("ui.common.save")}
            </mwc-button>

            <mwc-button
              class="warning"
              @click=${this.deleteClick}
            >
              ${this.hass.localize("ui.common.delete")}
            </mwc-button>
          </div>
        </ha-card>
    `;
  }

  private deleteClick(ev: Event) {
    deleteSensor(this.hass, this.item)
      .catch(e => handleError(e, ev))
      .then(() => { this.cancelClick(); });
  }


  private saveClick(ev: Event) {
    saveSensor(this.hass, { ...this.data })
      .catch(e => handleError(e, ev))
      .then(() => { this.cancelClick(); });
  }



  private cancelClick() {
    navigate(this, "/alarmo/sensors", true);
  }

  static styles = commonStyle;
}
