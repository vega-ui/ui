# Slider Troubleshooting

## The Slider Looks Fine But The Value Is Missing From Form Submission

### Symptom

The control works visually, but the form payload does not contain the slider value.

### Likely Cause

`SliderHiddenInput` is missing.

### How To Verify

- submit the form
- inspect `FormData`

### Fix

Render `SliderHiddenInput` inside `SliderThumb`.

## The Vertical Slider Is Hard To Use Or Invisible

### Symptom

The vertical slider renders poorly or has almost no usable track.

### Likely Cause

The root was switched to vertical orientation without an explicit height.

### How To Verify

- inspect the computed height of the slider container

### Fix

Provide a real height whenever `orientation='vertical'` is used.

## Users Cannot Reach The Exact Value Reliably

### Symptom

Dragging feels imprecise for the intended task.

### Likely Cause

The control is being used for an exact-entry scenario.

### How To Verify

- test with the real required precision, not just rough adjustments

### Fix

Switch to `NumberField` or pair the slider with a more precise companion input.
