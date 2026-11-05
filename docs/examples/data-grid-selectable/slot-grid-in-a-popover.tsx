import { useState } from 'react';
import {
  Button,
  DataGridSelectable,
  DataGridSelectableCell,
  DataGridSelectableRow,
  DataGridSelectableRowGroup,
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

  const onSelectCell = (key: string) => {
    setSlot(key);
    setOpen(false);
  };

  return (
    <Popover open={open} onChangeOpen={setOpen} placement='bottom-start'>
      <PopoverTrigger asChild>
        <Button variant='secondary' appearance='ghost'>{slot ? `Call: ${slot}` : 'Pick a call slot'}</Button>
      </PopoverTrigger>
      <PopoverContent style={{ padding: 'var(--spacing-8)' }}>
        <DataGridSelectable
          aria-label='Call slots'
          selected={slot}
          onSelectCell={onSelectCell}
          defaultActive={slot ?? 'Mon 10:00'}
          className='selectableGrid'
        >
          <DataGridSelectableRowGroup>
            {days.map((day, row) => (
              <DataGridSelectableRow key={day} row={row}>
                <div role='rowheader'>{day}</div>
                {times.map((time, col) => (
                  <DataGridSelectableCell key={time} col={col} cellKey={`${day} ${time}`} aria-label={`${day} ${time}`}>
                    {time}
                  </DataGridSelectableCell>
                ))}
              </DataGridSelectableRow>
            ))}
          </DataGridSelectableRowGroup>
        </DataGridSelectable>
      </PopoverContent>
    </Popover>
  );
}
