# CalendarBase Patterns

## Shared Calendar Header

When to use:

- a picker needs a header with its own paging, for example a page of years with a range label

Composition notes:

- keep size and variant in the root
- render control and picker buttons inside `CalendarBaseHeader`, each icon button with an `aria-label`
- the app owns the page: move `year` (or `start`) and `active` together, so the grid keeps a cell in the tab order

Trade-offs:

- consistent family chrome
- still requires embedded picker logic elsewhere

<!-- example: calendar-base/shared-calendar-header.tsx -->
```tsx
import {
  CalendarBase,
  CalendarBaseControlIconButton,
  CalendarBaseHeader,
  Icon,
  Text,
  YearPicker,
  YearPickerCell,
  YearPickerLayout,
} from '@vega-ui/react';
import { ChevronLeft, ChevronRight } from '@vega-ui/icons';
import { useState } from 'react';

const PAGE_SIZE = 12;

function toYearKey(year: number) {
  return `${year}-01-01`;
}

export default function SharedCalendarHeader() {
  const [firstYear, setFirstYear] = useState(2016);
  const [active, setActive] = useState(toYearKey(2016));
  const [selected, setSelected] = useState<string | null>(null);

  const lastYear = firstYear + PAGE_SIZE - 1;

  const showPage = (amount: number) => {
    const next = firstYear + amount * PAGE_SIZE;
    setFirstYear(next);
    setActive(toYearKey(next));
  };

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-6)', justifyItems: 'start', width: '100%' }}>
      <CalendarBase style={{ width: '100%' }}>
        <CalendarBaseHeader>
          <CalendarBaseControlIconButton aria-label='Previous 12 years' onClick={() => showPage(-1)}>
            <Icon><ChevronLeft /></Icon>
          </CalendarBaseControlIconButton>
          <Text fontWeight={600} style={{ alignSelf: 'center' }}>{firstYear}–{lastYear}</Text>
          <CalendarBaseControlIconButton aria-label='Next 12 years' onClick={() => showPage(1)}>
            <Icon><ChevronRight /></Icon>
          </CalendarBaseControlIconButton>
        </CalendarBaseHeader>
        <YearPicker
          aria-label={`Graduation year, ${firstYear} to ${lastYear}`}
          locale='en-US'
          year={toYearKey(firstYear)}
          active={active}
          onChangeActive={setActive}
          selected={selected}
          onSelectCell={setSelected}
        >
          <YearPickerLayout start={toYearKey(firstYear)} offset={0}>
            <YearPickerCell />
          </YearPickerLayout>
        </YearPicker>
      </CalendarBase>
      <Text aria-live='polite' style={{ color: 'var(--label-secondary)', fontVariantNumeric: 'tabular-nums' }}>Graduation year: {selected ? selected.slice(0, 4) : 'not set'}</Text>
    </div>
  );
}
```
<!-- /example -->

## Shared Weekday Row

When to use:

- a derived day-grid view, such as a one-week strip, should reuse the standard weekday presentation

Composition notes:

- keep exactly seven labels and put them inside the picker, since the label row is a grid row
- align them with the embedded day grid: here both come from the same seven ISO days

Trade-offs:

- reusable and consistent
- still depends on the underlying grid logic to stay aligned

<!-- example: calendar-base/shared-weekday-row.tsx -->
```tsx
import {
  CalendarBase,
  CalendarBaseControlIconButton,
  CalendarBaseHeader,
  CalendarBaseWeekLabel,
  CalendarBaseWeekLabels,
  DayPicker,
  DayPickerItem,
  DayPickerRow,
  DayPickerRowGroup,
  Icon,
  Text,
} from '@vega-ui/react';
import { ChevronLeft, ChevronRight } from '@vega-ui/icons';
import { useState } from 'react';

const LOCALE = 'en-GB';
const DAY = 86_400_000;
const weekdayFormat = new Intl.DateTimeFormat(LOCALE, { weekday: 'short', timeZone: 'UTC' });
const dayFormat = new Intl.DateTimeFormat(LOCALE, { day: 'numeric', timeZone: 'UTC' });
const rangeFormat = new Intl.DateTimeFormat(LOCALE, { day: 'numeric', month: 'short', timeZone: 'UTC' });
const fullyBooked = ['2026-11-04', '2026-11-12'];

function getWeek(monday: string) {
  return Array.from({ length: 7 }, (_, index) => new Date(Date.parse(monday) + index * DAY).toISOString().slice(0, 10));
}

function addWeeks(monday: string, amount: number) {
  return new Date(Date.parse(monday) + amount * 7 * DAY).toISOString().slice(0, 10);
}

export default function SharedWeekdayRow() {
  const [monday, setMonday] = useState('2026-11-02');
  const [active, setActive] = useState('2026-11-02');
  const [selected, setSelected] = useState<string | null>(null);

  const week = getWeek(monday);

  const showWeek = (amount: number) => {
    const next = addWeeks(monday, amount);
    setMonday(next);
    setActive(next);
  };

  return (
    <CalendarBase compact>
      <CalendarBaseHeader>
        <CalendarBaseControlIconButton aria-label='Previous week' onClick={() => showWeek(-1)}>
          <Icon><ChevronLeft /></Icon>
        </CalendarBaseControlIconButton>
        <Text fontWeight={600} style={{ alignSelf: 'center' }}>
          {rangeFormat.format(new Date(week[0]))} – {rangeFormat.format(new Date(week[6]))}
        </Text>
        <CalendarBaseControlIconButton aria-label='Next week' onClick={() => showWeek(1)}>
          <Icon><ChevronRight /></Icon>
        </CalendarBaseControlIconButton>
      </CalendarBaseHeader>
      <DayPicker
        aria-label='Appointment day'
        locale={LOCALE}
        month={monday}
        active={active}
        onChangeActive={setActive}
        selected={selected}
        onSelectCell={setSelected}
        disabled={fullyBooked}
      >
        <CalendarBaseWeekLabels>
          {week.map((day) => (
            <CalendarBaseWeekLabel key={day}>{weekdayFormat.format(new Date(day))}</CalendarBaseWeekLabel>
          ))}
        </CalendarBaseWeekLabels>
        <DayPickerRowGroup>
          <DayPickerRow row={0}>
            {week.map((day, col) => (
              <DayPickerItem key={day} col={col} value={day}>{dayFormat.format(new Date(day))}</DayPickerItem>
            ))}
          </DayPickerRow>
        </DayPickerRowGroup>
      </DayPicker>
    </CalendarBase>
  );
}
```
<!-- /example -->

