# YearPicker Accessibility

## Labeling

- The surrounding UI should explain what broader period the year grid represents.

## Keyboard Behavior

<!-- AUTO-GENERATED:KEYBOARD:start -->
| Key | Action |
| --- | --- |
| <kbd>←</kbd> / <kbd>→</kbd> | Moves the focus to the previous or next year, wrapping to the neighbouring row. In RTL the arrows are mirrored: ← moves to the next year. |
| <kbd>↑</kbd> / <kbd>↓</kbd> | Moves the focus to the year above or below in the same column. |
| <kbd>Home</kbd> / <kbd>End</kbd> | Moves the focus to the first or last year of the row. |
| <kbd>Page Up</kbd> / <kbd>Page Down</kbd> / <kbd>Ctrl</kbd> + <kbd>Home</kbd> / <kbd>Ctrl</kbd> + <kbd>End</kbd> | In a `YearPickerLayout` page: Page Up and Page Down move the focus to the first or last row in the same column; Ctrl + Home and Ctrl + End to the first or last year. |
| <kbd>Enter</kbd> / <kbd>Space</kbd> | Selects the focused year. |
<!-- AUTO-GENERATED:KEYBOARD:end -->

- Keyboard behavior is inherited from `DataGridPicker` and the year-grid items.

## Focus Behavior

- Without `defaultActive`, the tab stop is the visible `year`, which is always on the page in view
- Focus should remain visible as the year grid pages across larger ranges.

## Screen Reader Semantics

- Large year ranges are easier to understand when the visible decade/range is announced clearly in nearby text or picker labels.

## Form Semantics

- `YearPicker` is a picker subsystem, not native form input.

## Accessibility Risks

- paged year ranges with no clear visible range context
- custom layouts that obscure active, selected, or disabled states
