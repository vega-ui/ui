# Link Anatomy

## Overview

`Link` is a single navigational text surface. Its anatomy is one anchor-like root plus inline or standalone text content, optionally rendered through `asChild`.

## Required Parts

### `Link`

Required. Owns link styling and anchor semantics when rendered directly.

## Optional Parts

`Link` does not expose public child parts.

## Composition Order

1. `Link`
2. inline or standalone text content

## Valid Composition Patterns

```tsx
<Text size={2}>
  Read the <Link href='/docs'>documentation</Link> before publishing.
</Text>
```

## Invalid Composition Patterns

### Link used for state mutation

If the interaction mutates state instead of navigating, use `Button`.

### Vague link copy

Inline text like "Click here" weakens scanability and accessibility.
