import { LitElement, html, TemplateResult, css, CSSResultGroup } from 'lit';
import { property, customElement } from 'lit/decorators.js';

import './alarmo-chip';

@customElement('alarmo-chip-set')
export class AlarmoChipSet extends LitElement {
  @property()
  items?: { name: string; value: string; badge?: number }[];

  @property()
  value: string[] = [];

  @property({ type: Boolean })
  selectable?: boolean;

  protected render(): TemplateResult {
    if (!this.items) return html``;

    return html`
      ${Object.values(this.items).map(
        e => html`
          <alarmo-chip
            value="${e.value}"
            ?checked=${this.value.includes(e.value)}
            .badge=${e.badge}
            ?selectable=${this.selectable}
            ?checkmark=${this.selectable}
            clickable
            @value-changed=${this._itemChanged}
          >
            ${e.name}
          </alarmo-chip>
        `
      )}
    `;
  }

  private _itemChanged(ev: CustomEvent) {
    const value = (ev.target as HTMLInputElement).checked;
    const key = String(ev.detail);
    if(this.selectable) {
      if (this.value.includes(key) && !value) this.value = this.value.filter(e => e != key);
      else if (!this.value.includes(key) && value) this.value = [...this.value, key];
      const myEvent = new CustomEvent('value-changed', { detail: this.value });
      this.dispatchEvent(myEvent);
    }
    else {
      const myEvent = new CustomEvent('value-changed', { detail: key });
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
