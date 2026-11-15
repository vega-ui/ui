# Grid Examples

## Basic

### Basic: on-call rota

A weekly rota with real column and row headers. `GridColumnHeader` and `GridRowHeader` with `excluded` name the cells, so screen readers announce the engineer and the day while the arrow keys move between the shifts only. The grid has its own accessible name, and `defaultActive` decides which cell takes the single tab stop.

<!-- example: grid/team-schedule.tsx -->
```tsx
import {
  Grid,
  GridCell,
  GridColumnHeader,
  GridRow,
  GridRowGroup,
  GridRowHeader,
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
    <Grid aria-label='On-call rota, week 12' defaultActive='1:1' className='gridSheet gridSheetWideFirst'>
      <GridRowGroup>
        <GridRow row={0}>
          <GridColumnHeader col={0} excluded>Engineer</GridColumnHeader>
          {days.map((day, index) => (
            <GridColumnHeader key={day} col={index + 1} excluded>{day}</GridColumnHeader>
          ))}
        </GridRow>
      </GridRowGroup>
      <GridRowGroup>
        {rota.map((person, rowIndex) => (
          <GridRow key={person.name} row={rowIndex + 1}>
            <GridRowHeader col={0} excluded>{person.name}</GridRowHeader>
            {person.shifts.map((shift, index) => (
              <GridCell key={days[index]} col={index + 1}>{shift}</GridCell>
            ))}
          </GridRow>
        ))}
      </GridRowGroup>
    </Grid>
  );
}
```
<!-- /example -->

### Basic: reporting quarter

`selection='single'` turns selection on; without `selection` cells have no `aria-selected`. Single selection with meaningful keys: every cell gets a `value` such as `FY2025-Q3`, which is what `defaultValue`, `defaultActive` and `onChangeValue` work with. `GridCell` has no selected look of its own, so the selected look comes from `[aria-selected='true']` in the example stylesheet.

<!-- example: grid/quarter-selector-grid.tsx -->
```tsx
import {
  Grid,
  GridCell,
  GridRow,
  GridRowGroup,
  GridRowHeader,
} from '@vega-ui/react';
import './examples.css';

const years = [2024, 2025, 2026];
const quarters = ['Q1', 'Q2', 'Q3', 'Q4'];

export default function QuarterSelectorGrid() {
  return (
    <Grid
      aria-label='Reporting quarter'
      selection='single'
      defaultValue='FY2025-Q3'
      defaultActive='FY2025-Q3'
      className='selectableGrid'
    >
      <GridRowGroup>
        {years.map((year, row) => (
          <GridRow key={year} row={row}>
            <GridRowHeader col={0} excluded>FY{year}</GridRowHeader>
            {quarters.map((quarter, col) => (
              <GridCell
                key={quarter}
                col={col + 1}
                value={`FY${year}-${quarter}`}
                aria-label={`${quarter} FY${year}`}
              >
                {quarter}
              </GridCell>
            ))}
          </GridRow>
        ))}
      </GridRowGroup>
    </Grid>
  );
}
```
<!-- /example -->

### Basic: statement month

Twelve months in a 4×3 matrix with single selection. `value` on every `GridCell` is its key, so `defaultValue` and `defaultActive` use the same `2026-05` strings; `GridItem` inside `GridCell asChild` supplies the selected, hover and focus styles.

<!-- example: grid/compact-month-like-matrix.tsx -->
```tsx
import {
  Grid,
  GridCell,
  GridItem,
  GridRow,
  GridRowGroup,
} from '@vega-ui/react';

const months = [
  ['Jan', 'Feb', 'Mar', 'Apr'],
  ['May', 'Jun', 'Jul', 'Aug'],
  ['Sep', 'Oct', 'Nov', 'Dec'],
];

export default function CompactMonthLikeMatrix() {
  return (
    <Grid
      aria-label='Statement month, 2026'
      selection='single'
      wrap='horizontal'
      defaultValue='2026-05'
      defaultActive='2026-05'
      style={{ width: 280 }}
    >
      <GridRowGroup>
        {months.map((row, rowIndex) => (
          <GridRow key={rowIndex} row={rowIndex}>
            {row.map((month, col) => {
              const value = `2026-${String(rowIndex * 4 + col + 1).padStart(2, '0')}`;

              return (
                <GridCell key={month} col={col} value={value} asChild>
                  <GridItem size='sm'>{month}</GridItem>
                </GridCell>
              );
            })}
          </GridRow>
        ))}
      </GridRowGroup>
    </Grid>
  );
}
```
<!-- /example -->

### Basic: invoices table with sortable columns

`asChild` on every part builds the grid on `table`, `thead`, `tbody`, `tr`, `th`, and `td`, so the columns align with the native table layout. Each `GridColumnHeader` holds a sort button and sets `aria-sort` on the sorted column; the keyboard reaches the header like a cell, Enter moves into the button, and Escape returns to the header. The header row is numbered apart with `row={-1}`.

<!-- example: grid/sortable-table.tsx -->
```tsx
import { useState } from 'react';
import { ArrowDownIcon, ArrowUpDownIcon, ArrowUpIcon } from '@vega-ui/icons';
import {
  Button,
  Grid,
  GridCell,
  GridColumnHeader,
  GridRow,
  GridRowGroup,
  GridRowHeader,
  Icon,
} from '@vega-ui/react';
import './examples.css';

type Column = 'customer' | 'amount' | 'due';
type Direction = 'ascending' | 'descending';

const invoices = [
  { customer: 'Northwind', amount: 1240, due: '2026-11-14' },
  { customer: 'Globex', amount: 860, due: '2026-11-03' },
  { customer: 'Initech', amount: 3120, due: '2026-11-21' },
  { customer: 'Umbrella', amount: 455, due: '2026-11-09' },
];

const columns: { key: Column, label: string, numeric?: boolean }[] = [
  { key: 'customer', label: 'Customer' },
  { key: 'amount', label: 'Amount', numeric: true },
  { key: 'due', label: 'Due' },
];

const money = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
const date = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', timeZone: 'UTC' });

export const layout = 'wide';

export default function SortableTable() {
  const [sort, setSort] = useState<{ column: Column, direction: Direction }>({ column: 'due', direction: 'ascending' });

  const sorted = [...invoices].sort((a, b) => {
    const order = a[sort.column] < b[sort.column] ? -1 : 1;

    return sort.direction === 'ascending' ? order : -order;
  });

  const sortBy = (column: Column) => {
    if (sort.column !== column) {
      setSort({ column, direction: 'ascending' });
      return;
    }

    setSort({ column, direction: sort.direction === 'ascending' ? 'descending' : 'ascending' });
  };

  const sortIcon = (column: Column) => {
    if (sort.column !== column) return <ArrowUpDownIcon />;
    if (sort.direction === 'ascending') return <ArrowUpIcon />;

    return <ArrowDownIcon />;
  };

  return (
    <Grid asChild aria-label='Open invoices' defaultActive='-1:0' className='gridSheet gridTable'>
      <table>
        <GridRowGroup asChild>
          <thead>
            <GridRow row={-1} asChild>
              <tr>
                {columns.map((column, col) => (
                  <GridColumnHeader
                    key={column.key}
                    col={col}
                    asChild
                    aria-sort={sort.column === column.key ? sort.direction : undefined}
                  >
                    <th className={column.numeric ? 'gridNumeric' : undefined}>
                      <Button size='xs' variant='secondary' appearance='ghost' onClick={() => sortBy(column.key)}>
                        {column.label}
                        <Icon size='xs'>{sortIcon(column.key)}</Icon>
                      </Button>
                    </th>
                  </GridColumnHeader>
                ))}
              </tr>
            </GridRow>
          </thead>
        </GridRowGroup>
        <GridRowGroup asChild>
          <tbody>
            {sorted.map((invoice, row) => (
              <GridRow key={invoice.customer} row={row} asChild>
                <tr>
                  <GridRowHeader col={0} asChild>
                    <th scope='row'>{invoice.customer}</th>
                  </GridRowHeader>
                  <GridCell col={1} asChild>
                    <td className='gridNumeric'>{money.format(invoice.amount)}</td>
                  </GridCell>
                  <GridCell col={2} asChild>
                    <td>{date.format(new Date(invoice.due))}</td>
                  </GridCell>
                </tr>
              </GridRow>
            ))}
          </tbody>
        </GridRowGroup>
      </table>
    </Grid>
  );
}
```
<!-- /example -->

