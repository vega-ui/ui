# SliderBase Anatomy

## Overview

`SliderBase` is a compound slider foundation. The root owns the track variables, while exported parts render progress, thumb, and optional hidden input.

## Required Parts

- `SliderBase`: root track container
- `SliderBaseProgress`: visual fill between `min` and `value`
- `SliderBaseThumb`: positioned handle for the current value

## Optional Parts

- `SliderBaseHiddenInput`: hidden native input for form participation

## Composition Order

1. `SliderBase`
2. `SliderBaseProgress`
3. `SliderBaseThumb`
4. `SliderBaseHiddenInput` inside the thumb when form submission matters

## Valid Composition Patterns

- one progress plus one thumb for a single-value slider
- one-thumb shells that let progress and thumb inherit `value`, `min`, and `max` from the root
- vertical layout with matching `orientation` on root and parts
- hidden input when integrating with native forms

## Invalid Composition Patterns

- mixing horizontal root layout with vertical thumb or progress
- rendering multiple thumbs in one `SliderBase` instead of using `RangeSlider`
- assuming `SliderBase` alone wires pointer and keyboard value changes
