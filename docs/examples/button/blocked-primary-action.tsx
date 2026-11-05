import type { CSSProperties } from 'react';
import { Button, HelperText, Label, Text, TextField, TextFieldInput } from '@vega-ui/react';
import { useState } from 'react';

const destructive = {
  '--button-background-color': 'var(--color-red-accent-500)',
  '--button-background-color-hover': 'var(--color-red-accent-600)',
  '--button-background-color-active': 'var(--color-red-accent-700)',
} as CSSProperties;

export default function BlockedPrimaryAction() {
  const [confirmation, setConfirmation] = useState('');
  const [deleted, setDeleted] = useState(false);
  const blocked = confirmation !== 'acme-design';

  if (deleted) {
    return (
      <Text role='status' size={3} style={{ width: '100%' }}>
        Workspace acme-design was deleted.
      </Text>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-12)', width: '100%' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)' }}>
        <Label htmlFor='confirm-workspace'>Type acme-design to confirm</Label>
        <TextField>
          <TextFieldInput
            id='confirm-workspace'
            value={confirmation}
            autoComplete='off'
            aria-describedby='confirm-workspace-hint'
            onChange={(event) => setConfirmation(event.target.value)}
          />
        </TextField>
        <HelperText id='confirm-workspace-hint'>
          {blocked ? 'The delete button unlocks when the name matches.' : 'Name matches. You can delete the workspace.'}
        </HelperText>
      </div>
      <Button type='button' disabled={blocked} style={blocked ? undefined : destructive} onClick={() => setDeleted(true)}>
        Delete workspace
      </Button>
    </div>
  );
}
