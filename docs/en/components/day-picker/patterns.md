# DayPicker Patterns

## Static Month Grid

When to use:

- one known month is enough, for example picking a day inside a billing period

Composition notes:

- use `DayPickerLayout` and pass `month` explicitly, so the grid does not depend on today
- constrain the period with `from` and `to` instead of hiding days

Trade-offs:

- simple and stable
- no navigation; use a scroller or `Calendar` when users move between months

<!-- example: day-picker/static-month-grid.tsx -->
```tsx
import { DayPicker, DayPickerCell, DayPickerLayout, Text } from '@vega-ui/react';
import { useState } from 'react';

const dateFormat = new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', timeZone: 'UTC' });

export default function StaticMonthGrid() {
  const [day, setDay] = useState<string | null>(null);

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-6)', justifyItems: 'start', width: '100%' }}>
      <DayPicker
        aria-label='Payment day, November 2026'
        locale='en-US'
        month='2026-11-01'
        from='2026-11-10'
        to='2026-11-25'
        selected={day}
        onSelectCell={setDay}
      >
        <DayPickerLayout>
          <DayPickerCell />
        </DayPickerLayout>
      </DayPicker>
      <Text aria-live='polite' style={{ color: 'var(--label-secondary)', fontVariantNumeric: 'tabular-nums' }}>
        {day ? `Payment on ${dateFormat.format(new Date(day))}` : 'Pick a day between November 10 and 25'}
      </Text>
    </div>
  );
}
```
<!-- /example -->

## Swipable Month Paging

When to use:

- users move between months with swipe or snap paging and the app draws its own header

Composition notes:

- use `DayPickerScroller` with `DayPickerScrollerContent` and `DayPickerScrollerLayout`
- `onChangePeriod` reports the first day of the month scrolled into view; store it and pass it back as `month`, so the header and the grid agree
- keep `active` in state as well and move it into the new month, otherwise the grid can lose its tab stop
- reach for `Calendar` when the standard header, month view, and year view are enough

Trade-offs:

- tactile, and any header layout is possible
- the app owns navigation state that `Calendar` would handle

<!-- example: day-picker/visible-month-with-own-navigation.tsx -->
```tsx
import {
  DayPicker,
  DayPickerCell,
  DayPickerScroller,
  DayPickerScrollerContent,
  DayPickerScrollerLayout,
  Icon,
  IconButton,
  Text,
} from '@vega-ui/react';
import { ChevronLeft, ChevronRight } from '@vega-ui/icons';
import { useState } from 'react';

const monthFormat = new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric', timeZone: 'UTC' });

function addMonths(month: string, amount: number) {
  const date = new Date(month);
  date.setUTCMonth(date.getUTCMonth() + amount);

  return date.toISOString().slice(0, 10);
}

export default function VisibleMonthWithOwnNavigation() {
  const [month, setMonth] = useState('2026-11-01');
  const [active, setActive] = useState('2026-11-01');
  const [selected, setSelected] = useState<string | null>(null);

  const showMonth = (next: string) => {
    setMonth(next);
    setActive((current) => {
      if (current.slice(0, 7) === next.slice(0, 7)) return current;

      return next;
    });
  };

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-4)', inlineSize: 'fit-content' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <IconButton aria-label='Previous month' size='sm' variant='secondary' appearance='ghost' onClick={() => showMonth(addMonths(month, -1))}>
          <Icon><ChevronLeft /></Icon>
        </IconButton>
        <Text fontWeight={600} aria-live='polite'>{monthFormat.format(new Date(month))}</Text>
        <IconButton aria-label='Next month' size='sm' variant='secondary' appearance='ghost' onClick={() => showMonth(addMonths(month, 1))}>
          <Icon><ChevronRight /></Icon>
        </IconButton>
      </div>
      <DayPicker
        aria-label='Pickup day'
        locale='en-US'
        month={month}
        active={active}
        onChangeActive={setActive}
        selected={selected}
        onSelectCell={setSelected}
      >
        <DayPickerScroller onChangePeriod={showMonth}>
          <DayPickerScrollerContent>
            <DayPickerScrollerLayout>
              <DayPickerCell />
            </DayPickerScrollerLayout>
          </DayPickerScrollerContent>
        </DayPickerScroller>
      </DayPicker>
    </div>
  );
}
```
<!-- /example -->

## Custom Grid Rendering

When to use:

- the row and cell structure itself must change, which a cell template cannot do

