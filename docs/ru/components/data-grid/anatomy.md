# DataGrid: анатомия

## Обзор

`DataGrid` отвечает за модель активной ячейки, поведение переноса, логику исключений и навигацию с клавиатуры по строкам и ячейкам.

## Обязательные части

### `DataGrid`

Корневой провайдер, координирующий активную ячейку.

### `DataGridRowGroup`

Группирующий контейнер для строк.

### `DataGridRow`

Единица регистрации строки.

### `DataGridCell`

Единица регистрации ячейки и навигации.

## Необязательные части

### Контролируемое состояние активной ячейки

Для более сложных продуктовых сценариев активной ячейкой может владеть родитель.

### Интерактивное дочернее содержимое

Допускается, но его нужно тщательно проверять на совместимость с моделью клавиатуры.

### `apiRef`

Необязательный императивный мост для продвинутой координации сетки.

## Порядок композиции

Типичная композиция:

1. `DataGrid`
2. `DataGridRowGroup`
3. `DataGridRow`
4. `DataGridCell`

## Корректные варианты композиции

Дайте сетке доступное имя и начальный ключ `defaultActive` (или контролируемый `active`). Без него ни у одной ячейки нет `tabindex='0'`, и до сетки нельзя добраться клавишей `Tab`.

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

## Некорректные варианты композиции

### Ячейки без соответствующей структуры строк или столбцов

Это ломает допущения навигации и расчёт активной ячейки.

### Разреженная раскладка без логики исключений

Модель клавиатуры может по-прежнему пытаться проходить через визуальные пробелы.

### `DataGrid` как чисто визуальная таблица

`DataGrid` — система навигации с клавиатуры, а не просто примитив раскладки.
