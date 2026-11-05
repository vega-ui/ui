# DataGridSelectable Accessibility

## Labeling

- The grid should have an external label or surrounding context that explains the selection task.
- Cell labels should remain meaningful when read individually.

## Keyboard Behavior

<!-- AUTO-GENERATED:KEYBOARD:start -->
| Key | Action |
| --- | --- |
| <kbd>Enter</kbd> / <kbd>Space</kbd> | Selects the focused cell. With `selection='multiple'` toggles it in or out of the selection. Disabled cells ignore the key. |
| <kbd>→</kbd> / <kbd>←</kbd> / <kbd>↓</kbd> / <kbd>↑</kbd> | Move the focus between cells as in `DataGrid`. Disabled cells are skipped unless `excludeDisabled` is `false`. |
| <kbd>Home</kbd> / <kbd>End</kbd> / <kbd>Page Down</kbd> / <kbd>Page Up</kbd> | Move the focus to the first or last enabled cell of the row, or to the last or first row of the column, as in `DataGrid`. |
| <kbd>Shift</kbd> + <kbd>↓</kbd> / <kbd>Shift</kbd> + <kbd>→</kbd> | With `selection='range'` and a selected cell, moves the focus and extends the range to the new cell. `expandable={false}` turns it off. |
<!-- AUTO-GENERATED:KEYBOARD:end -->

## Focus Behavior

- One cell is active at a time.
- Disabled or excluded cells should not become the active destination when product rules forbid them.
- Real flows should test focus after range expansion and pointer dragging.

## Screen Reader Semantics

- The final semantics depend on the composed grid and cell layer.
- Higher-level consumers should preserve clear announcements for active, selected, and unavailable cells.

## Accessibility Risks

- hiding active or selected state visually
- using unstable cell labels that make grid navigation confusing
- shipping a dense selection matrix without contextual instructions
