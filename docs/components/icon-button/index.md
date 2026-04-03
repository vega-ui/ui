# IconButton

## Doc Profile

`primitive`

## Summary

`IconButton` is the icon-only action variant built on the same button foundation as `Button`. It is the compact action layer when visible text would add noise rather than clarity.

## Imports

```tsx
import {
  IconButton,
  type IconButtonProps,
  type IconButtonSize,
} from '@vega-ui/react';
```

## Exported Types

- `IconButtonProps`
- `IconButtonSize`

## Basic Usage

```tsx
<IconButton aria-label='Close'>
  <Icon><X /></Icon>
</IconButton>
```

## Variants

- Sizes: `xs`, `sm`, `md`, `lg`, `xl`
- Variants and appearances inherited from the button foundation
- Composition: default button or `asChild`

## Related Docs

- [Examples](./examples.md)
- [API](./api.md)
- [Styling](./styling.md)
- [Accessibility](./accessibility.md)
- [Comparison](./comparison.md)
- [Patterns](./patterns.md)
- [Troubleshooting](./troubleshooting.md)

## Edge Cases

- Always provide an `aria-label` because visible text is usually absent.
- Keep icon glyph size visually balanced with the button size token.
- Use regular `Button` when visible text would improve clarity.
- If the icon meaning depends on surrounding context too heavily, a text button is usually the safer choice.

## Common Mistakes

- Omitting `aria-label`.
- Putting long text inside `IconButton`.
- Using icon-only actions where the meaning is not already recognizable.
