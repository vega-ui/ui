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
