# RangeSlider Anatomy

## Overview

`RangeSlider` extends the shared slider-base model to coordinate two values instead of one. Each thumb has its own bound context, while the root owns the tuple and interval constraints.

## Required Parts

### `RangeSlider`

Required. Owns `[min, max]` value state, min range, pointer handling, and crossing behavior.

### `RangeSliderProgress`

Required in normal composition. Visualizes the interval between the two values.

### `RangeSliderThumb`

Required twice. One thumb controls the lower bound, the other controls the upper bound.

## Optional Parts

### `RangeSliderHiddenInput`

Optional but recommended. Typically rendered once inside each thumb for form participation.

## Composition Order

1. `RangeSlider`
2. `RangeSliderProgress`
3. `RangeSliderThumb index={0}`
4. `RangeSliderHiddenInput`
5. `RangeSliderThumb index={1}`
6. `RangeSliderHiddenInput`

## Valid Composition Patterns

```tsx
<RangeSlider defaultValue={[20, 80]} style={{ width: 400 }}>
  <RangeSliderProgress />
  <RangeSliderThumb index={0}>
    <RangeSliderHiddenInput name='min' />
  </RangeSliderThumb>
  <RangeSliderThumb index={1}>
    <RangeSliderHiddenInput name='max' />
  </RangeSliderThumb>
</RangeSlider>
```

## Invalid Composition Patterns

### Only one thumb rendered

The component stops representing a real interval.

### Both thumbs writing to one hidden input

Native form output no longer preserves the two-bound model.

### Range labels missing when precision matters

Users may not understand which bound is moving.
