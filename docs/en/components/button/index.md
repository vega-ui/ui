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

<!-- example: button/basic-usage.tsx -->
```tsx
import { Button, Icon } from '@vega-ui/react';
import { PlusIcon } from '@vega-ui/icons';
import { useState } from 'react';

export default function BasicUsage() {
  const [count, setCount] = useState(0);

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-8)', width: '100%' }}>
      <Button type='button' onClick={() => setCount(count + 1)}>
        <Icon size='sm'><PlusIcon /></Icon>
        New project
      </Button>
      <span style={{ color: 'var(--label-secondary)', fontVariantNumeric: 'tabular-nums' }}>Projects: {count}</span>
    </div>
  );
}
```
<!-- /example -->

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

- `type` has no default: inside a form, `Button` submits it like a native `<button>`. With `asChild`, no `type` is passed to the child.
- `asChild` swaps the underlying element while preserving VegaUI button styling.
- Custom size, variant, or appearance strings require matching CSS support.
- If the interaction is primarily navigation or the meaning is already icon-recognizable, `Link` or `IconButton` may communicate intent better.

## Common Mistakes

- Assuming submit behavior without setting `type='submit'`.
- Using button styling for pure navigation when a semantic link is better.
- Passing unsupported custom variant strings without matching CSS.
