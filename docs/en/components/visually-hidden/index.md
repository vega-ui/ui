# VisuallyHidden

## Doc Profile

`primitive`

## Summary

`VisuallyHidden` keeps content available to assistive technology while removing it from visual layout. It supports a native wrapper or `asChild` composition through `Slot`.

## Imports

```tsx
import { VisuallyHidden, type VisuallyHiddenProps } from '@vega-ui/react';
```

## Exported Types

- `VisuallyHiddenProps`

## Basic Usage

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

## Variants

- Rendering: default wrapper or `asChild`
- Usage: hidden label, description, or status text

## Related Docs

- [Anatomy](./anatomy.md)
- [Examples](./examples.md)
- [API](./api.md)
- [Styling](./styling.md)
- [Accessibility](./accessibility.md)
- [Comparison](./comparison.md)
- [Patterns](./patterns.md)
- [Troubleshooting](./troubleshooting.md)

## Edge Cases

- Hidden text should stay synchronized with the visible UI state.
- `VisuallyHidden` is not a substitute for visible labels by default.
- `asChild` keeps the hidden styling but changes the underlying element.

## Common Mistakes

- Leaving hidden text stale when the visible state changes.
- Using hidden text to paper over poor visible labeling.
- Hiding content that should actually be visible for most users.
