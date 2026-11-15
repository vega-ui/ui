# MonthPicker Accessibility

## Labeling

- The surrounding UI should explain what year or broader period the month grid applies to.

## Keyboard Behavior

<!-- AUTO-GENERATED:KEYBOARD:start -->
| Key | Action |
| --- | --- |
| <kbd>←</kbd> / <kbd>→</kbd> | Moves the focus to the previous or next month, wrapping to the neighbouring row. In RTL the arrows are mirrored: ← moves to the next month. |
| <kbd>↑</kbd> / <kbd>↓</kbd> | Moves the focus to the month above or below in the same column. |
| <kbd>Home</kbd> / <kbd>End</kbd> | Moves the focus to the first or last month of the row. |
| <kbd>Page Up</kbd> / <kbd>Page Down</kbd> / <kbd>Ctrl</kbd> + <kbd>Home</kbd> / <kbd>Ctrl</kbd> + <kbd>End</kbd> | Page Up and Page Down move the focus to the first or last row in the same column; Ctrl + Home and Ctrl + End to the first or last month. |
| <kbd>Enter</kbd> / <kbd>Space</kbd> | Selects the focused month. |
<!-- AUTO-GENERATED:KEYBOARD:end -->

- Keyboard behavior is inherited from `Grid` and the month-item grid primitives.

## Focus Behavior

- The picker shows the year of the focused month (`focusedDate`). The tab stop is the focused month when it can be focused; otherwise the selected month or the current month in that year; otherwise its first available month
- Focus should remain visible on the current month item, including custom layouts.

## Screen Reader Semantics

- Month labels should be localized consistently with the rest of the app.
- In `multiple` and `range` selection the grid has `aria-multiselectable="true"`.

## Form Semantics

- `MonthPicker` is a picker subsystem, not native form input.

## Accessibility Risks

- hardcoded locale-specific labels
- custom layouts that obscure active, selected, or disabled state
