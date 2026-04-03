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

## Optional Parts

### `SheetPortal`

Recommended when the sheet should escape local stacking and clipping.

### `SheetBackdrop`

Recommended when the panel should visually separate from the page and support outside-click dismissal.

### `SheetHandle`

Optional drag affordance, especially useful for mobile-first sheets.

### `SheetHeader`

Optional wrapper for title and top actions.

### `SheetMain`

Optional body wrapper for scrollable or structured content.

## Composition Order

1. `Sheet`
2. `SheetTrigger`
3. `SheetPortal`
4. `SheetBackdrop`
5. `SheetContent`
6. `SheetHandle`
7. `SheetHeader`
8. `SheetMain`

## Valid Composition Patterns

```tsx
<Sheet>
  <SheetTrigger asChild>
    <Button>Open filters</Button>
  </SheetTrigger>
  <SheetPortal>
    <SheetBackdrop>
      <SheetContent>
        <SheetHandle />
        <SheetHeader>
          <Text size={4} fontWeight={500}>Filters</Text>
        </SheetHeader>
        <SheetMain>
          <TextField>
            <TextFieldInput placeholder='Search owner' />
          </TextField>
          <Button size='sm' variant='secondary'>Apply filters</Button>
        </SheetMain>
      </SheetContent>
    </SheetBackdrop>
  </SheetPortal>
</Sheet>
```

## Invalid Composition Patterns

### `SheetContent` outside `Sheet`

This breaks state sharing and dismissal behavior.

### Complex desktop modal flow in a cramped bottom sheet

That usually means `Dialog` or `Drawer` is the better pattern.

### Snap-point layout without testing real content height

Intermediate states can become unusable if form controls or actions are clipped.
