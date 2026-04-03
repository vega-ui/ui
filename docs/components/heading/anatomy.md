# Heading Anatomy

## Overview

`Heading` is a single-part primitive. The root owns semantic heading level, visual size, and weight.

## Required Parts

### `Heading`

Required. Renders the heading element and applies VegaUI heading typography.

## Optional Parts

There are no exported child parts.

## Composition Order

1. `Heading`
2. heading content

## Valid Composition Patterns

```tsx
<Heading as='h3' size={5}>Billing contacts</Heading>
```

## Invalid Composition Patterns

### Heading level chosen only for visual size

This breaks document structure.

### Body text styled to mimic section structure

This hides navigational semantics from assistive technology.
