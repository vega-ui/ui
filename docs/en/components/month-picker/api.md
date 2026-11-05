# MonthPicker API

## Root Props


<!-- AUTO-GENERATED:ROOT_API:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `year` | `string` | — | No | Year whose months are shown, given as a `YYYY-MM-DD` string of any day in it. Defaults to the current year. |
| `calendar` | `CalendarSystem` | `gregorianCalendar` | No | Calendar system the months belong to — it defines how many months a year has. Defaults to the Gregorian calendar. |
| `locale` | `string` | `getDefaultLocale()` | No | BCP 47 locale of the month names, e.g. `de-DE`. Defaults to the locale of the runtime, like `Intl`. |
| `size` | `DataGridPickerSize` | `'xs'` | No | Controls the item’s visual size. Useful for adapting the picker to compact or large layouts. |
| `variant` | `DataGridPickerVariant` | — | No | Visual appearance preset for the picker. |
| `selection` | `S` | `'single'` | No | Selection mode. `'single'` — only one cell can be selected at a time; `'multiple'` — independent multi-selection (toggle per cell); `'range'` — range selection between two points (Shift + arrows or pointer drag) |
| `disabled` | `DataGridDisabled<string>` | — | No | Predicate or map of disabled cells. Can be: a function `(key) => boolean`; an array of disabled keys; a single key. Disabled cells cannot be selected or focused. |
| `excludeDisabled` | `boolean` | — | No | — |
| `expandable` | `boolean` | `true` | No | Enables expanding selection ranges (Shift + Arrow or mouse drag). |
| `defaultActive` | `string` | — | No | Uncontrolled initial active cell. |
| `active` | `string` | — | No | Controlled active cell. |
| `selected` | `S extends "single" ? string \| null : string[]` | — | No | Controlled selected cells. In `'single'` mode `null` means controlled with nothing selected. |
| `defaultSelected` | `S extends "single" ? string : string[]` | — | No | Uncontrolled initially selected cells. |
| `from` | `string` | — | No | Range boundaries. If provided, limits selection to cells between `from` and `to` based on the `compare` function. |
| `to` | `string` | — | No | — |
| `resolveRange` | `(start: DataGridResolveValue<K>, end: DataGridResolveValue<K>, grid: Grid<HTMLElement, K>) => K[]` | — | No | Custom range resolution logic for `selection="range"`. Given start and end values, returns the list of keys forming the range. |
| `equals` | `(start: K \| undefined, end: K \| undefined) => boolean` | — | No | Custom equality comparator for comparing two cell keys. Defaults to strict equality (`===`). |
| `compare` | `(a: K, b: K) => -1 \| 0 \| 1` | — | No | Custom ordering comparator for comparing two cell keys. Should return `-1`, `0`, or `1`. |
| `onSelectCell` | `(value: S extends 'single' ? K : K[]) => void` | — | No | Fires when the user selects cell. Receives the list of selected cell keys. |
| `onChangeActive` | `(active: K) => void` | — | No | Fires when the active (focused) cell changes. |
| `ref` | `Ref<HTMLDivElement>` | — | No | Ref to the grid’s root element. |
| `apiRef` | `Ref<DataGridApiRef<string>>` | — | No | Ref to the grid’s imperative API. Exposes low-level structures for advanced scenarios: `grid` — matrix navigation helper; `keyMap` — Map`<K, [row, col]>` for fast lookups |
| `wrap` | `DataGridWrap` | — | No | Navigation wrap mode. 'horizontal' — wrap across columns within the same row; 'vertical' — wrap across rows within the same column; 'both' — enable both behaviors; undefined — no wrapping |
| `exclude` | `DataGridExclude<string>` | — | No | Exclude cells from focus traversal. Can be: a single key; an array of keys; a predicate `(key) => boolean` |
| `rowDelta` | `number` | — | No | Page navigation row step for PageUp/PageDown. `undefined` — jump to the first/last row; `number` — move by N rows relative to the current row |
| `onArrow` | `(e: KeyboardEvent<HTMLDivElement>, node: MatrixNode<HTMLElement, K>, prevNode: MatrixNode<HTMLElement, K>) => void` | — | No | Fires on each Arrow navigation step after focus changes |

Also accepts all `<div>` attributes.
<!-- AUTO-GENERATED:ROOT_API:end -->

## Child Parts

- `MonthPickerLayout`
- `MonthPickerRowGroup`
- `MonthPickerRow`
- `MonthPickerItem`
- `MonthPickerCell`

### `MonthPickerItem`

<!-- AUTO-GENERATED:PART_API:MonthPickerItem:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `range` | `DataGridPickerItemRangePosition` | — | No | Optional visual indicator of the cell’s position within a range. One of: `"start" \| "between" \| "end"`. If not provided, the component automatically derives it based on selection context. |
| `size` | `DataGridPickerSize` | — | No | Controls the item’s visual size. Useful for adapting the picker to compact or large layouts. |
| `value` | `DataGridCellKey` | — | No | Logical value associated with this grid cell. Used as the cell’s unique selection key. |
| `variant` | `DataGridPickerVariant` | — | No | Visual appearance preset for the picker. |
| `disabled` | `boolean` | — | No | Disables click and keyboard selection. Overrides value from root DataGrid |
| `ref` | `Ref<HTMLDivElement>` | — | No | External ref to the cell root element. Will be merged with the internal `itemRef([row, col], key)` registration when the cell is not excluded. |
| `col` | `number` | — | Yes | Column index of the cell (0-based). Used together with row index from the row context to form grid coordinates: `[row, col]`. |
| `asChild` | `boolean` | `false` | No | When `true`, renders children via `Slot` and forwards props/refs to the child element instead of using a native `<div>`. |
| `excluded` | `boolean` | — | No | Exclude cells from focus traversal. Overrides value from root DataGrid |

