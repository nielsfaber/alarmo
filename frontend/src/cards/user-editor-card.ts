import { LitElement, html, customElement, property } from 'lit-element';
import { HomeAssistant, navigate, fireEvent } from 'custom-card-helpers';
import { commonStyle } from '../styles';
import { AlarmoConfig, AlarmoUser, Dictionary } from '../types';
import { fetchUsers, saveUser, deleteUser } from '../data/websockets';
import { localize } from '../../localize/localize';
import { omit, pick, showErrorDialog, handleError } from '../helpers';


@customElement('user-editor-card')
export class UserEditorCard extends LitElement {
  @property() hass!: HomeAssistant;
  @property() narrow!: boolean;

  @property() item?: string;
  @property() data?: {
    name: string,
    old_code: string,
    code: string,
    confirm_code: string,
    is_admin: boolean,
    can_arm: boolean,
    can_disarm: boolean
  };

  users?: Dictionary<AlarmoUser>;

  config?: AlarmoConfig;

  async firstUpdated() {
    this.users = await fetchUsers(this.hass);
    this.data = {
      name: "",
      code: "",
      old_code: "",
      confirm_code: "",
      is_admin: false,
      can_arm: true,
      can_disarm: true
    };

    if (this.item) {
      const user = this.users[this.item];
      this.data = {
        ...this.data,
        ...pick(user, ['name', 'is_admin', 'can_arm', 'can_disarm'])
      };
    }
  }

