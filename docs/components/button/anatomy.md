# Button Anatomy

## Overview

`Button` is a single action surface built on `ButtonBase`. Its anatomy is simple: one clickable root with optional text, icon, spinner, or polymorphic child content.

## Required Parts

### `Button`

Required. Owns size, width behavior, and button-base visual props such as `variant` and `appearance`.

## Optional Parts

`Button` does not expose public child parts, but consumers often compose it with `Spinner`, `Icon`, or `asChild` content.

## Composition Order

1. `Button`
2. optional icon, text, or spinner content

## Valid Composition Patterns

```tsx
<Button variant='secondary' appearance='outline'>
  Cancel
</Button>
```

## Invalid Composition Patterns

### Navigation-only action implemented as a button

If the primary job is navigation, prefer `Link` or `Button asChild` with a real anchor.

### Polymorphic child that does not support the forwarded props

`asChild` only works well when the child can accept the expected button-like props.
