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

The outer `Text` renders a `<p>` through `asChild`; inline `Text` elements inside it stay `<span>`s or render semantic elements such as `<time>`.

<!-- example: text/valid-composition-patterns.tsx -->
```tsx
import { Text } from '@vega-ui/react';

export default function ValidCompositionPatterns() {
  return (
    <Text asChild size={3}>
      <p>
        Order <Text fontWeight={700}>#4821</Text> ships on{' '}
        <Text asChild>
          <time dateTime='2026-03-14'>March 14</time>
        </Text>
        .
      </p>
    </Text>
  );
}
```
<!-- /example -->

## Invalid Composition Patterns

### `Text` used as a heading replacement

This may look correct visually but loses heading semantics.

### Arbitrary raw CSS used instead of the size scale

This creates drift from the shared typography system.
