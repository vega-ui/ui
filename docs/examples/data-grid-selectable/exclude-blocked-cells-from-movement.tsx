import {
  DataGridSelectable,
  DataGridSelectableCell,
  DataGridSelectableRow,
  DataGridSelectableRowGroup,
} from '@vega-ui/react';
import './examples.css';

const rooms = ['Atlas', 'Borealis', 'Cosmos'];
const hours = ['09:00', '10:00', '11:00', '12:00', '13:00'];
const booked = ['Atlas 10:00', 'Atlas 11:00', 'Borealis 09:00', 'Cosmos 12:00', 'Cosmos 13:00'];

export const layout = 'wide';

export default function ExcludeBlockedCellsFromMovement() {
  return (
    <DataGridSelectable
      aria-label='Meeting rooms'
      disabled={booked}
      defaultActive='Atlas 09:00'
      className='selectableGrid'
    >
      <DataGridSelectableRowGroup>
        {rooms.map((room, row) => (
          <DataGridSelectableRow key={room} row={row}>
            <div role='rowheader'>{room}</div>
            {hours.map((hour, col) => {
              const key = `${room} ${hour}`;
              const label = booked.includes(key) ? `${key}, booked` : key;

              return (
                <DataGridSelectableCell key={hour} col={col} cellKey={key} aria-label={label}>
                  {hour}
                </DataGridSelectableCell>
              );
            })}
          </DataGridSelectableRow>
        ))}
      </DataGridSelectableRowGroup>
    </DataGridSelectable>
  );
}
