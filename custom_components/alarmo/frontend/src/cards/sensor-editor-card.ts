import { LitElement, html, customElement, property } from 'lit-element';
import { HomeAssistant, navigate } from 'custom-card-helpers';
import { commonStyle } from '../styles';
import { AlarmoSensor, EArmModes, Dictionary, AlarmoArea } from '../types';
import { fetchSensors, saveSensor, deleteSensor, fetchAreas } from '../data/websockets';
import { localize } from '../../localize/localize';
import { Unique, Without, handleError, showErrorDialog } from '../helpers';

import '../dialogs/error-dialog';
import '../components/alarmo-select';
import { HassEntity } from 'home-assistant-js-websocket';
import { sensorConfigByType } from '../data/sensors';
import { EArmModeIcons, ESensorTypes, ESensorIcons } from '../const';

@customElement('sensor-editor-card')
export class SensorEditorCard extends LitElement {
  @property() hass!: HomeAssistant;
  @property() narrow!: boolean;

  @property() item!: string;
  @property() data!: AlarmoSensor;

  areas!: Dictionary<AlarmoArea>;

  async firstUpdated() {
    const areas = await fetchAreas(this.hass);
    this.areas = areas;
    const sensors = await fetchSensors(this.hass);
    this.data = sensors[this.item];
    if (!this.data.area && Object.keys(areas).length == 1)
      this.data = { ...this.data, area: Object.keys(this.areas)[0] };
  }

