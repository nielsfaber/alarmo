import { fireEvent, HomeAssistant } from 'custom-card-helpers';
import { css, CSSResult, customElement, html, LitElement, property, TemplateResult } from 'lit-element';

export type Option = {
  name: string;
  value: string;
  count?: number;
};

@customElement('alarmo-chips')
export class AlarmoChips extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;

  @property() items: Option[] = [];
  @property() value: string | null = null;

  protected render(): TemplateResult {
    return html`
      ${this.items.map(e => {
        return html`
          <div class="chip ${this.value == e.value ? 'selected' : ''}" @click=${() => this.selectItem(e.value)}>
            ${e.count !== undefined
              ? html`
                  <span class="count">${e.count > 99 ? 99 : e.count}</span>
                `
              : ''}
            <span class="label">${e.name}</span>
          </div>
        `;
      })}
    `;
  }

  selectItem(value: string) {
    this.value = this.value == value ? null : value;

    fireEvent(this, 'value-changed');
  }

  static get styles(): CSSResult {
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
        font-size: 12px;
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
