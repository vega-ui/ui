# ButtonBase

## Doc Profile

`primitive`

## Summary

`ButtonBase` is the low-level action primitive behind `Button` and `IconButton`. It owns the shared button styling contract, focus treatment, and `asChild` composition without adding higher-level product layout rules.

## Imports

```tsx
import {
  ButtonBase,
  type ButtonBaseAppearance,
  type ButtonBaseProps,
  type ButtonBaseVariant,
} from '@vega-ui/react/ButtonBase';
```

## Exported Types

- `ButtonBaseProps`
- `ButtonBaseVariant = 'primary' | 'secondary' | string`
- `ButtonBaseAppearance = 'fill' | 'outline' | 'ghost' | 'transparent' | string`

## Basic Usage

<!-- example: button-base/basic-usage.tsx -->
```tsx
import { ButtonBase } from '@vega-ui/react';
import { useState } from 'react';

export default function BasicUsage() {
  const [likes, setLikes] = useState(24);

  return (
    <ButtonBase
      type='button'
      variant='secondary'
      appearance='ghost'
      onClick={() => setLikes(likes + 1)}
      style={{
        padding: 'var(--spacing-3) var(--spacing-8)',
        borderRadius: 'var(--radius-3)',
        fontSize: 'var(--font-size-2)',
        fontVariantNumeric: 'tabular-nums',
      }}
    >
      Like · {likes}
    </ButtonBase>
  );
}
```
<!-- /example -->

## Variants

- Variant: `primary`, `secondary`
- Appearance: `fill`, `outline`, `ghost`, `transparent`
- Rendering mode: native button or `asChild`

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

- `type` should be set explicitly for form actions.
- If `asChild` is used, the child must accept the forwarded props and keep correct semantics.
- Icon-only content still needs an accessible name.

## Common Mistakes

- Using `ButtonBase` when `Button` or `IconButton` would be clearer.
- Forgetting that link semantics remain link semantics under `asChild`.
- Treating unsupported variant strings as if CSS already implements them.
