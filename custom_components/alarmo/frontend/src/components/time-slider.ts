import { LitElement, html, css } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { localize } from '../../localize/localize';
import { HomeAssistant } from '../types';

export enum ETimeUnits {
  Seconds = 'sec',
  Minutes = 'min'
}

const round = (val: number, step: number) => {
  return Math.round(val / step) * step;
}

const calcStepSize = (min: number, max: number) => {
  const stepSizes = [10/60, 15/60, 20/60, 30/60, 1, 2, 5];
  let range = max - min;
  let step = range / 12;
  step = stepSizes.reduce((prev, curr) => Math.abs(curr - step) < Math.abs(prev - step) ? curr : prev);
  return step;
}

@customElement('time-slider')
export class TimeSlider extends LitElement {
  hass?: HomeAssistant;

  @property({ type: Number })
  min = 0;

  @property({ type: Number })
  max = 100;

  @property({ type: Number })
  value = 0;

  @property({ type: Number })
  step = 0;

  @property() scaleFactor = 1;

  @property({ type: ETimeUnits })
  unit = ETimeUnits.Minutes;

  @property({ type: Boolean })
  disabled = false;

  @property({ type: String })
  zeroValue?: string;

  _min: number = 0;
  _max: number = 0;
  _step: number = 0;

  firstUpdated() {
    if(this.value > 0 && this.value < 60) this.setUnit(ETimeUnits.Seconds);
    else this.setUnit(ETimeUnits.Minutes);
  }

  private setUnit(unit: ETimeUnits) {
    this.unit = unit;
    this.scaleFactor = this.unit == ETimeUnits.Minutes ? 1 / 60 : 1;
    this._step = calcStepSize(this.min * this.scaleFactor, (ETimeUnits.Minutes ? this.max : 60) * this.scaleFactor);
    if(this.step && this._step > this.step * this.scaleFactor) this._step = this.step * this.scaleFactor;
    let min = this.min * this.scaleFactor;
    if(min < this._step) min = this._step;
    this._min = this.min ? round(min, this._step) : 0;
    this._max = (unit == ETimeUnits.Minutes ? round(this.max, this._step) : 60)  * this.scaleFactor;
  }

  render() {
    return html`
      <div class="container">
        <div class="prefix">
          <slot name="prefix"></slot>
        </div>
        <div class="slider">
          ${this.getSlider()}
        </div>
        <div class="value${this.disabled ? ' disabled' : ''}" @click=${this.toggleUnit}>
          ${this.getValue()}
        </div>
      </div>
    `;
  }

  getValue() {
    const value = round(this.value * this.scaleFactor, this._step);
    if (!value && this.zeroValue) {
      return this.zeroValue;
    }
    return `${value} ${this.getUnit()}`;
  }

  getUnit() {
    switch (this.unit) {
      case ETimeUnits.Seconds:
        return localize('components.time_slider.seconds', this.hass!.language);
      case ETimeUnits.Minutes:
        return localize('components.time_slider.minutes', this.hass!.language);
      default:
        return '';
    }
  }

  getSlider() {
    const val = round(this.value * this.scaleFactor, this._step);
    return html`
      <ha-slider
        pin
        min=${this._min}
        max=${this._max}
        step=${this._step}
        value=${val}
        ?disabled=${this.disabled}
        @change=${this.updateValue}
      ></ha-slider>
    `;
  }

  updateValue(e: Event) {
    const value = Number((e.target as HTMLInputElement).value);
    this.value = round(value, this._step) / this.scaleFactor;
  }

  toggleUnit() {
    this.setUnit(this.unit == ETimeUnits.Minutes ? ETimeUnits.Seconds : ETimeUnits.Minutes);
  }

  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      min-width: 250px;
    }

    div.container {
      display: grid;
      grid-template-columns: max-content 1fr 60px;
      grid-template-rows: min-content;
      grid-template-areas: 'prefix slider value';
    }

    div.prefix {
      grid-area: prefix;
      display: flex;
      align-items: center;
    }

    div.slider {
      grid-area: slider;
      display: flex;
      align-items: center;
      flex: 1;
    }

    div.value {
      grid-area: value;
      min-width: 40px;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      cursor: pointer;
    }

    ha-slider {
      width: 100%;
    }

    .disabled {
      color: var(--disabled-text-color);
    }
  `;
}
