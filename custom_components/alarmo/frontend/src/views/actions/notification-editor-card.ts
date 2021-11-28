import { LitElement, html, TemplateResult, CSSResultGroup, css } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { HomeAssistant, navigate, computeDomain } from 'custom-card-helpers';
import { AlarmoAutomation, EAlarmEvent, EArmModes, AlarmoArea, Dictionary, AutomationAction, AlarmoConfig } from '../../types';

import { handleError, omit, showErrorDialog, isDefined } from '../../helpers';
import { saveAutomation, fetchAreas, fetchConfig, deleteAutomation } from '../../data/websockets';
import { localize } from '../../../localize/localize';
import { computeEventDisplay, computeAreaDisplay, computeArmModeDisplay, getAreaOptions, getArmModeOptions, computeServiceDisplay, getNotifyServices, getWildcardOptions, isValidString, isString, isObject, getOpenSensorsWildCardOptions, getArmModeWildCardOptions } from '../../data/actions';

import '../../components/alarmo-selector';
import '../../components/alarmo-select';
import { EAutomationTypes } from '../../const';

enum ViewMode {
  Yaml,
  UI,
}

@customElement('notification-editor-card')
export class NotificationEditorCard extends LitElement {

  @property({ attribute: false })
  public hass!: HomeAssistant;

  @property()
  narrow!: boolean;

  @property()
  config: AlarmoAutomation = {
    type: EAutomationTypes.Notification,
    triggers: [{}],
    actions: [{}]
  };

  @property()
  item?: AlarmoAutomation;

  @property()
  areas!: Dictionary<AlarmoArea>;

  @property()
  alarmoConfig?: AlarmoConfig;

  @property()
  viewMode = ViewMode.UI;

  @property()
  errors: Dictionary<boolean> = {};

  async firstUpdated() {
    this.areas = await fetchAreas(this.hass);
    this.alarmoConfig = await fetchConfig(this.hass);

    if (this.item) {
      let actions = this.item.actions.map(e => omit(e, 'entity_id'));
      this.config = { ...this.item, actions: [actions[0], ...actions.slice(1)] };
      if (this.config.triggers.length > 1) this.config = { ...this.config, triggers: [this.config.triggers[0]] };

      let area = this.config.triggers[0].area;
      if (isDefined(area) && !getAreaOptions(this.areas, this.alarmoConfig).includes(area)) area = undefined;
      else if (area === null) area = 0;
      this._setArea(new CustomEvent('value-changed', { detail: { value: area } }));
    }

    //automatically set area if there is only 1 option
    if (!isDefined(this.config.triggers[0].area)) {
      const areaOptions = getAreaOptions(this.areas, this.alarmoConfig);
      if (areaOptions.length == 1) this._setArea(new CustomEvent('value-changed', { detail: { value: areaOptions[0] } }));
      else if (areaOptions.includes(0)) this._setArea(new CustomEvent('value-changed', { detail: { value: 0 } }));
    }
  }

  protected render(): TemplateResult {
    if (!this.hass || !this.areas || !this.alarmoConfig) return html``;
    return html`
      <div class="heading">
        <ha-icon-button icon="hass:close" @click=${this._cancelClick} class="icon">
          <ha-icon icon="hass:close"></ha-icon>
        </ha-icon-button>
        <div class="header">${localize('panels.actions.cards.new_notification.title', this.hass.language)}</div>
        <div class="description">${localize('panels.actions.cards.new_notification.description', this.hass.language)}</div>
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
          <settings-row .narrow=${this.narrow} .large=${true}>
            <span slot="heading">
              ${localize('panels.actions.cards.new_action.fields.area.heading', this.hass.language)}
            </span>
            <span slot="description">
              ${localize('panels.actions.cards.new_action.fields.area.description', this.hass.language)}
            </span>
            
            <alarmo-select
              .hass=${this.hass}
              .items=${getAreaOptions(this.areas, this.alarmoConfig!).map(e => computeAreaDisplay(e, this.areas, this.alarmoConfig!))}
              clearable=${true}
              label=${localize('panels.actions.cards.new_action.fields.area.heading', this.hass.language)}
              .value=${this.config.triggers[0].area}
              @value-changed=${this._setArea}
              ?invalid=${this.errors.area}
            ></alarmo-select>
          </settings-row>
          ` : ''}

