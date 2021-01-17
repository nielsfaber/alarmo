import { LitElement, html, customElement, property } from 'lit-element';
import { HomeAssistant } from 'custom-card-helpers';

import '../components/time-slider';
import '../components/alarmo-select';
import { commonStyle } from '../styles';
import { localize } from '../../localize/localize';
import { AlarmoModeConfig, AlarmoConfig, EArmModes, Dictionary, AlarmoArea } from '../types';
import { fetchAreas, saveArea } from '../data/websockets';
import { handleError } from '../helpers';
import { SubscribeMixin } from '../subscribe-mixin';
import { UnsubscribeFunc } from 'home-assistant-js-websocket';
import { EArmModeIcons } from '../const';

@customElement('alarm-mode-card')
export class AlarmModeCard extends SubscribeMixin(LitElement) {

  @property() hass!: HomeAssistant;
  @property() narrow!: boolean;
  @property() currentTab: number = 0;

  @property() config!: AlarmoConfig;
  @property() areas!: Dictionary<AlarmoArea>;
  @property() data!: Record<EArmModes, AlarmoModeConfig>;

  @property() selectedArea!: string;

  public hassSubscribe(): Promise<UnsubscribeFunc>[] {
    this._fetchData();
    return [
      this.hass!.connection.subscribeEvents(
        () => this._fetchData(),
        "alarmo_updated"
      ),
    ];
  }

  private async _fetchData(): Promise<void> {
    if (!this.hass) {
      return;
    }
    this.areas = await fetchAreas(this.hass);
  }

  async firstUpdated() {
    this.areas = await fetchAreas(this.hass);
    this.selectedArea = Object.keys(this.areas)[0];
    this.data = { ...this.areas[this.selectedArea].modes };
  }

  render() {
    if (!this.data) return html``;
    const mode = Object.values(EArmModes)[this.currentTab];
    return html`
      <ha-card>
        <div class="card-header">
          <div class="name">
            ${localize("panels.general.cards.modes.title", this.hass.language)}
          </div>

          ${Object.keys(this.areas).length > 1
        ? html`
              <alarmo-select
            .items=${Object.values(this.areas).map(e => Object({ value: e.area_id, name: e.name }))}
            value=${this.selectedArea}
            label=${this.hass.localize("ui.components.area-picker.area")}
            @value-changed=${(ev: Event) => this.selectArea((ev.target as HTMLInputElement).value)}

              </alarmo-select>
              ` : ''}

        </div>
        <div class="card-content">
          ${localize("panels.general.cards.modes.description", this.hass.language)}
        </div>

        <mwc-tab-bar
          .activeIndex=${this.currentTab}
          @MDCTabBar:activated=${(ev: CustomEvent) => this.currentTab = Number(ev.detail.index)}
        >
          ${Object.entries(EArmModes)
        .map(([k, v]) => html`
          <mwc-tab
            label="${localize(`common.modes_short.${v}`, this.hass.language)}"
            hasImageIcon
            stacked
            class="${this.data[v].enabled ? "" : "disabled"}"
          >
            <ha-icon icon="${EArmModeIcons[k]}" slot="icon"></ha-icon>
          </mwc-tab>
          `)
      }
        </mwc-tab-bar>

        <settings-row .narrow=${this.narrow} .large=${true}>
          <span slot="heading">${localize(`common.modes_long.${mode}`, this.hass.language)}</span>
          <span slot="description">${localize(`panels.general.cards.modes.fields.mode.${mode}`, this.hass.language)}</span>

          <div style="display: flex; margin: 10px 0px; justify-content: center; width: 100%">
            <mwc-button
              class="${this.data[mode].enabled ? "active" : ""}"
              @click=${() => this.data = { ...this.data, [mode]: { ...this.data[mode], enabled: true } }}
            >
              ${localize("panels.general.cards.modes.fields.mode.enabled", this.hass.language)}
            </mwc-button>
            <mwc-button
              class="${this.data[mode].enabled ? "" : "active"}"
              @click=${() => this.data = { ...this.data, [mode]: { ...this.data[mode], enabled: false } }}
            >
              ${localize("panels.general.cards.modes.fields.mode.disabled", this.hass.language)}
            </mwc-button>
          </div>
        </settings-row>

        ${this.data[mode].enabled ? html`

        <settings-row .narrow=${this.narrow}>
          <span slot="heading">${localize("panels.general.cards.modes.fields.exit_delay.heading", this.hass.language)}</span>
          <span slot="description">${localize("panels.general.cards.modes.fields.exit_delay.description", this.hass.language)}</span>
          <time-slider
            .hass=${this.hass}
            unit="sec"
            max="180"
            zeroValue=${localize("components.time_slider.none", this.hass.language)}
            value=${this.data[mode].exit_time || 0}
            @change=${(ev: Event) => this.data = { ...this.data, [mode]: { ...this.data[mode], exit_time: Number((ev.target as HTMLInputElement).value) } }}
          >
          </time-slider>
        </settings-row>

        <settings-row .narrow=${this.narrow}>
          <span slot="heading">${localize("panels.general.cards.modes.fields.entry_delay.heading", this.hass.language)}</span>
          <span slot="description">${localize("panels.general.cards.modes.fields.entry_delay.description", this.hass.language)}</span>
          <time-slider
            .hass=${this.hass}
            unit="sec"
            max="180"
            zeroValue=${localize("components.time_slider.none", this.hass.language)}
            value=${this.data[mode].entry_time || 0}
            @change=${(ev: Event) => this.data = { ...this.data, [mode]: { ...this.data[mode], entry_time: Number((ev.target as HTMLInputElement).value) } }}
          >
          </time-slider>
        </settings-row>

        <settings-row .narrow=${this.narrow}>
          <span slot="heading">${localize("panels.general.cards.modes.fields.trigger_time.heading", this.hass.language)}</span>
          <span slot="description">${localize("panels.general.cards.modes.fields.trigger_time.description", this.hass.language)}</span>
          <time-slider
            .hass=${this.hass}
            unit="min"
            max="3600"
            zeroValue=${localize("components.time_slider.infinite", this.hass.language)}
            value=${this.data[mode].trigger_time || 0}
            @change=${(ev: Event) => this.data = { ...this.data, [mode]: { ...this.data[mode], trigger_time: Number((ev.target as HTMLInputElement).value) } }}          >
          </time-slider>
        </settings-row>

        ` : ''}

        <div class="card-actions">
          <mwc-button @click=${this.saveClick}>
            ${this.hass.localize("ui.common.save")}
          </mwc-button>
        </div>
      </ha-card>
    `
  }

  selectArea(area_id: string) {
    if (area_id == this.selectedArea) return;
    this.selectedArea = area_id;
    this.data = { ...this.areas[area_id].modes };
  }

  saveClick(ev: Event) {
    saveArea(this.hass, { area_id: this.selectedArea, modes: this.data })
      .catch(e => handleError(e, ev))
      .then(() => { });
  }

  static styles = commonStyle;
}
