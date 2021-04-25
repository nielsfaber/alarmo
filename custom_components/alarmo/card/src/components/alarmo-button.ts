import {
  LitElement,
  html,
  css,
  property,
} from "lit-element";

class AlarmoButton extends LitElement {

  @property({ type: Boolean }) disabled: boolean = false;
  @property({ type: Boolean }) scaled: boolean = false;

  render() {
    return html`
      ${this.scaled
        ? html`
      <button
        ?disabled=${this.disabled}
      >
        <slot></slot>
      </button>`
        : html`
      <mwc-button
        ?disabled=${this.disabled}
        ?outlined=${!this.disabled}
      >
        <slot></slot>
      </mwc-button>
    `}
    `;
  }

  protected handleFocus(ev: Event) {
    (ev.target as HTMLInputElement).blur();
  }

  static get styles() {
    return css`
      button {
        width: 100%;
        border-width: calc(var(--content-scale, 1) * 1px);
        border-color: var(--mdc-button-outline-color, rgba(0, 0, 0, 0.12));
        color: var(--mdc-theme-primary, #6200ee);
        border-radius: var(--mdc-shape-small, 4px);
        padding: calc(var(--content-scale, 1) * 0.875rem);
        background-color: transparent;
        font-size: calc(var(--content-scale, 1) * 0.875rem);
        font-weight: var(--mdc-typography-button-font-weight, 500);
        letter-spacing: var(--mdc-typography-button-letter-spacing, 0.0892857em);
        text-decoration: var(--mdc-typography-button-text-decoration, none);
        text-transform: var(--mdc-typography-button-text-transform, uppercase);
        -webkit-font-smoothing: antialiased;
        font-family: var(--mdc-typography-button-font-family, var(--mdc-typography-font-family, Roboto, sans-serif));
      }
      button:not(:disabled) {
        cursor: pointer;
        transition: background-color 0.1s ease;
      }
      button:disabled {
        color: var(--disabled-text-color);
        border: none;
      }
      button:not(:disabled):hover {
        background-color: rgba(var(--rgb-primary-color),0.06);
      }
      button:not(:disabled):active {
        background-color: rgba(var(--rgb-primary-color),0.12);
      }
      button:focus {
        outline: none;
      }
      mwc-button {
        width: 100%;
      }
    `;
  }
}
customElements.define('alarmo-button', AlarmoButton);