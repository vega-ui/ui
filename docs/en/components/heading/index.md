# Heading

## Doc Profile

`primitive`

## Summary

`Heading` is the semantic heading primitive. It separates heading level from visual size so document structure and typography scale can be managed independently.

## Imports

```tsx
import { Heading, type HeadingAs, type HeadingProps, type HeadingSize } from '@vega-ui/react';
```

## Exported Types

- `HeadingProps`
- `HeadingAs = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'`
- `HeadingSize = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | number`

## Basic Usage

<!-- example: heading/basic-usage.tsx -->
```tsx
import { Heading, Text } from '@vega-ui/react';

export default function BasicUsage() {
  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-4)', width: '100%' }}>
      <Heading as='h2'>Workspace settings</Heading>
      <Text size={3} style={{ color: 'var(--label-secondary)' }}>Manage the name, members and billing of the Acme workspace.</Text>
    </div>
  );
}
```
<!-- /example -->

## Variants

- Level: `h1` through `h6`
- Size: visual scale `1` through `11`
- Weight: `400`, `500`, `600`, `700`, `900`

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

- Visual size and semantic level are independent.
- Large heading sizes still inherit heading line-height tokens rather than body line-height tokens.
- `as` should follow document outline, not visual taste alone.

## Common Mistakes

- Picking heading level by size instead of document structure.
- Using `Heading` for form labels.
- Mixing arbitrary custom font sizes with the heading scale.
