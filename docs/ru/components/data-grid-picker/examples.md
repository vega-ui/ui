# DataGridPicker: примеры

## Базовый

### Базовый: месяц выписки

Двенадцать месяцев в матрице 4×3 с одиночным выбором. `value` каждого `DataGridPickerItem` — это его ключ, поэтому `defaultSelected` и `defaultActive` используют те же строки `2026-05`; стили выбранного, наведённого и сфокусированного состояний даёт пикер.

<!-- example: data-grid-picker/compact-month-like-matrix.tsx -->
```tsx
import {
  DataGridPicker,
  DataGridPickerItem,
  DataGridPickerRow,
  DataGridPickerRowGroup,
} from '@vega-ui/react';

const months = [
  ['Jan', 'Feb', 'Mar', 'Apr'],
  ['May', 'Jun', 'Jul', 'Aug'],
  ['Sep', 'Oct', 'Nov', 'Dec'],
];

export default function CompactMonthLikeMatrix() {
  return (
    <DataGridPicker
      aria-label='Statement month, 2026'
      size='sm'
      defaultSelected='2026-05'
      defaultActive='2026-05'
      style={{ width: 280 }}
    >
      <DataGridPickerRowGroup>
        {months.map((row, rowIndex) => (
          <DataGridPickerRow key={rowIndex} row={rowIndex}>
            {row.map((month, col) => {
              const value = `2026-${String(rowIndex * 4 + col + 1).padStart(2, '0')}`;

              return (
                <DataGridPickerItem key={month} col={col} value={value}>{month}</DataGridPickerItem>
              );
            })}
          </DataGridPickerRow>
        ))}
      </DataGridPickerRowGroup>
    </DataGridPicker>
  );
}
```
<!-- /example -->

## Контролируемый/с состоянием

### Контролируемый/с состоянием: месяцы кампании как диапазон

`selection='range'`, а диапазоном владеет родитель. Элементы между концами автоматически получают оформление через `data-range`, сводка читает тот же массив, а «Clear» его сбрасывает. Ключи — строки `YYYY-MM`, которые уже сортируются в календарном порядке.

<!-- example: data-grid-picker/controlled-range-picker-grid.tsx -->
```tsx
import { useState } from 'react';
import {
  Button,
  DataGridPicker,
  DataGridPickerItem,
  DataGridPickerRow,
  DataGridPickerRowGroup,
  Text,
} from '@vega-ui/react';

const names = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const rows = [0, 1, 2];
const cols = [0, 1, 2, 3];

const toValue = (month: number) => `2026-${String(month + 1).padStart(2, '0')}`;
const toName = (value: string) => names[Number(value.slice(5)) - 1];

const describeRange = (range: string[]) => {
  if (range.length === 0) return 'Pick the first month of the campaign.';
  if (range.length === 1) return `Starts in ${toName(range[0])}. Now pick the last month.`;

  const [start, end] = [...range].sort();
  const months = Number(end.slice(5)) - Number(start.slice(5)) + 1;

  return `${toName(start)} – ${toName(end)} 2026, ${months} months`;
};

export default function ControlledRangePickerGrid() {
  const [range, setRange] = useState<string[]>(['2026-03', '2026-07']);

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-8)', width: '100%', maxWidth: 280 }}>
      <DataGridPicker
        aria-label='Campaign months, 2026'
        selection='range'
        size='sm'
        selected={range}
        onSelectCell={setRange}
        defaultActive='2026-03'
        style={{ width: '100%' }}
      >
        <DataGridPickerRowGroup>
          {rows.map((row) => (
            <DataGridPickerRow key={row} row={row}>
              {cols.map((col) => {
                const value = toValue(row * cols.length + col);

                return (
                  <DataGridPickerItem key={value} col={col} value={value}>{toName(value)}</DataGridPickerItem>
                );
              })}
            </DataGridPickerRow>
          ))}
        </DataGridPickerRowGroup>
      </DataGridPicker>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-4)' }}>
        <Text size={2} style={{ color: 'var(--label-secondary)', fontVariantNumeric: 'tabular-nums' }}>{describeRange(range)}</Text>
        <Button size='sm' variant='secondary' appearance='ghost' onClick={() => setRange([])}>Clear</Button>
      </div>
    </div>
  );
}
```
<!-- /example -->

