import { useState } from 'react';
import { Button, Card, Heading, Spinner, Text } from '@vega-ui/react';

type State = 'failed' | 'loading' | 'loaded';

export default function LoadErrorCard() {
  const [state, setState] = useState<State>('failed');

  const retry = () => {
    setState('loading');
    setTimeout(() => setState('loaded'), 900);
  };

  return (
    <Card aria-labelledby='usage-card-title' aria-busy={state === 'loading'} style={{ width: '100%', maxWidth: 340, gap: 'var(--spacing-4)' }}>
      <Heading id='usage-card-title' as='h3' size={3} fontWeight={600}>API usage</Heading>
      {state === 'loading' && <Spinner size={3} aria-label='Loading API usage' />}
      {state === 'failed' && (
        <div role='alert' style={{ display: 'grid', gap: 'var(--spacing-6)', justifyItems: 'start' }}>
          <Text size={2} style={{ color: 'var(--label-secondary)' }}>Usage could not be loaded: the metrics service timed out.</Text>
          <Button size='sm' variant='secondary' appearance='ghost' onClick={retry}>Try again</Button>
        </div>
      )}
      {state === 'loaded' && (
        <Text size={3}>1.82 M of 2 M requests used this month</Text>
      )}
    </Card>
  );
}
