# Grid: паттерны

## Навигация в духе электронной таблицы

Когда использовать:

пользователи перемещаются по плотной матрице с клавиатуры.

Заметки по композиции:

Задавайте координаты строк и ячеек явно и выбирайте поведение переноса осознанно.

Компромиссы:

Мощное управление с клавиатуры, но интеграция сложнее, чем у статичной таблицы.

<!-- example: grid/team-schedule.tsx -->
```tsx
import {
  Grid,
  GridCell,
  GridColumnHeader,
  GridRow,
  GridRowGroup,
  GridRowHeader,
} from '@vega-ui/react';
import './examples.css';

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];

const rota = [
  { name: 'Maya Chen', shifts: ['Day', 'Day', 'Off', 'Night', 'Night'] },
  { name: 'Jonas Weber', shifts: ['Night', 'Off', 'Day', 'Day', 'Off'] },
  { name: 'Priya Nair', shifts: ['Off', 'Night', 'Night', 'Off', 'Day'] },
  { name: 'Tom Okafor', shifts: ['Day', 'Day', 'Day', 'Off', 'Off'] },
];

export default function TeamSchedule() {
  return (
    <Grid aria-label='On-call rota, week 12' defaultActive='1:1' className='gridSheet gridSheetWideFirst'>
      <GridRowGroup>
        <GridRow row={0}>
          <GridColumnHeader col={0} excluded>Engineer</GridColumnHeader>
          {days.map((day, index) => (
            <GridColumnHeader key={day} col={index + 1} excluded>{day}</GridColumnHeader>
          ))}
        </GridRow>
      </GridRowGroup>
      <GridRowGroup>
        {rota.map((person, rowIndex) => (
          <GridRow key={person.name} row={rowIndex + 1}>
            <GridRowHeader col={0} excluded>{person.name}</GridRowHeader>
            {person.shifts.map((shift, index) => (
              <GridCell key={days[index]} col={index + 1}>{shift}</GridCell>
            ))}
          </GridRow>
        ))}
      </GridRowGroup>
    </Grid>
  );
}
```
<!-- /example -->

## Разреженная сетка планировщика

Когда использовать:

в визуальной раскладке есть намеренные пробелы.

Заметки по композиции:

Отрисовывайте только существующие ячейки: отсутствующие столбцы вертикальное движение пропускает само. `exclude` оставьте для ячеек, которые видны, но не должны получать фокус.

Компромиссы:

Навигация следует реальным данным без лишнего учёта, но во всех строках одинаковый индекс столбца должен означать одно и то же.

<!-- example: grid/days-of-the-year.tsx -->
```tsx
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
```
<!-- /example -->

## Контролируемая активная ячейка

Когда использовать:

родительскому сценарию нужно синхронизировать позицию в сетке с другими частями интерфейса.

Заметки по композиции:

Храните состояние `active` в родителе. Изменение `active` переносит только позицию табуляции; когда внешний контрол должен перенести и фокус, сфокусируйте ячейку через `apiRef`.

Компромиссы:

Больше контроля, но и больше работы по согласованию состояния.

<!-- example: grid/controlled-active-cell.tsx -->
```tsx
import { useRef, useState } from 'react';
import {
  Button,
  Grid,
  GridCell,
  GridRow,
  GridRowGroup,
  Text,
  type GridApiRef,
} from '@vega-ui/react';
import './examples.css';

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];

const rota = [
  { name: 'Maya Chen', shifts: ['Day', 'Day', 'Off', 'Night', 'Night'] },
  { name: 'Jonas Weber', shifts: ['Night', 'Off', 'Day', 'Day', 'Off'] },
  { name: 'Priya Nair', shifts: ['Off', 'Night', 'Night', 'Off', 'Day'] },
];

export default function ControlledActiveCell() {
  const [active, setActive] = useState('0:0');
  const apiRef = useRef<GridApiRef<string>>(null);

  const [row, col] = active.split(':').map(Number);
  const person = rota[row];

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-6)' }}>
      <Grid
        aria-label='On-call rota'
        active={active}
        onChangeActive={setActive}
        apiRef={apiRef}
        className='gridSheet'
      >
        <GridRowGroup>
          {rota.map((item, rowIndex) => (
            <GridRow key={item.name} row={rowIndex}>
              {item.shifts.map((shift, colIndex) => (
                <GridCell key={days[colIndex]} col={colIndex} aria-label={`${item.name}, ${days[colIndex]}: ${shift}`}>
                  {shift}
                </GridCell>
              ))}
            </GridRow>
          ))}
        </GridRowGroup>
      </Grid>
      <Text size={2} style={{ color: 'var(--label-secondary)' }}>
        {person.name} · {days[col]}: {person.shifts[col]}
      </Text>
      <div style={{ display: 'flex', gap: 'var(--spacing-4)' }}>
        <Button size='sm' variant='secondary' appearance='ghost' onClick={() => apiRef.current?.focus(`${row}:4`)}>Go to Friday</Button>
        <Button size='sm' variant='secondary' appearance='ghost' onClick={() => setActive('0:0')}>Reset tab stop</Button>
      </div>
    </div>
  );
}
```
<!-- /example -->

