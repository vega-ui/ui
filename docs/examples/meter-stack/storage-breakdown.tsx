import { MeterStack, MeterStackSegment, Text } from '@vega-ui/react';
import { CSSProperties, useId } from 'react';

const categories = [
  { id: 'apps', label: 'Apps', gb: 82, color: 'var(--color-blue-500)' },
  { id: 'photos', label: 'Photos', gb: 64, color: 'var(--color-purple-500)' },
  { id: 'messages', label: 'Messages', gb: 18, color: 'var(--color-green-500)' },
  { id: 'system', label: 'System', gb: 31, color: 'var(--color-gray-500)' },
];

export default function StorageBreakdown() {
  const titleId = useId();
  const capacity = 256;
  const used = categories.reduce((sum, category) => sum + category.gb, 0);

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-8)', width: '100%' }}>
      <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 'var(--spacing-8)' }}>
          <Text id={titleId} size={2} fontWeight={500}>iPhone storage</Text>
          <Text size={2} style={{ color: 'var(--label-secondary)', fontVariantNumeric: 'tabular-nums' }}>{used} GB of {capacity} GB used</Text>
        </div>
        <MeterStack value={used} max={capacity} role='group' aria-labelledby={titleId} fullWidth>
          {categories.map((category) => (
            <MeterStackSegment
              key={category.id}
              value={category.gb}
              aria-label={category.label}
              aria-valuetext={`${category.gb} GB`}
              style={{ '--meter-stack-segment-color': category.color } as CSSProperties}
            />
          ))}
        </MeterStack>
      </div>
      <ul style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 'var(--spacing-4) var(--spacing-8)', margin: 0, padding: 0, listStyle: 'none' }}>
        {categories.map((category) => (
          <li key={category.id} style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-3)' }}>
            <span aria-hidden='true' style={{ flexShrink: 0, width: 8, height: 8, borderRadius: '50%', background: category.color }} />
            <Text size={2}>{category.label}</Text>
            <Text size={2} style={{ marginInlineStart: 'auto', color: 'var(--label-secondary)', fontVariantNumeric: 'tabular-nums' }}>{category.gb} GB</Text>
          </li>
        ))}
      </ul>
    </div>
  );
}
