import { HomeAssistant, navigate, computeDomain, computeEntity } from 'custom-card-helpers';
import { css, CSSResult, customElement, html, LitElement, property, TemplateResult } from 'lit-element';
import { AlarmoAutomation, EAlarmEvent, EArmModes, AlarmoArea, Dictionary, AutomationAction, AlarmoConfig } from '../../types';

import { handleError, isDefined, Unique, omit, showErrorDialog } from '../../helpers';
import { saveAutomation, fetchAreas, fetchConfig, deleteAutomation } from '../../data/websockets';
import { localize } from '../../../localize/localize';
import { computeEventDisplay, computeAreaDisplay, computeArmModeDisplay, getAreaOptions, getArmModeOptions, getAutomationEntities, computeEntityDisplay, isValidString, isValidEntity, isValidService, isObject, isString, isArray } from '../../data/actions';


import '../../components/alarmo-selector';
import '../../components/alarmo-select';
import { EAutomationTypes } from '../../const';

enum ViewMode {
  Yaml,
  UI,
}

@customElement('automation-editor-card')
export class AutomationEditorCard extends LitElement {

  @property({ attribute: false })
  public hass!: HomeAssistant;

  @property()
  narrow!: boolean;

  @property()
  config: AlarmoAutomation = {
    type: EAutomationTypes.Action,
    triggers: [{}],
    actions: [{}],
  };

  @property()
  item?: AlarmoAutomation;

  @property()
  areas!: Dictionary<AlarmoArea>;

  @property()
  alarmoConfig!: AlarmoConfig;

  @property()
  viewMode = ViewMode.UI;

  @property()
  errors: Dictionary<boolean> = {};

  async firstUpdated() {
    this.areas = await fetchAreas(this.hass);
    this.alarmoConfig = await fetchConfig(this.hass);

    if (this.item) {
      let actions = this.item.actions.map(e => e.entity_id ? e : omit(e, 'entity_id'));
      this.config = { ...this.item, actions: [actions[0], ...actions.slice(1)] };
      if (this.config.triggers.length > 1) this.config = { ...this.config, triggers: [this.config.triggers[0]] };
      if (!this.config.triggers[0].modes?.length) this._setModes(new CustomEvent('value-changed', { detail: { value: getArmModeOptions(this.config.triggers[0].area, this.areas) } }));
      let areaConfig = this.config.triggers[0].area;
      if (!getAreaOptions(this.areas, this.alarmoConfig).includes(areaConfig || 0)) this._setArea(new CustomEvent('value-changed', { detail: { value: undefined } }));
      else if (areaConfig === null) this._setArea(new CustomEvent('value-changed', { detail: { value: 0 } }));
    }

    //automatically set area if there is only 1 option
    if (!isDefined(this.config.triggers[0].area)) {
      const areaOptions = getAreaOptions(this.areas, this.alarmoConfig);
      if (areaOptions.length == 1) this._setArea(new CustomEvent('value-changed', { detail: { value: areaOptions[0] } }));
      else if (areaOptions.includes(0)) this._setArea(new CustomEvent('value-changed', { detail: { value: 0 } }));
    }
  }

