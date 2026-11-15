import { useState } from 'react';
import {
  Grid,
  GridCell,
  GridRow,
  GridRowGroup,
  GridRowHeader,
  Text,
} from '@vega-ui/react';
import './examples.css';

const year = 2026;
const months = Array.from({ length: 12 }, (_, month) => month);

const monthName = new Intl.DateTimeFormat('en-US', { month: 'short', timeZone: 'UTC' });
const fullDate = new Intl.DateTimeFormat('en-US', { dateStyle: 'full', timeZone: 'UTC' });

const getDaysInMonth = (month: number) => new Date(Date.UTC(year, month + 1, 0)).getUTCDate();

const describeKey = (key: string) => {
  const [month, day] = key.split(':').map(Number);
  if (day === 0) return `${monthName.format(Date.UTC(year, month, 1))} ${year}`;

  return fullDate.format(Date.UTC(year, month, day));
};

export default function DaysOfTheYear() {
  const [active, setActive] = useState('0:1');

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-6)', width: '100%' }}>
      <div className='gridScrollX'>
        <Grid
          aria-label={`Days of ${year}`}
          active={active}
          onChangeActive={setActive}
          className='gridSheet gridDays'
        >
          <GridRowGroup>
            {months.map((month) => (
              <GridRow key={month} row={month}>
                <GridRowHeader col={0} excluded>
                  {monthName.format(Date.UTC(year, month, 1))}
                </GridRowHeader>
                {Array.from({ length: getDaysInMonth(month) }, (_, index) => (
                  <GridCell key={index} col={index + 1}>{index + 1}</GridCell>
                ))}
              </GridRow>
            ))}
          </GridRowGroup>
        </Grid>
      </div>
      <Text size={2} style={{ color: 'var(--label-secondary)' }}>{describeKey(active)}</Text>
    </div>
  );
}
