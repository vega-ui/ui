# DataGrid

## Профиль документа

`advanced interactive`

## Кратко

`DataGrid` — [составной компонент](../../glossary.md#составной-компонент-compound-component) для навигации по строкам и ячейкам сетки с клавиатуры. Это базовый слой, на котором построены `DataGridSelectable` и `DataGridPicker`.

## Импорты

```tsx
import {
  DataGrid,
  DataGridRowGroup,
  DataGridRow,
  DataGridCell,
  type DataGridProps,
  type DataGridCellKey,
  type DataGridCoordinates,
  type DataGridWrap,
} from '@vega-ui/react';
```

## Экспортируемые типы

- `DataGridProps`
- `DataGridCellKey`
- `DataGridCoordinates`
- `DataGridWrap`
- `DataGridResolveValue`
- `DataGridExclude`
- `DataGridExcludeResolver`
- `DataGridApiRef`
- `DataGridScope`

## Минимальная композиция

<!-- example: data-grid/minimal-composition.tsx -->
```tsx
import {
  DataGrid,
  DataGridCell,
  DataGridRow,
  DataGridRowGroup,
} from '@vega-ui/react';
import './examples.css';

export default function MinimalComposition() {
  return (
    <DataGrid aria-label='Release checklist' defaultActive='0:0' className='dataGridSheet'>
      <DataGridRowGroup>
        <DataGridRow row={0}>
          <DataGridCell col={0}>Design</DataGridCell>
          <DataGridCell col={1}>Build</DataGridCell>
          <DataGridCell col={2}>Ship</DataGridCell>
        </DataGridRow>
        <DataGridRow row={1}>
          <DataGridCell col={0}>Done</DataGridCell>
          <DataGridCell col={1}>In progress</DataGridCell>
          <DataGridCell col={2}>Not started</DataGridCell>
        </DataGridRow>
      </DataGridRowGroup>
    </DataGrid>
  );
}
```
<!-- /example -->

## Обязательные части

- `DataGrid`: корневая модель клавиатуры и активной ячейки
- `DataGridRowGroup`: контейнер для группировки строк
- `DataGridRow`: регистрация строки
- `DataGridCell`: фокусируемая или навигируемая ячейка

## Необязательные части

- кастомное содержимое внутри `DataGridCell`
- контролируемая логика активной ячейки на уровне родителя
- `apiRef` для продвинутой координации фокуса и измерений

## Порядок композиции

Типичная композиция:

1. `DataGrid`
2. `DataGridRowGroup`
3. `DataGridRow`
4. `DataGridCell`

## Варианты

- Режимы переноса из `DataGridWrap`
- Неконтролируемая активная ячейка по умолчанию или контролируемая активная ячейка
- Обычная сетка или производные семейства выбора и пикера, построенные поверх неё

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

- Разреженным сеткам нужны правила исключений, которые совпадают с видимой раскладкой.
- Интерактивные виджеты внутри ячеек могут нарушать работу с клавиатуры.
- Большим наборам данных может понадобиться виртуализация за пределами компонента.
- `scope` важен, когда несколько логических сеток или постраничный контент используют одну модель взаимодействия.

## Частые ошибки

- Использовать `DataGrid` для статичных таблиц, которые должны оставаться `Table`.
- Игнорировать логику исключений при разреженной визуальной раскладке.
- Встраивать сложные контролы в ячейки без повторной проверки работы с клавиатуры.
