# Dialog Anatomy

## Overview

`Dialog` is a [compound component](../../glossary.md#compound-component). The root owns open state, focus management, dismissal behavior, and modal coordination across the exported child parts.

## Required Parts

### `Dialog`

Root provider for the dialog state.

- Required: yes
- Owns: open state, dismissal, focus lifecycle
- Must wrap every other `Dialog*` part

### `DialogTrigger`

User action that opens the dialog.

- Required: effectively yes for normal product flows
- Typical usage: `asChild` with `Button`
- Should stay inside `Dialog`

### `DialogContent`

Primary modal surface.

- Required: yes
- Owns: visible content container
- Usually rendered inside `DialogBackdrop`

## Optional Parts

### `DialogPortal`

Optional [portal](../../glossary.md#portal) wrapper for overlay rendering.

- Required: no
- Recommended: yes for production overlay flows

### `DialogBackdrop`

Overlay surface behind the dialog.

- Required: no
- Recommended: yes for modal treatment and click-away dismissal

### `DialogHeader`

Layout wrapper for title and close actions.

- Required: no
- Recommended: yes when `DialogTitle` and `DialogCloseButton` appear together

### `DialogTitle`

Title text for orientation and accessibility.

- Required: not structurally required
- Recommended: yes in almost all product dialogs

### `DialogCloseButton`

Explicit close affordance.

- Required: no
- Recommended: yes when dismissal should stay discoverable

## Composition Order

Typical composition:

1. `Dialog`
2. `DialogTrigger`
3. `DialogPortal`
4. `DialogBackdrop`
5. `DialogContent`
6. `DialogHeader`
7. `DialogTitle`
8. `DialogCloseButton`

## Valid Composition Patterns

```tsx
<Dialog>
  <DialogTrigger asChild>
    <Button>Open dialog</Button>
  </DialogTrigger>
  <DialogPortal>
    <DialogBackdrop>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Billing address</DialogTitle>
          <DialogCloseButton />
        </DialogHeader>
        <Text size={3}>Update the legal address used on future invoices.</Text>
      </DialogContent>
    </DialogBackdrop>
  </DialogPortal>
</Dialog>
```

This is the production-safe default composition for modal flows.

## Invalid Composition Patterns

### `DialogContent` outside `Dialog`

The child parts depend on root context. Rendering them outside `Dialog` breaks behavior.

### Content without a title in user-critical flows

This weakens orientation and accessibility, especially for confirm and form dialogs.

### Nested dialogs without retesting focus flow

Nested overlay stacks can still be valid, but they must be treated as an integration edge case, not assumed to work from isolated component testing alone.
