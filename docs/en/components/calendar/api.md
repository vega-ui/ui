# Calendar API

## Root API

`Calendar` is the root state container for the calendar system.


<!-- AUTO-GENERATED:ROOT_API:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `variant` | `CalendarVariant` | `'secondary'` | No | Visual variant of the buttons and cells of the calendar. |
| `size` | `CalendarSize` | `'xs'` | No | Size of the buttons, cells and weekday names of the calendar. |
| `compact` | `boolean` | — | No | Shrinks the calendar to the width of its content: the root gets `data-compact="true"`. |
| `max` | `string` | — | No | Latest selectable date as a `YYYY-MM-DD` string. Months and years beyond this date become unavailable. Day, Month, and Year pickers use this to disable or clamp navigation. |
| `min` | `string` | — | No | Earliest selectable date as a `YYYY-MM-DD` string. Months and years before this date become unavailable. All pickers respect this constraint when computing active ranges. |
| `selection` | `SelectionMode` | `'single'` | No | Selection mode. Determines the structure of `value`, all dates are `YYYY-MM-DD` strings: 'single' — a string, `''` when nothing is selected; 'multiple' — an array of strings; 'range' — a `[start, end]` tuple with `start` not after `end`, `''` marks an unset bound |
| `view` | `CalendarView` | — | No | Controlled visible view: 'day' — the days of the visible month (`CalendarDays`); 'month' — the months of the visible year (`CalendarMonths`); 'year' — pages of years (`CalendarYears`) |
| `value` | `CalendarValue<SelectionMode>` | — | No | Controlled selection value, shaped by the `selection` mode. Malformed or non-existent dates are treated as unselected. |
| `defaultValue` | `CalendarValue<SelectionMode>` | — | No | Uncontrolled initial selection value, shaped by the `selection` mode. |
| `defaultView` | `CalendarView` | `'day'` | No | Initial view for uncontrolled usage. |
| `disabled` | `boolean` | — | No | Disables the whole calendar: no date can be selected and navigation is off. |
| `readOnly` | `boolean` | — | No | Makes the selection read-only like a native `readonly` input: the day grid gets `aria-readonly="true"`, navigation still works, and picking a day neither changes the selection nor calls `onChangeValue`. |
| `autoFocus` | `boolean` | — | No | Moves the focus into the calendar when it mounts, onto the tab stop of the shown view: the focused day, otherwise the selected day or today, otherwise the first available day. |
| `disabledDates` | `CalendarDatesDisabled` | — | No | Dates that cannot be selected, as `YYYY-MM-DD` strings: a single date; an array of dates; a predicate `(date: string) => boolean` |
| `onChangeValue` | `(value: CalendarValue<SelectionMode>) => void` | — | No | Fires when the user changes the selection. The value is shaped by the `selection` mode. |
| `onChangeView` | `(view: CalendarView) => void` | — | No | Fires when the visible view changes. |
| `focusedDate` | `string` | — | No | Controlled focused day as a `YYYY-MM-DD` string. The calendar shows its month, and the day is the tab stop of the day grid when it can be focused. |
| `defaultFocusedDate` | `string` | — | No | Initial focused day for uncontrolled usage. Default: the selected day, otherwise `today` clamped to `min` and `max` |
| `onChangeFocusedDate` | `(date: string) => void` | — | No | Fires with the newly focused day as a `YYYY-MM-DD` string when the focus moves, also to another month (with the keyboard, the previous and next buttons, swiping, or the month and year views). This event represents navigation, not selection. |
| `today` | `string` | — | No | Today as a `YYYY-MM-DD` string: the day marked with `aria-current="date"`. Defaults to the date of the device, read after hydration, so the server and the client render the same markup. Pass it when the server must render the month of today, or to use the time zone of the user. Without it, today follows the device when the day or the time zone changes. |
| `calendar` | `CalendarSystem` | `gregorianCalendar` | No | Calendar system the calendar is shown in. Values stay `YYYY-MM-DD` days. Defaults to the Gregorian calendar. |
| `locale` | `string` | `"en-US"` | No | BCP 47 locale of month and day names and of the first day of the week, e.g. `de-DE`. Applies to all parts of the calendar and sets `lang` on the root. |

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
| `CalendarPrevButton`, `CalendarNextButton` | In the days they move the focused day to the same day of the previous / next month and keep focus on the button; in the years they show the previous / next page of years; hidden in the months view. Show a chevron unless `children` are given. |
| `CalendarHeading` | `<h2 aria-live="polite">` (another level with `as`) that names the day grid (`CalendarDays` gets `aria-labelledby` pointing to it). Usually wraps the `CalendarViewButton`s; without children it shows the month and year. |
| `CalendarViewButton` | Toggles that view, `aria-pressed` while it is shown. |
| `CalendarMonthLabel`, `CalendarYearLabel` | Month and year of the focused day in the locale of the root. |
| `CalendarDays` | Day view; holds `CalendarWeekdays` and `CalendarWeeks`, or `CalendarDaysScroller` with pages of `CalendarWeeks`. Always mounted (inert while another view is open) to keep the size. |
| `CalendarWeekdays` | Weekday names in the locale of the root. |
| `CalendarDaysScroller`, `CalendarDaysScrollerContent` | Optional swiping between months, a page per month; swiping to a month moves the focused day to the same day there. `onChangePeriod(month)` reports the month scrolled into view. |
| `CalendarWeeks` | Day grid of the month of its page, or of the focused day outside a scroller. |
| `CalendarMonths` | Months of the year of the focused day; mounted while the months view is open and until its exit transition ends. |
| `CalendarMonthsGrid` | Grid of the months, `cols` per row. |
| `CalendarYears` | Pages of 12 years; mounted while the years view is open and until its exit transition ends. |
| `CalendarYearsScroller`, `CalendarYearsScrollerContent` | Optional swiping between pages of years. |
| `CalendarYearsGrid` | Grid of the years of its page, or of the page of the focused year outside a scroller. |
| `CalendarWeekday` | Weekday template; without children it shows the weekday name. |
| `CalendarDay`, `CalendarMonth`, `CalendarYear` | Cell templates; without children they show the formatted label. |

