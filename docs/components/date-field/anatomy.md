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

Its children are the `Calendar` parts: `CalendarHeader` with `CalendarPrevButton`, `CalendarViewButtonGroup` (`CalendarViewButton view='month'` and `view='year'`), and `CalendarNextButton`, then `CalendarContent` with `CalendarDays`, `CalendarMonths`, and `CalendarYears`. The calendar takes `locale` and `calendar` from `DateField`.

## Composition Order

1. `DateField`
2. `DateFieldInput`
3. `Popover`
4. `DateFieldTriggerIconButton`
5. `DateFieldCalendar`
6. `CalendarHeader` and `CalendarContent` with the calendar views

## Valid Composition Patterns

```tsx
<DateField format='dd/MM/yyyy' separator='/'>
  <DateFieldInput />
  <Popover placement='bottom-end'>
    <PopoverTrigger asChild>
      <DateFieldTriggerIconButton aria-label='Choose date' />
    </PopoverTrigger>
    <PopoverContent>
      <DateFieldCalendar>
        <CalendarHeader>
          <CalendarPrevButton aria-label='Previous month' />
          <CalendarViewButtonGroup>
            <CalendarViewButton view='month'>
              <CalendarMonthLabel />
            </CalendarViewButton>
            <CalendarViewButton view='year'>
              <CalendarYearLabel />
            </CalendarViewButton>
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
      </DateFieldCalendar>
    </PopoverContent>
  </Popover>
</DateField>
```

## Invalid Composition Patterns

### `DateFieldInput` outside `DateField`

This breaks shared formatting and value synchronization.

### Calendar trigger without an actual calendar overlay

The button suggests a picker flow that does not exist.

### Treating calendar constraints as presentation-only

`min`, `max`, and `disabledDates` should stay aligned with real validation rules.
