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
