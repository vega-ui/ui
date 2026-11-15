import {
  Grid,
  GridCell,
  GridRow,
  GridRowGroup,
} from '@vega-ui/react';
import './examples.css';

const rows = ['A', 'B', 'C'];
const seats = [1, 2, 3, 4, 5, 6];
const taken = ['A3', 'A4', 'B1', 'C6'];

export default function CustomCellShellOnTopOfSelectableBehavior() {
  return (
    <Grid
      aria-label='Seats'
      selection='multiple'
      disabled={taken}
      defaultValue={['B3', 'B4']}
      defaultActive='B3'
      className='selectableGrid seatMap'
    >
      <GridRowGroup>
        {rows.map((row, rowIndex) => (
          <GridRow key={row} row={rowIndex}>
            {seats.map((seat, col) => (
              <GridCell key={seat} col={col} value={`${row}${seat}`}>
                {`${row}${seat}`}
              </GridCell>
            ))}
          </GridRow>
        ))}
      </GridRowGroup>
    </Grid>
  );
}
