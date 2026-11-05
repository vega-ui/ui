# Badge Anatomy

## Overview

`Badge` is a single compact surface for short status, category, or count text.

## Required Parts

### `Badge`

Required. Owns size, appearance, and semantic variant styling.

## Optional Parts

`Badge` does not expose public child parts.

## Composition Order

1. `Badge`
2. short label or count content

## Valid Composition Patterns

<!-- example: badge/basic-usage.tsx -->
```tsx
import { Badge, Text } from '@vega-ui/react';

const releases = [
  { version: 'v2.8.0', date: 'Nov 3, 2026', status: 'Live', variant: 'success' },
  { version: 'v2.8.0-rc.2', date: 'Oct 30, 2026', status: 'Rolling back', variant: 'warning' },
  { version: 'v2.7.4', date: 'Oct 21, 2026', status: 'Failed', variant: 'error' },
  { version: 'v2.7.3', date: 'Oct 14, 2026', status: 'Archived', variant: 'info' },
];

export default function BasicUsage() {
  return (
    <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'grid', gap: 'var(--spacing-6)', width: '100%', maxWidth: 420 }}>
      {releases.map((release) => (
        <li key={release.version} style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-4)' }}>
          <Text size={3} fontWeight={500}>{release.version}</Text>
          <Badge size='sm' variant={release.variant}>{release.status}</Badge>
          <Text size={2} style={{ marginInlineStart: 'auto', color: 'var(--label-secondary)', fontVariantNumeric: 'tabular-nums', whiteSpace: 'nowrap' }}>{release.date}</Text>
        </li>
      ))}
    </ul>
  );
}
```
<!-- /example -->

## Invalid Composition Patterns

### Long explanatory copy inside a badge

Badges are for short metadata, not full messages.

### Badge used as the only status communication

If the status matters, surrounding copy or structure should still explain it.
