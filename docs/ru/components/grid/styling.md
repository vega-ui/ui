# Grid: стилизация

## Обзор

Стилизация `Grid` намеренно минимальна. Основная сложность — в поведении и композиции, а не в большом наборе локальных переменных компонента.

## Публичные CSS-переменные

У корня и `GridCell` нет собственных переменных; стили в основном задаются содержимым ячеек и строк, а также окружающей раскладкой. `GridItem`, вид ячейки пикера, предоставляет набор `--grid-item-*`.

| Переменная | Где используется | Назначение |
| --- | --- | --- |
| свойства раскладки сетки | корень сетки | общий поток строк |
| локальные стили ячеек | `GridCell` | ширина, высота, локальные отступы |
| `--grid-item-size` | `GridItem` | Высота и минимальная ширина элемента с учётом отступов. |
| `--grid-item-br-ratio` | `GridItem` | Коэффициент радиуса элемента. |
| `--grid-item-color` | `GridItem` | Цвет текста элемента. |
| `--grid-item-background-color` | `GridItem` | Фон элемента. |
| `--grid-item-background-color-hover` | `GridItem` | Фон элемента при наведении. |
| `--grid-item-background-color-active` | `GridItem` | Фон элемента при нажатии. |
| `--grid-item-selected-color` | `GridItem` | Цвет текста выбранного элемента. |
| `--grid-item-selected-background-color` | `GridItem` | Фон выбранного элемента. |
| `--grid-item-selected-background-color-hover` | `GridItem` | Фон выбранного элемента при наведении. |
| `--grid-item-selected-background-color-active` | `GridItem` | Фон выбранного элемента при нажатии. |
| `--grid-item-range-background-color` | `GridItem` | Фон элементов внутри выбранного диапазона. |
| `--grid-item-range-background-color-hover` | `GridItem` | Фон элемента диапазона при наведении. |
| `--grid-item-range-background-color-active` | `GridItem` | Фон элемента диапазона при нажатии. |

## Переменные частей

### Корень

[Стили Grid](../../../../packages/ui/src/Grid/style.module.css) для корня объявляют только базовую раскладку сетки.

### Ячейки

Основная визуальная настройка происходит на уровне ячеек — через локальные стили или кастомное дочернее содержимое, а не через задокументированные переменные корня.

### Элементы

`GridItem` оформляет атрибуты `aria-selected`, `aria-disabled` и `data-range`, которые получает от `<GridCell asChild>`. `size` и `variant` задаются на каждом элементе; пикеры дат передают своим элементам собственные `size` и `variant`. Каждый элемент читает `--grid-item-size` и `--grid-item-br-ratio` со своего узла, поэтому задавайте их на элементах, а не на корне.

## Взаимодействие состояний и вариантов

- перенос и исключения — контракты поведения, а не варианты стилизации
- видимость активной ячейки больше зависит от содержимого и стилей фокуса, чем от токенов корня
- при `selection` ячейки отдают `aria-selected`, а отключённые — `aria-disabled`; своего вида выбранной ячейки у `GridCell` нет, поэтому стилизуйте эти атрибуты или поместите внутрь `GridItem`
- в диапазоне `GridCell` ставит `data-range`: `start`, `between` или `end`
- композиция со скроллером меняет раскладку и постраничный вывод, но не цвета элементов

## Примеры

### Настройка размера ячеек в месте использования

Фиксированные ячейки 44px задаются в месте использования: строка задаёт `grid-auto-columns`, ячейка — свою высоту, а `:focus-visible` сохраняет видимость активной ячейки. Классы описаны в таблице стилей примеров ниже.

<!-- example: grid/cell-size-tuning-at-usage-site.tsx -->
```tsx
import {
  Grid,
  GridCell,
  GridRow,
  GridRowGroup,
} from '@vega-ui/react';
import './examples.css';

const keys = [['7', '8', '9'], ['4', '5', '6'], ['1', '2', '3']];

export default function CellSizeTuningAtUsageSite() {
  return (
    <Grid aria-label='Keypad' defaultActive='1:1' className='gridSheet gridCompact'>
      <GridRowGroup>
        {keys.map((row, rowIndex) => (
          <GridRow key={row[0]} row={rowIndex}>
            {row.map((key, col) => (
              <GridCell key={key} col={col}>{key}</GridCell>
            ))}
          </GridRow>
        ))}
      </GridRowGroup>
    </Grid>
  );
}
```
<!-- /example -->

### Собственная оболочка ячейки поверх поведения выбора

Схема мест, оформленная целиком снаружи: при `selection` ячейка отдаёт `aria-selected` и `aria-disabled`, а таблица стилей нацелена на них вместе с `:focus-visible`. Отключённые ячейки также получают `pointer-events: none`, как это делает `GridItem`.

