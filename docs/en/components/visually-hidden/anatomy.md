# VisuallyHidden Anatomy

## Overview

`VisuallyHidden` is a single-part primitive that applies the standard visually-hidden CSS pattern to its content.

## Required Parts

### `VisuallyHidden`

Required. Owns the hidden-but-accessible rendering behavior.

## Optional Parts

There are no exported child parts.

## Composition Order

1. `VisuallyHidden`
2. hidden content

## Valid Composition Patterns

<!-- example: visually-hidden/basic-usage.tsx -->
```tsx
import { Heading, Link, Text, VisuallyHidden } from '@vega-ui/react';

const plans = [
  { name: 'Starter', price: '$0', slug: 'starter' },
  { name: 'Team', price: '$12', slug: 'team' },
  { name: 'Enterprise', price: 'Custom', slug: 'enterprise' },
];

export default function BasicUsage() {
  return (
    <ul style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 'var(--spacing-4)', width: '100%', margin: 0, padding: 0, listStyle: 'none' }}>
      {plans.map((plan) => (
        <li
          key={plan.slug}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--spacing-2)',
            padding: 'var(--spacing-6)',
            border: '1px solid var(--separator-opaque)',
            borderRadius: 'var(--radius-4)',
            background: 'var(--surface-primary)',
          }}
        >
          <Heading as='h3' size={3} fontWeight={600}>{plan.name}</Heading>
          <Text size={3} style={{ color: 'var(--label-secondary)', fontVariantNumeric: 'tabular-nums' }}>{plan.price}</Text>
          <Link href={`/pricing/${plan.slug}`} style={{ marginBlockStart: 'var(--spacing-4)', fontSize: 'var(--font-size-2)' }}>
            Learn more
            <VisuallyHidden asChild>
              <span> about the {plan.name} plan</span>
            </VisuallyHidden>
          </Link>
        </li>
      ))}
    </ul>
  );
}
```
<!-- /example -->

## Invalid Composition Patterns

### Hidden text used instead of visible label by default

The UI becomes harder to use for sighted users.

### Hidden content left unsynchronized with the visible state

Assistive technology users receive stale information.
