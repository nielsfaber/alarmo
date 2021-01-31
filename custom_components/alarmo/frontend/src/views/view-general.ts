import { LitElement, html, customElement, property } from 'lit-element';
import { HomeAssistant, navigate, fireEvent } from 'custom-card-helpers';
import { loadHaForm } from '../load-ha-form';
import { AlarmoConfig, Dictionary, AlarmoArea, AlarmoAutomation } from '../types';
import { commonStyle } from '../styles';

import '../components/time-slider';
import '../cards/alarm-mode-card';
import '../components/settings-row.ts';
import '../cards/mqtt-config-card.ts';
import '../cards/area-config-card.ts';
import '../dialogs/edit-master-dialog.ts';
import '../dialogs/confirm-delete-dialog.ts';

import { UnsubscribeFunc } from 'home-assistant-js-websocket';
import { fetchConfig, saveConfig, fetchAreas, fetchAutomations } from '../data/websockets';
import { SubscribeMixin } from '../subscribe-mixin';
import { localize } from '../../localize/localize';
import { pick, handleError } from '../helpers';

@customElement('alarm-view-general')
export class AlarmViewGeneral extends SubscribeMixin(LitElement) {
  hass?: HomeAssistant;
  @property() narrow!: boolean;
  @property() path!: string[] | null;

  @property() data?: Partial<AlarmoConfig>;

  @property() config?: AlarmoConfig;
  @property() areas: Dictionary<AlarmoArea> = {};
  @property() automations: Dictionary<AlarmoAutomation> = {};

  public hassSubscribe(): Promise<UnsubscribeFunc>[] {
    this._fetchData();
    return [this.hass!.connection.subscribeEvents(() => this._fetchData(), 'alarmo_updated')];
  }

  private async _fetchData(): Promise<void> {
    if (!this.hass) {
      return;
    }
    this.config = await fetchConfig(this.hass);
    this.areas = await fetchAreas(this.hass);
    this.automations = await fetchAutomations(this.hass);
    this.data = pick(this.config, ['trigger_time', 'disarm_after_trigger', 'mqtt', 'master']);
  }

  firstUpdated() {
    (async () => await loadHaForm())();
  }

  render() {
    if (!this.hass || !this.config || !this.data) return html``;

    if (this.path && this.path[0] == 'mqtt_configuration') {
      return html`
        <mqtt-config-card .hass=${this.hass} .narrow=${this.narrow}> </mqtt-config-card>
      `;
    }
    if (this.path && this.path[0] == 'edit_area' && this.path.length == 2) {
      return html`
        <area-editor-card .hass=${this.hass} .narrow=${this.narrow} item=${this.path[1]}> </area-editor-card>
      `;
    } else {
      return html`
        <ha-card header="${localize('panels.general.title', this.hass.language)}">
          <div class="card-content">
            ${localize('panels.general.cards.general.description', this.hass.language)}
          </div>

          <settings-row .narrow=${this.narrow}>
            <span slot="heading"
              >${localize('panels.general.cards.general.fields.disarm_after_trigger.heading', this.hass.language)}</span
            >
            <span slot="description"
              >${localize(
                'panels.general.cards.general.fields.disarm_after_trigger.description',
                this.hass.language
              )}</span
            >
            <ha-switch
              ?checked=${this.data!.disarm_after_trigger}
              @change=${(ev: Event) =>
                (this.data = { ...this.data, disarm_after_trigger: (ev.target as HTMLInputElement).checked })}
              }}
            >
            </ha-switch>
          </settings-row>

          <settings-row .narrow=${this.narrow}>
            <span slot="heading"
              >${localize('panels.general.cards.general.fields.enable_mqtt.heading', this.hass.language)}</span
            >
            <span slot="description"
              >${localize('panels.general.cards.general.fields.enable_mqtt.description', this.hass.language)}</span
            >
            <ha-switch
              ?checked=${this.data?.mqtt?.enabled}
              @change=${(ev: Event) => {
                this.data = {
                  ...this.data!,
                  mqtt: { ...this.data!.mqtt!, enabled: (ev.target as HTMLInputElement).checked },
                };
              }}
            >
            </ha-switch>
          </settings-row>

          ${this.data?.mqtt?.enabled
            ? html`
                <div style="padding: 0px 0px 16px 16px">
                  <mwc-button outlined @click=${() => navigate(this, '/alarmo/general/mqtt_configuration', true)}>
                    ${localize('panels.general.cards.general.actions.setup_mqtt', this.hass.language)}
                  </mwc-button>
                </div>
              `
            : ''}
          ${Object.keys(this.areas).length >= 2
            ? html`
                <settings-row .narrow=${this.narrow}>
                  <span slot="heading"
                    >${localize('panels.general.cards.general.fields.enable_master.heading', this.hass.language)}</span
                  >
                  <span slot="description"
                    >${localize(
                      'panels.general.cards.general.fields.enable_master.description',
                      this.hass.language
                    )}</span
                  >
                  <ha-switch
                    ?checked=${this.data?.master?.enabled && Object.keys(this.areas).length >= 2}
                    ?disabled=${Object.keys(this.areas).length < 2}
                    @change=${this.toggleEnableMaster}
                  >
                  </ha-switch>
                </settings-row>
              `
            : ''}
          ${this.data?.master?.enabled && Object.keys(this.areas).length >= 2
            ? html`
                <div style="padding: 0px 0px 16px 16px">
                  <mwc-button outlined @click=${this.setupMasterClick}>
                    ${localize('panels.general.cards.general.actions.setup_master', this.hass.language)}
                  </mwc-button>
                </div>
              `
            : ''}

          <div class="card-actions">
            <mwc-button @click=${this.saveClick}>
              ${this.hass.localize('ui.common.save')}
            </mwc-button>
          </div>
        </ha-card>

        <alarm-mode-card .hass=${this.hass} .narrow=${this.narrow}> </alarm-mode-card>

        <area-config-card .hass=${this.hass} .narrow=${this.narrow}> </area-config-card>
      `;
    }
  }

  setupMasterClick(ev: Event) {
    const element = ev.target as HTMLElement;
    fireEvent(element, 'show-dialog', {
      dialogTag: 'edit-master-dialog',
      dialogImport: () => import('../dialogs/edit-master-dialog'),
      dialogParams: {},
    });
  }

  private async toggleEnableMaster(ev: Event) {
    const target = ev.target as HTMLInputElement;
    let enabled = target.checked;
    if (!enabled) {
      const automations = Object.values(this.automations).filter(e => !e.area).length;
      if (automations) {
        const result = await new Promise(resolve => {
          fireEvent(target, 'show-dialog', {
            dialogTag: 'confirm-delete-dialog',
            dialogImport: () => import('../dialogs/confirm-delete-dialog'),
            dialogParams: {
              title: localize('panels.general.dialogs.disable_master.title', this.hass!.language),
              description: localize(
                'panels.general.dialogs.disable_master.description',
                this.hass!.language,
                ['{automations}'],
                [String(automations)]
              ),
              cancel: () => resolve(false),
              confirm: () => resolve(true),
            },
          });
        });
        if (!result) {
          enabled = true;
          target.checked = true;
        }
      }
    }

    this.data = {
      ...this.data!,
      master: {
        ...this.data!.master!,
        enabled: enabled,
      },
    };
  }

  saveClick(ev: Event) {
    if (!this.hass || !this.data) return;
    saveConfig(this.hass, this.data)
      .catch(e => handleError(e, ev))
      .then();
  }

  static styles = commonStyle;
}
