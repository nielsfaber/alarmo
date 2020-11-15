import { LitElement, html, customElement, property } from 'lit-element';
import { HomeAssistant, navigate } from 'custom-card-helpers';
import { loadHaForm } from '../load-ha-form';
import { AlarmoConfig, MqttConfig } from '../types';
import { commonStyle } from '../styles';

import '../components/settings-row.ts';

import { UnsubscribeFunc } from 'home-assistant-js-websocket';
import { fetchConfig, saveConfig } from '../data/websockets';
import { SubscribeMixin } from '../subscribe-mixin';
import { localize } from '../../localize/localize';
import { omit, handleError } from '../helpers';

@customElement('mqtt-config-card')
export class MqttConfigCard extends SubscribeMixin(LitElement) {
  hass?: HomeAssistant;
  @property() narrow!: boolean;

  @property() config?: AlarmoConfig;
  @property() selection?: MqttConfig;

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
    this.selection = omit(config.mqtt, ['availability_topic']) as MqttConfig;
  }

  firstUpdated() {
    (async () => await loadHaForm())();
  }

  render() {
    if (!this.hass || !this.selection) return html``;

    return html`
      <ha-card>
        <div class="card-header">
          <div class="name">
            ${localize("panels.general.cards.general.title", this.hass.language)}
          </div>
          <ha-icon-button
            icon="hass:close"
            @click=${this.cancelClick}
          >
          </ha-icon-button>
        </div>
        <div class="card-content">
          ${localize("panels.general.cards.general.description", this.hass.language)}
        </div>

        <settings-row .narrow=${this.narrow}>
          <span slot="heading">State topic</span>
          <span slot="description">Topic on which state updates are published</span>
          <paper-input
            label="State topic"
            value=${this.selection.state_topic}
            @change=${(ev: Event) => { this.selection = { ...this.selection!, state_topic: (ev.target as HTMLInputElement).value } }}
          ></paper-input>
        </settings-row>

        <settings-row .narrow=${this.narrow}>
          <span slot="heading">Command topic</span>
          <span slot="description">Topic on which arm/disarm commands are sent</span>
          <paper-input
            label="Command topic"
            value=${this.selection.command_topic}
            @change=${(ev: Event) => { this.selection = { ...this.selection!, command_topic: (ev.target as HTMLInputElement).value } }}
          ></paper-input>
        </settings-row>

        <settings-row .narrow=${this.narrow}>
          <span slot="heading">Require code</span>
          <span slot="description">Require a code </span>
          <ha-switch
            ?checked=${this.selection.require_code}
            @change=${(ev: Event) => { this.selection = { ...this.selection!, require_code: (ev.target as HTMLInputElement).checked } }}
          >
          </ha-switch>
        </settings-row>

        <div class="card-actions">
          <mwc-button @click=${this.saveClick}>
            ${this.hass.localize("ui.common.save")}
          </mwc-button>
        </div>
      </ha-card>
      
    `;
  }

  saveClick(ev: Event) {
    if (!this.hass) return;

    saveConfig(this.hass, { mqtt: this.selection })
      .catch(e => handleError(e, ev))
      .then(() => { this.cancelClick(); })
  }

  private cancelClick() {
    navigate(this, "/alarmo/general", true);
  }

  static styles = commonStyle;
}
