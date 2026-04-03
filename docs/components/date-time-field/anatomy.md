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

## Composition Order

1. `DateTimeField`
2. `DateTimeFieldInput`
3. `Popover`
4. `DateTimeFieldTriggerIconButton`
5. `DateTimeFieldCalendar`

## Valid Composition Patterns

```tsx
<DateTimeField dateFormat='dd/MM/yyyy' dateSeparator='/' timeFormat='HH:MM'>
  <DateTimeFieldInput />
  <Popover placement='bottom-end'>
    <PopoverTrigger asChild>
      <DateTimeFieldTriggerIconButton />
    </PopoverTrigger>
    <PopoverContent>
      <DateTimeFieldCalendar>
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
