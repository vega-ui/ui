# DayPicker Accessibility

## Labeling

- The surrounding calendar surface should explain what month and year the user is currently viewing.

## Keyboard Behavior

<!-- AUTO-GENERATED:KEYBOARD:start -->
| Key | Action |
| --- | --- |
| <kbd>←</kbd> / <kbd>→</kbd> | Moves the focus to the previous or next day, wrapping to the neighbouring week and skipping disabled days. In RTL the arrows are mirrored: ← moves to the next day. |
| <kbd>↑</kbd> / <kbd>↓</kbd> | Moves the focus to the same weekday of the previous or next week, stopping at the edge of the month. |
| <kbd>Home</kbd> / <kbd>End</kbd> | Moves the focus to the first or last day of the week. |
| <kbd>Ctrl</kbd> + <kbd>Home</kbd> / <kbd>Ctrl</kbd> + <kbd>End</kbd> | Moves the focus to the first or last day of the month. |
| <kbd>Page Up</kbd> / <kbd>Page Down</kbd> | Moves the focus to the same weekday in the first or last week of the month. The month itself does not change: paging months belongs to Calendar. |
| <kbd>Enter</kbd> / <kbd>Space</kbd> | Selects the focused day. |
<!-- AUTO-GENERATED:KEYBOARD:end -->

- Keyboard navigation is inherited from `DataGridPicker` and the grid item semantics.

## Focus Behavior

- Without `defaultActive`, the tab stop is today when it is in the visible month, otherwise the first selected day in it, otherwise its first day; when you change `month` later, pass `active` / `onChangeActive` to keep the tab stop in view
- Focus and active cell behavior should remain visible across selected, excluded, and disabled dates.

## Screen Reader Semantics

- Grid roles and state semantics come from the underlying picker/grid primitives.
- Weekday labels and period labels should stay synchronized with the rendered month.

## Form Semantics

- `DayPicker` is a picker subsystem, not native form input by itself.

## Accessibility Risks

- custom day rendering that hides focus or selection state
- scrollable month paging with unclear period announcements
