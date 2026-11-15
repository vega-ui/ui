# DateTimeField Troubleshooting

## Typed Timestamp Does Not Match Product Expectation

### Symptom

Users enter a date and time, but the resulting scheduled value is not what the feature expects.

### Likely Cause

The field configuration and product timezone or serialization rules are not aligned.

### How To Verify

- Compare visible input guidance with the saved payload.
- Inspect whether timezone conversion happens before or after submit.

### Fix

Keep timestamp formatting, timezone rules, and payload serialization explicit in the feature flow.

## Calendar Trigger Opens Nothing

### Symptom

The icon button renders, but the calendar never appears.

### Likely Cause

`DateTimeFieldTriggerIconButton` was rendered without `Popover` composition or without `DateTimeFieldCalendar` inside the overlay.

### How To Verify

- Check whether the trigger is wrapped in `PopoverTrigger`.
- Check whether `PopoverContent` contains `DateTimeFieldCalendar`.

### Fix

Compose the trigger and calendar through `Popover`.

## Time Step Feels Wrong

### Symptom

Users can enter times that do not match the intended schedule granularity.

### Likely Cause

`timeStep` does not reflect the real business constraint for the feature.

### How To Verify

- Compare allowed times with product requirements.
- Test representative values such as quarter-hour or half-hour slots.

### Fix

Configure `timeStep` to match the real scheduling rule and validate it consistently on submit.

## Calendar Closes After A Pick

### Symptom

The popup closes as soon as a day is picked, but the product wants it to stay open.

### Likely Cause

Picking closes the popup and returns the focus to the trigger, as the WAI-ARIA date picker dialog pattern describes.

### How To Verify

- Pick a day with a click or <kbd>Enter</kbd> and check whether the popup hides.

### Fix

Control `open` on the `Popover` and set it back to `true` in `onChangeValue` of `DateTimeFieldCalendar`. It runs after the field closes the popup, in the same update, so the popup never hides.

## Two-Digit Year Reads The Wrong Century

### Symptom

With a format such as `MM/dd/yy`, a typed year lands in an unexpected century.

### Likely Cause

A two-digit year is read within 80 years before and 19 years after the year of `today`, like CLDR and ICU. A wrong device date or `today` moves the window.

### How To Verify

- Check `today` on the root, or the date of the device when it is not set.

### Fix

Pass `today` explicitly, or use a four-digit year (`yyyy`) when dates far in the past or future are expected.
