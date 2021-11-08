import { LitElement, html, TemplateResult, css, CSSResultGroup } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { fireEvent } from 'custom-card-helpers';
import { isDefined, Without } from '../helpers';

export type AlarmoChip = {
  name: string;
  value: string;
  icon?: string;
  count?: number;
};

@customElement('alarmo-chips')
export class AlarmoChips extends LitElement {
  @property()
  items: AlarmoChip[] = [];

  @property()
  value: string | null | string[] = null;

  @property({ type: Boolean })
  selectable = false;

  @property({ type: Boolean })
  multiple = false;

  protected render(): TemplateResult {
    return html`
      ${this.items.map(
        e =>
          html`
            <div
              class="chip ${(Array.isArray(this.value) && this.value.includes(e.value)) || this.value == e.value
                ? 'selected'
                : ''}"
              @click=${() => this.selectItem(e.value)}
            >
              ${this.renderBadge(e)}
              <span class="label">
                ${e.name}
              </span>
            </div>
          `
      )}
    `;
  }

  private renderBadge(item: AlarmoChip) {
    return html`
      ${item.count !== undefined
        ? html`
            <span class="count">${item.count > 99 ? 99 : item.count}</span>
          `
        : item.icon !== undefined
        ? html`
            <ha-icon icon="${item.icon}"></ha-icon>
          `
        : ''}
    `;
  }

  selectItem(value: string) {
    let retval: string | null | string[] = value;
    if (this.selectable) {
      if (this.multiple) {
        const list = Array.isArray(this.value) ? [...this.value] : isDefined(this.value) ? [this.value] : [];
        this.value = list.includes(value) ? Without(list, value) : [...list, value];
      } else {
        this.value = this.value == value ? null : value;
      }
      retval = this.value;
    }

    fireEvent(this, 'value-changed', { value: retval });
  }

  static get styles(): CSSResultGroup {
    return css`
      :host {
      }
      .chip {
        display: inline-flex;
        background: rgba(var(--rgb-primary-text-color), 0.08);
        color: rgba(var(--rgb-primary-text-color), 0.8);
        align-items: center;
        justify-content: center;
        border-radius: 16px;
        padding: 0px 6px;
        margin: 1px 0px;
        height: 32px;
        min-width: 35px;
        font-weight: 500;
        font-size: 0.9rem;
        cursor: pointer;
        user-select: none;
      }
      .chip span.label {
        margin: 0px 6px;
      }
      .chip span.count {
        background: rgba(var(--rgb-secondary-text-color), 0.85);
        color: rgba(var(--rgb-text-primary-color), 1);
        border-radius: 10px;
        height: 20px;
        display: flex;
        width: 20px;
        justify-content: center;
        align-items: flex-start;
        font-size: 0.8rem;
        line-height: 20px;
      }
      .chip ha-icon {
        height: 24px;
        display: flex;
        width: 24px;
        justify-content: center;
        align-items: flex-start;
        font-size: 0.8rem;
        line-height: 24px;
        padding-left: 4px;
      }
      .chip:hover {
        background: rgba(var(--rgb-primary-text-color), 0.12);
      }
      .chip:active {
        background: rgba(var(--rgb-primary-text-color), 0.24);
      }
      .chip.selected {
        background: rgba(var(--rgb-primary-color), 0.9);
        color: var(--text-primary-color);
      }
      .chip.selected:hover {
        background: rgba(var(--rgb-primary-color), 0.85);
      }
      .chip.selected:active {
        background: rgba(var(--rgb-primary-color), 0.74);
      }
    `;
  }
}
