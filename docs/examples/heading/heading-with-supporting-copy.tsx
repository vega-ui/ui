import { Heading, Text } from '@vega-ui/react';
import type { CSSProperties } from 'react';

export default function HeadingWithSupportingCopy() {
  return (
    <hgroup style={{ display: 'grid', gap: 'var(--spacing-2)', width: '100%', margin: 0 }}>
      <Heading as='h2' size={6}>Billing contacts</Heading>
      <Text asChild size={3} style={{ '--t-color': 'var(--label-secondary)' } as CSSProperties}>
        <p>Invoices and payment reminders are sent to these people.</p>
      </Text>
    </hgroup>
  );
}
