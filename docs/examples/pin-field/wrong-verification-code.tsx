import { Button, HelperText, Label, PinField, PinFieldInput, PinFieldSlot, Text } from '@vega-ui/react';
import { FormEvent, useId, useState } from 'react';

export default function WrongVerificationCode() {
  const id = useId();
  const errorId = `${id}-error`;
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [verified, setVerified] = useState(false);

  const onChangeValue = (next: string) => {
    setCode(next);
    setError('');
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (code.length < 6) {
      setError('Enter all 6 digits of the code.');
      return;
    }

    if (code !== '135790') {
      setError('This code is wrong or has expired. Check the latest email or request a new code.');
      return;
    }

    setVerified(true);
  };

  return (
    <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)', width: '100%', maxWidth: 320 }}>
      <Label htmlFor={id}>Code from the email (135790 passes)</Label>
      <PinField maxLength={6} value={code} onChangeValue={onChangeValue} error={error !== ''}>
        <PinFieldInput
          id={id}
          autoComplete='one-time-code'
          aria-describedby={error === '' ? undefined : errorId}
        />
        <PinFieldSlot index={0} />
        <PinFieldSlot index={1} />
        <PinFieldSlot index={2} />
        <PinFieldSlot index={3} />
        <PinFieldSlot index={4} />
        <PinFieldSlot index={5} />
      </PinField>
      {error !== '' && <HelperText id={errorId} error>{error}</HelperText>}
      <Button type='submit' style={{ alignSelf: 'flex-end', marginBlockStart: 'var(--spacing-9)' }}>Confirm email</Button>
      {verified && (
        <Text size={2} role='status' style={{ color: 'var(--label-secondary)', marginBlockStart: 'var(--spacing-4)' }}>
          Email confirmed.
        </Text>
      )}
    </form>
  );
}
