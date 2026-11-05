import { Button, Text } from '@vega-ui/react';
import { useEffect, useState, type CSSProperties } from 'react';

const relative = new Intl.RelativeTimeFormat('en-US', { numeric: 'auto' });

export default function StatusCopy() {
  const [lastSync, setLastSync] = useState(() => Date.now() - 4 * 60 * 1000);
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 15000);
    return () => window.clearInterval(timer);
  }, []);

  const minutes = Math.round((lastSync - now) / 60000);

  const syncNow = () => {
    const time = Date.now();
    setLastSync(time);
    setNow(time);
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-6)', width: '100%' }}>
      <Text size={2} style={{ '--t-color': 'var(--label-secondary)', fontVariantNumeric: 'tabular-nums' } as CSSProperties}>
        Last synced{' '}
        <time dateTime={new Date(lastSync).toISOString()}>{relative.format(minutes, 'minute')}</time>
      </Text>
      <Button size='sm' variant='secondary' appearance='ghost' onClick={syncNow}>Sync now</Button>
    </div>
  );
}
