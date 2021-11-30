import { LitElement, html } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { fireEvent, HomeAssistant, navigate } from 'custom-card-helpers';
import { mdiClose } from '@mdi/js';
import { commonStyle } from '../../styles';
import { AlarmoSensor, EArmModes, Dictionary, AlarmoArea, SensorGroup } from '../../types';
import { fetchSensors, saveSensor, deleteSensor, fetchAreas, fetchSensorGroups } from '../../data/websockets';
import { localize } from '../../../localize/localize';
import { Unique, Without, handleError, showErrorDialog, prettyPrint, computeName } from '../../helpers';
import { HassEntity, UnsubscribeFunc } from 'home-assistant-js-websocket';
import { sensorConfigByType, getSensorTypeOptions } from '../../data/sensors';
import { EArmModeIcons, ESensorTypes } from '../../const';
import { Option } from '../../components/alarmo-select';
import { SubscribeMixin } from '../../subscribe-mixin';


import '../../dialogs/error-dialog';
import '../../dialogs/manage-sensor-groups-dialog';
import '../../components/alarmo-select';
@customElement('sensor-editor-card')
export class SensorEditorCard extends SubscribeMixin(LitElement) {

  @property()
  hass!: HomeAssistant;

  @property()
  narrow!: boolean;

  @property()
  item!: string;

  @property()
  data?: AlarmoSensor;

  @property()
  showBypassModes: boolean = false;

  areas!: Dictionary<AlarmoArea>;
  sensorGroups!: Dictionary<SensorGroup>;

  public hassSubscribe(): Promise<UnsubscribeFunc>[] {
    this._fetchData();
    return [this.hass!.connection.subscribeMessage(() => this._fetchData(), { type: 'alarmo_config_updated' })];
  }

  private async _fetchData(): Promise<void> {
    if (!this.hass) return;
    const areas = await fetchAreas(this.hass);
    this.areas = areas;

    const sensorGroups = await fetchSensorGroups(this.hass);
    this.sensorGroups = sensorGroups;

    const sensors = await fetchSensors(this.hass);

    this.data = Object.keys(sensors).includes(this.item) ? sensors[this.item] : undefined;
    if (this.data && !this.data?.area && Object.keys(areas).length == 1)
      this.data = { ...this.data, area: Object.keys(this.areas)[0] };
  }

