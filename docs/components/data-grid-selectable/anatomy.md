# DataGridSelectable Anatomy

## Overview

`DataGridSelectable` is a compound behavioral grid. It layers selection and active-cell logic on top of `DataGrid` and exposes row-group, row, and cell parts for composition.

## Required Parts

- `DataGridSelectable`: root behavioral grid
- `DataGridSelectableRowGroup`: group of rows, optionally scoped
- `DataGridSelectableRow`: one matrix row
- `DataGridSelectableCell`: one selectable cell

## Optional Parts

- `apiRef`: inspect or control the underlying grid
- `resolveRange`, `compare`, `equals`: advanced selection behavior hooks
- `disabled`, `exclude`, `from`, `to`: selection constraints

## Composition Order

1. `DataGridSelectable`
2. `DataGridSelectableRowGroup`
3. `DataGridSelectableRow`
4. `DataGridSelectableCell`

## Valid Composition Patterns

- dense selection grids with stable row and column keys
- constrained subranges with `from` and `to`
- range selection with a custom resolver when the key model is not purely sequential

## Invalid Composition Patterns

- unstable cell keys across renders
- using presentational children that do not preserve cell semantics
- expecting selection behavior from `DataGrid` without the selectable wrapper
