# CalendarBase Anatomy

## Overview

`CalendarBase` provides the shared visual shell for calendar-family components. It supplies context to shared header, control buttons, picker buttons, and weekday labels.

## Required Parts

### `CalendarBase`

Required. Owns shared size, variant, and compactness.

## Optional Parts

### `CalendarBaseHeader`

Optional header row for navigation and picker triggers.

### `CalendarBasePickerButton`

Optional button for month/year picker toggles.

### `CalendarBaseControlIconButton`

Optional previous/next control button.

### `CalendarBaseWeekLabels`

Optional row wrapper for weekday labels.

### `CalendarBaseWeekLabel`

Optional weekday header cell.

## Composition Order

1. `CalendarBase`
2. optional `CalendarBaseHeader`
3. optional `CalendarBaseWeekLabels`
4. embedded picker content

## Valid Composition Patterns

```tsx
<CalendarBase>
  <CalendarBaseHeader>
    <CalendarBaseControlIconButton>
      <Icon><ChevronLeft /></Icon>
    </CalendarBaseControlIconButton>
    <div style={{ display: 'flex', gap: 4 }}>
      <CalendarBasePickerButton>May</CalendarBasePickerButton>
      <CalendarBasePickerButton>2026</CalendarBasePickerButton>
    </div>
    <CalendarBaseControlIconButton>
      <Icon><ChevronRight /></Icon>
    </CalendarBaseControlIconButton>
  </CalendarBaseHeader>
  <CalendarBaseWeekLabels>
    {getWeekDayNames(navigator.language, 'short').map((name) => (
      <CalendarBaseWeekLabel key={name}>{name}</CalendarBaseWeekLabel>
    ))}
  </CalendarBaseWeekLabels>
  <DayPicker year={2026} month={4}>
    <DayPickerLayout includeOverflowDays />
  </DayPicker>
</CalendarBase>
```

## Invalid Composition Patterns

### Shared calendar parts rendered outside `CalendarBase`

They lose the size and variant context that keeps the family consistent.

### Consumer-facing calendar built from base parts without reusing the family behavior

The visual shell may match, but interaction and semantics can drift from the higher-level calendar components.
