import { LitElement, html, css, CSSResultGroup } from 'lit';
import { property, customElement, state } from 'lit/decorators.js';
import { HomeAssistant, fireEvent } from 'custom-card-helpers';
import { mdiClose } from '@mdi/js';
import { saveArea, deleteArea, fetchAreas, fetchSensors, fetchAutomations } from '../data/websockets';
import { AlarmoArea, Dictionary, AlarmoSensor, AlarmoAutomation } from '../types';
import { commonStyle } from '../styles';
import { localize } from '../../localize/localize';
import { UnsubscribeFunc } from 'home-assistant-js-websocket';
import { SubscribeMixin } from '../subscribe-mixin';
import { handleError } from '../helpers';

import './confirm-delete-dialog';

@customElement('create-area-dialog')
export class CreateAreaDialog extends SubscribeMixin(LitElement) {
  @property({ attribute: false }) public hass!: HomeAssistant;

  @state() private _params?: any;
  @property() areas: Dictionary<AlarmoArea> = {};
  @property() sensors: Dictionary<AlarmoSensor> = {};
  @property() automations: Dictionary<AlarmoAutomation> = {};

  @property() name = '';
  @property() area_id?: string;
  @property() selectedArea?: string;

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

  public async showDialog(params: any): Promise<void> {
    await this._fetchData();
    this._params = params;
    if (params.area_id) {
      this.area_id = params.area_id;
      this.name = this.areas![this.area_id!].name;
    }
    await this.updateComplete;
  }

  public async closeDialog() {
    this._params = undefined;
    this.area_id = undefined;
    this.name = '';
  }

  render() {
    if (!this._params) return html``;
    return html`
      <ha-dialog open .heading=${true} @closed=${this.closeDialog} @close-dialog=${this.closeDialog}>
        <div slot="heading">
          <ha-header-bar>
            <ha-icon-button slot="navigationIcon" dialogAction="cancel" .path=${mdiClose}></ha-icon-button>
            <span slot="title">
              ${this.area_id
                ? localize(
                    'panels.general.dialogs.edit_area.title',
                    this.hass.language,
                    '{area}',
                    this.areas[this.area_id!].name
                  )
                : localize('panels.general.dialogs.create_area.title', this.hass.language)}
            </span>
          </ha-header-bar>
        </div>
        <div class="wrapper">
          <ha-textfield
            label=${this.hass.localize('ui.components.area-picker.add_dialog.name')}
            @input=${(ev: Event) => (this.name = (ev.target as HTMLInputElement).value)}
            value="${this.name}"
          ></ha-textfield>
          ${this.area_id
            ? html`
                <span class="note">
                  ${localize('panels.general.dialogs.edit_area.name_warning', this.hass.language)}
                </span>
              `
            : ''}
          ${!this.area_id
            ? html`
                <alarmo-select
                  .items=${Object.values(this.areas).map(e => Object({ value: e.area_id, name: e.name }))}
                  value=${this.selectedArea}
                  label="${localize('panels.general.dialogs.create_area.fields.copy_from', this.hass.language)}"
                  clearable=${true}
                  @value-changed=${(ev: Event) => (this.selectedArea = (ev.target as HTMLInputElement).value)}
                ></alarmo-select>
              `
            : ''}
        </div>
        <mwc-button slot="primaryAction" @click=${this.saveClick}>
          ${this.hass.localize('ui.common.save')}
        </mwc-button>
        ${this.area_id
          ? html`
              <mwc-button
                slot="secondaryAction"
                @click=${this.deleteClick}
                class="warning"
                ?disabled=${Object.keys(this.areas!).length == 1}
              >
                ${this.hass.localize('ui.common.delete')}
              </mwc-button>
            `
          : ''}
      </ha-dialog>
    `;
  }

  private saveClick(ev: Event) {
    const name = this.name.trim();
    if (!name.length) return;

    let data: Partial<AlarmoArea> = {
      name: name,
    };
    if (this.area_id) data = { ...data, area_id: this.area_id };
    else if (this.selectedArea) data = { ...data, modes: { ...this.areas[this.selectedArea].modes } };

    saveArea(this.hass, data)
      .catch(e => handleError(e, ev))
      .then(() => {
        this.closeDialog();
      });
  }

  private async deleteClick(ev: Event) {
    if (!this.area_id) return;
    const sensors = Object.values(this.sensors).filter(e => e.area == this.area_id).length;
    const automations = Object.values(this.automations).filter(e => e.triggers?.map(e => e.area).includes(this.area_id))
      .length;
    let result = false;
    if (sensors || automations) {
      result = await new Promise(resolve => {
        fireEvent(ev.target as HTMLElement, 'show-dialog', {
          dialogTag: 'confirm-delete-dialog',
          dialogImport: () => import('./confirm-delete-dialog'),
          dialogParams: {
            title: localize('panels.general.dialogs.remove_area.title', this.hass.language),
            description: localize(
              'panels.general.dialogs.remove_area.description',
              this.hass.language,
              'sensors',
              String(sensors),
              'automations',
              String(automations)
            ),
            cancel: () => resolve(false),
            confirm: () => resolve(true),
          },
        });
      });
    } else result = true;

    if (result) {
      deleteArea(this.hass, this.area_id)
        .catch(e => handleError(e, ev))
        .then(() => {
          this.closeDialog();
        });
    }
  }

  static get styles(): CSSResultGroup {
    return css`
      ${commonStyle}
      div.wrapper {
        color: var(--primary-text-color);
      }
      span.note {
        color: var(--secondary-text-color);
      }
      ha-textfield {
        display: block;
      }
      alarmo-select {
        margin-top: 10px;
      }
    `;
  }
}
