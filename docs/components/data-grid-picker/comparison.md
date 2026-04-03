# DataGridPicker Comparison

## Quick Decision Rule

Choose `DataGridPicker` when the UI needs a grid-shaped picker with VegaUI visual semantics. Choose `DataGridSelectable` when selection behavior matters but the visual layer should be fully custom.

## `DataGridPicker` vs `DataGridSelectable`

Use `DataGridPicker` when the component should look and behave like a picker.

Use `DataGridSelectable` when only the behavior layer should be reused.

## `DataGridPicker` vs `MonthPicker`

Use `DataGridPicker` when the chosen values are generic and not specifically months.

Use `MonthPicker` when month-domain helpers and semantics are needed.

## `DataGridPicker` vs `DayPicker`

Use `DataGridPicker` when the grid is generic.

Use `DayPicker` when date math, visible month context, and day semantics matter.

## Choose This Component When

- the UI needs a dense, selectable grid
- size and variant should follow VegaUI picker semantics
- the domain is custom but still picker-shaped

## Do Not Choose This Component When

- a plain data table is needed
- the visual layer should be completely custom
- a richer domain-specific picker already exists
