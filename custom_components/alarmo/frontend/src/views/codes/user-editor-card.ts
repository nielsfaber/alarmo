import { LitElement, html, CSSResultGroup, css } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { mdiClose } from '@mdi/js';
import { commonStyle } from '../../styles';
import { AlarmoArea, AlarmoUser, Dictionary, HomeAssistant } from '../../types';
import { fetchUsers, saveUser, deleteUser, fetchAreas } from '../../data/websockets';
import { localize } from '../../../localize/localize';
import { omit, showErrorDialog, handleError, sortAlphabetically, navigate } from '../../helpers';
import { exportPath } from '../../common/navigation';

@customElement('user-editor-card')
export class UserEditorCard extends LitElement {
  @property()
  hass!: HomeAssistant;

  @property()
  narrow!: boolean;

  @property()
  item?: string;

  @property()
  data: Partial<AlarmoUser> = {
    can_arm: true,
    can_disarm: true,
    is_override_code: false,
  };

  @property()
  repeatCode: string = '';

  users?: Dictionary<AlarmoUser>;
  areas: Dictionary<AlarmoArea> = {};

  async firstUpdated() {
    this.users = await fetchUsers(this.hass);
    this.areas = await fetchAreas(this.hass);

    if (this.item) {
      const user = this.users[this.item];
      this.data = omit(user, 'code', 'code_format', 'code_length');
    }

    this.data = {
      ...this.data,
      area_limit: (this.data.area_limit || []).filter(e => Object.keys(this.areas).includes(e)),
    };

    if (!(this.data.area_limit || []).length) this.data = { ...this.data, area_limit: Object.keys(this.areas) };
  }

  render() {
    if (!this.users) return html``;

    return html`
      <ha-card>
        <div class="card-header">
          <div class="name">
            ${this.item
        ? localize('panels.codes.cards.edit_user.title', this.hass.language)
        : localize('panels.codes.cards.new_user.title', this.hass.language)}
          </div>
          <ha-icon-button .path=${mdiClose} @click=${this.cancelClick}></ha-icon-button>
        </div>
        <div class="card-content">
          ${this.item
        ? localize(
          'panels.codes.cards.edit_user.description',
          this.hass.language,
          '{name}',
          this.users![this.item].name
        )
        : localize('panels.codes.cards.new_user.description', this.hass.language)}
        </div>

        <alarmo-settings-row .narrow=${this.narrow}>
          <span slot="heading">${localize('panels.codes.cards.new_user.fields.name.heading', this.hass.language)}</span>
          <span slot="description">
            ${localize('panels.codes.cards.new_user.fields.name.description', this.hass.language)}
          </span>

          <ha-textfield
            label="${localize('panels.codes.cards.new_user.fields.name.heading', this.hass.language)}"
            placeholder=""
            value=${this.data.name}
            @input=${(ev: Event) => (this.data = { ...this.data!, name: (ev.target as HTMLInputElement).value })}
          ></ha-textfield>
        </alarmo-settings-row>

        ${this.item
        ? html`
              <alarmo-settings-row .narrow=${this.narrow}>
                <span slot="heading">
                  ${localize('panels.codes.cards.edit_user.fields.old_code.heading', this.hass.language)}
                </span>
                <span slot="description">
                  ${localize('panels.codes.cards.edit_user.fields.old_code.description', this.hass.language)}
                </span>

                <ha-textfield
                  label="${localize('panels.codes.cards.edit_user.fields.old_code.heading', this.hass.language)}"
                  placeholder=""
                  type="password"
                  value=${this.data.old_code || ''}
                  @input=${(ev: Event) =>
            (this.data = { ...this.data!, old_code: String((ev.target as HTMLInputElement).value).trim() })}
                ></ha-textfield>
              </alarmo-settings-row>
            `
        : ''}
        ${this.item && !this.data.old_code?.length
        ? ''
        : html`
              <alarmo-settings-row .narrow=${this.narrow}>
                <span slot="heading">
                  ${localize('panels.codes.cards.new_user.fields.code.heading', this.hass.language)}
                </span>
                <span slot="description">
                  ${localize('panels.codes.cards.new_user.fields.code.description', this.hass.language)}
                </span>

                <ha-textfield
                  label="${localize('panels.codes.cards.new_user.fields.code.heading', this.hass.language)}"
                  placeholder=""
                  type="password"
                  value=${this.data.code}
                  @input=${(ev: Event) =>
            (this.data = { ...this.data!, code: String((ev.target as HTMLInputElement).value).trim() })}
                ></ha-textfield>
              </alarmo-settings-row>

              <alarmo-settings-row .narrow=${this.narrow}>
                <span slot="heading">
                  ${localize('panels.codes.cards.new_user.fields.confirm_code.heading', this.hass.language)}
                </span>
                <span slot="description">
                  ${localize('panels.codes.cards.new_user.fields.confirm_code.description', this.hass.language)}
                </span>

                <ha-textfield
                  label="${localize('panels.codes.cards.new_user.fields.confirm_code.heading', this.hass.language)}"
                  placeholder=""
                  type="password"
                  value=${this.repeatCode || ''}
                  @input=${(ev: Event) => (this.repeatCode = String((ev.target as HTMLInputElement).value).trim())}
                ></ha-textfield>
              </alarmo-settings-row>
            `}

        <alarmo-settings-row .narrow=${this.narrow}>
          <span slot="heading">
            ${localize('panels.codes.cards.new_user.fields.can_arm.heading', this.hass.language)}
          </span>
          <span slot="description">
            ${localize('panels.codes.cards.new_user.fields.can_arm.description', this.hass.language)}
          </span>

          <ha-switch
            ?checked=${this.data.can_arm}
            @change=${(ev: Event) => (this.data = { ...this.data!, can_arm: (ev.target as HTMLInputElement).checked })}
          ></ha-switch>
        </alarmo-settings-row>

        <alarmo-settings-row .narrow=${this.narrow}>
          <span slot="heading">
            ${localize('panels.codes.cards.new_user.fields.can_disarm.heading', this.hass.language)}
          </span>
          <span slot="description">
            ${localize('panels.codes.cards.new_user.fields.can_disarm.description', this.hass.language)}
          </span>

          <ha-switch
            ?checked=${this.data.can_disarm}
            @change=${(ev: Event) =>
        (this.data = { ...this.data!, can_disarm: (ev.target as HTMLInputElement).checked })}
          ></ha-switch>
        </alarmo-settings-row>

        ${this.getAreaOptions().length >= 2
        ? html`
              <alarmo-settings-row .narrow=${this.narrow}>
                <span slot="heading">
                  ${localize('panels.codes.cards.new_user.fields.area_limit.heading', this.hass.language)}
                </span>
                <span slot="description">
                  ${localize('panels.codes.cards.new_user.fields.area_limit.description', this.hass.language)}
                </span>

                <div class="checkbox-list">
                  ${this.getAreaOptions().map(e => {
          const checked = (this.data.area_limit || []).includes(e.value) || !this.data.area_limit?.length;
          return html`
                      <div>
                        <ha-checkbox
                          @change=${(ev: Event) =>
              this.toggleSelectArea(e.value, (ev.target as HTMLInputElement).checked)}
                          ?disabled=${checked && (this.data.area_limit || []).length <= 1}
                          ?checked=${checked}
                        ></ha-checkbox>
                        <span @click=${() => this.toggleSelectArea(e.value, !checked)}>
                          ${e.name}
                        </span>
                      </div>
                    `;
        })}
                </div>
              </alarmo-settings-row>
            `
        : ''}

        <alarmo-settings-row .narrow=${this.narrow}>
          <span slot="heading">
            ${localize('panels.codes.cards.new_user.fields.is_override_code.heading', this.hass.language)}
          </span>
          <span slot="description">
            ${localize('panels.codes.cards.new_user.fields.is_override_code.description', this.hass.language)}
          </span>

          <ha-switch
            ?checked=${this.data.is_override_code}
            @change=${(ev: Event) =>
        (this.data = { ...this.data!, is_override_code: (ev.target as HTMLInputElement).checked })}
          ></ha-switch>
        </alarmo-settings-row>

        <div class="card-actions">
          <mwc-button @click=${this.saveClick}>
            ${this.hass.localize('ui.common.save')}
          </mwc-button>

          ${this.item
        ? html`
                <mwc-button class="warning" @click=${this.deleteClick}>
                  ${this.hass.localize('ui.common.delete')}
                </mwc-button>
              `
        : ''}
        </div>
      </ha-card>
    `;
  }

