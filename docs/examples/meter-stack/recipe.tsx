import {
  MeterStack,
  MeterStackSegment,
  Text,
  type MeterStackProps,
} from '@vega-ui/react';
import { useId, type CSSProperties, type ReactNode } from 'react';

interface Segment {
  label: string
  value: number
  valueText: string
  color: string
}

interface MyMeterStackProps extends MeterStackProps {
  label: ReactNode
  summary: ReactNode
  segments: Segment[]
}

export function MyMeterStack({ label, summary, segments, ...props }: MyMeterStackProps) {
  const labelId = useId();

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-8)', width: '100%' }}>
      <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 'var(--spacing-8)' }}>
          <Text id={labelId} size={2} fontWeight={500}>{label}</Text>
          <Text size={2} style={{ color: 'var(--label-secondary)', fontVariantNumeric: 'tabular-nums' }}>{summary}</Text>
        </div>
        <MeterStack aria-labelledby={labelId} fullWidth {...props}>
          {segments.map((segment) => (
            <MeterStackSegment
              key={segment.label}
              value={segment.value}
              aria-label={segment.label}
              aria-valuetext={segment.valueText}
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
            <Text size={2} style={{ marginInlineStart: 'auto', color: 'var(--label-secondary)', fontVariantNumeric: 'tabular-nums' }}>{segment.valueText}</Text>
          </li>
        ))}
      </ul>
    </div>
  );
}

const categories = [
  { label: 'Apps', value: 82, valueText: '82 GB', color: 'var(--color-blue-500)' },
  { label: 'Photos', value: 64, valueText: '64 GB', color: 'var(--color-purple-500)' },
  { label: 'Messages', value: 18, valueText: '18 GB', color: 'var(--color-green-500)' },
  { label: 'System', value: 31, valueText: '31 GB', color: 'var(--color-gray-500)' },
];

export default function Recipe() {
  return (
    <MyMeterStack
      label='iPhone storage'
      summary='195 GB of 256 GB used'
      value={195}
      max={256}
      segments={categories}
    />
  );
}