  protected render(): TemplateResult {
    if (!this.hass || !this.areas) return html``;
    return html`
      <div class="heading">
        <ha-icon-button icon="hass:close" @click=${this._cancelClick} class="icon"></ha-icon-button>
        <div class="header">${localize('panels.actions.cards.new_action.title', this.hass.language)}</div>
        <div class="description">${localize('panels.actions.cards.new_action.description', this.hass.language)}</div>
      </div>
      <div class="section-header">${localize('panels.actions.cards.new_notification.trigger', this.hass.language)}</div>
      <ha-card>
        <div class="card-content">
          <settings-row .narrow=${this.narrow} .large=${true} first>
            <span slot="heading">
              ${localize('panels.actions.cards.new_notification.fields.event.heading', this.hass.language)}
            </span>
            <span slot="description">
              ${localize('panels.actions.cards.new_notification.fields.event.description', this.hass.language)}
            </span>

            <alarmo-select
              .hass=${this.hass}
              .items=${Object.values(EAlarmEvent).map(e => computeEventDisplay(e, this.hass))}
              label=${localize('panels.actions.cards.new_action.fields.event.heading', this.hass.language)}
              icons=${true}
              .value=${this.config.triggers[0].event}
              @value-changed=${this._setEvent}
              ?invalid=${this.errors.event}
            ></alarmo-select>
          </settings-row>

          ${Object.keys(this.areas).length > 1
        ? html`
          <settings-row .narrow=${this.narrow}>
            <span slot="heading">
              ${localize('panels.actions.cards.new_action.fields.area.heading', this.hass.language)}
            </span>
            <span slot="description">
              ${localize('panels.actions.cards.new_action.fields.area.description', this.hass.language)}
            </span>
            
            <alarmo-select
              .hass=${this.hass}
              .items=${getAreaOptions(this.areas, this.alarmoConfig).map(e => computeAreaDisplay(e, this.areas, this.alarmoConfig))}
              clearable=${true}
              label=${localize('panels.actions.cards.new_action.fields.area.heading', this.hass.language)}
              .value=${this.config.triggers[0].area}
              @value-changed=${this._setArea}
              ?invalid=${this.errors.area}
            ></alarmo-select>
          </settings-row>
          ` : ''}

          <settings-row .narrow=${this.narrow}>
            <span slot="heading">
              ${localize('panels.actions.cards.new_notification.fields.mode.heading', this.hass.language)}
            </span>
            <span slot="description">
              ${localize('panels.actions.cards.new_notification.fields.mode.description', this.hass.language)}
            </span>

            <alarmo-selector
              .hass=${this.hass}
              .items=${getArmModeOptions(this.config.triggers[0].area, this.areas).map(e => computeArmModeDisplay(e, this.hass))}
              label=${localize('panels.actions.cards.new_action.fields.mode.heading', this.hass.language)}
              .value=${this.config.triggers[0].modes || []}
              @value-changed=${this._setModes}
              ?invalid=${this.errors.modes}
            ></alarmo-selector>
          </settings-row>
        </div>
      </ha-card>
  
      <div class="section-header">${localize('panels.actions.cards.new_notification.action', this.hass.language)}</div>
      <ha-card>
        <div class="card-content">
          ${this.viewMode == ViewMode.UI
        ? html`
          <settings-row .narrow=${this.narrow} .large=${true} first>
            <span slot="heading">
              ${localize('panels.actions.cards.new_action.fields.entity.heading', this.hass.language)}
            </span>
            <span slot="description">
              ${localize('panels.actions.cards.new_action.fields.entity.description', this.hass.language)}
            </span>
    
            <alarmo-selector
              .hass=${this.hass}
              .items=${computeEntityDisplay(getAutomationEntities(this.hass), this.hass)}
              ?disabled=${!getAutomationEntities(this.hass).length}
              label=${localize('panels.actions.cards.new_action.fields.entity.heading', this.hass.language)}
              .value=${Unique(this.config.actions.map(e => e.entity_id).filter(isDefined)) || []}
              @value-changed=${this._setEntity}
              ?invalid=${this.errors.entity_id}
            ></alarmo-selector>
          </settings-row>
        
          <settings-row .narrow=${this.narrow}>
            <span slot="heading">
              ${localize('panels.actions.cards.new_action.fields.action.heading', this.hass.language)}
            </span>
            <span slot="description">
              ${localize('panels.actions.cards.new_action.fields.action.description', this.hass.language)}
            </span>
            
            <div>
              <mwc-button
                class="${this.config.actions.map(e => e.service).every(e => e?.includes('turn_on')) ? 'active' : ''}"
                @click=${() => this._setAction('turn_on')}
                ?invalid=${this.errors.service}
              >
                ${localize('panels.actions.cards.new_action.fields.action.turn_on', this.hass.language)}
              </mwc-button>
              <mwc-button
                class="${this.config.actions.map(e => e.service).every(e => e?.includes('turn_off')) ? 'active' : ''}"
                @click=${() => this._setAction('turn_off')}
                ?invalid=${this.errors.service}
              >
                ${localize('panels.actions.cards.new_action.fields.action.turn_off', this.hass.language)}
              </mwc-button>
            </div>

          </settings-row>
        `
        : html`
          <h2>${localize('components.editor.edit_in_yaml', this.hass.language)}</h2>
  
          <ha-yaml-editor
            .defaultValue=${this.config.actions || ""}
            @value-changed=${this._setYaml}
          ></ha-yaml-editor>

        ${this.errors.service || this.errors.entity_id
            ? html`
          <span class="error-message">
            ${this.hass.localize('ui.errors.config.key_missing', 'key', Object.entries(this.errors).find(([k, v]) => v && ['service', 'entity_id'].includes(k))![0])}
          </span>
        ` : ''}
          `}
        </div>

        <div class="toggle-button">
          <mwc-button @click=${this._toggleYamlMode}>
            <ha-icon icon="hass:shuffle-variant"></ha-icon>
            ${this.viewMode == ViewMode.Yaml ? localize('components.editor.ui_mode', this.hass.language) : localize('components.editor.yaml_mode', this.hass.language)}
          </mwc-button>
        </div>

        <div class="card-actions">
          <mwc-button trailingIcon ?disabled=${!this._validAction()} @click=${this._testClick}>
            ${localize('panels.actions.cards.new_notification.actions.test', this.hass.language)}
            <ha-icon icon="hass:arrow-right"></ha-icon>
          </mwc-button>
        </div>
      </ha-card>

      <div class="section-header">${localize('panels.actions.cards.new_notification.options', this.hass.language)}</div>
      <ha-card>
        <div class="card-content">
          <settings-row .narrow=${this.narrow} .large=${true} first>
            <span slot="heading">
              ${localize('panels.actions.cards.new_action.fields.name.heading', this.hass.language)}
            </span>
            <span slot="description">
              ${localize('panels.actions.cards.new_action.fields.name.description', this.hass.language)}
            </span>

            <paper-input
              label="${localize('panels.actions.cards.new_action.fields.name.heading', this.hass.language)}"
              placeholder=${this._namePlaceholder()}
              .value=${this.config.name}
              @value-changed=${this._setName}
              ?invalid=${this.errors.name}
            ></paper-input>
          </settings-row>

        ${this.item?.automation_id
        ? html`
          <settings-row .narrow=${this.narrow}>
          <span slot="heading">
            ${localize('panels.actions.cards.new_notification.fields.delete.heading', this.hass.language)}
          </span>
          <span slot="description">
            ${localize('panels.actions.cards.new_notification.fields.delete.description', this.hass.language)}
          </span>
          <div>
            <mwc-button class="warning" outlined @click=${this._deleteClick}>
              <ha-icon icon="hass:trash-can-outline"></ha-icon>
              ${this.hass.localize('ui.common.delete')}
            </mwc-button>
          </div>
          </settings-row>
        ` : ''}
        </div>
      </ha-card>

      <div class="actions">
        <mwc-button raised @click=${this._saveClick} style="width: 100%" class="save-button">
          <ha-icon icon="hass:content-save-outline"></ha-icon>
          ${this.hass.localize('ui.common.save')}
        </mwc-button>
      </div>
    `;
  }

