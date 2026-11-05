import { Button, Meter, MeterTrack, Text } from '@vega-ui/react';
import { useId, useState } from 'react';

export default function BatteryLevel() {
  const labelId = useId();
  const statusId = useId();
  const [level, setLevel] = useState(64);

  let status = 'Battery is fine';
  if (level < 20) {
    status = 'Battery is low — connect the charger';
  } else if (level > 80) {
    status = 'Battery is almost full';
  }

  const discharge = () => setLevel(Math.max(level - 15, 0));
  const charge = () => setLevel(Math.min(level + 15, 100));

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-12)', width: '100%', maxWidth: 360 }}>
      <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 'var(--spacing-8)' }}>
          <Text id={labelId} size={2} fontWeight={500}>Headphones battery</Text>
          <Text size={2} style={{ fontVariantNumeric: 'tabular-nums' }}>{level}%</Text>
        </div>
        <Meter
          value={level}
          max={100}
          low={20}
          high={80}
          optimum={100}
          valueText={`${level}%`}
          aria-labelledby={labelId}
          aria-describedby={statusId}
          fullWidth
        >
          <MeterTrack />
        </Meter>
        <Text id={statusId} size={2} style={{ color: 'var(--label-secondary)' }}>{status}</Text>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--spacing-4)' }}>
        <Button size='sm' variant='secondary' appearance='ghost' onClick={discharge} disabled={level === 0}>
          Listen for an hour
        </Button>
        <Button size='sm' variant='secondary' appearance='ghost' onClick={charge} disabled={level === 100}>
          Charge for 15 minutes
        </Button>
      </div>
    </div>
  );
}
