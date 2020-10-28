import { LitElement, html, customElement, css, property } from 'lit-element';
import { HomeAssistant } from 'custom-card-helpers';
import { EAlarmModes, DelayConfig, editModeSchema } from './types';

import './labeled-slider';
import { platform, editConfigService } from './const';
import { getAlarmEntity } from './helpers';
import { commonStyle } from './styles';

@customElement('alarm-mode-card')
export class AlarmModeCard extends LitElement {
  @property() hass?: HomeAssistant;

  @property({ type: String }) header?;

  @property({ type: Boolean }) enabled = false;

  @property({ type: String }) mode?: EAlarmModes;

  @property({ type: Object }) config?: DelayConfig;

  render() {
    return html`
        <ha-card
        >
          <div class="card-header">
            <div class="name">
              ${this.header}
            </div>
            <ha-switch
              ?disabled=${this.mode == EAlarmModes.ArmedAway}
              ?checked=${this.enabled}
              @change=${this.toggleEnable}
            >
            </ha-switch>
          </div>
          <div class="card-content">
              <slot>
              </slot>
          </div>
            ${this.getContent()}
          </div>
        ${this.getActions()}
        </ha-card>
    `;
  }

  getActions() {
    if (!this.enabled) return html``;
    return html`
      <div class="card-actions">
        <mwc-button ?disabled=${!this.enabled} @click=${this.updateConfig}>
          save changes
        </mwc-button>
      </div>
    `;
  }

  getContent() {
    if (!this.enabled) return html``;
    return html`
      <settings-row>
        <span slot="heading">Leave time</span>
        <span slot="description">
          Time before the alarm will be armed
        </span>
        <labeled-slider
          ?disabled=${!this.enabled}
          unit="seconds"
          min="0"
          max="180"
          step="10"
          zeroValue="none"
          value=${this.config?.leave}
          @change=${ev => {
        Object.assign(this.config, { leave: Number(ev.target.value) });
      }}
        >
        </labeled-slider>
      </settings-row>

      <settings-row>
        <span slot="heading">Entry time</span>
        <span slot="description">
          Time before the alarm will be triggered
        </span>
        <labeled-slider
          ?disabled=${!this.enabled}
          unit="seconds"
          min="0"
          max="180"
          step="10"
          zeroValue="none"
          value=${this.config?.entry}
          @change=${ev => {
        Object.assign(this.config, { entry: Number(ev.target.value) });
      }}
        >
        </labeled-slider>
      </settings-row>
    `;
  }

  toggleEnable(ev: Event) {
    if (!this.hass || !this.mode || !this.config) return;
    const checked = (ev.target as HTMLInputElement).checked;
    const config: editModeSchema = {
      entity_id: getAlarmEntity(this.hass),
      edit_mode: {
        mode: this.mode,
        enabled: checked,
        delays: {
          leave: { seconds: this.config.leave },
          entry: { seconds: this.config.entry },
        },
      },
    };
    this.hass.callService(platform, editConfigService, config);
  }

  updateConfig() {
    if (!this.hass || !this.mode || !this.config) return;
    const call: editModeSchema = {
      entity_id: getAlarmEntity(this.hass),
      edit_mode: {
        mode: this.mode,
        delays: {
          leave: { seconds: this.config.leave },
          entry: { seconds: this.config.entry },
        },
      },
    };
    console.log(call);
    this.hass.callService(platform, editConfigService, call);
  }

  static styles = css`
    ${commonStyle}
  `;
}
