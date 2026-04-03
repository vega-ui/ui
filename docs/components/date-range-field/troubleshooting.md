# DateRangeField Troubleshooting

## Only One Side Of The Range Is Saved

### Symptom

The product submits a start or end date, but the other side is missing or stale.

### Likely Cause

The surrounding form or state model treats the range as two unrelated values instead of one connected field.

### How To Verify

- Inspect the final payload or form state.
- Confirm whether both dates are derived from the same field interaction.

### Fix

Model the result as one connected range and validate incomplete state explicitly.

## Calendar Trigger Opens But No Range Picker Appears

### Symptom

The icon button is present, but clicking it never reveals the range calendar.

### Likely Cause

`DateRangeFieldTriggerIconButton` was rendered without `PopoverTrigger`, `PopoverContent`, or `DateRangeFieldCalendar`.

### How To Verify

- Check whether the trigger is inside `PopoverTrigger`.
- Check whether `PopoverContent` contains `DateRangeFieldCalendar`.

### Fix

Compose the trigger and calendar through `Popover`.

## Incomplete Range Is Treated As Valid

### Symptom

Users can submit only a start date or only an end date when the feature requires both.

### Likely Cause

Validation only checks the field shape superficially and does not enforce complete range semantics.

### How To Verify

- Submit the form with one side missing.
- Compare client validation with business requirements.

### Fix

Treat partial ranges as an explicit editing state and block submit until the range is complete.
