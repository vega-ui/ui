import { useEffect, useState } from 'react';
import { Badge, Button, Text } from '@vega-ui/react';

type Stage = 'idle' | 'building' | 'deploying' | 'live';

const stages: Record<Stage, { label: string; variant: string }> = {
  idle: { label: 'Not deployed', variant: 'info' },
  building: { label: 'Building', variant: 'warning' },
  deploying: { label: 'Deploying', variant: 'warning' },
  live: { label: 'Live', variant: 'success' },
};

export default function DeployStatus() {
  const [stage, setStage] = useState<Stage>('idle');

  useEffect(() => {
    if (stage === 'building') {
      const timer = setTimeout(() => setStage('deploying'), 1500);
      return () => clearTimeout(timer);
    }
    if (stage === 'deploying') {
      const timer = setTimeout(() => setStage('live'), 1500);
      return () => clearTimeout(timer);
    }
  }, [stage]);

  const busy = stage === 'building' || stage === 'deploying';

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-6)', width: '100%' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-4)', flex: 1, minWidth: 0 }}>
        <Text size={3} fontWeight={500}>checkout-service</Text>
        <span role='status'>
          <Badge size='sm' variant={stages[stage].variant} appearance={stage === 'live' ? 'fill' : 'ghost'}>
            {stages[stage].label}
          </Badge>
        </span>
      </div>
      <Button size='sm' variant='secondary' appearance='ghost' disabled={busy} onClick={() => setStage('building')}>
        {stage === 'live' ? 'Redeploy' : 'Deploy'}
      </Button>
    </div>
  );
}
