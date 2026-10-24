# DateTimeField API

## Root Props


<!-- AUTO-GENERATED:ROOT_API:start -->
| Prop | Type | Default | Required | Notes |
| --- | --- | --- | --- | --- |
| `dateFormat` | `string` | `—` | Yes | Date format pattern used for input masking and parsing. |
| `timeFormat` | `'HH:mm' \\| 'HH:mm:ss'` | `'HH:mm'` | No | Time format pattern used for time input masking and parsing, in the notation of `dateFormat` (Unicode date patterns). |
| `timeStep` | `number` | `1` | No | Step of ArrowUp / ArrowDown on the minutes or seconds under the caret, wrapping around the segment's range. |
| `separator` | `string` | `', '` | No | Character used to separate segments (date and time) in the input. |
| `dateSeparator` | `string` | `'.'` | No | Character used to separate date segments in the input. |
| `min` | `string` | `—` | No | Minimum allowed date–time as a `YYYY-MM-DDTHH:mm[:ss]` string. |
| `max` | `string` | `—` | No | Maximum allowed date–time as a `YYYY-MM-DDTHH:mm[:ss]` string. |
| `disabledDates` | `CalendarDatesDisabled` | `—` | No | Rules for disabling specific dates in the calendar. |
| `disabled` | `boolean` | `—` | No | Disables the field. |
| `calendar` | `CalendarSystem` | `gregorianCalendar` | No | Calendar system the date is typed and picked in. |
| `locale` | `string` | `—` | No | BCP 47 locale of the calendar popup (month and day names, first day of the week), e.g. |
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
- The timestamp follows the input text: it is parsed from `defaultValue`, on every `input` event, and after a form reset. While the text is empty or incomplete there is no date and the calendar shows no selection.
- When `min` or `max` change, typed text is clamped again like typing does, firing `input`.
- Timezone normalization still belongs to the consumer.
