# CalendarBase Troubleshooting

## The Calendar Chrome Looks Right But The Picker Behavior Feels Incomplete

### Symptom

The header and labels render, but the calendar does not behave like a full picker.

### Likely Cause

`CalendarBase` was treated as a ready-made calendar instead of a shell.

### How To Verify

- inspect whether an actual picker component is embedded inside the shell

### Fix

Compose `CalendarBase` with `DayPicker`, `MonthPicker`, `YearPicker`, or a higher-level calendar component.

## Shared Controls Do Not Match The Embedded Picker

### Symptom

Header buttons or labels feel visually mismatched with the picker content below.

### Likely Cause

Size or variant context drifted between the shell and the embedded picker.

### How To Verify

- inspect the `size` and `variant` passed to the overall composition

### Fix

Treat the shell and embedded picker as one calendar-family surface and align their shared visual context.

## Compact Mode Clips Content

### Symptom

The shell becomes too narrow and the embedded content feels cramped.

### Likely Cause

`compact` was enabled for content that still needs more width.

### How To Verify

- compare the same composition with and without `compact`

### Fix

Disable `compact` or reduce the embedded picker density appropriately.
