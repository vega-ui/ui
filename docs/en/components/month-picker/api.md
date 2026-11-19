# MonthPicker API

## Root Props


<!-- AUTO-GENERATED:ROOT_API:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `apiRef` | `Ref<GridApiRef<string>>` | — | No | Ref to the grid’s imperative API, with `YYYY-MM-DD` keys. `focus(date?)` — moves focus to the month of this date, or to the tab stop without one; a month that is not rendered yet takes focus as soon as it renders |
| `focusedDate` | `string` | — | No | Controlled focused month, given as a `YYYY-MM-DD` string of any day in it. The picker shows the year of this month, and the month is the tab stop of the grid when it can be focused. |
| `defaultFocusedDate` | `string` | — | No | Initial focused month for uncontrolled usage, given as a `YYYY-MM-DD` string of any day in it. Defaults to the first selected month, otherwise to the month of `today`. |
| `onChangeFocusedDate` | `(date: string) => void` | — | No | Fires with the first day of the newly focused month when the focus moves. |
| `autoFocus` | `boolean` | — | No | Moves the focus to the tab stop of the grid when the picker mounts, like `autofocus` of a native control. |
| `today` | `string` | — | No | Today as a `YYYY-MM-DD` string. Defaults to the date of the device, read after hydration, so the server and the client render the same markup, and follows the device when the day or the time zone changes. |
| `calendar` | `CalendarSystem` | `gregorianCalendar` | No | Calendar system the months belong to — it defines how many months a year has. Defaults to the Gregorian calendar. |
| `locale` | `string` | `'en-US'` | No | BCP 47 locale of the month names, e.g. `de-DE`. |
| `size` | `GridItemSize` | `'xs'` | No | Controls the size of the cells. |
| `variant` | `GridItemVariant` | `'secondary'` | No | Color of the selected cells. |
| `disabledDates` | `GridKeys<string>` | — | No | Disabled dates, marked with `aria-disabled`: they cannot be selected, and keyboard navigation skips them like the dates outside `min` and `max`. Can be a function `(date) => boolean`, an array of `YYYY-MM-DD` dates, or a single date. |
| `defaultValue` | `NoInfer<SelectionMode extends "multiple" \| "range" ? string[] : SelectionMode extends "single" ? string : never>` | — | No | Uncontrolled initially selected cells. |
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

- `MonthPickerLayout`
- `MonthPickerRowGroup`
- `MonthPickerRow`
- `MonthPickerItem`
- `MonthPickerCell`

### `MonthPickerItem`

<!-- AUTO-GENERATED:PART_API:MonthPickerItem:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `value` | `string` | — | No | Date of the cell as a `YYYY-MM-DD` string, used as its key in the grid. |
| `size` | `GridItemSize` | — | No | Controls the item’s visual size. Defaults to the size of the MonthPicker. |
| `variant` | `GridItemVariant` | — | No | Color of the selected item. Defaults to the variant of the MonthPicker. |
| `disabled` | `boolean` | — | No | Marks the cell as disabled with `aria-disabled`: it cannot be selected. Adds to the `disabled` of the root Grid. A disabled cell stays focusable. |
| `ref` | `Ref<HTMLDivElement>` | — | No | External ref to the cell root element, merged with the internal registration ref. |
| `col` | `number` | — | Yes | Column index of the cell (0-based). Together with the `row` of its `GridRow` it places the cell for the keyboard navigation and orders the cells when the grid has no `compare`. |
| `excluded` | `boolean` | — | No | Excludes the cell from focus traversal: it is not focusable and never becomes active. Adds to the `exclude` of the root Grid. |

Also accepts all `<div>` attributes.
<!-- AUTO-GENERATED:PART_API:MonthPickerItem:end -->

### `MonthPickerCell`

<!-- AUTO-GENERATED:PART_API:MonthPickerCell:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `size` | `GridItemSize` | — | No | Controls the item’s visual size. Defaults to the size of the MonthPicker. |
| `disabled` | `boolean` | — | No | Marks the cell as disabled with `aria-disabled`: it cannot be selected. Adds to the `disabled` of the root Grid. A disabled cell stays focusable. |
| `variant` | `GridItemVariant` | — | No | Color of the selected item. Defaults to the variant of the MonthPicker. |
| `ref` | `Ref<HTMLDivElement>` | — | No | External ref to the cell root element, merged with the internal registration ref. |
| `excluded` | `boolean` | — | No | Excludes the cell from focus traversal: it is not focusable and never becomes active. Adds to the `exclude` of the root Grid. |

Also accepts all `<div>` attributes.
<!-- AUTO-GENERATED:PART_API:MonthPickerCell:end -->

### `MonthPickerRow`

<!-- AUTO-GENERATED:PART_API:MonthPickerRow:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `row` | `number` | — | Yes | Zero-based row index for all descendant cells. Provided to descendants via context. |
| `asChild` | `boolean` | `false` | No | When `true`, renders the child element instead of a `<div>`, merging the props, for example a `<tr>`. |

Also accepts all `<div>` attributes.
<!-- AUTO-GENERATED:PART_API:MonthPickerRow:end -->

### `MonthPickerRowGroup`

<!-- AUTO-GENERATED:PART_API:MonthPickerRowGroup:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `asChild` | `boolean` | `false` | No | When `true`, renders the child element instead of a `<div>`, merging the props, for example a `<tbody>`. |

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
| `asChild` | `boolean` | `false` | No | When `true`, renders the child element instead of a `<div>`, merging the props, for example a `<tbody>`. |

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

- Selection and bounds behavior are inherited from `Grid`.
- Months are keyed by their first day as a `YYYY-MM-DD` string; `value`, `min`, `max`, and `disabledDates` use the same strings.
- The picker shows the year of the focused month. `focusedDate` and `defaultFocusedDate` take any day of the month; without them the focused month is the first selected one, otherwise the month of `today`. `onChangeFocusedDate` receives the first day of the newly focused month.
- The tab stop is the focused month when it can be focused, otherwise the selected or the current month of the shown year, otherwise its first available month.
- `today` defaults to the date of the device, read after hydration, so the server and the client render the same markup. Without `today`, `defaultFocusedDate`, or a selection the server renders no months; pass one of them to render the year on the server.
- `locale` defaults to `en-US`, not to the runtime locale, so labels do not depend on the environment.
- The root provides the shown `year` (its first day, `undefined` until it is known) and `calendar` through `useMonthPickerContext`.
- `createMonthPickerGrid({ year, calendar, cols })` derives the rows from the months of the year: 12, or 13 in Hebrew leap years.
- `MonthPickerLayout` formats labels with `Intl.DateTimeFormat` in the picker's calendar system.
- Children of `MonthPickerLayout` are the template of a cell, rendered once per month inside a cell context. The children are required, usually `<MonthPickerCell />`, which shows the formatted label.
- `useMonthPickerCellContext()` returns `{ col, date, fields, label }`; `date` is the first day of the month. Take month numbers from `label` or `fields`, never from the ISO `date` string.
- `locale` and `calendar` are root props; the layouts accept their own `locale` override.