## Форма/интеграция

### Форма/интеграция: период счёта в форме

Выбранный квартал попадает в скрытое поле и читается через `FormData` при отправке; кнопка сброса восстанавливает начальный квартал через `onReset`. Q4 отключён, а подсказка с причиной связана через `aria-describedby`.

<!-- example: data-grid-picker/quarter-selector-in-a-billing-flow.tsx -->
```tsx
import { FormEvent, useState } from 'react';
import {
  Button,
  DataGridPicker,
  DataGridPickerItem,
  DataGridPickerRow,
  DataGridPickerRowGroup,
  HelperText,
  Text,
} from '@vega-ui/react';

const quarters = ['2026-Q1', '2026-Q2', '2026-Q3', '2026-Q4'];
const initialQuarter = '2026-Q2';

export default function QuarterSelectorInABillingFlow() {
  const [quarter, setQuarter] = useState(initialQuarter);
  const [result, setResult] = useState('');

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const period = new FormData(event.currentTarget).get('period');
    setResult(`Exporting invoices for ${period}`);
  };

  const onReset = () => {
    setQuarter(initialQuarter);
    setResult('');
  };

  return (
    <form onSubmit={onSubmit} onReset={onReset} style={{ display: 'grid', gap: 'var(--spacing-12)', width: '100%', maxWidth: 280 }}>
      <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
        <Text id='invoice-period-label' fontWeight={500}>Invoice period</Text>
        <DataGridPicker
          aria-labelledby='invoice-period-label'
          aria-describedby='invoice-period-hint'
          selected={quarter}
          onSelectCell={setQuarter}
          disabled='2026-Q4'
          defaultActive={initialQuarter}
          style={{ width: '100%' }}
        >
          <DataGridPickerRowGroup>
            <DataGridPickerRow row={0}>
              {quarters.map((value, col) => (
                <DataGridPickerItem key={value} col={col} value={value}>{value.slice(5)}</DataGridPickerItem>
              ))}
            </DataGridPickerRow>
          </DataGridPickerRowGroup>
        </DataGridPicker>
        <input type='hidden' name='period' value={quarter} />
        <HelperText id='invoice-period-hint'>Q4 is still open and cannot be invoiced yet.</HelperText>
      </div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--spacing-4)' }}>
        <Button type='reset' variant='secondary' appearance='ghost'>Reset</Button>
        <Button type='submit'>Export invoices</Button>
      </div>
      {result && <Text size={2} style={{ color: 'var(--label-secondary)' }}>{result}</Text>}
    </form>
  );
}
```
<!-- /example -->

## Раскладка/оверлей

### Раскладка/оверлей: постраничный пикер со своими кнопками

Скроллер отдаёт `prev()` и `next()` через `apiRef` для кнопок вне сетки. Каждая страница берёт свой `index` из `useIndexedSnapScrollerContext`, вычисляет по нему годы и уникальные номера строк и передаёт его в `scope` группы строк, чтобы фокус переходил на первую доступную ячейку видимой страницы. `onScrollSnapChanging` держит подпись периода в актуальном состоянии.

