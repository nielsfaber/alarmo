import { css, CSSResult, customElement, html, LitElement, property } from 'lit-element';

@customElement('collapsible-section')
export class CollapsibleSection extends LitElement {
  @property({ type: Boolean, reflect: true }) public narrow!: boolean;
  @property() header: string = "";
  @property() open: boolean = false;

  protected render() {
    return html`
      ${
      this.open
        ?
        html`
        <div class="header open">
          <span
            @click=${() => { this.open = false }}
          >
            ${this.header}
          </span>
          <ha-icon-button
            icon="hass:chevron-down"
            @click=${() => { this.open = false }}
          >
          </ha-icon-button>
        </div>
        <slot></slot>
        <div class="header open">
          <span
            @click=${() => { this.open = false }}
          >
            ${this.header}
          </span>
          <ha-icon-button
            icon="hass:chevron-up"
            @click=${() => { this.open = false }}
          >
          </ha-icon-button>
        </div>
        `
        :
        html`
        <div class="header">
          <span
            @click=${() => { this.open = true }}
          >
            ${this.header}
          </span>
          <ha-icon-button
            icon="hass:chevron-right"
            @click=${() => { this.open = true }}
          >
          </ha-icon-button>
        </div>
      `
      }

    `;
  }

  static get styles(): CSSResult {
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
