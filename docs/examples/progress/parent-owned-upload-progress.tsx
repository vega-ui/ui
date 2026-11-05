import { Button, Progress, ProgressTrack, Text } from '@vega-ui/react';
import { useEffect, useId, useState } from 'react';

export default function ParentOwnedUploadProgress() {
  const labelId = useId();
  const [percent, setPercent] = useState(0);
  const [running, setRunning] = useState(false);

  const done = percent === 100;
  const uploading = running && !done;

  useEffect(() => {
    if (!uploading) return;

    const timer = setInterval(() => {
      setPercent((current) => Math.min(current + 4, 100));
    }, 200);

    return () => clearInterval(timer);
  }, [uploading]);

  let status = 'Ready to upload';
  if (done) {
    status = 'Upload complete';
  } else if (uploading) {
    status = 'Uploading…';
  } else if (percent > 0) {
    status = `Paused at ${percent}%`;
  }

  const reset = () => {
    setRunning(false);
    setPercent(0);
  };

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-12)', width: '100%' }}>
      <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 'var(--spacing-8)' }}>
          <Text id={labelId} size={2} fontWeight={500}>product-demo.mp4 · 48 MB</Text>
          <Text size={2} style={{ color: 'var(--label-secondary)', fontVariantNumeric: 'tabular-nums' }}>{percent}%</Text>
        </div>
        <Progress value={percent} valueText={`${percent}%`} aria-labelledby={labelId} fullWidth>
          <ProgressTrack />
        </Progress>
        <Text size={2} role='status' style={{ color: 'var(--label-secondary)', fontVariantNumeric: 'tabular-nums' }}>{status}</Text>
      </div>
      <div style={{ display: 'flex', gap: 'var(--spacing-4)' }}>
        <Button size='sm' onClick={() => setRunning(!uploading)} disabled={done}>
          {uploading ? 'Pause' : 'Upload'}
        </Button>
        <Button size='sm' variant='secondary' appearance='ghost' onClick={reset} disabled={percent === 0}>
          {done ? 'Upload another' : 'Cancel'}
        </Button>
      </div>
    </div>
  );
}
