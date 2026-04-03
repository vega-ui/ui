# Slot Anatomy

## Overview

`Slot` is a single-part low-level utility. It clones its only child and merges the passed props into that element.

## Required Parts

### `Slot`

Required. Owns the merge-and-clone behavior.

## Optional Parts

There are no exported child parts.

## Composition Order

1. `Slot`
2. one valid React element child

## Valid Composition Patterns

```tsx
<Slot className='custom-link'>
  <a href='/docs'>Docs</a>
</Slot>
```

## Invalid Composition Patterns

### More than one child

`Children.only` will reject the composition.

### Non-element child

Plain text or invalid nodes cannot be cloned.
