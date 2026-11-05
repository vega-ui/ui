# DataGridPicker: паттерны

## Плотная матрица вариантов

Когда использовать:
Показать много коротких вариантов в сетке, где форма пикера — часть продуктового опыта.

Заметки о композиции:
Используйте `DataGridPickerItem` для каждой выбираемой ячейки и доверьте слою пикера стили активного и выбранного состояний.

Компромиссы:
Макет экономит место, но каждому элементу нужна высокая визуальная ясность, потому что подписи короткие.

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

## Постраничный пикер

Когда использовать:
Набор вариантов настолько велик, что его стоит разбить на страницы по горизонтали.

Заметки о композиции:
Оберните сетку в `DataGridPickerScroller` и отрисуйте один компонент страницы внутри `DataGridPickerScrollerContent`. Страница берёт свой `index` из `useIndexedSnapScrollerContext`, вычисляет по нему данные и номера строк и передаёт его в `scope` своей группы строк.

Компромиссы:
Вы выигрываете в плотности и получаете перелистывание в духе свайпа, но восстановление фокуса и активного состояния становится важнее.

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
