# SliderBase Troubleshooting

## The Thumb And Progress Do Not Match The Root Direction

### Symptom

The slider shell renders, but the thumb or progress appears in the wrong position or direction.

### Likely Cause

The root and child parts were given different `orientation` values.

### How To Verify

- inspect the props passed to `SliderBase`, `SliderBaseProgress`, and `SliderBaseThumb`
- confirm they all use the same orientation

### Fix

Keep one shared orientation source and pass it to all parts.

## The Slider Looks Right But Is Not A Complete Interactive Control

### Symptom

The shell renders correctly, but keyboard behavior, semantics, or announcements are missing.

### Likely Cause

`SliderBase` was used as if it were a finished user-facing slider.

### How To Verify

- test the control with keyboard only
- inspect the resulting accessibility tree
- compare against `Slider` behavior

### Fix

Use `Slider` or add the missing interaction and semantic layers around `SliderBase`.

## The Value Is Missing From Form Submission

### Symptom

The UI shows the current value, but native form submission omits it.

### Likely Cause

No `SliderBaseHiddenInput` was rendered.

### How To Verify

- submit the surrounding form
- inspect `FormData`

### Fix

Render `SliderBaseHiddenInput` with the intended `name` and `value`.
