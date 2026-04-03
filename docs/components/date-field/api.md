# DateField API

## Root Props


<!-- AUTO-GENERATED:ROOT_API:start -->
| Prop | Type | Default | Required | Notes |
| --- | --- | --- | --- | --- |
| `format` | `string` | `—` | Yes | Date format pattern used for input masking and parsing. |
| `separator` | `string` | `—` | Yes | Character used to separate date segments in the input. |
| `min` | `Date` | `—` | No | Minimum allowed date. |
| `max` | `Date` | `—` | No | Maximum allowed date. |
| `disabledDates` | `CalendarDatesDisabled` | `—` | No | Rules for disabling specific dates in the calendar. |
| `disabled` | `boolean` | `—` | No | Disables the field. |
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
- Parsing and formatting are driven by `format` and `separator`.
- `min`, `max`, and `disabledDates` should match product validation, not just visual affordances.
- Native form semantics come from the underlying text input, not from a separate hidden select-like part.
