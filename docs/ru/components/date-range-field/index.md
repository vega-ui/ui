# DateRangeField

## Профиль документа

`advanced interactive`

## Кратко

`DateRangeField` — [составной компонент](../../glossary.md#составной-компонент-compound-component) для ввода связанных дат начала и окончания, который объединяет ввод диапазона с клавиатуры, необязательный выбор в календаре и общую валидацию диапазона. Это слой диапазона «сначала поле» для случаев, когда обе даты принадлежат одному бизнес-понятию.

## Импорты

```tsx
import {
  DateRangeField,
  DateRangeFieldInput,
  DateRangeFieldCalendar,
  DateRangeFieldTriggerIconButton,
  type DateRangeFieldProps,
} from '@vega-ui/react';
```

## Экспортируемые типы

- `DateRangeFieldProps`
- `DateRangeFieldInputProps`
- `DateRangeFieldCalendarProps`
- `DateRangeFieldTriggerIconButtonProps`

## Минимальная композиция

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
  DateRangeFieldTriggerIconButton,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@vega-ui/react';

export default function MinimalComposition() {
  return (
    <DateRangeField format='dd.MM.yyyy' separator='.' style={{ width: '100%', maxWidth: 320 }}>
      <DateRangeFieldInput aria-label='Trip dates' />
      <Popover placement='bottom-end'>
        <PopoverTrigger asChild>
          <DateRangeFieldTriggerIconButton aria-label='Choose trip dates' />
        </PopoverTrigger>
        <PopoverContent>
          <DateRangeFieldCalendar aria-label='Choose trip dates'>
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
          </DateRangeFieldCalendar>
        </PopoverContent>
      </Popover>
    </DateRangeField>
  );
}
```
<!-- /example -->

## Обязательные части

- `DateRangeField`: корневое состояние и владелец формата диапазона
- `DateRangeFieldInput`: поверхность ввода диапазона

## Необязательные части

- `DateRangeFieldTriggerIconButton`: триггер календаря
- `DateRangeFieldCalendar`: содержимое визуального выбора диапазона, обычно монтируется в `Popover`

## Порядок композиции

1. `DateRangeField`
2. `DateRangeFieldInput`
3. `Popover`
4. `DateRangeFieldTriggerIconButton`
5. `DateRangeFieldCalendar`

## Варианты

- Композиция только с полем ввода или с полем и календарём
- Компактный диапазон в фильтре или более полные сценарии бронирования
- Состояние диапазона с ограничениями через `min`, `max` и `disabledDates`

## Связанные документы

- [Анатомия](./anatomy.md)
- [Примеры](./examples.md)
- [Паттерны](./patterns.md)
- [API](./api.md)
- [Стилизация](./styling.md)
- [Доступность](./accessibility.md)
- [Сравнение](./comparison.md)
- [Решение проблем](./troubleshooting.md)
- Локаль и календарная система: пропсы корня `locale` и `calendar`, по умолчанию — `"en-US"` и григорианский календарь; см. [Даты и календарные системы](../../i18n.md#пропсы-локали-и-календаря)

## Пограничные случаи

- Частичные диапазоны при редактировании ожидаемы и требуют явной обработки.
- Семантика диапазона — например, включаются ли дни бронирования или где граница отчётного периода — остаётся за потребителем.
- Поведение оверлея нужно проверять внутри фильтров, выдвижных панелей и других многослойных раскладок.
- Разбор введённого диапазона, визуально заблокированные дни и итоговая бизнес-валидация должны оставаться согласованными, а не превращаться в отдельные системы правил.

## Частые ошибки

- В `min` / `max` передаются объекты `Date` или строки в формате отображения вместо ISO-строк `YYYY-MM-DD`.
- Даты начала и окончания считаются несвязанными значениями.
- Смысл диапазона остаётся неоднозначным в подписях или вспомогательном тексте.
- Расчёт на визуальную блокировку в календаре без соответствующих правил валидации.
