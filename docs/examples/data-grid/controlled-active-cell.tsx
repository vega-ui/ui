import { useRef, useState } from 'react';
import {
  Button,
  DataGrid,
  DataGridCell,
  DataGridRow,
  DataGridRowGroup,
  Text,
  type DataGridApiRef,
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
  const apiRef = useRef<DataGridApiRef<string>>(null);

  const [row, col] = active.split(':').map(Number);
  const person = rota[row];

  const focusCell = (key: string) => {
    const node = apiRef.current?.grid.getNodeByKey(key);
    node?.payload?.focus();
  };

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-6)' }}>
      <DataGrid<string>
        aria-label='On-call rota'
        active={active}
        onChangeActive={setActive}
        apiRef={apiRef}
        className='dataGridSheet'
      >
        <DataGridRowGroup>
          {rota.map((item, rowIndex) => (
            <DataGridRow key={item.name} row={rowIndex}>
              {item.shifts.map((shift, colIndex) => (
                <DataGridCell key={days[colIndex]} col={colIndex} aria-label={`${item.name}, ${days[colIndex]}: ${shift}`}>
                  {shift}
                </DataGridCell>
              ))}
            </DataGridRow>
          ))}
        </DataGridRowGroup>
      </DataGrid>
      <Text size={2} style={{ color: 'var(--label-secondary)' }}>
        {person.name} · {days[col]}: {person.shifts[col]}
      </Text>
      <div style={{ display: 'flex', gap: 'var(--spacing-4)' }}>
        <Button size='sm' variant='secondary' appearance='ghost' onClick={() => focusCell(`${row}:4`)}>Go to Friday</Button>
        <Button size='sm' variant='secondary' appearance='ghost' onClick={() => setActive('0:0')}>Reset tab stop</Button>
      </div>
    </div>
  );
}
