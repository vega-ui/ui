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

const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const weeks = [0, 1, 2, 3];
const firstMonday = Date.UTC(2026, 2, 2);
const dayLength = 24 * 60 * 60 * 1000;

const compareDates = (a: string, b: string) => Date.parse(a) - Date.parse(b);

const toISO =(time: number) => new Date(time).toISOString().slice(0, 10);
const getDate = (week: number, day: number) => toISO(firstMonday + (week * 7 + day) * dayLength);

const describeStay = (stay: string[]) => {
  if (stay.length < 2) return 'Bookable from 5 to 24 March. Pick check-in, then check-out.';

  const [checkIn, checkOut] = [...stay].sort();
  const nights = (Date.parse(checkOut) - Date.parse(checkIn)) / dayLength;

  return `${checkIn} → ${checkOut}, ${nights} nights`;
};

export const layout = 'wide';

export default function BookingWindowWithMinAndMax() {
  const [stay, setStay] = useState<string[]>([]);

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-8)', width: 'fit-content' }}>
      <Grid
        aria-label='Stay dates, March 2026'
        selection='range'
        compare={compareDates}
        min='2026-03-05'
        max='2026-03-24'
        value={stay}
        onChangeValue={setStay}
        defaultActive='2026-03-05'
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
      <Text size={2} style={{ color: 'var(--label-secondary)', contain: 'inline-size' }}>{describeStay(stay)}</Text>
    </div>
  );
}
