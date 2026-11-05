import { MeterStack, MeterStackSegment, Text } from '@vega-ui/react';
import { CSSProperties, useId } from 'react';

const languages = [
  { name: 'TypeScript', bytes: 812400 },
  { name: 'CSS', bytes: 146900 },
  { name: 'MDX', bytes: 61300 },
  { name: 'JavaScript', bytes: 18200 },
  { name: 'Shell', bytes: 4100 },
  { name: 'HTML', bytes: 2600 },
  { name: 'Dockerfile', bytes: 900 },
  { name: 'Makefile', bytes: 400 },
];

const colors = ['var(--color-blue-500)', 'var(--color-purple-500)', 'var(--color-orange-500)', 'var(--color-amber-500)'];

export default function ManySmallSegments() {
  const titleId = useId();
  const total = languages.reduce((sum, language) => sum + language.bytes, 0);
  const minShare = 0.02;

  const visible = languages.filter((language) => language.bytes / total >= minShare);
  const hidden = languages.filter((language) => language.bytes / total < minShare);
  const otherBytes = hidden.reduce((sum, language) => sum + language.bytes, 0);

  const segments = visible.map((language, index) => ({ label: language.name, bytes: language.bytes, color: colors[index] }));
  if (otherBytes > 0) {
    segments.push({ label: `Other (${hidden.length})`, bytes: otherBytes, color: 'var(--color-gray-500)' });
  }

  const percent = (bytes: number) => `${((bytes / total) * 100).toFixed(1)}%`;

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-8)', width: '100%' }}>
      <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
        <Text id={titleId} size={2} fontWeight={500}>Languages</Text>
        <MeterStack value={total} max={total} role='group' aria-labelledby={titleId} fullWidth>
          {segments.map((segment) => (
            <MeterStackSegment
              key={segment.label}
              value={segment.bytes}
              aria-label={segment.label}
              aria-valuetext={percent(segment.bytes)}
              style={{ '--meter-stack-segment-color': segment.color } as CSSProperties}
            />
          ))}
        </MeterStack>
      </div>
      <ul style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 'var(--spacing-4) var(--spacing-8)', margin: 0, padding: 0, listStyle: 'none' }}>
        {segments.map((segment) => (
          <li key={segment.label} style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-3)' }}>
            <span aria-hidden='true' style={{ flexShrink: 0, width: 8, height: 8, borderRadius: '50%', background: segment.color }} />
            <Text size={2}>{segment.label}</Text>
            <Text size={2} style={{ marginInlineStart: 'auto', color: 'var(--label-secondary)', fontVariantNumeric: 'tabular-nums' }}>{percent(segment.bytes)}</Text>
          </li>
        ))}
      </ul>
      <Text size={1} style={{ color: 'var(--label-tertiary)' }}>
        Other: {hidden.map((language) => language.name).join(', ')}
      </Text>
    </div>
  );
}
