# DataGrid API

## Root API

`DataGrid` is the root active-cell and keyboard-navigation container.


<!-- AUTO-GENERATED:ROOT_API:start -->
| Prop | Type | Default | Required | Notes |
| --- | --- | --- | --- | --- |
| `ref` | `Ref<HTMLDivElement>` | `—` | No | Ref to the grid’s root element. |
| `apiRef` | `Ref<DataGridApiRef<K>>` | `—` | No | Ref to the grid’s imperative API. |
| `wrap` | `DataGridWrap` | `—` | No | Navigation wrap mode. |
| `defaultActive` | `K` | `'' as K` | No | Uncontrolled initial active (focused) cell key. |
| `active` | `K` | `—` | No | Controlled active (focused) cell key. |
| `onChangeActive` | `(active: K) => void` | `—` | No | Fires when the active (focused) cell key changes. |
| `exclude` | `DataGridExclude<K>` | `—` | No | Exclude cells from focus traversal. |
| `rowDelta` | `number` | `—` | No | Page navigation row step for PageUp/PageDown. |
| `onArrow` | `(e: KeyboardEvent<HTMLDivElement>, node: MatrixNode<HTMLElement, K>, prevNode: MatrixNode<HTMLElement, K>) => void` | `—` | No | Fires on each Arrow navigation step after focus changes |
<!-- AUTO-GENERATED:ROOT_API:end -->

## Child Parts API

## `DataGridRowGroup`

Groups rows for navigation registration.

## `DataGridRow`

Row registration unit.

## `DataGridCell`

Cell registration unit.

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
