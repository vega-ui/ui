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
  useTimeFieldOptionContext,
  WheelPicker,
  WheelPickerFace,
} from '@vega-ui/react';
import { ClockIcon } from '@vega-ui/icons';

const unitStyle = { marginInlineStart: 'var(--spacing-2)', color: 'var(--label-secondary)', fontSize: 'var(--font-size-1)' } as const;

function UnitCell() {
  const { unit, value } = useTimeFieldOptionContext();

  if (unit === 'hour') return <TimeFieldOption><WheelPickerFace>{Number(value)}<span style={unitStyle}>h</span></WheelPickerFace></TimeFieldOption>;

  return <TimeFieldOption><WheelPickerFace>{value}<span style={unitStyle}>min</span></WheelPickerFace></TimeFieldOption>;
}

export default function WheelCellsWithUnits() {
  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-3)', width: '100%', maxWidth: 260 }}>
      <Label htmlFor='quiet-hours'>Quiet hours start</Label>
      <TimeField defaultValue='22:30' step={5}>
        <TimeFieldInput id='quiet-hours' name='quietHours' placeholder='hh:mm' />
        <Popover placement='bottom-end'>
          <PopoverTrigger asChild>
            <TimeFieldTrigger square aria-label='Choose start time'><Icon><ClockIcon /></Icon></TimeFieldTrigger>
          </PopoverTrigger>
          <PopoverContent role='dialog' aria-label='Choose start time' style={{ padding: 'var(--spacing-6)' }}>
            <WheelPicker aria-label='Quiet hours start'>
              <TimeFieldColumn unit='hour' aria-label='Hours' autoFocus style={{ minInlineSize: '4.5em' }}>
                <UnitCell />
              </TimeFieldColumn>
              <TimeFieldColumn unit='minute' aria-label='Minutes' style={{ minInlineSize: '5.5em' }}>
                <UnitCell />
              </TimeFieldColumn>
            </WheelPicker>
          </PopoverContent>
        </Popover>
      </TimeField>
    </div>
  );
}
