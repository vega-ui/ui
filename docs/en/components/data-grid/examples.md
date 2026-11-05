# DataGrid Examples

## Basic

### Basic: on-call rota

A weekly rota with real column and row headers. Headers are passed as `role='columnheader'` and `role='rowheader'` on `DataGridCell`, so screen readers announce the engineer and the day while the arrow keys move cell by cell. The grid has its own accessible name, and `defaultActive` decides which cell takes the single tab stop.

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

## Controlled/Stateful

### Controlled/Stateful: active cell owned by the parent

The parent owns `active` and shows details of the focused shift next to the grid. Setting `active` only moves the tab stop ("Reset tab stop"); to move focus as well, focus the cell element through `apiRef` ("Go to Friday"), and the grid reports the new key through `onChangeActive`.

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

## Form/Integration

### Form/Integration: edit a cell in a dialog form

Cells react to `Enter` and click with your own handlers: here they open a `Dialog` with a form, and the submitted `FormData` updates the rota. `DataGrid` itself has no activation behavior, so the action key and its handler belong to the cells.

<!-- example: data-grid/edit-a-cell-in-a-dialog.tsx -->
```tsx
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
```
<!-- /example -->

## Layout/Overlay

### Layout/Overlay: scrollable grid with a sticky header

168 cells in a scroll container with a sticky header row. Focus scrolls the active cell into view, and `scroll-padding-block-start` keeps it from hiding under the header. `rowDelta={6}` makes `PageUp`/`PageDown` jump six hours instead of to the first or last row.

<!-- example: data-grid/scrollable-grid-with-sticky-header.tsx -->
```tsx
import {
  DataGrid,
  DataGridCell,
  DataGridRow,
  DataGridRowGroup,
} from '@vega-ui/react';
import './examples.css';

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const hours = Array.from({ length: 24 }, (_, hour) => `${String(hour).padStart(2, '0')}:00`);

const getAgents = (hour: number, day: number) => {
  const weekend = day >= 5;
  const businessHours = hour >= 8 && hour < 20;

  if (!businessHours) return 1;
  if (weekend) return 2;

  return 5;
};

export default function ScrollableGridWithStickyHeader() {
  return (
    <DataGrid
      aria-label='Support agents on shift per hour'
      defaultActive='1:1'
      rowDelta={6}
      className='dataGridSheet dataGridSheetWideFirst dataGridScroll'
    >
      <DataGridRowGroup className='dataGridStickyRow'>
        <DataGridRow row={0}>
          <DataGridCell col={0} role='columnheader'>Hour</DataGridCell>
          {days.map((day, index) => (
            <DataGridCell key={day} col={index + 1} role='columnheader'>{day}</DataGridCell>
          ))}
        </DataGridRow>
      </DataGridRowGroup>
      <DataGridRowGroup>
        {hours.map((hour, hourIndex) => (
          <DataGridRow key={hour} row={hourIndex + 1}>
            <DataGridCell col={0} role='rowheader'>{hour}</DataGridCell>
            {days.map((day, dayIndex) => (
              <DataGridCell key={day} col={dayIndex + 1}>{getAgents(hourIndex, dayIndex)}</DataGridCell>
            ))}
          </DataGridRow>
        ))}
      </DataGridRowGroup>
    </DataGrid>
  );
}
```
<!-- /example -->

## Disabled

### Disabled: cells skipped by the keyboard

`exclude` takes a predicate, so closed slots stay visible but the arrow keys and `Home`/`End` jump over them. The grid does not mark them for assistive technology: pass `aria-disabled` and a descriptive label yourself.

<!-- example: data-grid/excluded-cells.tsx -->
```tsx
import {
  DataGrid,
  DataGridCell,
  DataGridRow,
  DataGridRowGroup,
} from '@vega-ui/react';
import './examples.css';

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
const hours = ['09:00', '10:00', '11:00', '12:00'];
const closed = ['0:2', '1:2', '2:2', '3:2', '3:4'];

const isClosed = (key: string) => closed.includes(key);

export default function ExcludedCells() {
  return (
    <DataGrid aria-label='Clinic opening hours' defaultActive='0:0' exclude={isClosed} className='dataGridSheet'>
      <DataGridRowGroup>
        {hours.map((hour, row) => (
          <DataGridRow key={hour} row={row}>
            {days.map((day, col) => {
              const key = `${row}:${col}`;

              if (isClosed(key)) {
                return (
                  <DataGridCell key={day} col={col} aria-disabled='true' aria-label={`${day} ${hour}, closed`}>
                    Closed
                  </DataGridCell>
                );
              }

              return (
                <DataGridCell key={day} col={col} aria-label={`${day} ${hour}, open`}>
                  {hour}
                </DataGridCell>
              );
            })}
          </DataGridRow>
        ))}
      </DataGridRowGroup>
    </DataGrid>
  );
}
```
<!-- /example -->

