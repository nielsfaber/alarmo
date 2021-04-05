import { LitElement, html, customElement, property, CSSResult, css, internalProperty, PropertyValues, TemplateResult } from 'lit-element';
import { HomeAssistant, fireEvent } from 'custom-card-helpers';
import { STATE_NOT_RUNNING, UnsubscribeFunc } from "home-assistant-js-websocket";


import { CARD_VERSION, BUTTONS, FORMAT_NUMBER, EVENT, EVENT_INVALID_CODE, EVENT_NO_CODE, EVENT_FAILED_TO_ARM } from './const';
import { CardConfig, AlarmoEvent, AlarmoEntity } from './types';

import "./alarmo-card-editor";
import "./components/alarmo-state-badge";
import "./components/alarmo-sensor-badge";

import { SubscribeMixin } from './subscribe-mixin';
import { localize } from './localize/localize';

@customElement('alarmo-card')
export class AlarmoCard extends SubscribeMixin(LitElement) {
  @property({ attribute: false }) public hass?: HomeAssistant;
  @internalProperty() private _config?: CardConfig;
  @internalProperty() private _input: string = "";
  @internalProperty() private warning: string = "";

  timer: number = 0;
  subscribedEntities: string[] = [];

  public static async getConfigElement() {
    await import("./alarmo-card-editor");
    return document.createElement("alarmo-card-editor");
  }

