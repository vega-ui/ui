# DateField

## Профиль документа

`advanced interactive`

## Кратко

`DateField` — [составной компонент](../../glossary.md#составной-компонент-compound-component) для ввода одной даты, который объединяет ввод с клавиатуры, необязательный выбор в календаре и ограничения на уровне поля в одном элементе управления. Это слой ввода даты, где главное — поле, а календарь служит необязательным помощником для выбора, а не основной абстракцией.

## Импорт

```tsx
import {
  DateField,
  DateFieldInput,
  DateFieldCalendar,
  DateFieldTriggerIconButton,
  type DateFieldProps,
} from '@vega-ui/react';
```

## Экспортируемые типы

- `DateFieldProps`
- `DateFieldInputProps`
- `DateFieldCalendarProps`
- `DateFieldTriggerIconButtonProps`

## Минимальная композиция

<!-- example: date-field/minimal-composition.tsx -->
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
  DateField,
  DateFieldCalendar,
  DateFieldInput,
  DateFieldTriggerIconButton,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@vega-ui/react';

export default function MinimalComposition() {
  return (
    <DateField format='dd.MM.yyyy' separator='.'>
      <DateFieldInput aria-label='Due date' />
      <Popover placement='bottom-end'>
        <PopoverTrigger asChild>
          <DateFieldTriggerIconButton aria-label='Choose due date' />
        </PopoverTrigger>
        <PopoverContent>
          <DateFieldCalendar>
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
          </DateFieldCalendar>
        </PopoverContent>
      </Popover>
    </DateField>
  );
}
```
<!-- /example -->

## Обязательные части

- `DateField`: владелец корневого состояния и форматирования
- `DateFieldInput`: поверхность для ввода даты

## Необязательные части

- `DateFieldTriggerIconButton`: триггер календаря
- `DateFieldCalendar`: содержимое визуального выбора даты, обычно монтируется в `Popover`

## Порядок композиции

1. `DateField`
2. `DateFieldInput`
3. `Popover`
4. `DateFieldTriggerIconButton`
5. `DateFieldCalendar`

## Варианты

- Только input или input вместе с календарём
- Выбор через триггер или только ввод с клавиатуры
- Ограниченное состояние через `min`, `max` и `disabledDates`

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

- Правила локали, часового пояса и сериализации по-прежнему остаются на стороне потребителя.
- Частично введённые значения во время редактирования — обычное дело, и их не следует считать итоговыми.
- Поведение оверлея проверяйте внутри диалогов, выдвижных панелей и прокручиваемых контейнеров.
- Одно и то же бизнес-правило должно управлять и валидацией ввода, и блокировкой в календаре; они не должны расходиться в две разные политики.

## Частые ошибки

- Передача в `min` / `max` объектов `Date` или строк в формате отображения вместо ISO-строк `YYYY-MM-DD`.
- Расчёт на то, что поле само решит вопрос с политикой часовых поясов.
- Иконка-кнопка триггера без подписи в сценариях с вспомогательными технологиями.
- Восприятие `min`, `max` и `disabledDates` как визуальных подсказок, а не правил валидации.
