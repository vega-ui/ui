# YearPicker API

## Root Props


<!-- AUTO-GENERATED:ROOT_API:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `apiRef` | `Ref<GridApiRef<string>>` | — | No | Ref to the grid’s imperative API, with `YYYY-MM-DD` keys. `focus(date?)` — moves focus to the year of this date, or to the tab stop without one; a year that is not rendered yet takes focus as soon as it renders |
| `focusedDate` | `string` | — | No | Controlled focused year, given as a `YYYY-MM-DD` string of any day in it. The picker shows the page of this year, and the year is the tab stop of the grid when it can be focused. |
| `defaultFocusedDate` | `string` | — | No | Initial focused year for uncontrolled usage, given as a `YYYY-MM-DD` string of any day in it. Defaults to the first selected year, otherwise to the year of `today`. Pages of years are aligned to it. |
| `onChangeFocusedDate` | `(date: string) => void` | — | No | Fires with the first day of the newly focused year when the focus moves. |
| `autoFocus` | `boolean` | — | No | Moves the focus to the tab stop of the grid when the picker mounts, like `autofocus` of a native control. |
| `today` | `string` | — | No | Today as a `YYYY-MM-DD` string. Defaults to the date of the device, read after hydration, so the server and the client render the same markup, and follows the device when the day or the time zone changes. |
| `calendar` | `CalendarSystem` | `gregorianCalendar` | No | Calendar system the years belong to, including eras. Defaults to the Gregorian calendar. |
| `locale` | `string` | `'en-US'` | No | BCP 47 locale of the year labels (and eras), e.g. `ja-JP`. |
| `size` | `GridItemSize` | `'xs'` | No | Controls the size of the cells. |
| `variant` | `GridItemVariant` | `'secondary'` | No | Color of the selected cells. |
| `disabledDates` | `GridKeys<string>` | — | No | Disabled dates, marked with `aria-disabled`: they cannot be selected, and keyboard navigation skips them like the dates outside `min` and `max`. Can be a function `(date) => boolean`, an array of `YYYY-MM-DD` dates, or a single date. |
| `period` | `number` | `12` | No | Number of years on a page of `YearPickerScroller`; must match the page size of the layout. Inside the scroller PageUp and PageDown move the focus by this many years. |
| `defaultValue` | `SelectionMode extends "multiple" \| "range" ? string[] : SelectionMode extends "single" ? string : never` | — | No | Uncontrolled initially selected cells. |
| `max` | `SelectionMode extends GridSelection ? string : never` | — | No | The largest key that can be selected, by the `compare` order, or by position without `compare`. |
| `min` | `SelectionMode extends GridSelection ? string : never` | — | No | The smallest key that can be selected, by the `compare` order, or by position without `compare`. |
| `value` | `SelectionMode extends "multiple" \| "range" ? string[] : SelectionMode extends "single" ? string \| null : never` | — | No | Controlled selected cells: a key in `'single'` mode, an array of keys otherwise. In `'single'` mode `null` means controlled with nothing selected. |
| `readOnly` | `boolean` | — | No | Makes the selection read-only like a native `readonly` input: the grid gets `aria-readonly="true"`, navigation still works, and selecting a cell neither changes the selection nor calls `onChangeValue`. |
| `selection` | `SelectionMode` | `'single'` | No | Selection mode. Without it the grid has no selection: cells have no `aria-selected` and clicks do not select. `'single'` — only one cell can be selected at a time; `'multiple'` — independent multi-selection, the recommended model of the WAI-ARIA listbox pattern: a click, Enter or Space toggles a cell, moving the focus keeps the selection, Shift + arrows add the cells from the most recently selected one, Shift + Space selects from the most recently selected cell to the focused one, a pointer drag adds the cells in between, and Ctrl+A or Command+A selects all; `'range'` — range selection between two points (Shift + arrows or pointer drag); it has no select all |
| `onChangeValue` | `(value: SelectionMode extends "multiple" \| "range" ? string[] : SelectionMode extends "single" ? string : never) => void` | — | No | Fires when the user changes the selection, with the new value: a key in `'single'` mode, an array of keys otherwise. |
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

- `YearPickerLayout`
- `YearPickerRowGroup`
- `YearPickerRow`
- `YearPickerItem`
- `YearPickerCell`
- `YearPickerScroller`
- `YearPickerScrollerContent`
- `YearPickerScrollerLayout`

### `YearPickerItem`

