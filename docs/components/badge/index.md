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

```tsx
<Badge variant='warning' appearance='surface'>Beta</Badge>
```

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
