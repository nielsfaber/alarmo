import { LitElement, html, customElement, property } from 'lit-element';
import { HomeAssistant, navigate, computeEntity, computeDomain } from 'custom-card-helpers';
import { commonStyle } from '../styles';
import { localize } from '../../localize/localize';

import '../components/alarmo-multi-select';
import '../components/alarmo-multi-entity-select';
import '../components/alarmo-select';

import { triggerOptions, defaultAutomationData, ActionDomains, validateData } from '../data/actions';
import { AlarmoAutomation, EAlarmStates, EArmModes, Action, AlarmoArea, Dictionary } from '../types';
import { fetchAutomations, deleteAutomation, saveAutomation, fetchAreas } from '../data/websockets';
import { handleError, omit, Unique, showErrorDialog } from '../helpers';

@customElement('automation-editor-card')
export class AutomationEditorCard extends LitElement {
  hass!: HomeAssistant;
  @property() narrow!: boolean;

  @property() item?: string;
  @property() data?: AlarmoAutomation;

  @property() yamlMode = false;
  @property() namePlaceholder = "";

  yamlCode?: Object;
  @property() areas: Dictionary<AlarmoArea> = {};

  async firstUpdated() {
    const areas = await fetchAreas(this.hass);
    this.areas = areas;

    const automations = await fetchAutomations(this.hass);

    if (this.item) {
      if (automations[this.item] && !automations[this.item].is_notification) this.data = omit(automations[this.item], ['automation_id', 'is_notification', 'enabled']) as AlarmoAutomation;
      else this.data = { ...defaultAutomationData };
    } else {
      this.data = { ...defaultAutomationData };
      let name = `My notification`;
      const automations = await fetchAutomations(this.hass);
      if (Object.values(automations).find(e => e.name == name)) {
        let i = 2;
        while (Object.values(automations).find(e => e.name == `${name} ${i}`)) i++;
        name = `${name} ${i}`;
      }
      this.namePlaceholder = name;
      if (!this.data.area && Object.keys(areas).length == 1) this.data = { ...this.data, area: Object.keys(this.areas)[0] };
    }
  }

