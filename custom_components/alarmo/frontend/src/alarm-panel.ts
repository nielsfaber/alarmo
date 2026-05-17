import { LitElement, html, CSSResultGroup, css } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { loadHaForm } from './load-ha-elements';

import './views/general/view-general.ts';
import './views/areas/view-areas.ts';
import './views/sensors/view-sensors.ts';
import './views/codes/view-codes.ts';
import './views/actions/view-actions.ts';
import './views/actions/view-notifications.ts';

import { commonStyle } from './styles';
import { VERSION } from './const';
import { fetchUsers } from './data/websockets';
import { AlarmoUser, Dictionary, HomeAssistant } from './types';
import { localize } from '../localize/localize';
import { exportPath, getPath, Path } from './common/navigation';
import { navigate } from './helpers';

enum EMenuItems {
  General = 'general',
  Areas = 'areas',
  Sensors = 'sensors',
  Codes = 'codes',
  Actions = 'actions',
  Notifications = 'notifications'
}

@customElement('alarm-panel')
export class MyAlarmPanel extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;

  @property({ type: Boolean, reflect: true }) public narrow!: boolean;

  @property({ attribute: false }) userConfig?: Dictionary<AlarmoUser>;

  async firstUpdated() {
    window.addEventListener('location-changed', () => {
      if (!window.location.pathname.includes('alarmo')) return;
      this.requestUpdate();
    });

    await loadHaForm();
    this.userConfig = await fetchUsers(this.hass);
    this.requestUpdate();
  }

  render() {
    if (!customElements.get('ha-panel-config') || !this.userConfig)
      return html`
        loading...
      `;

    const path = getPath();

    return html`
      <div class="header">
        <div class="toolbar">
          <ha-menu-button .hass=${this.hass} .narrow=${this.narrow}></ha-menu-button>
          <div class="main-title">
            ${localize('title', this.hass.language)}
          </div>
          <div class="version">
            v${VERSION}
          </div>
        </div>

        <ha-tab-group
          @wa-tab-show=${this.handlePageSelected}
        >
          ${Object.values(EMenuItems).map(e => html`
            <ha-tab-group-tab slot="nav" panel="${e}" .active=${path.page === e}>
              ${e === EMenuItems.Notifications
                ? localize('panels.actions.cards.notifications.title', this.hass.language)
                : e === EMenuItems.Areas
                  ? localize('panels.general.cards.areas.title', this.hass.language)
                : localize(`panels.${e}.title`, this.hass.language)}
            </ha-tab-group-tab>
          `)}
        </ha-tab-group>
      </div>
      ${this.getView(path)}
    `;
  }

  getView(path: Path) {
    const page = path.page;
    const hasSubpage = Boolean(path.subpage);
    const hasParams = Object.keys(path.params).length > 0;
    const layout: 'modal' | 'full-width' =
      ['areas', 'sensors', 'codes', 'actions', 'notifications'].includes(page) && !hasSubpage && !hasParams
        ? 'full-width'
        : 'modal';

    switch (page) {
      case 'general':
        return html`
          <div class="view ${layout}">
            <alarm-view-general .hass=${this.hass} .narrow=${this.narrow} .path=${path}></alarm-view-general>
          </div>
        `;
      case 'areas':
        return html`
          <div class="view ${layout}">
            <alarm-view-areas .hass=${this.hass} .narrow=${this.narrow} .path=${path}></alarm-view-areas>
          </div>
        `;
      case 'sensors':
        return html`
          <div class="view ${layout}">
            <alarm-view-sensors .hass=${this.hass} .narrow=${this.narrow} .path=${path}></alarm-view-sensors>
          </div>
        `;
      case 'codes':
        return html`
          <div class="view ${layout}">
            <alarm-view-codes .hass=${this.hass} .narrow=${this.narrow} .path=${path}></alarm-view-codes>
          </div>
        `;
      case 'actions':
        return html`
          <div class="view ${layout}">
            <alarm-view-actions .hass=${this.hass} .narrow=${this.narrow} .path=${path}></alarm-view-actions>
          </div>
        `;
      case 'notifications':
        return html`
          <div class="view ${layout}">
            <alarm-view-notifications .hass=${this.hass} .narrow=${this.narrow} .path=${path}></alarm-view-notifications>
          </div>
        `;
      default:
        return html`
          <div class="view modal">
            <ha-card header="Page not found">
              <div class="card-content">
                The page you are trying to reach cannot be found. Please select a page from the menu above to continue.
              </div>
            </ha-card>
          </div>
        `;
    }
  }

  handlePageSelected(ev: CustomEvent) {
    const newPage = ev.detail.name;
    if (newPage !== getPath().page) {
      navigate(this, exportPath(newPage));
      this.requestUpdate();
    } else {
      scrollTo(0, 0);
    }
  }

  static get styles(): CSSResultGroup {
    return css`
      ${commonStyle} :host {
        color: var(--primary-text-color);
        --paper-card-header-color: var(--primary-text-color);
      }
      .header {
        background-color: var(--app-header-background-color);
        color: var(--app-header-text-color, white);
        border-bottom: var(--app-header-border-bottom, none);
      }
      .toolbar {
        height: var(--header-height);
        display: flex;
        align-items: center;
        font-size: 20px;
        padding: 0 16px;
        font-weight: 400;
        box-sizing: border-box;
      }
      .main-title {
        margin: 0 0 0 24px;
        line-height: 20px;
        flex-grow: 1;
      }
      ha-tab-group {
        margin-left: max(env(safe-area-inset-left), 24px);
        margin-right: max(env(safe-area-inset-right), 24px);
        --ha-tab-active-text-color: var(--app-header-text-color, white);
        --ha-tab-indicator-color: var(--app-header-text-color, white);
        --ha-tab-track-color: transparent;
      }
      .view {
        height: calc(100vh - 112px);
        display: flex;
        justify-content: center;
      }
      .view.modal > * {
        width: 600px;
        max-width: 600px;
      }
      .view.full-width > * {
        width: 100%;
        max-width: 100%;
        padding: 0 16px;
        box-sizing: border-box;
      }
      @media (min-width: 1200px) {
        .view.full-width > * {
          padding: 0 24px;
        }
      }
      .view > *:last-child {
        margin-bottom: 20px;
      }
      .version {
        font-size: 14px;
        color: var(--primary-text-color);
      }
    `;
  }
}
