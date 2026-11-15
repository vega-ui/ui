# Grid API

## Root API

`Grid` is the root active-cell and keyboard-navigation container.


<!-- AUTO-GENERATED:ROOT_API:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `ref` | `Ref<HTMLDivElement>` | — | No | Ref to the grid’s root element. |
| `apiRef` | `Ref<GridApiRef<K>>` | — | No | Ref to the grid’s imperative API. `focus(key?)` — moves focus to the cell with this key, or to the tab stop without one; a cell that is not rendered yet becomes the active cell and takes focus as soon as it renders |
| `asChild` | `boolean` | `false` | No | When `true`, renders the child element instead of a `<div>`, merging the props, for example a `<table>`. |
| `cells` | `readonly GridLayoutCell<K>[]` | — | No | The cells of the grid as data: the key, row and column of every cell, whether it is rendered or not. With it the grid knows its cells before they render: the server HTML has the right tab stop, the cells mount in one commit, the arrow keys and Shift + arrows move through cells that are not rendered, and `compare`, `getNextKey` and `resolveRange` are not needed for a grid that renders only part of its cells. A rendered cell that is not in `cells` is not seen by the grid. Without it the grid learns its cells from the rendered `GridCell`s. |
| `wrap` | `GridWrap` | — | No | Navigation wrap mode. 'horizontal' — wrap across columns within the same row; 'vertical' — wrap across rows within the same column; 'both' — enable both behaviors; undefined — no wrapping |
| `defaultActive` | `K` | — | No | Uncontrolled initial active (focused) cell key. Without it, or when it is not focusable, the tab stop is the first selected focusable cell, otherwise the first focusable cell. Pass it to a server-rendered grid: without it only the selected cell of `selection='single'` is a tab stop in the server HTML. |
| `active` | `K` | — | No | Controlled active (focused) cell key. |
| `onChangeActive` | `(active: K) => void` | — | No | Fires when the active (focused) cell key changes. |
| `exclude` | `GridKeys<K>` | — | No | Exclude cells from focus traversal: excluded cells are not focusable at all. Can be: a single key; an array of keys; a predicate `(key) => boolean` |
| `getNextKey` | `(intent: GridIntent, from: K, next: K \| undefined) => K \| undefined` | — | No | Overrides keyboard navigation. Receives the navigation intent (`forward` and `backward` follow the text direction), the key of the cell it starts from and the key the grid would move to by default, and returns the key to move to, or `undefined` to stay. A key of a cell that is not rendered yet becomes the active cell and takes focus as soon as it renders. |
| `selection` | `S` | — | No | Selection mode. Without it the grid has no selection: cells have no `aria-selected` and clicks do not select. `'single'` — only one cell can be selected at a time; `'multiple'` — independent multi-selection, the recommended model of the WAI-ARIA listbox pattern: a click, Enter or Space toggles a cell, moving the focus keeps the selection, Shift + arrows add the cells from the most recently selected one, Shift + Space selects from the most recently selected cell to the focused one, a pointer drag adds the cells in between, and Ctrl+A or Command+A selects all; `'range'` — range selection between two points (Shift + arrows or pointer drag); it has no select all |
| `disabled` | `GridKeys<K>` | — | No | Disabled cells, marked with `aria-disabled`: they stay focusable but cannot be selected, and a range never starts or ends on them. To skip them in keyboard navigation, pass them to `exclude` too. Can be: a function `(key) => boolean`; an array of disabled keys; a single key |
| `readOnly` | `boolean` | — | No | Makes the selection read-only like a native `readonly` input: the grid gets `aria-readonly="true"`, navigation still works, and selecting a cell neither changes the selection nor calls `onChangeValue`. |
| `value` | `S extends "multiple" \| "range" ? K[] : S extends "single" ? K \| null : never` | — | No | Controlled selected cells: a key in `'single'` mode, an array of keys otherwise. In `'single'` mode `null` means controlled with nothing selected. |
| `defaultValue` | `S extends "multiple" \| "range" ? K[] : S extends "single" ? K : never` | — | No | Uncontrolled initially selected cells. |
| `min` | `S extends GridSelection ? K : never` | — | No | The smallest key that can be selected, by the `compare` order, or by position without `compare`. |
| `max` | `S extends GridSelection ? K : never` | — | No | The largest key that can be selected, by the `compare` order, or by position without `compare`. |
| `resolveRange` | `(start: K, end: K) => K[]` | — | No | Given the start and the end key, ordered by `compare`, returns the list of keys forming the range. With `selection="range"` it resolves the range. With `selection="multiple"` Shift + arrows, a pointer drag and Ctrl+A take their keys from it instead of the rendered cells, and Ctrl+A selects the range from the `gridStart` to the `gridEnd` key of `getNextKey`: pass both when not every cell is rendered, as in a virtualized grid. Return only the keys that can be selected. |
| `compare` | `(a: K, b: K) => number` | — | No | Orders two cell keys for ranges, `min` and `max`, like the compare function of `Array.prototype.sort`: a negative number when `a` comes first, a positive number when `b` comes first, and `0` for the same place. Without it the cells are ordered by their position, the row and then the column, and a key of a cell that is not rendered is not ordered: pass it for keys with an order of their own, like dates, and for grids that render only part of their cells. |
| `onChangeValue` | `(value: S extends "multiple" \| "range" ? K[] : S extends "single" ? K : never) => void` | — | No | Fires when the user changes the selection, with the new value: a key in `'single'` mode, an array of keys otherwise. |

