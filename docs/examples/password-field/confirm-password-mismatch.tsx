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
