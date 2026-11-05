# DataGridSelectable API

## Root API


<!-- AUTO-GENERATED:ROOT_API:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `selection` | `S` | `'single'` | No | Selection mode. `'single'` — only one cell can be selected at a time; `'multiple'` — independent multi-selection (toggle per cell); `'range'` — range selection between two points (Shift + arrows or pointer drag) |
| `disabled` | `DataGridDisabled<K>` | — | No | Predicate or map of disabled cells. Can be: a function `(key) => boolean`; an array of disabled keys; a single key. Disabled cells cannot be selected or focused. |
| `excludeDisabled` | `boolean` | `true` | No | — |
| `expandable` | `boolean` | `true` | No | Enables expanding selection ranges (Shift + Arrow or mouse drag). |
| `defaultActive` | `K` | — | No | Uncontrolled initial active cell. |
| `active` | `K` | — | No | Controlled active cell. |
| `selected` | `S extends "single" ? K \| null : K[]` | — | No | Controlled selected cells. In `'single'` mode `null` means controlled with nothing selected. |
| `defaultSelected` | `S extends "single" ? K : K[]` | — | No | Uncontrolled initially selected cells. |
| `from` | `K` | — | No | Range boundaries. If provided, limits selection to cells between `from` and `to` based on the `compare` function. |
| `to` | `K` | — | No | — |
| `resolveRange` | `(start: DataGridResolveValue<K>, end: DataGridResolveValue<K>, grid: Grid<HTMLElement, K>) => K[]` | — | No | Custom range resolution logic for `selection="range"`. Given start and end values, returns the list of keys forming the range. |
| `equals` | `(start: K \| undefined, end: K \| undefined) => boolean` | — | No | Custom equality comparator for comparing two cell keys. Defaults to strict equality (`===`). |
| `compare` | `(a: K, b: K) => -1 \| 0 \| 1` | — | No | Custom ordering comparator for comparing two cell keys. Should return `-1`, `0`, or `1`. |
| `onSelectCell` | `(value: S extends 'single' ? K : K[]) => void` | — | No | Fires when the user selects cell. Receives the list of selected cell keys. |
| `onChangeActive` | `(active: K) => void` | — | No | Fires when the active (focused) cell changes. |
| `ref` | `Ref<HTMLDivElement>` | — | No | Ref to the grid’s root element. |
| `apiRef` | `Ref<DataGridApiRef<K>>` | — | No | Ref to the grid’s imperative API. Exposes low-level structures for advanced scenarios: `grid` — matrix navigation helper; `keyMap` — Map`<K, [row, col]>` for fast lookups |
| `wrap` | `DataGridWrap` | — | No | Navigation wrap mode. 'horizontal' — wrap across columns within the same row; 'vertical' — wrap across rows within the same column; 'both' — enable both behaviors; undefined — no wrapping |
| `exclude` | `DataGridExclude<K>` | — | No | Exclude cells from focus traversal. Can be: a single key; an array of keys; a predicate `(key) => boolean` |
| `rowDelta` | `number` | — | No | Page navigation row step for PageUp/PageDown. `undefined` — jump to the first/last row; `number` — move by N rows relative to the current row |
| `onArrow` | `(e: KeyboardEvent<HTMLDivElement>, node: MatrixNode<HTMLElement, K>, prevNode: MatrixNode<HTMLElement, K>) => void` | — | No | Fires on each Arrow navigation step after focus changes |

Also accepts all `<div>` attributes.
<!-- AUTO-GENERATED:ROOT_API:end -->

## Child Parts API

## `DataGridSelectableRowGroup`

Groups rows and can provide scope separation for advanced compositions.

<!-- AUTO-GENERATED:PART_API:DataGridSelectableRowGroup:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `scope` | `DataGridScope` | — | No | Optional logical group for grid cells. Allows the DataGrid to treat cells as part of the same page or section. |

Also accepts all `<div>` attributes.
<!-- AUTO-GENERATED:PART_API:DataGridSelectableRowGroup:end -->

## `DataGridSelectableRow`

Represents one row of cells in the matrix.

<!-- AUTO-GENERATED:PART_API:DataGridSelectableRow:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `row` | `number` | — | Yes | Zero-based row index for all descendant cells. Provided to descendants via context. |

Also accepts all `<div>` attributes.
<!-- AUTO-GENERATED:PART_API:DataGridSelectableRow:end -->

## `DataGridSelectableCell`

Represents one selectable cell.

<!-- AUTO-GENERATED:PART_API:DataGridSelectableCell:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `disabled` | `boolean` | — | No | Disables click and keyboard selection. Overrides value from root DataGrid |
| `col` | `number` | — | Yes | Column index of the cell (0-based). Used together with row index from the row context to form grid coordinates: `[row, col]`. |
| `ref` | `Ref<HTMLDivElement>` | — | No | External ref to the cell root element. Will be merged with the internal `itemRef([row, col], key)` registration when the cell is not excluded. |
| `cellKey` | `DataGridCellKey` | — | No | Stable key that identifies the cell in the DataGrid matrix. If omitted, a key is derived as `${row}:${col}` from row/col. |
| `asChild` | `boolean` | `false` | No | When `true`, renders children via `Slot` and forwards props/refs to the child element instead of using a native `<div>`. |
| `excluded` | `boolean` | — | No | Exclude cells from focus traversal. Overrides value from root DataGrid |

Also accepts all `<div>` attributes.
<!-- AUTO-GENERATED:PART_API:DataGridSelectableCell:end -->

- the cell key model should stay stable across renders

## Hooks

## `useDataGridSelectableContext`

Advanced hook for reading selection and disabled state in custom cell wrappers.

## Types

| Type | Definition | Notes |
| --- | --- | --- |
| `DataGridSelectableProps<K, S>` | root prop type | Extends `DataGridProps<K>`. |
| `DataGridSelectableRowGroupProps` | row-group props | Grouping and scope behavior. |
| `DataGridSelectableRowProps` | row props | Row coordinate metadata. |
| `DataGridSelectableCellProps` | cell props | Cell coordinate and render props. |
| `DataGridSelection` | `'single' \| 'multiple' \| 'range'` | Selection mode. |
| `DataGridDisabled<K>` | disabled map type | Predicate, list, or key. |

## State Model

- Active state and selected state can both be controlled or uncontrolled.
- Range mode uses expansion logic driven by keyboard and pointer movement.
- Disabled and excluded cells change both selection and navigation behavior.

## Integration Notes

- Keep key ordering stable when using `compare` and range logic.
- Use `DataGridPicker` when the visual picker layer should be standardized.
- Test pointer drag, shift-key expansion, and wrapped navigation together in real flows.
