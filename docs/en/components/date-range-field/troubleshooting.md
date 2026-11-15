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

The form is submitted with `noValidate`, or the value is checked only from `onChangeValue`. The input itself is invalid while the start or the end is incomplete.

### How To Verify

- Type only the start and check `input.validity.customError` or `form.checkValidity()`.

### Fix

Let the browser block the submit, or check `form.checkValidity()` yourself, and show your message from `onInvalid`. Add `required` to `DateRangeFieldInput` when the range must not be empty.

## Calendar Closes After A Pick

### Symptom

The popup closes as soon as a day is picked, but the product wants it to stay open.

### Likely Cause

Picking closes the popup and returns the focus to the trigger, as the WAI-ARIA date picker dialog pattern describes.

### How To Verify

- Pick a day with a click or <kbd>Enter</kbd> and check whether the popup hides.

### Fix

Picking the end of a range closes the popup; moving an edge of a complete range with <kbd>Shift</kbd> + arrows or a drag keeps it open. Control `open` on the `Popover` and set it back to `true` in `onChangeValue` of `DateRangeFieldCalendar`. It runs after the field closes the popup, in the same update, so the popup never hides.

## Two-Digit Year Reads The Wrong Century

### Symptom

With a format such as `MM/dd/yy`, a typed year lands in an unexpected century.

### Likely Cause

A two-digit year is read within 80 years before and 19 years after the year of `today`, like CLDR and ICU. A wrong device date or `today` moves the window.

### How To Verify

- Check `today` on the root, or the date of the device when it is not set.

### Fix

Pass `today` explicitly, or use a four-digit year (`yyyy`) when dates far in the past or future are expected.
