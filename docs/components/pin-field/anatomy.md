# PinField Anatomy

## Overview

`PinField` coordinates one hidden input with several visible slots. The root owns active index, value, placeholder state, and optional selection-all behavior.

## Required Parts

### `PinField`

Required. Owns root state including active slot and current value.

### `PinFieldHiddenInput`

Required. Stores the real input value, handles selection and keyboard input, and keeps browser semantics intact.

### `PinFieldSlot`

Required. Renders one visible character position for a specific `index`.

## Optional Parts

### `PinFieldSeparator`

Optional visual divider between logical groups of slots.

## Composition Order

1. `PinField`
2. `PinFieldHiddenInput`
3. `PinFieldSlot` items in index order
4. optional separators between slot groups

## Valid Composition Patterns

```tsx
<PinField maxLength={6}>
  <PinFieldHiddenInput />
  <PinFieldSlot index={0} />
  <PinFieldSlot index={1} />
  <PinFieldSlot index={2} />
  <PinFieldSeparator />
  <PinFieldSlot index={3} />
  <PinFieldSlot index={4} />
  <PinFieldSlot index={5} />
</PinField>
```

## Invalid Composition Patterns

### Slots without the hidden input

The UI renders, but the actual input model is missing.

### Slot indexes out of order

Caret and value mapping become confusing.

### Separators used as if they add input capacity

Separators are visual only and do not represent extra characters.
