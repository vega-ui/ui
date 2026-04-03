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

## Composition Order

1. `DateField`
2. `DateFieldInput`
3. `Popover`
4. `DateFieldTriggerIconButton`
5. `DateFieldCalendar`

## Valid Composition Patterns

```tsx
<DateField format='dd/MM/yyyy' separator='/'>
  <DateFieldInput />
  <Popover placement='bottom-end'>
    <PopoverTrigger asChild>
      <DateFieldTriggerIconButton />
    </PopoverTrigger>
    <PopoverContent>
      <DateFieldCalendar>
        <CalendarHeader>
          <CalendarPrevYearGroupButton>
            <Icon><ArrowLeft /></Icon>
          </CalendarPrevYearGroupButton>
          <CalendarPrevButton>
            <Icon><ChevronLeft /></Icon>
          </CalendarPrevButton>
          <CalendarPickerButtonGroup>
            <CalendarMonthPickerButton>
              <CalendarMonthLabel />
            </CalendarMonthPickerButton>
            <CalendarYearPickerButton>
              <CalendarYearLabel />
            </CalendarYearPickerButton>
          </CalendarPickerButtonGroup>
          <CalendarNextButton>
            <Icon><ChevronRight /></Icon>
          </CalendarNextButton>
          <CalendarNextYearGroupButton>
            <Icon><ArrowRight /></Icon>
          </CalendarNextYearGroupButton>
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
