import { useState } from 'react';
import {
  DataGridSelectable,
  DataGridSelectableCell,
  DataGridSelectableRow,
  DataGridSelectableRowGroup,
  Text,
  type DataGridResolveValue,
} from '@vega-ui/react';
import './examples.css';

const days = ['Mon', 'Tue', 'Wed'];
const hours = ['09:00', '11:00', '13:00', '15:00', '17:00'];
const slots = days.flatMap((day) => hours.map((hour) => `${day} ${hour}`));

const compareSlots = (a: string, b: string): -1 | 0 | 1 => {
  const difference = slots.indexOf(a) - slots.indexOf(b);

  if (difference < 0) return -1;
  if (difference > 0) return 1;

  return 0;
};

const resolveSlots = (start: DataGridResolveValue<string>, end: DataGridResolveValue<string>) => {
  const from = slots.indexOf(start.key);
  const to = slots.indexOf(end.key);

  return slots.slice(Math.min(from, to), Math.max(from, to) + 1);
};

const describeWindow = (blocks: string[]) => {
  if (blocks.length < 2) return 'Pick where the window starts and ends.';

  return `${blocks.length} two-hour blocks, ${blocks[0]} → ${blocks[blocks.length - 1]}`;
};

export default function CustomRangeGrid() {
  const [maintenance, setMaintenance] = useState<string[]>([]);

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-8)', width: 'fit-content' }}>
      <DataGridSelectable
        aria-label='Maintenance window'
        selection='range'
        selected={maintenance}
        onSelectCell={setMaintenance}
        compare={compareSlots}
        resolveRange={resolveSlots}
        defaultActive='Mon 09:00'
        className='selectableGrid'
      >
        <DataGridSelectableRowGroup>
          <DataGridSelectableRow row={0}>
            <div role='columnheader'>Time</div>
            {days.map((day) => <div key={day} role='columnheader'>{day}</div>)}
          </DataGridSelectableRow>
        </DataGridSelectableRowGroup>
        <DataGridSelectableRowGroup>
          {hours.map((hour, row) => (
            <DataGridSelectableRow key={hour} row={row + 1}>
              <div role='rowheader'>{hour}</div>
              {days.map((day, col) => (
                <DataGridSelectableCell key={day} col={col} cellKey={`${day} ${hour}`} aria-label={`${day} ${hour}`} />
              ))}
            </DataGridSelectableRow>
          ))}
        </DataGridSelectableRowGroup>
      </DataGridSelectable>
      <Text size={2} style={{ color: 'var(--label-secondary)', contain: 'inline-size' }}>{describeWindow(maintenance)}</Text>
    </div>
  );
}
