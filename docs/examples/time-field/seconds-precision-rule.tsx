import { useState } from 'react';
import {
  Icon,
  Label,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Text,
  TimeField,
  TimeFieldColumn,
  TimeFieldInput,
  TimeFieldOption,
  TimeFieldTrigger,
  WheelPicker,
  WheelPickerFace,
} from '@vega-ui/react';
import { ClockIcon } from '@vega-ui/icons';

export default function SecondsPrecisionRule() {
  const [runAt, setRunAt] = useState('00:00:30');

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-8)', width: '100%', maxWidth: 260 }}>
      <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
        <Label htmlFor='cron-time'>Run the export at</Label>
        <TimeField format='HH:mm:ss' min='00:00:30' max='23:59:30' value={runAt} onChangeValue={setRunAt}>
          <TimeFieldInput id='cron-time' placeholder='hh:mm:ss' />
          <Popover placement='bottom-end'>
            <PopoverTrigger asChild>
              <TimeFieldTrigger square aria-label='Choose export time'><Icon><ClockIcon /></Icon></TimeFieldTrigger>
            </PopoverTrigger>
            <PopoverContent role='dialog' aria-label='Choose export time' style={{ padding: 'var(--spacing-6)' }}>
              <WheelPicker aria-label='Export time'>
                <TimeFieldColumn unit='hour' aria-label='Hours' autoFocus><TimeFieldOption><WheelPickerFace /></TimeFieldOption></TimeFieldColumn>
                <span aria-hidden='true' style={{ alignSelf: 'center' }}>:</span>
                <TimeFieldColumn unit='minute' aria-label='Minutes'><TimeFieldOption><WheelPickerFace /></TimeFieldOption></TimeFieldColumn>
                <span aria-hidden='true' style={{ alignSelf: 'center' }}>:</span>
                <TimeFieldColumn unit='second' aria-label='Seconds'><TimeFieldOption><WheelPickerFace /></TimeFieldOption></TimeFieldColumn>
              </WheelPicker>
            </PopoverContent>
          </Popover>
        </TimeField>
      </div>
      <Text size={2} style={{ color: 'var(--label-secondary)' }}>
        Value: {runAt ? <code>{runAt}</code> : 'no complete time'}
      </Text>
    </div>
  );
}
