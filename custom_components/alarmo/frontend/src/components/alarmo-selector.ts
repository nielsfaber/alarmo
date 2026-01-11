import { LitElement, html, TemplateResult, PropertyValues } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { fireEvent } from '../fire_event';
import { isDefined, IsEqual } from '../helpers';
import { HomeAssistant } from '../types';
import { Option } from './alarmo-select';

import './alarmo-chip-set';

@customElement('alarmo-selector')
export class AlarmoSelector extends LitElement {
  @property()
  hass!: HomeAssistant;

  @property()
  items: Option[] = [];

  @property({ type: Array })
  value: string[] = [];

  @property()
  label = '';

  @property({ type: Boolean })
  invalid = false;

  @property({ type: Boolean })
  showSearch = false;

  shouldUpdate(changedProps: PropertyValues) {
    if (changedProps.get('items')) {
      if (!IsEqual(this.items, changedProps.get('items') as Option[])) this.firstUpdated();
    }
    return true;
  }

  protected firstUpdated() {
    //remove items from selection which are not in the list (anymore)
    if (this.value.some(e => !this.items.map(v => v.value).includes(e))) {
      this.value = this.value.filter(e => this.items.map(v => v.value).includes(e));
      fireEvent(this, 'value-changed', { value: this.value });
    }
  }

  protected render(): TemplateResult {
    return html`
      <alarmo-chip-set
        .hass=${this.hass}
        .items=${this.value.map(val => this.items.find(e => e.value == val)).filter(isDefined)}
        removable
        @value-changed=${this._removeClick}
      >
      </alarmo-chip-set>
      <alarmo-select
        .hass=${this.hass}
        .items=${this.items.filter(e => !this.value.includes(e.value))}
        ?disabled=${this.value.length == this.items.length}
        label=${this.label}
        icons=${true}
        @value-changed=${this._addClick}
        ?invalid=${this.invalid && this.value.length != this.items.length}
        ?showSearch=${this.showSearch}
      ></alarmo-select>
    `;
  }

  private _removeClick(ev: CustomEvent) {
    const value = ev.detail;
    this.value = this.value.filter(e => e !== value);
    fireEvent(this, 'value-changed', { value: this.value });
  }

  private _addClick(ev: Event) {
    ev.stopPropagation();
    const target = ev.target as HTMLInputElement;
    const value = target.value;
    if (!this.value.includes(value)) this.value = [...this.value, value];
    target.value = '';
    fireEvent(this, 'value-changed', { value: [...this.value] });
  }
}
