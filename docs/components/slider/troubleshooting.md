# Slider Troubleshooting

## The Value Is Missing From Form Submission

### Symptom

The control works visually, but the form payload does not contain the slider value.

### Likely Cause

Neither the root nor the thumb has a `name`.

### How To Verify

- submit the form
- inspect `FormData`

### Fix

Set `name` on `Slider` or on each `SliderThumbInput`. Several thumbs with one name read with `FormData.getAll`.

## A Controlled Slider Does Not Move

### Symptom

The thumbs spring back after every drag or key press.

### Likely Cause

`value` is set but `onChangeValue` does not store the new values.

### How To Verify

- log the value `onChangeValue` receives
- check that the state passed to `value` changes

### Fix

Store the value from `onChangeValue` in the state passed to `value`, or use `defaultValue` when the slider does not need to be controlled.

## A Thumb Shows The Wrong Value

### Symptom

A thumb sits at another thumb's value, or a thumb is missing.

### Likely Cause

The thumbs have no `index`, two share one, or the number of thumbs differs from the number of values.

### How To Verify

- compare the `index` of every `SliderThumb` with the length of `value` or `defaultValue`

### Fix

Render one `SliderThumb` per value with `index={0}`, `index={1}`… in order.

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
