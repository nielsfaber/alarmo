import { LitElement, html, customElement, property, CSSResult, css, PropertyValues } from 'lit-element';
import { HomeAssistant, computeDomain } from 'custom-card-helpers';
import { loadHaForm } from './load-ha-form';

import { getAlarmEntity } from './helpers';
import { AlarmEntity, editActionsSchema, ActionConfig } from './types';

import './settings-row.ts';
import { commonStyle } from './styles';
import { platform, editConfigService } from './const';
import { importActionConfig } from './interface';

@customElement('alarm-view-actions')
export class AlarmViewActions extends LitElement {
  @property() hass?: HomeAssistant;

  @property() alarmEntity?: AlarmEntity;
  @property() pushEnabled: boolean = false;
  @property() pushTarget: string = "";
  @property() sirenEnabled: boolean = false;
  @property() sirenEntity: string = "";

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
    const config = importActionConfig(this.alarmEntity);
    this.pushEnabled = config.pushEnabled;
    this.pushTarget = config.pushTarget;
    this.sirenEnabled = config.sirenEnabled;
    this.sirenEntity = config.sirenEntity;
  }

  firstUpdated() {
    (async () => await loadHaForm())();
    this.updateForm();
  }

  render() {
    if (!this.alarmEntity || !this.hass || !this) return html``;
    const notify_services = Object.keys(this.hass.services.notify);
    const siren_entities = Object.keys(this.hass.states).filter(e => computeDomain(e) == "switch");

    return html`
      <ha-card header="Actions">
        <div class="card-content">
          Set up actions
        </div>

        <settings-row>
          <span slot="heading">Enable push messages</span>
          <span slot="description">
            Send push messages when something changes in the alarm.
          </span>
          <ha-switch
            ?checked=${this.pushEnabled}
            @change=${(ev: Event) => { this!.pushEnabled = (ev.target as HTMLInputElement).checked }}
          >
          </ha-switch>
        </settings-row>

        <settings-row>
          <span slot="heading">Target for push messages</span>
          <span slot="description">
            Device to send the push messages to.
          </span>
          <paper-dropdown-menu
            ?disabled=${!this.pushEnabled}
          >
            <paper-listbox
              slot="dropdown-content"
              selected="${notify_services.includes(this.pushTarget) ? notify_services.findIndex(e => e == this!.pushTarget) : 0}"
              @selected-item-changed=${(ev) => { if (ev.target.selectedItem) this!.pushTarget = ev.target.selectedItem.getAttribute('value'); }}
            >
              ${notify_services.map(e => html`
              <paper-item value="${e}">${e}</paper-item>
            `)}
            </paper-listbox>
          </paper-dropdown-menu>
        </settings-row>

        <settings-row>
          <span slot="heading">Enable siren device</span>
          <span slot="description">
            Activate a device as siren when alarm is triggered.
          </span>
          <ha-switch
            ?checked=${this.sirenEnabled}
            @change=${(ev: Event) => { this!.sirenEnabled = (ev.target as HTMLInputElement).checked }}
          >
          </ha-switch>
        </settings-row>

        <settings-row>
          <span slot="heading">Siren device</span>
          <span slot="description">
            Device to activate during alarm event.
          </span>
          <paper-dropdown-menu
            ?disabled=${!this.sirenEnabled}
          >
            <paper-listbox
              slot="dropdown-content"
              selected="${siren_entities.includes(this.sirenEntity) ? siren_entities.findIndex(e => e == this!.sirenEntity) : 0}"
              @selected-item-changed=${(ev) => { if (ev.target.selectedItem) this!.sirenEntity = ev.target.selectedItem.getAttribute('value'); }}
            >
              ${siren_entities.map(e => html`
              <paper-item value="${e}">${e}</paper-item>
            `)}
            </paper-listbox>
          </paper-dropdown-menu>
        </settings-row>
        <div class="card-actions">
          <mwc-button @click=${this.saveClick}>
            save changes
          </mwc-button>
        </div>
      </ha-card>
    `;
  }

  saveClick() {
    if (!this.hass || !this) return;
    let call: editActionsSchema = {
      entity_id: getAlarmEntity(this.hass),
      edit_actions: {
      }
    };
    if (this.pushEnabled) call = { ...call, edit_actions: { ...call.edit_actions, push_target: this.pushTarget } };
    if (this.sirenEnabled) call = { ...call, edit_actions: { ...call.edit_actions, siren_entity: this.sirenEntity } };
    this.hass.callService(platform, editConfigService, call);
  }

  static get styles(): CSSResult {
    return css`
      ${commonStyle}
    `;
  }
}
