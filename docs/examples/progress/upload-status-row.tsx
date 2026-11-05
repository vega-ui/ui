import { Progress, ProgressTrack, Text } from '@vega-ui/react';
import { useId } from 'react';

export default function UploadStatusRow() {
  const nameId = useId();
  const uploadedMb = 4.2;
  const totalMb = 12;
  const percent = Math.round((uploadedMb / totalMb) * 100);

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-3)', width: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 'var(--spacing-8)' }}>
        <Text id={nameId} size={2} fontWeight={500}>quarterly-report.pdf</Text>
        <Text size={2} style={{ color: 'var(--label-secondary)', fontVariantNumeric: 'tabular-nums' }}>{uploadedMb} of {totalMb} MB</Text>
      </div>
      <Progress
        value={percent}
        valueText={`${percent}%, ${uploadedMb} of ${totalMb} MB`}
        aria-labelledby={nameId}
        size='sm'
        fullWidth
      >
        <ProgressTrack />
      </Progress>
    </div>
  );
}