  getAreaOptions(): { value: string; name: string }[] {
    let areas = Object.keys(this.areas || {}).map(e =>
      Object({
        value: e,
        name: this.areas[e].name,
      })
    );
    areas.sort(sortAlphabetically);

    return areas;
  }

  private toggleSelectArea(id: string, checked: boolean) {
    if ((this.data.area_limit || []).length <= 1 && !checked) return;
    let areaLimit = this.data.area_limit || [];
    areaLimit = checked
      ? areaLimit.includes(id)
        ? areaLimit
        : [...areaLimit, id]
      : areaLimit.includes(id)
        ? areaLimit.filter(e => e != id)
        : areaLimit;
    this.data = { ...this.data, area_limit: areaLimit };
  }

  private deleteClick(ev: Event) {
    if (!this.item) return;
    deleteUser(this.hass, this.item)
      .catch(e => handleError(e, ev))
      .then(() => {
        this.cancelClick();
      });
  }

  private saveClick(ev: Event) {
    let data = { ...this.data };

    if (!data.name?.length)
      showErrorDialog(ev, localize('panels.codes.cards.new_user.errors.no_name', this.hass.language));
    else if ((!data.code?.length || data.code.length < 4) && (!this.item || data.old_code?.length))
      showErrorDialog(ev, localize('panels.codes.cards.new_user.errors.no_code', this.hass.language));
    else if ((data.code || '').length && data.code !== this.repeatCode) {
      showErrorDialog(ev, localize('panels.codes.cards.new_user.errors.code_mismatch', this.hass.language));
      this.data = omit(this.data, 'code');
      this.repeatCode = '';
    } else {
      if (this.item) {
        if ((data.old_code || '').length < 4) omit(data, 'old_code', 'code');
      }

      if (
        !this.getAreaOptions().length ||
        this.getAreaOptions().every(e => (this.data.area_limit || []).includes(e.value))
      )
        data = { ...data, area_limit: [] };

      saveUser(this.hass, data)
        .catch(e => handleError(e, ev))
        .then(() => {
          this.cancelClick();
        });
    }
  }

  private cancelClick() {
    navigate(this, exportPath('codes'), true);
  }

  static get styles(): CSSResultGroup {
    return css`
      ${commonStyle}
      div.checkbox-list {
        display: flex;
        flex-direction: row;
      }
      div.checkbox-list div {
        display: flex;
        align-items: center;
      }
      div.checkbox-list div span {
        cursor: pointer;
      }
    `;
  }
}
