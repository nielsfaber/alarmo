import { LitElement, html } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { HomeAssistant, navigate, computeDomain } from 'custom-card-helpers';
import { loadHaForm } from '../../load-ha-form';

import { AlarmEntity, AlarmoAutomation, Dictionary, AlarmoArea, AlarmoConfig } from '../../types';
import { SubscribeMixin } from '../../subscribe-mixin';
import { UnsubscribeFunc } from 'home-assistant-js-websocket';

import { commonStyle } from '../../styles';
import { fetchAutomations, saveAutomation, fetchAreas, fetchConfig } from '../../data/websockets';
import { TableColumn } from '../../components/alarmo-table';
import { handleError, Unique, isDefined, flatten, sortAlphabetically } from '../../helpers';
import { localize } from '../../../localize/localize';
import { AlarmoChip } from '../../components/alarmo-chips';

import './notification-editor-card.ts';
import './automation-editor-card.ts';

import '../../components/settings-row.ts';
import '../../components/alarmo-chips.ts';
import { EAutomationTypes } from '../../const';
import { getAreaOptions, computeAreaDisplay } from '../../data/actions';

@customElement('alarm-view-actions')
export class AlarmViewActions extends SubscribeMixin(LitElement) {
  @property()
  hass?: HomeAssistant;

  @property()
  narrow!: boolean;

  @property()
  path!: string[] | null;

  @property()
  alarmEntity?: AlarmEntity;

  @property()
  automations?: AlarmoAutomation[];

  @property()
  areas: Dictionary<AlarmoArea> = {};

  @property()
  config!: AlarmoConfig;

  @property()
  notificationFilter?: string;

  @property()
  automationFilter?: string;

  @property()
  notificationFilterOptions: AlarmoChip[] = [];

  @property()
  automationFilterOptions: AlarmoChip[] = [];

  public hassSubscribe(): Promise<UnsubscribeFunc>[] {
    this._fetchData();
    return [this.hass!.connection.subscribeMessage(() => this._fetchData(), { type: 'alarmo_config_updated' })];
  }

  private async _fetchData(): Promise<void> {
    if (!this.hass) {
      return;
    }
    const automations = await fetchAutomations(this.hass);
    this.automations = Object.values(automations);
    this.areas = await fetchAreas(this.hass);
    this.config = await fetchConfig(this.hass);

    this.notificationFilterOptions = [
      ...getAreaOptions(this.areas, this.config)
        .map(a => Object({
          ...computeAreaDisplay(a, this.areas, this.config),
          count: Object.values(automations).filter(e => e.type == EAutomationTypes.Notification).map(this.getAreaForAutomation).filter(e => e == a).length
        }))
    ]
      .sort(sortAlphabetically);

    this.automationFilterOptions = [
      ...getAreaOptions(this.areas, this.config)
        .map(a => Object({
          ...computeAreaDisplay(a, this.areas, this.config),
          count: Object.values(automations).filter(e => e.type == EAutomationTypes.Action).map(this.getAreaForAutomation).filter(e => e == a).length
        }))
    ]
      .sort(sortAlphabetically);

    if (Object.values(automations).filter(e => e.type == EAutomationTypes.Notification).map(this.getAreaForAutomation).filter(e => !isDefined(e)).length)
      this.notificationFilterOptions = [{
        value: 'no_area',
        name: localize('panels.actions.cards.notifications.filter.no_area', this.hass.language),
        count: Object.values(automations).filter(e => e.type == EAutomationTypes.Notification).map(this.getAreaForAutomation).filter(e => !isDefined(e)).length
      }, ...this.notificationFilterOptions];

    if (Object.values(automations).filter(e => e.type == EAutomationTypes.Action).map(this.getAreaForAutomation).filter(e => !isDefined(e)).length)
      this.automationFilterOptions = [{
        value: 'no_area',
        name: localize('panels.actions.cards.notifications.filter.no_area', this.hass.language),
        count: Object.values(automations).filter(e => e.type == EAutomationTypes.Action).map(this.getAreaForAutomation).filter(e => !isDefined(e)).length
      }, ...this.automationFilterOptions];
  }

  firstUpdated() {
    if (this.path && this.path.length == 2 && this.path[0] == 'filter') {
      this.notificationFilter = this.path[1];
      this.automationFilter = this.path[1];
    }
    (async () => await loadHaForm())();
  }

