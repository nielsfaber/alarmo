import { LitElement, html, css, CSSResultGroup } from 'lit';
import { property, customElement, state } from 'lit/decorators.js';
import { HomeAssistant } from 'custom-card-helpers';
import { mdiClose } from '@mdi/js';

@customElement('error-dialog')
export class ErrorDialog extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;

  @state() private _params?: any;

  public async showDialog(params: any): Promise<void> {
    this._params = params;
    await this.updateComplete;
  }

  public async closeDialog() {
    this._params = undefined;
  }

  render() {
    if (!this._params) return html``;
    return html`
      <ha-dialog open .heading=${true} @closed=${this.closeDialog} @close-dialog=${this.closeDialog}>
        <div slot="heading">
          <ha-header-bar>
            <ha-icon-button slot="navigationIcon" dialogAction="cancel" .path=${mdiClose}></ha-icon-button>
            <span slot="title">
              ${this.hass.localize('state_badge.default.error')}
            </span>
          </ha-header-bar>
        </div>
        <div class="wrapper">
          ${this._params.error || ''}
        </div>

        <mwc-button slot="primaryAction" style="float: left" @click=${this.closeDialog} dialogAction="close">
          ${this.hass.localize('ui.dialogs.generic.ok')}
        </mwc-button>
      </ha-dialog>
    `;
  }

  static get styles(): CSSResultGroup {
    return css`
      div.wrapper {
        color: var(--primary-text-color);
      }
    `;
  }
}
