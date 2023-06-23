import { mdiFilterVariant, mdiClose } from '@mdi/js';
import { LitElement, html, TemplateResult, css, PropertyValues } from 'lit';
import { property, customElement, state, query } from 'lit/decorators.js';

import { Dictionary, HomeAssistant } from '../types';
import { localize } from '../../localize/localize';

import './alarmo-chip-set';
import { omit, pick } from '../helpers';

export interface TableColumn {
  title?: string;
  width: string;
  hide?: boolean;
  text?: boolean;
  grow?: boolean;
  align?: 'center' | 'right';
  renderer?: (data: any) => string | TemplateResult;
}

export type TableData = Record<string, any> | { id: string | number; warning?: boolean };

interface TableFilterItem {
  name: string;
  items: { value: string; name: string; badge?: Function | number }[];
  value: string[];
  binary?: boolean;
}

export type TableFilterConfig = Record<string, TableFilterItem>;

type MwcMenu = { close: Function; show: Function; anchor: HTMLElement; open: boolean };

@customElement('alarmo-table')
export class AlarmoTable extends LitElement {
  @property()
  hass!: HomeAssistant;

  @property()
  columns?: Dictionary<TableColumn>;

  @property()
  data?: TableData[];

  set filters(data: TableFilterConfig) {
    if (this.filterConfig) return;
    this.filterConfig = data;
  }

  @state()
  filterConfig?: TableFilterConfig;

  @state()
  filterSelection?: Record<string, { value: string[] }>;

  @property({ type: Boolean })
  selectable?: boolean;

  @query('mwc-menu', true)
  private _menu?: MwcMenu;

  shouldUpdate(changedProps: PropertyValues) {
    if (changedProps.get('filters') && !this.filterConfig) {
      this.filterConfig = changedProps.get('filters') as TableFilterConfig;
    }
    return true;
  }

  render() {
    if (!this.columns || !this.data) return html``;

    const filteredData = this.data.filter(e => this.filterTableData(e, this.filterConfig));
    return html`
      ${this.renderFilterRow()}
      <div class="table">
        ${this.renderHeaderRow()}
        ${filteredData.length
          ? filteredData.map(e => this.renderDataRow(e))
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
      <div
        class="table-row ${this.selectable ? 'selectable' : ''} ${data.warning ? 'warning' : ''}"
        @click=${() => this.handleClick(String(data.id))}
      >
        ${Object.entries(this.columns).map(([col, e]) =>
          e.hide
            ? ''
            : html`
                <div
                  class="table-cell ${e.text ? 'text' : ''} ${e.grow ? 'grow' : ''} ${e.align ? e.align : ''}"
                  style="${e.grow ? '' : `width: ${e.width}`}"
                >
                  ${e.renderer ? e.renderer(data) : data[col]}
                </div>
              `
        )}
      </div>
    `;
  }

  filterTableData(data: TableData, filterConfig?: Record<string, { value: string[] }>) {
    if (!filterConfig) return true;
    return Object.keys(filterConfig).every(key => {
      if (!Object.keys(data).includes(key)) return true;
      const filterValue = filterConfig![key].value;
      if (!filterValue || !filterValue.length) return true;
      if (Array.isArray(data[key])) return data[key].some(e => filterValue.includes(e));
      return filterValue.includes(data[key]);
    });
  }

  private _getFilteredItems() {
    return this.data!.filter(e => !this.filterTableData(e, this.filterConfig)).length;
  }

  handleClick(id: string) {
    if (!this.selectable) return;
    const myEvent = new CustomEvent('row-click', { detail: { id: id } });
    this.dispatchEvent(myEvent);
  }

  renderFilterRow() {
    if (!this.filterConfig) return html``;

    return html`
      <div class="table-filter">
        <ha-icon-button
          .path=${mdiFilterVariant}
          ?disabled=${!this.data?.length}
          label=${localize('components.table.filter.label', this.hass.language)}
          @click=${this._toggleFilterMenu}
        ></ha-icon-button>
        <mwc-menu .corner=${'BOTTOM_START'} .fixed=${true} @closed=${this._applyFilterSelection}>
          ${this.renderFilterMenu()}
        </mwc-menu>

        ${this._getFilteredItems()
          ? html`
              <alarmo-chip cancellable table @button-clicked=${this._clearFilters}>
                ${localize(
                  'components.table.filter.hidden_items',
                  this.hass.language,
                  'number',
                  this._getFilteredItems()
                )}
              </alarmo-chip>
            `
          : ''}
      </div>
    `;
  }

  private _toggleFilterMenu(ev: Event) {
    const el = ev.target as HTMLElement;
    this._menu!.anchor = el;
    if (this._menu!.open) this._menu!.close();
    else {
      this.filterSelection = Object.entries(this.filterConfig!).reduce(
        (acc, [k, v]) => ({ ...acc, [k]: pick(v, ['value']) }),
        {}
      );
      this._menu!.show();
    }
  }

