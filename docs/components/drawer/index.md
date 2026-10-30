# Drawer

## Doc Profile

`advanced interactive`

## Summary

`Drawer` is a [compound component](../../glossary.md#compound-component) for edge-mounted overlays that preserve more page context than a centered modal. `DrawerContent` renders a native `<dialog>` opened with `showModal()`, so the browser puts it in the top layer, makes the rest of the page inert, and draws the backdrop. It is the side-panel member of the overlay family and usually fits secondary editing, filters, and contextual workspace flows. `DrawerClose` turns your own button into a close button; headings and layout are plain markup you compose yourself.

## Imports

```tsx
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerClose,
  type DrawerProps,
} from '@vega-ui/react';
```

## Exported Types

- `DrawerProps`
- `DrawerTriggerProps`
- `DrawerContentProps`
- `DrawerCloseProps`

## Minimal Composition

```tsx
import type { CSSProperties } from 'react';

<Drawer>
  <DrawerTrigger asChild>
    <Button>Open member panel</Button>
  </DrawerTrigger>
  <DrawerContent aria-labelledby='members-title'>
    <Heading id='members-title' as='h2' size={4} fontWeight={600}>Members</Heading>
    <DrawerClose asChild>
      <IconButton
        aria-label='Close'
        variant='secondary'
        appearance='ghost'
        style={{ position: 'absolute', insetBlockStart: 16, insetInlineEnd: 16, '--icon-button-size': '24px', '--icon-button-br-ratio': 0.5 } as CSSProperties}
      >
        <Icon size='xs'><XIcon strokeWidth={2.5} /></Icon>
      </IconButton>
    </DrawerClose>
    <Text size={3}>Recent members, invitations, and workspace roles.</Text>
  </DrawerContent>
</Drawer>
```

## Required Parts

- `Drawer`: root state and context provider
- `DrawerTrigger`: open action
- `DrawerContent`: edge-mounted modal panel

## Optional Parts

- `DrawerClose`: closes the drawer when clicked; wraps your own button with `asChild`

## Your Own Markup

- a heading whose `id` is passed to `DrawerContent` as `aria-labelledby` (or `aria-label` on `DrawerContent`); the drawer must have a name
- action buttons that answer the drawer (Cancel, Confirm) inside a `<form method="dialog">`

## Composition Order

Typical composition:

1. `Drawer`
2. `DrawerTrigger`
3. `DrawerContent` with your heading, an optional `DrawerClose`, body, and a `<form method="dialog">` for action buttons

## Variants

- Position is the primary source-level variant for drawers.
- Common product variants are navigation drawer, filter drawer, and detail drawer.
- Dimmed and transparent backdrops (`overlay` on `DrawerContent`); the drawer stays modal either way.

## Migrating From 2.x

`DrawerHeader`, `DrawerTitle`, and `DrawerCloseButton` were removed: the library keeps only parts that carry behavior plain markup cannot express. `DrawerClose` is the behavior-only replacement for the close button.

- `DrawerHeader` → your own layout element, for example a flex row
- `DrawerTitle` → a `Heading` with an `id`, referenced by `aria-labelledby` on `DrawerContent`
- `DrawerCloseButton` → `DrawerClose asChild` around your own button, for example an `IconButton` with an `aria-label`
- `useDrawerContext()` no longer returns `contentId` or `titleId`, and `DrawerTrigger` no longer sets `aria-controls`

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

- Confirm position-specific layout and animation.
- Narrow viewports need extra testing for content overflow.
- Use a drawer only when preserving page context matters more than full modal isolation.
- If the content becomes a long multi-step flow, a routed page or dedicated screen may be clearer than an ever-growing drawer.

## Common Mistakes

- Leaving `DrawerContent` without `aria-labelledby` or `aria-label`.
- Using a drawer when a dialog would be simpler and more focused.
- Letting drawer content become a full page inside a cramped side panel.
- Letting action buttons scroll out of view in long drawer content.
