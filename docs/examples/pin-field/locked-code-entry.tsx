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
