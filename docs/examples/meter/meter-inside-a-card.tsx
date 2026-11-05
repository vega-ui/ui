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
