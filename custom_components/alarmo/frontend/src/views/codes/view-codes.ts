import { LitElement, html } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { HomeAssistant, navigate } from 'custom-card-helpers';

import { prettyPrint, handleError, sortAlphabetically } from '../../helpers';
import { AlarmoConfig, Dictionary, AlarmoUser } from '../../types';

import './user-editor-card.ts';
import '../../components/settings-row.ts';
import '../../components/alarmo-table.ts';

import { commonStyle } from '../../styles';
import { localize } from '../../../localize/localize';
import { SubscribeMixin } from '../../subscribe-mixin';
import { UnsubscribeFunc } from 'home-assistant-js-websocket';
import { fetchConfig, fetchUsers, saveConfig } from '../../data/websockets';
import { TableData, TableColumn } from '../../components/alarmo-table';

@customElement('alarm-view-codes')
export class AlarmViewCodes extends SubscribeMixin(LitElement) {
  hass?: HomeAssistant;
  @property() narrow!: boolean;
  @property() path!: string[] | null;

  @property() config?: AlarmoConfig;
  @property() users: Dictionary<AlarmoUser> = {};
  @property() code_arm_required = false;
  @property() code_disarm_required = false;
  @property() code_format: 'number' | 'text' = 'number';

  public hassSubscribe(): Promise<UnsubscribeFunc>[] {
    this._fetchData();
    return [this.hass!.connection.subscribeMessage(() => this._fetchData(), { type: 'alarmo_config_updated' })];
  }

  private async _fetchData(): Promise<void> {
    if (!this.hass) {
      return;
    }
    const config = await fetchConfig(this.hass);
    this.config = config;
    this.code_arm_required = config.code_arm_required;
    this.code_disarm_required = config.code_disarm_required;
    this.code_format = config.code_format;

    const users = await fetchUsers(this.hass);
    this.users = users;
  }

  render() {
    if (!this.hass) return html``;

    if (this.path && this.path[0] == 'new_user') {
      return html`
        <user-editor-card .hass=${this.hass} .narrow=${this.narrow}> </user-editor-card>
      `;
    } else if (this.path && this.path.length == 2 && this.path[0] == 'edit_user') {
      return html`
        <user-editor-card .hass=${this.hass} .narrow=${this.narrow} item=${this.path[1]}> </user-editor-card>
      `;
    } else {
      return html`
        <ha-card header="${localize('panels.codes.title', this.hass.language)}">
          <div class="card-content">
            ${localize('panels.codes.cards.codes.description', this.hass.language)}
          </div>

          <settings-row .narrow=${this.narrow}>
            <span slot="heading"
              >${localize('panels.codes.cards.codes.fields.code_arm_required.heading', this.hass.language)}</span
            >
            <span slot="description"
              >${localize('panels.codes.cards.codes.fields.code_arm_required.description', this.hass.language)}</span
            >
            <ha-switch
              ?checked=${this.code_arm_required}
              @change=${(ev: Event) => {
          this.code_arm_required = (ev.target as HTMLInputElement).checked;
        }}
            >
            </ha-switch>
          </settings-row>

          <settings-row .narrow=${this.narrow}>
            <span slot="heading"
              >${localize('panels.codes.cards.codes.fields.code_disarm_required.heading', this.hass.language)}</span
            >
            <span slot="description"
              >${localize('panels.codes.cards.codes.fields.code_disarm_required.description', this.hass.language)}</span
            >
            <ha-switch
              ?checked=${this.code_disarm_required}
              @change=${(ev: Event) => {
          this.code_disarm_required = (ev.target as HTMLInputElement).checked;
        }}
            >
            </ha-switch>
          </settings-row>

          <settings-row .narrow=${this.narrow}>
            <span slot="heading"
              >${localize('panels.codes.cards.codes.fields.code_format.heading', this.hass.language)}</span
            >
            <span slot="description"
              >${localize('panels.codes.cards.codes.fields.code_format.description', this.hass.language)}</span
            >
            <mwc-button
              class="${this.code_format == 'number' ? 'active' : ''} ${!this.code_arm_required &&
          !this.code_disarm_required
          ? 'disabled'
          : ''}"
              @click=${() => {
          this.code_format = 'number';
        }}
              ?disabled=${!this.code_arm_required && !this.code_disarm_required}
              >${localize(
          'panels.codes.cards.codes.fields.code_format.code_format_number',
          this.hass.language
        )}</mwc-button
            >
            <mwc-button
              class="${this.code_format == 'text' ? 'active' : ''} ${!this.code_arm_required &&
          !this.code_disarm_required
          ? 'disabled'
          : ''}"
              @click=${() => {
          this.code_format = 'text';
        }}
              ?disabled=${!this.code_arm_required && !this.code_disarm_required}
            >
              ${localize(
          'panels.codes.cards.codes.fields.code_format.code_format_text',
          this.hass.language
        )}</mwc-button
            >
          </settings-row>

          <div class="card-actions">
            <mwc-button @click=${this.saveClick}>
              ${this.hass.localize('ui.common.save')}
            </mwc-button>
          </div>
        </ha-card>

        ${this.usersPanel()}
      `;
    }
  }

  usersPanel() {
    if (!this.hass) return html``;

    const users = Object.values(this.users);
    users.sort(sortAlphabetically);

    const columns: Dictionary<TableColumn> = {
      icon: {
        width: '40px',
      },
      name: {
        title: this.hass.localize('ui.components.area-picker.add_dialog.name'),
        width: '40%',
        grow: true,
        text: true,
      },
      remarks: {
        title: localize('panels.codes.cards.user_management.table.remarks', this.hass.language),
        width: '40%',
        hide: this.narrow,
        text: true,
      },
    };

    const data = users.map(item => {
      const output: TableData = {
        id: item.user_id!,
        icon: html`
          <ha-icon icon="mdi:account-outline"></ha-icon>
        `,
        name: prettyPrint(item.name),
        remarks: item.is_admin
          ? localize('panels.codes.cards.user_management.table.administrator', this.hass!.language)
          : '',
      };
      return output;
    });

    return html`
      <ha-card header="${localize('panels.codes.cards.user_management.title', this.hass.language)}">
        <div class="card-content">
          ${localize('panels.codes.cards.user_management.description', this.hass.language)}
        </div>

        <alarmo-table
          ?selectable=${true}
          .columns=${columns}
          .data=${data}
          @row-click=${(ev: CustomEvent) => {
        const id = String(ev.detail.id);
        navigate(this, `/alarmo/codes/edit_user/${id}`, true);
      }}
        >
          ${localize('panels.codes.cards.user_management.no_items', this.hass.language)}
        </alarmo-table>
        <div class="card-actions">
          <mwc-button @click=${this.addUserClick}>
            ${localize('panels.codes.cards.user_management.actions.new_user', this.hass.language)}
          </mwc-button>
        </div>
      </ha-card>
    `;
  }

  addUserClick() {
    navigate(this, '/alarmo/codes/new_user', true);
  }

  saveClick(ev: Event) {
    if (!this.hass) return;

    saveConfig(this.hass, {
      code_arm_required: this.code_arm_required,
      code_disarm_required: this.code_disarm_required,
      code_format: this.code_format,
    })
      .catch(e => handleError(e, ev))
      .then();
  }

  static styles = commonStyle;
}
