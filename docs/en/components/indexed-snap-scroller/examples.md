# IndexedSnapScroller Examples

## Basic

### Basic: infinite week strip

One `WeekPage` template is rendered for every index in the window and reads its own index from `useIndexedSnapScrollerContext`; index 0 is the current week. The date math lives in the page component, the scroller only supplies the index.

<!-- example: indexed-snap-scroller/week-strip.tsx -->
```tsx
import {
  IndexedSnapScroller,
  IndexedSnapScrollerContent,
  Text,
  useIndexedSnapScrollerContext,
} from '@vega-ui/react';
import type { CSSProperties } from 'react';

const today = new Date();
const daysSinceMonday = (today.getDay() + 6) % 7;
const weekdayFormat = new Intl.DateTimeFormat('en-US', { weekday: 'short' });
const weekFormat = new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric' });

function WeekPage() {
  const { index } = useIndexedSnapScrollerContext();
  const days = Array.from({ length: 7 }, (_, day) => (
    new Date(today.getFullYear(), today.getMonth(), today.getDate() - daysSinceMonday + index * 7 + day)
  ));

  return (
    <IndexedSnapScrollerContent
      role='group'
      aria-label={`Week of ${weekFormat.format(days[0])}`}
      style={{ display: 'grid', gridTemplateColumns: 'repeat(7, minmax(0, 1fr))', gap: 'var(--spacing-2)', width: '100%' }}
    >
      {days.map((day) => {
        const isToday = day.toDateString() === today.toDateString();

        return (
          <div
            key={day.toDateString()}
            aria-current={isToday ? 'date' : undefined}
            style={{
              display: 'grid',
              justifyItems: 'center',
              gap: 'var(--spacing-1)',
              paddingBlock: 'var(--spacing-4)',
              borderRadius: 'var(--radius-3)',
              background: isToday ? 'var(--fills-secondary)' : undefined,
            }}
          >
            <Text size={1} style={{ '--t-color': 'var(--label-secondary)' } as CSSProperties}>
              {weekdayFormat.format(day)}
            </Text>
            <Text size={3} fontWeight={isToday ? 700 : 400}>{day.getDate()}</Text>
          </div>
        );
      })}
    </IndexedSnapScrollerContent>
  );
}

export default function WeekStrip() {
  return (
    <IndexedSnapScroller
      defaultIndex={0}
      tabIndex={0}
      aria-label='Calendar weeks'
      style={{ width: '100%', gap: 'var(--spacing-6)' }}
    >
      <WeekPage />
    </IndexedSnapScroller>
  );
}
```
<!-- /example -->

## Controlled/Stateful

### Controlled/Stateful: month header with external controls

`index` lives in the parent and `onScrollSnapChange` writes the settled index back. The arrows call `apiRef.next()` and `prev()` for a smooth step; **+1 year** and **This month** set `index` directly, which rebuilds the window around a target outside it and jumps there without animation.

<!-- example: indexed-snap-scroller/controlled-virtual-index.tsx -->
```tsx
import {
  Button,
  Icon,
  IconButton,
  IndexedSnapScroller,
  IndexedSnapScrollerContent,
  Text,
  useIndexedSnapScrollerContext,
  type IndexedSnapScrollerApiRef,
} from '@vega-ui/react';
import { ChevronLeft, ChevronRight } from '@vega-ui/icons';
import { useRef, useState } from 'react';

const today = new Date();
const monthFormat = new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' });

function countWorkingDays(year: number, month: number) {
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  let count = 0;

  for (let day = 1; day <= daysInMonth; day++) {
    const weekday = new Date(year, month, day).getDay();
    if (weekday !== 0 && weekday !== 6) count++;
  }

  return count;
}

function MonthPage() {
  const { index } = useIndexedSnapScrollerContext();
  const month = new Date(today.getFullYear(), today.getMonth() + index, 1);
  const daysInMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();

  return (
    <IndexedSnapScrollerContent
      style={{
        display: 'grid',
        gap: 'var(--spacing-2)',
        width: '100%',
        padding: 'var(--spacing-10)',
        boxSizing: 'border-box',
        borderRadius: 'var(--radius-4)',
        background: 'var(--fills-secondary)',
      }}
    >
      <Text size={3} fontWeight={500}>{monthFormat.format(month)}</Text>
      <Text size={2} style={{ color: 'var(--label-secondary)' }}>
        {daysInMonth} days, {countWorkingDays(month.getFullYear(), month.getMonth())} working days
      </Text>
    </IndexedSnapScrollerContent>
  );
}

export default function ControlledVirtualIndex() {
  const api = useRef<IndexedSnapScrollerApiRef>(null);
  const [index, setIndex] = useState(0);

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-6)', width: '100%' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-2)' }}>
        <IconButton aria-label='Previous month' variant='secondary' appearance='ghost' onClick={() => api.current?.prev()}>
          <Icon><ChevronLeft /></Icon>
        </IconButton>
        <IconButton aria-label='Next month' variant='secondary' appearance='ghost' onClick={() => api.current?.next()}>
          <Icon><ChevronRight /></Icon>
        </IconButton>
        <Button size='sm' variant='secondary' appearance='ghost' onClick={() => setIndex(index + 12)} style={{ marginInlineStart: 'auto' }}>
          +1 year
        </Button>
        <Button size='sm' variant='secondary' appearance='ghost' disabled={index === 0} onClick={() => setIndex(0)}>
          This month
        </Button>
      </div>
      <IndexedSnapScroller
        apiRef={api}
        index={index}
        tabIndex={0}
        aria-label='Months'
        onScrollSnapChange={(_, next) => setIndex(next)}
        style={{ gap: 'var(--spacing-6)' }}
      >
        <MonthPage />
      </IndexedSnapScroller>
      <Text size={2} aria-live='polite' style={{ color: 'var(--label-secondary)', fontVariantNumeric: 'tabular-nums' }}>
        index = {index}
      </Text>
    </div>
  );
}
```
<!-- /example -->

