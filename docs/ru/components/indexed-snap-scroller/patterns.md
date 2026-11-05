# IndexedSnapScroller: паттерны

## Контролируемый виртуальный индекс

Когда использовать:

- логический индекс страницы должен оставаться синхронизированным с внешним интерфейсом, например с числовыми элементами управления

Заметки о композиции:

- управляйте и внешним элементом, и скроллером из одного состояния индекса
- пусть `onScrollSnapChanging` или `onScrollSnapChange` обновляют это состояние

Компромиссы:

- явная синхронизация
- больше движущихся частей, чем у неконтролируемого скроллера

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

## Окно виртуальной ленты

Когда использовать:

- видимый набор страниц должен сдвигаться, когда пользователь движется вперёд или назад

Заметки о композиции:

- настройте `size`, `shift` и `start`
- содержимое страниц должно быть устойчивым к смене логических индексов

Компромиссы:

- масштабируется
- сложнее для понимания, чем фиксированный список страниц

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

## Низкоуровневое пролистывание календаря или ленты

Когда использовать:

- другой подсистеме нужна виртуальная индексация страниц, но обёртки для предметной области ещё нет

Заметки о композиции:

- держите логику предметной области вне скроллера
- используйте предоставляемый контекст индекса при рендере содержимого

Компромиссы:

- переиспользуемая основа
- легко переусложнить, если обёртка более высокого уровня уже существует

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
