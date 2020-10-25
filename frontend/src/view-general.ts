import { LitElement, html, customElement, property, CSSResult, css, PropertyValues } from 'lit-element';
import { HomeAssistant } from 'custom-card-helpers';
import { loadHaForm } from './load-ha-form';
import { getAlarmEntity } from './helpers';
import { EAlarmModes, editGeneralSchema, AlarmEntity } from './types';
import { importModes, importDelayConfig, importGeneralConfig } from './interface';
import { commonStyle } from './styles';
import { editConfigService, platform } from './const';

import './labeled-slider';
import './alarm-mode-card';
import './settings-row.ts';

@customElement('alarm-view-general')
export class AlarmViewGeneral extends LitElement {
  @property() hass?: HomeAssistant;

  @property() alarmEntity?: AlarmEntity;

  @property() modeList: EAlarmModes[] = [];
  @property() trigger_time = 0;
  @property() disarm_after_trigger = false;

  protected shouldUpdate(changedProps: PropertyValues): boolean {
    if (!this.hass) return true;
    const oldHass = changedProps.get('hass') as HomeAssistant | undefined;
    if (oldHass && changedProps.size == 1) {
      if (oldHass.states[getAlarmEntity(oldHass)] !== this.hass.states[getAlarmEntity(this.hass)]) {
        this.updateForm();
        return true;
      }
      return false;
    }
    return true;
  }

  updateForm() {
    if (!this.hass) return;
    const entity_id = getAlarmEntity(this.hass);
    this.alarmEntity = this.hass!.states[entity_id] as AlarmEntity;
    this.modeList = importModes(this.alarmEntity);

    this.trigger_time = importDelayConfig(this.alarmEntity, EAlarmModes.ArmedAway).trigger;
    this.disarm_after_trigger = importGeneralConfig(this.alarmEntity).disarm_after_trigger;
  }

  firstUpdated() {
    (async () => await loadHaForm())();
    this.updateForm();
  }

  render() {
    if (!this.alarmEntity) return html``;

    return html`
      <ha-card header="General settings">
        <div class="card-content"></div>

        <settings-row>
          <span slot="heading">Trigger time</span>
          <span slot="description">
            Time during which the siren will sound
          </span>
          <labeled-slider
            unit="seconds"
            min="0"
            max="7200"
            step="10"
            zeroValue="infinite"
            value=${this.trigger_time}
            @change=${(ev: Event) => {
              this.trigger_time = Number((ev.target as HTMLInputElement).value);
            }}
          >
          </labeled-slider>
        </settings-row>

        <settings-row>
          <span slot="heading">Disarm after trigger</span>
          <span slot="description">
            After trigger time has expired, disarm the alarm instead of returning to armed state.
          </span>
          <ha-switch
            ?checked=${this.disarm_after_trigger}
            @change=${(ev: Event) => {
              this.disarm_after_trigger = (ev.target as HTMLInputElement).checked;
            }}
          >
          </ha-switch>
        </settings-row>

        <div class="card-actions">
          <mwc-button @click=${this.saveClick}>
            save changes
          </mwc-button>
        </div>
      </ha-card>

      <alarm-mode-card
        header="Armed away"
        .hass=${this.hass}
        ?enabled=${this.modeList.includes(EAlarmModes.ArmedAway)}
        mode=${EAlarmModes.ArmedAway}
        .config=${importDelayConfig(this.alarmEntity, EAlarmModes.ArmedAway)}
      >
        Armed away will be used when all people left the house. All doors and windows allowing access to the house will
        be guarded, as well as motion sensors inside the house.
      </alarm-mode-card>

      <alarm-mode-card
        header="Armed night"
        .hass=${this.hass}
        ?enabled=${this.modeList.includes(EAlarmModes.ArmedNight)}
        mode=${EAlarmModes.ArmedNight}
        .config=${importDelayConfig(this.alarmEntity, EAlarmModes.ArmedNight)}
      >
        Armed night will be used when setting the alarm before going to sleep. All doors and windows allowing access to
        the house will be guarded, and selected motion sensors (downstairs) in the house.
      </alarm-mode-card>

      <alarm-mode-card
        header="Armed home"
        .hass=${this.hass}
        ?enabled=${this.modeList.includes(EAlarmModes.ArmedHome)}
        mode=${EAlarmModes.ArmedHome}
        .config=${importDelayConfig(this.alarmEntity, EAlarmModes.ArmedHome)}
      >
        Armed home (also known as armed stay) will be used when setting the alarm while people are in the house. All
        doors and windows allowing access to the house will be guarded, but not motion sensors inside the house.
      </alarm-mode-card>

      <alarm-mode-card
        header="Armed custom"
        .hass=${this.hass}
        ?enabled=${this.modeList.includes(EAlarmModes.ArmedCustom)}
        mode=${EAlarmModes.ArmedCustom}
        .config=${importDelayConfig(this.alarmEntity, EAlarmModes.ArmedCustom)}
      >
        An extra mode for defining your own security perimeter.
      </alarm-mode-card>
    `;
  }

  saveClick() {
    if (!this.hass) return;
    const call: editGeneralSchema = {
      entity_id: getAlarmEntity(this.hass),
      edit_general: {
        trigger_time: { seconds: this.trigger_time },
        disarm_after_trigger: this.disarm_after_trigger,
      },
    };
    this.hass.callService(platform, editConfigService, call);
  }

  static get styles(): CSSResult {
    return css`
      ${commonStyle}
    `;
  }
}