  public async getCardSize(): Promise<number> {
    if (!this._config || !this.hass) return 9;
    const stateObj = this.hass.states[this._config.entity] as AlarmoEntity;
    if(!stateObj || stateObj.attributes.code_format !== FORMAT_NUMBER) return 4;
    return (!this._codeRequired(stateObj) && !this._config.keep_keypad_visible) ? 4 : 9;
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

  public hassSubscribe(): Promise<UnsubscribeFunc>[] {
    if (!this.hass?.user.is_admin) return [];
    return [
      this.hass!.connection.subscribeEvents(
        (ev) => this._fetchData(ev as unknown as AlarmoEvent),
        EVENT
      ),
    ];
  }

  private async _fetchData(ev: AlarmoEvent): Promise<void> {
    if (!this.hass) return;
    if ([EVENT_INVALID_CODE, EVENT_NO_CODE].includes(ev.data.event)) this._showInvalidInput();
    else if (ev.data.event == EVENT_FAILED_TO_ARM) {
      this.warning = "blocking_sensors";
      this._input = "";
    }
  }

  protected shouldUpdate(changedProps: PropertyValues): boolean {
    if (changedProps.has("_config")) return true;

    const oldHass = changedProps.get("hass") as HomeAssistant | undefined;
    if (
      !oldHass ||
      oldHass.themes !== this.hass!.themes ||
      oldHass.language !== this.hass!.language
    ) return true;
    if (oldHass.states[this._config!.entity] !== this.hass!.states[this._config!.entity]) {
      const oldState = oldHass.states[this._config!.entity] as AlarmoEntity;
      const newState = this.hass!.states[this._config!.entity] as AlarmoEntity;
      this.processStateUpdate(oldState, newState);
      return true;
    }
    if (this.subscribedEntities.length) {
      if (this.subscribedEntities.some(e => oldHass.states[e] !== this.hass!.states[e])) return true;
    }
    return false;
  }

  private processStateUpdate(oldState: AlarmoEntity, newState: AlarmoEntity) {
    if (
      (oldState.state == "disarmed" && newState.state != "disarmed")
      || (newState.state == "disarmed" && oldState.state != "disarmed")
    ) {
      window.clearTimeout(this.timer);
      this._hideInvalidInput();
      this._input = "";
    }
    if (oldState.state == "disarmed" && newState.state == "disarmed" && newState.attributes.open_sensors) {
      this.warning = "blocking_sensors";
      this._input = "";
    }
    if (oldState.state == "arming" && newState.state == "disarmed") {
      this.warning = "blocking_sensors";
      this._input = "";
    }
    else if (newState.state !== "arming") {
      this.subscribedEntities = [];
    }
  }

  private _codeRequired(stateObj: AlarmoEntity) {    
    return stateObj.attributes.code_format &&
       (
        (stateObj.state === "disarmed" && stateObj.attributes.code_arm_required)
      || (stateObj.state !== "disarmed" && stateObj.attributes.code_disarm_required)
      );
  }

  protected render(): TemplateResult {
    if (!this._config || !this.hass) {
      return html``;
    }
    const stateObj = this.hass.states[this._config.entity] as AlarmoEntity;

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
      <ha-card>

        <div class="header">
          <div class="icon">
            <alarmo-state-badge
              .hass=${this.hass}
              .entity=${this._config.entity}
              @click=${() => fireEvent(this, "hass-more-info", { entityId: this._config!.entity })}
            >
            </alarmo-state-badge>
          </div>
          <div class="summary">
            <div class="name">${stateObj.attributes.friendly_name}</div>
            <div class="state">${this.hass.localize(`component.alarm_control_panel.state._.${stateObj.state}`)}</div>
          </div>
        </div>
        

        ${this._renderWarning()}

        <div id="armActions" class="actions">
          ${(stateObj.state === "disarmed"
        ? this.calcSupportedStates()
        : ["disarm"]
      ).map((state) => {
        return html`
              <mwc-button
                @click=${(ev) => this._handleActionClick(ev, state)}
                outlined
              >
                ${this.hass!.localize(`ui.card.alarm_control_panel.${state}`)}
              </mwc-button>
            `;
      })}
        </div>

        ${!this._codeRequired(stateObj) && !this._config.keep_keypad_visible
        ? html``
        : html`
              <paper-input
                .value=${this._input}
                .label=${this.hass.localize("ui.card.alarm_control_panel.code")}
                ?disabled=${!this._codeRequired(stateObj)}
                @value-changed=${(ev: Event) => {
            this._hideInvalidInput();
            this._input = (ev.target as HTMLInputElement).value;
          }}
                @focus=${this._hideInvalidInput}
                type="password"
                id="code_input"
                .inputmode=${stateObj.attributes.code_format === FORMAT_NUMBER ? "numeric" : "text"}
              ></paper-input>
            `}
        ${(!this._codeRequired(stateObj) && !this._config.keep_keypad_visible)
          || stateObj.attributes.code_format !== FORMAT_NUMBER
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
                          ?disabled=${!this._codeRequired(stateObj)}
                          outlined
                          class="${value !== "clear" ? "numberKey" : ""}"
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

  private _renderWarning() {
    if (!this.hass || !this._config) return html``;
    const stateObj = this.hass.states[this._config.entity] as AlarmoEntity;
    if (
      (stateObj.attributes.open_sensors && stateObj.state == "triggered") ||
      (this.warning == "blocking_sensors" && stateObj.attributes.open_sensors)
    ) {
      return html`
        <div class="message">
          <div class="description">
            <span>
              <ha-icon icon="hass:alert"></ha-icon>
              ${this.warning == "blocking_sensors"
          ? localize("errors.blocking_sensors", this.hass.language)
          : localize("errors.triggered_sensors", this.hass.language)
        }
            </span>
          </div>
          <div class="content">
          ${Object.entries(stateObj.attributes.open_sensors).map(([e]) => {
          if (!this.subscribedEntities.includes(e)) this.subscribedEntities.push(e);
          return html`
            <div class="badge">
              <alarmo-sensor-badge
                .hass=${this.hass}
                .entity=${e}
              >
              </alarmo-sensor-badge>
            </div>`
        })}
          </div>
        </div>`;
    }
    else {
      return html``;
    }
  }

  private calcSupportedStates(): string[] {
    if (!this.hass || !this._config) return [];
    const stateObj = this.hass.states[this._config?.entity];
    const supportedFeatures = stateObj.attributes.supported_features || 0;
    let states: string[] = [];
    if (supportedFeatures & 2) states.push("arm_away");
    if (supportedFeatures & 1) states.push("arm_home");
    if (supportedFeatures & 4) states.push("arm_night");
    if (supportedFeatures & 16) states.push("arm_custom_bypass");
    return states;
  }

  private _handlePadClick(e: MouseEvent): void {
    const val = (e.currentTarget! as any).value;
    this._hideInvalidInput();
    this._input = val === "clear" ? "" : this._input + val;
  }

  private _handleActionClick(ev: Event, action: string): void {
    (ev.target as HTMLElement).blur();
    this._hideInvalidInput(false);
    this.hass!.callService("alarm_control_panel", `alarm_${action}`, {
      entity_id: this._config!.entity,
      code: this._input,
    });
    if (!this.hass?.user.is_admin) {
      window.clearTimeout(this.timer);
      this.timer = window.setTimeout(() => { this._handleTimeout() }, 600);
    }
    this.warning = "";
  }

  private _handleTimeout() {
    if (!this.hass || !this._config) return;
    const stateObj = this.hass.states[this._config.entity] as AlarmoEntity;
    if (!stateObj.attributes.open_sensors) {
      //assume the code was wrong
      this._showInvalidInput();
    }
    else {
      //assume there were blocking sensors
      this.warning = "blocking_sensors";
      this._input = "";
    }
  }

  private _showInvalidInput() {
    const inputField = this.shadowRoot?.querySelector("#code_input") as HTMLElement;
    if (!inputField) return;
    inputField.classList.remove("error");
    inputField.classList.add("error");
    (inputField as any).invalid = true;
  }

  private _hideInvalidInput(clearInput = true) {
    const inputField = this.shadowRoot?.querySelector("#code_input") as HTMLElement;
    if (!inputField) return;
    if (inputField.classList.contains("error")) {
      inputField.classList.remove("error");
      (inputField as any).invalid = false;
      if (clearInput) this._input = "";
    }
  }

  static get styles(): CSSResult {
    return css`
      ha-card {
        padding-bottom: 16px;
        position: relative;
        height: 100%;
        box-sizing: border-box;
      }
      .header {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        margin: 0px auto;
        padding: 20px 0px;
        box-sizing: border-box;
      }
      .header .icon {
        display: flex;
        padding-right: 20px;
      }
      .header .summary {
        display: flex;
        flex-direction: column;
      }
      .header .name {
        font-size: 24px;
        display: flex;
      }
      .header .state {
        font-size: 14px;
        display: flex;
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
        margin-left: calc(50% - 150px/2);
      }
      paper-input.error {
        animation: shake 0.2s ease-in-out 0s 2;
      }
      #keypad {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        margin: auto;
        width: 100%;
      }
      #keypad mwc-button {
        padding: 8px;
        width: 30%;
        box-sizing: border-box;
      }
      @keyframes shake {
        0% { margin-left: calc(50% - 150px/2); }
        25% { margin-left: calc(50% - 150px/2 + 10px); }
        75% { margin-left: calc(50% - 150px/2 - 10px); }
        100% { margin-left: calc(50% - 150px/2); }
      }
      div.message {
        border-radius: 4px;
        width: 90%;
        margin: 0px auto 20px;
        box-sizing: border-box;
        border: 1px solid var(--label-badge-red);
        display: flex;
        flex-direction: column;
        position: relative;
      }
      div.message .description {
        padding: 5px 5px 0px 5px;
        margin: -15px auto 0px;
        color: var(--label-badge-red);
        font-weight: 500;
      }
      div.message .description span {
        background: white;
        padding-right: 5px;
      }
      div.message .description ha-icon {
        --mdc-icon-size: 24px;
        margin: 0px 0px 0px 0px;
      }
      div.message .content {
        display: flex;
        padding: 5px;
        justify-content: space-around;
        align-items: center;
        flex: 1;
        flex-direction: row;
        flex-wrap: wrap;
        color: var(--primary-text-color);
      }
      div.message .content .badge {
        width: 64px;
        margin: 5px 0px;
        justify-content: center;
        align-items: center;
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
