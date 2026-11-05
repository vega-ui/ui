import { Separator, Text } from '@vega-ui/react';

const stats = [
  { label: 'Revenue', value: '$12.4k' },
  { label: 'Orders', value: '318' },
  { label: 'Refunds', value: '4' },
];

export default function ConstrainedVerticalDivider() {
  return (
    <div style={{ display: 'flex', gap: 'var(--spacing-10)' }}>
      {stats.map((stat, index) => (
        <div key={stat.label} style={{ display: 'flex', gap: 'var(--spacing-10)' }}>
          {index > 0 && <Separator orientation='vertical' style={{ height: 'auto', alignSelf: 'stretch' }} />}
          <div style={{ display: 'grid', gap: 'var(--spacing-1)' }}>
            <Text size={2} style={{ color: 'var(--label-secondary)' }}>{stat.label}</Text>
            <Text size={5} fontWeight={500} style={{ fontVariantNumeric: 'tabular-nums' }}>{stat.value}</Text>
          </div>
        </div>
      ))}
    </div>
  );
}
