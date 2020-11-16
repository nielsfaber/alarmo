import { LitElement, html, customElement, css, property } from 'lit-element';
import { localize } from '../../localize/localize';
import { HomeAssistant } from 'custom-card-helpers';

@customElement('time-slider')
export class TimeSlider extends LitElement {

  hass?: HomeAssistant;

  @property({ type: Number })
  min = 0;

  @property({ type: Number })
  max = 100;

  @property({ type: Number })
  step = 10;

  @property({ type: Number })
  value = 0;

  @property() scaleFactor = 1;

  @property({ type: String })
  unit = '';

  @property({ type: Boolean })
  disabled = false;

  @property({ type: String })
  zeroValue?: string;

  firstUpdated() {
    if (this.unit == "min") this.scaleFactor = 1 / 60;
    if (this.unit == "min") this.step = 1;
  }

  render() {
    return html`
      <div class="container">
        <div class="slider">
          ${this.getSlider()}
        </div>
        <div
          class="value${this.disabled ? ' disabled' : ''}"
          @click=${this.toggleUnit}
        >
          ${this.getValue()}
        </div>
      </div>
    `;
  }

  getValue() {
    let value = Number(Math.round(this.value * this.scaleFactor));
    if (!value && this.zeroValue) {
      return this.zeroValue;
    }
    return `${value} ${this.getUnit()}`;
  }

  getUnit() {
    switch (this.unit) {
      case "sec":
        return localize("components.time_slider.seconds", this.hass!.language);
      case "min":
        return localize("components.time_slider.minutes", this.hass!.language);
      default:
        return "";
    }
  }

  getSlider() {
    return html`
      <ha-slider
        pin
        min=${Math.round(this.min * this.scaleFactor)}
        max=${Math.round(this.max * this.scaleFactor)}
        step=${this.step}
        value=${Math.round(this.value * this.scaleFactor)}
        ?disabled=${this.disabled}
        @change=${this.updateValue}
      ></ha-slider>
    `;
  }

  updateValue(e: Event) {
    const value = Number((e.target as HTMLInputElement).value);
    this.value = Math.round(value / this.scaleFactor);
  }

  toggleUnit() {
    this.unit = this.unit == "min" ? "sec" : "min";
    this.scaleFactor = (this.unit == "min") ? 1 / 60 : 1;
    this.step = (this.unit == "min") ? 1 : 10;
  }

  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      min-width: 250px;
    }

    div.container {
      display: grid;
      grid-template-columns: 1fr 60px;
      grid-template-rows: min-content;
      grid-template-areas: 'slider value';
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
      --paper-slider-pin-start-color: var(--primary-color);
      width: 100%;
    }

    .disabled {
      color: var(--disabled-text-color);
    }
  `;
}
