# DataGridPicker API

## Root API


<!-- AUTO-GENERATED:ROOT_API:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `size` | `DataGridPickerSize` | `'md'` | No | Controls the item’s visual size. Useful for adapting the picker to compact or large layouts. |
| `variant` | `DataGridPickerVariant` | `'secondary'` | No | Visual appearance preset for the picker. |
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
| `wrap` | `DataGridWrap` | `'horizontal'` | No | Navigation wrap mode. 'horizontal' — wrap across columns within the same row; 'vertical' — wrap across rows within the same column; 'both' — enable both behaviors; undefined — no wrapping |
| `exclude` | `DataGridExclude<K>` | — | No | Exclude cells from focus traversal. Can be: a single key; an array of keys; a predicate `(key) => boolean` |
| `rowDelta` | `number` | — | No | Page navigation row step for PageUp/PageDown. `undefined` — jump to the first/last row; `number` — move by N rows relative to the current row |
| `onArrow` | `(e: KeyboardEvent<HTMLDivElement>, node: MatrixNode<HTMLElement, K>, prevNode: MatrixNode<HTMLElement, K>) => void` | — | No | Fires on each Arrow navigation step after focus changes |

Also accepts all `<div>` attributes.
<!-- AUTO-GENERATED:ROOT_API:end -->

## Child Parts API

## `DataGridPickerRowGroup`

Groups picker rows and can define page scope for scroller-based compositions.

<!-- AUTO-GENERATED:PART_API:DataGridPickerRowGroup:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `scope` | `DataGridScope` | — | No | The `scope` prop is required and identifies the logical group of cells rendered by this row group. When used with `DataGridIndexedSnapScroller`, the scope usually matches the current index or page. Providing a scope allows the DataGrid to restore focus to the first available cell when the index changes and new cells are rendered. |

Also accepts all `<div>` attributes.
<!-- AUTO-GENERATED:PART_API:DataGridPickerRowGroup:end -->

## `DataGridPickerRow`

One picker row.

<!-- AUTO-GENERATED:PART_API:DataGridPickerRow:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `row` | `number` | — | Yes | Zero-based row index for all descendant cells. Provided to descendants via context. |

Also accepts all `<div>` attributes.
<!-- AUTO-GENERATED:PART_API:DataGridPickerRow:end -->

## `DataGridPickerItem`

Selectable picker item.

<!-- AUTO-GENERATED:PART_API:DataGridPickerItem:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `range` | `DataGridPickerItemRangePosition` | — | No | Optional visual indicator of the cell’s position within a range. One of: `"start" \| "between" \| "end"`. If not provided, the component automatically derives it based on selection context. |
| `size` | `DataGridPickerSize` | — | No | Controls the item’s visual size. Useful for adapting the picker to compact or large layouts. |
| `value` | `DataGridCellKey` | — | No | Logical value associated with this grid cell. Used as the cell’s unique selection key. |
| `variant` | `DataGridPickerVariant` | — | No | Visual appearance preset for the picker. |
| `disabled` | `boolean` | — | No | Disables click and keyboard selection. Overrides value from root DataGrid |
| `ref` | `Ref<HTMLDivElement>` | — | No | External ref to the cell root element. Will be merged with the internal `itemRef([row, col], key)` registration when the cell is not excluded. |
| `col` | `number` | — | Yes | Column index of the cell (0-based). Used together with row index from the row context to form grid coordinates: `[row, col]`. |
| `asChild` | `boolean` | `false` | No | When `true`, renders children via `Slot` and forwards props/refs to the child element instead of using a native `<div>`. |
| `excluded` | `boolean` | — | No | Exclude cells from focus traversal. Overrides value from root DataGrid |

Also accepts all `<div>` attributes.
<!-- AUTO-GENERATED:PART_API:DataGridPickerItem:end -->

## `DataGridPickerScroller`

Optional paging scroller wrapper.

<!-- AUTO-GENERATED:PART_API:DataGridPickerScroller:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `start` | `number` | `-2` | No | Starting index used to generate the initial sequence of pages. Acts as the logical origin for the sliding index window. |
| `startDir` | `-1 \| 1` | `1` | No | Direction in which the initial index sequence expands. `1` — indexes increase to the right (0, 1, 2…); `-1` — indexes decrease to the right (0, -1, -2…). Controls the growth pattern of the initial index array. |
| `size` | `number` | `5` | No | Number of index segments rendered at once. Defines the size of the virtual “window” that the scroller slides over when navigating left or right. |
| `shift` | `number` | `2` | No | Number of pages appended when a scroll reaches the end of the window, so a fast swipe keeps going. Once the scroll settles, the window is re-centered on the snapped page. |
| `index` | `number` | — | No | Controls the currently active logical index. When provided, the scroller keeps the given index in view, scrolling to it if possible or rebuilding the window if needed. |
| `preserveScroll` | `boolean` | `true` | No | Preserve the currently snapped item after content changes (e.g., when pages are prepended/appended). If `true`, the scroller will restore the same snapped index using an immediate `scrollIntoView`. |
| `apiRef` | `Ref<IndexedSnapScrollerApiRef>` | — | No | Exposes the imperative API of the scroller. Allows programmatic control such as scrolling to an index or resetting the virtual window. |
| `onOffset` | `(value: number) => void` | — | No | Fires when the window grows at an edge. `-1` — the scroll settled on the first page (left/top edge); `+1` — the scroll reached the end (right/bottom edge). Useful for infinite loading: append/prepend pages based on the direction. |
| `ref` | `Ref<HTMLDivElement>` | — | No | Ref to the scroller’s element. |
| `defaultIndex` | `number` | — | No | Initial index of the item to snap to on mount. |
| `onScrollSnapChange` | `(element: HTMLElement, index: number) => void` | — | No | Fired when a scroll snap operation has fully completed and the scroller has settled on a new snap index. This callback is invoked after all scrolling and snapping animations have finished and the active snap position is considered stable. |
| `onScrollSnapChanging` | `(element: HTMLElement, index: number) => void` | — | No | Fired while a scroll snap operation is in progress and the active snap index is still changing. This callback may be invoked multiple times during a single scroll or swipe interaction as the scroller approaches its final snap position. Useful for optimistic UI updates, previews, or synchronizing transient state during scrolling. |

Also accepts all `<div>` attributes.
<!-- AUTO-GENERATED:PART_API:DataGridPickerScroller:end -->

## `DataGridPickerScrollerContent`

Scroller page content wrapper.

<!-- AUTO-GENERATED:PART_API:DataGridPickerScrollerContent:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `ref` | `Ref<HTMLDivElement>` | — | No | External ref to the item's root element. Will be merged with internal `itemRef(index)` to participate in snapping logic. |
| `asChild` | `boolean` | — | No | Render the content as a child (via `Slot`) instead of a native `<div>`. Keeps attributes/refs bound to the passed child element. |

Also accepts all `<div>` attributes.
<!-- AUTO-GENERATED:PART_API:DataGridPickerScrollerContent:end -->

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
