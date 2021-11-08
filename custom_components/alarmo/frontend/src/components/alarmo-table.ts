import { LitElement, html, TemplateResult, css } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { Dictionary } from '../types';

export interface TableColumn {
  title?: string;
  width: string;
  hide?: boolean;
  text?: boolean;
  grow?: boolean;
  align?: 'center' | 'right';
}

export interface TableData {
  [key: string]: string | TemplateResult;
}

@customElement('alarmo-table')
export class AlarmoTable extends LitElement {
  @property() columns?: Dictionary<TableColumn>;
  @property() data?: TableData[];
  @property({ type: Boolean }) selectable?: boolean;

  render() {
    if (!this.columns || !this.data) return html``;
    return html`
      <div class="table">
        ${this.renderHeaderRow()}
        ${this.data.length
          ? this.data.map(e => this.renderDataRow(e))
          : html`
              <div class="table-row">
                <div class="table-cell text grow">
                  <slot></slot>
                </div>
              </div>
            `}
      </div>
    `;
  }

  renderHeaderRow() {
    if (!this.columns) return html``;
    return html`
      <div class="table-row header">
        ${Object.values(this.columns).map(e =>
          e.hide
            ? ''
            : html`
                <div
                  class="table-cell ${e.text ? 'text' : ''} ${e.grow ? 'grow' : ''} ${e.align ? e.align : ''}"
                  style="${e.grow ? '' : `width: ${e.width}`}"
                >
                  <span>${e.title || ''}</span>
                </div>
              `
        )}
      </div>
    `;
  }

  renderDataRow(data: TableData) {
    if (!this.columns) return html``;
    return html`
      <div class="table-row ${this.selectable ? 'selectable' : ''}" @click=${() => this.handleClick(String(data.id))}>
        ${Object.entries(this.columns).map(([col, e]) =>
          e.hide
            ? ''
            : html`
                <div
                  class="table-cell ${e.text ? 'text' : ''} ${e.grow ? 'grow' : ''} ${e.align ? e.align : ''}"
                  style="${e.grow ? '' : `width: ${e.width}`}"
                >
                  ${data[col]}
                </div>
              `
        )}
      </div>
    `;
  }

  handleClick(id: string) {
    if (!this.selectable) return;
    const myEvent = new CustomEvent('row-click', { detail: { id: id } });
    this.dispatchEvent(myEvent);
  }

  static styles = css`
    :host {
      width: 100%;
    }
    div.table {
      display: inline-flex;
      flex-direction: column;
      box-sizing: border-box;
      overflow: hidden;
      width: 100%;
    }
    div.table .header {
      font-weight: bold;
    }
    div.table-row {
      display: flex;
      width: 100%;
      height: 52px;
      border-top: 1px solid var(--divider-color);
    }

    div.table-cell {
      align-self: center;
      overflow: hidden;
      text-overflow: ellipsis;
      flex-shrink: 0;
      box-sizing: border-box;
    }
    div.table-cell.text {
      padding: 4px 16px;
    }
    div.table-cell.grow {
      flex-grow: 1;
      flex-shrink: 1;
    }

    div.table-cell > ha-switch {
      width: 68px;
      height: 48px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    div.table-cell.center {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    div.table-cell.right {
      display: flex;
      align-items: center;
      justify-content: flex-end;
    }

    div.table-cell > ha-icon-button {
      color: var(--secondary-text-color);
    }
    div.table .header div.table-cell span {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      min-width: 0;
    }

    div.table-row.selectable {
      cursor: pointer;
    }
    div.table-row.selectable:hover {
      background-color: rgba(var(--rgb-primary-text-color), 0.04);
    }

    ha-icon {
      color: var(--paper-item-icon-color);
      padding: 8px;
    }

    .secondary {
      color: var(--secondary-text-color);
      display: flex;
      padding-top: 4px;
    }

    a,
    a:visited {
      color: var(--primary-color);
    }
  `;
}
