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
