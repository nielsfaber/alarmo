import { mdiFilterVariant, mdiClose, mdiArrowDown, mdiArrowUp, mdiMenuDown } from '@mdi/js';
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
  sortable?: boolean;
  sortDefault?: 'asc' | 'desc';
  sort?: (data: any) => string | number;
  search?: (data: any) => string | number;
}

export type TableData = Record<string, any> | { id: string | number; warning?: boolean };

interface TableFilterItem {
  name: string;
  items: { value: string; name: string; badge?: Function | number }[];
  value: string[];
  binary?: boolean;
}

export type TableFilterConfig = Record<string, TableFilterItem>;

type HaDropdown = { open: boolean };

@customElement('alarmo-table')
export class AlarmoTable extends LitElement {
  @property()
  hass!: HomeAssistant;

  @property()
  columns?: Dictionary<TableColumn>;

  @property()
  data?: TableData[];

  set filters(data: TableFilterConfig) {
    if (!this.filterConfig) {
      this.filterConfig = data;
      return;
    }

    this.filterConfig = Object.entries(data).reduce(
      (filters, [key, filter]) => ({
        ...filters,
        [key]: {
          ...filter,
          value: this.filterConfig?.[key]?.value || filter.value,
        },
      }),
      {} as TableFilterConfig
    );
  }

  @state()
  filterConfig?: TableFilterConfig;

  @state()
  filterSelection?: Record<string, { value: string[] }>;

  @state()
  private sortConfig?: { key: string; direction: 'asc' | 'desc' };

  @state()
  private searchQuery: string = '';

  @property({ type: Boolean })
  selectable?: boolean;

  @query('ha-dropdown', true)
  private _menu?: HaDropdown;

  shouldUpdate(changedProps: PropertyValues) {
    if (changedProps.get('filters') && !this.filterConfig) {
      this.filterConfig = changedProps.get('filters') as TableFilterConfig;
    }
    if (changedProps.get('columns') && this.columns && !this.sortConfig) {
      const defaultSort = Object.entries(this.columns).find(([, col]) => col.sortDefault);
      if (defaultSort) {
        const [key, col] = defaultSort;
        this.sortConfig = { key, direction: col.sortDefault || 'asc' };
      }
    }
    return true;
  }

