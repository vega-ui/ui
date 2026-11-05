# CalendarBase

## Профиль документа

`compound`

## Кратко

`CalendarBase` — общая основа раскладки и контекста для семейства календарей VegaUI. Он передаёт размер, вариант и компактность общим частям: заголовку, кнопкам пикера, кнопкам управления и подписям дней недели, — но сам по себе не является полноценным виджетом выбора даты.

## Импорт

```tsx
import {
  CalendarBase,
  CalendarBaseControlIconButton,
  CalendarBaseHeader,
  CalendarBasePickerButton,
  CalendarBaseWeekLabel,
  CalendarBaseWeekLabels,
  type CalendarBaseControlIconButtonProps,
  type CalendarBaseHeaderProps,
  type CalendarBasePickerButtonProps,
  type CalendarBaseProps,
  type CalendarBaseSize,
  type CalendarBaseVariant,
  type CalendarBaseWeekLabelProps,
  type CalendarBaseWeekLabelsProps,
} from '@vega-ui/react';
```

## Экспортируемые типы

- `CalendarBaseProps`
- `CalendarBaseHeaderProps`
- `CalendarBaseWeekLabelsProps`
- `CalendarBaseWeekLabelProps`
- `CalendarBasePickerButtonProps`
- `CalendarBaseControlIconButtonProps`
- `CalendarBaseVariant`
- `CalendarBaseSize`

## Минимальная композиция

<!-- example: calendar-base/minimal-composition.tsx -->
```tsx
import {
  CalendarBase,
  CalendarBaseHeader,
  CalendarBaseWeekLabel,
  CalendarBaseWeekLabels,
  DayPicker,
  DayPickerCell,
  DayPickerLayout,
  Text,
} from '@vega-ui/react';

const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export default function MinimalComposition() {
  return (
    <CalendarBase compact>
      <CalendarBaseHeader>
        <Text fontWeight={600}>November 2026</Text>
      </CalendarBaseHeader>
      <DayPicker aria-label='November 2026' locale='en-US' month='2026-11-01'>
        <CalendarBaseWeekLabels>
          {weekdays.map((weekday) => (
            <CalendarBaseWeekLabel key={weekday}>{weekday}</CalendarBaseWeekLabel>
          ))}
        </CalendarBaseWeekLabels>
        <DayPickerLayout weekStartsOn={0}>
          <DayPickerCell />
        </DayPickerLayout>
      </DayPicker>
    </CalendarBase>
  );
}
```
<!-- /example -->

## Обязательные части

- `CalendarBase`: корневая раскладка и общий контекст календаря

## Необязательные части

- `CalendarBaseHeader`
- `CalendarBasePickerButton`
- `CalendarBaseControlIconButton`
- `CalendarBaseWeekLabels`
- `CalendarBaseWeekLabel`
- встроенное содержимое пикера из `DayPicker`, `MonthPicker`, `YearPicker` или собственных обёрток семейства календаря

## Порядок композиции

1. `CalendarBase`
2. необязательный `CalendarBaseHeader`
3. необязательная строка подписей дней недели
4. встроенное содержимое пикера/сетки

## Варианты

- Вариант: `primary` или `secondary`
- Размер: `xs`, `sm`, `md`, `lg`, `xl`
- Плотность: по умолчанию или `compact`

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

- `CalendarBase` — прежде всего примитив подсистемы, а не основная поверхность календаря для пользователей.
- Размер и вариант должны совпадать у заголовка и встроенного содержимого пикера.
- `compact` меняет плотность раскладки, но не логику работы с датами.
- Он должен визуально соответствовать слоям пикера, а не становиться отдельной темой или системой раскладки.

## Частые ошибки

- Считать `CalendarBase` полноценным виджетом календаря.
- Вручную пересобирать общие части заголовка календаря вместо экспортированных.
- Допускать расхождение собственных вариантов с остальным семейством календаря.
