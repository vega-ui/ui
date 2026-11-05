# DateField: анатомия

## Обзор

`DateField` — [составной компонент](../../glossary.md#составной-компонент-compound-component), который координирует ввод даты с клавиатуры, необязательный выбор в календаре и общее состояние поля под одним корнем.

## Обязательные части

### `DateField`

Обязательна. Отвечает за разбор и форматирование даты, правила отключённых дат и общее состояние поля.

### `DateFieldInput`

Обязательна. Предоставляет поверхность для ввода даты.

## Необязательные части

### `DateFieldTriggerIconButton`

Необязательный триггер для открытия оверлея с календарём.

### `DateFieldCalendar`

Необязательный визуальный выбор даты; обычно его монтируют внутри `Popover`.

Его дочерние элементы — части `Calendar`: `CalendarHeader` с `CalendarPrevButton`, `CalendarViewButtonGroup` (`CalendarViewButton view='month'` и `view='year'`) и `CalendarNextButton`, затем `CalendarContent` с `CalendarDays`, `CalendarMonths` и `CalendarYears`. Календарь берёт `locale` и `calendar` из `DateField`.

## Порядок композиции

1. `DateField`
2. `DateFieldInput`
3. `Popover`
4. `DateFieldTriggerIconButton`
5. `DateFieldCalendar`
6. `CalendarHeader` и `CalendarContent` с представлениями календаря

## Допустимые паттерны композиции

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

## Недопустимые паттерны композиции

### `DateFieldInput` вне `DateField`

Это ломает общее форматирование и синхронизацию значения.

### Триггер календаря без реального оверлея календаря

Кнопка обещает выбор даты, которого нет.

### Ограничения календаря как чисто визуальные

`min`, `max` и `disabledDates` должны соответствовать реальным правилам валидации.
