# Sheet

## Doc Profile

`advanced interactive`

## Summary

`Sheet` is a [compound component](../../glossary.md#compound-component) for panel-style overlays, usually bottom-mounted or mobile-first, with trigger, content, and handle parts. `SheetClose` turns your own button into a close button; headings and layout are plain markup you compose yourself. `SheetContent` renders a native `<dialog>` opened with `showModal()`, so the browser puts it in the top layer, makes the rest of the page inert, and draws the backdrop. It is the touch- and panel-oriented overlay in the family, especially when snap points or bottom-entry behavior matter.

## Imports

```tsx
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetClose,
  SheetHandle,
  type SheetProps,
} from '@vega-ui/react';
```

## Exported Types

- `SheetProps`
- `SheetTriggerProps`
- `SheetHandleProps`
- `SheetContentProps`
- `SheetCloseProps`

## Minimal Composition

<!-- example: sheet/minimal-composition.tsx -->
```tsx
import { useId, type CSSProperties } from 'react';
import {
  Button,
  Heading,
  Icon,
  IconButton,
  Sheet,
  SheetClose,
  SheetContent,
  SheetHandle,
  SheetTrigger,
  Text,
} from '@vega-ui/react';
import { XIcon } from '@vega-ui/icons';

export default function MinimalComposition() {
  const titleId = useId();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button>Order summary</Button>
      </SheetTrigger>
      <SheetContent aria-labelledby={titleId}>
        <SheetHandle aria-label='Resize sheet' />
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-8)' }}>
          <Heading id={titleId} as='h2' size={4} fontWeight={600}>Order summary</Heading>
          <SheetClose asChild>
            <IconButton
              aria-label='Close'
              variant='secondary'
              appearance='ghost'
              style={{ flexShrink: 0, '--icon-button-size': '24px', '--icon-button-br-ratio': 0.5 } as CSSProperties}
            >
              <Icon size='xs'><XIcon strokeWidth={2.5} /></Icon>
            </IconButton>
          </SheetClose>
        </div>
        <Text size={3} style={{ color: 'var(--label-secondary)' }}>2 × Flat white, 1 × Almond croissant · $13.40</Text>
        <form method='dialog' style={{ display: 'grid', marginBlockStart: 'var(--spacing-6)' }}>
          <Button type='submit' value='pay'>Pay $13.40</Button>
        </form>
      </SheetContent>
    </Sheet>
  );
}
```
<!-- /example -->

## Required Parts

- `Sheet`: root state and context provider
- `SheetTrigger`: open action surface
- `SheetContent`: modal sheet surface

## Optional Parts

- `SheetHandle`: drag or gesture affordance
- `SheetClose`: closes the sheet when clicked; wraps your own button with `asChild`

## Your Own Markup

- a heading whose `id` is passed to `SheetContent` as `aria-labelledby` (or `aria-label` on `SheetContent`); the sheet must have a name
- action buttons that answer the sheet inside a `<form method="dialog">`
- a scrollable region: an element with `overflow: auto`

## Composition Order

1. `Sheet`
2. `SheetTrigger`
3. `SheetContent`
4. `SheetHandle`
5. Your heading, an optional `SheetClose`, and body

## Variants

- Bottom-sheet layouts versus general panel layouts
- Trigger-driven versus [controlled](../../glossary.md#controlled) open state
- Snap-point based sheets versus fully open sheets
- `closedBy` on `SheetContent`: closed by any action, by `Escape` only, or not by the user at all
- Dimmed versus transparent backdrop (`overlay` on `SheetContent`); the sheet stays modal either way
- Mobile-first presentation versus broader cross-device panel usage

## Migrating From 2.x

`SheetHeader` and `SheetMain` were removed: the library keeps only parts that carry behavior plain markup cannot express. `SheetContent` now has the padding they used to provide.

- `SheetHeader` → a `Heading` with an `id`, referenced by `aria-labelledby` on `SheetContent`
- `SheetMain` → plain content, or an element with `overflow: auto` for a scrollable region
- New: `SheetClose`, a close part with no styles of its own (Sheet had no close button before)
- `useSheetContext()` no longer returns `contentId`, and `SheetTrigger` no longer sets `aria-controls`

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

- Validate gesture affordances on touch devices.
- Snap points should be tested against real content height.
- Nested overlays need focus restoration and stacking checks.
- Non-closable sheets need especially clear exit paths.

## Common Mistakes

- Leaving `SheetContent` without `aria-labelledby` or `aria-label`.
- Treating a sheet like a desktop modal dialog.
- Using snap points without checking content usability at each stop.
- Forgetting to test gesture, focus, and dismissal together.
