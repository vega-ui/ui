# DateRangeField API

## Root Props


<!-- AUTO-GENERATED:ROOT_API:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `value` | `[start: string, end: string]` | — | No | Controlled range as a `[start, end]` tuple of `YYYY-MM-DD` strings. A bound is `''` while it is not complete; without a start the range is empty. |
| `defaultValue` | `[start: string, end: string]` | `['', '']` | No | Initial range for uncontrolled usage, like `value`. Defaults to `['', '']`, an empty field. |
| `onChangeValue` | `(value: [start: string, end: string]) => void` | — | No | Called with the range when it changes. |
| `format` | `string` | — | Yes | Date format pattern used for input masking and parsing. Defines the order of date segments. Examples: "dd.MM.yyyy"; "MM/dd/yyyy"; "yyyy-MM-dd" |
| `separator` | `string` | — | Yes | Character used to separate date segments in the input. Examples: "."; "/"; "-" |
| `rangeSeparator` | `string` | `' – '` | No | Separator used between the start and end dates in the range input, by default an en dash between non-breaking spaces (`'\u00A0–\u00A0'`). Defines how two dates are visually and logically separated when entering or displaying a date range. Examples: " – " → "01.01.2024 – 31.01.2024"; " - " → "01.01.2024 - 31.01.2024"; " to " → "01.01.2024 to 31.01.2024". If not provided, an en dash between non-breaking spaces (U+00A0) is used, so the range does not wrap at the separator. |
| `min` | `string` | — | No | Minimum allowed date as a `YYYY-MM-DD` string. Dates earlier than this value cannot be selected and will be clamped or rejected during input parsing. |
| `max` | `string` | — | No | Maximum allowed date as a `YYYY-MM-DD` string. Dates later than this value cannot be selected and will be clamped or rejected during input parsing. |
| `disabledDates` | `CalendarDatesDisabled` | — | No | Rules for disabling specific dates in the calendar. Can be used to block ranges, weekdays, or custom conditions. |
| `disabled` | `boolean` | — | No | Disables the field. Prevents user input and interaction, and applies the disabled visual state. |
| `calendar` | `CalendarSystem` | `gregorianCalendar` | No | Calendar system the dates are typed and picked in. The values stay `YYYY-MM-DD` days. Defaults to the Gregorian calendar. |
| `locale` | `string` | — | No | BCP 47 locale of the calendar popup (month and day names, first day of the week), e.g. `de-DE`. The typed format still comes from `format`. Defaults to the locale of the runtime, like `Intl`. |
| `size` | `TextFieldSize` | — | No | Visual size of the text field. Affects padding, font size, and overall height. 'sm': Compact input; 'md': Default; 'lg': Spacious layout |
| `ref` | `Ref<HTMLDivElement>` | — | No | Ref forwarded to wrapper element Useful for programmatic control, focus, or integration. |
| `error` | `boolean` | — | No | Shows the input in an error state. |

Also accepts all `<div>` attributes.
<!-- AUTO-GENERATED:ROOT_API:end -->

## Child Parts

- `DateRangeFieldInput`: typed start and end input surface.
- `DateRangeFieldTriggerIconButton`: optional calendar trigger button.
- `DateRangeFieldCalendar`: calendar content synchronized with the selected range.

### `DateRangeFieldInput`

<!-- AUTO-GENERATED:PART_API:DateRangeFieldInput:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `ref` | `Ref<HTMLInputElement>` | — | No | Ref forwarded to the underlying native `<input>` element. |

Also accepts all `<input>` attributes.
<!-- AUTO-GENERATED:PART_API:DateRangeFieldInput:end -->

### `DateRangeFieldCalendar`