Also accepts all `<div>` attributes.
<!-- AUTO-GENERATED:ROOT_API:end -->

## Child Parts API

## `GridRowGroup`

Groups rows for navigation registration.

<!-- AUTO-GENERATED:PART_API:GridRowGroup:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `asChild` | `boolean` | `false` | No | When `true`, renders the child element instead of a `<div>`, merging the props, for example a `<tbody>`. |

Also accepts all `<div>` attributes.
<!-- AUTO-GENERATED:PART_API:GridRowGroup:end -->

## `GridRow`

Row registration unit.

<!-- AUTO-GENERATED:PART_API:GridRow:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `row` | `number` | — | Yes | Zero-based row index for all descendant cells. Provided to descendants via context. |
| `asChild` | `boolean` | `false` | No | When `true`, renders the child element instead of a `<div>`, merging the props, for example a `<tr>`. |

Also accepts all `<div>` attributes.
<!-- AUTO-GENERATED:PART_API:GridRow:end -->

## `GridCell`

Cell registration unit.

<!-- AUTO-GENERATED:PART_API:GridCell:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `col` | `number` | — | Yes | Column index of the cell (0-based). Together with the `row` of its `GridRow` it places the cell for the keyboard navigation and orders the cells when the grid has no `compare`. |
| `ref` | `Ref<HTMLDivElement>` | — | No | External ref to the cell root element, merged with the internal registration ref. |
| `value` | `GridKey` | — | No | Stable key that identifies the cell: what `value` of the Grid holds when the cell is selected. If omitted, a key is derived as `${row}:${col}` from row/col. |
| `asChild` | `boolean` | `false` | No | When `true`, renders children via `Slot` and forwards props/refs to the child element instead of using a native `<div>`. An interactive child, like a `<button>` or a link, keeps its own role: the cell has no `role="gridcell"` then, so the control is announced for what it is. For a cell that holds a control, prefer the control inside the cell with `tabIndex={-1}`, `<GridCell><button tabIndex={-1}>…</button></GridCell>`: the cell stays a gridcell, Enter and F2 move the focus into the control and Escape brings it back. |
| `excluded` | `boolean` | — | No | Excludes the cell from focus traversal: it is not focusable and never becomes active. Adds to the `exclude` of the root Grid. |
| `disabled` | `boolean` | — | No | Marks the cell as disabled with `aria-disabled`: it cannot be selected. Adds to the `disabled` of the root Grid. A disabled cell stays focusable. |

Also accepts all `<div>` attributes.
<!-- AUTO-GENERATED:PART_API:GridCell:end -->

## `GridColumnHeader`

Header of a column with `role="columnheader"`, placed in a `GridRow` with a `col` like a cell. The keyboard reaches it like a cell, it is never selected, and `excluded` takes a static header out of the navigation.

