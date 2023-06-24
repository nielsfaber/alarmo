import { LitElement, html, css, CSSResultGroup } from 'lit';
import { property, customElement, state } from 'lit/decorators.js';
import { mdiClose } from '@mdi/js';
import { localize } from '../../localize/localize';
import { fetchConfig, saveConfig } from '../data/websockets';
import { HomeAssistant } from '../types';

@customElement('edit-master-dialog')
export class EditMasterDialog extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;

  @state() private _params?: any;
  @property() name = '';

  public async showDialog(params: any): Promise<void> {
    this._params = params;
    const config = await fetchConfig(this.hass);
    this.name = config.master['name'] || '';
    await this.updateComplete;
  }

  public async closeDialog() {
    this._params = undefined;
  }

  render() {
    if (!this._params) return html``;
    return html`
      <ha-dialog open .heading=${true} @closed=${this.closeDialog} @close-dialog=${this.closeDialog}>
        <ha-dialog-header slot="heading">
          <ha-icon-button slot="navigationIcon" dialogAction="cancel" .path=${mdiClose}>
          </ha-icon-button>
            <span slot="title">${localize('panels.general.dialogs.edit_master.title', this.hass.language)}</span>
        </ha-dialog-header>
        <div class="wrapper">
          <ha-textfield
            label=${this.hass.localize('ui.components.area-picker.add_dialog.name')}
            @input=${(ev: Event) => (this.name = (ev.target as HTMLInputElement).value)}
            value="${this.name}"
          ></ha-textfield>
          <span class="note">${localize('panels.general.dialogs.edit_area.name_warning', this.hass.language)}</span>
        </div>
        <mwc-button slot="primaryAction" @click=${this.saveClick}>
          ${this.hass.localize('ui.common.save')}
        </mwc-button>
        <mwc-button slot="secondaryAction" @click=${this.closeDialog}>
          ${this.hass.localize('ui.common.cancel')}
        </mwc-button>
      </ha-dialog>
    `;
  }

  private saveClick() {
    const name = this.name.trim();
    if (!name.length) return;

    saveConfig(this.hass, {
      master: {
        enabled: true,
        name: name,
      },
    })
      .catch()
      .then(() => {
        this.closeDialog();
      });
  }

  static get styles(): CSSResultGroup {
    return css`
      div.wrapper {
        color: var(--primary-text-color);
      }
      span.note {
        color: var(--secondary-text-color);
      }
      ha-textfield {
        display: block;
      }
    `;
  }
}
