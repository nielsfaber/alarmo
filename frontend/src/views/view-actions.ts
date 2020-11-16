import { LitElement, html, customElement, property, CSSResult, css } from 'lit-element';
import { HomeAssistant, computeDomain, navigate } from 'custom-card-helpers';
import { loadHaForm } from '../load-ha-form';

import { AlarmEntity, AlarmoAutomation, Dictionary } from '../types';
import { SubscribeMixin } from '../subscribe-mixin';
import { UnsubscribeFunc } from 'home-assistant-js-websocket';

import '../components/settings-row.ts';
import '../cards/notification-editor-card.ts';
import { commonStyle } from '../styles';
import { fetchAutomations, saveAutomation } from '../data/websockets';
import { TableColumn } from '../components/alarmo-table';
import { handleError } from '../helpers';
import { localize } from '../../localize/localize';

@customElement('alarm-view-actions')
export class AlarmViewActions extends SubscribeMixin(LitElement) {

  @property() hass?: HomeAssistant;
  @property() narrow!: boolean;
  @property() path!: string[] | null;

  @property() alarmEntity?: AlarmEntity;
  @property() automations: AlarmoAutomation[] = [];

  public hassSubscribe(): Promise<UnsubscribeFunc>[] {
    this._fetchData();
    return [
      this.hass!.connection.subscribeEvents(
        () => this._fetchData(),
        "alarmo_updated"
      ),
    ];
  }

  private async _fetchData(): Promise<void> {
    if (!this.hass) {
      return;
    }
    const automations = await fetchAutomations(this.hass);
    this.automations = Object.values(automations);
  }


  render() {
    if (!this.hass) return html``;

    if (this.path && this.path.length && this.path[0] == "new_notification") {
      return html`
        <notification-editor-card
          .hass=${this.hass}
          .narrow=${this.narrow}
        >

        </notification-editor-card>
      `;
    }
    else if (this.path && this.path.length == 2 && this.path[0] == "edit_notification") {
      return html`
        <notification-editor-card
          .hass=${this.hass}
          .narrow=${this.narrow}
          item=${this.path[1]}
        >

        </notification-editor-card>
      `;
    }
    else {
      const columns: Dictionary<TableColumn> = {
        type: {
          width: "40px",
        },
        name: {
          title: this.hass.localize("ui.components.area-picker.add_dialog.name"),
          width: "40%",
          grow: true,
          text: true
        },
        enabled: {
          title: localize("panels.actions.cards.notifications.table.enabled", this.hass.language),
          width: "68px",
          align: "center"
        },

      };
      const notificationData = this.automations
        .filter(e => e.is_notification)
        .map(e => Object({
          id: e.automation_id,
          type: html`<ha-icon icon="hass:message-text-outline"></ha-icon>`,
          name: e.name,
          enabled: html`<ha-switch
        ?checked=${e.enabled}
        @click=${(ev: Event) => { ev.stopPropagation(); this.toggleEnable(ev, e.automation_id!) }}
      ></ha-switch>`
        }));

      const automationData = this.automations
        .filter(e => !e.is_notification)
        .map(e => Object({
          id: e.automation_id,
          type: html`<ha-icon icon="hass:message-text-outline"></ha-icon>`,
          name: e.name,
          enabled: html`<ha-switch
        ?checked=${e.enabled}
        @click=${(ev: Event) => { ev.stopPropagation(); this.toggleEnable(ev, e.automation_id!) }}
      ></ha-switch>`
        }));

      return html`

      <ha-card header="${localize("panels.actions.cards.notifications.title", this.hass.language)}">
        <div class="card-content">${localize("panels.actions.cards.notifications.description", this.hass.language)}</div>
        
      <alarmo-table
        ?selectable=${true}
        .columns=${columns}
        .data=${notificationData}
        @row-click=${(ev: CustomEvent) => {
          const id = String(ev.detail.id);
          navigate(this, `/alarmo/actions/edit_notification/${id}`, true);
        }}
      >
        ${localize("panels.actions.cards.notifications.table.no_items", this.hass.language)}
      </alarmo-table>

        <div class="card-actions">
          <mwc-button
            @click=${this.addNotificationClick}
          >
            ${localize("panels.actions.cards.notifications.actions.new_notification", this.hass.language)}
          </mwc-button>
        </div>
      </ha-card>

      
      <ha-card header="${localize("panels.actions.cards.actions.title", this.hass.language)}">
        <div class="card-content">${localize("panels.actions.cards.actions.description", this.hass.language)}</div>
                
      <alarmo-table
        ?selectable=${true}
        .columns=${columns}
        .data=${automationData}
        @row-click=${(ev: CustomEvent) => {
          const id = String(ev.detail.id);
          navigate(this, `/alarmo/actions/edit_action/${id}`, true);
        }}
      >
        ${localize("panels.actions.cards.actions.table.no_items", this.hass.language)}
      </alarmo-table>

        <div class="card-actions">
          <mwc-button
            @click=${() => { }}
            disabled
          >
            ${localize("panels.actions.cards.actions.actions.new_action", this.hass.language)}
          </mwc-button>
        </div>
      </ha-card>
    `;
    }
  }

  private toggleEnable(ev: Event, item_id: string) {
    saveAutomation(this.hass!, { automation_id: item_id, enabled: !(ev.target as HTMLInputElement).checked })
      .catch(e => handleError(e, ev))
      .then(() => { });
  }

  addNotificationClick() {
    navigate(this, "/alarmo/actions/new_notification", true);
  }

  static get styles(): CSSResult {
    return css`
      ${commonStyle}

      :host {
        flex: 1 0 0;
        max-width: 100%;
      }

      div.table {
        margin: 0px 10px;
      }

      div.table .entity-row {
        border-bottom: 1px solid var(--divider-color);
        min-height: 48px;
      }

      div.table .entity-row.header {
        font-weight: 600;
      }

      div.table .entity-row:first-child {
        border-top: 1px solid var(--divider-color);
      }

      div.table ha-icon-button {
        color: var(--secondary-text-color);
      }

      

    `;
  }
}
