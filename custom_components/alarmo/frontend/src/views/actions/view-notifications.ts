import { LitElement, html } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { loadHaForm } from '../../load-ha-elements';

import { AlarmoAutomation, Dictionary, AlarmoArea, AlarmoConfig, HomeAssistant } from '../../types';
import { SubscribeMixin } from '../../subscribe-mixin';
import { UnsubscribeFunc } from 'home-assistant-js-websocket';

import { commonStyle } from '../../styles';
import { fetchAutomations, saveAutomation, fetchAreas, fetchConfig } from '../../data/websockets';
import { TableColumn, TableFilterConfig } from '../../components/alarmo-table';
import { handleError, isDefined, sortAlphabetically, navigate } from '../../helpers';
import { localize } from '../../../localize/localize';

import './notification-editor-card.ts';

import { EAutomationTypes } from '../../const';
import {
  getAreaOptions,
  computeAreaDisplay,
  computeEventDisplay,
  computeServiceDisplay,
  getArmModeOptions,
} from '../../data/actions';
import { exportPath, Path } from '../../common/navigation';
import { mdiPlus } from '@mdi/js';

const noArea = 'no_area';

@customElement('alarm-view-notifications')
export class AlarmViewNotifications extends SubscribeMixin(LitElement) {
  @property()
  hass?: HomeAssistant;

  @property()
  narrow!: boolean;

  @property()
  path!: Path;

  @property()
  automations?: AlarmoAutomation[];

  @property()
  areas: Dictionary<AlarmoArea> = {};

  @property()
  config!: AlarmoConfig;

