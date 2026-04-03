# Drawer

## Doc Profile

`advanced interactive`

## Summary

`Drawer` is a [compound component](../../glossary.md#compound-component) for edge-mounted overlays that preserve more page context than a centered modal. It is the side-panel member of the overlay family and usually fits secondary editing, filters, and contextual workspace flows.

## Imports

```tsx
import {
  Drawer,
  DrawerTrigger,
  DrawerPortal,
  DrawerBackdrop,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerCloseButton,
  type DrawerProps,
} from '@vega-ui/react';
```

## Exported Types

- `DrawerProps`
- `DrawerTriggerProps`
- `DrawerPortalProps`
- `DrawerBackdropProps`
- `DrawerContentProps`
- `DrawerHeaderProps`
- `DrawerTitleProps`
- `DrawerCloseButtonProps`

## Minimal Composition

```tsx
<Drawer>
  <DrawerTrigger asChild>
    <Button>Open member panel</Button>
  </DrawerTrigger>
  <DrawerPortal>
    <DrawerBackdrop>
      <DrawerContent>
        <Text size={3}>Recent members, invitations, and workspace roles.</Text>
      </DrawerContent>
    </DrawerBackdrop>
  </DrawerPortal>
</Drawer>
```

## Required Parts

- `Drawer`: root state and context provider
- `DrawerTrigger`: open action
- `DrawerContent`: edge-mounted content container

## Optional Parts

- `DrawerPortal`: overlay [portal](../../glossary.md#portal)
- `DrawerBackdrop`: background overlay
- `DrawerHeader`: title and action layout
- `DrawerTitle`: title for orientation
- `DrawerCloseButton`: explicit close action

## Composition Order

Typical composition:

1. `Drawer`
2. `DrawerTrigger`
3. `DrawerPortal`
4. `DrawerBackdrop`
5. `DrawerContent`
6. `DrawerHeader`
7. `DrawerTitle`
8. `DrawerCloseButton`

## Variants

- Position is the primary source-level variant for drawers.
- Common product variants are navigation drawer, filter drawer, and detail drawer.
- Overlay and no-overlay layouts are both used in current stories.

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

- Using a drawer when a dialog would be simpler and more focused.
- Letting drawer content become a full page inside a cramped side panel.
- Letting action buttons scroll out of view in long drawer content.
