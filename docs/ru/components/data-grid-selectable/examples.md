# DataGridSelectable: примеры

## Базовый

### Базовый: отчётный квартал

Одиночный выбор с осмысленными ключами: каждая ячейка получает `cellKey` вроде `FY2025-Q3`, и именно с ним работают `defaultSelected`, `defaultActive` и `onSelectCell`. У `DataGridSelectable` нет собственного оформления, поэтому вид выбранной ячейки задаёт `[aria-selected='true']` в таблице стилей примеров.

<!-- example: data-grid-selectable/quarter-selector-grid.tsx -->
```tsx
import {
  DataGridSelectable,
  DataGridSelectableCell,
  DataGridSelectableRow,
  DataGridSelectableRowGroup,
} from '@vega-ui/react';
import './examples.css';

const years = [2024, 2025, 2026];
const quarters = ['Q1', 'Q2', 'Q3', 'Q4'];

export default function QuarterSelectorGrid() {
  return (
    <DataGridSelectable
      aria-label='Reporting quarter'
      defaultSelected='FY2025-Q3'
      defaultActive='FY2025-Q3'
      className='selectableGrid'
    >
      <DataGridSelectableRowGroup>
        {years.map((year, row) => (
          <DataGridSelectableRow key={year} row={row}>
            <div role='rowheader'>FY{year}</div>
            {quarters.map((quarter, col) => (
              <DataGridSelectableCell
                key={quarter}
                col={col}
                cellKey={`FY${year}-${quarter}`}
                aria-label={`${quarter} FY${year}`}
              >
                {quarter}
              </DataGridSelectableCell>
            ))}
          </DataGridSelectableRow>
        ))}
      </DataGridSelectableRowGroup>
    </DataGridSelectable>
  );
}
```
<!-- /example -->

## Контролируемый/с состоянием

### Контролируемый/с состоянием: доступность для собеседований

`selection='multiple'`, а выбранными ключами владеет родитель: сводка и кнопка «Clear» читают и сбрасывают один и тот же массив. `aria-multiselectable` сетка сама не ставит, поэтому он передан явно, а пустые ячейки получают доступное имя из `aria-label`.

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

## Форма/интеграция

### Форма/интеграция: окно доставки в форме

Сетка не является элементом формы, поэтому выбранный ключ уходит в скрытом поле и читается через `FormData` при отправке. Отправка без выбора показывает ошибку, связанную с сеткой через `aria-describedby`; выбор слота её снимает, а кнопка сброса очищает состояние через `onReset`. Занятые окна задаются через `disabled`.

<!-- example: data-grid-selectable/delivery-slot-form.tsx -->
```tsx
import { FormEvent, useState } from 'react';
import {
  Button,
  DataGridSelectable,
  DataGridSelectableCell,
  DataGridSelectableRow,
  DataGridSelectableRowGroup,
  HelperText,
  Text,
} from '@vega-ui/react';
import './examples.css';

const days = [
  { date: '2026-03-10', label: 'Tue 10' },
  { date: '2026-03-11', label: 'Wed 11' },
  { date: '2026-03-12', label: 'Thu 12' },
];
const windows = ['08:00', '12:00', '16:00'];
const full = ['2026-03-10T08:00', '2026-03-11T12:00'];

export default function DeliverySlotForm() {
  const [slot, setSlot] = useState<string | null>(null);
  const [missing, setMissing] = useState(false);
  const [submitted, setSubmitted] = useState('');

  const onSelectCell = (key: string) => {
    setSlot(key);
    setMissing(false);
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const value = String(new FormData(event.currentTarget).get('slot'));
    if (!value) {
      setMissing(true);
      return;
    }

    setSubmitted(value);
  };

  const onReset = () => {
    setSlot(null);
    setMissing(false);
    setSubmitted('');
  };

  return (
    <form onSubmit={onSubmit} onReset={onReset} style={{ display: 'grid', gap: 'var(--spacing-12)', width: 'fit-content' }}>
      <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
        <Text id='delivery-slot-label' fontWeight={500}>Delivery window</Text>
        <DataGridSelectable
          aria-labelledby='delivery-slot-label'
          aria-describedby={missing ? 'delivery-slot-error' : undefined}
          selected={slot}
          onSelectCell={onSelectCell}
          disabled={full}
          defaultActive='2026-03-10T12:00'
          className='selectableGrid'
        >
          <DataGridSelectableRowGroup>
            {days.map((day, row) => (
              <DataGridSelectableRow key={day.date} row={row}>
                <div role='rowheader'>{day.label}</div>
                {windows.map((time, col) => (
                  <DataGridSelectableCell key={time} col={col} cellKey={`${day.date}T${time}`}>
                    {time}
                  </DataGridSelectableCell>
                ))}
              </DataGridSelectableRow>
            ))}
          </DataGridSelectableRowGroup>
        </DataGridSelectable>
        <input type='hidden' name='slot' value={slot ?? ''} />
        {missing && <HelperText id='delivery-slot-error' error style={{ contain: 'inline-size' }}>Choose a delivery window to continue.</HelperText>}
      </div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--spacing-4)' }}>
        <Button type='reset' variant='secondary' appearance='ghost'>Reset</Button>
        <Button type='submit'>Book delivery</Button>
      </div>
      {submitted && <Text size={2} style={{ color: 'var(--label-secondary)', contain: 'inline-size' }}>Submitted slot={submitted}</Text>}
    </form>
  );
}
```
<!-- /example -->

