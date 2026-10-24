# Calendar Anatomy

## Overview

`Calendar` owns the visible month, the current view, selection state, disabled-date rules, locale and calendar system, and keyboard coordination across the day, month, and year views.

## Required Parts

### `Calendar`

Root provider for the date-selection model.

- Required: yes
- Owns: view state, visible month, selection state, disabled-date logic, `locale` and `calendar`

## Optional Parts

### `CalendarHeader`

Header wrapper for navigation and view switching.

### `CalendarPrevButton` / `CalendarNextButton`

Show the previous or next page of the current view: the previous or next month in the days, the previous or next page of years in the years. Hidden in the months view, and in the days when the previous or next month is outside `min` / `max`.

### `CalendarViewButtonGroup`

Keeps the view buttons together between the previous and next buttons.

### `CalendarViewButton`

`view='month'` or `view='year'` toggles that view; pressing it again goes back to the days. It is pressed (`aria-pressed`) while its view is shown.

### `CalendarMonthLabel` / `CalendarYearLabel`

Visible month and year in the locale and calendar system of the root.

### `CalendarContent`

Main content wrapper for the views.

### `CalendarDays`

Day view. Its children are `CalendarWeekdays` and `CalendarWeeks`.

### `CalendarWeekdays`

Row of weekday names in the locale of the root, starting on the first day of its week. Prop: `format` (`'long' | 'short' | 'narrow'`, default `'short'`). Its required children are the template of a weekday, usually `<CalendarWeekday />`; read the weekday with `useCalendarWeekdayContext()`.

### `CalendarWeeks`

Day grid, week by week, swipeable between months. Props: `format`, `includeOverflowDays`.

### `CalendarMonths`

Month view: the months of the visible year, 12 or 13 depending on the calendar system. Props: `cols`, `format`.

### `CalendarYears`

Year view: pages of years, swipeable. Prop: `format`.

### `CalendarDay` / `CalendarMonth` / `CalendarYear`

Cell templates. Children of `CalendarWeeks`, `CalendarMonths`, and `CalendarYears` are required and rendered once per cell inside a cell context; usually `<CalendarDay />`, `<CalendarMonth />`, or `<CalendarYear />`, which shows the formatted label. Read the cell with `useCalendarDayContext()`, `useCalendarMonthContext()`, or `useCalendarYearContext()`.

## Composition Order

Typical composition:

1. `Calendar`
2. `CalendarHeader` with navigation buttons and view buttons
3. `CalendarContent`
4. `CalendarDays`, `CalendarMonths`, `CalendarYears`; only the current view is visible

## Valid Composition Patterns

```tsx
<Calendar>
  <CalendarHeader>
    <CalendarPrevButton aria-label='Previous' />
    <CalendarViewButtonGroup>
      <CalendarViewButton view='month'>
        <CalendarMonthLabel />
      </CalendarViewButton>
      <CalendarViewButton view='year'>
        <CalendarYearLabel />
      </CalendarViewButton>
    </CalendarViewButtonGroup>
    <CalendarNextButton aria-label='Next' />
  </CalendarHeader>
  <CalendarContent>
    <CalendarDays>
      <CalendarWeekdays>
        <CalendarWeekday />
      </CalendarWeekdays>
      <CalendarWeeks>
        <CalendarDay />
      </CalendarWeeks>
    </CalendarDays>
    <CalendarMonths>
      <CalendarMonth />
    </CalendarMonths>
    <CalendarYears>
      <CalendarYear />
    </CalendarYears>
  </CalendarContent>
</Calendar>
```

## Invalid Composition Patterns

### View parts outside `Calendar`

The views and cell templates rely on root context. Moving them outside `Calendar` breaks coordination.

### Custom cell templates without `CalendarDay`

A template must render `CalendarDay` (or `CalendarMonth`, `CalendarYear`) as the cell; content goes inside it. Without it the grid loses selection, focus, and disabled states.

### Treating day, month, and year views as isolated widgets

They are coordinated views of the same calendar state model, not unrelated components.
