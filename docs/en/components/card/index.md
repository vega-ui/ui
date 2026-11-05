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

<!-- example: card/basic-usage.tsx -->
```tsx
import { Button, Card, Heading, Text } from '@vega-ui/react';

const features = ['Up to 25 members', '100 GB of storage', 'Priority email support', 'SAML single sign-on'];

export default function BasicUsage() {
  return (
    <Card aria-labelledby='plan-team-title' style={{ width: '100%', maxWidth: 320, gap: 'var(--spacing-6)' }}>
      <Heading id='plan-team-title' as='h3' size={4} fontWeight={600}>Team</Heading>
      <Text size={3}>
        <Text size={6} fontWeight={500}>$12</Text> per member / month
      </Text>
      <ul style={{ margin: 0, paddingInlineStart: 'var(--spacing-9)', display: 'grid', gap: 'var(--spacing-2)' }}>
        {features.map((feature) => (
          <li key={feature}><Text size={2} style={{ color: 'var(--label-secondary)' }}>{feature}</Text></li>
        ))}
      </ul>
      <Button fullWidth style={{ marginBlockStart: 'var(--spacing-6)' }}>Start 14-day trial</Button>
    </Card>
  );
}
```
<!-- /example -->

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