The views take only HTML attributes and display options. The focused day, selection, disabled dates, locale, calendar system, size and variant come from the `Calendar` root.

Children of `CalendarWeekdays`, `CalendarWeeks`, `CalendarMonthsGrid`, and `CalendarYearsGrid` are a template rendered once per weekday or cell. They are required, usually `<CalendarWeekday />`, `<CalendarDay />`, `<CalendarMonth />`, or `<CalendarYear />`.

The child parts should be treated as one coordinated system, not as isolated widgets.

### `CalendarHeader`

<!-- AUTO-GENERATED:PART_API:CalendarHeader:start -->
Also accepts all `<div>` attributes.
<!-- AUTO-GENERATED:PART_API:CalendarHeader:end -->

### `CalendarPrevButton`

<!-- AUTO-GENERATED:PART_API:CalendarPrevButton:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `asChild` | `boolean` | — | No | When true, renders the button as a child component using `Slot` (e.g., from Radix UI). Enables polymorphic rendering — useful for making the button act as a link or custom tag. |
| `size` | `ButtonSize` | — | No | Defines the size of the button. Affects padding, font size, and overall dimensions. |
| `variant` | `ButtonBaseVariant` | — | No | Defines the visual style of the button, affecting color schemes and emphasis. |
| `appearance` | `ButtonBaseAppearance` | — | No | Adjusts the button's structural appearance (background, border, etc.). |
| `disabled` | `boolean` | — | No | Disables the button when true. Prevents user interaction and applies a visually disabled state. Not applied with `asChild`: the child element owns its disabled state, for example, `aria-disabled` or a link without `href`. |
| `className` | `string` | — | No | Optional custom CSS class for the button element. Useful for design system overrides or scoped styles. |
| `children` | `ReactNode` | — | No | Content of the button — text, icon, or any React node. |
| `ref` | `Ref<HTMLButtonElement>` | — | No | Ref forwarded to the native `<button>` element. Allows direct DOM access for focus management or measuring. |
| `square` | `false` | — | No | Makes the button a square as wide as it is high, for a single icon. Name it with `aria-label` or `aria-labelledby`. |

Also accepts all `<button>` attributes.
<!-- AUTO-GENERATED:PART_API:CalendarPrevButton:end -->

### `CalendarNextButton`