### Basic: symbol palette

Each cell is itself a button through `<GridCell asChild><button /></GridCell>`: the arrows move between the symbols, and Enter, Space, or a click inserts one into the note. A grid without `selection` leaves the click to the button.

<!-- example: grid/cell-as-a-button.tsx -->
```tsx
import { useId, useState } from 'react';
import {
  Grid,
  GridCell,
  GridRow,
  GridRowGroup,
  Label,
  TextField,
  TextFieldInput,
} from '@vega-ui/react';
import './examples.css';

const symbols = [
  [{ symbol: '°', name: 'Degree sign' }, { symbol: '±', name: 'Plus-minus' }, { symbol: '×', name: 'Multiplication' }, { symbol: '÷', name: 'Division' }],
  [{ symbol: '—', name: 'Em dash' }, { symbol: '…', name: 'Ellipsis' }, { symbol: '←', name: 'Left arrow' }, { symbol: '→', name: 'Right arrow' }],
  [{ symbol: '€', name: 'Euro' }, { symbol: '£', name: 'Pound' }, { symbol: '©', name: 'Copyright' }, { symbol: '™', name: 'Trademark' }],
];

export default function CellAsAButton() {
  const id = useId();
  const [note, setNote] = useState('Oven at 180');

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-6)', inlineSize: 'min(100%, 280px)' }}>
      <div style={{ display: 'grid', gap: 'var(--spacing-2)' }}>
        <Label htmlFor={id}>Note</Label>
        <TextField>
          <TextFieldInput id={id} value={note} onChange={(event) => setNote(event.target.value)} />
        </TextField>
      </div>
      <Grid aria-label='Symbols' wrap='horizontal' defaultActive='0:0' className='selectableGrid symbolPalette'>
        <GridRowGroup>
          {symbols.map((line, row) => (
            <GridRow key={row} row={row}>
              {line.map((item, col) => (
                <GridCell key={item.name} col={col} asChild>
                  <button type='button' aria-label={item.name} onClick={() => setNote(note + item.symbol)}>
                    {item.symbol}
                  </button>
                </GridCell>
              ))}
            </GridRow>
          ))}
        </GridRowGroup>
      </Grid>
    </div>
  );
}
```
<!-- /example -->

## Controlled/Stateful

### Controlled/Stateful: active cell owned by the parent

The parent owns `active` and shows details of the focused shift next to the grid. Setting `active` only moves the tab stop ("Reset tab stop"); to move focus as well, call `focus` of `apiRef` ("Go to Friday"), and the grid reports the new key through `onChangeActive`.

<!-- example: grid/controlled-active-cell.tsx -->
```tsx
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
```
<!-- /example -->

### Controlled/Stateful: interview availability

`selection='multiple'` with the selected keys owned by the parent: the summary and the "Clear" button read and reset the same array. Ctrl+A (Command+A on macOS) selects every slot. The day and time headers are `GridColumnHeader` and `GridRowHeader` with `excluded`, so the keyboard moves only between the slots. The grid sets `aria-multiselectable` itself in `multiple` and `range` selection, and empty cells get their accessible name from `aria-label`.

<!-- example: grid/parent-managed-multi-select.tsx -->
```tsx
import { useState } from 'react';
import {
  Button,
  Grid,
  GridCell,
  GridColumnHeader,
  GridRow,
  GridRowGroup,
  GridRowHeader,
  Text,
} from '@vega-ui/react';
import './examples.css';

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
const parts = ['Morning', 'Afternoon', 'Evening'];

export const layout = 'wide';

export default function ParentManagedMultiSelect() {
  const [selected, setSelected] = useState<string[]>(['Tue Morning', 'Thu Afternoon']);

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-8)', width: 'fit-content' }}>
      <Grid
        aria-label='Interview availability'
        selection='multiple'
        value={selected}
        onChangeValue={setSelected}
        defaultActive='Mon Morning'
        className='selectableGrid'
      >
        <GridRowGroup>
          <GridRow row={-1}>
            <GridColumnHeader col={0} excluded>Time</GridColumnHeader>
            {days.map((day, col) => <GridColumnHeader key={day} col={col + 1} excluded>{day}</GridColumnHeader>)}
          </GridRow>
        </GridRowGroup>
        <GridRowGroup>
          {parts.map((part, row) => (
            <GridRow key={part} row={row}>
              <GridRowHeader col={0} excluded>{part}</GridRowHeader>
              {days.map((day, col) => (
                <GridCell key={day} col={col + 1} value={`${day} ${part}`} aria-label={`${day} ${part}`} />
              ))}
            </GridRow>
          ))}
        </GridRowGroup>
      </Grid>
      <Text size={2} style={{ color: 'var(--label-secondary)', contain: 'inline-size' }}>
        {selected.length === 0 ? 'No slots picked yet' : `${selected.length} slots: ${selected.join(', ')}`}
      </Text>
      <Button size='sm' variant='secondary' appearance='ghost' disabled={selected.length === 0} style={{ justifySelf: 'start' }} onClick={() => setSelected([])}>
        Clear
      </Button>
    </div>
  );
}
```
<!-- /example -->

### Controlled/Stateful: campaign months as a range

`selection='range'` with the range owned by the parent. `GridCell` sets `data-range` on the cells of the range and `GridItem` styles it, the summary reads the same array, and "Clear" resets it. Keys are `YYYY-MM` strings, which already sort in calendar order.

<!-- example: grid/controlled-range-picker-grid.tsx -->
```tsx
import { useState } from 'react';
import {
  Button,
  Grid,
  GridCell,
  GridItem,
  GridRow,
  GridRowGroup,
  Text,
} from '@vega-ui/react';

const names = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const rows = [0, 1, 2];
const cols = [0, 1, 2, 3];

const toValue = (month: number) => `2026-${String(month + 1).padStart(2, '0')}`;
const toName = (value: string) => names[Number(value.slice(5)) - 1];

const describeRange = (range: string[]) => {
  if (range.length === 0) return 'Pick the first month of the campaign.';
  if (range.length === 1) return `Starts in ${toName(range[0])}. Now pick the last month.`;

  const [start, end] = [...range].sort();
  const months = Number(end.slice(5)) - Number(start.slice(5)) + 1;

  return `${toName(start)} – ${toName(end)} 2026, ${months} months`;
};

export default function ControlledRangePickerGrid() {
  const [range, setRange] = useState<string[]>(['2026-03', '2026-07']);

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-8)', width: '100%', maxWidth: 280 }}>
      <Grid
        aria-label='Campaign months, 2026'
        selection='range'
        wrap='horizontal'
        value={range}
        onChangeValue={setRange}
        defaultActive='2026-03'
        style={{ width: '100%' }}
      >
        <GridRowGroup>
          {rows.map((row) => (
            <GridRow key={row} row={row}>
              {cols.map((col) => {
                const value = toValue(row * cols.length + col);

                return (
                  <GridCell key={value} col={col} value={value} asChild>
                    <GridItem size='sm'>{toName(value)}</GridItem>
                  </GridCell>
                );
              })}
            </GridRow>
          ))}
        </GridRowGroup>
      </Grid>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-4)' }}>
        <Text size={2} style={{ color: 'var(--label-secondary)', fontVariantNumeric: 'tabular-nums' }}>{describeRange(range)}</Text>
        <Button size='sm' variant='secondary' appearance='ghost' onClick={() => setRange([])}>Clear</Button>
      </div>
    </div>
  );
}
```
<!-- /example -->

