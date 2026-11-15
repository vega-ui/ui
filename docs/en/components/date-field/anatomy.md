# DateField Anatomy

## Overview

`DateField` is a [compound component](../../glossary.md#compound-component) that coordinates typed date entry, optional calendar selection, and shared field state under one root.

## Required Parts

### `DateField`

Required. Owns date parsing, formatting, disabled-date rules, and shared field state.

### `DateFieldInput`

Required. Provides the typed date input surface.

## Optional Parts

### `DateFieldTriggerIconButton`

Optional trigger affordance for opening a calendar overlay.

### `DateFieldCalendar`

Optional visual date picker that should usually be mounted inside `Popover`.

Its children are the `Calendar` parts: `CalendarHeader` with `CalendarPrevButton`, `CalendarHeading` with `CalendarViewButton view='month'` and `view='year'`, and `CalendarNextButton`, then `CalendarContent` with `CalendarDays`, `CalendarMonths`, and `CalendarYears`. The calendar takes `locale` and `calendar` from `DateField`.

## Composition Order

1. `DateField`
2. `DateFieldInput`
3. `Popover`
4. `DateFieldTriggerIconButton`
5. `DateFieldCalendar`
6. `CalendarHeader` and `CalendarContent` with the calendar views

## Valid Composition Patterns

<!-- example: date-field/minimal-composition.tsx -->
```tsx
import {
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
  DateField,
  DateFieldCalendar,
  DateFieldInput,
  DateFieldTriggerIconButton,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@vega-ui/react';

export default function MinimalComposition() {
  return (
    <DateField format='dd.MM.yyyy' separator='.'>
      <DateFieldInput aria-label='Due date' />
      <Popover placement='bottom-end'>
        <PopoverTrigger asChild>
          <DateFieldTriggerIconButton aria-label='Choose due date' />
        </PopoverTrigger>
        <PopoverContent>
          <DateFieldCalendar aria-label='Choose due date'>
            <CalendarHeader>
              <CalendarPrevButton aria-label='Previous month' />
              <CalendarHeading>
                <CalendarViewButton view='month'><CalendarMonthLabel /></CalendarViewButton>
                <CalendarViewButton view='year'><CalendarYearLabel /></CalendarViewButton>
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
          </DateFieldCalendar>
        </PopoverContent>
      </Popover>
    </DateField>
  );
}
```
<!-- /example -->

## Invalid Composition Patterns

### `DateFieldInput` outside `DateField`

This breaks shared formatting and value synchronization.

### Calendar trigger without an actual calendar overlay

The button suggests a picker flow that does not exist.

### Treating calendar constraints as presentation-only

`min`, `max`, and `disabledDates` should stay aligned with real validation rules.