  render() {
    if (!this.data) return html``;
    const stateObj = this.hass.states[this.data.entity_id] as HassEntity | undefined;
    return html`
      <ha-card>
        <div class="card-header">
          <div class="name">
            ${localize('panels.sensors.cards.editor.title', this.hass.language)}
          </div>
          <ha-icon-button icon="hass:close" @click=${this.cancelClick}> </ha-icon-button>
        </div>
        <div class="card-content">
          ${localize('panels.sensors.cards.editor.description', this.hass.language, '{entity}', this.item)}
        </div>

        <settings-row .narrow=${this.narrow}>
          <span slot="heading">${localize('panels.sensors.cards.editor.fields.name.heading', this.hass.language)}</span>
          <span slot="description"
            >${localize('panels.sensors.cards.editor.fields.name.description', this.hass.language)}</span
          >

          <paper-input
            label="${localize('panels.sensors.cards.editor.fields.name.heading', this.hass.language)}"
            placeholder=${stateObj?.attributes.friendly_name || ''}
            value=${this.data.name}
            @change=${(ev: Event) => (this.data = { ...this.data, name: (ev.target as HTMLInputElement).value })}
          >
          </paper-input>
        </settings-row>

        ${Object.keys(this.areas).length > 1
          ? html`
        <settings-row .narrow=${this.narrow}>
          <span slot="heading">${localize('panels.sensors.cards.editor.fields.area.heading', this.hass.language)}</span>
          <span slot="description">${localize(
            'panels.sensors.cards.editor.fields.area.description',
            this.hass.language
          )}</span>

          <alarmo-select
            .items=${Object.values(this.areas).map(e => Object({ value: e.area_id, name: e.name }))}
            value=${this.data.area}
            label=${localize('panels.sensors.cards.editor.fields.area.heading', this.hass.language)}
            @value-changed=${(ev: Event) => (this.data = { ...this.data, area: (ev.target as HTMLInputElement).value })}
          </alarmo-select>
        </settings-row>`
          : ''}

        <settings-row .narrow=${this.narrow} .large=${true}>
          <span slot="heading"
            >${localize('panels.sensors.cards.editor.fields.device_type.heading', this.hass.language)}</span
          >
          <span slot="description"
            >${localize('panels.sensors.cards.editor.fields.device_type.description', this.hass.language)}</span
          >

          <alarmo-select
            .hass=${this.hass}
            .items=${Object.entries(ESensorTypes)
              .filter(([, e]) => e != ESensorTypes.Other)
              .map(([k, v]) =>
                Object({
                  value: v,
                  name: localize(`panels.sensors.cards.editor.fields.device_type.choose.${v}.name`, this.hass.language),
                  description: localize(
                    `panels.sensors.cards.editor.fields.device_type.choose.${v}.description`,
                    this.hass.language
                  ),
                  icon: ESensorIcons[k],
                })
              )}
            label=${localize('panels.sensors.cards.editor.fields.device_type.heading', this.hass.language)}
            clearable=${true}
            icons=${true}
            value=${this.data['type']}
            @value-changed=${(ev: Event) =>
              this.setType(((ev.target as HTMLInputElement).value || ESensorTypes.Other) as ESensorTypes)}
          >
          </alarmo-select>
        </settings-row>

        <settings-row .narrow=${this.narrow}>
          <span slot="heading"
            >${localize('panels.sensors.cards.editor.fields.modes.heading', this.hass.language)}</span
          >
          <span slot="description"
            >${localize('panels.sensors.cards.editor.fields.modes.description', this.hass.language)}</span
          >

          <div>
            ${this.modesByArea(this.data.area).map(
              el => html`
                <mwc-button
                  class="${this.data.modes.includes(el) ? 'active' : ''}"
                  @click=${() => {
                    this.data = {
                      ...this.data,
                      modes: this.data.modes.includes(el)
                        ? Without(this.data.modes, el)
                        : Unique(this.data.modes.concat([el])),
                    };
                  }}
                >
                  <ha-icon icon="${EArmModeIcons[Object.entries(EArmModes).find(([, v]) => v == el)![0]]}"></ha-icon>
                  ${localize(`common.modes_short.${el}`, this.hass.language)}
                </mwc-button>
              `
            )}
          </div>
        </settings-row>

        <collapsible-section
          .narrow=${this.narrow}
          header=${localize('panels.sensors.cards.editor.actions.toggle_advanced', this.hass.language)}
        >
          ${!this.data.type || [ESensorTypes.Environmental, ESensorTypes.Other].includes(this.data.type)
            ? html`
                <settings-row .narrow=${this.narrow}>
                  <span slot="heading"
                    >${localize('panels.sensors.cards.editor.fields.always_on.heading', this.hass.language)}</span
                  >
                  <span slot="description"
                    >${localize('panels.sensors.cards.editor.fields.always_on.description', this.hass.language)}</span
                  >

                  <ha-switch
                    ?checked=${this.data.always_on}
                    @change=${(ev: Event) =>
                      (this.data = (ev.target as HTMLInputElement).checked
                        ? { ...this.data, always_on: true, arm_on_close: false, immediate: true, allow_open: false, auto_bypass: false }
                        : { ...this.data, always_on: false })}
                  >
                  </ha-switch>
                </settings-row>
              `
            : ''}
          ${!this.data.type || [ESensorTypes.Door, ESensorTypes.Other].includes(this.data.type)
            ? html`
                <settings-row .narrow=${this.narrow}>
                  <span slot="heading"
                    >${localize('panels.sensors.cards.editor.fields.arm_on_close.heading', this.hass.language)}</span
                  >
                  <span slot="description"
                    >${localize(
                      'panels.sensors.cards.editor.fields.arm_on_close.description',
                      this.hass.language
                    )}</span
                  >

                  <ha-switch
                    ?checked=${this.data.arm_on_close}
                    ?disabled=${this.data.always_on}
                    @change=${(ev: Event) =>
                      (this.data = (ev.target as HTMLInputElement).checked
                        ? { ...this.data, arm_on_close: true, allow_open: false, immediate: false, always_on: false }
                        : { ...this.data, arm_on_close: false })}
                  >
                  </ha-switch>
                </settings-row>
              `
            : ''}
          ${!this.data.type ||
          [
            ESensorTypes.Window,
            ESensorTypes.Door,
            ESensorTypes.Motion,
            ESensorTypes.Tamper,
            ESensorTypes.Other,
          ].includes(this.data.type)
            ? html`
                <settings-row .narrow=${this.narrow}>
                  <span slot="heading"
                    >${localize('panels.sensors.cards.editor.fields.immediate.heading', this.hass.language)}</span
                  >
                  <span slot="description"
                    >${localize('panels.sensors.cards.editor.fields.immediate.description', this.hass.language)}</span
                  >

                  <ha-switch
                    ?checked=${this.data.immediate}
                    ?disabled=${this.data.always_on || this.data.arm_on_close}
                    @change=${(ev: Event) =>
                      (this.data = (ev.target as HTMLInputElement).checked
                        ? { ...this.data, immediate: true, arm_on_close: false, always_on: false }
                        : { ...this.data, immediate: false })}
                  >
                  </ha-switch>
                </settings-row>
              `
            : ''}
          ${!this.data.type || [ESensorTypes.Motion, ESensorTypes.Other].includes(this.data.type)
            ? html`
                <settings-row .narrow=${this.narrow}>
                  <span slot="heading"
                    >${localize('panels.sensors.cards.editor.fields.allow_open.heading', this.hass.language)}</span
                  >
                  <span slot="description"
                    >${localize('panels.sensors.cards.editor.fields.allow_open.description', this.hass.language)}</span
                  >

                  <ha-switch
                    ?checked=${this.data.allow_open}
                    ?disabled=${this.data.always_on || this.data.arm_on_close}
                    @change=${(ev: Event) =>
                      (this.data = (ev.target as HTMLInputElement).checked
                        ? { ...this.data, allow_open: true, arm_on_close: false, always_on: false }
                        : { ...this.data, allow_open: false })}
                  >
                  </ha-switch>
                </settings-row>
              `
            : ''}

            ${!this.data.type || [ESensorTypes.Window, ESensorTypes.Other].includes(this.data.type)
              ? html`
                  <settings-row .narrow=${this.narrow}>
                    <span slot="heading"
                      >${localize('panels.sensors.cards.editor.fields.auto_bypass.heading', this.hass.language)}</span
                    >
                    <span slot="description"
                      >${localize('panels.sensors.cards.editor.fields.auto_bypass.description', this.hass.language)}</span
                    >
  
                    <ha-switch
                      ?checked=${this.data.auto_bypass}
                      ?disabled=${this.data.always_on}
                      @change=${(ev: Event) =>
                        (this.data = (ev.target as HTMLInputElement).checked
                          ? { ...this.data, auto_bypass: true, always_on: false }
                          : { ...this.data, auto_bypass: false })}
                    >
                    </ha-switch>
                  </settings-row>
                `
              : ''}

          <settings-row .narrow=${this.narrow}>
            <span slot="heading"
              >${localize('panels.sensors.cards.editor.fields.trigger_unavailable.heading', this.hass.language)}</span
            >
            <span slot="description"
              >${localize(
                'panels.sensors.cards.editor.fields.trigger_unavailable.description',
                this.hass.language
              )}</span
            >

            <ha-switch
              ?checked=${this.data.trigger_unavailable}
              @change=${(ev: Event) =>
                (this.data = { ...this.data, trigger_unavailable: (ev.target as HTMLInputElement).checked })}
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

  private setType(type: ESensorTypes) {
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
    const errors: string[] = [];
    if (!this.data.area) errors.push(localize('panels.sensors.cards.editor.errors.no_area', this.hass.language));
    if (!this.data.modes.length && !this.data.always_on)
      errors.push(localize('panels.sensors.cards.editor.errors.no_modes', this.hass.language));
    if (errors.length) {
      showErrorDialog(
        ev,
        html`
          ${localize('panels.sensors.cards.editor.errors.description', this.hass.language)}
          <ul>
            ${errors.map(
              e =>
                html`
                  <li>${e}</li>
                `
            )}
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

  static styles = commonStyle;
}
