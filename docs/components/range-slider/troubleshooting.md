# RangeSlider Troubleshooting

## One Bound Is Missing From Form Submission

### Symptom

Only one value appears in `FormData`, or the two bounds collapse into one field.

### Likely Cause

One `RangeSliderHiddenInput` is missing or both thumbs share the same field setup incorrectly.

### How To Verify

- inspect the two hidden inputs
- submit the form and inspect `FormData`

### Fix

Render one hidden input per thumb and give each bound a clear field name.

## Thumbs Feel Like They Fight Each Other

### Symptom

Dragging one thumb near the other becomes confusing or abruptly stops.

### Likely Cause

`minRange` or `preventSkip` behavior conflicts with product expectations.

### How To Verify

- test dragging both thumbs across the same interval
- compare the result with the intended minimum-gap policy

### Fix

Tune `minRange` and `preventSkip` based on the actual range-selection rules.

## Users Cannot Tell Which End They Are Adjusting

### Symptom

The interval moves, but users lose track of which value is the lower or upper bound.

### Likely Cause

Visible numeric feedback is missing.

### How To Verify

- test the interaction without developer knowledge of the current values

### Fix

Add visible min/max labels or readouts near the slider.
