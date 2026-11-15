import { useRef, useState } from 'react';
import {
  Button,
  Grid,
  GridCell,
  GridRow,
  GridRowGroup,
  Text,
  type GridApiRef,
} from '@vega-ui/react';
import './examples.css';

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];

const rota = [
  { name: 'Maya Chen', shifts: ['Day', 'Day', 'Off', 'Night', 'Night'] },
  { name: 'Jonas Weber', shifts: ['Night', 'Off', 'Day', 'Day', 'Off'] },
  { name: 'Priya Nair', shifts: ['Off', 'Night', 'Night', 'Off', 'Day'] },
];

export default function ControlledActiveCell() {
  const [active, setActive] = useState('0:0');
  const apiRef = useRef<GridApiRef<string>>(null);

  const [row, col] = active.split(':').map(Number);
  const person = rota[row];

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-6)' }}>
      <Grid
        aria-label='On-call rota'
        active={active}
        onChangeActive={setActive}
        apiRef={apiRef}
        className='gridSheet'
      >
        <GridRowGroup>
          {rota.map((item, rowIndex) => (
            <GridRow key={item.name} row={rowIndex}>
              {item.shifts.map((shift, colIndex) => (
                <GridCell key={days[colIndex]} col={colIndex} aria-label={`${item.name}, ${days[colIndex]}: ${shift}`}>
                  {shift}
                </GridCell>
              ))}
            </GridRow>
          ))}
        </GridRowGroup>
      </Grid>
      <Text size={2} style={{ color: 'var(--label-secondary)' }}>
        {person.name} · {days[col]}: {person.shifts[col]}
      </Text>
      <div style={{ display: 'flex', gap: 'var(--spacing-4)' }}>
        <Button size='sm' variant='secondary' appearance='ghost' onClick={() => apiRef.current?.focus(`${row}:4`)}>Go to Friday</Button>
        <Button size='sm' variant='secondary' appearance='ghost' onClick={() => setActive('0:0')}>Reset tab stop</Button>
      </div>
    </div>
  );
}
