import { Button, MeterStack, MeterStackSegment, Text } from '@vega-ui/react';
import { CSSProperties, useId, useState } from 'react';

type Period = '24h' | '7d' | '30d';

const minutesByPeriod: Record<Period, { healthy: number, degraded: number, outage: number }> = {
  '24h': { healthy: 1380, degraded: 52, outage: 8 },
  '7d': { healthy: 9640, degraded: 410, outage: 30 },
  '30d': { healthy: 42310, degraded: 690, outage: 200 },
};

const periods: Period[] = ['24h', '7d', '30d'];

export default function ServiceHealthByPeriod() {
  const titleId = useId();
  const [period, setPeriod] = useState<Period>('24h');

  const { healthy, degraded, outage } = minutesByPeriod[period];
  const total = healthy + degraded + outage;
  const uptime = ((healthy / total) * 100).toFixed(2);

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-8)', width: '100%' }}>
      <div role='group' aria-label='Period' style={{ display: 'flex', gap: 'var(--spacing-2)' }}>
        {periods.map((item) => (
          <Button
            key={item}
            size='sm'
            variant={item === period ? 'primary' : 'secondary'}
            appearance='ghost'
            aria-pressed={item === period}
            onClick={() => setPeriod(item)}
          >
            {item}
          </Button>
        ))}
      </div>
      <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 'var(--spacing-8)' }}>
          <Text id={titleId} size={2} fontWeight={500}>Checkout API</Text>
          <Text size={2} style={{ color: 'var(--label-secondary)', fontVariantNumeric: 'tabular-nums' }}>{uptime}% healthy</Text>
        </div>
        <MeterStack value={total} max={total} role='group' aria-labelledby={titleId} fullWidth>
          <MeterStackSegment
            value={healthy}
            aria-label='Healthy'
            aria-valuetext={`${healthy} minutes`}
            style={{ '--meter-stack-segment-color': 'var(--color-green-500)' } as CSSProperties}
          />
          <MeterStackSegment
            value={degraded}
            aria-label='Degraded'
            aria-valuetext={`${degraded} minutes`}
            style={{ '--meter-stack-segment-color': 'var(--color-amber-500)' } as CSSProperties}
          />
          <MeterStackSegment
            value={outage}
            aria-label='Outage'
            aria-valuetext={`${outage} minutes`}
            style={{ '--meter-stack-segment-color': 'var(--color-red-500)' } as CSSProperties}
          />
        </MeterStack>
        <Text size={2} style={{ color: 'var(--label-secondary)', fontVariantNumeric: 'tabular-nums' }}>
          Degraded {degraded} min · Outage {outage} min
        </Text>
      </div>
    </div>
  );
}
