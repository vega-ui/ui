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
