import { useState } from 'react';
import {
  DataGridSelectable,
  DataGridSelectableCell,
  DataGridSelectableRow,
  DataGridSelectableRowGroup,
  Text,
} from '@vega-ui/react';
import './examples.css';

const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const weeks = [0, 1, 2, 3];
const firstMonday = Date.UTC(2026, 2, 2);
const dayLength = 24 * 60 * 60 * 1000;

const toISO = (time: number) => new Date(time).toISOString().slice(0, 10);
const getDate = (week: number, day: number) => toISO(firstMonday + (week * 7 + day) * dayLength);

const describeStay = (stay: string[]) => {
  if (stay.length < 2) return 'Bookable from 5 to 24 March. Pick check-in, then check-out.';

  const [checkIn, checkOut] = [...stay].sort();
  const nights = (Date.parse(checkOut) - Date.parse(checkIn)) / dayLength;

  return `${checkIn} → ${checkOut}, ${nights} nights`;
};

export const layout = 'wide';

export default function BookingWindowWithFromAndTo() {
  const [stay, setStay] = useState<string[]>([]);

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-8)', width: 'fit-content' }}>
      <DataGridSelectable
        aria-label='Stay dates, March 2026'
        selection='range'
        from='2026-03-05'
        to='2026-03-24'
        selected={stay}
        onSelectCell={setStay}
        defaultActive='2026-03-05'
        className='selectableGrid'
      >
        <DataGridSelectableRowGroup>
          <DataGridSelectableRow row={0}>
            {weekdays.map((day) => <div key={day} role='columnheader'>{day}</div>)}
          </DataGridSelectableRow>
        </DataGridSelectableRowGroup>
        <DataGridSelectableRowGroup>
          {weeks.map((week) => (
            <DataGridSelectableRow key={week} row={week + 1}>
              {weekdays.map((day, col) => {
                const date = getDate(week, col);

                return (
                  <DataGridSelectableCell key={day} col={col} cellKey={date} aria-label={date}>
                    {Number(date.slice(8))}
                  </DataGridSelectableCell>
                );
              })}
            </DataGridSelectableRow>
          ))}
        </DataGridSelectableRowGroup>
      </DataGridSelectable>
      <Text size={2} style={{ color: 'var(--label-secondary)', contain: 'inline-size' }}>{describeStay(stay)}</Text>
    </div>
  );
}
