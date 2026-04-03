# Slider Anatomy

## Overview

`Slider` wraps `SliderBase` and coordinates one scalar value. Child parts derive orientation, disabled state, and current value from root context.

## Required Parts

### `Slider`

Required. Owns the value model, pointer handling, keyboard handling, and range constraints.

### `SliderProgress`

Required in normal composition. Visualizes the filled portion from `min` to current value.

### `SliderThumb`

Required. The draggable and keyboard-focusable handle.

## Optional Parts

### `SliderHiddenInput`

Optional but recommended for native form participation and additional browser semantics.

## Composition Order

1. `Slider`
2. `SliderProgress`
3. `SliderThumb`
4. `SliderHiddenInput`

## Valid Composition Patterns

```tsx
<Slider defaultValue={30} style={{ width: 400 }}>
  <SliderProgress />
  <SliderThumb>
    <SliderHiddenInput name='volume' />
  </SliderThumb>
</Slider>
```

## Invalid Composition Patterns

### Root without thumb

The track renders, but users cannot interact with the control.

### Hidden input rendered outside the thumb/root composition

The value contract becomes harder to reason about and may no longer reflect the slider state correctly.

### Vertical slider without a height

The control technically renders, but interaction space collapses.
