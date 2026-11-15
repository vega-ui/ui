# DateTimeField Anatomy

## Overview

`DateTimeField` is a [compound component](../../glossary.md#compound-component) that coordinates typed date-time entry, optional calendar selection, and shared timestamp rules under one root.

## Required Parts

### `DateTimeField`

Required. Owns date parsing, time parsing, step rules, and combined timestamp state.

### `DateTimeFieldInput`

Required. Provides the typed date-time input surface.

## Optional Parts

### `DateTimeFieldTriggerIconButton`

Optional trigger affordance for opening a calendar overlay.

### `DateTimeFieldCalendar`

Optional visual date picker that stays synchronized with the field value.

Its children are the `Calendar` parts: `CalendarHeader` with `CalendarPrevButton`, `CalendarHeading` with `CalendarViewButton view='month'` and `view='year'`, and `CalendarNextButton`, then `CalendarContent` with `CalendarDays`, `CalendarMonths`, and `CalendarYears`. The calendar takes `locale` and `calendar` from `DateTimeField`.

## Composition Order

1. `DateTimeField`
2. `DateTimeFieldInput`
3. `Popover`
4. `DateTimeFieldTriggerIconButton`
5. `DateTimeFieldCalendar`
6. `CalendarHeader` and `CalendarContent` with the calendar views

## Valid Composition Patterns

<!-- example: date-time-field/minimal-composition.tsx -->
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
  DateTimeField,
  DateTimeFieldCalendar,
  DateTimeFieldInput,
  DateTimeFieldTriggerIconButton,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@vega-ui/react';

export default function MinimalComposition() {
  return (
    <DateTimeField dateFormat='dd.MM.yyyy' style={{ width: '100%', maxWidth: 320 }}>
      <DateTimeFieldInput aria-label='Starts at' />
      <Popover placement='bottom-end'>
        <PopoverTrigger asChild>
          <DateTimeFieldTriggerIconButton aria-label='Choose start date' />
        </PopoverTrigger>
        <PopoverContent>
          <DateTimeFieldCalendar aria-label='Choose start date'>
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
          </DateTimeFieldCalendar>
        </PopoverContent>
      </Popover>
    </DateTimeField>
  );
}
```
<!-- /example -->

## Invalid Composition Patterns

### Input outside `DateTimeField`

This breaks shared date-time parsing and synchronization.

### Timestamp flow without explicit timezone rules

The field handles input, not product-level timezone policy.

### Treating date and time validation as unrelated

The final product value is one timestamp, not two disconnected fields.