<!-- AUTO-GENERATED:PART_API:CalendarNextButton:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `asChild` | `boolean` | — | No | When true, renders the button as a child component using `Slot` (e.g., from Radix UI). Enables polymorphic rendering — useful for making the button act as a link or custom tag. |
| `size` | `ButtonSize` | — | No | Defines the size of the button. Affects padding, font size, and overall dimensions. |
| `variant` | `ButtonBaseVariant` | — | No | Defines the visual style of the button, affecting color schemes and emphasis. |
| `appearance` | `ButtonBaseAppearance` | — | No | Adjusts the button's structural appearance (background, border, etc.). |
| `disabled` | `boolean` | — | No | Disables the button when true. Prevents user interaction and applies a visually disabled state. Not applied with `asChild`: the child element owns its disabled state, for example, `aria-disabled` or a link without `href`. |
| `className` | `string` | — | No | Optional custom CSS class for the button element. Useful for design system overrides or scoped styles. |
| `children` | `ReactNode` | — | No | Content of the button — text, icon, or any React node. |
| `ref` | `Ref<HTMLButtonElement>` | — | No | Ref forwarded to the native `<button>` element. Allows direct DOM access for focus management or measuring. |
| `square` | `false` | — | No | Makes the button a square as wide as it is high, for a single icon. Name it with `aria-label` or `aria-labelledby`. |

Also accepts all `<button>` attributes.
<!-- AUTO-GENERATED:PART_API:CalendarNextButton:end -->

### `CalendarViewButton`

<!-- AUTO-GENERATED:PART_API:CalendarViewButton:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `view` | `Exclude<CalendarView, 'day'>` | — | Yes | View the button opens: `'month'` for `CalendarMonths`, `'year'` for `CalendarYears`. Pressing it again goes back to the days. |
| `asChild` | `boolean` | — | No | When true, renders the button as a child component using `Slot` (e.g., from Radix UI). Enables polymorphic rendering — useful for making the button act as a link or custom tag. |
| `size` | `ButtonSize` | — | No | Defines the size of the button. Affects padding, font size, and overall dimensions. |
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
| `format` | `Intl.DateTimeFormatOptions['year']` | `'numeric'` | No | Format of the displayed year (from `Intl.DateTimeFormatOptions`). Possible values: "numeric" → 2026; "2-digit" → 26 |
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

### `CalendarDaysScroller`

<!-- AUTO-GENERATED:PART_API:CalendarDaysScroller:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `start` | `number` | `-2` | No | Starting index used to generate the initial sequence of pages. Acts as the logical origin for the sliding index window. |
| `size` | `number` | `5` | No | Number of index segments rendered at once. Defines the size of the virtual “window” that the scroller slides over when navigating left or right. |
| `ref` | `Ref<HTMLDivElement>` | — | No | Ref to the scroller’s element. |
| `defaultIndex` | `number` | — | No | Initial index of the item to snap to on mount. |
| `onScrollSnapChange` | `(element: HTMLElement, index: number) => void` | — | No | Fired when a scroll snap operation has fully completed and the scroller has settled on a new snap index. This callback is invoked after all scrolling and snapping animations have finished and the active snap position is considered stable. |
| `onScrollSnapChanging` | `(element: HTMLElement, index: number) => void` | — | No | Fired while a scroll snap operation is in progress and the active snap index is still changing. This callback may be invoked multiple times during a single scroll or swipe interaction as the scroller approaches its final snap position. Useful for optimistic UI updates, previews, or synchronizing transient state during scrolling. |
| `onChangePeriod` | `(month: string) => void` | — | No | Called when a month page is scrolled into view, with the first day of that month as a `YYYY-MM-DD` string in the DayPicker's calendar system. |
| `shift` | `number` | `2` | No | Number of pages appended when a scroll reaches the end of the window, so a fast swipe keeps going. Once the scroll settles, the window is re-centered on the snapped page. |
| `index` | `number` | — | No | Controls the currently active logical index. When provided, the scroller keeps the given index in view, scrolling to it if possible or rebuilding the window if needed. |
| `preserveScroll` | `boolean` | `true` | No | Preserve the currently snapped item after content changes (e.g., when pages are prepended/appended). If `true`, the scroller will restore the same snapped index using an immediate `scrollTo`. |
| `onOffset` | `(value: number) => void` | — | No | Fires when the window grows at an edge. `-1` — the scroll settled on the first page (left/top edge); `+1` — the scroll reached the end (right/bottom edge). Useful for infinite loading: append/prepend pages based on the direction. |

Also accepts all `<div>` attributes.
<!-- AUTO-GENERATED:PART_API:CalendarDaysScroller:end -->

### `CalendarDaysScrollerContent`

