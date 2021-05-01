import { LitElement, html, customElement, property, CSSResult, css, internalProperty, TemplateResult } from 'lit-element';
import { HomeAssistant, LovelaceCardEditor, fireEvent } from 'custom-card-helpers';
import { AlarmoEntity, CardConfig } from './types';
import { localize } from './localize/localize';
import { FORMAT_NUMBER, maxButtonScale, minButtonScale } from './const';


@customElement('alarmo-card-editor')
export class AlarmoCardEditor extends LitElement implements LovelaceCardEditor {
  @property({ attribute: false }) public hass?: HomeAssistant;
  @internalProperty() private _config?: Partial<CardConfig>;

  public setConfig(config?: Partial<CardConfig>): void {
    this._config = { ...config };
  }

  protected render(): TemplateResult {
    if (!this._config || !this.hass) return html``;
    const stateObj = this._config!.entity ? this.hass.states[this._config!.entity] as AlarmoEntity : undefined;

    return html`
      <div class="card-config">
        <ha-entity-picker
          .label="${this.hass.localize("ui.panel.lovelace.editor.card.generic.entity")} (${this.hass.localize("ui.panel.lovelace.editor.card.config.required")})"
          .hass=${this.hass}
          .value="${this._config!.entity || ""}"
          .includeDomains=${["alarm_control_panel"]}
          @change=${(ev: Event) => this._updateConfig("entity", (ev.target as HTMLInputElement).value)}
          allow-custom-entity
        ></ha-entity-picker>
        ${
          stateObj
          && (stateObj.attributes.code_arm_required !== stateObj.attributes.code_disarm_required)
        ? html`
        <ha-formfield
          .label=${localize("editor.keep_keypad_visible", this.hass.language)}
        >
          <ha-switch
            .checked=${this._config!.keep_keypad_visible}
            @change=${(ev: Event) => this._updateConfig("keep_keypad_visible", (ev.target as HTMLInputElement).checked)}
          ></ha-switch
        ></ha-formfield>`
        : ''
        }
        <ha-formfield
          .label=${localize("editor.button_scale", this.hass.language)}
        >
          <ha-slider
            value=${this._config!.button_scale || 1}
            @change=${(ev: Event) => this._updateConfig("button_scale", Number((ev.target as HTMLInputElement).value))}
            min="${minButtonScale}"
            max="${maxButtonScale}"
            step="0.1"
            pin
          ></ha-slider>
        </ha-formfield>
      </div>
    `;
  }

  private _updateConfig(property: string, value: any) {
    if(!this.hass) return;
    this._config = {
      ...this._config,
      [property]: value
    }
    if(property == "entity") {
      const stateObj = this._config!.entity ? this.hass.states[this._config!.entity] as AlarmoEntity : undefined;
      if(!stateObj
      || (stateObj.attributes.code_arm_required == stateObj.attributes.code_disarm_required)
      ) this._config = {
        ...this._config,
        keep_keypad_visible: false
      }
    }
    fireEvent(this, "config-changed", { config: this._config });
  }

  static get styles(): CSSResult {
    return css`
      ha-formfield {
        padding: 20px 0px;
      }
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "alarmo-card-editor": AlarmoCardEditor;
  }
}