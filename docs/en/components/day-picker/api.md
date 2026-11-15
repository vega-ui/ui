# DayPicker API

## Root Props


<!-- AUTO-GENERATED:ROOT_API:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `apiRef` | `Ref<GridApiRef<string>>` | — | No | Ref to the grid’s imperative API, with `YYYY-MM-DD` keys. `focus(date?)` — moves focus to the day of this date, or to the tab stop without one; a day that is not rendered yet takes focus as soon as it renders |
| `focusedDate` | `string` | — | No | Controlled focused day as a `YYYY-MM-DD` string. The picker shows its month, and the day is the tab stop of the grid when it can be focused. |
| `defaultFocusedDate` | `string` | — | No | Initial focused day for uncontrolled usage. Defaults to the first selected day, otherwise to `today`. |
| `onChangeFocusedDate` | `(date: string) => void` | — | No | Fires with the newly focused day when the focus moves, also to another month. |
| `autoFocus` | `boolean` | — | No | Moves the focus to the tab stop of the grid when the picker mounts, like `autofocus` of a native control. |
| `today` | `string` | — | No | Today as a `YYYY-MM-DD` string: the day marked with `aria-current="date"`. Defaults to the date of the device, read after hydration, so the server and the client render the same markup, and follows the device when the day or the time zone changes. |
| `calendar` | `CalendarSystem` | `gregorianCalendar` | No | Calendar system the month grid is built in. Defaults to the Gregorian calendar. |
| `locale` | `string` | `'en-US'` | No | BCP 47 locale of the labels and of the first day of the week, e.g. `de-DE`. |
| `size` | `GridItemSize` | `'xs'` | No | Controls the size of the cells. |
| `variant` | `GridItemVariant` | `'secondary'` | No | Color of the selected cells. |
| `disabledDates` | `GridKeys<string>` | — | No | Disabled dates, marked with `aria-disabled`: they cannot be selected, and keyboard navigation skips them like the dates outside `min` and `max`. Can be a function `(date) => boolean`, an array of `YYYY-MM-DD` dates, or a single date. |
| `defaultValue` | `S extends "multiple" \| "range" ? string[] : S extends "single" ? string : never` | — | No | Uncontrolled initially selected cells. |
| `max` | `S extends GridSelection ? string : never` | — | No | The largest key that can be selected, by the `compare` order, or by position without `compare`. |
| `min` | `S extends GridSelection ? string : never` | — | No | The smallest key that can be selected, by the `compare` order, or by position without `compare`. |
| `value` | `S extends "multiple" \| "range" ? string[] : S extends "single" ? string \| null : never` | — | No | Controlled selected cells: a key in `'single'` mode, an array of keys otherwise. In `'single'` mode `null` means controlled with nothing selected. |
| `readOnly` | `boolean` | — | No | Makes the selection read-only like a native `readonly` input: the grid gets `aria-readonly="true"`, navigation still works, and selecting a cell neither changes the selection nor calls `onChangeValue`. |
| `selection` | `S` | `'single'` | No | Selection mode. Without it the grid has no selection: cells have no `aria-selected` and clicks do not select. `'single'` — only one cell can be selected at a time; `'multiple'` — independent multi-selection, the recommended model of the WAI-ARIA listbox pattern: a click, Enter or Space toggles a cell, moving the focus keeps the selection, Shift + arrows add the cells from the most recently selected one, Shift + Space selects from the most recently selected cell to the focused one, a pointer drag adds the cells in between, and Ctrl+A or Command+A selects all; `'range'` — range selection between two points (Shift + arrows or pointer drag); it has no select all |
| `onChangeValue` | `(value: S extends "multiple" \| "range" ? string[] : S extends "single" ? string : never) => void` | — | No | Fires when the user changes the selection, with the new value: a key in `'single'` mode, an array of keys otherwise. |
| `ref` | `Ref<HTMLDivElement>` | — | No | Ref to the grid’s root element. |
| `asChild` | `boolean` | `false` | No | When `true`, renders the child element instead of a `<div>`, merging the props, for example a `<table>`. |
| `cells` | `readonly GridLayoutCell<string>[]` | — | No | The cells of the grid as data: the key, row and column of every cell, whether it is rendered or not. With it the grid knows its cells before they render: the server HTML has the right tab stop, the cells mount in one commit, the arrow keys and Shift + arrows move through cells that are not rendered, and `compare`, `getNextKey` and `resolveRange` are not needed for a grid that renders only part of its cells. A rendered cell that is not in `cells` is not seen by the grid. Without it the grid learns its cells from the rendered `GridCell`s. |
| `wrap` | `GridWrap` | `'horizontal'` | No | Navigation wrap mode. 'horizontal' — wrap across columns within the same row; 'vertical' — wrap across rows within the same column; 'both' — enable both behaviors; undefined — no wrapping |
| `exclude` | `GridKeys<string>` | — | No | Exclude cells from focus traversal: excluded cells are not focusable at all. Can be: a single key; an array of keys; a predicate `(key) => boolean` |
| `getNextKey` | `(intent: GridIntent, from: string, next: string \| undefined) => string \| undefined` | — | No | Overrides keyboard navigation. Receives the navigation intent (`forward` and `backward` follow the text direction), the key of the cell it starts from and the key the grid would move to by default, and returns the key to move to, or `undefined` to stay. A key of a cell that is not rendered yet becomes the active cell and takes focus as soon as it renders. |
| `resolveRange` | `(start: string, end: string) => string[]` | — | No | Given the start and the end key, ordered by `compare`, returns the list of keys forming the range. With `selection="range"` it resolves the range. With `selection="multiple"` Shift + arrows, a pointer drag and Ctrl+A take their keys from it instead of the rendered cells, and Ctrl+A selects the range from the `gridStart` to the `gridEnd` key of `getNextKey`: pass both when not every cell is rendered, as in a virtualized grid. Return only the keys that can be selected. |
| `compare` | `(a: string, b: string) => number` | — | No | Orders two cell keys for ranges, `min` and `max`, like the compare function of `Array.prototype.sort`: a negative number when `a` comes first, a positive number when `b` comes first, and `0` for the same place. Without it the cells are ordered by their position, the row and then the column, and a key of a cell that is not rendered is not ordered: pass it for keys with an order of their own, like dates, and for grids that render only part of their cells. |

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
| `value` | `string` | — | No | Date of the cell as a `YYYY-MM-DD` string, used as its key in the grid. |
| `size` | `GridItemSize` | — | No | Controls the item’s visual size. Defaults to the size of the DayPicker. |
| `variant` | `GridItemVariant` | — | No | Color of the selected item. Defaults to the variant of the DayPicker. |
| `disabled` | `boolean` | — | No | Marks the cell as disabled with `aria-disabled`: it cannot be selected. Adds to the `disabled` of the root Grid. A disabled cell stays focusable. |
| `ref` | `Ref<HTMLDivElement>` | — | No | External ref to the cell root element, merged with the internal registration ref. |
| `col` | `number` | — | Yes | Column index of the cell (0-based). Together with the `row` of its `GridRow` it places the cell for the keyboard navigation and orders the cells when the grid has no `compare`. |
| `excluded` | `boolean` | — | No | Excludes the cell from focus traversal: it is not focusable and never becomes active. Adds to the `exclude` of the root Grid. |

