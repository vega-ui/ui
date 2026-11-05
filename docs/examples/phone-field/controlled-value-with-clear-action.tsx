import { Button, Label, PhoneField, PhoneFieldInput, Text } from '@vega-ui/react';
import { useId, useState } from 'react';

export default function ControlledValueWithClearAction() {
  const id = useId();
  const [phone, setPhone] = useState('+1 415 555-0132');
  const digits = phone.replace(/\D/g, '');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)', width: '100%', maxWidth: 320 }}>
      <Label htmlFor={id}>Phone for delivery updates</Label>
      <div style={{ display: 'flex', gap: 'var(--spacing-4)' }}>
        <PhoneField code='US' value={phone} onChangeValue={setPhone} style={{ flex: 1 }}>
          <PhoneFieldInput id={id} autoComplete='tel' />
        </PhoneField>
        <Button variant='secondary' appearance='ghost' disabled={phone === ''} onClick={() => setPhone('')}>
          Clear
        </Button>
      </div>
      <Text size={2} style={{ color: 'var(--label-secondary)', fontVariantNumeric: 'tabular-nums', marginBlockStart: 'var(--spacing-2)' }}>
        {digits.length === 11 ? `Stored as +${digits}` : 'Enter all 10 digits of the number.'}
      </Text>
    </div>
  );
}
