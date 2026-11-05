import { Badge, Heading, Text } from '@vega-ui/react';

export default function HeadingFlags() {
  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-10)', width: '100%', maxWidth: 520 }}>
      <div style={{ display: 'grid', gap: 'var(--spacing-2)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-4)' }}>
          <Heading as='h3' size={4} fontWeight={600}>Usage-based billing</Heading>
          <Badge size='xs' variant='info' appearance='outline'>Beta</Badge>
        </div>
        <Text size={2} style={{ color: 'var(--label-secondary)' }}>Charge customers for API calls, seats or storage.</Text>
      </div>
      <div style={{ display: 'grid', gap: 'var(--spacing-2)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-4)' }}>
          <Heading as='h3' size={4} fontWeight={600}>Audit log export</Heading>
          <Badge size='xs' variant='warning' appearance='surface'>Enterprise</Badge>
        </div>
        <Text size={2} style={{ color: 'var(--label-secondary)' }}>Stream every admin action to your SIEM.</Text>
      </div>
    </div>
  );
}
