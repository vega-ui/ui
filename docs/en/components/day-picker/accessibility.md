# DayPicker Accessibility

## Labeling

- The surrounding calendar surface should explain what month and year the user is currently viewing.

## Keyboard Behavior

<!-- AUTO-GENERATED:KEYBOARD:start -->
| Key | Action |
| --- | --- |
| <kbd>←</kbd> / <kbd>→</kbd> | Moves the focus to the previous or next day, crossing into the neighbouring week or month and skipping unavailable days. In RTL the arrows are mirrored: ← moves to the next day. |
| <kbd>↑</kbd> / <kbd>↓</kbd> | Moves the focus to the same weekday of the previous or next week, crossing into the neighbouring month and skipping unavailable days. |
| <kbd>Home</kbd> / <kbd>End</kbd> | Moves the focus to the first or last day of the week. |
| <kbd>Ctrl</kbd> + <kbd>Home</kbd> / <kbd>Ctrl</kbd> + <kbd>End</kbd> | Moves the focus to the first or last day of the month. |
| <kbd>Page Up</kbd> / <kbd>Page Down</kbd> | Moves the focus to the same day of the previous or next month and shows that month. A day the month does not have moves to its last day, an unavailable day to the nearest available one. |
| <kbd>Shift</kbd> + <kbd>Page Up</kbd> / <kbd>Shift</kbd> + <kbd>Page Down</kbd> | Moves the focus to the same day and month of the previous or next year. February 29 moves to February 28 in a common year. |
| <kbd>Enter</kbd> / <kbd>Space</kbd> | Selects the focused day. |
<!-- AUTO-GENERATED:KEYBOARD:end -->

- Keyboard navigation follows the WAI-ARIA date picker pattern: arrows, Page Up / Page Down and Shift + Page Up / Page Down cross months and years, and the grid shows the month of the focused day.
- Cell semantics, selection and Enter / Space come from `Grid`.

## Focus Behavior

- The tab stop is the focused day (`focusedDate` / `defaultFocusedDate`) when it can be focused; otherwise the selected day or today in the shown month; otherwise the first available day of the month.
- Without a focused date the picker starts on the first selected day, otherwise on today.
- Moving to another month is a change of the focused day: `onChangeFocusedDate` reports it, so a controlled `focusedDate` and a custom header stay in sync.
- Focus and active cell behavior should remain visible across selected, excluded, and disabled dates.

## Screen Reader Semantics

- Grid roles and state semantics come from the underlying picker/grid primitives; in `multiple` and `range` selection the grid has `aria-multiselectable="true"`.
- Today has `aria-current="date"`. Without `today` it is read from the device after hydration, so it appears after the first client render.
- Weekday labels and period labels should stay synchronized with the rendered month.

## Form Semantics

- `DayPicker` is a picker subsystem, not native form input by itself.

## Accessibility Risks

- custom day rendering that hides focus or selection state
- scrollable month paging with unclear period announcements
