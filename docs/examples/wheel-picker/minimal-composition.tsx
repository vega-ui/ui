import { WheelPicker, WheelPickerColumn, WheelPickerFace, WheelPickerOption } from '@vega-ui/react';

const hours = Array.from({ length: 24 }, (_, hour) => hour);
const minutes = Array.from({ length: 60 }, (_, minute) => minute);
const pad = (value: number) => String(value).padStart(2, '0');

export default function MinimalComposition() {
  return (
    <WheelPicker aria-label='Alarm time'>
      <WheelPickerColumn aria-label='Hours' loop defaultValue={7}>
        {hours.map((hour) => <WheelPickerOption key={hour} value={hour}><WheelPickerFace>{pad(hour)}</WheelPickerFace></WheelPickerOption>)}
      </WheelPickerColumn>
      <WheelPickerColumn aria-label='Minutes' loop defaultValue={30}>
        {minutes.map((minute) => <WheelPickerOption key={minute} value={minute}><WheelPickerFace>{pad(minute)}</WheelPickerFace></WheelPickerOption>)}
      </WheelPickerColumn>
    </WheelPicker>
  );
}
