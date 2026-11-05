# MonthPicker Examples

## Basic

### Basic: months of one year

`MonthPickerLayout` renders all months of the year given by `year`, any ISO day inside it. Each cell is keyed by the first day of its month, so `defaultSelected` is `'2026-03-01'` for March. The grid has no visible title, so it gets an `aria-label`.

<!-- example: month-picker/months-of-one-year.tsx -->
```tsx
import { MonthPicker, MonthPickerCell, MonthPickerLayout } from '@vega-ui/react';

export default function MonthsOfOneYear() {
  return (
    <MonthPicker aria-label='Start month, 2026' locale='en-US' year='2026-01-01' defaultSelected='2026-03-01' style={{ width: '100%' }}>
      <MonthPickerLayout>
        <MonthPickerCell />
      </MonthPickerLayout>
    </MonthPicker>
  );
}
```
<!-- /example -->

## Controlled/Stateful

### Controlled/Stateful: billing month with year navigation

The selected month and the visible year are separate pieces of state: the buttons change the year, a click changes the month, and the line below shows the result. `MonthPicker` keeps its active cell when `year` changes, so the buttons move `active` into the new year as well.

<!-- example: month-picker/billing-month-with-year-navigation.tsx -->
```tsx
import {
  Icon,
  IconButton,
  MonthPicker,
  MonthPickerCell,
  MonthPickerLayout,
  Text,
} from '@vega-ui/react';
import { ChevronLeft, ChevronRight } from '@vega-ui/icons';
import { useState } from 'react';

const monthFormat = new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric', timeZone: 'UTC' });

export default function BillingMonthWithYearNavigation() {
  const [year, setYear] = useState(2026);
  const [active, setActive] = useState('2026-10-01');
  const [month, setMonth] = useState<string | null>('2026-10-01');

  const showYear = (next: number) => {
    setYear(next);
    setActive(`${next}-01-01`);
  };

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-8)', width: '100%' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <IconButton aria-label='Previous year' size='sm' variant='secondary' appearance='ghost' onClick={() => showYear(year - 1)}>
          <Icon><ChevronLeft /></Icon>
        </IconButton>
        <Text fontWeight={600} aria-live='polite'>{year}</Text>
        <IconButton aria-label='Next year' size='sm' variant='secondary' appearance='ghost' onClick={() => showYear(year + 1)}>
          <Icon><ChevronRight /></Icon>
        </IconButton>
      </div>
      <MonthPicker
        aria-label={`Billing month, ${year}`}
        locale='en-US'
        year={`${year}-01-01`}
        active={active}
        onChangeActive={setActive}
        selected={month}
        onSelectCell={setMonth}
        style={{ width: '100%' }}
      >
        <MonthPickerLayout cols={4} format='short'>
          <MonthPickerCell />
        </MonthPickerLayout>
      </MonthPicker>
      <Text>Invoice for {month ? monthFormat.format(new Date(month)) : '—'}</Text>
    </div>
  );
}
```
<!-- /example -->

## Form/Integration

### Form/Integration: report period

`selection='range'` picks a period of months. Cells are month starts, so the form submits the start as is and turns the end into the last day of its month; `FormData` reads both back, the empty check reuses the linked hint, and reset clears the state.

