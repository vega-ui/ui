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

Его дочерние элементы — части `Calendar`: `CalendarHeader` с `CalendarPrevButton`, `CalendarHeading` с `CalendarViewButton view='month'` и `view='year'` и `CalendarNextButton`, затем `CalendarContent` с `CalendarDays`, `CalendarMonths` и `CalendarYears`. Календарь берёт `locale` и `calendar` из `DateField`.

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
  CalendarDaysScroller,
  CalendarDaysScrollerContent,
  CalendarHeader,
  CalendarHeading,
  CalendarMonth,
  CalendarMonthLabel,
  CalendarMonths,
  CalendarMonthsGrid,
  CalendarNextButton,
  CalendarPrevButton,
  CalendarViewButton,
  CalendarWeekday,
  CalendarWeekdays,
  CalendarWeeks,
  CalendarYear,
  CalendarYearLabel,
  CalendarYears,
  CalendarYearsGrid,
  CalendarYearsScroller,
  CalendarYearsScrollerContent,
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
          <DateFieldCalendar aria-label='Choose due date'>
            <CalendarHeader>
              <CalendarPrevButton aria-label='Previous month' />
              <CalendarHeading>
                <CalendarViewButton view='month'><CalendarMonthLabel /></CalendarViewButton>
                <CalendarViewButton view='year'><CalendarYearLabel /></CalendarViewButton>
              </CalendarHeading>
              <CalendarNextButton aria-label='Next month' />
            </CalendarHeader>
            <CalendarContent>
              <CalendarDays>
                <CalendarWeekdays>
                  <CalendarWeekday />
                </CalendarWeekdays>
                <CalendarDaysScroller>
                  <CalendarDaysScrollerContent>
                    <CalendarWeeks>
                      <CalendarDay />
                    </CalendarWeeks>
                  </CalendarDaysScrollerContent>
                </CalendarDaysScroller>
              </CalendarDays>
              <CalendarMonths>
                <CalendarMonthsGrid>
                  <CalendarMonth />
                </CalendarMonthsGrid>
              </CalendarMonths>
              <CalendarYears>
                <CalendarYearsScroller>
                  <CalendarYearsScrollerContent>
                    <CalendarYearsGrid>
                      <CalendarYear />
                    </CalendarYearsGrid>
                  </CalendarYearsScrollerContent>
                </CalendarYearsScroller>
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
