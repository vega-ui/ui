# Calendar API

## Root API

`Calendar` is the root state container for the calendar system.


<!-- AUTO-GENERATED:ROOT_API:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `max` | `string` | — | No | Latest selectable date as a `YYYY-MM-DD` string. Months and years beyond this date become unavailable. Day, Month, and Year pickers use this to disable or clamp navigation. |
| `min` | `string` | — | No | Earliest selectable date as a `YYYY-MM-DD` string. Months and years before this date become unavailable. All pickers respect this constraint when computing active ranges. |
| `selection` | `S` | `'single'` | No | Selection mode. Determines the structure of `value`, all dates are `YYYY-MM-DD` strings: 'single' — a string, `''` when nothing is selected; 'multiple' — an array of strings; 'range' — a `[start, end]` tuple with `start` not after `end`, `''` marks an unset bound. Default: `'single'` |
| `view` | `CalendarView` | — | No | Controlled visible view: 'day' — the days of the visible month (`CalendarDays`); 'month' — the months of the visible year (`CalendarMonths`); 'year' — pages of years (`CalendarYears`) |
| `value` | `CalendarValue<S>` | — | No | Controlled selection value, shaped by the `selection` mode. Malformed or non-existent dates are treated as unselected. |
| `defaultValue` | `CalendarValue<S>` | — | No | Uncontrolled initial selection value, shaped by the `selection` mode. |
| `defaultView` | `CalendarView` | `'day'` | No | Initial view for uncontrolled usage. Default: `'day'` |
| `disabled` | `boolean` | — | No | Disables the whole calendar: no date can be selected and navigation is off. |
| `disabledDates` | `CalendarDatesDisabled` | — | No | Dates that cannot be selected, as `YYYY-MM-DD` strings: a single date; an array of dates; a predicate `(date: string) => boolean` |
| `onChangeValue` | `(value: CalendarValue<S>) => void` | — | No | Fires when the user changes the selection. The value is shaped by the `selection` mode. |
| `onChangeView` | `(view: CalendarView) => void` | — | No | Fires when the visible view changes. |
| `month` | `string` | — | No | Controlled visible month, given as a `YYYY-MM-DD` string of any day in that month. |
| `defaultMonth` | `string` | — | No | Initial visible month for uncontrolled usage, given as a `YYYY-MM-DD` string of any day in that month. Default: the month of the selected date, otherwise the current month |
| `onChangeMonth` | `(month: string) => void` | — | No | Fires with the first day of the visible month as a `YYYY-MM-DD` string when the visible month changes (e.g., via scrolling or the month and year pickers). This event represents view navigation, not selection. |
| `calendar` | `CalendarSystem` | `gregorianCalendar` | No | Calendar system the calendar is shown in. Values stay `YYYY-MM-DD` days. Defaults to the Gregorian calendar. |
| `locale` | `string` | — | No | BCP 47 locale of month and day names and of the first day of the week, e.g. `de-DE`. Applies to all parts of the calendar and sets `lang` on the root. Defaults to the locale of the runtime, like `Intl`. |
| `size` | `CalendarBaseSize` | `'xs'` | No | Global size scale for the calendar. Affects nested controls such as navigation buttons, picker triggers, and week labels via `CalendarBaseContext`. |
| `variant` | `CalendarBaseVariant` | `'secondary'` | No | Visual variant for the calendar. Propagated through `CalendarBaseContext` and used by nested controls (buttons, labels, etc.) to keep styling consistent. |
| `compact` | `boolean` | — | No | Density flag for more compact layouts. When `true`, the root element receives `data-compact="true"`, allowing styles to reduce paddings, gaps, and control heights for a denser calendar presentation. When `false` or `undefined`, the calendar uses the default spacing. |

Also accepts all `<div>` attributes.
<!-- AUTO-GENERATED:ROOT_API:end -->

## Child Parts API

The public child parts are grouped into four families:

- header and navigation parts
- view switching buttons
- views
- cell templates