<!-- AUTO-GENERATED:PART_API:DateRangeFieldCalendar:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `max` | `string` | — | No | Latest selectable date as a `YYYY-MM-DD` string. Months and years beyond this date become unavailable. Day, Month, and Year pickers use this to disable or clamp navigation. |
| `min` | `string` | — | No | Earliest selectable date as a `YYYY-MM-DD` string. Months and years before this date become unavailable. All pickers respect this constraint when computing active ranges. |
| `selection` | `"range"` | — | No | Selection mode. Determines the structure of `value`, all dates are `YYYY-MM-DD` strings: 'single' — a string, `''` when nothing is selected; 'multiple' — an array of strings; 'range' — a `[start, end]` tuple with `start` not after `end`, `''` marks an unset bound. Default: `'single'` |
| `view` | `CalendarView` | — | No | Controlled visible view: 'day' — the days of the visible month (`CalendarDays`); 'month' — the months of the visible year (`CalendarMonths`); 'year' — pages of years (`CalendarYears`) |
| `value` | `[start: string, end: string]` | — | No | Controlled selection value, shaped by the `selection` mode. Malformed or non-existent dates are treated as unselected. |
| `defaultValue` | `[start: string, end: string]` | — | No | Uncontrolled initial selection value, shaped by the `selection` mode. |
| `defaultView` | `CalendarView` | — | No | Initial view for uncontrolled usage. Default: `'day'` |
| `disabled` | `boolean` | — | No | Disables the whole calendar: no date can be selected and navigation is off. |
| `disabledDates` | `CalendarDatesDisabled` | — | No | Dates that cannot be selected, as `YYYY-MM-DD` strings: a single date; an array of dates; a predicate `(date: string) => boolean` |
| `onChangeValue` | `(value: CalendarValue<S>) => void` | — | No | Fires when the user changes the selection. The value is shaped by the `selection` mode. |
| `onChangeView` | `(view: CalendarView) => void` | — | No | Fires when the visible view changes. |
| `month` | `string` | — | No | Controlled visible month, given as a `YYYY-MM-DD` string of any day in that month. |
| `defaultMonth` | `string` | — | No | Initial visible month for uncontrolled usage, given as a `YYYY-MM-DD` string of any day in that month. Default: the month of the selected date, otherwise the current month |
| `onChangeMonth` | `(month: string) => void` | — | No | Fires with the first day of the visible month as a `YYYY-MM-DD` string when the visible month changes (e.g., via scrolling or the month and year pickers). This event represents view navigation, not selection. |
| `calendar` | `CalendarSystem` | — | No | Calendar system the calendar is shown in. Values stay `YYYY-MM-DD` days. Defaults to the Gregorian calendar. |
| `locale` | `string` | — | No | BCP 47 locale of month and day names and of the first day of the week, e.g. `de-DE`. Applies to all parts of the calendar and sets `lang` on the root. Defaults to the locale of the runtime, like `Intl`. |
| `size` | `CalendarBaseSize` | — | No | Global size scale for the calendar. Affects nested controls such as navigation buttons, picker triggers, and week labels via `CalendarBaseContext`. |
| `variant` | `CalendarBaseVariant` | — | No | Visual variant for the calendar. Propagated through `CalendarBaseContext` and used by nested controls (buttons, labels, etc.) to keep styling consistent. |
| `compact` | `boolean` | — | No | Density flag for more compact layouts. When `true`, the root element receives `data-compact="true"`, allowing styles to reduce paddings, gaps, and control heights for a denser calendar presentation. When `false` or `undefined`, the calendar uses the default spacing. |

Also accepts all `<div>` attributes.
<!-- AUTO-GENERATED:PART_API:DateRangeFieldCalendar:end -->

### `DateRangeFieldTriggerIconButton`

<!-- AUTO-GENERATED:PART_API:DateRangeFieldTriggerIconButton:start -->
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
<!-- AUTO-GENERATED:PART_API:DateRangeFieldTriggerIconButton:end -->

## Types

- `DateRangeFieldProps`
- `DateRangeFieldInputProps`
- `DateRangeFieldTriggerIconButtonProps`
- `DateRangeFieldCalendarProps`

## State Model

- The root owns a connected date pair, not two unrelated date values.
- Partial entry is common during editing and should be handled explicitly.
- The root takes `value`, `defaultValue` and `onChangeValue` as a `[start, end]` tuple of `YYYY-MM-DD` days; `DateRangeFieldInput` shows it in `format` and still fires its own `onChange` and `onInput`. While the start date is empty or incomplete the range is `['', '']`; while only the end is incomplete the range has just its start. A form reset restores `defaultValue` unless the field is controlled.
- When `min` or `max` change, both typed dates are clamped again like typing does, firing `input`.
- `rangeSeparator` affects visible composition and parsing expectations.
- Constraint props should stay aligned with actual form and reporting rules.
