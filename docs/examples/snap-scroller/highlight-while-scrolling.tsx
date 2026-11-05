import { SnapScroller, SnapScrollerContent, Text } from '@vega-ui/react';
import { useState } from 'react';
import './examples.css';

const days = [
  { date: 'Mon, Mar 3', slots: 4 },
  { date: 'Tue, Mar 4', slots: 2 },
  { date: 'Wed, Mar 5', slots: 6 },
  { date: 'Thu, Mar 6', slots: 1 },
  { date: 'Fri, Mar 7', slots: 5 },
  { date: 'Sat, Mar 8', slots: 3 },
  { date: 'Sun, Mar 9', slots: 0 },
];

export default function HighlightWhileScrolling() {
  const [pending, setPending] = useState(0);
  const [committed, setCommitted] = useState(0);

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-4)', width: '100%' }}>
      <SnapScroller
        tabIndex={0}
        aria-label='Delivery days'
        onScrollSnapChanging={(_, index) => setPending(index)}
        onScrollSnapChange={(_, index) => setCommitted(index)}
        style={{ gap: 'var(--spacing-6)', marginBlockEnd: 'var(--spacing-4)' }}
      >
        {days.map((day, index) => (
          <SnapScrollerContent
            key={day.date}
            index={index}
            className='snapScrollerDay'
            style={{
              display: 'grid',
              gap: 'var(--spacing-2)',
              width: '85%',
              padding: 'var(--spacing-10)',
              boxSizing: 'border-box',
              borderRadius: 'var(--radius-4)',
              background: 'var(--fills-secondary)',
              opacity: pending === index ? 1 : 0.5,
            }}
          >
            <Text size={3} fontWeight={500}>{day.date}</Text>
            <Text size={2} style={{ color: 'var(--label-secondary)' }}>{day.slots} delivery slots left</Text>
          </SnapScrollerContent>
        ))}
      </SnapScroller>
      <Text size={2} style={{ color: 'var(--label-secondary)' }}>While scrolling: {days[pending].date}</Text>
      <Text size={2} style={{ color: 'var(--label-secondary)' }}>Settled on: {days[committed].date}</Text>
    </div>
  );
}
