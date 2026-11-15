# DateRangeField Anatomy

## Overview

`DateRangeField` is a [compound component](../../glossary.md#compound-component) that coordinates a connected start and end date through one field, optional calendar picker, and shared range rules.

## Required Parts

### `DateRangeField`

Required. Owns range parsing, formatting, and date constraint rules.

### `DateRangeFieldInput`

Required. Provides the typed start-to-end range entry surface.

## Optional Parts

### `DateRangeFieldTriggerIconButton`

Optional trigger affordance for opening a calendar overlay.

### `DateRangeFieldCalendar`

Optional visual range picker that should usually be mounted inside `Popover`.

Its children are the `Calendar` parts: `CalendarHeader` with `CalendarPrevButton`, `CalendarHeading` with `CalendarViewButton view='month'` and `view='year'`, and `CalendarNextButton`, then `CalendarContent` with `CalendarDays`, `CalendarMonths`, and `CalendarYears`. The calendar takes `locale` and `calendar` from `DateRangeField`.

## Composition Order

1. `DateRangeField`
2. `DateRangeFieldInput`
3. `Popover`
4. `DateRangeFieldTriggerIconButton`
5. `DateRangeFieldCalendar`
6. `CalendarHeader` and `CalendarContent` with the calendar views

## Valid Composition Patterns

<!-- example: date-range-field/minimal-composition.tsx -->
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
  DateRangeField,
  DateRangeFieldCalendar,
  DateRangeFieldInput,
  DateRangeFieldTriggerIconButton,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@vega-ui/react';

export default function MinimalComposition() {
  return (
    <DateRangeField format='dd.MM.yyyy' separator='.' style={{ width: '100%', maxWidth: 320 }}>
      <DateRangeFieldInput aria-label='Trip dates' />
      <Popover placement='bottom-end'>
        <PopoverTrigger asChild>
          <DateRangeFieldTriggerIconButton aria-label='Choose trip dates' />
        </PopoverTrigger>
        <PopoverContent>
          <DateRangeFieldCalendar aria-label='Choose trip dates'>
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
          </DateRangeFieldCalendar>
        </PopoverContent>
      </Popover>
    </DateRangeField>
  );
}
```
<!-- /example -->

## Invalid Composition Patterns

### Range input outside `DateRangeField`

This breaks coordinated parsing and range selection state.

### Range picker without clear range semantics in surrounding copy

Users should not have to guess whether the range is inclusive, report-based, or booking-based.

### Treating incomplete ranges as fully valid values

Start and end date flows need explicit handling while the field is partially filled.
