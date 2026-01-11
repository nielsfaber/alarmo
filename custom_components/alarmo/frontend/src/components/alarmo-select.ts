import { css, html, LitElement, nothing } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import { HomeAssistant } from "../types";
import { fireEvent } from "../fire_event";

export type Option = {
  name: string;
  description?: string;
  value: string;
  icon?: string;
};

export interface PickerComboBoxItem {
  id: string;
  primary: string;
  secondary?: string;
  search_labels?: Record<string, string | null>;
  sorting_label?: string;
  icon_path?: string;
  icon?: string;
}

const SEARCH_KEYS = [
  { name: "primary", weight: 10 },
  { name: "secondary", weight: 8 }
];

@customElement('alarmo-select')
export class AlarmoSelect extends LitElement {

  @property() hass!: HomeAssistant;

  @property() public label = '';

  @property() items: Option[] = [];

  @property({ type: String, reflect: true }) public value?: string;

  @property({ type: Boolean, reflect: true }) public disabled = false;

  @property() public helper?: string;

  @property({ type: Boolean }) public showSearch?: boolean = false;

  @property({ type: Boolean }) public clearable = false;

  @property({ type: Boolean }) public invalid = false;

  @query('ha-textfield', true)
  private _menu?: any;

  protected render() {
    if (!this.showSearch) {
      return html`
        <ha-select
          .label=${this.label}
          .value=${this.value}
          .disabled=${this.disabled}
          .helper=${this.helper}
          ?clearable=${this.clearable}
          ?invalid=${this.invalid}
          @selected=${this._selectChanged}
          @closed=${(ev: Event) => { ev.stopPropagation() }}
          fixedMenuPosition
          naturalMenuWidth
        >
          ${this._renderOptions()}
        </ha-select>
        ${this.invalid
          ? html`<span class="invalid">Invalid</span>`
          : nothing}
      `;
    }
    else {
      return html`
      <ha-generic-picker
        .hass=${this.hass}
        .autofocus=${this.autofocus}
        .notFoundLabel=${this.hass.localize("ui.components.combo-box.no_match")}
        .label=${this.label}
        .value=${this.value}
        .valueRenderer=${this._valueRenderer}
        .disabled=${this.disabled}
        .helper=${this.helper}
        .getItems=${this._getItems}
        .searchKeys=${SEARCH_KEYS}
        @value-changed=${this._pickerChanged}
        hide-clear-icon
      >
      </ha-generic-picker>
      ${this.invalid
          ? html`<span class="invalid">Invalid</span>`
          : nothing}
   `;
    }
  }

  private _renderOptions() {
    const useIcons = this.items.some(e => e.icon);
    return this.items.map(e => html`
      <ha-list-item
        .graphic=${useIcons ? 'icon' : ''}
        .value=${e.value}
      >
        ${e.icon ? html`<ha-icon slot="graphic" .icon=${e.icon}></ha-icon>` : nothing}
        <span>${e.name}</span>
      </ha-list-item>
    `)
  }

  private _valueRenderer = (value) => {
    const res = this.items.find(e => e.value === value);
    return html`
      ${res?.icon ? html`<ha-icon slot="start" .icon=${res.icon}></ha-icon>` : nothing}
      <span slot="headline">
        ${res ? res.name : value}
      </span>
    `;
  }

  private _getItems = () => {
    return this.items.map(e => <PickerComboBoxItem>Object({
      id: e.value,
      primary: e.name,
      secondary: e.description,
      icon: e.icon
    }));
  }

  private _selectChanged(ev: InputEvent): void {
    ev.stopPropagation();
    this.value = (ev.target as HTMLInputElement).value;
    fireEvent(this, "value-changed", { value: this.value });
  }

  private _pickerChanged(ev: CustomEvent): void {
    ev.stopPropagation();
    this.value = ev.detail.value;
    fireEvent(this, "value-changed", { value: this.value });
  }

  static styles = css`
    ha-select {
      width: 100%;
    }
    .mdc-floating-label {
      inset-inline-start: var(--ha-space-4);
      inset-inline-end: initial;
      color: red;
      direction: var(--direction);
    }
    :host([invalid]) {
      --mdc-select-label-ink-color: var(--mdc-theme-error, red);
      --mdc-select-idle-line-color: var(--mdc-theme-error, red);
      --mdc-text-field-idle-line-color: var(--mdc-theme-error, red);
    }
    span.invalid {
      display: flex;
      font-size: 0.75rem;
      color: var(--mdc-theme-error, red);
      margin: 6px 16px 0px 16px;
    }
  `;
}