## Form/Integration

### Form/Integration: edit a cell in a dialog form

Cells react to `Enter` and click with your own handlers: here they open a `Dialog` with a form, and the submitted `FormData` updates the rota. `Grid` itself has no activation behavior, so the action key and its handler belong to the cells.

<!-- example: grid/edit-a-cell-in-a-dialog.tsx -->
```tsx
import { FormEvent, KeyboardEvent, useState, type CSSProperties } from 'react';
import { XIcon } from '@vega-ui/icons';
import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  Grid,
  GridCell,
  GridRow,
  GridRowGroup,
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
      <Grid aria-label='On-call rota, press Enter to edit a shift' defaultActive='0:0' className='gridSheet'>
        <GridRowGroup>
          {rota.map((item, row) => (
            <GridRow key={item.name} row={row}>
              {item.shifts.map((shift, col) => (
                <GridCell
                  key={days[col]}
                  col={col}
                  aria-label={`${item.name}, ${days[col]}: ${shift}`}
                  onClick={() => setEditing([row, col])}
                  onKeyDown={(event) => onCellKeyDown(event, row, col)}
                >
                  {shift}
                </GridCell>
              ))}
            </GridRow>
          ))}
        </GridRowGroup>
      </Grid>
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

### Form/Integration: delivery window in a form

The grid is not a form control, so the selected key travels in a hidden input and is read with `FormData` on submit. Submitting without a choice shows an error linked to the grid with `aria-describedby`; picking a slot clears it, and the reset button clears the state through `onReset`. Full windows come from `disabled`.

<!-- example: grid/delivery-slot-form.tsx -->
```tsx
import { FormEvent, useState } from 'react';
import {
  Button,
  Grid,
  GridCell,
  GridRow,
  GridRowGroup,
  GridRowHeader,
  HelperText,
  Text,
} from '@vega-ui/react';
import './examples.css';

const days = [
  { date: '2026-03-10', label: 'Tue 10' },
  { date: '2026-03-11', label: 'Wed 11' },
  { date: '2026-03-12', label: 'Thu 12' },
];
const windows = ['08:00', '12:00', '16:00'];
const full = ['2026-03-10T08:00', '2026-03-11T12:00'];

export default function DeliverySlotForm() {
  const [slot, setSlot] = useState<string | null>(null);
  const [missing, setMissing] = useState(false);
  const [submitted, setSubmitted] = useState('');

  const onChangeValue = (key: string) => {
    setSlot(key);
    setMissing(false);
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const value = String(new FormData(event.currentTarget).get('slot'));
    if (!value) {
      setMissing(true);
      return;
    }

    setSubmitted(value);
  };

  const onReset = () => {
    setSlot(null);
    setMissing(false);
    setSubmitted('');
  };

  return (
    <form onSubmit={onSubmit} onReset={onReset} style={{ display: 'grid', gap: 'var(--spacing-12)', width: 'fit-content' }}>
      <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
        <Text id='delivery-slot-label' fontWeight={500}>Delivery window</Text>
        <Grid
          aria-labelledby='delivery-slot-label'
          selection='single'
          aria-describedby={missing ? 'delivery-slot-error' : undefined}
          value={slot}
          onChangeValue={onChangeValue}
          disabled={full}
          defaultActive='2026-03-10T12:00'
          className='selectableGrid'
        >
          <GridRowGroup>
            {days.map((day, row) => (
              <GridRow key={day.date} row={row}>
                <GridRowHeader col={0} excluded>{day.label}</GridRowHeader>
                {windows.map((time, col) => (
                  <GridCell key={time} col={col + 1} value={`${day.date}T${time}`}>
                    {time}
                  </GridCell>
                ))}
              </GridRow>
            ))}
          </GridRowGroup>
        </Grid>
        <input type='hidden' name='slot' value={slot ?? ''} />
        {missing && <HelperText id='delivery-slot-error' invalid style={{ contain: 'inline-size' }}>Choose a delivery window to continue.</HelperText>}
      </div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--spacing-4)' }}>
        <Button type='reset' variant='secondary' appearance='ghost'>Reset</Button>
        <Button type='submit'>Book delivery</Button>
      </div>
      {submitted && <Text size={2} style={{ color: 'var(--label-secondary)', contain: 'inline-size' }}>Submitted slot={submitted}</Text>}
    </form>
  );
}
```
<!-- /example -->

### Form/Integration: invoice period in a form

The selected quarter goes into a hidden input and is read with `FormData` on submit; the reset button restores the initial quarter through `onReset`. Q4 is disabled, and the hint explaining why is linked with `aria-describedby`.

<!-- example: grid/quarter-selector-in-a-billing-flow.tsx -->
```tsx
import { FormEvent, useState } from 'react';
import {
  Button,
  Grid,
  GridCell,
  GridItem,
  GridRow,
  GridRowGroup,
  HelperText,
  Text,
} from '@vega-ui/react';

const quarters = ['2026-Q1', '2026-Q2', '2026-Q3', '2026-Q4'];
const initialQuarter = '2026-Q2';

export default function QuarterSelectorInABillingFlow() {
  const [quarter, setQuarter] = useState(initialQuarter);
  const [result, setResult] = useState('');

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const period = new FormData(event.currentTarget).get('period');
    setResult(`Exporting invoices for ${period}`);
  };

  const onReset = () => {
    setQuarter(initialQuarter);
    setResult('');
  };

  return (
    <form onSubmit={onSubmit} onReset={onReset} style={{ display: 'grid', gap: 'var(--spacing-12)', width: '100%', maxWidth: 280 }}>
      <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
        <Text id='invoice-period-label' fontWeight={500}>Invoice period</Text>
        <Grid
          aria-labelledby='invoice-period-label'
          aria-describedby='invoice-period-hint'
          selection='single'
          wrap='horizontal'
          value={quarter}
          onChangeValue={setQuarter}
          disabled='2026-Q4'
          defaultActive={initialQuarter}
          style={{ width: '100%' }}
        >
          <GridRowGroup>
            <GridRow row={0}>
              {quarters.map((value, col) => (
                <GridCell key={value} col={col} value={value} asChild>
                  <GridItem>{value.slice(5)}</GridItem>
                </GridCell>
              ))}
            </GridRow>
          </GridRowGroup>
        </Grid>
        <input type='hidden' name='period' value={quarter} />
        <HelperText id='invoice-period-hint'>Q4 is still open and cannot be invoiced yet.</HelperText>
      </div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--spacing-4)' }}>
        <Button type='reset' variant='secondary' appearance='ghost'>Reset</Button>
        <Button type='submit'>Export invoices</Button>
      </div>
      {result && <Text size={2} style={{ color: 'var(--label-secondary)' }}>{result}</Text>}
    </form>
  );
}
```
<!-- /example -->

### Form/Integration: calculator

Every key is a button inside `<GridCell asChild>`, so the whole keypad is one tab stop and the arrows move between the keys like on a physical keypad. A grid without `selection` leaves Enter, Space, and the click to the button. The digits and operators typed on the keyboard go through `onKeyDown` of the grid, and `<output aria-live>` announces the result.

<!-- example: grid/calculator.tsx -->
```tsx
import { KeyboardEvent, useState } from 'react';
import { Grid, GridCell, GridRow, GridRowGroup } from '@vega-ui/react';
import './examples.css';

