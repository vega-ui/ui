import { FormEvent, useState } from 'react';
import { Button, Card, Heading, Label, Text, TextField, TextFieldInput } from '@vega-ui/react';

export default function SettingsFormCard() {
  const [saved, setSaved] = useState('');

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setSaved(`Saved “${data.get('workspace')}” at ${data.get('slug')}.vega.app`);
  };

  return (
    <Card asChild style={{ width: '100%', maxWidth: 420, gap: 'var(--spacing-12)' }}>
      <form aria-labelledby='workspace-card-title' onSubmit={submit} onReset={() => setSaved('')}>
        <div style={{ display: 'grid', gap: 'var(--spacing-2)' }}>
          <Heading id='workspace-card-title' as='h3' size={4} fontWeight={600}>Workspace</Heading>
          <Text size={2} style={{ color: 'var(--label-secondary)' }}>Shown in invitations and in the browser tab.</Text>
        </div>
        <div style={{ display: 'grid', gap: 'var(--spacing-8)', alignSelf: 'stretch' }}>
          <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
            <Label htmlFor='workspace-card-name'>Name</Label>
            <TextField>
              <TextFieldInput id='workspace-card-name' name='workspace' defaultValue='Northwind Studio' required />
            </TextField>
          </div>
          <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
            <Label htmlFor='workspace-card-slug'>URL</Label>
            <TextField>
              <TextFieldInput id='workspace-card-slug' name='slug' defaultValue='northwind' pattern='[a-z0-9-]{3,32}' required />
            </TextField>
          </div>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 'var(--spacing-4)', alignSelf: 'stretch' }}>
          <Button type='submit' size='sm'>Save</Button>
          <Button type='reset' size='sm' variant='secondary' appearance='ghost'>Reset</Button>
          <Text size={2} role='status' style={{ color: 'var(--label-secondary)', overflowWrap: 'anywhere' }}>{saved}</Text>
        </div>
      </form>
    </Card>
  );
}
