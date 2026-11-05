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

### `SegmentedControlItemInput`

Required inside every item. The visually hidden native radio: focus, arrow keys, selection, the selected-segment style and form value come from it.

## Optional Parts

There are no optional parts. Name the group with `role='radiogroup'` and `aria-label` or `aria-labelledby` on the root.

## Composition Order

1. `SegmentedControl`
2. `SegmentedControlItem`
3. `SegmentedControlItemInput`
4. visible item content
5. `SegmentedControlIndicator`

## Valid Composition Patterns

A group with text segments named by a visible label through `aria-labelledby`, and an icon-only group where every `SegmentedControlItemInput` gets its own `aria-label`.

<!-- example: segmented-control/valid-composition-patterns.tsx -->
```tsx
import {
  Icon,
  Label,
  SegmentedControl,
  SegmentedControlIndicator,
  SegmentedControlItem,
  SegmentedControlItemInput,
} from '@vega-ui/react';
import { LayoutGridIcon, ListIcon } from '@vega-ui/icons';

export default function ValidCompositionPatterns() {
  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-8)', justifyItems: 'start' }}>
      <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
        <Label id='orders-filter-label'>Orders</Label>
        <SegmentedControl name='orders-filter' defaultValue='open' role='radiogroup' aria-labelledby='orders-filter-label'>
          <SegmentedControlItem value='open'>
            <SegmentedControlItemInput />
            Open
          </SegmentedControlItem>
          <SegmentedControlItem value='shipped'>
            <SegmentedControlItemInput />
            Shipped
          </SegmentedControlItem>
          <SegmentedControlItem value='returned'>
            <SegmentedControlItemInput />
            Returned
          </SegmentedControlItem>
          <SegmentedControlIndicator />
        </SegmentedControl>
      </div>
      <SegmentedControl name='orders-layout' defaultValue='list' size='sm' role='radiogroup' aria-label='Layout'>
        <SegmentedControlItem value='list'>
          <SegmentedControlItemInput aria-label='List' />
          <Icon size='sm'><ListIcon /></Icon>
        </SegmentedControlItem>
        <SegmentedControlItem value='grid'>
          <SegmentedControlItemInput aria-label='Grid' />
          <Icon size='sm'><LayoutGridIcon /></Icon>
        </SegmentedControlItem>
        <SegmentedControlIndicator />
      </SegmentedControl>
    </div>
  );
}
```
<!-- /example -->

## Invalid Composition Patterns

### Items without a shared root

This breaks selected-state context and indicator positioning.

### Hidden inputs omitted in form-driven flows

The control may look right while losing native radio-group semantics.

### Large or highly variable option sets

Segmented control is for short, always-visible exclusive choices, not long menus.
