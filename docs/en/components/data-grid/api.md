# DataGrid API

## Root API

`DataGrid` is the root active-cell and keyboard-navigation container.


<!-- AUTO-GENERATED:ROOT_API:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `ref` | `Ref<HTMLDivElement>` | — | No | Ref to the grid’s root element. |
| `apiRef` | `Ref<DataGridApiRef<K>>` | — | No | Ref to the grid’s imperative API. Exposes low-level structures for advanced scenarios: `grid` — matrix navigation helper; `keyMap` — Map`<K, [row, col]>` for fast lookups |
| `wrap` | `DataGridWrap` | — | No | Navigation wrap mode. 'horizontal' — wrap across columns within the same row; 'vertical' — wrap across rows within the same column; 'both' — enable both behaviors; undefined — no wrapping |
| `defaultActive` | `K` | `''` | No | Uncontrolled initial active (focused) cell key. |
| `active` | `K` | — | No | Controlled active (focused) cell key. |
| `onChangeActive` | `(active: K) => void` | — | No | Fires when the active (focused) cell key changes. |
| `exclude` | `DataGridExclude<K>` | — | No | Exclude cells from focus traversal. Can be: a single key; an array of keys; a predicate `(key) => boolean` |
| `rowDelta` | `number` | — | No | Page navigation row step for PageUp/PageDown. `undefined` — jump to the first/last row; `number` — move by N rows relative to the current row |
| `onArrow` | `(e: KeyboardEvent<HTMLDivElement>, node: MatrixNode<HTMLElement, K>, prevNode: MatrixNode<HTMLElement, K>) => void` | — | No | Fires on each Arrow navigation step after focus changes |

Also accepts all `<div>` attributes.
<!-- AUTO-GENERATED:ROOT_API:end -->

## Child Parts API

## `DataGridRowGroup`

Groups rows for navigation registration.

<!-- AUTO-GENERATED:PART_API:DataGridRowGroup:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `scope` | `DataGridScope` | — | No | Optional logical group for grid cells. Allows the DataGrid to treat cells as part of the same page or section. |

Also accepts all `<div>` attributes.
<!-- AUTO-GENERATED:PART_API:DataGridRowGroup:end -->

## `DataGridRow`

Row registration unit.

<!-- AUTO-GENERATED:PART_API:DataGridRow:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `row` | `number` | — | Yes | Zero-based row index for all descendant cells. Provided to descendants via context. |

Also accepts all `<div>` attributes.
<!-- AUTO-GENERATED:PART_API:DataGridRow:end -->

## `DataGridCell`

Cell registration unit.

<!-- AUTO-GENERATED:PART_API:DataGridCell:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `col` | `number` | — | Yes | Column index of the cell (0-based). Used together with row index from the row context to form grid coordinates: `[row, col]`. |
| `ref` | `Ref<HTMLDivElement>` | — | No | External ref to the cell root element. Will be merged with the internal `itemRef([row, col], key)` registration when the cell is not excluded. |
| `cellKey` | `DataGridCellKey` | — | No | Stable key that identifies the cell in the DataGrid matrix. If omitted, a key is derived as `${row}:${col}` from row/col. |
| `asChild` | `boolean` | `false` | No | When `true`, renders children via `Slot` and forwards props/refs to the child element instead of using a native `<div>`. |
| `excluded` | `boolean` | — | No | Exclude cells from focus traversal. Overrides value from root DataGrid |

Also accepts all `<div>` attributes.
<!-- AUTO-GENERATED:PART_API:DataGridCell:end -->

## Hooks

## `useDataGridContext`

Advanced hook for root-level grid coordination.

## `useDataGridRowContext`

Advanced hook for row-level custom abstractions.

## Types

| Type | Definition | Notes |
| --- | --- | --- |
| `DataGridCellKey` | cell key contract | Usually row and column based. |
| `DataGridCoordinates` | row/col coordinate shape | Used by navigation logic. |
| `DataGridWrap` | wrap mode union | Horizontal, vertical, or both. |
| `DataGridExclude` | exclusion contract | Sparse-grid navigation control. |
| `DataGridApiRef` | API ref contract | Advanced integrations. |
| `DataGridScope` | scope identifier | Separates logical grid groups when needed. |

## State Model

- Active cell can be controlled or uncontrolled.
- Navigation depends on row and cell registration order.
- Exclusion and wrap mode affect the keyboard model directly.
- The root is foundational; selection and picker semantics are layered on by derived components.

## Integration Notes

- Prefer `Table` for static data display.
- Use exclusion rules when the visible matrix is sparse.
- Use `rowDelta` when PageUp/PageDown should move by a fixed amount instead of jumping to edges.
- Retest interactive content inside cells carefully.
