import { Button, Card, Heading, Separator, Text } from '@vega-ui/react';

export default function ValidCompositionPatterns() {
  return (
    <Card style={{ display: 'grid', gap: 'var(--spacing-8)', width: '100%' }}>
      <div style={{ display: 'grid', gap: 'var(--spacing-2)' }}>
        <Heading as='h3' size={4}>Quarterly report</Heading>
        <Text size={2} style={{ color: 'var(--label-secondary)' }}>Revenue grew 12% compared to the previous quarter.</Text>
      </div>
      <Separator />
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-4)', height: 'var(--spacing-16)' }}>
        <Button size='sm' variant='secondary' appearance='ghost'>Download PDF</Button>
        <Separator orientation='vertical' />
        <Button size='sm' variant='secondary' appearance='ghost'>Share</Button>
      </div>
    </Card>
  );
}
