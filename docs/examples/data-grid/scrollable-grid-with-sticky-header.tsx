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
