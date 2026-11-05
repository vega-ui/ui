# DayPicker API

## Root Props


<!-- AUTO-GENERATED:ROOT_API:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `month` | `string` | — | No | Visible month, given as a `YYYY-MM-DD` string of any day in it. Defaults to the current month. |
| `calendar` | `CalendarSystem` | `gregorianCalendar` | No | Calendar system the month grid is built in. Defaults to the Gregorian calendar. |
| `locale` | `string` | `getDefaultLocale()` | No | BCP 47 locale of the labels and of the first day of the week, e.g. `de-DE`. Defaults to the locale of the runtime, like `Intl`. |
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

- `DayPickerLayout`
- `DayPickerRowGroup`
- `DayPickerRow`
- `DayPickerItem`
- `DayPickerCell`
- `DayPickerScroller`
- `DayPickerScrollerContent`
- `DayPickerScrollerLayout`

### `DayPickerItem`

<!-- AUTO-GENERATED:PART_API:DayPickerItem:start -->
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
<!-- AUTO-GENERATED:PART_API:DayPickerItem:end -->

### `DayPickerCell`

<!-- AUTO-GENERATED:PART_API:DayPickerCell:start -->
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
<!-- AUTO-GENERATED:PART_API:DayPickerCell:end -->

### `DayPickerRow`

<!-- AUTO-GENERATED:PART_API:DayPickerRow:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `row` | `number` | — | Yes | Zero-based row index for all descendant cells. Provided to descendants via context. |

Also accepts all `<div>` attributes.
<!-- AUTO-GENERATED:PART_API:DayPickerRow:end -->

### `DayPickerRowGroup`

<!-- AUTO-GENERATED:PART_API:DayPickerRowGroup:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `scope` | `DataGridScope` | — | No | The `scope` prop is required and identifies the logical group of cells rendered by this row group. When used with `DataGridIndexedSnapScroller`, the scope usually matches the current index or page. Providing a scope allows the DataGrid to restore focus to the first available cell when the index changes and new cells are rendered. |

Also accepts all `<div>` attributes.
<!-- AUTO-GENERATED:PART_API:DayPickerRowGroup:end -->

### `DayPickerLayout`

<!-- AUTO-GENERATED:PART_API:DayPickerLayout:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `children` | `ReactNode` | — | Yes | Template of a day cell, rendered once for every day of the grid. Read the day with `useDayPickerCellContext()`; usually `<DayPickerCell />`. |
| `rows` | `number` | `6` | No | Number of grid rows (typically 5 or 6 depending on the month). |
| `month` | `string` | — | No | Month to render, given as a `YYYY-MM-DD` string of any day in it. Defaults to the month of the parent DayPicker. |
| `offset` | `number` | `0` | No | Page index used to keep row indexes unique when several months are rendered side by side (e.g., by a scroller). |
| `includeOverflowDays` | `boolean` | `false` | No | Whether to render days from previous and next months to fill the full grid. If false, overflow cells are empty/disabled. |
| `locale` | `string` | — | No | Locale used for formatting the day label. Defaults to the locale of the picker. |
| `format` | `Intl.DateTimeFormatOptions['day']` | `'numeric'` | No | Display format of the day (Intl.DateTimeFormat). Example: "numeric", "2-digit". |
| `weekStartsOn` | `0 \| 1 \| 2 \| 3 \| 4 \| 5 \| 6` | — | No | Defines the first day of the week. 0 = Sunday, 1 = Monday, … 6 = Saturday. |
| `scope` | `DataGridScope` | — | No | The `scope` prop is required and identifies the logical group of cells rendered by this row group. When used with `DataGridIndexedSnapScroller`, the scope usually matches the current index or page. Providing a scope allows the DataGrid to restore focus to the first available cell when the index changes and new cells are rendered. |

Also accepts all `<div>` attributes.
<!-- AUTO-GENERATED:PART_API:DayPickerLayout:end -->

### `DayPickerScroller`

