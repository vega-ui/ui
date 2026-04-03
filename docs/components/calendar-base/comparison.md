# CalendarBase Comparison

## Quick Decision Rule

Use `CalendarBase` when extending the calendar subsystem itself. Use `Calendar`, `DayPicker`, `MonthPicker`, or `YearPicker` when you need actual date-selection behavior.

## `CalendarBase` vs `Calendar`

- Use `CalendarBase` for shared shell composition.
- Use `Calendar` for the consumer-facing calendar subsystem.

## `CalendarBase` vs picker components

- Use `CalendarBase` for shared chrome.
- Use `DayPicker`, `MonthPicker`, or `YearPicker` for actual grid selection behavior.

## `CalendarBase` vs generic layout containers

- Use `CalendarBase` when the shell must stay aligned with the calendar-family size and variant context.
- Use `Card`, `Sheet`, or another layout primitive when the content is not actually calendar-family UI.

## Choose This Component When

- you are extending calendar-family internals
- you need consistent calendar header and label chrome

## Do Not Choose This Component When

- you need a ready-made picker experience
- you only need a generic panel or card layout
