# Drawer Anatomy

## Overview

`Drawer` owns open state, edge-mounted overlay behavior, focus lifecycle, and dismissal logic across its exported parts.

## Required Parts

### `Drawer`

Root provider for drawer state.

### `DrawerTrigger`

Open action for the drawer.

### `DrawerContent`

Main edge-mounted panel.

## Optional Parts

### `DrawerPortal`

Overlay [portal](../../glossary.md#portal) wrapper.

### `DrawerBackdrop`

Backdrop layer behind the drawer.

### `DrawerHeader`

Header layout wrapper.

### `DrawerTitle`

Title for orientation and accessibility.

### `DrawerCloseButton`

Explicit close action.

## Composition Order

1. `Drawer`
2. `DrawerTrigger`
3. `DrawerPortal`
4. `DrawerBackdrop`
5. `DrawerContent`
6. `DrawerHeader`
7. `DrawerTitle`
8. `DrawerCloseButton`

## Valid Composition Patterns

```tsx
<Drawer>
  <DrawerTrigger asChild>
    <Button>Open drawer</Button>
  </DrawerTrigger>
  <DrawerPortal>
    <DrawerBackdrop>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Workspace details</DrawerTitle>
          <DrawerCloseButton />
        </DrawerHeader>
        <Text size={3}>Review members, roles, and recent activity without leaving the current screen.</Text>
      </DrawerContent>
    </DrawerBackdrop>
  </DrawerPortal>
</Drawer>
```

## Invalid Composition Patterns

### `DrawerContent` outside `Drawer`

Breaks root context and overlay behavior.

### Long drawer content without a scroll strategy

Causes actions or important content to disappear off screen.

### Using a drawer for a fully modal confirm flow

This usually indicates `Dialog` is the better fit.
