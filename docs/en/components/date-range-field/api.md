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
| `rangeSeparator` | `string` | `' – '` | No | Separator used between the start and end dates in the range input. Defines how two dates are visually and logically separated when entering or displaying a date range. Examples: " – " → "01.01.2024 – 31.01.2024"; " - " → "01.01.2024 - 31.01.2024"; " to " → "01.01.2024 to 31.01.2024". If not provided, an en dash between non-breaking spaces (U+00A0) is used, so the range does not wrap at the separator. |
| `min` | `string` | — | No | Minimum allowed date as a `YYYY-MM-DD` string. Dates earlier than this value cannot be selected in the calendar and make a typed value invalid, like a native input. |
| `max` | `string` | — | No | Maximum allowed date as a `YYYY-MM-DD` string. Dates later than this value cannot be selected in the calendar and make a typed value invalid, like a native input. |
| `disabledDates` | `CalendarDatesDisabled` | — | No | Rules for disabling specific dates in the calendar. Can be used to block ranges, weekdays, or custom conditions. |
| `disabled` | `boolean` | — | No | Disables the field like a native `disabled` input: the input and the trigger are disabled, and the dates are not submitted. |
| `readOnly` | `boolean` | — | No | Makes the field read-only like a native `readonly` input: the input is `readonly`, the calendar still opens to show the range, and picking days does not change it. The dates are still submitted. |
| `today` | `string` | — | No | Today as a `YYYY-MM-DD` string, passed to `DateRangeFieldCalendar` and used to read a two-digit year (`yy`) of `format`: within 80 years before and 19 years after the year of today. Defaults to the date of the device, read after hydration and followed when the day or the time zone changes. |
| `calendar` | `CalendarSystem` | `gregorianCalendar` | No | Calendar system the dates are typed and picked in. The values stay `YYYY-MM-DD` days. Defaults to the Gregorian calendar. |
| `locale` | `string` | `"en-US"` | No | BCP 47 locale of the calendar popup (month and day names, first day of the week), e.g. `de-DE`. The typed format still comes from `format`. |
| `size` | `TextFieldSize` | — | No | Visual size of the text field. Affects padding, font size, and overall height. 'sm': Compact input; 'md': Default; 'lg': Spacious layout |
| `ref` | `Ref<HTMLDivElement>` | — | No | Ref forwarded to wrapper element Useful for programmatic control, focus, or integration. |

Also accepts all `<div>` attributes.
<!-- AUTO-GENERATED:ROOT_API:end -->

## Child Parts

- `DateRangeFieldInput`: typed start and end input surface.
- `DateRangeFieldTrigger`: optional calendar trigger button.
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
| `variant` | `CalendarVariant` | `"secondary"` | No | Visual variant of the buttons and cells of the calendar. |
| `size` | `CalendarSize` | `"xs"` | No | Size of the buttons, cells and weekday names of the calendar. |
| `compact` | `boolean` | — | No | Shrinks the calendar to the width of its content: the root gets `data-compact="true"`. |
| `max` | `string` | — | No | Latest selectable date as a `YYYY-MM-DD` string. Months and years beyond this date become unavailable. Day, Month, and Year pickers use this to disable or clamp navigation. |
| `min` | `string` | — | No | Earliest selectable date as a `YYYY-MM-DD` string. Months and years before this date become unavailable. All pickers respect this constraint when computing active ranges. |
| `selection` | `"range"` | `'single'` | No | Selection mode. Determines the structure of `value`, all dates are `YYYY-MM-DD` strings: 'single' — a string, `''` when nothing is selected; 'multiple' — an array of strings; 'range' — a `[start, end]` tuple with `start` not after `end`, `''` marks an unset bound |
| `view` | `CalendarView` | — | No | Controlled visible view: 'day' — the days of the visible month (`CalendarDays`); 'month' — the months of the visible year (`CalendarMonths`); 'year' — pages of years (`CalendarYears`) |
| `value` | `[start: string, end: string]` | — | No | Controlled selection value, shaped by the `selection` mode. Malformed or non-existent dates are treated as unselected. |
| `defaultValue` | `[start: string, end: string]` | — | No | Uncontrolled initial selection value, shaped by the `selection` mode. |
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
| `calendar` | `CalendarSystem` | — | No | Calendar system the calendar is shown in. Values stay `YYYY-MM-DD` days. Defaults to the Gregorian calendar. |
| `locale` | `string` | `"en-US"` | No | BCP 47 locale of month and day names and of the first day of the week, e.g. `de-DE`. Applies to all parts of the calendar and sets `lang` on the root. |

Also accepts all `<div>` attributes.
<!-- AUTO-GENERATED:PART_API:DateRangeFieldCalendar:end -->

### `DateRangeFieldTrigger`

<!-- AUTO-GENERATED:PART_API:DateRangeFieldTrigger:start -->
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
<!-- AUTO-GENERATED:PART_API:DateRangeFieldTrigger:end -->

## Types

- `DateRangeFieldProps`
- `DateRangeFieldInputProps`
- `DateRangeFieldTriggerProps`
- `DateRangeFieldCalendarProps`

## State Model

- The root owns a connected date pair, not two unrelated date values.
- A separator typed or pasted after a one-digit day or month completes it with a leading zero, as in a native date input: `1.2.2026 – 5.2.2026` becomes `01.02.2026 – 05.02.2026`.
- Partial entry is common during editing and should be handled explicitly.
- The root takes `value`, `defaultValue` and `onChangeValue` as a `[start, end]` tuple of `YYYY-MM-DD` days; `DateRangeFieldInput` shows it in `format` and still fires its own `onChange` and `onInput`. While the start date is empty or incomplete the range is `['', '']`; while only the end is incomplete the range has just its start. A form reset restores `defaultValue` unless the field is controlled.
- The browser does not count a text written by the field as an edit of the user, so the field reports the edit itself: when the user leaves `DateRangeFieldInput` after changing its text, the input fires a native `change` event and gets `data-user-edited`. A day picked in the calendar fires `change` at once and is not reported again on leaving. A value set through `value` does not mark the field, and a form reset removes the attribute.
- When `min` or `max` change, the text and the value stay as they are and only the validity changes, without `input` or `onChangeValue`.
- `rangeSeparator` affects visible composition and parsing expectations.
- Constraint props should stay aligned with actual form and reporting rules.
- `DateRangeFieldInput` submits the shown text under its `name`, like a native text input; to submit the `YYYY-MM-DD` start and end, keep them from `onChangeValue` and render hidden inputs of your own. A range without a complete start or end, an out-of-range or an unavailable date makes the input invalid through `setCustomValidity`, see [Accessibility](./accessibility.md#form-semantics).
- `readOnly` and `disabled` on the root are mirrored to the input like the native attributes: a read-only field still opens the calendar to show its value but picking does not change it; a disabled field is not submitted.
- A two-digit year (`yy` in the format) is read within 80 years before and 19 years after the year of `today`, like CLDR and ICU: with today in 2026, `45` is 2045 and `46` is 1946. Years outside this window are shown with two digits but cannot be typed back.
- `today` (default: the date of the device, read after hydration) is passed to the calendar, which opens on the value, otherwise on today clamped to `min` and `max`.
- `DateRangeFieldTrigger` runs your `onClick` first: `event.preventDefault()` in it keeps the popup closed, like on a native `popovertarget` button.
