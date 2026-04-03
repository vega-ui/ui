# Calendar Anatomy

## Overview

`Calendar` owns visible date, picker mode, selection state, disabled-date rules, and keyboard coordination across the exported picker families.

## Required Parts

### `Calendar`

Root provider for the date-selection model.

- Required: yes
- Owns: picker state, date state, selection state, disabled-date logic

## Optional Parts

### `CalendarHeader`

Header wrapper for navigation and picker switching.

### `CalendarContent`

Main content wrapper for the active picker view.

### `CalendarPrevButton` / `CalendarNextButton`

Month navigation controls for the current visible date.

### `CalendarPickerButtonGroup`

Wrapper for month and year picker-trigger buttons.

### `CalendarMonthPickerButton` / `CalendarYearPickerButton`

Switch the coordinated calendar state into month or year selection mode.

### `CalendarWeekLabels` / `CalendarWeekLabel`

Weekday header chrome for the day-picker view.

### `CalendarDayPicker*`

Day-grid family used for daily selection and current-month navigation.

### `CalendarMonthPicker*`

Month-grid family used to switch the visible month quickly.

### `CalendarYearPicker*`

Year-grid family used to switch the visible year quickly.

## Composition Order

Typical composition:

1. `Calendar`
2. `CalendarHeader`
3. navigation buttons and picker buttons
4. `CalendarContent`
5. one active picker family at a time

## Valid Composition Patterns

```tsx
<Calendar>
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
</Calendar>
```

## Invalid Composition Patterns

### Picker parts outside `Calendar`

The picker families rely on root context. Moving them outside `Calendar` breaks coordination.

### Custom day items without retesting excluded and disabled states

This can weaken selection, keyboard flow, and off-month behavior.

### Treating day, month, and year pickers as isolated widgets

They are coordinated views of the same calendar state model, not unrelated components.
