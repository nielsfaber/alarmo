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
import { handleError, isDefined, Unique, omit, showErrorDialog, navigate, computeEntity } from '../../helpers';
import { saveAutomation, fetchAreas, fetchConfig, deleteAutomation } from '../../data/websockets';
import { localize } from '../../../localize/localize';
import {
  computeEventDisplay,
  computeAreaDisplay,
  computeArmModeDisplay,
  getAreaOptions,
  getArmModeOptions,
  getAutomationEntities,
  computeEntityDisplay,
  isValidString,
  isValidEntity,
  isValidService,
  isObject,
  isString,
  isArray,
  computeActions,
  computeActionDisplay,
  computeMergedActions,
  findMatchingAction,
} from '../../data/actions';
import { EAutomationTypes } from '../../const';
import { exportPath } from '../../common/navigation';
import { loadHaYamlEditor } from '../../load-ha-elements';

import '../../components/alarmo-selector';
import '../../components/alarmo-select';

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
      let actions = this.item.actions.map(e => (e.entity_id ? e : omit(e, 'entity_id')));
      this.config = { ...this.item, actions: [actions[0], ...actions.slice(1)] };
      if (this.config.triggers.length > 1) this.config = { ...this.config, triggers: [this.config.triggers[0]] };

      let area = this.config.triggers[0].area;
      if (isDefined(area) && !getAreaOptions(this.areas, this.alarmoConfig).includes(area)) area = undefined;
      else if (area === null) area = 0;
      this._setArea(new CustomEvent('value-changed', { detail: { value: area } }));

      if (this._hasCustomEntities()) this.viewMode = ViewMode.Yaml;
    }

    //automatically set area if there is only 1 option
    if (!isDefined(this.config.triggers[0].area)) {
      const areaOptions = getAreaOptions(this.areas, this.alarmoConfig);
      if (areaOptions.length == 1)
        this._setArea(new CustomEvent('value-changed', { detail: { value: areaOptions[0] } }));
      else if (areaOptions.includes(0)) this._setArea(new CustomEvent('value-changed', { detail: { value: 0 } }));
    }

    if (this.item && !this.config.triggers[0].area && !this.alarmoConfig.master.enabled)
      this.errors = { ...this.errors, area: true };
  }

  protected render(): TemplateResult {
    if (!this.hass || !this.areas || !this.alarmoConfig) return html``;
    return html`
      <div class="heading">
        <ha-icon-button .path=${mdiClose} @click=${this._cancelClick} class="icon"></ha-icon-button>
        <div class="header">${localize('panels.actions.cards.new_action.title', this.hass.language)}</div>
        <div class="description">${localize('panels.actions.cards.new_action.description', this.hass.language)}</div>
      </div>
      <div class="section-header">${localize('panels.actions.cards.new_notification.trigger', this.hass.language)}</div>
      <ha-card>
        <div class="card-content">
          <alarmo-settings-row .narrow=${this.narrow} .large=${true} first>
            <span slot="heading">
              ${localize('panels.actions.cards.new_action.fields.event.heading', this.hass.language)}
            </span>
            <span slot="description">
              ${localize('panels.actions.cards.new_action.fields.event.description', this.hass.language)}
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
                    ?invalid=${this.errors.area}
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
                    ${localize('panels.actions.cards.new_action.fields.entity.heading', this.hass.language)}
                  </span>
                  <span slot="description">
                    ${localize('panels.actions.cards.new_action.fields.entity.description', this.hass.language)}
                  </span>

                  <alarmo-selector
                    .hass=${this.hass}
                    .items=${computeEntityDisplay(getAutomationEntities(this.hass, this._getEntities()), this.hass)}
                    ?disabled=${!getAutomationEntities(this.hass, this._getEntities()).length}
                    label=${localize('panels.actions.cards.new_action.fields.entity.heading', this.hass.language)}
                    .value=${this._getEntities()}
                    @value-changed=${this._setEntity}
                    ?invalid=${this.errors.entity_id}
                  ></alarmo-selector>
                </alarmo-settings-row>

                ${this._getEntities().length
            ? html`
                      <alarmo-settings-row .narrow=${this.narrow} .large=${true}>
                        <span slot="heading">
                          ${localize('panels.actions.cards.new_action.fields.action.heading', this.hass.language)}
                        </span>
                        <span slot="description">
                          ${localize('panels.actions.cards.new_action.fields.action.description', this.hass.language)}
                        </span>

                        <div>
                          ${this.renderActions() ||
              localize(
                'panels.actions.cards.new_action.fields.action.no_common_actions',
                this.hass.language
              )}
                        </div>
                        ${this.errors.service
                ? html`
                              <span class="error-message">
                                ${this.hass.localize('ui.common.error_required', this.hass.language)}
                              </span>
                            `
                : ''}
                      </alarmo-settings-row>
                    `
            : ''}
              `
        : html`
                <h2>${localize('components.editor.edit_in_yaml', this.hass.language)}</h2>

                <ha-yaml-editor
                  .defaultValue=${this.config.actions || ''}
                  @value-changed=${this._setYaml}
                ></ha-yaml-editor>

                ${this.errors.service || this.errors.entity_id
            ? html`
                      <span class="error-message">
                        ${this.hass.localize(
              'ui.errors.config.key_missing',
              'key',
              Object.entries(this.errors).find(([k, v]) => v && ['service', 'entity_id'].includes(k))![0]
            )}
                      </span>
                    `
            : ''}
              `}
        </div>

        <div class="toggle-button">
          <mwc-button @click=${this._toggleYamlMode}>
            <ha-icon icon="hass:shuffle-variant"></ha-icon>
            ${this.viewMode == ViewMode.Yaml
        ? localize('components.editor.ui_mode', this.hass.language)
        : localize('components.editor.yaml_mode', this.hass.language)}
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
          <alarmo-settings-row .narrow=${this.narrow} .large=${true} first>
            <span slot="heading">
              ${localize('panels.actions.cards.new_action.fields.name.heading', this.hass.language)}
            </span>
            <span slot="description">
              ${localize('panels.actions.cards.new_action.fields.name.description', this.hass.language)}
            </span>

            <ha-textfield
              label="${localize('panels.actions.cards.new_action.fields.name.heading', this.hass.language)}"
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
                    <mwc-button class="warning" outlined @click=${this._deleteClick}>
                      <ha-icon icon="hass:trash-can-outline"></ha-icon>
                      ${this.hass.localize('ui.common.delete')}
                    </mwc-button>
                  </div>
                </alarmo-settings-row>
              `
        : ''}
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

  private renderActions() {
    let selectedEntities = this.config.actions.map(e => e.entity_id);
    let actions = computeActions(selectedEntities, this.hass);

    if (!actions.length) return;

    const isMatchingAction = (...actions: (string | null)[]) => {
      if (!actions.every(isDefined)) return false;
      return Unique(computeMergedActions(actions.filter(isDefined))).length == 1;
    };

    return actions.map(action => {
      return html`
        <mwc-button
          class="${isMatchingAction(this._selectedAction(), action) ? 'active' : ''}"
          @click=${() => this._setAction(action)}
        >
          ${computeActionDisplay(action, this.hass)}
        </mwc-button>
      `;
    });
  }

  private _selectedAction() {
    let selectedActions = this.config.actions.map(e => e.service);
    if (!selectedActions.every(isDefined)) return null;
    selectedActions = Unique(computeMergedActions(selectedActions.filter(isDefined)));
    if (selectedActions.length == 1) return selectedActions[0]!;
    else return null;
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
    const triggerConfig = this.config.triggers;
    Object.assign(triggerConfig, { [0]: { ...triggerConfig[0], modes: value } });
    this.config = { ...this.config, triggers: triggerConfig };
    if (Object.keys(this.errors).includes('service')) this._validateConfig();
  }

  private _setEntity(ev: CustomEvent) {
    ev.stopPropagation();
    const selectedEntities = ev.detail.value as string[];
    let actionConfig = this.config.actions;

    //assign service for added entity if it is in common
    let serviceSetting: string | null = null;
    if (selectedEntities.length > actionConfig.length && this._selectedAction())
      serviceSetting = this._selectedAction();

    if (actionConfig.length > selectedEntities.length) {
      let removedAction = actionConfig.findIndex(e => !selectedEntities.includes(e.entity_id || ''));
      if (removedAction < 0) removedAction = actionConfig.length - 1;
      actionConfig.splice(removedAction, 1);
    }

    if (!selectedEntities.length) Object.assign(actionConfig, { [0]: omit(actionConfig[0], 'entity_id') });

    selectedEntities.forEach((entity, i) => {
      let action = actionConfig.length > i ? { ...actionConfig[i] } : {};
      action = action.entity_id == entity ? { ...action } : { entity_id: entity };
      Object.assign(actionConfig, { [i]: action });
    });

    this.config = { ...this.config, actions: actionConfig };
    if (serviceSetting) this._setAction(serviceSetting);
    if (Object.keys(this.errors).includes('entity_id')) this._validateConfig();
  }

  private _setAction(selectedAction: string) {
    let actionConfig = this.config.actions;

    let selectedEntities = this.config.actions.map(e => e.entity_id);
    let availableActions = computeActions(selectedEntities, this.hass);
    if (!availableActions.length) return;

    actionConfig.forEach((e, i) => {
      let actions = computeActions(e.entity_id, this.hass);
      let service = findMatchingAction(actions, selectedAction);
      Object.assign(actionConfig, { [i]: { service: service, ...omit(e, 'service') } });
    });
    this.config = { ...this.config, actions: actionConfig };
    if (Object.keys(this.errors).includes('service')) this._validateConfig();
  }

  private _setName(ev: Event) {
    ev.stopPropagation();
    const value = (ev.target as HTMLInputElement).value;
    this.config = { ...this.config, name: value };
  }

  private _setYaml(ev: CustomEvent): void {
    let value = ev.detail.value;

    let actionConfig: [AutomationAction, ...AutomationAction[]] = [{}];

    if (isObject(value)) value = [value];

    if (isArray(value)) {
      value.forEach((entry, i) => {
        let output: Partial<AutomationAction> = {};

        if (isObject(entry) && isString(entry.service)) output = { ...output, service: entry.service };
        if (isObject(entry) && isString(entry.entity_id)) output = { ...output, entity_id: entry.entity_id };
        if (isObject(entry) && isObject(entry.data)) output = { ...output, data: entry.data };

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
    if (!isDefined(triggerConfig.area) || !getAreaOptions(this.areas, this.alarmoConfig!).includes(triggerConfig.area))
      this.errors = { ...this.errors, area: true };
    if (!(triggerConfig.modes || []).every(e => getArmModeOptions(triggerConfig.area, this.areas!).includes(e)))
      this.errors = { ...this.errors, modes: true };

    let entities = data.actions.map(e => e.entity_id);
    if (this.viewMode == ViewMode.Yaml) entities = entities.filter(isDefined);
    if (!data.actions.length || !entities.every(e => isValidEntity(e, this.hass)))
      this.errors = { ...this.errors, entity_id: true };

    const services = data.actions.map(e => e.service).filter(isDefined);
    if (!services.length || !services.every(e => isValidService(e, this.hass))) {
      this.errors = { ...this.errors, service: true };
      let availableActions = computeActions(entities, this.hass);
      if (!availableActions.length && services.length) this.viewMode = ViewMode.Yaml;
    }

    if (!isValidString(data.name)) this.errors = { ...this.errors, name: true };

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

    if (this.viewMode == ViewMode.Yaml)
      this.config = {
        ...this.config,
        actions: Object.assign(this.config.actions, {
          [0]: {
            ...this.config.actions[0],
            service: this.config.actions[0].service || '',
            data: {
              ...(this.config.actions[0].data || {}),
            },
          },
        }),
      };
  }

  private _namePlaceholder() {
    if (!this._validAction) return '';
    const event = this.config.triggers[0].event;
    const entities = this.config.actions.map(e => e.entity_id).filter(isDefined) as string[];
    const entity = computeEntityDisplay(entities, this.hass)
      .map(e => e.name)
      .join(', ');
    const services = Unique(
      this.config.actions
        .map(e => e.service)
        .filter(isDefined)
        .map(e => computeEntity(e))
    );
    let state: string | undefined = undefined;
    if (services.length == 1 && services[0]?.includes('turn_on')) state = this.hass.localize('state.default.on');
    if (services.length == 1 && services[0]?.includes('turn_off')) state = this.hass.localize('state.default.off');
    if (services.length == 1 && services[0]?.includes('lock'))
      state = this.hass.localize('component.lock.state._.locked');
    if (services.length == 1 && services[0]?.includes('unlock'))
      state = this.hass.localize('component.lock.state._.unlocked');
    if (!event || !entity || !state) return '';
    else
      return localize(
        `panels.actions.cards.new_action.fields.name.placeholders.${event}`,
        this.hass.language,
        'entity',
        entity,
        'state',
        state
      );
  }

  private _getEntities() {
    return Unique(this.config.actions.map(e => e.entity_id).filter(isDefined)) || [];
  }

  private _hasCustomEntities() {
    return this._getEntities().some(e => !getAutomationEntities(this.hass).includes(e));
  }

  private _parseAutomation() {
    let data = { ...this.config };

    //fill in name placeholder
    if (!isValidString(data.name) && this._namePlaceholder()) data = { ...data, name: this._namePlaceholder() };

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
      let serviceData = { ...action.data };
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
        font-size: 24px;
        font-weight: 400;
        letter-spacing: -0.012em;
      }
      span.error-message {
        color: var(--error-color);
        font-size: 0.875rem;
        display: flex;
        margin-top: 10px;
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
      mwc-button[disabled].active {
        background: var(--disabled-text-color);
        --mdc-button-disabled-ink-color: var(--text-primary-color);
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
    `;
  }
}
