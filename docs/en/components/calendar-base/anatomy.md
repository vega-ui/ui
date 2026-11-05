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
3. embedded picker content
4. optional `CalendarBaseWeekLabels`, inside the picker before its rows: the label row has `role='row'` and belongs to the grid

## Valid Composition Patterns

A working day calendar: the header with icon buttons and a month label, then a `DayPicker` that holds the weekday row and the layout. The app keeps the visible month and the active day.

<!-- example: calendar-base/day-calendar-from-base-parts.tsx -->
```tsx
import {
  CalendarBase,
  CalendarBaseControlIconButton,
  CalendarBaseHeader,
  CalendarBaseWeekLabel,
  CalendarBaseWeekLabels,
  DayPicker,
  DayPickerCell,
  DayPickerLayout,
  Icon,
  Text,
} from '@vega-ui/react';
import { ChevronLeft, ChevronRight } from '@vega-ui/icons';
import { useState } from 'react';

const LOCALE = 'en-GB';
const WEEK_START = 1;
const weekdayFormat = new Intl.DateTimeFormat(LOCALE, { weekday: 'short', timeZone: 'UTC' });
const monthFormat = new Intl.DateTimeFormat(LOCALE, { month: 'long', year: 'numeric', timeZone: 'UTC' });
const weekdays = Array.from({ length: 7 }, (_, index) => weekdayFormat.format(Date.UTC(2026, 10, 1 + WEEK_START + index)));

function addMonths(month: string, amount: number) {
  const date = new Date(month);
  date.setUTCMonth(date.getUTCMonth() + amount);

  return date.toISOString().slice(0, 10);
}

export default function DayCalendarFromBaseParts() {
  const [month, setMonth] = useState('2026-11-01');
  const [active, setActive] = useState('2026-11-01');
  const [selected, setSelected] = useState<string | null>(null);

  const showMonth = (amount: number) => {
    const next = addMonths(month, amount);
    setMonth(next);
    setActive(next);
  };

  return (
    <CalendarBase compact>
      <CalendarBaseHeader>
        <CalendarBaseControlIconButton aria-label='Previous month' onClick={() => showMonth(-1)}>
          <Icon><ChevronLeft /></Icon>
        </CalendarBaseControlIconButton>
        <Text fontWeight={600} aria-live='polite' style={{ alignSelf: 'center' }}>
          {monthFormat.format(new Date(month))}
        </Text>
        <CalendarBaseControlIconButton aria-label='Next month' onClick={() => showMonth(1)}>
          <Icon><ChevronRight /></Icon>
        </CalendarBaseControlIconButton>
      </CalendarBaseHeader>
      <DayPicker
        aria-label={monthFormat.format(new Date(month))}
        locale={LOCALE}
        month={month}
        active={active}
        onChangeActive={setActive}
        selected={selected}
        onSelectCell={setSelected}
      >
        <CalendarBaseWeekLabels>
          {weekdays.map((weekday) => (
            <CalendarBaseWeekLabel key={weekday}>{weekday}</CalendarBaseWeekLabel>
          ))}
        </CalendarBaseWeekLabels>
        <DayPickerLayout weekStartsOn={WEEK_START}>
          <DayPickerCell />
        </DayPickerLayout>
      </DayPicker>
    </CalendarBase>
  );
}
```
<!-- /example -->

## Invalid Composition Patterns

### Shared calendar parts rendered outside `CalendarBase`

They lose the size and variant context that keeps the family consistent.

### Consumer-facing calendar built from base parts without reusing the family behavior

The visual shell may match, but interaction and semantics can drift from the higher-level calendar components.
