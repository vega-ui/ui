# DayPicker

## Профиль документа

`advanced interactive`

## Кратко

`DayPicker` — низкоуровневая подсистема сетки дней, на которой строится стек календаря. Она основана на `DataGridPicker`, поддерживает выбор одной даты, нескольких дат и диапазона и предоставляет части раскладки, строк, элементов и скроллера.

## Импорты

```tsx
import {
  DayPicker,
  DayPickerCell,
  DayPickerItem,
  DayPickerLayout,
  DayPickerRow,
  DayPickerRowGroup,
  DayPickerScroller,
  DayPickerScrollerContent,
  DayPickerScrollerLayout,
  createDayPickerGrid,
  useDayPickerCellContext,
  useDayPickerContext,
  useDayPickerScrollerContext,
  type DayPickerGridCell,
  type DayPickerGridOptions,
  type DayPickerGridRow,
  type DayPickerCellContextData,
  type DayPickerCellProps,
  type DayPickerItemProps,
  type DayPickerLayoutProps,
  type DayPickerProps,
  type DayPickerRowGroupProps,
  type DayPickerRowProps,
  type DayPickerScrollerContentProps,
  type DayPickerScrollerLayoutProps,
  type DayPickerScrollerProps,
} from '@vega-ui/react';
```

## Экспортируемые типы

- `DayPickerProps`
- `DayPickerLayoutProps`
- `DayPickerRowGroupProps`
- `DayPickerRowProps`
- `DayPickerItemProps`
- `DayPickerCellProps`
- `DayPickerCellContextData`
- `DayPickerScrollerProps`
- `DayPickerScrollerContentProps`
- `DayPickerScrollerLayoutProps`
- `DayPickerGridCell`, `DayPickerGridRow`, `DayPickerGridOptions`

## Минимальная композиция

<!-- example: day-picker/minimal-composition.tsx -->
```tsx
import { DayPicker, DayPickerCell, DayPickerLayout } from '@vega-ui/react';

export const locales = ['en-US', 'ru-RU', 'ar-EG', 'he-IL'];

export default function MinimalComposition({ locale = 'en-US' }: { locale?: string }) {
  return (
    <DayPicker aria-label='November 2026' locale={locale} month='2026-11-01'>
      <DayPickerLayout>
        <DayPickerCell />
      </DayPickerLayout>
    </DayPicker>
  );
}
```
<!-- /example -->

## Обязательные части

- `DayPicker`: корневая подсистема выбора дней

## Необязательные части

- `DayPickerLayout`
- `DayPickerRowGroup`
- `DayPickerRow`
- `DayPickerItem`
- `DayPickerCell`: ячейка, которая ставится шаблоном раскладок
- `DayPickerScroller`
- `DayPickerScrollerContent`
- `DayPickerScrollerLayout`

## Порядок композиции

1. `DayPicker`
2. либо `DayPickerLayout` с шаблоном ячейки в дочерних элементах (`<DayPickerCell />` или собственным), либо собственная композиция строк и элементов
3. необязательная обёртка-скроллер для постраничной навигации по месяцам

## Варианты

- Выбор: `single`, `multiple`, `range`
- Раскладка: статичная сетка или перелистывание месяцев на основе скроллера
- Период: явный `month` (строка `YYYY-MM-DD` любого дня в нём) или текущий месяц
- Локаль и календарная система: пропсы `locale` и `calendar`, по умолчанию — локаль окружения и григорианский календарь

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

- Включение дней соседних месяцев меняет и визуальную плотность, и поведение выбора.
- Отключённые, выбранные, исключённые и сфокусированные даты должны оставаться различимыми.
- Прокручиваемое перелистывание месяцев добавляет ещё один слой синхронизации состояния видимого периода.
- Ключи ячеек (`selected`, `from`, `to`, `disabled`, `active`) — дни `YYYY-MM-DD` в любой календарной системе; от `calendar` зависят только форма сетки и подписи.

## Частые ошибки

- Математика сетки дат пишется заново вместо использования `createDayPickerGrid`.
- Передаются числовые годы, месяцы с отсчётом от нуля или временные метки вместо строк `YYYY-MM-DD`.
- Видимость выбора теряется в собственном рендере `DayPickerItem`.
- Компонент используется как готовый календарь, а не как низкоуровневая подсистема выбора.