  private _setEvent(ev: CustomEvent) {
    ev.stopPropagation();
    const value = ev.detail.value as EAlarmEvent;
    let triggerConfig = this.config.triggers;
    Object.assign(triggerConfig, { [0]: { ...triggerConfig[0], event: value } });
    this.config = { ...this.config, triggers: triggerConfig };
    if (Object.keys(this.errors).includes('event')) this._validateConfig();
  }

  private _setArea(ev: CustomEvent) {
    ev.stopPropagation();
    const value = ev.detail.value;
    let triggerConfig = this.config.triggers;
    Object.assign(triggerConfig, { [0]: { ...triggerConfig[0], area: value } });
    this.config = { ...this.config, triggers: triggerConfig };

    if (!this.config.triggers[0].modes?.length)
      this._setModes(new CustomEvent('value-changed', { detail: { value: getArmModeOptions(value, this.areas) } }));

    if (Object.keys(this.errors).includes('area')) this._validateConfig();
  }

  private _setModes(ev: CustomEvent) {
    ev.stopPropagation();
    const value = ev.detail.value as EArmModes[0];
    const triggerConfig = this.config.triggers;
    Object.assign(triggerConfig, { [0]: { ...triggerConfig[0], modes: value } });
    this.config = { ...this.config, triggers: triggerConfig };
    if (Object.keys(this.errors).includes('service')) this._validateConfig();
  }

