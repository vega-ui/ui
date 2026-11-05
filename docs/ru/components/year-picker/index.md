# YearPicker

## Профиль документа

`advanced interactive`

## Кратко

`YearPicker` — подсистема выбора года в семействе календарей. Он построен на `DataGridPicker`, поддерживает статичные сетки лет и сетки на основе скроллера и перелистывает годы группами фиксированного размера (`period`, по умолчанию `12`) для навигации, похожей на переход по десятилетиям.

## Импорт

```tsx
import {
  YearPicker,
  YearPickerCell,
  YearPickerItem,
  YearPickerLayout,
  YearPickerRow,
  YearPickerRowGroup,
  YearPickerScroller,
  YearPickerScrollerContent,
  YearPickerScrollerLayout,
  createYearPickerGrid,
  useYearPickerCellContext,
  useYearPickerContext,
  useYearPickerScrollerContext,
  type YearPickerCellContextData,
  type YearPickerCellProps,
  type YearPickerItemProps,
  type YearPickerLayoutProps,
  type YearPickerProps,
  type YearPickerRowGroupProps,
  type YearPickerRowProps,
  type YearPickerScrollerContentProps,
  type YearPickerScrollerLayoutProps,
  type YearPickerScrollerProps,
} from '@vega-ui/react';
```

## Экспортируемые типы

- `YearPickerProps`
- `YearPickerLayoutProps`
- `YearPickerRowGroupProps`
- `YearPickerRowProps`
- `YearPickerItemProps`
- `YearPickerCellProps`
- `YearPickerCellContextData`
- `YearPickerScrollerProps`
- `YearPickerScrollerContentProps`
- `YearPickerScrollerLayoutProps`

## Минимальная композиция

<!-- example: year-picker/minimal-composition.tsx -->
```tsx
import { YearPicker, YearPickerCell, YearPickerLayout } from '@vega-ui/react';

export const locales = ['en-US', 'ru-RU', 'ar-EG', 'he-IL'];

export default function MinimalComposition({ locale = 'en-US' }: { locale?: string }) {
  return (
    <YearPicker aria-label='Year' locale={locale} year='2026-01-01' style={{ width: '100%' }}>
      <YearPickerLayout>
        <YearPickerCell />
      </YearPickerLayout>
    </YearPicker>
  );
}
```
<!-- /example -->

## Обязательные части

- `YearPicker`: корневая подсистема выбора года

## Необязательные части

- `YearPickerLayout`
- `YearPickerRowGroup`
- `YearPickerRow`
- `YearPickerItem`
- `YearPickerCell`: ячейка, размещаемая как шаблон раскладок
- `YearPickerScroller`
- `YearPickerScrollerContent`
- `YearPickerScrollerLayout`

## Порядок композиции

1. `YearPicker`
2. либо `YearPickerLayout` с шаблоном ячейки в дочерних элементах (`<YearPickerCell />` или собственным), либо собственная композиция из строк и элементов
3. необязательный слой скроллера для постраничных диапазонов лет

## Варианты

- Выбор: `single`, `multiple`, `range`
- Раскладка: статичная сетка или перелистывание лет на основе скроллера
- Период: явно заданный видимый `year` (строка `YYYY-MM-DD` любого дня этого года) или текущий год
- Локаль и календарная система: пропсы `locale` и `calendar`, по умолчанию — локаль среды выполнения и григорианский календарь; эры обрабатывает адаптер

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

- Большие диапазоны лет требуют дополнительной проверки фокуса, перелистывания и видимого контекста.
- `year` управляет видимым периодом, а не только выбором.
- В режиме скроллера перелистывание идёт по `period` лет; `period`, отличающийся от `rows × cols` раскладки, показывает неправильный диапазон.

## Типичные ошибки

- Неограниченные диапазоны лет без проверки удобства использования.
- Рассогласование правил родительского календаря и границ пикера лет.
- Низкоуровневый пикер лет там, где понятнее было бы переключение режимов календаря на более высоком уровне.
