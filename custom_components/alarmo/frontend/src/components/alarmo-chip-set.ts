import { LitElement, html, TemplateResult, css, CSSResultGroup } from 'lit';
import { property, customElement } from 'lit/decorators.js';

import './alarmo-chip';
import { HomeAssistant } from '../types';

@customElement('alarmo-chip-set')
export class AlarmoChipSet extends LitElement {

  @property({ attribute: false })
  hass!: HomeAssistant;

  @property({ attribute: false })
  items?: { name: string; value?: string; icon?: string; badge?: any }[];

  @property({ attribute: false })
  value: string[] = [];

  @property({ type: Boolean })
  selectable?: boolean;

  @property({ type: Boolean })
  toggleable?: boolean;

  @property({ type: Boolean })
  removable?: boolean;

  protected render(): TemplateResult {
    if (!this.items) return html``;

    return html`
      ${Object.values(this.items).map(
        e => html`
          <alarmo-chip
            .hass=${this.hass}
            .value=${e.value || e.name}
            .icon=${e.icon}
            ?active=${this.value.includes(e.value || e.name)}
            .badge=${e.badge !== undefined ? String(e.badge) : undefined}
            ?selectable=${this.selectable}
            ?toggleable=${this.toggleable}
            ?removable=${this.removable}
            @click=${this._handleClick}
            @icon-clicked=${this._handleClick}
          >
            ${e.name}
          </alarmo-chip>
        `
      )}
    `;
  }

  private _handleClick(ev: CustomEvent) {
    if(this.toggleable) {
      const value = ev.detail.value;
      const active = ev.detail.active;
      if (this.value.includes(value) && !active) this.value = this.value.filter(e => e != value);
      else if (!this.value.includes(value) && value) this.value = [...this.value, value];
      const myEvent = new CustomEvent('value-changed', { detail: this.value });
      this.dispatchEvent(myEvent);
    }
    else {
      const myEvent = new CustomEvent('value-changed', { detail: ev.detail.value });
      this.dispatchEvent(myEvent);
    }
  }

  static get styles(): CSSResultGroup {
    return css`
      :host {
        display: flex;
        flex-direction: row;
        flex: 1;
        margin: 0px -4px;
        flex-wrap: wrap;
      }
    `;
  }
}
