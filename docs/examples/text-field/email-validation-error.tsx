import { Button, HelperText, Label, TextField, TextFieldInput } from '@vega-ui/react';
import { FormEvent, useId, useState } from 'react';

const getEmailError = (value: string) => {
  if (value.trim() === '') return 'Enter an email address to send the invite.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Use the full address, like dana@northwind.io.';
  return '';
};

export default function EmailValidationError() {
  const id = useId();
  const messageId = `${id}-message`;
  const [email, setEmail] = useState('dana@northwind');
  const [error, setError] = useState('');

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(getEmailError(email));
  };

  const onChange = (value: string) => {
    setEmail(value);
    if (error !== '') setError(getEmailError(value));
  };

  const invalid = error !== '';

  return (
    <form noValidate onSubmit={onSubmit} style={{ display: 'grid', gap: 'var(--spacing-12)', width: '100%' }}>
      <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
        <Label htmlFor={id}>Invite a teammate</Label>
        <TextField error={invalid}>
          <TextFieldInput
            id={id}
            type='email'
            value={email}
            aria-invalid={invalid}
            aria-describedby={messageId}
            onChange={(event) => onChange(event.currentTarget.value)}
            onBlur={() => setError(getEmailError(email))}
          />
        </TextField>
        <HelperText id={messageId} error={invalid}>
          {invalid ? error : 'We will email them a link to join the workspace.'}
        </HelperText>
      </div>
      <Button type='submit' style={{ justifySelf: 'start' }}>Send invite</Button>
    </form>
  );
}
