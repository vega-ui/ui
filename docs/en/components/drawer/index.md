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

<!-- example: drawer/minimal-composition.tsx -->
```tsx
import { useId, type CSSProperties } from 'react';
import {
  Button,
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
  Heading,
  Icon,
  Text,
} from '@vega-ui/react';
import { XIcon } from '@vega-ui/icons';

export default function MinimalComposition() {
  const titleId = useId();

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant='secondary' appearance='ghost'>Keyboard shortcuts</Button>
      </DrawerTrigger>
      <DrawerContent aria-labelledby={titleId} style={{ width: 360 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-8)' }}>
          <Heading id={titleId} as='h2' size={4} fontWeight={600}>Keyboard shortcuts</Heading>
          <DrawerClose asChild>
            <Button
              square
              aria-label='Close'
              variant='secondary'
              appearance='ghost'
              style={{ flexShrink: 0, '--button-height': '24px', '--button-br-ratio': 0.5 } as CSSProperties}
            >
              <Icon size='xs'><XIcon strokeWidth={2.5} /></Icon>
            </Button>
          </DrawerClose>
        </div>
        <Text size={3} style={{ display: 'block', marginBlockStart: 'var(--spacing-4)', color: 'var(--label-secondary)' }}>
          Press ⌘K to search, C to create a task and ? to open this panel again.
        </Text>
      </DrawerContent>
    </Drawer>
  );
}
```
<!-- /example -->

## Your Own Component

The minimal composition above shows the parts in place. In an app, compose them once in a file of your own, with your icon set, and import that component everywhere. `MyDrawer` passes its props to `Drawer`, `position` included, renders `trigger` in `DrawerTrigger`, names the panel by `title` in its heading, gives the close button its name from `closeLabel`, and puts its children below the heading. See [Component recipes](../../recipes.md).

<!-- example: drawer/recipe.tsx -->
```tsx
import { useId, type CSSProperties, type ReactNode } from 'react';
import {
  Button,
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
  Heading,
  Icon,
  Text,
  type DrawerProps,
} from '@vega-ui/react';
import { XIcon } from '@vega-ui/icons';

interface MyDrawerProps extends DrawerProps {
  trigger: ReactNode
  title: ReactNode
  closeLabel: string
}

export function MyDrawer({ trigger, title, closeLabel, children, ...props }: MyDrawerProps) {
  const titleId = useId();

  return (
    <Drawer {...props}>
      <DrawerTrigger asChild>{trigger}</DrawerTrigger>
      <DrawerContent aria-labelledby={titleId} style={{ width: 360 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-8)' }}>
          <Heading id={titleId} as='h2' size={4} fontWeight={600}>{title}</Heading>
          <DrawerClose asChild>
            <Button
              square
              aria-label={closeLabel}
              variant='secondary'
              appearance='ghost'
              style={{ flexShrink: 0, '--button-height': '24px', '--button-br-ratio': 0.5 } as CSSProperties}
            >
              <Icon size='xs'><XIcon strokeWidth={2.5} /></Icon>
            </Button>
          </DrawerClose>
        </div>
        {children}
      </DrawerContent>
    </Drawer>
  );
}

const details = [
  { term: 'Customer', value: 'Kestrel Robotics' },
  { term: 'Placed', value: 'Nov 2, 2026, 14:08' },
  { term: 'Total', value: '$1,284.00' },
];

export default function Recipe() {
  return (
    <MyDrawer
      trigger={<Button variant='secondary' appearance='ghost'>Order #10482</Button>}
      title='Order #10482'
      closeLabel='Close'
    >
      <dl style={{ display: 'grid', gap: 'var(--spacing-8)', margin: 'var(--spacing-12) 0 0' }}>
        {details.map((detail) => (
          <div key={detail.term} style={{ display: 'grid', gap: 'var(--spacing-1)' }}>
            <dt><Text size={2} style={{ color: 'var(--label-secondary)' }}>{detail.term}</Text></dt>
            <dd style={{ margin: 0 }}><Text size={3}>{detail.value}</Text></dd>
          </div>
        ))}
      </dl>
    </MyDrawer>
  );
}
```
<!-- /example -->

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
- `DrawerCloseButton` → `DrawerClose asChild` around your own button, for example a `Button` with `square` and an `aria-label`
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
