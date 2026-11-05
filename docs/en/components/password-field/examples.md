# PasswordField Examples

## Basic

### Basic: sign-in password

`id`, `name` and `autoComplete='current-password'` go on `PasswordFieldInput`, so the `Label` and password managers find the real input. The toggle has no built-in name: give it a fixed `aria-label` such as "Show password" — it already exposes its state with `aria-pressed`.

<!-- example: password-field/sign-in-password.tsx -->
```tsx
import {
  Label,
  PasswordField,
  PasswordFieldHiddenIcon,
  PasswordFieldInput,
  PasswordFieldShownIcon,
  PasswordFieldToggleIconButton,
} from '@vega-ui/react';
import { useId } from 'react';

export default function SignInPassword() {
  const id = useId();

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-3)', width: '100%' }}>
      <Label htmlFor={id}>Password</Label>
      <PasswordField>
        <PasswordFieldInput id={id} name='password' autoComplete='current-password' />
        <PasswordFieldToggleIconButton aria-label='Show password'>
          <PasswordFieldShownIcon />
          <PasswordFieldHiddenIcon />
        </PasswordFieldToggleIconButton>
      </PasswordField>
    </div>
  );
}
```
<!-- /example -->

## Controlled/Stateful

### Controlled/Stateful: live requirement checklist

The parent owns the value and checks each rule on every keystroke. The checklist is linked to the input with `aria-describedby`, and the count below is a status region.

<!-- example: password-field/new-password-checklist.tsx -->
```tsx
import {
  Icon,
  Label,
  PasswordField,
  PasswordFieldHiddenIcon,
  PasswordFieldInput,
  PasswordFieldShownIcon,
  PasswordFieldToggleIconButton,
  Text,
} from '@vega-ui/react';
import { CheckIcon, CircleIcon } from '@vega-ui/icons';
import { useId, useState } from 'react';

const RULES = [
  { label: 'At least 12 characters', test: (value: string) => value.length >= 12 },
  { label: 'Upper and lower case letters', test: (value: string) => /[a-z]/.test(value) && /[A-Z]/.test(value) },
  { label: 'At least one number', test: (value: string) => /\d/.test(value) },
  { label: 'At least one symbol', test: (value: string) => /[^A-Za-z0-9]/.test(value) },
];

export default function NewPasswordChecklist() {
  const id = useId();
  const rulesId = `${id}-rules`;
  const [password, setPassword] = useState('');
  const passed = RULES.filter((rule) => rule.test(password)).length;

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-6)', width: '100%' }}>
      <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
        <Label htmlFor={id}>New password</Label>
        <PasswordField>
          <PasswordFieldInput
            id={id}
            name='newPassword'
            autoComplete='new-password'
            value={password}
            aria-describedby={rulesId}
            onChange={(event) => setPassword(event.currentTarget.value)}
          />
          <PasswordFieldToggleIconButton aria-label='Show password'>
            <PasswordFieldShownIcon />
            <PasswordFieldHiddenIcon />
          </PasswordFieldToggleIconButton>
        </PasswordField>
      </div>
      <ul id={rulesId} style={{ display: 'grid', gap: 'var(--spacing-3)', margin: 0, padding: 0, listStyle: 'none' }}>
        {RULES.map((rule) => {
          const ok = rule.test(password);
          return (
            <li
              key={rule.label}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--spacing-4)',
                color: ok ? 'var(--label-primary)' : 'var(--label-tertiary)',
              }}
            >
              <Icon size='xs' aria-hidden style={{ flexShrink: 0 }}>
                {ok ? <CheckIcon strokeWidth={2.5} /> : <CircleIcon />}
              </Icon>
              <Text size={2} style={{ color: 'inherit' }}>{rule.label}</Text>
            </li>
          );
        })}
      </ul>
      <Text size={2} fontWeight={500} role='status' style={{ fontVariantNumeric: 'tabular-nums' }}>
        {passed} of {RULES.length} requirements met
      </Text>
    </div>
  );
}
```
<!-- /example -->

### Controlled/Stateful: one toggle for two fields

