import { Card, Heading, Text } from '@vega-ui/react';

const keys = [
  { name: 'Production', created: 'Created Jan 12', lastUsed: 'Used 2 minutes ago' },
  { name: 'CI pipeline', created: 'Created Feb 3', lastUsed: 'Used yesterday' },
];

export default function CompactHierarchyInDensePanels() {
  return (
    <Card asChild size='sm' style={{ display: 'grid', gap: 'var(--spacing-6)', width: '100%' }}>
      <section aria-labelledby='api-keys-title'>
        <Heading as='h3' size={4} id='api-keys-title'>API keys</Heading>
        {keys.map((key) => (
          <div key={key.name} style={{ display: 'grid', gap: 'var(--spacing-1)' }}>
            <Heading as='h4' size={3} fontWeight={500}>{key.name}</Heading>
            <Text size={2} style={{ color: 'var(--label-secondary)' }}>{key.created} · {key.lastUsed}</Text>
          </div>
        ))}
      </section>
    </Card>
  );
}
