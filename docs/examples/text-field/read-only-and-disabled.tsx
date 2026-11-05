import { Button, HelperText, Label, Text, TextField, TextFieldInput } from '@vega-ui/react';
import { FormEvent, useId, useState } from 'react';

export default function ReadOnlyAndDisabled() {
  const id = useId();
  const [submitted, setSubmitted] = useState('');

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const keys = Array.from(new FormData(event.currentTarget).keys());
    setSubmitted(keys.join(', '));
  };

  return (
    <form onSubmit={onSubmit} style={{ display: 'grid', gap: 'var(--spacing-8)', width: '100%' }}>
      <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
        <Label htmlFor={`${id}-workspace`}>Workspace ID</Label>
        <TextField>
          <TextFieldInput
            id={`${id}-workspace`}
            name='workspaceId'
            defaultValue='ws_8f2c41d9'
            readOnly
            aria-describedby={`${id}-workspace-hint`}
          />
        </TextField>
        <HelperText id={`${id}-workspace-hint`}>Read-only: focusable, selectable and submitted.</HelperText>
      </div>
      <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
        <Label htmlFor={`${id}-billing`}>Billing email</Label>
        <TextField>
          <TextFieldInput
            id={`${id}-billing`}
            name='billingEmail'
            defaultValue='finance@northwind.io'
            disabled
            aria-describedby={`${id}-billing-hint`}
          />
        </TextField>
        <HelperText id={`${id}-billing-hint`}>Disabled: only the account owner can change it. Not submitted.</HelperText>
      </div>
      <Button type='submit' style={{ justifySelf: 'start', marginBlockStart: 'var(--spacing-4)' }}>Submit</Button>
      <Text size={2} role='status' style={{ color: 'var(--label-secondary)' }}>{submitted === '' ? '' : `Submitted fields: ${submitted}`}</Text>
    </form>
  );
}
