import { Button, Code, HelperText, Label, Text, TextField, TextFieldInput } from '@vega-ui/react';
import { useState, type FormEvent } from 'react';

function toSlug(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

export default function InlineIdentifierInHelperCopy() {
  const [name, setName] = useState('Acme Marketing');
  const [saved, setSaved] = useState('');
  const slug = toSlug(name);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setSaved(`Workspace created at ${data.get('slug')}.vega.app`);
  };

  return (
    <form onSubmit={onSubmit} style={{ display: 'grid', gap: 'var(--spacing-3)', width: '100%' }}>
      <Label htmlFor='workspace-name'>Workspace name</Label>
      <TextField>
        <TextFieldInput
          id='workspace-name'
          name='name'
          value={name}
          aria-describedby='workspace-url'
          onChange={(event) => setName(event.target.value)}
          required
        />
      </TextField>
      <HelperText id='workspace-url'>
        Your URL will be <Code size={2}>{slug === '' ? '…' : slug}.vega.app</Code>
      </HelperText>
      <input type='hidden' name='slug' value={slug} />
      <Button type='submit' disabled={slug === ''} style={{ justifySelf: 'end', marginBlockStart: 'var(--spacing-9)' }}>
        Create workspace
      </Button>
      {saved && <Text size={2} role='status' style={{ color: 'var(--label-secondary)' }}>{saved}</Text>}
    </form>
  );
}
