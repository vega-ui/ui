# DataGridSelectable API

## Root API


<!-- AUTO-GENERATED:ROOT_API:start -->
| Prop | Type | Default | Required | Notes |
| --- | --- | --- | --- | --- |
| `selection` | `S` | `'single' as S` | No | Selection mode. |
| `disabled` | `DataGridDisabled<K>` | `—` | No | Predicate or map of disabled cells. |
| `excludeDisabled` | `boolean` | `true` | No | — |
| `expandable` | `boolean` | `true` | No | Enables expanding selection ranges (Shift + Arrow or mouse drag). |
| `defaultActive` | `K` | `—` | No | Uncontrolled initial active cell. |
| `active` | `K` | `—` | No | Controlled active cell. |
| `selected` | `(S extends 'single' ? K : K[]) \\| undefined` | `—` | No | Controlled selected cells. |
| `defaultSelected` | `(S extends 'single' ? K : K[]) \\| undefined` | `—` | No | Uncontrolled initial selected cells. |
| `from` | `K` | `—` | No | Range boundaries. |
| `to` | `K` | `—` | No | — |
| `resolveRange` | `(start: DataGridResolveValue<K>, end: DataGridResolveValue<K>, grid: Grid<HTMLElement, K>) => K[]` | `—` | No | Custom range resolution logic for `selection="range"`. |
| `equals` | `(start: K \\\| undefined, end: K \\\| undefined) => boolean` | `—` | No | Custom equality comparator for comparing two cell keys. |
| `compare` | `(a: K, b: K) => -1 \\\| 0 \\\| 1` | `—` | No | Custom ordering comparator for comparing two cell keys. |
| `onSelectCell` | `(value: S extends 'single' ? K : K[]) => void` | `—` | No | Fires when the user selects cell. |
| `onChangeActive` | `(active: K) => void` | `—` | No | Fires when the active (focused) cell changes. |
<!-- AUTO-GENERATED:ROOT_API:end -->

## Child Parts API

## `DataGridSelectableRowGroup`

Groups rows and can provide scope separation for advanced compositions.

## `DataGridSelectableRow`

Represents one row of cells in the matrix.

## `DataGridSelectableCell`

Represents one selectable cell.

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
