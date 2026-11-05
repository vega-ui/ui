import { Button, Progress, ProgressTrack, Text } from '@vega-ui/react';
import { useEffect, useId, useState } from 'react';

type Phase = 'idle' | 'preparing' | 'importing' | 'done';

export default function IndeterminateProgress() {
  const labelId = useId();
  const [phase, setPhase] = useState<Phase>('idle');
  const [total, setTotal] = useState(0);
  const [imported, setImported] = useState(0);

  useEffect(() => {
    if (phase !== 'preparing') return;

    const timer = setTimeout(() => {
      setTotal(3482);
      setImported(0);
      setPhase('importing');
    }, 1800);

    return () => clearTimeout(timer);
  }, [phase]);

  useEffect(() => {
    if (phase !== 'importing') return;

    const timer = setTimeout(() => {
      const next = Math.min(imported + 211, total);
      setImported(next);
      if (next === total) setPhase('done');
    }, 100);

    return () => clearTimeout(timer);
  }, [phase, imported, total]);

  const preparing = phase === 'preparing';
  let status = 'Import contacts from contacts.vcf';
  if (preparing) {
    status = 'Reading file…';
  } else if (phase === 'importing') {
    status = `Importing ${imported} of ${total} contacts`;
  } else if (phase === 'done') {
    status = `${total} contacts imported`;
  }

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-12)', width: '100%' }}>
      <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
        <Text id={labelId} size={2} style={{ fontVariantNumeric: 'tabular-nums' }}>{status}</Text>
        <Progress
          indeterminate={preparing}
          value={preparing ? undefined : imported}
          max={preparing ? undefined : Math.max(total, 1)}
          valueText={preparing ? 'Reading file' : `${imported} of ${total} contacts`}
          aria-labelledby={labelId}
          aria-busy={preparing}
          fullWidth
        >
          <ProgressTrack />
        </Progress>
      </div>
      <Button
        size='sm'
        style={{ justifySelf: 'start' }}
        onClick={() => setPhase('preparing')}
        disabled={phase === 'preparing' || phase === 'importing'}
      >
        {phase === 'done' ? 'Import again' : 'Import'}
      </Button>
    </div>
  );
}
