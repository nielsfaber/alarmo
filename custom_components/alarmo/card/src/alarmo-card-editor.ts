import { LitElement, html, customElement, property, CSSResult, css, internalProperty, PropertyValues, TemplateResult } from 'lit-element';
import { HomeAssistant, LovelaceCardEditor, fireEvent } from 'custom-card-helpers';
import { CardConfig } from './types';
import { localize } from './localize/localize';


@customElement('alarmo-card-editor')
export class AlarmoCardEditor extends LitElement implements LovelaceCardEditor {
  @property({ attribute: false }) public hass?: HomeAssistant;
  @internalProperty() private _config?: Partial<CardConfig>;

  public setConfig(config?: Partial<CardConfig>): void {
    this._config = { ...config };
  }

  get _entity(): string {
    return this._config!.entity || "";
  }

  protected render(): TemplateResult {
    if (!this._config || !this.hass) return html``;

    return html`
      <div class="card-config">
        <ha-entity-picker
          .label="${this.hass.localize("ui.panel.lovelace.editor.card.generic.entity")} (${this.hass.localize("ui.panel.lovelace.editor.card.config.required")})"
          .hass=${this.hass}
          .value="${this._entity}"
          .includeDomains=${["alarm_control_panel"]}
          @change=${(ev: Event) => this._updateConfig("entity", (ev.target as HTMLInputElement).value)}
          allow-custom-entity
        ></ha-entity-picker>
      </div>
    `;
  }

  private _updateConfig(property: string, value: any) {
    this._config = {
      ...this._config,
      [property]: value
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