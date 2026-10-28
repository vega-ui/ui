# DateTimeField API

## Root Props


<!-- AUTO-GENERATED:ROOT_API:start -->
| Prop | Type | Default | Required | Notes |
| --- | --- | --- | --- | --- |
| `value` | `string` | `—` | No | Controlled date and time as a `YYYY-MM-DDTHH:mm` string (with `:ss` when the format has seconds), `''` while the field has no complete value. |
| `defaultValue` | `string` | `''` | No | Initial date and time for uncontrolled usage, like `value`. |
| `onChangeValue` | `(value: string) => void` | `—` | No | Called with the date and time when they change, `''` when the text is emptied or incomplete. |
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
- The root takes `value`, `defaultValue` and `onChangeValue` as a `YYYY-MM-DDTHH:mm` timestamp (with `:ss` when the format has seconds), like a native `datetime-local` input; `DateTimeFieldInput` shows it in the format and still fires its own `onChange` and `onInput`. While the text is empty or incomplete the value is `''` and the calendar shows no selection. A form reset restores `defaultValue` unless the field is controlled.
- When `min` or `max` change, typed text is clamped again like typing does, firing `input`.
- Timezone normalization still belongs to the consumer.
