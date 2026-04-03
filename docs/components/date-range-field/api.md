# DateRangeField API

## Root Props


<!-- AUTO-GENERATED:ROOT_API:start -->
| Prop | Type | Default | Required | Notes |
| --- | --- | --- | --- | --- |
| `format` | `string` | `—` | Yes | Date format pattern used for input masking and parsing. |
| `separator` | `string` | `—` | Yes | Character used to separate date segments in the input. |
| `rangeSeparator` | `string` | `' – '` | No | Separator used between the start and end dates in the range input. |
| `min` | `Date` | `—` | No | Minimum allowed date. |
| `max` | `Date` | `—` | No | Maximum allowed date. |
| `disabledDates` | `CalendarDatesDisabled` | `—` | No | Rules for disabling specific dates in the calendar. |
| `disabled` | `boolean` | `—` | No | Disables the field. |
<!-- AUTO-GENERATED:ROOT_API:end -->

## Child Parts

- `DateRangeFieldInput`: typed start and end input surface.
- `DateRangeFieldTriggerIconButton`: optional calendar trigger button.
- `DateRangeFieldCalendar`: calendar content synchronized with the selected range.

## Types

- `DateRangeFieldProps`
- `DateRangeFieldInputProps`
- `DateRangeFieldTriggerIconButtonProps`
- `DateRangeFieldCalendarProps`

## State Model

- The root owns a connected date pair, not two unrelated date values.
- Partial entry is common during editing and should be handled explicitly.
- `rangeSeparator` affects visible composition and parsing expectations.
- Constraint props should stay aligned with actual form and reporting rules.