<!-- AUTO-GENERATED:PART_API:CalendarDaysScrollerContent:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `ref` | `Ref<HTMLDivElement>` | — | No | External ref to the item's root element. Merged with the ref that registers the item with the scroller under its `index`. |
| `asChild` | `boolean` | — | No | Render the content as a child (via `Slot`) instead of a native `<div>`. Keeps attributes/refs bound to the passed child element. |

Also accepts all `<div>` attributes.
<!-- AUTO-GENERATED:PART_API:CalendarDaysScrollerContent:end -->

### `CalendarWeeks`

<!-- AUTO-GENERATED:PART_API:CalendarWeeks:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `children` | `ReactNode` | — | Yes | Template of a day cell, rendered once for every day of the month. Read the day with `useCalendarDayContext()`; usually `<CalendarDay />`. |
| `format` | `Intl.DateTimeFormatOptions['day']` | `"numeric"` | No | Format of the day numbers (`Intl.DateTimeFormat` `day`). |
| `includeOverflowDays` | `boolean` | `false` | No | Whether days of the previous and next months fill the empty cells. |
| `asChild` | `boolean` | `false` | No | When `true`, renders the child element instead of a `<div>`, merging the props, for example a `<tbody>`. |

Also accepts all `<div>` attributes.
<!-- AUTO-GENERATED:PART_API:CalendarWeeks:end -->

### `CalendarDay`

<!-- AUTO-GENERATED:PART_API:CalendarDay:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `size` | `GridItemSize` | — | No | Controls the item’s visual size. Defaults to the size of the DayPicker. |
| `disabled` | `boolean` | — | No | Marks the cell as disabled with `aria-disabled`: it cannot be selected. Adds to the `disabled` of the root Grid. A disabled cell stays focusable. |
| `variant` | `GridItemVariant` | — | No | Color of the selected item. Defaults to the variant of the DayPicker. |
| `ref` | `Ref<HTMLDivElement>` | — | No | External ref to the cell root element, merged with the internal registration ref. |
| `excluded` | `boolean` | — | No | Excludes the cell from focus traversal: it is not focusable and never becomes active. Adds to the `exclude` of the root Grid. |

Also accepts all `<div>` attributes.
<!-- AUTO-GENERATED:PART_API:CalendarDay:end -->

### `CalendarMonths`

<!-- AUTO-GENERATED:PART_API:CalendarMonths:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `ref` | `Ref<HTMLDivElement>` | — | No | Ref to the month grid element. |
| `children` | `ReactNode` | — | Yes | Content of the month grid, usually `CalendarMonthsGrid`. |

Also accepts all `<div>` attributes.
<!-- AUTO-GENERATED:PART_API:CalendarMonths:end -->

### `CalendarMonthsGrid`

<!-- AUTO-GENERATED:PART_API:CalendarMonthsGrid:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `children` | `ReactNode` | — | Yes | Template of a month cell, rendered once for every month of the year. Read the month with `useMonthPickerCellContext()`; usually `<MonthPickerCell />`. |
| `asChild` | `boolean` | `false` | No | When `true`, renders the child element instead of a `<div>`, merging the props, for example a `<tbody>`. |
| `format` | `Intl.DateTimeFormatOptions['month']` | `"long"` | No | Month display format (from `Intl.DateTimeFormatOptions`). |
| `cols` | `number` | `3` | No | Number of columns; rows are added as needed for all months of the year. |

Also accepts all `<div>` attributes.
<!-- AUTO-GENERATED:PART_API:CalendarMonthsGrid:end -->

### `CalendarMonth`

<!-- AUTO-GENERATED:PART_API:CalendarMonth:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `size` | `GridItemSize` | — | No | Controls the item’s visual size. Defaults to the size of the MonthPicker. |
| `disabled` | `boolean` | — | No | Marks the cell as disabled with `aria-disabled`: it cannot be selected. Adds to the `disabled` of the root Grid. A disabled cell stays focusable. |
| `variant` | `GridItemVariant` | — | No | Color of the selected item. Defaults to the variant of the MonthPicker. |
| `ref` | `Ref<HTMLDivElement>` | — | No | External ref to the cell root element, merged with the internal registration ref. |
| `excluded` | `boolean` | — | No | Excludes the cell from focus traversal: it is not focusable and never becomes active. Adds to the `exclude` of the root Grid. |

Also accepts all `<div>` attributes.
<!-- AUTO-GENERATED:PART_API:CalendarMonth:end -->

