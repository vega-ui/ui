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
  type TimeFieldProps,
} from '@vega-ui/react';
import { ClockIcon } from '@vega-ui/icons';
import { useId } from 'react';

interface MyTimeFieldProps extends TimeFieldProps {
  name?: string
  pickerLabel: string
  hoursLabel: string
  minutesLabel: string
  secondsLabel?: string
}

export function MyTimeField({ id, name, pickerLabel, hoursLabel, minutesLabel, secondsLabel, ...props }: MyTimeFieldProps) {
  const seconds = props.format === 'HH:mm:ss';

  return (
    <TimeField {...props}>
      <TimeFieldInput id={id} name={name} />
      <Popover placement='bottom-end'>
        <PopoverTrigger asChild>
          <TimeFieldTrigger square aria-label={pickerLabel}><Icon><ClockIcon /></Icon></TimeFieldTrigger>
        </PopoverTrigger>
        <PopoverContent role='dialog' aria-label={pickerLabel} style={{ padding: 'var(--spacing-6)' }}>
          <WheelPicker aria-label={pickerLabel}>
            <TimeFieldColumn unit='hour' aria-label={hoursLabel} autoFocus><TimeFieldOption><WheelPickerFace /></TimeFieldOption></TimeFieldColumn>
            <span aria-hidden='true' style={{ alignSelf: 'center' }}>:</span>
            <TimeFieldColumn unit='minute' aria-label={minutesLabel}><TimeFieldOption><WheelPickerFace /></TimeFieldOption></TimeFieldColumn>
            {seconds && <span aria-hidden='true' style={{ alignSelf: 'center' }}>:</span>}
            {seconds && <TimeFieldColumn unit='second' aria-label={secondsLabel}><TimeFieldOption><WheelPickerFace /></TimeFieldOption></TimeFieldColumn>}
          </WheelPicker>
        </PopoverContent>
      </Popover>
    </TimeField>
  );
}

export default function Recipe() {
  const id = useId();

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-3)', width: '100%', maxWidth: 260 }}>
      <Label htmlFor={id}>Alarm</Label>
      <MyTimeField
        id={id}
        name='alarmAt'
        step={5}
        defaultValue='07:00'
        pickerLabel='Choose alarm time'
        hoursLabel='Hours'
        minutesLabel='Minutes'
      />
    </div>
  );
}
