import { Button, Spinner, Text } from '@vega-ui/react';
import { useEffect, useState } from 'react';

const activity = [
  'Maya Chen merged “Fix invoice rounding”',
  'Deploy #4182 finished in 3m 12s',
  'Omar Haddad commented on “Pricing page copy”',
];

export default function ConditionalAsyncState() {
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState<string[]>([]);

  useEffect(() => {
    if (!loading) return;

    const timer = setTimeout(() => {
      setItems(activity);
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, [loading]);

  const load = () => {
    setItems([]);
    setLoading(true);
  };

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-8)', width: '100%' }}>
      <Button size='sm' variant='secondary' appearance='ghost' onClick={load} disabled={loading} style={{ justifySelf: 'start' }}>
        {items.length > 0 ? 'Refresh activity' : 'Load activity'}
      </Button>
      <section
        aria-label='Recent activity'
        aria-busy={loading}
        style={{
          display: 'grid',
          alignContent: 'center',
          minHeight: 132,
          padding: 'var(--spacing-8)',
          border: '1px solid var(--separator-opaque)',
          borderRadius: 'var(--radius-4)',
          background: 'var(--surface-primary)',
        }}
      >
        {!loading && items.length === 0 && (
          <Text size={2} style={{ color: 'var(--label-tertiary)', textAlign: 'center' }}>No activity loaded yet</Text>
        )}
        {loading && (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 'var(--spacing-4)' }}>
            <Spinner size={3} aria-label='Loading activity' />
            <Text size={2} style={{ color: 'var(--label-secondary)' }}>Loading…</Text>
          </div>
        )}
        {!loading && items.length > 0 && (
          <ul style={{ display: 'grid', gap: 'var(--spacing-5)', margin: 0, paddingInlineStart: 'var(--spacing-8)' }}>
            {items.map((item) => <li key={item}><Text size={2}>{item}</Text></li>)}
          </ul>
        )}
      </section>
    </div>
  );
}