  render() {
    if (!this.data) return html``;
    const stateObj = this.hass.states[this.data.entity_id] as HassEntity | undefined;
    return html`
      <ha-card>
        <div class="card-header">
          <div class="name">${localize('panels.sensors.cards.editor.title', this.hass.language)}</div>
          <ha-icon-button .path=${mdiClose} @click=${this.cancelClick}>
          </ha-icon-button>
        </div>
        <div class="card-content">
          ${localize('panels.sensors.cards.editor.description', this.hass.language, '{entity}', this.item)}
        </div>

        <settings-row .narrow=${this.narrow}>
          <span slot="heading">${localize('panels.sensors.cards.editor.fields.name.heading', this.hass.language)}</span>
          <span slot="description">${localize('panels.sensors.cards.editor.fields.name.description', this.hass.language)}</span>

          <div>
            <paper-input
              label="${localize('panels.sensors.cards.editor.fields.name.heading', this.hass.language)}"
              placeholder=${stateObj?.attributes.friendly_name || ''}
              value=${this.data.name}
              @change=${(ev: Event) => (this.data = { ...this.data!, name: (ev.target as HTMLInputElement).value })}
            >
            </paper-input>

            ${stateObj && this.data.name?.length && prettyPrint(computeName(stateObj)) != this.data.name
        ? html`
            <ha-alert
              .alertType=${"warning"}
            >
              This feature will be removed soon.<br>
              Please leave the field empty.
            </ha-alert>
            `: ''}
          </div>

        </settings-row>

        ${Object.keys(this.areas).length > 1
        ? html`
        <settings-row .narrow=${this.narrow}>
          <span slot="heading">${localize('panels.sensors.cards.editor.fields.area.heading', this.hass.language)}</span>
          <span slot="description">${localize('panels.sensors.cards.editor.fields.area.description', this.hass.language)}</span>

          <alarmo-select
            .items=${Object.values(this.areas).map(e => Object({ value: e.area_id, name: e.name }))}
            value=${this.data.area}
            label=${localize('panels.sensors.cards.editor.fields.area.heading', this.hass.language)}
            @value-changed=${(ev: Event) => (this.data = { ...this.data!, area: (ev.target as HTMLInputElement).value })}
          </alarmo-select>
        </settings-row>`
        : ''}

        <settings-row .narrow=${this.narrow} .large=${true}>
          <span slot="heading">${localize('panels.sensors.cards.editor.fields.device_type.heading', this.hass.language)}</span>
          <span slot="description">${localize('panels.sensors.cards.editor.fields.device_type.description', this.hass.language)}</span>

          <alarmo-select
            .hass=${this.hass}
            .items=${getSensorTypeOptions(this.hass)}
            label=${localize('panels.sensors.cards.editor.fields.device_type.heading', this.hass.language)}
            clearable=${true}
            icons=${true}
            value=${this.data['type']}
            @value-changed=${(ev: Event) => this.setType(((ev.target as HTMLInputElement).value || ESensorTypes.Other) as ESensorTypes)}
          >
          </alarmo-select>
        </settings-row>

        <settings-row .narrow=${this.narrow}>
          <span slot="heading">${localize('panels.sensors.cards.editor.fields.modes.heading', this.hass.language)}</span>
          <span slot="description">${localize('panels.sensors.cards.editor.fields.modes.description', this.hass.language)}</span>

          <div>
            ${this.modesByArea(this.data.area).map(
          el => html`
                <mwc-button
                  class="${this.data!.modes.includes(el) ? 'active' : ''}"
                  @click=${() => { this.setMode(el) }}
                >
                  <ha-icon icon="${EArmModeIcons[Object.entries(EArmModes).find(([, v]) => v == el)![0]]}"></ha-icon>
                  ${localize(`common.modes_short.${el}`, this.hass.language)}
                </mwc-button>
              `
        )}
          </div>
        </settings-row>

        <settings-row .narrow=${this.narrow}>
          <span slot="heading">${localize('panels.sensors.cards.editor.fields.group.heading', this.hass.language)}</span>
          <span slot="description">${localize('panels.sensors.cards.editor.fields.group.description', this.hass.language)}</span>

          <div>
           ${Object.keys(this.sensorGroups).length
        ? html`
            <alarmo-select
              .clearable=${true}
              .items=${this.getSensorGroups()}
              value=${this.data.group}
              label="${localize('panels.sensors.cards.editor.fields.group.heading', this.hass.language)}"
              @value-changed=${(ev: CustomEvent) => { this.data = { ...this.data!, group: ev.detail.value } }}
            >
            </alarmo-select>
            ` : ''}
            <mwc-button
              @click=${this.manageGroupsClick}
            >
              ${localize('panels.sensors.cards.editor.actions.setup_groups', this.hass.language)}
            </mwc-button>
          </div>

        </settings-row>

        <collapsible-section
          .narrow=${this.narrow}
          header=${localize('panels.sensors.cards.editor.actions.toggle_advanced', this.hass.language)}
        >
        ${!this.data.type || [ESensorTypes.Environmental, ESensorTypes.Other].includes(this.data.type)
        ? html`
          <settings-row .narrow=${this.narrow}>
            <span slot="heading">${localize('panels.sensors.cards.editor.fields.always_on.heading', this.hass.language)}</span>
            <span slot="description">${localize('panels.sensors.cards.editor.fields.always_on.description', this.hass.language)}</span>

            <ha-switch
              ?checked=${this.data.always_on}
              @change=${(ev: Event) => this._SetData({ always_on: (ev.target as HTMLInputElement).checked })}
            >
            </ha-switch>
          </settings-row>
        ` : ''}

        ${!this.data.type || [ESensorTypes.Window, ESensorTypes.Door, ESensorTypes.Motion, ESensorTypes.Other].includes(this.data.type)
        ? html`
          <settings-row .narrow=${this.narrow}>
            <span slot="heading">${localize('panels.sensors.cards.editor.fields.use_exit_delay.heading', this.hass.language)}</span>
            <span slot="description">${localize('panels.sensors.cards.editor.fields.use_exit_delay.description', this.hass.language)}</span>

            <ha-switch
              ?checked=${this.data.use_exit_delay}
              ?disabled=${this.data.always_on}
              @change=${(ev: Event) => this._SetData({ use_exit_delay: (ev.target as HTMLInputElement).checked })}
            >
            </ha-switch>
          </settings-row>

        ${(!this.data.type || [ESensorTypes.Motion, ESensorTypes.Other].includes(this.data.type)) && this.data.use_exit_delay
            ? html`
          <settings-row .narrow=${this.narrow} nested>
            <span slot="heading">${localize('panels.sensors.cards.editor.fields.allow_open.heading', this.hass.language)}</span>
            <span slot="description">${localize('panels.sensors.cards.editor.fields.allow_open.description', this.hass.language)}</span>

            <ha-switch
              ?checked=${this.data.allow_open}
              ?disabled=${this.data.always_on || this.data.arm_on_close}
              @change=${(ev: Event) => this._SetData({ allow_open: (ev.target as HTMLInputElement).checked })}
            >
            </ha-switch>
          </settings-row>
        ` : ''}


        ` : ''}

        ${!this.data.type || [ESensorTypes.Window, ESensorTypes.Door, ESensorTypes.Motion, ESensorTypes.Other].includes(this.data.type)
        ? html`
          <settings-row .narrow=${this.narrow}>
            <span slot="heading">${localize('panels.sensors.cards.editor.fields.use_entry_delay.heading', this.hass.language)}</span>
            <span slot="description">${localize('panels.sensors.cards.editor.fields.use_entry_delay.description', this.hass.language)}</span>

            <ha-switch
              ?checked=${this.data.use_entry_delay}
              ?disabled=${this.data.always_on}
              @change=${(ev: Event) => this._SetData({ use_entry_delay: (ev.target as HTMLInputElement).checked })}
            >
            </ha-switch>
          </settings-row>
        ` : ''}

        ${!this.data.type || [ESensorTypes.Door, ESensorTypes.Other].includes(this.data.type)
        ? html`
          <settings-row .narrow=${this.narrow}>
            <span slot="heading">${localize('panels.sensors.cards.editor.fields.arm_on_close.heading', this.hass.language)}</span>
            <span slot="description">${localize('panels.sensors.cards.editor.fields.arm_on_close.description', this.hass.language)}</span>

            <ha-switch
              ?checked=${this.data.arm_on_close}
              ?disabled=${this.data.always_on}
              @change=${(ev: Event) => this._SetData({ arm_on_close: (ev.target as HTMLInputElement).checked })}
            >
            </ha-switch>
          </settings-row>
        ` : ''}

        ${!this.data.type || [ESensorTypes.Window, ESensorTypes.Door, ESensorTypes.Other].includes(this.data.type)
        ? html`
          <settings-row .narrow=${this.narrow}>
            <span slot="heading">${localize('panels.sensors.cards.editor.fields.auto_bypass.heading', this.hass.language)}</span>
            <span slot="description">${localize('panels.sensors.cards.editor.fields.auto_bypass.description', this.hass.language)}</span>

            <ha-switch
              ?checked=${this.data.auto_bypass}
              ?disabled=${this.data.always_on}
              @change=${(ev: Event) => this._SetData({ auto_bypass: (ev.target as HTMLInputElement).checked })}
            >
            </ha-switch>
          </settings-row>

          ${this.data.auto_bypass
            ? html`
            <settings-row .narrow=${this.narrow} nested>
              <span slot="heading">${localize('panels.sensors.cards.editor.fields.auto_bypass.modes', this.hass.language)}</span>
              <div>
              ${this.modesByArea(this.data.area).map(
              el => html`
                <mwc-button
                  class="${this.data!.auto_bypass_modes.includes(el) && this.data!.modes.includes(el) ? 'active' : ''}"
                  ?disabled=${!this.data!.modes.includes(el)}
                  @click=${() => { this.setBypassMode(el) }}
                >
                  <ha-icon icon="${EArmModeIcons[Object.entries(EArmModes).find(([, v]) => v == el)![0]]}"></ha-icon>
                  ${localize(`common.modes_short.${el}`, this.hass.language)}
                </mwc-button>
                  `
            )}
              </div>
            </settings-row>
          ` : ''}
        ` : ''}

          <settings-row .narrow=${this.narrow}>
            <span slot="heading">${localize('panels.sensors.cards.editor.fields.trigger_unavailable.heading', this.hass.language)}</span>
            <span slot="description">${localize('panels.sensors.cards.editor.fields.trigger_unavailable.description', this.hass.language)}</span>

            <ha-switch
              ?checked=${this.data.trigger_unavailable}
              @change=${(ev: Event) => this._SetData({ trigger_unavailable: (ev.target as HTMLInputElement).checked })}
            >
            </ha-switch>
          </settings-row>
        </collapsible-section>

        <div class="card-actions">
          <mwc-button @click=${this.saveClick}>
            ${this.hass.localize('ui.common.save')}
          </mwc-button>

          <mwc-button class="warning" @click=${this.deleteClick}>
            ${localize('panels.sensors.cards.editor.actions.remove', this.hass.language)}
          </mwc-button>
        </div>
      </ha-card>
    `;
  }