| Part | Notes |
| --- | --- |
| `CalendarHeader`, `CalendarContent` | Layout wrappers. |
| `CalendarPrevButton`, `CalendarNextButton` | Previous / next month in the days, previous / next page of years in the years; hidden in the months view. Show a chevron unless `children` are given. |
| `CalendarViewButtonGroup` | Groups the view buttons. |
| `CalendarViewButton` | Toggles that view, `aria-pressed` while it is shown. |
| `CalendarMonthLabel`, `CalendarYearLabel` | Visible month and year in the locale of the root. |
| `CalendarDays` | Day view; holds `CalendarWeekdays` and `CalendarWeeks`. |
| `CalendarWeekdays` | Weekday names in the locale of the root. |
| `CalendarWeeks` | Swipeable day grid. |
| `CalendarMonths` | Months of the visible year. |
| `CalendarYears` | Swipeable pages of years. |
| `CalendarWeekday` | Weekday template; without children it shows the weekday name. |
| `CalendarDay`, `CalendarMonth`, `CalendarYear` | Cell templates; without children they show the formatted label. |

The views take only HTML attributes and display options. The month, selection, disabled dates, locale, calendar system, size and variant come from the `Calendar` root.

Children of `CalendarWeekdays`, `CalendarWeeks`, `CalendarMonths`, and `CalendarYears` are a template rendered once per weekday or cell. They are required, usually `<CalendarWeekday />`, `<CalendarDay />`, `<CalendarMonth />`, or `<CalendarYear />`.

The child parts should be treated as one coordinated system, not as isolated widgets.

### `CalendarHeader`

<!-- AUTO-GENERATED:PART_API:CalendarHeader:start -->
Also accepts all `<div>` attributes.
<!-- AUTO-GENERATED:PART_API:CalendarHeader:end -->

### `CalendarPrevButton`

<!-- AUTO-GENERATED:PART_API:CalendarPrevButton:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `size` | `IconButtonSize` | — | No | Size of the button container. Controls padding and overall clickable area. |
| `asChild` | `boolean` | — | No | When true, renders the button as a child component using `Slot` (e.g., from Radix UI). Enables polymorphic rendering — useful for making the button act as a link or custom tag. |
| `variant` | `ButtonBaseVariant` | — | No | Defines the visual style of the button, affecting color schemes and emphasis. |
| `appearance` | `ButtonBaseAppearance` | — | No | Adjusts the button's structural appearance (background, border, etc.). |
| `disabled` | `boolean` | — | No | Disables the button when true. Prevents user interaction and applies a visually disabled state. Not applied with `asChild`: the child element owns its disabled state, for example, `aria-disabled` or a link without `href`. |
| `className` | `string` | — | No | Optional custom CSS class for the button element. Useful for design system overrides or scoped styles. |
| `children` | `ReactNode` | — | No | Content of the button — text, icon, or any React node. |
| `ref` | `Ref<HTMLButtonElement>` | — | No | Ref forwarded to the native `<button>` element. Allows direct DOM access for focus management or measuring. |

Also accepts all `<button>` attributes.
<!-- AUTO-GENERATED:PART_API:CalendarPrevButton:end -->

### `CalendarNextButton`

<!-- AUTO-GENERATED:PART_API:CalendarNextButton:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `size` | `IconButtonSize` | — | No | Size of the button container. Controls padding and overall clickable area. |
| `asChild` | `boolean` | — | No | When true, renders the button as a child component using `Slot` (e.g., from Radix UI). Enables polymorphic rendering — useful for making the button act as a link or custom tag. |
| `variant` | `ButtonBaseVariant` | — | No | Defines the visual style of the button, affecting color schemes and emphasis. |
| `appearance` | `ButtonBaseAppearance` | — | No | Adjusts the button's structural appearance (background, border, etc.). |
| `disabled` | `boolean` | — | No | Disables the button when true. Prevents user interaction and applies a visually disabled state. Not applied with `asChild`: the child element owns its disabled state, for example, `aria-disabled` or a link without `href`. |
| `className` | `string` | — | No | Optional custom CSS class for the button element. Useful for design system overrides or scoped styles. |
| `children` | `ReactNode` | — | No | Content of the button — text, icon, or any React node. |
| `ref` | `Ref<HTMLButtonElement>` | — | No | Ref forwarded to the native `<button>` element. Allows direct DOM access for focus management or measuring. |

