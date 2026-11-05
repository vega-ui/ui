import { MeterStack, MeterStackSegment } from '@vega-ui/react';

export default function MinimalComposition() {
  return (
    <MeterStack value={0.8} max={1} role='group' aria-label='Disk usage' fullWidth>
      <MeterStackSegment value={0.5} aria-label='Apps' />
      <MeterStackSegment value={0.3} aria-label='Photos' />
    </MeterStack>
  );
}