## Form/Integration

### Form/Integration: delivery day in a form

Only the pages of the current window exist in the DOM, so the selected day cannot live in a page: it is kept in form state and submitted through a hidden input read with `FormData`. Submitting without a day shows a `HelperText` linked to the group with `aria-describedby`; past days and Sundays are disabled buttons, and reset clears the value and returns to the current week with `setIndexTo(0)`.

<!-- example: indexed-snap-scroller/week-strip-form.tsx -->
```tsx
import {
  Button,
  HelperText,
  Icon,
  IconButton,
  IndexedSnapScroller,
  IndexedSnapScrollerContent,
  Text,
  useIndexedSnapScrollerContext,
  type IndexedSnapScrollerApiRef,
} from '@vega-ui/react';
import { ChevronLeft, ChevronRight } from '@vega-ui/icons';
import { useRef, useState, type FormEvent } from 'react';

const today = new Date();
const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
const daysSinceMonday = (today.getDay() + 6) % 7;
const weekdayFormat = new Intl.DateTimeFormat('en-US', { weekday: 'short' });
const fullDateFormat = new Intl.DateTimeFormat('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

function toIsoDate(date: Date) {
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${date.getFullYear()}-${month}-${day}`;
}

interface WeekPageProps {
  selected: string
  onSelect(value: string): void
}

function WeekPage({ selected, onSelect }: WeekPageProps) {
  const { index } = useIndexedSnapScrollerContext();
  const days = Array.from({ length: 7 }, (_, day) => (
    new Date(today.getFullYear(), today.getMonth(), today.getDate() - daysSinceMonday + index * 7 + day)
  ));

  return (
    <IndexedSnapScrollerContent
      style={{ display: 'grid', gridTemplateColumns: 'repeat(7, minmax(0, 1fr))', gap: 'var(--spacing-2)', width: '100%' }}
    >
      {days.map((day) => {
        const value = toIsoDate(day);
        const isSelected = value === selected;
        const isUnavailable = day < todayStart || day.getDay() === 0;

        return (
          <div key={value} style={{ display: 'grid', justifyItems: 'center', gap: 'var(--spacing-2)' }}>
            <Text size={1} aria-hidden style={{ color: 'var(--label-secondary)' }}>{weekdayFormat.format(day)}</Text>
            <Button
              type='button'
              size='sm'
              variant={isSelected ? 'primary' : 'secondary'}
              appearance={isSelected ? 'fill' : 'ghost'}
              aria-label={fullDateFormat.format(day)}
              aria-pressed={isSelected}
              disabled={isUnavailable}
              onClick={() => onSelect(value)}
              style={{ width: '100%', paddingInline: 0, fontVariantNumeric: 'tabular-nums' }}
            >
              {day.getDate()}
            </Button>
          </div>
        );
      })}
    </IndexedSnapScrollerContent>
  );
}

