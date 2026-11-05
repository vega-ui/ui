# Button Examples

## Basic

### Basic: action hierarchy

One screen usually has one primary action. Secondary actions step down through `outline`, `ghost`, and `transparent` so the eye lands on the main action first.

<!-- example: button/action-hierarchy.tsx -->
```tsx
import { Button } from '@vega-ui/react';

export default function ActionHierarchy() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)', width: '100%' }}>
      <Button type='button' fullWidth>Publish article</Button>
      <Button type='button' fullWidth variant='secondary' appearance='ghost'>Save draft</Button>
      <Button type='button' fullWidth variant='secondary' appearance='ghost'>Preview</Button>
      <Button type='button' fullWidth variant='secondary' appearance='transparent'>Discard</Button>
    </div>
  );
}
```
<!-- /example -->

### Basic: sizes with matching icons

`size` changes height, padding, and font size. The icon does not follow automatically, so pick an `Icon` size that matches each button size.

<!-- example: button/sizes.tsx -->
```tsx
import { Button, Icon } from '@vega-ui/react';
import { DownloadIcon } from '@vega-ui/icons';

export default function Sizes() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--spacing-4)' }}>
      <Button type='button' size='xs'>
        <Icon size='2xs'><DownloadIcon /></Icon>
        Export
      </Button>
      <Button type='button' size='sm'>
        <Icon size='xs'><DownloadIcon /></Icon>
        Export
      </Button>
      <Button type='button' size='md'>
        <Icon size='sm'><DownloadIcon /></Icon>
        Export
      </Button>
      <Button type='button' size='lg'>
        <Icon size='md'><DownloadIcon /></Icon>
        Export
      </Button>
      <Button type='button' size='xl'>
        <Icon size='lg'><DownloadIcon /></Icon>
        Export
      </Button>
    </div>
  );
}
```
<!-- /example -->

## Controlled/Stateful

### Controlled/Stateful: parent-owned loading action

`Button` has no loading prop: the parent owns the pending state, disables the button, sets `aria-busy`, and swaps the label. The status next to it shows the result once the request finishes.

<!-- example: button/parent-owned-loading-action.tsx -->
```tsx
import { Button, Spinner } from '@vega-ui/react';
import { useEffect, useState } from 'react';

export default function ParentOwnedLoadingAction() {
  const [saving, setSaving] = useState(false);
  const [savedCount, setSavedCount] = useState(0);

  useEffect(() => {
    if (!saving) return;

    const timer = setTimeout(() => {
      setSaving(false);
      setSavedCount((count) => count + 1);
    }, 1500);

    return () => clearTimeout(timer);
  }, [saving]);

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-8)', width: '100%' }}>
      <Button type='button' disabled={saving} aria-busy={saving} onClick={() => setSaving(true)}>
        {saving && <Spinner size={3} aria-hidden='true' />}
        {saving ? 'Saving…' : 'Save changes'}
      </Button>
      <span role='status' style={{ color: 'var(--label-secondary)', fontVariantNumeric: 'tabular-nums' }}>
        {savedCount === 0 ? 'No changes saved yet' : `Saved ${savedCount} ${savedCount === 1 ? 'time' : 'times'}`}
      </span>
    </div>
  );
}
```
<!-- /example -->

### Controlled/Stateful: toggle button with aria-pressed

A two-state action keeps the same label and exposes its state with `aria-pressed`, so screen readers announce it as a toggle. The appearance change is only the visual echo of that state.

<!-- example: button/pressed-toggle.tsx -->
```tsx
import { Button, Icon } from '@vega-ui/react';
import { BellIcon, BellOffIcon } from '@vega-ui/icons';
import { useState } from 'react';

export default function PressedToggle() {
  const [watching, setWatching] = useState(false);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--spacing-4)', width: '100%' }}>
      <Button
        type='button'
        variant={watching ? 'primary' : 'secondary'}
        appearance='ghost'
        aria-pressed={watching}
        onClick={() => setWatching(!watching)}
      >
        <Icon size='sm'>{watching ? <BellIcon /> : <BellOffIcon />}</Icon>
        Watch repository
      </Button>
      <span style={{ color: 'var(--label-secondary)', textAlign: 'center' }}>
        {watching ? 'You get notified about every release' : 'Notifications are off'}
      </span>
    </div>
  );
}
```
<!-- /example -->

## Form/Integration

### Form/Integration: submit and reset in a form footer

`Button` keeps the native `type`: without it a button inside a form submits. Here `type='submit'` triggers native validation and the values are read with `FormData`, while `type='reset'` restores the default values.

<!-- example: button/form-footer-actions.tsx -->
```tsx
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
```
<!-- /example -->

### Form/Integration: submit button outside the form

