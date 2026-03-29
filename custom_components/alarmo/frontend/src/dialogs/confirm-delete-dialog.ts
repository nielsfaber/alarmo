import { LitElement, html, css, CSSResultGroup } from 'lit';
import { property, customElement, state } from 'lit/decorators.js';
import { mdiClose } from '@mdi/js';
import { commonStyle } from '../styles';
import { HomeAssistant } from '../types';

@customElement('confirm-delete-dialog')
export class ConfirmDeleteDialog extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;

  @state() private _params?: any;

  public async showDialog(params: any): Promise<void> {
    this._params = params;
    await this.updateComplete;
  }

  public async closeDialog() {
    if (this._params) this._params.cancel();
    this._params = undefined;
  }

  render() {
    if (!this._params) return html``;
    return html`
      <ha-dialog open @closed=${this.closeDialog}>
        <ha-dialog-header slot="header">
          <ha-icon-button
            slot="navigationIcon"
            data-dialog="close"
            .label=${this.hass.localize('ui.common.close')}
            .path=${mdiClose}></ha-icon-button>
          <div slot="title">${this._params.title}</div>
        </ha-dialog-header>
        <div class="wrapper">${this._params.description}</div>
        <ha-dialog-footer slot="footer">
          <ha-button appearance="plain" slot="primaryAction" @click=${this.cancelClick} dialogAction="close">
            ${this.hass.localize('ui.dialogs.generic.cancel')}
          </ha-button>
          <ha-button
            appearance="plain"
            slot="secondaryAction"
            style="float: left"
            @click=${this.confirmClick}
            dialogAction="close">
            ${this.hass.localize('ui.dialogs.generic.ok')}
          </ha-button>
        </ha-dialog-footer>
      </ha-dialog>
    `;
  }

  confirmClick() {
    this._params.confirm();
  }

  cancelClick() {
    this._params.cancel();
  }

  static get styles(): CSSResultGroup {
    return css`
      ${commonStyle}
      div.wrapper {
        color: var(--primary-text-color);
      }
    `;
  }
}
