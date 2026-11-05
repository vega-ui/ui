# YearPicker: анатомия

## Обзор

`YearPicker` оборачивает `DataGridPicker` для значений-лет и может рендерить либо статичные сетки лет, либо постраничные диапазоны лет на основе скроллера.

## Обязательные части

### `YearPicker`

Обязательная. Отвечает за поведение выбора года и контекст видимого года.

## Необязательные части

### `YearPickerLayout`

Необязательный стандартный рендерер сетки лет.

### `YearPickerCell`

Шаблон ячейки. Дочерние элементы `YearPickerLayout` и `YearPickerScrollerLayout` обязательны и рендерятся по одному разу на каждый год внутри контекста ячейки, который читается через `useYearPickerCellContext()`; обычно это `<YearPickerCell />`. Размещайте собственное содержимое внутри `YearPickerCell`, чтобы сохранить состояния выбора, фокуса и отключения.

### `YearPickerRowGroup`, `YearPickerRow`, `YearPickerItem`

Необязательные низкоуровневые части для композиции сетки.

### `YearPickerScroller`, `YearPickerScrollerContent`, `YearPickerScrollerLayout`

Необязательная инфраструктура скроллера для постраничных диапазонов лет.

## Порядок композиции

1. `YearPicker`
2. необязательный слой скроллера
3. либо `YearPickerLayout`, либо собственная композиция из строк и элементов

## Корректные паттерны композиции

Композиция со скроллером: `YearPickerScroller` › `YearPickerScrollerContent` › `YearPickerScrollerLayout` › шаблон ячейки внутри `YearPicker`. Храните `year` в состоянии и обновляйте его из `onChangePeriod`, чтобы корень всегда знал видимую страницу.

<!-- example: year-picker/valid-composition-patterns.tsx -->
```tsx
import {
  YearPicker,
  YearPickerCell,
  YearPickerScroller,
  YearPickerScrollerContent,
  YearPickerScrollerLayout,
} from '@vega-ui/react';
import { useState } from 'react';

export default function ValidCompositionPatterns() {
  const [year, setYear] = useState('2026-01-01');

  return (
    <YearPicker aria-label='Year' locale='en-US' year={year}>
      <YearPickerScroller onChangePeriod={setYear}>
        <YearPickerScrollerContent>
          <YearPickerScrollerLayout>
            <YearPickerCell />
          </YearPickerScrollerLayout>
        </YearPickerScrollerContent>
      </YearPickerScroller>
    </YearPicker>
  );
}
```
<!-- /example -->

## Некорректные паттерны композиции

### `period` скроллера отличается от размера страницы раскладки

Пользователь видит один период, а логика перелистывания считает, что находится на другом.

### Собственные раскладки, игнорирующие готовые хелперы для лет

Становится сложнее сохранить правильный порядок лет и семантику перелистывания.
