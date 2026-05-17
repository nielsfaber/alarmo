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

import './automation-editor-card.ts';
import '../../components/alarmo-settings-row';

import { EAutomationTypes } from '../../const';
import { getAreaOptions, computeAreaDisplay, computeEventDisplay, getArmModeOptions } from '../../data/actions';
import { exportPath, Path } from '../../common/navigation';
import { mdiPlus } from '@mdi/js';

const noArea = 'no_area';

@customElement('alarm-view-actions')
export class AlarmViewActions extends SubscribeMixin(LitElement) {
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

    if (this.path.subpage == 'new_action') {
      return html`
        <automation-editor-card .hass=${this.hass} .narrow=${this.narrow} returnPage="actions"></automation-editor-card>
      `;
    } else if (this.path.params.edit_action) {
      const config = this.automations.find(
        e => e.automation_id == this.path.params.edit_action && e.type == EAutomationTypes.Action
      );
      return html`
        <automation-editor-card
          .hass=${this.hass}
          .narrow=${this.narrow}
          .item=${config}
          returnPage="actions"
        ></automation-editor-card>
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
                  <ha-icon icon="hass:flash"  class="${!item.enabled ? 'disabled' : ''}"></ha-icon>
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
        },
        event: {
          title: localize('panels.actions.cards.new_action.fields.event.heading', this.hass.language),
          width: '18%',
          hide: this.narrow,
          text: true,
          renderer: (item: AlarmoAutomation) => computeEventDisplay(item.triggers[0].event!, this.hass!)?.name || '',
        },
        area: {
          title: localize('panels.actions.cards.new_action.fields.area.heading', this.hass.language),
          width: '18%',
          hide: this.narrow,
          text: true,
          renderer: (item: AlarmoAutomation & { area: string }) =>
            item.area == noArea
              ? this.config.master.enabled
                ? this.config.master.name
                : this.hass!.localize('state_attributes.climate.preset_mode.none')
              : computeAreaDisplay(item.area, this.areas, this.config).name,
        },
        modes: {
          title: localize('panels.actions.cards.new_action.fields.mode.heading', this.hass.language),
          width: '22%',
          hide: this.narrow,
          text: true,
          renderer: (item: AlarmoAutomation) => {
            const modes = item.triggers[0].modes?.length
              ? item.triggers[0].modes
              : getArmModeOptions(item.triggers[0].area, this.areas);
            return modes.map(e => localize(`common.modes_short.${e}`, this.hass!.language)).join(', ');
          },
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
        },
      };

      const automationData = this.automations
        .filter(e => e.type == EAutomationTypes.Action)
        .map(e =>
          Object({
            ...e,
            id: e.automation_id,
            warning: !this.config.master.enabled && !this.getAreaForAutomation(e),
            area: this.getAreaForAutomation(e) || noArea,
          })
        );

      return html`
        <section class="list-page">
          <div class="list-page-header">
            <h1 class="list-page-title">${localize('panels.actions.title', this.hass.language)}</h1>
            <p class="list-page-description">${localize('panels.actions.cards.actions.description', this.hass.language)}</p>
          </div>

          <div class="list-page-table">
            <alarmo-table
              .hass=${this.hass}
              ?selectable=${true}
              .columns=${columns}
              .data=${automationData}
              .filters=${this.getTableFilterOptions()}
              @row-click=${(ev: CustomEvent) =>
                navigate(this, exportPath('actions', { params: { edit_action: ev.detail.id } }), true)}
            >
              ${localize('panels.actions.cards.actions.table.no_items', this.hass.language)}
            </alarmo-table>
          </div>

          <ha-button slot="fab" class="list-page-fab" size="large" variant="brand" appearance="accent" @click=${this.addActionClick}>
            <ha-svg-icon slot="start" .path=${mdiPlus}></ha-svg-icon>
            ${localize('panels.actions.cards.actions.actions.new_action', this.hass.language)}
          </ha-button>
        </section>
      `;
    }
  }

  private getAreaForAutomation = (automation: AlarmoAutomation) => {
    if (!this.config) return;
    const areaOptions = getAreaOptions(this.areas, this.config);
    let area = automation.triggers[0].area;
    return isDefined(area) && areaOptions.includes(area) ? area : undefined;
  };

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
    };
    return filterConfig;
  }

  addActionClick() {
    navigate(this, exportPath('actions', 'new_action'), true);
  }

  static styles = commonStyle;
}
