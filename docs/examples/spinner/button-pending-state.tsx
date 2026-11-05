import { Button, HelperText, Label, Spinner, TextField, TextFieldInput } from '@vega-ui/react';
import { CSSProperties, FormEvent, useId, useState } from 'react';

export default function ButtonPendingState() {
  const fieldId = useId();
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const workspace = String(data.get('workspace'));

    setPending(true);
    setMessage('');
    setTimeout(() => {
      setPending(false);
      setMessage(`Workspace renamed to “${workspace}”.`);
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit} style={{ width: '100%' }}>
      <fieldset disabled={pending} style={{ display: 'grid', gap: 'var(--spacing-12)', margin: 0, padding: 0, border: 'none' }}>
        <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
          <Label htmlFor={fieldId}>Workspace name</Label>
          <TextField>
            <TextFieldInput id={fieldId} name='workspace' required defaultValue='Acme Design' />
          </TextField>
          <HelperText role='status' style={{ minHeight: '1lh' }}>{message}</HelperText>
        </div>
        <Button type='submit' style={{ justifySelf: 'start' }}>
          {pending && <Spinner size={2} aria-hidden='true' style={{ '--spinner-color': 'currentColor' } as CSSProperties} />}
          {pending ? 'Saving…' : 'Save'}
        </Button>
      </fieldset>
    </form>
  );
}
