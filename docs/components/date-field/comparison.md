# DateField Comparison

## Quick Decision Rule

Use `DateField` when the value is a single calendar date and users should be able to type it, pick it, or both.

## `DateField` vs `DateRangeField`

Use `DateField` when one date is stored.

Use `DateRangeField` when the start and end dates must stay connected as one control.

Main trade-off: `DateField` is simpler to label and validate, while `DateRangeField` reduces coordination mistakes across two related values.

## `DateField` vs `DateTimeField`

Use `DateField` when time is irrelevant to the stored value.

Use `DateTimeField` when date and time together define the final value.

Main trade-off: `DateField` is easier to input and review, while `DateTimeField` captures a complete timestamp.

## `DateField` vs `Calendar`

Use `DateField` when users need typed entry and a form-like field.

Use `Calendar` when the interface is primarily visual date picking without field-style text entry.

Main trade-off: `DateField` fits forms better, while `Calendar` is stronger for always-visible date selection.

## Choose This Component When

- The value is a single date.
- Users may type the date directly.
- The control belongs in a form row or settings panel.
- The calendar is optional support, not the whole interaction model.

## Do Not Choose This Component When

- The feature needs a start and end date pair.
- The stored value must include time.
- The UI should present a fully visible calendar instead of an input-led field.
