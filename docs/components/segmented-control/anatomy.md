# SegmentedControl Anatomy

## Overview

`SegmentedControl` is a [compound component](../../glossary.md#compound-component) for always-visible mutually exclusive options with a shared indicator, item-level native radio inputs, and a CSS-anchored selected-state indicator.

## Required Parts

### `SegmentedControl`

Required. Owns the group `name`, the controlled `value` or the initial `defaultValue`, size, variant, and disabled state.

### `SegmentedControlItem`

Required. Renders one selectable segment and its visible content.

### `SegmentedControlIndicator`

Required for the animated selected-state surface.

## Optional Parts

### `SegmentedControlItemInput`

Recommended for native radio-group semantics and form participation.

## Composition Order

1. `SegmentedControl`
2. `SegmentedControlItem`
3. `SegmentedControlItemInput`
4. visible item content
5. `SegmentedControlIndicator`

## Valid Composition Patterns

```tsx
<SegmentedControl name='view' defaultValue='week'>
  <SegmentedControlItem value='day'>
    <SegmentedControlItemInput />
    Day
  </SegmentedControlItem>
  <SegmentedControlItem value='week'>
    <SegmentedControlItemInput />
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
