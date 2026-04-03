# Icon Anatomy

## Overview

`Icon` is a single-part primitive that passes sizing and SVG props into its child through `Slot`.

## Required Parts

### `Icon`

Required. Owns the shared size token contract and SVG prop forwarding.

## Optional Parts

There are no exported child parts.

## Composition Order

1. `Icon`
2. one SVG child

## Valid Composition Patterns

```tsx
<Icon size='sm'>
  <ChevronDown />
</Icon>
```

## Invalid Composition Patterns

### Non-SVG child content

The wrapper is meant to forward SVG-like props and sizing.

### Standalone meaningful icon with no accompanying label or context

The default `aria-hidden` behavior may make the meaning inaccessible.