<!-- AUTO-GENERATED:PART_API:GridColumnHeader:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `col` | `number` | — | Yes | Column index of the header (0-based), placed like a cell in its row. |
| `ref` | `Ref<HTMLDivElement>` | — | No | External ref to the header element. |
| `value` | `GridKey` | — | No | Stable key of the header in the grid. If omitted, a key is derived as `${row}:${col}`. |
| `asChild` | `boolean` | `false` | No | When `true`, renders the child element instead of a `<div>`, merging the props, for example a `<th>`. |
| `excluded` | `boolean` | — | No | Excludes the header from focus traversal, for a header with nothing to interact with, like the weekday names of a calendar. A header with a button, such as a sort button, stays focusable so the keyboard reaches the button. |

Also accepts all `<div>` attributes.
<!-- AUTO-GENERATED:PART_API:GridColumnHeader:end -->

## `GridRowHeader`

Header of a row with `role="rowheader"`, usually at `col={0}`. Same behavior as `GridColumnHeader`.

<!-- AUTO-GENERATED:PART_API:GridRowHeader:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `col` | `number` | — | Yes | Column index of the header (0-based), placed like a cell in its row. |
| `ref` | `Ref<HTMLDivElement>` | — | No | External ref to the header element. |
| `value` | `GridKey` | — | No | Stable key of the header in the grid. If omitted, a key is derived as `${row}:${col}`. |
| `asChild` | `boolean` | `false` | No | When `true`, renders the child element instead of a `<div>`, merging the props, for example a `<th>`. |
| `excluded` | `boolean` | — | No | Excludes the header from focus traversal, for a header with nothing to interact with, like the weekday names of a calendar. A header with a button, such as a sort button, stays focusable so the keyboard reaches the button. |

Also accepts all `<div>` attributes.
<!-- AUTO-GENERATED:PART_API:GridRowHeader:end -->

## `GridItem`

<!-- AUTO-GENERATED:PART_API:GridItem:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `ref` | `Ref<HTMLDivElement>` | — | No | Ref to the item element. |
| `size` | `GridItemSize` | `'md'` | No | Controls the item’s visual size. |
| `variant` | `GridItemVariant` | `'secondary'` | No | Color of the selected item. |

Also accepts all `<div>` attributes.
<!-- AUTO-GENERATED:PART_API:GridItem:end -->

## `GridScroller`

<!-- AUTO-GENERATED:PART_API:GridScroller:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `start` | `number` | `-2` | No | Starting index used to generate the initial sequence of pages. Acts as the logical origin for the sliding index window. |
| `size` | `number` | `5` | No | Number of index segments rendered at once. Defines the size of the virtual “window” that the scroller slides over when navigating left or right. |
| `shift` | `number` | `2` | No | Number of pages appended when a scroll reaches the end of the window, so a fast swipe keeps going. Once the scroll settles, the window is re-centered on the snapped page. |
| `index` | `number` | — | No | Controls the currently active logical index. When provided, the scroller keeps the given index in view, scrolling to it if possible or rebuilding the window if needed. |
| `preserveScroll` | `boolean` | `true` | No | Preserve the currently snapped item after content changes (e.g., when pages are prepended/appended). If `true`, the scroller will restore the same snapped index using an immediate `scrollTo`. |
| `apiRef` | `Ref<IndexedSnapScrollerApiRef>` | — | No | Exposes the imperative API of the scroller. Allows programmatic control such as scrolling to an index, rebuilding the window around it when needed. |
| `onOffset` | `(value: number) => void` | — | No | Fires when the window grows at an edge. `-1` — the scroll settled on the first page (left/top edge); `+1` — the scroll reached the end (right/bottom edge). Useful for infinite loading: append/prepend pages based on the direction. |
| `ref` | `Ref<HTMLDivElement>` | — | No | Ref to the scroller’s element. |
| `defaultIndex` | `number` | — | No | Initial index of the item to snap to on mount. |
| `onScrollSnapChange` | `(element: HTMLElement, index: number) => void` | — | No | Fired when a scroll snap operation has fully completed and the scroller has settled on a new snap index. This callback is invoked after all scrolling and snapping animations have finished and the active snap position is considered stable. |
| `onScrollSnapChanging` | `(element: HTMLElement, index: number) => void` | — | No | Fired while a scroll snap operation is in progress and the active snap index is still changing. This callback may be invoked multiple times during a single scroll or swipe interaction as the scroller approaches its final snap position. Useful for optimistic UI updates, previews, or synchronizing transient state during scrolling. |

