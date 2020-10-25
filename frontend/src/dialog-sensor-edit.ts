import { LitElement, html, customElement, property, CSSResult, css, internalProperty } from 'lit-element';
import { HomeAssistant } from 'custom-card-helpers';

import { prettyPrint, computeName, getAlarmEntity } from './helpers';
import { SensorConfig, editSensorSchema, removeSensorSchema, EAlarmModes, AlarmEntity } from './types';
import { platform, editConfigService } from './const';
import { importModes } from './interface';

@customElement('dialog-sensor-edit')
export class DialogSensorEdit extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;

  @internalProperty() private _params?: { entity_id: string; config: SensorConfig };

  @property() selection?: SensorConfig;

  public async showDialog(params): Promise<void> {
    this._params = params;
    this.selection = params.config;
    await this.updateComplete;
  }

  public async closeDialog() {
    this._params = undefined;
  }

  render() {
    if (!this._params) return html``;

    const configuredModes = importModes(this.hass.states[getAlarmEntity(this.hass)] as AlarmEntity);
    const entity = this.hass.states[this._params.entity_id];
    return html`
      
      <ha-dialog
        open
        .heading=${true}
        @closed=${this.closeDialog}
        @close-dialog=${this.closeDialog}
      >
        <mwc-button
          slot="secondaryAction"
          @click=${this.updateSensorClick}
          dialogAction="close"
        >
          Save changes
        </mwc-button>
        <mwc-button
          slot="primaryAction"
          @click=${this.deleteSensorClick}
          dialogAction="close"
        >
          Remove
        </mwc-button>
      <div slot="heading">
        <ha-header-bar>
          <ha-icon-button
            slot="navigationIcon"
            dialogAction="cancel"
            icon="mdi:close"
          >
          </ha-icon-button>
          <span slot="title">
            Configuration for '${prettyPrint(computeName(entity))}'
          </span>
        </ha-header-bar>
      </div>
      <div class="wrapper">

        <div class="header-row mode-list">
          <div class="text"></div>
          ${
      configuredModes.includes(EAlarmModes.ArmedAway)
        ? html`
                  <div class="col1">Armed away</div>
                `
        : ''
      }
          ${
      configuredModes.includes(EAlarmModes.ArmedHome)
        ? html`
                  <div class="col2">Armed home</div>
                `
        : ''
      }
          ${
      configuredModes.includes(EAlarmModes.ArmedNight)
        ? html`
                  <div class="col3">Armed night</div>
                `
        : ''
      }
          ${
      configuredModes.includes(EAlarmModes.ArmedCustom)
        ? html`
                  <div class="col4">Armed custom</div>
                `
        : ''
      }
        </div>
        <div class="mode-list">
          <div class="label">Alarm modes in which this sensor is active</div>
            ${
      configuredModes.includes(EAlarmModes.ArmedAway)
        ? html`
                    <div class="col1">
                      <ha-checkbox
                        @change=${ev => this.updateMode(ev, EAlarmModes.ArmedAway)}
                        ?checked=${this.selection!.modes.includes(EAlarmModes.ArmedAway)}
                      >
                      </ha-checkbox>
                    </div>
                  `
        : ''
      }
            ${
      configuredModes.includes(EAlarmModes.ArmedHome)
        ? html`
                    <div class="col2">
                      <ha-checkbox
                        @change=${ev => this.updateMode(ev, EAlarmModes.ArmedHome)}
                        ?checked=${this.selection!.modes.includes(EAlarmModes.ArmedHome)}
                      >
                      </ha-checkbox>
                    </div>
                  `
        : ''
      }
            ${
      configuredModes.includes(EAlarmModes.ArmedNight)
        ? html`
                    <div class="col3">
                      <ha-checkbox
                        @change=${ev => this.updateMode(ev, EAlarmModes.ArmedNight)}
                        ?checked=${this.selection!.modes.includes(EAlarmModes.ArmedNight)}
                      >
                      </ha-checkbox>
                    </div>
                  `
        : ''
      }
            ${
      configuredModes.includes(EAlarmModes.ArmedCustom)
        ? html`
                    <div class="col4">
                      <ha-checkbox
                        @change=${ev => this.updateMode(ev, EAlarmModes.ArmedCustom)}
                        ?checked=${this.selection!.modes.includes(EAlarmModes.ArmedCustom)}
                      >
                      </ha-checkbox>
                    </div>
                  `
        : ''
      }
        </div>
        <div class="checkbox-row">
          <div class="label">
            This sensor should trigger the alarm immediately
          </div>
          <div class="checkbox">
            <ha-switch
              @change=${(ev: Event) => {
        this.selection = { ...this.selection!, immediate: (ev.target as HTMLInputElement).checked };
      }}
              ?checked=${this.selection!.immediate}
            ></ha-switch>
          </div>
        </div>

      </ha-dialog>
    `;
  }

  updateMode(ev, mode: EAlarmModes) {
    if (!this.selection) return;
    const checked = (ev.target as HTMLInputElement).checked;
    let modeCfg = [...this.selection.modes];
    if (checked && !modeCfg.includes(mode)) modeCfg.push(mode);
    else if (!checked && modeCfg.includes(mode)) modeCfg = modeCfg.filter(e => e != mode);
    this.selection = { ...this.selection, modes: modeCfg };
  }

  updateSensorClick() {
    if (!this.selection || !this._params || !this.hass) return;
    const call: editSensorSchema = {
      entity_id: getAlarmEntity(this.hass),
      edit_sensor: {
        entity_id: this._params.entity_id,
        modes: this.selection.modes,
        immediate: this.selection.immediate,
      },
    };
    console.log(call);
    this.hass.callService(platform, editConfigService, call);
  }

  deleteSensorClick() {
    if (!this._params) return;
    const call: removeSensorSchema = {
      entity_id: getAlarmEntity(this.hass),
      remove_sensor: {
        entity_id: this._params.entity_id,
      },
    };
    this.hass.callService(platform, editConfigService, call);
  }

  static get styles(): CSSResult {
    return css`
      div.checkbox-row {
        display: grid;
        grid-template-columns: 1fr max-content;
        grid-template-areas: 'label checkbox';
        grid-gap: 2px 20px;
        width: 100%;
      }

      div.checkbox-row .checkbox {
        grid-area: checkbox;
      }
      div.checkbox-row .label {
        grid-area: label;
      }

      div.checkbox-row .checkbox,
      div.checkbox-row .label {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        min-height: 48px;
      }

      div.mode-list {
        display: grid;
        grid-template-columns: 1fr min-content min-content min-content min-content;
        grid-template-areas: 'label col1 col2 col3 col4';
      }

      div.mode-list .label {
        grid-area: label;
      }
      div.mode-list .col1 {
        grid-area: col1;
      }
      div.mode-list .col2 {
        grid-area: col2;
      }
      div.mode-list .col3 {
        grid-area: col3;
      }
      div.mode-list .col4 {
        grid-area: col4;
      }

      div.mode-list .label,
      div.mode-list .col1,
      div.mode-list .col2,
      div.mode-list .col3 {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        min-height: 48px;
        padding: 0px 0px 0px 20px;
      }

      paper-input {
        width: 100%;
      }
    `;
  }
}
