# Card

## Doc Profile

`primitive`

## Summary

`Card` is a surface container for grouped content such as settings panels, dashboard blocks, and inline summaries. It is a layout and grouping surface, not a feedback or status primitive.

## Imports

```tsx
import {
  Card,
  type CardProps,
  type CardSize,
  type CardAppearance,
} from '@vega-ui/react';
```

## Exported Types

- `CardProps`
- `CardSize`
- `CardAppearance`

## Basic Usage

```tsx
<Card appearance='outline' size='md'>
  <Heading size={3}>Billing summary</Heading>
  <Text size={2}>Current plan, renewal date, and outstanding balance.</Text>
</Card>
```

## Variants

- Sizes: `sm`, `md`, `lg`
- Appearances: `outline`, `transparent`
- Composition: default `article` or `asChild`

## Related Docs

- [Examples](./examples.md)
- [API](./api.md)
- [Styling](./styling.md)
- [Accessibility](./accessibility.md)
- [Comparison](./comparison.md)
- [Patterns](./patterns.md)
- [Troubleshooting](./troubleshooting.md)

## Edge Cases

- `Card` is a layout surface, not a semantic replacement for headings or sections.
- Transparent cards work only when the parent surface already provides contrast.
- Internal spacing still belongs to child layout decisions.
- If the UI is trying to communicate status or urgency rather than grouping content, `Alert` or `Badge` is usually the clearer abstraction.

## Common Mistakes

- Expecting `Card` to provide all internal layout spacing automatically.
- Using transparent cards on visually noisy backgrounds.
- Encoding hierarchy only through card appearance.