## Матрица доступности

Когда использовать:
Сетка расписания или загрузки с `selection`, в которой визуальное оформление ячеек принадлежит приложению.

Заметки о композиции:
Держите ключи ячеек стабильными и используйте `disabled` или `exclude` для заблокированных позиций.

Компромиссы:
Вы получаете тонкий контроль, но сами отвечаете за видимые выбранное и активное состояния в интерфейсе ячеек.

<!-- example: grid/parent-managed-multi-select.tsx -->
```tsx
import { useState } from 'react';
import {
  Button,
  Grid,
  GridCell,
  GridColumnHeader,
  GridRow,
  GridRowGroup,
  GridRowHeader,
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
      <Grid
        aria-label='Interview availability'
        selection='multiple'
        value={selected}
        onChangeValue={setSelected}
        defaultActive='Mon Morning'
        className='selectableGrid'
      >
        <GridRowGroup>
          <GridRow row={-1}>
            <GridColumnHeader col={0} excluded>Time</GridColumnHeader>
            {days.map((day, col) => <GridColumnHeader key={day} col={col + 1} excluded>{day}</GridColumnHeader>)}
          </GridRow>
        </GridRowGroup>
        <GridRowGroup>
          {parts.map((part, row) => (
            <GridRow key={part} row={row}>
              <GridRowHeader col={0} excluded>{part}</GridRowHeader>
              {days.map((day, col) => (
                <GridCell key={day} col={col + 1} value={`${day} ${part}`} aria-label={`${day} ${part}`} />
              ))}
            </GridRow>
          ))}
        </GridRowGroup>
      </Grid>
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

<!-- example: grid/custom-range-grid.tsx -->
```tsx
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
```
<!-- /example -->

## Плотная матрица вариантов

Когда использовать:
Показать много коротких вариантов в сетке, где форма пикера — часть продуктового опыта.

Заметки о композиции:
Поместите `GridItem` в каждую выбираемую `GridCell asChild` и доверьте ему стили активного и выбранного состояний.

Компромиссы:
Макет экономит место, но каждому элементу нужна высокая визуальная ясность, потому что подписи короткие.

<!-- example: grid/compact-month-like-matrix.tsx -->
```tsx
import {
  Grid,
  GridCell,
  GridItem,
  GridRow,
  GridRowGroup,
} from '@vega-ui/react';

const months = [
  ['Jan', 'Feb', 'Mar', 'Apr'],
  ['May', 'Jun', 'Jul', 'Aug'],
  ['Sep', 'Oct', 'Nov', 'Dec'],
];

