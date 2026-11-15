import { Button, HelperText, Label, PhoneField, PhoneFieldInput, Text } from '@vega-ui/react';
import { FormEvent, useId, useState } from 'react';

export default function InvalidNumberState() {
  const id = useId();
  const errorId = `${id}-error`;
  const [phone, setPhone] = useState('');
  const [invalid, setInvalid] = useState(false);
  const [saved, setSaved] = useState(false);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const valid = event.currentTarget.checkValidity();
    setInvalid(!valid);
    setSaved(valid);
  };

  return (
    <form noValidate onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)', width: '100%', maxWidth: 320 }}>
      <Label htmlFor={id}>Phone for two-factor codes</Label>
      <PhoneField country='US' value={phone} onChangeValue={setPhone}>
        <PhoneFieldInput
          id={id}
          autoComplete='tel'
          placeholder='+1 201 555-0123'
          required
          aria-invalid={invalid}
          aria-describedby={invalid ? errorId : undefined}
          onInput={() => setInvalid(false)}
          onBlur={(event) => setInvalid(phone !== '' && !event.currentTarget.validity.valid)}
        />
      </PhoneField>
      {invalid && <HelperText id={errorId} invalid>Enter all 10 digits of the US number.</HelperText>}
      <Button type='submit' style={{ alignSelf: 'flex-end', marginBlockStart: 'var(--spacing-9)' }}>Send a code</Button>
      {saved && (
        <Text size={2} role='status' style={{ color: 'var(--label-secondary)', marginBlockStart: 'var(--spacing-4)' }}>
          A code was sent to {phone}.
        </Text>
      )}
    </form>
  );
}
