import { Heading, Text } from '@vega-ui/react';

export default function ValidCompositionPatterns() {
  return (
    <section aria-labelledby='billing-contacts-title' style={{ display: 'grid', gap: 'var(--spacing-2)', width: '100%' }}>
      <Heading as='h3' size={5} id='billing-contacts-title'>Billing contacts</Heading>
      <Text size={2} style={{ color: 'var(--label-secondary)' }}>Invoices are sent to finance@acme.io and the workspace owner.</Text>
    </section>
  );
}
