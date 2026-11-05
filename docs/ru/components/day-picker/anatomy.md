# DayPicker: анатомия

## Обзор

`DayPicker` оборачивает `DataGridPicker` и добавляет контекст, специфичный для сетки дней: видимый `month` (первый день в виде строки `YYYY-MM-DD`) и календарную систему `calendar`. Раскладка может быть статичной или на основе скроллера.

## Обязательные части

### `DayPicker`

Обязательная часть. Отвечает за режим выбора в сетке дней и контекст видимого периода.

## Необязательные части

### `DayPickerLayout`

Необязательный стандартный рендерер сетки дней.

### `DayPickerCell`

Шаблон ячейки. Дочерние элементы `DayPickerLayout` и `DayPickerScrollerLayout` обязательны и рендерятся по разу на каждый день внутри контекста ячейки, который читается через `useDayPickerCellContext()`; обычно это `<DayPickerCell />`. Помещайте собственное содержимое внутрь `DayPickerCell`, чтобы сохранить состояния выбора, фокуса и отключения.

### `DayPickerRowGroup`, `DayPickerRow`, `DayPickerItem`

Необязательные низкоуровневые части для композиции сетки.

### `DayPickerScroller`, `DayPickerScrollerContent`, `DayPickerScrollerLayout`

Необязательная инфраструктура перелистывания на основе скроллера для навигации по месяцам.

## Порядок композиции

1. `DayPicker`
2. необязательный слой скроллера
3. либо `DayPickerLayout`, либо собственная композиция строк и элементов

## Допустимые варианты композиции

Композиция со скроллером: `DayPickerScroller` › `DayPickerScrollerContent` › `DayPickerScrollerLayout` › шаблон ячейки внутри `DayPicker`. Скроллер начинается с `month` корня и прокручивается к нему при изменении, поэтому храните `month` в состоянии и обновляйте его из `onChangePeriod` — тогда корень всегда знает видимый месяц.

<!-- example: day-picker/valid-composition-patterns.tsx -->
```tsx
import {
  DayPicker,
  DayPickerCell,
  DayPickerScroller,
  DayPickerScrollerContent,
  DayPickerScrollerLayout,
} from '@vega-ui/react';
import { useState } from 'react';

export default function ValidCompositionPatterns() {
  const [month, setMonth] = useState('2026-11-01');

  return (
    <DayPicker aria-label='Days' locale='en-US' month={month}>
      <DayPickerScroller onChangePeriod={setMonth}>
        <DayPickerScrollerContent>
          <DayPickerScrollerLayout includeOverflowDays>
            <DayPickerCell />
          </DayPickerScrollerLayout>
        </DayPickerScrollerContent>
      </DayPickerScroller>
    </DayPicker>
  );
}
```
<!-- /example -->

## Недопустимые варианты композиции

### Собственная математика сетки вместо вспомогательных функций

Логика выбора и исключённых дней может разойтись с задуманным поведением календаря.

### Композиция скроллера без согласованного контракта сопоставления периода

Видимый и отрендеренный месяцы становится трудно держать согласованными.
