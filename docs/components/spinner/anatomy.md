# Spinner Anatomy

## Overview

`Spinner` is a single-part primitive. The root owns animation, size mapping, and variant color.

## Required Parts

### `Spinner`

Required. Renders the animated loading indicator.

## Optional Parts

There are no exported child parts.

## Composition Order

1. `Spinner`

## Valid Composition Patterns

```tsx
<div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
  <Spinner size={2} />
  <Text size={2}>Syncing member permissions</Text>
</div>
```

## Invalid Composition Patterns

### Spinner used without surrounding context

Users may not know what is loading.

### Spinner used as permanent decoration

The component should communicate a temporary pending state.
