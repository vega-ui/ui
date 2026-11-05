# PinField Patterns

## OTP Verification

When to use:

- users enter a short verification code from SMS, email, or authenticator apps

Composition notes:

- keep the length fixed
- set `autoComplete='one-time-code'` on `PinFieldInput` so the browser can offer the code
- place helper or error copy nearby

Trade-offs:

- easy to scan and correct
- more specialized than a standard text field

<!-- example: pin-field/6-digit-otp.tsx -->
```tsx
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
```
<!-- /example -->

## Grouped Legacy Code

When to use:

- the code is visually grouped in the product or in the external source users copy from

Composition notes:

- use `PinFieldSeparator` only for visual grouping
- keep actual input length consistent

Trade-offs:

- mirrors real-world code formatting
- adds one more layout decision

<!-- example: pin-field/grouped-code-with-separator.tsx -->
```tsx
import { Label, PinField, PinFieldInput, PinFieldSeparator, PinFieldSlot } from '@vega-ui/react';
import { useId } from 'react';

export default function GroupedCodeWithSeparator() {
  const id = useId();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)', width: '100%', maxWidth: 320 }}>
      <Label htmlFor={id}>Code from your authenticator app</Label>
      <PinField maxLength={6}>
        <PinFieldInput id={id} name='totp' autoComplete='one-time-code' />
        <PinFieldSlot index={0} />
        <PinFieldSlot index={1} />
        <PinFieldSlot index={2} />
        <PinFieldSeparator />
        <PinFieldSlot index={3} />
        <PinFieldSlot index={4} />
        <PinFieldSlot index={5} />
      </PinField>
    </div>
  );
}
```
<!-- /example -->

## Alphanumeric Activation Code

When to use:

- the code accepts letters and digits

Composition notes:

- pass a matching mask
- normalize case in `onChangeValue` when the backend expects capitals
- align the frontend mask with backend validation

Trade-offs:

- flexible
- easier to drift from backend expectations if the mask is guessed

<!-- example: pin-field/alphanumeric-activation-code.tsx -->
```tsx
import { Label, PinField, PinFieldInput, PinFieldSlot, Text } from '@vega-ui/react';
import { useId, useState } from 'react';

export default function AlphanumericActivationCode() {
  const id = useId();
  const [code, setCode] = useState('');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)', width: '100%', maxWidth: 320 }}>
      <Label htmlFor={id}>Activation code from the box</Label>
      <PinField
        mask={/^[A-Za-z0-9]+$/}
        maxLength={5}
        value={code}
        onChangeValue={(next) => setCode(next.toUpperCase())}
      >
        <PinFieldInput id={id} inputMode='text' autoCapitalize='characters' autoComplete='off' />
        <PinFieldSlot index={0} />
        <PinFieldSlot index={1} />
        <PinFieldSlot index={2} />
        <PinFieldSlot index={3} />
        <PinFieldSlot index={4} />
      </PinField>
      <Text size={2} style={{ color: 'var(--label-secondary)', fontVariantNumeric: 'tabular-nums' }}>
        {code.length === 5 ? `Ready to activate ${code}.` : `${5 - code.length} characters left.`}
      </Text>
    </div>
  );
}
```
<!-- /example -->
