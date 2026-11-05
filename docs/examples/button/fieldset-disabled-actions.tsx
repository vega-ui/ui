import { Button, Fieldset, FieldsetLegend } from '@vega-ui/react';
import { useState } from 'react';

export default function FieldsetDisabledActions() {
  const [locked, setLocked] = useState(true);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 'var(--spacing-8)', width: '100%' }}>
      <Fieldset disabled={locked} appearance='outlined' style={{ width: '100%', boxSizing: 'border-box' }}>
        <FieldsetLegend>Billing actions</FieldsetLegend>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)' }}>
          <Button type='button' fullWidth>Change plan</Button>
          <Button type='button' fullWidth variant='secondary' appearance='ghost'>Update card</Button>
          <Button type='button' fullWidth variant='secondary' appearance='transparent'>Download invoices</Button>
        </div>
      </Fieldset>
      <Button type='button' size='sm' variant='secondary' appearance='ghost' onClick={() => setLocked(!locked)}>
        {locked ? 'Sign in as owner' : 'Sign out'}
      </Button>
    </div>
  );
}
