# DataGridPicker Styling

## Overview

`DataGridPicker` adds a picker-specific visual layer on top of `DataGridSelectable`. The root itself has little direct CSS, but picker items and composed wrappers consume picker size and variant context.

## Public CSS Variables

There are no major public `--data-grid-picker-*` CSS variables declared on the root in the current implementation.

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

```tsx
<DataGridPicker variant='primary' size='sm'>
  <DataGridPickerRowGroup>
    <DataGridPickerRow row={0}>
      <DataGridPickerItem col={0} value='starter'>Starter</DataGridPickerItem>
      <DataGridPickerItem col={1} value='pro'>Pro</DataGridPickerItem>
    </DataGridPickerRow>
  </DataGridPickerRowGroup>
</DataGridPicker>
```

## Do Not Override

- inventing a standalone root token API that is not present in source
- styling picker cells in ways that hide active, selected, or disabled states
- treating layout scope and paging logic as CSS concerns
