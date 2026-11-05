# Alert Examples

## Basic

### Basic: the four variants

Each variant gets its matching default icon from `AlertIcon`. `appearance='surface'` adds a border for messages that need more weight, like the declined card. These alerts are part of the page from the start, so they need no live-region role.

<!-- example: alert/variants.tsx -->
```tsx
import { Alert, AlertContent, AlertIcon, AlertMain, AlertTitle } from '@vega-ui/react';

export default function Variants() {
  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-6)', width: '100%', maxWidth: 560 }}>
      <Alert variant='info'>
        <AlertIcon />
        <AlertMain>
          <AlertTitle>Scheduled maintenance</AlertTitle>
          <AlertContent>The dashboard will be read-only on Sunday from 02:00 to 03:00 UTC.</AlertContent>
        </AlertMain>
      </Alert>
      <Alert variant='success'>
        <AlertIcon />
        <AlertMain>
          <AlertTitle>Domain verified</AlertTitle>
          <AlertContent>Emails from billing@northwind.io will now pass SPF and DKIM checks.</AlertContent>
        </AlertMain>
      </Alert>
      <Alert variant='warning'>
        <AlertIcon />
        <AlertMain>
          <AlertTitle>Storage almost full</AlertTitle>
          <AlertContent>You have used 46.2 GB of 50 GB. Uploads stop when the limit is reached.</AlertContent>
        </AlertMain>
      </Alert>
      <Alert variant='error' appearance='surface'>
        <AlertIcon />
        <AlertMain>
          <AlertTitle>Card declined</AlertTitle>
          <AlertContent>The payment for invoice INV-2048 was declined by the bank. Update the card to keep your plan.</AlertContent>
        </AlertMain>
      </Alert>
    </div>
  );
}
```
<!-- /example -->

## Controlled/Stateful

### Controlled/Stateful: dismissible announcement

The parent owns visibility. The dismiss button has its own accessible name, and after dismissal focus moves to the section heading so keyboard users do not lose their place.

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

## Form/Integration

### Form/Integration: save result after submit

The form reads values with `FormData` and simulates a request. Success is rendered into a `role='status'` container that exists before the message appears, so screen readers announce it; a failure is an assertive `role='alert'`.

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

## Layout/Overlay

### Layout/Overlay: warning inside a confirmation dialog

The warning explains the consequence of the destructive action and is linked to the dialog with `aria-describedby`, so it is read together with the dialog title.

<!-- example: alert/delete-dialog.tsx -->
```tsx
import type { CSSProperties } from 'react';
import {
  Alert,
  AlertContent,
  AlertIcon,
  AlertMain,
  AlertTitle,
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
  Heading,
  Icon,
  IconButton,
  Text,
} from '@vega-ui/react';
import { XIcon } from '@vega-ui/icons';

const destructive = {
  '--button-background-color': 'var(--color-red-accent-500)',
  '--button-background-color-hover': 'var(--color-red-accent-600)',
  '--button-background-color-active': 'var(--color-red-accent-700)',
} as CSSProperties;

export default function DeleteDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='secondary' appearance='ghost'>Delete project</Button>
      </DialogTrigger>
      <DialogContent aria-labelledby='delete-project-title' aria-describedby='delete-project-warning' style={{ maxWidth: 460 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-8)' }}>
          <Heading id='delete-project-title' as='h2' size={4} fontWeight={600}>Delete “Mobile app”?</Heading>
          <DialogClose asChild>
            <IconButton
              aria-label='Close'
              variant='secondary'
              appearance='ghost'
              style={{ flexShrink: 0, '--icon-button-size': '24px', '--icon-button-br-ratio': 0.5 } as CSSProperties}
            >
              <Icon size='xs'><XIcon strokeWidth={2.5} /></Icon>
            </IconButton>
          </DialogClose>
        </div>
        <Text size={3} asChild>
          <p style={{ marginBlock: 'var(--spacing-4) var(--spacing-8)', color: 'var(--label-secondary)' }}>The project, its 14 environments and all deployment history will be removed.</p>
        </Text>
        <Alert id='delete-project-warning' variant='warning'>
          <AlertIcon />
          <AlertMain>
            <AlertTitle>3 services still use this project</AlertTitle>
            <AlertContent>Billing API, Notifications and Search will stop receiving configuration updates.</AlertContent>
          </AlertMain>
        </Alert>
        <form method='dialog' style={{ display: 'flex', gap: 'var(--spacing-4)', justifyContent: 'flex-end', marginBlockStart: 'var(--spacing-12)' }}>
          <Button type='submit' variant='secondary' appearance='ghost'>Cancel</Button>
          <Button type='submit' style={destructive}>Delete project</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
```
<!-- /example -->

