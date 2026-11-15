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
| <kbd>Page Up</kbd> / <kbd>Page Down</kbd> | Inside `YearPickerScroller`: move the focus to the same place on the previous or next page of years (`period` years, 12 by default), beyond the rendered pages too; the scroller follows the focus. |
| <kbd>Ctrl</kbd> + <kbd>Home</kbd> / <kbd>Ctrl</kbd> + <kbd>End</kbd> | Inside `YearPickerScroller`: move the focus to the first or last year of the page in view, not of the rendered pages. |
| <kbd>Enter</kbd> / <kbd>Space</kbd> | Selects the focused year. |
<!-- AUTO-GENERATED:KEYBOARD:end -->

- Keyboard behavior is inherited from `Grid` and the year-grid items.

## Focus Behavior

- The picker shows the page of the focused year (`focusedDate`). The tab stop is the focused year when it can be focused; otherwise the selected year or the current year; otherwise the first available year, so it is always on the page in view
- Inside `YearPickerScroller`, Page Up and Page Down move the focus by one page of years, and scrolling to another page moves the focus to the same place on it
- Focus should remain visible as the year grid pages across larger ranges.

## Screen Reader Semantics

- Large year ranges are easier to understand when the visible decade/range is announced clearly in nearby text or picker labels.
- In `multiple` and `range` selection the grid has `aria-multiselectable="true"`.

## Form Semantics

- `YearPicker` is a picker subsystem, not native form input.

## Accessibility Risks

- paged year ranges with no clear visible range context
- custom layouts that obscure active, selected, or disabled states