Also accepts all `<button>` attributes.
<!-- AUTO-GENERATED:PART_API:CalendarNextButton:end -->

### `CalendarViewButtonGroup`

<!-- AUTO-GENERATED:PART_API:CalendarViewButtonGroup:start -->
Also accepts all `<div>` attributes.
<!-- AUTO-GENERATED:PART_API:CalendarViewButtonGroup:end -->

### `CalendarViewButton`

<!-- AUTO-GENERATED:PART_API:CalendarViewButton:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `view` | `Exclude<CalendarView, 'day'>` | — | Yes | View the button opens: `'month'` for `CalendarMonths`, `'year'` for `CalendarYears`. Pressing it again goes back to the days. |
| `asChild` | `boolean` | — | No | When true, renders the button as a child component using `Slot` (e.g., from Radix UI). Enables polymorphic rendering — useful for making the button act as a link or custom tag. |
| `size` | `ButtonSize` | — | No | Defines the size of the button. Affects padding, font size, and overall dimensions. |
| `fullWidth` | `boolean` | — | No | When true, the button expands to fill the width with its container. |
| `variant` | `ButtonBaseVariant` | — | No | Defines the visual style of the button, affecting color schemes and emphasis. |
| `appearance` | `ButtonBaseAppearance` | — | No | Adjusts the button's structural appearance (background, border, etc.). |
| `disabled` | `boolean` | — | No | Disables the button when true. Prevents user interaction and applies a visually disabled state. Not applied with `asChild`: the child element owns its disabled state, for example, `aria-disabled` or a link without `href`. |
| `className` | `string` | — | No | Optional custom CSS class for the button element. Useful for design system overrides or scoped styles. |
| `children` | `ReactNode` | — | No | Content of the button — text, icon, or any React node. |
| `ref` | `Ref<HTMLButtonElement>` | — | No | Ref forwarded to the native `<button>` element. Allows direct DOM access for focus management or measuring. |

Also accepts all `<button>` attributes.
<!-- AUTO-GENERATED:PART_API:CalendarViewButton:end -->

### `CalendarMonthLabel`

<!-- AUTO-GENERATED:PART_API:CalendarMonthLabel:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `format` | `Intl.DateTimeFormatOptions['month']` | `'long'` | No | Month display format (from `Intl.DateTimeFormatOptions`). Defines how the month name should appear. Possible values: "long" → January (default); "short" → Jan; "narrow" → J |
<!-- AUTO-GENERATED:PART_API:CalendarMonthLabel:end -->

### `CalendarYearLabel`

<!-- AUTO-GENERATED:PART_API:CalendarYearLabel:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `format` | `Intl.DateTimeFormatOptions['year']` | `'numeric'` | No | Format of the displayed year (from `Intl.DateTimeFormatOptions`). Possible values: "numeric" → 2026; "2-digit" → 26. Default is typically `"numeric"`. |
<!-- AUTO-GENERATED:PART_API:CalendarYearLabel:end -->

### `CalendarContent`

<!-- AUTO-GENERATED:PART_API:CalendarContent:start -->
Also accepts all `<div>` attributes.
<!-- AUTO-GENERATED:PART_API:CalendarContent:end -->

### `CalendarDays`

<!-- AUTO-GENERATED:PART_API:CalendarDays:start -->
Also accepts all `<div>` attributes.
<!-- AUTO-GENERATED:PART_API:CalendarDays:end -->

### `CalendarWeekdays`

<!-- AUTO-GENERATED:PART_API:CalendarWeekdays:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `format` | `Intl.DateTimeFormatOptions['weekday']` | `'short'` | No | Format of the weekday names (`Intl.DateTimeFormat` `weekday`). |
| `children` | `ReactNode` | — | Yes | Template rendered once per weekday, usually `<CalendarWeekday />`. Read the weekday with `useCalendarWeekdayContext()`. |

Also accepts all `<div>` attributes.
<!-- AUTO-GENERATED:PART_API:CalendarWeekdays:end -->

### `CalendarWeekday`

