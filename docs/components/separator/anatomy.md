# Separator Anatomy

## Overview

`Separator` is a single-part primitive that renders a thin dividing line with `role='separator'`.

## Required Parts

### `Separator`

Required. Owns both the semantic divider role and the visual line.

## Optional Parts

There are no exported child parts.

## Composition Order

1. `Separator`

## Valid Composition Patterns

```tsx
<div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
  <Text>Profile</Text>
  <Separator orientation='vertical' />
  <Text>Billing</Text>
</div>
```

## Invalid Composition Patterns

### Vertical separator without parent height

The divider collapses because it has no height context.

### Separator used as the only section structure

This creates visual division without semantic labeling.