Also accepts all `<div>` attributes.
<!-- AUTO-GENERATED:PART_API:DayPickerItem:end -->

### `DayPickerCell`

<!-- AUTO-GENERATED:PART_API:DayPickerCell:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `size` | `GridItemSize` | — | No | Controls the item’s visual size. Defaults to the size of the DayPicker. |
| `disabled` | `boolean` | — | No | Marks the cell as disabled with `aria-disabled`: it cannot be selected. Adds to the `disabled` of the root Grid. A disabled cell stays focusable. |
| `variant` | `GridItemVariant` | — | No | Color of the selected item. Defaults to the variant of the DayPicker. |
| `ref` | `Ref<HTMLDivElement>` | — | No | External ref to the cell root element, merged with the internal registration ref. |
| `excluded` | `boolean` | — | No | Excludes the cell from focus traversal: it is not focusable and never becomes active. Adds to the `exclude` of the root Grid. |

Also accepts all `<div>` attributes.
<!-- AUTO-GENERATED:PART_API:DayPickerCell:end -->

### `DayPickerRow`

<!-- AUTO-GENERATED:PART_API:DayPickerRow:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `row` | `number` | — | Yes | Zero-based row index for all descendant cells. Provided to descendants via context. |
| `asChild` | `boolean` | `false` | No | When `true`, renders the child element instead of a `<div>`, merging the props, for example a `<tr>`. |

