import { Heading, Text } from '@vega-ui/react';

export default function BasicUsage() {
  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-4)', width: '100%' }}>
      <Heading as='h2'>Workspace settings</Heading>
      <Text size={3} style={{ color: 'var(--label-secondary)' }}>Manage the name, members and billing of the Acme workspace.</Text>
    </div>
  );
}
