# TimeField Comparison

## Quick Decision Rule

Use `TimeField` when users enter a time without picking a date. Use `DateTimeField` when both date and time belong to one value.

## `TimeField` vs `TextField`

Use `TimeField` when:

- masked time entry with format and bounds matters

Use `TextField` when:

- the value is free-form text even if it contains digits or separators

## `TimeField` vs `DateTimeField`

Use `TimeField` when:

- the stored value is time-only

Use `DateTimeField` when:

- the time is inseparable from a date

## Choose This Component When

- the user should enter only a time
- mask-driven input is useful
- the business value is not a full timestamp

## Do Not Choose This Component When

- the value is a full date-time
- the text is not actually a time
