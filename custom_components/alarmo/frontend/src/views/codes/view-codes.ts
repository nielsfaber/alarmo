import { LitElement, html } from 'lit';
import { property, customElement } from 'lit/decorators.js';

import { prettyPrint, handleError, sortAlphabetically, navigate } from '../../helpers';
import { Dictionary, AlarmoUser, HomeAssistant } from '../../types';
import { fireEvent } from '../../fire_event';

import './user-editor-card.ts';
import './code-config-modal.ts';
import '../../components/alarmo-table.ts';

import { commonStyle } from '../../styles';
import { localize } from '../../../localize/localize';
import { SubscribeMixin } from '../../subscribe-mixin';
import { UnsubscribeFunc } from 'home-assistant-js-websocket';
import { fetchUsers, saveUser } from '../../data/websockets';
import { TableData, TableColumn } from '../../components/alarmo-table';
import { exportPath, Path } from '../../common/navigation';

@customElement('alarm-view-codes')
export class AlarmViewCodes extends SubscribeMixin(LitElement) {
  @property()
  hass?: HomeAssistant;

  @property()
  narrow!: boolean;

  @property()
  path!: Path;

  @property()
  users: Dictionary<AlarmoUser> = {};

  public hassSubscribe(): Promise<UnsubscribeFunc>[] {
    this._fetchData();
    return [this.hass!.connection.subscribeMessage(() => this._fetchData(), { type: 'alarmo_config_updated' })];
  }

  private async _fetchData(): Promise<void> {
    if (!this.hass) {
      return;
    }
    const users = await fetchUsers(this.hass);
    this.users = users;
  }

  render() {
    if (!this.hass) return html``;

    if (this.path.subpage == 'new_user') {
      return html`
        <user-editor-card .hass=${this.hass} .narrow=${this.narrow}></user-editor-card>
      `;
    } else if (this.path.params.edit_user) {
      return html`
        <user-editor-card
          .hass=${this.hass}
          .narrow=${this.narrow}
          item=${this.path.params.edit_user}
        ></user-editor-card>
      `;
    } else {
      return html`
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
        title: this.hass.localize('ui.common.name'),
        width: '40%',
        grow: true,
        text: true,
      },
      code_format: {
        title: localize('panels.codes.cards.codes.fields.code_format.heading', this.hass.language),
        width: '40%',
        hide: this.narrow,
        text: true,
      },
      enabled: {
        title: localize('common.enabled', this.hass.language),
        width: '68px',
        align: 'center',
      },
    };

    const data = users.map(item => {
      const output: TableData = {
        id: item.user_id!,
        icon: html`
          <ha-icon icon="mdi:account-outline" class="${item.enabled ? '' : 'disabled'}"></ha-icon>
        `,
        name: html`
          <span class="${item.enabled ? '' : 'disabled'}">
            ${prettyPrint(item.name)}
          </span>
        `,
        code_format: html`
          <span class="${item.enabled ? '' : 'disabled'}">
          ${item.code_format == 'number'
            ? prettyPrint(
              localize('panels.codes.cards.codes.fields.code_format.code_format_number', this.hass!.language)
            )
            : item.code_format == 'text'
              ? prettyPrint(localize('panels.codes.cards.codes.fields.code_format.code_format_text', this.hass!.language))
              : this.hass!.localize('state.default.unknown')
          }
          </span>
        `,
        enabled: html`
          <ha-switch
            @click=${(ev: Event) => ev.stopPropagation()}
            ?checked=${item.enabled}
            @change=${(ev: Event) => this.toggleEnabled(ev, item.user_id!)}
          ></ha-switch>
        `,
      };
      return output;
    });

    return html`
      <ha-card header="${localize('panels.codes.cards.user_management.title', this.hass.language)}">
        <div class="card-content">
          ${localize('panels.codes.cards.user_management.description', this.hass.language)}
        </div>
        <div style="padding: 0px 0px 16px 16px; margin-top: -8px">
          <ha-button
            appearance="filled"
            @click=${this.openCodeConfigDialog}
          >
            <ha-icon slot="start" icon="mdi:cog-outline"></ha-icon>
            ${localize('panels.codes.cards.user_management.actions.configure_codes', this.hass.language)}
          </ha-button>
        </div>

        <alarmo-table
          ?selectable=${true}
          .columns=${columns}
          .data=${data}
          @row-click=${(ev: CustomEvent) => {
        const id = String(ev.detail.id);
        navigate(this, exportPath('codes', { params: { edit_user: id } }), true);
      }}
        >
          ${localize('panels.codes.cards.user_management.no_items', this.hass.language)}
        </alarmo-table>
        <div class="card-actions">
          <ha-button appearance="plain" @click=${this.addUserClick}>
            ${localize('panels.codes.cards.user_management.actions.new_user', this.hass.language)}
          </ha-button>
        </div>
      </ha-card>
    `;
  }

  addUserClick() {
    navigate(this, exportPath('codes', 'new_user'), true);
  }

  private openCodeConfigDialog(ev: Event) {
    fireEvent(ev.currentTarget as HTMLElement, 'show-dialog', {
      dialogTag: 'code-config-modal',
      dialogImport: () => import('./code-config-modal'),
      dialogParams: {},
    });
  }

  toggleEnabled(ev: Event, id: string) {
    const enabled = (ev.target as HTMLInputElement).checked;
    saveUser(this.hass!, { user_id: id, enabled: enabled })
      .catch(e => handleError(e, this.shadowRoot!.querySelector('ha-card') as HTMLElement))
      .then();
  }

  static styles = commonStyle;
}
