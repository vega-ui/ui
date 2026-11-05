# PinField Anatomy

## Overview

`PinField` coordinates one visually hidden input with several visible slots. The root owns active index, value, placeholder state, and optional selection-all behavior.

## Required Parts

### `PinField`

Required. Owns root state including active slot and current value.

### `PinFieldInput`

Required. Stores the real input value, handles selection and keyboard input, and keeps browser semantics intact.

### `PinFieldSlot`

Required. Renders one visible character position for a specific `index`.

## Optional Parts

### `PinFieldSeparator`

Optional visual divider between logical groups of slots.

## Composition Order

1. `PinField`
2. `PinFieldInput`
3. `PinFieldSlot` items in index order
4. optional separators between slot groups

## Valid Composition Patterns

<!-- example: pin-field/grouped-code-with-separator.tsx -->
```tsx
import { Label, PinField, PinFieldInput, PinFieldSeparator, PinFieldSlot } from '@vega-ui/react';
import { useId } from 'react';

export default function GroupedCodeWithSeparator() {
  const id = useId();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)', width: '100%', maxWidth: 320 }}>
      <Label htmlFor={id}>Code from your authenticator app</Label>
      <PinField maxLength={6}>
        <PinFieldInput id={id} name='totp' autoComplete='one-time-code' />
        <PinFieldSlot index={0} />
        <PinFieldSlot index={1} />
        <PinFieldSlot index={2} />
        <PinFieldSeparator />
        <PinFieldSlot index={3} />
        <PinFieldSlot index={4} />
        <PinFieldSlot index={5} />
      </PinField>
    </div>
  );
}
```
<!-- /example -->

`PinFieldInput` comes first and holds the whole code, its name and its label; slots only render one character each by `index`, and `PinFieldSeparator` between them is visual grouping only.

## Invalid Composition Patterns

### Slots without `PinFieldInput`

The UI renders, but the actual input model is missing.

### Slot indexes out of order

Caret and value mapping become confusing.

### Separators used as if they add input capacity

Separators are visual only and do not represent extra characters.
