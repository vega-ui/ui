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

<!-- example: button/basic-usage.tsx -->
```tsx
import { Button, Icon } from '@vega-ui/react';
import { PlusIcon } from '@vega-ui/icons';
import { useState } from 'react';

export default function BasicUsage() {
  const [count, setCount] = useState(0);

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-8)', width: '100%' }}>
      <Button type='button' onClick={() => setCount(count + 1)}>
        <Icon size='sm'><PlusIcon /></Icon>
        New project
      </Button>
      <span style={{ color: 'var(--label-secondary)', fontVariantNumeric: 'tabular-nums' }}>Projects: {count}</span>
    </div>
  );
}
```
<!-- /example -->

## Invalid Composition Patterns

### Navigation-only action implemented as a button

If the primary job is navigation, prefer `Link` or `Button asChild` with a real anchor.

### Polymorphic child that does not support the forwarded props

`asChild` only works well when the child can accept the expected button-like props.
