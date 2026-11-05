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
