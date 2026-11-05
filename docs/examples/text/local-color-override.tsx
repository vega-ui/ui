import { Text } from '@vega-ui/react';
import type { CSSProperties } from 'react';

export default function LocalColorOverride() {
  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-4)', width: '100%' }}>
      <Text size={3}>Starter plan, billed monthly</Text>
      <div style={{ display: 'grid', gap: 'var(--spacing-1)', '--t-color': 'var(--label-secondary)' } as CSSProperties}>
        <Text size={2}>Renews on April 1</Text>
        <Text size={2}>Visa ending in 4242</Text>
        <Text size={2} style={{ '--t-color': 'var(--color-error)' } as CSSProperties}>
          Card expires this month
        </Text>
      </div>
    </div>
  );
}
