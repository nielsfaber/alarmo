import { LitElement, html, customElement, property, CSSResult, css } from 'lit-element';
import { HomeAssistant, navigate } from 'custom-card-helpers';
import { loadHaForm } from './load-ha-form';

import './views/view-general.ts';
import './views/view-sensors.ts';
import './views/view-codes.ts';
import './views/view-actions.ts';
import { commonStyle } from './styles';
import { VERSION } from './const';
import { AlarmoConfig } from './types';

@customElement('alarm-panel')
export class MyAlarmPanel extends LitElement {
  @property() public hass!: HomeAssistant;
  @property({ type: Boolean, reflect: true }) public narrow!: boolean;

  config?: AlarmoConfig;

  async firstUpdated() {
    window.addEventListener("location-changed", () => {
      this.requestUpdate();
    });

    await loadHaForm();
    this.requestUpdate();
  }

  render() {
    if (!customElements.get('ha-app-layout')) return html`loading...`;
    return html`
      <ha-app-layout>
        <app-header fixed slot="header">
          <app-toolbar>
            <ha-menu-button
              .hass=${this.hass}
              .narrow=${this.narrow}
            >
            </ha-menu-button>
            <div main-title>
              Alarm panel
            </div>
            <div class="version">
              v${VERSION}
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

  getPath() {
    return window.location.pathname.split('/');
  }

  getView() {
    const path = this.getPath();
    const view = path[2] || "general";
    const args = path.slice(3);

    switch (view) {
      case "general":
        return html`
        <alarm-view-general
          .hass=${this.hass}
          .narrow=${this.narrow}
          .path=${args.length ? args : null}
        ></alarm-view-general>
      `;
      case "sensors":
        return html`
        <alarm-view-sensors
          .hass=${this.hass}
          .narrow=${this.narrow}
          .path=${args.length ? args : null}
        >
        </alarm-view-sensors>
      `;
      case "codes":
        return html`
        <alarm-view-codes
          .hass=${this.hass}
          .narrow=${this.narrow}
          .path=${args.length ? args : null}
        >
        </alarm-view-codes>
      `;
      case "actions":
        return html`
        <alarm-view-actions
          .hass=${this.hass}
          .narrow=${this.narrow}
          .path=${args.length ? args : null}
        >
        </alarm-view-actions>
      `;
      default:
        return html`no view`;
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
        display: block;
        z-index: 2;
      }

      paper-tabs {
        --paper-tabs-selection-bar-color: #fff;
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
