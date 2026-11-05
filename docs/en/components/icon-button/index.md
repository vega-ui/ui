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

<!-- example: icon-button/basic-usage.tsx -->
```tsx
import { Icon, IconButton, Text } from '@vega-ui/react';
import { EllipsisIcon, PencilIcon, Share2Icon } from '@vega-ui/icons';
import { useState } from 'react';

export default function BasicUsage() {
  const [lastAction, setLastAction] = useState('');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-2)', width: '100%' }}>
      <header style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-2)' }}>
        <Text size={4} fontWeight={600} style={{ flex: 1, minWidth: 0 }}>Brand guidelines</Text>
        <IconButton type='button' size='sm' variant='secondary' appearance='transparent' aria-label='Rename document' onClick={() => setLastAction('Rename')}>
          <Icon><PencilIcon /></Icon>
        </IconButton>
        <IconButton type='button' size='sm' variant='secondary' appearance='transparent' aria-label='Share document' onClick={() => setLastAction('Share')}>
          <Icon><Share2Icon /></Icon>
        </IconButton>
        <IconButton type='button' size='sm' variant='secondary' appearance='transparent' aria-label='More actions' onClick={() => setLastAction('More')}>
          <Icon><EllipsisIcon /></Icon>
        </IconButton>
      </header>
      <Text size={2} style={{ color: 'var(--label-secondary)' }}>
        {lastAction === '' ? 'Updated 2 hours ago' : `Clicked: ${lastAction}`}
      </Text>
    </div>
  );
}
```
<!-- /example -->

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
