import { LitElement, html, customElement, property } from 'lit-element';
import { HomeAssistant, navigate } from 'custom-card-helpers';
import { commonStyle } from '../styles';
import { AlarmoSensor, AlarmoConfig, EArmModes, ESensorType } from '../types';
import { fetchConfig, fetchSensors, saveSensor, deleteSensor } from '../data/websockets';
import { localize } from '../../localize/localize';
import { Unique, Without, handleError } from '../helpers';

import '../dialogs/error-dialog';
import '../components/alarmo-select';
import { HassEntity } from 'home-assistant-js-websocket';
import { sensorConfigByType } from '../data/sensors';

@customElement('sensor-editor-card')
export class sensorEditorCard extends LitElement {
  @property() hass!: HomeAssistant;
  @property() narrow!: boolean;

  @property() item!: string;
  @property() data!: AlarmoSensor;

  config?: AlarmoConfig;

  async firstUpdated() {

    const config = await fetchConfig(this.hass);
    this.config = config;
    const sensors = await fetchSensors(this.hass);
    this.data = sensors[this.item];
  }

  render() {
    if (!this.data) return html``;
    const stateObj = this.hass.states[this.data.entity_id] as HassEntity | undefined;
    return html`
        <ha-card
        >
          <div class="card-header">
            <div class="name">
              ${localize("panels.sensors.cards.editor.title", this.hass.language)}
            </div>
            <ha-icon-button
              icon="hass:close"
              @click=${this.cancelClick}
            >
            </ha-icon-button>
          </div>
          <div class="card-content">
              ${localize("panels.sensors.cards.editor.description", this.hass.language, "{entity}", this.item)}
          </div>

        <settings-row .narrow=${this.narrow}>
          <span slot="heading">${localize("panels.sensors.cards.editor.fields.name.heading", this.hass.language)}</span>
          <span slot="description">${localize("panels.sensors.cards.editor.fields.name.description", this.hass.language)}</span>

          <paper-input
            label="${localize("panels.sensors.cards.editor.fields.name.heading", this.hass.language)}"
            placeholder=${stateObj?.attributes.friendly_name || ""}
            value=${this.data.name}
            @change=${(ev: Event) => this.data = { ...this.data, name: (ev.target as HTMLInputElement).value }}
          >
          </paper-input>

        </settings-row>

        
        <settings-row .narrow=${this.narrow}  .large=${true}>
          <span slot="heading">${localize("panels.sensors.cards.editor.fields.device_type.heading", this.hass.language)}</span>
          <span slot="description">${localize("panels.sensors.cards.editor.fields.device_type.description", this.hass.language)}</span>

          <alarmo-select
            .hass=${this.hass}
            .items=${[
        {
          value: "door",
          name: localize("panels.sensors.cards.editor.fields.device_type.choose.door.name", this.hass.language),
          description: localize("panels.sensors.cards.editor.fields.device_type.choose.door.description", this.hass.language),
          icon: "hass:door-closed"
        },
        {
          value: "window",
          name: localize("panels.sensors.cards.editor.fields.device_type.choose.window.name", this.hass.language),
          description: localize("panels.sensors.cards.editor.fields.device_type.choose.window.description", this.hass.language),
          icon: "hass:window-closed"
        },
        {
          value: "motion",
          name: localize("panels.sensors.cards.editor.fields.device_type.choose.motion.name", this.hass.language),
          description: localize("panels.sensors.cards.editor.fields.device_type.choose.motion.description", this.hass.language),
          icon: "hass:motion-sensor"
        },
        {
          value: "tamper",
          name: localize("panels.sensors.cards.editor.fields.device_type.choose.tamper.name", this.hass.language),
          description: localize("panels.sensors.cards.editor.fields.device_type.choose.tamper.description", this.hass.language),
          icon: "hass:vibrate"
        },
        {
          value: "environmental",
          name: localize("panels.sensors.cards.editor.fields.device_type.choose.environmental.name", this.hass.language),
          description: localize("panels.sensors.cards.editor.fields.device_type.choose.environmental.description", this.hass.language),
          icon: "hass:fire"
        }
      ]}
            label=${localize("panels.sensors.cards.editor.fields.device_type.heading", this.hass.language)}
            value=${this.data["type"]}
            @value-changed=${(ev: Event) => this.setType(((ev.target as HTMLInputElement).value || ESensorType.Other) as ESensorType)}
          >
          </alarmo-select>
        </settings-row>
        
        <settings-row .narrow=${this.narrow}>
          <span slot="heading">${localize("panels.sensors.cards.editor.fields.modes.heading", this.hass.language)}</span>
          <span slot="description">${localize("panels.sensors.cards.editor.fields.modes.description", this.hass.language)}</span>
          
          <div style="display: flex; flex-direction: column; padding: 10px 0px">
          ${Object.values(EArmModes).filter(e => Object.keys(this.config!.modes).includes(e) && this.config!.modes[e].enabled).map(e =>
        html`
            <mwc-button
              class="${this.data.modes.includes(e) ? "success" : "warning"}"
              @click=${() => {
            this.data = {
              ...this.data,
              modes: this.data.modes.includes(e)
                ? Without(this.data.modes, e)
                : Unique(this.data.modes.concat([e]))
            };
          }}
            >
              <ha-icon icon="${this.data.modes.includes(e) ? "hass:check" : "hass:close"}"></ha-icon>
              ${localize(`common.modes_long.${e}`, this.hass.language)}
            </mwc-button>
          `)}
          </div>
        </settings-row>

        <collapsible-section
           .narrow=${this.narrow}
          header=${localize("panels.sensors.cards.editor.actions.toggle_advanced", this.hass.language)}
        >
      ${!this.data.type || [ESensorType.Environmental, ESensorType.Other].includes(this.data.type)
        ? html`
          <settings-row .narrow=${this.narrow}>
            <span slot="heading">${localize("panels.sensors.cards.editor.fields.always_on.heading", this.hass.language)}</span>
            <span slot="description">${localize("panels.sensors.cards.editor.fields.always_on.description", this.hass.language)}</span>

            <ha-switch
              ?checked=${this.data.always_on}
              @change=${(ev: Event) => this.data = (ev.target as HTMLInputElement).checked
            ? { ...this.data, always_on: true, arm_on_close: false, immediate: true, allow_open: false }
            : { ...this.data, always_on: false }
          }
            >
            </ha-switch>
          </settings-row>
          ` : ''}
  
      ${!this.data.type || [ESensorType.Door, ESensorType.Other].includes(this.data.type)
        ? html`
          <settings-row .narrow=${this.narrow}>
            <span slot="heading">${localize("panels.sensors.cards.editor.fields.arm_on_close.heading", this.hass.language)}</span>
            <span slot="description">${localize("panels.sensors.cards.editor.fields.arm_on_close.description", this.hass.language)}</span>

            <ha-switch
              ?checked=${this.data.arm_on_close}
              ?disabled=${this.data.always_on}
              @change=${(ev: Event) => this.data = (ev.target as HTMLInputElement).checked
            ? { ...this.data, arm_on_close: true, allow_open: false, immediate: false, always_on: false }
            : { ...this.data, arm_on_close: false }
          }
            >
            </ha-switch>
          </settings-row>
          ` : ''}

      ${!this.data.type || [ESensorType.Window, ESensorType.Door, ESensorType.Motion, ESensorType.Tamper, ESensorType.Other].includes(this.data.type)
        ? html`
          <settings-row .narrow=${this.narrow}>
            <span slot="heading">${localize("panels.sensors.cards.editor.fields.immediate.heading", this.hass.language)}</span>
            <span slot="description">${localize("panels.sensors.cards.editor.fields.immediate.description", this.hass.language)}</span>

            <ha-switch
              ?checked=${this.data.immediate}
              ?disabled=${this.data.always_on || this.data.arm_on_close}
              @change=${(ev: Event) => this.data = (ev.target as HTMLInputElement).checked
            ? { ...this.data, immediate: true, arm_on_close: false, always_on: false, allow_open: false }
            : { ...this.data, immediate: false }
          }
            >
            </ha-switch>
          </settings-row>
          ` : ''}
        
      ${!this.data.type || [ESensorType.Motion, ESensorType.Other].includes(this.data.type)
        ? html`
          <settings-row .narrow=${this.narrow}>
            <span slot="heading">${localize("panels.sensors.cards.editor.fields.allow_open.heading", this.hass.language)}</span>
            <span slot="description">${localize("panels.sensors.cards.editor.fields.allow_open.description", this.hass.language)}</span>

            <ha-switch
              ?checked=${this.data.allow_open}
              ?disabled=${this.data.always_on || this.data.immediate || this.data.arm_on_close}
              @change=${(ev: Event) => this.data = (ev.target as HTMLInputElement).checked
            ? { ...this.data, allow_open: true, arm_on_close: false, always_on: false, immediate: false }
            : { ...this.data, allow_open: false }
          }
            >
            </ha-switch>
          </settings-row>
          ` : ''}

          <settings-row .narrow=${this.narrow}>
            <span slot="heading">${localize("panels.sensors.cards.editor.fields.trigger_unavailable.heading", this.hass.language)}</span>
            <span slot="description">${localize("panels.sensors.cards.editor.fields.trigger_unavailable.description", this.hass.language)}</span>

            <ha-switch
              ?checked=${this.data.trigger_unavailable}
              @change=${(ev: Event) => this.data = { ...this.data, trigger_unavailable: (ev.target as HTMLInputElement).checked }}
            >
            </ha-switch>
          </settings-row>

          
        </collapsible-section>
  
          <div class="card-actions">
            <mwc-button
              @click=${this.saveClick}
            >
              ${this.hass.localize("ui.common.save")}
            </mwc-button>

            <mwc-button
              class="warning"
              @click=${this.deleteClick}
            >
              ${this.hass.localize("ui.common.delete")}
            </mwc-button>
          </div>
        </ha-card>
    `;
  }

  private setType(type: ESensorType) {
    const settings = type != ESensorType.Other ? sensorConfigByType(this.config!)[type] : {};
    this.data = {
      ...this.data,
      type: type,
      ...settings
    };
  }

  private deleteClick(ev: Event) {
    deleteSensor(this.hass, this.item)
      .catch(e => handleError(e, ev))
      .then(() => { this.cancelClick(); });
  }


  private saveClick(ev: Event) {
    saveSensor(this.hass, { ...this.data })
      .catch(e => handleError(e, ev))
      .then(() => { this.cancelClick(); });
  }



  private cancelClick() {
    navigate(this, "/alarmo/sensors", true);
  }

  static styles = commonStyle;
}
