# DateTimeField Comparison

## Quick Decision Rule

Use `DateTimeField` when the final stored value must include both a date and a time.

## `DateTimeField` vs `DateField`

Use `DateTimeField` when time matters to the saved value.

Use `DateField` when only the calendar date matters.

Main trade-off: `DateTimeField` captures a complete timestamp, but it is heavier to type, validate, and explain.

## `DateTimeField` vs `DateRangeField`

Use `DateTimeField` when the feature centers on one scheduled moment.

Use `DateRangeField` when the feature centers on a span.

Main trade-off: timestamps represent one instant; ranges represent duration.

## `DateTimeField` vs `Calendar`

Use `DateTimeField` when typed entry and form semantics are important.

Use `Calendar` when the UI is primarily a visual date picker.

Main trade-off: `DateTimeField` is stronger for form workflows, while `Calendar` is stronger for visible date browsing.

## `DateTimeField` vs `TimeField` + `DateField`

Use `DateTimeField` when one timestamp should be validated, labeled, and serialized as one value.

Use separate fields when date and time are intentionally edited or submitted independently.

Main trade-off: `DateTimeField` reduces coordination drift, while split fields can fit specialized workflows better.

## Choose This Component When

- The product stores one timestamp.
- Users may type both date and time.
- Validation and copy must stay in one field row.

## Do Not Choose This Component When

- The feature needs only a date.
- The feature needs a start and end span.
- The UI should present a fully visible calendar-first picker instead of a field-led control.
