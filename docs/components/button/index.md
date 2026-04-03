# Button

## Doc Profile

`primitive`

## Summary

`Button` is the primary action component built on top of `ButtonBase`, with size and full-width behavior for common product actions. It is the default choice when the UI needs a visible action surface with text.

## Imports

```tsx
import { Button, type ButtonProps, type ButtonSize } from '@vega-ui/react';
```

## Exported Types

- `ButtonProps`
- `ButtonSize`

## Basic Usage

```tsx
<Button>Save</Button>
```

## Variants

- Sizes: `xs`, `sm`, `md`, `lg`, `xl`
- Variants: `primary`, `secondary`
- Appearances: `fill`, `outline`, `ghost`, `transparent`
- Layout: regular width or `fullWidth`
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

- `type` defaults to `button`, which avoids accidental form submission.
- `asChild` swaps the underlying element while preserving VegaUI button styling.
- Custom size, variant, or appearance strings require matching CSS support.
- If the interaction is primarily navigation or the meaning is already icon-recognizable, `Link` or `IconButton` may communicate intent better.

## Common Mistakes

- Assuming submit behavior without setting `type='submit'`.
- Using button styling for pure navigation when a semantic link is better.
- Passing unsupported custom variant strings without matching CSS.
