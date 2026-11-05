# DataGridSelectable

## Профиль документа

`advanced interactive`

## Кратко

`DataGridSelectable` расширяет `DataGrid` управлением активной ячейкой и одиночным, множественным или диапазонным выбором. Это поведенческий слой выбора, на котором построены высокоуровневые подсистемы пикеров.

## Импорт

```tsx
import {
  DataGridSelectable,
  DataGridSelectableCell,
  DataGridSelectableRow,
  DataGridSelectableRowGroup,
  type DataGridDisabled,
  type DataGridSelectableCellProps,
  type DataGridSelectableProps,
  type DataGridSelectableRowGroupProps,
  type DataGridSelectableRowProps,
  type DataGridSelection,
} from '@vega-ui/react';
```

## Экспортируемые типы

- `DataGridSelectableProps<K, S>`
- `DataGridSelectableRowGroupProps`
- `DataGridSelectableRowProps`
- `DataGridSelectableCellProps`
- `DataGridSelection = 'single' | 'multiple' | 'range'`
- `DataGridDisabled<K>`

## Минимальная композиция

<!-- example: data-grid-selectable/minimal-composition.tsx -->
```tsx
import {
  DataGridSelectable,
  DataGridSelectableCell,
  DataGridSelectableRow,
  DataGridSelectableRowGroup,
} from '@vega-ui/react';
import './examples.css';

export default function MinimalComposition() {
  return (
    <DataGridSelectable aria-label='Quarter' defaultActive='q1' className='selectableGrid'>
      <DataGridSelectableRowGroup>
        <DataGridSelectableRow row={0}>
          <DataGridSelectableCell col={0} cellKey='q1'>Q1</DataGridSelectableCell>
          <DataGridSelectableCell col={1} cellKey='q2'>Q2</DataGridSelectableCell>
        </DataGridSelectableRow>
        <DataGridSelectableRow row={1}>
          <DataGridSelectableCell col={0} cellKey='q3'>Q3</DataGridSelectableCell>
          <DataGridSelectableCell col={1} cellKey='q4'>Q4</DataGridSelectableCell>
        </DataGridSelectableRow>
      </DataGridSelectableRowGroup>
    </DataGridSelectable>
  );
}
```
<!-- /example -->

## Обязательные части

- `DataGridSelectable`: корневой движок выбора и координатор активной ячейки
- `DataGridSelectableRowGroup`: область группировки строк
- `DataGridSelectableRow`: одна строка сетки
- `DataGridSelectableCell`: поверхность выбираемой ячейки

## Необязательные части

- собственный `apiRef`, функции сравнения, резолвер диапазона и карты отключённых ячеек для продвинутого поведения

## Порядок композиции

1. `DataGridSelectable`
2. `DataGridSelectableRowGroup`
3. `DataGridSelectableRow`
4. `DataGridSelectableCell`

## Варианты

- Выбор: `single`, `multiple`, `range`
- Циклическая навигация: `horizontal`, `vertical`, `both`
- Ограничения: `disabled`, `exclude`, `from`, `to`, собственные функции сравнения

## Связанные документы

- [Анатомия](./anatomy.md)
- [Примеры](./examples.md)
- [API](./api.md)
- [Стилизация](./styling.md)
- [Доступность](./accessibility.md)
- [Сравнение](./comparison.md)
- [Паттерны](./patterns.md)
- [Решение проблем](./troubleshooting.md)

## Пограничные случаи

- Расширение диапазона использует логику указателя и клавиатуры, которую стоит проверять на реальной форме сетки.
- `excludeDisabled` меняет то, как отключённые ячейки влияют на навигацию и вычисление диапазона.
- `from` и `to` ограничивают пространство выбора, а не только видимую раскладку.

## Частые ошибки

- Сложная семантика выбора без стабильной модели ключей.
- Забытый факт, что логика диапазона зависит от поведения `compare` и `resolveRange`.
- Отношение к компоненту как к презентационной сетке, а не как к движку выбора.
