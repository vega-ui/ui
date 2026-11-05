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
