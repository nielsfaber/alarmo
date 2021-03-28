import { HomeAssistant } from "custom-card-helpers";
import {
  LitElement,
  html,
  css,
  PropertyValues,
  property,
} from "lit-element";
import { ICONS, PENDING_STATES } from "../const";

class AlarmoStateBadge extends LitElement {

  @property() hass!: HomeAssistant;
  @property() entity!: string;

  duration: number = 0;
  datetime: Date | null = null;
  timer = 0;
  offset = 0;

  protected shouldUpdate(changedProps: PropertyValues): boolean {
    if (!changedProps.size) return true;
    const oldHass = changedProps.get("hass") as HomeAssistant | undefined;
    if (
      !oldHass ||
      oldHass.themes !== this.hass!.themes ||
      oldHass.language !== this.hass!.language
    ) return true;
    if (oldHass.states[this.entity].state !== this.hass.states[this.entity].state) {
      const oldState = oldHass.states[this.entity].state;
      const newState = this.hass.states[this.entity].state;
      if (PENDING_STATES.includes(newState)) this.startTimer();
      else if (PENDING_STATES.includes(oldState)) this.stopTimer();
      return true;
    }

    return false;
  }

  firstUpdated() {
    const state = this.hass.states[this.entity].state;
    if (PENDING_STATES.includes(state)) this.startTimer();
  }

  startTimer() {
    clearInterval(this.timer);
    const stateObj = this.hass.states[this.entity];
    if (!stateObj.attributes.expiration || !stateObj.attributes.delay) return;
    this.duration = stateObj.attributes.delay;
    this.datetime = new Date(stateObj.attributes.expiration);
    this.offset = 0;
    const remaining = this.getRemaining();
    this.offset = remaining - this.duration;

    this.timer = window.setInterval(() => {
      this.requestUpdate();
    }, 1000);
  }

  stopTimer() {
    clearInterval(this.timer);
    this.datetime = null;
    this.duration = 0;
  }

  getRemaining(): number {
    if (!this.datetime) return 0;
    const seconds = (this.datetime.getTime() - new Date().getTime()) / 1000 - this.offset;
    if (seconds < 0) {
      clearInterval(this.timer);
      return 0;
    }
    return seconds;
  }

  getTime() {
    const seconds = Math.round(this.getRemaining());
    if (seconds <= 0) return "";
    return seconds;
  }

  getFraction() {
    if (!this.duration) return 1;
    return (Math.round(this.getRemaining()) - 1) / this.duration;
  }

  private _stateValue(state: string) {
    if (this.datetime && this.duration) {
      return html`
        ${this.getTime()}
      `;
    }
    else {
      return html`
        <ha-icon .icon=${ICONS[state]}></ha-icon>
      `;
    }
  }


  render() {
    let c = 50;
    let r = 45;
    let arcLength = 2 * Math.PI * r;

    const stateObj = this.hass.states[this.entity];
    const timerRunning = this.datetime && this.duration;

    return html`
      <svg
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g class="track ${stateObj.state.split("_").shift()} ${timerRunning ? "timer" : ""}">
          <circle cx="${c}" cy="${c}" r="${r}"></circle>
          <path
            stroke-dasharray="${(this.getFraction() * arcLength).toFixed(2)} ${arcLength.toFixed(2)}"
            class="remaining"
            d="
              M ${c}, ${c}
              m -${r}, 0
              a ${r},${r} 0 1,0 90,0
              a ${r},${r} 0 1,0 -90,0
            "
          ></path>
        </g>
      </svg>
      <div class="overlay ${stateObj.state.split("_").shift()} ${timerRunning ? "timer" : ""}">
        <div class="value">
          ${this._stateValue(stateObj.state)}
        </div>
      </div>
      `;
  }

  static get styles() {
    return css`
      :host {
        --alarm-color-disarmed: var(--label-badge-green);
        --alarm-color-pending: var(--label-badge-yellow);
        --alarm-color-triggered: var(--label-badge-red);
        --alarm-color-armed: var(--label-badge-red);
        width: 60px;
        height: 60px;
        cursor: pointer;
      }
      svg {
        overflow: visible;
        display: block;
        transform: scaleX(-1);
      }
      .track {
        stroke-width: 3;
        stroke-linecap: round;
        stroke: lightgray;
        fill: none;
      }
      .track .remaining {
        transform: rotate(90deg);
        transform-origin: center;
        transition: 0.3s linear stroke;
        stroke: var(--alarm-state-color);
      }
      .track.arming .remaining, .track.pending .remaining {
        transition: 1s linear stroke-dasharray;
      }
      .overlay {
        position: absolute;
        margin-top: -60px;
        margin-left: 0;
        width: 60px;
        height: 60px;
        font-size: 1.5em;
        white-space: nowrap;
      }
      .value {
        overflow: hidden;
        text-overflow: ellipsis;
        text-align: center;
        color: var(--alarm-state-color);
        transition: 0.3s linear color;
        display: flex;
        flex: 1;
        height: 100%;
        align-items: center;
        justify-content: center;
        font-weight: 500;
      }
      .value ha-icon {
        --mdc-icon-size: 1.2em;
      }
      .disarmed {
        --alarm-state-color: var(--alarm-color-disarmed);
      }
      .triggered {
        --alarm-state-color: var(--alarm-color-triggered);
        animation: pulse 1s infinite;
      }
      .arming, .pending {
        --alarm-state-color: var(--alarm-color-pending);
        animation: pulse 1s infinite;
      }
      .arming.timer, .pending.timer {
        --alarm-state-color: var(--primary-color);
        animation: none;
      }
      .armed {
        --alarm-state-color: var(--alarm-color-armed);
      }
      @keyframes pulse {
        0% {
          opacity: 1;
        }
        50% {
          opacity: 0;
        }
        100% {
          opacity: 1;
        }
      }
    `;
  }
}
customElements.define('alarmo-state-badge', AlarmoStateBadge);