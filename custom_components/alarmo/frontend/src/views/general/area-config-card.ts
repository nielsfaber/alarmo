import { LitElement, html } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { HomeAssistant, fireEvent } from 'custom-card-helpers';
import { mdiPencil } from '@mdi/js';

import { prettyPrint, sortAlphabetically } from '../../helpers';
import { AlarmoConfig, Dictionary, AlarmoArea, AlarmoSensor, AlarmoAutomation } from '../../types';

import '../../components/settings-row.ts';
import '../../components/alarmo-table.ts';
import '../../dialogs/create-area-dialog';

import { commonStyle } from '../../styles';
import { localize } from '../../../localize/localize';
import { SubscribeMixin } from '../../subscribe-mixin';
import { UnsubscribeFunc } from 'home-assistant-js-websocket';
import { fetchAreas, fetchSensors, fetchAutomations } from '../../data/websockets';
import { TableData, TableColumn } from '../../components/alarmo-table';

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
        title: this.hass.localize('ui.components.area-picker.add_dialog.name'),
        width: '40%',
        grow: true,
        text: true,
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
          ? Object.values(this.automations).filter(e => e.triggers?.map(e => e.area).includes(item.area_id) || !e.triggers?.map(e => e.area).length).length
          : Object.values(this.automations).filter(e => e.triggers?.map(e => e.area).includes(item.area_id)).length;
      const summary_sensors = `<a href="/alarmo/sensors/filter/${item.area_id}">${localize(
        'panels.general.cards.areas.table.summary_sensors',
        this.hass!.language,
        '{number}',
        String(sensors)
      )}</a>`;
      const summary_automations = `<a href="/alarmo/actions/filter/${item.area_id}">${localize(
        'panels.general.cards.areas.table.summary_automations',
        this.hass!.language,
        '{number}',
        String(automations)
      )}</a>`;
      const output: TableData = {
        id: item.area_id,
        actions: html`
          <ha-icon-button @click=${(ev: Event) => this.editClick(ev, item.area_id)} .path=${mdiPencil}>
          </ha-icon-button>
        `,
        name: prettyPrint(item.name),
        remarks: (unsafeHTML(
          localize(
            'panels.general.cards.areas.table.summary',
            this.hass!.language,
            ['{summary_sensors}', '{summary_automations}'],
            [summary_sensors, summary_automations]
          )
        ) as unknown) as string,
      };
      return output;
    });

    return html`
      <ha-card header="${localize('panels.general.cards.areas.title', this.hass.language)}">
        <div class="card-content">
          ${localize('panels.general.cards.areas.description', this.hass.language)}
        </div>

        <alarmo-table .columns=${columns} .data=${data}>
          ${localize('panels.general.cards.areas.no_items', this.hass.language)}
        </alarmo-table>
        <div class="card-actions">
          <mwc-button @click=${this.addClick}>
            ${localize('panels.general.cards.areas.actions.add', this.hass.language)}
          </mwc-button>
        </div>
      </ha-card>
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
