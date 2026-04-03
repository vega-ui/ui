# DataGridSelectable Comparison

## Quick Decision Rule

Choose `DataGridSelectable` when selection behavior is the main requirement and the visual cell treatment is custom. Choose `DataGridPicker` when the visual picker layer should be standardized.

## `DataGridSelectable` vs `DataGrid`

Use `DataGridSelectable` when cells must be selectable.

Use `DataGrid` when the grid is navigable or presentational but not selection-driven.

## `DataGridSelectable` vs `DataGridPicker`

Use `DataGridSelectable` when the product needs custom cell styling and direct control over the visual layer.

Use `DataGridPicker` when a picker-style selection surface should come from VegaUI.

## Choose This Component When

- range, multi-select, or custom selection rules are the main concern
- the visual layer is application-specific
- custom comparators or range resolution are required

## Do Not Choose This Component When

- the UI just needs a standard picker grid
- consumers should not have to design the visual selection layer themselves
- the grid is purely presentational
