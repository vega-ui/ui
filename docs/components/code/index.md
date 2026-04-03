# Code

## Doc Profile

`primitive`

## Summary

`Code` is the inline code primitive. It reuses the `Text` contract while rendering semantic `<code>` content with a subdued inline surface.

## Imports

```tsx
import { Code, type CodeProps } from '@vega-ui/react';
```

## Exported Types

- `CodeProps`

## Basic Usage

```tsx
<Code>pnpm docs:validate</Code>
```

## Variants

- Typography: inherits `Text` sizing
- Composition: semantic inline `<code>` element
- Presentation: inline-block code chip with subdued surface

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

- Long values may wrap because the component allows `word-wrap: break-word`.
- `Code` is optimized for inline snippets, not large fenced code blocks.
- It inherits `Text` props, so size changes also affect the chip surface proportions.

## Common Mistakes

- Using `Code` for multiline documentation blocks.
- Using code styling for normal labels or badges.
- Hard-coding colors instead of letting the theme tokens drive contrast.
