# Separator

## Doc Profile

`primitive`

## Summary

`Separator` is the visual division primitive for horizontal and vertical boundaries between adjacent UI regions.

## Imports

```tsx
import { Separator, type SeparatorProps } from '@vega-ui/react';
```

## Exported Types

- `SeparatorProps`

## Basic Usage

<!-- example: separator/basic-usage.tsx -->
```tsx
import { Heading, Separator, Text } from '@vega-ui/react';

export default function BasicUsage() {
  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-8)', width: '100%' }}>
      <div style={{ display: 'grid', gap: 'var(--spacing-2)' }}>
        <Heading as='h3' size={4}>Notifications</Heading>
        <Text size={2} style={{ color: 'var(--label-secondary)' }}>Email me when someone mentions me or assigns me a task.</Text>
      </div>
      <Separator />
      <div style={{ display: 'grid', gap: 'var(--spacing-2)' }}>
        <Heading as='h3' size={4}>Privacy</Heading>
        <Text size={2} style={{ color: 'var(--label-secondary)' }}>Only workspace members can see my profile and activity.</Text>
      </div>
    </div>
  );
}
```
<!-- /example -->

## Variants

- Orientation: `horizontal` or `vertical`
- Layout: full-width horizontal rule or full-height vertical divider

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

- Vertical separators need an explicit height from the parent layout.
- The component is visual; surrounding layout still determines spacing.
- Decorative separators should not replace real headings or fieldset grouping.

## Common Mistakes

- Rendering a vertical separator without a defined parent height.
- Using separators where semantic grouping is actually needed.
- Expecting `Separator` to provide layout spacing on its own.
