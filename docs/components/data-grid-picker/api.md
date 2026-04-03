# DataGridPicker API

## Root API


<!-- AUTO-GENERATED:ROOT_API:start -->
| Prop | Type | Default | Required | Notes |
| --- | --- | --- | --- | --- |
| `size` | `DataGridPickerSize` | `'md'` | No | Controls the item’s visual size. |
| `variant` | `DataGridPickerVariant` | `'secondary'` | No | Visual appearance preset for the picker. |
<!-- AUTO-GENERATED:ROOT_API:end -->

## Child Parts API

## `DataGridPickerRowGroup`

Groups picker rows and can define page scope for scroller-based compositions.

## `DataGridPickerRow`

One picker row.

## `DataGridPickerItem`

Selectable picker item.

## `DataGridPickerScroller`

Optional paging scroller wrapper.

## `DataGridPickerScrollerContent`

Scroller page content wrapper.

## Hooks

## `useDataGridPickerContext`

Advanced hook for reading the current picker size and variant inside custom picker item wrappers.

## Types

| Type | Definition | Notes |
| --- | --- | --- |
| `DataGridPickerProps<K, S>` | root prop type | Extends `DataGridSelectableProps<K, S>`. |
| `DataGridPickerItemProps` | picker item props | Selectable item surface. |
| `DataGridPickerRowProps` | row props | Row coordinate metadata. |
| `DataGridPickerRowGroupProps` | row-group props | Scope-aware grouping. |
| `DataGridPickerScrollerProps` | scroller props | Paged picker layout. |
| `DataGridPickerScrollerContentProps` | scroller content props | Page content wrapper. |

## State Model

- Selection behavior comes from `DataGridSelectable`.
- Size and variant are provided through picker context.
- Scroller-based compositions add page identity on top of the same selection engine.

## Integration Notes

- Use row-group `scope` in paged picker compositions where page identity matters.
- Prefer higher-level wrappers such as `DayPicker`, `MonthPicker`, or `YearPicker` when domain semantics are already modeled.
- Keep key stability and selection ordering consistent with the visible picker layout.