When the action bar lives outside the `<form>` (a sticky footer, a dialog footer), connect the button with the native `form` attribute. Validation and submit still work as if the button were inside.

<!-- example: button/submit-outside-form.tsx -->
```tsx
import { Button, Label, TextField, TextFieldInput } from '@vega-ui/react';
import { FormEvent, useState } from 'react';

export default function SubmitOutsideForm() {
  const [email, setEmail] = useState('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setEmail(String(new FormData(event.currentTarget).get('email')));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-8)', width: '100%' }}>
      <form id='invite-form' onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)' }}>
        <Label htmlFor='invite-email'>Teammate email</Label>
        <TextField>
          <TextFieldInput id='invite-email' name='email' type='email' placeholder='alex@company.com' required />
        </TextField>
      </form>
      <footer
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--spacing-8)',
          paddingBlockStart: 'var(--spacing-8)',
          borderBlockStart: '1px solid var(--separator-opaque)',
        }}
      >
        <span style={{ flex: 1, minWidth: 0, color: 'var(--label-secondary)', overflowWrap: 'anywhere' }}>
          {email === '' ? 'No invite sent' : `Invite sent to ${email}`}
        </span>
        <Button type='submit' form='invite-form'>Send invite</Button>
      </footer>
    </div>
  );
}
```
<!-- /example -->

## Layout/Overlay

### Layout/Overlay: dialog confirmation actions

Both actions are wrapped in `DialogClose`, so either one closes the dialog, and the destructive one also updates the page. The safe action gets `autoFocus`, so an accidental Enter keeps the file.

<!-- example: button/dialog-confirmation-actions.tsx -->
```tsx
import type { CSSProperties } from 'react';
import {
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
import { Trash2Icon, XIcon } from '@vega-ui/icons';
import { useState } from 'react';

const destructive = {
  '--button-background-color': 'var(--color-red-accent-500)',
  '--button-background-color-hover': 'var(--color-red-accent-600)',
  '--button-background-color-active': 'var(--color-red-accent-700)',
} as CSSProperties;

export default function DialogConfirmationActions() {
  const [deleted, setDeleted] = useState(false);

  if (deleted) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-8)' }}>
        <Text size={3}>Q3 report.pdf was deleted.</Text>
        <Button type='button' size='sm' variant='secondary' appearance='ghost' onClick={() => setDeleted(false)}>
          Undo
        </Button>
      </div>
    );
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='secondary' appearance='ghost'>
          <Icon size='sm'><Trash2Icon /></Icon>
          Delete file
        </Button>
      </DialogTrigger>
      <DialogContent aria-labelledby='delete-file-title' aria-describedby='delete-file-description'>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-8)' }}>
          <Heading id='delete-file-title' as='h2' size={4} fontWeight={600}>Delete Q3 report.pdf?</Heading>
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
        <Text id='delete-file-description' size={3}>
          The file is removed for everyone in the workspace. Shared links stop working.
        </Text>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--spacing-4)', marginBlockStart: 'var(--spacing-12)' }}>
          <DialogClose asChild>
            <Button variant='secondary' appearance='ghost' autoFocus>Keep file</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button style={destructive} onClick={() => setDeleted(true)}>Delete file</Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}
```
<!-- /example -->

### Layout/Overlay: full-width actions in a narrow card

`fullWidth` stretches the button to the container, which is the usual layout for cards, sheets, and mobile screens with stacked actions.

<!-- example: button/full-width-stacked-actions.tsx -->
```tsx
import { Button, Heading, Text } from '@vega-ui/react';

export default function FullWidthStackedActions() {
  return (
    <section
      aria-labelledby='upgrade-title'
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--spacing-12)',
        width: '100%',
        padding: 'var(--spacing-12)',
        borderRadius: 'var(--radius-5)',
        border: '1px solid var(--separator-opaque)',
        background: 'var(--surface-primary)',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)' }}>
        <Heading id='upgrade-title' as='h3' size={4} fontWeight={600}>Team plan</Heading>
        <Text size={3} style={{ color: 'var(--label-secondary)' }}>
          $12 per seat each month. Unlimited projects and shared libraries.
        </Text>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)' }}>
        <Button type='button' fullWidth>Start 14-day trial</Button>
        <Button type='button' fullWidth variant='secondary' appearance='transparent'>Compare plans</Button>
      </div>
    </section>
  );
}
```
<!-- /example -->

## Error

### Error: failed action with retry

When the action fails, the button switches to a retry label and points to the error text with `aria-describedby`. The first attempt fails on purpose; the retry succeeds.

