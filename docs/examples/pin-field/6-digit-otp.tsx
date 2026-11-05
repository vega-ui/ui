import { Button, Label, PinField, PinFieldInput, PinFieldSlot, Text } from '@vega-ui/react';
import { FormEvent, useId, useState } from 'react';

export default function Example6DigitOtp() {
  const id = useId();
  const [submitted, setSubmitted] = useState('');

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(String(new FormData(event.currentTarget).get('otp')));
  };

  return (
    <form
      onSubmit={onSubmit}
      onReset={() => setSubmitted('')}
      style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)', width: '100%', maxWidth: 320 }}
    >
      <Label htmlFor={id}>Code from the SMS sent to +1 ••• ••• 0132</Label>
      <PinField maxLength={6}>
        <PinFieldInput id={id} name='otp' autoComplete='one-time-code' required pattern='\d{6}' />
        <PinFieldSlot index={0} />
        <PinFieldSlot index={1} />
        <PinFieldSlot index={2} />
        <PinFieldSlot index={3} />
        <PinFieldSlot index={4} />
        <PinFieldSlot index={5} />
      </PinField>
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--spacing-4)', marginBlockStart: 'var(--spacing-9)' }}>
        <Button type='reset' variant='secondary' appearance='ghost'>Clear</Button>
        <Button type='submit'>Verify</Button>
      </div>
      {submitted && (
        <Text size={2} role='status' style={{ color: 'var(--label-secondary)', fontVariantNumeric: 'tabular-nums', marginBlockStart: 'var(--spacing-4)' }}>
          Submitted otp={submitted}
        </Text>
      )}
    </form>
  );
}
