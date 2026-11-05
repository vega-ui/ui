# DataGridPicker Styling

## Overview

`DataGridPicker` adds a picker-specific visual layer on top of `DataGridSelectable`. The root itself has little direct CSS, but picker items and composed wrappers consume picker size and variant context.

## Public CSS Variables

| Variable | Used By | Purpose |
| --- | --- | --- |
| `--data-grid-picker-item-size` | `DataGridPickerItem` | Item size. |
| `--data-grid-picker-item-br-ratio` | `DataGridPickerItem` | Radius ratio of an item. |
| `--picker-item-color` | `DataGridPickerItem` | Item text color. |
| `--picker-item-background-color` | `DataGridPickerItem` | Item background. |
| `--picker-item-background-color-hover` | `DataGridPickerItem` | Item background on hover. |
| `--picker-item-background-color-active` | `DataGridPickerItem` | Item background while pressed. |
| `--picker-item-selected-color` | `DataGridPickerItem` | Text color of the selected item. |
| `--picker-item-selected-background-color` | `DataGridPickerItem` | Background of the selected item. |
| `--picker-item-selected-background-color-hover` | `DataGridPickerItem` | Background of the selected item on hover. |
| `--picker-item-selected-background-color-active` | `DataGridPickerItem` | Background of the selected item while pressed. |
| `--picker-item-range-background-color` | `DataGridPickerItem` | Background of items inside a selected range. |
| `--picker-item-range-background-color-hover` | `DataGridPickerItem` | Range item background on hover. |
| `--picker-item-range-background-color-active` | `DataGridPickerItem` | Range item background while pressed. |

## Part-Level Variables

### Root

The root mainly provides picker context rather than a heavy styling surface.

### Items

`DataGridPickerItem` and related composed wrappers express the visible picker semantics such as active, selected, and disabled appearance.

## State And Variant Interaction

- `size` and `variant` flow through picker context to child parts.
- Selected and active visuals depend on the picker item layer.
- Scroller composition changes layout and paging, not the underlying color family.

## Examples

### Brand-colored picker matrix

`variant='primary'` switches the selected color to the brand palette and `size='lg'` enlarges every item through context. Each item reads `--data-grid-picker-item-size` and `--data-grid-picker-item-br-ratio` from its own element, so the round shape is set on the items, not on the root.

<!-- example: data-grid-picker/brand-colored-picker-matrix.tsx -->
```tsx
import { type CSSProperties } from 'react';
import {
  DataGridPicker,
  DataGridPickerItem,
  DataGridPickerRow,
  DataGridPickerRowGroup,
} from '@vega-ui/react';

const amounts = [[5, 10, 15], [20, 50, 100]];
const roundItem = { '--data-grid-picker-item-br-ratio': 0.5 } as CSSProperties;

export default function BrandColoredPickerMatrix() {
  return (
    <DataGridPicker
      aria-label='Tip amount, USD'
      variant='primary'
      size='lg'
      defaultSelected={15}
      defaultActive={15}
      style={{ width: 240 }}
    >
      <DataGridPickerRowGroup>
        {amounts.map((row, rowIndex) => (
          <DataGridPickerRow key={rowIndex} row={rowIndex}>
            {row.map((amount, col) => (
              <DataGridPickerItem key={amount} col={col} value={amount} style={roundItem}>${amount}</DataGridPickerItem>
            ))}
          </DataGridPickerRow>
        ))}
      </DataGridPickerRowGroup>
    </DataGridPicker>
  );
}
```
<!-- /example -->

## Do Not Override

- inventing a standalone root token API that is not present in source
- styling picker cells in ways that hide active, selected, or disabled states
- treating layout scope and paging logic as CSS concerns
