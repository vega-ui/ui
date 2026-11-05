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
