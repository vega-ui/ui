# DataGridPicker: стилизация

## Обзор

`DataGridPicker` добавляет визуальный слой пикера поверх `DataGridSelectable`. У самого корня мало собственного CSS, но элементы пикера и составные обёртки используют контекст размера и варианта пикера.

## Публичные CSS-переменные

| Переменная | Где используется | Назначение |
| --- | --- | --- |
| `--data-grid-picker-item-size` | `DataGridPickerItem` | Размер элемента. |
| `--data-grid-picker-item-br-ratio` | `DataGridPickerItem` | Коэффициент радиуса элемента. |
| `--picker-item-color` | `DataGridPickerItem` | Цвет текста элемента. |
| `--picker-item-background-color` | `DataGridPickerItem` | Фон элемента. |
| `--picker-item-background-color-hover` | `DataGridPickerItem` | Фон элемента при наведении. |
| `--picker-item-background-color-active` | `DataGridPickerItem` | Фон элемента при нажатии. |
| `--picker-item-selected-color` | `DataGridPickerItem` | Цвет текста выбранного элемента. |
| `--picker-item-selected-background-color` | `DataGridPickerItem` | Фон выбранного элемента. |
| `--picker-item-selected-background-color-hover` | `DataGridPickerItem` | Фон выбранного элемента при наведении. |
| `--picker-item-selected-background-color-active` | `DataGridPickerItem` | Фон выбранного элемента при нажатии. |
| `--picker-item-range-background-color` | `DataGridPickerItem` | Фон элементов внутри выбранного диапазона. |
| `--picker-item-range-background-color-hover` | `DataGridPickerItem` | Фон элемента диапазона при наведении. |
| `--picker-item-range-background-color-active` | `DataGridPickerItem` | Фон элемента диапазона при нажатии. |

## Переменные уровня частей

### Корень

Корень в основном предоставляет контекст пикера, а не служит насыщенной поверхностью для стилизации.

### Элементы

`DataGridPickerItem` и связанные составные обёртки выражают видимую семантику пикера: внешний вид активного, выбранного и отключённого состояний.

## Взаимодействие состояний и вариантов

- `size` и `variant` передаются дочерним частям через контекст пикера.
- Визуальное выбранное и активное состояния зависят от слоя элементов пикера.
- Композиция со скроллером меняет макет и постраничный вывод, но не базовое семейство цветов.

## Примеры

### Матрица пикера в фирменных цветах

`variant='primary'` переключает цвет выбранного элемента на фирменную палитру, а `size='lg'` увеличивает все элементы через контекст. Каждый элемент читает `--data-grid-picker-item-size` и `--data-grid-picker-item-br-ratio` со своего узла, поэтому круглая форма задаётся на элементах, а не на корне.

<!-- example: data-grid-picker/brand-colored-picker-matrix.tsx -->
```tsx
import { type CSSProperties } from 'react';
import {
  DataGridPicker,
  DataGridPickerItem,
  DataGridPickerRow,
  DataGridPickerRowGroup,
} from '@vega-ui/react';

const amounts = [[5, 10, 15], [20, 50, 100]];
const roundItem = { '--data-grid-picker-item-br-ratio': 0.5 } as CSSProperties;

export default function BrandColoredPickerMatrix() {
  return (
    <DataGridPicker
      aria-label='Tip amount, USD'
      variant='primary'
      size='lg'
      defaultSelected={15}
      defaultActive={15}
      style={{ width: 240 }}
    >
      <DataGridPickerRowGroup>
        {amounts.map((row, rowIndex) => (
          <DataGridPickerRow key={rowIndex} row={rowIndex}>
            {row.map((amount, col) => (
              <DataGridPickerItem key={amount} col={col} value={amount} style={roundItem}>${amount}</DataGridPickerItem>
            ))}
          </DataGridPickerRow>
        ))}
      </DataGridPickerRowGroup>
    </DataGridPicker>
  );
}
```
<!-- /example -->

## Что не переопределять

- не придумывайте отдельный API токенов корня, которого нет в исходниках
- не стилизуйте ячейки пикера так, чтобы скрывались активное, выбранное или отключённое состояния
- не превращайте `scope` макета и логику постраничного вывода в задачи CSS