Also accepts all `<div>` attributes.
<!-- AUTO-GENERATED:PART_API:DayPickerRow:end -->

### `DayPickerRowGroup`

<!-- AUTO-GENERATED:PART_API:DayPickerRowGroup:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `asChild` | `boolean` | `false` | No | When `true`, renders the child element instead of a `<div>`, merging the props, for example a `<tbody>`. |

Also accepts all `<div>` attributes.
<!-- AUTO-GENERATED:PART_API:DayPickerRowGroup:end -->

### `DayPickerLayout`

<!-- AUTO-GENERATED:PART_API:DayPickerLayout:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `children` | `ReactNode` | — | Yes | Template of a day cell, rendered once for every day of the grid. Read the day with `useDayPickerCellContext()`; usually `<DayPickerCell />`. |
| `rows` | `number` | `6` | No | Number of grid rows (typically 5 or 6 depending on the month). |
| `month` | `string` | — | No | Month to render, given as a `YYYY-MM-DD` string of any day in it. Defaults to the month of the focused day of the parent DayPicker. |
| `offset` | `number` | `0` | No | Page index used to keep row indexes unique when several months are rendered side by side (e.g., by a scroller). |
| `includeOverflowDays` | `boolean` | `false` | No | Whether to render days from previous and next months to fill the full grid. If false, overflow cells are empty/disabled. |
| `locale` | `string` | — | No | Locale used for formatting the day label. Defaults to the locale of the picker. |
| `format` | `Intl.DateTimeFormatOptions['day']` | `'numeric'` | No | Display format of the day (Intl.DateTimeFormat). Example: "numeric", "2-digit". |
| `weekStartsOn` | `0 \| 1 \| 2 \| 3 \| 4 \| 5 \| 6` | — | No | Defines the first day of the week. 0 = Sunday, 1 = Monday, … 6 = Saturday. Defaults to the first day of the week of the locale. |
| `asChild` | `boolean` | `false` | No | When `true`, renders the child element instead of a `<div>`, merging the props, for example a `<tbody>`. |

Also accepts all `<div>` attributes.
<!-- AUTO-GENERATED:PART_API:DayPickerLayout:end -->

### `DayPickerScroller`

<!-- AUTO-GENERATED:PART_API:DayPickerScroller:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `onChangePeriod` | `(month: string) => void` | — | No | Called when a month page is scrolled into view, with the first day of that month as a `YYYY-MM-DD` string in the DayPicker's calendar system. |
| `start` | `number` | `-2` | No | Starting index used to generate the initial sequence of pages. Acts as the logical origin for the sliding index window. |
| `size` | `number` | `5` | No | Number of index segments rendered at once. Defines the size of the virtual “window” that the scroller slides over when navigating left or right. |
| `shift` | `number` | `2` | No | Number of pages appended when a scroll reaches the end of the window, so a fast swipe keeps going. Once the scroll settles, the window is re-centered on the snapped page. |
| `index` | `number` | — | No | Controls the currently active logical index. When provided, the scroller keeps the given index in view, scrolling to it if possible or rebuilding the window if needed. |
| `preserveScroll` | `boolean` | `true` | No | Preserve the currently snapped item after content changes (e.g., when pages are prepended/appended). If `true`, the scroller will restore the same snapped index using an immediate `scrollTo`. |
| `apiRef` | `Ref<IndexedSnapScrollerApiRef>` | — | No | Exposes the imperative API of the scroller. Allows programmatic control such as scrolling to an index, rebuilding the window around it when needed. |
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
| `ref` | `Ref<HTMLDivElement>` | — | No | External ref to the item's root element. Merged with the ref that registers the item with the scroller under its `index`. |
| `asChild` | `boolean` | — | No | Render the content as a child (via `Slot`) instead of a native `<div>`. Keeps attributes/refs bound to the passed child element. |

