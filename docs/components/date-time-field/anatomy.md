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

Its children are the `Calendar` parts: `CalendarHeader` with `CalendarPrevButton`, `CalendarViewButtonGroup` (`CalendarViewButton view='month'` and `view='year'`), and `CalendarNextButton`, then `CalendarContent` with `CalendarDays`, `CalendarMonths`, and `CalendarYears`. The calendar takes `locale` and `calendar` from `DateTimeField`.

## Composition Order

1. `DateTimeField`
2. `DateTimeFieldInput`
3. `Popover`
4. `DateTimeFieldTriggerIconButton`
5. `DateTimeFieldCalendar`
6. `CalendarHeader` and `CalendarContent` with the calendar views

## Valid Composition Patterns

```tsx
<DateTimeField dateFormat='dd/MM/yyyy' dateSeparator='/' timeFormat='HH:mm'>
  <DateTimeFieldInput />
  <Popover placement='bottom-end'>
    <PopoverTrigger asChild>
      <DateTimeFieldTriggerIconButton aria-label='Choose date' />
    </PopoverTrigger>
    <PopoverContent>
      <DateTimeFieldCalendar>
        <CalendarHeader>
          <CalendarPrevButton aria-label='Previous month' />
          <CalendarViewButtonGroup>
            <CalendarViewButton view='month'><CalendarMonthLabel /></CalendarViewButton>
            <CalendarViewButton view='year'><CalendarYearLabel /></CalendarViewButton>
          </CalendarViewButtonGroup>
          <CalendarNextButton aria-label='Next month' />
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
      </DateTimeFieldCalendar>
    </PopoverContent>
  </Popover>
</DateTimeField>
```

## Invalid Composition Patterns

### Input outside `DateTimeField`

This breaks shared date-time parsing and synchronization.

### Timestamp flow without explicit timezone rules

The field handles input, not product-level timezone policy.

### Treating date and time validation as unrelated

The final product value is one timestamp, not two disconnected fields.
