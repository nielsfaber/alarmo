import { LitElement, html, customElement, property, internalProperty } from 'lit-element';
import { HomeAssistant } from 'custom-card-helpers';
import { getAlarmEntity } from './helpers';
import { platform, editConfigService } from './const';
import { commonStyle } from './styles';

@customElement('dialog-user-new')
export class DialogUserNew extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;

  @internalProperty() private _params?: {};

  @property() name = '';
  @property() code = '';
  @property() codeConfirm = '';
  @property() error = '';
  @property() is_admin = false;
  @property() can_arm = false;
  @property() can_disarm = false;

  public async showDialog(params): Promise<void> {
    this._params = params;
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
          Add
        </mwc-button>
        <div slot="heading">
          <ha-header-bar>
            <ha-icon-button slot="navigationIcon" dialogAction="cancel" icon="mdi:close"> </ha-icon-button>
            <span slot="title">
              Create new user
            </span>
          </ha-header-bar>
        </div>
        <div class="wrapper">
          Please provide a username and code.<br />
          The code may be a pincode as well.<br />

          <paper-input
            label="name"
            required
            value="${this.name}"
            class="state-input"
            @change=${ev => {
              this.name = ev.target.value;
            }}
          ></paper-input>

          <paper-input
            label="code"
            required
            value="${this.code}"
            class="state-input"
            type="password"
            @change=${ev => {
              this.code = ev.target.value;
            }}
          ></paper-input>

          <paper-input
            label="confirm code"
            required
            value="${this.codeConfirm}"
            type="password"
            @change=${ev => {
              this.codeConfirm = ev.target.value;
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
    if (!this.name.length) this.error = 'no username provided';
    else if (this.code.length < 4) this.error = 'code should have 4 characters/numbers minimum';
    else if (!this.codeConfirm.length) this.error = 'repeat the code';
    else if (this.code !== this.codeConfirm) this.error = "the codes don't match";
    else this.error = '';

    if (this.error) {
      this.code = '';
      this.codeConfirm = '';
    } else {
      this.hass.callService(platform, editConfigService, {
        entity_id: getAlarmEntity(this.hass),
        add_user: {
          name: this.name,
          code: this.code,
          is_admin: this.is_admin,
          can_arm: this.can_arm || this.is_admin,
          can_disarm: this.can_disarm || this.is_admin,
        },
      });
      this.closeDialog();
    }
  }

  static styles = commonStyle;
}