## Error

### Error: error summary above a form

On submit, invalid fields get `aria-invalid` and a linked `HelperText`, and an alert lists every error with a link that focuses the field. Errors update as the user types and the summary disappears once everything is valid.

<!-- example: alert/error-summary.tsx -->
```tsx
import { FormEvent, MouseEvent, useState } from 'react';
import {
  Alert,
  AlertIcon,
  AlertMain,
  AlertTitle,
  Button,
  HelperText,
  Label,
  Text,
  TextField,
  TextFieldInput,
} from '@vega-ui/react';

type Errors = { email?: string; seats?: string };

const validate = (email: string, seats: string): Errors => {
  const errors: Errors = {};
  if (!email.includes('@')) errors.email = 'Enter an email address like name@company.com.';
  const count = Number(seats);
  if (!Number.isInteger(count) || count < 1 || count > 500) errors.seats = 'Enter a number of seats from 1 to 500.';
  return errors;
};

export default function ErrorSummary() {
  const [email, setEmail] = useState('');
  const [seats, setSeats] = useState('0');
  const [submitted, setSubmitted] = useState(false);

  const errors = submitted ? validate(email, seats) : {};
  const messages = Object.entries(errors);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  const focusField = (event: MouseEvent<HTMLAnchorElement>, id: string) => {
    event.preventDefault();
    document.getElementById(id)?.focus();
  };

  return (
    <form noValidate onSubmit={submit} style={{ display: 'grid', gap: 'var(--spacing-12)', width: '100%', maxWidth: 420 }}>
      {messages.length > 0 && (
        <Alert variant='error' role='alert'>
          <AlertIcon />
          <AlertMain>
            <AlertTitle>Fix {messages.length === 1 ? 'one error' : `${messages.length} errors`} to continue</AlertTitle>
            <ul style={{ margin: 0, paddingInlineStart: 'var(--spacing-9)' }}>
              {messages.map(([field, message]) => (
                <li key={field}>
                  <Text size={2}>
                    <a href={`#order-${field}`} onClick={(event) => focusField(event, `order-${field}`)} style={{ color: 'inherit' }}>{message}</a>
                  </Text>
                </li>
              ))}
            </ul>
          </AlertMain>
        </Alert>
      )}
      <div style={{ display: 'grid', gap: 'var(--spacing-8)' }}>
        <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
          <Label htmlFor='order-email'>Billing email</Label>
          <TextField error={Boolean(errors.email)}>
            <TextFieldInput
              id='order-email'
              type='email'
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? 'order-email-error' : undefined}
            />
          </TextField>
          {errors.email && <HelperText id='order-email-error' error>{errors.email}</HelperText>}
        </div>
        <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
          <Label htmlFor='order-seats'>Seats</Label>
          <TextField error={Boolean(errors.seats)}>
            <TextFieldInput
              id='order-seats'
              inputMode='numeric'
              value={seats}
              onChange={(event) => setSeats(event.target.value)}
              aria-invalid={Boolean(errors.seats)}
              aria-describedby={errors.seats ? 'order-seats-error' : undefined}
            />
          </TextField>
          {errors.seats && <HelperText id='order-seats-error' error>{errors.seats}</HelperText>}
        </div>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--spacing-6)', alignItems: 'center' }}>
        <Button type='submit'>Continue to payment</Button>
        <Text size={2} role='status' style={{ color: 'var(--label-secondary)' }}>{submitted && messages.length === 0 ? 'Order details are valid.' : ''}</Text>
      </div>
    </form>
  );
}
```
<!-- /example -->

## Edge

### Edge: long unbreakable content and actions

The domain and the TXT record have no spaces, so they need `overflow-wrap: anywhere` and `min-width: 0` on `AlertMain` to stay inside the alert. Actions sit in `AlertMain` and report their result through a status region.

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