type Operator = '÷' | '×' | '−' | '+';

const keys = [
  ['C', '±', '%', '÷'],
  ['7', '8', '9', '×'],
  ['4', '5', '6', '−'],
  ['1', '2', '3', '+'],
  ['0', '00', '.', '='],
];

const names: Record<string, string> = {
  'C': 'Clear',
  '±': 'Change sign',
  '%': 'Percent',
  '÷': 'Divide',
  '×': 'Multiply',
  '−': 'Subtract',
  '+': 'Add',
  '=': 'Equals',
};

const shortcuts: Record<string, string> = {
  '/': '÷',
  '*': '×',
  '-': '−',
  '+': '+',
  '=': '=',
  '%': '%',
  '.': '.',
  ',': '.',
  'Escape': 'C',
};

const operators = ['÷', '×', '−', '+'];

const calculate = (left: number, operator: Operator, right: number) => {
  if (operator === '÷') return left / right;
  if (operator === '×') return left * right;
  if (operator === '−') return left - right;

  return left + right;
};

const format = (value: number) => {
  if (!Number.isFinite(value)) return 'Error';

  return String(Number(value.toPrecision(12)));
};

const grouping = new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 });

const group = (value: string) => {
  if (value === 'Error') return value;

  const [integer, fraction] = value.split('.');
  const grouped = grouping.format(Number(integer));

  return fraction === undefined ? grouped : `${grouped}.${fraction}`;
};

const getKind =(key: string) => {
  if (key === '=') return 'equals';
  if (operators.includes(key)) return 'operator';
  if (['C', '±', '%'].includes(key)) return 'function';

  return 'digit';
};

export default function Calculator() {
  const [display, setDisplay] = useState('0');
  const [pending, setPending] = useState<{ value: number, operator: Operator } | null>(null);
  const [fresh, setFresh] = useState(true);

  const type = (digits: string) => {
    if (fresh || display === '0' || display === 'Error') {
      setDisplay(digits === '00' ? '0' : digits);
      setFresh(false);
      return;
    }

    if (display.length >= 12) return;

    setDisplay(display + digits);
  };

  const typeDot = () => {
    if (fresh || display === 'Error') {
      setDisplay('0.');
      setFresh(false);
      return;
    }

    if (display.includes('.')) return;

    setDisplay(display + '.');
  };

  const getResult = () => {
    if (!pending || fresh) return Number(display);

    return calculate(pending.value, pending.operator, Number(display));
  };

  const press = (key: string) => {
    if (key === 'C') {
      setDisplay('0');
      setPending(null);
      setFresh(true);
      return;
    }

    if (key === '±') {
      setDisplay(format(-Number(display)));
      return;
    }

    if (key === '%') {
      setDisplay(format(Number(display) / 100));
      return;
    }

    if (key === '.') {
      typeDot();
      return;
    }

    if (key === '=') {
      if (!pending) return;

      setDisplay(format(getResult()));
      setPending(null);
      setFresh(true);
      return;
    }

    if (operators.includes(key)) {
      const result = getResult();

      setDisplay(format(result));
      setPending({ value: result, operator: key as Operator });
      setFresh(true);
      return;
    }

    type(key);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const key = /^\d$/.test(event.key) ? event.key : shortcuts[event.key];
    if (!key) return;

    event.preventDefault();
    press(key);
  };

  return (
    <div className='calculator'>
      <div className='calculatorScreen'>
        <span className='calculatorExpression'>
          {pending ? `${group(format(pending.value))} ${pending.operator}` : ' '}
        </span>
        <output aria-live='polite' className='calculatorDisplay'>{group(display)}</output>
      </div>
      <Grid aria-label='Calculator keys' wrap='horizontal' onKeyDown={onKeyDown} className='calculatorKeys'>
        <GridRowGroup>
          {keys.map((line, row) => (
            <GridRow key={row} row={row}>
              {line.map((key, col) => (
                <GridCell key={key} col={col} asChild>
                  <button type='button' aria-label={names[key]} data-kind={getKind(key)} onClick={() => press(key)}>
                    {key}
                  </button>
                </GridCell>
              ))}
            </GridRow>
          ))}
        </GridRowGroup>
      </Grid>
    </div>
  );
}
```
<!-- /example -->

### Form/Integration: inline budget editing

The planned and spent amounts are inputs with `tabIndex={-1}` inside the cells. Enter or F2 on a cell moves into its input, Escape returns to the cell, and the arrows move between cells again. Tab leaves the grid for the "Reset" button instead of stopping on every input. The static headers are `excluded`.

<!-- example: grid/inline-editing.tsx -->
```tsx
import { useState } from 'react';
import {
  Button,
  Grid,
  GridCell,
  GridColumnHeader,
  GridRow,
  GridRowGroup,
  GridRowHeader,
  Text,
} from '@vega-ui/react';
import './examples.css';

const initialBudget = [
  { category: 'Rent', planned: '1800', spent: '1800' },
  { category: 'Groceries', planned: '600', spent: '412' },
  { category: 'Transport', planned: '150', spent: '96' },
  { category: 'Utilities', planned: '220', spent: '238' },
];

const headers = ['Category', 'Planned', 'Spent', 'Left'];

const money = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

const toNumber = (value: string) => Number(value) || 0;

export const layout = 'wide';

export default function InlineEditing() {
  const [budget, setBudget] = useState(initialBudget);

  const change = (row: number, field: 'planned' | 'spent', value: string) => {
    setBudget(budget.map((item, index) => index === row ? { ...item, [field]: value } : item));
  };

  const left = budget.reduce((sum, item) => sum + toNumber(item.planned) - toNumber(item.spent), 0);

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-8)', inlineSize: 'min(100%, 480px)' }}>
      <Grid aria-label='November budget' defaultActive='0:1' className='gridSheet gridSheetWideFirst gridEditable'>
        <GridRowGroup>
          <GridRow row={-1}>
            {headers.map((header, col) => (
              <GridColumnHeader key={header} col={col} excluded>{header}</GridColumnHeader>
            ))}
          </GridRow>
        </GridRowGroup>
        <GridRowGroup>
          {budget.map((item, row) => (
            <GridRow key={item.category} row={row}>
              <GridRowHeader col={0}>{item.category}</GridRowHeader>
              <GridCell col={1}>
                <input
                  className='gridCellInput'
                  aria-label={`${item.category} planned`}
                  inputMode='decimal'
                  value={item.planned}
                  onChange={(event) => change(row, 'planned', event.target.value)}
                />
              </GridCell>
              <GridCell col={2}>
                <input
                  className='gridCellInput'
                  aria-label={`${item.category} spent`}
                  inputMode='decimal'
                  value={item.spent}
                  onChange={(event) => change(row, 'spent', event.target.value)}
                />
              </GridCell>
              <GridCell col={3} className='gridNumeric'>
                {money.format(toNumber(item.planned) - toNumber(item.spent))}
              </GridCell>
            </GridRow>
          ))}
        </GridRowGroup>
      </Grid>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-4)' }}>
        <Text size={2} style={{ color: 'var(--label-secondary)' }}>{`Left this month: ${money.format(left)}`}</Text>
        <Button size='xs' variant='secondary' appearance='ghost' onClick={() => setBudget(initialBudget)}>Reset</Button>
      </div>
    </div>
  );
}
```
<!-- /example -->

### Form/Integration: controls inside cells

The cells hold a checkbox, a select, an input, a switch, and two icon buttons, all with `tabIndex={-1}`. The arrows move between cells; Enter or F2 moves into the cell, Tab cycles through the controls of that cell, and Escape returns to the cell. The keys pressed inside a control stay with it: the arrows open the select and move the caret in the input. Tab on a cell leaves the grid for the buttons below it.

<!-- example: grid/team-access.tsx -->
```tsx
import { useState } from 'react';
import { MailIcon, Trash2Icon } from '@vega-ui/icons';
import {
  Button,
  Checkbox,
  CheckboxCheckedIcon,
  CheckboxIndicator,
  CheckboxInput,
  Grid,
  GridCell,
  GridColumnHeader,
  GridRow,
  GridRowGroup,
  GridRowHeader,
  Icon,
  IconButton,
  Select,
  SelectCombobox,
  SelectIcon,
  SelectListbox,
  SelectOption,
  SelectValue,
  Switch,
  SwitchIndicator,
  SwitchInput,
  Text,
  VisuallyHidden,
} from '@vega-ui/react';
import './examples.css';