  render() {
    if (!this.hass || !this.automations) return html``;

    if (
      this.path?.length &&
      ['new_notification', 'edit_notification'].includes(this.path[0])
    ) {
      const config = this.automations.find(e => this.path!.length > 1 && e.automation_id == this.path![1] && e.type == EAutomationTypes.Notification);
      return html`
        <notification-editor-card
          .hass=${this.hass}
          .narrow=${this.narrow}
          .item=${config}
        ></notification-editor-card>
      `;
    } else if (this.path && this.path.length && this.path[0] == 'new_action') {
      return html`
        <automation-editor-card
          .hass=${this.hass}
          .narrow=${this.narrow}>
        ?</automation-editor-card>
      `;
    } else if (this.path && this.path.length == 2 && this.path[0] == 'edit_action') {
      const config = this.automations.find(e => this.path!.length > 1 && e.automation_id == this.path![1] && e.type == EAutomationTypes.Action);
      return html`
        <automation-editor-card
          .hass=${this.hass}
          .narrow=${this.narrow}
          .item=${config}
        >
        </automation-editor-card>
      `;
    } else {
      const columns: Dictionary<TableColumn> = {
        type: {
          width: '40px',
        },
        name: {
          title: this.hass.localize('ui.components.area-picker.add_dialog.name'),
          width: '40%',
          grow: true,
          text: true,
        },
        enabled: {
          title: localize('panels.actions.cards.notifications.table.enabled', this.hass.language),
          width: '68px',
          align: 'center',
        },
      };

      const notificationData = this.automations
        .filter(e => e.type == EAutomationTypes.Notification)
        .filter(
          e =>
            !isDefined(this.notificationFilter) ||
            !this.notificationFilterOptions.find(e => e.value == this.notificationFilter) ||
            this.getAreaForAutomation(e) == this.notificationFilter ||
            (this.notificationFilter === 'no_area' && !isDefined(this.getAreaForAutomation(e)))
        )
        .map(e =>
          Object({
            id: e.automation_id,
            type: html`
              <ha-icon icon="hass:message-text-outline"></ha-icon>
            `,
            name: e.name,
            enabled: html`
              <ha-switch
                ?checked=${e.enabled}
                @click=${(ev: Event) => {
                ev.stopPropagation();
                this.toggleEnable(ev, e.automation_id!);
              }}
              ></ha-switch>
            `,
          })
        );

      const automationData = this.automations
        .filter(e => e.type == EAutomationTypes.Action)
        .filter(
          e =>
            !isDefined(this.automationFilter) ||
            !this.automationFilterOptions.find(e => e.value == this.automationFilter) ||
            this.getAreaForAutomation(e) == this.automationFilter ||
            (this.automationFilter === 'no_area' && !isDefined(this.getAreaForAutomation(e)))
        )
        .map(e =>
          Object({
            id: e.automation_id,
            type: html`
              <ha-icon icon="hass:flash"></ha-icon>
            `,
            name: e.name,
            enabled: html`
              <ha-switch
                ?checked=${e.enabled}
                @click=${(ev: Event) => {
                ev.stopPropagation();
                this.toggleEnable(ev, e.automation_id!);
              }}
              ></ha-switch>
            `,
          })
        );

      return html`
        <ha-card header="${localize('panels.actions.cards.notifications.title', this.hass.language)}">
          <div class="card-content">
            ${localize('panels.actions.cards.notifications.description', this.hass.language)}
          </div>

          ${this.notificationFilterOptions.length > 1
          ? html`
                <div class="table-filter" ?narrow=${this.narrow}>
                  <span class="header"
                    >${localize('panels.actions.cards.notifications.filter.label', this.hass.language)}:</span
                  >
                  <alarmo-chips
                    .items=${this.notificationFilterOptions}
                    value=${this.notificationFilter}
                    selectable
                    @value-changed=${(ev: Event) => (this.notificationFilter = (ev.target as HTMLInputElement).value)}
                  >
                  </alarmo-chips>
                </div>
              `
          : ''}
          <alarmo-table
            ?selectable=${true}
            .columns=${columns}
            .data=${notificationData}
            @row-click=${(ev: CustomEvent) => {
          const id = String(ev.detail.id);
          navigate(this, `/alarmo/actions/edit_notification/${id}`, true);
        }}
          >
            ${localize('panels.actions.cards.notifications.table.no_items', this.hass.language)}
          </alarmo-table>

          <div class="card-actions">
            <mwc-button @click=${this.addNotificationClick}>
              ${localize('panels.actions.cards.notifications.actions.new_notification', this.hass.language)}
            </mwc-button>
          </div>
        </ha-card>

        <ha-card header="${localize('panels.actions.title', this.hass.language)}">
          <div class="card-content">${localize('panels.actions.cards.actions.description', this.hass.language)}</div>

          ${this.automationFilterOptions.length > 1
          ? html`
                <div class="table-filter" ?narrow=${this.narrow}>
                  <span class="header"
                    >${localize('panels.actions.cards.notifications.filter.label', this.hass.language)}:</span
                  >
                  <alarmo-chips
                    .items=${this.automationFilterOptions}
                    value=${this.automationFilter}
                    selectable
                    @value-changed=${(ev: Event) => (this.automationFilter = (ev.target as HTMLInputElement).value)}
                  >
                  </alarmo-chips>
                </div>
              `
          : ''}
          <alarmo-table
            ?selectable=${true}
            .columns=${columns}
            .data=${automationData}
            @row-click=${(ev: CustomEvent) => {
          const id = String(ev.detail.id);
          navigate(this, `/alarmo/actions/edit_action/${id}`, true);
        }}
          >
            ${localize('panels.actions.cards.actions.table.no_items', this.hass.language)}
          </alarmo-table>

          <div class="card-actions">
            <mwc-button @click=${this.addActionClick}>
              ${localize('panels.actions.cards.actions.actions.new_action', this.hass.language)}
            </mwc-button>
          </div>
        </ha-card>
      `;
    }
  }

  private getAreaForAutomation = (automation: AlarmoAutomation) => {
    const areaOptions = getAreaOptions(this.areas, this.config);
    let area = automation.triggers[0].area;
    return isDefined(area) && areaOptions.includes(area)
      ? area
      : undefined;
  };

  private toggleEnable(ev: Event, item_id: string) {
    saveAutomation(this.hass!, { automation_id: item_id, enabled: !(ev.target as HTMLInputElement).checked })
      .catch(e => handleError(e, ev))
      .then();
  }

  addNotificationClick() {
    navigate(this, '/alarmo/actions/new_notification', true);
  }

  addActionClick() {
    navigate(this, '/alarmo/actions/new_action', true);
  }

  static styles = commonStyle;
}
