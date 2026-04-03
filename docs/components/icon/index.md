# Icon

## Doc Profile

`primitive`

## Summary

`Icon` is the shared SVG wrapper for VegaUI icons and custom SVG content. It normalizes size through tokens and renders through `Slot`, which lets the child SVG receive the merged props directly.

## Imports

```tsx
import { Icon, type IconProps, type IconSize } from '@vega-ui/react';
```

## Exported Types

- `IconProps`
- `IconSize`

## Basic Usage

```tsx
<Icon size='sm'>
  <ChevronDown />
</Icon>
```

## Variants

- Size: `4xs`, `3xs`, `2xs`, `xs`, `sm`, `md`, `lg`, `xl`
- Rendering: token size or explicit `width` / `height`
- Content: VegaUI icon, custom SVG, or third-party SVG component

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

- Explicit `width` or `height` bypasses the token size data attribute.
- `Icon` sets `aria-hidden='true'` by default, which is correct for decorative usage but not for standalone semantic graphics.
- `stroke='currentColor'` means icon color comes from surrounding text or control color.

## Common Mistakes

- Using icon color alone to express state.
- Letting icon size drift away from the surrounding control density.
- Assuming every icon should be announced to assistive technology.
