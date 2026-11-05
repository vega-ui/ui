import { Button, Label, Link, TextField, TextFieldInput } from '@vega-ui/react';
import { FormEvent, useState } from 'react';

export default function ForgotPasswordLink() {
  const [signedIn, setSignedIn] = useState('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSignedIn(String(new FormData(event.currentTarget).get('email')));
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-12)', width: '100%' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-8)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)' }}>
          <Label htmlFor='sign-in-email'>Email</Label>
          <TextField>
            <TextFieldInput id='sign-in-email' name='email' type='email' autoComplete='email' required />
          </TextField>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 'var(--spacing-8)' }}>
            <Label htmlFor='sign-in-password'>Password</Label>
            <Link href='/account/reset-password' style={{ fontSize: 'var(--font-size-2)' }}>Forgot password?</Link>
          </div>
          <TextField>
            <TextFieldInput id='sign-in-password' name='password' type='password' autoComplete='current-password' required />
          </TextField>
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)' }}>
        <Button type='submit' fullWidth>Sign in</Button>
        <output style={{ color: 'var(--label-secondary)', textAlign: 'center', overflowWrap: 'anywhere' }}>
          {signedIn === '' ? '' : `Signed in as ${signedIn}`}
        </output>
      </div>
    </form>
  );
}
