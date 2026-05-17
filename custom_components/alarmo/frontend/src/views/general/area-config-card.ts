import { LitElement, html } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { mdiPencil, mdiPlus } from '@mdi/js';

import { prettyPrint, sortAlphabetically } from '../../helpers';
import { AlarmoConfig, Dictionary, AlarmoArea, AlarmoSensor, AlarmoAutomation, HomeAssistant } from '../../types';

import '../../components/alarmo-settings-row';
import '../../components/alarmo-table.ts';
import '../../dialogs/create-area-dialog';

import { commonStyle } from '../../styles';
import { localize } from '../../../localize/localize';
import { SubscribeMixin } from '../../subscribe-mixin';
import { UnsubscribeFunc } from 'home-assistant-js-websocket';
import { fetchAreas, fetchSensors, fetchAutomations } from '../../data/websockets';
import { TableData, TableColumn } from '../../components/alarmo-table';
import { exportPath } from '../../common/navigation';
import { fireEvent } from '../../fire_event';
import { modesByArea } from '../../common/modes';

@customElement('area-config-card')
export class AreaConfigCard extends SubscribeMixin(LitElement) {
  hass?: HomeAssistant;
  @property() narrow!: boolean;
  @property() path!: string[] | null;

  @property() config?: AlarmoConfig;
  @property() areas: Dictionary<AlarmoArea> = {};
  @property() sensors: Dictionary<AlarmoSensor> = {};
  @property() automations: Dictionary<AlarmoAutomation> = {};

  public hassSubscribe(): Promise<UnsubscribeFunc>[] {
    this._fetchData();
    return [this.hass!.connection.subscribeMessage(() => this._fetchData(), { type: 'alarmo_config_updated' })];
  }

  private async _fetchData(): Promise<void> {
    if (!this.hass) return;
    this.areas = await fetchAreas(this.hass);
    this.sensors = await fetchSensors(this.hass);
    this.automations = await fetchAutomations(this.hass);
  }

  render() {
    if (!this.hass) return html``;

    const areas = Object.values(this.areas);
    areas.sort(sortAlphabetically);

    const columns: Dictionary<TableColumn> = {
      actions: {
        width: '48px',
      },
      name: {
        title: this.hass.localize('ui.common.name'),
        width: '40%',
        grow: true,
        text: true,
        sortable: true,
        search: (item: TableData & { raw_name?: string }) => item.raw_name || '',
        sort: (item: TableData & { raw_name?: string }) => item.raw_name || '',
      },
      modes: {
        title: localize('panels.sensors.cards.sensors.table.arm_modes', this.hass.language),
        width: '25%',
        hide: this.narrow,
        text: true,
        sortable: true,
        search: (item: TableData & { raw_modes?: string }) => item.raw_modes || '',
        sort: (item: TableData & { raw_modes?: string }) => item.raw_modes || '',
      },
      remarks: {
        title: localize('panels.general.cards.areas.table.remarks', this.hass.language),
        width: '60%',
        hide: this.narrow,
        text: true,
      },
    };

    const data = Object.values(areas).map(item => {
      const sensors = Object.values(this.sensors).filter(e => e.area == item.area_id).length;
      const automations =
        Object.values(areas).length == 1
          ? Object.values(this.automations).filter(
            e => e.triggers?.map(e => e.area).includes(item.area_id) || !e.triggers?.map(e => e.area).length
          ).length
          : Object.values(this.automations).filter(e => e.triggers?.map(e => e.area).includes(item.area_id)).length;
      const summary_sensors = `<a href="${exportPath('sensors', { filter: { area: item.area_id } })}">${localize(
        'panels.general.cards.areas.table.summary_sensors',
        this.hass!.language,
        'number',
        sensors
      )}</a>`;
      const summary_automations = `<a href="${exportPath('actions', { filter: { area: item.area_id } })}">${localize(
        'panels.general.cards.areas.table.summary_automations',
        this.hass!.language,
        'number',
        automations
      )}</a>`;
      const output: TableData = {
        id: item.area_id,
        raw_name: item.name,
        actions: html`
          <ha-icon-button @click=${(ev: Event) => this.editClick(ev, item.area_id)} .path=${mdiPencil}></ha-icon-button>
        `,
        name: prettyPrint(item.name),
        raw_modes: modesByArea(item).map(mode => localize(`common.modes_short.${mode}`, this.hass!.language)).join(', '),
        modes: modesByArea(item).map(mode => localize(`common.modes_short.${mode}`, this.hass!.language)).join(', '),
        remarks: (unsafeHTML(
          localize(
            'panels.general.cards.areas.table.summary',
            this.hass!.language,
            'summary_sensors',
            summary_sensors,
            'summary_automations',
            summary_automations
          )
        ) as unknown) as string,
      };
      return output;
    });

    return html`
      <section class="list-page">
        <div class="list-page-header">
          <h1 class="list-page-title">${localize('panels.general.cards.areas.title', this.hass.language)}</h1>
          <p class="list-page-description">${localize('panels.general.cards.areas.description', this.hass.language)}</p>
        </div>

        <div class="list-page-table">
          <alarmo-table .hass=${this.hass} .columns=${columns} .data=${data}>
            ${localize('panels.general.cards.areas.no_items', this.hass.language)}
          </alarmo-table>
        </div>

        <ha-button slot="fab" class="list-page-fab" size="large" variant="brand" appearance="accent" @click=${this.addClick}>
          <ha-svg-icon slot="start" .path=${mdiPlus}></ha-svg-icon>
          ${localize('panels.general.cards.areas.actions.add', this.hass.language)}
        </ha-button>
      </section>
    `;
  }

  addClick(ev: Event) {
    const element = ev.target as HTMLElement;
    fireEvent(element, 'show-dialog', {
      dialogTag: 'create-area-dialog',
      dialogImport: () => import('../../dialogs/create-area-dialog'),
      dialogParams: {},
    });
  }

  editClick(ev: Event, area_id: string) {
    const element = ev.target as HTMLElement;
    fireEvent(element, 'show-dialog', {
      dialogTag: 'create-area-dialog',
      dialogImport: () => import('../../dialogs/create-area-dialog'),
      dialogParams: { area_id: area_id },
    });
  }

  static styles = commonStyle;
}
