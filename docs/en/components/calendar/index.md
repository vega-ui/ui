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

<!-- example: calendar/minimal-composition.tsx -->
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
  CalendarMonth,
  CalendarMonthLabel,
  CalendarMonths,
  CalendarMonthsGrid,
  CalendarNextButton,
  CalendarPrevButton,
  CalendarViewButton,
  CalendarWeekday,
  CalendarWeekdays,
  CalendarWeeks,
  CalendarYear,
  CalendarYearLabel,
  CalendarYears,
  CalendarYearsGrid,
  CalendarYearsScroller,
  CalendarYearsScrollerContent,
  Icon,
} from '@vega-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@vega-ui/icons';

export const locales = ['en-US', 'ru-RU', 'ar-EG', 'he-IL'];

export default function MinimalComposition({ locale = 'en-US' }: { locale?: string }) {
  return (
    <Calendar locale={locale}>
      <CalendarHeader>
        <CalendarPrevButton square aria-label='Previous month'><Icon><ChevronLeftIcon /></Icon></CalendarPrevButton>
        <CalendarHeading>
          <CalendarViewButton view='month'><CalendarMonthLabel /></CalendarViewButton>
          <CalendarViewButton view='year'><CalendarYearLabel /></CalendarViewButton>
        </CalendarHeading>
        <CalendarNextButton square aria-label='Next month'><Icon><ChevronRightIcon /></Icon></CalendarNextButton>
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
        <CalendarMonths>
          <CalendarMonthsGrid>
            <CalendarMonth />
          </CalendarMonthsGrid>
        </CalendarMonths>
        <CalendarYears>
          <CalendarYearsScroller>
            <CalendarYearsScrollerContent>
              <CalendarYearsGrid>
                <CalendarYear />
              </CalendarYearsGrid>
            </CalendarYearsScrollerContent>
          </CalendarYearsScroller>
        </CalendarYears>
      </CalendarContent>
    </Calendar>
  );
}
```
<!-- /example -->

## Your Own Component

The minimal composition above shows the parts in place. In an app, compose them once in a file of your own, with your icon set, and import that component everywhere. `MyCalendar` passes its props to `Calendar`, value, selection and size included, and names the chevron buttons with `previousLabel` and `nextLabel`, or with `previousYearsLabel` and `nextYearsLabel` while the years are shown. See [Component recipes](../../recipes.md).

<!-- example: calendar/recipe.tsx -->
```tsx
import { useState } from 'react';
import {
  Calendar,
  CalendarContent,
  CalendarDay,
  CalendarDays,
  CalendarDaysScroller,
  CalendarDaysScrollerContent,
  CalendarHeader,
  CalendarHeading,
  CalendarMonth,
  CalendarMonthLabel,
  CalendarMonths,
  CalendarMonthsGrid,
  CalendarNextButton,
  CalendarPrevButton,
  CalendarViewButton,
  CalendarWeekday,
  CalendarWeekdays,
  CalendarWeeks,
  CalendarYear,
  CalendarYearLabel,
  CalendarYears,
  CalendarYearsGrid,
  CalendarYearsScroller,
  CalendarYearsScrollerContent,
  Icon,
  type CalendarProps,
  type CalendarSelection,
  type CalendarView,
} from '@vega-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@vega-ui/icons';

interface MyCalendarProps<SelectionMode extends CalendarSelection = 'single'> extends CalendarProps<SelectionMode> {
  previousLabel: string
  nextLabel: string
  previousYearsLabel: string
  nextYearsLabel: string
}