  private _setEntity(ev: CustomEvent) {
    ev.stopPropagation();
    const value = ev.detail.value as string[];
    let actionConfig = this.config.actions;

    //assign service for added entity if it is in common
    let serviceSetting: string | null = null;
    if (value.length > actionConfig.length && actionConfig.map(e => e.service).every(e => e?.includes('turn_on'))) serviceSetting = 'turn_on';
    if (value.length > actionConfig.length && actionConfig.map(e => e.service).every(e => e?.includes('turn_off'))) serviceSetting = 'turn_off';

    if (actionConfig.length > value.length)
      actionConfig = [actionConfig[0], ...actionConfig.slice(1, value.length)];

    if (!value.length) Object.assign(actionConfig, { [0]: omit(actionConfig[0], 'entity_id') });

    value.forEach((entity, i) => {
      let action = actionConfig.length > i ? { ...actionConfig[i] } : {};
      action = { ...action, entity_id: entity };
      Object.assign(actionConfig, { [i]: action });
    });

    this.config = { ...this.config, actions: actionConfig };
    if (serviceSetting) this._setAction(serviceSetting);
    if (Object.keys(this.errors).includes('entity_id')) this._validateConfig();
  }

  private _setAction(action: string) {
    let actionConfig = this.config.actions;

    actionConfig.forEach((e, i) => {
      const domain = e.entity_id ? computeDomain(e.entity_id) : 'homeassistant';
      Object.assign(actionConfig, { [i]: { service: `${domain}.${action}`, ...omit(e, 'service') } });
    });
    this.config = { ...this.config, actions: actionConfig };
  }

  private _setName(ev: CustomEvent) {
    ev.stopPropagation();
    const value = String(ev.detail.value);
    this.config = { ...this.config, name: value };
  }

  private _setYaml(ev: CustomEvent): void {
    let value = ev.detail.value;

    let actionConfig: [AutomationAction, ...AutomationAction[]] = [{}];

    if (isObject(value)) value = [value];

    if (isArray(value)) {
      value.forEach((entry, i) => {
        let output: Partial<AutomationAction> = {};

        if (isObject(entry) && isString(entry.service))
          output = { ...output, service: entry.service };
        if (isObject(entry) && isString(entry.entity_id))
          output = { ...output, entity_id: entry.entity_id };
        if (isObject(entry) && isObject(entry.service_data))
          output = { ...output, service_data: entry.service_data };

        Object.assign(actionConfig, { [i]: output });
      });
      this.config = { ...this.config, actions: actionConfig };
    }
  }

  private _validateConfig() {
    this.errors = {};
    const data = this._parseAutomation();

    const triggerConfig = data.triggers[0];
    if (!triggerConfig.event || !Object.values(EAlarmEvent).includes(triggerConfig.event))
      this.errors = { ...this.errors, event: true };
    if (!isDefined(triggerConfig.area) || !getAreaOptions(this.areas, this.alarmoConfig).includes(triggerConfig.area))
      this.errors = { ...this.errors, area: true };
    if (!triggerConfig.modes?.every(e => getArmModeOptions(triggerConfig.area, this.areas!).includes(e)))
      this.errors = { ...this.errors, modes: true };

    const services = data.actions.map(e => e.service);
    if (!services.length || !services.every(e => isValidService(e, this.hass)))
      this.errors = { ...this.errors, service: true };

    let entities = data.actions.map(e => e.entity_id);
    if (this.viewMode == ViewMode.Yaml) entities = entities.filter(isDefined);
    if (!data.actions.length || !entities.every(e => isValidEntity(e, this.hass)))
      this.errors = { ...this.errors, entity_id: true };

    if (!isValidString(data.name))
      this.errors = { ...this.errors, name: true };

    return !Object.values(this.errors).length;
  }

  private _validAction() {
    const data = this._parseAutomation();
    const services = data.actions.map(e => e.service);
    let entities = data.actions.map(e => e.entity_id);
    if (this.viewMode == ViewMode.Yaml) entities = entities.filter(isDefined);

    return (
      services.length &&
      services.every(e => isValidService(e, this.hass)) &&
      entities.every(e => isValidEntity(e, this.hass))
    );
  }

  private _toggleYamlMode() {
    this.viewMode = this.viewMode == ViewMode.UI ? ViewMode.Yaml : ViewMode.UI;
  }

  private _namePlaceholder() {
    if (!this._validAction) return "";
    const event = this.config.triggers[0].event;
    const entities = this.config.actions.map(e => e.entity_id).filter(isDefined) as string[];
    const entity = computeEntityDisplay(entities, this.hass).map(e => e.name).join(", ");
    const services = Unique(this.config.actions.map(e => e.service).filter(isDefined).map(e => computeEntity(e)));
    let state: string | undefined = undefined;
    if (services.length == 1 && services[0]?.includes("turn_on")) state = this.hass.localize("state.default.on");
    if (services.length == 1 && services[0]?.includes("turn_off")) state = this.hass.localize("state.default.off");
    if (!event || !entity || !state) return "";
    else return localize(`panels.actions.cards.new_action.fields.name.placeholders.${event}`, this.hass.language, ['{entity}', '{state}'], [entity, state]);
  }

