# Spinner Styling

## Overview

`Spinner` is styled through one local color variable and size-specific width mappings.

## Public CSS Variables

| Variable | Used By | Purpose |
| --- | --- | --- |
| `--spinner-color` | root | effective spinner color |
| `--spinner-size` | root | rendered spinner diameter |
| `--spinner-width` | root | stroke thickness |
| `--color-primary-500` | primary variant | primary spinner color |
| `--color-secondary-500` | secondary variant | secondary spinner color |

## Part-Level Variables

### Root

The root uses a radial/conic gradient plus mask to render the animated ring.

## State And Variant Interaction

- `data-size` maps to size and stroke width tokens
- `data-variant='primary'` uses `--color-primary-500`
- `data-variant='secondary'` uses `--color-secondary-500`

## Examples

### Secondary loading indicator

<!-- example: spinner/secondary-loading-indicator.tsx -->
```tsx
import { Spinner, Text } from '@vega-ui/react';
import { useId } from 'react';

export default function SecondaryLoadingIndicator() {
  const labelId = useId();

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-4)' }}>
      <Spinner size={5} variant='secondary' aria-labelledby={labelId} />
      <Text id={labelId} size={5}>Generating preview</Text>
    </div>
  );
}
```
<!-- /example -->

## Do Not Override

- breaking contrast between spinner and background
- using oversized spinners in dense controls
