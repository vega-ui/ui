import { MeterStack, MeterStackSegment } from '@vega-ui/react';
import { CSSProperties } from 'react';

export default function CustomBlueScale() {
  return (
    <MeterStack value={0.85} max={1} role='group' aria-label='Traffic by region' size='lg' fullWidth>
      <MeterStackSegment value={0.4} aria-label='Europe' style={{ '--meter-stack-segment-color': 'var(--color-blue-accent-700)' } as CSSProperties} />
      <MeterStackSegment value={0.3} aria-label='North America' style={{ '--meter-stack-segment-color': 'var(--color-blue-accent-500)' } as CSSProperties} />
      <MeterStackSegment value={0.15} aria-label='Asia' style={{ '--meter-stack-segment-color': 'var(--color-blue-accent-300)' } as CSSProperties} />
    </MeterStack>
  );
}
