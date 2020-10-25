import { LitElement, html, customElement, property, internalProperty } from 'lit-element';
import { HomeAssistant } from 'custom-card-helpers';
import { getAlarmEntity } from './helpers';
import { UserConfig, removeUserSchema, editUserSchema } from './types';
import { platform, editConfigService } from './const';
import { commonStyle } from './styles';

@customElement('dialog-user-edit')
export class DialogUserEdit extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;

  @internalProperty() private _params?: {};

  @property() name = '';
  @property() code = '';
  @property() codeNew = '';
  @property() codeNewConfirm = '';
  @property() error = '';
  @property() is_admin = false;
  @property() can_arm = false;
  @property() can_disarm = false;

  public async showDialog(params: UserConfig): Promise<void> {
    this._params = params;
    this.name = params.name;
    this.is_admin = params.is_admin;
    this.can_arm = params.can_arm;
    this.can_disarm = params.can_disarm;
    await this.updateComplete;
  }

  public async closeDialog() {
    this._params = undefined;
  }

  render() {
    if (!this._params) return html``;

    return html`
      <ha-dialog open .heading=${true} @closed=${this.closeDialog} @close-dialog=${this.closeDialog}>
        <mwc-button slot="primaryAction" @click=${this.confirmClick}>
          Save
        </mwc-button>
        <mwc-button slot="secondaryAction" @click=${this.removeUserClick} dialogAction="close" class="warning">
          Remove user
        </mwc-button>
        <div slot="heading">
          <ha-header-bar>
            <ha-icon-button slot="navigationIcon" dialogAction="cancel" icon="mdi:close"> </ha-icon-button>
            <span slot="title">
              Edit user '${this.name}'
            </span>
          </ha-header-bar>
        </div>
        <div class="wrapper">
          Leave the code input empty unless you want to change it.

          <paper-input
            label="old code"
            required
            value="${this.code}"
            class="state-input"
            type="password"
            @change=${ev => {
              this.code = ev.target.value;
            }}
          ></paper-input>

          <paper-input
            label="new code"
            required
            value="${this.codeNew}"
            type="password"
            @change=${ev => {
              this.codeNew = ev.target.value;
            }}
          ></paper-input>

          <paper-input
            label="confirm new code"
            required
            value="${this.codeNewConfirm}"
            type="password"
            @change=${ev => {
              this.codeNewConfirm = ev.target.value;
            }}
          ></paper-input>

          <div class="checkbox-row">
            <ha-switch
              ?checked=${this.is_admin}
              @change=${(ev: Event) => {
                this.is_admin = (ev.target as HTMLInputElement).checked;
              }}
            >
            </ha-switch>
            User is admininistrator
          </div>

          <div class="checkbox-row">
            <ha-switch
              ?checked=${this.can_arm || this.is_admin}
              ?disabled=${this.is_admin}
              @change=${(ev: Event) => {
                this.can_arm = (ev.target as HTMLInputElement).checked;
              }}
            >
            </ha-switch>
            Allow user to arm the alarm
          </div>

          <div class="checkbox-row">
            <ha-switch
              ?checked=${this.can_disarm || this.is_admin}
              ?disabled=${this.is_admin}
              @change=${(ev: Event) => {
                this.can_disarm = (ev.target as HTMLInputElement).checked;
              }}
            >
            </ha-switch>
            Allow user to disarm the alarm
          </div>

          <div class="warning">
            ${this.error}
          </div>
        </div>
      </ha-dialog>
    `;
  }

  confirmClick() {
    if (this.codeNew) {
      if (this.code.length < 4) this.error = 'provide the old code';
      else if (this.codeNew.length < 4) this.error = 'code should have 4 characters/numbers minimum';
      else if (!this.codeNewConfirm.length) this.error = 'repeat the code';
      else if (this.codeNew !== this.codeNewConfirm) this.error = "the codes don't match";
      else this.error = '';
    }

    if (this.error) {
      this.code = '';
      this.codeNew = '';
      this.codeNewConfirm = '';
    } else {
      const call: editUserSchema = {
        entity_id: getAlarmEntity(this.hass),
        edit_user: {
          name: this.name,
          code: this.code,
          code_new: this.codeNew,
          is_admin: this.is_admin,
          can_arm: this.can_arm,
          can_disarm: this.can_disarm,
        },
      };
      this.hass.callService(platform, editConfigService, call);
      this.closeDialog();
    }
  }

  removeUserClick() {
    const call: removeUserSchema = {
      entity_id: getAlarmEntity(this.hass),
      edit_user: {
        name: this.name,
        remove: true,
      },
    };
    this.hass.callService(platform, editConfigService, call);
  }

  static styles = commonStyle;
}
