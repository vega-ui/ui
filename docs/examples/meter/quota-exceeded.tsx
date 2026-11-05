import { Button, HelperText, Meter, MeterTrack, Text } from '@vega-ui/react';
import { useId, useState } from 'react';

export const locales = ['en-US', 'ru-RU', 'ar-EG', 'he-IL'];

export default function QuotaExceeded({ locale = 'en-US' }: { locale?: string }) {
  const labelId = useId();
  const errorId = useId();
  const limit = 10000;
  const [requests, setRequests] = useState(8700);

  const format = new Intl.NumberFormat(locale);
  const exceeded = requests > limit;
  const summary = `${format.format(requests)} of ${format.format(limit)} requests`;

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-12)', width: '100%' }}>
      <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 'var(--spacing-8)' }}>
          <Text id={labelId} size={2} fontWeight={500}>API requests</Text>
          <Text size={2} style={{ color: 'var(--label-secondary)', fontVariantNumeric: 'tabular-nums' }}>{summary}</Text>
        </div>
        <Meter
          value={requests}
          max={limit}
          low={limit * 0.8}
          high={limit}
          optimum={0}
          valueText={summary}
          aria-labelledby={labelId}
          aria-describedby={exceeded ? errorId : undefined}
          fullWidth
        >
          <MeterTrack />
        </Meter>
        {exceeded && (
          <HelperText id={errorId} error style={{ fontVariantNumeric: 'tabular-nums' }}>
            Limit exceeded by {format.format(requests - limit)} requests. New requests are rejected until 1 December.
          </HelperText>
        )}
      </div>
      <div style={{ display: 'flex', gap: 'var(--spacing-4)' }}>
        <Button size='sm' variant='secondary' appearance='ghost' onClick={() => setRequests(requests + 900)}>
          Run nightly sync
        </Button>
        <Button size='sm' variant='secondary' appearance='ghost' onClick={() => setRequests(8700)}>
          Reset
        </Button>
      </div>
    </div>
  );
}