<!-- example: grid/custom-cell-shell-on-top-of-selectable-behavior.tsx -->
```tsx
import {
  Grid,
  GridCell,
  GridRow,
  GridRowGroup,
} from '@vega-ui/react';
import './examples.css';

const rows = ['A', 'B', 'C'];
const seats = [1, 2, 3, 4, 5, 6];
const taken = ['A3', 'A4', 'B1', 'C6'];

export default function CustomCellShellOnTopOfSelectableBehavior() {
  return (
    <Grid
      aria-label='Seats'
      selection='multiple'
      disabled={taken}
      defaultValue={['B3', 'B4']}
      defaultActive='B3'
      className='selectableGrid seatMap'
    >
      <GridRowGroup>
        {rows.map((row, rowIndex) => (
          <GridRow key={row} row={rowIndex}>
            {seats.map((seat, col) => (
              <GridCell key={seat} col={col} value={`${row}${seat}`}>
                {`${row}${seat}`}
              </GridCell>
            ))}
          </GridRow>
        ))}
      </GridRowGroup>
    </Grid>
  );
}
```
<!-- /example -->

### Матрица пикера в фирменных цветах

`variant='primary'` переключает цвет выбранного элемента на фирменную палитру, а `size='lg'` увеличивает элементы. Круглая форма задаётся через `--grid-item-br-ratio` на каждом `GridItem`.

<!-- example: grid/brand-colored-picker-matrix.tsx -->
```tsx
import { type CSSProperties } from 'react';
import {
  Grid,
  GridCell,
  GridItem,
  GridRow,
  GridRowGroup,
} from '@vega-ui/react';

const amounts = [[5, 10, 15], [20, 50, 100]];
const roundItem = { '--grid-item-br-ratio': 0.5 } as CSSProperties;

export default function BrandColoredPickerMatrix() {
  return (
    <Grid
      aria-label='Tip amount, USD'
      selection='single'
      wrap='horizontal'
      defaultValue={15}
      defaultActive={15}
      style={{ width: 240 }}
    >
      <GridRowGroup>
        {amounts.map((row, rowIndex) => (
          <GridRow key={rowIndex} row={rowIndex}>
            {row.map((amount, col) => (
              <GridCell key={amount} col={col} value={amount} asChild>
                <GridItem variant='primary' size='lg' style={roundItem}>${amount}</GridItem>
              </GridCell>
            ))}
          </GridRow>
        ))}
      </GridRowGroup>
    </Grid>
  );
}
```
<!-- /example -->

### Таблица стилей примеров

Общая для примеров Grid: рамки, оформление заголовков, кольцо фокуса, приглушённый вид исключённых ячеек, липкая строка заголовков и вид выбранных и отключённых ячеек в примерах выбора.

