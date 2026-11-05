# DateField: решение проблем

## Кнопка календаря ничего не открывает

### Симптом

Иконка-кнопка триггера рендерится, но по клику календарь не появляется.

### Вероятная причина

`DateFieldTriggerIconButton` отрендерен без окружающего `Popover` или без `DateFieldCalendar` внутри оверлея.

### Как проверить

- Проверьте, обёрнут ли триггер в `PopoverTrigger`.
- Проверьте, содержит ли `PopoverContent` компонент `DateFieldCalendar`.

### Исправление

Скомпонуйте триггер и календарь через `Popover` внутри `DateField`.

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

## Введённое значение выглядит неправильно

### Симптом

Формат, который видят пользователи, не совпадает с поведением разбора.

### Вероятная причина

`format` или `separator` не совпадает с форматом даты в подписях, подсказках и сообщениях валидации.

### Как проверить

- Сравните заданный `format` с видимой подсказкой формы.
- Введите типичное значение и проверьте, как оно интерпретируется.

### Исправление

Согласуйте видимые подсказки, правила разбора и тексты валидации вокруг одного и того же формата.

## Отправляемое значение — не ISO-дата

### Симптом

Форма отправляет `15.01.2026` вместо `2026-01-15`.

### Вероятная причина

`DateFieldInput` — нативный input, и с `name` отправляется введённый в него текст.

### Как проверить

- Прочитайте поле из `FormData` в обработчике отправки.

### Исправление

Берите ISO-день из `onChangeValue` на корне, а не текст. Чтобы отправить его с формой, уберите `name` у input и задайте его скрытому input с этим днём, как в разделе [Форма/интеграция](./examples.md#формаинтеграция).

## Отключённые даты всё ещё можно ввести

### Симптом

Календарь блокирует некоторые дни, но если ввести один из них вручную, он принимается и отправляется.

### Вероятная причина

`min` и `max` ограничивают введённые даты, но `disabledDates` действует только на календарь.

### Как проверить

- Введите отключённый день и отправьте форму.

### Исправление

Проверяйте то же правило `disabledDates` в валидации при отправке и на сервере.
