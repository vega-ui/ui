# DateTimeField Anatomy

## Overview

`DateTimeField` is a [compound component](../../glossary.md#compound-component) that coordinates typed date-time entry, optional calendar selection, and shared timestamp rules under one root.

## Required Parts

### `DateTimeField`

Required. Owns date parsing, time parsing, step rules, and combined timestamp state.

### `DateTimeFieldInput`

Required. Provides the typed date-time input surface.

## Optional Parts

### `DateTimeFieldTrigger`

Optional trigger affordance for opening a calendar overlay. It renders a `Button` with no content of its own: pass a calendar icon as children with `square` and an `aria-label` or `aria-labelledby`, a text like "Choose date", or your own button with `asChild`.

### `DateTimeFieldCalendar`

Optional visual date picker that stays synchronized with the field value. Place it in a `PopoverContent` with `role="dialog"` and a name. Picking a day keeps the popover open for the time, like the picker of a native `<input type="datetime-local">`; under the calendar a time button opens the wheels, as on iOS.

Its children are the `Calendar` parts: `CalendarHeader` with `CalendarPrevButton`, `CalendarHeading` with `CalendarViewButton view='month'` and `view='year'`, and `CalendarNextButton`, then `CalendarContent` with `CalendarDays`, `CalendarMonths`, and `CalendarYears`. The calendar takes `locale` and `calendar` from `DateTimeField`.

### `DateTimeFieldColumn`

Optional wheel of one part of the time, chosen by the required `unit`: `hour`, `minute` or `second`, the seconds with `timeFormat="HH:mm:ss"`. Place the columns in a `WheelPicker` inside a nested `Popover`, opened by a time button under `DateTimeFieldCalendar`. A column turns the time and keeps the day; the minutes and the seconds go by `timeStep`; while the field is empty it takes `today`, within `min` and `max`, for the date. The times outside `min` and `max` are disabled only on the days of `min` and `max`. Its children are the template of an option, usually `<TimeFieldOption><WheelPickerFace /></TimeFieldOption>`.

### `DateTimeFieldTime`

Optional text of the time of the field in its `timeFormat`, and `placeholder`, for example `--:--`, while the field has no complete date and time. It renders text only: place it in the `Button` that opens the time wheels, and name that button with `aria-labelledby` from a visible "Time" label and the button itself, so it reads as "Time 18:30".

## Composition Order

1. `DateTimeField`
2. `DateTimeFieldInput`
3. `Popover`
4. `DateTimeFieldTrigger`
5. `DateTimeFieldCalendar`
6. `CalendarHeader` and `CalendarContent` with the calendar views
7. Under the calendar, a "Time" label and a nested `Popover` whose trigger is a `Button` with `DateTimeFieldTime`, and whose content is a `WheelPicker` of `DateTimeFieldColumn`

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
  DateTimeFieldTrigger,
  Icon,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@vega-ui/react';
import { CalendarIcon, ChevronLeftIcon, ChevronRightIcon } from '@vega-ui/icons';

export default function MinimalComposition() {
  return (
    <DateTimeField dateFormat='dd.MM.yyyy' style={{ width: '100%', maxWidth: 320 }}>
      <DateTimeFieldInput aria-label='Starts at' />
      <Popover placement='bottom-end'>
        <PopoverTrigger asChild>
          <DateTimeFieldTrigger square aria-label='Choose start date'><Icon><CalendarIcon /></Icon></DateTimeFieldTrigger>
        </PopoverTrigger>
        <PopoverContent role='dialog' aria-label='Choose start date'>
          <DateTimeFieldCalendar>
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
