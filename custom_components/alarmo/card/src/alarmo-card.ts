import { LitElement, html, customElement, property, CSSResult, css, internalProperty, PropertyValues, TemplateResult } from 'lit-element';
import { HomeAssistant, fireEvent } from 'custom-card-helpers';
import { STATE_NOT_RUNNING } from "home-assistant-js-websocket";


import { CARD_VERSION, BUTTONS, FORMAT_NUMBER, ICONS } from './const';
import { CardConfig } from './types';

import "./alarmo-card-editor";

@customElement('alarmo-card')
export class AlarmoCard extends LitElement {
  @property({ attribute: false }) public hass?: HomeAssistant;
  @internalProperty() private _config?: CardConfig;
  @internalProperty() private _input: string = "";
  
  public static async getConfigElement() {
    await import("./alarmo-card-editor");
    return document.createElement("alarmo-card-editor");
  }

  public setConfig(config?: CardConfig): void {
    if (
      !config ||
      !config.entity ||
      config.entity.split(".")[0] !== "alarm_control_panel"
    ) {
      throw new Error("Invalid configuration");
    }
    this._config = { ...config };
  }
  
  protected shouldUpdate(changedProps: PropertyValues): boolean {
    if (changedProps.has("_config")) return true;

    const oldHass = changedProps.get("hass") as HomeAssistant | undefined;
    if (
      !oldHass ||
      oldHass.themes !== this.hass!.themes ||
      oldHass.language !== this.hass!.language
    ) return true;
    return (
      oldHass.states[this._config!.entity] !==
      this.hass!.states[this._config!.entity]
    );
  }

  protected render(): TemplateResult {
    if (!this._config || !this.hass) {
      return html``;
    }
    const stateObj = this.hass.states[this._config.entity];

    if (!stateObj) {
      return html`
        <hui-warning>
         ${this.hass.config.state !== STATE_NOT_RUNNING
          ? this.hass.localize("ui.panel.lovelace.warning.entity_not_found", "entity", this._config.entity || "[empty]")
          : this.hass.localize("ui.panel.lovelace.warning.starting")
        }
        </hui-warning>
      `;
    }
    return html`
      <ha-card
        .header="${stateObj.attributes.friendly_name || this.hass.localize(`component.alarm_control_panel.state._.${stateObj.state}`)}"
      >

        <ha-label-badge
          class="${stateObj.state}"
          .icon="${ICONS[stateObj.state] || "hass:shield-outline"}"
          .label="${this._stateIconLabel(stateObj.state)}"
          @click=${() => fireEvent(this, "hass-more-info", { entityId: this._config!.entity })}
        ></ha-label-badge>

        <div id="armActions" class="actions">
          ${(stateObj.state === "disarmed"
            ? this.calcSupportedStates()
            : ["disarm"]
          ).map((state) => {
            return html`
              <mwc-button
                @click=${() => this._handleActionClick(state)}
                outlined
              >
                ${this.hass!.localize(`ui.card.alarm_control_panel.${state}`)}
              </mwc-button>
            `;
          })}
        </div>


        ${!stateObj.attributes.code_format
          ? html``
          : html`
              <paper-input
                .value=${this._input}
                .label=${this.hass.localize("ui.card.alarm_control_panel.code")}
                @value-changed=${(ev: Event) => this._input = (ev.target as HTMLInputElement).value}
                type="password"
              ></paper-input>
            `}
        ${stateObj.attributes.code_format !== FORMAT_NUMBER
          ? html``
          : html`
              <div id="keypad">
                ${BUTTONS.map((value) => {
                  return value === ""
                    ? html` <mwc-button disabled></mwc-button> `
                    : html`
                        <mwc-button
                          .value="${value}"
                          @click=${this._handlePadClick}
                          outlined
                          class=${value !== "clear" ? "numberKey" : ""}
                        >
                          ${value === "clear"
                            ? this.hass!.localize(`ui.card.alarm_control_panel.clear_code`)
                            : value}
                        </mwc-button>
                      `;
                })}
              </div>
            `}
      </ha-card>
    `
  }

  private calcSupportedStates(): string[] {
    if(!this.hass || !this._config) return [];
    const stateObj = this.hass.states[this._config?.entity];
    const supportedFeatures = stateObj.attributes.supported_features || 0;
    let states: string[] = [];
    if(supportedFeatures & 2) states.push("arm_away");
    if(supportedFeatures & 1) states.push("arm_home");
    if(supportedFeatures & 4) states.push("arm_night");
    if(supportedFeatures & 16) states.push("arm_custom_bypass");
    return states;
  }

  private _handlePadClick(e: MouseEvent): void {
    const val = (e.currentTarget! as any).value;
    this._input = val === "clear" ? "" : this._input + val;
  }

  private _handleActionClick(action: string): void {
    this.hass!.callService("alarm_control_panel", `alarm_${action}`, {
      entity_id: this._config!.entity,
      code: this._input,
    });
    this._input = "";
  }
  
  private _stateIconLabel(state: string): string {
    const stateLabel = state.split("_").pop();
    return !stateLabel
      ? ""
      : this.hass!.localize(`component.alarm_control_panel.state._.${state}`);
  }

  static get styles(): CSSResult {
    return css`
      ha-card {
        padding-bottom: 16px;
        position: relative;
        height: 100%;
        box-sizing: border-box;
        --alarm-color-disarmed: var(--primary-color);
        --alarm-color-pending: var(--label-badge-yellow);
        --alarm-color-triggered: var(--label-badge-red);
        --alarm-color-armed: var(--label-badge-red);
        --alarm-color-autoarm: rgba(0, 153, 255, 0.1);
        --alarm-state-color: var(--alarm-color-armed);
      }
      ha-label-badge {
        --ha-label-badge-color: var(--alarm-state-color);
        --label-badge-text-color: var(--alarm-state-color);
        --label-badge-background-color: var(--card-background-color);
        color: var(--alarm-state-color);
        position: absolute;
        right: 12px;
        top: 8px;
        cursor: pointer;
      }
      .disarmed {
        --alarm-state-color: var(--alarm-color-disarmed);
      }
      .triggered {
        --alarm-state-color: var(--alarm-color-triggered);
        animation: pulse 1s infinite;
      }
      .arming {
        --alarm-state-color: var(--alarm-color-pending);
        animation: pulse 1s infinite;
      }
      .pending {
        --alarm-state-color: var(--alarm-color-pending);
        animation: pulse 1s infinite;
      }
      @keyframes pulse {
        0% {
          opacity: 1;
        }
        50% {
          opacity: 0;
        }
        100% {
          opacity: 1;
        }
      }
      .actions {
        margin: 0;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
      }
      .actions mwc-button {
        margin: 0 4px 4px;
      }
      paper-input {
        margin: 0 auto 8px;
        max-width: 150px;
        text-align: center;
      }
      #keypad {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        margin: auto;
        width: 100%;
        max-width: 300px;
      }
      #keypad mwc-button {
        padding: 8px;
        width: 30%;
        box-sizing: border-box;
      }
      mwc-button.numberkey {
        --mdc-typography-button-font-size: var(--keypad-font-size, 0.875rem);
      }
    `;
  }
}

(window as any).customCards = (window as any).customCards || [];
(window as any).customCards.push({
  type: 'alarmo-card',
  name: 'Alarmo Card',
  description: 'Card for operating Alarmo through Lovelace.',
});

console.info(
  `%c  ALARMO-CARD  \n%c  Version: ${CARD_VERSION.padEnd(7, ' ')}`,
  'color: orange; font-weight: bold; background: black',
  'color: white; font-weight: bold; background: dimgray'
);
