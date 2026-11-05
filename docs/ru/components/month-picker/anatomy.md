# MonthPicker: анатомия

## Обзор

`MonthPicker` оборачивает `DataGridPicker` для значений-месяцев и предоставляет части строк, элементов и раскладки для статичных сеток месяцев.

## Обязательные части

### `MonthPicker`

Обязательная. Владеет моделью состояния выбора месяца через `DataGridPicker`.

## Необязательные части

### `MonthPickerLayout`

Необязательный рендерер сетки месяцев по умолчанию.

### `MonthPickerCell`

Шаблон ячейки. Children у `MonthPickerLayout` обязательны и рендерятся по одному разу на месяц внутри контекста ячейки, который читает `useMonthPickerCellContext()`; обычно это `<MonthPickerCell />`. Помещайте собственное содержимое внутрь `MonthPickerCell`, чтобы сохранить состояния выбора, фокуса и отключения.

### `MonthPickerRowGroup`, `MonthPickerRow`, `MonthPickerItem`

Необязательные низкоуровневые части для композиции сетки месяцев.

## Порядок композиции

1. `MonthPicker`
2. либо `MonthPickerLayout`, либо собственная композиция из строк и элементов

## Корректные паттерны композиции

Явные части: `MonthPickerRowGroup` › `MonthPickerRow` › `MonthPickerItem`, построенные через `createMonthPickerGrid`. `MonthPickerLayout` с шаблоном `MonthPickerCell` рендерит ту же структуру; см. [Минимальная композиция](./index.md#минимальная-композиция).

<!-- example: month-picker/custom-grid-rendering.tsx -->
```tsx
import {
  MonthPicker,
  MonthPickerItem,
  MonthPickerRow,
  MonthPickerRowGroup,
  createMonthPickerGrid,
} from '@vega-ui/react';

const YEAR = '2026-01-01';
const narrowFormat = new Intl.DateTimeFormat('en-US', { month: 'narrow', timeZone: 'UTC' });
const longFormat = new Intl.DateTimeFormat('en-US', { month: 'long', timeZone: 'UTC' });
const rows = createMonthPickerGrid({ year: YEAR, cols: 6 });

export default function CustomGridRendering() {
  return (
    <MonthPicker aria-label='Month, 2026' locale='en-US' year={YEAR} style={{ width: '100%' }}>
      <MonthPickerRowGroup>
        {rows.map(({ row, data }) => (
          <MonthPickerRow key={row} row={row}>
            {data.map(({ col, month }) => (
              <MonthPickerItem key={month} col={col} value={month} aria-label={longFormat.format(new Date(month))}>
                {narrowFormat.format(new Date(month))}
              </MonthPickerItem>
            ))}
          </MonthPickerRow>
        ))}
      </MonthPickerRowGroup>
    </MonthPicker>
  );
}
```
<!-- /example -->

## Некорректные паттерны композиции

### Метки месяцев заданы вручную и расходятся с остальным приложением

Локализация и семантика дат перестают совпадать.

### Раскладка пересобрана без хелперов

Порядок месяцев и семантику выбора становится проще сломать.
