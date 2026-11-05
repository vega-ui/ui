# CalendarBase Examples

## Basic

### Basic: day calendar from base parts

`CalendarBase` is the shell for a calendar the app builds itself: it passes `size` and `variant` to the header buttons and weekday labels, and the app owns the month. The weekday row sits inside `DayPicker`, because it is a grid row, and its order matches `weekStartsOn` of the layout. `DayPicker` keeps its active cell when `month` changes, so the example moves `active` together with the month to keep a cell in the tab order.

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

## Controlled/Stateful

### Controlled/Stateful: header with dynamic labels

One `CalendarBasePickerButton` switches between the days and the months and reports the state with `aria-pressed`; the labels of the previous / next buttons change with the view, because the same buttons step by a month or by a year.

<!-- example: calendar-base/header-with-dynamic-labels.tsx -->
```tsx
import {
  CalendarBase,
  CalendarBaseControlIconButton,
  CalendarBaseHeader,
  CalendarBasePickerButton,
  CalendarBaseWeekLabel,
  CalendarBaseWeekLabels,
  DayPicker,
  DayPickerCell,
  DayPickerLayout,
  Icon,
  MonthPicker,
  MonthPickerCell,
  MonthPickerLayout,
} from '@vega-ui/react';
import { ChevronLeft, ChevronRight } from '@vega-ui/icons';
import { useState } from 'react';

export const locales = ['en-US', 'ru-RU', 'ar-EG', 'he-IL'];
const WEEK_START = 0;

function addMonths(month: string, amount: number) {
  const date = new Date(month);
  date.setUTCMonth(date.getUTCMonth() + amount);

  return date.toISOString().slice(0, 10);
}

export default function HeaderWithDynamicLabels({ locale = 'en-US' }: { locale?: string }) {
  const weekdayFormat = new Intl.DateTimeFormat(locale, { weekday: 'short', timeZone: 'UTC' });
  const monthFormat = new Intl.DateTimeFormat(locale, { month: 'long', timeZone: 'UTC' });
  const yearFormat = new Intl.DateTimeFormat(locale, { year: 'numeric', timeZone: 'UTC' });
  const weekdays = Array.from({ length: 7 }, (_, index) => weekdayFormat.format(Date.UTC(2026, 10, 1 + WEEK_START + index)));

  const [view, setView] = useState<'day' | 'month'>('day');
  const [month, setMonth] = useState('2026-11-01');
  const [active, setActive] = useState('2026-11-01');

  const step = view === 'day' ? 1 : 12;

  const showMonth = (next: string) => {
    setMonth(next);
    setActive(next);
  };

  const pickMonth = (next: string) => {
    showMonth(next);
    setView('day');
  };

  const toggleView = () => {
    setActive(month);
    setView(view === 'day' ? 'month' : 'day');
  };

  return (
    <CalendarBase compact>
      <CalendarBaseHeader>
        <CalendarBaseControlIconButton
          aria-label={view === 'day' ? 'Previous month' : 'Previous year'}
          onClick={() => showMonth(addMonths(month, -step))}
        >
          <Icon><ChevronLeft /></Icon>
        </CalendarBaseControlIconButton>
        <CalendarBasePickerButton aria-pressed={view === 'month'} onClick={toggleView}>
          {monthFormat.format(new Date(month))} {yearFormat.format(new Date(month))}
        </CalendarBasePickerButton>
        <CalendarBaseControlIconButton
          aria-label={view === 'day' ? 'Next month' : 'Next year'}
          onClick={() => showMonth(addMonths(month, step))}
        >
          <Icon><ChevronRight /></Icon>
        </CalendarBaseControlIconButton>
      </CalendarBaseHeader>
      {view === 'day' && (
        <DayPicker aria-label='Days' locale={locale} month={month} active={active} onChangeActive={setActive}>
          <CalendarBaseWeekLabels>
            {weekdays.map((weekday) => (
              <CalendarBaseWeekLabel key={weekday}>{weekday}</CalendarBaseWeekLabel>
            ))}
          </CalendarBaseWeekLabels>
          <DayPickerLayout weekStartsOn={WEEK_START}>
            <DayPickerCell />
          </DayPickerLayout>
        </DayPicker>
      )}
      {view === 'month' && (
        <MonthPicker
          aria-label='Months'
          locale={locale}
          year={month}
          active={active}
          onChangeActive={setActive}
          selected={month}
          onSelectCell={pickMonth}
        >
          <MonthPickerLayout format='short'>
            <MonthPickerCell />
          </MonthPickerLayout>
        </MonthPicker>
      )}
    </CalendarBase>
  );
}
```
<!-- /example -->

## Layout/Overlay

### Layout/Overlay: two months in one shell

Two `DayPickerLayout`s inside one `DayPicker` let a range cross the month boundary; distinct `offset`s keep their row indexes unique. Each month gets its own weekday row and an `aria-label` on its row group, so the visible month titles can stay hidden from screen readers.

<!-- example: calendar-base/two-month-range.tsx -->
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

