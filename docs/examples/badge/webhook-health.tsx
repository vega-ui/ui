import { useState } from 'react';
import { Badge, Button, Text } from '@vega-ui/react';

export default function WebhookHealth() {
  const [failing, setFailing] = useState(true);
  const [retrying, setRetrying] = useState(false);

  const retry = () => {
    setRetrying(true);
    setTimeout(() => {
      setRetrying(false);
      setFailing(false);
    }, 1200);
  };

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-4)', width: '100%', maxWidth: 520 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-4)', flexWrap: 'wrap' }}>
        <Text size={3} fontWeight={500} style={{ overflowWrap: 'anywhere' }}>https://hooks.northwind.io/orders</Text>
        <span role='status'>
          <Badge size='sm' variant={failing ? 'error' : 'success'}>{failing ? 'Failing' : 'Healthy'}</Badge>
        </span>
      </div>
      {failing && (
        <>
          <Text id='webhook-error' size={2} style={{ color: 'var(--label-secondary)' }}>
            Last 12 deliveries returned 503 Service Unavailable. Deliveries are paused until the endpoint responds.
          </Text>
          <Button size='sm' variant='secondary' appearance='ghost' aria-describedby='webhook-error' disabled={retrying} onClick={retry} style={{ justifySelf: 'start', marginBlockStart: 'var(--spacing-4)' }}>
            {retrying ? 'Retrying…' : 'Retry deliveries'}
          </Button>
        </>
      )}
    </div>
  );
}
