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
