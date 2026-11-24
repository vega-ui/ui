# DateTimeField

## Профиль документа

`advanced interactive`

## Кратко

`DateTimeField` — [составной компонент](../../glossary.md#составной-компонент-compound-component) для совместного ввода даты и времени, который согласует ввод с клавиатуры, необязательный выбор в календаре и правила метки времени в одном поле. Это слой метки времени на основе поля для случаев, когда одно сохраняемое значение обозначает конкретный запланированный момент.

## Импорт

```tsx
import {
  DateTimeField,
  DateTimeFieldInput,
  DateTimeFieldCalendar,
  DateTimeFieldTrigger,
  DateTimeFieldColumn,
  DateTimeFieldTime,
  type DateTimeFieldProps,
} from '@vega-ui/react';
```

## Экспортируемые типы

- `DateTimeFieldProps`
- `DateTimeFieldInputProps`
- `DateTimeFieldCalendarProps`
- `DateTimeFieldTriggerProps`
- `DateTimeFieldColumnProps`
- `DateTimeFieldTimeProps`

## Минимальная композиция

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
        <PopoverContent role='dialog' aria-label='Choose start date'>
          <DateTimeFieldCalendar>
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

## Свой компонент

Минимальная композиция выше показывает части на месте. В приложении соберите их один раз в своём файле, со своим набором иконок, и импортируйте этот компонент везде. `MyDateTimeField` передаёт свои пропсы в `DateTimeField`, `id` и `name` — полю ввода, а имена пикера, кнопок месяцев, подписи времени и колонок времени принимает пропсами; кнопка времени под календарём открывает колёса во вложенном поповере. См. [Рецепты компонентов](../../recipes.md).

<!-- example: date-time-field/recipe.tsx -->
```tsx
import {
  Button,
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
  DateTimeFieldColumn,
  DateTimeFieldInput,
  DateTimeFieldTime,
  DateTimeFieldTrigger,
  Icon,
  Label,
  Popover,
  PopoverContent,
  PopoverTrigger,
  type DateTimeFieldProps,
  Text,
  TimeFieldOption,
  WheelPicker,
  WheelPickerFace,
} from '@vega-ui/react';
import { CalendarIcon, ChevronLeftIcon, ChevronRightIcon } from '@vega-ui/icons';
import { useId } from 'react';

interface MyDateTimeFieldProps extends DateTimeFieldProps {
  name?: string
  pickerLabel: string
  previousLabel: string
  nextLabel: string
  timeLabel: string
  hoursLabel: string
  minutesLabel: string
  secondsLabel?: string
}

export function MyDateTimeField({ id, name, pickerLabel, previousLabel, nextLabel, timeLabel, hoursLabel, minutesLabel, secondsLabel, ...props }: MyDateTimeFieldProps) {
  const seconds = props.timeFormat === 'HH:mm:ss';
  const timeLabelId = useId();
  const timeButtonId = useId();

  return (
    <DateTimeField {...props}>
      <DateTimeFieldInput id={id} name={name} />
      <Popover placement='bottom-end'>
        <PopoverTrigger asChild>
          <DateTimeFieldTrigger square aria-label={pickerLabel}><Icon><CalendarIcon /></Icon></DateTimeFieldTrigger>
        </PopoverTrigger>
        <PopoverContent role='dialog' aria-label={pickerLabel}>
          <DateTimeFieldCalendar>
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
          </DateTimeFieldCalendar>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-4)', padding: '0 var(--spacing-6) var(--spacing-6)' }}>
            <Text id={timeLabelId}>{timeLabel}</Text>
            <Popover placement='top-end'>
              <PopoverTrigger asChild>
                <Button id={timeButtonId} aria-labelledby={`${timeLabelId} ${timeButtonId}`} aria-haspopup='dialog' size={props.size} variant='secondary' appearance='ghost'>
                  <DateTimeFieldTime placeholder='--:--' />
                </Button>
              </PopoverTrigger>
              <PopoverContent role='dialog' aria-labelledby={timeLabelId} style={{ padding: 'var(--spacing-6)' }}>
                <WheelPicker aria-labelledby={timeLabelId}>
                  <DateTimeFieldColumn unit='hour' aria-label={hoursLabel} autoFocus><TimeFieldOption><WheelPickerFace /></TimeFieldOption></DateTimeFieldColumn>
                  <span aria-hidden='true' style={{ alignSelf: 'center' }}>:</span>
                  <DateTimeFieldColumn unit='minute' aria-label={minutesLabel}><TimeFieldOption><WheelPickerFace /></TimeFieldOption></DateTimeFieldColumn>
                  {seconds && <span aria-hidden='true' style={{ alignSelf: 'center' }}>:</span>}
                  {seconds && <DateTimeFieldColumn unit='second' aria-label={secondsLabel}><TimeFieldOption><WheelPickerFace /></TimeFieldOption></DateTimeFieldColumn>}
                </WheelPicker>
              </PopoverContent>
            </Popover>
          </div>
        </PopoverContent>
      </Popover>
    </DateTimeField>
  );
}

export default function Recipe() {
  const id = useId();

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-3)', width: '100%', maxWidth: 320 }}>
      <Label htmlFor={id}>Webinar starts at</Label>
      <MyDateTimeField
        id={id}
        name='startsAt'
        dateFormat='dd.MM.yyyy'
        dateSeparator='.'
        separator=', '
        defaultValue='2026-07-15T18:30'
        pickerLabel='Choose webinar date and time'
        previousLabel='Previous month'
        nextLabel='Next month'
        timeLabel='Time'
        hoursLabel='Hours'
        minutesLabel='Minutes'
      />
    </div>
  );
}
```
<!-- /example -->

## Обязательные части

- `DateTimeField`: владелец корневого состояния и формата метки времени
- `DateTimeFieldInput`: поле для ввода даты и времени с клавиатуры

## Необязательные части

- `DateTimeFieldTrigger`: триггер календаря
- `DateTimeFieldCalendar`: содержимое визуального пикера, обычно монтируется в `Popover`
- `DateTimeFieldColumn`: колесо часов, минут или секунд по `unit` внутри `WheelPicker`
- `DateTimeFieldTime`: время поля текстом для кнопки, которая открывает колёса

## Порядок композиции

1. `DateTimeField`
2. `DateTimeFieldInput`
3. `Popover`
4. `DateTimeFieldTrigger`
5. `DateTimeFieldCalendar`
6. Под календарём вложенный `Popover` с `Button`, показывающим `DateTimeFieldTime`, и `WheelPicker` из `DateTimeFieldColumn`

## Варианты

- Только поле ввода или поле ввода вместе с календарём
- Время с точностью до минут или до секунд
- Планирование с ограничениями через `min`, `max`, `disabledDates` и `timeStep`

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

- Интерпретация часового пояса остаётся за потребителем и должна быть задокументирована на уровне функции.
- Частичное редактирование метки времени — обычное дело, и его не стоит слишком рано считать итоговым значением.
- Поведение оверлеев нужно проверять внутри диалогов, выдвижных панелей (Drawer) и шторок (Sheet).
- Валидация даты и валидация времени должны сводиться к одной политике метки времени, а не к двум слабо связанным проверкам.

## Типичные ошибки

- Передача в `min` / `max` объектов `Date` или строк в формате отображения вместо ISO-строк `YYYY-MM-DDTHH:mm[:ss]`.
- Валидация даты и времени как несвязанных правил.
- Неявный смысл часового пояса в сценариях планирования.
- Переопределения на уровне поля, из-за которых невалидное или отключённое состояние читается хуже.