## Edge

### Edge: ragged rows across a whole year

365 cells where every month row has its own length. Rendering only the days that exist is enough: `ArrowDown` from 31 January skips February and lands on 31 March, and `End` goes to the last day of the current month.

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

### Edge: wrap modes

Switch `wrap` and try the arrow keys at the edges: `horizontal` continues on the next or previous row, `vertical` continues at the top of the next column, `both` does both, and without `wrap` the edges stop movement.

<!-- example: data-grid/wrap-modes.tsx -->
```tsx
import { useState } from 'react';
import {
  DataGrid,
  DataGridCell,
  DataGridRow,
  DataGridRowGroup,
  SegmentedControl,
  SegmentedControlIndicator,
  SegmentedControlItem,
  SegmentedControlItemInput,
  type DataGridWrap,
} from '@vega-ui/react';
import './examples.css';

const modes = [
  { value: 'none', label: 'None' },
  { value: 'horizontal', label: 'Horizontal' },
  { value: 'vertical', label: 'Vertical' },
  { value: 'both', label: 'Both' },
];
const seats = [['A1', 'A2', 'A3', 'A4'], ['B1', 'B2', 'B3', 'B4'], ['C1', 'C2', 'C3', 'C4']];

const toWrap = (mode: string): DataGridWrap | undefined => {
  if (mode === 'horizontal' || mode === 'vertical' || mode === 'both') return mode;

  return undefined;
};

export default function WrapModes() {
  const [mode, setMode] = useState('none');

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-8)', justifyItems: 'start' }}>
      <SegmentedControl
        name='wrap-mode'
        size='sm'
        role='radiogroup'
        aria-label='Wrap mode'
        value={mode}
        onChange={(event) => setMode(event.target.value)}
      >
        {modes.map((item) => (
          <SegmentedControlItem key={item.value} value={item.value}>
            <SegmentedControlItemInput />
            {item.label}
          </SegmentedControlItem>
        ))}
        <SegmentedControlIndicator />
      </SegmentedControl>
      <DataGrid aria-label='Seats' defaultActive='0:3' wrap={toWrap(mode)} className='dataGridSheet dataGridCompact'>
        <DataGridRowGroup>
          {seats.map((row, rowIndex) => (
            <DataGridRow key={row[0]} row={rowIndex}>
              {row.map((seat, col) => (
                <DataGridCell key={seat} col={col}>{seat}</DataGridCell>
              ))}
            </DataGridRow>
          ))}
        </DataGridRowGroup>
      </DataGrid>
    </div>
  );
}
```
<!-- /example -->

### Edge: right-to-left layout

In a right-to-left context `ArrowLeft` and `ArrowRight` follow the text direction: `ArrowRight` moves toward the start of the row. The grid reads the computed `direction`, so `dir='rtl'` on any ancestor is enough.

<!-- example: data-grid/right-to-left.tsx -->
```tsx
import {
  DataGrid,
  DataGridCell,
  DataGridRow,
  DataGridRowGroup,
} from '@vega-ui/react';
import './examples.css';

const days = ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי'];
const shifts = [
  ['בוקר', 'בוקר', 'חופש', 'ערב', 'ערב'],
  ['ערב', 'חופש', 'בוקר', 'בוקר', 'חופש'],
];

export default function RightToLeft() {
  return (
    <div dir='rtl' lang='he'>
      <DataGrid aria-label='סידור משמרות' defaultActive='0:0' className='dataGridSheet'>
        <DataGridRowGroup>
          <DataGridRow row={0}>
            {days.map((day, col) => (
              <DataGridCell key={day} col={col} role='columnheader'>{day}</DataGridCell>
            ))}
          </DataGridRow>
        </DataGridRowGroup>
        <DataGridRowGroup>
          {shifts.map((row, index) => (
            <DataGridRow key={index} row={index + 1}>
              {row.map((shift, col) => (
                <DataGridCell key={days[col]} col={col}>{shift}</DataGridCell>
              ))}
            </DataGridRow>
          ))}
        </DataGridRowGroup>
      </DataGrid>
    </div>
  );
}
```
<!-- /example -->
