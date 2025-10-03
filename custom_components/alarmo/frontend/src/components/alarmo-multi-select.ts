import {
  LitElement,
  html,
  TemplateResult,
  css,
  PropertyValues,
  CSSResultGroup,
  nothing,
  RenderOptions,
  ElementPart,
  render,
} from 'lit';
import { property, customElement, state, query } from 'lit/decorators.js';
import { mdiClose, mdiMenuUp, mdiMenuDown } from '@mdi/js';
import { IsEqual, isDefined } from '../helpers';
import { directive, Directive, DirectiveResult, PartInfo, PartType } from 'lit/directive.js';
import { fireEvent } from '../fire_event';

export type Option = {
  name: string;
  description?: string;
  value: string;
  icon?: string;
};

@customElement('alarmo-multi-select')
export class AlarmoMultiSelect extends LitElement {
  @property() public label = '';
  @property() public value: string[] = [];
  @property() items: Option[] = [];
  @property() clearable = false;
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

  private _overlayMutationObserver?: MutationObserver;

  public disconnectedCallback() {
    super.disconnectedCallback();
    if (this._overlayMutationObserver) {
      this._overlayMutationObserver.disconnect();
      this._overlayMutationObserver = undefined;
    }
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
        ${comboBoxRenderer(this.rowRenderer)}
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
          .value=${this._valueDisplay()}
        >
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

  private rowRenderer: ComboBoxLitRenderer<Option> = item => {
    const hasDescription = isDefined(item.description);

    return html`
      <style>
        mwc-list-item {
          font-size: 15px;
          --mdc-typography-body2-font-size: 14px;
          --mdc-list-item-meta-size: 8px;
          --mdc-list-item-graphic-margin: 8px;
        }
      </style>
      <mwc-list-item graphic="avatar" .twoline=${hasDescription}>
        <ha-icon .icon="${this.value.includes(item.value) ? 'mdi:check' : ''}" slot="graphic"></ha-icon>
        <span>${item.name}</span>
        ${hasDescription
        ? html`
              <span slot="secondary">${item.description}</span>
            `
        : ''}
      </mwc-list-item>
    `;
  };

  private _clearValue(ev: Event) {
    ev.stopPropagation();
    this._setValue([]);
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

    if (this._opened && 'MutationObserver' in window && !this._overlayMutationObserver) {
      const overlay = document.querySelector<HTMLElement>('vaadin-combo-box-overlay');

      if (!overlay) return;

      this._overlayMutationObserver = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
          if (
            mutation.type === 'attributes' &&
            mutation.attributeName === 'inert' &&
            // @ts-expect-error
            overlay.inert === true
          ) {
            // @ts-expect-error
            overlay.inert = false;
            this._overlayMutationObserver?.disconnect();
            this._overlayMutationObserver = undefined;
          } else if (mutation.type === 'childList') {
            mutation.removedNodes.forEach(node => {
              if (node.nodeName === 'VAADIN-COMBO-BOX-OVERLAY') {
                this._overlayMutationObserver?.disconnect();
                this._overlayMutationObserver = undefined;
              }
            });
          }
        });
      });

      this._overlayMutationObserver.observe(overlay, {
        attributes: true,
      });
      this._overlayMutationObserver.observe(document.body, {
        childList: true,
      });
    }
  }

  private _valueChanged(ev: CustomEvent) {
    const newValue: string | [] = ev.detail.value;
    if (newValue === '' || typeof newValue === 'object') return;
    if (this.value.includes(newValue)) this._setValue(this.value.filter(e => e !== newValue));
    else this._setValue([...this.value, newValue]);
    ev.stopPropagation();
  }

  private _setValue(value: string[]) {
    this.value = value;

    setTimeout(() => {
      fireEvent(this, 'value-changed', { value: this.value });
    }, 0);
  }

  private _valueDisplay() {
    return this.value.join(', ');
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

type ComboBox = HTMLElement & { renderer: Function; requestContentUpdate: Function };
type ComboBoxItemModel<T> = { item: T };

/**
 * From lit-vaadin-helpers
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AbstractLitRenderer = (...args: any[]) => TemplateResult;

// A sentinel that indicates renderer hasn't been initialized
const initialValue = {};

export abstract class AbstractRendererDirective<T extends Element, R extends AbstractLitRenderer> extends Directive {
  previousValue: unknown = initialValue;

  constructor(part: PartInfo) {
    super(part);
    if (part.type !== PartType.ELEMENT) {
      throw new Error('renderer only supports binding to element');
    }
  }

  render(_renderer: R, _value?: unknown): typeof nothing {
    return nothing;
  }

  update(part: ElementPart, [renderer, value]: [R, unknown]): unknown {
    const firstRender = this.previousValue === initialValue;

    if (!this.hasChanged(value)) {
      return nothing;
    }

    // Copy the value if it's an array so that if it's mutated we don't forget
    // what the previous values were.
    this.previousValue = Array.isArray(value) ? Array.from(value) : value;

    const element = part.element as T;

    // TODO: support re-assigning renderer function.
    if (firstRender) {
      const host = part.options?.host;
      this.addRenderer(element, renderer, { host });
    } else {
      this.runRenderer(element);
    }

    return nothing;
  }

  hasChanged(value: unknown): boolean {
    let result = true;

    if (Array.isArray(value)) {
      // Dirty-check arrays by item
      if (
        Array.isArray(this.previousValue) &&
        this.previousValue.length === value.length &&
        value.every((v, i) => v === (this.previousValue as Array<unknown>)[i])
      ) {
        result = false;
      }
    } else if (this.previousValue === value) {
      // Dirty-check non-arrays by identity
      result = false;
    }
    return result;
  }

  /**
   * Set renderer callback to the element.
   */
  abstract addRenderer(element: T, renderer: R, options: RenderOptions): void;

  /**
   * Run renderer callback on the element.
   */
  abstract runRenderer(element: T): void;
}

export type ComboBoxLitRenderer<T> = (item: T, model: ComboBoxItemModel<T>, comboBox: ComboBox) => TemplateResult;

class ComboBoxRendererDirective extends AbstractRendererDirective<ComboBox, ComboBoxLitRenderer<unknown>> {
  /**
   * Set renderer callback to the element.
   */
  addRenderer<T>(element: ComboBox, renderer: ComboBoxLitRenderer<T>, options: RenderOptions) {
    element.renderer = (root: HTMLElement, comboBox: ComboBox, model: ComboBoxItemModel<T>) => {
      render(renderer.call(options.host, model.item, model, comboBox), root, options);
    };
  }

  /**
   * Run renderer callback on the element.
   */
  runRenderer(element: ComboBox) {
    element.requestContentUpdate();
  }
}

const rendererDirective = directive(ComboBoxRendererDirective);

export const comboBoxRenderer = <T>(
  renderer: ComboBoxLitRenderer<T>,
  value?: unknown
): DirectiveResult<typeof ComboBoxRendererDirective> =>
  rendererDirective(renderer as ComboBoxLitRenderer<unknown>, value);
