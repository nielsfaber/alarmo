import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { Path } from '../../common/navigation';
import { commonStyle } from '../../styles';
import { HomeAssistant } from '../../types';

import '../general/area-config-card.ts';

@customElement('alarm-view-areas')
export class AlarmViewAreas extends LitElement {
  @property()
  hass?: HomeAssistant;

  @property()
  narrow!: boolean;

  @property()
  path!: Path;

  render() {
    if (!this.hass) return html``;

    return html`
      <area-config-card .hass=${this.hass} .narrow=${this.narrow} .path=${this.path}></area-config-card>
    `;
  }

  static styles = commonStyle;
}
