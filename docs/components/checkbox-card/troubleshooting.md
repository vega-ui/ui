# CheckboxCard Troubleshooting

## Only The Tiny Control Feels Clickable

### Symptom

Users click the card body, but the option does not feel like a full-card control.

### Likely Cause

Custom composition or styling broke the labeled card surface and left only the small control looking interactive.

### How To Verify

- test pointer interaction on the entire card
- inspect whether the root still renders as the labeled click target

### Fix

Keep the root card-label composition intact and avoid pointer-event overrides that isolate the control.

## The Card Does Not Participate In Native Form Submission

### Symptom

The checked state changes visually, but the expected value is missing from `FormData`.

### Likely Cause

`CheckboxCardControlHiddenInput` is missing.

### How To Verify

- submit the form
- inspect `FormData`

### Fix

Render `CheckboxCardControlHiddenInput` inside the control region.

## Indeterminate State Never Appears

### Symptom

The UI should show a mixed state, but the card only looks checked or unchecked.

### Likely Cause

`indeterminate` was not passed, or the custom control rendering omitted the indeterminate icon path.

### How To Verify

- inspect the root props
- compare the custom control with the shipped stories

### Fix

Pass `indeterminate` and keep `CheckboxCardControlIndeterminateIcon` in the control composition when that state matters.
