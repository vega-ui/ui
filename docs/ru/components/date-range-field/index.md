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
  DateRangeFieldTrigger,
  type DateRangeFieldProps,
} from '@vega-ui/react';
```

## Экспортируемые типы

- `DateRangeFieldProps`
- `DateRangeFieldInputProps`
- `DateRangeFieldCalendarProps`
- `DateRangeFieldTriggerProps`

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

## Свой компонент

Минимальная композиция выше показывает части на месте. В приложении соберите их один раз в своём файле, со своим набором иконок, и импортируйте этот компонент везде. `MyDateRangeField` передаёт свои пропсы в `DateRangeField`, `id` и `name` — полю ввода, а имена кнопки календаря и кнопок месяцев принимает пропсами. См. [Рецепты компонентов](../../recipes.md).

<!-- example: date-range-field/recipe.tsx -->
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
  Label,
  Popover,
  PopoverContent,
  PopoverTrigger,
  type DateRangeFieldProps,
} from '@vega-ui/react';
import { CalendarIcon, ChevronLeftIcon, ChevronRightIcon } from '@vega-ui/icons';
import { useId } from 'react';

interface MyDateRangeFieldProps extends DateRangeFieldProps {
  name?: string
  calendarLabel: string
  previousLabel: string
  nextLabel: string
}

export function MyDateRangeField({ id, name, calendarLabel, previousLabel, nextLabel, ...props }: MyDateRangeFieldProps) {
  return (
    <DateRangeField {...props}>
      <DateRangeFieldInput id={id} name={name} />
      <Popover placement='bottom-end'>
        <PopoverTrigger asChild>
          <DateRangeFieldTrigger square aria-label={calendarLabel}><Icon><CalendarIcon /></Icon></DateRangeFieldTrigger>
        </PopoverTrigger>
        <PopoverContent>
          <DateRangeFieldCalendar aria-label={calendarLabel}>
            <CalendarHeader>
              <CalendarPrevButton square aria-label={previousLabel}><Icon><ChevronLeftIcon /></Icon></CalendarPrevButton>
              <CalendarHeading>
                <CalendarViewButton view='month'><CalendarMonthLabel /></CalendarViewButton>
                <CalendarViewButton view='year'><CalendarYearLabel /></CalendarViewButton>
              </CalendarHeading>
              <CalendarNextButton square aria-label={nextLabel}><Icon><ChevronRightIcon /></Icon></CalendarNextButton>
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

export default function Recipe() {
  const id = useId();

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-3)', width: '100%', maxWidth: 320 }}>
      <Label htmlFor={id}>Stay</Label>
      <MyDateRangeField
        id={id}
        name='stay'
        format='dd.MM.yyyy'
        separator='.'
        defaultValue={['2026-07-10', '2026-07-14']}
        calendarLabel='Choose stay dates'
        previousLabel='Previous month'
        nextLabel='Next month'
      />
    </div>
  );
}
```
<!-- /example -->

## Обязательные части

- `DateRangeField`: корневое состояние и владелец формата диапазона
- `DateRangeFieldInput`: поверхность ввода диапазона

## Необязательные части

- `DateRangeFieldTrigger`: триггер календаря
- `DateRangeFieldCalendar`: содержимое визуального выбора диапазона, обычно монтируется в `Popover`

## Порядок композиции

1. `DateRangeField`
2. `DateRangeFieldInput`
3. `Popover`
4. `DateRangeFieldTrigger`
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
