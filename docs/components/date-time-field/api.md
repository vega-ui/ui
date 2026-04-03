# DateTimeField API

## Root Props


<!-- AUTO-GENERATED:ROOT_API:start -->
| Prop | Type | Default | Required | Notes |
| --- | --- | --- | --- | --- |
| `dateFormat` | `string` | `—` | Yes | Date format pattern used for input masking and parsing. |
| `timeFormat` | `'HH:MM' \\| 'HH:MM:SS'` | `'HH:MM'` | No | Time format pattern used for time input masking and parsing. |
| `timeStep` | `number` | `1` | No | Step increment for time segments. |
| `separator` | `string` | `', '` | No | Character used to separate segments (date and time) in the input. |
| `dateSeparator` | `string` | `'.'` | No | Character used to separate date segments in the input. |
| `min` | `Date` | `—` | No | Minimum allowed date. |
| `max` | `Date` | `—` | No | Maximum allowed date. |
| `disabledDates` | `CalendarDatesDisabled` | `—` | No | Rules for disabling specific dates in the calendar. |
| `disabled` | `boolean` | `—` | No | Disables the field. |
<!-- AUTO-GENERATED:ROOT_API:end -->

## Child Parts

- `DateTimeFieldInput`: typed timestamp entry surface.
- `DateTimeFieldTriggerIconButton`: optional calendar trigger button.
- `DateTimeFieldCalendar`: calendar content synchronized with the field value.

## Types

- `DateTimeFieldProps`
- `DateTimeFieldInputProps`
- `DateTimeFieldTriggerIconButtonProps`
- `DateTimeFieldCalendarProps`

## State Model

- The root owns one combined timestamp model.
- Date parsing and time parsing are configured separately through `dateFormat`, `dateSeparator`, `timeFormat`, and `timeStep`.
- Partial values are common during editing and should not be treated as valid final timestamps too early.
- Timezone normalization still belongs to the consumer.