export const locales = ['en-US', 'ru-RU', 'ar-EG', 'he-IL'];
const WEEK_START = 0;

function addMonths(month: string, amount: number) {
  const date = new Date(month);
  date.setUTCMonth(date.getUTCMonth() + amount);

  return date.toISOString().slice(0, 10);
}

export default function TwoMonthRange({ locale = 'en-US' }: { locale?: string }) {
  const weekdayFormat = new Intl.DateTimeFormat(locale, { weekday: 'narrow', timeZone: 'UTC' });
  const monthFormat = new Intl.DateTimeFormat(locale, { month: 'long', year: 'numeric', timeZone: 'UTC' });
  const rangeFormat = new Intl.DateTimeFormat(locale, { month: 'short', day: 'numeric', timeZone: 'UTC' });
  const weekdays = Array.from({ length: 7 }, (_, index) => weekdayFormat.format(Date.UTC(2026, 10, 1 + WEEK_START + index)));

  const [month, setMonth] = useState('2026-11-01');
  const [active, setActive] = useState('2026-11-01');
  const [range, setRange] = useState<string[]>([]);

  const nextMonth = addMonths(month, 1);
  const [start, end] = range;

  const showMonth = (amount: number) => {
    const next = addMonths(month, amount);
    setMonth(next);
    setActive(next);
  };

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-6)', justifyItems: 'start', width: '100%' }}>
      <CalendarBase>
        <CalendarBaseHeader>
          <CalendarBaseControlIconButton aria-label='Previous month' onClick={() => showMonth(-1)}>
            <Icon><ChevronLeft /></Icon>
          </CalendarBaseControlIconButton>
          <CalendarBaseControlIconButton aria-label='Next month' onClick={() => showMonth(1)}>
            <Icon><ChevronRight /></Icon>
          </CalendarBaseControlIconButton>
        </CalendarBaseHeader>
        <DayPicker
          aria-label='Trip dates'
          locale={locale}
          selection='range'
          month={month}
          active={active}
          onChangeActive={setActive}
          selected={range}
          onSelectCell={setRange}
          style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 'var(--spacing-16)', width: '100%' }}
        >
          {[month, nextMonth].map((visible, index) => (
            <div key={visible} role='presentation' style={{ display: 'grid', gap: 'var(--spacing-4)' }}>
              <Text aria-hidden fontWeight={600} style={{ textAlign: 'center' }}>{monthFormat.format(new Date(visible))}</Text>
              <CalendarBaseWeekLabels>
                {weekdays.map((weekday, col) => (
                  <CalendarBaseWeekLabel key={col}>{weekday}</CalendarBaseWeekLabel>
                ))}
              </CalendarBaseWeekLabels>
              <DayPickerLayout
                aria-label={monthFormat.format(new Date(visible))}
                month={visible}
                offset={index}
                weekStartsOn={WEEK_START}
              >
                <DayPickerCell />
              </DayPickerLayout>
            </div>
          ))}
        </DayPicker>
      </CalendarBase>
      <Text aria-live='polite' style={{ color: 'var(--label-secondary)', fontVariantNumeric: 'tabular-nums' }}>
        {start && end ? rangeFormat.formatRange(new Date(start), new Date(end)) : 'Pick departure and return'}
      </Text>
    </div>
  );
}
```
<!-- /example -->

## Disabled

### Disabled: navigation within a window

`from` and `to` on `DayPicker` disable the days outside the window, and the app disables the previous / next buttons at its first and last month. The rule is written next to the grid and linked with `aria-describedby`.

<!-- example: calendar-base/navigation-within-a-window.tsx -->
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
  HelperText,
  Icon,
  Text,
} from '@vega-ui/react';
import { ChevronLeft, ChevronRight } from '@vega-ui/icons';
import { useId, useState } from 'react';

const LOCALE = 'en-US';
const WEEK_START = 0;
const FIRST_DAY = '2026-11-16';
const LAST_DAY = '2027-01-15';
const weekdayFormat = new Intl.DateTimeFormat(LOCALE, { weekday: 'short', timeZone: 'UTC' });
const monthFormat = new Intl.DateTimeFormat(LOCALE, { month: 'long', year: 'numeric', timeZone: 'UTC' });
const weekdays = Array.from({ length: 7 }, (_, index) => weekdayFormat.format(Date.UTC(2026, 10, 1 + WEEK_START + index)));

function addMonths(month: string, amount: number) {
  const date = new Date(month);
  date.setUTCMonth(date.getUTCMonth() + amount);

  return date.toISOString().slice(0, 10);
}

function getMonthStart(day: string) {
  return `${day.slice(0, 7)}-01`;
}

export default function NavigationWithinAWindow() {
  const [month, setMonth] = useState(getMonthStart(FIRST_DAY));
  const [active, setActive] = useState(FIRST_DAY);
  const hintId = useId();

  const isFirstMonth = month === getMonthStart(FIRST_DAY);
  const isLastMonth = month === getMonthStart(LAST_DAY);

  const showMonth = (amount: number) => {
    const next = addMonths(month, amount);
    setMonth(next);
    setActive(next < FIRST_DAY ? FIRST_DAY : next);
  };

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-3)', justifyItems: 'start', width: '100%' }}>
      <CalendarBase compact>
        <CalendarBaseHeader>
          <CalendarBaseControlIconButton aria-label='Previous month' disabled={isFirstMonth} onClick={() => showMonth(-1)}>
            <Icon><ChevronLeft /></Icon>
          </CalendarBaseControlIconButton>
          <Text fontWeight={600} style={{ alignSelf: 'center' }}>{monthFormat.format(new Date(month))}</Text>
          <CalendarBaseControlIconButton aria-label='Next month' disabled={isLastMonth} onClick={() => showMonth(1)}>
            <Icon><ChevronRight /></Icon>
          </CalendarBaseControlIconButton>
        </CalendarBaseHeader>
        <DayPicker
          aria-label='Return date'
          aria-describedby={hintId}
          locale={LOCALE}
          month={month}
          from={FIRST_DAY}
          to={LAST_DAY}
          active={active}
          onChangeActive={setActive}
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
      <HelperText id={hintId}>Returns are accepted from November 16 to January 15.</HelperText>
    </div>
  );
}
```
<!-- /example -->