## Раскладка/оверлей

### Раскладка/оверлей: сетка слотов в поповере

`PopoverContent` монтирует содержимое только в открытом состоянии, поэтому сетка каждый раз создаётся заново: `defaultActive={slot ?? 'Mon 10:00'}` ставит позицию табуляции на текущий выбор. Выбор слота закрывает поповер, а триггер показывает результат.

<!-- example: data-grid-selectable/slot-grid-in-a-popover.tsx -->
```tsx
import { useState } from 'react';
import {
  Button,
  DataGridSelectable,
  DataGridSelectableCell,
  DataGridSelectableRow,
  DataGridSelectableRowGroup,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@vega-ui/react';
import './examples.css';

const days = ['Mon', 'Tue', 'Wed'];
const times = ['10:00', '13:00', '16:00'];

export default function SlotGridInAPopover() {
  const [open, setOpen] = useState(false);
  const [slot, setSlot] = useState<string | null>(null);

  const onSelectCell = (key: string) => {
    setSlot(key);
    setOpen(false);
  };

  return (
    <Popover open={open} onChangeOpen={setOpen} placement='bottom-start'>
      <PopoverTrigger asChild>
        <Button variant='secondary' appearance='ghost'>{slot ? `Call: ${slot}` : 'Pick a call slot'}</Button>
      </PopoverTrigger>
      <PopoverContent style={{ padding: 'var(--spacing-8)' }}>
        <DataGridSelectable
          aria-label='Call slots'
          selected={slot}
          onSelectCell={onSelectCell}
          defaultActive={slot ?? 'Mon 10:00'}
          className='selectableGrid'
        >
          <DataGridSelectableRowGroup>
            {days.map((day, row) => (
              <DataGridSelectableRow key={day} row={row}>
                <div role='rowheader'>{day}</div>
                {times.map((time, col) => (
                  <DataGridSelectableCell key={time} col={col} cellKey={`${day} ${time}`} aria-label={`${day} ${time}`}>
                    {time}
                  </DataGridSelectableCell>
                ))}
              </DataGridSelectableRow>
            ))}
          </DataGridSelectableRowGroup>
        </DataGridSelectable>
      </PopoverContent>
    </Popover>
  );
}
```
<!-- /example -->

## Отключённый

### Отключённый: занятые переговорные

Ключи из `disabled` нельзя выбрать, и они получают `aria-disabled`; при `excludeDisabled` по умолчанию стрелки их ещё и пропускают. Передайте `excludeDisabled={false}`, если пользователь должен попадать на такие ячейки и слышать, почему они недоступны. Подпись добавляет «booked» для скринридера.

