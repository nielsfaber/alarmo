import { LitElement, html, customElement, property } from 'lit-element';
import { HomeAssistant, navigate } from 'custom-card-helpers';
import { commonStyle } from '../styles';
import { localize } from '../../localize/localize';

import '../components/alarmo-multi-select';
import '../components/alarmo-select';


import { triggerOptions, targetOptions, defaultNotificationData, messagePlaceHolder, validateData } from '../data/actions';
import { AlarmoNotification, EArmModes, EAlarmStates, Dictionary, AlarmoArea, EAlarmEvents } from '../types';
import { fetchAutomations, deleteAutomation, saveAutomation, fetchConfig, fetchAreas } from '../data/websockets';
import { handleError, omit, showErrorDialog } from '../helpers';

@customElement('notification-editor-card')
export class NotificationEditorCard extends LitElement {
  hass!: HomeAssistant;
  @property() narrow!: boolean;

  @property() item?: string;
  @property() data?: AlarmoNotification;

  @property() yamlMode = false;
  @property() namePlaceholder = "";

  yamlCode?: Object;
  @property() areas: Dictionary<AlarmoArea> = {};

  async firstUpdated() {
    const areas = await fetchAreas(this.hass);
    this.areas = areas;

    const automations = await fetchAutomations(this.hass);

    if (this.item) {
      if (automations[this.item] && automations[this.item].is_notification) this.data = omit(automations[this.item], ['automation_id', 'is_notification', 'enabled']) as AlarmoNotification;
      else this.data = { ...defaultNotificationData };
    } else {
      this.data = { ...defaultNotificationData };
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
      ${localize("panels.actions.cards.new_notification.title", this.hass.language)}
    </div>
    <ha-icon-button
      icon="hass:close"
      @click=${this.cancelClick}
    >
    </ha-icon-button>
  </div>
  <div class="card-content">
      ${localize("panels.actions.cards.new_notification.description", this.hass.language)}
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
    <span slot="heading">${localize("panels.actions.cards.new_notification.fields.event.heading", this.hass.language)}</span>
    <span slot="description">${localize("panels.actions.cards.new_notification.fields.event.description", this.hass.language)}</span>

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
    <span slot="heading">${localize("panels.actions.cards.new_notification.fields.mode.heading", this.hass.language)}</span>
    <span slot="description">${localize("panels.actions.cards.new_notification.fields.mode.description", this.hass.language)}</span>

    <alarmo-multi-select
      label=${localize("panels.actions.cards.new_notification.fields.mode.heading", this.hass.language)}
      ?disabled=${!this.data.triggers.length || this.data.triggers.some(e => e.state && e.state == EAlarmStates.Disarmed)}
      .options=${this.getModeList()}
      .value=${this.data.modes || []}
      @change=${(ev: Event) => this.updateModes((ev.target as HTMLInputElement).value as unknown as EArmModes[])}
    </alarmo-multi-select>

  </settings-row>
  
  <settings-row .narrow=${this.narrow}>
    <span slot="heading">${localize("panels.actions.cards.new_notification.fields.title.heading", this.hass.language)}</span>
    <span slot="description">${localize("panels.actions.cards.new_notification.fields.title.description", this.hass.language)}</span>

    <paper-input
      label="${localize("panels.actions.cards.new_notification.fields.title.heading", this.hass.language)}"
      placeholder=""
      value=${this.data.actions[0].service_data.title || ""}
      @change=${(ev: Event) => this.updateTitle((ev.target as HTMLInputElement).value)}
    >
    </paper-input>
  </settings-row>

    <settings-row .narrow=${this.narrow} .large=${true}>
    <span slot="heading">${localize("panels.actions.cards.new_notification.fields.message.heading", this.hass.language)}</span>
    <span slot="description">${localize("panels.actions.cards.new_notification.fields.message.description", this.hass.language)}</span>

    <paper-textarea
      label="${localize("panels.actions.cards.new_notification.fields.message.heading", this.hass.language)}"
      placeholder=${messagePlaceHolder(this.data)}
      value=${this.data.actions[0].service_data.message || ""}
      @blur=${(ev: Event) => { this.updateMessage((ev.target as HTMLInputElement).value) }}
    >
    </paper-textarea>
  </settings-row>

  <settings-row .narrow=${this.narrow}>
    <span slot="heading">${localize("panels.actions.cards.new_notification.fields.target.heading", this.hass.language)}</span>
    <span slot="description">${localize("panels.actions.cards.new_notification.fields.target.description", this.hass.language)}</span>

    <alarmo-multi-select
      label=${localize("panels.actions.cards.new_notification.fields.target.heading", this.hass.language)}
      .options=${this.getTargetList()}
      .value=${this.data.actions.map(action => action.service)}
      @change=${(ev: Event) => this.updateTargets((ev.target as HTMLInputElement).value as unknown as string[])}
    </alarmo-multi-select>
  </settings-row>

  <settings-row .narrow=${this.narrow} .large=${true}>
    <span slot="heading">${localize("panels.actions.cards.new_notification.fields.name.heading", this.hass.language)}</span>
    <span slot="description">${localize("panels.actions.cards.new_notification.fields.name.description", this.hass.language)}</span>

    <paper-input
      label="${localize("panels.actions.cards.new_notification.fields.name.heading", this.hass.language)}"
      placeholder=${this.namePlaceholder}
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

  private getTargetList() {
    return [
      ...Object.values(targetOptions(this.hass)),
      , ...this.data!.actions
        .filter(action => !targetOptions(this.hass).find(e => e.value == action.service))
        .map(e => Object({ value: e.service }))
    ];
  }

  private getModeList() {
    const modes = this.data?.area
      ? this.areas[this.data.area]
        ? Object.entries(this.areas[this.data.area].modes)
          .filter(([, v]) => v.enabled)
          .map(([k]) => k as EArmModes)
        : []
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

  private updateTitle(value: string) {
    this.data = {
      ...this.data!,
      actions: this.data!.actions.map(action => Object(
        {
          ...action,
          service_data: {
            ...action.service_data,
            title: value
          }
        }
      ))
    }
  }

  private updateMessage(value: string) {
    this.data = {
      ...this.data!,
      actions: this.data!.actions.map(action => Object(
        {
          ...action,
          service_data: {
            ...action.service_data,
            message: value
          }
        }
      ))
    }
  }

  private updateTargets(value: string[]) {
    this.data = {
      ...this.data!,
      actions: value.map(e => Object(
        {
          service: e,
          service_data: { ...this.data!.actions[0].service_data }
        }
      ))
    };
  }

  private deleteClick(ev: Event) {
    if (!this.item) return;
    deleteAutomation(this.hass, this.item)
      .catch(e => handleError(e, ev))
      .then(() => { this.cancelClick() });
  }


  private async saveClick(ev: Event) {
    let data = this.yamlMode ? { ...this.yamlCode } as AlarmoNotification : this.data!;
    data = {
      ...data,
      is_notification: true,
      actions: data.actions.map(action => {
        if (action.service_data && (!action.service_data.message || !action.service_data.message.length)) {
          return {
            ...action,
            service_data: {
              ...action.service_data,
              message: messagePlaceHolder(data)
            }
          }
        }
        else return action;
      }),
      name: data.name || this.namePlaceholder,
      area: data.area || ""
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
      this.data = { ...this.yamlCode } as AlarmoNotification;
    }
    else {
      this.yamlCode = { ...this.data };
    }
  }

  private cancelClick() {
    navigate(this, "/alarmo/actions", true);
  }

  static styles = commonStyle;
}
