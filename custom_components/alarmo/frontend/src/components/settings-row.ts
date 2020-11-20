import { css, CSSResult, customElement, html, LitElement, property, SVGTemplateResult } from 'lit-element';

@customElement('settings-row')
export class SettingsRow extends LitElement {
  @property({ type: Boolean, reflect: true }) public narrow!: boolean;
  @property({ type: Boolean, reflect: true }) large?: boolean;
  @property({ type: Boolean, attribute: 'three-line' })
  public threeLine = false;

  protected render(): SVGTemplateResult {
    return html`
      <div class="info">
        <slot name="heading"></slot>
        <div class="secondary"><slot name="description"></slot></div>
      </div>
      <slot></slot>
    `;
  }

  static get styles(): CSSResult {
    return css`
      :host {
        display: flex;
        flex-direction: row;
        padding: 0px 16px;
        align-items: center;
        min-height: 72px;
      }
      :host([large]) {
        align-items: normal;
        flex-direction: column;
        border-top: 1px solid var(--divider-color);
        border-bottom: 1px solid var(--divider-color);
        padding: 16px 16px;
      }
      :host([narrow]) {
        align-items: normal;
        flex-direction: column;
        border-bottom: none;
        border-top: 1px solid var(--divider-color);
        padding: 16px 16px;
      }
      ::slotted(ha-switch) {
        padding: 16px 0;
      }
      .info {
        flex: 1 0 60px;
      }
      .secondary {
        color: var(--secondary-text-color);
      }
    `;
  }
}
