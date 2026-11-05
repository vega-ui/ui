import { Button, HelperText, Spinner, Text } from '@vega-ui/react';
import { useEffect, useId, useState } from 'react';

type Status = 'syncing' | 'failed' | 'synced';

export default function RetryRowStillPending() {
  const labelId = useId();
  const [status, setStatus] = useState<Status>('syncing');
  const [attempt, setAttempt] = useState(1);

  useEffect(() => {
    if (status !== 'syncing') return;

    const timer = setTimeout(() => {
      setStatus(attempt === 1 ? 'failed' : 'synced');
    }, 1500);

    return () => clearTimeout(timer);
  }, [status, attempt]);

  const retry = () => {
    setAttempt(attempt + 1);
    setStatus('syncing');
  };

  const restart = () => {
    setAttempt(1);
    setStatus('syncing');
  };

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-8)', width: '100%' }}>
      {status === 'syncing' && (
        <div style={{ display: 'flex', gap: 'var(--spacing-4)', alignItems: 'center' }}>
          <Spinner size={2} aria-labelledby={labelId} />
          <Text id={labelId} size={2}>{attempt === 1 ? 'Syncing calendar…' : `Retrying (attempt ${attempt})…`}</Text>
        </div>
      )}
      {status === 'failed' && (
        <>
          <HelperText error role='alert'>Calendar sync failed: the server did not respond in time.</HelperText>
          <Button size='sm' variant='secondary' appearance='ghost' onClick={retry} style={{ justifySelf: 'start' }}>
            Retry
          </Button>
        </>
      )}
      {status === 'synced' && (
        <>
          <HelperText role='status'>Calendar synced after {attempt} attempts.</HelperText>
          <Button size='sm' variant='secondary' appearance='ghost' onClick={restart} style={{ justifySelf: 'start' }}>
            Run again
          </Button>
        </>
      )}
    </div>
  );
}