export function MyCalendar<SelectionMode extends CalendarSelection = 'single'>({
  previousLabel,
  nextLabel,
  previousYearsLabel,
  nextYearsLabel,
  onChangeView,
  ...props
}: MyCalendarProps<SelectionMode>) {
  const [shownView, setShownView] = useState<CalendarView>(props.defaultView ?? 'day');
  const years = (props.view ?? shownView) === 'year';

  const changeView = (view: CalendarView) => {
    onChangeView?.(view);
    setShownView(view);
  };

  return (
    <Calendar {...props} onChangeView={changeView}>
      <CalendarHeader>
        <CalendarPrevButton square aria-label={years ? previousYearsLabel : previousLabel}><Icon><ChevronLeftIcon /></Icon></CalendarPrevButton>
        <CalendarHeading>
          <CalendarViewButton view='month'><CalendarMonthLabel /></CalendarViewButton>
          <CalendarViewButton view='year'><CalendarYearLabel /></CalendarViewButton>
        </CalendarHeading>
        <CalendarNextButton square aria-label={years ? nextYearsLabel : nextLabel}><Icon><ChevronRightIcon /></Icon></CalendarNextButton>
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
        <CalendarMonths>
          <CalendarMonthsGrid>
            <CalendarMonth />
          </CalendarMonthsGrid>
        </CalendarMonths>
        <CalendarYears>
          <CalendarYearsScroller>
            <CalendarYearsScrollerContent>
              <CalendarYearsGrid>
                <CalendarYear />
              </CalendarYearsGrid>
            </CalendarYearsScrollerContent>
          </CalendarYearsScroller>
        </CalendarYears>
      </CalendarContent>
    </Calendar>
  );
}

export default function Recipe() {
  return (
    <MyCalendar
      compact
      locale='en-US'
      defaultValue='2026-11-24'
      previousLabel='Previous month'
      nextLabel='Next month'
      previousYearsLabel='Previous years'
      nextYearsLabel='Next years'
    />
  );
}
```
<!-- /example -->

## Required Parts

- `Calendar`: root state and date-selection model

## Optional Parts

- `CalendarHeader`, `CalendarPrevButton`, `CalendarNextButton`: navigation chrome; previous and next follow the current view
- `CalendarViewButton`: month and year view toggles
- `CalendarHeading`: heading of the shown month that names the day grid; usually wraps the view buttons
- `CalendarMonthLabel`, `CalendarYearLabel`: labels of the month and year of the focused day
- `CalendarContent`: wrapper for the views
- `CalendarDays`, `CalendarMonths`, `CalendarYears`: day, month, and year views
- `CalendarDay`, `CalendarMonth`, `CalendarYear`: cell templates of the views, with `useCalendarDayContext`, `useCalendarMonthContext`, `useCalendarYearContext`

## Composition Order

Typical composition:

1. `Calendar`
2. `CalendarHeader` with `CalendarPrevButton`, `CalendarHeading` around the `CalendarViewButton`s, `CalendarNextButton`
3. `CalendarContent`
4. `CalendarDays`, `CalendarMonths`, `CalendarYears`; only the current `view` is visible, and the month and year views are mounted only while open or closing

## Variants

- Selection: `single`, `multiple`, `range`
- View switching: day, month, year
- Density: `compact` plus size variants
- Composition depth: default views versus custom cell templates
- Locale and calendar system: `locale` and `calendar` root props, defaulting to `"en-US"` and the Gregorian calendar; see [Dates And Calendar Systems](../../i18n.md#locale-and-calendar-props)

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
- `value`, `defaultValue`, `min`, `max`, `focusedDate`, `today`, and `disabledDates` are ISO `YYYY-MM-DD` strings in every calendar system; only the grid and labels follow `calendar`.
- Non-Gregorian calendars come from `createCalendarSystem`; see [Dates And Calendar Systems](../../i18n.md#calendar-system-adapter).

## Common Mistakes

- Forgetting that `selection` changes the expected value model.
- Passing `Date` objects, timestamps, or display-calendar strings instead of ISO `YYYY-MM-DD` strings.
- Reading the day number from the ISO `date` of a cell instead of `label` or `fields.day`; it is wrong in non-Gregorian calendars.
- Combining `min`, `max`, and `disabledDates` without validating the resulting UX.
