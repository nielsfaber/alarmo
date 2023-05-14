import { LitElement, html, css, CSSResultGroup } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { mdiChevronDown, mdiChevronUp, mdiChevronRight } from '@mdi/js';

@customElement('collapsible-section')
export class CollapsibleSection extends LitElement {
  @property({ type: Boolean, reflect: true })
  public narrow!: boolean;

  @property()
  header = '';

  @property()
  open = false;

  protected render() {
    return html`
      ${this.open
        ? html`
            <div class="header open">
              <span
                @click=${() => {
                  this.open = false;
                }}
              >
                ${this.header}
              </span>
              <ha-icon-button
                .path=${mdiChevronDown}
                @click=${() => {
                  this.open = false;
                }}
              ></ha-icon-button>
            </div>
            <slot></slot>
            <div class="header open">
              <span
                @click=${() => {
                  this.open = false;
                }}
              >
                ${this.header}
              </span>
              <ha-icon-button
                .path=${mdiChevronUp}
                @click=${() => {
                  this.open = false;
                }}
              ></ha-icon-button>
            </div>
          `
        : html`
            <div class="header">
              <span
                @click=${() => {
                  this.open = true;
                }}
              >
                ${this.header}
              </span>
              <ha-icon-button
                .path=${mdiChevronRight}
                @click=${() => {
                  this.open = true;
                }}
              ></ha-icon-button>
            </div>
          `}
    `;
  }

  static get styles(): CSSResultGroup {
    return css`
      :host {
      }

      div.header {
        display: flex;
        align-items: center;
        padding: 0px 16px;
        cursor: pointer;
      }
      div.header.open:first-of-type {
        border-bottom: 1px solid var(--divider-color);
      }
      div.header.open:last-of-type {
        border-top: 1px solid var(--divider-color);
      }

      :host([narrow]) div.header {
        border-top: 1px solid var(--divider-color);
        border-bottom: none;
      }

      div.header span {
        display: flex;
        flex-grow: 1;
      }

      div.seperator {
        height: 1px;
        background: var(--divider-color);
      }
    `;
  }
}
