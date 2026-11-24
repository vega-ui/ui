import { useState } from 'react';
import { Button, Popover, PopoverContent, PopoverTrigger, Text, WheelPicker, WheelPickerColumn, WheelPickerFace, WheelPickerOption } from '@vega-ui/react';

const dayFormat = new Intl.DateTimeFormat('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
const dayName = (offset: number) => {
  if (offset === 0) return 'Today';
  if (offset === 1) return 'Tomorrow';

  return dayFormat.format(new Date(Date.now() + offset * 86_400_000));
};

const days = Array.from({ length: 7 }, (_, offset) => offset);
const hours = Array.from({ length: 13 }, (_, index) => index + 9);
const minutes = [0, 15, 30, 45];
const pad = (value: number) => String(value).padStart(2, '0');

export default function DeliverySlot() {
  const [day, setDay] = useState(0);
  const [hour, setHour] = useState(14);
  const [minute, setMinute] = useState(30);

  return (
    <div style={{ display: 'grid', justifyItems: 'center', gap: 'var(--spacing-3)', width: '100%' }}>
      <Text id='delivery-label' size={2} style={{ color: 'var(--label-secondary)' }}>Delivery</Text>
      <Popover role='dialog' placement='bottom'>
        <PopoverTrigger asChild>
          <Button variant='secondary' appearance='ghost' aria-describedby='delivery-label'>
            {`${dayName(day)}, ${pad(hour)}:${pad(minute)}`}
          </Button>
        </PopoverTrigger>
        <PopoverContent aria-label='Delivery time' style={{ padding: 'var(--spacing-6)' }}>
          <WheelPicker aria-label='Delivery time'>
            <WheelPickerColumn aria-label='Day' value={day} onChangeValue={setDay} style={{ minInlineSize: '8em' }}>
              {days.map((offset) => <WheelPickerOption key={offset} value={offset}><WheelPickerFace>{dayName(offset)}</WheelPickerFace></WheelPickerOption>)}
            </WheelPickerColumn>
            <WheelPickerColumn aria-label='Hours' value={hour} onChangeValue={setHour}>
              {hours.map((value) => <WheelPickerOption key={value} value={value}><WheelPickerFace>{pad(value)}</WheelPickerFace></WheelPickerOption>)}
            </WheelPickerColumn>
            <WheelPickerColumn aria-label='Minutes' loop value={minute} onChangeValue={setMinute}>
              {minutes.map((value) => <WheelPickerOption key={value} value={value}><WheelPickerFace>{pad(value)}</WheelPickerFace></WheelPickerOption>)}
            </WheelPickerColumn>
          </WheelPicker>
        </PopoverContent>
      </Popover>
    </div>
  );
}