<!-- example: data-grid-picker/paged-picker-with-own-buttons.tsx -->
```tsx
import { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from '@vega-ui/icons';
import {
  DataGridPicker,
  DataGridPickerItem,
  DataGridPickerRow,
  DataGridPickerRowGroup,
  DataGridPickerScroller,
  DataGridPickerScrollerContent,
  Icon,
  IconButton,
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
    <DataGridPickerRowGroup scope={index}>
      {rows.map((rowIndex) => {
        const row = index * rows.length + rowIndex;

        return (
          <DataGridPickerRow key={row} row={row}>
            {cols.map((col) => {
              const year = getPageStart(index) + rowIndex * cols.length + col;

              return <DataGridPickerItem key={year} col={col} value={year}>{year}</DataGridPickerItem>;
            })}
          </DataGridPickerRow>
        );
      })}
    </DataGridPickerRowGroup>
  );
}

export default function PagedPickerWithOwnButtons() {
  const scrollerRef = useRef<IndexedSnapScrollerApiRef>(null);
  const [page, setPage] = useState(0);

  return (
    <DataGridPicker aria-label='Graduation year' size='sm' defaultSelected={2021} defaultActive={2021} style={{ width: 280 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <IconButton aria-label='Previous years' size='sm' variant='secondary' appearance='transparent' onClick={() => scrollerRef.current?.prev()}>
          <Icon><ChevronLeft /></Icon>
        </IconButton>
        <Text size={2} aria-live='polite'>{getPageStart(page)}–{getPageStart(page) + perPage - 1}</Text>
        <IconButton aria-label='Next years' size='sm' variant='secondary' appearance='transparent' onClick={() => scrollerRef.current?.next()}>
          <Icon><ChevronRight /></Icon>
        </IconButton>
      </div>
      <DataGridPickerScroller apiRef={scrollerRef} defaultIndex={0} onScrollSnapChanging={(_, index) => setPage(index)}>
        <DataGridPickerScrollerContent style={{ width: '100%' }}>
          <YearPage />
        </DataGridPickerScrollerContent>
      </DataGridPickerScroller>
    </DataGridPicker>
  );
}
```
<!-- /example -->

## Ошибка

### Ошибка: не меньше трёх дней тренировок

Множественный выбор с минимумом. Отправка с меньшим числом дней превращает связанный вспомогательный текст в ошибку; третий выбранный день её снимает. Выбранные дни отправляются повторяющимися полями `day`.

<!-- example: data-grid-picker/at-least-three-days.tsx -->
```tsx
import { FormEvent, useState } from 'react';
import {
  Button,
  DataGridPicker,
  DataGridPickerItem,
  DataGridPickerRow,
  DataGridPickerRowGroup,
  HelperText,
  Text,
} from '@vega-ui/react';

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const minimum = 3;

export default function AtLeastThreeDays() {
  const [selected, setSelected] = useState<string[]>(['Mon']);
  const [invalid, setInvalid] = useState(false);
  const [saved, setSaved] = useState('');

  const onSelectCell = (value: string[]) => {
    setSelected(value);
    if (value.length >= minimum) setInvalid(false);
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (selected.length < minimum) {
      setInvalid(true);
      return;
    }

    setSaved(new FormData(event.currentTarget).getAll('day').join(', '));
  };

  return (
    <form onSubmit={onSubmit} style={{ display: 'grid', gap: 'var(--spacing-12)', width: '100%', maxWidth: 320 }}>
      <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
        <Text id='training-days-label' fontWeight={500}>Training days</Text>
        <DataGridPicker
          aria-labelledby='training-days-label'
          aria-describedby='training-days-message'
          aria-multiselectable='true'
          selection='multiple'
          size='sm'
          selected={selected}
          onSelectCell={onSelectCell}
          defaultActive='Mon'
          style={{ width: '100%' }}
        >
          <DataGridPickerRowGroup>
            <DataGridPickerRow row={0}>
              {days.map((day, col) => (
                <DataGridPickerItem key={day} col={col} value={day}>{day}</DataGridPickerItem>
              ))}
            </DataGridPickerRow>
          </DataGridPickerRowGroup>
        </DataGridPicker>
        {selected.map((day) => <input key={day} type='hidden' name='day' value={day} />)}
        <HelperText id='training-days-message' error={invalid}>
          {invalid ? `Pick at least ${minimum} days, ${minimum - selected.length} more to go.` : `Pick at least ${minimum} days a week.`}
        </HelperText>
      </div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--spacing-4)' }}>
        <Button type='submit'>Save plan</Button>
      </div>
      {saved && <Text size={2} style={{ color: 'var(--label-secondary)' }}>Saved: {saved}</Text>}
    </form>
  );
}
```
<!-- /example -->

## Отключённый

### Отключённый: распроданные размеры

