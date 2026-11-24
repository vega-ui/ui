import {
  Icon,
  Label,
  Popover,
  PopoverContent,
  PopoverTrigger,
  TimeField,
  TimeFieldColumn,
  TimeFieldInput,
  TimeFieldOption,
  TimeFieldTrigger,
  WheelPicker,
  WheelPickerFace,
} from '@vega-ui/react';
import { ClockIcon } from '@vega-ui/icons';

export default function WheelsInAPopover() {
  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-3)', width: '100%', maxWidth: 260 }}>
      <Label htmlFor='pickup-time'>Pickup time</Label>
      <TimeField defaultValue='12:30' min='09:00' max='21:00' step={15}>
        <TimeFieldInput id='pickup-time' name='pickupTime' placeholder='hh:mm' />
        <Popover placement='bottom-end'>
          <PopoverTrigger asChild>
            <TimeFieldTrigger square aria-label='Choose pickup time'><Icon><ClockIcon /></Icon></TimeFieldTrigger>
          </PopoverTrigger>
          <PopoverContent role='dialog' aria-label='Choose pickup time' style={{ padding: 'var(--spacing-6)' }}>
            <WheelPicker aria-label='Pickup time'>
              <TimeFieldColumn unit='hour' aria-label='Hours' autoFocus><TimeFieldOption><WheelPickerFace /></TimeFieldOption></TimeFieldColumn>
              <span aria-hidden='true' style={{ alignSelf: 'center' }}>:</span>
              <TimeFieldColumn unit='minute' aria-label='Minutes'><TimeFieldOption><WheelPickerFace /></TimeFieldOption></TimeFieldColumn>
            </WheelPicker>
          </PopoverContent>
        </Popover>
      </TimeField>
    </div>
  );
}
