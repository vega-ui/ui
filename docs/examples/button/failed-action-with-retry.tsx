import { Button, HelperText, Icon, Text } from '@vega-ui/react';
import { RotateCwIcon } from '@vega-ui/icons';
import { useState } from 'react';

type Status = 'idle' | 'failed' | 'done';

export default function FailedActionWithRetry() {
  const [status, setStatus] = useState<Status>('idle');
  const [attempts, setAttempts] = useState(0);

  const syncCalendar = () => {
    const nextAttempt = attempts + 1;
    setAttempts(nextAttempt);

    if (nextAttempt === 1) {
      setStatus('failed');
      return;
    }

    setStatus('done');
  };

  if (status === 'done') {
    return (
      <Text role='status' size={3} style={{ width: '100%' }}>
        Calendar synced after {attempts} attempts.
      </Text>
    );
  }

  const failed = status === 'failed';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 'var(--spacing-3)', width: '100%' }}>
      <Button
        type='button'
        appearance={failed ? 'outline' : 'fill'}
        aria-describedby={failed ? 'sync-error' : undefined}
        onClick={syncCalendar}
      >
        {failed && <Icon size='sm'><RotateCwIcon /></Icon>}
        {failed ? 'Retry sync' : 'Sync calendar'}
      </Button>
      {failed && (
        <HelperText id='sync-error' error role='alert'>
          Google Calendar did not respond. Check your connection and try again.
        </HelperText>
      )}
    </div>
  );
}
