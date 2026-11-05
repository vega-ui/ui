# Table Comparison

## Quick Decision Rule

Use `Table` when native semantic table structure is enough and grid-like interaction is unnecessary.

## `Table` vs `DataGrid`

Use `Table` when:

- the data is mostly read-only
- native table semantics are the main requirement
- cell-level keyboard navigation is unnecessary

Use `DataGrid` when:

- the feature needs richer keyboard interaction, selection, or grid behavior

Main trade-off: `Table` stays simpler and more semantic, while `DataGrid` handles heavier interaction models.

## `Table` vs `DataGridSelectable`

Use `Table` when:

- row selection is not part of the main interaction model

Use `DataGridSelectable` when:

- users need explicit row selection behavior

Main trade-off: `Table` avoids grid complexity, while `DataGridSelectable` adds selection semantics and controls.

## Choose This Component When

- The data is tabular and mostly read-only.
- Native semantic structure matters more than advanced interaction.
- The table should stay simple and predictable.

## Do Not Choose This Component When

- The feature needs grid-like keyboard behavior.
- Selection, inline editing, or richer row interaction is central.
- The UI is really a data grid rather than a semantic table.
