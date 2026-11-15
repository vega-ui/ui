---
'@vega-ui/react': minor
---

`Grid`, `DayPicker`, `MonthPicker` and `YearPicker` take `readOnly`, like a native `readonly` input: the grid gets `aria-readonly="true"`, navigation still works, and selecting a cell neither changes the selection nor calls `onChangeValue`. `Calendar` passes its `readOnly` to the days.

`Calendar` keeps all of its behavior in its widget, without changes for the user: the month and year views stay mounted until their exit animations end, the previous and next buttons scroll `CalendarDaysScroller` and `CalendarYearsScroller` and are hidden past `min` and `max`.
