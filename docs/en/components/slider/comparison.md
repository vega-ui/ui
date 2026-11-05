# Slider Comparison

## Quick Decision Rule

Use `Slider` when approximate value adjustment is more important than exact typing. Use `NumberField` when users need precise numeric entry.

## `Slider` vs `NumberField`

- Use `Slider` for quick relative adjustment.
- Use `NumberField` for exact numeric control.

## One thumb vs several

- One `SliderThumb` selects a single value.
- Two `SliderThumb`s select a range; `minStepsBetweenThumbs` keeps the ends apart.

## `Slider` vs `<input type="range">`

- Each thumb is the native input, so form and keyboard behavior is the same.
- `Slider` adds the design-system look, several thumbs over one track and the range fill.

## Choose This Component When

- one or a few bounded values are adjusted frequently
- dragging is a better fit than typing

## Do Not Choose This Component When

- exact entry matters most
