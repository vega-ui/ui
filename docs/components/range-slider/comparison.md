# RangeSlider Comparison

## Quick Decision Rule

Use `RangeSlider` when users select a bounded interval by dragging two values. Use `Slider` for one scalar value and paired numeric fields when exact entry matters more than gesture control.

## `RangeSlider` vs `Slider`

- Use `RangeSlider` for intervals.
- Use `Slider` for a single value.

## `RangeSlider` vs paired `NumberField`s

- Use `RangeSlider` for quick visual interval adjustment.
- Use paired `NumberField`s for exact min/max entry.

## Choose This Component When

- users should adjust both low and high bounds directly
- a visual interval is meaningful

## Do Not Choose This Component When

- the interaction needs exact numeric entry first
- there is only one scalar value