<!-- AUTO-GENERATED:PART_API:CalendarWeekday:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `size` | `TextSize` | — | No | Visual size of the text, typically mapped to the design system’s type scale. |
| `asChild` | `boolean` | — | No | If true, renders the text as a child component using `Slot`. Useful for compatibility with native elements or other components. |
| `fontWeight` | `400 \| 500 \| 600 \| 700 \| 900` | — | No | Font weight applied to the text. Common values: 400: Regular; 500: Medium; 600: Semi-bold; 700: Bold; 900: Extra bold |
| `ref` | `Ref<HTMLSpanElement>` | — | No | Ref to the underlying `<span>` or slotted element. Useful for measuring, focusing, or DOM manipulation. |

Also accepts all `<span>` attributes.
<!-- AUTO-GENERATED:PART_API:CalendarWeekday:end -->

### `CalendarWeeks`

<!-- AUTO-GENERATED:PART_API:CalendarWeeks:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `children` | `ReactNode` | — | Yes | Template of a day cell, rendered once for every day of the visible months. Read the day with `useCalendarDayContext()`; usually `<CalendarDay />`. |
| `format` | `Intl.DateTimeFormatOptions['day']` | `"numeric"` | No | Format of the day numbers (`Intl.DateTimeFormat` `day`). |
| `includeOverflowDays` | `boolean` | `false` | No | Whether days of the previous and next months fill the empty cells. |
| `start` | `number` | `-2` | No | Starting index used to generate the initial sequence of pages. Acts as the logical origin for the sliding index window. |
| `size` | `number` | `5` | No | Number of index segments rendered at once. Defines the size of the virtual “window” that the scroller slides over when navigating left or right. |
| `startDir` | `-1 \| 1` | `1` | No | Direction in which the initial index sequence expands. `1` — indexes increase to the right (0, 1, 2…); `-1` — indexes decrease to the right (0, -1, -2…). Controls the growth pattern of the initial index array. |
| `shift` | `number` | `2` | No | Number of pages appended when a scroll reaches the end of the window, so a fast swipe keeps going. Once the scroll settles, the window is re-centered on the snapped page. |
| `index` | `number` | — | No | Controls the currently active logical index. When provided, the scroller keeps the given index in view, scrolling to it if possible or rebuilding the window if needed. |
| `preserveScroll` | `boolean` | `true` | No | Preserve the currently snapped item after content changes (e.g., when pages are prepended/appended). If `true`, the scroller will restore the same snapped index using an immediate `scrollIntoView`. |
| `onOffset` | `(value: number) => void` | — | No | Fires when the window grows at an edge. `-1` — the scroll settled on the first page (left/top edge); `+1` — the scroll reached the end (right/bottom edge). Useful for infinite loading: append/prepend pages based on the direction. |
| `ref` | `Ref<HTMLDivElement>` | — | No | Ref to the scroller’s element. |
| `defaultIndex` | `number` | — | No | Initial index of the item to snap to on mount. |
| `onScrollSnapChange` | `(element: HTMLElement, index: number) => void` | — | No | Fired when a scroll snap operation has fully completed and the scroller has settled on a new snap index. This callback is invoked after all scrolling and snapping animations have finished and the active snap position is considered stable. |
| `onScrollSnapChanging` | `(element: HTMLElement, index: number) => void` | — | No | Fired while a scroll snap operation is in progress and the active snap index is still changing. This callback may be invoked multiple times during a single scroll or swipe interaction as the scroller approaches its final snap position. Useful for optimistic UI updates, previews, or synchronizing transient state during scrolling. |

Also accepts all `<div>` attributes.
<!-- AUTO-GENERATED:PART_API:CalendarWeeks:end -->

### `CalendarDay`

<!-- AUTO-GENERATED:PART_API:CalendarDay:start -->
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
<!-- AUTO-GENERATED:PART_API:CalendarDay:end -->

### `CalendarMonths`

<!-- AUTO-GENERATED:PART_API:CalendarMonths:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `children` | `ReactNode` | — | Yes | Template of a month cell, rendered once for every month of the visible year. Read the month with `useCalendarMonthContext()`; usually `<CalendarMonth />`. |
| `cols` | `number` | `3` | No | Number of columns of the month grid. |
| `format` | `Intl.DateTimeFormatOptions['month']` | `"long"` | No | Format of the month names (`Intl.DateTimeFormat` `month`). |

