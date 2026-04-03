# DataGrid Comparison

## Quick Decision Rule

Choose `DataGrid` when keyboard navigation between individual cells is part of the core interaction.

## `DataGrid` vs `Table`

Use `DataGrid` when:

- cells need active focus management
- spreadsheet-like interaction matters

Use `Table` when:

- the content is mostly static
- semantic table reading matters more than cell navigation

## `DataGrid` vs `DataGridSelectable`

Use `DataGrid` when:

- basic navigation is enough
- selection should stay out of the grid layer

Use `DataGridSelectable` when:

- row or cell selection behavior is part of the UX

## `DataGrid` vs `DataGridPicker`

Use `DataGrid` when:

- the main concern is navigation across a grid

Use `DataGridPicker` when:

- the grid is used as a picker surface rather than as a general cell-navigation system

## Choose This Component When

- keyboard movement between cells is intentional
- the grid behaves more like an interaction model than a static table
- derived selection or picker layers would be premature

## Do Not Choose This Component When

- semantic `Table` is enough
- the user does not need active-cell navigation
- selection or picking flows are better handled by derived grid families
