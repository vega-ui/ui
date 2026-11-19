# DateTimeField: анатомия

## Обзор

`DateTimeField` — [составной компонент](../../glossary.md#составной-компонент-compound-component), который под одним корнем согласует ввод даты и времени с клавиатуры, необязательный выбор в календаре и общие правила для метки времени.

## Обязательные части

### `DateTimeField`

Обязательная. Отвечает за разбор даты, разбор времени, правила шага и общее состояние метки времени.

### `DateTimeFieldInput`

Обязательная. Поле для ввода даты и времени с клавиатуры.

## Необязательные части

### `DateTimeFieldTrigger`

Необязательный триггер для открытия календаря в оверлее. Рендерит `Button` без собственного содержимого: передайте иконку календаря дочерним элементом вместе с `square` и `aria-label` или `aria-labelledby`, текст вроде «Выбрать дату» или свою кнопку через `asChild`.

### `DateTimeFieldCalendar`

Необязательный визуальный выбор даты, синхронизированный со значением поля.

Его дочерние элементы — части `Calendar`: `CalendarHeader` с `CalendarPrevButton`, `CalendarHeading` с `CalendarViewButton view='month'` и `view='year'` и `CalendarNextButton`, затем `CalendarContent` с `CalendarDays`, `CalendarMonths` и `CalendarYears`. Календарь получает `locale` и `calendar` от `DateTimeField`.

## Порядок композиции

1. `DateTimeField`
2. `DateTimeFieldInput`
3. `Popover`
4. `DateTimeFieldTrigger`
5. `DateTimeFieldCalendar`
6. `CalendarHeader` и `CalendarContent` с представлениями календаря

## Корректные паттерны композиции

<!-- example: date-time-field/minimal-composition.tsx -->
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
  DateTimeField,
  DateTimeFieldCalendar,
  DateTimeFieldInput,
  DateTimeFieldTrigger,
  Icon,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@vega-ui/react';
import { CalendarIcon, ChevronLeftIcon, ChevronRightIcon } from '@vega-ui/icons';

export default function MinimalComposition() {
  return (
    <DateTimeField dateFormat='dd.MM.yyyy' style={{ width: '100%', maxWidth: 320 }}>
      <DateTimeFieldInput aria-label='Starts at' />
      <Popover placement='bottom-end'>
        <PopoverTrigger asChild>
          <DateTimeFieldTrigger square aria-label='Choose start date'><Icon><CalendarIcon /></Icon></DateTimeFieldTrigger>
        </PopoverTrigger>
        <PopoverContent>
          <DateTimeFieldCalendar aria-label='Choose start date'>
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
          </DateTimeFieldCalendar>
        </PopoverContent>
      </Popover>
    </DateTimeField>
  );
}
```
<!-- /example -->

## Некорректные паттерны композиции

### Input вне `DateTimeField`

Это ломает общий разбор даты и времени и синхронизацию.

### Сценарий с меткой времени без явных правил часового пояса

Поле обрабатывает ввод, а не продуктовую политику часовых поясов.

### Валидация даты и времени как несвязанных правил

Итоговое значение в продукте — одна метка времени, а не два независимых поля.
