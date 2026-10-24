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

```tsx
<MonthPicker aria-label='Month' locale='en-US' year='2026-01-01'>
  <MonthPickerLayout>
    <MonthPickerCell />
  </MonthPickerLayout>
</MonthPicker>
```

## Dense Embedded Month Selector

When to use:

- the month selector is part of a toolbar, a filter popover, or a side panel

Composition notes:

- use four columns and `format='short'` so the year fits in three rows
- keep the root `size` small, and put the year control next to the grid

Trade-offs:

- compact
- short names are ambiguous in some locales; keep the full name in the trigger or summary

```tsx
<MonthPicker aria-label='Month' size='xs' year='2026-01-01'>
  <MonthPickerLayout cols={4} format='short'>
    <MonthPickerCell />
  </MonthPickerLayout>
</MonthPicker>
```

## Custom Grid Rendering

When to use:

- the row structure itself must change, which a cell template cannot do

Composition notes:

- build rows with `createMonthPickerGrid` instead of ordering months by hand; pass the same `calendar` as the picker
- format labels with `formatCalendarDate` in that calendar, never from the ISO key

Trade-offs:

- full control over markup
- labels and locale are the app's job; prefer a cell template when only the content changes

```tsx
import { formatCalendarDate, gregorianCalendar } from '@vega-ui/i18n';

<MonthPicker aria-label='Month' year='2026-01-01'>
  <MonthPickerRowGroup>
    {createMonthPickerGrid({ year: '2026-01-01', cols: 6 }).map(({ row, data }) => (
      <MonthPickerRow key={row} row={row}>
        {data.map(({ col, month }) => (
          <MonthPickerItem key={month} col={col} value={month}>
            {formatCalendarDate(gregorianCalendar, month, 'en-US', { month: 'narrow' })}
          </MonthPickerItem>
        ))}
      </MonthPickerRow>
    ))}
  </MonthPickerRowGroup>
</MonthPicker>
```

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

```tsx
import { MonthPickerCell, useMonthPickerCellContext } from '@vega-ui/react';

const spending: Record<string, string> = { '2026-01-01': '$1.2k', '2026-02-01': '$980', '2026-03-01': '$1.4k' };

const SpendingMonth = () => {
  const { date, label } = useMonthPickerCellContext();

  return (
    <MonthPickerCell style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <span>{label}</span>
      <small>{spending[date] ?? '—'}</small>
    </MonthPickerCell>
  );
};

<MonthPicker aria-label='Month' locale='en-US' year='2026-01-01'>
  <MonthPickerLayout format='short'>
    <SpendingMonth />
  </MonthPickerLayout>
</MonthPicker>
```
