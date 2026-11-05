import { Meter, MeterTrack, Text } from '@vega-ui/react';
import { useId } from 'react';

export default function StorageUsage() {
  const labelId = useId();
  const usedGb = 36.2;
  const limitGb = 50;
  const summary = `${usedGb} GB of ${limitGb} GB used`;

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-3)', width: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 'var(--spacing-8)' }}>
        <Text id={labelId} size={2} fontWeight={500}>Cloud storage</Text>
        <Text size={2} style={{ color: 'var(--label-secondary)', fontVariantNumeric: 'tabular-nums' }}>{summary}</Text>
      </div>
      <Meter value={usedGb} max={limitGb} valueText={summary} aria-labelledby={labelId} fullWidth>
        <MeterTrack />
      </Meter>
    </div>
  );
}
