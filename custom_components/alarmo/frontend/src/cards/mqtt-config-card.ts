import { LitElement, html, customElement, property } from 'lit-element';
import { HomeAssistant, navigate } from 'custom-card-helpers';
import { loadHaForm } from '../load-ha-form';
import { AlarmoConfig, MqttConfig } from '../types';
import { commonStyle } from '../styles';

import '../components/settings-row.ts';
import '../components/collapsible-section.ts';

import { UnsubscribeFunc } from 'home-assistant-js-websocket';
import { fetchConfig, saveConfig } from '../data/websockets';
import { SubscribeMixin } from '../subscribe-mixin';
import { localize } from '../../localize/localize';
import { omit, handleError, prettyPrint, filterState, commandToState, Assign } from '../helpers';
import { AlarmStates, AlarmCommands } from '../const';

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
          <div class="name">${localize("panels.general.cards.mqtt.title", this.hass.language)}</div>
          <ha-icon-button
            icon="hass:close"
            @click=${this.cancelClick}
          >
          </ha-icon-button>
        </div>
        <div class="card-content">${localize("panels.general.cards.mqtt.description", this.hass.language)}</div>

        <settings-row .narrow=${this.narrow}>
          <span slot="heading">${localize("panels.general.cards.mqtt.fields.state_topic.heading", this.hass.language)}</span>
          <span slot="description">${localize("panels.general.cards.mqtt.fields.state_topic.description", this.hass.language)}</span>
          <paper-input
            label="${localize("panels.general.cards.mqtt.fields.state_topic.heading", this.hass.language)}"
            value=${this.selection.state_topic}
            @change=${(ev: Event) => { this.selection = { ...this.selection!, state_topic: (ev.target as HTMLInputElement).value } }}
          ></paper-input>
        </settings-row>

        <collapsible-section
           .narrow=${this.narrow}
          header=${localize("panels.general.cards.mqtt.fields.state_payload.heading", this.hass.language)}
        >
          ${Object.values(AlarmStates)
        .filter(e => filterState(e, this.config!))
        .map(e => html`
          <settings-row .narrow=${this.narrow}>
            <span slot="heading">${prettyPrint(e)}</span>
            <span slot="description">${localize("panels.general.cards.mqtt.fields.state_payload.item", this.hass!.language, "{state}", prettyPrint(e))}</span>
            <paper-input
              label=${prettyPrint(e)}
              placeholder=${e}
              value=${this.selection!.state_payload[e] || ""}
              @change=${(ev: Event) => { this.selection = Assign(this.selection!, { state_payload: { [e]: (ev.target as HTMLInputElement).value } }) }}
            >
            </paper-input>
          </settings-row>
          `)}
        </collapsible-section>

        <settings-row .narrow=${this.narrow}>
          <span slot="heading">${localize("panels.general.cards.mqtt.fields.command_topic.heading", this.hass.language)}</span>
          <span slot="description">${localize("panels.general.cards.mqtt.fields.command_topic.description", this.hass.language)}</span>
          <paper-input
            label="${localize("panels.general.cards.mqtt.fields.command_topic.heading", this.hass.language)}"
            value=${this.selection.command_topic}
            @change=${(ev: Event) => { this.selection = { ...this.selection!, command_topic: (ev.target as HTMLInputElement).value } }}
          ></paper-input>
        </settings-row>

        <collapsible-section
           .narrow=${this.narrow}
          header=${localize("panels.general.cards.mqtt.fields.command_payload.heading", this.hass.language)}
        >
          ${Object.values(AlarmCommands)
        .filter(e => filterState(commandToState(e)!, this.config!))
        .map(e => html`
          <settings-row .narrow=${this.narrow}>
            <span slot="heading">${prettyPrint(e)}</span>
            <span slot="description">${localize("panels.general.cards.mqtt.fields.command_payload.item", this.hass!.language, "{command}", prettyPrint(e))}</span>
            <paper-input
              label=${prettyPrint(e)}
              placeholder=${e}
              value=${this.selection!.command_payload[e] || ""}
              @change=${(ev: Event) => { this.selection = Assign(this.selection!, { command_payload: { [e]: (ev.target as HTMLInputElement).value } }) }}
            >
            </paper-input>
          </settings-row>
          `)}
        </collapsible-section>

        <settings-row .narrow=${this.narrow}>
          <span slot="heading">${localize("panels.general.cards.mqtt.fields.require_code.heading", this.hass.language)}</span>
          <span slot="description">${localize("panels.general.cards.mqtt.fields.require_code.description", this.hass.language)}</span>
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

    saveConfig(this.hass, { mqtt: { ...this.selection!, enabled: true } })
      .catch(e => handleError(e, ev))
      .then(() => { this.cancelClick(); })
  }

  private cancelClick() {
    navigate(this, "/alarmo/general", true);
  }

  static styles = commonStyle;
}
