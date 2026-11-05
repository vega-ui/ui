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

- Выбор `DataGrid`, когда достаточно семантической разметки таблицы.
- Отказ от семантических секций вроде `TableHead` только ради упрощения стилей.
- Игнорирование переполнения на маленьких экранах.
