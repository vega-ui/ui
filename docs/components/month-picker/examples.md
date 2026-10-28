# MonthPicker Examples

## Basic

### Basic: months of one year

`MonthPickerLayout` renders all months of the year given by `year`, any ISO day inside it. Each cell is keyed by the first day of its month, so `defaultSelected` is `'2026-03-01'` for March.

```tsx
<MonthPicker aria-label='Month' locale='en-US' year='2026-01-01' defaultSelected='2026-03-01'>
  <MonthPickerLayout>
    <MonthPickerCell />
  </MonthPickerLayout>
</MonthPicker>
```

## Controlled/Stateful

### Controlled/Stateful: billing month with year navigation

The selected month and the visible year are separate pieces of state: the buttons change the year, a click changes the month, and the label shows the result.

```tsx
import { addCalendarYears, formatCalendarDate, gregorianCalendar } from '@vega-ui/i18n';

const BillingMonth = () => {
  const [year, setYear] = useState('2026-01-01');
  const [month, setMonth] = useState<string | null>('2026-10-01');

  return (
    <>
      <Button size='sm' onClick={() => setYear(addCalendarYears(gregorianCalendar, year, -1))}>Previous year</Button>
      <Text>{formatCalendarDate(gregorianCalendar, year, 'en-US', { year: 'numeric' })}</Text>
      <Button size='sm' onClick={() => setYear(addCalendarYears(gregorianCalendar, year, 1))}>Next year</Button>
      <MonthPicker aria-label='Billing month' locale='en-US' year={year} selected={month} onSelectCell={setMonth}>
        <MonthPickerLayout cols={4} format='short'>
          <MonthPickerCell />
        </MonthPickerLayout>
      </MonthPicker>
      <Text>
        Invoice for {month ? formatCalendarDate(gregorianCalendar, month, 'en-US', { month: 'long', year: 'numeric' }) : '—'}
      </Text>
    </>
  );
};
```

## Form/Integration

### Form/Integration: report period

`selection='range'` picks a period of months. Cells are month starts, so submit the start as is and turn the end into the last day of its month with `getCalendarMonthEnd`.

```tsx
import { getCalendarMonthEnd, gregorianCalendar } from '@vega-ui/i18n';

const ReportForm = () => {
  const [period, setPeriod] = useState<string[]>([]);
  const [from, to] = period;

  return (
    <form action='/reports' method='get'>
      <MonthPicker aria-label='Report period' selection='range' year='2026-01-01' selected={period} onSelectCell={setPeriod}>
        <MonthPickerLayout cols={4} format='short'>
          <MonthPickerCell />
        </MonthPickerLayout>
      </MonthPicker>
      <input type='hidden' name='from' value={from ?? ''} />
      <input type='hidden' name='to' value={to ? getCalendarMonthEnd(gregorianCalendar, to) : ''} />
      <Button type='submit' disabled={period.length < 2}>Build report</Button>
    </form>
  );
};
```

## Layout/Overlay

### Layout/Overlay: month filter in a popover

A compact month grid behind a trigger, for a statement or dashboard filter. The popover is controlled and closes when a month is picked.

```tsx
import { formatCalendarDate, gregorianCalendar } from '@vega-ui/i18n';

const MonthFilter = () => {
  const [open, setOpen] = useState(false);
  const [month, setMonth] = useState('2026-10-01');

  const pick = (next: string) => {
    setMonth(next);
    setOpen(false);
  };

  return (
    <Popover open={open} onChangeOpen={setOpen} placement='bottom-start' role='dialog'>
      <PopoverTrigger asChild>
        <Button variant='secondary'>
          {formatCalendarDate(gregorianCalendar, month, 'en-US', { month: 'short', year: 'numeric' })}
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <MonthPicker aria-label='Statement month' locale='en-US' year={month} selected={month} onSelectCell={pick}>
          <MonthPickerLayout cols={4} format='short'>
            <MonthPickerCell />
          </MonthPickerLayout>
        </MonthPicker>
      </PopoverContent>
    </Popover>
  );
};
```

## Error

### Error: months without data

`from` and `to` disable months outside the period that has data, here June 2025 to October 2026. Say why the months are unavailable; the disabled state alone does not.

```tsx
<>
  <MonthPicker aria-label='Statement month' year='2026-01-01' from='2025-06-01' to='2026-10-01'>
    <MonthPickerLayout cols={4} format='short'>
      <MonthPickerCell />
    </MonthPickerLayout>
  </MonthPicker>
  <HelperText>Statements are available from June 2025 to October 2026.</HelperText>
</>
```

## Disabled

### Disabled: specific months

An array of month starts disables exactly those months, for example the months a seasonal venue is closed.

```tsx
<MonthPicker aria-label='Event month' year='2026-01-01' disabled={['2026-01-01', '2026-02-01', '2026-12-01']}>
  <MonthPickerLayout cols={4} format='short'>
    <MonthPickerCell />
  </MonthPickerLayout>
</MonthPicker>
```

## Edge

### Edge: 13-month year

With a calendar system from `createCalendarSystem` (see [Calendar System Adapter](../../i18n.md#calendar-system-adapter)), the grid shows the months of that calendar. The Hebrew year 5784 is a leap year with 13 months, Adar I and Adar II included, so the last row is not full. `year='2024-03-15'` is any day of that year; its first month starts on `2023-09-16`, and every cell key is the ISO day its month starts on, not a Gregorian month start.

```tsx
const hebrewCalendar = createCalendarSystem('hebrew');

<MonthPicker aria-label='Month' calendar={hebrewCalendar} locale='en-US' year='2024-03-15'>
  <MonthPickerLayout cols={4}>
    <MonthPickerCell />
  </MonthPickerLayout>
</MonthPicker>
```
