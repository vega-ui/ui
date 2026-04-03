# Badge Anatomy

## Overview

`Badge` is a single compact surface for short status, category, or count text.

## Required Parts

### `Badge`

Required. Owns size, appearance, and semantic variant styling.

## Optional Parts

`Badge` does not expose public child parts.

## Composition Order

1. `Badge`
2. short label or count content

## Valid Composition Patterns

```tsx
<Badge variant='success' appearance='fill'>Active</Badge>
```

## Invalid Composition Patterns

### Long explanatory copy inside a badge

Badges are for short metadata, not full messages.

### Badge used as the only status communication

If the status matters, surrounding copy or structure should still explain it.
