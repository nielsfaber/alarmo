import { LitElement, html, customElement, property, CSSResult, css, internalProperty, PropertyValues, TemplateResult } from 'lit-element';
import { HomeAssistant, LovelaceCardEditor, fireEvent } from 'custom-card-helpers';
import { CardConfig } from './types';


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
          @change=${this._entityChanged}
          allow-custom-entity
        ></ha-entity-picker>
    `;
  }

  private _entityChanged(ev: Event): void {
    if (!this._config || !this.hass) return;
    const target = ev.target as HTMLInputElement;
    if (target.value === "") {
    this._config = { ...this._config };
    delete this._config["entity"];
    } else {
        this._config = {
            ...this._config,
            ["entity"]: target.value,
        };
    }
    fireEvent(this, "config-changed", { config: this._config });
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "alarmo-card-editor": AlarmoCardEditor;
  }
}