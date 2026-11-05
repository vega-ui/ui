# PinField Examples

## Basic

### Basic: standard 4-digit PIN

The visible `Label` points at `PinFieldInput`, the single hidden input that holds the code; the slots only show its characters. The hint is linked with `aria-describedby`, and the placeholder fills empty slots.

<!-- example: pin-field/standard-4-digit-pin.tsx -->
```tsx
import { HelperText, Label, PinField, PinFieldInput, PinFieldSlot } from '@vega-ui/react';
import { useId } from 'react';

export default function Standard4DigitPin() {
  const id = useId();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)', width: '100%', maxWidth: 320 }}>
      <Label htmlFor={id}>New card PIN</Label>
      <PinField placeholder='••••' maxLength={4}>
        <PinFieldInput id={id} name='pin' autoComplete='off' aria-describedby={`${id}-hint`} />
        <PinFieldSlot index={0} />
        <PinFieldSlot index={1} />
        <PinFieldSlot index={2} />
        <PinFieldSlot index={3} />
      </PinField>
      <HelperText id={`${id}-hint`}>Avoid birthdays and repeated digits like 1111.</HelperText>
    </div>
  );
}
```
<!-- /example -->

## Controlled/Stateful

### Controlled/Stateful: uppercase activation code

The mask accepts letters and digits, and the parent stores the code in capitals by changing it in `onChangeValue`. The readout counts the characters that are left.

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

### Controlled/Stateful: clear the code after a failed check

The parent checks the code as soon as the fourth digit arrives. A wrong code is cleared so the user can type again, the attempts counter goes down, and after the last attempt the field is disabled.

<!-- example: pin-field/clear-the-code-after-a-failed-check.tsx -->
```tsx
import { HelperText, Label, PinField, PinFieldInput, PinFieldSlot } from '@vega-ui/react';
import { useId, useState } from 'react';

const correctCode = '2468';

export default function ClearTheCodeAfterAFailedCheck() {
  const id = useId();
  const [code, setCode] = useState('');
  const [attemptsLeft, setAttemptsLeft] = useState(3);
  const [unlocked, setUnlocked] = useState(false);

  const onChangeValue = (next: string) => {
    if (next.length < 4) {
      setCode(next);
      return;
    }

    if (next === correctCode) {
      setCode(next);
      setUnlocked(true);
      return;
    }

    setCode('');
    setAttemptsLeft((current) => current - 1);
  };

  const failed = attemptsLeft < 3 && !unlocked;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)', width: '100%', maxWidth: 320 }}>
      <Label htmlFor={id}>Enter your app passcode (try 2468)</Label>
      <PinField
        maxLength={4}
        value={code}
        onChangeValue={onChangeValue}
        error={failed}
        disabled={unlocked || attemptsLeft === 0}
      >
        <PinFieldInput
          id={id}
          autoComplete='off'
          aria-invalid={failed}
          aria-describedby={`${id}-status`}
        />
        <PinFieldSlot index={0} />
        <PinFieldSlot index={1} />
        <PinFieldSlot index={2} />
        <PinFieldSlot index={3} />
      </PinField>
      <HelperText id={`${id}-status`} error={failed} role='status'>
        {unlocked && 'Unlocked.'}
        {!unlocked && attemptsLeft === 3 && 'Checked as soon as all four digits are in.'}
        {!unlocked && attemptsLeft < 3 && attemptsLeft > 0 && `Wrong passcode. ${attemptsLeft} attempts left.`}
        {!unlocked && attemptsLeft === 0 && 'Too many attempts. Sign in with your password instead.'}
      </HelperText>
    </div>
  );
}
```
<!-- /example -->

## Form/Integration

### Form/Integration: 6-digit OTP

`PinFieldInput` is a real input: `name` puts the code into `FormData`, `required` and `pattern` give native validation, `autoComplete='one-time-code'` lets the browser offer the code from an SMS, and a reset button clears it.

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

## Layout/Overlay

### Layout/Overlay: grouped code with separator

Six slots split three and three, like an authenticator app shows the code. `PinFieldSeparator` is only visual: the value is still six digits without a dash.

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

## Error

### Error: wrong verification code

The form checks the code on submit: a short or wrong code sets `error` on the field and links the message to the input with `aria-describedby`. Any edit clears the message.

