# DateRangeField: анатомия

## Обзор

`DateRangeField` — [составной компонент](../../glossary.md#составной-компонент-compound-component), который согласует связанные даты начала и окончания через одно поле, необязательный календарь для выбора и общие правила диапазона.

## Обязательные части

### `DateRangeField`

Обязательная часть. Отвечает за разбор и форматирование диапазона и правила ограничения дат.

### `DateRangeFieldInput`

Обязательная часть. Предоставляет поверхность для ввода диапазона от начала до конца.

## Необязательные части

### `DateRangeFieldTrigger`

Необязательный триггер для открытия календаря в оверлее. Рендерит `Button` без собственного содержимого: передайте иконку календаря дочерним элементом вместе с `square` и `aria-label` или `aria-labelledby`, текст вроде «Выбрать дату» или свою кнопку через `asChild`.

### `DateRangeFieldCalendar`

Необязательный визуальный выбор диапазона, который обычно монтируется внутри `Popover`.

Его дочерние элементы — части `Calendar`: `CalendarHeader` с `CalendarPrevButton`, `CalendarHeading` с `CalendarViewButton view='month'` и `view='year'` и `CalendarNextButton`, затем `CalendarContent` с `CalendarDays`, `CalendarMonths` и `CalendarYears`. Календарь берёт `locale` и `calendar` из `DateRangeField`.

## Порядок композиции

1. `DateRangeField`
2. `DateRangeFieldInput`
3. `Popover`
4. `DateRangeFieldTrigger`
5. `DateRangeFieldCalendar`
6. `CalendarHeader` и `CalendarContent` с представлениями календаря

## Допустимые варианты композиции

<!-- example: date-range-field/minimal-composition.tsx -->
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
  DateRangeField,
  DateRangeFieldCalendar,
  DateRangeFieldInput,
  DateRangeFieldTrigger,
  Icon,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@vega-ui/react';
import { CalendarIcon, ChevronLeftIcon, ChevronRightIcon } from '@vega-ui/icons';

export default function MinimalComposition() {
  return (
    <DateRangeField format='dd.MM.yyyy' separator='.' style={{ width: '100%', maxWidth: 320 }}>
      <DateRangeFieldInput aria-label='Trip dates' />
      <Popover placement='bottom-end'>
        <PopoverTrigger asChild>
          <DateRangeFieldTrigger square aria-label='Choose trip dates'><Icon><CalendarIcon /></Icon></DateRangeFieldTrigger>
        </PopoverTrigger>
        <PopoverContent>
          <DateRangeFieldCalendar aria-label='Choose trip dates'>
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
          </DateRangeFieldCalendar>
        </PopoverContent>
      </Popover>
    </DateRangeField>
  );
}
```
<!-- /example -->

## Недопустимые варианты композиции

### Поле диапазона вне `DateRangeField`

Это ломает согласованный разбор и состояние выбора диапазона.

### Выбор диапазона без понятной семантики в окружающем тексте

Пользователям не должно приходиться гадать, включает ли диапазон границы, относится ли он к отчёту или к бронированию.

### Неполные диапазоны считаются полностью валидными значениями

Пока поле заполнено частично, ввод дат начала и окончания нужно обрабатывать явно.
