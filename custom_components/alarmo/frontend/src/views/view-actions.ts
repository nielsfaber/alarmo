import { LitElement, html, customElement, property, CSSResult, css } from 'lit-element';
import { HomeAssistant, computeDomain, navigate } from 'custom-card-helpers';
import { loadHaForm } from '../load-ha-form';

import { AlarmEntity, AlarmoAutomation, Dictionary, AlarmoArea } from '../types';
import { SubscribeMixin } from '../subscribe-mixin';
import { UnsubscribeFunc } from 'home-assistant-js-websocket';

import '../components/settings-row.ts';
import '../cards/notification-editor-card.ts';
import '../cards/automation-editor-card.ts';
import '../components/alarmo-chips.ts';

import { commonStyle } from '../styles';
import { fetchAutomations, saveAutomation, fetchAreas } from '../data/websockets';
import { TableColumn } from '../components/alarmo-table';
import { handleError } from '../helpers';
import { localize } from '../../localize/localize';
import { Option } from '../components/alarmo-chips';


@customElement('alarm-view-actions')
export class AlarmViewActions extends SubscribeMixin(LitElement) {

  @property() hass?: HomeAssistant;
  @property() narrow!: boolean;
  @property() path!: string[] | null;

  @property() alarmEntity?: AlarmEntity;
  @property() automations: AlarmoAutomation[] = [];
  @property() areas: Dictionary<AlarmoArea> = {};
  
  @property() notificationFilter?: string;
  @property() automationFilter?: string;

  @property() notificationFilterOptions: Option[] = [];
  @property() automationFilterOptions: Option[] = [];

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
    this.areas = await fetchAreas(this.hass);
      
    this.notificationFilterOptions = [
      {
        value: "no_area",
        name: localize("panels.actions.cards.notifications.filter.no_area", this.hass.language),
        count: Object.values(this.automations).filter(e => e.is_notification && !e.area).length
      }]
      .concat(
        Object.values(this.areas)
          .map(e => Object({
            value: e.area_id,
            name: e.name,
            count: Object.values(this.automations).filter(el => el.is_notification && el.area == e.area_id).length
          }))
          .sort((a, b) => (a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1))
      )
      .filter(e => e.count);

      this.automationFilterOptions = [
        {
          value: "no_area",
          name: localize("panels.actions.cards.notifications.filter.no_area", this.hass.language),
          count: Object.values(this.automations).filter(e => !e.is_notification && !e.area).length
        }]
        .concat(
          Object.values(this.areas)
            .map(e => Object({
              value: e.area_id,
              name: e.name,
              count: Object.values(this.automations).filter(el => !el.is_notification && el.area == e.area_id).length
            }))
            .sort((a, b) => (a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1))
        )
        .filter(e => e.count);
  }

  firstUpdated() {
    if (this.path && this.path.length == 2 && this.path[0] == "filter") {
      this.notificationFilter = this.path[1];
      this.automationFilter = this.path[1];
    }
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
    else if (this.path && this.path.length && this.path[0] == "new_action") {
      return html`
        <automation-editor-card
          .hass=${this.hass}
          .narrow=${this.narrow}
        >

        </automation-editor-card>
      `;
    }
    else if (this.path && this.path.length == 2 && this.path[0] == "edit_action") {
      return html`
        <automation-editor-card
          .hass=${this.hass}
          .narrow=${this.narrow}
          item=${this.path[1]}
        >

        </automation-editor-card>
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
        .filter(e => 
          !this.notificationFilter ||
          !this.notificationFilterOptions.find(e => e.value == this.notificationFilter) ||
          e.area == this.notificationFilter ||
          (this.notificationFilter === "no_area" && !e.area)
        )
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
        .filter(e => 
          !this.automationFilter ||
          !this.automationFilterOptions.find(e => e.value == this.automationFilter) ||
          e.area == this.automationFilter ||
          (this.automationFilter === "no_area" && !e.area)
        )
        .map(e => Object({
          id: e.automation_id,
          type: html`<ha-icon icon="hass:flash"></ha-icon>`,
          name: e.name,
          enabled: html`<ha-switch
        ?checked=${e.enabled}
        @click=${(ev: Event) => { ev.stopPropagation(); this.toggleEnable(ev, e.automation_id!) }}
      ></ha-switch>`
        }));

      return html`

      <ha-card header="${localize("panels.actions.cards.notifications.title", this.hass.language)}">
      <div class="card-content">${localize("panels.actions.cards.notifications.description", this.hass.language)}</div>
      
      ${this.notificationFilterOptions.length > 1
        ? html`
      <div class="table-filter" ?narrow=${this.narrow}>
      <span class="header">${localize("panels.actions.cards.notifications.filter.label", this.hass.language)}:</span>
       <alarmo-chips
         .items=${this.notificationFilterOptions}
         value=${this.notificationFilter}
         @value-changed=${(ev: Event) => this.notificationFilter = (ev.target as HTMLInputElement).value}
       >
       </alarmo-chips>
     </div>
     ` : ''}
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
      
        ${this.automationFilterOptions.length > 1
          ? html`
        <div class="table-filter" ?narrow=${this.narrow}>
        <span class="header">${localize("panels.actions.cards.notifications.filter.label", this.hass.language)}:</span>
         <alarmo-chips
           .items=${this.automationFilterOptions}
           value=${this.automationFilter}
           @value-changed=${(ev: Event) => this.automationFilter = (ev.target as HTMLInputElement).value}
         >
         </alarmo-chips>
       </div>
       ` : ''}
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
            @click=${this.addActionClick}
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

  addActionClick() {
    navigate(this, "/alarmo/actions/new_action", true);
  }


  static styles = commonStyle;
}
