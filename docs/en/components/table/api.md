# Table API

## Root Props


<!-- AUTO-GENERATED:ROOT_API:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `dataAlign` | `'start' \| 'center' \| 'end' \| 'between'` | `'between'` | No | Defines the alignment strategy for table data cells. 'start': Aligns content to the left; 'center': Centers content; 'end': Aligns content to the right; 'between': Distributes space evenly between cells |
| `edgePadded` | `boolean` | `false` | No | Adds horizontal padding to the edges of the table container. Useful when the table should not stretch to the viewport edge. |
| `fullWidth` | `boolean` | — | No | Makes the table stretch to fill the full width of its container. |
| `fullHeight` | `boolean` | — | No | Makes the table stretch to fill the full height of its container. Useful for layouts with scrollable or pinned regions. |
| `ref` | `Ref<HTMLTableElement>` | — | No | Ref to the native HTML `<table>` element. Useful for focus, measurement, or imperative access. |

Also accepts all `<table>` attributes.
<!-- AUTO-GENERATED:ROOT_API:end -->

## Child Parts

- `TableHead`: semantic header section.
- `TableBody`: semantic body section.
- `TableFoot`: semantic footer section.
- `TableRow`: row structure.
- `TableHeading`: heading cell.
- `TableData`: data cell.

### `TableBody`

<!-- AUTO-GENERATED:PART_API:TableBody:start -->
Also accepts all `<tbody>` attributes.
<!-- AUTO-GENERATED:PART_API:TableBody:end -->

### `TableData`

<!-- AUTO-GENERATED:PART_API:TableData:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `dataAlign` | `TableProps['dataAlign']` | — | No | Controls horizontal alignment of the cell’s content. Inherits from TableProps and typically affects text alignment or flex layout. 'start' \| 'center' \| 'end' \| 'between' |

Also accepts all HTML attributes.
<!-- AUTO-GENERATED:PART_API:TableData:end -->

### `TableFoot`

<!-- AUTO-GENERATED:PART_API:TableFoot:start -->
Also accepts all `<tbody>` attributes.
<!-- AUTO-GENERATED:PART_API:TableFoot:end -->

### `TableHead`

<!-- AUTO-GENERATED:PART_API:TableHead:start -->
Also accepts all `<tbody>` attributes.
<!-- AUTO-GENERATED:PART_API:TableHead:end -->

### `TableRow`

<!-- AUTO-GENERATED:PART_API:TableRow:start -->
Also accepts all `<tr>` attributes.
<!-- AUTO-GENERATED:PART_API:TableRow:end -->

### `TableHeading`

<!-- AUTO-GENERATED:PART_API:TableHeading:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `dataAlign` | `TableProps['dataAlign']` | — | No | Controls horizontal alignment of the heading content. Inherits from TableProps and typically affects text or layout alignment. 'start' \| 'center' \| 'end' \| 'between' |

Also accepts all HTML attributes.
<!-- AUTO-GENERATED:PART_API:TableHeading:end -->

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