          <settings-row .narrow=${this.narrow} .large=${true} last>
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
              ${localize('panels.actions.cards.new_notification.fields.target.heading', this.hass.language)}
            </span>
            <span slot="description">
              ${localize('panels.actions.cards.new_notification.fields.target.description', this.hass.language)}
            </span>
    
            <alarmo-select
              .hass=${this.hass}
              .items=${computeServiceDisplay(this.hass, ...getNotifyServices(this.hass))}
              ?disabled=${!getNotifyServices(this.hass).length}
              label=${localize('panels.actions.cards.new_notification.fields.target.heading', this.hass.language)}
              icons=${true}
              .value=${this.config.actions[0].service}
              @value-changed=${this._setService}
              ?invalid=${this.errors.service}
              allow-custom-value
            ></alarmo-select>
          </settings-row>
    
          <settings-row .narrow=${this.narrow}>
            <span slot="heading">
              ${localize('panels.actions.cards.new_notification.fields.title.heading', this.hass.language)}
            </span>
            <span slot="description">
              ${localize('panels.actions.cards.new_notification.fields.title.description', this.hass.language)}
            </span>
    
            <paper-input
              label="${localize('panels.actions.cards.new_notification.fields.title.heading', this.hass.language)}"
              .value=${this.config.actions[0].service_data?.title}
              @value-changed=${this._setTitle}
              ?invalid=${this.errors.title}
            ></paper-input>
          </settings-row>
    
          <settings-row .narrow=${this.narrow} .large=${true} last>
            <span slot="heading">
              ${localize('panels.actions.cards.new_notification.fields.message.heading', this.hass.language)}
            </span>
            <span slot="description">
              ${localize('panels.actions.cards.new_notification.fields.message.description', this.hass.language)}
            </span>
    
            <paper-textarea
              id="message"
              label="${localize('panels.actions.cards.new_notification.fields.message.heading', this.hass.language)}"
              placeholder=${this._messagePlaceholder()}
              .value=${this.config.actions[0].service_data?.message}
              @value-changed=${this._setMessage}
              ?invalid=${this.errors.message}
            ></paper-textarea>
    
            ${this.config.triggers[0].event
            ? html`
            <div style="margin-top: 10px">
              <span style="padding-right: 10px">
                ${localize('panels.actions.cards.new_notification.fields.message.insert_wildcard', this.hass.language)}:
              </span>
              <alarmo-chips
                .items=${getWildcardOptions(this.config.triggers[0].event, this.alarmoConfig)}
                @value-changed=${(ev: CustomEvent) => this._insertWildCard(ev.detail.value)}
              ></alarmo-chips>
            </div>`
            : ''}

          </settings-row>

            ${this._getOpenSensorsFormat() !== null ? html`

            <settings-row .narrow=${this.narrow} .large=${true}>
              <span slot="heading">
                ${localize('panels.actions.cards.new_notification.fields.open_sensors_format.heading', this.hass.language)}
              </span>

              <span slot="description">
                ${localize('panels.actions.cards.new_notification.fields.open_sensors_format.description', this.hass.language)}
              </span>

              <alarmo-select
                .items=${getOpenSensorsWildCardOptions(this.hass)}
                .value=${this._getOpenSensorsFormat(true)}
                @value-changed=${this._setOpenSensorsFormat}
              >

              </alarmo-select>
            </settings-row>
            ` : ''}