`disabled` принимает распроданные значения. По умолчанию пикер исключает отключённые элементы из перемещения с клавиатуры, а их подписи сообщают скринридеру «sold out».

<!-- example: data-grid-picker/blocked-cells-inside-a-dense-picker.tsx -->
```tsx
import {
  DataGridPicker,
  DataGridPickerItem,
  DataGridPickerRow,
  DataGridPickerRowGroup,
  HelperText,
} from '@vega-ui/react';

const sizes = [[36, 37, 38, 39, 40, 41], [42, 43, 44, 45, 46, 47]];
const soldOut = [37, 41, 42, 46];

export default function BlockedCellsInsideADensePicker() {
  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-3)', width: '100%', maxWidth: 300 }}>
      <DataGridPicker
        aria-label='Shoe size, EU'
        aria-describedby='shoe-size-hint'
        size='sm'
        disabled={soldOut}
        defaultActive={36}
        style={{ width: '100%' }}
      >
        <DataGridPickerRowGroup>
          {sizes.map((row, rowIndex) => (
            <DataGridPickerRow key={rowIndex} row={rowIndex}>
              {row.map((size, col) => (
                <DataGridPickerItem key={size} col={col} value={size} aria-label={soldOut.includes(size) ? `${size}, sold out` : String(size)}>
                  {size}
                </DataGridPickerItem>
              ))}
            </DataGridPickerRow>
          ))}
        </DataGridPickerRowGroup>
      </DataGridPicker>
      <HelperText id='shoe-size-hint'>Sold-out sizes are skipped by the arrow keys.</HelperText>
    </div>
  );
}
```
<!-- /example -->

## Пограничный случай

### Пограничный случай: шесть из 49

Лимит выбора, построенный на предикате `disabled`: когда выбрано шесть чисел, все остальные отключаются. `excludeDisabled={false}` оставляет их достижимыми со стрелок, иначе клавиатура могла бы перемещаться только между шестью выбранными числами.

<!-- example: data-grid-picker/lottery-numbers.tsx -->
```tsx
import { useState } from 'react';
import {
  Button,
  DataGridPicker,
  DataGridPickerItem,
  DataGridPickerRow,
  DataGridPickerRowGroup,
  Text,
} from '@vega-ui/react';

const limit = 6;
const rows = Array.from({ length: 7 }, (_, row) => row);
const cols = Array.from({ length: 7 }, (_, col) => col);

const describePicked = (picked: number[]) => {
  if (picked.length === 0) return `Pick ${limit} numbers.`;

  const sorted = [...picked].sort((a, b) => a - b);

  return `${picked.length} of ${limit} picked: ${sorted.join(', ')}`;
};

export default function LotteryNumbers() {
  const [picked, setPicked] = useState<number[]>([]);

  const isLocked = (value: number) => picked.length >= limit && !picked.includes(value);

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-8)', width: '100%', maxWidth: 252 }}>
      <DataGridPicker
        aria-label={`Lottery numbers, pick ${limit}`}
        aria-multiselectable='true'
        selection='multiple'
        size='xs'
        selected={picked}
        onSelectCell={setPicked}
        disabled={isLocked}
        excludeDisabled={false}
        defaultActive={1}
        style={{ width: '100%' }}
      >
        <DataGridPickerRowGroup>
          {rows.map((row) => (
            <DataGridPickerRow key={row} row={row}>
              {cols.map((col) => {
                const value = row * cols.length + col + 1;

                return <DataGridPickerItem key={value} col={col} value={value}>{value}</DataGridPickerItem>;
              })}
            </DataGridPickerRow>
          ))}
        </DataGridPickerRowGroup>
      </DataGridPicker>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-4)' }}>
        <Text size={2} style={{ color: 'var(--label-secondary)', fontVariantNumeric: 'tabular-nums' }}>{describePicked(picked)}</Text>
        <Button size='sm' variant='secondary' appearance='ghost' disabled={picked.length === 0} onClick={() => setPicked([])}>Clear</Button>
      </div>
    </div>
  );
}
```
<!-- /example -->