<!-- example: grid/examples.css -->
```css
.gridSheet {
  border: 1px solid var(--separator-opaque);
  border-radius: var(--radius-3);
  overflow: hidden;
  background: var(--surface-primary);
  font-size: var(--font-size-2);
  font-variant-numeric: tabular-nums;
  color: var(--label-primary);
}

.gridSheet [role='row'] + [role='row'] {
  border-block-start: 1px solid var(--separator-non-opaque);
}

.gridSheet [role='gridcell'],
.gridSheet [role='columnheader'],
.gridSheet [role='rowheader'] {
  min-block-size: var(--spacing-20);
  padding-inline: var(--spacing-4);
  outline-offset: -2px;
}

.gridSheet [role='columnheader'],
.gridSheet [role='rowheader'] {
  color: var(--label-secondary);
  font-weight: 500;
}

.gridSheet [role='rowheader'],
.gridSheetWideFirst [role='columnheader']:first-child {
  justify-content: flex-start;
}

.gridSheet :focus-visible {
  outline: 2px solid var(--focus-color);
}

.gridSheet [aria-disabled='true'] {
  color: var(--label-quaternary);
  background: var(--fills-quaternary);
}

.gridSheetWideFirst [role='row'] {
  grid-template-columns: 120px;
}

.gridScroll {
  max-block-size: 280px;
  overflow: auto;
  scroll-padding-block-start: var(--spacing-20);
}

.gridStickyRow {
  position: sticky;
  inset-block-start: 0;
  z-index: 1;
  background: var(--surface-primary);
}

.gridDays {
  inline-size: fit-content;
}

.gridDays [role='gridcell'],
.gridDays [role='rowheader'] {
  min-block-size: var(--spacing-14);
  padding: 0;
  font-size: var(--font-size-1);
}

.gridDays [role='rowheader'] {
  padding-inline: var(--spacing-4);
}

.gridDays [role='row'] {
  grid-auto-columns: var(--spacing-14);
  grid-template-columns: var(--spacing-24);
}

.gridCompact {
  inline-size: fit-content;
}

.gridCompact [role='row'] {
  grid-auto-columns: 44px;
}

.gridCompact [role='gridcell'] {
  block-size: 44px;
  padding: 0;
}

.gridScrollX {
  overflow-x: auto;
  scroll-padding-inline-start: var(--spacing-24);
  border: 1px solid var(--separator-opaque);
  border-radius: var(--radius-3);
}

.gridScrollX .gridSheet {
  overflow: visible;
  border: none;
  border-radius: 0;
}

.gridDays [role='rowheader'] {
  position: sticky;
  inset-inline-start: 0;
  z-index: 1;
  background: var(--surface-primary);
}

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
  justify-content: flex-start;
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

.gridTable {
  inline-size: min(100%, 480px);
  border-spacing: 0;
}

.gridTable th,
.gridTable td {
  block-size: var(--spacing-20);
  text-align: start;
  vertical-align: middle;
}

.gridTable thead th {
  padding-inline: var(--spacing-2);
}

.gridTable tbody > tr > * {
  border-block-start: 1px solid var(--separator-non-opaque);
}

.gridTable .gridNumeric {
  text-align: end;
}

.gridEditable [role='gridcell'] {
  padding-inline: var(--spacing-2);
}

.gridEditable .gridNumeric {
  justify-content: flex-end;
  padding-inline: var(--spacing-4);
}

.gridCellInput {
  inline-size: 100%;
  min-inline-size: 0;
  block-size: var(--spacing-14);
  padding-inline: var(--spacing-2);
  border: 0;
  border-radius: var(--radius-2);
  background: transparent;
  color: inherit;
  font: inherit;
  text-align: end;
}

.gridCellInput:hover {
  background: var(--fills-quaternary);
}

.symbolPalette {
  inline-size: 100%;
}

.symbolPalette [role='row'] {
  grid-auto-columns: 1fr;
}

.symbolPalette button {
  border: 0;
  color: inherit;
  font: inherit;
  font-size: var(--font-size-4);
}

.calculator {
  display: grid;
  gap: var(--spacing-6);
  inline-size: min(100%, 280px);
  padding: var(--spacing-6);
  border: 1px solid var(--separator-opaque);
  border-radius: var(--radius-4);
  background: var(--surface-primary);
}

.calculatorScreen {
  display: grid;
  justify-items: end;
  gap: var(--spacing-1);
  padding-inline: var(--spacing-2);
  font-variant-numeric: tabular-nums;
}

.calculatorExpression {
  min-block-size: 1lh;
  font-size: var(--font-size-2);
  color: var(--label-secondary);
  white-space: pre;
}

.calculatorDisplay {
  max-inline-size: 100%;
  overflow: hidden;
  font-size: var(--font-size-7);
  font-weight: 500;
  color: var(--label-primary);
  text-overflow: ellipsis;
}

.calculatorKeys [role='rowgroup'] {
  display: grid;
  gap: var(--spacing-3);
}

.calculatorKeys [role='row'] {
  gap: var(--spacing-3);
  grid-auto-columns: 1fr;
}

.calculatorKeys button {
  block-size: var(--spacing-24);
  border: 0;
  border-radius: var(--radius-3);
  background: var(--fills-tertiary);
  color: var(--label-primary);
  font: inherit;
  font-size: var(--font-size-4);
  font-variant-numeric: tabular-nums;
  cursor: pointer;
}

.calculatorKeys button:hover {
  background: var(--fills-tertiary-hover);
}

.calculatorKeys button:focus-visible {
  outline: 2px solid var(--focus-color);
  outline-offset: 2px;
}

.calculatorKeys [data-kind='function'] {
  color: var(--label-secondary);
}

.calculatorKeys [data-kind='operator'] {
  color: var(--color-primary-500);
}

.calculatorKeys [data-kind='equals'] {
  background: var(--color-primary-500);
  color: var(--color-white);
}

.calculatorKeys [data-kind='equals']:hover {
  background: var(--color-primary-600);
}

.teamAccess [role='row'] {
  grid-template-columns: 44px minmax(96px, 1fr) 132px 72px 64px 80px;
}

.teamAccess [role='rowheader'],
.teamAccess [role='columnheader']:nth-child(2) {
  justify-content: flex-start;
  color: var(--label-primary);
}

.teamAccessRole > * {
  flex: 1;
}

.teamAccess [role='combobox'] {
  inline-size: 100%;
}

.teamAccessActions {
  gap: var(--spacing-1);
}
```
<!-- /example -->

## Не переопределяйте

- не выдумывайте незадокументированные хуки `--grid-*`, как будто это публичный API; публичны только `--grid-item-*` у `GridItem`
- не превращайте логику постраничного вывода в задачу CSS
- не перестилизовывайте ячейки настолько агрессивно, что пропадает видимость активной ячейки
- не скрывайте выбранное или отключённое состояние ячеек
