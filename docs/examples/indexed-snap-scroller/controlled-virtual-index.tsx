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
