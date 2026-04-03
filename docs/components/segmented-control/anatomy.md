# SegmentedControl Anatomy

## Overview

`SegmentedControl` is a [compound component](../../glossary.md#compound-component) for always-visible mutually exclusive options with a shared indicator, item-level hidden inputs, and root-managed selected-state geometry.

## Required Parts

### `SegmentedControl`

Required. Owns selected value, size, variant, disabled state, and indicator positioning.

### `SegmentedControlItem`

Required. Renders one selectable segment and its visible content.

### `SegmentedControlIndicator`

Required for the animated selected-state surface.

## Optional Parts

### `SegmentedControlItemHiddenInput`

Recommended for native radio-group semantics and form participation.

## Composition Order

1. `SegmentedControl`
2. `SegmentedControlItem`
3. `SegmentedControlItemHiddenInput`
4. visible item content
5. `SegmentedControlIndicator`

## Valid Composition Patterns

```tsx
<SegmentedControl name='view' defaultValue='week'>
  <SegmentedControlItem value='day'>
    <SegmentedControlItemHiddenInput />
    Day
  </SegmentedControlItem>
  <SegmentedControlItem value='week'>
    <SegmentedControlItemHiddenInput />
    Week
  </SegmentedControlItem>
  <SegmentedControlIndicator />
</SegmentedControl>
```

## Invalid Composition Patterns

### Items without a shared root

This breaks selected-state context and indicator positioning.

### Hidden inputs omitted in form-driven flows

The control may look right while losing native radio-group semantics.

### Large or highly variable option sets

Segmented control is for short, always-visible exclusive choices, not long menus.
