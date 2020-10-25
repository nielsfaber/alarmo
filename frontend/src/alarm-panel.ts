import { LitElement, html, customElement, property, CSSResult, css } from 'lit-element';
import { HomeAssistant, navigate } from 'custom-card-helpers';
import { loadHaForm } from './load-ha-form';

import './view-general.ts';
import './view-sensors.ts';
import './view-codes.ts';
import './view-actions.ts';
import { commonStyle } from './styles';
import { getAlarmEntity } from './helpers';
import { importUserConfig } from './interface';

@customElement('alarm-panel')
export class MyAlarmPanel extends LitElement {
  @property() public hass!: HomeAssistant;

  firstUpdated() {
    (async () => await loadHaForm())();
  }

  render() {
    const user = this.hass.user;
    let is_admin = user.is_admin;
    const alarmEntity = this.hass.states[getAlarmEntity(this.hass)];
    const users = Object.entries(alarmEntity.attributes.users).map(([k, v]) => importUserConfig(k, Number(v)));
    if (!is_admin && users.find(e => e.name == user.name)) is_admin = users.find(e => e.name == user.name)!.is_admin;

    if (!is_admin) return html`
      <div class="view">
        <ha-card header="Alarmo">
          <div class="card-content">
            Hi there ${user.name}!<br><br>
            It looks like you don't have the appropriate permissions to configure Alarmo :(
          </div>
        </ha-card>
      </div>
    `;
    else {


      return html`
      <ha-app-layout>
        <app-header fixed slot="header">
          <app-toolbar>
            <ha-menu-button .hass=${this.hass}></ha-menu-button>
            <div main-title>
              Alarm panel
            </div>
          </app-toolbar>
          <paper-tabs
            scrollable
            attr-for-selected="page-name"
            .selected=${this.getPath()}
            @iron-activate=${this.handlePageSelected}
          >
            <paper-tab page-name="general">
              General
            </paper-tab>
            <paper-tab page-name="sensors">
              sensors
            </paper-tab>
            <paper-tab page-name="codes">
              Codes
            </paper-tab>
            <paper-tab page-name="actions">
              actions
            </paper-tab>
          </paper-tabs>
        </app-header>
      </ha-app-layout>
      <div class="view">
        ${this.getView()}
      </div>
    `;
    }
  }

  getPath() {
    return window.location.pathname.split('/').pop();
  }

  getView() {
    const path = this.getPath();
    if (path == 'general' || !path || path == 'alarmo') {
      return html`
        <alarm-view-general .hass=${this.hass}> </alarm-view-general>
      `;
    } else if (path == 'sensors') {
      return html`
        <alarm-view-sensors .hass=${this.hass}> </alarm-view-sensors>
      `;
    } else if (path == 'codes') {
      return html`
        <alarm-view-codes .hass=${this.hass}> </alarm-view-codes>
      `;
    } else if (path == 'actions') {
      return html`
        <alarm-view-actions .hass=${this.hass}> </alarm-view-actions>
      `;
    }
    return html``;
  }

  handlePageSelected(ev) {
    const newPage = ev.detail.item.getAttribute('page-name');
    if (newPage !== this.getPath()) {
      navigate(this, `/alarmo/${newPage}`);
      this.requestUpdate();
    } else {
      scrollTo(0, 0);
    }
  }

  static get styles(): CSSResult {
    return css`
      ${commonStyle}

      :host {
        color: var(--primary-text-color);
        --paper-card-header-color: var(--primary-text-color);
      }

      ha-app-layout,
      app-toolbar,
      paper-tabs {
        background: var(--primary-color);
        color: var(--text-primary-color);
      }

      ha-app-layout {
        z-index: 2;
      }

      paper-tabs {
        --paper-tabs-selection-bar-color: #fff;
        text-transform: uppercase;
      }

      .view {
        display: flex;
        justify-content: center;
        padding-top: 50px;
      }
    `;
  }
}
