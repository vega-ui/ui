# Calendar API

## Root API

`Calendar` is the root state container for the calendar system.


<!-- AUTO-GENERATED:ROOT_API:start -->
| Prop | Type | Default | Required | Notes |
| --- | --- | --- | --- | --- |
| `max` | `string` | `—` | No | Latest selectable date as a `YYYY-MM-DD` string. |
| `min` | `string` | `—` | No | Earliest selectable date as a `YYYY-MM-DD` string. |
| `selection` | `S` | `'single' as S` | No | Selection mode. |
| `picker` | `CalendarPicker` | `—` | No | Controls which picker view is currently active. |
| `value` | `CalendarValue<S>` | `—` | No | Controlled selection value, shaped by the `selection` mode. |
| `defaultValue` | `CalendarValue<S>` | `—` | No | Uncontrolled initial selection value, shaped by the `selection` mode. |
| `defaultPicker` | `CalendarPicker` | `'day'` | No | Uncontrolled initial picker view. |
| `disabled` | `boolean` | `—` | No | Disables the whole calendar: no date can be selected and navigation is off. |
| `disabledDates` | `CalendarDatesDisabled` | `—` | No | Dates that cannot be selected, as `YYYY-MM-DD` strings: - a single date - an array of dates - a predicate `(date: string) => boolean` |
| `onChangeValue` | `(value: CalendarValue<S>) => void` | `—` | No | Fires when the user changes the selection. |
| `onChangePicker` | `(picker: CalendarPicker) => void` | `—` | No | Fires when the active picker view changes. |
| `month` | `string` | `—` | No | Controlled visible month, given as a `YYYY-MM-DD` string of any day in that month. |
| `defaultMonth` | `string` | `—` | No | Initial visible month for uncontrolled usage, given as a `YYYY-MM-DD` string of any day in that month. |
| `onChangeMonth` | `(month: string) => void` | `—` | No | Fires with the first day of the visible month as a `YYYY-MM-DD` string when the visible month changes (e.g., via scrolling or the month and year pickers). |
<!-- AUTO-GENERATED:ROOT_API:end -->

## Child Parts API

The public child parts are grouped into four families:

- header and navigation parts
- picker-mode switching buttons
- day picker parts
- month picker parts
- year picker parts

Important exported parts include:

- `CalendarHeader`, `CalendarContent`
- `CalendarPrevButton`, `CalendarNextButton`
- `CalendarPickerButtonGroup`, `CalendarMonthPickerButton`, `CalendarYearPickerButton`
- `CalendarWeekLabels`, `CalendarWeekLabel`
- `CalendarDayPicker*`, `CalendarMonthPicker*`, `CalendarYearPicker*`

The child parts should be treated as one coordinated system, not as isolated widgets.

## Hooks

## `useCalendarContext`

Advanced hook for custom picker layouts and rendering.

## Types

| Type | Definition | Notes |
| --- | --- | --- |
| `CalendarProps` | Root prop type | Main integration surface. |
| `CalendarPicker` | active picker union | Day, month, or year picker mode. |
| `CalendarSelection` | selection union | `single`, `multiple`, or `range`. |
| `CalendarValue` | selection value by mode | `YYYY-MM-DD` string, `[start, end]` tuple, or array of strings. |
| `CalendarDatesDisabled` | disabled-date contract | `YYYY-MM-DD` string, array of strings, or a `(date: string) => boolean` predicate. |

## State Model

- Visible date and selection state live in the root.
- Selection mode changes the expected value shape.
- Picker families coordinate around the same root state.
- The active picker mode determines whether day, month, or year interactions are currently driving visible date changes.

## Integration Notes

- Keep application date serialization outside the root API. Pass `Date` objects to the component layer.
- Retest custom day items and excluded cells carefully.
- Use lower-level picker components only when the full `Calendar` composition is not needed.
- Reach for `DayPicker`, `MonthPicker`, `YearPicker`, or `CalendarBase` only when building custom calendar-family behavior, not as a first choice for normal date picking flows.
