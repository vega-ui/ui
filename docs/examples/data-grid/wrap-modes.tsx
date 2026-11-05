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
