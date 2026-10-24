# DateRangeField API

## Root Props


<!-- AUTO-GENERATED:ROOT_API:start -->
| Prop | Type | Default | Required | Notes |
| --- | --- | --- | --- | --- |
| `format` | `string` | `—` | Yes | Date format pattern used for input masking and parsing. |
| `separator` | `string` | `—` | Yes | Character used to separate date segments in the input. |
| `rangeSeparator` | `string` | `' – '` | No | Separator used between the start and end dates in the range input, by default an en dash between non-breaking spaces (`'\u00A0–\u00A0'`). |
| `min` | `string` | `—` | No | Minimum allowed date as a `YYYY-MM-DD` string. |
| `max` | `string` | `—` | No | Maximum allowed date as a `YYYY-MM-DD` string. |
| `disabledDates` | `CalendarDatesDisabled` | `—` | No | Rules for disabling specific dates in the calendar. |
| `disabled` | `boolean` | `—` | No | Disables the field. |
| `calendar` | `CalendarSystem` | `gregorianCalendar` | No | Calendar system the dates are typed and picked in. |
| `locale` | `string` | `—` | No | BCP 47 locale of the calendar popup (month and day names, first day of the week), e.g. |
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
- The range follows the input text: it is parsed from `defaultValue`, on every `input` event, and after a form reset. While the start date is empty or incomplete the range is empty; while only the end is incomplete the range has just its start.
- When `min` or `max` change, both typed dates are clamped again like typing does, firing `input`.
- `rangeSeparator` affects visible composition and parsing expectations.
- Constraint props should stay aligned with actual form and reporting rules.
