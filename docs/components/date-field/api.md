# DateField API

## Root Props


<!-- AUTO-GENERATED:ROOT_API:start -->
| Prop | Type | Default | Required | Notes |
| --- | --- | --- | --- | --- |
| `value` | `string` | `—` | No | Controlled date as a `YYYY-MM-DD` string, `''` while the field has no complete date. |
| `defaultValue` | `string` | `''` | No | Initial date for uncontrolled usage as a `YYYY-MM-DD` string. |
| `onChangeValue` | `(value: string) => void` | `—` | No | Called with the `YYYY-MM-DD` date when it changes, `''` when the text is emptied or incomplete. |
| `format` | `string` | `—` | Yes | Date format pattern used for input masking and parsing. |
| `separator` | `string` | `—` | Yes | Character used to separate date segments in the input. |
| `min` | `string` | `—` | No | Minimum allowed date as a `YYYY-MM-DD` string. |
| `max` | `string` | `—` | No | Maximum allowed date as a `YYYY-MM-DD` string. |
| `disabledDates` | `CalendarDatesDisabled` | `—` | No | Rules for disabling specific dates in the calendar. |
| `disabled` | `boolean` | `—` | No | Disables the field. |
| `calendar` | `CalendarSystem` | `gregorianCalendar` | No | Calendar system the date is typed and picked in. |
| `locale` | `string` | `—` | No | BCP 47 locale of the calendar popup (month and day names, first day of the week), e.g. |
<!-- AUTO-GENERATED:ROOT_API:end -->

## Child Parts

- `DateFieldInput`: typed entry surface.
- `DateFieldTriggerIconButton`: optional calendar trigger button.
- `DateFieldCalendar`: calendar content that stays synchronized with the field value.

## Types

- `DateFieldProps`
- `DateFieldInputProps`
- `DateFieldTriggerIconButtonProps`
- `DateFieldCalendarProps`

## State Model

- The root owns the shared date value used by both typed input and calendar selection.
- The root takes `value`, `defaultValue` and `onChangeValue` as a `YYYY-MM-DD` day, like the value of a native `<input type="date">`; `DateFieldInput` shows it in `format` and still fires its own `onChange` and `onInput`. While the text is empty or incomplete the value is `''` and the calendar shows no selection. A form reset restores `defaultValue` unless the field is controlled.
- When `min` or `max` change, typed text is clamped again like typing does, firing `input`.
- Parsing and formatting are driven by `format` and `separator`.
- `min`, `max`, and `disabledDates` should match product validation, not just visual affordances.
- Native form semantics come from the underlying text input, not from a separate hidden select-like part.
