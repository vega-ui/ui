# Table API

## Root Props


<!-- AUTO-GENERATED:ROOT_API:start -->
| Prop | Type | Default | Required | Notes |
| --- | --- | --- | --- | --- |
| `dataAlign` | `'start' \\| 'center' \\| 'end' \\| 'between'` | `'between'` | No | Defines the alignment strategy for table data cells. |
| `edgePadded` | `boolean` | `false` | No | Adds horizontal padding to the edges of the table container. |
| `fullWidth` | `boolean` | `—` | No | Makes the table stretch to fill the full width of its container. |
| `fullHeight` | `boolean` | `—` | No | Makes the table stretch to fill the full height of its container. |
| `ref` | `Ref<HTMLTableElement>` | `—` | No | Ref to the native HTML `<table>` element. |
<!-- AUTO-GENERATED:ROOT_API:end -->

## Child Parts

- `TableHead`: semantic header section.
- `TableBody`: semantic body section.
- `TableFoot`: semantic footer section.
- `TableRow`: row structure.
- `TableHeading`: heading cell.
- `TableData`: data cell.

## Types

- `TableProps`
- `TableHeadProps`
- `TableBodyProps`
- `TableFootProps`
- `TableRowProps`
- `TableHeadingProps`
- `TableDataProps`

## State Model

- `Table` does not own interactive row state the way `DataGrid` does.
- The root provides alignment and edge-padding context to cell parts.
- `useTableContext` is available for advanced wrappers and custom compositions.
