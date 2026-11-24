import { useState } from 'react';
import { Text, WheelPicker, WheelPickerColumn, WheelPickerFace, WheelPickerOption } from '@vega-ui/react';

type Unit = 'day' | 'week' | 'month';

const amounts = Array.from({ length: 30 }, (_, index) => index + 1);
const units: Unit[] = ['day', 'week', 'month'];

export default function RepeatReminder() {
  const [amount, setAmount] = useState(2);
  const [unit, setUnit] = useState<Unit>('week');
  const plural = amount === 1 ? '' : 's';

  return (
    <div style={{ display: 'grid', justifyItems: 'center', gap: 'var(--spacing-6)', width: '100%' }}>
      <Text id='repeat-label' size={3} fontWeight={600}>Water the plants</Text>
      <WheelPicker aria-labelledby='repeat-label'>
        <span style={{ alignSelf: 'center', paddingInlineEnd: 'var(--spacing-4)' }}>Every</span>
        <WheelPickerColumn aria-label='Amount' value={amount} onChangeValue={setAmount}>
          {amounts.map((value) => <WheelPickerOption key={value} value={value}><WheelPickerFace>{value}</WheelPickerFace></WheelPickerOption>)}
        </WheelPickerColumn>
        <WheelPickerColumn aria-label='Unit' value={unit} onChangeValue={setUnit} style={{ minInlineSize: '6em' }}>
          {units.map((value) => <WheelPickerOption key={value} value={value}><WheelPickerFace>{value + plural}</WheelPickerFace></WheelPickerOption>)}
        </WheelPickerColumn>
      </WheelPicker>
      <Text size={2} role='status' style={{ color: 'var(--label-secondary)' }}>
        {amount === 1 ? `Reminds you every ${unit}` : `Reminds you every ${amount} ${unit}s`}
      </Text>
    </div>
  );
}
