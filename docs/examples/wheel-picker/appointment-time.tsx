import { useState } from 'react';
import { Text, WheelPicker, WheelPickerColumn, WheelPickerFace, WheelPickerOption } from '@vega-ui/react';

const slots = Array.from({ length: 17 }, (_, index) => {
  const minutes = 9 * 60 + index * 30;
  return `${String(Math.floor(minutes / 60)).padStart(2, '0')}:${String(minutes % 60).padStart(2, '0')}`;
});
const booked = new Set(['10:00', '10:30', '11:00', '14:00', '15:30']);

export default function AppointmentTime() {
  const [slot, setSlot] = useState('11:30');

  return (
    <div style={{ display: 'grid', justifyItems: 'center', gap: 'var(--spacing-6)', width: '100%' }}>
      <Text id='appointment-label' size={3} fontWeight={600}>Dr. Ortiz · Thursday</Text>
      <WheelPicker aria-labelledby='appointment-label'>
        <WheelPickerColumn aria-label='Time' value={slot} onChangeValue={setSlot} style={{ minInlineSize: '7em' }}>
          {slots.map((value) => (
            <WheelPickerOption key={value} value={value} disabled={booked.has(value)}><WheelPickerFace>{value}</WheelPickerFace></WheelPickerOption>
          ))}
        </WheelPickerColumn>
      </WheelPicker>
      <Text size={2} role='status' style={{ color: 'var(--label-secondary)' }}>
        {`Booked times are skipped · ${slot} is free`}
      </Text>
    </div>
  );
}
