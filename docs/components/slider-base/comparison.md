# SliderBase Comparison

## Quick Decision Rule

Choose `SliderBase` only when building a custom slider system. Use `Slider` or `RangeSlider` for user-facing product controls.

## `SliderBase` vs `Slider`

Use `SliderBase` when a custom single-value slider composition still needs VegaUI track and thumb styling.

Use `Slider` when the product just needs a standard single-value control.

## `SliderBase` vs `RangeSlider`

Use `SliderBase` when there is one thumb and the interaction model is custom.

Use `RangeSlider` when the UI needs two-thumb range selection.

## Choose This Component When

- building a specialized slider wrapper
- sharing the VegaUI slider visual contract across a custom interaction model
- composing custom form participation or layout around the base shell

## Do Not Choose This Component When

- product code only needs a standard slider
- accessibility and interaction should already be solved by the component API
- multiple thumbs or range selection are required