  private modesByArea(area_id?: string): EArmModes[] {
    const modesPerArea: Dictionary<EArmModes[]> = Object.keys(this.areas).reduce(
      (obj, e) =>
        Object.assign(obj, {
          [e]: Object.entries(this.areas[e].modes)
            .filter(([, v]) => v.enabled)
            .map(([k]) => k),
        }),
      {}
    );

    return area_id ? modesPerArea[area_id] : Object.values(modesPerArea).reduce((a, b) => a.filter(i => b.includes(i)));
  }

  private _SetData(data: Partial<AlarmoSensor>) {
    if (!this.data) return;
    for (const [key, val] of Object.entries(data)) {
      switch (key) {
        case 'always_on':
          this.data = { ...this.data, always_on: val == true };
          if (val) this.data = { ...this.data, arm_on_close: false, use_exit_delay: false, use_entry_delay: false, allow_open: false, auto_bypass: false };
          break;
        case 'use_entry_delay':
          this.data = { ...this.data, use_entry_delay: val == true };
          break;
        case 'use_exit_delay':
          this.data = { ...this.data, use_exit_delay: val == true };
          if (val) this.data = { ...this.data, allow_open: false };
          break;
        case 'arm_on_close':
          this.data = { ...this.data, arm_on_close: val == true };
          if (val) this.data = { ...this.data, always_on: false, allow_open: false };
          break;
        case 'allow_open':
          this.data = { ...this.data, allow_open: val == true };
          if (val) this.data = { ...this.data, arm_on_close: false, always_on: false, use_exit_delay: true };
          break;
        case 'auto_bypass':
          this.data = { ...this.data, auto_bypass: val == true };
          if (val) this.data = { ...this.data, always_on: false };
          break;
        case 'trigger_unavailable':
          this.data = { ...this.data, trigger_unavailable: val == true };
          break;
      }
    }
  }