## Edge

### Edge: compact weekday labels

Narrow weekday names repeat letters in many locales (S, M, T, W, T, F, S), so each label gets the full name in `aria-label`. `compact` with `size='xs'` keeps the shell as narrow as the grid.

<!-- example: calendar-base/compact-weekday-labels.tsx -->
```tsx
import {
  CalendarBase,
  CalendarBaseWeekLabel,
  CalendarBaseWeekLabels,
  DayPicker,
  DayPickerCell,
  DayPickerLayout,
} from '@vega-ui/react';

const LOCALE = 'en-US';
const WEEK_START = 0;
const narrowFormat = new Intl.DateTimeFormat(LOCALE, { weekday: 'narrow', timeZone: 'UTC' });
const longFormat = new Intl.DateTimeFormat(LOCALE, { weekday: 'long', timeZone: 'UTC' });

const weekdays = Array.from({ length: 7 }, (_, index) => {
  const date = Date.UTC(2026, 10, 1 + WEEK_START + index);

  return { narrow: narrowFormat.format(date), long: longFormat.format(date) };
});

export default function CompactWeekdayLabels() {
  return (
    <CalendarBase compact size='xs'>
      <DayPicker aria-label='November 2026' locale={LOCALE} month='2026-11-01'>
        <CalendarBaseWeekLabels>
          {weekdays.map(({ narrow, long }) => (
            <CalendarBaseWeekLabel key={long} aria-label={long} title={long}>{narrow}</CalendarBaseWeekLabel>
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

### Edge: right-to-left shell

`dir='rtl'` on `CalendarBase` mirrors the header and the grid, but the base parts do not swap icons: the "previous" button needs a right-pointing chevron and the "next" button a left-pointing one. The `Calendar` navigation buttons flip their chevrons by themselves.

<!-- example: calendar-base/right-to-left-shell.tsx -->
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

const LOCALE = 'he-IL';
const WEEK_START = 0;
const weekdayFormat = new Intl.DateTimeFormat(LOCALE, { weekday: 'narrow', timeZone: 'UTC' });
const monthFormat = new Intl.DateTimeFormat(LOCALE, { month: 'long', year: 'numeric', timeZone: 'UTC' });
const weekdays = Array.from({ length: 7 }, (_, index) => weekdayFormat.format(Date.UTC(2026, 10, 1 + WEEK_START + index)));

function addMonths(month: string, amount: number) {
  const date = new Date(month);
  date.setUTCMonth(date.getUTCMonth() + amount);

  return date.toISOString().slice(0, 10);
}

export default function RightToLeftShell() {
  const [month, setMonth] = useState('2026-11-01');
  const [active, setActive] = useState('2026-11-01');

  const showMonth = (amount: number) => {
    const next = addMonths(month, amount);
    setMonth(next);
    setActive(next);
  };

  return (
    <CalendarBase compact dir='rtl' lang={LOCALE}>
      <CalendarBaseHeader>
        <CalendarBaseControlIconButton aria-label='החודש הקודם' onClick={() => showMonth(-1)}>
          <Icon><ChevronRight /></Icon>
        </CalendarBaseControlIconButton>
        <Text fontWeight={600} style={{ alignSelf: 'center' }}>{monthFormat.format(new Date(month))}</Text>
        <CalendarBaseControlIconButton aria-label='החודש הבא' onClick={() => showMonth(1)}>
          <Icon><ChevronLeft /></Icon>
        </CalendarBaseControlIconButton>
      </CalendarBaseHeader>
      <DayPicker aria-label='ימים' locale={LOCALE} month={month} active={active} onChangeActive={setActive}>
        <CalendarBaseWeekLabels>
          {weekdays.map((weekday, col) => (
            <CalendarBaseWeekLabel key={col}>{weekday}</CalendarBaseWeekLabel>
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
