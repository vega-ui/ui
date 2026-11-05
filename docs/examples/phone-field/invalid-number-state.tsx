import { Button, HelperText, Label, PhoneField, PhoneFieldInput, Text } from '@vega-ui/react';
import { FormEvent, useId, useState } from 'react';

const countDigits = (phone: string) => phone.replace(/\D/g, '').length;

export default function InvalidNumberState() {
  const id = useId();
  const errorId = `${id}-error`;
  const [phone, setPhone] = useState('');
  const [invalid, setInvalid] = useState(false);
  const [saved, setSaved] = useState(false);

  const onChangeValue = (next: string) => {
    setPhone(next);
    if (invalid && countDigits(next) === 11) setInvalid(false);
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (countDigits(phone) !== 11) {
      setInvalid(true);
      setSaved(false);
      return;
    }

    setSaved(true);
  };

  return (
    <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)', width: '100%', maxWidth: 320 }}>
      <Label htmlFor={id}>Phone for two-factor codes</Label>
      <PhoneField code='US' value={phone} onChangeValue={onChangeValue} error={invalid}>
        <PhoneFieldInput
          id={id}
          autoComplete='tel'
          placeholder='+1 201 555-0123'
          aria-invalid={invalid}
          aria-describedby={invalid ? errorId : undefined}
          onBlur={() => setInvalid(countDigits(phone) > 1 && countDigits(phone) !== 11)}
        />
      </PhoneField>
      {invalid && <HelperText id={errorId} error>Enter all 10 digits of the US number.</HelperText>}
      <Button type='submit' style={{ alignSelf: 'flex-end', marginBlockStart: 'var(--spacing-9)' }}>Send a code</Button>
      {saved && (
        <Text size={2} role='status' style={{ color: 'var(--label-secondary)', marginBlockStart: 'var(--spacing-4)' }}>
          A code was sent to {phone}.
        </Text>
      )}
    </form>
  );
}