<!-- AUTO-GENERATED:PART_API:YearPickerItem:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `value` | `string` | — | No | Date of the cell as a `YYYY-MM-DD` string, used as its key in the grid. |
| `size` | `GridItemSize` | — | No | Controls the item’s visual size. Defaults to the size of the YearPicker. |
| `variant` | `GridItemVariant` | — | No | Color of the selected item. Defaults to the variant of the YearPicker. |
| `disabled` | `boolean` | — | No | Marks the cell as disabled with `aria-disabled`: it cannot be selected. Adds to the `disabled` of the root Grid. A disabled cell stays focusable. |
| `ref` | `Ref<HTMLDivElement>` | — | No | External ref to the cell root element, merged with the internal registration ref. |
| `col` | `number` | — | Yes | Column index of the cell (0-based). Together with the `row` of its `GridRow` it places the cell for the keyboard navigation and orders the cells when the grid has no `compare`. |
| `excluded` | `boolean` | — | No | Excludes the cell from focus traversal: it is not focusable and never becomes active. Adds to the `exclude` of the root Grid. |

Also accepts all `<div>` attributes.
<!-- AUTO-GENERATED:PART_API:YearPickerItem:end -->

### `YearPickerCell`

<!-- AUTO-GENERATED:PART_API:YearPickerCell:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `size` | `GridItemSize` | — | No | Controls the item’s visual size. Defaults to the size of the YearPicker. |
| `disabled` | `boolean` | — | No | Marks the cell as disabled with `aria-disabled`: it cannot be selected. Adds to the `disabled` of the root Grid. A disabled cell stays focusable. |
| `variant` | `GridItemVariant` | — | No | Color of the selected item. Defaults to the variant of the YearPicker. |
| `ref` | `Ref<HTMLDivElement>` | — | No | External ref to the cell root element, merged with the internal registration ref. |
| `excluded` | `boolean` | — | No | Excludes the cell from focus traversal: it is not focusable and never becomes active. Adds to the `exclude` of the root Grid. |

Also accepts all `<div>` attributes.
<!-- AUTO-GENERATED:PART_API:YearPickerCell:end -->

### `YearPickerRow`

<!-- AUTO-GENERATED:PART_API:YearPickerRow:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `row` | `number` | — | Yes | Zero-based row index for all descendant cells. Provided to descendants via context. |
| `asChild` | `boolean` | `false` | No | When `true`, renders the child element instead of a `<div>`, merging the props, for example a `<tr>`. |

Also accepts all `<div>` attributes.
<!-- AUTO-GENERATED:PART_API:YearPickerRow:end -->

### `YearPickerRowGroup`

<!-- AUTO-GENERATED:PART_API:YearPickerRowGroup:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `asChild` | `boolean` | `false` | No | When `true`, renders the child element instead of a `<div>`, merging the props, for example a `<tbody>`. |

Also accepts all `<div>` attributes.
<!-- AUTO-GENERATED:PART_API:YearPickerRowGroup:end -->

### `YearPickerLayout`

<!-- AUTO-GENERATED:PART_API:YearPickerLayout:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `children` | `ReactNode` | — | Yes | Template of a year cell, rendered once for every year of the page. Read the year with `useYearPickerCellContext()`; usually `<YearPickerCell />`. |
| `rows` | `number` | `4` | No | Number of grid rows to render. Controls vertical density of the year matrix. |
| `cols` | `number` | `3` | No | Number of grid columns to render. Controls horizontal density of the year matrix. |
| `start` | `string` | — | No | First year of page `0`, given as a `YYYY-MM-DD` string of any day in it. Pages are aligned to it. Defaults to the first focused year of the YearPicker. |
| `offset` | `number` | — | No | Page index relative to `start`. Defaults to the page containing the focused year of the YearPicker. |
| `locale` | `string` | — | No | Locale used for formatting years. Defaults to the locale of the picker. |
| `format` | `Intl.DateTimeFormatOptions['year']` | `'numeric'` | No | Year display format (from `Intl.DateTimeFormatOptions`). |
| `asChild` | `boolean` | `false` | No | When `true`, renders the child element instead of a `<div>`, merging the props, for example a `<tbody>`. |

Also accepts all `<div>` attributes.
<!-- AUTO-GENERATED:PART_API:YearPickerLayout:end -->

### `YearPickerScroller`

