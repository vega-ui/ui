# Calendar Comparison

## Quick Decision Rule

Choose `Calendar` when the user needs a full visual date-selection experience rather than a plain typed field.

## `Calendar` vs `DateField`

Use `Calendar` when:

- visual scanning of dates matters
- range and multi-date interactions should feel direct

Use `DateField` when:

- the flow should behave like a compact text field
- keyboard entry is primary

## `Calendar` vs `DateRangeField`

Use `Calendar` when:

- the range should be picked on a visible surface
- month-to-month scanning is part of the task

Use `DateRangeField` when:

- the flow should stay form-like and compact

## `Calendar` vs `DayPicker`

Use `Calendar` when:

- you need header controls and picker switching
- the product should not manage date-view coordination itself

Use `DayPicker` when:

- only day-grid behavior is needed

## `Calendar` vs `MonthPicker` / `YearPicker`

Use `Calendar` when:

- the user should move between picker modes in one coordinated control

Use the lower-level picker components when:

- the UX needs only one picker family

## Choose This Component When

- the date should be chosen visually
- range or multi-date selection matters
- the full picker family should stay coordinated

## Do Not Choose This Component When

- a plain field is enough
- only one picker family is needed
- the UI cannot afford the visual size of a calendar surface
