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