<!-- AUTO-GENERATED:PART_API:YearPickerScroller:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `onChangePeriod` | `(year: string) => void` | — | No | Called when a page of years is scrolled into view, with the first day of the first year of that page as a `YYYY-MM-DD` string in the YearPicker's calendar system. |
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
<!-- AUTO-GENERATED:PART_API:YearPickerScroller:end -->

### `YearPickerScrollerContent`

<!-- AUTO-GENERATED:PART_API:YearPickerScrollerContent:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `ref` | `Ref<HTMLDivElement>` | — | No | External ref to the item's root element. Merged with the ref that registers the item with the scroller under its `index`. |
| `asChild` | `boolean` | — | No | Render the content as a child (via `Slot`) instead of a native `<div>`. Keeps attributes/refs bound to the passed child element. |

Also accepts all `<div>` attributes.
<!-- AUTO-GENERATED:PART_API:YearPickerScrollerContent:end -->

### `YearPickerScrollerLayout`

<!-- AUTO-GENERATED:PART_API:YearPickerScrollerLayout:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `children` | `ReactNode` | — | Yes | Template of a year cell, rendered once for every year of the page. Read the year with `useYearPickerCellContext()`; usually `<YearPickerCell />`. |
| `start` | `string` | — | No | First year of page `0`, given as a `YYYY-MM-DD` string of any day in it. Pages are aligned to it. Defaults to the first focused year of the YearPicker. |
| `locale` | `string` | — | No | Locale used for formatting years. Defaults to the locale of the picker. |
| `asChild` | `boolean` | `false` | No | When `true`, renders the child element instead of a `<div>`, merging the props, for example a `<tbody>`. |
| `rows` | `number` | `4` | No | Number of grid rows to render. Controls vertical density of the year matrix. |
| `format` | `Intl.DateTimeFormatOptions['year']` | `"numeric"` | No | Year display format (from `Intl.DateTimeFormatOptions`). |
| `cols` | `number` | `3` | No | Number of grid columns to render. Controls horizontal density of the year matrix. |

Also accepts all `<div>` attributes.
<!-- AUTO-GENERATED:PART_API:YearPickerScrollerLayout:end -->

## Types

- `YearPickerProps`
- `YearPickerLayoutProps`
- `YearPickerRowGroupProps`
- `YearPickerRowProps`
- `YearPickerItemProps`
- `YearPickerCellProps`
- `YearPickerCellContextData`
- `YearPickerScrollerProps`
- `YearPickerScrollerContentProps`
- `YearPickerScrollerLayoutProps`

## State Model

- Selection and bounds behavior are inherited from `Grid`.
- Years are keyed by their first day as a `YYYY-MM-DD` string; `value`, `min`, `max`, and `disabledDates` use the same strings.
- The picker shows the page of the focused year. `focusedDate` and `defaultFocusedDate` take any day of the year; without them the focused year is the first selected one, otherwise the year of `today`. `onChangeFocusedDate` receives the first day of the newly focused year.
- The tab stop is the focused year when it can be focused, otherwise the selected or the current year, otherwise the first available year.
- Pages are aligned to the first focused year: `YearPickerLayout` defaults `start` to it and `offset` to the page of the focused year. Pass `start` to a static `YearPickerLayout` to begin its page elsewhere.
- `today` defaults to the date of the device, read after hydration, so the server and the client render the same markup. Without `today`, `defaultFocusedDate`, or a selection the server renders no years; pass one of them to render the page on the server.
- `locale` defaults to `en-US`, not to the runtime locale, so labels do not depend on the environment.
- The root shares the focused `year`, the page `anchor` (first days of years), and `calendar` through `useYearPickerContext`.
- `createYearPickerGrid({ rows, cols, start, offset, calendar })` returns a page of `rows × cols` consecutive years from the ISO `start`.
- Scroller pages hold `period` years (default `12`) counted from the first focused year; keep `period` equal to the layout's `rows × cols`. The scroller shows the page of the focused year; scrolling to another page moves the focus to the same place on it, and Page Up / Page Down move the focus by `period` years. `onChangePeriod` receives the first day of the first year of the page scrolled into view.
- Children of `YearPickerLayout` and `YearPickerScrollerLayout` are the template of a cell, rendered once per year inside a cell context. The children are required, usually `<YearPickerCell />`, which shows the formatted label.
- `useYearPickerCellContext()` returns `{ col, date, fields, label }`; `date` is the first day of the year. Take year numbers from `label` or `fields`, never from the ISO `date` string.
- `locale` and `calendar` are root props; the layouts accept their own `locale` override.
