import {
  Card,
  Heading,
  Meter,
  MeterTrack,
  Text,
  type MeterProps,
} from '@vega-ui/react';
import { useId, type ReactNode } from 'react';

interface MyMeterProps extends MeterProps {
  label: ReactNode
}

export function MyMeter({ label, valueText, ...props }: MyMeterProps) {
  const labelId = useId();

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-3)', width: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 'var(--spacing-8)' }}>
        <Text id={labelId} size={2}>{label}</Text>
        <Text size={2} style={{ color: 'var(--label-secondary)', fontVariantNumeric: 'tabular-nums' }}>{valueText}</Text>
      </div>
      <Meter valueText={valueText} aria-labelledby={labelId} fullWidth {...props}>
        <MeterTrack />
      </Meter>
    </div>
  );
}

export default function Recipe() {
  return (
    <Card size='sm' style={{ display: 'grid', gap: 'var(--spacing-8)', width: '100%' }}>
      <Heading as='h3' size={4} fontWeight={600}>Pro plan usage</Heading>
      <MyMeter label='Seats' value={18} max={20} low={15} high={18} optimum={0} valueText='18 of 20 seats' size='sm' />
      <MyMeter label='Storage' value={412} max={500} low={375} high={450} optimum={0} valueText='412 of 500 GB' size='sm' />
      <MyMeter label='Build minutes' value={1240} max={3000} low={2250} high={2700} optimum={0} valueText='1,240 of 3,000 min' size='sm' />
    </Card>
  );
}
