import { useState } from 'react';
import { Button, Card, Heading, Spinner, Text } from '@vega-ui/react';

const formatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });

export default function MetricsCard() {
  const [revenue, setRevenue] = useState(48210.4);
  const [updatedAt, setUpdatedAt] = useState('09:00');
  const [loading, setLoading] = useState(false);

  const refresh = () => {
    setLoading(true);
    setTimeout(() => {
      const now = new Date();
      setRevenue((current) => current + Math.round(Math.random() * 90000) / 100);
      setUpdatedAt(now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }));
      setLoading(false);
    }, 900);
  };

  return (
    <Card aria-labelledby='revenue-title' aria-busy={loading} style={{ width: '100%', maxWidth: 300, gap: 'var(--spacing-2)' }}>
      <Heading id='revenue-title' as='h3' size={2} fontWeight={500} style={{ color: 'var(--label-secondary)' }}>Revenue this month</Heading>
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-4)', minHeight: 36 }}>
        <Text size={7} fontWeight={500} style={{ fontVariantNumeric: 'tabular-nums' }}>{formatter.format(revenue)}</Text>
        {loading && <Spinner size={3} aria-label='Refreshing revenue' />}
      </div>
      <Text size={2} style={{ color: 'var(--label-tertiary)', fontVariantNumeric: 'tabular-nums' }}>Updated at {updatedAt}</Text>
      <Button size='sm' variant='secondary' appearance='ghost' disabled={loading} onClick={refresh} style={{ marginBlockStart: 'var(--spacing-6)' }}>Refresh</Button>
    </Card>
  );
}
