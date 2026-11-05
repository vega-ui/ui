# DateRangeField Comparison

## Quick Decision Rule

Use `DateRangeField` when one control should own both the start and end date.

## `DateRangeField` vs `DateField`

Use `DateRangeField` when the pair of dates must stay connected and be validated together.

Use `DateField` when only one date is stored.

Main trade-off: `DateRangeField` reduces coordination mistakes, but it is heavier to label, validate, and review.

## `DateRangeField` vs `DateTimeField`

Use `DateRangeField` when the feature is about a date span rather than a specific timestamp.

Use `DateTimeField` when one final scheduled moment matters more than a span.

Main trade-off: ranges communicate duration, while date-time fields communicate a precise instant.

## `DateRangeField` vs `Calendar`

Use `DateRangeField` when the control belongs in a form and typing is important.

Use `Calendar` when a visible calendar-first range selection experience is the primary UI.

Main trade-off: `DateRangeField` is more form-friendly, while `Calendar` is stronger for exploration-heavy picking.

## Choose This Component When

- Start and end dates belong to one business concept.
- The feature needs one label, one error state, and one filter slot.
- Users may type or pick the range.
- The range should behave like one field rather than two loosely coupled inputs.

## Do Not Choose This Component When

- Only one date is needed.
- The stored value must include time.
- The UI needs a fully visible calendar-first range picker instead of a field-led control.
