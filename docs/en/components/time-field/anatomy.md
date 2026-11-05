# TimeField Anatomy

## Overview

`TimeField` is a small compound wrapper around `TextField`. The root provides format and bound context, and `TimeFieldInput` applies the masking behavior.

## Required Parts

### `TimeField`

Required. Owns `format`, `min`, `max`, and `step` context.

### `TimeFieldInput`

Required. Renders the actual masked input.

## Optional Parts

There are no extra public parts beyond the input.

## Composition Order

1. `TimeField`
2. `TimeFieldInput`

## Valid Composition Patterns

<!-- example: time-field/minimal-composition.tsx -->
```tsx
import { TimeField, TimeFieldInput } from '@vega-ui/react';

export default function MinimalComposition() {
  return (
    <TimeField>
      <TimeFieldInput aria-label='Reminder time' placeholder='hh:mm' />
    </TimeField>
  );
}
```
<!-- /example -->

## Invalid Composition Patterns

### Bounds that do not match the format

Example: `format='HH:mm'` with a seconds-based `max`.

### Wrapper without `TimeFieldInput`

The root renders, but there is no masked control.
