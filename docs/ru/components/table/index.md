# Table

## Профиль документа

`advanced interactive`

## Кратко

`Table` — [составной компонент](../../glossary.md#составной-компонент-compound-component) для семантических табличных данных, когда нативная структура таблицы важнее взаимодействия с клавиатуры в стиле grid.

## Импорт

```tsx
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableHeading,
  TableData,
  TableFoot,
  type TableProps,
} from '@vega-ui/react';
```

## Экспортируемые типы

- `TableProps`
- `TableHeadProps`
- `TableBodyProps`
- `TableRowProps`
- `TableHeadingProps`
- `TableDataProps`
- `TableFootProps`

## Минимальная композиция

<!-- example: table/minimal-composition.tsx -->
```tsx
import {
  Table,
  TableBody,
  TableData,
  TableHead,
  TableHeading,
  TableRow,
} from '@vega-ui/react';

export default function MinimalComposition() {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableHeading scope='col'>Plan</TableHeading>
          <TableHeading scope='col'>Price</TableHeading>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableData>Starter</TableData>
          <TableData>$9 / month</TableData>
        </TableRow>
        <TableRow>
          <TableData>Team</TableData>
          <TableData>$29 / month</TableData>
        </TableRow>
      </TableBody>
    </Table>
  );
}
```
<!-- /example -->

## Свой компонент

Минимальная композиция выше показывает части на месте. В приложении соберите их один раз в своём файле, со своим набором иконок, и импортируйте этот компонент везде. Здесь повторяется сортируемый заголовок столбца: `MyTableSortHeading` передаёт свои пропсы в `TableHeading`, выбирает стрелку по его `aria-sort` и вызывает `onSort` из кнопки внутри. См. [Рецепты компонентов](../../recipes.md).

<!-- example: table/recipe.tsx -->
```tsx
import { ArrowDownIcon, ArrowUpDownIcon, ArrowUpIcon } from '@vega-ui/icons';
import {
  Button,
  Icon,
  Table,
  TableBody,
  TableData,
  TableHead,
  TableHeading,
  TableRow,
  type TableHeadingProps,
} from '@vega-ui/react';
import { useState } from 'react';

interface MyTableSortHeadingProps extends TableHeadingProps {
  onSort(): void
}

export function MyTableSortHeading({ onSort, children, ...props }: MyTableSortHeadingProps) {
  let icon = <ArrowUpDownIcon />;
  if (props['aria-sort'] === 'ascending') icon = <ArrowUpIcon />;
  if (props['aria-sort'] === 'descending') icon = <ArrowDownIcon />;

  return (
    <TableHeading scope='col' {...props}>
      <Button size='xs' variant='secondary' appearance='transparent' style={{ display: 'inline-flex' }} onClick={onSort}>
        {children}
        <Icon size='xs'>{icon}</Icon>
      </Button>
    </TableHeading>
  );
}

type Invoice = { id: string, customer: string, amount: number };
type SortKey = 'customer' | 'amount';
type Direction = 'ascending' | 'descending';

const invoices: Invoice[] = [
  { id: 'INV-1042', customer: 'Northwind Traders', amount: 1240 },
  { id: 'INV-1043', customer: 'Acme Design', amount: 380 },
  { id: 'INV-1044', customer: 'Blue Harbor Cafe', amount: 96.5 },
];

const currency = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });

export default function Recipe() {
  const [sortKey, setSortKey] = useState<SortKey>('amount');
  const [direction, setDirection] = useState<Direction>('descending');

  const sorted = [...invoices].sort((first, second) => {
    let result = first.amount - second.amount;
    if (sortKey === 'customer') result = first.customer.localeCompare(second.customer);
    return direction === 'ascending' ? result : -result;
  });

  const sortBy = (key: SortKey) => {
    if (key === sortKey) {
      setDirection(direction === 'ascending' ? 'descending' : 'ascending');
      return;
    }
    setSortKey(key);
    setDirection('ascending');
  };

  const sortOf = (key: SortKey) => {
    if (key !== sortKey) return undefined;
    return direction;
  };

  return (
    <div role='region' aria-label='Invoices' tabIndex={0} style={{ width: '100%', overflowX: 'auto', border: '1px solid var(--separator-opaque)', borderRadius: 'var(--radius-4)', background: 'var(--surface-primary)' }}>
      <Table fullWidth edgePadded style={{ borderStyle: 'hidden' }}>
        <TableHead>
          <TableRow>
            <MyTableSortHeading aria-sort={sortOf('customer')} onSort={() => sortBy('customer')}>Customer</MyTableSortHeading>
            <MyTableSortHeading aria-sort={sortOf('amount')} onSort={() => sortBy('amount')}>Amount</MyTableSortHeading>
          </TableRow>
        </TableHead>
        <TableBody>
          {sorted.map((invoice) => (
            <TableRow key={invoice.id}>
              <TableData>{invoice.customer}</TableData>
              <TableData style={{ whiteSpace: 'nowrap', fontVariantNumeric: 'tabular-nums' }}>{currency.format(invoice.amount)}</TableData>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
```
<!-- /example -->

## Обязательные части

- `Table`: корневая семантическая таблица и владелец выравнивания
- `TableRow`: структура строки для секций
- `TableHeading` или `TableData`: содержимое на уровне ячеек

## Необязательные части

- `TableHead`: секция заголовка для подписей столбцов
- `TableBody`: секция тела для строк данных
- `TableFoot`: секция подвала для сводок и итогов

## Порядок композиции

1. `Table`
2. `TableHead`
3. `TableBody`
4. `TableFoot`
5. `TableRow`
6. `TableHeading`
7. `TableData`

## Варианты

- Выравнивание данных через `dataAlign`
- Варианты раскладки `fullWidth` и `fullHeight`
- Края с отступами или вровень через `edgePadded`

## Связанные документы

- [Анатомия](./anatomy.md)
- [Примеры](./examples.md)
- [Паттерны](./patterns.md)
- [API](./api.md)
- [Стилизация](./styling.md)
- [Доступность](./accessibility.md)
- [Сравнение](./comparison.md)
- [Решение проблем](./troubleshooting.md)

## Пограничные случаи

- `Table` плохо подходит, когда интерфейсу нужны навигация с клавиатуры по ячейкам или сложные модели выбора.
- На маленьких экранах потребителю нужно явно обработать переполнение или перестроить раскладку в столбик.
- Выравнивание должно быть согласованным в ячейках заголовков и данных.

## Типичные ошибки

- Выбор `Grid`, когда достаточно семантической разметки таблицы.
- Отказ от семантических секций вроде `TableHead` только ради упрощения стилей.
- Игнорирование переполнения на маленьких экранах.
