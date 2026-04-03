# VisuallyHidden Anatomy

## Overview

`VisuallyHidden` is a single-part primitive that applies the standard visually-hidden CSS pattern to its content.

## Required Parts

### `VisuallyHidden`

Required. Owns the hidden-but-accessible rendering behavior.

## Optional Parts

There are no exported child parts.

## Composition Order

1. `VisuallyHidden`
2. hidden content

## Valid Composition Patterns

```tsx
<IconButton aria-label=''>
  <Icon />
  <VisuallyHidden>Search</VisuallyHidden>
</IconButton>
```

## Invalid Composition Patterns

### Hidden text used instead of visible label by default

The UI becomes harder to use for sighted users.

### Hidden content left unsynchronized with the visible state

Assistive technology users receive stale information.
