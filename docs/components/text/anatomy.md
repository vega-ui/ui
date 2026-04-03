# Text Anatomy

## Overview

`Text` is a single-part typography primitive. The root owns the full public contract for body copy sizing, weight, and semantic composition.

## Required Parts

### `Text`

Required. Renders the text node with VegaUI body typography styles.

## Optional Parts

There are no exported child parts.

## Composition Order

1. `Text`
2. content or `asChild` target

## Valid Composition Patterns

```tsx
<Text size={3}>Invoice sent successfully.</Text>
```

## Invalid Composition Patterns

### `Text` used as a heading replacement

This may look correct visually but loses heading semantics.

### Arbitrary raw CSS used instead of the size scale

This creates drift from the shared typography system.
