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
