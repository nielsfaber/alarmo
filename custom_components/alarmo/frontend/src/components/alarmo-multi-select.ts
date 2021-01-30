import { LitElement, html, customElement, css, property } from 'lit-element';
import { IsEqual } from '../helpers';

type OptionValue = string | Number;
type ChangeEvent = Event & { target: { selectedItem: any } };
export interface Option {
  name?: string,
  value: OptionValue
}

export type OptionList = Option[];

@customElement('alarmo-multi-select')
export class AlarmoMultiSelect extends LitElement {

  @property() label: string = "";
  @property() options: OptionList = [];
  @property() value: OptionValue[] = [];
  @property({ type: Boolean }) disabled?;

  @property() numOptions = 1;

  firstUpdated() {
    if (!this.value) this.value = [];
    if (this.value.length > 1) this.numOptions = this.value.length;
  }

  render() {
    return html`
      <div class="container">
      ${[...Array(this.numOptions).keys()].map((i) => this.renderSelect(i))}
      </div>
    `;
  }

  renderSelect(index: number) {
    return html`
      <div>
      <paper-dropdown-menu
          label=${this.label}
          ?disabled=${this.disabled}
      >
        <paper-listbox
          slot="dropdown-content"
          selected=${this.getSelected(index)}
          @selected-item-changed=${(ev: ChangeEvent) => this.selectedChange(ev, index)}
        >
          ${this.renderOptions(index)}
        </paper-listbox>
      </paper-dropdown-menu>
      ${this.renderButton(index)}
  </div>`;
  }

  renderButton(index: number) {
    if (index != this.numOptions - 1)
      return html`<ha-icon icon="hass:minus" @click=${() => this.removeOption(index)}></ha-icon>`;
    else if (index == this.options.length - 1)
      return html`<ha-icon icon="hass:minus" @click=${() => this.removeOption(index)}></ha-icon>`;
    else if (this.value && (this.value as OptionValue[]).length > index)
      return html`<ha-icon icon="hass:plus" @click=${this.addOption}></ha-icon>`;
    else
      return html`<ha-icon class="disabled" icon="hass:plus"></ha-icon>`;
  }

  private renderOptions(index: number) {
    const list = this.value.slice(0, index).concat(this.value.slice(index + 1))
    return this.options
      .filter(e => e.value)
      .map(el => html`
      <paper-item
    value="${el.value}"
    ?disabled=${list.includes(el.value)}
      >
      ${el.name || el.value}
    </paper-item>
      `);
  }
  private getSelected(index: number) {
    return this.options.filter(e => e.value).findIndex(e => e.value == this.value[index]);
  }

  private selectedChange(ev: ChangeEvent, index: number) {
    if (!ev.target.selectedItem) return;
    const value = ev.target.selectedItem.getAttribute('value');

    const newValue = (this.value.length == index)
      ? [...this.value, value]
      : this.value.slice(0, index).concat(value, this.value.slice(index + 1))

    if(IsEqual(newValue, this.value)) return;
    this.value = newValue;
    const myEvent = new CustomEvent("change");
    this.dispatchEvent(myEvent);
  }

  addOption() {
    this.numOptions = this.numOptions + 1;
  }

  removeOption(index: number) {
    this.numOptions = this.numOptions - 1;
    if (index == this.value.length - 1) this.value = this.value.slice(0, index);
    else this.value = this.value.slice(0, index).concat(this.value.slice(index + 1))
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
    `;
}