<!-- example: button/failed-action-with-retry.tsx -->
```tsx
import { Button, HelperText, Icon, Text } from '@vega-ui/react';
import { RotateCwIcon } from '@vega-ui/icons';
import { useState } from 'react';

type Status = 'idle' | 'failed' | 'done';

export default function FailedActionWithRetry() {
  const [status, setStatus] = useState<Status>('idle');
  const [attempts, setAttempts] = useState(0);

  const syncCalendar = () => {
    const nextAttempt = attempts + 1;
    setAttempts(nextAttempt);

    if (nextAttempt === 1) {
      setStatus('failed');
      return;
    }

    setStatus('done');
  };

  if (status === 'done') {
    return (
      <Text role='status' size={3} style={{ width: '100%' }}>
        Calendar synced after {attempts} attempts.
      </Text>
    );
  }

  const failed = status === 'failed';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 'var(--spacing-3)', width: '100%' }}>
      <Button
        type='button'
        appearance={failed ? 'outline' : 'fill'}
        aria-describedby={failed ? 'sync-error' : undefined}
        onClick={syncCalendar}
      >
        {failed && <Icon size='sm'><RotateCwIcon /></Icon>}
        {failed ? 'Retry sync' : 'Sync calendar'}
      </Button>
      {failed && (
        <HelperText id='sync-error' error role='alert'>
          Google Calendar did not respond. Check your connection and try again.
        </HelperText>
      )}
    </div>
  );
}
```
<!-- /example -->

## Disabled

### Disabled: blocked until confirmation matches

A disabled button cannot receive focus, so the reason it is blocked lives in visible helper text next to the input, not on the button.

<!-- example: button/blocked-primary-action.tsx -->
```tsx
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
```
<!-- /example -->

### Disabled: inherited from a fieldset

Buttons inside `<Fieldset disabled>` are disabled natively and pick up the disabled styles without their own `disabled` prop.

<!-- example: button/fieldset-disabled-actions.tsx -->
```tsx
import { Button, Fieldset, FieldsetLegend } from '@vega-ui/react';
import { useState } from 'react';

export default function FieldsetDisabledActions() {
  const [locked, setLocked] = useState(true);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 'var(--spacing-8)', width: '100%' }}>
      <Fieldset disabled={locked} appearance='outlined' style={{ width: '100%', boxSizing: 'border-box' }}>
        <FieldsetLegend>Billing actions</FieldsetLegend>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)' }}>
          <Button type='button' fullWidth>Change plan</Button>
          <Button type='button' fullWidth variant='secondary' appearance='ghost'>Update card</Button>
          <Button type='button' fullWidth variant='secondary' appearance='transparent'>Download invoices</Button>
        </div>
      </Fieldset>
      <Button type='button' size='sm' variant='secondary' appearance='ghost' onClick={() => setLocked(!locked)}>
        {locked ? 'Sign in as owner' : 'Sign out'}
      </Button>
    </div>
  );
}
```
<!-- /example -->

## Edge

### Edge: link with button styling that is not ready yet

With `asChild`, `disabled` is not forwarded: the child owns its state. An anchor without `href` and with `aria-disabled='true'` gets the disabled look and cannot be followed until the export is ready.

<!-- example: button/disabled-link-button.tsx -->
```tsx
import { Button, Icon } from '@vega-ui/react';
import { DownloadIcon } from '@vega-ui/icons';
import { useState } from 'react';

export default function DisabledLinkButton() {
  const [ready, setReady] = useState(false);

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 'var(--spacing-4)' }}>
      <Button type='button' variant='secondary' appearance='ghost' disabled={ready} onClick={() => setReady(true)}>
        Generate CSV
      </Button>
      <Button asChild>
        <a
          href={ready ? '/exports/customers-2024.csv' : undefined}
          aria-disabled={ready ? undefined : 'true'}
          download
        >
          <Icon size='sm'><DownloadIcon /></Icon>
          Download CSV
        </a>
      </Button>
    </div>
  );
}
```
<!-- /example -->

### Edge: long and translated labels

The button has a fixed height, so long labels must not wrap. Put the text in a shrinkable span with an ellipsis and keep the full text in `title`.

<!-- example: button/long-label-truncation.tsx -->
```tsx
import { Button, Icon } from '@vega-ui/react';
import { SendIcon } from '@vega-ui/icons';

const labels = [
  'Send',
  'An alle Teilnehmer senden',
  'Отправить приглашение всем участникам проекта',
];

export default function LongLabelTruncation() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)', width: 220 }}>
      {labels.map((label) => (
        <Button key={label} type='button' title={label} style={{ maxWidth: '100%' }}>
          <Icon size='sm' style={{ flexShrink: 0 }}><SendIcon /></Icon>
          <span style={{ minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {label}
          </span>
        </Button>
      ))}
    </div>
  );
}
```
<!-- /example -->
