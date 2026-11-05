import { FormEvent, useState } from 'react';
import {
  Alert,
  AlertContent,
  AlertIcon,
  AlertMain,
  AlertTitle,
  Button,
  Checkbox,
  CheckboxCheckedIcon,
  CheckboxIndicator,
  CheckboxInput,
  Label,
  TextField,
  TextFieldInput,
} from '@vega-ui/react';

type Status = 'idle' | 'saving' | 'saved' | 'failed';

export default function SaveFeedback() {
  const [status, setStatus] = useState<Status>('idle');
  const [savedName, setSavedName] = useState('');

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get('workspace'));
    const offline = data.get('offline') === 'on';
    setStatus('saving');
    setTimeout(() => {
      if (offline) {
        setStatus('failed');
        return;
      }
      setSavedName(name);
      setStatus('saved');
    }, 800);
  };

  return (
    <form onSubmit={submit} style={{ display: 'grid', gap: 'var(--spacing-12)', width: '100%', maxWidth: 420 }}>
      <div style={{ display: 'grid', gap: 'var(--spacing-8)' }}>
        <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
          <Label htmlFor='workspace-name'>Workspace name</Label>
          <TextField>
            <TextFieldInput id='workspace-name' name='workspace' defaultValue='Northwind Studio' required />
          </TextField>
        </div>
        <Checkbox style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-4)' }}>
          <CheckboxInput name='offline' />
          <CheckboxIndicator>
            <CheckboxCheckedIcon />
          </CheckboxIndicator>
          Simulate a network error
        </Checkbox>
      </div>
      <Button type='submit' disabled={status === 'saving'} style={{ justifySelf: 'start' }}>
        {status === 'saving' ? 'Saving…' : 'Save'}
      </Button>
      <div style={{ display: 'grid' }}>
        <div role='status'>
          {status === 'saved' && (
            <Alert variant='success'>
              <AlertIcon />
              <AlertMain>
                <AlertContent>Workspace renamed to “{savedName}”.</AlertContent>
              </AlertMain>
            </Alert>
          )}
        </div>
        {status === 'failed' && (
          <Alert variant='error' role='alert'>
            <AlertIcon />
            <AlertMain>
              <AlertTitle>Changes not saved</AlertTitle>
              <AlertContent>We could not reach the server. Check your connection and save again.</AlertContent>
            </AlertMain>
          </Alert>
        )}
      </div>
    </form>
  );
}