  private _parseAutomation() {
    let data = { ...this.config };

    //fill in name placeholder
    if (
      !isValidString(data.name) &&
      this.viewMode == ViewMode.UI &&
      this._namePlaceholder()
    )
      data = { ...data, name: this._namePlaceholder() };

    return data;
  }

  private _saveClick(ev: Event) {
    if (!this._validateConfig()) return;
    let data = this._parseAutomation();

    //keep modes array empty if all modes are selected 
    if (getArmModeOptions(data.triggers[0].area, this.areas!).every(e => data.triggers[0].modes?.includes(e))) {
      data = { ...data, triggers: Object.assign(data.triggers, { [0]: { ...data.triggers[0], modes: [] } }) };
    }

    saveAutomation(this.hass, data)
      .catch(e => handleError(e, ev))
      .then(() => this._cancelClick());
  }

  private _deleteClick(ev: Event) {
    if (!this.item?.automation_id) return;
    deleteAutomation(this.hass, this.item.automation_id)
      .catch(e => handleError(e, ev))
      .then(() => this._cancelClick());
  }

  private _testClick(ev: Event) {
    const data = this._parseAutomation();
    data.actions.forEach(action => {
      const [domain, service] = action.service!.split('.');
      let serviceData = { ...action.service_data };
      if (action.entity_id) serviceData = { ...serviceData, entity_id: action.entity_id };
      this.hass
        .callService(domain, service, serviceData)
        .then()
        .catch(e => {
          showErrorDialog(ev, e.message);
          return;
        });
    });
  }

  private _cancelClick() {
    navigate(this, '/alarmo/actions', true);
  }

  static get styles(): CSSResult {
    return css`
      div.content {
        padding: 28px 20px 0;
        max-width: 1040px;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
      } 
      div.header {
        font-family: var(--paper-font-headline_-_font-family);
        -webkit-font-smoothing: var(
          --paper-font-headline_-_-webkit-font-smoothing
        );
        font-size: var(--paper-font-headline_-_font-size);
        font-weight: var(--paper-font-headline_-_font-weight);
        letter-spacing: var(--paper-font-headline_-_letter-spacing);
        line-height: var(--paper-font-headline_-_line-height);
        opacity: var(--dark-primary-opacity);
      }
      div.section-header {
        font-family: var(--paper-font-headline_-_font-family);
        -webkit-font-smoothing: var(
          --paper-font-headline_-_-webkit-font-smoothing
        );
        font-size: 18px;
        font-weight: var(--paper-font-headline_-_font-weight);
        letter-spacing: var(--paper-font-headline_-_letter-spacing);
        line-height: var(--paper-font-headline_-_line-height);
        opacity: var(--dark-primary-opacity);
        margin: 20px 0px 5px 10px;
      }
      div.actions {
        padding: 20px 0px 30px 0px;
      }
      mwc-button ha-icon {
        margin-right: 6px;
        --mdc-icon-size: 20px;
      }
      .toggle-button {
        position: absolute;
        right: 20px;
        top: 20px;
      }
      h2 {
        margin-top: 10px;
        font-size: var(--paper-font-headline_-_font-size);
        font-weight: var(--paper-font-headline_-_font-weight);
        letter-spacing: var(--paper-font-headline_-_letter-spacing);
      }
      span.error-message {
        color: var(--error-color);
      }
      mwc-button.warning {
        --mdc-theme-primary: var(--error-color);
      }
      mwc-button.save-button {
        --mdc-theme-primary: rgba(var(--rgb-primary-color), 0.8);
      }
      mwc-button.active {
        background: var(--primary-color);
        --mdc-theme-primary: var(--text-primary-color);
        border-radius: 4px;
      }
      div.heading {
        display: grid;
        grid-template-areas: 'header icon'
                             'description icon';
        grid-template-rows: 1fr 1fr;
        grid-template-columns: 1fr 48px;
        margin: 20px 0px 10px 10px;
      }
      div.heading .icon {
        grid-area: icon;
      }
      div.heading .header {
        grid-area: header;
      }
      div.heading .description {
        grid-area: description;
      }
    `;
  }
}