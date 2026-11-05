import { Meter, MeterTrack } from '@vega-ui/react';

export default function MinimalComposition() {
  return (
    <Meter value={0.72} valueText='72%' aria-label='Disk usage' fullWidth>
      <MeterTrack />
    </Meter>
  );
}
