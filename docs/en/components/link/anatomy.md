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

<!-- example: link/basic-usage.tsx -->
```tsx
import { Link, Text } from '@vega-ui/react';

export default function BasicUsage() {
  return (
    <Text size={3} style={{ width: '100%' }}>
      Exports include every invoice from the selected period. Read how we calculate{' '}
      <Link href='/docs/billing/taxes'>VAT for EU customers</Link>{' '}
      before sharing the file with your accountant.
    </Text>
  );
}
```
<!-- /example -->

## Invalid Composition Patterns

### Link used for state mutation

If the interaction mutates state instead of navigating, use `Button`.

### Vague link copy

Inline text like "Click here" weakens scanability and accessibility.
