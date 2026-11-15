import { useState } from 'react';
import {
  Button,
  Grid,
  GridCell,
  GridRow,
  GridRowGroup,
  GridRowHeader,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@vega-ui/react';
import './examples.css';

const days = ['Mon', 'Tue', 'Wed'];
const times = ['10:00', '13:00', '16:00'];

export default function SlotGridInAPopover() {
  const [open, setOpen] = useState(false);
  const [slot, setSlot] = useState<string | null>(null);

  const onChangeValue = (key: string) => {
    setSlot(key);
    setOpen(false);
  };

  return (
    <Popover open={open} onChangeOpen={setOpen} placement='bottom-start'>
      <PopoverTrigger asChild>
        <Button variant='secondary' appearance='ghost'>{slot ? `Call: ${slot}` : 'Pick a call slot'}</Button>
      </PopoverTrigger>
      <PopoverContent style={{ padding: 'var(--spacing-8)' }}>
        <Grid
          aria-label='Call slots'
          selection='single'
          value={slot}
          onChangeValue={onChangeValue}
          defaultActive={slot ?? 'Mon 10:00'}
          className='selectableGrid'
        >
          <GridRowGroup>
            {days.map((day, row) => (
              <GridRow key={day} row={row}>
                <GridRowHeader col={0} excluded>{day}</GridRowHeader>
                {times.map((time, col) => (
                  <GridCell key={time} col={col + 1} value={`${day} ${time}`} aria-label={`${day} ${time}`}>
                    {time}
                  </GridCell>
                ))}
              </GridRow>
            ))}
          </GridRowGroup>
        </Grid>
      </PopoverContent>
    </Popover>
  );
}
