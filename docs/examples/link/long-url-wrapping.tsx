import { Link, Text } from '@vega-ui/react';

const webhookUrl = 'https://hooks.example.com/services/T024BE7LD/B08S9Q2KJ7H/aD4f9kLq2ZxR7mN3pW8vY1cE';

export default function LongUrlWrapping() {
  return (
    <div style={{ width: 240, padding: 'var(--spacing-8)', border: '1px solid var(--separator-opaque)', borderRadius: 'var(--radius-4)', background: 'var(--surface-primary)' }}>
      <Text size={3}>
        Events are sent to{' '}
        <Link href={webhookUrl} style={{ overflowWrap: 'anywhere' }}>{webhookUrl}</Link>
      </Text>
    </div>
  );
}