  render() {
    if (!this.data) return html``;
    return html`
<ha-card>
  <div class="card-header">
    <div class="name">
      ${localize("panels.actions.cards.new_action.title", this.hass.language)}
    </div>
    <ha-icon-button
      icon="hass:close"
      @click=${this.cancelClick}
    >
    </ha-icon-button>
  </div>
  <div class="card-content">
      ${localize("panels.actions.cards.new_action.description", this.hass.language)}
  </div>

  <div style="text-align: right; padding: 0px 16px 16px 16px">
    <mwc-button @click=${this.toggleYaml}>
      ${this.yamlMode
        ? localize("components.editor.ui_mode", this.hass.language)
        : localize("components.editor.yaml_mode", this.hass.language)
      }
    </mwc-button>
  </div>

  ${
      this.yamlMode
        ?
        html`
      <ha-yaml-editor
        .label="Label"
        .name="Data"  
        .defaultValue=${this.data}
        @value-changed=${(ev: CustomEvent) => { this.yamlCode = ev.detail.value }}
      >
      </ha-yaml-editor>
    `
        :
        html`

  <settings-row .narrow=${this.narrow} .large=${true}>
    <span slot="heading">${localize("panels.actions.cards.new_action.fields.event.heading", this.hass.language)}</span>
    <span slot="description">${localize("panels.actions.cards.new_action.fields.event.description", this.hass.language)}</span>

    <alarmo-select
      .hass=${this.hass}
      .items=${triggerOptions(this.hass)}
      label=${localize("panels.actions.cards.new_action.fields.event.heading", this.hass.language)}
      icons=${true}
      .value=${this.data.triggers.map(trigger => triggerOptions(this.hass).find(e => JSON.stringify(e.trigger) == JSON.stringify(trigger))!.value)[0]}
      @value-changed=${(ev: Event) => this.updateTriggers((ev.target as HTMLInputElement).value)}
    >
    </alarmo-select>

  </settings-row>

  ${this.areas && Object.keys(this.areas).length > 1
            ? html`
  <settings-row .narrow=${this.narrow}>
    <span slot="heading">${localize("panels.actions.cards.new_action.fields.area.heading", this.hass.language)}</span>
    <span slot="description">${localize("panels.actions.cards.new_action.fields.area.description", this.hass.language)}</span>

    <alarmo-select
      .items=${Object.values(this.areas).map(e => Object({ value: e.area_id, name: e.name }))}
      value=${this.data.area || ""}
      clearable=${true}
      label=${localize("panels.sensors.cards.editor.fields.area.heading", this.hass.language)}
      @value-changed=${(ev: Event) => this.data = { ...this.data!, area: (ev.target as HTMLInputElement).value }}
    </alarmo-select>
  </settings-row>`
            : ''
          }

  <div class="separator"></div>

  <settings-row .narrow=${this.narrow}>
    <span slot="heading">${localize("panels.actions.cards.new_action.fields.mode.heading", this.hass.language)}</span>
    <span slot="description">${localize("panels.actions.cards.new_action.fields.mode.description", this.hass.language)}</span>

    <alarmo-multi-select
      label=${localize("panels.actions.cards.new_action.fields.mode.heading", this.hass.language)}
      ?disabled=${!this.data.triggers.length || this.data.triggers.some(e => e.state && e.state == EAlarmStates.Disarmed)}
      .options=${this.getModeList()}
      .value=${this.data.modes || []}
      @change=${(ev: Event) => this.updateModes((ev.target as HTMLInputElement).value as unknown as EArmModes[])}
    </alarmo-multi-select>

  </settings-row>

  <settings-row .narrow=${this.narrow} .large=${true}>
    <span slot="heading">${localize("panels.actions.cards.new_action.fields.entity.heading", this.hass.language)}</span>
    <span slot="description">${localize("panels.actions.cards.new_action.fields.entity.description", this.hass.language)}</span>

    <alarmo-multi-entity-select
      .hass=${this.hass}
      .includeDomains=${ActionDomains}
      .value=${this.getEntityValues()}
      @change=${(ev: Event) => this.updateEntities((ev.target as HTMLInputElement).value as unknown as string[])}
    ></alarmo-multi-entity-select>
  </settings-row>

  <settings-row .narrow=${this.narrow}>
    <span slot="heading">${localize("panels.actions.cards.new_action.fields.action.heading", this.hass.language)}</span>
    <span slot="description">${localize("panels.actions.cards.new_action.fields.action.description", this.hass.language)}</span>
    <div>
    <mwc-button
      class="${this.getAction() == 'turn_on' ? 'active' : ''}"
      @click=${() => { this.updateAction('turn_on') }}
      >
        ${localize("panels.actions.cards.new_action.fields.action.turn_on", this.hass.language)}
      </mwc-button>
    <mwc-button
      class="${this.getAction() == 'turn_off' ? 'active' : ''}"
      @click=${() => { this.updateAction('turn_off') }}
    >
      ${localize("panels.actions.cards.new_action.fields.action.turn_off", this.hass.language)}
    </mwc-button>
    </div>
  </settings-row>

  <settings-row .narrow=${this.narrow} .large=${true}>
    <span slot="heading">${localize("panels.actions.cards.new_action.fields.name.heading", this.hass.language)}</span>
    <span slot="description">${localize("panels.actions.cards.new_action.fields.name.description", this.hass.language)}</span>

    <paper-input
      label="${localize("panels.actions.cards.new_action.fields.name.heading", this.hass.language)}"
      placeholder=""
      value=${this.data.name}
      @change=${(ev: Event) => this.data = { ...this.data!, name: (ev.target as HTMLInputElement).value }}
    >
    </paper-input>
  </settings-row>

  `}
        
  <div class="card-actions">
    <mwc-button @click=${this.saveClick}>
      ${this.hass.localize("ui.common.save")}
    </mwc-button>

  ${this.item
        ? html`
    <mwc-button
      class="warning"
      @click=${this.deleteClick}
    >
      ${this.hass.localize("ui.common.delete")}
    </mwc-button>`
        :
        ''
      }
  </div>
</ha-card>
    `;
  }

