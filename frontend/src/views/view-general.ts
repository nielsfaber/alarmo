import { LitElement, html, customElement, property } from 'lit-element';
import { HomeAssistant, navigate } from 'custom-card-helpers';
import { loadHaForm } from '../load-ha-form';
import { AlarmoConfig, EArmModes } from '../types';
import { commonStyle } from '../styles';

import '../components/time-slider';
import '../cards/alarm-mode-card';
import '../components/settings-row.ts';
import '../cards/mqtt-config-card.ts';

import { UnsubscribeFunc } from 'home-assistant-js-websocket';
import { fetchConfig, saveConfig } from '../data/websockets';
import { SubscribeMixin } from '../subscribe-mixin';
import { localize } from '../../localize/localize';
import { pick, handleError } from '../helpers';

@customElement('alarm-view-general')
export class AlarmViewGeneral extends SubscribeMixin(LitElement) {
  hass?: HomeAssistant;
  @property() narrow!: boolean;
  @property() path!: string[] | null;

  @property() data?: Partial<AlarmoConfig>;

  @property() config?: AlarmoConfig;
  @property() trigger_time = 0;
  @property() disarm_after_trigger = false;

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
    this.data = pick(this.config, ['trigger_time', 'disarm_after_trigger', 'mqtt']);
    this.trigger_time = config.trigger_time;
    this.disarm_after_trigger = config.disarm_after_trigger;
  }

  firstUpdated() {
    (async () => await loadHaForm())();
  }

  render() {
    if (!this.hass || !this.config || !this.data) return html``;

    if (this.path && this.path[0] == "mqtt_configuration") {
      return html`
      <mqtt-config-card
        .hass=${this.hass}
        .narrow=${this.narrow}
      >
      </mqtt-config-card>
    `;
    }
    else {

      return html`
      <ha-card header="${localize("panels.general.cards.general.title", this.hass.language)}">
        <div class="card-content">
          ${localize("panels.general.cards.general.description", this.hass.language)}
        </div>

        <settings-row .narrow=${this.narrow}>
          <span slot="heading">${localize("panels.general.cards.general.fields.trigger_time.heading", this.hass.language)}</span>
          <span slot="description">${localize("panels.general.cards.general.fields.trigger_time.description", this.hass.language)}</span>
          <time-slider
            .hass=${this.hass}
            unit="min"
            max="3600"
            zeroValue=${localize("components.time_slider.infinite", this.hass.language)}
            value=${Math.round(this.data!.trigger_time!)}
            @change=${(ev: Event) => this.data = { ...this.data, trigger_time: Number((ev.target as HTMLInputElement).value) }}
        }}
          >
          </time-slider>
        </settings-row>

        <settings-row .narrow=${this.narrow}>
          <span slot="heading">${localize("panels.general.cards.general.fields.disarm_after_trigger.heading", this.hass.language)}</span>
          <span slot="description">${localize("panels.general.cards.general.fields.disarm_after_trigger.description", this.hass.language)}</span>
          <ha-switch
            ?checked=${this.data!.disarm_after_trigger}
            @change=${(ev: Event) => this.data = { ...this.data, disarm_after_trigger: (ev.target as HTMLInputElement).checked }}
        }}
          >
          </ha-switch>
        </settings-row>

        <settings-row .narrow=${this.narrow}>
          <span slot="heading">${localize("panels.general.cards.general.fields.enable_mqtt.heading", this.hass.language)}</span>
          <span slot="description">${localize("panels.general.cards.general.fields.enable_mqtt.description", this.hass.language)}</span>
          <ha-switch
            ?checked=${this.data?.mqtt?.enabled}
            @change=${(ev: Event) => { this.data = { ...this.data!, mqtt: { ...this.data!.mqtt!, enabled: (ev.target as HTMLInputElement).checked } } }}
          >
          </ha-switch>
        </settings-row>

        ${this.data?.mqtt?.enabled
          ?
          html`
        <div style="padding: 0px 0px 16px 16px">
          <mwc-button
            outlined
            @click=${() => navigate(this, "/alarmo/general/mqtt_configuration", true)}
          >
            ${localize("panels.general.cards.general.actions.setup_mqtt", this.hass.language)}
          </mwc-button>
        </div>
        `
          :
          ''
        }

        <div class="card-actions">
          <mwc-button @click=${this.saveClick}>
            ${this.hass.localize("ui.common.save")}
          </mwc-button>
        </div>
      </ha-card>

      <alarm-mode-card
        .hass=${this.hass}
        mode=${EArmModes.ArmedAway}
        .config=${this.config.modes[EArmModes.ArmedAway]}
        .narrow=${this.narrow}
      >
        <span slot="heading">${localize("common.modes_long.armed_away", this.hass.language)}</span>
        <span slot="description">${localize("panels.general.cards.armed_away.description", this.hass.language)}</slot>
      </alarm-mode-card>

      <alarm-mode-card
        .hass=${this.hass}
        mode=${EArmModes.ArmedNight}
        .config=${this.config.modes[EArmModes.ArmedNight]}
        .narrow=${this.narrow}
      >
        <span slot="heading">${localize("common.modes_long.armed_night", this.hass.language)}</span>
        <span slot="description">${localize("panels.general.cards.armed_night.description", this.hass.language)}</slot>
      </alarm-mode-card>

      <alarm-mode-card
        .hass=${this.hass}
        mode=${EArmModes.ArmedHome}
        .config=${this.config.modes[EArmModes.ArmedHome]}
        .narrow=${this.narrow}
      >
        <span slot="heading">${localize("common.modes_long.armed_home", this.hass.language)}</span>
        <span slot="description">${localize("panels.general.cards.armed_home.description", this.hass.language)}</slot>
      </alarm-mode-card>

      <alarm-mode-card
        .hass=${this.hass}
        mode=${EArmModes.ArmedCustom}
        .config=${this.config.modes[EArmModes.ArmedCustom]}
        .narrow=${this.narrow}
      >
        <span slot="heading">${localize("common.modes_long.armed_custom", this.hass.language)}</span>
        <span slot="description">${localize("panels.general.cards.armed_custom.description", this.hass.language)}</slot>
      </alarm-mode-card>
    `;
    }
  }

  saveClick(ev: Event) {
    if (!this.hass || !this.data) return;
    saveConfig(this.hass, this.data)
      .catch(e => handleError(e, ev))
      .then(() => {

      })
  }

  static styles = commonStyle;
}
