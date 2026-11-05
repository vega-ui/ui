# DataGridSelectable: паттерны

## Матрица доступности

Когда использовать:
Сетка расписания или загрузки, в которой визуальное оформление ячеек принадлежит приложению.

Заметки о композиции:
Держите ключи ячеек стабильными и используйте `disabled` или `exclude` для заблокированных позиций.

Компромиссы:
Вы получаете тонкий контроль, но сами отвечаете за видимые выбранное и активное состояния в интерфейсе ячеек.

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

## Сетка с собственным диапазоном

Когда использовать:
Выбор диапазона должен следовать порядку предметной области, а не простому порядку матрицы.

Заметки о композиции:
Передайте `compare` и `resolveRange`, чтобы расширение соответствовало модели продукта. В примере окно обслуживания идёт вниз по столбцу дня и только потом переходит к следующему дню: `compare` упорядочивает ключи сначала по дню, затем по часу, а `resolveRange` перечисляет все блоки в этом порядке.

Компромиссы:
Поведение становится мощным, но отлаживать границы диапазона сложнее.

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
