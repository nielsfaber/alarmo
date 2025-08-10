import { LitElement, html, TemplateResult, CSSResultGroup, css } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { mdiClose } from '@mdi/js';
import {
  AlarmoAutomation,
  EAlarmEvent,
  EArmModes,
  AlarmoArea,
  Dictionary,
  AutomationAction,
  AlarmoConfig,
  HomeAssistant,
} from '../../types';

import { handleError, omit, showErrorDialog, isDefined, computeName, computeDomain, navigate, prettyPrint } from '../../helpers';
import { saveAutomation, fetchAreas, fetchConfig, deleteAutomation } from '../../data/websockets';
import { localize } from '../../../localize/localize';
import {
  computeEventDisplay,
  computeAreaDisplay,
  computeArmModeDisplay,
  getAreaOptions,
  getArmModeOptions,
  computeServiceDisplay,
  getNotifyServices,
  getWildcardOptions,
  isValidString,
  isString,
  isObject,
  getOpenSensorsWildCardOptions,
  getArmModeWildCardOptions,
  computeEntityDisplay,
  getEntitiesByDomain,
} from '../../data/actions';

import { EAutomationTypes } from '../../const';
import { exportPath } from '../../common/navigation';
import { loadHaYamlEditor } from '../../load-ha-elements';

