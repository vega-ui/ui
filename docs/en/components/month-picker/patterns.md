# MonthPicker Patterns

## Standard Month Grid

When to use:

- users pick a month, such as a billing period, a report month, or a card expiry month

Composition notes:

- let `MonthPickerLayout` generate the grid; it renders 12 or 13 months, depending on the calendar system
- pass `locale` to the root once; the layout reads it for the month names
- remember that cells are keyed by the first day of each month

Trade-offs:

- simple and reliable
- one year at a time; the app adds year navigation (see [Controlled/Stateful](./examples.md#controlledstateful-billing-month-with-year-navigation))

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

## Dense Embedded Month Selector

When to use:

- the month selector is part of a toolbar, a filter popover, or a side panel

Composition notes:

- use four columns and `format='short'` so the year fits in three rows
- keep the root `size` small, and put the year control next to the grid
- the example keeps the full month and year in the trigger and in its accessible name

Trade-offs:

- compact
- short names are ambiguous in some locales; keep the full name in the trigger or summary

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

## Custom Grid Rendering

When to use:

- the row structure itself must change, which a cell template cannot do

Composition notes:

- build rows with `createMonthPickerGrid` instead of ordering months by hand; pass the same `calendar` as the picker
- format labels with `formatCalendarDate` in that calendar (or `Intl.DateTimeFormat` for Gregorian keys), never from the ISO key
- when the label is shortened, as with narrow names here, give the full name in `aria-label`

Trade-offs:

- full control over markup
- labels and locale are the app's job; prefer a cell template when only the content changes

<!-- example: month-picker/custom-grid-rendering.tsx -->
```tsx
import {
  MonthPicker,
  MonthPickerItem,
  MonthPickerRow,
  MonthPickerRowGroup,
  createMonthPickerGrid,
} from '@vega-ui/react';

const YEAR = '2026-01-01';
const narrowFormat = new Intl.DateTimeFormat('en-US', { month: 'narrow', timeZone: 'UTC' });
const longFormat = new Intl.DateTimeFormat('en-US', { month: 'long', timeZone: 'UTC' });
const rows = createMonthPickerGrid({ year: YEAR, cols: 6 });

export default function CustomGridRendering() {
  return (
    <MonthPicker aria-label='Month, 2026' locale='en-US' year={YEAR} style={{ width: '100%' }}>
      <MonthPickerRowGroup>
        {rows.map(({ row, data }) => (
          <MonthPickerRow key={row} row={row}>
            {data.map(({ col, month }) => (
              <MonthPickerItem key={month} col={col} value={month} aria-label={longFormat.format(new Date(month))}>
                {narrowFormat.format(new Date(month))}
              </MonthPickerItem>
            ))}
          </MonthPickerRow>
        ))}
      </MonthPickerRowGroup>
    </MonthPicker>
  );
}
```
<!-- /example -->

## Cell Template

When to use:

- month cells need extra content such as a total, a status, or a hint

Composition notes:

- children of `MonthPickerLayout` are rendered once per month inside a cell context
- read the month with `useMonthPickerCellContext()`: `{ col, date, fields, label }`; `date` is the first day of the month
- render the content inside `MonthPickerCell` so the cell keeps selection, focus, and disabled states
- take month numbers from `label` or `fields`, never from the ISO `date` string; they differ in non-Gregorian calendars
- look data up by `date`, which is the same in every calendar system

Trade-offs:

- keeps the grid, keys, and keyboard behavior of the layout
- richer cells can crowd small sizes

<!-- example: month-picker/cell-template.tsx -->
```tsx
import {
  MonthPicker,
  MonthPickerCell,
  MonthPickerLayout,
  useMonthPickerCellContext,
} from '@vega-ui/react';

const spending: Record<string, number> = {
  '2026-01-01': 1240,
  '2026-02-01': 980,
  '2026-03-01': 1415,
  '2026-04-01': 1102,
  '2026-05-01': 1630,
  '2026-06-01': 2210,
  '2026-07-01': 1875,
  '2026-08-01': 1490,
  '2026-09-01': 1320,
  '2026-10-01': 1160,
};

export const locales = ['en-US', 'ru-RU', 'ar-EG', 'he-IL'];

function SpendingMonth({ locale }: { locale: string }) {
  const money = new Intl.NumberFormat(locale, { style: 'currency', currency: 'USD', notation: 'compact' });
  const { date, label } = useMonthPickerCellContext();
  const amount = spending[date];

  if (amount === undefined) return <MonthPickerCell />;

  return (
    <MonthPickerCell aria-label={`${label}, ${money.format(amount)}`}>
      <span style={{ display: 'grid', justifyItems: 'center', lineHeight: 1.1 }}>
        <span>{label}</span>
        <small style={{ color: 'var(--label-secondary)' }}>{money.format(amount)}</small>
      </span>
    </MonthPickerCell>
  );
}

export default function CellTemplate({ locale = 'en-US' }: { locale?: string }) {
  return (
    <MonthPicker aria-label='Spending by month, 2026' locale={locale} year='2026-01-01' size='lg' to='2026-10-01' style={{ width: '100%' }}>
      <MonthPickerLayout format='short' cols={4}>
        <SpendingMonth locale={locale} />
      </MonthPickerLayout>
    </MonthPicker>
  );
}
```
<!-- /example -->