type Role = 'owner' | 'editor' | 'viewer';

interface Member {
  name: string;
  role: Role;
  hours: string;
  notify: boolean;
}

const initialMembers: Member[] = [
  { name: 'Ada Park', role: 'owner', hours: '40', notify: true },
  { name: 'Leo Grant', role: 'editor', hours: '32', notify: true },
  { name: 'Mia Chen', role: 'editor', hours: '24', notify: false },
  { name: 'Sam Ortiz', role: 'viewer', hours: '8', notify: false },
];

const roles: { value: Role, label: string }[] = [
  { value: 'owner', label: 'Owner' },
  { value: 'editor', label: 'Editor' },
  { value: 'viewer', label: 'Viewer' },
];

const headers = ['Selected', 'Member', 'Role', 'Hours', 'Notify', 'Actions'];

export const layout = 'wide';

export default function TeamAccess() {
  const [members, setMembers] = useState(initialMembers);
  const [checked, setChecked] = useState<string[]>([]);
  const [status, setStatus] = useState('');

  const change = (name: string, patch: Partial<Member>) => {
    setMembers(members.map((member) => member.name === name ? { ...member, ...patch } : member));
  };

  const toggle = (name: string) => {
    if (checked.includes(name)) {
      setChecked(checked.filter((item) => item !== name));
      return;
    }

    setChecked([...checked, name]);
  };

  const remove = (names: string[]) => {
    setMembers(members.filter((member) => !names.includes(member.name)));
    setChecked(checked.filter((name) => !names.includes(name)));
    setStatus(`Removed ${names.join(', ')}`);
  };

  const reset = () => {
    setMembers(initialMembers);
    setChecked([]);
    setStatus('');
  };

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-8)', inlineSize: 'min(100%, 600px)' }}>
      <Grid aria-label='Team access' defaultActive='0:2' className='gridSheet gridEditable teamAccess'>
        <GridRowGroup>
          <GridRow row={-1}>
            {headers.map((header, col) => (
              <GridColumnHeader key={header} col={col} excluded>
                {col === 0 ? <VisuallyHidden>{header}</VisuallyHidden> : header}
              </GridColumnHeader>
            ))}
          </GridRow>
        </GridRowGroup>
        <GridRowGroup>
          {members.map((member, row) => (
            <GridRow key={member.name} row={row}>
              <GridCell col={0}>
                <Checkbox size='sm'>
                  <CheckboxInput
                    aria-label={`Select ${member.name}`}
                    checked={checked.includes(member.name)}
                    onChange={() => toggle(member.name)}
                  />
                  <CheckboxIndicator>
                    <CheckboxCheckedIcon />
                  </CheckboxIndicator>
                </Checkbox>
              </GridCell>
              <GridRowHeader col={1}>{member.name}</GridRowHeader>
              <GridCell col={2} className='teamAccessRole'>
                <Select size='xs' value={member.role} onChangeValue={(role) => change(member.name, { role: role as Role })}>
                  <SelectCombobox aria-label={`${member.name} role`}>
                    <SelectValue>{roles.find((role) => role.value === member.role)?.label}</SelectValue>
                    <SelectIcon />
                  </SelectCombobox>
                  <SelectListbox>
                    {roles.map((role) => (
                      <SelectOption key={role.value} value={role.value}>{role.label}</SelectOption>
                    ))}
                  </SelectListbox>
                </Select>
              </GridCell>
              <GridCell col={3}>
                <input
                  className='gridCellInput'
                  aria-label={`${member.name} hours per week`}
                  inputMode='numeric'
                  value={member.hours}
                  onChange={(event) => change(member.name, { hours: event.target.value })}
                />
              </GridCell>
              <GridCell col={4}>
                <Switch size='sm'>
                  <SwitchInput
                    aria-label={`Notify ${member.name}`}
                    checked={member.notify}
                    onChange={(event) => change(member.name, { notify: event.currentTarget.checked })}
                  />
                  <SwitchIndicator />
                </Switch>
              </GridCell>
              <GridCell col={5} className='teamAccessActions'>
                <IconButton
                  size='xs'
                  variant='secondary'
                  appearance='transparent'
                  aria-label={`Resend invite to ${member.name}`}
                  onClick={() => setStatus(`Invite sent to ${member.name}`)}
                >
                  <Icon size='xs'><MailIcon /></Icon>
                </IconButton>
                <IconButton
                  size='xs'
                  variant='secondary'
                  appearance='transparent'
                  aria-label={`Remove ${member.name}`}
                  onClick={() => remove([member.name])}
                >
                  <Icon size='xs'><Trash2Icon /></Icon>
                </IconButton>
              </GridCell>
            </GridRow>
          ))}
        </GridRowGroup>
      </Grid>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-4)' }}>
        <Text size={2} role='status' style={{ color: 'var(--label-secondary)' }}>{status}</Text>
        <div style={{ display: 'flex', gap: 'var(--spacing-2)' }}>
          <Button size='xs' variant='secondary' appearance='ghost' onClick={reset}>Reset</Button>
          <Button size='xs' disabled={checked.length === 0} onClick={() => remove(checked)}>
            Remove selected
          </Button>
        </div>
      </div>
    </div>
  );
}
```
<!-- /example -->

## Layout/Overlay

### Layout/Overlay: scrollable grid with a sticky header

168 cells in a scroll container with a sticky header row. `position: sticky` goes on the header's `GridRowGroup`, not on its `GridRow`: a sticky element stays inside its parent, so a row in a one-row group never sticks. Focus scrolls the active cell into view, and `scroll-padding-block-start` keeps it from hiding under the header. `getNextKey` makes `PageUp`/`PageDown` jump six hours instead of to the first or last row.

<!-- example: grid/scrollable-grid-with-sticky-header.tsx -->
```tsx
import {
  Grid,
  GridCell,
  GridColumnHeader,
  GridIntent,
  GridRow,
  GridRowGroup,
  GridRowHeader,
} from '@vega-ui/react';
import './examples.css';

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const hours = Array.from({ length: 24 }, (_, hour) => `${String(hour).padStart(2, '0')}:00`);

const PAGE_ROWS = 6;

const getNextKey = (intent: GridIntent, from: string, next: string | undefined) => {
  if (intent !== 'pageUp' && intent !== 'pageDown') return next;

  const [row, col] = from.split(':').map(Number);
  const step = intent === 'pageDown' ? PAGE_ROWS : -PAGE_ROWS;
  const target = Math.min(Math.max(row + step, 1), hours.length);

  return `${target}:${col}`;
};

