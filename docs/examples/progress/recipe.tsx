import {
  Progress,
  ProgressTrack,
  Text,
  type ProgressProps,
} from '@vega-ui/react';
import { useId, type ReactNode } from 'react';

interface MyProgressProps extends ProgressProps {
  label: ReactNode
}

export function MyProgress({ label, valueText, ...props }: MyProgressProps) {
  const labelId = useId();

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-3)', width: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 'var(--spacing-8)' }}>
        <Text id={labelId} size={2} fontWeight={500}>{label}</Text>
        <Text size={2} style={{ color: 'var(--label-secondary)', fontVariantNumeric: 'tabular-nums' }}>{valueText}</Text>
      </div>
      <Progress valueText={valueText} aria-labelledby={labelId} fullWidth {...props}>
        <ProgressTrack />
      </Progress>
    </div>
  );
}

export default function Recipe() {
  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-10)', width: '100%', maxWidth: 360 }}>
      <MyProgress label='quarterly-report.pdf' value={35} valueText='4.2 of 12 MB' size='sm' />
      <MyProgress label='team-offsite.mov' indeterminate valueText='Preparing…' size='sm' />
    </div>
  );
}
