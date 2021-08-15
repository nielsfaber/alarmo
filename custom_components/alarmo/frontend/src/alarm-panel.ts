import { LitElement, html, CSSResultGroup, css } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { HomeAssistant, navigate } from 'custom-card-helpers';
import { loadHaForm } from './load-ha-form';

import './views/general/view-general.ts';
import './views/sensors/view-sensors.ts';
import './views/codes/view-codes.ts';
import './views/actions/view-actions.ts';

import { commonStyle } from './styles';
import { VERSION } from './const';
import { fetchUsers } from './data/websockets';
import { AlarmoUser, Dictionary } from './types';
import { localize } from '../localize/localize';

@customElement('alarm-panel')
export class MyAlarmPanel extends LitElement {
  @property() public hass!: HomeAssistant;
  @property({ type: Boolean, reflect: true }) public narrow!: boolean;

  @property() userConfig?: Dictionary<AlarmoUser>;

  async firstUpdated() {
    window.addEventListener('location-changed', () => {
      this.requestUpdate();
    });

    await loadHaForm();
    this.userConfig = await fetchUsers(this.hass);
    this.requestUpdate();
  }

  render() {
    if (!customElements.get('ha-app-layout') || !this.userConfig)
      return html`
        loading...
      `;
    const matchingUser = Object.values(this.userConfig!).find(
      e => e.name.toLowerCase() == this.hass!.user.name.toLowerCase()
    );

    if (!this.hass.user.is_admin && (!matchingUser || !matchingUser.is_admin)) {
      return html`
        <ha-app-layout>
          <app-header fixed slot="header">
            <app-toolbar>
              <ha-menu-button .hass=${this.hass} .narrow=${this.narrow}> </ha-menu-button>
              <div main-title>
                Alarm panel
              </div>
            </app-toolbar>
          </app-header>
        </ha-app-layout>
        <div class="view">
          <div>
            <ha-card header="Access is blocked">
              <div class="card-content">
                You have no access to view this page. Please check the following:
                <ul>
                  <li>
                    You are logged in using HA user account <b>'${this.hass!.user.name}'</b>. This account
                    <b>${this.hass!.user.is_admin ? 'does' : 'does NOT'}</b> have administrator permission.
                  </li>
                </ul>
                <ul>
                  <li>
                    There is ${matchingUser ? 'a' : 'no'} user configured in Alarmo with name
                    <b>'${this.hass!.user.name}'</b>.
                    ${matchingUser
          ? html`This user <b>${matchingUser.is_admin ? 'does' : 'does NOT'}</b> have administrator permission. `
          : ''}
                  </li>
                </ul>
              </div>
            </ha-card>
          </div>
        </div>
      `;
    } else {
      return html`
        <ha-app-layout>
          <app-header fixed slot="header">
            <app-toolbar>
              <ha-menu-button .hass=${this.hass} .narrow=${this.narrow}> </ha-menu-button>
              <div main-title>
                ${localize('title', this.hass.language)}
              </div>
              <div class="version">
                v${VERSION}
              </div>
            </app-toolbar>
            <ha-tabs
              scrollable
              attr-for-selected="page-name"
              .selected=${this.getPath()[2] || "general"}
              @iron-activate=${this.handlePageSelected}
            >
              <paper-tab page-name="general">
                ${localize('panels.general.title', this.hass.language)}
              </paper-tab>
              <paper-tab page-name="sensors">
                ${localize('panels.sensors.title', this.hass.language)}
              </paper-tab>
              <paper-tab page-name="codes">
                ${localize('panels.codes.title', this.hass.language)}
              </paper-tab>
              <paper-tab page-name="actions">
                ${localize('panels.actions.title', this.hass.language)}
              </paper-tab>
            </ha-tabs>
          </app-header>
        </ha-app-layout>
        <div class="view">
          ${this.getView()}
        </div>
      `;
    }
  }

  getPath() {
    return window.location.pathname.split('/');
  }

  getView() {
    const path = this.getPath();
    const view = path[2] || 'general';
    const args = path.slice(3);

    switch (view) {
      case 'general':
        return html`
          <alarm-view-general
            .hass=${this.hass}
            .narrow=${this.narrow}
            .path=${args.length ? args : null}
          ></alarm-view-general>
        `;
      case 'sensors':
        return html`
          <alarm-view-sensors .hass=${this.hass} .narrow=${this.narrow} .path=${args.length ? args : null}>
          </alarm-view-sensors>
        `;
      case 'codes':
        return html`
          <alarm-view-codes .hass=${this.hass} .narrow=${this.narrow} .path=${args.length ? args : null}>
          </alarm-view-codes>
        `;
      case 'actions':
        return html`
          <alarm-view-actions .hass=${this.hass} .narrow=${this.narrow} .path=${args.length ? args : null}>
          </alarm-view-actions>
        `;
      default:
        return html`
            <ha-card header="Page not found">
              <div class="card-content">
                The page you are trying to reach cannot be found. 
                Please select a page from the menu above to continue.
              </div>
            </ha-card>
        `;
    }
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

  static get styles(): CSSResultGroup {
    return css`
      ${commonStyle}

      :host {
        color: var(--primary-text-color);
        --paper-card-header-color: var(--primary-text-color);
      }

      app-header,
      app-toolbar {
        background-color: var(--app-header-background-color);
        font-weight: 400;
        color: var(--app-header-text-color, white);
      }
      app-toolbar {
        height: var(--header-height);
      }

      ha-app-layout {
        display: block;
        z-index: 2;
      }

      app-toolbar [main-title] {
        margin-left: 20px;
      }

      ha-tabs {
        margin-left: max(env(safe-area-inset-left), 24px);
        margin-right: max(env(safe-area-inset-right), 24px);
        --paper-tabs-selection-bar-color: var(
          --app-header-selection-bar-color,
          var(--app-header-text-color, #fff)
        );
        text-transform: uppercase;
      }

      .view {
        height: calc(100vh - 112px);
        display: flex;
        justify-content: center;
      }

      .view > * {
        width: 600px;
        max-width: 600px;
      }

      .view > *:last-child {
        margin-bottom: 20px;
      }

      .version {
        font-size: 14px;
        font-weight: 500;
        color: rgba(var(--rgb-text-primary-color), 0.9);
      }
    `;
  }
}
