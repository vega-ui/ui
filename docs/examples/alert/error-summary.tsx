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
