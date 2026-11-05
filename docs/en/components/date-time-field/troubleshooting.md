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
