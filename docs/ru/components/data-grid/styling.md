# DataGrid: стилизация

## Обзор

Стилизация `DataGrid` намеренно минимальна. Основная сложность — в поведении и композиции, а не в большом наборе локальных переменных компонента.

## Публичные CSS-переменные

Текущая реализация корня не предоставляет стабильного набора переменных `--data-grid-*`. Стили в основном задаются содержимым ячеек и строк, а также окружающей раскладкой.

| Переменная | Где используется | Назначение |
| --- | --- | --- |
| свойства раскладки сетки | корень сетки | общий поток строк |
| локальные стили ячеек | `DataGridCell` | ширина, высота, локальные отступы |

## Переменные частей

### Корень

[Стили DataGrid](../../../../packages/ui/src/DataGrid/style.module.css) для корня объявляют только базовую раскладку сетки.

### Ячейки

Основная визуальная настройка происходит на уровне ячеек — через локальные стили или кастомное дочернее содержимое, а не через задокументированные переменные корня.

## Взаимодействие состояний и вариантов

- перенос и исключения — контракты поведения, а не варианты стилизации
- видимость активной ячейки больше зависит от содержимого и стилей фокуса, чем от токенов корня

## Примеры

### Настройка размера ячеек в месте использования

Фиксированные ячейки 44px задаются в месте использования: строка задаёт `grid-auto-columns`, ячейка — свою высоту, а `:focus-visible` сохраняет видимость активной ячейки. Классы описаны в таблице стилей примеров ниже.

<!-- example: data-grid/cell-size-tuning-at-usage-site.tsx -->
```tsx
import {
  DataGrid,
  DataGridCell,
  DataGridRow,
  DataGridRowGroup,
} from '@vega-ui/react';
import './examples.css';

const keys = [['7', '8', '9'], ['4', '5', '6'], ['1', '2', '3']];

export default function CellSizeTuningAtUsageSite() {
  return (
    <DataGrid aria-label='Keypad' defaultActive='1:1' className='dataGridSheet dataGridCompact'>
      <DataGridRowGroup>
        {keys.map((row, rowIndex) => (
          <DataGridRow key={row[0]} row={rowIndex}>
            {row.map((key, col) => (
              <DataGridCell key={key} col={col}>{key}</DataGridCell>
            ))}
          </DataGridRow>
        ))}
      </DataGridRowGroup>
    </DataGrid>
  );
}
```
<!-- /example -->

### Таблица стилей примеров

Общая для примеров DataGrid: рамки, оформление заголовков, кольцо фокуса, приглушённый вид исключённых ячеек и липкая строка заголовков.

<!-- example: data-grid/examples.css -->
```css
.dataGridSheet {
  border: 1px solid var(--separator-opaque);
  border-radius: var(--radius-3);
  overflow: hidden;
  background: var(--surface-primary);
  font-size: var(--font-size-2);
  font-variant-numeric: tabular-nums;
  color: var(--label-primary);
}

.dataGridSheet [role='row'] + [role='row'] {
  border-block-start: 1px solid var(--separator-non-opaque);
}

.dataGridSheet [role='gridcell'],
.dataGridSheet [role='columnheader'],
.dataGridSheet [role='rowheader'] {
  min-block-size: var(--spacing-20);
  padding-inline: var(--spacing-4);
  outline-offset: -2px;
}

.dataGridSheet [role='columnheader'],
.dataGridSheet [role='rowheader'] {
  color: var(--label-secondary);
  font-weight: 500;
}

.dataGridSheet [role='rowheader'],
.dataGridSheetWideFirst [role='columnheader']:first-child {
  justify-content: flex-start;
}

.dataGridSheet :focus-visible {
  outline: 2px solid var(--focus-color);
}

.dataGridSheet [aria-disabled='true'] {
  color: var(--label-quaternary);
  background: var(--fills-quaternary);
}

.dataGridSheetWideFirst [role='row'] {
  grid-template-columns: 120px;
}

.dataGridScroll {
  max-block-size: 280px;
  overflow: auto;
  scroll-padding-block-start: var(--spacing-20);
}

.dataGridStickyRow {
  position: sticky;
  inset-block-start: 0;
  z-index: 1;
  background: var(--surface-primary);
}

.dataGridDays {
  inline-size: fit-content;
}

.dataGridDays [role='gridcell'],
.dataGridDays [role='rowheader'] {
  min-block-size: var(--spacing-14);
  padding: 0;
  font-size: var(--font-size-1);
}

.dataGridDays [role='rowheader'] {
  padding-inline: var(--spacing-4);
}

.dataGridDays [role='row'] {
  grid-auto-columns: var(--spacing-14);
  grid-template-columns: var(--spacing-24);
}

.dataGridCompact {
  inline-size: fit-content;
}

.dataGridCompact [role='row'] {
  grid-auto-columns: 44px;
}

.dataGridCompact [role='gridcell'] {
  block-size: 44px;
  padding: 0;
}

.dataGridScrollX {
  overflow-x: auto;
  scroll-padding-inline-start: var(--spacing-24);
  border: 1px solid var(--separator-opaque);
  border-radius: var(--radius-3);
}

.dataGridScrollX .dataGridSheet {
  overflow: visible;
  border: none;
  border-radius: 0;
}

.dataGridDays [role='rowheader'] {
  position: sticky;
  inset-inline-start: 0;
  z-index: 1;
  background: var(--surface-primary);
}
```
<!-- /example -->

## Не переопределяйте

- не выдумывайте незадокументированные хуки `--data-grid-*`, как будто это публичный API
- не перестилизовывайте ячейки настолько агрессивно, что пропадает видимость активной ячейки