export default function WeekStripForm() {
  const api = useRef<IndexedSnapScrollerApiRef>(null);
  const [selected, setSelected] = useState('');
  const [error, setError] = useState('');
  const [result, setResult] = useState('');

  const select = (value: string) => {
    setSelected(value);
    setError('');
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const deliveryDate = data.get('deliveryDate');

    if (!deliveryDate) {
      setError('Choose a delivery day. Sundays are not available.');
      return;
    }

    setResult(`Delivery booked for ${deliveryDate}.`);
  };

  const onReset = () => {
    setSelected('');
    setError('');
    setResult('');
    api.current?.setIndexTo(0);
  };

  return (
    <form onSubmit={onSubmit} onReset={onReset} style={{ display: 'grid', gap: 'var(--spacing-8)', width: '100%' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-2)' }}>
        <Text id='delivery-day-label' size={3} fontWeight={500} style={{ flex: 1 }}>Delivery day</Text>
        <IconButton aria-label='Previous week' variant='secondary' appearance='ghost' onClick={() => api.current?.prev()}>
          <Icon><ChevronLeft /></Icon>
        </IconButton>
        <IconButton aria-label='Next week' variant='secondary' appearance='ghost' onClick={() => api.current?.next()}>
          <Icon><ChevronRight /></Icon>
        </IconButton>
      </div>
      <div
        role='group'
        aria-labelledby='delivery-day-label'
        aria-describedby={error ? 'delivery-day-error' : undefined}
      >
        <IndexedSnapScroller apiRef={api} defaultIndex={0} style={{ gap: 'var(--spacing-6)' }}>
          <WeekPage selected={selected} onSelect={select} />
        </IndexedSnapScroller>
      </div>
      <input type='hidden' name='deliveryDate' value={selected} />
      {error && <HelperText id='delivery-day-error' error>{error}</HelperText>}
      <div style={{ display: 'grid', gap: 'var(--spacing-6)', marginBlockStart: 'var(--spacing-4)' }}>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--spacing-4)' }}>
          <Button type='reset' variant='secondary' appearance='ghost'>Reset</Button>
          <Button type='submit'>Book delivery</Button>
        </div>
        {result && <Text size={2} role='status' style={{ color: 'var(--label-secondary)' }}>{result}</Text>}
      </div>
    </form>
  );
}
```
<!-- /example -->

## Layout/Overlay

### Layout/Overlay: month picker in a popover

Pages are years, each with twelve month buttons. The popover renders its content only while open, so `defaultIndex` reopens the picker on the year of the selected month; choosing a month closes the popover and updates the trigger label.

<!-- example: indexed-snap-scroller/month-picker-in-popover.tsx -->
```tsx
import {
  Button,
  IndexedSnapScroller,
  IndexedSnapScrollerContent,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Text,
  useIndexedSnapScrollerContext,
} from '@vega-ui/react';
import { useState } from 'react';

const currentYear = new Date().getFullYear();
const monthNames = Array.from({ length: 12 }, (_, month) => (
  new Intl.DateTimeFormat('en-US', { month: 'short' }).format(new Date(2000, month, 1))
));

interface Selection {
  year: number
  month: number
}

interface YearPageProps {
  selected: Selection
  onSelect(value: Selection): void
}

function YearPage({ selected, onSelect }: YearPageProps) {
  const { index } = useIndexedSnapScrollerContext();
  const year = currentYear + index;

  return (
    <IndexedSnapScrollerContent
      role='group'
      aria-label={String(year)}
      style={{ display: 'grid', gap: 'var(--spacing-4)', width: '100%' }}
    >
      <Text size={3} fontWeight={500} style={{ paddingInlineStart: 'var(--spacing-2)' }}>{year}</Text>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: 'var(--spacing-2)' }}>
        {monthNames.map((name, month) => {
          const isSelected = selected.year === year && selected.month === month;

          return (
            <Button
              key={name}
              size='sm'
              variant={isSelected ? 'primary' : 'secondary'}
              appearance={isSelected ? 'fill' : 'ghost'}
              aria-pressed={isSelected}
              onClick={() => onSelect({ year, month })}
              style={{ width: '100%', paddingInline: 0 }}
            >
              {name}
            </Button>
          );
        })}
      </div>
    </IndexedSnapScrollerContent>
  );
}