### `CalendarYears`

<!-- AUTO-GENERATED:PART_API:CalendarYears:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `ref` | `Ref<HTMLDivElement>` | — | No | Ref to the year grid element. |
| `children` | `ReactNode` | — | Yes | Content of the year grid: `CalendarYearsGrid`, or `CalendarYearsScroller` with pages of it. |

Also accepts all `<div>` attributes.
<!-- AUTO-GENERATED:PART_API:CalendarYears:end -->

### `CalendarYearsScroller`

<!-- AUTO-GENERATED:PART_API:CalendarYearsScroller:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `start` | `number` | `-2` | No | Starting index used to generate the initial sequence of pages. Acts as the logical origin for the sliding index window. |
| `size` | `number` | `5` | No | Number of index segments rendered at once. Defines the size of the virtual “window” that the scroller slides over when navigating left or right. |
| `ref` | `Ref<HTMLDivElement>` | — | No | Ref to the scroller’s element. |
| `defaultIndex` | `number` | — | No | Initial index of the item to snap to on mount. |
| `onScrollSnapChange` | `(element: HTMLElement, index: number) => void` | — | No | Fired when a scroll snap operation has fully completed and the scroller has settled on a new snap index. This callback is invoked after all scrolling and snapping animations have finished and the active snap position is considered stable. |
| `onScrollSnapChanging` | `(element: HTMLElement, index: number) => void` | — | No | Fired while a scroll snap operation is in progress and the active snap index is still changing. This callback may be invoked multiple times during a single scroll or swipe interaction as the scroller approaches its final snap position. Useful for optimistic UI updates, previews, or synchronizing transient state during scrolling. |
| `onChangePeriod` | `(year: string) => void` | — | No | Called when a page of years is scrolled into view, with the first day of the first year of that page as a `YYYY-MM-DD` string in the YearPicker's calendar system. |
| `shift` | `number` | `2` | No | Number of pages appended when a scroll reaches the end of the window, so a fast swipe keeps going. Once the scroll settles, the window is re-centered on the snapped page. |
| `index` | `number` | — | No | Controls the currently active logical index. When provided, the scroller keeps the given index in view, scrolling to it if possible or rebuilding the window if needed. |
| `preserveScroll` | `boolean` | `true` | No | Preserve the currently snapped item after content changes (e.g., when pages are prepended/appended). If `true`, the scroller will restore the same snapped index using an immediate `scrollTo`. |
| `onOffset` | `(value: number) => void` | — | No | Fires when the window grows at an edge. `-1` — the scroll settled on the first page (left/top edge); `+1` — the scroll reached the end (right/bottom edge). Useful for infinite loading: append/prepend pages based on the direction. |

Also accepts all `<div>` attributes.
<!-- AUTO-GENERATED:PART_API:CalendarYearsScroller:end -->

### `CalendarYearsScrollerContent`

<!-- AUTO-GENERATED:PART_API:CalendarYearsScrollerContent:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `ref` | `Ref<HTMLDivElement>` | — | No | External ref to the item's root element. Merged with the ref that registers the item with the scroller under its `index`. |
| `asChild` | `boolean` | — | No | Render the content as a child (via `Slot`) instead of a native `<div>`. Keeps attributes/refs bound to the passed child element. |

Also accepts all `<div>` attributes.
<!-- AUTO-GENERATED:PART_API:CalendarYearsScrollerContent:end -->

### `CalendarYearsGrid`

<!-- AUTO-GENERATED:PART_API:CalendarYearsGrid:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `children` | `ReactNode` | — | Yes | Template of a year cell, rendered once for every year of the page. Read the year with `useYearPickerCellContext()`; usually `<YearPickerCell />`. |
| `asChild` | `boolean` | `false` | No | When `true`, renders the child element instead of a `<div>`, merging the props, for example a `<tbody>`. |
| `format` | `Intl.DateTimeFormatOptions['year']` | `"numeric"` | No | Year display format (from `Intl.DateTimeFormatOptions`). |

Also accepts all `<div>` attributes.
<!-- AUTO-GENERATED:PART_API:CalendarYearsGrid:end -->

### `CalendarYear`

