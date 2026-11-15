# Calendar Anatomy

## Overview

`Calendar` owns the focused day (and with it the shown month), the current view, selection state, disabled-date rules, locale and calendar system, and keyboard coordination across the day, month, and year views.

## Required Parts

### `Calendar`

Root provider for the date-selection model.

- Required: yes
- Owns: view state, focused day, selection state, disabled-date logic, `locale` and `calendar`

## Optional Parts

### `CalendarHeader`

Header wrapper for navigation and view switching.

### `CalendarPrevButton` / `CalendarNextButton`

Show the previous or next page of the current view. In the days they move the focused day to the same day of the previous or next month, and the focus stays on the button; in the years they show the previous or next page of years. Hidden in the months view, and in the days when the previous or next month is outside `min` / `max`.

### `CalendarHeading`

Heading of the shown month, an `<h2 aria-live="polite">` by default; `as` picks another heading level to fit the outline of the page. It names the day grid: `CalendarDays` gets `aria-labelledby` pointing to it, unless you pass your own `aria-label` or `aria-labelledby`. Usually it wraps the `CalendarViewButton`s, so they are the visible month and year; without children it shows the month and the year.

### `CalendarViewButton`

`view='month'` or `view='year'` toggles that view; pressing it again goes back to the days. It is pressed (`aria-pressed`) while its view is shown.

### `CalendarMonthLabel` / `CalendarYearLabel`

Month and year of the focused day in the locale and calendar system of the root.

### `CalendarContent`

Main content wrapper for the views.

### `CalendarDays`

Day view. Its children are `CalendarWeekdays` and `CalendarWeeks`, or `CalendarDaysScroller` with pages of `CalendarWeeks`. It stays mounted (inert) while the month or year view is open, so the calendar keeps its size.

### `CalendarWeekdays`

Row of weekday names in the locale of the root, starting on the first day of its week. Prop: `format` (`'long' | 'short' | 'narrow'`, default `'short'`). Its required children are the template of a weekday, usually `<CalendarWeekday />`; read the weekday with `useCalendarWeekdayContext()`.

### `CalendarDaysScroller` / `CalendarDaysScrollerContent`

Optional swiping between months: the scroller holds a `CalendarDaysScrollerContent` per month, and swiping to a month moves the focused day to the same day there. The previous and next buttons scroll it. Prop of the scroller: `onChangePeriod`. Without the scroller the days show only the month of the focused day and the buttons switch it at once.

### `CalendarWeeks`

Day grid of a month, week by week: inside `CalendarDaysScrollerContent` the month of the page, right in `CalendarDays` the month of the focused day. Props: `format`, `includeOverflowDays`.

### `CalendarMonths` / `CalendarMonthsGrid`

Month view: the months of the year of the focused day, 12 or 13 depending on the calendar system. Mounted while the view is open and until its exit transition ends. `CalendarMonthsGrid` lays them out; props: `cols`, `format`.

### `CalendarYears` / `CalendarYearsScroller` / `CalendarYearsScrollerContent` / `CalendarYearsGrid`

Year view: pages of 12 years. Mounted while the view is open and until its exit transition ends. `CalendarYearsGrid` lays out a page (prop: `format`); inside `CalendarYearsScroller` and `CalendarYearsScrollerContent` the pages are swipeable, right in `CalendarYears` it shows the page of the focused year and the buttons switch pages at once.

### `CalendarDay` / `CalendarMonth` / `CalendarYear`

Cell templates. Children of `CalendarWeeks`, `CalendarMonthsGrid`, and `CalendarYearsGrid` are required and rendered once per cell inside a cell context; usually `<CalendarDay />`, `<CalendarMonth />`, or `<CalendarYear />`, which shows the formatted label. Read the cell with `useCalendarDayContext()`, `useCalendarMonthContext()`, or `useCalendarYearContext()`.

## Composition Order

Typical composition:

1. `Calendar`
2. `CalendarHeader` with the navigation buttons and `CalendarHeading`, which wraps the view buttons
3. `CalendarContent`
4. `CalendarDays`, `CalendarMonths`, `CalendarYears`; only the current view is visible, and the month and year views are mounted only while open or closing

## Valid Composition Patterns

The month and year views are optional. A day-only calendar keeps `CalendarDays` alone in `CalendarContent` and shows the month and year as text inside `CalendarHeading` between the navigation buttons; without `CalendarMonths` and `CalendarYears` there is nothing for a `CalendarViewButton` to open, so leave it out. The full composition is in [Minimal Composition](./index.md#minimal-composition).

<!-- example: calendar/valid-composition-patterns.tsx -->
```tsx
import {
  Calendar,
  CalendarContent,
  CalendarDay,
  CalendarDays,
  CalendarDaysScroller,
  CalendarDaysScrollerContent,
  CalendarHeader,
  CalendarHeading,
  CalendarMonthLabel,
  CalendarNextButton,
  CalendarPrevButton,
  CalendarWeekday,
  CalendarWeekdays,
  CalendarWeeks,
  CalendarYearLabel,
  Text,
} from '@vega-ui/react';

export default function ValidCompositionPatterns() {
  return (
    <Calendar locale='en-US'>
      <CalendarHeader>
        <CalendarPrevButton aria-label='Previous month' />
        <CalendarHeading>
          <Text fontWeight={600}>
            <CalendarMonthLabel /> <CalendarYearLabel />
          </Text>
        </CalendarHeading>
        <CalendarNextButton aria-label='Next month' />
      </CalendarHeader>
      <CalendarContent>
        <CalendarDays>
          <CalendarWeekdays>
            <CalendarWeekday />
          </CalendarWeekdays>
          <CalendarDaysScroller>
            <CalendarDaysScrollerContent>
              <CalendarWeeks>
                <CalendarDay />
              </CalendarWeeks>
            </CalendarDaysScrollerContent>
          </CalendarDaysScroller>
        </CalendarDays>
      </CalendarContent>
    </Calendar>
  );
}
```
<!-- /example -->

## Invalid Composition Patterns

### View parts outside `Calendar`

The views and cell templates rely on root context. Moving them outside `Calendar` breaks coordination.

### Custom cell templates without `CalendarDay`

A template must render `CalendarDay` (or `CalendarMonth`, `CalendarYear`) as the cell; content goes inside it. Without it the grid loses selection, focus, and disabled states.

### Treating day, month, and year views as isolated widgets

They are coordinated views of the same calendar state model, not unrelated components.
