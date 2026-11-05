import { Card, Heading, Separator, Text } from '@vega-ui/react';

export default function SectionBreakInsideAPanel() {
  return (
    <Card style={{ display: 'grid', gap: 'var(--spacing-8)', width: '100%' }}>
      <section aria-labelledby='plan-usage-title' style={{ display: 'grid', gap: 'var(--spacing-2)' }}>
        <Heading as='h3' size={4} id='plan-usage-title'>Usage this month</Heading>
        <Text size={2} style={{ color: 'var(--label-secondary)', fontVariantNumeric: 'tabular-nums' }}>7,420 of 10,000 API requests used.</Text>
      </section>
      <Separator />
      <section aria-labelledby='plan-billing-title' style={{ display: 'grid', gap: 'var(--spacing-2)' }}>
        <Heading as='h3' size={4} id='plan-billing-title'>Next invoice</Heading>
        <Text size={2} style={{ color: 'var(--label-secondary)', fontVariantNumeric: 'tabular-nums' }}>$49.00 on April 1, charged to Visa ending in 4242.</Text>
      </section>
    </Card>
  );
}
