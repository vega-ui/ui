# Option Anatomy

## Overview

`Option` is a single-part primitive that renders a `div` with `role='option'`.

## Required Parts

### `Option`

Required. Owns the full option-row surface, sizing, and presentational states.

## Optional Parts

There are no exported child parts.

## Composition Order

1. `Option`
2. label and optional rich content

## Valid Composition Patterns

```tsx
<Option>
  <Icon size='sm'>
    <Star />
  </Icon>
  Pro
</Option>
```

## Invalid Composition Patterns

### Option used as a standalone selector without parent state

The row renders, but selection semantics are incomplete.

### Complex nested interactive controls inside one option

The option row should remain one coherent selection surface.