<!-- example: month-picker/report-period.tsx -->
```tsx
import {
  Button,
  Fieldset,
  FieldsetLegend,
  HelperText,
  MonthPicker,
  MonthPickerCell,
  MonthPickerLayout,
  Text,
} from '@vega-ui/react';
import { FormEvent, useId, useState } from 'react';

function getMonthEnd(monthStart: string) {
  const date = new Date(monthStart);
  date.setUTCMonth(date.getUTCMonth() + 1, 0);

  return date.toISOString().slice(0, 10);
}

export default function ReportPeriod() {
  const [period, setPeriod] = useState<string[]>([]);
  const [missing, setMissing] = useState(false);
  const [query, setQuery] = useState('');
  const hintId = useId();

  const [from, to] = period;

  const change = (next: string[]) => {
    setPeriod(next);
    setMissing(false);
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    if (!data.get('from') || !data.get('to')) {
      setMissing(true);
      return;
    }

    setQuery(new URLSearchParams({ from: String(data.get('from')), to: String(data.get('to')) }).toString());
  };

  const reset = () => {
    setPeriod([]);
    setMissing(false);
    setQuery('');
  };

  return (
    <form onSubmit={submit} onReset={reset} style={{ display: 'grid', gap: 'var(--spacing-12)', justifyItems: 'start', width: '100%' }}>
      <Fieldset>
        <FieldsetLegend>Report period</FieldsetLegend>
        <MonthPicker
          aria-label='Report period, 2026'
          aria-describedby={hintId}
          locale='en-US'
          selection='range'
          year='2026-01-01'
          selected={period}
          onSelectCell={change}
        >
          <MonthPickerLayout cols={4} format='short'>
            <MonthPickerCell />
          </MonthPickerLayout>
        </MonthPicker>
        <HelperText id={hintId} error={missing}>
          {missing ? 'Pick the first and the last month of the period.' : 'Pick the first and the last month.'}
        </HelperText>
      </Fieldset>
      <input type='hidden' name='from' value={from ?? ''} />
      <input type='hidden' name='to' value={to ? getMonthEnd(to) : ''} />
      <div style={{ display: 'flex', gap: 'var(--spacing-4)' }}>
        <Button type='submit'>Build report</Button>
        <Button type='reset' variant='secondary' appearance='ghost'>Reset</Button>
      </div>
      <Text aria-live='polite'>{query ? `GET /reports?${query}` : ''}</Text>
    </form>
  );
}
```
<!-- /example -->

## Layout/Overlay

### Layout/Overlay: month filter in a popover

A compact month grid behind a trigger, for a statement or dashboard filter. The popover is controlled and closes when a month is picked; months after the latest statement are disabled with `to`.

<!-- example: month-picker/month-filter-in-a-popover.tsx -->
```tsx
import {
  Button,
  Icon,
  MonthPicker,
  MonthPickerCell,
  MonthPickerLayout,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@vega-ui/react';
import { ChevronDown } from '@vega-ui/icons';
import { useState } from 'react';

const triggerFormat = new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric', timeZone: 'UTC' });

export default function MonthFilterInAPopover() {
  const [open, setOpen] = useState(false);
  const [month, setMonth] = useState('2026-10-01');

  const pick = (next: string) => {
    setMonth(next);
    setOpen(false);
  };

  return (
    <Popover open={open} onChangeOpen={setOpen} placement='bottom-start' role='dialog'>
      <PopoverTrigger asChild>
        <Button variant='secondary' appearance='ghost' aria-label={`Statement month, ${triggerFormat.format(new Date(month))}`}>
          {triggerFormat.format(new Date(month))}
          <Icon size='sm'><ChevronDown /></Icon>
        </Button>
      </PopoverTrigger>
      <PopoverContent aria-label='Choose a statement month'>
        <MonthPicker
          aria-label='Statement month, 2026'
          locale='en-US'
          year='2026-01-01'
          to='2026-10-01'
          selected={month}
          onSelectCell={pick}
        >
          <MonthPickerLayout cols={4} format='short'>
            <MonthPickerCell />
          </MonthPickerLayout>
        </MonthPicker>
      </PopoverContent>
    </Popover>
  );
}
```
<!-- /example -->

## Error

### Error: period too long

The picker does not limit the length of a range. The app counts the months and turns the hint linked to the grid into an error while the period is longer than six months.

<!-- example: month-picker/period-too-long.tsx -->
```tsx
import {
  HelperText,
  MonthPicker,
  MonthPickerCell,
  MonthPickerLayout,
} from '@vega-ui/react';
import { useId, useState } from 'react';

const MAX_MONTHS = 6;

function countMonths(from?: string, to?: string) {
  if (!from || !to) return 0;

  const years = Number(to.slice(0, 4)) - Number(from.slice(0, 4));
  const months = Number(to.slice(5, 7)) - Number(from.slice(5, 7));

  return years * 12 + months + 1;
}

export default function PeriodTooLong() {
  const [period, setPeriod] = useState<string[]>(['2026-02-01', '2026-10-01']);
  const messageId = useId();

  const [from, to] = period;
  const months = countMonths(from, to);
  const invalid = months > MAX_MONTHS;

  let message = `Compare up to ${MAX_MONTHS} months.`;
  if (months > 0) message = `${months} months selected. Compare up to ${MAX_MONTHS} months.`;
  if (invalid) message = `${months} months is too long. Pick ${MAX_MONTHS} months or fewer.`;

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-3)', justifyItems: 'start', width: '100%' }}>
      <MonthPicker
        aria-label='Comparison period, 2026'
        aria-describedby={messageId}
        locale='en-US'
        selection='range'
        year='2026-01-01'
        selected={period}
        onSelectCell={setPeriod}
        style={{ width: '100%' }}
      >
        <MonthPickerLayout cols={4} format='short'>
          <MonthPickerCell />
        </MonthPickerLayout>
      </MonthPicker>
      <HelperText id={messageId} error={invalid} aria-live='polite'>{message}</HelperText>
    </div>
  );
}
```
<!-- /example -->

