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

```tsx
<Button>
  <Icon />
  <VisuallyHidden>Close dialog</VisuallyHidden>
</Button>
```

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
