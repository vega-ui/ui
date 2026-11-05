import { Heading, Icon, Text } from '@vega-ui/react';
import { CircleCheckBigIcon } from '@vega-ui/icons';

export default function LargeSemanticIcon() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--spacing-8)', width: '100%', textAlign: 'center' }}>
      <Icon size='xl' strokeWidth={1.5} style={{ color: 'var(--color-green-accent-500)' }}>
        <CircleCheckBigIcon />
      </Icon>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-2)' }}>
        <Heading as='h3' size={4} fontWeight={600}>Payment received</Heading>
        <Text size={3} style={{ color: 'var(--label-secondary)', textWrap: 'balance' }}>We emailed the receipt to finance@acme.com.</Text>
      </div>
    </div>
  );
}