import '../../components/alarmo-selector';
import '../../components/alarmo-select';
import '../../components/alarmo-chip-set';

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
    actions: [{}],
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
    await loadHaYamlEditor();

    this.areas = await fetchAreas(this.hass);
    this.alarmoConfig = await fetchConfig(this.hass);

    if (this.item) {
      let actions = [...this.item.actions];
      this.config = { ...this.item, actions: [actions[0], ...actions.slice(1)] };
      if (this.config.actions[0].entity_id === null) Object.assign(this.config.actions, { [0]: omit(this.config.actions[0], 'entity_id') });
      if (this.config.triggers.length > 1) this.config = { ...this.config, triggers: [this.config.triggers[0]] };

      let area = this.config.triggers[0].area;
      if (isDefined(area) && !getAreaOptions(this.areas, this.alarmoConfig).includes(area)) area = undefined;
      else if (area === null) area = 0;
      this._setArea(new CustomEvent('value-changed', { detail: { value: area } }));
    }

    //automatically set area if there is only 1 option
    if (!isDefined(this.config.triggers[0].area)) {
      const areaOptions = getAreaOptions(this.areas, this.alarmoConfig);
      if (areaOptions.length == 1)
        this._setArea(new CustomEvent('value-changed', { detail: { value: areaOptions[0] } }));
      else if (areaOptions.includes(0)) this._setArea(new CustomEvent('value-changed', { detail: { value: 0 } }));
    }
  }

  protected render(): TemplateResult {
    if (!this.hass || !this.areas || !this.alarmoConfig) return html``;
    return html`
      <div class="heading">
        <ha-icon-button .path=${mdiClose} @click=${this._cancelClick} class="icon"></ha-icon-button>
        <div class="header">${localize('panels.actions.cards.new_notification.title', this.hass.language)}</div>
        <div class="description">
          ${localize('panels.actions.cards.new_notification.description', this.hass.language)}
        </div>
      </div>
      <div class="section-header">${localize('panels.actions.cards.new_notification.trigger', this.hass.language)}</div>
      <ha-card>
        <div class="card-content">
          <alarmo-settings-row .narrow=${this.narrow} .large=${true} first>
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
          </alarmo-settings-row>

          ${Object.keys(this.areas).length > 1
        ? html`
                <alarmo-settings-row .narrow=${this.narrow} .large=${true}>
                  <span slot="heading">
                    ${localize('panels.actions.cards.new_action.fields.area.heading', this.hass.language)}
                  </span>
                  <span slot="description">
                    ${localize('panels.actions.cards.new_action.fields.area.description', this.hass.language)}
                  </span>

                  <alarmo-select
                    .hass=${this.hass}
                    .items=${getAreaOptions(this.areas, this.alarmoConfig!).map(e =>
          computeAreaDisplay(e, this.areas, this.alarmoConfig!)
        )}
                    clearable=${true}
                    label=${localize('panels.actions.cards.new_action.fields.area.heading', this.hass.language)}
                    .value=${this.config.triggers[0].area}
                    @value-changed=${this._setArea}
                    ?invalid=${this.errors.area || (!this.config.triggers[0].area && !this.alarmoConfig.master.enabled)}
                  ></alarmo-select>
                </alarmo-settings-row>
              `
        : ''}

          <alarmo-settings-row .narrow=${this.narrow} .large=${true} last>
            <span slot="heading">
              ${localize('panels.actions.cards.new_notification.fields.mode.heading', this.hass.language)}
            </span>
            <span slot="description">
              ${localize('panels.actions.cards.new_notification.fields.mode.description', this.hass.language)}
            </span>

            <alarmo-selector
              .hass=${this.hass}
              .items=${getArmModeOptions(this.config.triggers[0].area, this.areas).map(e =>
          computeArmModeDisplay(e, this.hass)
        )}
              label=${localize('panels.actions.cards.new_action.fields.mode.heading', this.hass.language)}
              .value=${this.config.triggers[0].modes || []}
              @value-changed=${this._setModes}
              ?invalid=${this.errors.modes}
            ></alarmo-selector>
          </alarmo-settings-row>
        </div>
      </ha-card>

      <div class="section-header">${localize('panels.actions.cards.new_notification.action', this.hass.language)}</div>
      <ha-card>
        <div class="card-content">
          ${this.viewMode == ViewMode.UI
        ? html`
                <alarmo-settings-row .narrow=${this.narrow} .large=${true} first>
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
                    .value=${getNotifyServices(this.hass).find(e => e.entity_id == this.config.actions[0].entity_id && e.service == this.config.actions[0].service)?.entity_id || getNotifyServices(this.hass).find(e => e.service == this.config.actions[0].service)?.service || undefined}
                    @value-changed=${this._setService}
                    ?invalid=${this.errors.service}
                    allow-custom-value
                  ></alarmo-select>
                </alarmo-settings-row>

                ${!this.config.actions[0].service || computeDomain(this.config.actions[0].service) == 'notify'
            ? html`
                      <alarmo-settings-row .narrow=${this.narrow}>
                        <span slot="heading">
                          ${localize('panels.actions.cards.new_notification.fields.title.heading', this.hass.language)}
                        </span>
                        <span slot="description">
                          ${localize(
              'panels.actions.cards.new_notification.fields.title.description',
              this.hass.language
            )}
                        </span>

                        <ha-textfield
                          label="${localize(
              'panels.actions.cards.new_notification.fields.title.heading',
              this.hass.language
            )}"
                          .value=${this.config.actions[0].data?.title || ''}
                          @input=${this._setTitle}
                          ?invalid=${this.errors.title}
                        ></ha-textfield>
                      </alarmo-settings-row>
                    `
            : ''}
                ${this.config.actions[0].service && computeDomain(this.config.actions[0].service) == 'tts'
            ? html`
                      <alarmo-settings-row .narrow=${this.narrow} .large=${true} first>
                        <span slot="heading">
                          ${localize('panels.actions.cards.new_action.fields.entity.heading', this.hass.language)}
                        </span>
                        <span slot="description">
                          ${localize('panels.actions.cards.new_action.fields.entity.description', this.hass.language)}
                        </span>

                        <alarmo-select
                          .items=${computeEntityDisplay(this.config.actions[0].service == 'tts.speak' ? getEntitiesByDomain(this.hass, 'tts') : getEntitiesByDomain(this.hass, 'media_player', 'tts'), this.hass)}
                          label=${localize('panels.actions.cards.new_action.fields.entity.heading', this.hass.language)}
                          .value=${this.config.actions[0].data?.entity_id || ''}
                          @value-changed=${this._setEntity}
                          .icons=${true}
                          ?invalid=${this.errors.entity}
                        ></alarmo-select>
                      </alarmo-settings-row>
                    `
            : ''}

                  
                ${this.config.actions[0].service && this.config.actions[0].service == 'tts.speak'
            ? html`
                      <alarmo-settings-row .narrow=${this.narrow} .large=${true}>
                        <span slot="heading">
                          ${localize('panels.actions.cards.new_notification.fields.media_player_entity.heading', this.hass.language)}
                        </span>
                        <span slot="description">
                          ${localize('panels.actions.cards.new_notification.fields.media_player_entity.description', this.hass.language)}
                        </span>

                        <alarmo-select
                          .items=${computeEntityDisplay(getEntitiesByDomain(this.hass, 'media_player'), this.hass)}
                          label=${localize('panels.actions.cards.new_notification.fields.media_player_entity.heading', this.hass.language)}
                          .value=${this.config.actions[0].data?.media_player_entity_id || ''}
                          @value-changed=${this._setMediaPlayerEntity}
                          .icons=${true}
                          ?invalid=${this.errors.media_player_entity}
                        ></alarmo-select>
                      </alarmo-settings-row>
                    `
            : ''}

                <alarmo-settings-row .narrow=${this.narrow} .large=${true} last>
                  <span slot="heading">
                    ${localize('panels.actions.cards.new_notification.fields.message.heading', this.hass.language)}
                  </span>
                  <span slot="description">
                    ${localize('panels.actions.cards.new_notification.fields.message.description', this.hass.language)}
                  </span>

                  <ha-textarea
                    id="message"
                    label="${localize(
              'panels.actions.cards.new_notification.fields.message.heading',
              this.hass.language
            )}"
                    placeholder=${this._messagePlaceholder()}
                    .value=${this.config.actions[0].data?.message || ''}
                    @input=${(ev: Event) => this._setMessage((ev.target as HTMLInputElement).value)}
                    ?invalid=${this.errors.message}
                  ></ha-textarea>

                  ${this.config.triggers[0].event
            ? html`
                        <div style="margin-top: 10px">
                          <span style="padding-right: 10px">
                            ${localize(
              'panels.actions.cards.new_notification.fields.message.insert_wildcard',
              this.hass.language
            )}:
                          </span>
                          <alarmo-chip-set
                            selectable
                            .items=${getWildcardOptions(this.config.triggers[0].event, this.alarmoConfig)}
                            @value-changed=${(ev: CustomEvent) => this._insertWildCard(ev.detail)}
                          ></alarmo-chip-set>
                        </div>
                      `
            : ''}
                </alarmo-settings-row>

                ${this._getOpenSensorsFormat() !== null
            ? html`
                      <alarmo-settings-row .narrow=${this.narrow} .large=${true}>
                        <span slot="heading">
                          ${localize(
              'panels.actions.cards.new_notification.fields.open_sensors_format.heading',
              this.hass.language
            )}
                        </span>

                        <span slot="description">
                          ${localize(
              'panels.actions.cards.new_notification.fields.open_sensors_format.description',
              this.hass.language
            )}
                        </span>

                        <alarmo-select
                          .items=${getOpenSensorsWildCardOptions(this.hass)}
                          .value=${this._getOpenSensorsFormat(true)}
                          @value-changed=${this._setOpenSensorsFormat}
                        ></alarmo-select>
                      </alarmo-settings-row>
                    `
            : ''}
                ${this._getArmModeFormat() !== null &&
            (getArmModeWildCardOptions(this.hass).length > 1 ||
              (getArmModeWildCardOptions(this.hass).length == 1 &&
                getArmModeWildCardOptions(this.hass)[0].value != this._getArmModeFormat()))
            ? html`
                      <alarmo-settings-row .narrow=${this.narrow} .large=${true}>
                        <span slot="heading">
                          ${localize(
              'panels.actions.cards.new_notification.fields.arm_mode_format.heading',
              this.hass.language
            )}
                        </span>

                        <span slot="description">
                          ${localize(
              'panels.actions.cards.new_notification.fields.arm_mode_format.description',
              this.hass.language
            )}
                        </span>

                        <alarmo-select
                          .items=${getArmModeWildCardOptions(this.hass)}
                          .value=${this._getArmModeFormat(true)}
                          @value-changed=${this._setArmModeFormat}
                        ></alarmo-select>
                      </alarmo-settings-row>
                    `
            : ''}
              `
        : html`
                <h2>${localize('components.editor.edit_in_yaml', this.hass.language)}</h2>

                <ha-yaml-editor
                  .defaultValue=${this.config.actions[0] || ''}
                  @value-changed=${this._setYaml}
                ></ha-yaml-editor>

                ${this.errors.service || this.errors.title || this.errors.message || this.errors.entity || this.errors.media_player_entity
            ? html`
                      <span class="error-message">
                        ${this.hass.localize(
              'ui.errors.config.key_missing',
              'key',
              Object.entries(this.errors).find(
                ([k, v]) => v && ['service', 'title', 'message', 'entity', 'media_player_entity'].includes(k)
              )![0]
            )}
                      </span>
                    `
            : ''}
              `}
        </div>

        <div class="toggle-button">
          <ha-button appearance="filled" @click=${this._toggleYamlMode}>
            <ha-icon slot="start" icon="hass:shuffle-variant"></ha-icon>
            ${this.viewMode == ViewMode.Yaml
        ? localize('components.editor.ui_mode', this.hass.language)
        : localize('components.editor.yaml_mode', this.hass.language)}
          </ha-button>
        </div>

        <div class="card-actions">
          <ha-button appearance="plain" ?disabled=${!this._validAction()} @click=${this._testClick}>
            ${localize('panels.actions.cards.new_notification.actions.test', this.hass.language)}
            <ha-icon slot="end" icon="hass:arrow-right"></ha-icon>
          </ha-button>
        </div>
      </ha-card>

      <div class="section-header">${localize('panels.actions.cards.new_notification.options', this.hass.language)}</div>
      <ha-card>
        <div class="card-content">
          <alarmo-settings-row .narrow=${this.narrow} .large=${true} first>
            <span slot="heading">
              ${localize('panels.actions.cards.new_notification.fields.name.heading', this.hass.language)}
            </span>
            <span slot="description">
              ${localize('panels.actions.cards.new_notification.fields.name.description', this.hass.language)}
            </span>

            <ha-textfield
              label="${localize('panels.actions.cards.new_notification.fields.name.heading', this.hass.language)}"
              .placeholder=${this._namePlaceholder()}
              .value=${this.config.name || ''}
              @input=${this._setName}
              ?invalid=${this.errors.name}
            ></ha-textfield>
          </alarmo-settings-row>

          ${this.item?.automation_id
        ? html`
                <alarmo-settings-row .narrow=${this.narrow}>
                  <span slot="heading">
                    ${localize('panels.actions.cards.new_notification.fields.delete.heading', this.hass.language)}
                  </span>
                  <span slot="description">
                    ${localize('panels.actions.cards.new_notification.fields.delete.description', this.hass.language)}
                  </span>
                  <div>
                    <ha-button appearance="filled" variant="danger" @click=${this._deleteClick}>
                      <ha-icon slot="start" icon="hass:trash-can-outline"></ha-icon>
                      ${this.hass.localize('ui.common.delete')}
                    </ha-button>
                  </div>
                </alarmo-settings-row>
              `
        : ''}
        </div>
      </ha-card>

      <div class="actions">
        <ha-button appearance="filled" @click=${this._saveClick} style="width: 100%">
          <ha-icon slot="start" icon="hass:content-save-outline"></ha-icon>
          ${this.hass.localize('ui.common.save')}
        </ha-button>
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

    if (triggerConfig[0].modes?.length)
      this._setModes(
        new CustomEvent('value-changed', {
          detail: { value: triggerConfig[0].modes.filter(e => armModes.includes(e)) },
        })
      );

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
    let config = getNotifyServices(this.hass).find(e => e.entity_id == value || e.service == value);
    let actionConfig = this.config.actions;
    Object.assign(actionConfig, { [0]: { ...config, ...omit(actionConfig[0], 'service', 'entity_id') } });
    this.config = { ...this.config, actions: actionConfig };
    if (Object.keys(this.errors).includes('service') || Object.keys(this.errors).includes('entity')) this._validateConfig();
  }

  private _setTitle(ev: Event) {
    ev.stopPropagation();
    const value = (ev.target as HTMLInputElement).value;
    let actionConfig = this.config.actions;
    Object.assign(actionConfig, {
      [0]: {
        ...actionConfig[0],
        service: actionConfig[0].service || '',
        data: { ...(actionConfig[0].data || {}), title: value },
      },
    });
    this.config = { ...this.config, actions: actionConfig };
    if (Object.keys(this.errors).includes('title')) this._validateConfig();
  }

  private _setEntity(ev: Event) {
    ev.stopPropagation();
    const value = (ev.target as HTMLInputElement).value;
    let actionConfig = this.config.actions;
    Object.assign(actionConfig, {
      [0]: {
        ...actionConfig[0],
        service: actionConfig[0].service || '',
        data: { ...(actionConfig[0].data || {}), entity_id: value },
      },
    });
    this.config = { ...this.config, actions: actionConfig };
    if (Object.keys(this.errors).includes('entity')) this._validateConfig();
  }

  private _setMediaPlayerEntity(ev: Event) {
    ev.stopPropagation();
    const value = (ev.target as HTMLInputElement).value;
    let actionConfig = this.config.actions;
    Object.assign(actionConfig, {
      [0]: {
        ...actionConfig[0],
        service: actionConfig[0].service || '',
        data: { ...(actionConfig[0].data || {}), media_player_entity_id: value },
      },
    });
    this.config = { ...this.config, actions: actionConfig };
    if (Object.keys(this.errors).includes('media_player_entity')) this._validateConfig();
  }

  private _setMessage(value: string) {
    let actionConfig = this.config.actions;
    Object.assign(actionConfig, {
      [0]: {
        ...actionConfig[0],
        service: actionConfig[0].service || '',
        data: { ...(actionConfig[0].data || {}), message: value },
      },
    });
    this.config = { ...this.config, actions: actionConfig };
    if (Object.keys(this.errors).includes('message')) this._validateConfig();
  }

  private _setName(ev: Event) {
    ev.stopPropagation();
    const value = (ev.target as HTMLInputElement).value;
    this.config = { ...this.config, name: value };
  }

  private _setYaml(ev: CustomEvent): void {
    const value = ev.detail.value;
    let output: Partial<AutomationAction> = {};

    if (isString(value?.service)) output = { ...output, service: String(value.service) };

    if (isObject(value?.data)) output = { ...output, data: value.data };

    if (Object.keys(output).length)
      this.config = {
        ...this.config,
        actions: Object.assign(this.config.actions, { [0]: { ...this.config.actions[0], ...output } }),
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
    if (!(triggerConfig.modes || []).every(e => getArmModeOptions(triggerConfig.area, this.areas!).includes(e)))
      this.errors = { ...this.errors, modes: true };

    const actionConfig = data.actions[0];

    if (
      !actionConfig.service ||
      (!getNotifyServices(this.hass).find(e => e.service == actionConfig.service && e.entity_id == actionConfig.entity_id) && computeDomain(actionConfig.service) != 'script')
    )
      this.errors = { ...this.errors, service: true };
    else if (
      actionConfig.service &&
      computeDomain(actionConfig.service) == 'tts' &&
      (!Object.keys(actionConfig.data || {}).includes('entity_id') ||
        !getEntitiesByDomain(this.hass, 'media_player', 'tts').includes(actionConfig.data!.entity_id))
    )
      this.errors = { ...this.errors, entity: true };

    if (actionConfig.service && actionConfig.service == 'tts.speak') {
      if (!this.errors.entity && !getEntitiesByDomain(this.hass, 'tts').includes(actionConfig.data!.entity_id))
        this.errors = { ...this.errors, entity: true };
      if (!Object.keys(actionConfig.data || {}).includes('media_player_entity_id') || !getEntitiesByDomain(this.hass, 'media_player').includes(actionConfig.data!.media_player_entity_id))
        this.errors = { ...this.errors, media_player_entity: true };
    }

    if (!isValidString(actionConfig.data?.message)) this.errors = { ...this.errors, message: true };

    // title is optional
    // if (!isValidString(actionConfig.data?.title))
    //   this.errors = { ...this.errors, title: true };

    if (!isValidString(data.name)) this.errors = { ...this.errors, name: true };

    return !Object.values(this.errors).length;
  }

  private _validAction() {
    const data = this._parseAutomation();
    const actionConfig = data.actions[0];
    return (
      actionConfig.service &&
      (computeDomain(actionConfig.service) == 'script' ||
        getNotifyServices(this.hass).find(e => e.service == actionConfig.service && e.entity_id == actionConfig.entity_id)) &&
      isValidString(actionConfig.data?.message)
    );
  }

  private _insertWildCard(value: string) {
    const field = this.shadowRoot!.querySelector('#message') as HTMLInputElement | undefined;
    if (field) field.focus();
    let message = this.config.actions[0].data?.message || '';
    message =
      field && field.selectionStart !== null && field.selectionEnd !== null
        ? message.substring(0, field.selectionStart) + value + message.substring(field.selectionEnd, message.length)
        : message + value;
    this._setMessage(message);
  }

  private _toggleYamlMode() {
    this.viewMode = this.viewMode == ViewMode.UI ? ViewMode.Yaml : ViewMode.UI;

    if (this.viewMode == ViewMode.Yaml) {
      let actionConfig = { ...this.config.actions[0] };
      let serviceData = typeof actionConfig.data == 'object' && isDefined(actionConfig.data) ? actionConfig.data : {};

      actionConfig = {
        ...actionConfig,
        service: actionConfig.service || '',
      };

      if (!serviceData.message) serviceData = { ...serviceData, message: '' };

      if (getNotifyServices(this.hass).find(e => e.service == actionConfig.service && e.entity_id == actionConfig.entity_id)) {
        if (computeDomain(actionConfig.service!) == 'notify' && !serviceData.title)
          serviceData = { ...serviceData, title: '' };
        if (computeDomain(actionConfig.service!) == 'tts' && !serviceData.entity_id)
          serviceData = { ...serviceData, entity_id: '' };
      }

      actionConfig = {
        ...actionConfig,
        data: serviceData,
      };

      this.config = {
        ...this.config,
        actions: Object.assign(this.config.actions, {
          [0]: actionConfig,
        }),
      };
    }
  }

  private _namePlaceholder() {
    const event = this.config.triggers[0].event;
    const domain = this.config.actions[0].service ? computeDomain(this.config.actions[0].service) : null;
    if (!event) return '';
    if (domain == 'notify') {
      const target = computeServiceDisplay(this.hass, this.config.actions[0]);
      if (!target.length) return '';

      return localize(
        `panels.actions.cards.new_notification.fields.name.placeholders.${event}`,
        this.hass.language,
        '{target}',
        target[0].name
      );
    } else if (domain == 'tts') {
      const entity =
        typeof this.config.actions[0].data == 'object' && isDefined(this.config.actions[0].data)
          ? this.config.actions[0].data.entity_id
          : null;
      if (!entity || !this.hass.states[entity]) return '';
      const target = computeName(this.hass.states[entity]);

      return localize(
        `panels.actions.cards.new_notification.fields.name.placeholders.${event}`,
        this.hass.language,
        '{target}',
        target
      );
    }
    else if (domain == 'telegram_bot') {
      const target = prettyPrint(domain);

      return localize(
        `panels.actions.cards.new_notification.fields.name.placeholders.${event}`,
        this.hass.language,
        '{target}',
        target
      );
    }
    return '';
  }

  private _messagePlaceholder() {
    const event = this.config.triggers[0].event;
    if (!event) return '';
    else
      return localize(`panels.actions.cards.new_notification.fields.message.placeholders.${event}`, this.hass.language);
  }

  private _parseAutomation() {
    let data = { ...this.config };
    let action = data.actions[0];

    //fill in message placeholder
    if (!isValidString(action.data?.message) && this.viewMode == ViewMode.UI && this._messagePlaceholder()) {
      action = { ...action, data: { ...action.data, message: this._messagePlaceholder() } };
      Object.assign(data, { actions: Object.assign(data.actions, { [0]: action }) });
    }

    //fill in name placeholder
    if (!isValidString(data.name) && this._namePlaceholder()) data = { ...data, name: this._namePlaceholder() };

    return data;
  }

  private _getOpenSensorsFormat(forceResult = false): null | string {
    const message = this.config.actions[0].data?.message || '';
    const res = message.match(/{{open_sensors(\|[^}]+)?}}/);
    if (res !== null) return res[0];
    else return forceResult ? '{{open_sensors}}' : null;
  }

  private _setOpenSensorsFormat(ev: CustomEvent) {
    ev.stopPropagation();
    const value = String(ev.detail.value);
    let message = this.config.actions[0].data?.message || '';
    message = message.replace(/{{open_sensors(\|[^}]+)?}}/, value);

    let actionConfig = this.config.actions;
    Object.assign(actionConfig, {
      [0]: {
        ...actionConfig[0],
        service: actionConfig[0].service || '',
        data: { ...(actionConfig[0].data || {}), message: message },
      },
    });
    this.config = { ...this.config, actions: actionConfig };
  }

  private _getArmModeFormat(forceResult = false): null | string {
    const message = this.config.actions[0].data?.message || '';
    const res = message.match(/{{arm_mode(\|[^}]+)?}}/);
    if (res !== null) return res[0];
    else return forceResult ? '{{arm_mode}}' : null;
  }

  private _setArmModeFormat(ev: CustomEvent) {
    ev.stopPropagation();
    const value = String(ev.detail.value);
    let message = this.config.actions[0].data?.message || '';
    message = message.replace(/{{arm_mode(\|[^}]+)?}}/, value);

    let actionConfig = this.config.actions;
    Object.assign(actionConfig, {
      [0]: {
        ...actionConfig[0],
        service: actionConfig[0].service || '',
        data: { ...(actionConfig[0].data || {}), message: message },
      },
    });
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

  private async _testClick(ev: Event) {
    const data = this._parseAutomation();
    let action = { ...data.actions[0] };

    let message = action.data!.message;
    message = message.replace('{{open_sensors|format=short}}', 'Some Example Sensor');
    message = message.replace(/{{open_sensors(\|[^}]+)?}}/, 'Some Example Sensor is open');
    message = message.replace('{{bypassed_sensors}}', 'Some Bypassed Sensor');
    message = message.replace(/{{arm_mode(\|[^}]+)?}}/, 'Armed away');
    message = message.replace('{{changed_by}}', 'Some Example User');
    message = message.replace('{{delay}}', '30');

    action = { ...action, data: { ...action.data, message: message } };

    let sequence = { ...omit(action, 'service'), action: action.service };

    this.hass.callWS({
      type: "execute_script",
      sequence,
    }).then()
      .catch(e => {
        showErrorDialog(ev, e.message);
        return;
      });
  }

  private _cancelClick() {
    navigate(this, exportPath('actions'), true);
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
        font-size: 24px;
        font-weight: 400;
        letter-spacing: -0.012em;
        line-height: 32px;
        opacity: var(--dark-primary-opacity);
      }
      div.section-header {
        font-size: 18px;
        font-weight: 400;
        letter-spacing: -0.012em;
        line-height: 32px;
        opacity: var(--dark-primary-opacity);
        margin: 20px 0px 5px 10px;
      }
      div.actions {
        padding: 20px 0px 30px 0px;
      }
      .toggle-button {
        position: absolute;
        right: 20px;
        top: 20px;
      }
      h2 {
        margin-top: 10px;
        font-size: 24px;
        font-weight: 400;
        letter-spacing: -0.012em;
      }
      span.error-message {
        color: var(--error-color);
      }
      div.heading {
        display: grid;
        grid-template-areas:
          'header icon'
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
      ha-textarea[invalid] {
        --mdc-text-field-idle-line-color: var(--mdc-theme-error);
        --mdc-text-field-label-ink-color: var(--mdc-theme-error);
      }
    `;
  }
}
