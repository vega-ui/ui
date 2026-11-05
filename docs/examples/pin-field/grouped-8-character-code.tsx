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
