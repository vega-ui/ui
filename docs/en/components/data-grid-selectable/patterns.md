# DataGridSelectable Patterns

## Availability Matrix

When to use:
Build a schedule or capacity grid where the app owns the visual cell treatment.

Composition notes:
Keep cell keys stable and use `disabled` or `exclude` for blocked positions.

Trade-offs:
You get fine-grained control, but also own the visible selected and active states in the cell UI.

<!-- example: data-grid-selectable/parent-managed-multi-select.tsx -->
```tsx
import { useState } from 'react';
import {
  Button,
  DataGridSelectable,
  DataGridSelectableCell,
  DataGridSelectableRow,
  DataGridSelectableRowGroup,
  Text,
} from '@vega-ui/react';
import './examples.css';

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
const parts = ['Morning', 'Afternoon', 'Evening'];

export const layout = 'wide';

export default function ParentManagedMultiSelect() {
  const [selected, setSelected] = useState<string[]>(['Tue Morning', 'Thu Afternoon']);

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-8)', width: 'fit-content' }}>
      <DataGridSelectable
        aria-label='Interview availability'
        aria-multiselectable='true'
        selection='multiple'
        selected={selected}
        onSelectCell={setSelected}
        defaultActive='Mon Morning'
        className='selectableGrid'
      >
        <DataGridSelectableRowGroup>
          <DataGridSelectableRow row={0}>
            <div role='columnheader'>Time</div>
            {days.map((day) => <div key={day} role='columnheader'>{day}</div>)}
          </DataGridSelectableRow>
        </DataGridSelectableRowGroup>
        <DataGridSelectableRowGroup>
          {parts.map((part, row) => (
            <DataGridSelectableRow key={part} row={row + 1}>
              <div role='rowheader'>{part}</div>
              {days.map((day, col) => (
                <DataGridSelectableCell key={day} col={col} cellKey={`${day} ${part}`} aria-label={`${day} ${part}`} />
              ))}
            </DataGridSelectableRow>
          ))}
        </DataGridSelectableRowGroup>
      </DataGridSelectable>
      <Text size={2} style={{ color: 'var(--label-secondary)', contain: 'inline-size' }}>
        {selected.length === 0 ? 'No slots picked yet' : `${selected.length} slots: ${selected.join(', ')}`}
      </Text>
      <Button size='sm' variant='secondary' appearance='ghost' disabled={selected.length === 0} style={{ justifySelf: 'start' }} onClick={() => setSelected([])}>
        Clear
      </Button>
    </div>
  );
}
```
<!-- /example -->

## Custom Range Grid

When to use:
Range selection should follow domain-specific ordering instead of simple matrix order.

Composition notes:
Provide `compare` and `resolveRange` so expansion matches the product model. In the example a maintenance window runs down a day's column before moving to the next day: `compare` orders keys by day, then by hour, and `resolveRange` lists every block in that order.

Trade-offs:
The behavior becomes powerful, but debugging range edges is more involved.

<!-- example: data-grid-selectable/custom-range-grid.tsx -->
```tsx
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
```
<!-- /example -->
