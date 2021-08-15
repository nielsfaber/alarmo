import { LitElement, html, TemplateResult, css, CSSResultGroup } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { fireEvent } from 'custom-card-helpers';

export type AlarmoChip = {
  name: string;
  value: string;
  icon?: string;
  count?: Number;
}

@customElement('alarmo-chips')
export class AlarmoChips extends LitElement {

  @property()
  items: AlarmoChip[] = [];

  @property()
  value: string | null = null;

  @property({ type: Boolean })
  selectable = false;

  protected render(): TemplateResult {
    return html`
      ${
      this.items.map(e =>
        html`
          <div
            class="chip ${this.value == e.value ? 'selected' : ''}"
            @click=${() => this.selectItem(e.value)}
          >
            ${this.renderBadge(e)}
            <span class="label">
              ${e.name}
            </span>
          </div>
        `)
      }
    `;
  }

  private renderBadge(item: AlarmoChip) {
    return html`
    ${
      item.count !== undefined
        ? html`<span class="count">${item.count > 99 ? 99 : item.count}</span>`
        : ''
      }
    `;
  }

  private renderIcon(_item: AlarmoChip) {
    return html`
    `;
  }

  selectItem(value: string) {
    if (this.selectable) this.value = this.value == value ? null : value;

    fireEvent(this, 'value-changed', { value: value });
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