            ${this._getArmModeFormat() !== null && (
            getArmModeWildCardOptions(this.hass).length > 1 ||
            (getArmModeWildCardOptions(this.hass).length == 1 && getArmModeWildCardOptions(this.hass)[0].value != this._getArmModeFormat())
          ) ? html`

            <settings-row .narrow=${this.narrow} .large=${true}>
              <span slot="heading">
                ${localize('panels.actions.cards.new_notification.fields.arm_mode_format.heading', this.hass.language)}
              </span>

              <span slot="description">
                ${localize('panels.actions.cards.new_notification.fields.arm_mode_format.description', this.hass.language)}
              </span>

              <alarmo-select
                .items=${getArmModeWildCardOptions(this.hass)}
                .value=${this._getArmModeFormat(true)}
                @value-changed=${this._setArmModeFormat}
              >

              </alarmo-select>
            </settings-row>
            ` : ''}
        `
        : html`
          <h2>${localize('components.editor.edit_in_yaml', this.hass.language)}</h2>
  
          <ha-yaml-editor
            .defaultValue=${this.config.actions[0] || ""}
            @value-changed=${this._setYaml}
          ></ha-yaml-editor>

          ${this.errors.service || this.errors.title || this.errors.message
            ? html`
          <span class="error-message">
            ${this.hass.localize('ui.errors.config.key_missing', 'key', Object.entries(this.errors).find(([k, v]) => v && ['service', 'title', 'message'].includes(k))![0])}
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
              ${localize('panels.actions.cards.new_notification.fields.name.heading', this.hass.language)}
            </span>
            <span slot="description">
              ${localize('panels.actions.cards.new_notification.fields.name.description', this.hass.language)}
            </span>

            <paper-input
              label="${localize('panels.actions.cards.new_notification.fields.name.heading', this.hass.language)}"
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
    const armModes = getArmModeOptions(value, this.areas!);

    if (!triggerConfig[0].modes?.length)
      this._setModes(new CustomEvent('value-changed', { detail: { value: armModes } }));
    else
      this._setModes(new CustomEvent('value-changed', { detail: { value: triggerConfig[0].modes.filter(e => armModes.includes(e)) } }));

    this.config = { ...this.config, triggers: triggerConfig };
    if (Object.keys(this.errors).includes('area')) this._validateConfig();
  }

  private _setModes(ev: CustomEvent) {
    ev.stopPropagation();
    const value = ev.detail.value as EArmModes[0];
    let triggerConfig = this.config.triggers;
    Object.assign(triggerConfig, { [0]: { ...triggerConfig[0], modes: value } });
    this.config = { ...this.config, triggers: triggerConfig };
    if (Object.keys(this.errors).includes('modes')) this._validateConfig();
  }

  private _setService(ev: CustomEvent) {
    ev.stopPropagation();
    const value = String(ev.detail.value);
    let actionConfig = this.config.actions;
    Object.assign(actionConfig, { [0]: { ...actionConfig[0], service: value, ...omit(actionConfig[0], 'service') } });
    this.config = { ...this.config, actions: actionConfig };
    if (Object.keys(this.errors).includes('service')) this._validateConfig();
  }

  private _setTitle(ev: CustomEvent) {
    ev.stopPropagation();
    const value = String(ev.detail.value);
    let actionConfig = this.config.actions;
    Object.assign(actionConfig, { [0]: { ...actionConfig[0], service: actionConfig[0].service || '', service_data: { ...actionConfig[0].service_data || {}, title: value } } });
    this.config = { ...this.config, actions: actionConfig };
    if (Object.keys(this.errors).includes('title')) this._validateConfig();
  }

  private _setMessage(ev: CustomEvent) {
    ev.stopPropagation();
    const value = String(ev.detail.value);
    let actionConfig = this.config.actions;
    Object.assign(actionConfig, { [0]: { ...actionConfig[0], service: actionConfig[0].service || '', service_data: { ...actionConfig[0].service_data || {}, message: value } } });
    this.config = { ...this.config, actions: actionConfig };
    if (Object.keys(this.errors).includes('message')) this._validateConfig();
  }

  private _setName(ev: CustomEvent) {
    ev.stopPropagation();
    const value = String(ev.detail.value);
    this.config = { ...this.config, name: value };
  }

  private _setYaml(ev: CustomEvent): void {
    const value = ev.detail.value;
    let output: Partial<AutomationAction> = {};

    if (isString(value?.service))
      output = { ...output, service: String(value.service) };

    if (isObject(value?.service_data))
      output = { ...output, service_data: value.service_data };

    if (Object.keys(output).length) this.config = {
      ...this.config,
      actions: Object.assign(this.config.actions,
        { [0]: { ...this.config.actions[0], ...output } }
      )
    };

    if (Object.keys(this.errors).some(e => ['service', 'message', 'title'].includes(e))) this._validateConfig();
  }

  private _validateConfig() {
    this.errors = {};

    const data = this._parseAutomation();
    const triggerConfig = data.triggers[0];
    if (!triggerConfig.event || !Object.values(EAlarmEvent).includes(triggerConfig.event))
      this.errors = { ...this.errors, event: true };
    if (!isDefined(triggerConfig.area) || !getAreaOptions(this.areas, this.alarmoConfig!).includes(triggerConfig.area))
      this.errors = { ...this.errors, area: true };
    if (!triggerConfig.modes?.every(e => getArmModeOptions(triggerConfig.area, this.areas!).includes(e)))
      this.errors = { ...this.errors, modes: true };

    const actionConfig = data.actions[0];
    if (!actionConfig.service || (!getNotifyServices(this.hass).includes(actionConfig.service) && computeDomain(actionConfig.service) != 'script'))
      this.errors = { ...this.errors, service: true };

    if (!isValidString(actionConfig.service_data?.message))
      this.errors = { ...this.errors, message: true };

    // title is optional
    // if (!isValidString(actionConfig.service_data?.title))
    //   this.errors = { ...this.errors, title: true };

    if (!isValidString(data.name))
      this.errors = { ...this.errors, name: true };

    return !Object.values(this.errors).length;
  }

  private _validAction() {
    const data = this._parseAutomation();
    const actionConfig = data.actions[0];
    return (
      actionConfig.service &&
      (computeDomain(actionConfig.service) == 'script' || getNotifyServices(this.hass).includes(actionConfig.service)) &&
      isValidString(actionConfig.service_data?.message)
    );
  }

  private _insertWildCard(value: string) {
    const field = this.shadowRoot!.querySelector("#message") as HTMLInputElement | undefined;
    if (field) field.focus();
    let message = this.config.actions[0].service_data?.message || "";
    message = field && field.selectionStart !== null && field.selectionEnd !== null
      ? message.substring(0, field.selectionStart) + value + message.substring(field.selectionEnd, message.length)
      : message + value;
    this._setMessage(new CustomEvent('value-changed', { detail: { value: message } }));
  }

  private _toggleYamlMode() {
    this.viewMode = this.viewMode == ViewMode.UI
      ? ViewMode.Yaml
      : ViewMode.UI;

    if (this.viewMode == ViewMode.Yaml)
      this.config = {
        ...this.config, actions: Object.assign(this.config.actions,
          {
            [0]: {
              ...this.config.actions[0],
              service: this.config.actions[0].service || '',
              service_data: {
                ...this.config.actions[0].service_data || {},
                title: this.config.actions[0].service_data?.title || '',
                message: this.config.actions[0].service_data?.message || '',
              }
            }
          }
        )
      };
  }

  private _namePlaceholder() {
    const event = this.config.triggers[0].event;
    const domain = this.config.actions[0].service ? computeDomain(this.config.actions[0].service) : null;
    const target = computeServiceDisplay(this.hass, this.config.actions[0].service);
    if (!event || domain != 'notify' || !target.length) return "";
    else return localize(`panels.actions.cards.new_notification.fields.name.placeholders.${event}`, this.hass.language, '{target}', target[0].name);
  }

  private _messagePlaceholder() {
    const event = this.config.triggers[0].event;
    if (!event) return "";
    else return localize(`panels.actions.cards.new_notification.fields.message.placeholders.${event}`, this.hass.language);
  }

  private _parseAutomation() {
    let data = { ...this.config };
    let action = data.actions[0];

    //fill in message placeholder
    if (
      !isValidString(action.service_data?.message) &&
      this.viewMode == ViewMode.UI &&
      this._messagePlaceholder()
    ) {
      action = { ...action, service_data: { ...action.service_data, message: this._messagePlaceholder() } };
      Object.assign(data, { actions: Object.assign(data.actions, { [0]: action }) });
    }


    //fill in name placeholder
    if (!isValidString(data.name) && this._namePlaceholder())
      data = { ...data, name: this._namePlaceholder() };

    return data;
  }

  private _getOpenSensorsFormat(forceResult = false): null | string {
    const message = this.config.actions[0].service_data?.message || '';
    const res = message.match(/{{open_sensors(\|[^}]+)?}}/);
    if (res !== null) return res[0];
    else return forceResult ? '{{open_sensors}}' : null;
  }

  private _setOpenSensorsFormat(ev: CustomEvent) {
    ev.stopPropagation();
    const value = String(ev.detail.value);
    let message = this.config.actions[0].service_data?.message || '';
    message = message.replace(/{{open_sensors(\|[^}]+)?}}/, value);

    let actionConfig = this.config.actions;
    Object.assign(actionConfig, { [0]: { ...actionConfig[0], service: actionConfig[0].service || '', service_data: { ...actionConfig[0].service_data || {}, message: message } } });
    this.config = { ...this.config, actions: actionConfig };
  }

  private _getArmModeFormat(forceResult = false): null | string {
    const message = this.config.actions[0].service_data?.message || '';
    const res = message.match(/{{arm_mode(\|[^}]+)?}}/);
    if (res !== null) return res[0];
    else return forceResult ? '{{arm_mode}}' : null;
  }

  private _setArmModeFormat(ev: CustomEvent) {
    ev.stopPropagation();
    const value = String(ev.detail.value);
    let message = this.config.actions[0].service_data?.message || '';
    message = message.replace(/{{arm_mode(\|[^}]+)?}}/, value);

    let actionConfig = this.config.actions;
    Object.assign(actionConfig, { [0]: { ...actionConfig[0], service: actionConfig[0].service || '', service_data: { ...actionConfig[0].service_data || {}, message: message } } });
    this.config = { ...this.config, actions: actionConfig };
  }

  private _saveClick(ev: Event) {
    if (!this._validateConfig()) return;
    let data = this._parseAutomation();

    //keep modes array empty if all modes are selected 
    if (getArmModeOptions(data.triggers[0].area, this.areas!).every(e => data.triggers[0].modes?.includes(e))) {
      data = { ...data, triggers: Object.assign(data.triggers, { [0]: { ...data.triggers[0], modes: [] } }) };
    }

    if (this.item) data = { ...data, automation_id: this.item.automation_id };

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
    const action = data.actions[0];
    const [domain, service] = action.service!.split('.');

    let message = action.service_data!.message;
    message = message.replace('{{open_sensors|format=short}}', 'Some Example Sensor');
    message = message.replace(/{{open_sensors(\|[^}]+)?}}/, 'Some Example Sensor is open');
    message = message.replace('{{bypassed_sensors}}', 'Some Bypassed Sensor');
    message = message.replace(/{{arm_mode(\|[^}]+)?}}/, 'Armed away');
    message = message.replace('{{changed_by}}', 'Some Example User');

    this.hass
      .callService(domain, service, {
        ...action.service_data,
        message: message
      })
      .then()
      .catch(e => {
        showErrorDialog(ev, e.message);
        return;
      });
  }

  private _cancelClick() {
    navigate(this, '/alarmo/actions', true);
  }

  static get styles(): CSSResultGroup {
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