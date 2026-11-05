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