  private setMode(mode: EArmModes) {
    if (!this.data) return;
    this.data = {
      ...this.data,
      modes: this.data.modes.includes(mode)
        ? Without(this.data.modes, mode)
        : Unique(this.data.modes.concat([mode]))
    };
  };

  private setBypassMode(mode: EArmModes) {
    if (!this.data) return;
    this.data = {
      ...this.data,
      auto_bypass_modes: this.data.auto_bypass_modes.includes(mode)
        ? Without(this.data.auto_bypass_modes, mode)
        : Unique(this.data.auto_bypass_modes.concat([mode]))
    };
  };

  private setType(type: ESensorTypes) {
    if (!this.data) return;
    const settings = type != ESensorTypes.Other ? sensorConfigByType(this.modesByArea(this.data.area))[type] : {};

    this.data = {
      ...this.data,
      type: type,
      ...settings,
    };
  }

  private deleteClick(ev: Event) {
    deleteSensor(this.hass, this.item)
      .catch(e => handleError(e, ev))
      .then(() => {
        this.cancelClick();
      });
  }

  private saveClick(ev: Event) {
    if (!this.data) return;
    const errors: string[] = [];

    this.data = {
      ...this.data,
      auto_bypass_modes: this.data.auto_bypass_modes.filter(e => this.data!.modes.includes(e))
    };

    if (!this.data.area) errors.push(localize('panels.sensors.cards.editor.errors.no_area', this.hass.language));
    if (!this.data.modes.length && !this.data.always_on)
      errors.push(localize('panels.sensors.cards.editor.errors.no_modes', this.hass.language));
    if (this.data.auto_bypass && !this.data.auto_bypass_modes.length) errors.push(localize('panels.sensors.cards.editor.errors.no_auto_bypass_modes', this.hass.language));
    if (errors.length) {
      showErrorDialog(
        ev,
        html`
          ${localize('panels.sensors.cards.editor.errors.description', this.hass.language)}
          <ul>
            ${errors.map(e => html`<li>${e}</li>`)}
          </ul>
        `
      );
    } else {
      saveSensor(this.hass, { ...this.data })
        .catch(e => handleError(e, ev))
        .then(() => {
          this.cancelClick();
        });
    }
  }

  private cancelClick() {
    navigate(this, '/alarmo/sensors', true);
  }


  manageGroupsClick(ev: Event) {
    const element = ev.target as HTMLElement;
    fireEvent(element, 'show-dialog', {
      dialogTag: 'manage-sensor-groups-dialog',
      dialogImport: () => import('../../dialogs/manage-sensor-groups-dialog'),
      dialogParams: {},
    });
  }

  private getSensorGroups(): Option[] {
    return Object.keys(this.sensorGroups)
      .map(e => Object({
        value: e,
        name: this.sensorGroups[e].name,
      }))
  }

  static styles = commonStyle;
}
