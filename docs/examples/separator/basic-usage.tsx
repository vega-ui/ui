import { Heading, Separator, Text } from '@vega-ui/react';

export default function BasicUsage() {
  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-8)', width: '100%' }}>
      <div style={{ display: 'grid', gap: 'var(--spacing-2)' }}>
        <Heading as='h3' size={4}>Notifications</Heading>
        <Text size={2} style={{ color: 'var(--label-secondary)' }}>Email me when someone mentions me or assigns me a task.</Text>
      </div>
      <Separator />
      <div style={{ display: 'grid', gap: 'var(--spacing-2)' }}>
        <Heading as='h3' size={4}>Privacy</Heading>
        <Text size={2} style={{ color: 'var(--label-secondary)' }}>Only workspace members can see my profile and activity.</Text>
      </div>
    </div>
  );
}
