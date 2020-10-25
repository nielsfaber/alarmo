import { LitElement, html, customElement, css, property } from 'lit-element';

@customElement('labeled-slider')
export class LabeledSlider extends LitElement {
  @property({ type: Number })
  min = 0;

  @property({ type: Number })
  max = 100;

  @property({ type: Number })
  step = 1;

  @property({ type: Number })
  value = 0;

  @property({ type: String })
  unit = '';

  @property({ type: Boolean })
  disabled = false;

  @property({ type: String })
  zeroValue?: string;

  render() {
    return html`
      <div class="container">
        <div class="slider">
          ${this.getSlider()}
        </div>
        <div class="value${this.disabled ? ' disabled' : ''}">
          ${this.getValue()}
        </div>
      </div>
    `;
  }

  getValue() {
    const value = Number(this.value);
    if (!value && this.zeroValue) {
      return this.zeroValue;
    }
    return `${value} ${this.unit}`;
  }

  getSlider() {
    return html`
      <ha-slider
        pin
        min=${this.min}
        max=${this.max}
        step=${this.step}
        value=${this.value}
        ?disabled=${this.disabled}
        @change=${this.updateValue}
      ></ha-slider>
    `;
  }

  updateValue(e: Event) {
    const value = Number((e.target as HTMLInputElement).value);
    this.value = value;
  }

  static styles = css`
    :host {
    }

    div.container {
      display: grid;
      grid-template-columns: 1fr 100px;
      grid-template-rows: min-content;
      grid-template-areas: 'slider value';
      width: 100%;
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
    }

    ha-slider {
      width: 100%;
      --paper-slider-pin-start-color: var(--primary-color);
    }

    .disabled {
      color: var(--disabled-text-color);
    }
  `;
}
