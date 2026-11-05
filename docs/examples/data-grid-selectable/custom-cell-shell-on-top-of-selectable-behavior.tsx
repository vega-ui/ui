import {
  DataGridSelectable,
  DataGridSelectableCell,
  DataGridSelectableRow,
  DataGridSelectableRowGroup,
} from '@vega-ui/react';
import './examples.css';

const rows = ['A', 'B', 'C'];
const seats = [1, 2, 3, 4, 5, 6];
const taken = ['A3', 'A4', 'B1', 'C6'];

export default function CustomCellShellOnTopOfSelectableBehavior() {
  return (
    <DataGridSelectable
      aria-label='Seats'
      aria-multiselectable='true'
      selection='multiple'
      disabled={taken}
      defaultSelected={['B3', 'B4']}
      defaultActive='B3'
      className='selectableGrid seatMap'
    >
      <DataGridSelectableRowGroup>
        {rows.map((row, rowIndex) => (
          <DataGridSelectableRow key={row} row={rowIndex}>
            {seats.map((seat, col) => (
              <DataGridSelectableCell key={seat} col={col} cellKey={`${row}${seat}`}>
                {`${row}${seat}`}
              </DataGridSelectableCell>
            ))}
          </DataGridSelectableRow>
        ))}
      </DataGridSelectableRowGroup>
    </DataGridSelectable>
  );
}