const getAgents = (hour: number, day: number) => {
  const weekend = day >= 5;
  const businessHours = hour >= 8 && hour < 20;

  if (!businessHours) return 1;
  if (weekend) return 2;

  return 5;
};

export default function ScrollableGridWithStickyHeader() {
  return (
    <Grid
      aria-label='Support agents on shift per hour'
      defaultActive='1:1'
      getNextKey={getNextKey}
      className='gridSheet gridSheetWideFirst gridScroll'
    >
      <GridRowGroup className='gridStickyRow'>
        <GridRow row={0}>
          <GridColumnHeader col={0} excluded>Hour</GridColumnHeader>
          {days.map((day, index) => (
            <GridColumnHeader key={day} col={index + 1} excluded>{day}</GridColumnHeader>
          ))}
        </GridRow>
      </GridRowGroup>
      <GridRowGroup>
        {hours.map((hour, hourIndex) => (
          <GridRow key={hour} row={hourIndex + 1}>
            <GridRowHeader col={0} excluded>{hour}</GridRowHeader>
            {days.map((day, dayIndex) => (
              <GridCell key={day} col={dayIndex + 1}>{getAgents(hourIndex, dayIndex)}</GridCell>
            ))}
          </GridRow>
        ))}
      </GridRowGroup>
    </Grid>
  );
}
```
<!-- /example -->

### Layout/Overlay: slot grid in a popover

`PopoverContent` mounts its children only while open, so the grid starts fresh every time: `defaultActive={slot ?? 'Mon 10:00'}` puts the tab stop on the current choice. Picking a slot closes the popover, and the trigger shows the result.

<!-- example: grid/slot-grid-in-a-popover.tsx -->
```tsx
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
```
<!-- /example -->

### Layout/Overlay: paged grid with own buttons

The scroller exposes `prev()` and `next()` through `apiRef` for buttons outside the grid. Each page reads its `index` from `useIndexedSnapScrollerContext`, derives its years and unique row numbers from it, and `GridScroller` moves the focus to the first available cell of the page in view. `onScrollSnapChanging` keeps the period label in sync.

<!-- example: grid/paged-picker-with-own-buttons.tsx -->
```tsx
import { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from '@vega-ui/icons';
import {
  Grid,
  GridCell,
  GridItem,
  GridRow,
  GridRowGroup,
  GridScroller,
  Icon,
  IconButton,
  IndexedSnapScrollerContent,
  Text,
  useIndexedSnapScrollerContext,
  type IndexedSnapScrollerApiRef,
} from '@vega-ui/react';

const firstYear = 2016;
const rows = [0, 1, 2];
const cols = [0, 1, 2, 3];
const perPage = rows.length * cols.length;

const getPageStart = (page: number) => firstYear + page * perPage;

function YearPage() {
  const { index } = useIndexedSnapScrollerContext();

  return (
    <GridRowGroup>
      {rows.map((rowIndex) => {
        const row = index * rows.length + rowIndex;

        return (
          <GridRow key={row} row={row}>
            {cols.map((col) => {
              const year = getPageStart(index) + rowIndex * cols.length + col;

              return (
                <GridCell key={year} col={col} value={year} asChild>
                  <GridItem size='sm'>{year}</GridItem>
                </GridCell>
              );
            })}
          </GridRow>
        );
      })}
    </GridRowGroup>
  );
}

export default function PagedPickerWithOwnButtons() {
  const scrollerRef = useRef<IndexedSnapScrollerApiRef>(null);
  const [page, setPage] = useState(0);

  return (
    <Grid aria-label='Graduation year' selection='single' wrap='horizontal' defaultValue={2021} defaultActive={2021} style={{ width: 280 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <IconButton aria-label='Previous years' size='sm' variant='secondary' appearance='transparent' onClick={() => scrollerRef.current?.prev()}>
          <Icon><ChevronLeft /></Icon>
        </IconButton>
        <Text size={2} aria-live='polite'>{getPageStart(page)}–{getPageStart(page) + perPage - 1}</Text>
        <IconButton aria-label='Next years' size='sm' variant='secondary' appearance='transparent' onClick={() => scrollerRef.current?.next()}>
          <Icon><ChevronRight /></Icon>
        </IconButton>
      </div>
      <GridScroller apiRef={scrollerRef} defaultIndex={0} onScrollSnapChanging={(_, index) => setPage(index)}>
        <IndexedSnapScrollerContent style={{ width: '100%' }}>
          <YearPage />
        </IndexedSnapScrollerContent>
      </GridScroller>
    </Grid>
  );
}
```
<!-- /example -->

## Error

### Error: at least three training days

Multiple selection with a minimum. Submitting with fewer than three days turns the linked helper text into an error; reaching three clears it. The chosen days are submitted as repeated `day` fields.

<!-- example: grid/at-least-three-days.tsx -->
```tsx
import { FormEvent, useState } from 'react';
import {
  Button,
  Grid,
  GridCell,
  GridItem,
  GridRow,
  GridRowGroup,
  HelperText,
  Text,
} from '@vega-ui/react';

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const minimum = 3;

export default function AtLeastThreeDays() {
  const [selected, setSelected] = useState<string[]>(['Mon']);
  const [invalid, setInvalid] = useState(false);
  const [saved, setSaved] = useState('');

  const onChangeValue = (value: string[]) => {
    setSelected(value);
    if (value.length >= minimum) setInvalid(false);
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (selected.length < minimum) {
      setInvalid(true);
      return;
    }

    setSaved(new FormData(event.currentTarget).getAll('day').join(', '));
  };

  return (
    <form onSubmit={onSubmit} style={{ display: 'grid', gap: 'var(--spacing-12)', width: '100%', maxWidth: 320 }}>
      <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
        <Text id='training-days-label' fontWeight={500}>Training days</Text>
        <Grid
          aria-labelledby='training-days-label'
          aria-describedby='training-days-message'
          selection='multiple'
          wrap='horizontal'
          value={selected}
          onChangeValue={onChangeValue}
          defaultActive='Mon'
          style={{ width: '100%' }}
        >
          <GridRowGroup>
            <GridRow row={0}>
              {days.map((day, col) => (
                <GridCell key={day} col={col} value={day} asChild>
                  <GridItem size='sm'>{day}</GridItem>
                </GridCell>
              ))}
            </GridRow>
          </GridRowGroup>
        </Grid>
        {selected.map((day) => <input key={day} type='hidden' name='day' value={day} />)}
        <HelperText id='training-days-message' invalid={invalid}>
          {invalid ? `Pick at least ${minimum} days, ${minimum - selected.length} more to go.` : `Pick at least ${minimum} days a week.`}
        </HelperText>
      </div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--spacing-4)' }}>
        <Button type='submit'>Save plan</Button>
      </div>
      {saved && <Text size={2} style={{ color: 'var(--label-secondary)' }}>Saved: {saved}</Text>}
    </form>
  );
}
```
<!-- /example -->

## Disabled

### Disabled: cells skipped by the keyboard

`exclude` takes a predicate, so closed slots stay visible but the arrow keys and `Home`/`End` jump over them. The grid does not mark them for assistive technology: pass `aria-disabled` and a descriptive label yourself.

<!-- example: grid/excluded-cells.tsx -->
```tsx
import {
  Grid,
  GridCell,
  GridRow,
  GridRowGroup,
} from '@vega-ui/react';
import './examples.css';

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
const hours = ['09:00', '10:00', '11:00', '12:00'];
const closed = ['0:2', '1:2', '2:2', '3:2', '3:4'];

const isClosed = (key: string) => closed.includes(key);

export default function ExcludedCells() {
  return (
    <Grid aria-label='Clinic opening hours' defaultActive='0:0' exclude={isClosed} className='gridSheet'>
      <GridRowGroup>
        {hours.map((hour, row) => (
          <GridRow key={hour} row={row}>
            {days.map((day, col) => {
              const key = `${row}:${col}`;

              if (isClosed(key)) {
                return (
                  <GridCell key={day} col={col} aria-disabled='true' aria-label={`${day} ${hour}, closed`}>
                    Closed
                  </GridCell>
                );
              }

              return (
                <GridCell key={day} col={col} aria-label={`${day} ${hour}, open`}>
                  {hour}
                </GridCell>
              );
            })}
          </GridRow>
        ))}
      </GridRowGroup>
    </Grid>
  );
}
```
<!-- /example -->

### Disabled: booked rooms

Keys listed in `disabled` cannot be selected and get `aria-disabled`, but stay reachable with the arrow keys, so users land on them and hear why they are unavailable. To skip them, pass the same keys to `exclude` too. The label adds "booked" for screen readers.

<!-- example: grid/booked-rooms.tsx -->
```tsx
import {
  Grid,
  GridCell,
  GridRow,
  GridRowGroup,
  GridRowHeader,
} from '@vega-ui/react';
import './examples.css';

const rooms = ['Atlas', 'Borealis', 'Cosmos'];
const hours = ['09:00', '10:00', '11:00', '12:00', '13:00'];
const booked = ['Atlas 10:00', 'Atlas 11:00', 'Borealis 09:00', 'Cosmos 12:00', 'Cosmos 13:00'];

export const layout = 'wide';

export default function BookedRooms() {
  return (
    <Grid
      aria-label='Meeting rooms'
      selection='single'
      disabled={booked}
      defaultActive='Atlas 09:00'
      className='selectableGrid'
    >
      <GridRowGroup>
        {rooms.map((room, row) => (
          <GridRow key={room} row={row}>
            <GridRowHeader col={0} excluded>{room}</GridRowHeader>
            {hours.map((hour, col) => {
              const key = `${room} ${hour}`;
              const label = booked.includes(key) ? `${key}, booked` : key;

              return (
                <GridCell key={hour} col={col + 1} value={key} aria-label={label}>
                  {hour}
                </GridCell>
              );
            })}
          </GridRow>
        ))}
      </GridRowGroup>
    </Grid>
  );
}
```
<!-- /example -->

### Disabled: sold-out sizes

`disabled` takes the sold-out values. The grid excludes disabled cells from keyboard movement by default, and their labels say "sold out" for screen readers.

<!-- example: grid/blocked-cells-inside-a-dense-picker.tsx -->
```tsx
import {
  Grid,
  GridCell,
  GridItem,
  GridRow,
  GridRowGroup,
  HelperText,
} from '@vega-ui/react';

const sizes = [[36, 37, 38, 39, 40, 41], [42, 43, 44, 45, 46, 47]];
const soldOut = [37, 41, 42, 46];

export default function BlockedCellsInsideADensePicker() {
  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-3)', width: '100%', maxWidth: 300 }}>
      <Grid
        aria-label='Shoe size, EU'
        aria-describedby='shoe-size-hint'
        selection='single'
        wrap='horizontal'
        disabled={soldOut}
        defaultActive={36}
        style={{ width: '100%' }}
      >
        <GridRowGroup>
          {sizes.map((row, rowIndex) => (
            <GridRow key={rowIndex} row={rowIndex}>
              {row.map((size, col) => (
                <GridCell key={size} col={col} value={size} aria-label={soldOut.includes(size) ? `${size}, sold out` : String(size)} asChild>
                  <GridItem size='sm'>{size}</GridItem>
                </GridCell>
              ))}
            </GridRow>
          ))}
        </GridRowGroup>
      </Grid>
      <HelperText id='shoe-size-hint'>Sold-out sizes are skipped by the arrow keys.</HelperText>
    </div>
  );
}
```
<!-- /example -->

## Edge

### Edge: ragged rows across a whole year

365 cells where every month row has its own length. Rendering only the days that exist is enough: `ArrowDown` from 31 January skips February and lands on 31 March, and `End` goes to the last day of the current month.

<!-- example: grid/days-of-the-year.tsx -->
```tsx
import { useState } from 'react';
import {
  Grid,
  GridCell,
  GridRow,
  GridRowGroup,
  GridRowHeader,
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
      <div className='gridScrollX'>
        <Grid
          aria-label={`Days of ${year}`}
          active={active}
          onChangeActive={setActive}
          className='gridSheet gridDays'
        >
          <GridRowGroup>
            {months.map((month) => (
              <GridRow key={month} row={month}>
                <GridRowHeader col={0} excluded>
                  {monthName.format(Date.UTC(year, month, 1))}
                </GridRowHeader>
                {Array.from({ length: getDaysInMonth(month) }, (_, index) => (
                  <GridCell key={index} col={index + 1}>{index + 1}</GridCell>
                ))}
              </GridRow>
            ))}
          </GridRowGroup>
        </Grid>
      </div>
      <Text size={2} style={{ color: 'var(--label-secondary)' }}>{describeKey(active)}</Text>
    </div>
  );
}
```
<!-- /example -->

### Edge: wrap modes

Switch `wrap` and try the arrow keys at the edges: `horizontal` continues on the next or previous row, `vertical` continues at the top of the next column, `both` does both, and without `wrap` the edges stop movement.

<!-- example: grid/wrap-modes.tsx -->
```tsx
import { useState } from 'react';
import {
  Grid,
  GridCell,
  GridRow,
  GridRowGroup,
  SegmentedControl,
  SegmentedControlIndicator,
  SegmentedControlItem,
  SegmentedControlItemInput,
  type GridWrap,
} from '@vega-ui/react';
import './examples.css';

