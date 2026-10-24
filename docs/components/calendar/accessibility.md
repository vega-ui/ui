# Calendar Accessibility

## Labeling

The calendar should have a clear visible context such as a field label, heading, or surrounding form copy.

## Keyboard Behavior

The day grid follows the WAI-ARIA date picker pattern:

| Key | Action |
| --- | --- |
| `ArrowLeft` / `ArrowRight` | Previous / next day. |
| `ArrowUp` / `ArrowDown` | Same weekday of the previous / next week. |
| `Home` / `End` | First / last day of the week row. |
| `PageUp` / `PageDown` | Same day of the previous / next month. |
| `Shift+PageUp` / `Shift+PageDown` | Same day of the previous / next year. |
| `Enter` / `Space` | Select the focused day. |

- In a right-to-left context `ArrowLeft` / `ArrowRight` are mirrored, see [Right-To-Left](#right-to-left).
- Month and year jumps clamp the day to the length of the target month, skip unavailable days, and stay within `min` / `max`.
- Navigation only moves focus; the value changes when a day is picked.
- users should be able to move through dates and the day, month, and year views from the keyboard
- month and year switching should remain reachable without pointer-only controls
- `Escape` in the month or year view goes back to the days without changing the month
- excluded or disabled dates should not behave like normal selectable dates

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
