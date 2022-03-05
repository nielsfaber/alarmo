import { LitElement, html, TemplateResult, css, PropertyValues, CSSResultGroup } from 'lit';
import { property, customElement, state, query } from 'lit/decorators.js';
import { fireEvent, HomeAssistant } from 'custom-card-helpers';
import { mdiClose, mdiMenuUp, mdiMenuDown } from '@mdi/js';
import { IsEqual, isDefined } from '../helpers';

export type Option = {
  name: string;
  description?: string;
  value: string;
  icon?: string;
};

@customElement('alarmo-select')
export class AlarmoSelect extends LitElement {
  @property() public label = '';
  @property() public value?: string;
  @property() items: Option[] = [];
  @property() clearable = false;
  @property() icons = false;
  @property({ type: Boolean }) disabled = false;
  @state() private _opened?: boolean;

  @property({ attribute: 'allow-custom-value', type: Boolean })
  public allowCustomValue?: boolean;

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
      (this.shadowRoot?.querySelector('ha-textfield') as HTMLInputElement).focus();
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
    const hasValue = isDefined(this._value) && this.items.find(e => e.value == this._value);

    return html`
      <vaadin-combo-box-light
        item-value-path="value"
        item-id-path="value"
        item-label-path="name"
        .value=${this._value}
        .renderer=${this.rowRenderer}
        .allowCustomValue=${this.allowCustomValue}
        ?disabled=${this.disabled}
        @opened-changed=${this._openedChanged}
        @value-changed=${this._valueChanged}
      >
        <ha-textfield
          .label=${this.label}
          class="input"
          autocapitalize="none"
          autocomplete="off"
          autocorrect="off"
          spellcheck="false"
          ?disabled=${this.disabled}
          ?invalid=${this.invalid}
          .icon=${this.icons && hasValue}
        >
          <ha-icon
            name="icon"
            slot="leadingIcon"
            icon="${this.icons && hasValue ? this.items.find(e => e.value == this._value)!.icon : undefined}"
          ></ha-icon>
        </ha-textfield>
        <ha-svg-icon
          class="toggle-button ${this.items.length ? '' : 'disabled'}"
          .path=${this._opened && this.items.length ? mdiMenuUp : mdiMenuDown}
          @click=${this._toggleOpen}
        ></ha-svg-icon>
        ${this.clearable && hasValue
          ? html`
              <ha-svg-icon class="clear-button" @click=${this._clearValue} .path=${mdiClose}></ha-svg-icon>
            `
          : ''}
      </vaadin-combo-box-light>
    `;
  }

  rowRenderer = (root: HTMLElement, _owner, entry: { item: Option }) => {
    const hasDescription = isDefined(entry.item.description);
    if (!root.firstElementChild && this.icons) {
      root.innerHTML = `
        <style>
          mwc-list-item {
            font-size: 15px;
            --mdc-typography-body2-font-size: 14px;
            --mdc-list-item-meta-size: 8px;
            --mdc-list-item-graphic-margin: 8px;
          }
        </style>
        <mwc-list-item graphic="avatar" ${hasDescription ? 'twoline' : ''}>
          <ha-icon icon="" slot="graphic"></ha-icon>
          <span class="name"></span>
          <span slot="secondary"></span>
        </mwc-list-item>
        `;
    } else if (!root.firstElementChild) {
      root.innerHTML = `
        <style>
          mwc-list-item {
            font-size: 15px;
            --mdc-typography-body2-font-size: 14px;
          }
        </style>
        <mwc-list-item ${hasDescription ? 'twoline' : ''}>
          <span class="name"></span>
          <span slot="secondary"></span>
        </mwc-list-item>
        `;
    }
    root.querySelector('.name')!.textContent = entry.item.name;
    root.querySelector('[slot="secondary"]')!.textContent = entry.item.description || '';
    if (this.icons) (root.querySelector('ha-icon')! as any).icon = entry.item.icon;
  };

  private _clearValue(ev: Event) {
    ev.stopPropagation();
    this._setValue('');
  }

  private get _value() {
    return isDefined(this.value) ? this.value : '';
  }

  private _toggleOpen(ev: Event) {
    if (!this.items.length) {
      ev.stopPropagation();
      return;
    }
    if (this._opened) {
      (this.shadowRoot?.querySelector('vaadin-combo-box-light') as any)?.inputElement?.blur();
      ev.stopPropagation();
    } else {
      (this.shadowRoot?.querySelector('vaadin-combo-box-light') as any)?.inputElement?.focus();
    }
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

  static get styles(): CSSResultGroup {
    return css`
      :host {
        display: block;
      }
      vaadin-combo-box-light {
        position: relative;
      }
      ha-textfield {
        width: 100%;
      }
      ha-textfield > ha-icon-button {
        --mdc-icon-button-size: 24px;
        padding: 2px;
        color: var(--secondary-text-color);
      }
      ha-svg-icon {
        color: var(--input-dropdown-icon-color);
        position: absolute;
        cursor: pointer;
      }
      ha-svg-icon.disabled {
        cursor: default;
        color: var(--disabled-text-color);
      }
      .toggle-button {
        right: 12px;
        bottom: 5px;
      }
      :host([opened]) .toggle-button {
        color: var(--primary-color);
      }
      .clear-button {
        --mdc-icon-size: 20px;
        bottom: 5px;
        right: 36px;
      }
    `;
  }
}
