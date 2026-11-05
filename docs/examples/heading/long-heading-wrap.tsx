import { Heading } from '@vega-ui/react';

export default function LongHeadingWrap() {
  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-12)', width: '100%' }}>
      <Heading as='h3' size={6} style={{ textWrap: 'balance' }}>
        Quarterly revenue report for the Europe, Middle East and Africa region
      </Heading>
      <Heading as='h3' size={6} style={{ overflowWrap: 'anywhere' }}>
        Datenschutzgrundverordnungskonformität
      </Heading>
    </div>
  );
}
