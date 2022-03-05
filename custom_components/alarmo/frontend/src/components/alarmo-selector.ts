import { LitElement, html, TemplateResult, css, PropertyValues, CSSResultGroup } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { fireEvent, HomeAssistant } from 'custom-card-helpers';
import { isDefined, IsEqual } from '../helpers';

export type Option = {
  value: string;
  name: string;
  icon: string;
};

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
      <div class="chip-set">
        ${this.value.length
          ? this.value
              .map(val => this.items.find(e => e.value == val))
              .filter(isDefined)
              .map(
                e =>
                  html`
          <div class="chip">
            <ha-icon class="icon" icon=${e.icon}>
            </ha-icon>
            <span class="label">
              ${e.name}
            </span>            
            <ha-icon class="button" icon="hass:close" @click=${() => this._removeClick(e.value)}>
            </ha-icon>
            </mwc-icon-button>
          </div>
        `
              )
          : ''}
      </div>
      <alarmo-select
        .hass=${this.hass}
        .items=${this.items.filter(e => !this.value.includes(e.value))}
        ?disabled=${this.value.length == this.items.length}
        label=${this.label}
        icons=${true}
        @value-changed=${this._addClick}
        ?invalid=${this.invalid && this.value.length != this.items.length}
      ></alarmo-select>
    `;
  }

  private _removeClick(value: string) {
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

  static get styles(): CSSResultGroup {
    return css`
      div.chip-set {
        margin: 0px -4px;
      }
      div.chip {
        height: 32px;
        border-radius: 16px;
        border: 2px solid rgb(168, 232, 251);
        line-height: 1.25rem;
        font-size: 0.875rem;
        font-weight: 400;
        padding: 0px 12px;
        display: inline-flex;
        align-items: center;
        box-sizing: border-box;
        margin: 4px;
      }
      .icon {
        vertical-align: middle;
        outline: none;
        display: flex;
        align-items: center;
        border-radius: 50%;
        padding: 6px;
        color: rgba(0, 0, 0, 0.54);
        background: rgb(168, 232, 251);
        --mdc-icon-size: 20px;
        margin-left: -14px !important;
      }
      .label {
        margin: 0px 4px;
      }
      .button {
        cursor: pointer;
        background: var(--secondary-text-color);
        border-radius: 50%;
        --mdc-icon-size: 14px;
        color: var(--card-background-color);
        width: 16px;
        height: 16px;
        padding: 1px;
        box-sizing: border-box;
        display: inline-flex;
        align-items: center;
        margin-right: -6px !important;
      }
    `;
  }
}
