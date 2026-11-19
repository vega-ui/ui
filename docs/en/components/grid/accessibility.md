# Grid Accessibility

## Labeling

The grid should appear with surrounding context that explains what the cells represent. With `selection`, the label or the context should also explain the selection task.

## Keyboard Behavior

<!-- AUTO-GENERATED:KEYBOARD:start -->
| Key | Action |
| --- | --- |
| <kbd>→</kbd> / <kbd>←</kbd> | Moves the focus to the next or previous cell in the row. Follows the text direction: in right-to-left, → moves to the previous cell. Stops at the row edge unless `wrap` is set. Disabled cells stay reachable; excluded cells are skipped. |
| <kbd>↓</kbd> / <kbd>↑</kbd> | Moves the focus to the cell below or above in the same column. |
| <kbd>Home</kbd> / <kbd>End</kbd> | Moves the focus to the first or last cell of the row. |
| <kbd>Ctrl</kbd> + <kbd>Home</kbd> / <kbd>Ctrl</kbd> + <kbd>End</kbd> | Moves the focus to the first cell of the first row or the last cell of the last row. |
| <kbd>Page Down</kbd> / <kbd>Page Up</kbd> | Moves the focus to the last or first row in the same column; `getNextKey` can give another step. When that row has no focusable cell in the column, the focus moves to the nearest row towards the current one that has it. |
| <kbd>Enter</kbd> / <kbd>Space</kbd> | With `selection`, selects the focused cell. With `selection='multiple'` toggles it in or out of the selection. Disabled cells ignore the key. |
| <kbd>Shift</kbd> + <kbd>↓</kbd> / <kbd>Shift</kbd> + <kbd>→</kbd> | With `selection='range'` and a selected cell, moves the focus and extends the range to the new cell. With `selection='multiple'`, moves the focus and adds the cells from the most recently selected cell, or from the focused one when it is not selected anymore, to the new cell. |
| <kbd>Enter</kbd> / <kbd>F2</kbd> | On a cell or header with interactive content, like an input or a sort button, moves the focus to its first focusable element. Without such content Enter selects the cell as above, and a cell that is itself a button, `<GridCell asChild><button /></GridCell>`, is pressed like a button. |
| <kbd>Escape</kbd> | Inside the cell content, returns the focus to the cell. Other keys pressed inside the content, like the arrows in an input, stay with the content. |
| <kbd>Tab</kbd> / <kbd>Shift</kbd> + <kbd>Tab</kbd> | Moves the focus into the grid on the last active cell and then out of it: the whole grid is one tab stop, and the buttons and inputs inside the cells are skipped. Inside the cell content, moves the focus between the focusable elements of that cell in a loop. |
| <kbd>Ctrl</kbd> + <kbd>A</kbd> | With `selection='multiple'`, selects every enabled cell that is not excluded. Command+A on macOS. A `range` selection has two ends picked by the user, so it does not select all. |
<!-- AUTO-GENERATED:KEYBOARD:end -->

## Focus Behavior

- active-cell movement should remain visible
- interactive content inside cells must not hide the current navigation state
- inputs, buttons, and menus inside a cell have `tabIndex={-1}`, are reached with Enter or F2 and left with Escape, as in the WAI-ARIA grid pattern; Tab on a cell leaves the grid instead of stopping on each of them
- a cell that is itself a single button is `<GridCell asChild><button /></GridCell>`: the focus lands on the button directly, which keeps `role="gridcell"` and is announced as a cell; to have it announced as a button, or for a link, put the control inside the cell with `tabIndex={-1}`
- headers with a button, like a sort button, are reachable like cells; static headers need `excluded`
- with `selection`, test the focus after range expansion and pointer dragging
- with server rendering, the HTML holds the tab stop only when the grid knows it before its cells render: with `cells` always, otherwise the `active` or `defaultActive` cell, or the selected cell of `selection='single'`. Otherwise the grid is not reachable with Tab until it hydrates, so pass `cells` or `defaultActive` to a server-rendered grid
- in a paged grid, a page change must not silently lose the active cell; `GridScroller` moves it to the page in view, so render every page inside `IndexedSnapScrollerContent`

## Screen Reader Semantics

- rows and cells should remain understandable as a grid structure
- `GridColumnHeader` and `GridRowHeader` give the cells their `columnheader` and `rowheader` names; on table elements use them on `th`
- set `aria-sort` on the header of the sorted column
- when only part of the rows is rendered, pass `aria-rowcount` to `Grid` and `aria-rowindex` to each `GridRow` (and `aria-colcount`, `aria-colindex` for columns); the grid passes them through as they are and does not compute them
- `selection='multiple'` follows the recommended selection model of the WAI-ARIA listbox pattern: no key has to be held while moving, a click, Enter or Space toggles a cell, moving the focus keeps the selection, and Shift + arrows add the cells from the most recently selected one to the focused one. A spreadsheet that replaces the selection on every move is a different model
- with `selection='multiple'`, Ctrl+A or Command+A selects every enabled cell that is not excluded; tell users about it near the grid. With `selection='range'` it does nothing: a range has two ends picked by the user, and the WAI-ARIA grid pattern makes select all optional
- custom cell content should not obscure the meaning of the current position
- with `selection` cells get `aria-selected`; with `selection='multiple'` or `'range'` the grid sets `aria-multiselectable="true"` itself, do not pass it by hand
- without `selection` cells have no `aria-selected`, so a plain grid is not announced as selectable
- disabled cells get `aria-disabled` and stay focusable, as the WAI-ARIA grid pattern recommends, so users hear that a cell is unavailable; pass a cell to `exclude` only when it should not be reachable at all

## Accessibility Risks

- using sparse visual layouts without matching exclusion behavior
- leaving the controls inside the cells in the tab sequence, without `tabIndex={-1}`, instead of Enter, F2, and Escape
- leaving static headers focusable without `excluded`
- using `Grid` where semantic `Table` would be clearer
- hiding the selected state visually
