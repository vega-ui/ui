import { useState } from 'react';
import { Label, Switch, SwitchIndicator, SwitchInput, Text } from '@vega-ui/react';

export default function ParentOwnedSwitchState() {
  const [maintenance, setMaintenance] = useState(false);

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-6)', width: '100%', maxWidth: 420 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-8)' }}>
        <Label htmlFor='maintenance-mode'>Maintenance mode</Label>
        <Switch>
          <SwitchInput
            id='maintenance-mode'
            checked={maintenance}
            onChange={(event) => setMaintenance(event.currentTarget.checked)}
          />
          <SwitchIndicator />
        </Switch>
      </div>
      <Text size={2} aria-live='polite' style={{ color: 'var(--label-secondary)' }}>
        {maintenance ? 'Visitors see the maintenance page. Admins can still sign in.' : 'The site is live for everyone.'}
      </Text>
    </div>
  );
}