Also accepts all `<div>` attributes.
<!-- AUTO-GENERATED:PART_API:GridScroller:end -->

## Hooks

## `useGridActive`

`useGridActive(key)` returns `true` when the cell with this key is the active cell, the tab stop of the grid. Custom cell content re-renders only when the answer changes.

## `useGridSelected`, `useGridDisabled`, `useGridRange`

`useGridSelected(key)`, `useGridDisabled(key)` and `useGridRange(key)` return whether the cell with this key is selected, whether it is disabled, and its position in a selected range (`'start'`, `'between'`, `'end'` or `undefined`). Custom cell content re-renders only when the answer changes.

## `useGridRowContext`

Advanced hook for row-level custom abstractions.

## Types

| Type | Definition | Notes |
| --- | --- | --- |
| `GridKey` | `string \| number` | `${row}:${col}` unless the cell has a `value`. |
| `GridWrap` | wrap mode union | Horizontal, vertical, or both. |
| `GridApiRef` | `{ focus(key, options) }` | Moves focus to a cell, also to one rendered later. |
| `GridIntent` | navigation intent union | `forward`, `backward`, `up`, `down`, `rowStart`, `rowEnd`, `gridStart`, `gridEnd`, `pageUp`, `pageDown`; passed to `getNextKey`. |
| `GridSelection` | `'single' \| 'multiple' \| 'range'` | Selection mode. |
| `GridKeys<K>` | `K \| K[] \| GridKeyMatcher<K>` | A key, a list, or a predicate: the form of `exclude` and `disabled`. |
| `GridKeyMatcher<K>` | `(key) => boolean` | Predicate form of `GridKeys`. |
| `GridRangePosition` | `'start' \| 'between' \| 'end'` | Position of a cell in a selected range. |
| `GridItemSize` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | Size of `GridItem`. |
| `GridItemVariant` | `'primary' \| 'secondary'` | Color of the selected `GridItem`. |

## State Model

- Active cell can be controlled or uncontrolled.
- Navigation follows the `row` and `col` of `cells`, or of the rendered cells without it; `getNextKey` can override where a key moves.
- With `selection`, the selected cells can also be controlled or uncontrolled.
- There is always exactly one tab stop: the active cell when it is focusable, otherwise the first selected focusable cell, otherwise the first focusable cell.
- Exclusion and wrap mode affect the keyboard model directly.
- Disabled cells cannot be selected but stay focusable; excluded cells are not focusable at all.
- Headers take part in the navigation like cells but are never selected; with `selection='multiple'`, Ctrl+A or Command+A selects every enabled cell that is not excluded.
- Keys pressed inside cell content are left to the content; Escape returns the focus to the cell.
- Range mode uses expansion logic driven by keyboard and pointer movement.
- `GridCell` sets `data-range` on the cells of a range; the picker look comes from `GridItem` inside `<GridCell asChild>`.
- Inside `GridScroller`, the page that snaps into view makes its first available cell the active cell, when the active cell is not on that page.

## Integration Notes

- Prefer `Table` for static data display.
- Use exclusion rules when the visible matrix is sparse.
- Use `getNextKey` for the `pageUp` and `pageDown` intents when PageUp/PageDown should move by a fixed amount instead of jumping to edges.
- Give the inputs and buttons inside `GridCell` `tabIndex={-1}`: Enter or F2 enters them, Escape leaves them, and Tab skips them.
- Pass `aria-rowcount` and `aria-rowindex` yourself when the grid renders only part of its rows.
- Keep key ordering stable when using `compare` and range logic.
- Test pointer drag, Shift expansion, and wrapped navigation together in real flows.
