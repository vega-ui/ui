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