  render() {
    if (!this.columns || !this.data) return html``;

    let filteredData = this.data.filter(e => this.filterTableData(e, this.filterConfig));
    filteredData = filteredData.filter(e => this.matchesSearch(e));
    filteredData = this.sortTableData(filteredData);
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
        ${Object.entries(this.columns).map(([key, e]) =>
      e.hide
        ? ''
        : html`
                <div
                  class="table-cell ${e.text ? 'text' : ''} ${e.grow ? 'grow' : ''} ${e.align ? e.align : ''} ${e.sortable ? 'sortable' : ''} ${this.sortConfig?.key === key ? 'sorted' : 'not-sorted'}"
                  style="${e.grow ? '' : `width: ${e.width}`}"
                  role=${e.sortable ? 'button' : ''}
                  tabindex=${e.sortable ? '0' : '-1'}
                  @click=${e.sortable ? (ev: Event) => this.toggleSort(ev, key) : undefined}
                  @keydown=${e.sortable
                    ? (ev: KeyboardEvent) => {
                        if (ev.key === 'Enter' || ev.key === ' ') {
                          ev.preventDefault();
                          this.toggleSort(ev, key);
                        }
                      }
                    : undefined}
                >
                  ${e.sortable
                    ? html`
                        <ha-svg-icon class="sort-icon" .path=${this.getSortIcon(key)}></ha-svg-icon>
                      `
                    : ''}
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

  private matchesSearch(data: TableData) {
    if (!this.columns) return true;
    if (!this.hasSearchableColumns()) return true;
    if (!this.searchQuery || !this.searchQuery.trim()) return true;

    const tokens = this.searchQuery
      .toLowerCase()
      .trim()
      .split(/\s+/)
      .filter(Boolean);
    if (!tokens.length) return true;

    const searchable: string[] = [];
    Object.entries(this.columns).forEach(([, col]) => {
      if (col.hide || !col.search) return;
      const value = col.search(data);
      if (value === undefined || value === null) return;
      if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
        searchable.push(String(value).toLowerCase());
      }
    });

    if (!searchable.length) return false;
    const haystack = searchable.join(' ');
    return tokens.every(token => haystack.includes(token));
  }

  private sortTableData(data: TableData[]) {
    if (!this.sortConfig || !this.columns) return data;
    const column = this.columns[this.sortConfig.key];
    if (!column || !column.sortable) return data;
    const getValue = column.sort || ((row: TableData) => (row as any)[this.sortConfig!.key]);
    const dir = this.sortConfig.direction === 'asc' ? 1 : -1;

    return [...data].sort((a, b) => {
      const av = getValue(a);
      const bv = getValue(b);
      if (av == null && bv == null) return 0;
      if (av == null) return -1 * dir;
      if (bv == null) return 1 * dir;
      if (typeof av === 'number' && typeof bv === 'number') return (av - bv) * dir;
      const as = String(av).toLowerCase();
      const bs = String(bv).toLowerCase();
      if (as === bs) return 0;
      return (as < bs ? -1 : 1) * dir;
    });
  }

  private toggleSort(ev: Event, key: string) {
    ev.stopPropagation();
    if (!this.sortConfig || this.sortConfig.key !== key) {
      this.sortConfig = { key, direction: 'asc' };
      return;
    }
    if (this.sortConfig.direction === 'asc') {
      this.sortConfig = { key, direction: 'desc' };
      return;
    }
    this.sortConfig = undefined;
  }

  private getSortIcon(key: string) {
    if (!this.sortConfig || this.sortConfig.key !== key) return mdiArrowDown;
    return this.sortConfig.direction === 'asc' ? mdiArrowDown : mdiArrowUp;
  }

  private getSortableColumns() {
    if (!this.columns) return [];
    return Object.entries(this.columns).filter(([, column]) => column.sortable && !column.hide);
  }

  private getCurrentSortColumn() {
    const sortableColumns = this.getSortableColumns();
    if (!sortableColumns.length) return undefined;
    return sortableColumns.find(([key]) => key === this.sortConfig?.key) || sortableColumns[0];
  }

  private selectSortColumn(key: string) {
    this.sortConfig = {
      key,
      direction: this.sortConfig?.key === key ? this.sortConfig.direction : 'asc',
    };
  }

  private _getActiveFilterCount() {
    if (!this.filterConfig) return 0;
    return Object.values(this.filterConfig).filter(filter => filter.value.length).length;
  }

  handleClick(id: string) {
    if (!this.selectable) return;
    const myEvent = new CustomEvent('row-click', { detail: { id: id } });
    this.dispatchEvent(myEvent);
  }

  renderFilterRow() {
    const hasFilters = !!this.filterConfig && Object.keys(this.filterConfig).length > 0;
    const hasSearchableColumns = this.hasSearchableColumns();
    if (!hasFilters && !hasSearchableColumns) return html``;

    return html`
      <div class="table-filter">
        ${hasFilters || this._getFilteredItems()
        ? html`
              <div class="filter-actions">
                ${hasFilters
                  ? html`
                      <ha-dropdown
                        @wa-show=${this._showFilterMenu}
                        @wa-after-hide=${this._applyFilterSelection}
                        placement="bottom-start"
                      >
                        <div
                          slot="trigger"
                          class="filter-trigger ${!this.data?.length ? 'disabled' : ''}"
                          aria-label=${localize('components.table.filter.label', this.hass.language)}
                        >
                          <div class="relative">
                            <ha-assist-chip
                              has-icon
                              class="type-assist-chip"
                              ?disabled=${!this.data?.length}
                              .label=${localize('components.table.filter.label', this.hass.language)}
                            >
                              <ha-svg-icon slot="icon" .path=${mdiFilterVariant}></ha-svg-icon>
                            </ha-assist-chip>
                            ${this._getActiveFilterCount()
                              ? html`<div class="badge">${this._getActiveFilterCount()}</div>`
                              : ''}
                          </div>
                        </div>
                        ${this.renderFilterMenu()}
                      </ha-dropdown>
                    `
                  : ''}

                ${this._getFilteredItems()
                  ? html`
                      <alarmo-chip
                        .hass=${this.hass}
                        removable
                        active
                        @icon-clicked=${this._clearFilters}
                        style="--chip-color: var(--primary-color); --background-opacity: 0.12; --chip-border-radius: 8px; --chip-height: 40px; --chip-font-size: 1em; --icon-color: var(--dark-primary-color)"
                      >
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
            `
        : ''}
        ${hasSearchableColumns
        ? html`
              <ha-input-search
                class="filter-search"
                appearance="outlined"
                .value=${this.searchQuery}
                .placeholder=${localize('components.table.search.label', this.hass.language)}
                style="--start-slot-width: calc(18px + var(--ha-space-1)); --input-padding-inline-start: var(--ha-space-1);"
                @input=${(ev: Event) => (this.searchQuery = (ev.target as HTMLInputElement).value)}
              ></ha-input-search>
            `
        : ''}
        ${this.getSortableColumns().length
        ? html`
              <ha-dropdown placement="bottom-end">
                <ha-assist-chip
                  slot="trigger"
                  class="sort-trigger"
                  trailing-icon
                  .label=${localize(
                    'components.table.sort.label',
                    this.hass.language,
                    'name',
                    this.getCurrentSortColumn()?.[1].title || ''
                  )}
                >
                  <ha-svg-icon slot="trailing-icon" .path=${mdiMenuDown}></ha-svg-icon>
                </ha-assist-chip>
                <div class="sort-menu">
                  ${this.getSortableColumns().map(
                    ([key, column]) => html`
                      <button
                        class="sort-option ${this.sortConfig?.key === key ? 'active' : ''}"
                        @click=${() => this.selectSortColumn(key)}
                      >
                        ${column.title || ''}
                      </button>
                    `
                  )}
                </div>
              </ha-dropdown>
            `
        : ''}
      </div>
    `;
  }

  private _showFilterMenu() {
    if (!this.filterConfig) return;
    this.filterSelection = Object.entries(this.filterConfig!).reduce(
      (acc, [k, v]) => ({ ...acc, [k]: pick(v, ['value']) }),
      {}
    );
  }

  renderFilterMenu() {
    if (!this.filterConfig || !this.filterSelection) return html``;

    return html`
      <span class="header">
        ${localize('components.table.filter.label', this.hass.language)}
      </span>
      <ha-icon-button
        class="close"
        .path=${mdiClose}
        @click=${() => {
          this._menu!.open = false;
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
              toggleable
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
        this._menu!.open = false;
      }
    }
    this.filterSelection = { ...this.filterSelection!, [key]: { value: value } };
    this.filterConfig = {
      ...this.filterConfig!,
      [key]: { ...this.filterConfig![key], value: value },
    };
  }

  private _clearFilters() {
    if (!this.filterConfig) return;
    Object.keys(this.filterConfig!).forEach(key => {
      this.filterConfig = {
        ...this.filterConfig!,
        [key]: { ...this.filterConfig![key], value: [] },
      };
    });
  }

  private _applyFilterSelection() {
    if (!this.filterConfig || !this.filterSelection) return;
    Object.keys(this.filterConfig!).forEach(key => {
      this.filterConfig = {
        ...this.filterConfig!,
        [key]: { ...this.filterConfig![key], ...this.filterSelection![key] },
      };
    });
  }

  private hasSearchableColumns() {
    return !!this.columns && Object.values(this.columns).some(col => !!col.search);
  }

  static styles = css`
    :host {
      width: 100%;
      display: block;
    }
    div.table {
      display: inline-flex;
      flex-direction: column;
      box-sizing: border-box;
      width: 100%;
      overflow-x: auto;
    }
    div.table .header {
      font-weight: 600;
      min-height: 48px;
      background: var(--data-table-background-color, var(--card-background-color));
    }
    div.table-row {
      display: flex;
      width: 100%;
      min-height: 52px;
      border-top: 1px solid var(--divider-color);
      flex-direction: row;
      position: relative;
      background: var(--data-table-background-color, var(--card-background-color));
    }
    div.table-cell {
      align-self: center;
      overflow: hidden;
      text-overflow: ellipsis;
      flex-shrink: 0;
      box-sizing: border-box;
      min-height: 52px;
      display: flex;
      align-items: center;
    }
    div.table-cell.text {
      padding: 8px 16px;
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
    div.table-cell > ha-checkbox {
      display: flex;
      align-items: center;
    }
    div.table-cell > * {
      transition: color 0.2s ease-in-out;
    }
    div.table .header div.table-cell span {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      min-width: 0;
      color: var(--primary-text-color);
      font-size: 0.875rem;
      font-weight: 700;
    }
    div.table .header div.table-cell.sortable {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      cursor: pointer;
      user-select: none;
      overflow: hidden;
      position: relative;
    }
    div.table .header div.table-cell.sortable:focus-visible {
      outline: 2px solid var(--primary-color);
      outline-offset: -2px;
    }
    div.table .header ha-svg-icon.sort-icon {
      --mdc-icon-size: 16px;
      color: var(--secondary-text-color);
      padding: 0;
      width: 16px;
      height: 16px;
      position: absolute;
      top: 50%;
      left: -20px;
      transform: translateY(-50%);
      transition: left 0.2s ease;
    }
    div.table .header div.table-cell.sortable span {
      position: relative;
      left: 0;
      transition: left 0.2s ease;
    }
    div.table .header div.table-cell.sorted span,
    div.table .header div.table-cell.not-sorted:hover span {
      left: 24px;
    }
    div.table .header div.table-cell.sorted ha-svg-icon.sort-icon,
    div.table .header div.table-cell.not-sorted:hover ha-svg-icon.sort-icon {
      left: 12px;
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
      background-color: rgba(var(--rgb-primary-color), 0.12);
    }
    div.table-row.warning::before {
      background-color: var(--error-color);
      opacity: 0.05;
    }
    div.table-row.warning:hover::before {
      background-color: var(--error-color);
      opacity: 0.1;
    }
    div.table-row.warning span {
      color: var(--error-color);
    }

    ha-icon, ha-svg-icon {
      color: var(--state-icon-color);
      padding: 6px 8px;
    }

    .secondary {
      color: var(--secondary-text-color);
      display: flex;
      padding-top: 2px;
      font-size: 0.75rem;
      line-height: 1.2;
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
    ha-icon.disabled, ha-svg-icon.disabled {
      color: var(--state-unavailable-color);
    }

    div.table-filter {
      display: flex;
      width: 100%;
      min-height: 52px;
      border-top: 1px solid var(--divider-color);
      box-sizing: border-box;
      padding: 12px 16px;
      flex: 1;
      position: relative;
      flex-direction: row;
      align-items: center;
      gap: 8px;
      background: var(--primary-background-color, var(--data-table-background-color, var(--card-background-color)));
    }
    div.table-filter .filter-search {
      flex: 1 1 auto;
      min-width: 220px;
      --mdc-text-field-fill-color: var(--sidebar-background-color);
    }
    div.table-filter .filter-actions {
      display: flex;
      align-items: center;
      gap: 8px;
      flex: 0 0 auto;
    }
    .filter-trigger {
      display: flex;
      cursor: pointer;
    }
    .filter-trigger.disabled {
      pointer-events: none;
      cursor: default;
      opacity: 0.38;
    }
    .filter-trigger .relative {
      position: relative;
    }
    .type-assist-chip {
      --ha-assist-chip-container-height: 40px;
    }
    .sort-trigger {
      --ha-assist-chip-container-height: 40px;
      flex: 0 0 auto;
    }
    .type-assist-chip ha-svg-icon {
      color: var(--primary-text-color);
    }
    .badge {
      position: absolute;
      top: -4px;
      right: -4px;
      min-width: 16px;
      height: 16px;
      padding: 0 4px;
      box-sizing: border-box;
      border-radius: 999px;
      background: var(--primary-color);
      color: var(--text-primary-color);
      font-size: 0.6875rem;
      line-height: 16px;
      text-align: center;
      font-weight: 500;
      pointer-events: none;
    }
    .sort-menu {
      display: flex;
      flex-direction: column;
      min-width: 220px;
      padding: 4px;
      box-sizing: border-box;
    }
    .sort-option {
      min-height: 40px;
      border: 0;
      border-radius: 8px;
      padding: 0 16px;
      background: transparent;
      color: var(--primary-text-color);
      font: inherit;
      text-align: left;
      cursor: pointer;
    }
    .sort-option.active {
      color: var(--primary-color);
      background: rgba(var(--rgb-primary-color), 0.12);
    }
    .sort-option:hover {
      background: rgba(var(--rgb-primary-text-color), 0.08);
    }
    ha-dropdown .header {
      display: flex;
      padding: 8px 16px;
      font-weight: bold;
    }
    ha-dropdown ha-icon-button.close {
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
  `;
}
