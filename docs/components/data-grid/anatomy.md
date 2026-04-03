# DataGrid Anatomy

## Overview

`DataGrid` owns the active-cell model, wrap behavior, exclusion logic, and keyboard navigation across rows and cells.

## Required Parts

### `DataGrid`

Root provider for active-cell coordination.

### `DataGridRowGroup`

Grouping container for rows.

### `DataGridRow`

Row registration unit.

### `DataGridCell`

Cell registration and navigation unit.

## Optional Parts

### Controlled active-cell state

The parent can own the active cell for richer product flows.

### Interactive child content

Allowed, but must be tested carefully against the keyboard model.

### `apiRef`

Optional imperative bridge for advanced grid coordination.

## Composition Order

Typical composition:

1. `DataGrid`
2. `DataGridRowGroup`
3. `DataGridRow`
4. `DataGridCell`

## Valid Composition Patterns

```tsx
<DataGrid>
  <DataGridRowGroup>
    <DataGridRow row={0}>
      <DataGridCell col={0}>A1</DataGridCell>
    </DataGridRow>
  </DataGridRowGroup>
</DataGrid>
```

## Invalid Composition Patterns

### Cells without matching row or column structure

This breaks navigation assumptions and active-cell math.

### Sparse layouts without exclusion logic

The keyboard model may still try to navigate through visual gaps.

### Treating `DataGrid` as a visual table only

`DataGrid` is a keyboard-navigation system, not just a layout primitive.
