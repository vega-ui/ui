# MonthPicker Styling

## Overview

`MonthPicker` does not define a large root-specific CSS contract. Most visual behavior is inherited from the underlying picker and grid primitives plus the layout parts rendered inside the root.

## Public CSS Variables

There are no significant month-picker-specific public CSS variables in the current implementation.

Global color and surface semantics should come from [Themes](../../styling/themes.md), not from custom month-picker variables.

## Part-Level Variables

### Root

The root is behavioral and layout-neutral. It owns month selection state, not a separate style layer.

### Layout

Visual month arrangement is driven by the composed row and item grid parts plus locale formatting.

## State And Variant Interaction

- Selection, disabled, and active styling come from the underlying picker primitives.
- Grid shape changes through the `cols` layout prop, not through dedicated CSS variables.

## Examples

### Size and variant

`size` sets the cell size and font and `variant` the selected state; `cols` and `format` of the layout set the grid shape. All are props, not CSS variables.

<!-- example: month-picker/size-and-variant.tsx -->
```tsx
import { MonthPicker, MonthPickerCell, MonthPickerLayout } from '@vega-ui/react';

export default function SizeAndVariant() {
  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-16)', width: '100%' }}>
      <MonthPicker aria-label='Secondary, extra small' locale='en-US' year='2026-01-01' defaultSelected='2026-05-01' style={{ width: '100%' }}>
        <MonthPickerLayout cols={4} format='short'>
          <MonthPickerCell />
        </MonthPickerLayout>
      </MonthPicker>
      <MonthPicker aria-label='Primary, medium' locale='en-US' year='2026-01-01' size='md' variant='primary' defaultSelected='2026-05-01' style={{ width: '100%' }}>
        <MonthPickerLayout cols={3}>
          <MonthPickerCell />
        </MonthPickerLayout>
      </MonthPicker>
    </div>
  );
}
```
<!-- /example -->

## Do Not Override

- documenting a month-picker CSS API that does not exist in source
- treating layout props as if they were design tokens
