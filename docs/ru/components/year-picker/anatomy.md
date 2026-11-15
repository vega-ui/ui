# YearPicker: анатомия

## Обзор

`YearPicker` оборачивает `Grid` для значений-лет и может рендерить либо статичные сетки лет, либо постраничные диапазоны лет на основе скроллера.

## Обязательные части

### `YearPicker`

Обязательная. Отвечает за поведение выбора года и год в фокусе, который определяет видимую страницу.

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

Композиция со скроллером: `YearPickerScroller` › `YearPickerScrollerContent` › `YearPickerScrollerLayout` › шаблон ячейки внутри `YearPicker`. Страницы начинаются с первого года в фокусе, а прокрутка на другую страницу переносит туда фокус, поэтому корень всегда знает видимую страницу. `onChangePeriod` нужен только для подписи страницы.

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
    <YearPicker aria-label='Year' locale='en-US' focusedDate={year} onChangeFocusedDate={setYear}>
      <YearPickerScroller>
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

### `period` отличается от размера страницы раскладки

Пользователь видит один период, а логика перелистывания считает, что находится на другом.

### Собственные раскладки, игнорирующие готовые хелперы для лет

Становится сложнее сохранить правильный порядок лет и семантику перелистывания.
