# Meter Patterns

## Capacity Indicator

When to use:

- The UI shows quota, storage, or bounded capacity.

Composition notes:

- Pair the bar with text that explains both the subject and scale.
- Use thresholds when the measurement has meaningful zones.

Trade-offs:

- Strong for quantitative summaries.
- Weak fit when the range is not meaningful to users.

<!-- example: meter/storage-usage.tsx -->
```tsx
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
```
<!-- /example -->

## Health Or Score Summary

When to use:

- A score or health measure belongs in a compact summary surface.

Composition notes:

- Keep threshold meaning explicit.
- Use card or row context so the user knows what is being measured.

Trade-offs:

- Good for dashboards and summaries.
- Can be misread as progress if surrounding text is weak.

<!-- example: meter/meter-inside-a-card.tsx -->
```tsx
import { Card, Heading, Meter, MeterTrack, Text } from '@vega-ui/react';
import { useId } from 'react';

const usage = [
  { id: 'seats', label: 'Seats', used: 18, limit: 20, unit: 'seats' },
  { id: 'storage', label: 'Storage', used: 412, limit: 500, unit: 'GB' },
  { id: 'minutes', label: 'Build minutes', used: 1240, limit: 3000, unit: 'min' },
];

export const locales = ['en-US', 'ru-RU', 'ar-EG', 'he-IL'];

export default function MeterInsideACard({ locale = 'en-US' }: { locale?: string }) {
  const prefix = useId();
  const format = new Intl.NumberFormat(locale);

  return (
    <Card size='sm' style={{ display: 'grid', gap: 'var(--spacing-8)', width: '100%' }}>
      <Heading as='h3' size={4} fontWeight={600}>Pro plan usage</Heading>
      <ul style={{ display: 'grid', gap: 'var(--spacing-8)', margin: 0, padding: 0, listStyle: 'none' }}>
        {usage.map((item) => {
          const labelId = `${prefix}-${item.id}`;
          const summary = `${format.format(item.used)} of ${format.format(item.limit)} ${item.unit}`;

          return (
            <li key={item.id} style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 'var(--spacing-8)' }}>
                <Text id={labelId} size={2}>{item.label}</Text>
                <Text size={2} style={{ color: 'var(--label-secondary)', fontVariantNumeric: 'tabular-nums' }}>{summary}</Text>
              </div>
              <Meter
                value={item.used}
                max={item.limit}
                low={item.limit * 0.75}
                high={item.limit * 0.9}
                optimum={0}
                valueText={summary}
                aria-labelledby={labelId}
                size='sm'
                fullWidth
              >
                <MeterTrack />
              </Meter>
            </li>
          );
        })}
      </ul>
    </Card>
  );
}
```
<!-- /example -->

## Threshold-Aware Measurement

When to use:

- The range has good, warning, and bad zones.

Composition notes:

- Configure `low`, `high`, and `optimum` intentionally.
- Do not rely on the color shift alone to communicate meaning.

Trade-offs:

- Richer semantic feedback for one measurement.
- Requires more product discipline around thresholds.

<!-- example: meter/battery-level.tsx -->
```tsx
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
```
<!-- /example -->
