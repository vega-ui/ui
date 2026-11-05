# DayPicker Comparison

## Quick Decision Rule

Use `DayPicker` when you need low-level day-grid selection behavior. Use `Calendar` when you need a higher-level calendar experience.

## `DayPicker` vs `Calendar`

- Use `DayPicker` for low-level day-grid composition.
- Use `Calendar` for the higher-level calendar subsystem.

## `DayPicker` vs `MonthPicker` / `YearPicker`

- Use `DayPicker` for actual dates.
- Use `MonthPicker` or `YearPicker` for month/year selection surfaces.

## Choose This Component When

- you are extending calendar-family internals
- you need day-grid selection with custom composition

## Do Not Choose This Component When

- you want a higher-level calendar abstraction with less manual composition
