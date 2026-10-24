# DateField API

## Root Props


<!-- AUTO-GENERATED:ROOT_API:start -->
| Prop | Type | Default | Required | Notes |
| --- | --- | --- | --- | --- |
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
- The date follows the input text, like the value of a native `<input type="date">`: it is parsed from `defaultValue`, on every `input` event, and after a form reset. While the text is empty or incomplete there is no date and the calendar shows no selection.
- When `min` or `max` change, typed text is clamped again like typing does, firing `input`.
- Parsing and formatting are driven by `format` and `separator`.
- `min`, `max`, and `disabledDates` should match product validation, not just visual affordances.
- Native form semantics come from the underlying text input, not from a separate hidden select-like part.
