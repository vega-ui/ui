import { FormEvent, KeyboardEvent, useState, type CSSProperties } from 'react';
import { XIcon } from '@vega-ui/icons';
import {
  Button,
  DataGrid,
  DataGridCell,
  DataGridRow,
  DataGridRowGroup,
  Dialog,
  DialogClose,
  DialogContent,
  Heading,
  Icon,
  IconButton,
  SegmentedControl,
  SegmentedControlIndicator,
  SegmentedControlItem,
  SegmentedControlItemInput,
} from '@vega-ui/react';
import './examples.css';

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
const shiftTypes = ['Day', 'Night', 'Off'];

const initialRota = [
  { name: 'Maya Chen', shifts: ['Day', 'Day', 'Off', 'Night', 'Night'] },
  { name: 'Jonas Weber', shifts: ['Night', 'Off', 'Day', 'Day', 'Off'] },
  { name: 'Priya Nair', shifts: ['Off', 'Night', 'Night', 'Off', 'Day'] },
];

export default function EditACellInADialog() {
  const [rota, setRota] = useState(initialRota);
  const [editing, setEditing] = useState<[number, number] | null>(null);

  const onCellKeyDown = (event: KeyboardEvent<HTMLDivElement>, row: number, col: number) => {
    if (event.key !== 'Enter') return;

    event.preventDefault();
    setEditing([row, col]);
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!editing) return;

    const [row, col] = editing;
    const shift = String(new FormData(event.currentTarget).get('shift'));

    setRota((current) => current.map((person, index) => {
      if (index !== row) return person;

      return { ...person, shifts: person.shifts.map((value, day) => (day === col ? shift : value)) };
    }));
    setEditing(null);
  };

  const onChangeOpen = (open: boolean) => {
    if (open) return;

    setEditing(null);
  };

  const person = editing ? rota[editing[0]] : undefined;
  const day = editing ? days[editing[1]] : undefined;

  return (
    <>
      <DataGrid aria-label='On-call rota, press Enter to edit a shift' defaultActive='0:0' className='dataGridSheet'>
        <DataGridRowGroup>
          {rota.map((item, row) => (
            <DataGridRow key={item.name} row={row}>
              {item.shifts.map((shift, col) => (
                <DataGridCell
                  key={days[col]}
                  col={col}
                  aria-label={`${item.name}, ${days[col]}: ${shift}`}
                  onClick={() => setEditing([row, col])}
                  onKeyDown={(event) => onCellKeyDown(event, row, col)}
                >
                  {shift}
                </DataGridCell>
              ))}
            </DataGridRow>
          ))}
        </DataGridRowGroup>
      </DataGrid>
      <Dialog open={editing !== null} onChangeOpen={onChangeOpen}>
        <DialogContent aria-labelledby='edit-shift-title'>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-8)' }}>
            <Heading id='edit-shift-title' as='h2' size={4} fontWeight={600}>
              {person?.name}, {day}
            </Heading>
            <DialogClose asChild>
              <IconButton
                aria-label='Close'
                variant='secondary'
                appearance='ghost'
                style={{ '--icon-button-size': '24px', '--icon-button-br-ratio': 0.5 } as CSSProperties}
              >
                <Icon size='xs'><XIcon strokeWidth={2.5} /></Icon>
              </IconButton>
            </DialogClose>
          </div>
          {editing && (
            <form onSubmit={onSubmit} style={{ display: 'grid', gap: 'var(--spacing-12)', marginBlockStart: 'var(--spacing-12)' }}>
              <SegmentedControl name='shift' defaultValue={rota[editing[0]].shifts[editing[1]]} role='radiogroup' aria-label='Shift'>
                {shiftTypes.map((type) => (
                  <SegmentedControlItem key={type} value={type}>
                    <SegmentedControlItemInput />
                    {type}
                  </SegmentedControlItem>
                ))}
                <SegmentedControlIndicator />
              </SegmentedControl>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--spacing-4)' }}>
                <Button type='submit'>Save shift</Button>
              </div>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
