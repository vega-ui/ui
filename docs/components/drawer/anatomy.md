# Drawer Anatomy

## Overview

`Drawer` owns open state, position, and dismissal rules across its exported parts. `DrawerContent` is the native modal `<dialog>` that carries focus, the backdrop, and transitions.

## Required Parts

### `Drawer`

Root provider for drawer state.

### `DrawerTrigger`

Open action for the drawer.

### `DrawerContent`

Main edge-mounted panel.

- Owns: the native modal `<dialog>`, its `::backdrop`, and open and close transitions
- Renders into `document.body`, so no portal part is needed

## Optional Parts

### `DrawerClose`

Closes the drawer when clicked.

- Required: no
- Renders a `<button type="button">` with no styles, icon, or label; with `asChild` it renders your own button instead
- Calls `onChangeOpen(false)` before your `onClick`, so the close transition plays and a controlled parent can keep the drawer open
- Give an icon-only close button an `aria-label`

## Your Own Markup

The library does not ship header or title parts. They carry no behavior that plain markup cannot express, so you compose them yourself.

### Heading

Names the drawer. A name is required: reference a heading's `id` with `aria-labelledby` on `DrawerContent`, or set `aria-label` on `DrawerContent`.

### Action buttons

Buttons that answer the drawer go in a `<form method="dialog">`: submitting it closes the drawer through `onChangeOpen(false)`, and the submit button's `value` becomes the dialog's `returnValue`. Use `DrawerClose` for a standalone close button.

## Composition Order

1. `Drawer`
2. `DrawerTrigger`
3. `DrawerContent`
4. Your heading, an optional `DrawerClose`, body, and a `<form method="dialog">` with action buttons

## Valid Composition Patterns

```tsx
import type { CSSProperties } from 'react';

<Drawer>
  <DrawerTrigger asChild>
    <Button>Open drawer</Button>
  </DrawerTrigger>
  <DrawerContent aria-labelledby='workspace-title'>
    <Heading id='workspace-title' as='h2' size={4} fontWeight={600}>Workspace details</Heading>
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
    <Text size={3}>Review members, roles, and recent activity without leaving the current screen.</Text>
  </DrawerContent>
</Drawer>
```

## Invalid Composition Patterns

### `DrawerContent` outside `Drawer`

Breaks root context and overlay behavior.

### Content without a name

`DrawerContent` does not name itself. Without `aria-labelledby` or `aria-label`, screen readers announce an unnamed dialog.

### Long drawer content without a scroll strategy

Causes actions or important content to disappear off screen.

### Using a drawer for a fully modal confirm flow

This usually indicates `Dialog` is the better fit.