Composition notes:

- build rows with `createDayPickerGrid` instead of reimplementing date math; pass the same `calendar` as the picker
- `date` is `undefined` for an empty overflow cell; `day` is the day number in the calendar system
- set `disabled` and `excluded` on cells outside the month, as the built-in cell does
- here a Monday-to-Friday grid: weekend cells are not rendered, and weeks without a workday of the month are dropped

Trade-offs:

- full control over markup
- labels, week start, and overflow handling are the app's job; prefer a cell template when only the content changes

<!-- example: day-picker/custom-grid-rendering.tsx -->
```tsx
import {
  CalendarBaseWeekLabel,
  CalendarBaseWeekLabels,
  DayPicker,
  DayPickerItem,
  DayPickerRow,
  DayPickerRowGroup,
  createDayPickerGrid,
} from '@vega-ui/react';

const MONTH = '2026-11-01';
const WORK_DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
const weeks = createDayPickerGrid({ month: MONTH, weekStartsOn: 1 }).filter(({ data }) =>
  data.slice(0, 5).some(({ inCurrentMonth }) => inCurrentMonth)
);

export default function CustomGridRendering() {
  return (
    <DayPicker aria-label='Workdays, November 2026' locale='en-US' month={MONTH} style={{ inlineSize: 'fit-content' }}>
      <CalendarBaseWeekLabels style={{ gridTemplateColumns: 'repeat(5, 1fr)' }}>
        {WORK_DAYS.map((weekday) => (
          <CalendarBaseWeekLabel key={weekday}>{weekday}</CalendarBaseWeekLabel>
        ))}
      </CalendarBaseWeekLabels>
      <DayPickerRowGroup>
        {weeks.map(({ row, data }) => (
          <DayPickerRow key={row} row={row}>
            {data.slice(0, 5).map(({ col, date, day, inCurrentMonth }) => (
              <DayPickerItem key={col} col={col} value={date} disabled={!inCurrentMonth} excluded={!inCurrentMonth}>
                {inCurrentMonth ? day : ''}
              </DayPickerItem>
            ))}
          </DayPickerRow>
        ))}
      </DayPickerRowGroup>
    </DayPicker>
  );
}
```
<!-- /example -->

## Cell Template

When to use:

- day cells need extra content such as a price, a status, or a count

Composition notes:

- children of `DayPickerLayout` and `DayPickerScrollerLayout` are rendered once per day inside a cell context
- read the day with `useDayPickerCellContext()`: `{ col, date, fields, label, inMonth }`; `date` is `undefined` for an empty overflow cell
- render the content inside `DayPickerCell` so the cell keeps selection, focus, and disabled states
- take day numbers from `label` or `fields`, never from the ISO `date` string; they differ in non-Gregorian calendars
- look data up by `date`, which is the same in every calendar system
- extra content that is only visual (dots, colors) needs words in the cell's `aria-label`

Trade-offs:

- keeps the grid, keys, and keyboard behavior of the layout
- richer cells can crowd small sizes

<!-- example: day-picker/cell-template.tsx -->
```tsx
import {
  DayPicker,
  DayPickerCell,
  DayPickerLayout,
  useDayPickerCellContext,
} from '@vega-ui/react';

const events: Record<string, string[]> = {
  '2026-11-04': ['Design review', 'Sprint planning'],
  '2026-11-12': ['Release 3.2'],
  '2026-11-18': ['Team offsite', 'Retro', 'Demo day'],
};

function EventDay() {
  const { date, label } = useDayPickerCellContext();
  const count = date === undefined ? 0 : (events[date]?.length ?? 0);

  if (count === 0) return <DayPickerCell />;

  return (
    <DayPickerCell aria-label={`${label}, ${count} ${count === 1 ? 'event' : 'events'}`}>
      <span style={{ display: 'grid', justifyItems: 'center', lineHeight: 1 }}>
        <span>{label}</span>
        <span aria-hidden style={{ fontSize: '0.6em', color: 'var(--label-secondary)' }}>{'•'.repeat(count)}</span>
      </span>
    </DayPickerCell>
  );
}

export default function CellTemplate() {
  return (
    <DayPicker aria-label='Team events, November 2026' locale='en-US' month='2026-11-01' size='sm'>
      <DayPickerLayout>
        <EventDay />
      </DayPickerLayout>
    </DayPicker>
  );
}
```
<!-- /example -->
