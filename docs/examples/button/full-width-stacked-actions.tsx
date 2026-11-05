import { Button, Heading, Text } from '@vega-ui/react';

export default function FullWidthStackedActions() {
  return (
    <section
      aria-labelledby='upgrade-title'
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--spacing-12)',
        width: '100%',
        padding: 'var(--spacing-12)',
        borderRadius: 'var(--radius-5)',
        border: '1px solid var(--separator-opaque)',
        background: 'var(--surface-primary)',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)' }}>
        <Heading id='upgrade-title' as='h3' size={4} fontWeight={600}>Team plan</Heading>
        <Text size={3} style={{ color: 'var(--label-secondary)' }}>
          $12 per seat each month. Unlimited projects and shared libraries.
        </Text>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)' }}>
        <Button type='button' fullWidth>Start 14-day trial</Button>
        <Button type='button' fullWidth variant='secondary' appearance='transparent'>Compare plans</Button>
      </div>
    </section>
  );
}
