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
