# Calendar Accessibility

## Labeling

Put a `CalendarHeading` in the header: it is an `<h2>` with the shown month, and `CalendarDays` gets `aria-labelledby` pointing to it, so the day grid is announced with its month. It is `aria-live="polite"`, so screen readers announce the new month after Previous, Next or a month jump. To name the grid by its purpose instead ("Pickup date"), pass `aria-label` or `aria-labelledby` to `CalendarDays`; your value wins.

A day cell is named by its number; the grid name and the weekday column add the month and the day of the week. To announce the full date on every cell, render a day template with its own `aria-label` in place of `CalendarDay` inside `CalendarWeeks`, defined outside of render:

```tsx
import { CalendarDay, useCalendarContext, useCalendarDayContext } from '@vega-ui/react';
import { formatCalendarDate } from '@vega-ui/i18n';

function NamedDay() {
  const { date } = useCalendarDayContext();
  const { calendar, locale } = useCalendarContext();

  if (date === undefined) return <CalendarDay />;

  return <CalendarDay aria-label={formatCalendarDate(calendar, date, locale, { dateStyle: 'full' })} />;
}
```

## Keyboard Behavior

<!-- AUTO-GENERATED:KEYBOARD:start -->
| Key | Action |
| --- | --- |
| <kbd>Tab</kbd> | Moves the focus into the day grid, onto the focused day when it is available; otherwise onto the selected day or today in the shown month, otherwise onto the first available day. Only one day is in the tab order. |
| <kbd>←</kbd> / <kbd>→</kbd> | Moves the focus to the previous or next day, across weeks and months; the shown month follows. In RTL the arrows are mirrored: ← moves to the next day. |
| <kbd>↑</kbd> / <kbd>↓</kbd> | Moves the focus to the same weekday of the previous or next week, skipping unavailable days. |
| <kbd>Home</kbd> / <kbd>End</kbd> | Moves the focus to the first or last day of the week. |
| <kbd>Ctrl</kbd> + <kbd>Home</kbd> / <kbd>Ctrl</kbd> + <kbd>End</kbd> | Moves the focus to the first or last day of the month. |
| <kbd>Page Up</kbd> / <kbd>Page Down</kbd> | Moves the focus to the same day of the previous or next month, clamped to the length of that month; the shown month follows. |
| <kbd>Shift</kbd> + <kbd>Page Up</kbd> / <kbd>Shift</kbd> + <kbd>Page Down</kbd> | Moves the focus to the same day and month of the previous or next year; February 29 becomes February 28. |
| <kbd>Enter</kbd> / <kbd>Space</kbd> | Selects the focused day. On a header button: Previous and Next move the focused day to the previous or next month and keep the focus on the button; the month and year buttons open their views and focus their tab stop. |
| <kbd>Enter</kbd> | In the month or year view: picks the focused month or year and returns to the days, keeping the day of the month. The arrows, Home and End move between months or years. |
| <kbd>Escape</kbd> | In the month or year view: returns to the days without changing the month and focuses the day tab stop. |
<!-- AUTO-GENERATED:KEYBOARD:end -->

- Month and year jumps clamp the day to the length of the target month (February 29 becomes February 28), move to the nearest available day, and stay within `min` / `max`.
- Navigation only moves focus; the value changes when a day is picked.
- Excluded or disabled dates are skipped by the arrows and cannot be picked.

## Focus Behavior

- each grid has one tab stop: the focused day when it is available; otherwise the selected day or today in the shown month, otherwise the first available day. Tab always lands on a cell in view
- Previous and Next keep the focus on the button while the focused day moves to the same day of the other month
- opening the month or year view focuses its tab stop; picking a month or a year, or Escape, returns to the days and focuses the day tab stop
- the month and year views are not mounted while closed and are inert while they close, and the day view is inert while they are open, so hidden cells are never reachable
- custom day templates should render `CalendarDay` to preserve visible focus states

## Right-To-Left

The calendar follows the inherited text direction, like native elements, and never derives it from `locale`. Set `dir='rtl'` on `<html>`, on an ancestor, or on the `Calendar` root. Then:

- the weeks run from right to left, starting with the first day of the week on the right
- `ArrowRight` moves to the previous day and `ArrowLeft` to the next day
- the next month is on the left: swiping to the left and `CalendarNextButton` show it, and an icon inside `CalendarPrevButton` and `CalendarNextButton` is mirrored

## Screen Reader Semantics

- `CalendarHeading` names the day grid and announces month changes politely
- today is marked with `aria-current="date"`
- the day grid sets `aria-multiselectable="true"` in `multiple` and `range` selection
- `CalendarViewButton` exposes its state with `aria-pressed` while its view is shown
- `CalendarPrevButton` and `CalendarNextButton` have no name of their own: a button with only a chevron and `square` needs an `aria-label`, like "Previous month"
- `Calendar` sets `lang` on its root when `locale` is passed, so screen readers pronounce month and day names in that language
- custom day content should still read like one selectable date cell

## Form Semantics

When the calendar is used inside field-like wrappers, retest how selection state is surfaced back to the containing field.

## Accessibility Risks

- custom date-cell content that hides the date meaning
- disabled and excluded dates that still appear selectable
- custom cell templates that weaken keyboard navigation
