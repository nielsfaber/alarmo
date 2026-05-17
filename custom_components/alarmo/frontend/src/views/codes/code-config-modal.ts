import { LitElement, html, css, CSSResultGroup } from 'lit';
import { property, customElement, state } from 'lit/decorators.js';
import { mdiClose } from '@mdi/js';
import { localize } from '../../../localize/localize';
import { fetchConfig, saveConfig } from '../../data/websockets';
import { AlarmoConfig, HomeAssistant } from '../../types';
import { pick, handleError } from '../../helpers';
import { commonStyle } from '../../styles';

import '../../components/alarmo-settings-row';

@customElement('code-config-modal')
export class CodeConfigModal extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;

  @state() private _params?: any;
  @property() data?: Partial<AlarmoConfig>;

  public async showDialog(params: any): Promise<void> {
    this._params = params;
    const config = await fetchConfig(this.hass);
    this.data = pick(config, ['code_arm_required', 'code_disarm_required', 'code_mode_change_required', 'code_format']);
    await this.updateComplete;
  }

  public async closeDialog() {
    this._params = undefined;
    this.data = undefined;
  }

  render() {
    if (!this._params || !this.data) return html``;

    return html`
      <ha-dialog open @closed=${this.closeDialog}>
        <ha-dialog-header slot="header">
          <ha-icon-button
            slot="navigationIcon"
            data-dialog="close"
            .label=${this.hass.localize('ui.common.close')}
            .path=${mdiClose}
          ></ha-icon-button>
          <div slot="title">${localize('panels.codes.title', this.hass.language)}</div>
        </ha-dialog-header>

        <div class="wrapper">
          <div class="description">${localize('panels.codes.cards.codes.description', this.hass.language)}</div>

          <alarmo-settings-row>
            <span slot="heading">
              ${localize('panels.codes.cards.codes.fields.code_arm_required.heading', this.hass.language)}
            </span>
            <span slot="description">
              ${localize('panels.codes.cards.codes.fields.code_arm_required.description', this.hass.language)}
            </span>
            <ha-switch
              ?checked=${this.data.code_arm_required}
              @change=${(ev: Event) => {
                this.saveData({ code_arm_required: (ev.target as HTMLInputElement).checked }, ev);
              }}
            ></ha-switch>
          </alarmo-settings-row>

          <alarmo-settings-row>
            <span slot="heading">
              ${localize('panels.codes.cards.codes.fields.code_disarm_required.heading', this.hass.language)}
            </span>
            <span slot="description">
              ${localize('panels.codes.cards.codes.fields.code_disarm_required.description', this.hass.language)}
            </span>
            <ha-switch
              ?checked=${this.data.code_disarm_required}
              @change=${(ev: Event) => {
                this.saveData({ code_disarm_required: (ev.target as HTMLInputElement).checked }, ev);
              }}
            ></ha-switch>
          </alarmo-settings-row>

          <alarmo-settings-row>
            <span slot="heading">
              ${localize('panels.codes.cards.codes.fields.code_mode_change_required.heading', this.hass.language)}
            </span>
            <span slot="description">
              ${localize('panels.codes.cards.codes.fields.code_mode_change_required.description', this.hass.language)}
            </span>
            <ha-switch
              ?checked=${this.data.code_mode_change_required}
              @change=${(ev: Event) => {
                this.saveData({ code_mode_change_required: (ev.target as HTMLInputElement).checked }, ev);
              }}
            ></ha-switch>
          </alarmo-settings-row>

          <alarmo-settings-row>
            <span slot="heading">
              ${localize('panels.codes.cards.codes.fields.code_format.heading', this.hass.language)}
            </span>
            <span slot="description">
              ${localize('panels.codes.cards.codes.fields.code_format.description', this.hass.language)}
            </span>
            <ha-button
              appearance="${this.data.code_format == 'number' ? 'filled' : 'plain'}"
              variant="${this.data.code_format == 'number' ? 'brand' : 'neutral'}"
              @click=${(ev: Event) => this.saveData({ code_format: 'number' }, ev)}
              ?disabled=${!this.codesInUse}
            >
              ${localize('panels.codes.cards.codes.fields.code_format.code_format_number', this.hass.language)}
            </ha-button>
            <ha-button
              appearance="${this.data.code_format == 'text' ? 'filled' : 'plain'}"
              variant="${this.data.code_format == 'text' ? 'brand' : 'neutral'}"
              @click=${(ev: Event) => this.saveData({ code_format: 'text' }, ev)}
              ?disabled=${!this.codesInUse}
            >
              ${localize('panels.codes.cards.codes.fields.code_format.code_format_text', this.hass.language)}
            </ha-button>
          </alarmo-settings-row>
        </div>
      </ha-dialog>
    `;
  }

  private get codesInUse() {
    return this.data?.code_arm_required || this.data?.code_disarm_required || this.data?.code_mode_change_required;
  }

  private saveData(changes: Partial<AlarmoConfig>, ev: Event) {
    if (!this.hass || !this.data) return;
    this.data = { ...this.data, ...changes };
    saveConfig(this.hass, this.data).catch(e => handleError(e, ev));
  }

  static get styles(): CSSResultGroup {
    return css`
      ${commonStyle}
      div.wrapper {
        color: var(--primary-text-color);
      }
      div.description {
        margin-bottom: 10px;
      }
    `;
  }
}
