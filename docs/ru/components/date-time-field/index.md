# DateTimeField

## Профиль документа

`advanced interactive`

## Кратко

`DateTimeField` — [составной компонент](../../glossary.md#составной-компонент-compound-component) для совместного ввода даты и времени, который согласует ввод с клавиатуры, необязательный выбор в календаре и правила метки времени в одном поле. Это слой метки времени на основе поля для случаев, когда одно сохраняемое значение обозначает конкретный запланированный момент.

## Импорт

```tsx
import {
  DateTimeField,
  DateTimeFieldInput,
  DateTimeFieldCalendar,
  DateTimeFieldTriggerIconButton,
  type DateTimeFieldProps,
} from '@vega-ui/react';
```

## Экспортируемые типы

- `DateTimeFieldProps`
- `DateTimeFieldInputProps`
- `DateTimeFieldCalendarProps`
- `DateTimeFieldTriggerIconButtonProps`

## Минимальная композиция

<!-- example: date-time-field/minimal-composition.tsx -->
```tsx
import {
  CalendarContent,
  CalendarDay,
  CalendarDays,
  CalendarHeader,
  CalendarMonth,
  CalendarMonthLabel,
  CalendarMonths,
  CalendarNextButton,
  CalendarPrevButton,
  CalendarViewButton,
  CalendarViewButtonGroup,
  CalendarWeekday,
  CalendarWeekdays,
  CalendarWeeks,
  CalendarYear,
  CalendarYearLabel,
  CalendarYears,
  DateTimeField,
  DateTimeFieldCalendar,
  DateTimeFieldInput,
  DateTimeFieldTriggerIconButton,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@vega-ui/react';

export default function MinimalComposition() {
  return (
    <DateTimeField dateFormat='dd.MM.yyyy' style={{ width: '100%', maxWidth: 320 }}>
      <DateTimeFieldInput aria-label='Starts at' />
      <Popover placement='bottom-end'>
        <PopoverTrigger asChild>
          <DateTimeFieldTriggerIconButton aria-label='Choose start date' />
        </PopoverTrigger>
        <PopoverContent>
          <DateTimeFieldCalendar>
            <CalendarHeader>
              <CalendarPrevButton aria-label='Previous month' />
              <CalendarViewButtonGroup>
                <CalendarViewButton view='month'><CalendarMonthLabel /></CalendarViewButton>
                <CalendarViewButton view='year'><CalendarYearLabel /></CalendarViewButton>
              </CalendarViewButtonGroup>
              <CalendarNextButton aria-label='Next month' />
            </CalendarHeader>
            <CalendarContent>
              <CalendarDays>
                <CalendarWeekdays>
                  <CalendarWeekday />
                </CalendarWeekdays>
                <CalendarWeeks>
                  <CalendarDay />
                </CalendarWeeks>
              </CalendarDays>
              <CalendarMonths>
                <CalendarMonth />
              </CalendarMonths>
              <CalendarYears>
                <CalendarYear />
              </CalendarYears>
            </CalendarContent>
          </DateTimeFieldCalendar>
        </PopoverContent>
      </Popover>
    </DateTimeField>
  );
}
```
<!-- /example -->

## Обязательные части

- `DateTimeField`: владелец корневого состояния и формата метки времени
- `DateTimeFieldInput`: поле для ввода даты и времени с клавиатуры

## Необязательные части

- `DateTimeFieldTriggerIconButton`: триггер календаря
- `DateTimeFieldCalendar`: содержимое визуального пикера, обычно монтируется в `Popover`

## Порядок композиции

1. `DateTimeField`
2. `DateTimeFieldInput`
3. `Popover`
4. `DateTimeFieldTriggerIconButton`
5. `DateTimeFieldCalendar`

## Варианты

- Только поле ввода или поле ввода вместе с календарём
- Время с точностью до минут или до секунд
- Планирование с ограничениями через `min`, `max`, `disabledDates` и `timeStep`

## Связанные документы

- [Анатомия](./anatomy.md)
- [Примеры](./examples.md)
- [Паттерны](./patterns.md)
- [API](./api.md)
- [Стилизация](./styling.md)
- [Доступность](./accessibility.md)
- [Сравнение](./comparison.md)
- [Решение проблем](./troubleshooting.md)
- Локаль и календарная система: пропсы корня `locale` и `calendar`, по умолчанию — локаль среды выполнения и григорианский календарь; см. [Даты и календарные системы](../../i18n.md#пропсы-локали-и-календаря)

## Пограничные случаи

- Интерпретация часового пояса остаётся за потребителем и должна быть задокументирована на уровне функции.
- Частичное редактирование метки времени — обычное дело, и его не стоит слишком рано считать итоговым значением.
- Поведение оверлеев нужно проверять внутри диалогов, выдвижных панелей (Drawer) и шторок (Sheet).
- Валидация даты и валидация времени должны сводиться к одной политике метки времени, а не к двум слабо связанным проверкам.

## Типичные ошибки

- Передача в `min` / `max` объектов `Date` или строк в формате отображения вместо ISO-строк `YYYY-MM-DDTHH:mm[:ss]`.
- Валидация даты и времени как несвязанных правил.
- Неявный смысл часового пояса в сценариях планирования.
- Переопределения на уровне поля, из-за которых невалидное или отключённое состояние читается хуже.
