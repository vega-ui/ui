# DataGridSelectable: стилизация

## Обзор

`DataGridSelectable` в основном отвечает за поведение. Его визуальный контракт задают `DataGrid` и собранные рендереры ячеек, а не отдельный корневой CSS-модуль.

## Публичные CSS-переменные

В текущей реализации нет отдельных публичных CSS-переменных `--data-grid-selectable-*`.

## Переменные частей

### Корень

Корень наследует раскладку и стили матрицы от `DataGrid`.

### Ячейки

Визуальное оформление выбора обычно задаётся через `DataGridSelectableCell` и любое собранное поверх него высокоуровневое содержимое ячейки.

## Взаимодействие состояний и вариантов

- Визуальные состояния «выбрано», «активно» и «отключено» зависят от собранного слоя ячеек.
- `DataGridSelectable` меняет поведение взаимодействия, а не семейство токенов темы.
- Высокоуровневые потребители, такие как `DataGridPicker`, `DayPicker` и `MonthPicker`, обычно задают публичную визуальную семантику.

## Примеры

### Собственная оболочка ячейки поверх поведения выбора

Схема мест, оформленная целиком снаружи: выбираемая ячейка отдаёт `aria-selected` и `aria-disabled`, а таблица стилей нацелена на них вместе с `:focus-visible`. Отключённые ячейки также получают `pointer-events: none`, как это делает `DataGridPickerItem`.

<!-- example: data-grid-selectable/custom-cell-shell-on-top-of-selectable-behavior.tsx -->
```tsx
import {
  DataGridSelectable,
  DataGridSelectableCell,
  DataGridSelectableRow,
  DataGridSelectableRowGroup,
} from '@vega-ui/react';
import './examples.css';

const rows = ['A', 'B', 'C'];
const seats = [1, 2, 3, 4, 5, 6];
const taken = ['A3', 'A4', 'B1', 'C6'];

export default function CustomCellShellOnTopOfSelectableBehavior() {
  return (
    <DataGridSelectable
      aria-label='Seats'
      aria-multiselectable='true'
      selection='multiple'
      disabled={taken}
      defaultSelected={['B3', 'B4']}
      defaultActive='B3'
      className='selectableGrid seatMap'
    >
      <DataGridSelectableRowGroup>
        {rows.map((row, rowIndex) => (
          <DataGridSelectableRow key={row} row={rowIndex}>
            {seats.map((seat, col) => (
              <DataGridSelectableCell key={seat} col={col} cellKey={`${row}${seat}`}>
                {`${row}${seat}`}
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

### Таблица стилей примеров

Общая для примеров DataGridSelectable.

<!-- example: data-grid-selectable/examples.css -->
```css
.selectableGrid {
  inline-size: fit-content;
  gap: var(--spacing-2);
  font-size: var(--font-size-2);
  color: var(--label-primary);
}

.selectableGrid [role='row'] {
  gap: var(--spacing-2);
  grid-auto-columns: minmax(64px, auto);
}

.selectableGrid [role='gridcell'],
.selectableGrid [role='columnheader'],
.selectableGrid [role='rowheader'] {
  min-block-size: var(--spacing-20);
  padding-inline: var(--spacing-4);
  border-radius: var(--radius-2);
}

.selectableGrid [role='gridcell'] {
  cursor: pointer;
  background: var(--fills-tertiary);
}

.selectableGrid [role='gridcell']:hover {
  background: var(--fills-tertiary-hover);
}

.selectableGrid [role='columnheader'],
.selectableGrid [role='rowheader'] {
  color: var(--label-secondary);
  font-weight: 500;
}

.selectableGrid [role='gridcell'][aria-selected='true'] {
  color: var(--color-white);
  background: var(--color-primary-500);
}

.selectableGrid [role='gridcell'][aria-disabled='true'] {
  cursor: not-allowed;
  color: var(--label-quaternary);
  background: transparent;
  text-decoration: line-through;
  pointer-events: none;
}

.selectableGrid [role='gridcell']:focus-visible {
  outline: 2px solid var(--focus-color);
  outline-offset: 2px;
}

.selectableGrid [role='rowheader'],
.selectableGrid [role='columnheader'] {
  display: flex;
  align-items: center;
}

.seatMap [role='row'] {
  grid-auto-columns: 36px;
}

.seatMap [role='gridcell'] {
  block-size: 36px;
  padding: 0;
  border-radius: var(--radius-2) var(--radius-2) var(--radius-1) var(--radius-1);
  border-block-end: 3px solid var(--separator-opaque);
}

.seatMap [role='gridcell'][aria-selected='true'] {
  border-block-end-color: var(--color-primary-700);
}

.selectableGrid:has([role='rowheader']) [role='row'] {
  grid-template-columns: var(--spacing-40);
}

.selectableGrid [role='rowheader'],
.selectableGrid:has([role='rowheader']) [role='columnheader']:first-child {
  padding-inline-start: 0;
}

.selectableGrid [role='columnheader'] {
  justify-content: center;
}

.selectableGrid:has([role='rowheader']) [role='columnheader']:first-child {
  justify-content: flex-start;
}
```
<!-- /example -->

## Чего не переопределять

- не придумывайте отдельный API токенов для выбираемой сетки, которого нет в исходном коде
- не смешивайте ожидания поведения с чисто визуальными переопределениями CSS
- не стилизуйте ячейки так, чтобы скрывалось активное, отключённое или выбранное состояние