  render() {
    if (!this.data) return html``;

    return html`
<ha-card>
  <div class="card-header">
    <div class="name">
      ${this.item
        ? localize("panels.codes.cards.edit_user.title", this.hass.language)
        : localize("panels.codes.cards.new_user.title", this.hass.language)
      }
    </div>
    <ha-icon-button
      icon="hass:close"
      @click=${this.cancelClick}
    >
    </ha-icon-button>
  </div>
  <div class="card-content">
    ${this.item
        ? localize("panels.codes.cards.edit_user.description", this.hass.language, "{name}", this.users![this.item].name)
        : localize("panels.codes.cards.new_user.description", this.hass.language)
      }
  </div>

  <settings-row .narrow=${this.narrow}>
    <span slot="heading">${localize("panels.codes.cards.new_user.fields.name.heading", this.hass.language)}</span>
    <span slot="description">${localize("panels.codes.cards.new_user.fields.name.description", this.hass.language)}</span>

    <paper-input
      label="${localize("panels.codes.cards.new_user.fields.name.heading", this.hass.language)}"
      placeholder=""
      value=${this.data.name}
      @change=${(ev: Event) => this.data = { ...this.data!, name: (ev.target as HTMLInputElement).value }}
    >
    </paper-input>
  </settings-row>

      ${
      this.item
        ? html`
  <settings-row .narrow=${this.narrow}>
    <span slot="heading">${localize("panels.codes.cards.edit_user.fields.old_code.heading", this.hass.language)}</span>
    <span slot="description">${localize("panels.codes.cards.edit_user.fields.old_code.description", this.hass.language)}</span>

    <paper-input
      label="${localize("panels.codes.cards.edit_user.fields.old_code.heading", this.hass.language)}"
      placeholder=""
      type="password"
      value=${this.data.old_code}
      @change=${(ev: Event) => this.data = { ...this.data!, old_code: (ev.target as HTMLInputElement).value }}
    >
    </paper-input>
  </settings-row>
        `
        :
        ''
      }
      
      ${
      this.item && !this.data.old_code.length
        ? ''
        : html`
  <settings-row .narrow=${this.narrow}>
    <span slot="heading">${localize("panels.codes.cards.new_user.fields.code.heading", this.hass.language)}</span>
    <span slot="description">${localize("panels.codes.cards.new_user.fields.code.description", this.hass.language)}</span>

    <paper-input
      label="${localize("panels.codes.cards.new_user.fields.code.heading", this.hass.language)}"
      placeholder=""
      type="password"
      value=${this.data.code}
      @change=${(ev: Event) => this.data = { ...this.data!, code: (ev.target as HTMLInputElement).value }}
    >
    </paper-input>
  </settings-row>

  <settings-row .narrow=${this.narrow}>
    <span slot="heading">${localize("panels.codes.cards.new_user.fields.confirm_code.heading", this.hass.language)}</span>
    <span slot="description">${localize("panels.codes.cards.new_user.fields.confirm_code.description", this.hass.language)}</span>

    <paper-input
      label="${localize("panels.codes.cards.new_user.fields.confirm_code.heading", this.hass.language)}"
      placeholder=""
      type="password"
      value=${this.data.confirm_code}
      @change=${(ev: Event) => this.data = { ...this.data!, confirm_code: (ev.target as HTMLInputElement).value }}
    >
    </paper-input>
  </settings-row>
    `}

  <settings-row .narrow=${this.narrow}>
    <span slot="heading">${localize("panels.codes.cards.new_user.fields.is_admin.heading", this.hass.language)}</span>
    <span slot="description">${localize("panels.codes.cards.new_user.fields.is_admin.description", this.hass.language)}</span>

    <ha-switch
      ?checked=${this.data.is_admin}
      @change=${(ev: Event) => this.data = { ...this.data!, is_admin: (ev.target as HTMLInputElement).checked }}
    >
    </ha-switch>
  </settings-row>

  <settings-row .narrow=${this.narrow}>
    <span slot="heading">${localize("panels.codes.cards.new_user.fields.can_arm.heading", this.hass.language)}</span>
    <span slot="description">${localize("panels.codes.cards.new_user.fields.can_arm.description", this.hass.language)}</span>

    <ha-switch
      ?checked=${this.data.can_arm || this.data.is_admin}
      ?disabled=${this.data.is_admin}
      @change=${(ev: Event) => this.data = { ...this.data!, can_arm: (ev.target as HTMLInputElement).checked }}
    >
    </ha-switch>
  </settings-row>

  <settings-row .narrow=${this.narrow}>
    <span slot="heading">${localize("panels.codes.cards.new_user.fields.can_disarm.heading", this.hass.language)}</span>
    <span slot="description">${localize("panels.codes.cards.new_user.fields.can_disarm.description", this.hass.language)}</span>

    <ha-switch
      ?checked=${this.data.can_disarm || this.data.is_admin}
      ?disabled=${this.data.is_admin}
      @change=${(ev: Event) => this.data = { ...this.data!, can_disarm: (ev.target as HTMLInputElement).checked }}
    >
    </ha-switch>
  </settings-row>
        
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

  private deleteClick(ev: Event) {
    if (!this.item) return;
    deleteUser(this.hass, this.item)
      .catch(e => handleError(e, ev))
      .then(() => { this.cancelClick(); });
  }


  private saveClick(ev: Event) {
    if (!this.data) return;
    if (!this.data.name.length) showErrorDialog(ev, localize("panels.codes.cards.new_user.errors.no_name", this.hass.language));
    else if (this.data.code.length < 4 && (!this.item || this.data.old_code.length)) showErrorDialog(ev, localize("panels.codes.cards.new_user.errors.no_code", this.hass.language));
    else if (this.data.code !== this.data.confirm_code) showErrorDialog(ev, localize("panels.codes.cards.new_user.errors.code_mismatch", this.hass.language));
    else {
      if (this.data.is_admin) this.data = { ...this.data, can_arm: true, can_disarm: true };

      if (!this.item) {
        saveUser(this.hass, omit(this.data, ['confirm_code', 'old_code']))
          .catch(e => handleError(e, ev))
          .then(() => { this.cancelClick(); })
      }
      else {
        let data: Partial<AlarmoUser> = { ...pick(this.data, ['name', 'is_admin', 'can_arm', 'can_disarm']), user_id: this.item };
        if (this.data.old_code.length) {
          data = { ...data, old_code: this.data.old_code, code: this.data.code };
        }
        saveUser(this.hass, data)
          .catch(e => handleError(e, ev))
          .then(() => { this.cancelClick(); })
      }
    }
  }

  private cancelClick() {
    navigate(this, "/alarmo/codes", true);
  }

  static styles = commonStyle;
}