Also accepts all `<div>` attributes.
<!-- AUTO-GENERATED:PART_API:DayPickerScrollerContent:end -->

### `DayPickerScrollerLayout`

<!-- AUTO-GENERATED:PART_API:DayPickerScrollerLayout:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `children` | `ReactNode` | — | Yes | Template of a day cell, rendered once for every day of the grid. Read the day with `useDayPickerCellContext()`; usually `<DayPickerCell />`. |
| `locale` | `string` | — | No | Locale used for formatting the day label. Defaults to the locale of the picker. |
| `asChild` | `boolean` | `false` | No | When `true`, renders the child element instead of a `<div>`, merging the props, for example a `<tbody>`. |
| `rows` | `number` | `6` | No | Number of grid rows (typically 5 or 6 depending on the month). |
| `includeOverflowDays` | `boolean` | `false` | No | Whether to render days from previous and next months to fill the full grid. If false, overflow cells are empty/disabled. |
| `format` | `Intl.DateTimeFormatOptions['day']` | `"numeric"` | No | Display format of the day (Intl.DateTimeFormat). Example: "numeric", "2-digit". |
| `weekStartsOn` | `0 \| 1 \| 2 \| 3 \| 4 \| 5 \| 6` | — | No | Defines the first day of the week. 0 = Sunday, 1 = Monday, … 6 = Saturday. Defaults to the first day of the week of the locale. |

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

- Selection state is inherited from `Grid`.
- Cells are keyed by `YYYY-MM-DD` days; `value`, `min`, `max`, `disabledDates`, `focusedDate`, and `today` use the same strings.
- The picker shows the month of the focused day: `focusedDate`, otherwise `defaultFocusedDate`, otherwise the first selected day, otherwise `today`. Moving to another month, with the keyboard or a scroller, changes the focused day and fires `onChangeFocusedDate`.
- The tab stop is the focused day when it can be focused (in `min`–`max` and not disabled); otherwise the selected day or today in the shown month; otherwise the first available day of the month.
- `today` defaults to the date of the device, read after hydration: the server and the first client render have no today, so without `today`, `defaultFocusedDate`, or a selection the grid has no days until hydration. Pass `today` or `defaultFocusedDate` to render a month on the server.
- `locale` defaults to `"en-US"`, not to the runtime locale, so the server and the client agree.
- The root provides the shown `month` (its first day), the `anchor` month the scroller pages count from, `calendar`, `locale`, and `today` through `useDayPickerContext`; `month` is `undefined` until the focused day is known.
- `createDayPickerGrid({ month, calendar, rows, offset, includeOverflowDays, weekStartsOn })` returns rows of `{ col, date, day, inCurrentMonth }`.
- Scroller pages are calendar months counted from `referenceMonth` (`useDayPickerScrollerContext`), the month of the first focused day of the picker. `DayPickerScroller` has no `defaultMonth`: it follows the month of the focused day, and a swipe to another month moves the focused day to the same day of that month. `onChangePeriod` receives the first day of the month scrolled into view.
- Children of `DayPickerLayout` and `DayPickerScrollerLayout` are the template of a cell, rendered once per day inside a cell context. The children are required, usually `<DayPickerCell />`, which shows the formatted label.
- `useDayPickerCellContext()` returns `{ col, date, fields, label, inMonth, isToday }`; `date` is `undefined` for an empty overflow cell. Take day numbers from `label` or `fields`, never from the ISO `date` string.
- `locale` and `calendar` are root props; the layouts accept their own `locale` override.