const modes = [
  { value: 'none', label: 'None' },
  { value: 'horizontal', label: 'Horizontal' },
  { value: 'vertical', label: 'Vertical' },
  { value: 'both', label: 'Both' },
];
const seats = [['A1', 'A2', 'A3', 'A4'], ['B1', 'B2', 'B3', 'B4'], ['C1', 'C2', 'C3', 'C4']];

const toWrap = (mode: string): GridWrap | undefined => {
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
      <Grid aria-label='Seats' defaultActive='0:3' wrap={toWrap(mode)} className='gridSheet gridCompact'>
        <GridRowGroup>
          {seats.map((row, rowIndex) => (
            <GridRow key={row[0]} row={rowIndex}>
              {row.map((seat, col) => (
                <GridCell key={seat} col={col}>{seat}</GridCell>
              ))}
            </GridRow>
          ))}
        </GridRowGroup>
      </Grid>
    </div>
  );
}
```
<!-- /example -->

### Edge: right-to-left layout

In a right-to-left context `ArrowLeft` and `ArrowRight` follow the text direction: `ArrowRight` moves toward the start of the row. The grid reads the computed `direction`, so `dir='rtl'` on any ancestor is enough.

<!-- example: grid/right-to-left.tsx -->
```tsx
import {
  Grid,
  GridCell,
  GridColumnHeader,
  GridRow,
  GridRowGroup,
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
      <Grid aria-label='סידור משמרות' defaultActive='1:0' className='gridSheet'>
        <GridRowGroup>
          <GridRow row={0}>
            {days.map((day, col) => (
              <GridColumnHeader key={day} col={col} excluded>{day}</GridColumnHeader>
            ))}
          </GridRow>
        </GridRowGroup>
        <GridRowGroup>
          {shifts.map((row, index) => (
            <GridRow key={index} row={index + 1}>
              {row.map((shift, col) => (
                <GridCell key={days[col]} col={col}>{shift}</GridCell>
              ))}
            </GridRow>
          ))}
        </GridRowGroup>
      </Grid>
    </div>
  );
}
```
<!-- /example -->

### Edge: booking window with min and max

`min` and `max` bound the selectable keys through `compare`. ISO dates compare correctly as strings, so days outside 5–24 March become disabled and unreachable without a custom comparator. The range is two keys, check-in and check-out.

<!-- example: grid/booking-window-with-min-and-max.tsx -->
```tsx
import { useState } from 'react';
import {
  Grid,
  GridCell,
  GridColumnHeader,
  GridRow,
  GridRowGroup,
  Text,
} from '@vega-ui/react';
import './examples.css';

