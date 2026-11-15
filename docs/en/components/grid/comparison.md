# Grid Comparison

## Quick Decision Rule

Choose `Grid` when keyboard navigation between individual cells is part of the core interaction.

## `Grid` vs `Table`

Use `Grid` when:

- cells need active focus management
- spreadsheet-like interaction matters

Use `Table` when:

- the content is mostly static
- semantic table reading matters more than cell navigation

## `GridItem` vs custom cell content

Put a `GridItem` inside `<GridCell asChild>` when:

- the grid is a picker surface and should look like the VegaUI pickers

Use custom cell content when:

- selection is needed, but the cell visuals are application-specific

## `Grid` vs `MonthPicker` and `DayPicker`

Use `Grid` with `selection` when the values are generic: plans, sizes, quarters, seats.

Use `MonthPicker`, `YearPicker`, or `DayPicker` when date math, the visible period, and date semantics matter.

## Choose This Component When

- keyboard movement between cells is intentional
- the grid behaves more like an interaction model than a static table
- the selected look of the cells is application-specific

## Do Not Choose This Component When

- semantic `Table` is enough
- the user does not need active-cell navigation
- a date picker such as `DayPicker` or `MonthPicker` fits better
