import {
  Button,
  Heading,
  HelperText,
  Label,
  Separator,
  Text,
  TextField,
  TextFieldInput,
} from '@vega-ui/react';
import { useState, type CSSProperties, type FormEvent } from 'react';

const workspaceName = 'acme-marketing';

const destructive = {
  '--button-background-color': 'var(--color-red-accent-500)',
  '--button-background-color-hover': 'var(--color-red-accent-600)',
  '--button-background-color-active': 'var(--color-red-accent-700)',
} as CSSProperties;

export default function DividerBeforeDestructiveSection() {
  const [error, setError] = useState('');
  const [deleted, setDeleted] = useState(false);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    if (data.get('confirmation') !== workspaceName) {
      setError(`Type ${workspaceName} exactly to confirm.`);
      return;
    }

    setDeleted(true);
  };

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-12)', width: '100%' }}>
      <div style={{ display: 'grid', gap: 'var(--spacing-2)' }}>
        <Heading as='h3' size={4}>Workspace name</Heading>
        <Text size={2} style={{ color: 'var(--label-secondary)' }}>{workspaceName}</Text>
      </div>
      <Separator />
      <form onSubmit={onSubmit} aria-labelledby='danger-zone-title' style={{ display: 'grid', gap: 'var(--spacing-8)' }}>
        <div style={{ display: 'grid', gap: 'var(--spacing-2)' }}>
          <Heading as='h3' size={4} id='danger-zone-title'>Delete workspace</Heading>
          <Text size={2} style={{ color: 'var(--label-secondary)' }}>All projects, files and billing history are removed permanently.</Text>
        </div>
        <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
          <Label htmlFor='delete-confirmation'>Type {workspaceName} to confirm</Label>
          <TextField error={error !== ''}>
            <TextFieldInput
              id='delete-confirmation'
              name='confirmation'
              autoComplete='off'
              aria-invalid={error !== ''}
              aria-describedby={error ? 'delete-confirmation-error' : undefined}
              onChange={() => setError('')}
            />
          </TextField>
          {error && <HelperText id='delete-confirmation-error' error>{error}</HelperText>}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-6)', flexWrap: 'wrap' }}>
          <Button type='submit' style={destructive}>Delete workspace</Button>
          {deleted && <Text size={2} role='status' style={{ color: 'var(--label-secondary)' }}>Workspace scheduled for deletion.</Text>}
        </div>
      </form>
    </div>
  );
}
