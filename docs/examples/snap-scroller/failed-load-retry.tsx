import { Button, SnapScroller, SnapScrollerContent, Text } from '@vega-ui/react';
import { useRef, useState, type CSSProperties } from 'react';

const reviews = [
  { author: 'Maya R.', text: 'Setup took ten minutes and the import kept all our tags.' },
  { author: 'Daniel K.', text: 'The SLA timers alone saved us from two missed escalations.' },
  { author: 'Priya S.', text: 'Saved replies cut our average response time almost in half.' },
];

type Status = 'idle' | 'loading' | 'error' | 'ready';

const slideStyle: CSSProperties = {
  display: 'grid',
  gap: 'var(--spacing-4)',
  width: '100%',
  padding: 'var(--spacing-10)',
  boxSizing: 'border-box',
  borderRadius: 'var(--radius-4)',
  background: 'var(--fills-secondary)',
};

export default function FailedLoadRetry() {
  const [status, setStatus] = useState<Status>('idle');
  const attempts = useRef(0);

  const load = () => {
    attempts.current += 1;
    const shouldFail = attempts.current === 1;
    setStatus('loading');

    window.setTimeout(() => {
      if (shouldFail) {
        setStatus('error');
        return;
      }

      setStatus('ready');
    }, 800);
  };

  if (status === 'ready') {
    return (
      <SnapScroller
        tabIndex={0}
        aria-label='Customer reviews'
        defaultIndex={reviews.length - 1}
        style={{ width: '100%', gap: 'var(--spacing-6)' }}
      >
        {reviews.map((review, index) => (
          <SnapScrollerContent key={review.author} index={index} style={slideStyle}>
            <Text size={2}>{review.text}</Text>
            <Text size={2} style={{ color: 'var(--label-secondary)' }}>{review.author}</Text>
          </SnapScrollerContent>
        ))}
      </SnapScroller>
    );
  }

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-6)', justifyItems: 'start', width: '100%' }}>
      {status === 'error' && (
        <Text size={2} role='alert' style={{ '--t-color': 'var(--color-error)' } as CSSProperties}>
          Reviews could not be loaded. Check your connection and try again.
        </Text>
      )}
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-6)' }}>
        <Button size='sm' disabled={status === 'loading'} onClick={load}>
          {status === 'idle' ? 'Load reviews' : 'Retry'}
        </Button>
        {status === 'loading' && <Text size={2} role='status' style={{ color: 'var(--label-secondary)' }}>Loading reviews…</Text>}
      </div>
    </div>
  );
}
