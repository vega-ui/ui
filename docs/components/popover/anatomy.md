# Popover Anatomy

## Overview

`Popover` owns open state and floating-layer coordination between the trigger, optional backdrop, and content. It stays non-modal by default, so the composition contract is about anchoring and contextual content rather than isolation.

## Required Parts

### `Popover`

Required. Owns open state and anchor coordination.

### `PopoverTrigger`

Required for trigger-driven usage. Opens the popover from a button or other action surface.

### `PopoverContent`

Required. Renders the floating content surface.

## Optional Parts

### `PopoverBackdrop`

Optional backdrop when the product needs stronger outside-click separation.

## Composition Order

1. `Popover`
2. `PopoverTrigger`
3. `PopoverBackdrop`
4. `PopoverContent`

## Valid Composition Patterns

```tsx
<Popover>
  <PopoverTrigger asChild>
    <Button>Account actions</Button>
  </PopoverTrigger>
  <PopoverContent>
    <Text size={3}>Profile</Text>
    <Button size='sm' variant='secondary'>Manage account</Button>
  </PopoverContent>
</Popover>
```

## Invalid Composition Patterns

### Critical modal task inside `PopoverContent`

If the flow blocks progress or requires strong focus trapping, use `Dialog`, `Drawer`, or `Sheet` instead.

### Large page-like layout inside the popover

This weakens the contextual nature of the component and usually indicates the wrong overlay pattern.

### Trigger and content split across unrelated state owners

That makes open state and placement harder to reason about than a single popover tree.
