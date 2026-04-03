# Calendar API

## Root API

`Calendar` is the root state container for the calendar system.


<!-- AUTO-GENERATED:ROOT_API:start -->
| Prop | Type | Default | Required | Notes |
| --- | --- | --- | --- | --- |
| `to` | `Date` | `—` | No | Upper date boundary for navigation and selection. |
| `from` | `Date` | `—` | No | Lower date boundary for navigation and selection. |
| `selection` | `S` | `'single' as S` | No | Selection mode. |
| `picker` | `CalendarPicker` | `—` | No | Controls which picker view is currently active. |
| `value` | `CalendarValue<S>` | `—` | No | Controlled selection value. |
| `defaultValue` | `CalendarValue<S>` | `—` | No | Uncontrolled initial selection value. |
| `defaultPicker` | `CalendarPicker` | `'day'` | No | Uncontrolled initial picker view. |
| `disabled` | `CalendarDatesDisabled` | `—` | No | Disables specific dates. |
| `onChangeDate` | `(date: Date) => void` | `—` | No | Fires when the visible date changes (e.g., via scrolling or picker). |
| `onChange` | `(value: CalendarValue<S>) => void` | `—` | No | Fires when the selected value changes. |
| `onChangePicker` | `(picker: CalendarPicker) => void` | `—` | No | Fires when the active picker view changes. |
| `referenceDate` | `Date` | `—` | No | Reference date used as a logical anchor for indexed or virtualized pickers. |
| `date` | `Date` | `—` | No | Controlled visible date. |
| `defaultDate` | `Date` | `getCurrentDate()` | No | Initial visible date for uncontrolled usage. |
| `activeDay` | `number` | `—` | No | Controlled active (focused) day value. |
| `defaultActiveDay` | `number` | `—` | No | Initial active day for uncontrolled usage. |
| `onChangeActiveDay` | `(activeDay: number \\\| undefined) => void` | `—` | No | Fires when the active day changes due to keyboard or programmatic focus. |
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
| `CalendarDatesDisabled` | disabled-date contract | Supports richer disabled-date logic. |

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
