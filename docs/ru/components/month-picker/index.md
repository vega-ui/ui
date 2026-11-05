# MonthPicker

## Профиль документа

`compound`

## Кратко

`MonthPicker` — подсистема выбора месяца в виде сетки, которую используют напрямую или как часть семейства календарей. Он построен на `DataGridPicker` и предоставляет части раскладки месяцев и кастомный рендер на основе хелперов.

## Импорт

```tsx
import {
  MonthPicker,
  MonthPickerCell,
  MonthPickerItem,
  MonthPickerLayout,
  MonthPickerRow,
  MonthPickerRowGroup,
  createMonthPickerGrid,
  useMonthPickerCellContext,
  useMonthPickerContext,
  type MonthPickerCellContextData,
  type MonthPickerCellProps,
  type MonthPickerItemProps,
  type MonthPickerLayoutProps,
  type MonthPickerProps,
  type MonthPickerRowGroupProps,
  type MonthPickerRowProps,
} from '@vega-ui/react';
```

## Экспортируемые типы

- `MonthPickerProps`
- `MonthPickerLayoutProps`
- `MonthPickerRowGroupProps`
- `MonthPickerRowProps`
- `MonthPickerItemProps`
- `MonthPickerCellProps`
- `MonthPickerCellContextData`

## Минимальная композиция

<!-- example: month-picker/minimal-composition.tsx -->
```tsx
import { MonthPicker, MonthPickerCell, MonthPickerLayout } from '@vega-ui/react';

export const locales = ['en-US', 'ru-RU', 'ar-EG', 'he-IL'];

export default function MinimalComposition({ locale = 'en-US' }: { locale?: string }) {
  return (
    <MonthPicker aria-label='Month, 2026' locale={locale} year='2026-01-01' style={{ width: '100%' }}>
      <MonthPickerLayout>
        <MonthPickerCell />
      </MonthPickerLayout>
    </MonthPicker>
  );
}
```
<!-- /example -->

## Обязательные части

- `MonthPicker`: корневая подсистема выбора месяца

## Необязательные части

- `MonthPickerLayout`
- `MonthPickerRowGroup`
- `MonthPickerRow`
- `MonthPickerItem`
- `MonthPickerCell`: ячейка, которую помещают в раскладки как шаблон

## Порядок композиции

1. `MonthPicker`
2. либо `MonthPickerLayout` с шаблоном ячейки в children (`<MonthPickerCell />` или собственным), либо собственная композиция из строк и элементов

## Варианты

- Выбор: `single`, `multiple`, `range`
- Плотность раскладки: `cols`; число строк зависит от количества месяцев в году
- Период: явный `year` (строка `YYYY-MM-DD` любого дня этого года) или текущий год
- Локаль и календарная система: пропсы `locale` и `calendar`, по умолчанию — локаль среды выполнения и григорианский календарь
- Формат меток: названия месяцев по локали

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

- Локаль и формат меток месяцев должны совпадать с остальной системой дат.
- Собственные раскладки должны сохранять подсказки выбора и отключённого состояния из примитивов пикера.
- Это низкоуровневый выбор месяца, а не обязательно готовый календарь для конечного пользователя.

## Частые ошибки

- Жёстко заданные названия месяцев, когда остальное приложение локализовано.
- Ручная сборка сетки месяцев вместо `createMonthPickerGrid`.
- Предположение, что в каждом году 12 месяцев или что месяцы — числа, начинающиеся с нуля.
- Использование компонента как обычной сетки контента, а не системы выбора месяца.
