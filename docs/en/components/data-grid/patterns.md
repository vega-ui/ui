# DataGrid Patterns

## Spreadsheet Navigation

When to use:

users move across a dense matrix with the keyboard.

Composition notes:

Keep row and cell coordinates explicit and define wrap behavior intentionally.

Trade-offs:

Powerful keyboard control, but higher integration complexity than a static table.

<!-- example: data-grid/team-schedule.tsx -->
```tsx
import {
  DataGrid,
  DataGridCell,
  DataGridRow,
  DataGridRowGroup,
} from '@vega-ui/react';
import './examples.css';

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];

const rota = [
  { name: 'Maya Chen', shifts: ['Day', 'Day', 'Off', 'Night', 'Night'] },
  { name: 'Jonas Weber', shifts: ['Night', 'Off', 'Day', 'Day', 'Off'] },
  { name: 'Priya Nair', shifts: ['Off', 'Night', 'Night', 'Off', 'Day'] },
  { name: 'Tom Okafor', shifts: ['Day', 'Day', 'Day', 'Off', 'Off'] },
];

export default function TeamSchedule() {
  return (
    <DataGrid aria-label='On-call rota, week 12' defaultActive='1:1' className='dataGridSheet dataGridSheetWideFirst'>
      <DataGridRowGroup>
        <DataGridRow row={0}>
          <DataGridCell col={0} role='columnheader'>Engineer</DataGridCell>
          {days.map((day, index) => (
            <DataGridCell key={day} col={index + 1} role='columnheader'>{day}</DataGridCell>
          ))}
        </DataGridRow>
      </DataGridRowGroup>
      <DataGridRowGroup>
        {rota.map((person, rowIndex) => (
          <DataGridRow key={person.name} row={rowIndex + 1}>
            <DataGridCell col={0} role='rowheader'>{person.name}</DataGridCell>
            {person.shifts.map((shift, index) => (
              <DataGridCell key={days[index]} col={index + 1}>{shift}</DataGridCell>
            ))}
          </DataGridRow>
        ))}
      </DataGridRowGroup>
    </DataGrid>
  );
}
```
<!-- /example -->

## Sparse Planner Grid

When to use:

the visual layout contains intentional gaps.

Composition notes:

Render only the cells that exist: missing columns are skipped by vertical movement on their own. Reserve `exclude` for cells that stay visible but must not take focus.

Trade-offs:

Navigation follows the real data without extra bookkeeping, but every row must still use the same column indexes for the same meaning.

<!-- example: data-grid/days-of-the-year.tsx -->
```tsx
import { useState } from 'react';
import {
  DataGrid,
  DataGridCell,
  DataGridRow,
  DataGridRowGroup,
  Text,
} from '@vega-ui/react';
import './examples.css';

const year = 2026;
const months = Array.from({ length: 12 }, (_, month) => month);

const monthName = new Intl.DateTimeFormat('en-US', { month: 'short', timeZone: 'UTC' });
const fullDate = new Intl.DateTimeFormat('en-US', { dateStyle: 'full', timeZone: 'UTC' });

const getDaysInMonth = (month: number) => new Date(Date.UTC(year, month + 1, 0)).getUTCDate();

const describeKey = (key: string) => {
  const [month, day] = key.split(':').map(Number);
  if (day === 0) return `${monthName.format(Date.UTC(year, month, 1))} ${year}`;

  return fullDate.format(Date.UTC(year, month, day));
};

export default function DaysOfTheYear() {
  const [active, setActive] = useState('0:1');

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-6)', width: '100%' }}>
      <div className='dataGridScrollX'>
        <DataGrid<string>
          aria-label={`Days of ${year}`}
          active={active}
          onChangeActive={setActive}
          className='dataGridSheet dataGridDays'
        >
          <DataGridRowGroup>
            {months.map((month) => (
              <DataGridRow key={month} row={month}>
                <DataGridCell col={0} role='rowheader'>
                  {monthName.format(Date.UTC(year, month, 1))}
                </DataGridCell>
                {Array.from({ length: getDaysInMonth(month) }, (_, index) => (
                  <DataGridCell key={index} col={index + 1}>{index + 1}</DataGridCell>
                ))}
              </DataGridRow>
            ))}
          </DataGridRowGroup>
        </DataGrid>
      </div>
      <Text size={2} style={{ color: 'var(--label-secondary)' }}>{describeKey(active)}</Text>
    </div>
  );
}
```
<!-- /example -->

## Controlled Active Cell

When to use:

the parent flow needs to sync grid position with other UI.

Composition notes:

Own `active` state in the parent. Changing `active` moves only the tab stop; focus a cell through `apiRef` when an outside control should move focus too.

Trade-offs:

More control, but more state coordination work.

<!-- example: data-grid/controlled-active-cell.tsx -->
```tsx
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
```
<!-- /example -->