const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const weeks = [0, 1, 2, 3];
const firstMonday = Date.UTC(2026, 2, 2);
const dayLength = 24 * 60 * 60 * 1000;

const compareDates = (a: string, b: string) => Date.parse(a) - Date.parse(b);

const toISO =(time: number) => new Date(time).toISOString().slice(0, 10);
const getDate = (week: number, day: number) => toISO(firstMonday + (week * 7 + day) * dayLength);

const describeStay = (stay: string[]) => {
  if (stay.length < 2) return 'Bookable from 5 to 24 March. Pick check-in, then check-out.';

  const [checkIn, checkOut] = [...stay].sort();
  const nights = (Date.parse(checkOut) - Date.parse(checkIn)) / dayLength;

  return `${checkIn} → ${checkOut}, ${nights} nights`;
};

export const layout = 'wide';

export default function BookingWindowWithMinAndMax() {
  const [stay, setStay] = useState<string[]>([]);

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-8)', width: 'fit-content' }}>
      <Grid
        aria-label='Stay dates, March 2026'
        selection='range'
        compare={compareDates}
        min='2026-03-05'
        max='2026-03-24'
        value={stay}
        onChangeValue={setStay}
        defaultActive='2026-03-05'
        className='selectableGrid'
      >
        <GridRowGroup>
          <GridRow row={0}>
            {weekdays.map((day, col) => <GridColumnHeader key={day} col={col} excluded>{day}</GridColumnHeader>)}
          </GridRow>
        </GridRowGroup>
        <GridRowGroup>
          {weeks.map((week) => (
            <GridRow key={week} row={week + 1}>
              {weekdays.map((day, col) => {
                const date = getDate(week, col);

                return (
                  <GridCell key={day} col={col} value={date} aria-label={date}>
                    {Number(date.slice(8))}
                  </GridCell>
                );
              })}
            </GridRow>
          ))}
        </GridRowGroup>
      </Grid>
      <Text size={2} style={{ color: 'var(--label-secondary)', contain: 'inline-size' }}>{describeStay(stay)}</Text>
    </div>
  );
}
```
<!-- /example -->

### Edge: every key of the range

By default a range is stored as its two ends. `resolveRange` receives both ends, ordered by `compare`, and returns every key of the range: here `onChangeValue` gets every working day of the sprint, and weekends never appear because they are not in the list of working days.

<!-- example: grid/custom-range-resolution.tsx -->
```tsx
import { useState } from 'react';
import {
  Grid,
  GridCell,
  GridColumnHeader,
  GridRow,
  GridRowGroup,
  Text,
} from '@vega-ui/react';
import './examples.css';

const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
const weeks = [0, 1, 2];
const firstMonday = Date.UTC(2026, 2, 2);
const dayLength = 24 * 60 * 60 * 1000;

const getDate = (week: number, day: number) => new Date(firstMonday + (week * 7 + day) * dayLength).toISOString().slice(0, 10);

const dates = weeks.flatMap((week) => weekdays.map((_, day) => getDate(week, day)));

const resolveWorkingDays = (start: string, end: string) => dates.slice(dates.indexOf(start), dates.indexOf(end) + 1);

const describeSprint = (sprint: string[]) => {
  if (sprint.length < 2) return 'Pick the first and the last day of the sprint.';

  return `${sprint.length} working days: ${sprint.join(', ')}`;
};

export default function CustomRangeResolution() {
  const [sprint, setSprint] = useState<string[]>([]);

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-8)', width: 'fit-content' }}>
      <Grid
        aria-label='Sprint working days'
        selection='range'
        value={sprint}
        onChangeValue={setSprint}
        resolveRange={resolveWorkingDays}
        defaultActive={getDate(0, 0)}
        className='selectableGrid'
      >
        <GridRowGroup>
          <GridRow row={0}>
            {weekdays.map((day, col) => <GridColumnHeader key={day} col={col} excluded>{day}</GridColumnHeader>)}
          </GridRow>
        </GridRowGroup>
        <GridRowGroup>
          {weeks.map((week) => (
            <GridRow key={week} row={week + 1}>
              {weekdays.map((day, col) => {
                const date = getDate(week, col);

                return (
                  <GridCell key={day} col={col} value={date} aria-label={date}>
                    {Number(date.slice(8))}
                  </GridCell>
                );
              })}
            </GridRow>
          ))}
        </GridRowGroup>
      </Grid>
      <Text size={2} style={{ color: 'var(--label-secondary)', contain: 'inline-size' }}>{describeSprint(sprint)}</Text>
    </div>
  );
}
```
<!-- /example -->

### Edge: pick six of 49

A selection limit built from a `disabled` predicate: once six numbers are picked, every other number is disabled. Disabled cells stay reachable with the arrow keys, so the keyboard does not get stuck between the six picked numbers.

<!-- example: grid/lottery-numbers.tsx -->
```tsx
import { useState } from 'react';
import {
  Button,
  Grid,
  GridCell,
  GridItem,
  GridRow,
  GridRowGroup,
  Text,
} from '@vega-ui/react';

const limit = 6;
const rows = Array.from({ length: 7 }, (_, row) => row);
const cols = Array.from({ length: 7 }, (_, col) => col);

const describePicked = (picked: number[]) => {
  if (picked.length === 0) return `Pick ${limit} numbers.`;

  const sorted = [...picked].sort((a, b) => a - b);

  return `${picked.length} of ${limit} picked: ${sorted.join(', ')}`;
};

export default function LotteryNumbers() {
  const [picked, setPicked] = useState<number[]>([]);

  const isLocked = (value: number) => picked.length >= limit && !picked.includes(value);

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-8)', width: '100%', maxWidth: 252 }}>
      <Grid
        aria-label={`Lottery numbers, pick ${limit}`}
        selection='multiple'
        wrap='horizontal'
        value={picked}
        onChangeValue={setPicked}
        disabled={isLocked}
        defaultActive={1}
        style={{ width: '100%' }}
      >
        <GridRowGroup>
          {rows.map((row) => (
            <GridRow key={row} row={row}>
              {cols.map((col) => {
                const value = row * cols.length + col + 1;

                return (
                  <GridCell key={value} col={col} value={value} asChild>
                    <GridItem size='xs'>{value}</GridItem>
                  </GridCell>
                );
              })}
            </GridRow>
          ))}
        </GridRowGroup>
      </Grid>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-4)' }}>
        <Text size={2} style={{ color: 'var(--label-secondary)', fontVariantNumeric: 'tabular-nums' }}>{describePicked(picked)}</Text>
        <Button size='sm' variant='secondary' appearance='ghost' disabled={picked.length === 0} onClick={() => setPicked([])}>Clear</Button>
      </div>
    </div>
  );
}
```
<!-- /example -->
