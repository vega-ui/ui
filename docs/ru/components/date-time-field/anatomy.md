# DateTimeField: анатомия

## Обзор

`DateTimeField` — [составной компонент](../../glossary.md#составной-компонент-compound-component), который под одним корнем согласует ввод даты и времени с клавиатуры, необязательный выбор в календаре и общие правила для метки времени.

## Обязательные части

### `DateTimeField`

Обязательная. Отвечает за разбор даты, разбор времени, правила шага и общее состояние метки времени.

### `DateTimeFieldInput`

Обязательная. Поле для ввода даты и времени с клавиатуры.

## Необязательные части

### `DateTimeFieldTriggerIconButton`

Необязательный триггер для открытия календаря в оверлее.

### `DateTimeFieldCalendar`

Необязательный визуальный выбор даты, синхронизированный со значением поля.

Его дочерние элементы — части `Calendar`: `CalendarHeader` с `CalendarPrevButton`, `CalendarViewButtonGroup` (`CalendarViewButton view='month'` и `view='year'`) и `CalendarNextButton`, затем `CalendarContent` с `CalendarDays`, `CalendarMonths` и `CalendarYears`. Календарь получает `locale` и `calendar` от `DateTimeField`.

## Порядок композиции

1. `DateTimeField`
2. `DateTimeFieldInput`
3. `Popover`
4. `DateTimeFieldTriggerIconButton`
5. `DateTimeFieldCalendar`
6. `CalendarHeader` и `CalendarContent` с представлениями календаря

## Корректные паттерны композиции

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

## Некорректные паттерны композиции

### Input вне `DateTimeField`

Это ломает общий разбор даты и времени и синхронизацию.

### Сценарий с меткой времени без явных правил часового пояса

Поле обрабатывает ввод, а не продуктовую политику часовых поясов.

### Валидация даты и времени как несвязанных правил

Итоговое значение в продукте — одна метка времени, а не два независимых поля.
