import {
  Button,
  Fieldset,
  FieldsetLegend,
  Label,
  Separator,
  Text,
  TextField,
  TextFieldInput,
} from '@vega-ui/react';
import { useState } from 'react';

export default function MutedSectionBreakInDisabledPanel() {
  const [locked, setLocked] = useState(true);

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-8)', width: '100%' }}>
      <Fieldset disabled={locked} aria-describedby='smtp-lock-note' style={{ display: 'grid', gap: 'var(--spacing-8)' }}>
        <FieldsetLegend style={{ marginBlockEnd: 'var(--spacing-8)' }}>Outgoing mail</FieldsetLegend>
        <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
          <Label htmlFor='smtp-host'>SMTP host</Label>
          <TextField>
            <TextFieldInput id='smtp-host' name='host' defaultValue='smtp.acme.io' />
          </TextField>
        </div>
        <Separator />
        <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
          <Label htmlFor='smtp-port'>Port</Label>
          <TextField>
            <TextFieldInput id='smtp-port' name='port' inputMode='numeric' defaultValue='587' />
          </TextField>
        </div>
      </Fieldset>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-8)' }}>
        <Text id='smtp-lock-note' size={2} style={{ color: 'var(--label-secondary)' }}>
          {locked ? 'Managed by your IT team.' : 'Changes apply to new messages only.'}
        </Text>
        <Button
          size='sm'
          variant='secondary'
          appearance='ghost'
          aria-pressed={!locked}
          onClick={() => setLocked(!locked)}
          style={{ flexShrink: 0 }}
        >
          {locked ? 'Unlock settings' : 'Lock settings'}
        </Button>
      </div>
    </div>
  );
}
