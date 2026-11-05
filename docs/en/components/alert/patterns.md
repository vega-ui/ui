# Alert Patterns

## Inline Feedback Message

When to use:

- A local flow needs short visible feedback.

Composition notes:

- Keep the message concise.
- Use title only when extra hierarchy helps.

Trade-offs:

- Strong semantic feedback.
- Weak fit for long explanations.

<!-- example: alert/save-feedback.tsx -->
```tsx
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
```
<!-- /example -->

## Settings Warning

When to use:

- A settings page or panel needs one visible caution or prerequisite.

Composition notes:

- Keep the alert near the setting it affects.
- Do not let the warning become the only place where the setting is explained.

Trade-offs:

- Good local visibility.
- Can create noise if every section has multiple alerts.

<!-- example: alert/domain-verification.tsx -->
```tsx
import { useState } from 'react';
import { Alert, AlertContent, AlertIcon, AlertMain, AlertTitle, Button, Text } from '@vega-ui/react';

const record = 'vega-site-verification=8c1f0b6e2d9a4f7b93e5c2a1d0f4e6b8a7c3d9e1f2b4a6c8d0e2f4a6b8c0d2e4';

export default function DomainVerification() {
  const [message, setMessage] = useState('');

  const copy = async () => {
    await navigator.clipboard.writeText(record);
    setMessage('Copied to clipboard.');
  };

  const check = () => {
    setMessage('Checking DNS…');
    setTimeout(() => setMessage('Record not found yet. Try again in a few minutes.'), 1000);
  };

  return (
    <Alert variant='warning' style={{ width: '100%', maxWidth: 560 }}>
      <AlertIcon />
      <AlertMain style={{ minWidth: 0, gap: 'var(--spacing-4)' }}>
        <AlertTitle style={{ overflowWrap: 'anywhere' }}>Verify northwind-logistics-international.example.com</AlertTitle>
        <AlertContent>Add this TXT record at your DNS provider. Changes can take up to 48 hours to apply.</AlertContent>
        <Text size={1} asChild>
          <code style={{ display: 'block', fontFamily: 'var(--code-font-family)', wordBreak: 'break-all', padding: 'var(--spacing-4) var(--spacing-6)', borderRadius: 'var(--radius-2)', background: 'var(--fills-tertiary)', color: 'var(--label-primary)' }}>{record}</code>
        </Text>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--spacing-4)', alignItems: 'center', marginBlockStart: 'var(--spacing-2)' }}>
          <Button size='sm' onClick={copy}>Copy record</Button>
          <Button size='sm' variant='secondary' appearance='ghost' onClick={check}>Check again</Button>
          <Text size={2} role='status' style={{ color: 'var(--label-secondary)' }}>{message}</Text>
        </div>
      </AlertMain>
    </Alert>
  );
}
```
<!-- /example -->

## Dismissible Feedback

When to use:

- The alert may be removed after acknowledgment.

Composition notes:

- Consumer state should own dismissal.
- Keep the dismiss action secondary to the message itself.

Trade-offs:

- Useful for temporary feedback.
- Easy to overuse if important alerts can disappear too soon.

<!-- example: alert/dismissible.tsx -->
```tsx
import { useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import { Alert, AlertContent, AlertIcon, AlertMain, AlertTitle, Button, Heading, Icon, IconButton } from '@vega-ui/react';
import { XIcon } from '@vega-ui/icons';

export default function Dismissible() {
  const [visible, setVisible] = useState(true);
  const headingRef = useRef<HTMLHeadingElement>(null);

  const dismiss = () => {
    setVisible(false);
    headingRef.current?.focus();
  };

  return (
    <section aria-labelledby='billing-heading' style={{ display: 'grid', gap: 'var(--spacing-6)', width: '100%', maxWidth: 560 }}>
      <Heading ref={headingRef} id='billing-heading' as='h2' size={4} fontWeight={600} tabIndex={-1}>Billing</Heading>
      {visible && (
        <Alert variant='info'>
          <AlertIcon />
          <AlertMain>
            <AlertTitle>New invoice layout</AlertTitle>
            <AlertContent>Invoices now group usage by project. Old invoices keep their original layout.</AlertContent>
          </AlertMain>
          <IconButton
            aria-label='Dismiss'
            variant='secondary'
            appearance='ghost'
            onClick={dismiss}
            style={{ '--icon-button-size': '24px', '--icon-button-br-ratio': 0.5 } as CSSProperties}
          >
            <Icon size='xs'><XIcon strokeWidth={2.5} /></Icon>
          </IconButton>
        </Alert>
      )}
      {!visible && (
        <Button size='sm' variant='secondary' appearance='ghost' onClick={() => setVisible(true)} style={{ justifySelf: 'start' }}>
          Show the announcement again
        </Button>
      )}
    </section>
  );
}
```
<!-- /example -->