  renderFilterMenu() {
    if (!this.filterConfig || !this.filterSelection) return html``;

    return html`
      <span class="header">
        ${localize('components.table.filter.label', this.hass.language)}
      </span>
      <ha-icon-button
        .path=${mdiClose}
        @click=${() => {
          this._menu!.close();
          setTimeout(() => this._menu!.anchor.blur(), 50);
        }}
      ></ha-icon-button>
      ${Object.keys(this.filterConfig).map(key => {
        if (this.filterConfig![key].binary) {
          return html`
            <div class="dropdown-item checkbox">
              <ha-checkbox
                @change=${(ev: Event) => this._updateFilterSelection(key, (ev.target as HTMLInputElement).checked)}
                ?checked=${this.filterSelection![key].value.length}
              ></ha-checkbox>
              <span class="name">
                ${this.filterConfig![key].name}
              </span>
            </div>
          `;
        }

        let items = this.filterConfig![key].items;
        items = items.map(e => {
          if (e.badge && typeof e.badge == 'function')
            return {
              ...e,
              badge: e.badge(this.data?.filter(a => this.filterTableData(a, omit(this.filterSelection!, key)))),
            };
          else return e;
        });
        const value = this.filterSelection![key].value;
        return html`
          <div class="dropdown-item">
            <span class="name">
              ${this.filterConfig![key].name}
            </span>
            <alarmo-chip-set
              selectable
              .items=${items}
              @value-changed=${(ev: CustomEvent) => this._updateFilterSelection(key, ev.detail)}
              .value=${value}
            ></alarmo-chip-set>
          </div>
        `;
      })}
    `;
  }

  private _updateFilterSelection(key: string, value: string[] | boolean) {
    if (typeof value == 'boolean') {
      value = (value ? this.filterConfig![key].items[0].value : []) as string[];
      if (Object.keys(this.filterConfig!).length == 1) {
        this._menu!.close();
        setTimeout(() => this._menu!.anchor.blur(), 50);
      }
    }
    this.filterSelection = { ...this.filterSelection!, [key]: { value: value } };
  }

  private _clearFilters() {
    Object.keys(this.filterConfig!).forEach(key => {
      this.filterConfig = {
        ...this.filterConfig!,
        [key]: { ...this.filterConfig![key], value: [] },
      };
    });
  }

  private _applyFilterSelection() {
    Object.keys(this.filterConfig!).forEach(key => {
      this.filterConfig = {
        ...this.filterConfig!,
        [key]: { ...this.filterConfig![key], ...this.filterSelection![key] },
      };
    });
  }

  static styles = css`
    :host {
      width: 100%;
    }
    div.table {
      display: inline-flex;
      flex-direction: column;
      box-sizing: border-box;
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
      flex-direction: row;
      position: relative;
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
    div.table-cell > * {
      transition: color 0.2s ease-in-out;
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
    .table-row::before {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      opacity: 0.12;
      pointer-events: none;
      content: '';
      border-radius: 4px;
    }
    div.table-row.selectable:hover::before {
      background-color: rgba(var(--rgb-primary-text-color), 0.5);
    }
    div.table-row.warning::before {
      background-color: var(--error-color);
      opacity: 0.06;
    }
    div.table-row.warning:hover::before {
      background-color: var(--error-color);
      opacity: 0.12;
    }
    div.table-row.warning span {
      color: var(--error-color);
    }

    ha-icon {
      color: var(--state-icon-color);
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

    span.disabled {
      color: var(--secondary-text-color);
    }
    span.secondary.disabled {
      color: var(--disabled-text-color);
    }
    ha-icon.disabled {
      color: var(--state-unavailable-color);
    }

    div.table-filter {
      display: flex;
      width: 100%;
      min-height: 52px;
      border-top: 1px solid var(--divider-color);
      box-sizing: border-box;
      padding: 2px 8px;
      flex: 1;
      position: relative;
      flex-direction: row;
      align-items: center;
    }
    mwc-menu .header {
      display: flex;
      padding: 8px 16px;
      font-weight: bold;
    }
    mwc-menu ha-icon-button {
      position: absolute;
      top: 8px;
      right: 8px;
    }
    div.dropdown-item {
      display: flex;
      flex-direction: column;
      flex-shrink: 0;
      padding: 8px 16px;
      width: 100%;
      min-height: 52px;
      box-sizing: border-box;
    }
    div.dropdown-item .name {
      display: inline-flex;
    }
    div.dropdown-item alarmo-chips {
      display: flex;
      flex-direction: row;
    }
    div.dropdown-item.checkbox {
      flex-direction: row;
      align-items: center;
    }
    ha-button-menu mwc-button {
      margin-left: 16px;
    }
  `;
}
