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

## Composition Order

1. `DateRangeField`
2. `DateRangeFieldInput`
3. `Popover`
4. `DateRangeFieldTriggerIconButton`
5. `DateRangeFieldCalendar`

## Valid Composition Patterns

```tsx
<DateRangeField format='dd/MM/yyyy' separator='/' rangeSeparator=' - '>
  <DateRangeFieldInput />
  <Popover placement='bottom-end'>
    <PopoverTrigger asChild>
      <DateRangeFieldTriggerIconButton />
    </PopoverTrigger>
    <PopoverContent>
      <DateRangeFieldCalendar>
        <CalendarHeader>
          <CalendarPrevYearGroupButton><Icon><ArrowLeft /></Icon></CalendarPrevYearGroupButton>
          <CalendarPrevButton><Icon><ChevronLeft /></Icon></CalendarPrevButton>
          <CalendarPickerButtonGroup>
            <CalendarMonthPickerButton><CalendarMonthLabel /></CalendarMonthPickerButton>
            <CalendarYearPickerButton><CalendarYearLabel /></CalendarYearPickerButton>
          </CalendarPickerButtonGroup>
          <CalendarNextButton><Icon><ChevronRight /></Icon></CalendarNextButton>
          <CalendarNextYearGroupButton><Icon><ArrowRight /></Icon></CalendarNextYearGroupButton>
        </CalendarHeader>
        <CalendarContent>
          <CalendarDayPicker>
            <CalendarWeekLabels>
              {getWeekDayNames(navigator.language, 'short').map((name) => (
                <CalendarWeekLabel key={name}>{name}</CalendarWeekLabel>
              ))}
            </CalendarWeekLabels>
            <CalendarDayPickerScroller>
              <CalendarDayPickerScrollerContent>
                <CalendarDayPickerScrollerLayout />
              </CalendarDayPickerScrollerContent>
            </CalendarDayPickerScroller>
          </CalendarDayPicker>
          <CalendarMonthPicker>
            <CalendarMonthPickerLayout />
          </CalendarMonthPicker>
          <CalendarYearPicker>
            <CalendarYearPickerScroller>
              <CalendarYearPickerScrollerContent>
                <CalendarYearPickerScrollerLayout />
              </CalendarYearPickerScrollerContent>
            </CalendarYearPickerScroller>
          </CalendarYearPicker>
        </CalendarContent>
      </DateRangeFieldCalendar>
    </PopoverContent>
  </Popover>
</DateRangeField>
```

## Invalid Composition Patterns

### Range input outside `DateRangeField`

This breaks coordinated parsing and range selection state.

### Range picker without clear range semantics in surrounding copy

Users should not have to guess whether the range is inclusive, report-based, or booking-based.

### Treating incomplete ranges as fully valid values

Start and end date flows need explicit handling while the field is partially filled.
