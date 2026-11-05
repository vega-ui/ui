# Calendar Accessibility

## Labeling

The calendar should have a clear visible context such as a field label, heading, or surrounding form copy.

## Keyboard Behavior

<!-- AUTO-GENERATED:KEYBOARD:start -->
| Key | Action |
| --- | --- |
| <kbd>Tab</kbd> | Moves the focus into the day grid: onto the selected day when it is in the visible month, otherwise onto today or the first available day. Only one day is in the tab order. |
| <kbd>←</kbd> / <kbd>→</kbd> | Moves the focus to the previous or next day, across weeks and months; the visible month follows. In RTL the arrows are mirrored: ← moves to the next day. |
| <kbd>↑</kbd> / <kbd>↓</kbd> | Moves the focus to the same weekday of the previous or next week. |
| <kbd>Home</kbd> / <kbd>End</kbd> | Moves the focus to the first or last day of the week. |
| <kbd>Page Up</kbd> / <kbd>Page Down</kbd> | Shows the previous or next month and moves the focus to the same day in it. |
| <kbd>Enter</kbd> / <kbd>Space</kbd> | Selects the focused day. On a header button: Previous and Next change the month, the month and year buttons open their views. |
| <kbd>Enter</kbd> | In the month or year view: picks the focused month or year and returns to the days, keeping the day of the month. The arrows, Home and End move between months or years. |
| <kbd>Escape</kbd> | In the month or year view: returns to the days without changing the month and focuses the active day. |
<!-- AUTO-GENERATED:KEYBOARD:end -->

- Month jumps clamp the day to the length of the target month, skip unavailable days, and stay within `min` / `max`.
- Navigation only moves focus; the value changes when a day is picked.
- Excluded or disabled dates are skipped by the arrows and cannot be picked.

## Focus Behavior

- each grid has one tab stop, the active cell, and it follows the visible month, year or page, so Tab always lands on a cell in view
- focus should remain predictable when switching between day, month, and year views
- custom day templates should render `CalendarDay` to preserve visible focus states

## Right-To-Left

The calendar follows the inherited text direction, like native elements, and never derives it from `locale`. Set `dir='rtl'` on `<html>`, on an ancestor, or on the `Calendar` root. Then:

- the weeks run from right to left, starting with the first day of the week on the right
- `ArrowRight` moves to the previous day and `ArrowLeft` to the next day
- the next month is on the left: swiping to the left and `CalendarNextButton` show it, and the default chevrons are mirrored

## Screen Reader Semantics

- visible month and year context should remain understandable
- `CalendarViewButton` exposes its state with `aria-pressed` while its view is shown
- `CalendarPrevButton` and `CalendarNextButton` render a chevron only, so give them an `aria-label`
- `Calendar` sets `lang` on its root when `locale` is passed, so screen readers pronounce month and day names in that language
- custom day content should still read like one selectable date cell

## Form Semantics

When the calendar is used inside field-like wrappers, retest how selection state is surfaced back to the containing field.

## Accessibility Risks

- custom date-cell content that hides the date meaning
- disabled and excluded dates that still appear selectable
- custom cell templates that weaken keyboard navigation