  @property()
  selectedArea?: string;

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
  }

  firstUpdated() {
    if (this.path.filter) {
      this.selectedArea = this.path.filter?.area;
    }
    (async () => await loadHaForm())();
  }

  render() {
    if (!this.hass || !this.automations || !this.config) return html``;

    if (this.path.subpage == 'new_notification') {
      return html`
        <notification-editor-card .hass=${this.hass} .narrow=${this.narrow} returnPage="notifications"></notification-editor-card>
      `;
    } else if (this.path.params.edit_notification) {
      const config = this.automations.find(
        e => e.automation_id == this.path.params.edit_notification && e.type == EAutomationTypes.Notification
      );
      return html`
        <notification-editor-card
          .hass=${this.hass}
          .narrow=${this.narrow}
          .item=${config}
          returnPage="notifications"
        ></notification-editor-card>
      `;
    } else {
      const warningTooltip = () => html`
        <paper-tooltip animation-delay="0">
          ${localize('panels.actions.cards.notifications.table.no_area_warning', this.hass!.language)}
        </paper-tooltip>
      `;

      const columns: Dictionary<TableColumn> = {
        type: {
          width: '40px',
          renderer: (item: AlarmoAutomation & { area: string }) =>
            item.area == noArea && !this.config.master.enabled
              ? html`
                  ${warningTooltip()}
                  <ha-icon icon="mdi:alert" style="color: var(--error-color)"></ha-icon>
                `
              : html`
                  <ha-icon icon="hass:message-text-outline"  class="${!item.enabled ? 'disabled' : ''}"></ha-icon>
                `,
        },
        name: {
          title: this.hass.localize('ui.common.name'),
          renderer: (item: AlarmoAutomation & { area: string }) => html`
            ${item.area == noArea && !this.config.master.enabled ? warningTooltip() : ''}
            <span class="${!item.enabled ? 'disabled' : ''}">${item.name}</span>
          `,
          width: '40%',
          grow: true,
          text: true,
          sortable: true,
          sortDefault: 'asc',
          sort: (item: AlarmoAutomation) => item.name || '',
          search: (item: AlarmoAutomation) => item.name || '',
        },
        event: {
          title: localize('panels.actions.cards.new_notification.fields.event.heading', this.hass.language),
          width: '16%',
          hide: this.narrow,
          text: true,
          sortable: true,
          sort: (item: AlarmoAutomation) => computeEventDisplay(item.triggers[0].event!, this.hass!)?.name || '',
          search: (item: AlarmoAutomation) => computeEventDisplay(item.triggers[0].event!, this.hass!)?.name || '',
          renderer: (item: AlarmoAutomation) => computeEventDisplay(item.triggers[0].event!, this.hass!)?.name || '',
        },
        area: {
          title: localize('panels.actions.cards.new_action.fields.area.heading', this.hass.language),
          width: '16%',
          hide: this.narrow,
          text: true,
          sortable: true,
          sort: (item: AlarmoAutomation & { area: string }) => this.getAreaLabel(item.area),
          search: (item: AlarmoAutomation & { area: string }) => this.getAreaLabel(item.area),
          renderer: (item: AlarmoAutomation & { area: string }) =>
            item.area == noArea
              ? this.config.master.enabled
                ? this.config.master.name
                : this.hass!.localize('state_attributes.climate.preset_mode.none')
              : computeAreaDisplay(item.area, this.areas, this.config).name,
        },
        modes: {
          title: localize('panels.actions.cards.new_notification.fields.mode.heading', this.hass.language),
          width: '20%',
          hide: this.narrow,
          text: true,
          sortable: true,
          sort: (item: AlarmoAutomation) => this.getModesLabel(item),
          search: (item: AlarmoAutomation) => this.getModesLabel(item),
          renderer: (item: AlarmoAutomation) => {
            const modes = item.triggers[0].modes?.length
              ? item.triggers[0].modes
              : getArmModeOptions(item.triggers[0].area, this.areas);
            return modes.map(e => localize(`common.modes_short.${e}`, this.hass!.language)).join(', ');
          },
        },
        target: {
          title: localize('panels.actions.cards.new_notification.fields.target.heading', this.hass.language),
          width: '20%',
          hide: this.narrow,
          text: true,
          sortable: true,
          sort: (item: AlarmoAutomation) => computeServiceDisplay(this.hass!, item.actions[0]).pop()?.name || '',
          search: (item: AlarmoAutomation) => computeServiceDisplay(this.hass!, item.actions[0]).pop()?.name || '',
          renderer: (item: AlarmoAutomation) => computeServiceDisplay(this.hass!, item.actions[0]).pop()?.name || '',
        },
        enabled: {
          title: localize('common.enabled', this.hass.language),
          width: '68px',
          align: 'center',
          renderer: (item: AlarmoAutomation) => html`
            <ha-switch
              ?checked=${item.enabled}
              @click=${(ev: Event) => ev.stopPropagation()}
              @change=${(ev: Event) => this.toggleEnable(ev, item.automation_id!)}
            ></ha-switch>
          `,
          sortable: true,
          sort: (item: AlarmoAutomation) => (item.enabled ? 1 : 0),
        },
      };

      const notificationData = this.automations
        .filter(e => e.type == EAutomationTypes.Notification)
        .map(e =>
          Object({
            ...e,
            id: e.automation_id,
            warning: !this.config.master.enabled && !this.getAreaForAutomation(e),
            area: this.getAreaForAutomation(e) || noArea,
            event: e.triggers[0].event,
            modes: e.triggers[0].modes?.length ? e.triggers[0].modes : getArmModeOptions(e.triggers[0].area, this.areas),
            target: computeServiceDisplay(this.hass!, e.actions[0]).pop()?.name || '',
            enabled_value: e.enabled ? 'enabled' : 'disabled',
          })
        );

      return html`
        <section class="list-page">
          <div class="list-page-header">
            <h1 class="list-page-title">${localize('panels.actions.cards.notifications.title', this.hass.language)}</h1>
            <p class="list-page-description">
              ${localize('panels.actions.cards.notifications.description', this.hass.language)}
            </p>
          </div>

          <div class="list-page-table">
            <alarmo-table
              .hass=${this.hass}
              ?selectable=${true}
              .columns=${columns}
              .data=${notificationData}
              .filters=${this.getTableFilterOptions()}
              @row-click=${(ev: CustomEvent) =>
                navigate(this, exportPath('notifications', { params: { edit_notification: ev.detail.id } }), true)}
            >
              ${localize('panels.actions.cards.notifications.table.no_items', this.hass.language)}
            </alarmo-table>
          </div>

          <ha-button slot="fab" class="list-page-fab" size="large" variant="brand" appearance="accent" @click=${this.addNotificationClick}>
            <ha-svg-icon slot="start" .path=${mdiPlus}></ha-svg-icon>
            ${localize('panels.actions.cards.notifications.actions.new_notification', this.hass.language)}
          </ha-button>
        </section>
      `;
    }
  }

  private getAreaForAutomation = (automation: AlarmoAutomation) => {
    if (!this.config) return;
    const areaOptions = getAreaOptions(this.areas, this.config);
    const area = automation.triggers[0].area;
    return isDefined(area) && areaOptions.includes(area) ? area : undefined;
  };

  private getAreaLabel(area: string) {
    return area == noArea
      ? this.config!.master.enabled
        ? this.config!.master.name
        : this.hass!.localize('state_attributes.climate.preset_mode.none')
      : computeAreaDisplay(area, this.areas, this.config!).name;
  }

  private getModesLabel(item: AlarmoAutomation) {
    const modes = item.triggers[0].modes?.length
      ? item.triggers[0].modes
      : getArmModeOptions(item.triggers[0].area, this.areas);
    return modes.map(e => localize(`common.modes_short.${e}`, this.hass!.language)).join(', ');
  }

  private toggleEnable(ev: Event, item_id: string) {
    saveAutomation(this.hass!, { automation_id: item_id, enabled: (ev.target as HTMLInputElement).checked })
      .catch(e => handleError(e, ev))
      .then();
  }

  private getTableFilterOptions() {
    if (!this.hass) return;
    let areaFilterOptions = Object.values(this.areas)
      .map(e =>
        Object({
          value: e.area_id,
          name: e.name,
          badge: (list: any[]) => list.filter(item => item.area == e.area_id).length,
        })
      )
      .sort(sortAlphabetically);

    if (Object.values(this.automations || []).filter(e => !this.getAreaForAutomation(e)).length)
      areaFilterOptions = [
        {
          value: noArea,
          name: this.config.master.enabled
            ? this.config.master.name
            : this.hass.localize('state_attributes.climate.preset_mode.none'),
          badge: (list: any[]) => list.filter(item => item.area == noArea).length,
        },
        ...areaFilterOptions,
      ];

    const filterConfig: TableFilterConfig = {
      area: {
        name: localize(
          'components.table.filter.item',
          this.hass.language,
          'name',
          localize('panels.actions.cards.new_action.fields.area.heading', this.hass.language)
        ),
        items: areaFilterOptions,
        value: this.selectedArea ? [this.selectedArea] : [],
      },
      event: {
        name: localize('components.table.filter.item', this.hass.language, 'name', localize('panels.actions.cards.new_notification.fields.event.heading', this.hass.language)),
        items: [...new Set((this.automations || []).filter(e => e.type == EAutomationTypes.Notification).map(e => e.triggers[0].event!))].map(event => ({
          value: event,
          name: computeEventDisplay(event, this.hass!)?.name || event,
          badge: (list: any[]) => list.filter(item => item.event == event).length,
        })),
        value: [],
      },
      modes: {
        name: localize('components.table.filter.item', this.hass.language, 'name', localize('panels.actions.cards.new_notification.fields.mode.heading', this.hass.language)),
        items: getArmModeOptions(undefined, this.areas).map(mode => ({
          value: mode,
          name: localize(`common.modes_short.${mode}`, this.hass!.language),
          badge: (list: any[]) => list.filter(item => item.modes?.includes(mode)).length,
        })),
        value: [],
      },
      target: {
        name: localize('components.table.filter.item', this.hass.language, 'name', localize('panels.actions.cards.new_notification.fields.target.heading', this.hass.language)),
        items: [...new Set((this.automations || []).filter(e => e.type == EAutomationTypes.Notification).map(e => computeServiceDisplay(this.hass!, e.actions[0]).pop()?.name || ''))]
          .filter(Boolean)
          .map(target => ({ value: target, name: target, badge: (list: any[]) => list.filter(item => item.target == target).length })),
        value: [],
      },
      enabled_value: {
        name: localize('components.table.filter.item', this.hass.language, 'name', localize('common.enabled', this.hass.language)),
        items: [
          { value: 'enabled', name: localize('common.enabled', this.hass.language), badge: (list: any[]) => list.filter(item => item.enabled_value == 'enabled').length },
          { value: 'disabled', name: localize('common.disabled', this.hass.language), badge: (list: any[]) => list.filter(item => item.enabled_value == 'disabled').length },
        ],
        value: [],
      },
    };
    return filterConfig;
  }

  addNotificationClick() {
    navigate(this, exportPath('notifications', 'new_notification'), true);
  }

  static styles = commonStyle;
}