`shown` and `onChangeShown` lift the visibility into the parent. The toggle in the first field reveals both, and the confirmation field has no toggle of its own.

<!-- example: password-field/one-toggle-for-two-fields.tsx -->
```tsx
import {
  Label,
  PasswordField,
  PasswordFieldHiddenIcon,
  PasswordFieldInput,
  PasswordFieldShownIcon,
  PasswordFieldToggleIconButton,
} from '@vega-ui/react';
import { useId, useState } from 'react';

export default function OneToggleForTwoFields() {
  const id = useId();
  const [shown, setShown] = useState(false);

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-8)', width: '100%' }}>
      <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
        <Label htmlFor={`${id}-new`}>New password</Label>
        <PasswordField shown={shown} onChangeShown={setShown}>
          <PasswordFieldInput id={`${id}-new`} autoComplete='new-password' />
          <PasswordFieldToggleIconButton aria-label='Show passwords'>
            <PasswordFieldShownIcon />
            <PasswordFieldHiddenIcon />
          </PasswordFieldToggleIconButton>
        </PasswordField>
      </div>
      <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
        <Label htmlFor={`${id}-confirm`}>Repeat new password</Label>
        <PasswordField shown={shown}>
          <PasswordFieldInput id={`${id}-confirm`} autoComplete='new-password' />
        </PasswordField>
      </div>
    </div>
  );
}
```
<!-- /example -->

## Form/Integration

### Form/Integration: sign-in form

An email field with `autoComplete='username'` next to the password lets password managers save and fill both. The form reads both values with `FormData` and hides the password again on submit, so it is never left on screen as plain text.

<!-- example: password-field/sign-in-form.tsx -->
```tsx
import {
  Button,
  Label,
  PasswordField,
  PasswordFieldHiddenIcon,
  PasswordFieldInput,
  PasswordFieldShownIcon,
  PasswordFieldToggleIconButton,
  Text,
  TextField,
  TextFieldInput,
} from '@vega-ui/react';
import { FormEvent, useId, useState } from 'react';

export default function SignInForm() {
  const id = useId();
  const [shown, setShown] = useState(false);
  const [status, setStatus] = useState('');

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setShown(false);
    const data = new FormData(event.currentTarget);
    const password = String(data.get('password'));
    setStatus(`Signing in as ${data.get('email')} with a ${password.length}-character password…`);
  };

  return (
    <form onSubmit={onSubmit} style={{ display: 'grid', gap: 'var(--spacing-8)', width: '100%' }}>
      <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
        <Label htmlFor={`${id}-email`}>Email</Label>
        <TextField>
          <TextFieldInput id={`${id}-email`} name='email' type='email' autoComplete='username' required />
        </TextField>
      </div>
      <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
        <Label htmlFor={`${id}-password`}>Password</Label>
        <PasswordField shown={shown} onChangeShown={setShown}>
          <PasswordFieldInput id={`${id}-password`} name='password' autoComplete='current-password' required />
          <PasswordFieldToggleIconButton aria-label='Show password'>
            <PasswordFieldShownIcon />
            <PasswordFieldHiddenIcon />
          </PasswordFieldToggleIconButton>
        </PasswordField>
      </div>
      <Button type='submit' style={{ marginBlockStart: 'var(--spacing-4)' }}>Sign in</Button>
      <Text size={2} role='status' style={{ color: 'var(--label-secondary)', overflowWrap: 'anywhere' }}>{status}</Text>
    </form>
  );
}
```
<!-- /example -->

## Layout/Overlay

### Layout/Overlay: confirm a sensitive action in a dialog

The dialog stays open on a wrong password and shows the error under the field; a correct one closes it through the controlled `open`. The error clears whenever the dialog closes. Try `vega-demo`.

