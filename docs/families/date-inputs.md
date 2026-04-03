# Date Inputs

Use this page when the product stores dates, ranges, or timestamps and the main choice is between field-led entry and calendar-led picking.

## Quick Decision Rules

- Use [DateField](../components/date-field/) for one date in a form-like field.
- Use [DateRangeField](../components/date-range-field/) when one control owns start and end dates.
- Use [DateTimeField](../components/date-time-field/) when one stored value is a timestamp.
- Use [TimeField](../components/time-field/) for time-only values.
- Use [Calendar](../components/calendar/) when the experience should be visibly calendar-first.

## By Data Shape

- Single date: [DateField](../components/date-field/)
- Start and end date pair: [DateRangeField](../components/date-range-field/)
- Single timestamp: [DateTimeField](../components/date-time-field/)
- Time only: [TimeField](../components/time-field/)
- Visual date browsing and picking: [Calendar](../components/calendar/)

## Common Misclassifications

- Do not split one timestamp into separate date and time fields unless the workflow truly treats them independently.
- Do not use [Calendar](../components/calendar/) when the UI really needs a compact field in a form row.
- Do not use [DateField](../components/date-field/) for a connected range concept.
- Do not use [TimeField](../components/time-field/) when the stored value is actually date-time.

## Start Here

- Filters and settings forms: [DateField](../components/date-field/), [DateRangeField](../components/date-range-field/)
- Scheduling or booking flows: [DateTimeField](../components/date-time-field/), [DateRangeField](../components/date-range-field/)
- Always-visible visual picking: [Calendar](../components/calendar/)
