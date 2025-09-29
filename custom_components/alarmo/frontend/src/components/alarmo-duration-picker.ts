import { LitElement, html, css, nothing } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { HomeAssistant } from '../types';
import { localize } from '../../localize/localize';
import { fireEvent } from '../fire_event';

const SECONDS_PER_MINUTE = 60;

@customElement('alarmo-duration-picker')
export class AlarmoDurationPicker extends LitElement {
  @property({ attribute: false })
  hass!: HomeAssistant;

  @property({ type: Number })
  min = 0;

  @property({ type: Number })
  max = 300;

  @property({ type: Number })
  value = 0;

  @property({ type: Number })
  step = 15;

  @property({ type: Boolean })
  disabled = false;

  @property({ type: Boolean })
  showArrows = true;

  @property({ type: String })
  placeholder?;

  @property({ type: Boolean })
  required = false;

  render() {
    return html`
      <div class="wrapper">
        ${!this.required ? html`
        <div class="column">
          <ha-checkbox
            @change=${this._toggleEnableClick}
            ?checked=${!this.disabled}
          >
          </ha-checkbox>`
        : nothing}
        </div>
        <div class="column">
          <ha-textfield
            id="minutes"
            inputmode="numeric"
            .value=${this.disabled ? this.placeholder : this._getMinutes()}
            label=""
            @input=${this._minutesChanged}
            @focusin=${this._onFocus}
            no-spinner
            .autoValidate=${true}
            maxlength="1"
            min="0"
            .max=${Math.floor(this.max / SECONDS_PER_MINUTE)}
            .disabled=${this.disabled}
            .validityTransform=${this._validateMinutesInput}
                  suffix=":"
                  class="hasSuffix"
          >
          </ha-textfield>
          <span class="label">${localize('components.time_picker.minutes', this.hass.language)}</span>
        </div>
        <div class="column">
          <ha-textfield
            id="seconds"
            inputmode="numeric"
            .value=${this.disabled ? this.placeholder : this._getSeconds()}
            label=""
            @input=${this._secondsChanged}
            @focusin=${this._onFocus}
            no-spinner
            .autoValidate=${true}
            maxlength="2"
            min="0"
            max="59"
            .disabled=${this.disabled}
            .validityTransform=${this._validateSecondsInput}
          >
          </ha-textfield>
          <span class="label">${localize('components.time_picker.seconds', this.hass.language)}</span>
        </div>
        ${this.showArrows
        ? html`
        <div class="column">
          <wa-button
            appearance="plain"
            variant="brand"
            size="medium"
            ?disabled=${this.disabled}
            @click=${this._secondsUpClick}
          >
            <ha-icon icon="mdi:chevron-up"></ha-icon>
          </wa-button>
          <wa-button
            appearance="plain"
            variant="brand"
            size="medium"
            ?disabled=${this.disabled}
            @click=${this._secondsDownClick}
          >
            <ha-icon icon="mdi:chevron-down"></ha-icon>
          </wa-button>`
        : nothing}
        </div>
      </div>
    `;
  }

  private _getMinutes() {
    return Math.floor(this.value / SECONDS_PER_MINUTE);
  }

  private _getSeconds() {
    return this.value % SECONDS_PER_MINUTE;
  }

  private _minutesChanged(ev: InputEvent) {
    let minutes = Number((ev.target as HTMLInputElement).value);
    let value = minutes * SECONDS_PER_MINUTE + this._getSeconds();
    if (value < this.min) {
      value = this.min;
      minutes = Math.floor(value / SECONDS_PER_MINUTE);
      (ev.target as HTMLInputElement).value = String(minutes);
    }
    if (value > this.max) {
      value = this.max;
      minutes = Math.floor(value / SECONDS_PER_MINUTE);
      (ev.target as HTMLInputElement).value = String(minutes);
    }
    this.value = value;
    this._valueChanged();
  }

  private _secondsChanged(ev: InputEvent) {
    let seconds = Number((ev.target as HTMLInputElement).value);
    if (seconds >= SECONDS_PER_MINUTE) {
      seconds = (SECONDS_PER_MINUTE - 1);
      (ev.target as HTMLInputElement).value = String(seconds);
    }
    let value = this._getMinutes() * SECONDS_PER_MINUTE + seconds;
    if (value < this.min) {
      value = this.min;
      seconds = this.value % SECONDS_PER_MINUTE;
      (ev.target as HTMLInputElement).value = String(seconds);
    }
    if (value > this.max) {
      value = this.max;
      seconds = this.value % SECONDS_PER_MINUTE;
      (ev.target as HTMLInputElement).value = String(seconds);
    }
    this.value = value;
    this._valueChanged();
  }

  private _validateMinutesInput(value: any, _nativeValidity: any) {
    let valid = value.match(/^[0-9]+$/) !== null;

    return {
      valid: valid,
      customError: !valid
    }
  }

  private _validateSecondsInput(value: any, _nativeValidity: any) {
    let valid = value.match(/^[0-9]+$/) !== null;

    return {
      valid: valid,
      customError: !valid
    }
  }

  private _secondsUpClick() {
    let value = Math.round(this.value / this.step) * this.step;
    value = value + this.step;
    if (value > this.max) value = this.max;
    this.value = value;
    this._valueChanged();
  }

  private _secondsDownClick() {
    let value = Math.round(this.value / this.step) * this.step;
    value = value - this.step;
    if (value < this.min) value = this.min;
    this.value = value;
    this._valueChanged();
  }

  private _toggleEnableClick(ev: InputEvent) {
    const checked = (ev.target as HTMLInputElement).checked;
    this.disabled = !checked;
    (ev.target as HTMLInputElement).blur();
    this._valueChanged();
  }

  private _onFocus(ev: FocusEvent) {
    (ev.currentTarget as HTMLInputElement).select();
  }

  private _valueChanged() {
    let value = this.disabled ? null : this.value;
    fireEvent(this, 'value-changed', { value: value });
  }

  static styles = css`
    :host {
      display: flex;
      padding: 8px 0px;
    }
    div.wrapper {
      display: flex;
      flex-direction: row;
      gap: 0px;
    }
    :host([required]) div.wrapper {
      margin-left: 10px;
    }
    ha-textfield {
      width: 70px;
      height: 48px;
      text-align: center;
      --mdc-shape-small: 0;
      --text-field-appearance: none;
      --text-field-padding: 0 4px;
      --text-field-suffix-padding-left: 2px;
      --text-field-suffix-padding-right: 0;
      --text-field-text-align: center;
      --mdc-typography-subtitle1-font-size: 16px;
      --mdc-text-field-outlined-idle-border-color: var(--card-background-color);
      --mdc-text-field-outlined-hover-border-color: var(--card-background-color);
    }
    div.column {
      display: flex;
      flex-direction: column;
    }
    div.column > * {
      display: flex;
    }
    ha-icon {
    }
    wa-button {
      width: 30px;
      height: 30px;
      --wa-form-control-border-radius: 8px;
      margin-left: 4px;
    }
    wa-button ha-icon {
      color: var(--wa-color-on-normal);
    }
    span.label {
      display: flex;
      padding: 2px 0px 0px 0px;
      justify-content: center;
      color: rgba(var(--rgb-primary-text-color), 0.6);
      font-size: 0.9rem;
    }
  `;
}