export default function MonthPickerInPopover() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Selection>({ year: currentYear, month: new Date().getMonth() });

  const select = (value: Selection) => {
    setSelected(value);
    setOpen(false);
  };

  return (
    <Popover open={open} onChangeOpen={setOpen} placement='bottom-start' role='dialog'>
      <PopoverTrigger asChild>
        <Button variant='secondary' appearance='ghost'>
          Billing month: {monthNames[selected.month]} {selected.year}
        </Button>
      </PopoverTrigger>
      <PopoverContent aria-label='Choose billing month' style={{ width: 260, padding: 'var(--spacing-6)', boxSizing: 'border-box' }}>
        <IndexedSnapScroller
          defaultIndex={selected.year - currentYear}
          tabIndex={0}
          aria-label='Years'
          style={{ gap: 'var(--spacing-6)' }}
        >
          <YearPage selected={selected} onSelect={select} />
        </IndexedSnapScroller>
      </PopoverContent>
    </Popover>
  );
}
```
<!-- /example -->

## Edge

### Edge: bounded range

The window is infinite, so bounds are your job: indexes before the first statement and after the current month render placeholder pages, and when the scroll settles on one of them `onScrollSnapChange` scrolls back to the nearest real statement. The scroll back is scheduled with `requestAnimationFrame` because the scroller re-centers its window right after the callback.

<!-- example: indexed-snap-scroller/bounded-statements.tsx -->
```tsx
import {
  IndexedSnapScroller,
  IndexedSnapScrollerContent,
  Text,
  useIndexedSnapScrollerContext,
  type IndexedSnapScrollerApiRef,
} from '@vega-ui/react';
import { useRef, useState, type CSSProperties } from 'react';

const today = new Date();
const accountOpened = new Date(2025, 0, 1);
const firstIndex = (accountOpened.getFullYear() - today.getFullYear()) * 12 + accountOpened.getMonth() - today.getMonth();
const lastIndex = 0;
const monthFormat = new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' });

const pageStyle: CSSProperties = {
  display: 'grid',
  gap: 'var(--spacing-2)',
  width: '100%',
  padding: 'var(--spacing-10)',
  boxSizing: 'border-box',
  borderRadius: 'var(--radius-4)',
  background: 'var(--fills-secondary)',
};

function StatementPage() {
  const { index } = useIndexedSnapScrollerContext();
  const month = new Date(today.getFullYear(), today.getMonth() + index, 1);

  if (index < firstIndex) {
    return (
      <IndexedSnapScrollerContent style={pageStyle}>
        <Text size={2} style={{ color: 'var(--label-secondary)' }}>Statements start in {monthFormat.format(accountOpened)}.</Text>
      </IndexedSnapScrollerContent>
    );
  }

  if (index > lastIndex) {
    return (
      <IndexedSnapScrollerContent style={pageStyle}>
        <Text size={2} style={{ color: 'var(--label-secondary)' }}>The next statement is issued on the 1st.</Text>
      </IndexedSnapScrollerContent>
    );
  }

  return (
    <IndexedSnapScrollerContent style={pageStyle}>
      <Text size={3} fontWeight={500}>{monthFormat.format(month)}</Text>
      <Text size={2} style={{ color: 'var(--label-secondary)' }}>Statement #{index - firstIndex + 1}, PDF, 84 KB</Text>
    </IndexedSnapScrollerContent>
  );
}

export default function BoundedStatements() {
  const api = useRef<IndexedSnapScrollerApiRef>(null);
  const [current, setCurrent] = useState(lastIndex);

  const onSettle = (index: number) => {
    if (index < firstIndex) {
      requestAnimationFrame(() => api.current?.scrollToElementByKey(firstIndex));
      return;
    }

    if (index > lastIndex) {
      requestAnimationFrame(() => api.current?.scrollToElementByKey(lastIndex));
      return;
    }

    setCurrent(index);
  };

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-6)', width: '100%' }}>
      <IndexedSnapScroller
        apiRef={api}
        defaultIndex={lastIndex}
        tabIndex={0}
        aria-label='Statements'
        onScrollSnapChange={(_, index) => onSettle(index)}
        style={{ gap: 'var(--spacing-6)' }}
      >
        <StatementPage />
      </IndexedSnapScroller>
      <Text size={2} style={{ color: 'var(--label-secondary)', fontVariantNumeric: 'tabular-nums' }}>
        Showing statement {current - firstIndex + 1} of {lastIndex - firstIndex + 1}
      </Text>
    </div>
  );
}
```
<!-- /example -->

### Edge: lazy page data

Each page requests its data on mount and the parent caches results by index, so pages that leave the window and come back are not fetched again. `size={7}` and `shift={3}` keep more pages ready on both sides; `onOffset` fires every time the window grows at an edge.

<!-- example: indexed-snap-scroller/lazy-page-data.tsx -->
```tsx
import {
  IndexedSnapScroller,
  IndexedSnapScrollerContent,
  Text,
  useIndexedSnapScrollerContext,
} from '@vega-ui/react';
import { useCallback, useEffect, useRef, useState } from 'react';

const today = new Date();
const dayFormat = new Intl.DateTimeFormat('en-US', { weekday: 'long', month: 'short', day: 'numeric' });
const moneyFormat = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });

interface DayPageProps {
  revenue: Record<number, number>
  onNeed(index: number): void
}

function DayPage({ revenue, onNeed }: DayPageProps) {
  const { index } = useIndexedSnapScrollerContext();
  const day = new Date(today.getFullYear(), today.getMonth(), today.getDate() + index);
  const value = revenue[index];

  useEffect(() => {
    if (value === undefined) onNeed(index);
  }, [index, value, onNeed]);

  return (
    <IndexedSnapScrollerContent
      aria-busy={value === undefined}
      style={{
        display: 'grid',
        gap: 'var(--spacing-2)',
        width: '100%',
        padding: 'var(--spacing-10)',
        boxSizing: 'border-box',
        borderRadius: 'var(--radius-4)',
        background: 'var(--fills-secondary)',
      }}
    >
      <Text size={2} style={{ color: 'var(--label-secondary)' }}>{dayFormat.format(day)}</Text>
      <Text size={5} fontWeight={500} style={{ fontVariantNumeric: 'tabular-nums' }}>
        {value === undefined ? 'Loading…' : moneyFormat.format(value)}
      </Text>
    </IndexedSnapScrollerContent>
  );
}

export default function LazyPageData() {
  const [revenue, setRevenue] = useState<Record<number, number>>({});
  const requested = useRef(new Set<number>());
  const [extensions, setExtensions] = useState(0);

  const load = useCallback((index: number) => {
    if (requested.current.has(index)) return;
    requested.current.add(index);

    window.setTimeout(() => {
      const value = 1800 + (Math.abs(index * 7919) % 900);
      setRevenue((previous) => ({ ...previous, [index]: value }));
    }, 600);
  }, []);

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-6)', width: '100%' }}>
      <IndexedSnapScroller
        defaultIndex={0}
        size={7}
        shift={3}
        tabIndex={0}
        aria-label='Daily revenue'
        onOffset={() => setExtensions((count) => count + 1)}
        style={{ gap: 'var(--spacing-6)' }}
      >
        <DayPage revenue={revenue} onNeed={load} />
      </IndexedSnapScroller>
      <Text size={2} style={{ color: 'var(--label-secondary)', fontVariantNumeric: 'tabular-nums' }}>
        Days loaded: {Object.keys(revenue).length}, window extensions: {extensions}
      </Text>
    </div>
  );
}
```
<!-- /example -->

### Edge: right-to-left months

Month names come from `Intl.DateTimeFormat('ar-EG')` and the container is `dir='rtl'`: later months are on the left, `next()` scrolls to the left, and the arrow icons are swapped to match.

<!-- example: indexed-snap-scroller/rtl-months.tsx -->
```tsx
import {
  Icon,
  IconButton,
  IndexedSnapScroller,
  IndexedSnapScrollerContent,
  Text,
  useIndexedSnapScrollerContext,
  type IndexedSnapScrollerApiRef,
} from '@vega-ui/react';
import { ChevronLeft, ChevronRight } from '@vega-ui/icons';
import { useRef } from 'react';

const today = new Date();
const monthFormat = new Intl.DateTimeFormat('ar-EG', { month: 'long', year: 'numeric' });

function MonthPage() {
  const { index } = useIndexedSnapScrollerContext();
  const month = new Date(today.getFullYear(), today.getMonth() + index, 1);

  return (
    <IndexedSnapScrollerContent
      style={{
        width: '100%',
        padding: 'var(--spacing-10)',
        boxSizing: 'border-box',
        borderRadius: 'var(--radius-4)',
        background: 'var(--fills-secondary)',
      }}
    >
      <Text size={4}>{monthFormat.format(month)}</Text>
    </IndexedSnapScrollerContent>
  );
}

export default function RtlMonths() {
  const api = useRef<IndexedSnapScrollerApiRef>(null);

  return (
    <div dir='rtl' lang='ar' style={{ display: 'grid', gap: 'var(--spacing-4)', width: '100%' }}>
      <IndexedSnapScroller
        apiRef={api}
        defaultIndex={0}
        tabIndex={0}
        aria-label='الأشهر'
        style={{ gap: 'var(--spacing-6)' }}
      >
        <MonthPage />
      </IndexedSnapScroller>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <IconButton aria-label='الشهر السابق' variant='secondary' appearance='ghost' onClick={() => api.current?.prev()}>
          <Icon><ChevronRight /></Icon>
        </IconButton>
        <IconButton aria-label='الشهر التالي' variant='secondary' appearance='ghost' onClick={() => api.current?.next()}>
          <Icon><ChevronLeft /></Icon>
        </IconButton>
      </div>
    </div>
  );
}
```
<!-- /example -->