<!-- example: password-field/confirm-in-dialog.tsx -->
```tsx
import type { CSSProperties, FormEvent } from 'react';
import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
  Heading,
  HelperText,
  Icon,
  IconButton,
  Label,
  PasswordField,
  PasswordFieldHiddenIcon,
  PasswordFieldInput,
  PasswordFieldShownIcon,
  PasswordFieldToggleIconButton,
  Text,
} from '@vega-ui/react';
import { XIcon } from '@vega-ui/icons';
import { useId, useState } from 'react';

export default function ConfirmInDialog() {
  const id = useId();
  const [open, setOpen] = useState(false);
  const [error, setError] = useState('');
  const [status, setStatus] = useState('');

  const changeOpen = (next: boolean) => {
    setOpen(next);
    setError('');
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const password = String(new FormData(event.currentTarget).get('password'));
    if (password !== 'vega-demo') {
      setError('Wrong password. Hint: vega-demo');
      return;
    }

    setStatus('Recovery codes regenerated.');
    changeOpen(false);
  };

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-6)', justifyItems: 'center', width: '100%' }}>
      <Dialog open={open} onChangeOpen={changeOpen}>
        <DialogTrigger asChild>
          <Button variant='secondary' appearance='ghost'>Regenerate recovery codes</Button>
        </DialogTrigger>
        <DialogContent aria-labelledby={`${id}-title`} aria-describedby={`${id}-text`} style={{ width: 'min(400px, 100%)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-8)' }}>
            <Heading id={`${id}-title`} as='h2' size={4} fontWeight={600}>Confirm it’s you</Heading>
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
          <Text id={`${id}-text`} size={3} style={{ color: 'var(--label-secondary)', marginBlockStart: 'var(--spacing-2)' }}>
            Old recovery codes stop working right away.
          </Text>
          <form onSubmit={onSubmit} style={{ display: 'grid', gap: 'var(--spacing-12)', marginBlockStart: 'var(--spacing-8)' }}>
            <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
              <Label htmlFor={`${id}-password`}>Password</Label>
              <PasswordField error={error !== ''}>
                <PasswordFieldInput
                  id={`${id}-password`}
                  name='password'
                  autoComplete='current-password'
                  required
                  autoFocus
                  aria-invalid={error !== ''}
                  aria-describedby={`${id}-error`}
                />
                <PasswordFieldToggleIconButton aria-label='Show password'>
                  <PasswordFieldShownIcon />
                  <PasswordFieldHiddenIcon />
                </PasswordFieldToggleIconButton>
              </PasswordField>
              <HelperText id={`${id}-error`} error>{error}</HelperText>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--spacing-4)' }}>
              <DialogClose asChild>
                <Button type='button' variant='secondary' appearance='ghost'>Cancel</Button>
              </DialogClose>
              <Button type='submit'>Confirm</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
      <Text size={2} role='status' style={{ color: 'var(--label-secondary)', textAlign: 'center' }}>{status}</Text>
    </div>
  );
}
```
<!-- /example -->

## Error

### Error: confirmation does not match

The mismatch is derived from both values, but it appears only after the confirmation field loses focus or the form is submitted. `error` paints the field, and `aria-invalid` with `aria-describedby` tells screen readers what is wrong.