Also accepts all `<div>` attributes.
<!-- AUTO-GENERATED:PART_API:MonthPickerItem:end -->

### `MonthPickerCell`

<!-- AUTO-GENERATED:PART_API:MonthPickerCell:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `size` | `DataGridPickerSize` | — | No | Controls the item’s visual size. Useful for adapting the picker to compact or large layouts. |
| `range` | `DataGridPickerItemRangePosition` | — | No | Optional visual indicator of the cell’s position within a range. One of: `"start" \| "between" \| "end"`. If not provided, the component automatically derives it based on selection context. |
| `variant` | `DataGridPickerVariant` | — | No | Visual appearance preset for the picker. |
| `disabled` | `boolean` | — | No | Disables click and keyboard selection. Overrides value from root DataGrid |
| `ref` | `Ref<HTMLDivElement>` | — | No | External ref to the cell root element. Will be merged with the internal `itemRef([row, col], key)` registration when the cell is not excluded. |
| `asChild` | `boolean` | `false` | No | When `true`, renders children via `Slot` and forwards props/refs to the child element instead of using a native `<div>`. |
| `excluded` | `boolean` | — | No | Exclude cells from focus traversal. Overrides value from root DataGrid |

Also accepts all `<div>` attributes.
<!-- AUTO-GENERATED:PART_API:MonthPickerCell:end -->

### `MonthPickerRow`

<!-- AUTO-GENERATED:PART_API:MonthPickerRow:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `row` | `number` | — | Yes | Zero-based row index for all descendant cells. Provided to descendants via context. |

Also accepts all `<div>` attributes.
<!-- AUTO-GENERATED:PART_API:MonthPickerRow:end -->

### `MonthPickerRowGroup`

<!-- AUTO-GENERATED:PART_API:MonthPickerRowGroup:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `scope` | `DataGridScope` | — | No | The `scope` prop is required and identifies the logical group of cells rendered by this row group. When used with `DataGridIndexedSnapScroller`, the scope usually matches the current index or page. Providing a scope allows the DataGrid to restore focus to the first available cell when the index changes and new cells are rendered. |

Also accepts all `<div>` attributes.
<!-- AUTO-GENERATED:PART_API:MonthPickerRowGroup:end -->

### `MonthPickerLayout`

<!-- AUTO-GENERATED:PART_API:MonthPickerLayout:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `children` | `ReactNode` | — | Yes | Template of a month cell, rendered once for every month of the year. Read the month with `useMonthPickerCellContext()`; usually `<MonthPickerCell />`. |
| `cols` | `number` | `3` | No | Number of columns; rows are added as needed for all months of the year. |
| `locale` | `string` | — | No | Locale used for formatting month names. Defaults to the locale of the picker. |
| `format` | `Intl.DateTimeFormatOptions['month']` | `'long'` | No | Month display format (from `Intl.DateTimeFormatOptions`). |
| `scope` | `DataGridScope` | — | No | The `scope` prop is required and identifies the logical group of cells rendered by this row group. When used with `DataGridIndexedSnapScroller`, the scope usually matches the current index or page. Providing a scope allows the DataGrid to restore focus to the first available cell when the index changes and new cells are rendered. |

Also accepts all `<div>` attributes.
<!-- AUTO-GENERATED:PART_API:MonthPickerLayout:end -->

## Types

- `MonthPickerProps`
- `MonthPickerLayoutProps`
- `MonthPickerRowGroupProps`
- `MonthPickerRowProps`
- `MonthPickerItemProps`
- `MonthPickerCellProps`
- `MonthPickerCellContextData`

## State Model

- Selection and bounds behavior are inherited from `DataGridPicker`.
- Months are keyed by their first day as a `YYYY-MM-DD` string; `selected`, `from`, `to`, and `disabled` use the same strings.
- The root provides the visible `year` (its first day) and `calendar` through `useMonthPickerContext`.
- `createMonthPickerGrid({ year, calendar, cols })` derives the rows from the months of the year: 12, or 13 in Hebrew leap years.
- `MonthPickerLayout` formats labels with `Intl.DateTimeFormat` in the picker's calendar system.
- Children of `MonthPickerLayout` are the template of a cell, rendered once per month inside a cell context. The children are required, usually `<MonthPickerCell />`, which shows the formatted label.
- `useMonthPickerCellContext()` returns `{ col, date, fields, label }`; `date` is the first day of the month. Take month numbers from `label` or `fields`, never from the ISO `date` string.
- `locale` and `calendar` are root props; the layouts accept their own `locale` override.