<!-- example: data-grid-selectable/exclude-blocked-cells-from-movement.tsx -->
```tsx
import {
  DataGridSelectable,
  DataGridSelectableCell,
  DataGridSelectableRow,
  DataGridSelectableRowGroup,
} from '@vega-ui/react';
import './examples.css';

const rooms = ['Atlas', 'Borealis', 'Cosmos'];
const hours = ['09:00', '10:00', '11:00', '12:00', '13:00'];
const booked = ['Atlas 10:00', 'Atlas 11:00', 'Borealis 09:00', 'Cosmos 12:00', 'Cosmos 13:00'];

export const layout = 'wide';

export default function ExcludeBlockedCellsFromMovement() {
  return (
    <DataGridSelectable
      aria-label='Meeting rooms'
      disabled={booked}
      defaultActive='Atlas 09:00'
      className='selectableGrid'
    >
      <DataGridSelectableRowGroup>
        {rooms.map((room, row) => (
          <DataGridSelectableRow key={room} row={row}>
            <div role='rowheader'>{room}</div>
            {hours.map((hour, col) => {
              const key = `${room} ${hour}`;
              const label = booked.includes(key) ? `${key}, booked` : key;

              return (
                <DataGridSelectableCell key={hour} col={col} cellKey={key} aria-label={label}>
                  {hour}
                </DataGridSelectableCell>
              );
            })}
          </DataGridSelectableRow>
        ))}
      </DataGridSelectableRowGroup>
    </DataGridSelectable>
  );
}
```
<!-- /example -->

## Пограничный случай

### Пограничный случай: окно бронирования через from и to

`from` и `to` ограничивают выбираемые ключи через `compare`. Даты ISO корректно сравниваются как строки, поэтому дни вне 5–24 марта становятся отключёнными и недостижимыми без собственного компаратора. Диапазон — это два ключа: заезд и выезд.

<!-- example: data-grid-selectable/booking-window-with-from-and-to.tsx -->
```tsx
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
```
<!-- /example -->

### Пограничный случай: все ключи диапазона

По умолчанию диапазон хранится как два конца. `resolveRange` получает оба конца с координатами в сетке и саму сетку, поэтому может пройти по ячейкам между ними: здесь `onSelectCell` получает каждый рабочий день спринта, а выходных нет, потому что их нет в сетке.

<!-- example: data-grid-selectable/custom-range-resolution.tsx -->
```tsx
import { useState } from 'react';
import {
  DataGridSelectable,
  DataGridSelectableCell,
  DataGridSelectableRow,
  DataGridSelectableRowGroup,
  Text,
  type DataGridApiRef,
  type DataGridResolveValue,
} from '@vega-ui/react';
import './examples.css';

const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
const weeks = [0, 1, 2];
const firstMonday = Date.UTC(2026, 2, 2);
const dayLength = 24 * 60 * 60 * 1000;

const getDate = (week: number, day: number) => new Date(firstMonday + (week * 7 + day) * dayLength).toISOString().slice(0, 10);

const resolveWorkingDays = (start: DataGridResolveValue<string>, end: DataGridResolveValue<string>, grid: DataGridApiRef<string>['grid']) => {
  const days = [start.key];
  let node = grid.getNode(start.index);

  while (node && node.key !== end.key) {
    node = grid.after(node.index, 0, true);
    if (node?.key === undefined) break;

    days.push(node.key);
  }

  return days;
};

const describeSprint = (sprint: string[]) => {
  if (sprint.length < 2) return 'Pick the first and the last day of the sprint.';

  return `${sprint.length} working days: ${sprint.join(', ')}`;
};

export default function CustomRangeResolution() {
  const [sprint, setSprint] = useState<string[]>([]);

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-8)', width: 'fit-content' }}>
      <DataGridSelectable
        aria-label='Sprint working days'
        selection='range'
        selected={sprint}
        onSelectCell={setSprint}
        resolveRange={resolveWorkingDays}
        defaultActive={getDate(0, 0)}
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
      <Text size={2} style={{ color: 'var(--label-secondary)', contain: 'inline-size' }}>{describeSprint(sprint)}</Text>
    </div>
  );
}
```
<!-- /example -->
