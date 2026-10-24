# MonthPicker Anatomy

## Overview

`MonthPicker` wraps `DataGridPicker` for month values and exposes row, item, and layout parts for static month grids.

## Required Parts

### `MonthPicker`

Required. Owns the month selection state model through `DataGridPicker`.

## Optional Parts

### `MonthPickerLayout`

Optional default month-grid renderer.

### `MonthPickerCell`

Cell template. Children of `MonthPickerLayout` are required and rendered once per month inside a cell context read by `useMonthPickerCellContext()`; usually `<MonthPickerCell />`. Put custom content inside `MonthPickerCell` to keep selection, focus, and disabled states.

### `MonthPickerRowGroup`, `MonthPickerRow`, `MonthPickerItem`

Optional low-level month-grid composition parts.

## Composition Order

1. `MonthPicker`
2. either `MonthPickerLayout` or custom row/item composition

## Valid Composition Patterns

```tsx
<MonthPicker>
  <MonthPickerLayout cols={3}>
    <MonthPickerCell />
  </MonthPickerLayout>
</MonthPicker>
```

## Invalid Composition Patterns

### Month labels hardcoded inconsistently with the rest of the app

Localization and date semantics drift apart.

### Layout rebuilt without helper functions

Month ordering and selection semantics become easier to break.
