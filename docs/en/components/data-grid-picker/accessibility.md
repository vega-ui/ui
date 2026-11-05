# DataGridPicker Accessibility

## Labeling

- The picker should have a visible label or contextual heading that explains the choice set.
- Item content should be meaningful when announced one cell at a time.

## Keyboard Behavior

<!-- AUTO-GENERATED:KEYBOARD:start -->
| Key | Action |
| --- | --- |
| <kbd>Enter</kbd> / <kbd>Space</kbd> | Selects the focused item. |
| <kbd>→</kbd> / <kbd>←</kbd> | Moves the focus to the next or previous item, wrapping across rows by default (`wrap='horizontal'`). Follows the text direction: in right-to-left, → moves to the previous item. |
| <kbd>↓</kbd> / <kbd>↑</kbd> | Moves the focus to the item below or above. |
| <kbd>Home</kbd> / <kbd>End</kbd> / <kbd>Page Up</kbd> / <kbd>Page Down</kbd> | Move the focus to the first or last item of the row, or to the first or last row of the column, as in `DataGrid`. |
<!-- AUTO-GENERATED:KEYBOARD:end -->

- Wrapped navigation and range selection should be tested in the actual picker shape.
- Paged scroller pickers should preserve predictable focus after page changes.

## Focus Behavior

- One item is active at a time.
- Focus should remain visually visible even when the picker is dense.
- Page changes in scroller mode should not silently lose the active cell context.

## Screen Reader Semantics

- Announcements depend on the final item content and the grid semantics provided by the composed picker parts.
- Domain-specific wrappers such as `DayPicker` should add stronger date semantics where needed.

## Accessibility Risks

- dense grids without surrounding instructions
- page changes that hide the active context
- custom item rendering that removes the visible selected or disabled state
