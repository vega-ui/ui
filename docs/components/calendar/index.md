# Calendar

## Doc Profile

`advanced interactive`

## Summary

`Calendar` is an [advanced interactive](../structure.md#advanced-interactive) [compound component](../../glossary.md#compound-component) for coordinated date selection across day, month, and year views. It is the consumer-facing orchestration layer on top of the lower-level picker family.

## Imports

```tsx
import {
  Calendar,
  type CalendarProps,
  type CalendarView,
  type CalendarSelection,
  type CalendarDatesDisabled,
} from '@vega-ui/react';
```

## Exported Types

- `CalendarProps`
- `CalendarView`
- `CalendarSelection`
- `CalendarDatesDisabled`

## Minimal Composition

```tsx
<Calendar selection='single'>
  <CalendarHeader>
    <CalendarPrevButton aria-label='Previous' />
    <CalendarViewButtonGroup>
      <CalendarViewButton view='month'><CalendarMonthLabel /></CalendarViewButton>
      <CalendarViewButton view='year'><CalendarYearLabel /></CalendarViewButton>
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

## Required Parts

- `Calendar`: root state and date-selection model

## Optional Parts

- `CalendarHeader`, `CalendarPrevButton`, `CalendarNextButton`: navigation chrome; previous and next follow the current view
- `CalendarViewButtonGroup`, `CalendarViewButton`: month and year view toggles
- `CalendarMonthLabel`, `CalendarYearLabel`: labels of the visible month and year
- `CalendarContent`: wrapper for the views
- `CalendarDays`, `CalendarMonths`, `CalendarYears`: day, month, and year views
- `CalendarDay`, `CalendarMonth`, `CalendarYear`: cell templates of the views, with `useCalendarDayContext`, `useCalendarMonthContext`, `useCalendarYearContext`

## Composition Order

Typical composition:

1. `Calendar`
2. `CalendarHeader` with `CalendarPrevButton`, `CalendarViewButtonGroup`, `CalendarNextButton`
3. `CalendarContent`
4. `CalendarDays`, `CalendarMonths`, `CalendarYears`; only the current `view` is visible

## Variants

- Selection: `single`, `multiple`, `range`
- View switching: day, month, year
- Density: `compact` plus size variants
- Composition depth: default views versus custom cell templates
- Locale and calendar system: `locale` and `calendar` root props, defaulting to the runtime locale and the Gregorian calendar; see [Dates And Calendar Systems](../../i18n.md#locale-and-calendar-props)

## Related Docs

- [Anatomy](./anatomy.md)
- [Examples](./examples.md)
- [Patterns](./patterns.md)
- [API](./api.md)
- [Styling](./styling.md)
- [Accessibility](./accessibility.md)
- [Comparison](./comparison.md)
- [Troubleshooting](./troubleshooting.md)

## Edge Cases

- Selection mode changes the value shape.
- Disabled-date constraints can come from a value list or predicate logic.
- Custom cell templates should be retested for keyboard flow, overflow days, and visible period changes.
- `value`, `defaultValue`, `min`, `max`, `month`, and `disabledDates` are ISO `YYYY-MM-DD` strings in every calendar system; only the grid and labels follow `calendar`.
- Non-Gregorian calendars come from `createCalendarSystem`; see [Dates And Calendar Systems](../../i18n.md#calendar-system-adapter).

## Common Mistakes

- Forgetting that `selection` changes the expected value model.
- Passing `Date` objects, timestamps, or display-calendar strings instead of ISO `YYYY-MM-DD` strings.
- Reading the day number from the ISO `date` of a cell instead of `label` or `fields.day`; it is wrong in non-Gregorian calendars.
- Combining `min`, `max`, and `disabledDates` without validating the resulting UX.
