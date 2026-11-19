# Tooltip

## Doc Profile

`advanced interactive`

## Summary

`Tooltip` is a [compound component](../../glossary.md#compound-component) for lightweight floating descriptions attached to a trigger. It should only carry supplemental, non-essential information.

## Imports

```tsx
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  type TooltipProps,
} from '@vega-ui/react';
```

## Exported Types

- `TooltipProps`
- `TooltipTriggerProps`
- `TooltipContentProps`

## Minimal Composition

<!-- example: tooltip/minimal-composition.tsx -->
```tsx
import {
  Button,
  Text,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@vega-ui/react';

export default function MinimalComposition() {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button>Publish</Button>
      </TooltipTrigger>
      <TooltipContent>
        <Text size={2}>Anyone with the link can view the page</Text>
      </TooltipContent>
    </Tooltip>
  );
}
```
<!-- /example -->

## Your Own Component

The minimal composition above shows the parts in place. In an app, compose them once in a file of your own and import that component everywhere. `MyTooltip` passes its props to `Tooltip`, makes its child the trigger, and shows `content` in the tooltip. See [Component recipes](../../recipes.md).

<!-- example: tooltip/recipe.tsx -->
```tsx
import type { ReactNode } from 'react';
import {
  Button,
  Icon,
  Text,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  type TooltipProps,
} from '@vega-ui/react';
import { ArchiveIcon, ReplyIcon, Trash2Icon } from '@vega-ui/icons';

interface MyTooltipProps extends TooltipProps {
  content: ReactNode
}

export function MyTooltip({ content, children, ...props }: MyTooltipProps) {
  return (
    <Tooltip {...props}>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent>
        <Text size={2}>{content}</Text>
      </TooltipContent>
    </Tooltip>
  );
}

export default function Recipe() {
  return (
    <div style={{ display: 'flex', gap: 'var(--spacing-2)' }}>
      <MyTooltip content='Reply to Maria Chen'>
        <Button square aria-label='Reply' variant='secondary' appearance='ghost'><Icon><ReplyIcon /></Icon></Button>
      </MyTooltip>
      <MyTooltip content='Move to Archive · E'>
        <Button square aria-label='Archive' variant='secondary' appearance='ghost'><Icon><ArchiveIcon /></Icon></Button>
      </MyTooltip>
      <MyTooltip content='Move to Trash · #'>
        <Button square aria-label='Delete' variant='secondary' appearance='ghost'><Icon><Trash2Icon /></Icon></Button>
      </MyTooltip>
    </div>
  );
}
```
<!-- /example -->

## Required Parts

- `Tooltip`: root state and context provider
- `TooltipTrigger`: trigger surface
- `TooltipContent`: visible tooltip content

## Optional Parts

There are no optional parts.

## Composition Order

1. `Tooltip`
2. `TooltipTrigger`
3. `TooltipContent`

## Variants

- Simple label tooltip versus richer descriptive tooltip
- [Controlled](../../glossary.md#controlled) open state when consumer logic needs it

## Related Docs

- [Anatomy](./anatomy.md)
- [Examples](./examples.md)
- [Patterns](./patterns.md)
- [API](./api.md)
- [Styling](./styling.md)
- [Accessibility](./accessibility.md)
- [Comparison](./comparison.md)
- [Troubleshooting](./troubleshooting.md)

## Edge Cases

- Tooltips should not contain critical actions or required instructions.
- The tooltip shows on mouse or pen hover and on keyboard focus, never on a tap, so touch users need the same information elsewhere.
- Trigger content should remain understandable even without the tooltip.

## Common Mistakes

- Hiding mandatory instructions in a tooltip.
- Using tooltip content as the only accessible name of a control.
- Putting interactive flows into tooltip content.
