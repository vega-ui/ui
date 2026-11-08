# Popover

## Doc Profile

`advanced interactive`

## Summary

`Popover` is a [compound component](../../glossary.md#compound-component) for non-modal floating content anchored to a trigger. `PopoverContent` is a native `popover="auto"` element opened from the trigger through `popovertarget`, so the browser shows it in the top layer, closes it on an outside click or `Escape`, and it is never clipped by `overflow` or covered by a modal dialog. It sits between tooltip-level hinting and full modal overlays.

## Imports

```tsx
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverAnchor,
  PopoverClose,
  type PopoverProps,
} from '@vega-ui/react';
```

## Exported Types

- `PopoverProps`
- `PopoverTriggerProps`
- `PopoverContentProps`
- `PopoverAnchorProps`
- `PopoverCloseProps`

## Minimal Composition

<!-- example: popover/minimal-composition.tsx -->
```tsx
import { useId } from 'react';
import {
  Button,
  Heading,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Text,
} from '@vega-ui/react';

export default function MinimalComposition() {
  const titleId = useId();

  return (
    <Popover role='dialog'>
      <PopoverTrigger asChild>
        <Button variant='secondary' appearance='ghost'>Storage · 82% used</Button>
      </PopoverTrigger>
      <PopoverContent aria-labelledby={titleId}>
        <div style={{ display: 'grid', gap: 'var(--spacing-2)', maxWidth: 280 }}>
          <Heading id={titleId} as='h3' size={5} fontWeight={600}>16.4 GB of 20 GB used</Heading>
          <Text size={2} style={{ color: 'var(--label-secondary)' }}>Videos take 11.2 GB. Old exports are removed after 90 days.</Text>
        </div>
      </PopoverContent>
    </Popover>
  );
}
```
<!-- /example -->

## Required Parts

- `Popover`: root state and context provider
- `PopoverTrigger`: trigger surface
- `PopoverContent`: floating content

## Optional Parts

- `PopoverAnchor`: positions the content against another element than the trigger
- `PopoverClose`: closes the popover from a button inside it

For a dimmed backdrop, use `Dialog` or `Sheet` instead.

## Composition Order

1. `Popover`
2. `PopoverAnchor` (optional), wrapping the element that holds `PopoverTrigger`
3. `PopoverTrigger`
4. `PopoverContent`
5. `PopoverClose` (optional), inside `PopoverContent`

## Variants

- Trigger-driven or [controlled](../../glossary.md#controlled) open state
- Lightweight informational popover versus richer custom content

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

- Use `Dialog` or `Sheet` instead when interaction should be modal or needs a dimmed backdrop.
- Floating content must be tested inside scroll containers and overlays.
- Trigger content should clearly indicate whether the popover is open.
- If the content starts accumulating form sections, confirmations, or large action groups, the correct abstraction is usually no longer a popover.

## Common Mistakes

- Putting critical task flow inside a popover.
- Forgetting to test placement inside clipped or scrolling containers.
- Letting popover content grow into a mini-dialog with too much text or too many actions.