<!-- example: pin-field/wrong-verification-code.tsx -->
```tsx
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
```
<!-- /example -->

## Disabled

### Disabled: locked code entry

After too many attempts the field is disabled for 30 seconds and the countdown is linked to the input. `disabled` goes on `PinField`, which passes it to the input and the slots.

<!-- example: pin-field/locked-code-entry.tsx -->
```tsx
import { HelperText, Label, PinField, PinFieldInput, PinFieldSlot } from '@vega-ui/react';
import { useEffect, useId, useState } from 'react';

export default function LockedCodeEntry() {
  const id = useId();
  const [secondsLeft, setSecondsLeft] = useState(30);
  const locked = secondsLeft > 0;

  useEffect(() => {
    if (!locked) return undefined;

    const timer = setTimeout(() => setSecondsLeft((current) => current - 1), 1000);
    return () => clearTimeout(timer);
  }, [locked, secondsLeft]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)', width: '100%', maxWidth: 320 }}>
      <Label htmlFor={id}>Verification code</Label>
      <PinField maxLength={4} disabled={locked}>
        <PinFieldInput id={id} autoComplete='one-time-code' aria-describedby={`${id}-hint`} />
        <PinFieldSlot index={0} />
        <PinFieldSlot index={1} />
        <PinFieldSlot index={2} />
        <PinFieldSlot index={3} />
      </PinField>
      <HelperText id={`${id}-hint`} style={{ fontVariantNumeric: 'tabular-nums' }}>
        {locked ? `Too many attempts. Try again in ${secondsLeft} s.` : 'You can enter the code again.'}
      </HelperText>
    </div>
  );
}
```
<!-- /example -->

## Edge

### Edge: grouped 8-character code

An array mask sets a pattern per position: four letters, then four digits. A pasted code fills all slots at once, and the separator does not become part of the value.

<!-- example: pin-field/grouped-8-character-code.tsx -->
```tsx
import { Label, PinField, PinFieldInput, PinFieldSeparator, PinFieldSlot, Text } from '@vega-ui/react';
import { useId, useState } from 'react';

const letter = /[A-Za-z]/;
const digit = /\d/;

export default function Grouped8CharacterCode() {
  const id = useId();
  const [code, setCode] = useState('');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)', width: '100%', maxWidth: 340 }}>
      <Label htmlFor={id}>Gift card code (4 letters, then 4 digits)</Label>
      <PinField
        size='sm'
        maxLength={8}
        mask={[letter, letter, letter, letter, digit, digit, digit, digit]}
        value={code}
        onChangeValue={(next) => setCode(next.toUpperCase())}
      >
        <PinFieldInput id={id} inputMode='text' autoCapitalize='characters' autoComplete='off' />
        <PinFieldSlot index={0} />
        <PinFieldSlot index={1} />
        <PinFieldSlot index={2} />
        <PinFieldSlot index={3} />
        <PinFieldSeparator />
        <PinFieldSlot index={4} />
        <PinFieldSlot index={5} />
        <PinFieldSlot index={6} />
        <PinFieldSlot index={7} />
      </PinField>
      <Text size={2} style={{ color: 'var(--label-secondary)', fontVariantNumeric: 'tabular-nums' }}>
        {code.length === 8 ? `Redeem ${code.slice(0, 4)}-${code.slice(4)}` : 'Paste the whole code or type it.'}
      </Text>
    </div>
  );
}
```
<!-- /example -->

### Edge: code inside a right-to-left page

Codes are read left to right in Arabic and Hebrew too, so the field gets `dir='ltr'` while the label stays right-to-left.

<!-- example: pin-field/rtl-layout.tsx -->
```tsx
import { Label, PinField, PinFieldInput, PinFieldSlot } from '@vega-ui/react';
import { useId } from 'react';

export default function RtlLayout() {
  const id = useId();

  return (
    <div dir='rtl' lang='ar' style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)', alignItems: 'flex-start', width: '100%', maxWidth: 320 }}>
      <Label htmlFor={id}>رمز التحقق</Label>
      <PinField dir='ltr' maxLength={4}>
        <PinFieldInput id={id} autoComplete='one-time-code' />
        <PinFieldSlot index={0} />
        <PinFieldSlot index={1} />
        <PinFieldSlot index={2} />
        <PinFieldSlot index={3} />
      </PinField>
    </div>
  );
}
```
<!-- /example -->
