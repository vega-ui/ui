# Spinner Anatomy

## Overview

`Spinner` is a single-part primitive. The root owns animation, size mapping, and variant color.

## Required Parts

### `Spinner`

Required. Renders the animated loading indicator.

## Optional Parts

There are no exported child parts.

## Composition Order

1. `Spinner`

## Valid Composition Patterns

<!-- example: spinner/inline-status-row.tsx -->
```tsx
import { Spinner, Text } from '@vega-ui/react';
import { useId } from 'react';

export default function InlineStatusRow() {
  const labelId = useId();

  return (
    <div style={{ display: 'flex', gap: 'var(--spacing-4)', alignItems: 'center' }}>
      <Spinner size={2} aria-labelledby={labelId} />
      <Text id={labelId} size={2}>Syncing 128 contacts from Google</Text>
    </div>
  );
}
```
<!-- /example -->

## Invalid Composition Patterns

### Spinner used without surrounding context

Users may not know what is loading.

### Spinner used as permanent decoration

The component should communicate a temporary pending state.
