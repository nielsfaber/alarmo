import { LitElement, html, customElement, property, CSSResult, css, PropertyValues } from 'lit-element';
import { HomeAssistant, fireEvent } from 'custom-card-helpers';
import { loadHaForm } from './load-ha-form';

import { getAlarmEntity, prettyPrint } from './helpers';
import { UserConfig, configCodeSchema, AlarmEntity } from './types';

import { importUserConfig, importGeneralConfig } from './interface';

import './dialog-user-new.ts';
import './dialog-user-edit.ts';
import './settings-row.ts';
import { commonStyle } from './styles';
import { platform, editConfigService } from './const';

@customElement('alarm-view-codes')
export class AlarmViewCodes extends LitElement {
  @property() hass?: HomeAssistant;

  @property()
  users: UserConfig[] = [];
  @property() code_arm = true;
  @property() code_disarm = true;
  @property() code_format: 'number' | 'text' = 'number';

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
    const entity = getAlarmEntity(this.hass);
    const stateObj = this.hass!.states[entity] as AlarmEntity;
    this.users = Object.entries(stateObj.attributes.users).map(([k, v]) => importUserConfig(k, Number(v)));
    const config = importGeneralConfig(stateObj);
    this.code_arm = config.code_arm_required;
    this.code_disarm = config.code_disarm_required;
    this.code_format = config.code_format;
  }

  firstUpdated() {
    (async () => await loadHaForm())();
    this.updateForm();
  }

  render() {
    return html`
      <ha-card header="Codes">
        <div class="card-content">
          Change settings for the code.
        </div>

        <settings-row>
          <span slot="heading">Use arm code</span>
          <span slot="description">
            Require a code for arming the alarm
          </span>
          <ha-switch
            ?checked=${this.code_arm}
            @change=${(ev: Event) => {
        this.code_arm = (ev.target as HTMLInputElement).checked;
      }}
          >
          </ha-switch>
        </settings-row>

        <settings-row>
          <span slot="heading">Use disarm code</span>
          <span slot="description">
            Require a code for disarming the alarm
          </span>
          <ha-switch
            ?checked=${this.code_disarm}
            @change=${(ev: Event) => {
        this.code_disarm = (ev.target as HTMLInputElement).checked;
      }}
          >
          </ha-switch>
        </settings-row>

        <settings-row>
          <span slot="heading">Code format</span>
          <span slot="description">
            Sets the input type for Lovelace alarm card.
          </span>
          <mwc-button
            class="${this.code_format == 'number' ? 'active' : ''}"
            @click=${() => {
        this.code_format = 'number';
      }}
            >pincode</mwc-button
          >
          <mwc-button
            class="${this.code_format == 'text' ? 'active' : ''}"
            @click=${() => {
        this.code_format = 'text';
      }}
          >
            password</mwc-button
          >
        </settings-row>

        <div class="card-actions">
          <mwc-button @click=${this.saveClick}>
            save changes
          </mwc-button>
        </div>
      </ha-card>
      <ha-card header="User management">
        <div class="card-content">
          Each user has its own code to arm/disarm the alarm.
        </div>

        ${!this.users.length
        ? html`
              <settings-row>
                <span slot="description">
                  There are no users yet
                </span>
              </settings-row>
            `
        : html`
              <div class="grid">
                <div class="col1 header"></div>
                <div class="col2 header">Name</div>
                <div class="col3 header">Remarks</div>
                <div class="col4 header">Actions</div>
                ${this.getUsers()}
              </div>
            `}

        <div class="card-actions">
          <mwc-button @click=${ev => this.showNewUserDialog(ev.target)}>
            new user
          </mwc-button>
        </div>
      </ha-card>
    `;
  }

  getUsers() {
    const users = this.users;
    users.sort((a, b) => (a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1));
    return this.users.map(user => {
      return html`
        <div class="col1">
          <ha-icon icon="mdi:account-outline"> </ha-icon>
        </div>
        <div class="col2">
          ${prettyPrint(user.name)}
        </div>
        <div class="col3">
          ${user.is_admin ? 'administrator' : ''}
        </div>
        <div class="col4">
          <mwc-button @click=${(ev: Event) => this.showEditUserDialog(ev.target as HTMLElement, user)}>
            edit
          </mwc-button>
        </div>
      `;
    });
  }

  showNewUserDialog(element: HTMLElement) {
    fireEvent(element, 'show-dialog', {
      dialogTag: 'dialog-user-new',
      dialogImport: () => import('./dialog-user-new'),
      dialogParams: {},
    });
  }

  showEditUserDialog(element: HTMLElement, userConfig) {
    fireEvent(element, 'show-dialog', {
      dialogTag: 'dialog-user-edit',
      dialogImport: () => import('./dialog-user-edit'),
      dialogParams: userConfig,
    });
  }

  saveClick() {
    if (!this.hass) return;
    const data: configCodeSchema = {
      entity_id: getAlarmEntity(this.hass),
      config_code: {
        code_arm_required: this.code_arm,
        code_disarm_required: this.code_disarm,
        code_format: this.code_format,
      },
    };
    this.hass.callService(platform, editConfigService, data);
  }

  static get styles(): CSSResult {
    return css`
      ${commonStyle}

      div.grid {
        display: grid;
        grid-template-columms: min-content 1fr 1fr max-content;
        grid-gap: 2px 20px;
      }
      div.grid > div {
        display: flex;
        width: 100%;
        height: 100%;
        min-height: 40px;
        align-items: center;
        justify-content: left;
      }
      div.col1 {
        grid-column-start: 1;
        grid-column-end: 2;
      }
      div.col2 {
        grid-column-start: 2;
        grid-column-end: 3;
      }
      div.col3 {
        grid-column-start: 3;
        grid-column-end: 4;
      }
      div.col4 {
        grid-column-start: 4;
        grid-column-end: 5;
      }

      div.grid .header {
        font-weight: bold;
      }

      div.grid ha-icon {
        color: var(--state-icon-color);
        padding: 0px 10px;
      }
    `;
  }
}
