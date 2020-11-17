import { LitElement, html, customElement, property } from 'lit-element';
import { HomeAssistant } from 'custom-card-helpers';
import { EArmModes, AlarmoModeConfig } from '../types';

import '../components/time-slider';
import { commonStyle } from '../styles';
import { localize } from '../../localize/localize';
import { saveModeConfig } from '../data/websockets';

@customElement('alarm-mode-card')
export class AlarmModeCard extends LitElement {
  @property() hass?: HomeAssistant;
  @property() narrow!: boolean;

  @property({ type: String }) mode?: EArmModes;
  @property({ type: Object }) config?: AlarmoModeConfig;

  @property() enabled = false;
  @property() leave_time: number = 0;
  @property() entry_time: number = 0;

  firstUpdated() {
    if (!this.config) return;
    this.enabled = this.config.enabled;
    this.leave_time = this.config.leave_time;
    this.entry_time = this.config.entry_time;
  }

  render() {
    if (!this.hass) return html``;
    return html`
        <ha-card
        >
          <div class="card-header">
            <div class="name">
              <slot name="heading"></slot>
            </div>
            <ha-switch
              ?disabled=${this.mode == EArmModes.ArmedAway}
              ?checked=${this.enabled}
              @change=${this.toggleEnable}
            >
            </ha-switch>
          </div>
          <div class="card-content">
              <slot name="description"></slot>
          </div>

          ${
      this.enabled
        ? html`
          <settings-row .narrow=${this.narrow}>
            <span slot="heading">${localize("panels.general.cards.common.fields.leave_time.heading", this.hass.language)}</span>
            <span slot="description">${localize("panels.general.cards.common.fields.leave_time.description", this.hass.language)}</span>
            <time-slider
              .hass=${this.hass}
              ?disabled=${!this.enabled}
              unit="sec"
              max="180"
              zeroValue=${localize("components.time_slider.none", this.hass.language)}
              value=${this.leave_time}
              @change=${ev => { this.leave_time = Number(ev.target.value); }}
            >
            </time-slider>
          </settings-row>

          <settings-row .narrow=${this.narrow}>
            <span slot="heading">${localize("panels.general.cards.common.fields.entry_time.heading", this.hass.language)}</span>
            <span slot="description">${localize("panels.general.cards.common.fields.entry_time.description", this.hass.language)}</span>
            <time-slider
              .hass=${this.hass}
              ?disabled=${!this.enabled}
              unit="sec"
              max="180"
              zeroValue=${localize("components.time_slider.none", this.hass.language)}
              value=${this.entry_time}
              @change=${ev => { this.entry_time = Number(ev.target.value); }}
            >
            </time-slider>
          </settings-row>
          ` : ''
      }
          <div class="card-actions">
            <mwc-button ?disabled=${!this.enabled} @click=${this.saveClick}>
              ${this.hass.localize("ui.common.save")}
            </mwc-button>
          </div>
        </ha-card>
    `;
  }

  toggleEnable(ev: Event) {
    if (!this.hass || !this.mode) return;
    this.enabled = (ev.target as HTMLInputElement).checked;

    saveModeConfig(this.hass, {
      mode: this.mode,
      enabled: this.enabled,
    })
      .catch(() => {

      })
      .then(() => {

      });

  }

  saveClick() {
    if (!this.hass || !this.mode) return;

    saveModeConfig(this.hass, {
      mode: this.mode,
      leave_time: this.leave_time,
      entry_time: this.entry_time
    })
      .catch(() => {
      })
      .then(() => {

      });
  }

  static styles = commonStyle;
}
