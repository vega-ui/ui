import { useState } from 'react';
import {
  Grid,
  GridCell,
  GridColumnHeader,
  GridRow,
  GridRowGroup,
  GridRowHeader,
  Text,
} from '@vega-ui/react';
import './examples.css';

const days = ['Mon', 'Tue', 'Wed'];
const hours = ['09:00', '11:00', '13:00', '15:00', '17:00'];
const slots = days.flatMap((day) => hours.map((hour) => `${day} ${hour}`));

const compareSlots = (a: string, b: string) => slots.indexOf(a) - slots.indexOf(b);

const resolveSlots = (start: string, end: string) => slots.slice(slots.indexOf(start), slots.indexOf(end) + 1);

const describeWindow = (blocks: string[]) => {
  if (blocks.length < 2) return 'Pick where the window starts and ends.';

  return `${blocks.length} two-hour blocks, ${blocks[0]} → ${blocks[blocks.length - 1]}`;
};

export default function CustomRangeGrid() {
  const [maintenance, setMaintenance] = useState<string[]>([]);

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-8)', width: 'fit-content' }}>
      <Grid
        aria-label='Maintenance window'
        selection='range'
        value={maintenance}
        onChangeValue={setMaintenance}
        compare={compareSlots}
        resolveRange={resolveSlots}
        defaultActive='Mon 09:00'
        className='selectableGrid'
      >
        <GridRowGroup>
          <GridRow row={0}>
            <GridColumnHeader col={0} excluded>Time</GridColumnHeader>
            {days.map((day, col) => <GridColumnHeader key={day} col={col + 1} excluded>{day}</GridColumnHeader>)}
          </GridRow>
        </GridRowGroup>
        <GridRowGroup>
          {hours.map((hour, row) => (
            <GridRow key={hour} row={row + 1}>
              <GridRowHeader col={0} excluded>{hour}</GridRowHeader>
              {days.map((day, col) => (
                <GridCell key={day} col={col + 1} value={`${day} ${hour}`} aria-label={`${day} ${hour}`} />
              ))}
            </GridRow>
          ))}
        </GridRowGroup>
      </Grid>
      <Text size={2} style={{ color: 'var(--label-secondary)', contain: 'inline-size' }}>{describeWindow(maintenance)}</Text>
    </div>
  );
}
