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

```tsx
<Separator />
```

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
