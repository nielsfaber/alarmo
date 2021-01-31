import { LitElement, html, customElement, css, property } from 'lit-element';
import { HomeAssistant } from 'custom-card-helpers';

type OptionValue = string;

export interface Option {
  name?: string;
  value: OptionValue;
}

export type OptionList = Option[];

@customElement('alarmo-multi-entity-select')
export class AlarmoMultiEntitySelect extends LitElement {
  hass?: HomeAssistant;

  @property() includeDomains: string[] = [];
  @property() options: OptionList = [];
  @property() value: OptionValue[] = [];

  @property() numOptions = 1;

  firstUpdated() {
    if (this.value.length > 1) this.numOptions = this.value.length;
  }

  render() {
    if (!this.hass) return html``;
    return html`
      <div class="container">
        ${[...Array(this.numOptions).keys()].map(i => this.renderSelect(i))}
      </div>
    `;
  }

  renderSelect(index: number) {
    return html`
      <div class="container-item">
        <div class="dropdown-holder">
          <ha-entity-picker
            @change=${(ev: Event) => {
              this.selectedChange(ev, index);
            }}
            .includeDomains=${this.includeDomains}
            .hass=${this.hass}
            value=${this.getValue(index)}
            .allowCustomEntity=${true}
          ></ha-entity-picker>
        </div>
        <div class="icon-holder">
          ${this.renderButton(index)}
        </div>
      </div>
    `;
  }

  renderButton(index: number) {
    if (index != this.numOptions - 1)
      return html`
        <ha-icon icon="hass:minus" @click=${() => this.removeOption(index)}></ha-icon>
      `;
    else if (index == this.options.length - 1)
      return html`
        <ha-icon icon="hass:minus" @click=${() => this.removeOption(index)}></ha-icon>
      `;
    else if (this.value && (this.value as OptionValue[]).length > index)
      return html`
        <ha-icon icon="hass:plus" @click=${this.addOption}></ha-icon>
      `;
    else
      return html`
        <ha-icon class="disabled" icon="hass:plus"></ha-icon>
      `;
  }

  private getValue(index: number) {
    if (index > this.value.length - 1) return '';
    return this.value[index];
  }

  private entityFilter(entityId: string, index: number) {
    const list = this.value.slice(0, index).concat(this.value.slice(index + 1));
    return !list.includes(entityId);
  }

  private selectedChange(ev: Event, index: number) {
    const value = (ev.target as HTMLInputElement).value;

    if (!this.entityFilter(value, index)) {
      this.removeOption(index);
      return;
    }

    const newValue =
      this.value.length == index
        ? [...this.value, value]
        : this.value.slice(0, index).concat(value, this.value.slice(index + 1));

    this.value = newValue.filter(e => e);

    const myEvent = new CustomEvent('change');
    this.dispatchEvent(myEvent);
  }

  addOption() {
    this.numOptions = this.numOptions + 1;
  }

  removeOption(index: number) {
    this.numOptions = this.numOptions - 1;
    if (index == this.value.length - 1) this.value = this.value.slice(0, index);
    else this.value = this.value.slice(0, index).concat(this.value.slice(index + 1));
  }

  static styles = css`
    ha-icon {
      padding: 4px;
      display: inline-block;
      vertical-align: bottom;
      cursor: pointer;
    }

    ha-icon.disabled {
      color: var(--disabled-text-color);
    }

    div.container {
      display: flex;
      flex-direction: column;
    }

    div.container-item {
      display: grid;
      grid-template-columns: 1fr max-content;
      grid-template-rows: min-content;
      grid-template-areas: 'dropdown icon';
      align-items: flex-end;
    }

    div.dropdown-holder {
      grid-area: dropdown;
    }
    div.icon-holder {
      grid-area: icon;
    }
  `;
}
