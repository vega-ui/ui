# DateField: анатомия

## Обзор

`DateField` — [составной компонент](../../glossary.md#составной-компонент-compound-component), который координирует ввод даты с клавиатуры, необязательный выбор в календаре и общее состояние поля под одним корнем.

## Обязательные части

### `DateField`

Обязательна. Отвечает за разбор и форматирование даты, правила отключённых дат и общее состояние поля.

### `DateFieldInput`

Обязательна. Предоставляет поверхность для ввода даты.

## Необязательные части

### `DateFieldTrigger`

Необязательный триггер для открытия оверлея с календарём. Рендерит `Button` без собственного содержимого: передайте иконку календаря дочерним элементом вместе с `square` и `aria-label` или `aria-labelledby`, текст вроде «Выбрать дату» или свою кнопку через `asChild`.

### `DateFieldCalendar`

Необязательный визуальный выбор даты; обычно его монтируют внутри `Popover`.

Его дочерние элементы — части `Calendar`: `CalendarHeader` с `CalendarPrevButton`, `CalendarHeading` с `CalendarViewButton view='month'` и `view='year'` и `CalendarNextButton`, затем `CalendarContent` с `CalendarDays`, `CalendarMonths` и `CalendarYears`. Календарь берёт `locale` и `calendar` из `DateField`.

## Порядок композиции

1. `DateField`
2. `DateFieldInput`
3. `Popover`
4. `DateFieldTrigger`
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
  DateFieldTrigger,
  Icon,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@vega-ui/react';
import { CalendarIcon, ChevronLeftIcon, ChevronRightIcon } from '@vega-ui/icons';

export default function MinimalComposition() {
  return (
    <DateField format='dd.MM.yyyy' separator='.'>
      <DateFieldInput aria-label='Due date' />
      <Popover placement='bottom-end'>
        <PopoverTrigger asChild>
          <DateFieldTrigger square aria-label='Choose due date'><Icon><CalendarIcon /></Icon></DateFieldTrigger>
        </PopoverTrigger>
        <PopoverContent>
          <DateFieldCalendar aria-label='Choose due date'>
            <CalendarHeader>
              <CalendarPrevButton square aria-label='Previous month'><Icon><ChevronLeftIcon /></Icon></CalendarPrevButton>
              <CalendarHeading>
                <CalendarViewButton view='month'><CalendarMonthLabel /></CalendarViewButton>
                <CalendarViewButton view='year'><CalendarYearLabel /></CalendarViewButton>
              </CalendarHeading>
              <CalendarNextButton square aria-label='Next month'><Icon><ChevronRightIcon /></Icon></CalendarNextButton>
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
