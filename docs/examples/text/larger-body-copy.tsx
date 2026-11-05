import { Text } from '@vega-ui/react';
import type { CSSProperties } from 'react';

export default function LargerBodyCopy() {
  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-6)', width: '100%', maxWidth: '60ch' }}>
      <Text asChild size={5}>
        <p>Ship design changes to every product from one set of tokens.</p>
      </Text>
      <Text asChild size={3}>
        <p>Update a color or radius once and every app that uses the theme picks it up on the next build.</p>
      </Text>
      <Text asChild size={1} style={{ '--t-color': 'var(--label-tertiary)', marginBlockStart: 'var(--spacing-2)' } as CSSProperties}>
        <p>Prices exclude VAT. Annual plans are billed upfront.</p>
      </Text>
    </div>
  );
}
