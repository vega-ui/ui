import { useState } from 'react';
import {
  Grid,
  GridCell,
  GridColumnHeader,
  GridRow,
  GridRowGroup,
  Text,
} from '@vega-ui/react';
import './examples.css';

const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
const weeks = [0, 1, 2];
const firstMonday = Date.UTC(2026, 2, 2);
const dayLength = 24 * 60 * 60 * 1000;

const getDate = (week: number, day: number) => new Date(firstMonday + (week * 7 + day) * dayLength).toISOString().slice(0, 10);

const dates = weeks.flatMap((week) => weekdays.map((_, day) => getDate(week, day)));

const resolveWorkingDays = (start: string, end: string) => dates.slice(dates.indexOf(start), dates.indexOf(end) + 1);

const describeSprint = (sprint: string[]) => {
  if (sprint.length < 2) return 'Pick the first and the last day of the sprint.';

  return `${sprint.length} working days: ${sprint.join(', ')}`;
};

export default function CustomRangeResolution() {
  const [sprint, setSprint] = useState<string[]>([]);

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-8)', width: 'fit-content' }}>
      <Grid
        aria-label='Sprint working days'
        selection='range'
        value={sprint}
        onChangeValue={setSprint}
        resolveRange={resolveWorkingDays}
        defaultActive={getDate(0, 0)}
        className='selectableGrid'
      >
        <GridRowGroup>
          <GridRow row={0}>
            {weekdays.map((day, col) => <GridColumnHeader key={day} col={col} excluded>{day}</GridColumnHeader>)}
          </GridRow>
        </GridRowGroup>
        <GridRowGroup>
          {weeks.map((week) => (
            <GridRow key={week} row={week + 1}>
              {weekdays.map((day, col) => {
                const date = getDate(week, col);

                return (
                  <GridCell key={day} col={col} value={date} aria-label={date}>
                    {Number(date.slice(8))}
                  </GridCell>
                );
              })}
            </GridRow>
          ))}
        </GridRowGroup>
      </Grid>
      <Text size={2} style={{ color: 'var(--label-secondary)', contain: 'inline-size' }}>{describeSprint(sprint)}</Text>
    </div>
  );
}
