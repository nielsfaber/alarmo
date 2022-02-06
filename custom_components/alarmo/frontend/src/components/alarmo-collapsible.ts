import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators';

@customElement('alarmo-collapsible-group')
class AlarmoCollabsibleGroup extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
      }
    `;
  }

  render() {
    return html`
      <slot></slot>
    `;
  }

  constructor() {
    super();
    this.addEventListener('clickHeader', this.manageSpoilers);
  }

  manageSpoilers(ev) {
    ev.target.toggleAttribute('active');

    let active = this.querySelectorAll('alarmo-collapsible-header[active]');

    active.forEach(function(el) {
      if (el !== ev.target) el.removeAttribute('active');
    });
  }
}

@customElement('alarmo-collapsible-item')
class AcItem extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
      }
    `;
  }

  render() {
    return html`
      <slot></slot>
    `;
  }
}

@customElement('alarmo-collapsible-header')
class AlarmoCollabsibleHeader extends LitElement {
  @property({ type: CustomEvent })
  clickHeader = new CustomEvent('clickHeader', {
    detail: { message: 'clickHeader happened.' },
    bubbles: true,
    composed: true,
  });

  @property({
    type: Boolean,
    attribute: true,
    reflect: true,
  })
  active = false;

  constructor() {
    super();
    this.addEventListener('click', this.handleClick);
  }

  handleClick() {
    this.dispatchEvent(this.clickHeader);
  }

  render() {
    return html`
      <paper-icon-item>
        <slot name="icon" slot="item-icon"></slot>
        <paper-item-body two-line>
          <slot name="title"></slot>
          <div secondary>
            <slot name="description"></slot>
          </div>
        </paper-item-body>
        <ha-icon icon="hass:chevron-down" class="chevron"></ha-icon>
      </paper-icon-item>
    `;
  }

  static get styles() {
    return css`
      :host {
        display: block;
        cursor: pointer;
      }
      :host .chevron {
        transition: 0.4s;
      }
      :host([active]) .chevron {
        transform: rotate(180deg);
      }

      :host paper-icon-item::before {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        pointer-events: none;
        content: '';
        transition: opacity 15ms linear;
        will-change: opacity;
        background-color: black;
        opacity: 0;
      }
      :host paper-icon-item:hover::before {
        opacity: 0.04;
      }
      :host([active]) paper-icon-item::before {
        opacity: 0.1;
      }
      :host([active]) paper-icon-item:hover::before {
        opacity: 0.12;
      }
      :host paper-icon-item:active::before, :host([active]) paper-icon-item:active::before {
        opacity: 0.14;
      }
      ::slotted(ha-icon) {
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 16px;
        }
      }
    `;
  }

  attributeChangedCallback(name, oldval, newval) {
    if (this.hasAttribute('active') && this.nextElementSibling) {
      (this.nextElementSibling as HTMLElement).style.maxHeight = this.nextElementSibling.scrollHeight + 'px';
    } else if (this.nextElementSibling) {
      (this.nextElementSibling as HTMLElement).style.maxHeight = '0px';
    }
    super.attributeChangedCallback(name, oldval, newval);
  }
}

@customElement('alarmo-collapsible-body')
class AlarmoCollabsibleBody extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
        background-color: var(--card-background-color);
        max-height: 0px;
        overflow: hidden;
        transition: max-height 0.2s ease-out;
      }
      .wrapper {
      }
    `;
  }

  render() {
    return html`
      <div class="wrapper">
        <slot>Default details</slot>
      </div>
    `;
  }
}
