# Sheet Anatomy

## Overview

`Sheet` owns open state, dismissal behavior, and panel coordination across its exported parts. It is a [compound component](../../glossary.md#compound-component) because the root and child parts share one interaction model.

## Required Parts

### `Sheet`

Required. Owns open state and interaction lifecycle.

### `SheetTrigger`

Required for trigger-driven flows. Opens the sheet from a button or other action surface.

### `SheetContent`

Required. Renders the visible panel surface.

- Owns: the native modal `<dialog>`, its `::backdrop`, drag gestures, and open and close transitions
- Renders into `document.body`, so no portal part is needed

## Optional Parts

### `SheetHandle`

Optional drag affordance, especially useful for mobile-first sheets. With several snap points it is a button that moves the sheet to the next snap point; otherwise it is hidden from assistive technology.

### `SheetClose`

Closes the sheet when clicked.

- Required: no
- Renders a `<button type="button">` with no styles, icon, or label; with `asChild` it renders your own button instead
- Calls `onChangeOpen(false)` before your `onClick`, so the close transition plays and a controlled parent can keep the sheet open
- Give an icon-only close button an `aria-label`

## Your Own Markup

The library does not ship header or body parts. They carry no behavior that plain markup cannot express, so you compose them yourself. `SheetContent` provides the horizontal and bottom padding.

### Heading

Names the sheet. A name is required: reference a heading's `id` with `aria-labelledby` on `SheetContent`, or set `aria-label` on `SheetContent`.

### Scrollable region

An element with `overflow: auto`. As a flex item of `SheetContent` it shrinks to the available height on its own.

### Action buttons

Buttons that answer the sheet go in a `<form method="dialog">`: submitting it closes the sheet through `onChangeOpen(false)`, and the submit button's `value` becomes the dialog's `returnValue`. Use `SheetClose` for a standalone close button.

## Composition Order

1. `Sheet`
2. `SheetTrigger`
3. `SheetContent`
4. `SheetHandle`
5. Your heading, an optional `SheetClose`, and body

## Valid Composition Patterns

```tsx
<Sheet>
  <SheetTrigger asChild>
    <Button>Open filters</Button>
  </SheetTrigger>
  <SheetContent aria-labelledby='filters-title'>
    <SheetHandle aria-label='Resize sheet' />
    <Heading id='filters-title' size={4} fontWeight={600} as='h2'>Filters</Heading>
    <form method='dialog' style={{ display: 'grid', gap: 8 }}>
      <TextField>
        <TextFieldInput placeholder='Search owner' aria-label='Owner' />
      </TextField>
      <Button type='submit' size='sm' variant='secondary'>Apply filters</Button>
    </form>
  </SheetContent>
</Sheet>
```

## Invalid Composition Patterns

### `SheetContent` outside `Sheet`

This breaks state sharing and dismissal behavior.

### Content without a name

`SheetContent` does not name itself. Without `aria-labelledby` or `aria-label`, screen readers announce an unnamed dialog.

### Complex desktop modal flow in a cramped bottom sheet

That usually means `Dialog` or `Drawer` is the better pattern.

### Snap-point layout without testing real content height

Intermediate states can become unusable if form controls or actions are clipped.
