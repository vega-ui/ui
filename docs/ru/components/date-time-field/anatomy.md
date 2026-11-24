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

Необязательный визуальный выбор даты, синхронизированный со значением поля. Размещается в `PopoverContent` с `role="dialog"` и именем. Выбор дня оставляет поповер открытым для времени, как пикер нативного `<input type="datetime-local">`; под календарём кнопка времени открывает колёса, как в iOS.

Его дочерние элементы — части `Calendar`: `CalendarHeader` с `CalendarPrevButton`, `CalendarHeading` с `CalendarViewButton view='month'` и `view='year'` и `CalendarNextButton`, затем `CalendarContent` с `CalendarDays`, `CalendarMonths` и `CalendarYears`. Календарь получает `locale` и `calendar` от `DateTimeField`.

### `DateTimeFieldColumn`

Необязательное колесо одной части времени, которую задаёт обязательный `unit`: `hour`, `minute` или `second`, секунды — с `timeFormat="HH:mm:ss"`. Колонки размещаются в `WheelPicker` во вложенном `Popover`, который открывает кнопка времени под `DateTimeFieldCalendar`. Колонка крутит время и сохраняет день; минуты и секунды идут по `timeStep`; пока поле пустое, она берёт дату из `today` в пределах `min` и `max`. Время за пределами `min` и `max` отключено только в дни `min` и `max`. Её дочерние элементы — шаблон опции, обычно `<TimeFieldOption><WheelPickerFace /></TimeFieldOption>`.

### `DateTimeFieldTime`

Необязательный текст времени поля в его `timeFormat`, а пока у поля нет полной даты и времени — `placeholder`, например `--:--`. Рендерит только текст: поместите его в `Button`, который открывает колёса, и назовите кнопку через `aria-labelledby` из видимой подписи «Время» и самой кнопки, чтобы она читалась как «Время 18:30».

## Порядок композиции

1. `DateTimeField`
2. `DateTimeFieldInput`
3. `Popover`
4. `DateTimeFieldTrigger`
5. `DateTimeFieldCalendar`
6. `CalendarHeader` и `CalendarContent` с представлениями календаря
7. Под календарём подпись «Время» и вложенный `Popover`, триггер которого — `Button` с `DateTimeFieldTime`, а содержимое — `WheelPicker` из `DateTimeFieldColumn`

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

## Некорректные паттерны композиции

### Input вне `DateTimeField`

Это ломает общий разбор даты и времени и синхронизацию.

### Сценарий с меткой времени без явных правил часового пояса

Поле обрабатывает ввод, а не продуктовую политику часовых поясов.

### Валидация даты и времени как несвязанных правил

Итоговое значение в продукте — одна метка времени, а не два независимых поля.
