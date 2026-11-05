# DataGrid Accessibility

## Labeling

The grid should appear with surrounding context that explains what the cells represent.

## Keyboard Behavior

<!-- AUTO-GENERATED:KEYBOARD:start -->
| Key | Action |
| --- | --- |
| <kbd>→</kbd> / <kbd>←</kbd> | Moves the focus to the next or previous cell in the row. Follows the text direction: in right-to-left, → moves to the previous cell. Stops at the row edge unless `wrap` is set. |
| <kbd>↓</kbd> / <kbd>↑</kbd> | Moves the focus to the cell below or above in the same column. |
| <kbd>Home</kbd> / <kbd>End</kbd> | Moves the focus to the first or last cell of the row. |
| <kbd>Ctrl</kbd> + <kbd>Home</kbd> / <kbd>Ctrl</kbd> + <kbd>End</kbd> | Moves the focus to the first cell of the first row or the last cell of the last row. |
| <kbd>Page Down</kbd> / <kbd>Page Up</kbd> | Moves the focus to the last or first row in the same column, or by `rowDelta` rows when it is set. |
| <kbd>Tab</kbd> | Moves the focus into the grid on the last active cell and then out of it: the whole grid is one tab stop. |
<!-- AUTO-GENERATED:KEYBOARD:end -->

## Focus Behavior

- active-cell movement should remain visible
- interactive content inside cells must not hide the current navigation state

## Screen Reader Semantics

- rows and cells should remain understandable as a grid structure
- custom cell content should not obscure the meaning of the current position

## Accessibility Risks

- using sparse visual layouts without matching exclusion behavior
- embedding complex controls that steal focus from the grid model
- using `DataGrid` where semantic `Table` would be clearer