<!-- example: password-field/confirm-password-mismatch.tsx -->
```tsx
import {
  Button,
  HelperText,
  Label,
  PasswordField,
  PasswordFieldHiddenIcon,
  PasswordFieldInput,
  PasswordFieldShownIcon,
  PasswordFieldToggleIconButton,
} from '@vega-ui/react';
import { FormEvent, useId, useState } from 'react';

export default function ConfirmPasswordMismatch() {
  const id = useId();
  const messageId = `${id}-message`;
  const [password, setPassword] = useState('Correct-horse-42');
  const [confirmation, setConfirmation] = useState('Correct-horse-24');
  const [touched, setTouched] = useState(false);
  const invalid = touched && confirmation !== password;

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setTouched(true);
  };

  return (
    <form onSubmit={onSubmit} style={{ display: 'grid', gap: 'var(--spacing-8)', width: '100%' }}>
      <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
        <Label htmlFor={`${id}-new`}>New password</Label>
        <PasswordField>
          <PasswordFieldInput
            id={`${id}-new`}
            autoComplete='new-password'
            value={password}
            onChange={(event) => setPassword(event.currentTarget.value)}
          />
          <PasswordFieldToggleIconButton aria-label='Show password'>
            <PasswordFieldShownIcon />
            <PasswordFieldHiddenIcon />
          </PasswordFieldToggleIconButton>
        </PasswordField>
      </div>
      <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
        <Label htmlFor={`${id}-confirm`}>Repeat new password</Label>
        <PasswordField error={invalid}>
          <PasswordFieldInput
            id={`${id}-confirm`}
            autoComplete='new-password'
            value={confirmation}
            aria-invalid={invalid}
            aria-describedby={messageId}
            onChange={(event) => setConfirmation(event.currentTarget.value)}
            onBlur={() => setTouched(true)}
          />
          <PasswordFieldToggleIconButton aria-label='Show password'>
            <PasswordFieldShownIcon />
            <PasswordFieldHiddenIcon />
          </PasswordFieldToggleIconButton>
        </PasswordField>
        <HelperText id={messageId} error={invalid}>
          {invalid ? 'Passwords do not match. Check the last characters.' : 'Type the same password again.'}
        </HelperText>
      </div>
      <Button type='submit' style={{ justifySelf: 'start', marginBlockStart: 'var(--spacing-4)' }}>Update password</Button>
    </form>
  );
}
```
<!-- /example -->

## Disabled

### Disabled: managed by single sign-on

`disabled` on the root disables the input and the toggle together. The hint explains why the field is locked and where to change the password.

<!-- example: password-field/managed-by-sso.tsx -->
```tsx
import {
  HelperText,
  Label,
  PasswordField,
  PasswordFieldHiddenIcon,
  PasswordFieldInput,
  PasswordFieldShownIcon,
  PasswordFieldToggleIconButton,
} from '@vega-ui/react';
import { useId } from 'react';

export default function ManagedBySso() {
  const id = useId();

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-3)', width: '100%' }}>
      <Label htmlFor={id}>Password</Label>
      <PasswordField disabled>
        <PasswordFieldInput id={id} placeholder='Managed by Okta' aria-describedby={`${id}-hint`} />
        <PasswordFieldToggleIconButton aria-label='Show password'>
          <PasswordFieldShownIcon />
          <PasswordFieldHiddenIcon />
        </PasswordFieldToggleIconButton>
      </PasswordField>
      <HelperText id={`${id}-hint`}>Your organization signs you in with Okta. Change the password there.</HelperText>
    </div>
  );
}
```
<!-- /example -->

## Edge

### Edge: Caps Lock warning

A masked password hides typing mistakes, so warn when Caps Lock is on. `getModifierState('CapsLock')` is read in the key handlers, and the warning is a polite live region linked to the input.

<!-- example: password-field/caps-lock-warning.tsx -->
```tsx
import {
  HelperText,
  Label,
  PasswordField,
  PasswordFieldHiddenIcon,
  PasswordFieldInput,
  PasswordFieldShownIcon,
  PasswordFieldToggleIconButton,
} from '@vega-ui/react';
import { KeyboardEvent, useId, useState } from 'react';

export default function CapsLockWarning() {
  const id = useId();
  const [capsLock, setCapsLock] = useState(false);

  const onKey = (event: KeyboardEvent<HTMLInputElement>) => {
    setCapsLock(event.getModifierState('CapsLock'));
  };

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-3)', width: '100%' }}>
      <Label htmlFor={id}>Password</Label>
      <PasswordField>
        <PasswordFieldInput
          id={id}
          autoComplete='current-password'
          aria-describedby={`${id}-caps`}
          onKeyDown={onKey}
          onKeyUp={onKey}
          onBlur={() => setCapsLock(false)}
        />
        <PasswordFieldToggleIconButton aria-label='Show password'>
          <PasswordFieldShownIcon />
          <PasswordFieldHiddenIcon />
        </PasswordFieldToggleIconButton>
      </PasswordField>
      <HelperText id={`${id}-caps`} aria-live='polite'>
        {capsLock ? 'Caps Lock is on.' : ''}
      </HelperText>
    </div>
  );
}
```
<!-- /example -->
