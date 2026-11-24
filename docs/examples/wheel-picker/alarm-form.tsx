import { FormEvent, useState } from 'react';
import { Button, Text, WheelPicker, WheelPickerColumn, WheelPickerFace, WheelPickerOption } from '@vega-ui/react';

const hours = Array.from({ length: 24 }, (_, hour) => hour);
const minutes = Array.from({ length: 12 }, (_, index) => index * 5);
const pad = (value: number) => String(value).padStart(2, '0');

export default function AlarmForm() {
  const [hour, setHour] = useState(6);
  const [minute, setMinute] = useState(45);
  const [saved, setSaved] = useState('');

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setSaved(`Alarm saved for ${pad(Number(data.get('hour')))}:${pad(Number(data.get('minute')))}`);
  };

  return (
    <form onSubmit={onSubmit} style={{ display: 'grid', justifyItems: 'center', gap: 'var(--spacing-6)', width: '100%' }}>
      <WheelPicker aria-label='Wake up at'>
        <WheelPickerColumn aria-label='Hours' loop value={hour} onChangeValue={setHour}>
          {hours.map((value) => <WheelPickerOption key={value} value={value}><WheelPickerFace>{pad(value)}</WheelPickerFace></WheelPickerOption>)}
        </WheelPickerColumn>
        <WheelPickerColumn aria-label='Minutes' loop value={minute} onChangeValue={setMinute}>
          {minutes.map((value) => <WheelPickerOption key={value} value={value}><WheelPickerFace>{pad(value)}</WheelPickerFace></WheelPickerOption>)}
        </WheelPickerColumn>
      </WheelPicker>
      <input type='hidden' name='hour' value={hour} />
      <input type='hidden' name='minute' value={minute} />
      <Button type='submit' size='xs'>Save alarm</Button>
      <Text size={2} role='status' style={{ color: 'var(--label-secondary)', minHeight: '1lh' }}>{saved}</Text>
    </form>
  );
}
