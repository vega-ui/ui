import { Button, Label, TextField, TextFieldInput } from '@vega-ui/react';
import { FormEvent, useState } from 'react';

export default function FormFooterActions() {
  const [submitted, setSubmitted] = useState('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setSubmitted(`${data.get('workspace')} (${data.get('slug')})`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      onReset={() => setSubmitted('')}
      style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-12)', width: '100%' }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-8)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)' }}>
          <Label htmlFor='workspace-name'>Workspace name</Label>
          <TextField>
            <TextFieldInput id='workspace-name' name='workspace' defaultValue='Acme Design' required />
          </TextField>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)' }}>
          <Label htmlFor='workspace-slug'>URL slug</Label>
          <TextField>
            <TextFieldInput id='workspace-slug' name='slug' defaultValue='acme-design' pattern='[a-z0-9-]+' required />
          </TextField>
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)' }}>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--spacing-4)' }}>
          <Button type='reset' variant='secondary' appearance='ghost'>Reset</Button>
          <Button type='submit'>Save workspace</Button>
        </div>
        <output style={{ color: 'var(--label-secondary)', textAlign: 'end', overflowWrap: 'anywhere' }}>
          {submitted === '' ? 'Not saved yet' : `Saved: ${submitted}`}
        </output>
      </div>
    </form>
  );
}
