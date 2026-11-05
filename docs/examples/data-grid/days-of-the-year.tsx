import { useState } from 'react';
import {
  DataGrid,
  DataGridCell,
  DataGridRow,
  DataGridRowGroup,
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
      <div className='dataGridScrollX'>
        <DataGrid<string>
          aria-label={`Days of ${year}`}
          active={active}
          onChangeActive={setActive}
          className='dataGridSheet dataGridDays'
        >
          <DataGridRowGroup>
            {months.map((month) => (
              <DataGridRow key={month} row={month}>
                <DataGridCell col={0} role='rowheader'>
                  {monthName.format(Date.UTC(year, month, 1))}
                </DataGridCell>
                {Array.from({ length: getDaysInMonth(month) }, (_, index) => (
                  <DataGridCell key={index} col={index + 1}>{index + 1}</DataGridCell>
                ))}
              </DataGridRow>
            ))}
          </DataGridRowGroup>
        </DataGrid>
      </div>
      <Text size={2} style={{ color: 'var(--label-secondary)' }}>{describeKey(active)}</Text>
    </div>
  );
}