## Compact Embedded Shell

When to use:

- a calendar surface needs a tighter width footprint, such as a side panel or a card

Composition notes:

- use `compact` with a small `size`, narrow weekday names with full names in `aria-label`, and a short month format
- verify that the embedded picker still fits without clipping

Trade-offs:

- tighter presentation
- easier to crowd larger picker content

<!-- example: calendar-base/compact-embedded-shell.tsx -->
```tsx
import {
  CalendarBase,
  CalendarBaseControlIconButton,
  CalendarBaseHeader,
  CalendarBaseWeekLabel,
  CalendarBaseWeekLabels,
  Card,
  DayPicker,
  DayPickerCell,
  DayPickerLayout,
  Heading,
  Icon,
  Text,
} from '@vega-ui/react';
import { ChevronLeft, ChevronRight } from '@vega-ui/icons';
import { useState } from 'react';

const LOCALE = 'en-US';
const WEEK_START = 0;
const weekdayFormat = new Intl.DateTimeFormat(LOCALE, { weekday: 'narrow', timeZone: 'UTC' });
const longWeekdayFormat = new Intl.DateTimeFormat(LOCALE, { weekday: 'long', timeZone: 'UTC' });
const monthFormat = new Intl.DateTimeFormat(LOCALE, { month: 'short', year: 'numeric', timeZone: 'UTC' });
const weekdays = Array.from({ length: 7 }, (_, index) => Date.UTC(2026, 10, 1 + WEEK_START + index));

function addMonths(month: string, amount: number) {
  const date = new Date(month);
  date.setUTCMonth(date.getUTCMonth() + amount);

  return date.toISOString().slice(0, 10);
}

export default function CompactEmbeddedShell() {
  const [month, setMonth] = useState('2026-11-01');
  const [active, setActive] = useState('2026-11-01');

  const showMonth = (amount: number) => {
    const next = addMonths(month, amount);
    setMonth(next);
    setActive(next);
  };

  return (
    <Card style={{ display: 'grid', gap: 'var(--spacing-6)', inlineSize: 'fit-content' }}>
      <Heading as='h3' size={3}>Team calendar</Heading>
      <CalendarBase compact size='xs'>
        <CalendarBaseHeader>
          <CalendarBaseControlIconButton aria-label='Previous month' onClick={() => showMonth(-1)}>
            <Icon size='xs'><ChevronLeft /></Icon>
          </CalendarBaseControlIconButton>
          <Text size={2} fontWeight={600} style={{ alignSelf: 'center' }}>{monthFormat.format(new Date(month))}</Text>
          <CalendarBaseControlIconButton aria-label='Next month' onClick={() => showMonth(1)}>
            <Icon size='xs'><ChevronRight /></Icon>
          </CalendarBaseControlIconButton>
        </CalendarBaseHeader>
        <DayPicker aria-label='Team calendar' locale={LOCALE} month={month} active={active} onChangeActive={setActive}>
          <CalendarBaseWeekLabels>
            {weekdays.map((date) => (
              <CalendarBaseWeekLabel key={date} aria-label={longWeekdayFormat.format(date)}>
                {weekdayFormat.format(date)}
              </CalendarBaseWeekLabel>
            ))}
          </CalendarBaseWeekLabels>
          <DayPickerLayout weekStartsOn={WEEK_START}>
            <DayPickerCell />
          </DayPickerLayout>
        </DayPicker>
      </CalendarBase>
    </Card>
  );
}
```
<!-- /example -->
