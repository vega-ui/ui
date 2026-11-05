# DateTimeField API

## Root Props


<!-- AUTO-GENERATED:ROOT_API:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `value` | `string` | — | No | Controlled date and time as a `YYYY-MM-DDTHH:mm` string (with `:ss` when the format has seconds), `''` while the field has no complete value. |
| `defaultValue` | `string` | `''` | No | Initial date and time for uncontrolled usage, like `value`. Defaults to `''`, an empty field. |
| `onChangeValue` | `(value: string) => void` | — | No | Called with the date and time when they change, `''` when the text is emptied or incomplete. |
| `dateFormat` | `string` | — | Yes | Date format pattern used for input masking and parsing. Defines the order of date segments. Examples: "dd.MM.yyyy"; "MM/dd/yyyy"; "yyyy-MM-dd" |
| `timeFormat` | `'HH:mm' \| 'HH:mm:ss'` | `'HH:mm'` | No | Time format pattern used for time input masking and parsing, in the notation of `dateFormat` (Unicode date patterns). Defines which time segments are available in the input. Examples: "HH:mm" — hours and minutes. "HH:mm:ss" — hours, minutes, and seconds. |
| `timeStep` | `number` | `1` | No | Step of ArrowUp / ArrowDown on the minutes or seconds under the caret, wrapping around the segment's range. Like a native `datetime-local` input with `step`, the hours always move by one. `0` turns arrow stepping off. Typed values are not snapped to the step. |
| `separator` | `string` | `', '` | No | Character used to separate segments (date and time) in the input. Examples: ","; "-" |
| `dateSeparator` | `string` | `'.'` | No | Character used to separate date segments in the input. Examples: ","; "-" |
| `min` | `string` | — | No | Minimum allowed date–time as a `YYYY-MM-DDTHH:mm[:ss]` string. Dates earlier than this value cannot be selected and will be clamped or rejected during input parsing. |
| `max` | `string` | — | No | Maximum allowed date–time as a `YYYY-MM-DDTHH:mm[:ss]` string. Dates later than this value cannot be selected and will be clamped or rejected during input parsing. |
| `disabledDates` | `CalendarDatesDisabled` | — | No | Rules for disabling specific dates in the calendar. Can be used to block ranges, weekdays, or custom conditions. |
| `disabled` | `boolean` | — | No | Disables the field. Prevents user input and interaction and applies the disabled visual state. |
| `calendar` | `CalendarSystem` | `gregorianCalendar` | No | Calendar system the date is typed and picked in. The value stays a `YYYY-MM-DDTHH:mm[:ss]` string. Defaults to the Gregorian calendar. |
| `locale` | `string` | — | No | BCP 47 locale of the calendar popup (month and day names, first day of the week), e.g. `de-DE`. The typed format still comes from `format`. Defaults to the locale of the runtime, like `Intl`. |
| `size` | `TextFieldSize` | — | No | Visual size of the text field. Affects padding, font size, and overall height. 'sm': Compact input; 'md': Default; 'lg': Spacious layout |
| `ref` | `Ref<HTMLDivElement>` | — | No | Ref forwarded to wrapper element Useful for programmatic control, focus, or integration. |
| `error` | `boolean` | — | No | Shows the input in an error state. |

Also accepts all `<div>` attributes.
<!-- AUTO-GENERATED:ROOT_API:end -->

## Child Parts

- `DateTimeFieldInput`: typed timestamp entry surface.
- `DateTimeFieldTriggerIconButton`: optional calendar trigger button.
- `DateTimeFieldCalendar`: calendar content synchronized with the field value.

### `DateTimeFieldInput`

<!-- AUTO-GENERATED:PART_API:DateTimeFieldInput:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `ref` | `Ref<HTMLInputElement>` | — | No | Ref forwarded to the underlying native `<input>` element. |

Also accepts all `<input>` attributes.
<!-- AUTO-GENERATED:PART_API:DateTimeFieldInput:end -->

### `DateTimeFieldCalendar`

<!-- AUTO-GENERATED:PART_API:DateTimeFieldCalendar:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `max` | `string` | — | No | Latest selectable date as a `YYYY-MM-DD` string. Months and years beyond this date become unavailable. Day, Month, and Year pickers use this to disable or clamp navigation. |
| `min` | `string` | — | No | Earliest selectable date as a `YYYY-MM-DD` string. Months and years before this date become unavailable. All pickers respect this constraint when computing active ranges. |
| `selection` | `"single"` | — | No | Selection mode. Determines the structure of `value`, all dates are `YYYY-MM-DD` strings: 'single' — a string, `''` when nothing is selected; 'multiple' — an array of strings; 'range' — a `[start, end]` tuple with `start` not after `end`, `''` marks an unset bound. Default: `'single'` |
| `view` | `CalendarView` | — | No | Controlled visible view: 'day' — the days of the visible month (`CalendarDays`); 'month' — the months of the visible year (`CalendarMonths`); 'year' — pages of years (`CalendarYears`) |
| `value` | `string` | — | No | Controlled selection value, shaped by the `selection` mode. Malformed or non-existent dates are treated as unselected. |
| `defaultValue` | `string` | — | No | Uncontrolled initial selection value, shaped by the `selection` mode. |
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
<!-- AUTO-GENERATED:PART_API:DateTimeFieldCalendar:end -->

### `DateTimeFieldTriggerIconButton`

<!-- AUTO-GENERATED:PART_API:DateTimeFieldTriggerIconButton:start -->
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
<!-- AUTO-GENERATED:PART_API:DateTimeFieldTriggerIconButton:end -->

## Types

- `DateTimeFieldProps`
- `DateTimeFieldInputProps`
- `DateTimeFieldTriggerIconButtonProps`
- `DateTimeFieldCalendarProps`

## State Model

- The root owns one combined timestamp model.
- Date parsing and time parsing are configured separately through `dateFormat`, `dateSeparator`, `timeFormat`, and `timeStep`.
- Partial values are common during editing and should not be treated as valid final timestamps too early.
- The root takes `value`, `defaultValue` and `onChangeValue` as a `YYYY-MM-DDTHH:mm` timestamp (with `:ss` when the format has seconds), like a native `datetime-local` input; `DateTimeFieldInput` shows it in the format and still fires its own `onChange` and `onInput`. While the text is empty or incomplete the value is `''` and the calendar shows no selection. A form reset restores `defaultValue` unless the field is controlled.
- When `min` or `max` change, typed text is clamped again like typing does, firing `input`.
- Timezone normalization still belongs to the consumer.
