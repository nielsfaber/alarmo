import { LitElement, html } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { HomeAssistant } from 'custom-card-helpers';
import { loadHaForm } from '../../load-ha-form';

import './sensor-editor-card.ts';
import './sensors-overview-card.ts';
import './add-sensors-card.ts';

@customElement('alarm-view-sensors')
export class AlarmViewSensors extends LitElement {

  @property()
  hass?: HomeAssistant;

  @property()
  narrow!: boolean;

  @property()
  path!: string[] | null;

  @property()
  selectedArea?: string;

  firstUpdated() {
    (async () => await loadHaForm())();

    if (this.path && this.path.length == 2 && this.path[0] == 'filter') this.selectedArea = this.path[1];
  }

  render() {
    if (!this.hass) return html``;
    if (this.path && this.path.length == 2 && this.path[0] == 'edit') {
      return html`
        <sensor-editor-card .hass=${this.hass} .narrow=${this.narrow} .item=${this.path[1]}> </sensor-editor-card>
      `;
    } else {
      return html`
        <sensors-overview-card
          .hass=${this.hass}
          .narrow=${this.narrow}
          .selectedArea=${this.selectedArea}
        >
        </sensors-overview-card>
        <add-sensors-card
          .hass=${this.hass}
          .narrow=${this.narrow}
        >
        </add-sensors-card>
      `;
    }
  }
}