  private getEntityValues() {
    return this.data?.actions.map(e => e.service_data?.entity_id).filter(e => e);
  }

  private getModeList() {
    const modes = this.data?.area
      ? Object.entries(this.areas[this.data.area].modes)
        .filter(([, v]) => v.enabled)
        .map(([k]) => k as EArmModes)
      : Object.values(this.areas)
        .map(e => Object.entries(e.modes)
          .filter(([, v]) => v.enabled)
          .map(([k]) => k as EArmModes)
        )
        .reduce((a, b) => a.filter(i => b.includes(i)));

    return modes.map(e => Object({ name: localize(`common.modes_long.${e}`, this.hass.language), value: e }));
  }

  private updateTriggers(value: string) {
    this.data = {
      ...this.data!,
      triggers: [
        triggerOptions(this.hass).find(e => e.value == value)!.trigger
      ]
    };
  }

  private updateModes(value: EArmModes[]) {
    this.data = { ...this.data!, modes: value };
  }

  private updateEntities(entities: string[]) {
    const action = this.getAction();
    let actions: Action[] = [...this.data?.actions || []];
    entities.forEach((entity, i) => {
      if (i < actions.length && computeDomain(actions[i].service || actions[i].service_data?.entity_id || "") == computeDomain(entity[i])) {
        actions[i] = {
          ...actions[i],
          service_data: {
            ...actions[i].service_data,
            entity_id: entity
          }
        };
      } else if (i < actions.length) {
        actions[i] = {
          service: action ? computeDomain(entity) + "." + action : "",
          service_data: {
            entity_id: entity
          }
        }
      } else {
        actions.push({
          service: action ? computeDomain(entity) + "." + action : "",
          service_data: {
            entity_id: entity
          }
        });
      }
    });
    this.data = { ...this.data!, actions: actions };
  }

  private getAction() {
    const list = this.data?.actions.map(e => computeEntity(e.service)).filter(e => e) || [];
    return Unique(list).length == 1 ? list[0] : "";
  }

  private updateAction(value: string) {
    this.data = {
      ...this.data!,
      actions: this.data!.actions.map(e => Object({ ...e, service: (computeDomain(e.service_data?.entity_id || "") || "homeassistant") + "." + value }))
    };
  }

  private deleteClick(ev: Event) {
    if (!this.item) return;
    deleteAutomation(this.hass, this.item)
      .catch(e => handleError(e, ev))
      .then(() => { this.cancelClick() });
  } z

  private saveClick(ev: Event) {
    let data = this.yamlMode ? { ...this.yamlCode } as AlarmoAutomation : this.data!;
    data = {
      ...data,
      name: data.name || this.namePlaceholder
    };
    const error = validateData(data, this.hass);
    if (error) {
      showErrorDialog(ev, error);
      return;
    }

    if (this.item) data = { ...data, automation_id: this.item };

    saveAutomation(this.hass, data)
      .catch(e => handleError(e, ev))
      .then(() => { this.cancelClick() });
  }

  private toggleYaml() {
    if (!this.data) return;
    this.yamlMode = !this.yamlMode;
    if (!this.yamlMode && this.yamlCode) {
      this.data = { ...this.yamlCode } as AlarmoAutomation;
    } else {
      this.yamlCode = { ...this.data };
    }
  }

  private cancelClick() {
    navigate(this, "/alarmo/actions", true);
  }

  static styles = commonStyle;
}