export default function CompactMonthLikeMatrix() {
  return (
    <Grid
      aria-label='Statement month, 2026'
      selection='single'
      wrap='horizontal'
      defaultValue='2026-05'
      defaultActive='2026-05'
      style={{ width: 280 }}
    >
      <GridRowGroup>
        {months.map((row, rowIndex) => (
          <GridRow key={rowIndex} row={rowIndex}>
            {row.map((month, col) => {
              const value = `2026-${String(rowIndex * 4 + col + 1).padStart(2, '0')}`;

              return (
                <GridCell key={month} col={col} value={value} asChild>
                  <GridItem size='sm'>{month}</GridItem>
                </GridCell>
              );
            })}
          </GridRow>
        ))}
      </GridRowGroup>
    </Grid>
  );
}
```
<!-- /example -->

## Постраничная сетка

Когда использовать:
Набор вариантов настолько велик, что его стоит разбить на страницы по горизонтали.

Заметки о композиции:
Оберните строки в `GridScroller` и отрисуйте один компонент страницы внутри `IndexedSnapScrollerContent`. Страница берёт свой `index` из `useIndexedSnapScrollerContext` и вычисляет по нему данные и номера строк; `GridScroller` находит ячейки видимой страницы по её элементу.

Компромиссы:
Вы выигрываете в плотности и получаете перелистывание в духе свайпа, но восстановление фокуса и активного состояния становится важнее.

<!-- example: grid/paged-picker-with-own-buttons.tsx -->
```tsx
import { useRef, useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@vega-ui/icons';
import {
  Grid,
  GridCell,
  GridItem,
  GridRow,
  GridRowGroup,
  GridScroller,
  Icon,
  Button,
  IndexedSnapScrollerContent,
  Text,
  useIndexedSnapScrollerContext,
  type IndexedSnapScrollerApiRef,
} from '@vega-ui/react';

const firstYear = 2016;
const rows = [0, 1, 2];
const cols = [0, 1, 2, 3];
const perPage = rows.length * cols.length;

const getPageStart = (page: number) => firstYear + page * perPage;

function YearPage() {
  const { index } = useIndexedSnapScrollerContext();

  return (
    <GridRowGroup>
      {rows.map((rowIndex) => {
        const row = index * rows.length + rowIndex;

        return (
          <GridRow key={row} row={row}>
            {cols.map((col) => {
              const year = getPageStart(index) + rowIndex * cols.length + col;

              return (
                <GridCell key={year} col={col} value={year} asChild>
                  <GridItem size='sm'>{year}</GridItem>
                </GridCell>
              );
            })}
          </GridRow>
        );
      })}
    </GridRowGroup>
  );
}

export default function PagedPickerWithOwnButtons() {
  const scrollerRef = useRef<IndexedSnapScrollerApiRef>(null);
  const [page, setPage] = useState(0);

  return (
    <Grid aria-label='Graduation year' selection='single' wrap='horizontal' defaultValue={2021} defaultActive={2021} style={{ width: 280 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Button square aria-label='Previous years' size='sm' variant='secondary' appearance='transparent' onClick={() => scrollerRef.current?.prev()}>
          <Icon><ChevronLeftIcon /></Icon>
        </Button>
        <Text size={2} aria-live='polite'>{getPageStart(page)}–{getPageStart(page) + perPage - 1}</Text>
        <Button square aria-label='Next years' size='sm' variant='secondary' appearance='transparent' onClick={() => scrollerRef.current?.next()}>
          <Icon><ChevronRightIcon /></Icon>
        </Button>
      </div>
      <GridScroller apiRef={scrollerRef} defaultIndex={0} onScrollSnapChanging={(_, index) => setPage(index)}>
        <IndexedSnapScrollerContent style={{ width: '100%' }}>
          <YearPage />
        </IndexedSnapScrollerContent>
      </GridScroller>
    </Grid>
  );
}
```
<!-- /example -->

## Сортируемая таблица

Когда использовать:
Таблица данных, столбцы которой сортируются, а по строкам ходят с клавиатуры.

Заметки о композиции:
Соберите сетку на элементах `table` через `asChild`, поставьте кнопку сортировки внутрь `GridColumnHeader` и задайте `aria-sort` отсортированному заголовку. Нумеруйте строку заголовков отдельно через `row={-1}`.

Компромиссы:
Столбцы выравнивает нативная табличная раскладка, но каждой части нужен `asChild`, а сортировка остаётся в приложении.

<!-- example: grid/sortable-table.tsx -->
```tsx
import { useState } from 'react';
import { ArrowDownIcon, ArrowUpDownIcon, ArrowUpIcon } from '@vega-ui/icons';
import {
  Button,
  Grid,
  GridCell,
  GridColumnHeader,
  GridRow,
  GridRowGroup,
  GridRowHeader,
  Icon,
} from '@vega-ui/react';
import './examples.css';

type Column = 'customer' | 'amount' | 'due';
type Direction = 'ascending' | 'descending';

const invoices = [
  { customer: 'Northwind', amount: 1240, due: '2026-11-14' },
  { customer: 'Globex', amount: 860, due: '2026-11-03' },
  { customer: 'Initech', amount: 3120, due: '2026-11-21' },
  { customer: 'Umbrella', amount: 455, due: '2026-11-09' },
];

const columns: { key: Column, label: string, numeric?: boolean }[] = [
  { key: 'customer', label: 'Customer' },
  { key: 'amount', label: 'Amount', numeric: true },
  { key: 'due', label: 'Due' },
];

const money = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
const date = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', timeZone: 'UTC' });

export const layout = 'wide';

export default function SortableTable() {
  const [sort, setSort] = useState<{ column: Column, direction: Direction }>({ column: 'due', direction: 'ascending' });

  const sorted = [...invoices].sort((a, b) => {
    const order = a[sort.column] < b[sort.column] ? -1 : 1;

    return sort.direction === 'ascending' ? order : -order;
  });

  const sortBy = (column: Column) => {
    if (sort.column !== column) {
      setSort({ column, direction: 'ascending' });
      return;
    }

    setSort({ column, direction: sort.direction === 'ascending' ? 'descending' : 'ascending' });
  };

  const sortIcon = (column: Column) => {
    if (sort.column !== column) return <ArrowUpDownIcon />;
    if (sort.direction === 'ascending') return <ArrowUpIcon />;

    return <ArrowDownIcon />;
  };

  return (
    <Grid asChild aria-label='Open invoices' defaultActive='-1:0' className='gridSheet gridTable'>
      <table>
        <GridRowGroup asChild>
          <thead>
            <GridRow row={-1} asChild>
              <tr>
                {columns.map((column, col) => (
                  <GridColumnHeader
                    key={column.key}
                    col={col}
                    asChild
                    aria-sort={sort.column === column.key ? sort.direction : undefined}
                  >
                    <th className={column.numeric ? 'gridNumeric' : undefined}>
                      <Button size='xs' variant='secondary' appearance='ghost' tabIndex={-1} onClick={() => sortBy(column.key)}>
                        {column.label}
                        <Icon size='xs'>{sortIcon(column.key)}</Icon>
                      </Button>
                    </th>
                  </GridColumnHeader>
                ))}
              </tr>
            </GridRow>
          </thead>
        </GridRowGroup>
        <GridRowGroup asChild>
          <tbody>
            {sorted.map((invoice, row) => (
              <GridRow key={invoice.customer} row={row} asChild>
                <tr>
                  <GridRowHeader col={0} asChild>
                    <th scope='row'>{invoice.customer}</th>
                  </GridRowHeader>
                  <GridCell col={1} asChild>
                    <td className='gridNumeric'>{money.format(invoice.amount)}</td>
                  </GridCell>
                  <GridCell col={2} asChild>
                    <td>{date.format(new Date(invoice.due))}</td>
                  </GridCell>
                </tr>
              </GridRow>
            ))}
          </tbody>
        </GridRowGroup>
      </table>
    </Grid>
  );
}
```
<!-- /example -->

## Редактируемые ячейки

Когда использовать:
Таблица, в некоторых ячейках которой есть поля ввода, кнопки или меню.

Заметки о композиции:
Дайте элементам управления внутри `GridCell` `tabIndex={-1}`. Enter или F2 переносят фокус в содержимое ячейки, Escape возвращает на ячейку, а Tab выводит из сетки. Ячейка из одного виджета — это `<GridCell asChild><button /></GridCell>`.

Компромиссы:
Вся сетка остаётся одной остановкой табуляции, но чтобы начать редактирование, нужен Enter или F2.

<!-- example: grid/inline-editing.tsx -->
```tsx
import { useState } from 'react';
import {
  Button,
  Grid,
  GridCell,
  GridColumnHeader,
  GridRow,
  GridRowGroup,
  GridRowHeader,
  Text,
} from '@vega-ui/react';
import './examples.css';

const initialBudget = [
  { category: 'Rent', planned: '1800', spent: '1800' },
  { category: 'Groceries', planned: '600', spent: '412' },
  { category: 'Transport', planned: '150', spent: '96' },
  { category: 'Utilities', planned: '220', spent: '238' },
];

const headers = ['Category', 'Planned', 'Spent', 'Left'];

const money = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

const toNumber = (value: string) => Number(value) || 0;

export const layout = 'wide';

export default function InlineEditing() {
  const [budget, setBudget] = useState(initialBudget);

  const change = (row: number, field: 'planned' | 'spent', value: string) => {
    setBudget(budget.map((item, index) => index === row ? { ...item, [field]: value } : item));
  };

  const left = budget.reduce((sum, item) => sum + toNumber(item.planned) - toNumber(item.spent), 0);

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-8)', inlineSize: 'min(100%, 480px)' }}>
      <Grid aria-label='November budget' defaultActive='0:1' className='gridSheet gridSheetWideFirst gridEditable'>
        <GridRowGroup>
          <GridRow row={-1}>
            {headers.map((header, col) => (
              <GridColumnHeader key={header} col={col} excluded>{header}</GridColumnHeader>
            ))}
          </GridRow>
        </GridRowGroup>
        <GridRowGroup>
          {budget.map((item, row) => (
            <GridRow key={item.category} row={row}>
              <GridRowHeader col={0}>{item.category}</GridRowHeader>
              <GridCell col={1}>
                <input
                  className='gridCellInput'
                  tabIndex={-1}
                  aria-label={`${item.category} planned`}
                  inputMode='decimal'
                  value={item.planned}
                  onChange={(event) => change(row, 'planned', event.target.value)}
                />
              </GridCell>
              <GridCell col={2}>
                <input
                  className='gridCellInput'
                  tabIndex={-1}
                  aria-label={`${item.category} spent`}
                  inputMode='decimal'
                  value={item.spent}
                  onChange={(event) => change(row, 'spent', event.target.value)}
                />
              </GridCell>
              <GridCell col={3} className='gridNumeric'>
                {money.format(toNumber(item.planned) - toNumber(item.spent))}
              </GridCell>
            </GridRow>
          ))}
        </GridRowGroup>
      </Grid>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-4)' }}>
        <Text size={2} style={{ color: 'var(--label-secondary)' }}>{`Left this month: ${money.format(left)}`}</Text>
        <Button size='xs' variant='secondary' appearance='ghost' onClick={() => setBudget(initialBudget)}>Reset</Button>
      </div>
    </div>
  );
}
```
<!-- /example -->