<!-- AUTO-GENERATED:PART_API:CalendarYear:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `size` | `GridItemSize` | — | No | Controls the item’s visual size. Defaults to the size of the YearPicker. |
| `disabled` | `boolean` | — | No | Marks the cell as disabled with `aria-disabled`: it cannot be selected. Adds to the `disabled` of the root Grid. A disabled cell stays focusable. |
| `variant` | `GridItemVariant` | — | No | Color of the selected item. Defaults to the variant of the YearPicker. |
| `ref` | `Ref<HTMLDivElement>` | — | No | External ref to the cell root element, merged with the internal registration ref. |
| `excluded` | `boolean` | — | No | Excludes the cell from focus traversal: it is not focusable and never becomes active. Adds to the `exclude` of the root Grid. |

Also accepts all `<div>` attributes.
<!-- AUTO-GENERATED:PART_API:CalendarYear:end -->

### `CalendarHeading`

<!-- AUTO-GENERATED:PART_API:CalendarHeading:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `as` | `HeadingAs` | `'h2'` | No | The heading tag to render, so the calendar fits the outline of the page, like `as` of `Heading`. |

Also accepts all `<h1>–<h6>` attributes.
<!-- AUTO-GENERATED:PART_API:CalendarHeading:end -->

## Hooks

### `useCalendarContext`

Advanced hook for custom parts. Exposes the root state:

| Field | Type | Notes |
| --- | --- | --- |
| `today` | `string \| undefined` | `today` prop, or the device date after hydration. |
| `view` | `CalendarView` | Open view. |
| `locale`, `calendar` | `string`, `CalendarSystem` | Locale and calendar system of the root. |
| `headingId` | `string \| undefined` | `id` of `CalendarHeading`. |
| `changeFocusedDate(date)` | `(date: string) => void` | Moves the focused day and fires `onChangeFocusedDate`. |
| `toggleView(view)`, `closeView()`, `prev()`, `next()` | functions | Same actions as the view and navigation buttons. |

It holds only what rarely changes, so a cell template that reads `locale` or `calendar` from it does not re-render when the focus moves. The focused day, the shown month, the tab stop, `min`/`max` and the disabled days are not part of it; the parts get them internally. `changeActiveDay`, `changePeriod` and the picker `apiRef`s of 2.x are gone: navigation of any kind is `changeFocusedDate`.

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

Month or year of the surrounding `CalendarMonthsGrid` / `CalendarYearsGrid` template: `col`, `date` (first day of the month or year, ISO), `fields`, and `label`.

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

- The focused day and the selection live in the root. The calendar shows the month of the focused day, so changing the month or the year is a change of the focused day.
- Without `focusedDate` / `defaultFocusedDate`, the focused day is the first selected day, otherwise `today` clamped to `min` and `max`, so a calendar whose range starts after today opens on `min`.
- `readOnly` keeps the selection as it is, like a native `readonly` input: navigation works, the day grid gets `aria-readonly="true"`, and a pick neither changes the selection nor calls `onChangeValue`.
- `autoFocus` focuses the tab stop of the shown view on mount, as the date fields do when their popup opens.
- Selection mode changes the expected value shape.
- Views coordinate around the same root state.
- `view` determines which of days, months, or years is visible and drives the previous and next buttons.
- `onChangeFocusedDate` reports the focused day, not the month start: **Next** from `2026-01-15` reports `2026-02-15`.
- Only the open view is mounted: `CalendarMonths` and `CalendarYears` render while their view is open and, inert, until their exit transition ends, and opening a view focuses its tab stop. Picking a month or a year, or Escape, returns to the days and focuses the day tab stop.
- `locale` and `calendar` are root props read by every part; the defaults are `"en-US"` and the Gregorian calendar. `lang` is set on the root only when `locale` is passed.
- `today` defaults to the device date read after hydration, so the server and the client render the same markup. Pass `today` (or `defaultFocusedDate`) to render the right month on the server.
- `CalendarPrevButton`, `CalendarNextButton` and `CalendarViewButton` run your `onClick` first: `event.preventDefault()` in it keeps the month and the view as they are.

## Integration Notes

- Pass ISO `YYYY-MM-DD` strings to the component layer and keep them as the stored value; convert to other formats in the application layer.
- `calendar` changes how days are grouped and labeled, not the value. See [Dates And Calendar Systems](../../i18n.md).
- Retest custom cell templates and overflow cells carefully.
- Use the lower-level `DayPicker`, `MonthPicker`, and `YearPicker` only when the full `Calendar` composition is not needed.
- Reach for `DayPicker`, `MonthPicker`, or `YearPicker` only when building custom calendar-family behavior, not as a first choice for normal date picking flows.