Also accepts all `<div>` attributes.
<!-- AUTO-GENERATED:PART_API:CalendarMonths:end -->

### `CalendarMonth`

<!-- AUTO-GENERATED:PART_API:CalendarMonth:start -->
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
<!-- AUTO-GENERATED:PART_API:CalendarMonth:end -->

### `CalendarYears`

<!-- AUTO-GENERATED:PART_API:CalendarYears:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `children` | `ReactNode` | — | Yes | Template of a year cell, rendered once for every year of the visible pages. Read the year with `useCalendarYearContext()`; usually `<CalendarYear />`. |
| `format` | `Intl.DateTimeFormatOptions['year']` | `"numeric"` | No | Format of the years (`Intl.DateTimeFormat` `year`). |

Also accepts all `<div>` attributes.
<!-- AUTO-GENERATED:PART_API:CalendarYears:end -->

### `CalendarYear`

<!-- AUTO-GENERATED:PART_API:CalendarYear:start -->
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
<!-- AUTO-GENERATED:PART_API:CalendarYear:end -->

## Hooks

### `useCalendarContext`

Advanced hook for custom parts. Exposes the root state, including `view`, `month`, `locale`, `calendar`, `toggleView(view)`, `closeView()`, `prev()`, and `next()`.

### `useCalendarWeekdayContext`

Weekday of the surrounding `CalendarWeekdays` template:

| Field | Type | Notes |
| --- | --- | --- |
| `col` | `number` | Column index within the row. |
| `weekday` | `number` | Day of the week as in `Date#getDay()`: `0` is Sunday, `6` is Saturday. |
| `label` | `string` | Weekday name in the locale of the root. |

### `useCalendarDayContext`

Day of the surrounding `CalendarWeeks` template:

| Field | Type | Notes |
| --- | --- | --- |
| `col` | `number` | Column index within the week. |
| `date` | `string \| undefined` | ISO `YYYY-MM-DD` day; `undefined` for an empty overflow cell. |
| `fields` | `CalendarDateFields \| undefined` | Day in the calendar system: `{ era?, year, month, day }`. |
| `label` | `string` | Formatted day number in the locale and calendar system. |
| `inMonth` | `boolean` | Whether the day belongs to the rendered month. |

### `useCalendarMonthContext` / `useCalendarYearContext`

Month or year of the surrounding `CalendarMonths` / `CalendarYears` template: `col`, `date` (first day of the month or year, ISO), `fields`, and `label`.

Take the day, month, or year number from `label` or `fields`, never from the ISO `date` string: in non-Gregorian calendars they differ.

## Types

| Type | Definition | Notes |
| --- | --- | --- |
| `CalendarProps` | Root prop type | Main integration surface. |
| `CalendarView` | view union | `'day'`, `'month'`, or `'year'`. |
| `CalendarSelection` | selection union | `single`, `multiple`, or `range`. |
| `CalendarValue` | selection value by mode | `YYYY-MM-DD` string, `[start, end]` tuple (`start` never after `end`), or array of strings. |
| `CalendarDatesDisabled` | disabled-date contract | `YYYY-MM-DD` string, array of strings, or a `(date: string) => boolean` predicate. |

## State Model

- Visible date and selection state live in the root.
- Selection mode changes the expected value shape.
- Views coordinate around the same root state.
- `view` determines which of days, months, or years is visible and drives the previous and next buttons.
- `locale` and `calendar` are root props read by every part; the default is the runtime locale and the Gregorian calendar.

## Integration Notes

- Pass ISO `YYYY-MM-DD` strings to the component layer and keep them as the stored value; convert to other formats in the application layer.
- `calendar` changes how days are grouped and labeled, not the value. See [Dates And Calendar Systems](../../i18n.md).
- Retest custom cell templates and overflow cells carefully.
- Use the lower-level `DayPicker`, `MonthPicker`, and `YearPicker` only when the full `Calendar` composition is not needed.
- Reach for `DayPicker`, `MonthPicker`, `YearPicker`, or `CalendarBase` only when building custom calendar-family behavior, not as a first choice for normal date picking flows.
