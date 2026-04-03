# IconButton Anatomy

## Overview

`IconButton` is a single icon-only action surface built on `ButtonBase`. Its anatomy is one interactive root plus icon content with no visible text label.

## Required Parts

### `IconButton`

Required. Owns size and button-base visual props such as variant and appearance.

## Optional Parts

`IconButton` does not expose public child parts, but consumers usually compose it with `Icon`.

## Composition Order

1. `IconButton`
2. icon content

## Valid Composition Patterns

```tsx
<IconButton aria-label='Close'>
  <Icon><X /></Icon>
</IconButton>
```

## Invalid Composition Patterns

### Icon-only button without accessible label

The action becomes unclear for assistive technology and often for sighted users too.

### Long text content inside `IconButton`

If the action needs visible words, use `Button` instead.
