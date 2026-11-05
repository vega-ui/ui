# Badge

## Doc Profile

`primitive`

## Summary

`Badge` is a compact status or categorization label for counts, states, and small metadata. It is for small inline status cues, not for full feedback messaging.

## Imports

```tsx
import {
  Badge,
  type BadgeProps,
  type BadgeSize,
  type BadgeAppearance,
  type BadgeVariant,
} from '@vega-ui/react';
```

## Exported Types

- `BadgeProps`
- `BadgeSize`
- `BadgeAppearance`
- `BadgeVariant`

## Basic Usage

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

## Variants

- Sizes: `xs`, `sm`, `md`, `lg`, `xl`
- Appearances: `fill`, `outline`, `ghost`, `surface`
- Variants: `success`, `error`, `warning`, `info`

## Related Docs

- [Examples](./examples.md)
- [API](./api.md)
- [Styling](./styling.md)
- [Accessibility](./accessibility.md)
- [Comparison](./comparison.md)
- [Patterns](./patterns.md)
- [Troubleshooting](./troubleshooting.md)

## Edge Cases

- Keep badge copy short; it is not a pill-shaped paragraph container.
- Use semantic variants consistently across the product.
- Custom string tokens only work if the corresponding styles exist.
- If the user needs explanation rather than a terse label, `Alert` or surrounding body copy is usually the better pattern.

## Common Mistakes

- Putting long sentences into a badge.
- Using a badge as the only indicator of status.
- Inventing custom variant names without adding matching styles.
