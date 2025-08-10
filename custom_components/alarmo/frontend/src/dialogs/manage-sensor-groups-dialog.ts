import { LitElement, html, css, CSSResultGroup } from 'lit';
import { property, customElement, state } from 'lit/decorators.js';
import { mdiClose, mdiChevronRight } from '@mdi/js';
import { fetchSensors, fetchSensorGroups } from '../data/websockets';
import { Dictionary, AlarmoSensor, SensorGroup, HomeAssistant } from '../types';
import { dialogStyle } from '../styles';
import { UnsubscribeFunc } from 'home-assistant-js-websocket';
import { SubscribeMixin } from '../subscribe-mixin';
import { localize } from '../../localize/localize';
import { fireEvent } from '../fire_event';

import './create-sensor-group-dialog';

@customElement('manage-sensor-groups-dialog')
export class ManageSensorGroupsDialog extends SubscribeMixin(LitElement) {
  @property({ attribute: false })
  public hass!: HomeAssistant;

  @state()
  private _params?: any;

  @property()
  sensorGroups: Dictionary<SensorGroup> = {};

  @property()
  sensors: Dictionary<AlarmoSensor> = {};

  public hassSubscribe(): Promise<UnsubscribeFunc>[] {
    this._fetchData();
    return [this.hass!.connection.subscribeMessage(() => this._fetchData(), { type: 'alarmo_config_updated' })];
  }

  private async _fetchData(): Promise<void> {
    if (!this.hass) return;
    this.sensorGroups = await fetchSensorGroups(this.hass);
    this.sensors = await fetchSensors(this.hass);
  }

  public async showDialog(params: any): Promise<void> {
    await this._fetchData();
    this._params = params;
    await this.updateComplete;
  }

  public async closeDialog() {
    this._params = undefined;
  }

  render() {
    if (!this._params) return html``;
    return html`
      <ha-dialog open .heading=${true} @closed=${this.closeDialog} @close-dialog=${this.closeDialog}>
        <ha-dialog-header slot="heading">
          <ha-icon-button slot="navigationIcon" dialogAction="close" .path=${mdiClose}>
          </ha-icon-button>
          <span slot="title">${localize('panels.sensors.dialogs.manage_groups.title', this.hass.language)}</span>
        </ha-dialog-header>
        <div class="wrapper">
          <div class="description">
            ${localize('panels.sensors.dialogs.manage_groups.description', this.hass.language)}
          </div>
          <div class="container">
            ${Object.keys(this.sensorGroups).length
        ? Object.values(this.sensorGroups).map(e => this.renderGroup(e))
        : localize('panels.sensors.dialogs.manage_groups.no_items', this.hass.language)}
          </div>
        </div>
        <ha-button appearance="plain" slot="secondaryAction" @click=${this.createGroupClick}>
          <ha-icon icon="hass:plus"></ha-icon>
          ${localize('panels.sensors.dialogs.manage_groups.actions.new_group', this.hass.language)}
        </ha-button>
      </ha-dialog>
    `;
  }

  renderGroup(item: SensorGroup) {
    return html`
    <ha-card
      outlined
      @click=${(ev: Event) => this.editGroupClick(ev, item.group_id!)}
    >
      <ha-icon icon="hass:folder-outline"></ha-icon>
      <div>
        <span class="name">${item.name}</span>
        <span class="description">${localize(
      'panels.general.cards.areas.table.summary_sensors',
      this.hass!.language,
      '{number}',
      String(item.entities.length)
    )}
      </div>
      <ha-icon-button .path=${mdiChevronRight}>
      </ha-icon-button>
    </ha-card>
    `;
  }

  createGroupClick(ev: Event) {
    const element = ev.target as HTMLElement;
    fireEvent(element, 'show-dialog', {
      dialogTag: 'create-sensor-group-dialog',
      dialogImport: () => import('./create-sensor-group-dialog'),
      dialogParams: {},
    });
  }

  editGroupClick(ev: Event, group_id: string) {
    const element = ev.target as HTMLElement;
    fireEvent(element, 'show-dialog', {
      dialogTag: 'create-sensor-group-dialog',
      dialogImport: () => import('./create-sensor-group-dialog'),
      dialogParams: { group_id: group_id },
    });
  }

  static get styles(): CSSResultGroup {
    return css`
      ${dialogStyle}

      div.wrapper {
        color: var(--primary-text-color);
      }
      div.container {
        display: flex;
        flex-wrap: wrap;
      }
      ha-card {
        width: 100%;
        text-align: center;
        margin: 4px;
        box-sizing: border-box;
        padding: 8px;
        color: var(--primary-text-color);
        font-size: 16px;
        cursor: pointer;
        display: flex;
        flex-direction: row;
      }
      ha-card:hover {
        background: rgba(var(--rgb-secondary-text-color), 0.1);
      }
      ha-card ha-icon {
        --mdc-icon-size: 24px;
        display: flex;
        flex: 0 0 40px;
        margin: 0px 10px;
        align-items: center;
        color: var(--state-icon-color);
      }
      ha-card ha-icon-button {
        --mdc-icon-size: 24px;
        display: flex;
        flex: 0 0 40px;
        margin: 0px 10px;
        align-items: center;
      }
      ha-card div {
        display: flex;
        flex-wrap: wrap;
        flex: 1;
      }
      ha-card span {
        display: flex;
        flex: 0 0 100%;
      }
      ha-card span.description {
        color: var(--secondary-text-color);
      }
      ha-button ha-icon {
        padding-right: 11px;
      }
    `;
  }
}
