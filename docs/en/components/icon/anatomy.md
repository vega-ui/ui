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

<!-- example: icon/basic-usage.tsx -->
```tsx
import { Icon } from '@vega-ui/react';
import { CalendarIcon, MessageSquareIcon, PaperclipIcon } from '@vega-ui/icons';

export default function BasicUsage() {
  return (
    <ul style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--spacing-4) var(--spacing-10)', margin: 0, padding: 0, listStyle: 'none', color: 'var(--label-secondary)' }}>
      <li style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-3)' }}>
        <Icon size='sm'><CalendarIcon /></Icon>
        Due May 14
      </li>
      <li style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-3)' }}>
        <Icon size='sm'><MessageSquareIcon /></Icon>
        12 comments
      </li>
      <li style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-3)' }}>
        <Icon size='sm'><PaperclipIcon /></Icon>
        3 files
      </li>
    </ul>
  );
}
```
<!-- /example -->

## Invalid Composition Patterns

### Non-SVG child content

The wrapper is meant to forward SVG-like props and sizing.

### Standalone meaningful icon with no accompanying label or context

The default `aria-hidden` behavior may make the meaning inaccessible.