<!-- AUTO-GENERATED:PART_API:DayPickerScroller:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `onChangePeriod` | `(month: string) => void` | — | No | Called when a month page is scrolled into view, with the first day of that month as a `YYYY-MM-DD` string in the DayPicker's calendar system. |
| `defaultMonth` | `string` | — | No | Initial month for uncontrolled usage outside a DayPicker, given as a `YYYY-MM-DD` string of any day in it. Defaults to the current month. |
| `start` | `number` | `-2` | No | Starting index used to generate the initial sequence of pages. Acts as the logical origin for the sliding index window. |
| `startDir` | `-1 \| 1` | `1` | No | Direction in which the initial index sequence expands. `1` — indexes increase to the right (0, 1, 2…); `-1` — indexes decrease to the right (0, -1, -2…). Controls the growth pattern of the initial index array. |
| `size` | `number` | `5` | No | Number of index segments rendered at once. Defines the size of the virtual “window” that the scroller slides over when navigating left or right. |
| `shift` | `number` | `2` | No | Number of pages appended when a scroll reaches the end of the window, so a fast swipe keeps going. Once the scroll settles, the window is re-centered on the snapped page. |
| `index` | `number` | — | No | Controls the currently active logical index. When provided, the scroller keeps the given index in view, scrolling to it if possible or rebuilding the window if needed. |
| `preserveScroll` | `boolean` | `true` | No | Preserve the currently snapped item after content changes (e.g., when pages are prepended/appended). If `true`, the scroller will restore the same snapped index using an immediate `scrollIntoView`. |
| `apiRef` | `Ref<IndexedSnapScrollerApiRef>` | — | No | Exposes the imperative API of the scroller. Allows programmatic control such as scrolling to an index or resetting the virtual window. |
| `onOffset` | `(value: number) => void` | — | No | Fires when the window grows at an edge. `-1` — the scroll settled on the first page (left/top edge); `+1` — the scroll reached the end (right/bottom edge). Useful for infinite loading: append/prepend pages based on the direction. |
| `ref` | `Ref<HTMLDivElement>` | — | No | Ref to the scroller’s element. |
| `defaultIndex` | `number` | — | No | Initial index of the item to snap to on mount. |
| `onScrollSnapChange` | `(element: HTMLElement, index: number) => void` | — | No | Fired when a scroll snap operation has fully completed and the scroller has settled on a new snap index. This callback is invoked after all scrolling and snapping animations have finished and the active snap position is considered stable. |
| `onScrollSnapChanging` | `(element: HTMLElement, index: number) => void` | — | No | Fired while a scroll snap operation is in progress and the active snap index is still changing. This callback may be invoked multiple times during a single scroll or swipe interaction as the scroller approaches its final snap position. Useful for optimistic UI updates, previews, or synchronizing transient state during scrolling. |

Also accepts all `<div>` attributes.
<!-- AUTO-GENERATED:PART_API:DayPickerScroller:end -->

### `DayPickerScrollerContent`

<!-- AUTO-GENERATED:PART_API:DayPickerScrollerContent:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `ref` | `Ref<HTMLDivElement>` | — | No | External ref to the item's root element. Will be merged with internal `itemRef(index)` to participate in snapping logic. |
| `asChild` | `boolean` | — | No | Render the content as a child (via `Slot`) instead of a native `<div>`. Keeps attributes/refs bound to the passed child element. |

Also accepts all `<div>` attributes.
<!-- AUTO-GENERATED:PART_API:DayPickerScrollerContent:end -->

### `DayPickerScrollerLayout`

<!-- AUTO-GENERATED:PART_API:DayPickerScrollerLayout:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `children` | `ReactNode` | — | Yes | Template of a day cell, rendered once for every day of the grid. Read the day with `useDayPickerCellContext()`; usually `<DayPickerCell />`. |
| `locale` | `string` | — | No | Locale used for formatting the day label. Defaults to the locale of the picker. |
| `rows` | `number` | `6` | No | Number of grid rows (typically 5 or 6 depending on the month). |
| `includeOverflowDays` | `boolean` | `false` | No | Whether to render days from previous and next months to fill the full grid. If false, overflow cells are empty/disabled. |
| `format` | `Intl.DateTimeFormatOptions['day']` | `"numeric"` | No | Display format of the day (Intl.DateTimeFormat). Example: "numeric", "2-digit". |
| `weekStartsOn` | `0 \| 1 \| 2 \| 3 \| 4 \| 5 \| 6` | — | No | Defines the first day of the week. 0 = Sunday, 1 = Monday, … 6 = Saturday. |
| `scope` | `DataGridScope` | — | No | The `scope` prop is required and identifies the logical group of cells rendered by this row group. When used with `DataGridIndexedSnapScroller`, the scope usually matches the current index or page. Providing a scope allows the DataGrid to restore focus to the first available cell when the index changes and new cells are rendered. |

Also accepts all `<div>` attributes.
<!-- AUTO-GENERATED:PART_API:DayPickerScrollerLayout:end -->

## Types

- `DayPickerProps`
- `DayPickerLayoutProps`
- `DayPickerRowGroupProps`
- `DayPickerRowProps`
- `DayPickerItemProps`
- `DayPickerCellProps`
- `DayPickerCellContextData`
- `DayPickerScrollerProps`
- `DayPickerScrollerContentProps`
- `DayPickerScrollerLayoutProps`

## State Model

- Selection state is inherited from `DataGridPicker`.
- Cells are keyed by `YYYY-MM-DD` days; `selected`, `from`, `to`, `disabled`, and `active` use the same strings.
- The root provides the visible `month` (its first day) and `calendar` through `useDayPickerContext`.
- `createDayPickerGrid({ month, calendar, rows, offset, includeOverflowDays, weekStartsOn })` returns rows of `{ col, date, day, inCurrentMonth }`.
- Scroller pages are calendar months counted from `referenceMonth` (`useDayPickerScrollerContext`); `onChangePeriod` receives the first day of the visible month.
- Children of `DayPickerLayout` and `DayPickerScrollerLayout` are the template of a cell, rendered once per day inside a cell context. The children are required, usually `<DayPickerCell />`, which shows the formatted label.
- `useDayPickerCellContext()` returns `{ col, date, fields, label, inMonth }`; `date` is `undefined` for an empty overflow cell. Take day numbers from `label` or `fields`, never from the ISO `date` string.
- `locale` and `calendar` are root props; the layouts accept their own `locale` override.
