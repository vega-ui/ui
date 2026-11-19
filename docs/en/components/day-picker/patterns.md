# DayPicker Patterns

## Static Month Grid

When to use:

- one known month is enough, for example picking a day inside a billing period

Composition notes:

- use `DayPickerLayout` and pass `defaultFocusedDate`, so the grid does not depend on today
- constrain the period with `min` and `max` instead of hiding days; they also keep keyboard navigation inside the month

Trade-offs:

- simple and stable
- no visible navigation; use a scroller or `Calendar` when users move between months

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
        aria-label='Payment day'
        locale='en-US'
        defaultFocusedDate='2026-11-01'
        min='2026-11-10'
        max='2026-11-25'
        value={day}
        onChangeValue={setDay}
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
- the scroller follows the focused day, and a swipe moves the focused day to the same day of the new month
- control `focusedDate` with `onChangeFocusedDate` when a custom header shows the month or has its own buttons
- reach for `Calendar` when the standard header, month view, and year view are enough

Trade-offs:

- tactile, and any header layout is possible
- the app owns navigation state that `Calendar` would handle

<!-- example: day-picker/visible-month-with-own-navigation.tsx -->
```tsx
import {
  Button,
  DayPicker,
  DayPickerCell,
  DayPickerScroller,
  DayPickerScrollerContent,
  DayPickerScrollerLayout,
  Icon,
  Text,
} from '@vega-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@vega-ui/icons';
import { addCalendarMonths, getSameDayInCalendarMonth, gregorianCalendar } from '@vega-ui/i18n';
import { useState } from 'react';

const monthFormat = new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric', timeZone: 'UTC' });

export default function VisibleMonthWithOwnNavigation() {
  const [focused, setFocused] = useState('2026-11-01');
  const [selected, setSelected] = useState<string | null>(null);

  const showMonth = (amount: number) => {
    const month = addCalendarMonths(gregorianCalendar, focused, amount);
    setFocused(getSameDayInCalendarMonth(gregorianCalendar, focused, month));
  };

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-4)', inlineSize: 'fit-content' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Button square aria-label='Previous month' size='sm' variant='secondary' appearance='ghost' onClick={() => showMonth(-1)}>
          <Icon><ChevronLeftIcon /></Icon>
        </Button>
        <Text fontWeight={600} aria-live='polite'>{monthFormat.format(new Date(focused))}</Text>
        <Button square aria-label='Next month' size='sm' variant='secondary' appearance='ghost' onClick={() => showMonth(1)}>
          <Icon><ChevronRightIcon /></Icon>
        </Button>
      </div>
      <DayPicker
        aria-label='Pickup day'
        locale='en-US'
        focusedDate={focused}
        onChangeFocusedDate={setFocused}
        value={selected}
        onChangeValue={setSelected}
      >
        <DayPickerScroller>
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
  DayPicker,
  DayPickerItem,
  DayPickerRow,
  DayPickerRowGroup,
  GridColumnHeader,
  Text,
  createDayPickerGrid,
} from '@vega-ui/react';

const MONTH = '2026-11-01';
const WORK_DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
const weeks = createDayPickerGrid({ month: MONTH, weekStartsOn: 1 }).filter(({ data }) =>
  data.slice(0, 5).some(({ inCurrentMonth }) => inCurrentMonth)
);

export default function CustomGridRendering() {
  return (
    <DayPicker aria-label='Workdays' locale='en-US' defaultFocusedDate={MONTH} style={{ inlineSize: 'fit-content' }}>
      <DayPickerRow row={-1}>
        {WORK_DAYS.map((weekday, col) => (
          <GridColumnHeader key={weekday} col={col} excluded asChild>
            <Text size={2} style={{ color: 'var(--label-tertiary)', minBlockSize: 'var(--spacing-18)' }}>
              {weekday}
            </Text>
          </GridColumnHeader>
        ))}
      </DayPickerRow>
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
    <DayPicker aria-label='Team events' locale='en-US' defaultFocusedDate='2026-11-01' size='sm'>
      <DayPickerLayout>
        <EventDay />
      </DayPickerLayout>
    </DayPicker>
  );
}
```
<!-- /example -->
