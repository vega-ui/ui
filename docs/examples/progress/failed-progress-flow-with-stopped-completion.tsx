import { Button, HelperText, Progress, ProgressTrack, Text } from '@vega-ui/react';
import { CSSProperties, useEffect, useId, useState } from 'react';

type Phase = 'idle' | 'uploading' | 'failed' | 'done';

export default function FailedProgressFlowWithStoppedCompletion() {
  const labelId = useId();
  const errorId = useId();
  const [phase, setPhase] = useState<Phase>('idle');
  const [percent, setPercent] = useState(0);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    if (phase !== 'uploading') return;

    const timer = setTimeout(() => {
      const next = Math.min(percent + 5, 100);
      if (attempt === 1 && next >= 65) {
        setPercent(65);
        setPhase('failed');
        return;
      }

      setPercent(next);
      if (next === 100) {
        setPhase('done');
      }
    }, 120);

    return () => clearTimeout(timer);
  }, [phase, percent, attempt]);

  const start = () => {
    setAttempt(attempt + 1);
    setPhase('uploading');
  };

  const failed = phase === 'failed';
  const trackStyle = failed ? { '--progress-track-color': 'var(--color-red-500)' } as CSSProperties : undefined;

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-12)', width: '100%' }}>
      <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 'var(--spacing-8)' }}>
          <Text id={labelId} size={2} fontWeight={500}>customers-2026.csv</Text>
          <Text size={2} style={{ color: 'var(--label-secondary)', fontVariantNumeric: 'tabular-nums' }}>{percent}%</Text>
        </div>
        <Progress
          value={percent}
          valueText={failed ? `Failed at ${percent}%` : `${percent}%`}
          aria-labelledby={labelId}
          aria-describedby={failed ? errorId : undefined}
          style={trackStyle}
          fullWidth
        >
          <ProgressTrack />
        </Progress>
        {failed && (
          <HelperText id={errorId} error role='alert'>
            Connection lost at {percent}%. The uploaded part is kept — retry to continue.
          </HelperText>
        )}
        {phase === 'done' && <HelperText role='status'>Upload complete.</HelperText>}
      </div>
      <Button size='sm' style={{ justifySelf: 'start' }} onClick={start} disabled={phase === 'uploading' || phase === 'done'}>
        {failed ? 'Retry' : 'Upload'}
      </Button>
    </div>
  );
}
