import { Text } from '@vega-ui/react';

const address = 'Acme GmbH\nTorstraße 140\n10119 Berlin\nGermany';
const description = 'Soft merino wool sweater with a relaxed fit,\nribbed cuffs and a crew neck.\nMachine washable at 30\u00a0°C.';

export default function MultilineContent() {
  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-8)', width: '100%' }}>
      <Text size={3}>{address}</Text>
      <Text size={3} style={{ whiteSpace: 'normal' }}>{description}</Text>
    </div>
  );
}
