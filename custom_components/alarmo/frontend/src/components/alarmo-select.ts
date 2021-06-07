import { fireEvent, HomeAssistant } from 'custom-card-helpers';
import {
  css,
  CSSResult,
  customElement,
  html,
  internalProperty,
  LitElement,
  property,
  query,
  TemplateResult,
  PropertyValues,
} from 'lit-element';
import { IsEqual, isDefined } from '../helpers';

export type Option = {
  name: string;
  description?: string;
  value: string;
  icon?: string;
};

@customElement('alarmo-select')
export class AlarmoSelect extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;

  @property() public label = '';
  @property() public value?: string;
  @property() items: Option[] = [];
  @property() clearable = false;
  @property() icons = false;
  @property({ type: Boolean }) disabled = false;
  @internalProperty() private _opened?: boolean;

  @property({ type: Boolean })
  invalid = false;

  @query('vaadin-combo-box-light', true) private _comboBox!: HTMLElement;
  public open() {
    this.updateComplete.then(() => {
      (this.shadowRoot?.querySelector('vaadin-combo-box-light') as any)?.open();
    });
  }

  public focus() {
    this.updateComplete.then(() => {
      (this.shadowRoot?.querySelector('paper-input') as HTMLInputElement).focus();
    });
  }

  shouldUpdate(changedProps: PropertyValues) {
    if (changedProps.get('items')) {
      if (!IsEqual(this.items, changedProps.get('items') as Option[])) this.firstUpdated();
      else if (changedProps.size == 1) return false;
    }
    return true;
  }

  protected firstUpdated() {
    (this._comboBox as any).items = this.items;
  }

  protected render(): TemplateResult {
    return html`
      <vaadin-combo-box-light
        item-value-path="value"
        item-id-path="value"
        item-label-path="name"
        .value=${this._value}
        .renderer=${this.rowRenderer}
        ?disabled=${this.disabled}
        @opened-changed=${this._openedChanged}
        @value-changed=${this._valueChanged}
      >
        <paper-input
          .label=${this.label}
          class="input"
          autocapitalize="none"
          autocomplete="off"
          autocorrect="off"
          spellcheck="false"
          ?disabled=${this.disabled}
          ?invalid=${this.invalid}
        >
          ${isDefined(this._value) && this.items.find(e => e.value == this._value)
        ? html`
                ${this.icons
            ? html`
                      <ha-icon slot="prefix" icon="${this.items.find(e => e.value == this._value)!.icon}"> </ha-icon>
                    `
            : ''}
                ${this.clearable
            ? html`
                      <ha-icon-button slot="suffix" class="clear-button" @click=${this._clearValue} icon="hass:close">
                      </ha-icon-button>
                    `
            : ''}
              `
        : ''}
          <ha-icon-button
            slot="suffix"
            class="toggle-button"
            icon="${this._opened ? 'hass:menu-up' : 'hass:menu-down'}"
          >
          </ha-icon-button>
        </paper-input>
      </vaadin-combo-box-light>
    `;
  }

  rowRenderer = (root: HTMLElement, _owner, entry: { item: Option }) => {
    if (!root.firstElementChild && this.icons) {
      root.innerHTML = `
        <style>
          paper-icon-item {
              margin: -10px;
              padding: 0;
          }
          ha-icon {
              display: flex;
              flex: 0 0 40px;
              color: var(--state-icon-color);
          }
        </style>
        <paper-icon-item>
          <ha-icon icon="" slot="item-icon"></ha-icon>
          <paper-item-body two-line>
            <div class="name"></div>
            <div secondary></div>
          </paper-item-body>
        </paper-icon-item>
        `;
    } else if (!root.firstElementChild) {
      root.innerHTML = `
        <style>
          paper-item {
              margin: -10px;
              padding: 0;
          }
        </style>
        <paper-item>
          <paper-item-body two-line>
            <div class="name"></div>
            <div secondary></div>
          </paper-item-body>
        </paper-item>
        `;
    }
    root.querySelector('.name')!.textContent = entry.item.name;
    root.querySelector('[secondary]')!.textContent = entry.item.description || "";
    if (this.icons) (root.querySelector('ha-icon')! as any).icon = entry.item.icon;
  };

  private _clearValue(ev: Event) {
    ev.stopPropagation();
    this._setValue('');
  }

  private get _value() {
    return isDefined(this.value) ? this.value : '';
  }

  private _openedChanged(ev: CustomEvent) {
    this._opened = ev.detail.value;
  }

  private _valueChanged(ev: CustomEvent) {
    const newValue = ev.detail.value;
    if (newValue !== this._value) {
      this._setValue(newValue);
    }
  }

  private _setValue(value: string) {
    this.value = value;

    setTimeout(() => {
      fireEvent(this, 'value-changed', { value });
    }, 0);
  }

  static get styles(): CSSResult {
    return css`
      :host {
        line-height: 1em;
      }
      paper-input > ha-icon-button {
        --mdc-icon-button-size: 24px;
        padding: 2px;
        color: var(--secondary-text-color);
      }
      [hidden] {
        display: none;
      }
      paper-input > ha-icon {
        display: flex;
        flex: 0 0 40px;
        color: var(--state-icon-color);
        width: 40px;
        height: 26px;
        align-items: center;
      }
    `;
  }
}