## Disabled

### Disabled: months without data

`from` and `to` disable months outside the period that has data, here June 2025 to October 2026. The rule is written next to the grid and linked with `aria-describedby`; the disabled state alone does not explain it.

<!-- example: month-picker/months-without-data.tsx -->
```tsx
import {
  HelperText,
  MonthPicker,
  MonthPickerCell,
  MonthPickerLayout,
} from '@vega-ui/react';
import { useId } from 'react';

export default function MonthsWithoutData() {
  const hintId = useId();

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-3)', justifyItems: 'start', width: '100%' }}>
      <MonthPicker
        aria-label='Statement month, 2026'
        aria-describedby={hintId}
        locale='en-US'
        year='2026-01-01'
        from='2025-06-01'
        to='2026-10-01'
        style={{ width: '100%' }}
      >
        <MonthPickerLayout cols={4} format='short'>
          <MonthPickerCell />
        </MonthPickerLayout>
      </MonthPicker>
      <HelperText id={hintId}>Statements are available from June 2025 to October 2026.</HelperText>
    </div>
  );
}
```
<!-- /example -->

### Disabled: specific months

An array of month starts disables exactly those months, for example the months a seasonal venue is closed.

<!-- example: month-picker/specific-months.tsx -->
```tsx
import {
  HelperText,
  MonthPicker,
  MonthPickerCell,
  MonthPickerLayout,
} from '@vega-ui/react';
import { useId } from 'react';

const closedMonths = ['2026-01-01', '2026-02-01', '2026-12-01'];

export default function SpecificMonths() {
  const hintId = useId();

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-3)', justifyItems: 'start', width: '100%' }}>
      <MonthPicker
        aria-label='Event month, 2026'
        aria-describedby={hintId}
        locale='en-US'
        year='2026-01-01'
        disabled={closedMonths}
        style={{ width: '100%' }}
      >
        <MonthPickerLayout cols={4} format='short'>
          <MonthPickerCell />
        </MonthPickerLayout>
      </MonthPicker>
      <HelperText id={hintId}>The terrace is closed in December, January and February.</HelperText>
    </div>
  );
}
```
<!-- /example -->

## Edge

### Edge: 13-month year

With a calendar system from `createCalendarSystem` (see [Calendar System Adapter](../../i18n.md#calendar-system-adapter)), the grid shows the months of that calendar. The Hebrew year 5784 is a leap year with 13 months, Adar I and Adar II included, so the last row is not full. `year='2024-03-15'` is any day of that year; its first month starts on `2023-09-16`, and every cell key is the ISO day its month starts on, not a Gregorian month start: Adar I is `'2024-02-10'`.

<!-- example: month-picker/13-month-year.tsx -->
```tsx
import { createCalendarSystem } from '@vega-ui/i18n';
import { MonthPicker, MonthPickerCell, MonthPickerLayout, Text } from '@vega-ui/react';
import { useState } from 'react';

const hebrewCalendar = createCalendarSystem('hebrew');

export default function ThirteenMonthYear() {
  const [month, setMonth] = useState<string | null>('2024-02-10');

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-6)', justifyItems: 'start', width: '100%' }}>
      <MonthPicker
        aria-label='Month of 5784'
        calendar={hebrewCalendar}
        locale='en-US'
        year='2024-03-15'
        selected={month}
        onSelectCell={setMonth}
        style={{ width: '100%' }}
      >
        <MonthPickerLayout cols={4}>
          <MonthPickerCell />
        </MonthPickerLayout>
      </MonthPicker>
      <Text aria-live='polite' style={{ color: 'var(--label-secondary)', fontVariantNumeric: 'tabular-nums' }}>Cell key: {month ?? 'none'}</Text>
    </div>
  );
}
```
<!-- /example -->
